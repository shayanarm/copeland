'use server';
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <AppRouterCacheProvider>
            {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}