import { Close } from '@mui/icons-material';
import {
  Grid,
  Paper,
  Button,
  Container,
  IconButton,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import ProductSearch from './ProductSearch';
import styles from '@/styles/Catalog.module.css';
import RadioButtonGroup from '@/app/components/RadioButtonGroup';
import CheckboxButtons from '@/app/components/checkboxButtons';
import { setProductParams } from './catalogSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';
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

export default function Filters() {
  const theme = useTheme();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dispatch = useAppDispatch();
  const { brands, types } = useProducts();
  const { productParams } = useAppSelector(state => state.catalog);

  const filters = (
    <>
      {/* ---- Sort ---- */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <RadioButtonGroup
          selectedValue={productParams.orderBy}
          options={sortOptions}
          onChange={e =>
            dispatch(setProductParams({ orderBy: e.target.value }))
          }
        />
      </Paper>
      {/* ---- Filter - Brands ---- */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <CheckboxButtons
          items={brands}
          checked={productParams.brands}
          onChange={(items: string[]) =>
            dispatch(setProductParams({ brands: items }))
          }
        />
      </Paper>
      {/* ---- Filter - Types ---- */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <CheckboxButtons
          items={types}
          checked={productParams.types}
          onChange={(items: string[]) =>
            dispatch(setProductParams({ types: items }))
          }
        />
      </Paper>
    </>
  );

  return (
    <Grid item xs={12} md={3} className={styles.filtersContainer}>
      <Paper sx={{ mb: 2 }}>
        {/* ---- ProductSearch ---- */}
        <ProductSearch />
      </Paper>
      {/* --- Filters - desktop --- */}
      <div className={styles.desktopFilters}>{filters}</div>
      {/* --- Filters - mobile --- */}
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        className={styles.filtersButton}
        onClick={() => setShowMobileFilters(true)}
      >
        Filters
      </Button>
      {showMobileFilters && (
        <Container
          className={styles.mobileFilters}
          style={{
            backgroundColor: theme.palette.background.default
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <IconButton
                size="large"
                onClick={() => setShowMobileFilters(false)}
              >
                <Close fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {filters}
            </Grid>
          </Grid>
        </Container>
      )}
    </Grid>
  );
}
