import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

function Editor({ socketRef, roomid, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) return; // prevent double init

    const editor = CodeMirror.fromTextArea(
      document.getElementById("realTimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    editorRef.current = editor;
    editor.setSize(null, "100%");

    editor.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      if (origin !== "setValue") {
        socketRef.current.emit("code-change", { roomid, code });
      }
    });
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handler = ({ code }) => {
      if (code !== null && editorRef.current) {
        editorRef.current.setValue(code);
      }
    };

    socket.on("code-change", handler);
    return () => socket.off("code-change", handler);
  }, [socketRef.current]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <textarea id="realTimeEditor" />
    </div>
  );
}

export default Editor;