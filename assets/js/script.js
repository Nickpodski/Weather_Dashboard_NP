var bgVideo = $(".bg-video");
var bgSrc = "";

function init() {
  $("body").removeClass("fade-out");
}

function search() { 
  bgVideo.addClass("transitonOne");
  $("#initialSearch").hide();
  setTimeout(function() {
    bgVideo.attr("src", bgSrc);
    bgVideo.removeClass("transitonOne");
  }, 500);
};


$("#start-button").click(function(event) {
  event.preventDefault();
  search();
});


init();