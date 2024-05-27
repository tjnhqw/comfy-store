import { ActionFunction, Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { ReduxStore } from '~/store/store';
import { toast } from './ui/use-toast';
import { Checkout, customFetch, formatAsDollars } from '~/utils';
import { clearCart } from '~/features/cart/cartSlice';



export const action =
  (store: ReduxStore): ActionFunction =>
    async ({ request }) => {
      const formData = await request.formData();
      const name = formData.get('name') as string;
      const address = formData.get('address') as string;

      if (!name || !address) {
        toast({ variant: 'destructive', description: 'please fill out all fields' });
        return null;
      }

      const user = store.getState().user.user;
      if (!user) {
        toast({ description: 'please login to place an order' });
        return redirect('/login');
      }
      const { cartItems, orderTotal, numItemsInCart } =
        store.getState().cart;

      const info: Checkout = {
        name,
        address,
        chargeTotal: orderTotal,
        orderTotal: formatAsDollars(orderTotal),
        cartItems,
        numItemsInCart,
      };
      try {
        await customFetch.post(
          '/orders',
          { data: info },
          {
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          }
        );

        store.dispatch(clearCart());
        toast({ description: 'order placed' });
        return redirect('/orders');
      } catch (error) {
        toast({ description: 'order failed' });
        return null;
      }
    };

const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl mb-4'>Shipping Information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <div className='mt-4'>
        <SubmitBtn text='Place Your Order' />
      </div>
    </Form>
  );
};
export default CheckoutForm;