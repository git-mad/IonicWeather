angular.module('starter.controllers', [])

.controller('TodayCtrl', function($scope, $http, Location) {
    var apiCall;

    var locationString = Location.currentLoc().lat + "," + Location.currentLoc().lng;

    $http.get("https://api.forecast.io/forecast/8ad794015cf94155cedd0092af9927c4/"+ locationString)
        .then(function(resp) {
            apiCall = resp.data;

            $scope.temp = apiCall.currently.temperature;
            $scope.sky = apiCall.currently.summary;
            $scope.location = Location.currentLoc().name;

            var hourlyData = apiCall.hourly.data;

            var date = new Date();

            var hour = date.getHours() % 12;

            if (hour == 0) {
                hour = 12;
            }


            $scope.hourlyForecast = [];

            for(var i = 0; i < hourlyData.length; i++)
            {
              var date = new Date(hourlyData[i].time * 1000);
              $scope.hourlyForecast[i] ={hour: date.getHours(),
                                         temp: parseInt(hourlyData[i].temperature)};
            }

            $scope.hour0 = {hour: hour++ + ":00",
                            temp: parseInt(hourlyData[0].temperature)};
            $scope.hour1 = {hour: hour++ + ":00",
                            temp: parseInt(hourlyData[1].temperature)};
            $scope.hour2 = {hour: hour++ + ":00",
                            temp: parseInt(hourlyData[2].temperature)};
            $scope.hour3 = {hour: hour++ + ":00",
                            temp: parseInt(hourlyData[3].temperature)};
            $scope.hour4 = {hour: hour++ + ":00",
                            temp: parseInt(hourlyData[4].temperature)};
            $scope.hour5 = {hour: hour++ + ":00",
                            temp: parseInt(hourlyData[5].temperature)};
            $scope.hour6 = {hour: hour++ + ":00",
                            temp: parseInt(hourlyData[6].temperature)};
            $scope.hour7 = {hour: hour + ":00",
                            temp: parseInt(hourlyData[7].temperature)};


        },
        function(err) {
            console.log("error");
        });

})

.controller('DailyCtrl', function($scope, $http, Location) {
        var dailyData;
        var locationString = Location.currentLoc().lat + "," + Location.currentLoc().lng;


    $http.get("https://api.forecast.io/forecast/8ad794015cf94155cedd0092af9927c4/"+ locationString)
        .then(function(resp) {
            dailyData = resp.data.daily.data;

            $scope.daysOfWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            $scope.dailyForecast = [];

            for(var i = 0; i < dailyData.length; i++)
            {
              //Convert epoch time to regular Date.
              //http://www.epochconverter.com/programming/#javascript
              var date = new Date(dailyData[i].time * 1000);
              var day = date.getDay();
              $scope.dailyForecast[i] = {      tempMin: parseInt(dailyData[i].temperatureMin),
                                               tempMax: parseInt(dailyData[i].temperatureMax),
                                               summary: dailyData[i].summary,
                                               dayString: date.toString()};
            }
        },
        function(err) {
            console.log(err);
        });
})

.controller('LocationCtrl', function($scope, $state, $stateParams, Location) {
    $scope.locations = Location.allLocations();
    $scope.remove = Location.remove;
    $scope.setCurrentLoc = function(id) {
        Location.setLocation(id);
        $state.go('tab.today', $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    };
});
