# description
tiny event module without any dependencies

# useage

```
npm install tiny-event --save
```

```javascript
var evt = require('tiny-event')()

evt.on('name', function(data){
  console.log('something happen with data: ', JSON.stringify(data))
})

evt.fire('name', {ping: 'pong'})

evt.off('name')
```
