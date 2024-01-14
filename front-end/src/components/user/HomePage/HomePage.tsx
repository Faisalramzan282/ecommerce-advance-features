import { NextPageWithLayout } from '../../../types/page';
import UserLayout from '../../../layout/user/UserLayout';
import Header from '../Header/Header';

const HomePage: NextPageWithLayout = () => {
  return(
    <div>
        <p>Home page</p>
    </div>
  )
};

HomePage.getLayout = function getLayout(page) {
  return <UserLayout>{page}</UserLayout>;
};

export default HomePage;