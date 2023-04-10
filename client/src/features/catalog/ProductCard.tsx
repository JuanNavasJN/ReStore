import { Product } from '@/app/models/product';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import React from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={product.pictureUrl} />
      </ListItemAvatar>
      <ListItemText>
        {product.name} - {product.price}
      </ListItemText>
    </ListItem>
  );
}
