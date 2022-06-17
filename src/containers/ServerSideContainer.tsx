import React, { ReactNode } from 'react';
import { FC } from 'react';

export const ServerSideContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html>
      <head>
        <link rel={'stylesheet'} href={'/style.css'} />
        <title>Fatih Erikli</title>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="favicon.png" />
        <meta property="og:image" content="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
      <script src="syntax-highlight.js"></script>
      <link rel="stylesheet" href="/syntax-highlight.css" />
      <script>hljs.highlightAll();</script>
    </html>
  );
};
