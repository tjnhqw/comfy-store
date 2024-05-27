import { AxiosResponse } from 'axios';
import { ActionFunction, Form, Link, redirect, useNavigate } from 'react-router-dom';
import FormInput from '~/components/FormInput';
import SubmitBtn from '~/components/SubmitBtn';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { toast } from '~/components/ui/use-toast';
import { loginUser } from '~/features/user/userSlice';
import { useAppDispatch } from '~/store/hooks';
import { ReduxStore } from '~/store/store';
import { customFetch } from '~/utils';

export const action = (store: ReduxStore): ActionFunction => async ({ request }): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response: AxiosResponse = await customFetch.post(
      '/auth/local',
      data
    );
    const username = response.data.user.username;
    const jwt = response.data.jwt;
    store.dispatch(loginUser({ username, jwt }));
    toast({ description: 'Login OK!' });
    return redirect('/');
  } catch (error) {
    // console.log(error);
    toast({ description: 'Login Failed' });
    return null;
  }
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginAsGuestUser = async (): Promise<void> => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      console.log('response: ', response);
      const username = response.data.user.username;
      const jwt = response.data.jwt;
      dispatch(loginUser({ username, jwt }));
      toast({ description: 'Login Successfully' });

      navigate('/');
    } catch (error) {
      console.log(error);
      toast({ description: 'Login Failed' });
    }
  };
  return (
    <section className='h-screen grid place-items-center'>
      <Card className='w-96 bg-muted'>

        <CardHeader>
          <CardTitle className='text-center text-primary'>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Form method='POST'>
            <FormInput type='email' name='identifier' label='email' defaultValue='test@test.com' />
            <FormInput type='password' name='password' defaultValue='secret' />

            <SubmitBtn text='Login' className='w-full mt-4' />
            <Button
              type='button'
              variant='outline'
              onClick={loginAsGuestUser}
              className='w-full mt-4'
            >
              Guest User
            </Button>
            <p className='text-center mt-4'>
              Not a member yet?
              <Button type='button' asChild variant='link'>
                <Link to='/register'>Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>

    </section>
  )
}

export default Login