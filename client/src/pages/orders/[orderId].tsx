import Loading from '@/app/layout/Loading';
import { BasketItem } from '@/app/models/basket';
import { useAppDispatch, useAppSelector } from '@/app/store';
import BasketSummary from '@/features/basket/BasketSummary';
import BasketTable from '@/features/basket/BasketTable';
import ShippingAddress from '@/features/orders/ShippingAddress';
import { fetchOrderAsync } from '@/features/orders/ordersSlice';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function OrderPage() {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { order } = useAppSelector(state => state.orders);

  useEffect(() => {
    if (query.orderId) {
      dispatch(fetchOrderAsync(parseInt(query.orderId as string)));
    }
  }, [query, dispatch]);

  if (!order) return <Loading message="Loading order details..." />;

  return (
    <Grid container>
      <Grid sm={12} item>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography gutterBottom variant="h4">
            Order #{order.id} - {order.orderStatus}
          </Typography>
          <Button variant="contained" component={Link} href="/orders">
            Back to orders
          </Button>
        </Box>
      </Grid>

      <Grid sm={12} item sx={{ my: 2 }}>
        <BasketTable
          isBasket={false}
          items={order.orderItems as BasketItem[]}
        />
      </Grid>
      <Grid item sm={5} sx={{ mb: 2 }}>
        <ShippingAddress {...order.shippingAddress} />
      </Grid>
      <Grid item sm={2}></Grid>
      <Grid sm={5} item sx={{ mb: 2 }}>
        <BasketSummary items={order.orderItems as BasketItem[]} />
      </Grid>
    </Grid>
  );
}

export default OrderPage;
