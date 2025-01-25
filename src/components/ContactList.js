import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import './ContactList.css';

const ContactList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    // YZ Asistanı'nı oluştur
    const aiBot = {
      id: 'ai-bot',
      name: 'YZ Asistanı',
      isBot: true,
      pin: '123'
    };

    let currentContacts = [];
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      // Kullanıcının mevcut kişileri
      currentContacts = currentUser.contacts || [];
      
      // Bot yoksa ekle
      if (!currentContacts.some(contact => contact.id === 'ai-bot')) {
        currentContacts = [aiBot, ...currentContacts];
        
        // Kullanıcı bilgilerini güncelle
        currentUser.contacts = currentContacts;
        AuthService.saveUser(currentUser);
      } else {
        // Bot varsa en başa taşı
        currentContacts = currentContacts.filter(c => c.id !== 'ai-bot');
        currentContacts = [aiBot, ...currentContacts];
      }
    } else {
      // Kullanıcı yoksa sadece botu göster
      currentContacts = [aiBot];
    }

    setContacts(currentContacts);
  };

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
            <div className="contact-name">
              {contact.name}
              {contact.isBot && <span className="bot-badge">Bot</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="version-number">v1.2</div>
    </div>
  );
};

export default ContactList; 