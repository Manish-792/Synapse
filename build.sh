#!/bin/bash
set -e

echo "🚀 Starting build process..."
echo "📁 Current directory: $(pwd)"

echo "📦 Installing dependencies..."
cd frontend

# Clean up any existing node_modules and package-lock.json to avoid Rollup issues
echo "🧹 Cleaning up existing dependencies..."
rm -rf node_modules package-lock.json

echo "📦 Installing dependencies with clean slate..."
npm install --legacy-peer-deps

echo "🔨 Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "📂 Build output in: frontend/dist"
