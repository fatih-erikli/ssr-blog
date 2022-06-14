import React, { FC, ReactNode } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ServerSideContainer } from './containers/ServerSideContainer';
import { exactMatch, getRoutes } from './routes';
import { Route } from './types';

declare const BLOG: KVNamespace;

const matchRoute = (routes: readonly Route[], pathname: string): Route => {
  let matchedRoute: Route;
  for (const route of routes) {
    const { match } = route;
    if (match(pathname)) {
      matchedRoute = route;
      break;
    }
  }

  matchedRoute ||= {
    match: exactMatch('/'),
    handler: () => Promise.resolve('default'),
    container: ServerSideContainer,
    contentType: 'text/html',
  };

  return matchedRoute;
};

export async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  const matchedRoute = matchRoute(getRoutes(), pathname);
  let stream;
  switch (matchedRoute.contentType) {
    case 'text/html': {
      const Container = matchedRoute.container;
      const component = <Container>{(await matchedRoute.handler(request))}</Container>;
      try {
        stream = await ReactDOMServer.renderToString(component);
      } catch (error) {
        console.log(error)
      }
      stream = `<!DOCTYPE html>${stream}`;
      break;
    }
    case 'text/plain': {
      stream = await matchedRoute.handler(request);
      break;
    } 
    case 'text/css': {
      stream = await matchedRoute.handler(request);
      break;
    }
  }
  return new Response(stream, { headers: { 'Content-Type': matchedRoute.contentType } });
}
