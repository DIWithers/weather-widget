$(document).ready(function() {

var apiKey = "c5baf3ea9dad9dce734db1bc68382b1b"; //personal key to access openweathermap.org
var canvas = document.getElementById("current-temp");
var context = canvas.getContext("2d");
var currentTemp = 0;

// var url = "http://api.openweathermap.org/data/2.5/forecast/city?q=atlanta&units=imperial&APPID=" + apiKey;



	$(".weather-form").submit(function() {
		event.preventDefault();
	var cityText = $(".city").val();
	// Build the url from user input and api key
	var url = "http://api.openweathermap.org/data/2.5/forecast/city?q="+cityText+",US&units=imperial&APPID=" + apiKey;
	$(".report").removeClass("wait");
	
		$.getJSON(url, function(weatherData){
			console.log(weatherData);
			currentTemp = weatherData.list[0].main.temp; //filter down through object to get to temperature(set to F)
			animate(0);

			currentCity = weatherData.city.name;
			$("#current-city").html(currentCity);

			weatherConditions = weatherData.list[0].weather[0].icon;
			// weatherCategory = Math.floor(weatherConditions / 100);  //going to use entire # instead


			$("#weather-icon").html("<img src='images/" + weatherConditions + ".png'>");

			//icons for 5 day forcast
			high1 = Math.ceil(weatherData.list[0].main.temp_max);
			low1 = Math.ceil(weatherData.list[0].main.temp_min);
			$(".hilo-1").html(high1 + "&#x2109" + low1 + "&#x2109");
			high2 = Math.ceil(weatherData.list[5].main.temp_max);
			low2 = Math.ceil(weatherData.list[5].main.temp_min);
			$(".hilo-2").html(high2 + low2 + "&#x2109");

			low = weatherData.list[0].main.temp_min;
			

			var wc1 = weatherData.list[0].weather[0].icon;
			$("#day1-image").html("<img src='images/" + wc1 + ".png'>");
			var wc2 = weatherData.list[5].weather[0].icon;
			$("#day2-image").html("<img src='images/" + wc2 + ".png'>");
			var wc3 = weatherData.list[13].weather[0].icon;
			$("#day3-image").html("<img src='images/" + wc3 + ".png'>");
			var wc4 = weatherData.list[21].weather[0].icon;
			$("#day4-image").html("<img src='images/" + wc4 + ".png'>");
			var wc5 = weatherData.list[29].weather[0].icon;
			$("#day5-image").html("<img src='images/" + wc5 + ".png'>");
			console.log(wc5);







			console.log(weatherConditions);

			humidity = weatherData.list[0].main.humidity;
			$("#humidity").html(humidity);

			high = weatherData.list[0].main.temp_max;
			$("#high-temp").html(high);

			low = weatherData.list[0].main.temp_min;
			$("#low-temp").html(low);

			current = weatherData.list[0].weather[0].description;
			$("#current").html(current);

			// precipitation;

			windSpeed = weatherData.list[0].wind.speed;
			$("#wind-speed").html(windSpeed);

			var d = new Date();
			console.log(d);

			
			


		function animate(current) {
			context.clearRect(0, 0, 500, 500);
			var tempColor = "#ff0000";
			context.strokeStyle = tempColor;
			context.lineWidth = 20;
			
			context.beginPath();
			context.arc(155, 155, 70, Math.PI * 1.5, Math.PI * 4);
			context.fillStyle = "white";
			context.fill();

			context.beginPath();
			context.arc(155, 155, 70, Math.PI * 1.5, (current / 100) * (Math.PI * 2) + (Math.PI * 1.5)); //1.5 is 12 o'clock, 2 is 3 o'clock
			 //currentTemp/100 gives percent of circle the temp is
			context.stroke();
			context.fillStyle = "white";	
			context.fill();
			

			context.fillStyle = "black";
			context.font = "28px Arial";
			context.fillText(currentTemp, 130, 160);

			current++;
			if (current < currentTemp) {
				requestAnimationFrame(function(){ //repaints until currentTemp is reached on graph
					animate(current);
				});
			}

			}	

		});
	});
});

