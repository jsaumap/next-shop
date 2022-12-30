import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title={'Teslo-Shop - Kids'}
      pageDescription={'Encuentra los mejores productos de para jovenes aqui'}
    >
      <Typography variant='h1' component='h1'>
        Jovenes
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Productos para Jovenes
      </Typography>
      {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
