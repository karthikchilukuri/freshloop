import { useState } from "react";

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 Welcome to FreshLoop Support" },
  ]);

  /* ==============================
     SEND MESSAGE → BACKEND
  ============================== */

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Server error ❌" },
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* ===== FLOATING BUTTON ===== */}
      <button style={floatingBtn} onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* ===== CHAT WINDOW ===== */}
      {open && (
        <div style={chatBox}>
          <div style={header}>
            FreshLoop Support
            <span
              style={close}
              onClick={() => setOpen(false)}
            >
              ✕
            </span>
          </div>

          {/* Messages */}
          <div style={messagesBox}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={
                  m.from === "user"
                    ? userMsgStyle
                    : botMsgStyle
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={inputBar}>
            <input
              style={inputStyle}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
            />

            <button style={sendBtn} onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================
   PREMIUM STYLES
========================= */

const floatingBtn = {
  position: "fixed",
  bottom: 24,
  right: 24,
  width: 60,
  height: 60,
  borderRadius: "50%",
  border: "none",
  fontSize: 24,
  cursor: "pointer",
  background: "linear-gradient(135deg,#00ff88,#00cc66)",
  boxShadow: "0 0 20px rgba(0,255,136,0.8)",
  zIndex: 9999,
};

const chatBox = {
  position: "fixed",
  bottom: 100,
  right: 24,
  width: 320,
  height: 420,
  background: "#111",
  borderRadius: 18,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 0 40px rgba(0,255,136,0.4)",
  overflow: "hidden",
  zIndex: 9999,
};

const header = {
  padding: 14,
  background: "#00ff88",
  color: "black",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
};

const close = {
  cursor: "pointer",
};

const messagesBox = {
  flex: 1,
  padding: 12,
  overflowY: "auto",
};

const userMsgStyle = {
  alignSelf: "flex-end",
  background: "#00ff88",
  color: "black",
  padding: 10,
  borderRadius: 12,
  marginBottom: 8,
  maxWidth: "80%",
};

const botMsgStyle = {
  alignSelf: "flex-start",
  background: "#222",
  color: "white",
  padding: 10,
  borderRadius: 12,
  marginBottom: 8,
  maxWidth: "80%",
};

const inputBar = {
  display: "flex",
  borderTop: "1px solid #333",
};

const inputStyle = {
  flex: 1,
  padding: 12,
  border: "none",
  outline: "none",
  background: "#1a1a1a",
  color: "white",
};

const sendBtn = {
  padding: "0 16px",
  background: "#00ff88",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};
