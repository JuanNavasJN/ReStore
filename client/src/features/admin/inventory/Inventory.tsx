import { Typography, Button, Box } from '@mui/material';
import useProducts from '@/app/hooks/useProducts';
import { useAppDispatch } from '@/app/store';
import AppPagination from '@/app/components/AppPagination';
import { removeProduct, setProductParams } from '../../catalog/catalogSlice';
import { useState } from 'react';
import ProductForm from './ProductForm';
import { Product } from '@/app/models/product';
import agent from '@/app/api/agent';
import ProductTable from './ProductTable';

export default function Inventory() {
  const { metaData } = useProducts();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setEditMode(true);
  }

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          onClick={() => setEditMode(true)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Create
        </Button>
      </Box>
      <ProductTable
        handleSelectProduct={handleSelectProduct}
        handleDeleteProduct={handleDeleteProduct}
        loading={loading}
        target={target}
      />
      {metaData && (
        <Box sx={{ py: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setProductParams({ pageNumber: page }))
            }
          />
        </Box>
      )}
    </>
  );
}
