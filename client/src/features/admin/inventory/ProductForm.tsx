import AppDropzone from '@/app/components/AppDropzone';
import AppSelectList from '@/app/components/AppSelectList';
import AppTextInput from '@/app/components/AppTextInput';
import useProducts from '@/app/hooks/useProducts';
import { Product } from '@/app/models/product';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './productValidation';
import { useAppDispatch } from '@/app/store';
import agent from '@/app/api/agent';
import { setProduct } from '@/features/catalog/catalogSlice';
import { LoadingButton } from '@mui/lab';

interface Props {
  product?: Product;
  cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const { types, brands } = useProducts();
  const watchFile = watch('file', null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Product;
      if (product) {
        response = await agent.Admin.updateProduct(data);
      } else {
        response = await agent.Admin.createProduct(data);
      }
      dispatch(setProduct(response));
      cancelEdit();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={brands}
              name="brand"
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              items={types}
              name="type"
              label="Type"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="price"
              label="Price"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              name="description"
              label="Description"
              multiline={true}
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppDropzone control={control} name="file" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center">
              {watchFile ? (
                <Image
                  src={watchFile.preview}
                  width={200}
                  height={200}
                  alt="preview"
                />
              ) : (
                product && (
                  <Image
                    src={product?.pictureUrl}
                    width={200}
                    height={200}
                    alt={product?.name}
                  />
                )
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="success"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
