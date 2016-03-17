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
    /**
     * @ngdoc service
     * @module ngSegment
     * @name SegmentProvider
     */
    .provider('Segment', function SegmentProvider() {
      var writeKey = null;

      /**
       * @ngdoc method
       * @methodOf SegmentProvider
       * @name setWriteKey
       * @param {String} key The write key to be used
       * @description
       * Sets the write key to be used with Segment. See Segment's documentation
       * for more information:
       * https://segment.com/docs/libraries/analytics.js/quickstart/
       */
      this.setWriteKey = function setWriteKey(key) {
        writeKey = key;
      };

      /**
       * @ngdoc service
       * @module ngSegment
       * @name Segment
       * See Segment's Analytics.js documentation for more info:
       * https://segment.com/docs/libraries/analytics.js/
       */
      this.$get = function SegmentFactory($window) {
        var analytics = $window.analytics = $window.analytics || [];

        analytics.methods = [
          'trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview',
          'identify', 'reset', 'group', 'track', 'ready', 'alias', 'page', 'once',
          'off', 'on'
        ];

        analytics.factory = function (method) {
          return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(method);
            analytics.push(args);
            return analytics;
          };
        };

        for (var i = 0; i < analytics.methods.length; i++) {
          var key = analytics.methods[i];
          analytics[key] = analytics.factory(key);
        }

        analytics.load = function (key) {
          var script = $window.document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = '//cdn.segment.com/analytics.js/v1/' + key +'/analytics.min.js';
          script.onload = function () {
            angular.copy($window.analytics, analytics);
          };

          var first = $window.document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore(script, first);
        };

        analytics.SNIPPET_VERSION = '3.1.0';
        analytics.load(writeKey);

        return analytics;
      };
    })
    /**
     * @ngdoc directive
     * @restrict A
     */
    .directive('segmentTrack', function (Segment) {
      return {
        restrict: 'A',
        scope: {
          event: '@segmentTrack',
          options: '<?segmentTrackOptions'
        },
        link: function link(scope, elem) {
          elem.click(function () {
            Segment.track(scope.event, scope.options);
          });
        }
      };
    });
}));
