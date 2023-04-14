import { PropsWithChildren, useEffect, useState } from 'react';
import Loading from './layout/Loading';
import agent from './api/agent';
import { useStoreContext } from './context/StoreContext';
import { getCookie } from './util';

export default function Initializer({ children }: PropsWithChildren) {
  const { setBasket } = useStoreContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => {
          setBasket(basket);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [setBasket]);

  if (isLoading) return <Loading message="Initialising app..." />;

  return <>{children}</>;
}
