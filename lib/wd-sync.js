// Generated by CoffeeScript 1.3.1
(function() {
  var MakeSync, Sync, Wd, WdWrap, buildOptions, wd, wdSync, _ref,
    __slice = [].slice;

  wd = require("wd");

  _ref = require('make-sync'), MakeSync = _ref.MakeSync, Sync = _ref.Sync;

  buildOptions = function(mode) {
    if (!(mode != null)) {
      mode = 'sync';
    }
    return {
      mode: mode,
      include: '*',
      exclude: ['getOpts', 'element']
    };
  };

  wdSync = {
    remote: function() {
      var args, browser, mode, options;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      mode = 'sync';
      args = args.filter(function(arg) {
        if (arg.mode != null) {
          mode = arg.mode;
          return false;
        } else {
          return true;
        }
      });
      browser = wd.remote.apply(wd, args);
      options = buildOptions(mode);
      MakeSync(browser, options);
      return browser;
    },
    current: function() {
      return Fiber.current.wd_sync_browser;
    }
  };

  Wd = function(options, cb) {
    var _ref1;
    if (typeof options === 'function') {
      _ref1 = [null, options], options = _ref1[0], cb = _ref1[1];
    }
    if (cb != null) {
      Sync(function() {
        Fiber.current.wd_sync_browser = options != null ? options["with"] : void 0;
        return cb.apply(options != null ? options["with"] : void 0, []);
      });
    }
    if (options) {
      return function(options2, cb2) {
        var _ref2;
        if (typeof options2 === 'function') {
          _ref2 = [null, options2], options2 = _ref2[0], cb2 = _ref2[1];
        }
        if (!(options2 != null)) {
          options2 = options;
        }
        return Wd(options2, cb2);
      };
    }
  };

  WdWrap = function(options, cb) {
    var _ref1;
    if (typeof options === 'function') {
      _ref1 = [null, options], options = _ref1[0], cb = _ref1[1];
    }
    if (cb != null) {
      return function(done) {
        if ((options != null ? options.pre : void 0) != null) {
          options.pre.apply(this, []);
        }
        return Sync(function() {
          Fiber.current.wd_sync_browser = options != null ? typeof options["with"] === "function" ? options["with"]() : void 0 : void 0;
          cb.apply(options != null ? typeof options["with"] === "function" ? options["with"]() : void 0 : void 0, []);
          if (done != null) {
            return done();
          }
        });
      };
    }
    if (options) {
      return function(options2, cb2) {
        var _ref2;
        if (typeof options2 === 'function') {
          _ref2 = [null, options2], options2 = _ref2[0], cb2 = _ref2[1];
        }
        if (!(options2 != null)) {
          options2 = options;
        }
        return WdWrap(options2, cb2);
      };
    }
  };

  exports.Wd = Wd;

  exports.WdWrap = WdWrap;

  exports.wd = wdSync;

}).call(this);