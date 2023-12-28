import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
//store fo utilizing global state
import store from '../GlobalRedux/store';
import '../../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}> 
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;