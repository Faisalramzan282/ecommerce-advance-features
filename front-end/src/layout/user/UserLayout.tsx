import { ReactNode } from 'react';
import Header from '@/components/user/Header/Header';
import Footer from '@/components/user/Footer/Footer';
import HomePage from '../../components/user/HomePage/HomePage';
import ProductDetail from '../../components/user/ProductDetail/ProductDetail';
interface LayoutProps {
  children: ReactNode;
}
const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>

      <Header  />
      {children}
      <Footer  />
      {/* <HomePage/>
      <ProductDetail/> */}
    </div>
  );
};

export default UserLayout;