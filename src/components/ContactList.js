import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

const ContactList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // YZ Asistanı'nı oluştur
    const aiBot = {
      id: 'ai-bot',
      name: 'YZ Asistanı',
      isBot: true,
      pin: '123'
    };

    // Mevcut kullanıcının kişilerini yükle
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      // Eğer contacts dizisi yoksa oluştur
      if (!currentUser.contacts) {
        currentUser.contacts = [];
      }

      // Eğer bot henüz eklenmemişse ekle
      if (!currentUser.contacts.some(contact => contact.id === 'ai-bot')) {
        currentUser.contacts.unshift(aiBot); // En başa ekle
        AuthService.saveUser(currentUser);
      } else {
        // Bot zaten varsa, en başa taşı
        const botIndex = currentUser.contacts.findIndex(contact => contact.id === 'ai-bot');
        if (botIndex > 0) {
          const [bot] = currentUser.contacts.splice(botIndex, 1);
          currentUser.contacts.unshift(bot);
          AuthService.saveUser(currentUser);
        }
      }

      setContacts(currentUser.contacts);
    } else {
      // Kullanıcı yoksa sadece botu göster
      setContacts([aiBot]);
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