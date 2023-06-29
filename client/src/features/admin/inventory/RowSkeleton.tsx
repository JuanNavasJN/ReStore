import { Skeleton, TableCell, TableRow } from '@mui/material';
import React from 'react';

export default function RowSkeleton() {
  const skeleton = <Skeleton animation="wave" height={50} />;

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {skeleton}
      </TableCell>
      <TableCell align="left">{skeleton}</TableCell>
      <TableCell align="right">{skeleton}</TableCell>
      <TableCell align="center">{skeleton}</TableCell>
      <TableCell align="center">{skeleton}</TableCell>
      <TableCell align="center">{skeleton}</TableCell>
      <TableCell align="right">{skeleton}</TableCell>
    </TableRow>
  );
}
