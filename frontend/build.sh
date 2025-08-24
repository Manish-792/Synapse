#!/bin/bash
set -e

echo "🚀 Starting build process..."
echo "📁 Current directory: $(pwd)"

# Force clean install to avoid Rollup issues
echo "🧹 Force cleaning existing dependencies..."
rm -rf node_modules package-lock.json .npm

echo "📦 Installing dependencies with clean slate..."
npm install --legacy-peer-deps --force

echo "🔨 Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "📂 Build output in: dist"
