const cp = require('child_process');

setInterval(() => {
  cp.fork('scraper.js');
  console.log('runing scraper.js');
}, 1000 * 10);
