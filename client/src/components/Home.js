import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  width: "100%", padding: "12px 14px", marginBottom: "14px",
  backgroundColor: "#0f3460", border: "1px solid #2a2a5a",
  borderRadius: "8px", color: "#e0e0e0", fontSize: "14px", outline: "none",
};

const btnPrimary = {
  width: "100%", padding: "12px", backgroundColor: "#00b894",
  border: "none", borderRadius: "8px", color: "white",
  fontWeight: "700", fontSize: "15px", cursor: "pointer",
};

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    setRoomId(uuid());
    toast.success("Room ID created!");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }
    navigate(`/editor/${roomId}`, { state: { username } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") joinRoom();
  };

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#1a1a2e",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        backgroundColor: "#16213e", borderRadius: "16px",
        padding: "40px 36px", width: "100%", maxWidth: "400px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <img src="CollabCO.png" alt="CodeCom" style={{ height: "80px", objectFit: "contain" }} />
          <h4 style={{ color: "#e0e0e0", marginTop: "12px", fontWeight: 600 }}>
            Join a Coding Room
          </h4>
        </div>

        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />

        <button onClick={joinRoom} style={btnPrimary}>
          Join Room
        </button>

        <p style={{ textAlign: "center", color: "#888", marginTop: "20px", fontSize: "14px" }}>
          Don't have a Room ID?{" "}
          <span
            onClick={generateRoomId}
            style={{ color: "#00b894", cursor: "pointer", fontWeight: 600 }}
          >
            Create New Room
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;