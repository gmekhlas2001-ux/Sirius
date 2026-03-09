import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Trash2, LogOut, RefreshCw } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { format } from 'date-fns';

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch messages', {
        description: error.message,
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete message', {
        description: error.message,
      });
    } else {
      toast.success('Message deleted successfully');
      setMessages(messages.filter(msg => msg.id !== id));
    }
    setDeletingId(null);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1d26] to-[#0a0b0f] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold text-[#D4A24F]">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchMessages}
              variant="outline"
              size="sm"
              className="border-[#D4A24F]/30 text-[#D4A24F] hover:bg-[#D4A24F]/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-[#D4A24F]/30 text-[#D4A24F] hover:bg-[#D4A24F]/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <Card className="bg-[#1a1d26]/50 border-[#D4A24F]/20">
          <CardHeader>
            <CardTitle className="text-[#D4A24F]">Messages</CardTitle>
            <CardDescription>
              {messages.length} {messages.length === 1 ? 'message' : 'messages'} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No messages yet</div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className="bg-[#0a0b0f]/50 border-[#D4A24F]/10">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-[#D4A24F]">{message.name}</h3>
                            <span className="text-xs text-gray-500">
                              {format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}
                            </span>
                          </div>
                          <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={deletingId === message.id}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#1a1d26] border-[#D4A24F]/20">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[#D4A24F]">Delete Message</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete this message from {message.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-[#0a0b0f] border-[#D4A24F]/30 text-gray-300 hover:bg-[#0a0b0f]/80">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(message.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
