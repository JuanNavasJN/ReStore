import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';
import { Basket } from '../models/basket';

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

const StoreContext = createContext<StoreContextValue>({
  basket: null,
  setBasket: () => {},
  removeItem: () => {}
});

export function useStoreContext() {
  const context = useContext(StoreContext);

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = useCallback(
    (productId: number, quantity: number) => {
      if (!basket) return;
      const items = [...basket.items];
      const itemIndex = items.findIndex(i => i.productId === productId);

      if (itemIndex >= 0) {
        items[itemIndex].quantity -= quantity;

        if (items[itemIndex].quantity <= 0) items.splice(itemIndex, 1);
        setBasket(prevState => {
          return { ...prevState!, items };
        });
      }
    },
    [basket]
  );

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
