import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Product } from '@/app/models/product';
import agent from '@/app/api/agent';
import NotFound from '../404';

export default function ProductPage() {
  const { query } = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query.productId)
      agent.Catalog.details(parseInt(query.productId as string))
        .then(res => setProduct(res))
        .catch(err => console.error(err.response))
        .finally(() => setIsLoading(false));
  }, [query.productId]);

  if (isLoading) return <CircularProgress />;

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
      </Grid>
    </Grid>
  );
}
