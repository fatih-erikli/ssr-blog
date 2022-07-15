import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App';

const ClientSideRendering = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serverContent = (globalThis as any).SERVER_CONTENT;
  return <App page={{ name: 'home', content: serverContent }} />;
};

hydrateRoot(document.getElementById('root') as HTMLElement, <ClientSideRendering />);
