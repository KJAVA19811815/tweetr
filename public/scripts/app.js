/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json


$(document).ready(function() {

  function renderTweets(tweets) {
    var twe = $('#tweets-container');
    var html = "";
    for(var i of tweets) {
      var crt = createTweetElement(i);
      twe.append(crt);
    }
  };

  $( "#btn" ).click(function() {
    $('.new-tweet').slideToggle( "fast", function() {
      // Animation complete.
    });
  });

  $('#btn').click(function() {
    $('.new-tweet').find('textarea').focus()
  });

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
      success: function (tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets)
      }
    });
  };
  loadTweets();

  $('.new-tweet').on('submit', function(Event) {

    Event.preventDefault();
    var $form = $(this).find('textarea').serialize();
    var len = $(this).find('textarea').val().length;
    var dis = $('submit').remove();
    if(len > 140 || len === 0) {
      alert("there is a problem")
      return;
    }


    // var $form = $(this).serialize();
    console.log($form);
    // post to /tweets/new
    $.ajax({
      url: '/tweets',
      method: 'POST',
      //dataType: 'JSON',
      data: $form,
      success: function (tweets) {
        loadTweets();
        console.log('Success: ', tweets);

    }


  });
  });



 function createTweetElement(tweet) {
  let $article = `<article>
    <header>
      <img src="">
      <p id="a">${tweet.user.handle}</p>

      <p id="full">${tweet.user.name}</p>


    </header>
    <main>
      <p>${tweet.content.text}</p>
   </main>
    <footer id="foot">
      <ul>
        <li><i class="fa fa-flag" aria-hidden="true"></i></li>
        <li><i class="fa fa-heart" aria-hidden="true"></i></li>
        <li><i class="fa fa-retweet" aria-hidden="true"></i>
      </ul>
    </footer>
  </article>`


    return $article;
  }



  //var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)


});

