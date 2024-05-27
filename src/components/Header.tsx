import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { logoutUser } from '~/features/user/userSlice';
import { clearCart } from '~/features/cart/cartSlice';
import { toast } from './ui/use-toast';

function Header() {
  const { user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser())
    toast({ description: 'Logged out' });
    navigate('/');
  }
  return (
    <header className='align-element'>
      <div className='align-element flex justify-center sm:justify-end py-2'>

        {/* User */}
        {user ? <div className='flex gap-x-2 sm:gap-x-8 items-center'>
          <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
          <Button variant={'link'} size={'sm'} onClick={handleLogout}>Logout</Button>
        </div> :
          <div className='flex gap-x-6 justify-center items-center -mr-4'>
            <Button asChild variant={'link'} size={'sm'}>
              <Link to='/login'>Sign in/ guest</Link>
            </Button>

            <Button asChild variant={'link'} size={'sm'}>
              <Link to='/register'>Register</Link>
            </Button>
          </div>}
      </div>
    </header>
  )
}

export default Header