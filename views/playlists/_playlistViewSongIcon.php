<?php
echo '<div class="songContainer noselect" data-audio="'. $song->path. $song->name .'">'.substr($song->name, 0, -4).'</div>';