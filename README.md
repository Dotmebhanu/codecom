# 💻 CodeCom — Real-Time Code Collaboration Platform

> **Code together. Ship faster.** — A real-time collaborative coding platform where developers join shared rooms and write code simultaneously.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io)
[![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://codecom-delta.vercel.app)

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🚀 **App** | [codecom-delta.vercel.app](https://codecom-delta.vercel.app) |
| 🖥️ **Server** | [codecom-server.onrender.com](https://codecom-server.onrender.com) |

---

## 🧠 What is CodeCom?

**CodeCom** is a real-time code collaboration web application built with React and Socket.IO. Developers can create or join a shared coding room and write code together — all changes sync instantly across every connected client via WebSockets.

No sign-up friction, no complex setup — just open, share a Room ID, and collaborate live.

Think of it as a self-hosted alternative to CodeShare or CollabEdit, built from scratch with React + Node.js + Socket.IO.

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Real-Time Sync** | Code changes broadcast instantly to all room participants via Socket.IO WebSockets |
| 🚪 **Room System** | Create or join rooms with a unique UUID — each room is an isolated collaboration session |
| 👥 **Live Presence** | See all connected users in the sidebar with avatars in real time |
| 🎨 **Syntax Highlighting** | CodeMirror editor with Dracula theme and JavaScript syntax support |
| 🔄 **Auto Code Sync** | New users joining get the current room code synced instantly |
| 🌐 **Zero Sign-Up** | Jump straight into coding — no account required |

---

## 🏗️ Architecture
```
┌────────────────────────────────────────┐
│         React App (Client)             │
│   ┌──────────────────────────────┐     │
│   │  Home — Create/Join Room     │     │
│   │  EditorPage — Sidebar + UI   │     │
│   │  Editor — CodeMirror         │     │
│   └────────────┬─────────────────┘     │
│                │ WebSocket (Socket.IO)  │
└────────────────┼───────────────────────┘
                 │
┌────────────────▼───────────────────────┐
│       Node.js + Express Server         │
│   ┌──────────────────────────────┐     │
│   │  Socket.IO Event Handlers    │     │
│   │  - join                      │     │
│   │  - code-change               │     │
│   │  - sync-code                 │     │
│   │  - disconnecting             │     │
│   └──────────────────────────────┘     │
│   Room state managed in-memory         │
└────────────────────────────────────────┘
```

---

## 📁 Project Structure
```
codecom/
├── client/                        # React Frontend
│   ├── public/
│   │   ├── CollabCO.png           # App logo
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Client.js          # Connected user avatar
│   │   │   ├── Editor.js          # CodeMirror editor
│   │   │   ├── EditorPage.js      # Room page with sidebar
│   │   │   └── Home.js            # Landing / join page
│   │   ├── App.js
│   │   ├── socket.js              # Socket.IO singleton
│   │   └── index.js
│   ├── .env                       # REACT_APP_BACKEND_URL
│   └── package.json
│
├── serverside/                    # Node.js Backend
│   ├── index.js                   # Express + Socket.IO server
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, CodeMirror 5, Bootstrap 5 |
| **Runtime** | Node.js |
| **Server Framework** | Express.js |
| **Real-Time Engine** | Socket.IO (WebSockets) |
| **Deployment** | Vercel (client) + Render (server) |
| **State Management** | In-memory server-side room state |

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v16+ installed

### 1. Clone the repo
```bash
git clone https://github.com/Dotmebhanu/codecom.git
cd codecom
```

### 2. Start the server
```bash
cd serverside
npm install
node index.js
```

### 3. Start the client
```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```
REACT_APP_BACKEND_URL=http://localhost:4000
```
```bash
npm start
```

### 4. Open in browser
```
http://localhost:3000
```

Enter a username, generate a Room ID, share it with a friend, and start coding together live!

---

## 🔄 How It Works
```
1. User A opens the app → enters username → clicks "Create New Room"
2. A unique UUID room ID is generated
3. User A shares the Room ID with User B
4. User B enters the same Room ID + their username → joins the room
5. User A types code → Socket.IO emits 'code-change' event
6. Server broadcasts to all users in the room
7. User B's editor updates in real-time — under 65ms avg latency
```

---

## 🔌 Socket.IO Events

| Event | Direction | Description |
|---|---|---|
| `join` | Client → Server | User joins a room with username |
| `joined` | Server → Client | Confirms join, sends current client list |
| `code-change` | Client ↔ Server | Broadcasts code update to room |
| `sync-code` | Client → Server | Sends current code to newly joined user |
| `disconnected` | Server → Client | Notifies room when a user leaves |

---

## 🔮 Roadmap

- [x] Real-time code sync via WebSockets
- [x] Live user presence with avatars
- [x] CodeMirror editor with Dracula theme
- [x] Deployed on Vercel + Render
- [ ] Multi-language support (Python, Java, C++)
- [ ] In-browser code execution
- [ ] Persistent rooms with MongoDB
- [ ] Chat panel within rooms
- [ ] Export session as `.zip`

---

## 🤝 Contributing

1. Fork this repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add feature"`
4. Push and open a Pull Request

---

## 👤 Author

**Bhanuprakash Reddy** — [@Dotmebhanu](https://github.com/Dotmebhanu)

> Built to make real-time collaboration simple — from pair programming sessions to live technical interviews.

---

<p align="center">
  <strong>⭐ Star this repo if CodeCom helped you collaborate better!</strong>
</p>
