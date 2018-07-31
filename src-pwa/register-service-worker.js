/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

import { register } from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
  ready () {
    console.log('App is being served from cache by a service worker.') // eslint-disable-line no-console
  },
  cached (registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('Content has been cached for offline use.') // eslint-disable-line no-console
  },
  updated (registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('New content is available; please refresh.') // eslint-disable-line no-console
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.') // eslint-disable-line no-console
  },
  error (err) {
    console.error('Error during service worker registration:', err) // eslint-disable-line no-console
  }
})

// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
