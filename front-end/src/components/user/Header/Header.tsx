import React from 'react';
import UserLayout from '@/layout/user/UserLayout';

const Header: React.FC = () => {
  const handleButtonClick = () => {
    // Show an alert
    alert('Button Clicked!');

    // Log data to the console
    console.log('Button clicked. Additional data can be logged here.');
  };

  return (
    // <UserLayout>
    <header>
      <button onClick={handleButtonClick}>Click Me</button>
    </header>
    // </UserLayout>
  );
};

export default Header;
