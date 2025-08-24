import express from 'express';
import cors from 'cors';
import { runAgent } from './index.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Synapse AI Agent API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Synapse AI Agent API',
        version: '1.0.0',
        description: 'Advanced AI agent with multi-step reasoning capabilities',
        endpoints: {
            health: '/health',
            chat: '/chat'
        },
        documentation: 'Use POST /chat with message and history in request body'
    });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        // Extract and validate request body
        const { message, history = [] } = req.body;
        
        if (!message) {
            return res.status(400).json({
                error: 'Message is required',
                message: 'Please provide a message in the request body'
            });
        }
        
        if (!Array.isArray(history)) {
            return res.status(400).json({
                error: 'Invalid history format',
                message: 'History must be an array'
            });
        }
        
        console.log(`🤖 Processing request: "${message}"`);
        
        // Call the AI agent
        const result = await runAgent(message, history);
        
        console.log('✅ Request processed successfully');
        
        // Send the response
        res.json({
            success: true,
            finalResponse: result.finalResponse,
            history: result.history
        });
        
    } catch (error) {
        console.error('❌ Error processing request:', error);
        
        // Handle specific error types
        if (error.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'You have exceeded the API quota limit. Please try again later or upgrade your plan.',
                details: error.message
            });
        }
        
        // Generic error response
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while processing your request',
            details: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: `Route ${req.originalUrl} not found`,
        availableEndpoints: ['/', '/health', '/chat']
    });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Synapse AI Agent API server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
    console.log(`💬 Chat endpoint: http://localhost:${PORT}/chat`);
    console.log(`⚠️  Note: Free tier has 50 requests/day limit`);
});
