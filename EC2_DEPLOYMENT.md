# EC2 DEPLOYMENT GUIDE for Rock Paper Scissors Game

## Quick Setup (5 minutes)

### 1. SSH into your EC2 instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### 2. Run the automated setup script
```bash
curl -O https://raw.githubusercontent.com/your-repo/main/ec2-setup.sh
chmod +x ec2-setup.sh
./ec2-setup.sh
```

Or manually:
```bash
sudo apt-get update
sudo apt-get install -y nodejs npm
npm install -g pm2
```

### 3. Clone your repository
```bash
git clone <your-repo-url>
cd 2-tier-Applicaton/backend
npm install
```

### 4. Start the backend with PM2
```bash
pm2 start server.js --name "rps-game"
pm2 save
pm2 startup
```

### 5. Deploy the frontend (choose one method)

**Method A: Using Python (Quick & Easy)**
```bash
cd ../frontend
python3 -m http.server 80
```

**Method B: Using nginx (Recommended for production)**
```bash
sudo apt-get install -y nginx
sudo rm /var/www/html/*
sudo cp frontend/* /var/www/html/
sudo systemctl start nginx
sudo systemctl enable nginx
```

**Method C: Using Node.js http-server**
```bash
cd frontend
sudo npm install -g http-server
sudo http-server -p 80
```

### 6. Configure Security Group
Make sure your EC2 security group allows inbound traffic on:
- **Port 80** (HTTP) - for the frontend
- **Port 3000** (Custom TCP) - for the backend API

### 7. Access your application
Open your browser and go to:
```
http://<your-ec2-public-ip>?api=http://<your-ec2-public-ip>:3000
```

Or if using a custom domain:
```
https://your-domain.com?api=https://your-domain.com:3000
```

## Using Environment Variables (Optional)

You can set the API URL dynamically by modifying the frontend's JavaScript:

Create an `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://<your-ec2-public-ip>:3000
```

Then the frontend will automatically connect to this URL.

## Monitoring and Logs

### With PM2:
```bash
# View logs
pm2 logs rps-game

# Monitor
pm2 monit

# Restart
pm2 restart rps-game

# Stop
pm2 stop rps-game
```

### Without PM2:
Check the terminal where you started `npm start` for logs.

## Troubleshooting

### Issue: "Connection refused" error
- Check if the backend is running: `pm2 list`
- Check security group allows port 3000
- Verify IP address is correct

### Issue: Frontend shows server error
- Make sure you're using the correct EC2 public IP in the query parameter
- Check browser console (F12) for actual error messages
- Verify CORS is enabled in backend (it is by default)

### Issue: Port 80 requires sudo
If you get permission denied for port 80:
```bash
sudo http-server -p 80
# OR use port 8080 and access via http://<ip>:8080
http-server -p 8080
```

## Production Deployment Best Practices

1. **Use a reverse proxy** (nginx/Apache) in front of your app
2. **Use HTTPS** with Let's Encrypt certificates
3. **Enable auto-restart** with PM2 or systemd
4. **Monitor performance** with PM2 Plus or CloudWatch
5. **Use environment variables** for configuration
6. **Implement rate limiting** on the API
7. **Add logging** to track errors and usage

## Cleanup

To stop everything:
```bash
pm2 stop all
pm2 delete all

# Or manually
pkill -f "node server.js"
sudo systemctl stop nginx  # if using nginx
```

---

For more details, see the main README.md file.
