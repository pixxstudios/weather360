angular.module('WeatherApp')

/*
    Get data from the backend and return to the requester
*/
.service('DataService',['$http',function($http){
    return{
        getWeatherData: function(callback){
            // get data from the backend API
            $http({
                'method':'GET',
                'url':'https://weather360.herokuapp.com/getweatherdata'
            })
            .then(
                // on success
                function(result){
                    // pass result to the angular controller
                    callback(result.data);
                },
                // on error
                function(err){
                    console.log('Error while getting data : ',err)
                }
            )
        }
    }
}])