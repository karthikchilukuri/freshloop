import { useState } from "react";

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "👋 Hi! How can I help you?", from: "bot" },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, from: "user" };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((m) => [
        ...m,
        { text: data.reply, from: "bot" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { text: "⚠️ Server error", from: "bot" },
      ]);
    }
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={chatBtn}
      >
        💬
      </button>

      {/* 🪟 Chat Window */}
      {open && (
        <div style={box}>
          <div style={header}>
            🤖 FreshLoop Support
            <span onClick={() => setOpen(false)} style={close}>✕</span>
          </div>

          <div style={messagesBox}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...msg,
                  alignSelf:
                    m.from === "user"
                      ? "flex-end"
                      : "flex-start",
                  background:
                    m.from === "user"
                      ? "#00ff88"
                      : "#222",
                  color:
                    m.from === "user"
                      ? "#000"
                      : "#fff",
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={inputStyle}
            />
            <button onClick={sendMessage} style={send}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ===== STYLES ===== */

const chatBtn = {
  position: "fixed",
  bottom: 20,
  right: 90, // beside profile
  width: 55,
  height: 55,
  borderRadius: "50%",
  border: "none",
  fontSize: 24,
  background: "#00ff88",
  cursor: "pointer",
  boxShadow: "0 0 15px #00ff88",
  zIndex: 1000,
};

const box = {
  position: "fixed",
  bottom: 90,
  right: 20,
  width: 320,
  height: 420,
  background: "#111",
  borderRadius: 16,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 0 30px rgba(0,255,136,0.4)",
  overflow: "hidden",
  zIndex: 1000,
};

const header = {
  padding: 14,
  background: "#00ff88",
  color: "#000",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
};

const close = { cursor: "pointer" };

const messagesBox = {
  flex: 1,
  padding: 12,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  overflowY: "auto",
};

const msg = {
  padding: "8px 12px",
  borderRadius: 12,
  maxWidth: "75%",
};

const inputArea = {
  display: "flex",
  padding: 10,
  borderTop: "1px solid #333",
};

const inputStyle = {
  flex: 1,
  padding: 8,
  borderRadius: 8,
  border: "none",
};

const send = {
  marginLeft: 8,
  background: "#00ff88",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
};
