export const AIBot = {
  generateResponse: (message) => {
    // Basit bir yapay zeka cevap sistemi
    const lowercaseMessage = message.toLowerCase();
    
    // Selamlaşma kontrolleri
    if (lowercaseMessage.includes('merhaba') || lowercaseMessage.includes('selam')) {
      return 'Merhaba! Size nasıl yardımcı olabilirim?';
    }
    
    // Nasılsın kontrolü
    if (lowercaseMessage.includes('nasılsın')) {
      return 'İyiyim, teşekkür ederim. Siz nasılsınız?';
    }
    
    // İsim sorgusu
    if (lowercaseMessage.includes('adın ne')) {
      return 'Ben YZ Asistanı, size yardımcı olmak için buradayım.';
    }
    
    // Ne yapabilirsin sorgusu
    if (lowercaseMessage.includes('ne yapabilirsin') || lowercaseMessage.includes('yardımcı olur musun')) {
      return 'Size çeşitli konularda yardımcı olabilirim. Örneğin sohbet edebilir, sorularınızı yanıtlayabilirim.';
    }
    
    // Teşekkür kontrolü
    if (lowercaseMessage.includes('teşekkür')) {
      return 'Rica ederim! Başka bir konuda yardıma ihtiyacınız olursa bana sorabilirsiniz.';
    }
    
    // Varsayılan cevap
    return 'Anlıyorum. Daha detaylı bilgi verebilir misiniz? Size daha iyi yardımcı olmak isterim.';
  }
}; 