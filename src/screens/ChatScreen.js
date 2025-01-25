import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { encryptMessage, decryptMessage } from '../utils/encryption';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userPin, setUserPin] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const encryptedMessage = encryptMessage(newMessage);
      console.log('Şifrelenmiş mesaj:', encryptedMessage);
      const messageObj = {
        id: Date.now(),
        text: encryptedMessage,
        originalText: newMessage,
        isEncrypted: true,
      };
      setMessages([...messages, messageObj]);
      setNewMessage('');
    }
  };

  const handleMessagePress = (message) => {
    setSelectedMessage(message);
  };

  const handlePinSubmit = (pin) => {
    if (String(pin) === String(userPin) && selectedMessage) {
      const updatedMessages = messages.map((msg) => {
        if (msg.id === selectedMessage.id) {
          return { ...msg, isEncrypted: false };
        }
        return msg;
      });
      setMessages(updatedMessages);
      setSelectedMessage(null);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Henüz mesaj yok
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMessagePress(item)}>
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                {item.isEncrypted ? item.text : item.originalText}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      
      {selectedMessage && (
        <View style={styles.pinContainer}>
          <TextInput
            style={styles.pinInput}
            placeholder="3 haneli PIN giriniz"
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
            onChangeText={(pin) => handlePinSubmit(pin)}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Mesajınızı yazın..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
  },
  pinContainer: {
    padding: 10,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
});

export default ChatScreen; 