# Synapse AI Backend - Deployment Guide

This guide will help you deploy the Synapse AI Backend to Render.

## 🚀 Quick Deploy to Render

### Option 1: Using render.yaml (Recommended)

1. **Fork/Clone this repository** to your GitHub account
2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Sign up/Login with your GitHub account
   - Click "New +" → "Blueprint"
   - Connect your repository
3. **Deploy**:
   - Render will automatically detect the `render.yaml` file
   - Click "Apply" to deploy

### Option 2: Manual Setup

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service**:
   - **Name**: `synapse-ai-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

## 🔧 Environment Variables

Set these environment variables in your Render dashboard:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Google GenAI API key | ✅ | `AIzaSyC...` |
| `OPENWEATHER_API_KEY` | Your OpenWeather API key | ✅ | `1234567890abcdef...` |
| `NEWS_API_KEY` | Your News API key | ✅ | `1234567890abcdef...` |
| `NODE_ENV` | Environment mode | ❌ | `production` |
| `CORS_ORIGIN` | Frontend domain for CORS | ❌ | `https://your-app.onrender.com` |

### Getting API Keys

#### Google GenAI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to Render environment variables

#### OpenWeather API Key
1. Go to [OpenWeather API](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from your account dashboard
4. Add it to Render environment variables

#### News API Key
1. Go to [News API](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from your account dashboard
4. Add it to Render environment variables

## 📡 API Endpoints

Once deployed, your API will be available at:
- **Base URL**: `https://your-app-name.onrender.com`
- **Health Check**: `GET /health`
- **Chat Endpoint**: `POST /chat`
- **API Info**: `GET /`

## 🔄 Updating Frontend Configuration

After deployment, update your frontend's environment variables:

```env
VITE_API_URL=https://your-backend-name.onrender.com
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

## 📊 Monitoring

- **Health Check**: `/health` endpoint for monitoring
- **Logs**: Available in Render dashboard
- **Metrics**: Built-in performance monitoring

## 🔒 Security Notes

- ✅ CORS is configured for production
- ✅ Rate limiting is handled by Google API
- ✅ Environment variables are secure
- ✅ Error handling prevents information leakage

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**: Check Node.js version (requires >=18.0.0)
2. **API Key Error**: Verify `GEMINI_API_KEY` is set correctly
3. **CORS Error**: Update `CORS_ORIGIN` to match your frontend domain
4. **Rate Limit**: Free tier has 50 requests/day limit

### Support:
- Check Render logs in the dashboard
- Verify environment variables
- Test locally first with `npm run dev`

## 📈 Scaling

- **Free Plan**: 750 hours/month, sleeps after 15 minutes of inactivity
- **Paid Plans**: Always-on, custom domains, SSL certificates
- **Auto-scaling**: Available on paid plans

---

**Happy Deploying! 🚀**
