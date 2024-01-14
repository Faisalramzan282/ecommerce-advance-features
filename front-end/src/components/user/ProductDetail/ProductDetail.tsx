import { NextPageWithLayout } from '../../../types/page';
import UserLayout from '../../../layout/user/UserLayout';
import Header from '../Header/Header';

const ProductDetail: NextPageWithLayout = () => {
  return(
    <div>
        <p>Product Detail Page </p>
    </div>
  )
};
ProductDetail.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};
export default ProductDetail;