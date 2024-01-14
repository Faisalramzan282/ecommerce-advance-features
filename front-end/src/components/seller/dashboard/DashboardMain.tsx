import React from 'react';
import SideBar from './SideBar/SideBar';
import BodyContent from './BodyContent/BodyContent';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
const DashboardMain: React.FC = () => {
  return (
    <div className="grid  grid-cols-5 min-h-screen">
      <div className="col-span-1 min-h-screen bg-sellerDashboardSidebar">
        <SideBar />
      </div>
        <div className='grid-flow-col flex flex-col col-span-4 '>
        <div className="flex-initial h-24 bg-sellerDashboardBody text-white">
          <NavBar />
        </div>
        <div className="flex-1 bg-sellerDashboardBody">
          <BodyContent />
        </div>
        <div className=" bg-sellerDashboardBody text-white">
          <Footer />
        </div>
        </div>
    </div>
  );
};
export default DashboardMain;