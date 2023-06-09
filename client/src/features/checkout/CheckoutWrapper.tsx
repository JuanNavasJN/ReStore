import agent from '@/app/api/agent';
import { useAppDispatch } from '@/app/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { setBasket } from '../basket/basketSlice';
import Loading from '@/app/layout/Loading';

const stripePromise = loadStripe(
  'pk_test_51MtDI3Go9Ks0zHFVyAHREJHy6x6UodYyqezGRVErS6EVm35kop9HeQCeuysRC4cGp0lACBlfxDxlPkXV10lt337c00GZzPfISW'
);

const CheckoutWrapper = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then(basket => dispatch(setBasket(basket)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <Loading message="Loading checkout..." />;

  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default CheckoutWrapper;
