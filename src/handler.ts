const DOMAIN = 'kadin.codes';


const PROXYPATH = 'search';                // path to be proxied
const ORIGIN = 'google.com';         // where to fetch content from
export async function handleRequest(event: FetchEvent, url: URL) {
  // Change URL from public URL to use the origin URL
  const originUrl = url.toString().replace(
      'https://' + DOMAIN + '/' + PROXYPATH,
      'https://' + ORIGIN
  );

  event.passThroughOnException();

  const customerIPAddress = event.request.headers.get("CF-Connecting-IP")!;
  event.respondWith(fetch(originUrl, {headers: {"X-Forwarded-For": customerIPAddress}}));

}