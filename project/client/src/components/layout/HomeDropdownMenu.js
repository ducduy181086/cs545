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

  const onClickOrderHistory = () => {
    handleClose();
    navigate('/order-history');
  }

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  return (
    <div style={{ padding: '20px' }}>
      {!isAuthenticated &&
        <Link to={'/login'}>
          <button>
            Sign in
          </button>
        </Link>}
      {/* Arrow Down Icon button */}
      {isAuthenticated &&
        <div className="flex items-center space-x-2">
          <h4>
            Hi, {user.email}
          </h4>
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
            onClick={handleClick}
          />
          <ArrowDropDownIcon onClick={handleClick} />
        </div>
      }

      {/* Menu component */}
      {isAuthenticated && <Menu
        anchorEl={anchorEl}        // The element that the menu is anchored to
        open={Boolean(anchorEl)}    // Whether the menu is open or not
        onClose={handleClose}       // Close the menu when clicked outside or on an item
        anchorOrigin={{
          vertical: 'bottom',      // Position the menu below the button
          horizontal: 'left',      // Align the menu to the left of the button
        }}
        transformOrigin={{
          vertical: 'top',         // Align the top of the menu with the bottom of the button
          horizontal: 'left',      // Align the left of the menu with the left of the button
        }}
      >
        {/* Menu Items */}
        <MenuItem onClick={onClickOrderHistory} sx={{
          fontFamily: '"Urbanist", sans-serif', // Apply custom font for this button only
          fontSize: '1.0rem',
        }}>Order History</MenuItem>

        <MenuItem onClick={handleLogout} sx={{
          fontFamily: '"Urbanist", sans-serif', // Apply custom font for this button only
          fontSize: '1.0rem',
        }}>Logout</MenuItem>
      </Menu>}
    </div>
  );
};

export default HomeDropdownMenu;
