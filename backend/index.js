import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'; 
import { availableTools, allDeclarations } from './tools/index.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



// A helper function to create the dynamic system prompt
function getSystemInstruction() {
    // Get current date and time in a user-friendly format for the model
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    return `You are an advanced autonomous agent that can solve complex problems by breaking them down into steps.

    ## CONTEXT
    - The current date and time is ${formattedDateTime}.
    - The user is located in Delhi, India. This is a known fact and should be used as the default for any location-based queries unless the user specifies another location.

    ## CORE DIRECTIVE: The Reason-Act Cycle
    For every user prompt, you MUST go through a "Reason-Act" cycle. Your response must be structured into three parts: Thought, Plan, and Action.

    1.  **Thought:** First, you will think. Analyze the user's request and the conversation history. Formulate a high-level strategy to answer the user's request. Explain your reasoning.
    2.  **Plan:** Second, create a step-by-step plan to execute your strategy. The plan should be a simple, numbered list.
    3.  **Action:** Third, you will act. This will be your response. Your action can be one of two things:
        a. **Call a tool:** If you need to gather more information, call one of your available tools. Your output should be ONLY the tool call (e.g., getWeather({city: "London"})).
        b. **Final Answer:** If you have gathered all the information you need and have a complete answer, provide it to the user.

    ## AVAILABLE TOOLS
    - sum: Adds two numbers.
    - prime: Checks if a number is a prime number.
    - getCryptoPrice: Gets the price of cryptocurrencies.
    - getWeather: Gets the weather for any city.
    - getNews: Gets news headlines on ANY topic.
    - getWorldTime: Gets the current time in any IANA timezone.
    
    ## EXAMPLE
    User Request: "Is it a good time to go for a walk in London right now?"

    Your Response (first turn):
    Thought: The user wants to know if they should go for a walk in London. To answer this, I first need to know the current weather in London.
    Plan:
    1. Get the current weather in London.
    2. Analyze the weather to determine if it's suitable for a walk.
    3. Provide a final recommendation to the user.
    Action: getWeather({city: "London"})
    `;
}


export async function runAgent(userProblem, history = []) {
    // Create a local copy of the history to avoid mutating the original
    const localHistory = [...history];
    
    localHistory.push({
        role: 'user',
        parts: [{ text: userProblem }]
    });

    // Multi-step reasoning configuration
    const maxIterations = 8;
    let iterationCount = 0;
    
    // Simple rate limiting - add a small delay between requests
    const addDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // The main loop for the agent's turn
    while (iterationCount < maxIterations) {
        console.log("\nThinking...");

        try {
                    const response = await ai.models.generateContent({
            // 1. Using the latest Flash model for speed and capability
            model: "gemini-1.5-flash-latest",
            contents: localHistory,
            // 2. Using the dynamic, context-aware system instruction
            systemInstruction: getSystemInstruction(),
            // 3. Modernized API structure
            tools: [{
                functionDeclarations: allDeclarations
            }],
        });

        // Check if the model wants to call one or more functions
        if (response.functionCalls && response.functionCalls.length > 0) {
            const functionCalls = response.functionCalls;
            console.log(`Calling tools: ${functionCalls.map(call => call.name).join(', ')}...`);

            // 4. Concurrently execute all tool calls requested by the model
            const toolCallPromises = functionCalls.map(async (call) => {
                const { name, args } = call;
                let result;

                // 5. Robust error handling for each tool call
                try {
                    const funCall = availableTools[name];
                    if (!funCall) {
                        throw new Error(`Unknown tool "${name}" requested.`);
                    }
                    result = await funCall(args);
                } catch (error) {
                    console.error(`Error executing tool ${name}:`, error);
                    result = `Error: ${error.message}`; // Report the error back to the model
                }

                // Return the result in the format the model expects
                return {
                    name: name,
                    response: { result: result },
                };
            });

            // Wait for all tool calls to complete
            const functionResponses = await Promise.all(toolCallPromises);

            // Push the model's original tool-use request to history
            localHistory.push({
                role: "model",
                parts: [{ functionCall: functionCalls[0] }], // Storing just the first call for simplicity, but you can store all if needed
            });

            // Push the results of all tool calls back to the model
            localHistory.push({
                role: "user", // For function responses, the role is 'user'
                parts: functionResponses.map(resp => ({ functionResponse: resp }))
            });

        } else {
            // If the model responds with text, treat it as intermediate thought
            try {
                const stream = await ai.models.generateContentStream({
                    // 1. Using the latest Flash model for speed and capability
                    model: "gemini-1.5-flash-latest",
                    contents: localHistory,
                    // 2. Using the dynamic, context-aware system instruction
                    systemInstruction: getSystemInstruction(),
                    // 3. Modernized API structure
                    tools: [{
                        functionDeclarations: allDeclarations
                    }],
                });

                let fullResponse = '';
                
                // Iterate over the stream to get real-time text chunks
                for await (const chunk of stream) {
                    const textContent = chunk.text;
                    if (textContent) {
                        process.stdout.write(textContent); // Create real-time "typing" effect
                        fullResponse += textContent;
                    }
                }
                
                // Print a final newline for clean formatting
                console.log();
                
                // Push the intermediate thought to localHistory
                localHistory.push({
                    role: 'model',
                    parts: [{ text: fullResponse }]
                });
                
                // Continue the loop for multi-step reasoning (no break statement)
            } catch (streamError) {
                console.error('\n❌ Error during streaming:', streamError.message);
                throw streamError; // Re-throw to be caught by the outer catch block
            }
        }
        
        } catch (error) {
            console.error('\n❌ Error during AI processing:', error.message);
            
            if (error.status === 429) {
                console.log('\n⚠️  Rate limit exceeded! You have hit the Gemini API quota limit.');
                console.log('💡 Solutions:');
                console.log('   - Wait for the quota to reset (usually daily)');
                console.log('   - Upgrade to a paid plan for higher limits');
                console.log('   - Use a different API key');
                console.log('\n🔄 Exiting gracefully...');
            } else {
                console.log('\n💡 This might be a temporary issue. Please try again later.');
            }
            
            // Add error message to localHistory and break the loop
            localHistory.push({
                role: 'model',
                parts: [{ text: `Error: ${error.message}. Please try again later.` }]
            });
            break;
        }
        
        // Increment iteration counter
        iterationCount++;
        
        // Add a small delay to prevent rate limiting (only if not the last iteration)
        if (iterationCount < maxIterations) {
            await addDelay(1000); // 1 second delay between requests
        }
    }
    
    // Find the final answer
    const lastModelMessage = localHistory
        .filter(msg => msg.role === 'model' && msg.parts && msg.parts[0] && msg.parts[0].text)
        .pop();
    
    let finalResponse = 'No conclusive answer reached within the iteration limit.';
    if (lastModelMessage) {
        finalResponse = lastModelMessage.parts[0].text;
    }
    
    // Return the final state
    return {
        finalResponse: finalResponse,
        history: localHistory
    };
}





