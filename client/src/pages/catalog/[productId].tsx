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
import { Product } from '@/app/models/product';
import agent from '@/app/api/agent';
import NotFound from '../404';
import Loading from '@/app/layout/Loading';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  addBasketItemAsync,
  removeBasketItemAsync
} from '@/features/basket/basketSlice';

export default function ProductPage() {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const item = useMemo(() => {
    return basket?.items.find(i => i.productId === product?.id);
  }, [basket, product]);

  useEffect(() => {
    if (query.productId)
      agent.Catalog.details(parseInt(query.productId as string))
        .then(res => setProduct(res))
        .catch(err => console.error(err.response))
        .finally(() => setIsLoading(false));
  }, [query.productId]);

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

  if (isLoading) return <Loading message="Loading product..." />;

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
              loading={status.includes('pendingRemoveItem' + item?.productId)}
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
