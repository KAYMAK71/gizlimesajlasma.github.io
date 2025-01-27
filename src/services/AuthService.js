export const AuthService = {
  saveUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
  },

  saveUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  getUsers: () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },

  resetPassword: async (email) => {
    try {
      // Normalde burada API çağrısı yapılır
      // Şimdilik simüle ediyoruz
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.');
      }

      // Yeni şifre oluştur
      const tempPassword = Math.random().toString(36).slice(-8);
      
      // Kullanıcının şifresini güncelle
      user.password = tempPassword;
      localStorage.setItem('users', JSON.stringify(users));

      // E-posta gönderme simülasyonu
      console.log(`Yeni şifreniz: ${tempPassword} (${email} adresine gönderildi)`);
      
      return {
        success: true,
        message: 'Yeni şifreniz e-posta adresinize gönderildi.'
      };
    } catch (error) {
      throw error;
    }
  },

  // Mesaj gönderme
  saveMessage: (senderId, receiverId, messageText) => {
    try {
      // Benzersiz sohbet ID'si oluştur
      const chatId = [senderId, receiverId].sort().join('_');
      
      // Yeni mesaj objesi
      const newMessage = {
        id: Date.now(),
        senderId,
        receiverId,
        text: messageText,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      // Mevcut sohbeti al
      let allChats = JSON.parse(localStorage.getItem('chats') || '{}');
      let currentChat = allChats[chatId] || [];
      
      // Yeni mesajı ekle
      currentChat.push(newMessage);
      allChats[chatId] = currentChat;
      
      // Sohbeti kaydet
      localStorage.setItem('chats', JSON.stringify(allChats));
      
      return currentChat;
    } catch (error) {
      console.error('Mesaj kaydedilemedi:', error);
      return [];
    }
  },

  // Mesajları getir
  getMessages: (userId1, userId2) => {
    try {
      const chatId = [userId1, userId2].sort().join('_');
      const allChats = JSON.parse(localStorage.getItem('chats') || '{}');
      return allChats[chatId] || [];
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
      return [];
    }
  },

  // Mesaj durumunu güncelle
  updateMessageStatus: (chatId, messageId, status) => {
    try {
      const allChats = JSON.parse(localStorage.getItem('chats') || '{}');
      const currentChat = allChats[chatId] || [];
      
      const updatedChat = currentChat.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      );

      allChats[chatId] = updatedChat;
      localStorage.setItem('chats', JSON.stringify(allChats));
      
      return updatedChat;
    } catch (error) {
      console.error('Mesaj durumu güncellenemedi:', error);
      return null;
    }
  },

  // Kullanıcı bilgilerini e-posta ile alma
  getUserByEmail: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email);
  },

  // Kişileri kaydetme
  saveContacts: (userEmail, contacts) => {
    try {
      localStorage.setItem(`contacts_${userEmail}`, JSON.stringify(contacts));
      return true;
    } catch (error) {
      console.error('Kişiler kaydedilemedi:', error);
      return false;
    }
  },

  // Kişileri getirme
  getContacts: (userEmail) => {
    try {
      const contacts = localStorage.getItem(`contacts_${userEmail}`);
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error('Kişiler alınamadı:', error);
      return [];
    }
  }
}; 