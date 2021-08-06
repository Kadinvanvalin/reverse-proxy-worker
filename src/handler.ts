const DOMAIN = 'kadin.codes';


const PROXYPATH = 'search';                // path to be proxied
const ORIGIN = 'google.com';         // where to fetch content from


//
// X-Forwarded-Server
// 	Name of the computer/server the proxied request came from	This will help with troubleshooting in the event multiple servers are used for the proxy
//

// This allows us to know what the proxy directory is
//
// The full path is required.
//
// Ex: The full path for a Request to https://tjmaxx.tjx.com/cj/tags/11027/tag.js is /cj/tags/11027/tag.js
export async function handleRequest(event: FetchEvent, url: URL) {
    // Change URL from public URL to use the origin URL
    const host = url.hostname
    const DOMAIN = host
    const originUrl = url.toString().replace(
        'https://' + DOMAIN + '/' + PROXYPATH,
        'https://' + ORIGIN
    );

    event.passThroughOnException();

    const customerIPAddress = event.request.headers.get("CF-Connecting-IP") || "0.0.0.0";
    const requestHost = event.request.headers.get("CF-Worker") || "cf-worker"
    event.respondWith(fetch(originUrl, {
        headers: {
            "X-Forwarded-Server": "worker",
            "X-Forwarded-Request-Host": requestHost,
            "X-Forwarded-For": customerIPAddress,
            "X-Forwarded-Host": host,
            "X-Forwarded-Request-Path": url.pathname, // "PROXYPATH/*"
        }
    }));

}