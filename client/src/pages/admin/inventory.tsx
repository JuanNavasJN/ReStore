import withAuth from '@/app/components/withAuth';
import Inventory from '@/features/admin/inventory/Inventory';
import React from 'react';

const InventoryPage = () => {
  return <Inventory />;
};

export default withAuth(InventoryPage, { roles: ['Admin'] });
