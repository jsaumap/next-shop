import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title={'Teslo-Shop - Men'}
      pageDescription={'Encuentra los mejores productos de Teslo para Hombres aqui'}
    >
      <Typography variant='h1' component='h1'>
        Hombres
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Productos para Ellos
      </Typography>
      {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;

