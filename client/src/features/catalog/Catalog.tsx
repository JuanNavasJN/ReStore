import ProductList from './ProductList';
import Loading from '@/app/layout/Loading';
import { setProductParams } from './catalogSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { Grid, Paper } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '@/app/components/RadioButtonGroup';
import CheckboxButtons from '@/app/components/checkboxButtons';
import AppPagination from '@/app/components/AppPagination';
import useProducts from '@/app/hooks/useProducts';

const sortOptions = [
  {
    value: 'name',
    label: 'Alphabetical'
  },
  {
    value: 'priceDesc',
    label: 'Price - High to low'
  },
  {
    value: 'price',
    label: 'Price - Low to high'
  }
];

export default function Catalog() {
  const { products, brands, types, filtersLoaded, metaData } = useProducts();

  const { productParams } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <Loading message="Loading products..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={e =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />

      <Grid item xs={9} sx={{ pb: 4 }}>
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
