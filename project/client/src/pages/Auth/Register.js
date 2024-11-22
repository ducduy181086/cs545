import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { registerBuyer, registerSeller } from 'services/authService';

const Register = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('BUYER');

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectionRole = (role) => {
    setSelectedRole(role);
  };

  const handleRegister = async (event) => {
    event.preventDefault()
    const userData = {
      email: email,
      password: password,
      // role: selectedRole
    };
    try {
      let result;
      if (selectedRole === 'BUYER') {
        result = await registerBuyer(userData);
      } else if (selectedRole === 'SELLER') {
        result = await registerSeller(userData);
      }
      if (result) {
        setIsSuccessDialogOpen(true);
        setErrorMessage('');//clear err
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  const handleDialogClose = () => {
    setIsSuccessDialogOpen(false);
    navigate('/login');
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

      {isSuccessDialogOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-lg font-semibold text-gray-800">
              Registration Successful
            </h3>
            <p className="mt-4 text-gray-600">
              Your account has been created successfully. Click OK to log in.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleDialogClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
