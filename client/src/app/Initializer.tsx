import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import Loading from './layout/Loading';
import { useAppDispatch } from './store';
import { fetchBasketAsync } from '@/features/basket/basketSlice';
import { fetchCurrentUser } from '@/features/account/accountSlice';

export default function Initializer({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setIsLoading(false));
  }, [initApp]);

  if (isLoading) return <Loading message="Initialising app..." />;

  return <>{children}</>;
}
