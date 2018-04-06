---
layout: default
title: Home
---

<!-- ATTRACT LOOP -->
<div id="home" class="page">
  <div class="content">
    <canvas id="glcanvas" width="1080" height="1080"></canvas>
  </div>
</div>

<script src="gl-matrix.js"></script>
<script src="webgl-demo.js"></script>


<!-- CAST -->
<div id="cast" class="page">
  <div class="content">

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  
    <input name="question" value="Ask a Question"/>

    <br />
    <br />
    <br />

    <table id="hexagram_table">
    <tr>
    <td id="hex1">0</td>
    <td>changing to</td>
    <td id="hex2">0</td>
    </tr>
    </table>

    <br />
    <br />

    <button id="castButton">CAST</button>

  </div>

</div>


<!-- ANSWERS -->
<div id="answer" class="page">
  <div class="content">


    <br />
    <br />
    <br />
    <br />
    <br />    

    <h1>Your Answer is:</h1>
    <br />
    <br />
    <br />

    <h2>dfsgadsg dsfg dsfg dfs</h2>

    <br />
    <br />
    <br />
    <br />

    <button id="backToCastButton">CAST</button>

  </div>
</div>