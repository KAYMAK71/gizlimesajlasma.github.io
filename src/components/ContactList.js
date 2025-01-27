import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import '../styles/ContactList.css';

const ContactList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    // YZ Asistanı
    const aiBot = {
      id: 'ai-bot',
      name: 'YZ Asistanı',
      isBot: true,
      description: 'Yapay Zeka Sohbet Botu'
    };

    // Kayıtlı kişileri al
    const savedContacts = JSON.parse(localStorage.getItem(`contacts_${currentUser.email}`) || '[]');
    
    // Tüm kullanıcıları al
    const allUsers = AuthService.getUsers();
    
    // Mevcut kullanıcı hariç diğer kullanıcıları filtrele
    const otherUsers = allUsers.filter(user => 
      user.email !== currentUser.email && 
      !savedContacts.some(contact => contact.email === user.email)
    );

    // Kayıtlı kişileri ve botu birleştir
    const allContacts = [aiBot, ...savedContacts, ...otherUsers];
    setContacts(allContacts);
  };

  const addContact = (contact) => {
    // Kayıtlı kişileri al
    const savedContacts = JSON.parse(localStorage.getItem(`contacts_${currentUser.email}`) || '[]');
    
    // Kişi zaten ekli mi kontrol et
    if (!savedContacts.some(c => c.email === contact.email)) {
      // Yeni kişiyi ekle
      const updatedContacts = [...savedContacts, contact];
      localStorage.setItem(`contacts_${currentUser.email}`, JSON.stringify(updatedContacts));
      
      // Listeyi güncelle
      loadContacts();
    }
  };

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
            onClick={() => {
              onSelectContact(contact.isBot ? 'ai-bot' : contact.email);
              if (!contact.isBot) {
                addContact(contact);
              }
            }}
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