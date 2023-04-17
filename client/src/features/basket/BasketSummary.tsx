import { useEffect, useMemo, useState } from 'react';
import { currencyFormat } from '@/app/util';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { useAppSelector } from '@/app/store';

export default function BasketSummary() {
  const { basket } = useAppSelector(state => state.basket);

  const [deliveryFee, setDeliveryfee] = useState(700);

  const subtotal = useMemo(
    () =>
      basket?.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ) || 0,
    [basket]
  );

  useEffect(() => {
    if (subtotal > 10000) setDeliveryfee(0);
    else setDeliveryfee(700);
  }, [subtotal]);

  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {currencyFormat(subtotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: 'italic' }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
