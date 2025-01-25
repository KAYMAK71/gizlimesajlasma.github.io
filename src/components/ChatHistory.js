import React, { useState, useEffect } from 'react';

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
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        timestamp: new Date().toISOString(),
      };
      addMessage(newMessage);
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