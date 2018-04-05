---
layout: default
title: Video
---

<video id="video" autobuffer height="240" width="360">
<source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.webm">
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