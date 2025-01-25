import React, { useState, useEffect } from 'react';
import { AIBot } from '../services/AIBot';

const ChatHistory = ({ contactId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // LocalStorage'dan sohbet geçmişini yükle
    const loadMessages = () => {
      const savedMessages = localStorage.getItem(`chat_${contactId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    };
    loadMessages();
  }, [contactId]);

  const addMessage = (newMessage) => {
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    // Sohbet geçmişini localStorage'a kaydet
    localStorage.setItem(`chat_${contactId}`, JSON.stringify(updatedMessages));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Kullanıcı mesajı
      const userMessage = {
        id: Date.now(),
        text: messageInput,
        timestamp: new Date().toISOString(),
        isUser: true
      };
      addMessage(userMessage);

      // Eğer seçili kişi bot ise
      if (contactId === 'ai-bot') {
        // Bot cevabı
        setTimeout(() => {
          const botResponse = {
            id: Date.now() + 1,
            text: AIBot.generateResponse(messageInput),
            timestamp: new Date().toISOString(),
            isBot: true
          };
          addMessage(botResponse);
        }, 1000); // 1 saniyelik gecikme ile bot cevap versin
      }

      setMessageInput('');
    }
  };

  return (
    <div>
      {/* Render your messages and input form here */}
    </div>
  );
};

export default ChatHistory; 