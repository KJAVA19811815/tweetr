/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json


$(document).ready(function() {

  function createdAt(time) {
    var system_date = new Date(time);
    var user_date = new Date();
    console.log(time);
    //if (K.ie) {
      //  system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
    //}
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {return "just now";}
    if (diff < 20) {return diff + " seconds ago";}
    if (diff < 60) {return "less than a minute ago";}
    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
    if (diff <= 5400) {return "1 hour ago";}
    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
    if (diff <= 129600) {return "1 day ago";}
    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
    if (diff <= 777600) {return "1 week ago";}
    return "on " + system_date;
}

  function renderTweets(tweets) {
    var twe = $('#tweets-container');
    var html = "";
    twe.empty()
    for(var i of tweets) {
      var crt = createTweetElement(i);
      twe.append(crt);
    }
  };

  $("#register").click(function() {
  });

  $("#login").click(function() {
  });

  $( "#btn" ).click(function() {
    $('.new-tweet').slideToggle( "fast", function() {
      // Animation complete.
    });
  });

  $( "#register" ).click(function() {
    $('#form1').slideToggle( "fast", function() {
      // Animation complete.
    });
  });

  $( "#login" ).click(function() {
    $('#form2').slideToggle( "fast", function() {
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
      <img src="${tweet.user.avatars.small}">
      <p id="a">${tweet.user.handle}</p>

      <p id="full">${tweet.user.name}</p>


    </header>
    <main>
      <p>${tweet.content.text}</p>
   </main>
    <footer id="foot">
    <p>${createdAt(tweet.created_at)}</p>
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

