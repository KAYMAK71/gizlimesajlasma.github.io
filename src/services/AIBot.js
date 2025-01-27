export const AIBot = {
  generateResponse: (message) => {
    // Sadece merhaba mesajına yanıt ver
    const lowercaseMessage = message.toLowerCase().trim();
    
    if (lowercaseMessage === 'merhaba') {
      return 'Merhaba! Ben YZ Asistanı. Size nasıl yardımcı olabilirim?';
    }

    // Diğer tüm mesajlar için
    return 'Üzgünüm, sadece "merhaba" mesajına yanıt verebiliyorum.';
  }
}; 