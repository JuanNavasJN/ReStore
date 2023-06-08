import agent from '@/app/api/agent';
import withAuth from '@/app/components/withAuth';
import { ShippingAddress } from '@/app/models/order';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { clearBasket } from '@/features/basket/basketSlice';
import AddressForm from '@/features/checkout/AddressForm';
import PaymentForm from '@/features/checkout/PaymentForm';
import Review from '@/features/checkout/Review';
import { validationSchema } from '@/features/checkout/checkoutValidation';
import { createOrderAsync } from '@/features/orders/ordersSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { newOrderId } = useAppSelector(state => state.orders);

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(currentValidationSchema)
  });

  useEffect(() => {
    agent.Account.fetchAddress().then(response => {
      if (response) {
        methods.reset({
          ...methods.getValues(),
          ...response,
          saveAddress: false
        });
      }
    });
  }, [methods]);

  useEffect(() => {
    if (newOrderId) setOrderNumber(newOrderId);
  }, [newOrderId]);

  const handleNext = async (data: FieldValues) => {
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    if (activeStep === steps.length - 1) {
      setLoading(true);
      try {
        dispatch(
          createOrderAsync({
            saveAddress,
            shippingAddress: shippingAddress as ShippingAddress
          })
        );

        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderNumber}. We have not emailed your
                order confirmation, and will not send you an update when your
                order has shipped as this is a fake store!
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  disabled={!methods.formState.isValid}
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  );
};

export default withAuth(CheckoutPage);
