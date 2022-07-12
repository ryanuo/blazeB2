/*
 * @Author: Harry
 * @Date: 2022-07-12 16:42:36
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-12 16:47:21
 * @FilePath: \master\public\sw.js
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({
  prefix: 'BlazeB2',
  suffix: 'v1.0.1'
})
// have our sw update and control a web page as soon as possible.
// workbox.skipWaiting();
// workbox.clientsClaim();

// vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// cache our data, and use networkFirst strategy.
// workbox.routing.registerRoute(
//   // Cache CSS files
//   /.*\.css/,
//   // 使用缓存，但尽快在后台更新
//   workbox.strategies.staleWhileRevalidate({
//     // 使用自定义缓存名称
//     cacheName: 'css-cache'
//   })
// )

// // 缓存web的js资源
// workbox.routing.registerRoute(
//   // 缓存JS文件
//   /.*\.js/,
//   // 使用缓存，但尽快在后台更新
//   workbox.strategies.staleWhileRevalidate({
//     // 使用自定义缓存名称
//     cacheName: 'js-cache'
//   })
// )

// // 缓存web的图片资源
// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'images-cache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 1 * 24 * 60 * 60 // 设置缓存有效期为30天
//       })
//     ]
//   })
// )
