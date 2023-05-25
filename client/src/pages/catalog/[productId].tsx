import { useEffect, useMemo, useState } from 'react';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NotFound from '../404';
import Loading from '@/app/layout/Loading';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  addBasketItemAsync,
  removeBasketItemAsync
} from '@/features/basket/basketSlice';
import {
  fetchProductAsync,
  productSelectors
} from '@/features/catalog/catalogSlice';

export default function ProductPage() {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const [quantity, setQuantity] = useState(0);
  const { status: productStatus } = useAppSelector(state => state.catalog);
  const product = useAppSelector(state =>
    productSelectors.selectById(state, parseInt(query.productId as string))
  );

  const item = useMemo(() => {
    return basket?.items.find(i => i.productId === product?.id);
  }, [basket, product]);

  useEffect(() => {
    if (query.productId) {
      if (!product)
        dispatch(fetchProductAsync(parseInt(query.productId as string)));
    }
  }, [query.productId, dispatch, product]);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    else setQuantity(0);
  }, [item]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  };

  const handleUpdateCart = () => {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity
        })
      );
    }
  };

  if (productStatus.includes('pending'))
    return <Loading message="Loading product..." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Image
          src={product.pictureUrl}
          alt={product.name}
          width={300}
          height={300}
          // fill
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              sx={{ height: '55px' }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              loading={status.includes('pending')}
              onClick={handleUpdateCart}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
            >
              {item ? 'Update Quantity' : 'Add to cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
