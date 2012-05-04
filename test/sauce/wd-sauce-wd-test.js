// Generated by CoffeeScript 1.3.1
(function() {
  var TIMEOUT, Wd, WdWrap, config, should, testWithBrowser, wd, _ref;

  _ref = require('../../index'), wd = _ref.wd, Wd = _ref.Wd, WdWrap = _ref.WdWrap;

  should = require('should');

  config = null;

  try {
    config = require('./config');
  } catch (err) {

  }

  TIMEOUT = 180000;

  testWithBrowser = function(browserName) {
    return it("using " + browserName, function(done) {
      var browser, desired;
      this.timeout(TIMEOUT);
      desired = {
        platform: "LINUX",
        name: "wd-sync sauce test"
      };
      if (browserName != null) {
        desired.browserName = browserName;
      }
      if (browserName === 'IE') {
        desired.browserName = 'iexplore';
        desired.version = '9';
        desired.platform = 'VISTA';
      }
      browser = wd.remote("ondemand.saucelabs.com", 80, config.saucelabs.username, config.saucelabs['access-key'], {
        mode: 'sync'
      });
      return Wd({
        "with": browser
      }, function() {
        var caps, queryField;
        should.exist(this.status());
        this.init(desired);
        caps = this.sessionCapabilities();
        should.exist(caps);
        should.exist(caps.browserName);
        this.get("http://google.com");
        this.title().toLowerCase().should.include('google');
        queryField = this.elementByName('q');
        this.type(queryField, "Hello World");
        this.type(queryField, "\n");
        this.setWaitTimeout(3000);
        this.elementByCss('#ires');
        this.title().toLowerCase().should.include('hello world');
        this.close();
        this.quit();
        return done();
      });
    });
  };

  describe("wd-sauce", function() {
    it("checking config", function(done) {
      should.exist(config, 'you need to configure your sauce username and access-key ' + 'in the file config.coffee.');
      return done();
    });
    return describe("using Wd", function() {
      describe("passing browser", function() {
        var browserName, _i, _len, _ref1, _results;
        _ref1 = [void 0, 'firefox', 'chrome', 'IE'];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          browserName = _ref1[_i];
          _results.push(testWithBrowser(browserName));
        }
        return _results;
      });
      return describe("without passing browser", function() {
        it("initializing browser", function(done) {
          var browser;
          this.timeout(TIMEOUT);
          browser = wd.remote("ondemand.saucelabs.com", 80, config.saucelabs.username, config.saucelabs['access-key'], {
            mode: 'sync'
          });
          Wd = Wd({
            "with": browser
          });
          return done();
        });
        return it("browsing", function(done) {
          var desired;
          this.timeout(TIMEOUT);
          desired = {
            platform: "LINUX",
            name: "wd-sync sauce test",
            browserName: 'firefox'
          };
          return Wd(function() {
            var queryField;
            this.init(desired);
            this.get("http://google.com");
            this.title().toLowerCase().should.include('google');
            queryField = this.elementByName('q');
            this.type(queryField, "Hello World");
            this.type(queryField, "\n");
            this.setWaitTimeout(3000);
            this.elementByCss('#ires');
            this.title().toLowerCase().should.include('hello world');
            this.close();
            this.quit();
            return done();
          });
        });
      });
    });
  });

}).call(this);
