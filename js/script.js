
var _STATE_HOME   = 'HOME';
var _STATE_CAST   = 'CAST';
var _STATE_ANSWER = 'ANSWER';
var _TIMEOUT_MS   = 60000 * 3; // timeout

var castButtonDelay = 1000;
var castCount = 0;
var timeOut = null;
var state = _STATE_CAST;//_STATE_HOME; // starting state

var homeDiv, 
    castDiv, 
    answerDiv, 
    castButton, 
    backToCastButton,
    askTextInput;

var webglInit = false;

var castHexagrams = function(_castCount) {

  if (_castCount == 0) {
    $('#hexagram_table .hex').css('visibility','hidden');
    return;
  }

  // Cast with method-of-16 odds
  var cast = Math.floor(Math.random() * 16);
  var line;
  switch (cast) {
    case 0:
      line = 6;
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      line = 7;
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      line = 8;
      break;
    case 13:
    case 14:
    case 15:
      line = 9;
      break;
  }


  var hex1 = $('#hex1'+_castCount);
  var hex1b = hex1.find('div');
  hex1b.css('visibility','visible');

  var hex2 = $('#hex2'+_castCount);
  var hex2b = hex2.find('.break');
  hex2b.css('visibility','visible');

  var l = (line % 2 == 0 ? 0 : 1);
  var r = (line > 7 ? 0 : 1);  

  if (l == 0) { hex1b.css('visibility','visible'); } 
  else { hex1b.css('visibility','hidden'); }
  if (r == 0) { hex2b.css('visibility','visible'); } 
  else { hex2b.css('visibility','hidden'); }

  hex1.css('visibility','visible').hide().fadeIn("slow");
  hex2.css('visibility','visible').hide().fadeIn("slow");


/*

function castline()
{
  var lines = document.frmcast.lines;
  var line;

  // Cast with method-of-16 odds
  var cast = Math.floor(Math.random()*16);
  switch (cast) {
    case 0:
      line = 6;
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      line = 7;
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      line = 8;
      break;
    case 13:
    case 14:
    case 15:
      line = 9;
      break;
  }

  lines.value += line;

  var leftimg  = document.getElementById("leftline"  + linenr);
  var rightimg = document.getElementById("rightline" + linenr);
  leftimg.src  = (line % 2 == 0 ? imgYin.src : imgYang.src);
  rightimg.src = (line > 7 ? imgYin.src : imgYang.src);

  FadeIn("leftline" + linenr);
  FadeIn("rightline" + linenr);

  if (++linenr > 6) {
    window.setTimeout("document.frmcast.submit()", 900);
    var castbtn = document.getElementById("castbtn");
    castbtn.disabled = true;
  }
}

*/  
    // hex1.text(castCount);
    // hex2.text(castCount);
};

var setState = function(_state) {

  // console.log("switching to state: " + _state);

  $('#askText_keyboard').hide();

  switch(_state) {

    case _STATE_HOME:
      state = _STATE_HOME;

      scrim.fadeIn('slow', function() {
        castDiv.hide();  
        answerDiv.hide();
        homeDiv.show();
        
        if (!webglInit) {
          // initWebgl();
        }

        scrim.fadeOut('slow');
      });
      break;

    case _STATE_CAST:
      scrim.fadeIn('slow', function() {
        
        askTextInput.val('');
        castCount = 0;

        castDiv.show();  
        answerDiv.hide();
        homeDiv.hide();

        castButton.show();
        castHexagrams(0);

        scrim.fadeOut('slow');
        state = _STATE_CAST;
      });
      break;

    case _STATE_ANSWER:
      answerDiv.fadeIn();
      state = _STATE_ANSWER;
      // scrim.fadeIn('slow', function() {
      //   answerDiv.show();  
      //   castDiv.hide();
      //   homeDiv.hide();

      //   castButton.show();
      //   castHexagrams(0);
      //   castCount = 0;
      //   askTextInput.val('');

      //   scrim.fadeOut('slow');
      //   state = _STATE_ANSWER;
      // });
      break;
  }
}; 






$(function() {

  scrim = $('#scrim');
  homeDiv = $('#home');
  castDiv = $('#cast');
  answerDiv = $('#answer')
  castButton = $('#castButton');
  backToCastButton = $('#backToCastButton');
  askTextInput = $('#askText');

  $('body').click(function(){
    clearTimeout(timeOut);
    timeOut = setTimeout(function () {
      webglInit = false;
      setState(_STATE_HOME);
    }, _TIMEOUT_MS);
  }); 

  homeDiv.click(function() {
    setState(_STATE_CAST);
  });

  backToCastButton.click(function() {
    setState(_STATE_CAST);
  });

  castButton.click(function() {
    state = _STATE_CAST;

    if (castCount < 6) {
      castCount++;
    }

    castHexagrams(castCount);

    if (castCount == 6) {
      castButton.fadeOut();
      castButton.prop("disabled", true);
      castButton.delay(castButtonDelay).fadeOut('slow', function() {
        setState(_STATE_ANSWER);
        castButton.prop("disabled", false);
      });
    }
  });

  askTextInput.keyboard({ 
      layout: 'custom',
      customLayout: {
          'normal': [
              'q w e r t y u i o p {bksp}',
              'a s d f g h j k l',
              'z x c v b n m , . ?',
              '{s} {space} {accept}'],
          'shift': [
              'Q W E R T Y U I O P {bksp}',
              'A S D F G H J K L',
              'Z X C V B N M , . ?',
              '{s} {space} {accept}'], // {space} 
          'meta1': [
              '1 2 3 4 5 6 7 8 9 0 {bksp}',
              '- / : ; ( ) \u20ac & @',
              ' ! \' " . , ?',
              '{normal} {space} {accept}'], //  {meta2} 
          'meta2': [
              '[ ] { } # % ^ * + = {bksp}',
              '_ \\ | ~ < > $ \u00a3 \u00a5',
              '. , \' " ! . , ?',
              '{normal} {space} {accept}'] //  {meta1} 
      },
      display: {
          'bksp'   : '\u2190',
          'accept' : 'accept',
          'normal' : 'ABC',
          'shift'  : '\u21d1',
          'meta1'  : '123',
          'meta2'  : '#+='
      },
      usePreview : false,
      position : {
          // optional - null (attach to input/textarea) or a jQuery object
          // (attach elsewhere)
          of : null,
          my : 'center top',
          at : 'center top',
          // used when "usePreview" is false
          // (centers keyboard at bottom of the input/textarea)
          at2: 'center bottom'
      }
  });  

  setState(state);
});




var initWebgl = function() {

  webglInit = true;

  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  var container;
  var camera, scene, renderer;
  var uniforms;
  init();
  animate();
  function init() {
    container = $('#threeCanvas')[0];
    $(container).empty();
    camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
    scene = new THREE.Scene();
    var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
    uniforms = {
      time: { value: 1.0 }
    };
    var material = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );
    // onWindowResize();
    // window.addEventListener( 'resize', onWindowResize, false );
    renderer.setSize(1080, 1080);
  }
  // function onWindowResize( event ) {
    
  // }
  function animate( timestamp ) {
    requestAnimationFrame( animate );
    uniforms.time.value = timestamp / 1000;
    renderer.render( scene, camera );
  }
};