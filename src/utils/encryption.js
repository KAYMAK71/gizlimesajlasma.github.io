const emojiMap = {
  'a': '😀', 'b': '😂', 'c': '😊', 'd': '🎨', 'e': '🎭',
  'f': '🎪', 'g': '🎯', 'h': '🎲', 'i': '🎸', 'j': '🎺',
  'k': '🎻', 'l': '🎹', 'm': '🎼', 'n': '🎧', 'o': '🎤',
  'p': '🎬', 'q': '🎮', 'r': '🎨', 's': '🎭', 't': '🎪',
  'u': '🎯', 'v': '🎲', 'w': '🎸', 'x': '🎺', 'y': '🎻',
  'z': '🎹', ' ': '⭐️', '0': '🔥', '1': '💫', '2': '✨',
  '3': '⚡️', '4': '💥', '5': '🌙', '6': '☀️', '7': '🌟',
  '8': '🌈', '9': '🌊'
};

export const encryptMessage = (message) => {
  return message.toLowerCase().split('').map(char => {
    return emojiMap[char] || char;
  }).join('');
};

export const decryptMessage = (encryptedMessage) => {
  const reverseEmojiMap = Object.fromEntries(
    Object.entries(emojiMap).map(([key, value]) => [value, key])
  );
  
  return encryptedMessage.split('').map(char => {
    return reverseEmojiMap[char] || char;
  }).join('');
}; 