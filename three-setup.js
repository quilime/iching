$(function() {

  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  var container;
  var camera, scene, renderer;
  var uniforms;
  
  function init() {
    container = document.getElementById( 'glcanvas' );
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

  init();
  animate();

});