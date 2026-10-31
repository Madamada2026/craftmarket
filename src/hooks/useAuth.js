import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const init = useAuthStore((state) => state.init);

  // Ініціалізація сесії при першому монтуванні
  useEffect(() => {
    init();
  }, [init]);

  return { user, token, isAuthenticated, login, logout };
}