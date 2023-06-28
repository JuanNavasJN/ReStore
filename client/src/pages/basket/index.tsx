import { useAppSelector } from '@/app/store';
import BasketSummary from '@/features/basket/BasketSummary';
import BasketTable from '@/features/basket/BasketTable';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

export default function BasketPage() {
  const { basket } = useAppSelector(state => state.basket);

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={0} sm={6} />
        <Grid item xs={12} sm={6}>
          <BasketSummary />
          <Button
            component={Link}
            href="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
