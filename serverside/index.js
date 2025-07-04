const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Configure CORS for Express
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Initialize Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001', // Replace with your frontend URL
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log("User connected");

    // You can also handle disconnection and other events
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
