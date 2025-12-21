import { useEffect, useState } from "react";
import styles from "../assets/AdminChat.module.css";
import socket from "../utils/socket";
const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join", { roomId: "support-room" });

    socket.on("chatHistory", (data) => setMessages(data));
    socket.on("receiveMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => {
      socket.off();
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;
    
    socket.emit("sendMessage", {
      roomId: "support-room",
      sender: "Admin",
      message: text,
    });
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className={styles.headerText}>
          <h2>Support Chat</h2>
          <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className={styles.statusDot}></span>
            Support Room
          </p>
        </div>
      </header>

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>No messages yet</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.messageWrapper} ${
                m.sender === "Admin" ? styles.admin : styles.user
              }`}
            >
              <div
                className={`${styles.message} ${
                  m.sender === "Admin" ? styles.admin : styles.user
                }`}
              >
                <div className={styles.messageSender}>{m.sender}</div>
                <div className={styles.messageContent}>{m.message}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.textInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={!text.trim()}
        >
          Send
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
