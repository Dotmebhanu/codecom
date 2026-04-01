import { io } from "socket.io-client";

let socket = null;

export const initSocket = () => {
  // If socket exists but is disconnected, destroy it and make fresh one
  if (socket && !socket.connected) {
    socket.removeAllListeners();
    socket = null;
  }

  if (!socket) {
    socket = io(process.env.REACT_APP_BACKEND_URL, {
      "force new connection": true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 10000,
      transports: ["websocket"],
    });
  }

  return socket;
};

export const destroySocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};