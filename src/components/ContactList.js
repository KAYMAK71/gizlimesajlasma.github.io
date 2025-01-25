import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import '../styles/ContactList.css';

const ContactList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    // Tüm kullanıcıları al
    const allUsers = AuthService.getUsers();
    
    // Bot ve diğer kullanıcıları ayır
    const aiBot = {
      id: 'ai-bot',
      name: 'YZ Asistanı',
      isBot: true,
      description: 'Yapay Zeka Sohbet Botu'
    };

    // Mevcut kullanıcı hariç diğer kullanıcıları filtrele
    const otherUsers = allUsers.filter(user => user.email !== currentUser.email);
    
    // Bot ve diğer kullanıcıları birleştir
    setContacts([aiBot, ...otherUsers]);
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.isBot ? 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) :
      (contact.name || contact.email).toLowerCase().includes(searchTerm.toLowerCase())
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
            key={contact.isBot ? contact.id : contact.email}
            className={`contact-item ${contact.isBot ? 'bot-contact' : ''}`}
            onClick={() => onSelectContact(contact.isBot ? 'ai-bot' : contact.email)}
          >
            <div className="contact-avatar">
              {contact.isBot ? '🤖' : (contact.name ? contact.name[0].toUpperCase() : '👤')}
            </div>
            <div className="contact-info">
              <div className="contact-name">
                {contact.isBot ? contact.name : (contact.name || contact.email)}
              </div>
              {contact.description && (
                <div className="contact-description">{contact.description}</div>
              )}
              {!contact.isBot && (
                <div className="contact-email">{contact.email}</div>
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