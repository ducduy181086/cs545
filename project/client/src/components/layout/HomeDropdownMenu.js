import React, { useContext, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';


const HomeDropdownMenu = () => {
  // State to control the open/close of the menu
  const { user, isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Open the menu when the icon button is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  const handleNavigation = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <div className="relative">
      {!isAuthenticated && (
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign In
          </button>
        </Link>
      )}

      {isAuthenticated && (
        <div className="flex items-center space-x-3 cursor-pointer">
          <div>
            <p className="font-medium text-gray-800">Hi, {user?.email || 'Guest'}</p>
          </div>
          <img
            src={user?.avatar || 'https://i.pravatar.cc/150?img=5'}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300"
            onClick={handleClick}
          />
          <ArrowDropDownIcon onClick={handleClick} className="text-gray-600 hover:text-gray-800" />
        </div>
      )}

      {isAuthenticated && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}

        >
          {isAuthenticated && user.role === 'SELLER' &&
            <MenuItem
              onClick={() => handleNavigation('/seller')}
              className="text-gray-700 hover:text-blue-600"
              sx={{ fontSize: '1rem', fontWeight: 500 }}
            >
              Seller Dashboard
            </MenuItem>
          }
          {isAuthenticated && user.role === 'ADMIN' &&
            <MenuItem
              onClick={() => handleNavigation('/admin')}
              className="text-gray-700 hover:text-blue-600"
              sx={{ fontSize: '1rem', fontWeight: 500 }}
            >
              Admin Dashboard
            </MenuItem>
          }
          <MenuItem
            onClick={() => handleNavigation('/order-history')}
            className="text-gray-700 hover:text-blue-600"
            sx={{ fontSize: '1rem', fontWeight: 500 }}
          >
            Order History
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600"
            sx={{ fontSize: '1rem', fontWeight: 500 }}
          >
            Logout
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default HomeDropdownMenu;
