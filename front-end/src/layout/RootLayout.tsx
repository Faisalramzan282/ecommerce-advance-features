import React, {ReactNode} from 'react';
import Head from 'next/head';
interface RootLayoutProps {
    children: ReactNode;
  }
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Welcome to my Next.js application" />
        <title>Ecommerece website</title>
      </Head>
      {children}
    </div>
  );
};

export default RootLayout;
