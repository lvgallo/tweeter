$(document).ready(function() {
  
  (document).getElementById("tweet-text").addEventListener("keyup",function() {
    let inputChars = ($(this).val()).length;
    let charLeft = (140 - inputChars);

    let counter = $(this).parent().children(".buttonCounter").children(".counter");
    counter.text(charLeft);
    if (charLeft < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
        
  })
});