
var _STATE_HOME   = 'HOME';
var _STATE_CAST   = 'CAST';
var _STATE_ANSWER = 'ANSWER';
var _TIMEOUT_MS   = 60000 * 10; // timeout

var castButtonDelay = 1000;
var castCount = 0;
var timeOut = null;
var state = _STATE_HOME;
var data = [];
var lData = [];
var rData = [];

var homeDiv, 
    castDiv, 
    answerDiv, 
    castButton, 
    backToCastButton,
    askTextInput;

var webglInit = false;

var castHexagrams = function(_castCount) {

  if (_castCount == 0) {
    lData = data; 
    rData = data;
    $('#changingto div').hide();
    $('#hexagram_table .hex').css('visibility','hidden');
    return;
  }

  if (_castCount > 0) {
    $('#changingto div').fadeIn();
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

  var filterData = (dataArr, s) => {
    return dataArr.filter(function (i) {
      return i.id[_castCount-1] == s;
    });
  };

  lData = filterData(lData, l);
  rData = filterData(rData, r);

  if (l == 0) { hex1b.css('visibility','visible'); } 
  else { hex1b.css('visibility','hidden'); }
  if (r == 0) { hex2b.css('visibility','visible'); } 
  else { hex2b.css('visibility','hidden'); }

  hex1.css('visibility','visible').hide().fadeIn("slow");
  hex2.css('visibility','visible').hide().fadeIn("slow");
};

var setState = function(_state) {

  $('#askText_keyboard').hide();

  switch(_state) {

    case _STATE_HOME:
      state = _STATE_HOME;

      scrim.fadeIn('slow', function() {
        // $('#attractloop')[0].play();
        castDiv.hide();  
        answerDiv.hide();
        homeDiv.show();
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
      state = _STATE_ANSWER;

      var populateAnswer = (_id, _data) => {
        var el = $(_id);
        console.log(_data);
        el.find('h1').text(_data.name);
        el.find('h2').html(_data.hex[0] + '&#xFE0E;<br />' + _data.hex[1] + '&#xFE0E;');
        el.find('h3').text(_data.desc);
        var ol = el.find('ol');
        ol.empty();
        for (var line in _data.reading) {
          ol.append('<li>' + _data.reading[line] + '</li>');
        }
      };

      populateAnswer('#ans1', lData[0]);
      populateAnswer('#ans2', rData[0]);

      answerDiv.fadeIn();
      break;
  }
}; 






$(function() {

  scrim = $('#scrim');
  homeDiv = $('#home');
  castDiv = $('#cast');
  answerDiv = $('#answer')
  castButton = $('#castButton');
  goHomeButton = $('#goHomeButton');
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

  goHomeButton.click(function() {

    setState(_STATE_HOME);
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
              '{normal} {space} {accept}'], // {meta2} 
          'meta2': [
              '[ ] { } # % ^ * + = {bksp}',
              '_ \\ | ~ < > $ \u00a3 \u00a5',
              '. , \' " ! . , ?',
              '{normal} {space} {accept}'] // {meta1} 
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

  // 


    $.getJSON('data.json', function(_data) {
      data = _data.items;
      setState(_STATE_HOME);
    });

    // if (!webglInit) {
    //   initWebgl();
    // }    

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