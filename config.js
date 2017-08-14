const Config = require('electron-config');

module.exports = new Config({
  defaults: {
    zoomFactor: 1,
    windowState: {
      width: 1070,
      height: 840
    },
    url: 'https://app.zenhub.com'
  }
});
