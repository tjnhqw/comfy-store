import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { SectionTitle } from '~/components';
import ComplexPaginationContainer from '~/components/ComplexPaginationContainer';
import OrdersList from '~/components/OrdersList';
import { toast } from '~/components/ui/use-toast';
import { ReduxStore } from '~/store/store';
import { customFetch, OrdersResponse } from '~/utils';

export const loader =
  (store: ReduxStore): LoaderFunction =>
    async ({ request }): Promise<OrdersResponse | Response | null> => {
      console.log('request: ', request);

      const user = store.getState().user.user;

      if (!user) {
        toast({ description: 'Please login to continue' });
        return redirect('/login');
      }

      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      try {
        const response = await customFetch.get<OrdersResponse>('/orders', {
          params,
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });

        return { ...response.data };
      } catch (error) {
        console.log(error);
        toast({ description: 'Failed to fetch orders' });
        return null;
      }

    }
function Orders() {
  const { meta, data } = useLoaderData() as OrdersResponse;
  console.log('meta: ', meta);
  console.log('data: ', data);
  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />;
  }
  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders