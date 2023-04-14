import agent from '@/app/api/agent';
import { useStoreContext } from '@/app/context/StoreContext';
import { currencyFormat } from '@/app/util';
import BasketSummary from '@/features/basket/BasketSummary';
import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  const handleAddItem = useCallback(
    (productId: number, name: string) => {
      setStatus({ loading: true, name });
      agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(console.error)
        .finally(() => setStatus({ loading: false, name: '' }));
    },
    [setBasket]
  );

  const handleRemoveItem = useCallback(
    (productId: number, quantity = 1, name: string) => {
      setStatus({ loading: true, name });
      agent.Basket.removeItem(productId, quantity)
        .then(() => removeItem(productId, quantity))
        .catch(console.error)
        .finally(() => setStatus({ loading: false, name: '' }));
    },
    [removeItem]
  );

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <Image
                      src={item.pictureUrl}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{ marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'rem' + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        1,
                        'rem' + item.productId
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>

                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={
                      status.loading && status.name === 'add' + item.productId
                    }
                    onClick={() =>
                      handleAddItem(item.productId, 'add' + item.productId)
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status.loading && status.name === 'del' + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        'del' + item.productId
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
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
