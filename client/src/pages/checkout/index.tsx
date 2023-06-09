import withAuth from '@/app/components/withAuth';
import Checkout from '@/features/checkout/Checkout';
import CheckoutWrapper from '@/features/checkout/CheckoutWrapper';

const CheckoutPage = () => {
  return (
    <CheckoutWrapper>
      <Checkout />
    </CheckoutWrapper>
  );
};

export default withAuth(CheckoutPage);
