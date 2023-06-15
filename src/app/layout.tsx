import React from 'react';
import Providers from '@/redux/provider';
import Toast from './components/Toast';
import './globals.css';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const metadata = {
  title: 'Bookify store',
  description: 'Bookify store app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/book.png" sizes="any"/>
    </head>
    <body className="bg-[#dfe3ee]">
    <Providers>
      <Toast/>
      {children}
    </Providers>
    </body>
    </html>
  )
}
