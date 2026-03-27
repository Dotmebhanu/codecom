# 💻 CodeCom — Real-Time Code Collaboration Platform

> **Code together. Ship faster.** — A real-time collaborative coding platform where developers join shared rooms and write code simultaneously.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io)
[![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![HTML5](https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)

---

## 🧠 What is CodeCom?

**CodeCom** is a lightweight, real-time code collaboration web application. Developers can create or join a shared coding room and write code together — all changes sync instantly across every connected client via WebSockets. No sign-up friction, no complex setup — just open, share a room, and collaborate.

Think of it as a self-hosted alternative to CodeShare or CollabEdit, built from scratch with Node.js and Socket.IO.

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Real-Time Sync** | Code changes broadcast instantly to all room participants via Socket.IO WebSockets |
| 🚪 **Room System** | Create or join named rooms — each room is an isolated collaboration session |
| 🖊️ **Shared Code Editor** | Collaborative editor shared live across all connected users in a room |
| 🌐 **Zero Sign-Up** | Jump straight into coding — no account required |
| 📦 **Lightweight Stack** | Pure Node.js backend + Vanilla JS frontend — fast to run, easy to deploy |

---

## 🏗️ Architecture

```
┌────────────────────────────────────────┐
│           Browser (Client)             │
│   ┌──────────────────────────────┐     │
│   │  HTML + CSS + Vanilla JS     │     │
│   │  Code Editor UI              │     │
│   │  Room Join/Create UI         │     │
│   └────────────┬─────────────────┘     │
│                │ WebSocket (Socket.IO)  │
└────────────────┼───────────────────────┘
                 │
┌────────────────▼───────────────────────┐
│         Node.js + Express Server       │
│   ┌──────────────────────────────┐     │
│   │  Socket.IO Event Handlers    │     │
│   │  - join-room                 │     │
│   │  - code-change               │     │
│   │  - send-message              │     │
│   │  - disconnect                │     │
│   └──────────────────────────────┘     │
│                                        │
│   Room State managed in-memory         │
└────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
codecom/
├── client/                  # Frontend (Vanilla JS, HTML, CSS)
│   ├── index.html           # Landing / room entry page
│   ├── editor.html          # Main collaborative editor page
│   ├── style.css            # UI styling
│   └── app.js               # Client-side Socket.IO logic
│
├── serverside/              # Backend (Node.js + Express + Socket.IO)
│   ├── index.js             # Express server + Socket.IO event handlers
│   └── package.json         # Dependencies
│
└── .gitignore
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Server Framework** | Express.js |
| **Real-Time Engine** | Socket.IO (WebSockets) |
| **Frontend** | Vanilla JavaScript, HTML5, CSS3 |
| **State Management** | In-memory (server-side room state) |

No heavy frameworks. No database needed. Just clean, performant WebSocket-driven collaboration.

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v16+ installed

### 1. Clone the repo

```bash
git clone https://github.com/Dotmebhanu/codecom.git
cd codecom
```

### 2. Install dependencies

```bash
cd serverside
npm install
```

### 3. Start the server

```bash
node index.js
```

### 4. Open in browser

```
http://localhost:3000
```

Enter a room name, share the same room name with a friend, and start coding together live!

---

## 🔄 How It Works

```
1. User A opens the app → enters room name "team-session"
2. Server creates a room and stores current code state
3. User B opens app → joins "team-session"
4. User A types code → Socket.IO emits 'code-change' event
5. Server broadcasts to all users in "team-session"
6. User B's editor updates in real-time — zero lag
```

All synchronization is event-driven via WebSockets, making it snappy and bandwidth-efficient compared to HTTP polling approaches.

---

## 🔌 Socket.IO Events

| Event | Direction | Description |
|---|---|---|
| `join-room` | Client → Server | User joins a named room |
| `code-change` | Client → Server | Emits code update |
| `code-update` | Server → Client | Broadcasts code to room |
| `send-message` | Client → Server | User sends a chat message |
| `receive-message` | Server → Client | Delivers message to room |
| `user-joined` | Server → Client | Notifies room of new participant |
| `disconnect` | Auto | Handles user leaving gracefully |

---

## 🔮 Roadmap

- [ ] Syntax highlighting (CodeMirror / Monaco Editor integration)
- [ ] Multi-language support (Python, Java, C++, etc.)
- [ ] In-browser code execution
- [ ] Persistent rooms with MongoDB
- [ ] User authentication & named participants
- [ ] Export session as a `.zip` file
- [ ] Docker containerization

---

## 🤝 Contributing

1. Fork this repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push and open a Pull Request

All contributions welcome — from bug fixes to new features!

---


## 👤 Author

**Bhanu** — [@Dotmebhanu](https://github.com/Dotmebhanu)

> Built to make real-time collaboration simple — from pair programming sessions to live technical interviews.

---

<p align="center">
  <strong>⭐ Star this repo if CodeCom helped you collaborate better!</strong>
</p>
