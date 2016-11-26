angular.module('WeatherApp')

/*
    Pull data using a service and pass to the UI/view
*/
.controller('WeatherController',['$scope', 'DataService', function($scope, DataService){
    $scope.displayTable=false;
    $scope.buttonText="Display Data";
    
    // handle the update button click
    $scope.getData=function(){
        // call the service method to get the random weather data from backend
        DataService.getWeatherData(function(result){
            $scope.buttonText="Generate Random Values";
            $scope.displayTable=true;
            $scope.weatherData=result;
            
            createChart();
     })
    
    // Display chart with updated data 
    function createChart(){
        // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});
      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'City');
        data.addColumn('number', 'Temperature');
        data.addColumn('number', 'Humidity');
        
        /* generate data for chart*/  
        var chartData=[];
        for(var i=0;i<$scope.weatherData.length;i++){
            chartData.push(
                new Array(
                    $scope.weatherData[i].city,
                    $scope.weatherData[i].temperature,
                    $scope.weatherData[i].humidity
                )
            )
        }  
        
        // chart requires data in the form of 2D Array
        data.addRows(chartData);
    
        // Set chart options
        var options = {'title':'Temperature and Humidity', 'width':800, 'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        }
    }

    }
}])