# angular-segment

An AngularJS module for Segment, the Analytics API and customer data hub.

This module automatically includes Segment's Analytics.js library, you do not
need to include it yourself.

# Installing

At the moment, the name `angular-segment` has been taken up by another project.

So you need to include this project via Git:

```bash
bower install --save https://github.com/glints-dev/angular-segment#master
```

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

# Directives

There is currently one directive to simply tracking.

```html
<button type="submit"
        data-segment-track="Signed Up"
        data-segment-track-options="{
          plan: 'Startup',
          source: 'Analytics Academy'
        }">
</button>
```
