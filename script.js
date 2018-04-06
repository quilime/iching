$(function() {

  var _STATE_HOME = 'HOME';
  var _STATE_CAST = 'CAST';
  var _STATE_ANSWER = 'ANSWER';
  var _STATE = _STATE_HOME;

  var homeDiv = $('#home');
  var castDiv = $('#cast');
  var answerDiv = $('#answer');
  var castButton = $('#castButton');
  var backToCastButton = $('#backToCastButton');

  var hex1 = $('#hex1');
  var hex2 = $('#hex2');

  var attractLoopVideo = $('#video')

  var clickCount = 0;

  var timeOut;

  $('body').click(function(){

    clearTimeout(timeOut);
    timeOut = setTimeout(function () {
      setState(_STATE_HOME);
    }, 5000);
  }); 

  var setState = function(_state) {
    switch(_state) {
      
      case _STATE_HOME:
        _STATE = _STATE_HOME;
        castDiv.fadeOut('fast');
        answerDiv.fadeOut('fast');
        homeDiv.fadeIn('slow');

      break;

      case _STATE_CAST:

        homeDiv.fadeOut('fast');
        answerDiv.fadeOut('fast');

        castDiv.fadeIn('slow', function() {
          _STATE = _STATE_CAST;
          hex1.text(0);
          hex2.text(0);
        });
      break;

      case _STATE_ANSWER:
        clickCount = 0;

        homeDiv.fadeOut('fast');
        castDiv.fadeOut('fast');

        answerDiv.fadeIn('slow', function() {
          _STATE = _STATE_ANSWER;
        });

      break;
    }
  };  

  setState(_STATE_HOME);

  homeDiv.click(function() {
    setState(_STATE_CAST);
  });

  backToCastButton.click(function() {
    setState(_STATE_CAST);
  });

  castButton.click(function() {
    _STATE = _STATE_CAST;
    
    if (clickCount < 6) {
      clickCount++;
    }

    hex1.text(clickCount);
    hex2.text(clickCount);    

    if (clickCount == 6) {
      castDiv.delay( 1000 ).fadeOut('slow', function() {
        setState(_STATE_ANSWER);
      });
    }
  });


/*

  var video = document.getElementById('video');
  var play = document.getElementById('play');
  var stop = document.getElementById('stop');

  play.addEventListener('click',function() {
      video.play();
  }, false);

  stop.addEventListener('click',function(){
      video.pause();
  }, false);

*/

});