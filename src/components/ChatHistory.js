import React, { useState, useEffect } from 'react';
import { AIBot } from '../services/AIBot';
import { AuthService } from '../services/AuthService';

const ChatHistory = ({ contactId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    loadMessages();
  }, [contactId]);

  const loadMessages = () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      // Kullanıcıya özel sohbet geçmişini yükle
      const chatKey = `chat_${currentUser.id}_${contactId}`;
      const savedMessages = localStorage.getItem(chatKey);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]); // Yeni sohbet başlat
      }
    }
  };

  const addMessage = (newMessage) => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      
      // Sohbet geçmişini kullanıcıya özel olarak kaydet
      const chatKey = `chat_${currentUser.id}_${contactId}`;
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const userMessage = {
        id: Date.now(),
        text: messageInput,
        timestamp: new Date().toISOString(),
        isUser: true
      };
      addMessage(userMessage);

      if (contactId === 'ai-bot') {
        setTimeout(() => {
          const botResponse = {
            id: Date.now() + 1,
            text: AIBot.generateResponse(messageInput),
            timestamp: new Date().toISOString(),
            isBot: true
          };
          addMessage(botResponse);
        }, 1000);
      }
      setMessageInput('');
    }
  };

  return (
    <div className="chat-history">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.isBot ? 'bot' : 'user'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
          />
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
};

export default ChatHistory; 