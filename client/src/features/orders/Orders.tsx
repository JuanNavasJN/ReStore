import Loading from '@/app/layout/Loading';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { currencyFormat } from '@/app/util';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';
import React, { useEffect } from 'react';
import { fetchOrdersAsync } from './ordersSlice';
import Link from 'next/link';

function Orders() {
  const { orders } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  if (!orders) return <Loading message="Loading orders..." />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map(order => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">{order.orderStatus}</TableCell>
              <TableCell align="right">
                <Button component={Link} href={`/orders/${order.id}`}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
