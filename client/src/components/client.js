import React from "react";
import Avatar from "react-avatar";

function Client({ username }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      padding: "6px 4px", marginBottom: "6px",
    }}>
      <Avatar name={username} size={34} round="6px" />
      <span style={{
        color: "#e0e0e0", fontSize: "13px", fontWeight: 500,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {username}
      </span>
    </div>
  );
}

export default Client;