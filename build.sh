#!/bin/bash
set -e

echo "🚀 Starting build process..."
echo "📁 Current directory: $(pwd)"

echo "📦 Installing dependencies..."
cd frontend
npm install --legacy-peer-deps

echo "🔨 Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "📂 Build output in: frontend/dist"
