function rand() {
  return Math.floor(Math.random()*128); // We only want the darker ones
};

function getRGB() {
  return "rgb(" + rand() + ", " + rand() +", " + rand() + ")";
}

function colorize(rgb) {
  var rgb = rgb || getRGB();
  var elms = [".quote-text", ".quote-author"];
  for (var i = 0; i < elms.length; i++) {
    $(elms[i]).css("color", rgb);
  }
  $("body").css("background-color", rgb);
  $("button").css("background-color", rgb);
}

function getQuote() {
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json){
    $(".quote-text").html("<span>" + json[0].content.replace(/<[^>]+>/gm,'') + "</span>");
    $(".quote-author").html(json[0].title);
  });
}

$(document).ready(function() {  
  $.ajaxSetup({ cache: false });
  var rgb = getRGB();
  getQuote();
  colorize(rgb);
  $("#new-quote").on('click', function(){
    var rgb = getRGB();
    $(".quote-text").fadeOut(500);
    $(".quote-author").fadeOut(500);
    getQuote();
    colorize(rgb);    
    $(".quote-text").fadeIn(500);
    $(".quote-author").fadeIn(500);
  });
  $(".fa-twitter").on('click', function() {
    window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + '"' + $(".quote-text").text() + '"' + ' - ' + $(".quote-author").text());
  });
});