import { handleRequest } from './handler'
const PROXYPATH = 'search';

addEventListener('fetch', (event) => {
        const url = new URL(event.request.url);
        if (url.pathname.startsWith('/' + PROXYPATH + '/') || url.pathname === '/' + PROXYPATH) {
            handleRequest(event, url);
        } else {
            event.respondWith(fetch(event.request));
        }
    }
)
