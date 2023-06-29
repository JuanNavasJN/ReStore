import React from 'react';
import Image from 'next/image';
import useProducts from '@/app/hooks/useProducts';
import { Product } from '@/app/models/product';
import { currencyFormat } from '@/app/util';
import { Edit, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useAppSelector } from '@/app/store';
import RowSkeleton from './RowSkeleton';

interface Props {
  handleSelectProduct: (product: Product) => void;
  handleDeleteProduct: (id: number) => void;
  loading: boolean;
  target: number;
}

export default function ProductTable({
  handleSelectProduct,
  handleDeleteProduct,
  loading,
  target
}: Props) {
  const { products } = useProducts();
  const { status } = useAppSelector(state => state.catalog);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product =>
            status.includes('pending') ? (
              <RowSkeleton key={product.id} />
            ) : (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <Image
                      src={product.pictureUrl}
                      alt={product.name}
                      height={50}
                      width={50}
                      style={{ marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(product.price)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleSelectProduct(product)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    onClick={() => handleDeleteProduct(product.id)}
                    startIcon={<Delete />}
                    color="error"
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
