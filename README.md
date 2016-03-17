# angular-segment

An AngularJS module for Segment, the Analytics API and customer data hub.

This module automatically includes Segment's Analytics.js library, you do not
need to include it yourself.

# Example

Inject `SegmentProvider` into your `.config()` block, then configure as
follows:

```javascript
SegmentProvider.setWriteKey('<your write key>');
```

Then in everywhere else, you just need to inject `Segment`.

```javascript
angular.module('myApp')
  .controller('AwesomeController', function (Segment) {
    Segment.track('Signed Up', {
      plan: 'Startup',
      source: 'Analytics Academy'
    });
  });
```

If you use ui-router and would like to track virtual page views, you can simply
do:

```javascript
$rootScope.on('$stateChangeSuccess', function () {
  Segment.page();
});
```
