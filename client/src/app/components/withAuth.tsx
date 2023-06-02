import React, { useEffect } from 'react';
import { useAppSelector } from '../store';
import { useRouter } from 'next/router';

function withAuth(Component: React.ComponentType) {
  const CheckAuth = () => {
    const { user } = useAppSelector(state => state.account);
    const { pathname, push } = useRouter();

    useEffect(() => {
      if (!user)
        push({
          pathname: 'login',
          query: {
            from: pathname
          }
        });
    }, [user, pathname, push]);

    return <Component />;
  };

  return CheckAuth;
}

export default withAuth;
