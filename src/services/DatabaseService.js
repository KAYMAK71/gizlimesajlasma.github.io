import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'SUPABASE_URL',
  'SUPABASE_KEY'
);

export const DatabaseService = {
  // Mesaj gönderme
  sendMessage: async (senderId, receiverId, message) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: senderId,
          receiver_id: receiverId,
          message: message,
          status: 'sent',
          created_at: new Date()
        }]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
      throw error;
    }
  },

  // Mesajları getirme
  getMessages: async (userId1, userId2) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId1},receiver_id.eq.${userId1}`)
        .or(`sender_id.eq.${userId2},receiver_id.eq.${userId2}`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
      return [];
    }
  },

  // Mesaj durumunu güncelleme
  updateMessageStatus: async (messageId, status) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ status: status })
        .eq('id', messageId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Mesaj durumu güncellenemedi:', error);
      throw error;
    }
  }
}; 