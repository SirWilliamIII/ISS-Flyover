function gotRefreshedData(iss, weather){
    console.log('ISS Flyovers: ', iss);
    console.log('Weather', weather);

    function outputFlyover(flyover, i){
        $('#flyovers').append('<div>Flyover at ' + flyover.risetime + '</div>');
    }
    function processFlyoverData(flyover){
        return {
            risetime: new Date(flyover.risetime*1000),
            duration: flyover.duration
        };
    }
        var flyovers =  _.map(iss.response, processFlyoverData);

        _.each(flyovers, outputFlyover);
    }


function refreshData() {
    jQuery.getJSON("http://api.open-notify.org/iss-pass.json?lat=39.7&lon=105.0&n=100&callback=?", function(iss){
        jQuery.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=39.7&lon=105.0&APPID=97b815417a54c03c1939c4ea7fc382fc&callback=?", function(weather){
            gotRefreshedData(iss, weather);
        });
    });
}


refreshData();
$('#refresh').on('click', refreshData);
