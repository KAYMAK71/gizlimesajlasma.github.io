export const AIBot = {
  generateResponse: (message) => {
    const lowercaseMessage = message.toLowerCase();
    
    // Temel cevaplar
    if (lowercaseMessage.includes('merhaba') || lowercaseMessage.includes('selam')) {
      return 'Merhaba! Size nasıl yardımcı olabilirim?';
    }
    
    if (lowercaseMessage.includes('nasılsın')) {
      return 'İyiyim, teşekkür ederim! Siz nasılsınız?';
    }
    
    if (lowercaseMessage.includes('teşekkür')) {
      return 'Rica ederim! Başka bir konuda yardımcı olabilirim.';
    }

    // Varsayılan cevap
    return 'Anlıyorum. Size nasıl yardımcı olabilirim?';
  }
}; 