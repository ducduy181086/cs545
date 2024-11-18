import React from 'react';
import './BuyerDashboard.css';

const macbookData = [
  {
    name: 'MacBook Air',
    image: '/path/to/macbook-air.png',
  },
  {
    name: 'MacBook Pro',
    image: '/path/to/macbook-pro.png',
  },
  {
    name: 'MacBook',
    image: '/path/to/macbook.png',
  },
  {
    name: 'All MacBooks',
    image: '/path/to/all-macbooks.png',
  },
];

const BuyerDashboard = () => {
  return (
    <div className="macbook-list-container">
      <h2 className="heading">Shop MacBooks</h2>
      <p className="subheading">Tested and perfected to the core</p>
      <div className="macbook-grid">
        {macbookData.map((item, index) => (
          <div key={index} className="macbook-card">
            <img src={item.image} alt={item.name} className="macbook-image" />
            <p className="macbook-title">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
