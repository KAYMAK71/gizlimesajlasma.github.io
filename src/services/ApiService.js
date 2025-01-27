const API_URL = 'YOUR_HEROKU_APP_URL';

export const ApiService = {
  sendMessage: async (senderId, receiverId, message) => {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          message,
          status: 'sent',
          timestamp: new Date().toISOString()
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
      throw error;
    }
  },

  getMessages: async (userId1, userId2) => {
    try {
      const response = await fetch(
        `${API_URL}/messages?senderId=${userId1}&receiverId=${userId2}`
      );
      return await response.json();
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
      return [];
    }
  }
}; 