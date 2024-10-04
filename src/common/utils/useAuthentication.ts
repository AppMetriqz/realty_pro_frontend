import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export default function useAuthentication() {
  const queryClient = useQueryClient();

  const isAuthenticated = (): boolean => {
    const token = Cookies.get('token');
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    return !!token;
  };

  const onLogOut = (removePermissions: () => void) => {
    Cookies.remove('token');
    removePermissions();
    const isNotRememberMe = Cookies.get('rememberMe') !== '1';
    if (isNotRememberMe) {
      Cookies.remove('user');
    }
    queryClient.removeQueries();
  };

  return {
    onLogOut,
    isAuthenticated,
  };
}
