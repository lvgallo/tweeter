/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Fake data taken from initial-tweets.json
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  //  
  const createTweetElement = function(data) {
    //Calculate time between now and date created
    const time = timeago.format(data.created_at);
    //Create Tweet posts with name, handle, avatars, data and time
    //Escape(data.content/text) to deal with insecure text
    const tweetElement =
    `<article class='tweet'>
    <header>
    <div class="userLogo"> <img class="avatar" src="${data.user.avatars}"></img>
    <name>${data.user.name}</name>
    </div>
    <span class="account">${data.user.handle}</span>
    </header>
    
    <span class='content'>${escape(data.content.text)}</span>
    
    <footer> ${time}
    <div class="icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    `;
    return tweetElement;
  };
  
  // Returned Value from createdTweetElement and post the most recent on top of the list
  const renderTweets = function(data) {
    for (let tweet of data) {
      const showTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(showTweet);
    }
  };
     
  $('.compose-tweet').submit(function(event) {
    $(".error").css("display", "none");
    event.preventDefault();
    //Serialize data from form
    const dataSerialized = unescape($(this).serialize());
    //Validate tweet length. 'text=' needs to be desconsiderated as comes with serialized default message
    if (dataSerialized === 'text=') {
      $(".error").text("Did you write a message?").slideDown();
    // 140 characters + 5 ('text=')
    } else if (dataSerialized.length > 145) {
      $(".error").text("Too long! Your post should have no more than 140 characters!").slideDown();
    } else {
        $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: dataSerialized
      })
        .done(function() {
          $('#tweets-container').empty();
          $('.compose-tweet').trigger("reset");
          $('.counter').text(140);
          loadTweets();
        });
    }
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      method: "GET",
    }).done(function(tweet) {
      renderTweets(tweet);
    });
  };
  //Escape Function to deal with insecure text
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
});