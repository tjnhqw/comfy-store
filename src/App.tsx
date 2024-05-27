import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import { loader as landingLoader } from './pages/Landing'
import { loader as productLoader } from './pages/Products'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as checkoutLoader } from './pages/Checkout'
import { loader as ordersLoader } from './pages/Orders'
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as checkoutAction } from './components/CheckoutForm';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { ErrorElement } from './components';
import store from './store/store';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: 'products',
        element: <Products />,
        loader: productLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singleProductLoader,
        errorElement: <ErrorElement />,

      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About />, errorElement: <ErrorElement /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store)
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: ordersLoader(store)
      },
      {
        path: 'error',
        element: <Error />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store)

  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction

  },
]);


function App() {
  const { user } = useAppSelector((state) => state.user);
  console.log('user: ', user);
  return <RouterProvider router={router} />;
  /* return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='font-bold text-3xl'>Hello world {name}</h1>
        <Button variant={'default'} size={'lg'} onClick={() => console.log('123')}>
          Click ne
        </Button>
      </div>
  ) */
}

export default App
