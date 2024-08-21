import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export default function useAuthentication() {
  const queryClient = useQueryClient();

  const isAuthenticated = (): boolean => {
    const token = Cookies.get('token');
    return !!token;
  };

  const onLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    queryClient.removeQueries();
  };

  return {
    onLogOut,
    isAuthenticated,
  };
}
