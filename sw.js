importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.googleAnalytics.initialize(); 

//cache name configuration
workbox.core.setCacheNameDetails({
  prefix: 'ppl-',
  suffix: '-v1',
  precache: 'app-precache',
}); 

//precache static files
workbox.precaching.precacheAndRoute([
  {
    url: '/index.html',
    revision: '7b3a434a772782086e55d4893302ce39',
  },
]); 

//for navigation return cached index.html file
workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'), {
  blacklist: [/^\/_/, /\/[^\/?]+\.[^\/]+$/],
});

//caching site assets
workbox.routing.registerRoute(
  /\.(?:ico|json)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 7 * 24 * 60 * 60, //cache age 1 week
      }),
    ],
  })
);

//caching css files
workbox.routing.registerRoute(
  /\.(?:css|sass)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'css-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 1 * 24 * 60 * 60, //cache age 1 day
      }),
    ],
  })
); 

//caching image files
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60, //cache age 1 week
      }),
    ],
  })
); 

//caching js files
workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 1 * 24 * 60 * 60, //cache age 1 day
      }),
    ],
  })
);
