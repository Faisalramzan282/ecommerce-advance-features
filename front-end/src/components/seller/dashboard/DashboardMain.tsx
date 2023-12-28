// pages/index.tsx
import React from 'react';
import Sidebar from './SideBard';
import Navbar from './NavBar';
import CoreContents from './CoreContent';
import Footer from './Footer';

const DashboardMain: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <CoreContents>
          {/* Page content goes here */}
          <h1 className="text-4xl font-bold mb-4">Hello, Next.js!</h1>
          {/* <p>This is the main content of the page.</p> */}
        </CoreContents>
        <Footer />
      </div>
    </div>
  );
};
export default DashboardMain;
