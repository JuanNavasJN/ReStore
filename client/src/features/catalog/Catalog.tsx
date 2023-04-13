import { Product } from '@/app/models/product';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';
import agent from '@/app/api/agent';
import Loading from '@/app/layout/Loading';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(console.error)
      .finally(() => setIsloading(false));
  }, []);

  if (isLoading) return <Loading message="Loading products..." />;

  return <ProductList products={products} />;
}
