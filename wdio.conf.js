const path = require('path');
const fs = require('fs');
const R = require('ramda');

const devices = {
  desktop: {
    width: 1300,
    height: 900
  },
  mobile: {
    width: 640,
    height: 960
  },
  tablet: {
    width: 1024,
    height: 1366
  }
};

exports.config = {
    specs: [
        './webdriver/specs/**/*.js'
    ],
    exclude: [],
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'verbose',
    coloredLogs: true,
    screenshotPath: './webdriver/errorShots/',
    baseUrl: 'http://tutum',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporter: 'dot',
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-core/register']
    },
    onPrepare: function() {},
    before: function() {
      require('babel-core/register');

      // Add page objects
      browser.pageObject = fs
        .readdirSync('./page_objects/')
        .reduce((acc, x) => {
          acc[path.basename(x, '.js')] = require('./page_objects/' + x);
          return acc;
         }, {});

      // Add commands
      fs
        .readdirSync('./webdriver/commands/')
        .forEach((file) => browser.addCommand(
          path.basename(file, '.js')
          , require('./webdriver/commands/' + file)
        ));

      browser.on('error', function (e) {
        console.error(e);
      });

      return browser.setViewportSize(devices.desktop);
    },
    after: function(failures, pid) {},
    onComplete: function() {}
};
