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

  // Mesajları kaydetmek ve almak için yeni fonksiyonlar
  saveMessage: (senderId, receiverId, message) => {
    try {
      // Benzersiz bir sohbet ID'si oluştur (her iki kullanıcı için aynı olmalı)
      const chatId = [senderId, receiverId].sort().join('_');
      
      // Mevcut mesajları al
      const allChats = JSON.parse(localStorage.getItem('all_chats') || '{}');
      const chatMessages = allChats[chatId] || [];
      
      // Yeni mesajı ekle
      chatMessages.push({
        id: Date.now(),
        senderId,
        receiverId,
        text: message,
        timestamp: new Date().toISOString()
      });
      
      // Mesajları kaydet
      allChats[chatId] = chatMessages;
      localStorage.setItem('all_chats', JSON.stringify(allChats));
      
      return chatMessages;
    } catch (error) {
      console.error('Mesaj kaydedilemedi:', error);
      throw error;
    }
  },

  getMessages: (userId1, userId2) => {
    try {
      const chatId = [userId1, userId2].sort().join('_');
      const allChats = JSON.parse(localStorage.getItem('all_chats') || '{}');
      return allChats[chatId] || [];
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
      return [];
    }
  },

  // Kullanıcı bilgilerini e-posta ile alma
  getUserByEmail: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email);
  }
}; 