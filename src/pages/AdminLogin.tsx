import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error('Login failed', {
        description: error.message || 'Invalid credentials',
      });
    } else {
      toast.success('Welcome back!');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1d26] to-[#0a0b0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Logo className="w-16 h-16" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#D4A24F]">Sirius Admin</h1>
            <p className="text-gray-400 mt-2">Sign in to manage messages</p>
          </div>
        </div>

        <Card className="bg-[#1a1d26]/50 border-[#D4A24F]/20">
          <CardHeader>
            <CardTitle className="text-[#D4A24F]">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#0a0b0f] border-[#D4A24F]/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#0a0b0f] border-[#D4A24F]/30 text-white"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4A24F] hover:bg-[#B8913F] text-[#1a1d26] font-semibold"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
