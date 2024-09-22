import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import StoreProvider from '@/redux/store-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jan Hesters Production Redux Tutorial',
  description: 'Part three of five to master Redux.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
