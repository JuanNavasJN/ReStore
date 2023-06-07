import withAuth from '@/app/components/withAuth';
import Orders from '@/features/orders/Orders';
import React from 'react';

function OrdersPage() {
  return <Orders />;
}

export default withAuth(OrdersPage);
