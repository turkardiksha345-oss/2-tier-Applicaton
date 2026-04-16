#!/bin/bash

# Rock Paper Scissors - EC2 Quick Setup Script
# This script sets up the application on an EC2 instance

echo "🚀 Setting up Rock Paper Scissors application on EC2..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js
echo "🔧 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install git (if needed)
echo "📥 Installing git..."
sudo apt-get install -y git

# Install PM2 globally for process management
echo "⚙️ Installing PM2 for process management..."
sudo npm install -g pm2

# Clone or navigate to your repo
# You can modify this part based on your repo URL
echo "📂 Setting up application..."
cd ~

# If cloning
# git clone <your-repo-url>

# Navigate to the application directory
cd 2-tier-Applicaton

# Install backend dependencies
echo "📚 Installing backend dependencies..."
cd backend
npm install
cd ..

# Get the EC2 public IP
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Your EC2 Public IP: $EC2_IP"
echo ""
echo "🎮 To start the application:"
echo "   1. Start the backend: cd backend && npm start"
echo "   2. In another terminal, start the frontend:"
echo "      - cd frontend && python3 -m http.server 80"
echo "      - OR: cd frontend && npx http-server -p 80"
echo ""
echo "🌐 Then access the game at:"
echo "   http://$EC2_IP?api=http://$EC2_IP:3000"
echo ""
echo "🔒 Make sure your EC2 security group allows:"
echo "   - Port 80 (HTTP) - for frontend"
echo "   - Port 3000 (API) - for backend"
