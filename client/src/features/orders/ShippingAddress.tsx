import React from 'react';
import { ShippingAddress } from '@/app/models/order';
import { Grid, Paper, Typography } from '@mui/material';

const Detail = ({ name, value }: { name: string; value: string }) => {
  return (
    <Grid item sm={12} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Typography variant="subtitle2" sx={{ mr: 1 }}>
        {name}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Grid>
  );
};

const ShippingAddress = (props: ShippingAddress) => {
  return (
    <Grid container sx={{ py: 2, px: 4 }} component={Paper}>
      <Grid item sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6">Shipping Address</Typography>
      </Grid>

      <Detail name="Full name:" value={props.fullName} />
      <Detail name="Address Line 1:" value={props.address1} />

      {props.address2 && (
        <Detail name="Address Line 2:" value={props.address2} />
      )}

      <Detail name="City:" value={props.city} />

      <Detail name="Zip code:" value={props.zip} />

      <Detail name="State:" value={props.state} />

      <Detail name="Country:" value={props.country} />
    </Grid>
  );
};

export default ShippingAddress;
