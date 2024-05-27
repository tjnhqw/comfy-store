import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { FeaturedProducts, Hero } from '~/components'
import { customFetch } from '~/utils/customFetch';
import { ProductsResponse } from '~/utils/type';



const url = '/products?featured=true';

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);
  console.log('response: ', response);
  return { ...response.data };
};
function Landing() {
  const result = useLoaderData() as ProductsResponse;
  console.log(result);
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Landing