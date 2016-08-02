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

	
		$.getJSON(url, function(weatherData){
			console.log(weatherData);
			currentTemp = weatherData.list[0].main.temp; //filter down through object to get to temperature(set to F)
			animate(0);

			currentCity = weatherData.city.name;
			$("#current-city").html(currentCity);

			weatherConditions = weatherData.cod;
			weatherCategory = Math.floor(weatherConditions / 100);
			console.log(weatherCategory);
			switch(weatherCategory) {
				case 2:
					$("#weather-icon").html("<img src='images/thunderstorm-day.png'>");
					break;
				case 3:
					$("#weather-icon").html("<img src='drizzle.png'>");
					break;
				case 5:
					$("#weather-icon").html("<img src='rain.png'>");
					break;
				case 6:
					$("#weather-icon").html("<img src='snow.jpeg'>");
					break;

			}

			


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

