<?php

use app\models\mymodels\PlayerContainer;
use app\models\Playlist;

$playerContainer = new PlayerContainer();
$playerContainer->display();

/**Контейнер для сетки песен. */
echo "<div class='ostContainer'>";
$playlist->displayRelatedSongs();
echo "</div>";

echo '<div id="songMenuBtn">'
. '</div>';
Playlist::addMenu();
?>

</head>
<body>
<!-- <div id="dropdown" class="dropdown">
  <div class="dropdown-child">
    <a href="http://www.вашдомен.ru/page1.html">Подраздел 1</a>
    <a href="http://www.вашдомен.ru/page2.html">Подраздел 2</a>
    <a href="http://www.вашдомен.ru/page3.html">Подраздел 3</a>
    <a href="http://www.вашдомен.ru/page4.html">Подраздел 4</a>
    <a href="http://www.вашдомен.ru/page5.html">Подраздел 5</a>
  </div>
</div> -->

<audio id="audio"></audio>
<div id="testdiv"></div>
<script src="js/jquery.js"></script>
<script src="js/newautoplay.js"></script>
<script src="js/menu.js"></script>