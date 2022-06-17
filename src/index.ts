import { handleRequest } from './handler';
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

const handleEvent = async (event: FetchEvent) => {
  const url = new URL(event.request.url);
  const { pathname } = url;
  switch (pathname) {
    case "/logo.png":
    case "/style.css":
    case "/favicon.png":
    case "/client.js":
    case "/syntax-highlight.js":
    case "/syntax-highlight.css":
      return await getAssetFromKV(event);
    default:
      return handleRequest(event.request);
  }
}

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleEvent(event));
});
