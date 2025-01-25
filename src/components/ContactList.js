import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import '../styles/ContactList.css';

const ContactList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // YZ Asistanı'nı oluştur
    const aiBot = {
      id: 'ai-bot',
      name: 'YZ Asistanı',
      isBot: true,
      pin: '123',
      description: 'Yapay Zeka Sohbet Botu'
    };

    // Asistanı direkt olarak contacts listesine ekle
    setContacts([aiBot]);
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
            className={`contact-item ${contact.isBot ? 'bot-contact' : ''}`}
            onClick={() => onSelectContact(contact)}
          >
            <div className="contact-avatar">
              {contact.isBot ? '🤖' : contact.name.charAt(0)}
            </div>
            <div className="contact-info">
              <div className="contact-name">
                {contact.name}
              </div>
              {contact.description && (
                <div className="contact-description">{contact.description}</div>
              )}
              {contact.isBot && <div className="bot-badge">Bot</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList; 