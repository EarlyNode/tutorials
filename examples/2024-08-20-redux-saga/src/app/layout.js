import './globals.css';

import { Inter } from 'next/font/google';

import { StoreProvider } from './redux/store-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jan Hesters Redux Tutorial',
  description: 'Part one of three to master Redux.',
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
