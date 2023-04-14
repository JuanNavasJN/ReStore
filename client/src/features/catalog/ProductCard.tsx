import agent from '@/app/api/agent';
import { Product } from '@/app/models/product';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from '@/app/context/StoreContext';
import { currencyFormat } from '@/app/util';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setBasket } = useStoreContext();

  const handleAddItem = (productId: number) => {
    setIsLoading(true);
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: 'secondary.main'
            }}
          >
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' }
        }}
      />

      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
          bgcolor: 'primary.light'
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={isLoading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button size="small" component={Link} href={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
