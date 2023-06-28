import ProductList from './ProductList';
import Loading from '@/app/layout/Loading';
import { setProductParams } from './catalogSlice';
import { useAppDispatch } from '@/app/store';
import { Grid } from '@mui/material';
import AppPagination from '@/app/components/AppPagination';
import useProducts from '@/app/hooks/useProducts';
import Filters from './Filters';

export default function Catalog() {
  const { products, filtersLoaded, metaData } = useProducts();

  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <Loading message="Loading products..." />;

  return (
    <Grid container columnSpacing={4}>
      <Filters />

      <Grid item xs={12} md={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={0} sm={3} />

      <Grid item xs={12} sm={9} sx={{ pb: 4, mt: 4 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setProductParams({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
