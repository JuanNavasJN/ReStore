import React, { useEffect } from 'react';
import { useAppSelector } from '../store';
import { useRouter } from 'next/router';
import Loading from '../layout/Loading';
import { toast } from 'react-toastify';

function withAuth(
  Component: React.ComponentType,
  options?: { roles: string[] }
) {
  const CheckAuth = () => {
    const { user } = useAppSelector(state => state.account);
    const { pathname, push } = useRouter();

    useEffect(() => {
      if (!user)
        push({
          pathname: '/login',
          query: {
            from: pathname
          }
        });
    }, [user, pathname, push]);

    if (!user) return <Loading />;

    const roles = options?.roles;

    if (roles && !roles.some(r => user.roles?.includes(r))) {
      toast.error('Not authorized to access this area');
      push('/catalog');
      return <Loading />;
    }

    return <Component />;
  };

  return CheckAuth;
}

export default withAuth;
