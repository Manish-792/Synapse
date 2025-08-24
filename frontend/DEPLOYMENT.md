# Synapse AI Frontend - Vercel Deployment Guide

This guide will help you deploy the Synapse AI Frontend to Vercel.

## 🚀 Quick Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

### Option 2: Using Vercel Dashboard

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your repository
3. **Configure**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 🔧 Environment Variables

Set these environment variables in your Vercel dashboard:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Your backend API URL | ✅ | `https://your-backend.onrender.com` |
| `VITE_APP_NAME` | Application name | ❌ | `Synapse AI` |
| `VITE_APP_VERSION` | Application version | ❌ | `1.0.0` |

### Setting Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add each variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.onrender.com`
   - **Environment**: Production, Preview, Development

## 📡 API Configuration

### Development
```env
VITE_API_URL=http://localhost:3001
```

### Production
```env
VITE_API_URL=https://your-backend-name.onrender.com
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

## 🏗️ Build Process

The build process is optimized for Vercel:

1. **Install Dependencies**: `npm install`
2. **Build Application**: `npm run build`
3. **Output Directory**: `dist/`
4. **Framework**: Vite (automatically detected)

## 📊 Performance Optimizations

### Vercel-specific optimizations:
- **✅ Automatic HTTPS**: SSL certificates included
- **✅ CDN**: Global content delivery network
- **✅ Edge Functions**: Serverless functions at the edge
- **✅ Image Optimization**: Automatic image optimization
- **✅ Caching**: Smart caching strategies

### Build optimizations:
- **✅ Code Splitting**: Automatic route-based splitting
- **✅ Tree Shaking**: Unused code elimination
- **✅ Minification**: CSS and JS minification
- **✅ Compression**: Gzip/Brotli compression

## 🔒 Security Features

### Headers configured in vercel.json:
- **✅ X-Content-Type-Options**: Prevents MIME type sniffing
- **✅ X-Frame-Options**: Prevents clickjacking
- **✅ X-XSS-Protection**: XSS protection
- **✅ Cache-Control**: Optimized caching for assets

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check Node.js version (requires >=18.0.0)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **API Connection Issues**:
   - Verify `VITE_API_URL` is set correctly
   - Check CORS configuration on backend
   - Ensure backend is deployed and running

3. **Environment Variables Not Working**:
   - Ensure variables start with `VITE_`
   - Redeploy after adding new variables
   - Check variable names are correct

### Support:
- Check Vercel build logs
- Verify environment variables
- Test locally first with `npm run dev`

## 📈 Scaling

- **Free Plan**: Unlimited deployments, 100GB bandwidth
- **Pro Plan**: Team collaboration, custom domains
- **Enterprise**: Advanced analytics, priority support

## 🔄 Continuous Deployment

### Automatic Deployments:
- **✅ Git Integration**: Automatic deployments on push
- **✅ Preview Deployments**: Automatic preview URLs for PRs
- **✅ Branch Deployments**: Deploy different branches to different URLs

### Manual Deployments:
```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## 📱 Mobile Optimization

Your app is optimized for mobile:
- **✅ Responsive Design**: Works on all screen sizes
- **✅ Touch-friendly**: Optimized for touch interactions
- **✅ Fast Loading**: Optimized for mobile networks
- **✅ PWA Ready**: Progressive Web App capabilities

---

**Happy Deploying! 🚀**
