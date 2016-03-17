/**
 * angular-segment - AngularJS module for Segment
 * (C) 2016 Wong Yong Jie
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module
    define(['angular'], function (angular) {
      return factory(root, angular);
    });
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    module.exports = factory({}, require('angular'));
  } else if (angular) {
    factory(root, root.angular);
  }
}(this, function (global, angular) {
  angular.module('ngSegment', [])
    .provider('Segment', function SegmentProvider() {
      var writeKey = null;

      this.setWriteKey = function setWriteKey(key) {
        writeKey = key;
      };

      this.$get = function SegmentFactory($window) {
        var analytics = $window.analytics = $window.analytics || [];

        analytics.methods = [
          'trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview',
          'identify', 'reset', 'group', 'track', 'ready', 'alias', 'page', 'once',
          'off', 'on'
        ];

        analytics.factory = function (t) {
          return function () {
            var e = Array.prototype.slice.call(arguments);
            e.unshift(t);
            analytics.push(e);
            return analytics;
          };
        };

        for (var t = 0; t < analytics.methods.length; t++) {
          var e = analytics.methods[t];
          analytics[e] = analytics.factory(e);
        }

        analytics.load = function (t) {
          var e = $window.document.createElement('script');
          e.type = 'text/javascript';
          e.async = true;
          e.src = '//cdn.segment.com/analytics.js/v1/' + t +'/analytics.min.js';
          var n = $window.document.getElementsByTagName('script')[0];
          n.parentNode.insertBefore(e, n);
        };

        analytics.SNIPPET_VERSION = '3.1.0';
        analytics.load(writeKey);

        return analytics;
      };
    });
}));
