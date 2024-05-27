import { Filters, ProductsContainer, PaginationContainer } from '~/components';
import { customFetch, type ProductsResponseWithParams, } from '../utils';
import { type LoaderFunction } from 'react-router-dom';

const url = '/products';

export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch<ProductsResponseWithParams>(url, { params });
  console.log('response: ', response.data);

  return { ...response.data, params };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;