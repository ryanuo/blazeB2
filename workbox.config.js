/*
 * @Author: Harry
 * @Date: 2022-07-12 21:06:05
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-07-12 22:24:28
 * @FilePath: \dev\workbox.config.js
 */
module.exports = {
  globDirectory: 'dist',
  globPatterns: [
    '**/*.{css,html,js}'
  ],
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ],
  skipWaiting: true,
  clientsClaim: true
}

// npm install -g workbox-cli

// workbox wizard

// workbox generateSW workbox-config.js
