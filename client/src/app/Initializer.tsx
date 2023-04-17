import { PropsWithChildren, useEffect, useState } from 'react';
import Loading from './layout/Loading';
import agent from './api/agent';
import { getCookie } from './util';
import { useAppDispatch } from './store';
import { setBasket } from '@/features/basket/basketSlice';

export default function Initializer({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isLoading) return <Loading message="Initialising app..." />;

  return <>{children}</>;
}
