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

$this->registerJsFile(
  '@web/js/menu.js'
);

?>

</head>
<body>

<audio id="audio"></audio>
<div id="testdiv"></div>
<script src="js/jquery.js"></script>
<script src="js/newautoplay.js"></script>
<!-- <script src="js/menu.js"></script> -->