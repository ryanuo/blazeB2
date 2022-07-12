/*
 * @Author: Harry
 * @Date: 2022-07-05 16:36:36
 * @LastEditors: harry
 * @Github: https://github.com/rr210
<<<<<<< HEAD
 * @LastEditTime: 2022-07-12 16:39:14
 * @FilePath: \master\src\registerServiceWorker.js
=======
 * @LastEditTime: 2022-07-12 16:53:21
 * @FilePath: \dev\src\registerServiceWorker.js
>>>>>>> dev
 */
/* eslint-disable no-console */

import { register } from 'register-service-worker'

<<<<<<< HEAD
if (process.env.NODE_ENV === 'pro') {
  register(`${process.env.BASE_URL}sw.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
=======
register(`${process.env.BASE_URL}sw.js`, {
  ready() {
    console.log(
      'App is being served from cache by a service worker.\n' +
      'For more details, visit https://goo.gl/AFskqB'
    )
  },
  registered() {
    console.log('Service worker has been registered.')
  },
  cached() {
    console.log('Content has been cached for offline use.')
  },
  updatefound() {
    console.log('New content is downloading.')
  },
  updated() {
    console.log('New content is available; please refresh.')
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error(error) {
    console.error('Error during service worker registration:', error)
  }
})
>>>>>>> dev
