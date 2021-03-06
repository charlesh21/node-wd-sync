// Generated by CoffeeScript 1.6.3
(function() {
  var chai, _;

  GLOBAL.wdSync = require('../../index');

  chai = require('chai');

  GLOBAL.should = chai.should();

  _ = require('lodash');

  GLOBAL.env = {};

  env.REMOTE_CONFIG = process.env.REMOTE_CONFIG;

  env.VERBOSE = process.env.VERBOSE;

  env.TIMEOUT = process.env.TIMEOUT || 45000;

  env.TIMEOUT = parseInt(env.TIMEOUT, 10);

  env.BROWSER = process.env.BROWSER || 'chrome';

  env.DESIRED = process.env.DESIRED || (env.BROWSER ? {
    browserName: env.BROWSER
  } : void 0);

  env.HTTP_CONFIG = {};

  if (process.env.HTTP_TIMEOUT != null) {
    env.HTTP_CONFIG.timeout = parseInt(process.env.HTTP_TIMEOUT, 10);
  }

  if (process.env.HTTP_RETRIES != null) {
    env.HTTP_CONFIG.retries = parseInt(process.env.HTTP_RETRIES, 10);
  }

  if (process.env.HTTP_RETRY_DELAY) {
    env.HTTP_CONFIG.retryDelay = parseInt(process.env.HTTP_RETRY_DELAY, 10);
  }

  env.DEBUG_CONNECTION = process.env.DEBUG_CONNECTION;

  env.EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;

  env.MIDWAY_ROOT_URL = "http://127.0.0.1:" + env.EXPRESS_PORT;

  GLOBAL.desiredWithTestInfo = function(testInfo) {
    var desired;
    desired = _.clone(env.DESIRED);
    if (env.SAUCE) {
      if (testInfo != null ? testInfo.name : void 0) {
        desired.name = testInfo.name;
      }
      if (env.TRAVIS_JOB_NUMBER) {
        desired.name = "[" + env.TRAVIS_JOB_NUMBER + "] " + desired.name;
      }
      if (testInfo != null ? testInfo.tags : void 0) {
        desired.tags = _.union(desired.tags, testInfo.tags);
      }
    }
    if (env.TRAVIS_JOB_NUMBER) {
      desired['tunnel-identifier'] = env.TRAVIS_JOB_NUMBER;
    }
    return desired;
  };

  env.SAUCE_CONNECT = process.env.SAUCE_CONNECT ? true : false;

  env.SAUCE = process.env.SAUCE ? true : false;

  env.SAUCE = env.SAUCE || env.SAUCE_CONNECT;

  env.TRAVIS_JOB_ID = process.env.TRAVIS_JOB_ID;

  env.TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;

  env.TRAVIS_BUILD_NUMBER = process.env.TRAVIS_BUILD_NUMBER;

  if (env.TRAVIS_JOB_ID) {
    env.TRAVIS = true;
    console.log("Travis environment detected.");
    console.log("TRAVIS_JOB_ID --> ", env.TRAVIS_JOB_ID);
    console.log("TRAVIS_BUILD_NUMBER --> ", env.TRAVIS_BUILD_NUMBER);
    console.log("TRAVIS_JOB_NUMBER --> ", env.TRAVIS_JOB_NUMBER);
  }

  if (env.SAUCE) {
    env.SAUCE_JOB_ID = env.TRAVIS_BUILD_NUMBER || process.env.SAUCE_JOB_ID || Math.round(new Date().getTime() / (1000 * 60));
    env.SAUCE_USERNAME = process.env.SAUCE_USERNAME;
    env.SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
    env.SAUCE_PLATFORM = process.env.SAUCE_PLATFORM;
    env.SAUCE_RECORD_VIDEO = process.env.SAUCE_RECORD_VIDEO;
    if (env.SAUCE_CONNECT) {
      env.REMOTE_CONFIG = 'http://' + env.SAUCE_USERNAME + ':' + env.SAUCE_ACCESS_KEY + '@localhost:4445/wd/hub';
    } else {
      env.REMOTE_CONFIG = 'http://' + env.SAUCE_USERNAME + ':' + env.SAUCE_ACCESS_KEY + '@ondemand.saucelabs.com/wd/hub';
    }
    env.DESIRED.platform = env.DESIRED.platform || env.SAUCE_PLATFORM || 'Linux';
    env.DESIRED.build = env.SAUCE_JOB_ID;
    env.DESIRED["record-video"] = env.SAUCE_RECORD_VIDEO;
    env.DESIRED.tags = env.DESIRED.tags || [];
    env.DESIRED.tags.push('wd-sync');
    if (env.TRAVIS_JOB_NUMBER) {
      env.DESIRED.tags.push('travis');
    }
    if (env.BROWSER === 'explorer') {
      env.DESIRED.browserName = 'internet explorer';
      env.DESIRED.platform = 'Windows 7';
      env.DESIRED.version = '10';
    }
  }

  env.TEST_ENV_DESC = "(" + (env.SAUCE ? 'sauce' : 'local') + ", browser: " + (env.DESIRED.browserName || "default") + ")";

}).call(this);
