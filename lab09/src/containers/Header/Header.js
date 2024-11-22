import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

import { authActions } from "../../store/index";

function Header() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userName = useSelector(state => state.auth.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutHandler = (e) => {
    dispatch(authActions.logout());
    navigate('/login');
  }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <nav className="flex space-x-4">
          <Link to="/posts" className="text-lg font-semibold hover:text-blue-200">Posts</Link>
          {isAuthenticated && <Link to="/new-post" className="text-lg font-semibold hover:text-blue-200">New Post</Link>}
        </nav>
        <div>
          {isAuthenticated &&
          <>
          <span className="text-lg font-semibold mr-4">${userName}</span>
          <button onClick={logoutHandler} className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Logout</button>
          </>}
          {!isAuthenticated && <Link to="/login" className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">Sign in</Link>}
        </div>
      </div>
    </header>
  );
}

export default Header;
