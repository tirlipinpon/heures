/**
 * Service Worker pour la mise à jour automatique de l'application
 * Version: 1.4.2
 */

const VERSION = 'v1.4.2';
const CACHE_NAME = `horloge-cache-${VERSION}`;

// Liste des fichiers à mettre en cache
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './horloge.js',
    './animations.js',
    './joueurs.js',
    './script.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Installation du Service Worker', VERSION);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Mise en cache des fichiers');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Forcer l'activation immédiate
                return self.skipWaiting();
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activation du Service Worker', VERSION);
    
    event.waitUntil(
        // Supprimer les anciens caches
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Prendre le contrôle immédiatement de toutes les pages
            return self.clients.claim();
        })
    );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Stratégie Network First avec fallback sur le cache
        fetch(event.request)
            .then((response) => {
                // Si la requête réussit, mettre à jour le cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // En cas d'erreur réseau, utiliser le cache
                return caches.match(event.request);
            })
    );
});

// Message pour forcer le rechargement
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

