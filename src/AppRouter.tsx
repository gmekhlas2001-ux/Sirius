import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import App from './App';

export function AppRouter() {
  const { user, loading } = useAuth();
  const path = window.location.pathname;

  useEffect(() => {
    if (!loading && user && path === '/admin') {
      window.history.pushState({}, '', '/admin/dashboard');
    }
  }, [user, loading, path]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1d26] to-[#0a0b0f] flex items-center justify-center">
        <div className="text-[#D4A24F] text-lg">Loading...</div>
      </div>
    );
  }

  if (path === '/admin' || path === '/admin/') {
    if (user) {
      return <AdminDashboard />;
    }
    return <AdminLogin />;
  }

  if (path === '/admin/dashboard') {
    if (!user) {
      window.location.href = '/admin';
      return null;
    }
    return <AdminDashboard />;
  }

  return <App />;
}
