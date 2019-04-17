<?php

namespace app\models\mymodels;

class PlayerContainer
{
    public function display()
    {
        echo '<div id="stickydiv">
        <div class="leftSideBtns">
            <div class="btnWrapper">
                <img src="css/resources/player/prevBtn.jpg" id="prevBtn">
            </div>
            <div class="btnWrapper">
                <img src="css/resources/player/playBtn.jpg" id="playPauseBtn">
            </div>
            <div class="btnWrapper">
                <img src="css/resources/player/nextBtn.jpg" id="nextBtn">
            </div>
        </div>
    
        <div class="songInfoContainer">
            <div class="titlePlusTime">
                <div id="songTitle">No song selected</div>
                <div id="songTime">0:00 - 0:00</div>
            </div>
            <div class="scrubber" id="scrubber">
                <div id="progressBar"></div>
            </div>
        </div>
        <div class="rightSideBtns">
            <div class="btnWrapper">
                <img src="css/resources/player/randomBtn.jpg" id="randomBtn">
            </div>
    
            <div class="btnWrapper">
                <img src="css/resources/player/repeatAllBtn.jpg" id="repeatAllBtn">
            </div>
    
            <div class="btnWrapper">
                <img src="css/resources/player/repeatOneBtn.jpg" id="repeatOneBtn">
            </div>
        </div>
    </div>
    <div id="audioSliderContainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
    </div>';
    }
}
