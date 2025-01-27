const API_URL = 'YOUR_VERCEL_API_URL';

export const MongoService = {
  sendMessage: async (senderId, receiverId, message) => {
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
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
  }
}; 