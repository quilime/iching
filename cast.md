---
layout: default
title: Home
---




### Ask a Question:

<input name="question" />


<table id="hexagram_table">

<tr>

<td>HEXAGRAM 1</td>

<td>changing to</td>

<td>HEXAGRAM 2</td>

</tr>

</table>

<button id="cast">CAST</button>

<textarea style="width:100%;height:400px" id="textarea">text</textarea>

<script>
	document.getElementById('textarea').value = window.navigator.userAgent;

	var castButton = document.getElementById('cast');

	castButton.addEventListener('click',function() {
  		console.log("Cast it yo");
	}, false);


</script>