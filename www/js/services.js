angular.module('starter.services', [])
.factory('WeatherAPI', function() {
    this.getHourlyForecast = function() {
      
    }
    this.getWeeklyForecast = function() {

    }
})


.factory('Location', function() {
    var locations = [
        {   name: "Atlanta",
            lat:33.7550,
            lng:-84.3900,
            id:0}
    ];

    var activeLocation = locations[0];

    return {
        allLocations:function() {
            return locations;
        },

        addLocation: function(name, lat, lng) {
            locations.push({name:name,
                    lat:lat,
                    lng:lng,
                    id:locations.length});

            return locations.length - 1;
        },

        currentLoc: function() {
            return activeLocation;
        },

        setLocation: function(id) {
            activeLocation = locations[id];
        },

        remove: function(id) {
            locations.splice(id, 1);
        }
    };
})
