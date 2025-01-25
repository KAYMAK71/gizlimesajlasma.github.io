import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

const ContactList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mevcut kullanıcının kişilerini yükle
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.contacts) {
      // YZ botunu otomatik olarak ekle
      const aiBot = {
        id: 'ai-bot',
        name: 'YZ Asistanı',
        isBot: true,
        pin: '123'
      };

      // Eğer bot henüz eklenmemişse ekle
      if (!currentUser.contacts.some(contact => contact.id === 'ai-bot')) {
        currentUser.contacts.push(aiBot);
        AuthService.saveUser(currentUser);
      }

      setContacts(currentUser.contacts);
    }
  }, []);

  // Arama filtrelemesi
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Kişi Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="contacts">
        {filteredContacts.map(contact => (
          <div
            key={contact.id}
            className="contact-item"
            onClick={() => onSelectContact(contact)}
          >
            <div className="contact-name">{contact.name}</div>
            {contact.isBot && <span className="bot-badge">Bot</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList; 