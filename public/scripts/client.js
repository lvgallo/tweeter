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
    "handle": "@rd" },
    "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1461113959088
}
];

const createTweetElement = function(data) {
  const time = timeago.format(data.created_at);
  const tweetElement = 
  `<article class='tweet'>
    <header>
    <div class="userLogo"> <img class="avatar" src="${data.user.avatars}"></img>
    <name>${data.user.name}</name>
    </div>
    <span class="account">${data.user.handle}</span>
    </header>
    
    <span class='content'>${data.content.text}</span>
    
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
  }
  const renderTweets = function(data) {
    // loops through tweetss
    for (let tweet of data) {
      // calls createTweetElement for each tweet
      const showTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append(showTweet);
    }
  }
     
  
  $('.compose-tweet').submit(function(event) {
    event.preventDefault();
    const dataSerialized = $(this).serialize();
    if (dataSerialized === 'text=') {
      alert("Did you write a message?");
      return
    } else if (dataSerialized.length > 140) {
      alert("Too long! Your post should have no more than 140 characters!");
      return
    } else {
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: dataSerialized
        // sucess: function(data) {
        //   loadTweets(data)
        // }
        })
      .done(function(){
        $('#tweets-container').empty()
       loadTweets()
      })
  }
})

  const loadTweets = function () {
    $.ajax({
      url: "/tweets/",
      method: "GET",
    }).done(function (tweet) {
      renderTweets(tweet);
    });
    };
  

    loadTweets()
  });
