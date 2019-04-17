<?php

use app\models\mymodels\PlayerContainer;

$playerContainer = new PlayerContainer();
$playerContainer->display();

/**Контейнер для сетки песен. */
echo "<div class='ostContainer'>";
$playlist->displayRelatedSongs();
echo "</div>";

?>

<audio id="audio"></audio>
<div id="testdiv"></div>
<script src="js/newautoplay.js"></script>