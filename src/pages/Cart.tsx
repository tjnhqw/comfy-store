import { Link } from 'react-router-dom';
import { SectionTitle } from '~/components';
import CartItemsList from '~/components/CartItemsList';
import CartTotals from '~/components/CartTotals';
import { Button } from '~/components/ui/button';
import { useAppSelector } from '~/store/hooks';

const Cart = () => {
  const { user } = useAppSelector((state) => state.user);
  console.log('user: ', user);

  const numItemsInCart = useAppSelector(
    (state) => state.cart.numItemsInCart
  );

  if (numItemsInCart === 0) {
    return <SectionTitle text='Empty cart ☹️' />;
  }
  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-8  lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {user ? (
            <Button asChild className='mt-8 w-full'>
              <Link to='/checkout'>Proceed to checkout</Link>
            </Button>
          ) : (
            <Button asChild className='mt-8 w-full'>
              <Link to='/login'>Please Login</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;