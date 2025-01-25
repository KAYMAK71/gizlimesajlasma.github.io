import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import ChatHistory from './components/ChatHistory';
import { AuthService } from './services/AuthService';
import './App.css';

function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // YZ Asistanı'nı varsayılan olarak seç
    const aiBot = {
      id: 'ai-bot',
      name: 'YZ Asistanı',
      isBot: true,
      pin: '123'
    };
    setSelectedContact(aiBot);
  }, []);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ContactList onSelectContact={handleContactSelect} />
      </div>
      <div className="chat-area">
        {selectedContact && <ChatHistory contactId={selectedContact.id} />}
      </div>
    </div>
  );
}

export default App; 