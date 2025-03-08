
const filesToCache = [
  '/',
  '/offline.html','../src/assets/css/global.css',
  '../src/assets/css/Recommendations.css',
  '../src/assets/css/DetailView.css',
  '../src/assets/css/SightList.css',
  '../src/assets/css/SearchResults.css',
  '../src/components/Recommendations.jsx',
  '../src/components/RecommendationsCarousel.jsx',
  '../src/components/OfflineMessage.jsx',
  '../src/components/DetailView.jsx',
  '../src/components/SearchResult.jsx',
  '/static/media/Robot.c27d4c07.png',
  '/static/media/NewYork.339e1779.png',
  '/static/media/Area47.e4da3480.png',
  '/static/media/GrandCanyon.45346808.png',
  '/static/media/Louvre.7f52fe12.png',
  '/static/media/Pyramid.d7b6bc08.png',
  '/static/media/BurjKhalifa.13b0a216.png'

  
];

const cacheName = 'pages-cache-v2';
      
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
    return cache.addAll(filesToCache);
    })
  );
});

/*Delete old cache*/
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cache => {
        if (cache!== cacheName) {
          return caches.delete(cache);
        }
      })
    );
    })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
    caches.match(event.request)
    .then(response => {

        return response|| fetch(event.request)
        .then(async response => {
          const cache = await caches.open(cacheName);
          cache.put(event.request.url, response.clone()); //cache the data
          return response;
        });

    }).catch(error => {  
      return caches.match('offline.html');
    })
    );

});


