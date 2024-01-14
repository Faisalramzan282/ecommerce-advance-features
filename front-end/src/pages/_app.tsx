// import React from 'react';
// import { Provider } from 'react-redux';
// import { AppProps } from 'next/app';
// import store from '../GlobalRedux/store';
// import '../../styles/globals.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}> 
//       <Component {...pageProps} />
//       <ToastContainer position="bottom-right" autoClose={5000} />
//     </Provider>
//   );
// }
// export default MyApp;
//---------------------------------------------
import React from 'react';
import { Provider } from 'react-redux';
import { AppPropsWithLayout } from '@/types/page';
import store from '../GlobalRedux/store';
import '../../styles/globals.css';
import RootLayout from '@/layout/RootLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <RootLayout>
      {getLayout(<Component {...pageProps} />)}
      {/* <ToastContainer position="bottom-right" autoClose={5000} /> */}
      </RootLayout>
    </Provider>
  );
}
export default MyApp;