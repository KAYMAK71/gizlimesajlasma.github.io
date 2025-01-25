export const AIBot = {
  generateResponse: (message) => {
    const lowercaseMessage = message.toLowerCase().trim();
    
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

    if (lowercaseMessage.includes('yardım')) {
      return 'Size nasıl yardımcı olabilirim? Lütfen sorunuzu sorun.';
    }

    // Saat ve tarih sorguları
    if (lowercaseMessage.includes('saat')) {
      return `Şu an saat ${new Date().toLocaleTimeString()}.`;
    }

    if (lowercaseMessage.includes('tarih')) {
      return `Bugünün tarihi: ${new Date().toLocaleDateString('tr-TR')}.`;
    }

    // Varsayılan cevaplar
    const defaultResponses = [
      'Anlıyorum. Size nasıl yardımcı olabilirim?',
      'Bu konuda daha fazla bilgi verebilir misiniz?',
      'İlginç bir konu. Size nasıl yardımcı olabilirim?',
      'Devam edin, sizi dinliyorum.',
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}; 