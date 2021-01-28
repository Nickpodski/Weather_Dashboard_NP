var bgVideo = $(".bg-video");
var bgSrc = "";
var earthVid = "assets/video/Earth_Loop.mp4";
var sunVideo = "assets/video/Sunlight_loop.mp4";
var rainVideo = "assets/video/Rain_Loop.mp4";
var cloudsVideo = "assets/video/Clouds_Loop.mp4";
var snowVideo = "assets/video/Snow_Loop.mp4";
var ashVideo = "assets/video/Ash_Loop.mp4";
var dustVideo = "assets/video/Dust_Loop.mp4";
var fogVideo = "assets/video/Fog_Loop.mp4";
var hazeVideo = "assets/video/Haze_Loop.mp4";
var mistVideo = "assets/video/Mist_Loop.mp4";
var sandVideo = "assets/video/Sand_Loop.mp4";
var smokeVideo = "assets/video/Smoke_Loop.mp4";
function init() {
  bgSrc = earthVid;
  bgVideo.attr("src", bgSrc);
  $("body").removeClass("fade-out");
}

function search() { 
  var apiKey = '75f2a27969910e846981560755d54a24';
  var city = $('#textarea1').val().trim();
  var s = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  $.ajax({
    url: s,
    method: "GET",
    error: function(){
      alert("Please Enter Valid City!");
      location.reload();
    }
  })
  .done(function(response){
    var basicWeather = response.weather.map(function(a) {return a.main});
    var bWeatherStr = basicWeather[0];
    var cityLat = response.coord.lat;
    var cityLon = response.coord.lon;
    var iconCode = response.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("#wiconCurrent").attr('src', iconUrl);
    if (bWeatherStr === "Clear") {
      renderBGVideo(sunVideo);
    }
    if (bWeatherStr === "Clouds") {
      renderBGVideo(cloudsVideo);
    }
    if (bWeatherStr === "Rain" || bWeatherStr === "Drizzle" || bWeatherStr === "Tornado") {
      renderBGVideo(rainVideo);
    }
    if (bWeatherStr === "Snow" || bWeatherStr === "squalls") {
      renderBGVideo(snowVideo);
    }
    if (bWeatherStr === "Mist") {
      renderBGVideo(mistVideo);
    }
    if (bWeatherStr === "Smoke") {
      renderBGVideo(smokeVideo);
    }
    if (bWeatherStr === "Haze") {
      renderBGVideo(hazeVideo);
    }
    if (bWeatherStr === "Dust") {
      renderBGVideo(dustVideo);
    }
    if (bWeatherStr === "Fog") {
      renderBGVideo(fogVideo);
    }
    if (bWeatherStr === "Sand") {
      renderBGVideo(sandVideo);
    }
    if (bWeatherStr === "Dust") {
      renderBGVideo(dustVideo);
    }
    if (bWeatherStr === "Ash") {
      renderBGVideo(sandVideo);
    }
    var sQ = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude={current,minutely,hourly,alerts}&appid=${apiKey}`;
    $.ajax({
      url: sQ,
      method: "GET"
    }).done(function(secondResponse){
      console.log(secondResponse);
      renderCurrentWeather(secondResponse, city);
      renderFiveDay(secondResponse);
    })

  }
  );

};

function renderBGVideo(bg) {
  bgVideo.addClass("transitonOne");
  $("#initialSearch").hide();
  setTimeout(function() {
    bgVideo.attr("src", "");
    bgVideo.removeClass("transitonOne");
    bgVideo.addClass("transitionTwo");
    bgVideo.attr("src", bg);
    $(".forecast").show();
  }, 500);
};

function renderCurrentWeather(rTwo, city){
  var cd = getTodayDate();
  $("#displayCity").text(city + " - " + cd);
  var currentTemp = rTwo.current.temp;
  var currentHumidity = rTwo.current.humidity;
  var currentWindSpeed = rTwo.current.wind_speed; 
  var UV = rTwo.current.uvi;
  $("#temp-current").text("Temperature: " + currentTemp + " °F");
  $("#humidity-current").text("Humidity: " + currentHumidity + "%");
  $("#windSpeed-current").text("Wind Speed: " + currentWindSpeed + "MPH");
  $("#UV-current").text("UV Index: ");
  $("#currentUV").text(UV);
};

function renderFiveDay(sR) {
  for (var i = 1; i < 6; i++) {
    var box = "#fcBox" + i;
    var tempH5 = $("<h5>");
    var humH5 = $("<h5>");
    var newH4 = $("<h4>");
    var iImg = $("<img>");
    var date = getNextFiveDates(date, i);
    $(newH4).text(date);
    $(box).append(newH4);
    var iCode = sR.daily[i].weather[0].icon;
    var iUrl = "http://openweathermap.org/img/w/" + iCode + ".png";
    var wiCurrentID = "#wiCurrent" + i;
    iImg.attr("id", wiCurrentID);
    iImg.attr('src', iUrl);
    $(box).append(iImg);
  }
};

function getTodayDate(cd) {
  var tdate = new Date();
  var dd = tdate.getDate(); 
  var MM = tdate.getMonth(); 
  var yyyy = tdate.getFullYear(); 
  var cd= (MM+1)+ "/" + dd + "/" + yyyy;
  return cd;
}

function getNextFiveDates(cd, i) {
  var tdate = new Date(new Date().getTime()+(i*24*60*60*1000));
  var dd = tdate.getDate(); 
  var MM = tdate.getMonth(); 
  var yyyy = tdate.getFullYear(); 
  var cd= (MM+1)+ "/" + dd + "/" + yyyy;
  return cd;
}

$("#textarea1").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#start-button").click();
  }
});

$("#start-button").click(function(event) {
  event.preventDefault();
  search();
});


init();