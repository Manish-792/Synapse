# AI Agent API

A powerful AI agent with multi-step reasoning capabilities, refactored from a command-line application to a RESTful API using Express.js.

## Features

- 🤖 **Multi-step Reasoning**: The agent can break down complex problems into steps
- 🛠️ **Tool Integration**: Access to weather, news, crypto prices, calculations, and more
- 🔄 **Conversation History**: Maintains context across multiple interactions
- ⚡ **Real-time Processing**: Streaming responses for better user experience
- 🛡️ **Error Handling**: Robust error handling with rate limiting protection

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   NEWS_API_KEY=your_news_api_key_here
   ```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on port 3001 (or the port specified in `PORT` environment variable).

## API Endpoints

### Health Check
```
GET /health
```
Returns server status.

### Chat
```
POST /chat
```

**Request Body:**
```json
{
  "message": "Your question or request here",
  "history": []
}
```

**Response:**
```json
{
  "success": true,
  "finalResponse": "The agent's final answer",
  "history": [
    // Updated conversation history
  ]
}
```

## Available Tools

- **sum**: Add two numbers
- **prime**: Check if a number is prime
- **getCryptoPrice**: Get cryptocurrency prices
- **getWeather**: Get weather information for any city
- **getNews**: Get news headlines on any topic
- **getWorldTime**: Get current time in any timezone

## Example Usage

### Simple Calculation
```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is 15 + 27?", "history": []}'
```

### Complex Query with Tools
```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Plan a day trip based on today weather in London", "history": []}'
```

## Rate Limiting

⚠️ **Note**: The free tier of Gemini API has a limit of 50 requests per day. The API includes built-in rate limiting and error handling for this.

## Error Responses

### Rate Limit Exceeded (429)
```json
{
  "error": "Rate limit exceeded",
  "message": "You have exceeded the API quota limit. Please try again later or upgrade your plan.",
  "details": "Error details..."
}
```

### Bad Request (400)
```json
{
  "error": "Message is required",
  "message": "Please provide a message in the request body"
}
```

### Internal Server Error (500)
```json
{
  "error": "Internal server error",
  "message": "An error occurred while processing your request",
  "details": "Error details..."
}
```

## Architecture

- **`server.js`**: Express.js server with API endpoints
- **`index.js`**: Core AI agent logic with multi-step reasoning
- **`tools/`**: Directory containing individual tool implementations
  - `sum.js`, `prime.js`, `getCryptoPrice.js`, etc.
  - `index.js`: Tool bundler and exporter

## Development

The agent uses a modular architecture where each tool is implemented in its own file and exported through a central bundler. This makes it easy to add new tools or modify existing ones.

## License

ISC
