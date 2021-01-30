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
var city;

function init() {
  bgSrc = earthVid;
  bgVideo.attr("src", bgSrc);
  $("body").removeClass("fade-out");
  if ($('#btnDiv').is('.rotated')) {
    $('body').toggleClass('newFade');
  }

}

function search(city) { 
  var apiKey = '75f2a27969910e846981560755d54a24';
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
    var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
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
      renderCurrentWeather(secondResponse, city);
      getRecentSearches(city);
      renderFiveDay(secondResponse);
    })

  }
  );

};

function renderBGVideo(bg) {
  bgVideo.addClass("snarkleFoot");
  $("#initialSearch").hide();
  setTimeout(function() {
    bgVideo.attr("src", "");
    bgVideo.removeClass("snarkleFoot");
    bgVideo.attr("src", bg);
    $(".forecast").show();
  }, 1000);
  setTimeout(function() {
    $("#forecastBoxes").removeClass("newFade");
  }, 2000);
};

function renderCurrentWeather(rTwo, city){
  var cd = getTodayDate();
  var cityText = city.toUpperCase();
  $("#displayCity").text(cityText + " - " + cd);
  var currentTemp = rTwo.current.temp;
  var currentHumidity = rTwo.current.humidity;
  var currentWindSpeed = rTwo.current.wind_speed; 
  var UV = rTwo.current.uvi;
  $("#temp-current").text("Temperature: " + currentTemp + " °F");
  $("#humidity-current").text("Humidity: " + currentHumidity + "%");
  $("#windSpeed-current").text("Wind Speed: " + currentWindSpeed + "MPH");
  $("#UV-current").text("UV Index: ");
  $("#currentUV").text(UV);
  if (UV < 2 ) {
    $("#currentUV").addClass("uvNumGreen"); 
  }
  if (UV >= 2 && UV < 6) {
    $("#currentUV").addClass("uvNumYellow"); 
  }
  if (UV >= 6 && UV < 8 ) {
    $("#currentUV").addClass("uvNumOrange"); 
  }
  if (UV >= 8 && UV < 11 ) {
    $("#currentUV").addClass("uvNumRed"); 
  }
  if (UV >= 11 ) {
    $("#currentUV").addClass("uvNumPurple"); 
  }
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
    var newTemp = sR.daily[i].temp.day;
    $(tempH5).text("Temp: " + newTemp + " °F");
    $(box).append(tempH5);
    var newHum = sR.daily[i].humidity;
    $(humH5).text("Humidity: " + newHum + "%");
    $(box).append(humH5);
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

function getRecentSearches(city) {
  c = city.toUpperCase();
  var savedRecentSearches = JSON.parse(localStorage.getItem("recentSearches"));
  var recentSearches = [];
  console.log
  if (savedRecentSearches === null) {
    recentSearches.push(c);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    renderRecentSearches(recentSearches);
  } else {
    if($.inArray(c, savedRecentSearches) != -1) {
      pushSavedRecentSearches(savedRecentSearches, recentSearches);
      checkLength(recentSearches);
      renderRecentSearches(recentSearches);
  } else {
    pushSavedRecentSearches(savedRecentSearches, recentSearches);
    recentSearches.push(c);
    localStorage.removeItem("recentSearches");
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    checkLength(recentSearches);
    renderRecentSearches(recentSearches);
  }
  }
}

function checkLength(arr) {
  if (arr.length > 6) {
    arr.shift();
  }
}

function renderRecentSearches(arr) {
  for (var i = 0; i < arr.length; i++) {
    var newDiv = $("<div>");
    var aLink = $("<a>");
    var newH5 = $("<h5>");
    $(newH5).text(arr[i]);
    $(aLink).attr("href", "#");
    $(aLink).attr("onclick", "oldSearch(event);");
    $(aLink).addClass("recentSearch")
    $(aLink).attr("id", "rS" + i);
    $(aLink).append(newH5);
    $(newDiv).addClass("row z-depth-5 rSRow");
    $(newDiv).attr("id", "recentSearchRow");
    $(newDiv).append(aLink);
    $("#recentSearches").prepend(newDiv);
  };
}

function oldSearch(e) {
  e.preventDefault();
  $("#forecastBoxes").addClass("newFade");
  var targetText = $(event.target);
  city = targetText.text();
  setTimeout(function() {
    $("body").addClass("newFade");
  }, 1000);
  setTimeout(function() {
    removeFiveDay();
    $(".forecast").hide();
    bgSrc = earthVid;
    bgVideo.attr("src", bgSrc);
    $("body").removeClass("newFade");
    $("#displayCity").empty();
    $("#recentSearches").empty();
    $("#recentSearchRow").remove();
    $("#temp-current").empty();
    $("#humidity-current").empty();
    $("#windSpeed-current").empty();
    $("#UV-current").empty();
    $("#currentUV").empty();
  }, 2000);
  setTimeout(function() {
    $("#forecastBoxes").hide();
    search(city);
  }, 3000);
}

function removeFiveDay() {
  for (var i = 0; i <= 6; i++) {
    var box = "#fcBox" + i;
    $(box).empty();
  }
};

function pushSavedRecentSearches(arr, rS) {
  for(var i = 0; i < arr.length; i++) {
    rS.push(arr[i]);
  }
}

function clearLocalStorage() {
  localStorage.clear();
  $("#recentSearches").empty();
  $("#recentSearchRow").remove();
}

function newSearch() {
  $("#forecastBoxes").addClass("newFade");
  $("#initialSearch").addClass("newFade");
  $("#initialSearch").show();
  setTimeout(function() {
    $("body").addClass("newFade");
  }, 1000);
  setTimeout(function() {
    removeFiveDay();
    $(".forecast").hide();
    bgSrc = earthVid;
    bgVideo.attr("src", bgSrc);
    $("body").removeClass("newFade");

    $("#displayCity").empty();
    $("#recentSearches").empty();
    $("#recentSearchRow").remove();
    $("#temp-current").empty();
    $("#humidity-current").empty();
    $("#windSpeed-current").empty();
    $("#UV-current").empty();
    $("#currentUV").empty();
    $("#textarea1").val('');
    $("#labelText").removeClass("active");
  }, 2000);
  setTimeout(function() {
    $("#forecastBoxes").hide();
    $("#initialSearch").removeClass("newFade");
  }, 3000);
}

$("#textarea1").keypress(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#start-button").click();
  }
});

$("#start-button").click(function(event) {
  event.preventDefault();
  city = $('#textarea1').val().trim();
  search(city);
});

init();