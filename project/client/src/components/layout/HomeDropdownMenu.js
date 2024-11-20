import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';


const HomeDropdownMenu = () => {
  // State to control the open/close of the menu
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

  return (
    <div style={{ padding: '20px' }}>
      {/* Arrow Down Icon button */}
      <IconButton onClick={handleClick}>
        <ArrowDropDownIcon />
      </IconButton>

      {/* Menu component */}
      <Menu
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
        <MenuItem onClick={handleClose} sx={{
          fontFamily: '"Urbanist", sans-serif', // Apply custom font for this button only
          fontSize: '1.0rem',
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default HomeDropdownMenu;
