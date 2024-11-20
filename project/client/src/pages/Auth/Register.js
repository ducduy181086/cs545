import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { registerBuyer, registerSeller } from 'services/authService';

const Register = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('BUYER');

  const handleSelectionRole = (role) => {
    setSelectedRole(role);
  };
  const handleRegister = async () => {
    const userData = {
      email: email,
      password: password,
      // role: selectedRole
    };
    if (selectedRole === 'BUYER') {
      const result = registerBuyer(userData)
      if (result) {
        navigate('/login')
      }
    } else if (selectedRole === 'SELLER') {
      result = registerSeller(userData)
      if (result) {
        navigate('/login')
      }
    }
  };


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register
          </h2>
        </div>


        <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex border rounded-lg divide-x divide-gray-200 shadow">
            <button
              onClick={() => handleSelectionRole('BUYER')}
              className={`flex-1 py-2 px-4 text-center ${selectedRole === 'BUYER' ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}>
              Buyer
            </button>
            <button
              onClick={() => handleSelectionRole('SELLER')}
              className={`flex-1 py-2 px-4 text-center ${selectedRole === 'SELLER' ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}>
              Seller
            </button>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{' '}
            <Link to="/login" className='font-semibold text-indigo-600 hover:text-indigo-500'>
              Switch to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
