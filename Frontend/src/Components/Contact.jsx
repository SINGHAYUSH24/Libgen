import { useState } from 'react';
import { Phone, MessageCircle, Linkedin, Send, MapPin, Mail } from 'lucide-react';
import styles from '../assets/Contact.module.css';
import { useEffect} from "react";
import socket from "../utils/socket";
import { getUser } from '../utils/auth';
import Navbar from './Navbar';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
  socket.emit("join", { roomId: "support-room" });

  socket.on("chatHistory", setMessages);
  socket.on("receiveMessage", (msg) =>
    setMessages((prev) => [...prev, msg])
  );

  return () => {
    socket.off("chatHistory");
    socket.off("receiveMessage");
  };
}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
const handleSubmit = (e) => {
  e.preventDefault();

  socket.emit("sendMessage", {
    roomId: "support-room",
    sender: "User",
    message: formData.message,
  });

  setFormData({ name: "", email: "", message: "" });
};

  const contactInfo = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+91 700-747-1499',
      href: 'https://wa.me/7007471499',
      color: '#25D366'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 (700) 747-1499',
      href: 'tel:+917007471499',
      color: '#0EA5E9'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Ayush-Singh-Profile',
      href: 'https://linkedin.com/in/john-doe-profile',
      color: '#0077B5'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'ayushsingh123102@gmail.com',
      href: 'mailto:hello@example.com',
      color: '#F97316'
    }
  ];

  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.backgroundPattern}></div>
      
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question or want to work together? Drop us a message!
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <div className={styles.cardGrid}>
            {contactInfo.map((item, index) => (
              <a 
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                style={{ '--accent-color': item.color, '--delay': `${index * 0.1}s` }}
              >
                <div className={styles.iconWrapper}>
                  <item.icon className={styles.icon} />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>{item.label}</span>
                  <span className={styles.cardValue}>{item.value}</span>
                </div>
                <div className={styles.cardArrow}>→</div>
              </a>
            ))}
          </div>

          <div className={styles.locationCard}>
            <MapPin className={styles.locationIcon} />
            <div>
              <h3>Based in</h3>
              <p>Phagwara, India</p>
            </div>
          </div>
        </section>
        
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Send a Message</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={styles.textarea}
                placeholder="Write your message here..."
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.loadingSpinner}></span>
              ) : submitted ? (
                <>Message Sent! ✓</>
              ) : (
                <>
                  Send Message
                  <Send className={styles.sendIcon} />
                </>
              )}
            </button>
          </form>
        </section>
        <div className={styles.chat}><h2 className={styles.sectionTitle}>Message History</h2>
        <div className={styles.chatinput}>
            {messages.map((m, i) => (
                <div key={i} className={m.sender==="User"?styles.userdiv:styles.admindiv}><strong style={{color:'greenyellow'}}>{m.sender}:</strong> {m.message}</div>
            ))}
        </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 All rights reserved</p>
      </footer>
    </div>
  );
};

export default Contact;
