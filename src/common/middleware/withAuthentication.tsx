import React from 'react';
import { useRouter } from 'next/navigation';
import routes from '@/common/constants/routes';
import useAuthentication from '../utils/useAuthentication';

export default function withAuthentication<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  state?: string
) {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const { isAuthenticated } = useAuthentication();
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [isAllow, setIsAllow] = React.useState(false);

    React.useEffect(() => {
      const isAuth = isAuthenticated();
      if (isAuth && state === 'loggedIn') {
        router.replace(routes.dashboard);
      } else if (!isAuth && state === 'loggedIn') {
        setIsAllow(true);
      } else if (!isAuth) {
        router.replace(routes.login);
      } else if (isAuth) {
        setIsAllow(true);
      }
      setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    if (loading) {
      return null;
    }

    return isAllow ? <WrappedComponent {...props} /> : null;
  };
}
