var express=require('express');
var app=express();
var fs=require('fs');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// to allow cross domain access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req, res){
     res.render('index');
})

app.get('/getweatherdata',function(req, res){
    
    // read data from the json files
    var cities = JSON.parse(fs.readFileSync('data/cities.json')).cities;
    var weather = JSON.parse(fs.readFileSync('data/weather.json')).weather[0];
    
    /* 
        code to get the random values from the data
    */
    var randomWeatherData=[];
    
    // read data for all the cities and create an array with objects containing random data
    for(var i=0 ; i<cities.length ; i++){
        // create the empty city object
        var cityObject={};
        
        // start pusing data into the city object
        cityObject.city = cities[i].name;
        cityObject.position = cities[i].latitude+', '+cities[i].longitude;
        cityObject.localtime = cities[i].localtime;
                
        // generate random weather conditions
        cityObject.condition = weather.condition[Math.floor(Math.random() * weather.condition.length)];
        cityObject.temperature = weather.temperature[Math.floor(Math.random() * weather.temperature.length)];
        cityObject.pressure = weather.pressure[Math.floor(Math.random() *  weather.pressure.length)];
        cityObject.humidity = weather.humidity[Math.floor(Math.random() * weather.humidity.length)];
        
        //push the city object into an array
        randomWeatherData.push(cityObject);
    }
    
    //console.log(randomWeatherData);
    
    // send the response back to the client
    res.send(randomWeatherData);
})

app.listen(port,function(){
    console.log('listening on ',port);
})