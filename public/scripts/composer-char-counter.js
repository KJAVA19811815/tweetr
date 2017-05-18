$(document).ready(function() {

$('.new-tweet').on('input change', 'textarea', function () {
  $(this).val().length;
  var len = $(this).val().length;
  if(len > 140) {
    $(".counter").css({'color': 'red'});

  }
  else {
    $(".counter").css({'color':'gray'});
  }

  $('.counter').html(140-len)

});

});