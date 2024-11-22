import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { loginUser } from 'services/authService';

const Login = () => {

  const navigate = useNavigate()

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const userData = { email: email, password: password };
    try {
      const result = await loginUser(userData);
      if (result) {
        setErrorMessage(''); //clear err
        login(result) //store user info
        console.log('result = ', result)
        if (result.role === 'BUYER') {
          navigate('/dashboard')
        } else if (result.role === 'SELLER') {
          navigate('/seller')
        } else if (result.role === 'ADMIN') {
          navigate('/admin')
        }
      } else {
        setErrorMessage(
          'Login failed. Please try again.'
        );
      }

    }
    catch (err) {
      setErrorMessage(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 stext-3xl hadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ps-3"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-2 text-gray-900 text-3xl tracking-widest shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ps-3"
                />
              </div>
            </div>


            {errorMessage && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to="/register" className='font-semibold text-indigo-600 hover:text-indigo-500'>
              Switch to Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
