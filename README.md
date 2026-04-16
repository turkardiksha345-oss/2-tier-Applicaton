# Rock Paper Scissors Game

A simple web-based Rock Paper Scissors game with frontend and backend.

## Local Setup

1. Navigate to the backend folder:
   ```
   cd my application/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm start
   ```

4. Open the frontend in a browser:
   - Open `my application/frontend/index.html` in your browser.
   - Or serve it with a local server if needed.

## Docker Setup

### Build Images

1. Build the backend image:
   ```
   docker build -f Dockerfile.backend -t rock-paper-scissors-backend:latest .
   ```

2. Build the frontend image:
   ```
   docker build -f Dockerfile.frontend -t rock-paper-scissors-frontend:latest .
   ```

### Run Containers

1. Run the backend:
   ```
   docker run -p 3000:3000 rock-paper-scissors-backend:latest
   ```

2. Run the frontend:
   ```
   docker run -p 8080:80 rock-paper-scissors-frontend:latest
   ```

3. Access the frontend at http://localhost:8080

## Kubernetes Deployment (K3s)

1. Navigate to the k3s folder:
   ```
   cd my application/k3s
   ```

2. Apply the manifests:
   ```
   kubectl apply -k .
   ```

3. For K3s, the frontend is exposed via NodePort on port 30080. Access it at `http://<node-ip>:30080`

## How to Play

- Click on Rock, Paper, or Scissors.
- The backend will randomly choose and determine the winner.
- Results are displayed on the page.

## Technologies

- Backend: Node.js, Express
- Frontend: HTML, CSS, JavaScript
- Containerization: Docker
- Orchestration: Kubernetes