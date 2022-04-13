var distance = require('google-distance');

distance.apiKey='AIzaSyBHMzrAGr4IbATsDngD9hX_8YZLzvt7yXo';
var customerCoordinates ='31.973443222650047, 35.910191451687425';
var providerCoordinates = '31.956708379480443, 35.84737118083009'
distance.get(
    {
      index: 1,
      origin: customerCoordinates,
      destination: providerCoordinates,
    },
    function(err, data) {
      if (err) return console.log(err);
      console.log(data);
    });