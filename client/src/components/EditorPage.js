import React, { useEffect, useRef, useState } from "react";
import Client from "./client";
import Editor from "./Editor";
import { initSocket, destroySocket } from "../socket";
import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const initialized = useRef(false);
  const location = useLocation();
  const { roomid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const init = () => {
      socketRef.current = initSocket();

      if (socketRef.current.connected) {
        setIsConnecting(false);
      } else {
        socketRef.current.once("connect", () => setIsConnecting(false));
      }

      socketRef.current.on("connect_error", () => {
        toast.error("Connection failed. Redirecting...");
        navigate("/");
      });

      // Rejoin room on reconnect (handles network drops)
      socketRef.current.on("reconnect", () => {
        toast.success("Reconnected!");
        socketRef.current.emit("join", {
          roomid,
          username: location.state?.username,
        });
      });

      socketRef.current.emit("join", {
        roomid,
        username: location.state?.username,
      });

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
        }
        setClients(clients);
        socketRef.current.emit("sync-code", {
          socketId,
          code: codeRef.current,
        });
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.error(`${username} left the room`);
        setClients((prev) => prev.filter((c) => c.socketId !== socketId));
      });
    };

    init();

    return () => {
      destroySocket();
      initialized.current = false;
    };
  }, []);

  if (!location.state) return <Navigate to="/" />;

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomid);
    toast.success("Room ID copied!");
  };

  const leaveRoom = () => {
    destroySocket();
    navigate("/");
  };

  return (
    <div style={{
      display: "flex", height: "100vh",
      overflow: "hidden", backgroundColor: "#1e1e2e",
    }}>
      {/* Sidebar */}
      <div style={{
        width: "220px", minWidth: "220px", backgroundColor: "#16213e",
        display: "flex", flexDirection: "column", padding: "16px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.4)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <img src="/CollabCO.png" alt="CodeCom"
            style={{ height: "60px", objectFit: "contain" }} />
        </div>

        <hr style={{ borderColor: "#2a2a4a", margin: "8px 0" }} />

        <p style={{
          color: "#888", fontSize: "11px",
          textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px",
        }}>
          Connected — {clients.length}
        </p>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>

        <div>
          <hr style={{ borderColor: "#2a2a4a", margin: "8px 0" }} />
          <button onClick={copyRoomId} style={{
            width: "100%", padding: "9px", marginBottom: "8px",
            backgroundColor: "#00b894", border: "none", borderRadius: "6px",
            color: "white", fontWeight: "600", cursor: "pointer", fontSize: "13px",
          }}>
            Copy Room ID
          </button>
          <button onClick={leaveRoom} style={{
            width: "100%", padding: "9px",
            backgroundColor: "#d63031", border: "none", borderRadius: "6px",
            color: "white", fontWeight: "600", cursor: "pointer", fontSize: "13px",
          }}>
            Leave Room
          </button>
        </div>
      </div>

      {/* Editor */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {isConnecting ? (
          <div style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", height: "100%",
            color: "#aaa", fontSize: "16px",
          }}>
            Connecting...
          </div>
        ) : (
          <Editor
            socketRef={socketRef}
            roomid={roomid}
            onCodeChange={(code) => (codeRef.current = code)}
          />
        )}
      </div>
    </div>
  );
}

export default EditorPage;