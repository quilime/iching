---
layout: default
title: Video
---

<video id="video" autobuffer height="240" width="360">
<source src="http://mirror.cessen.com/blender.org/peach/trailer/trailer_iphone.m4v">
</video>

<button id="play">Play</button>

<button id="stop">Stop</button>

<script>

	var video = document.getElementById('video');
	var play = document.getElementById('play');
	var stop = document.getElementById('stop');

	play.addEventListener('click',function() {
  		video.play();
	}, false);

	stop.addEventListener('click',function(){
  		video.pause();
	}, false);

</script>

[home](index)