import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const useAuth = () => {
  const { user, login, logout, register, isAuthenticated } = useContext(AuthContext);

  return { user, login, logout, register, isAuthenticated };
};

export default useAuth;
