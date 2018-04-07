
var _STATE_HOME   = 'HOME';
var _STATE_CAST   = 'CAST';
var _STATE_ANSWER = 'ANSWER';
var _TIMEOUT_MS   = 60000 * 3; // timeout

var castCount = 0;
var timeOut = null;
var state = _STATE_HOME; // starting state

var homeDiv, 
    castDiv, 
    answerDiv, 
    castButton, 
    backToCastButton,
    askTextInput,
    hex1, 
    hex2;

var webglInit = false;

var setHexagrams = function(_castCount) {
    hex1.text(castCount);
    hex2.text(castCount);
};

var setState = function(_state) {
  switch(_state) {
    case _STATE_HOME:
      state = _STATE_HOME;
      scrim.fadeIn('slow', function() {
        castDiv.hide();  
        answerDiv.hide();
        homeDiv.show();
        if (!webglInit) {
          initWebgl();
        }
        scrim.fadeOut('slow');
      });
      
      break;

    case _STATE_CAST:
      homeDiv.fadeOut('fast');
      answerDiv.fadeOut('fast');
      castButton.show();
      setHexagrams(0);
      castDiv.fadeIn('slow', function() {
        state = _STATE_CAST;
      });
      break;

    case _STATE_ANSWER:
      homeDiv.fadeOut('fast');
      castDiv.fadeOut('fast');
      askTextInput.val('');
      answerDiv.fadeIn('slow', function() {
        state = _STATE_ANSWER;
        castCount = 0;
      });
      break;
  }
}; 



var initWebgl = function() {

  webglInit = true;

  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  var container;
  var camera, scene, renderer;
  var uniforms;
  init();
  animate();
  function init() {
    container = document.getElementById( 'threeCanvas' );
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
    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize( event ) {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  }
  function animate( timestamp ) {
    requestAnimationFrame( animate );
    uniforms.time.value = timestamp / 1000;
    renderer.render( scene, camera );
  }
};


$(function() {

  scrim = $('#scrim');
  homeDiv = $('#home');
  castDiv = $('#cast');
  answerDiv = $('#answer');
  castButton = $('#castButton');
  backToCastButton = $('#backToCastButton');
  askTextInput = $('#askText');
  hex1 = $('#hex1');
  hex2 = $('#hex2');

  $('body').click(function(){
    clearTimeout(timeOut);
    timeOut = setTimeout(function () {
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

    setHexagrams(castCount);

    if (castCount == 6) {
      castButton.fadeOut();
      castButton.prop("disabled", true);
      castDiv.delay( 500 ).fadeOut('slow', function() {
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
