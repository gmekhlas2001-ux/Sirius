import { useEffect, useState } from 'react';
import { supabase, type Message } from '../lib/supabase';
import { Mail, Clock, CircleCheck as CheckCircle2, Circle } from 'lucide-react';

export default function MessagesPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setMessages(data || []);
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('messages')
        .update({ read: !currentStatus })
        .eq('id', id);

      if (updateError) throw updateError;

      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, read: !currentStatus } : msg
      ));
    } catch (err) {
      console.error('Error updating message:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-night-slate flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-antique-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-slate pt-20 md:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-ivory mb-1 md:mb-2">
            Messages
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-parchment">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'} received
          </p>
        </div>

        {error && (
          <div className="mb-4 md:mb-6 bg-red-900/20 border border-red-500/30 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-red-300">
            {error}
          </div>
        )}

        {messages.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <Mail className="w-10 h-10 md:w-12 md:h-12 text-muted-parchment mx-auto mb-3 md:mb-4 opacity-50" />
            <p className="font-sans text-sm md:text-base text-muted-parchment">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bg-deep-ink border border-warm-ivory/10 p-4 sm:p-5 md:p-6 transition-all ${
                  !message.read ? 'border-antique-gold/30' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 md:mb-2 flex-wrap">
                      <h3 className="font-sans font-medium text-sm md:text-base text-warm-ivory break-words">
                        {message.name}
                      </h3>
                      {!message.read && (
                        <span className="px-1.5 py-0.5 md:px-2 bg-antique-gold/20 text-antique-gold text-[10px] md:text-xs rounded whitespace-nowrap">
                          NEW
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${message.email}`}
                      className="font-sans text-xs md:text-sm text-antique-gold hover:underline break-all"
                    >
                      {message.email}
                    </a>
                  </div>

                  <button
                    onClick={() => toggleReadStatus(message.id, message.read)}
                    className="text-muted-parchment hover:text-warm-ivory transition-colors flex-shrink-0 p-1 -mr-1 touch-manipulation"
                    title={message.read ? 'Mark as unread' : 'Mark as read'}
                    aria-label={message.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {message.read ? (
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <Circle className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </button>
                </div>

                <p className="font-sans text-sm md:text-base text-warm-ivory leading-relaxed mb-3 md:mb-4 whitespace-pre-wrap break-words">
                  {message.message}
                </p>

                <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs text-muted-parchment">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{formatDate(message.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
