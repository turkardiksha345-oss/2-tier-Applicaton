# Rock Paper Scissors Game

A modern web-based Rock Paper Scissors game with a beautiful UI, featuring a Node.js backend and responsive frontend. Now with enhanced styling, animations, and EC2/Kubernetes support.

## Features

✨ **Modern UI** - Gradient backgrounds, smooth animations, and responsive design
📊 **Stats Tracking** - Track your wins, losses, and ties
🎮 **Smooth Gameplay** - Real-time game results with visual feedback
🚀 **Cloud-Ready** - Deploy on EC2, Docker, or Kubernetes

## Local Setup

1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the backend server:
   ```powershell
   npm start
   ```

4. Open the frontend in a browser:
   - Open `frontend/index.html` in your browser
   - Or navigate to `http://localhost` if using a local web server

The frontend will automatically connect to `http://localhost:3000` for local development.

## EC2 Deployment

### Prerequisites
- EC2 instance running with Node.js installed
- Security group with ports 80 and 3000 open
- Public IP address assigned

### Setup on EC2

1. **Install Node.js** (if not already installed):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone or upload your application** to the EC2 instance:
   ```bash
   cd ~
   git clone <your-repo-url>  # or upload files manually
   cd 2-tier-Applicaton
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

4. **Start the backend server** (keep it running):
   ```bash
   npm start
   ```
   Your backend will be accessible at `http://<your-ec2-public-ip>:3000`

5. **Deploy the frontend** (in a new terminal):
   
   **Option A: Using Python's built-in server**
   ```bash
   cd frontend
   python3 -m http.server 80
   # Or for Python 2
   python -m SimpleHTTPServer 80
   ```
   Then open `http://<your-ec2-public-ip>` in your browser

   **Option B: Using Node.js http-server**
   ```bash
   cd frontend
   npm install -g http-server
   http-server -p 80
   ```

   **Option C: Using nginx**
   ```bash
   sudo apt-get install -y nginx
   sudo cp frontend/* /var/www/html/
   sudo systemctl start nginx
   ```

6. **Configure the frontend to talk to your EC2 backend**:
   - Open the frontend in your browser: `http://<your-ec2-public-ip>`
   - Add the query parameter with your instance IP: `http://<your-ec2-public-ip>?api=http://<your-ec2-public-ip>:3000`
   - This will be saved in localStorage for future sessions

### Using PM2 for persistent backend

For production use, install PM2 to keep your backend running:

```bash
npm install -g pm2
cd backend
pm2 start server.js --name "rps-backend"
pm2 save
pm2 startup
```

To stop: `pm2 stop rps-backend`
To restart: `pm2 restart rps-backend`

## Docker Setup

### Build Images

From the root directory:

1. Build the backend image:
   ```powershell
   docker build -f Dockerfile.backend -t rock-paper-scissors-backend:latest .
   ```

2. Build the frontend image:
   ```powershell
   docker build -f Dockerfile.frontend -t rock-paper-scissors-frontend:latest .
   ```

### Run Containers

1. Run the backend:
   ```powershell
   docker run -p 3000:3000 rock-paper-scissors-backend:latest
   ```

2. Run the frontend (in a new terminal):
   ```powershell
   docker run -p 8080:80 rock-paper-scissors-frontend:latest
   ```

3. Access the frontend at `http://localhost:8080`

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
```

Then run:
```bash
docker-compose up
```

## Kubernetes Deployment (K3s)

1. Navigate to the k3s folder:
   ```powershell
   cd k3s
   ```

2. Apply the manifests:
   ```powershell
   kubectl apply -k .
   ```

3. For K3s, the frontend is exposed via NodePort on port 30080. Access it at:
   ```
   http://<node-ip>:30080
   ```

## How to Play

1. Click on Rock, Paper, or Scissors
2. The computer will make its choice
3. See who wins!
4. Your stats are automatically saved in the browser

## Technologies

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: HTML5, CSS3 with gradients and animations, Vanilla JavaScript
- **Containerization**: Docker
- **Orchestration**: Kubernetes/K3s
- **Deployment**: EC2, Docker, K3s