// globals
var _player = document.getElementById('player')
var _playlist = null
var _playPauseBtn = document.getElementById('playPauseBtn')
var _progress = document.getElementById('progressBar')
var _scrubber = document.getElementById('scrubber')
var _nextBtn = document.getElementById('nextBtn')
var _prevBtn = document.getElementById('prevBtn')
var _randomBtn = document.getElementById('randomBtn')
var _repeatAllBtn = document.getElementById('repeatAllBtn')
var _repeatOneBtn = document.getElementById('repeatOneBtn')
var relativeLeft = 0
var randomBool = false
var repeatAllBool = false
var repeatOneBool = false
var songTitle = document.getElementById('songTitle')
var playlistBtn = document.getElementById('playlistBtn')
var playlistMenu = document.getElementById('playlistMenu')
var volumeSlider = document.getElementById('myRange')
var selected = null
_player.volume = 0.0090
volumeSlider.value = 9

document.getElementById('testdiv').innerHTML = "asd"

document.addEventListener('click', function (e) {
  if (
    e.target &&
    e.target.nodeName === 'DIV' &&
    e.target.classList.contains('songContainer')
  ) {
    activateSong(e.target)
  } else if(e.target.classList.contains('addFavouriteBtn')) {
    addFavourite(e)
  }
})

function setSelected(){
  selected = _playlist.querySelector('.selected')
}

function activateSong (clickedElement) {
  //Get _playlist
  //var _playlist = document.getElementById('playlist')
  if(_playlist!=null && _playlist.getAttribute('id')!=clickedElement.parentNode.getAttribute('id')){
    setSelected()
    selected.classList.remove('selected')
    selected.querySelector('.addFavouriteBtn').setAttribute('style','display:none;')
  }
  _playlist = clickedElement.parentNode
  //Check if selected is the same song
  setSelected()
  if (selected == clickedElement) {
    if (_player.paused) {
      _playPauseBtn.src = 'css/resources/player/pauseBtn.jpg'
      _player.play()
    } else {
      _playPauseBtn.src = 'css/resources/player/playBtn.jpg'
      _player.pause()
    } 
    return
  } else {
    //Remove selected class from previous song if it is not the
    //same song
    if (selected) {
      selected.classList.remove('selected')
      selected.querySelector('.addFavouriteBtn').setAttribute('style','')
    }  
  }
  clickedElement.querySelector('.addFavouriteBtn').setAttribute('style','display:inherit;')
  clickedElement.classList.add('selected')
  songTitle.innerHTML = clickedElement.textContent
  _player.src = clickedElement.getAttribute('data-audio')
  _playPauseBtn.src = 'css/resources/player/pauseBtn.jpg'
  _player.play()
}

function songEnded(){
  setSelected()
  if (repeatOneBool) {
    playSame()
    return
  }

  if(randomBool){
    playRandom()
    return
  }

  if (selected && selected.nextElementSibling) {
    playNext()
    return
  }
  
  if (repeatAllBool) {
    skipToStart()
  }
}

function playRandom () {
  for(i = 0; i < ((Math.floor(Math.random() * 100))+1); i++){
    playNext()
  }
}

function playSame () {
  setSelected()
  activateSong(selected)
}

function playPrev () {
  setSelected()
  if (selected && selected.previousElementSibling) {
    activateSong(selected.previousElementSibling)
  }
}

function playNext(){
  setSelected()
  if(randomBool){
    for(i = 0; i < ((Math.floor(Math.random() * 100))+1); i++){
      setSelected()
      if(selected.nextElementSibling){
        activateSong(selected.nextElementSibling)
      } else {
        skipToStart()
      }
    }
    return
  }  

  if (selected && selected.nextElementSibling) {
    activateSong(selected.nextElementSibling)
    return
  } 
  
  if(selected && repeatAllBool){
    skipToStart()
  }
}

function skipToStart(){
  setSelected()
  while (selected.previousElementSibling) {
    setSelected()
    playPrev()
  }
}

// function playNext(){
//   setSelected()
//   if (selected && selected.nextElementSibling) {
//     activateSong(selected.nextElementSibling)
//   } else if(selected && repeatAllBool){
//     skipToStart()
//   } else if(selected && randomBool){
//     while (selected.previousElementSibling) {
//       setSelected()
//       playPrev()
//     }
//   }
// }

_prevBtn.onclick = function(){
  setSelected()
  if(selected && selected.previousElementSibling){
    playPrev()
  } else if(selected && !selected.previousElementSibling && repeatAllBool){
    skipToStart()
  }
}

_nextBtn.onclick = function(){
  setSelected()
  if(selected && selected.nextElementSibling || randomBool){
    playNext()
    return
  } 
  if(selected && !selected.nextElementSibling && repeatAllBool){
    skipToStart()
  } 
}

// event listeners

_player.addEventListener('ended', songEnded)

_playPauseBtn.addEventListener('click', function () {
  if (!_player.paused) {
    _player.pause()
    _playPauseBtn.src = 'css/resources/player/playBtn.jpg'
  } else {
    _player.play()
    _playPauseBtn.src = 'css/resources/player/pauseBtn.jpg'
  }
})

/////////////////////////////////////////////////////////
//Updating width of progress bar insude scrubber
/////////////////////////////////////////////////////////

_player.addEventListener('timeupdate', updatePlayer)

function updatePlayer () {
  var _songTime = document.getElementById('songTime')
  var duration = _player.duration
  var percentDuration = _player.currentTime / duration
  var oneWidthPercent = _scrubber.offsetWidth / 100
  var dur2min = Math.floor(duration / 60) + ":" +
    pad(Math.floor(duration - Math.floor(duration / 60) * 60),2)
  var cur2min = Math.floor(_player.currentTime / 60) + ":" +
    pad(Math.floor(_player.currentTime - Math.floor(_player.currentTime / 60) * 60),2)
  _songTime.innerHTML= cur2min + " - " + dur2min
  _progress.setAttribute(
    'style', 'width: ' + percentDuration * oneWidthPercent * 100 + 'px'
  )
}

function pad(number, length) {
   
  var str = '' + number;
  while (str.length < length) {
      str = '0' + str;
  }
 
  return str;

}
/////////////////////////////////////////////////////////
//Scrubber event for clicking on scrubber
/////////////////////////////////////////////////////////

_scrubber.addEventListener('click', function (e) {
  /* document.getElementById('testresult').innerHTML = e.clientX
  + '<br>' + _scrubber.offsetLeft
  + '<br>' + relativeLeft
  + '<br>' + _scrubber.offsetWidth
  + '<br>' + (relativeLeft / _scrubber.offsetWidth)
  */
  relativeLeft = e.clientX - leftPos(_scrubber)
  _player.currentTime =
    (_player.duration / 100) * ((relativeLeft / _scrubber.offsetWidth) * 100)
})

function leftPos (elem) {
  var curleft = 0
  if (elem.offsetParent) {
    do {
      curleft += elem.offsetLeft
    } while ((elem = elem.offsetParent))
  }
  return curleft
}

/////////////////////////////////////////////////////////
//Option buttons events fow booleans switching
/////////////////////////////////////////////////////////

_randomBtn.addEventListener('click', function (e) {
  if (randomBool) {
    randomBool = false
    _randomBtn.parentNode.classList.remove('btnHighlight')
  } else {
    randomBool = true
    _randomBtn.parentNode.classList.add('btnHighlight')
  }
})

_repeatAllBtn.addEventListener('click', function (e) {
  if (repeatAllBool) {
    repeatAllBool = false
    _repeatAllBtn.parentNode.classList.remove('btnHighlight')
  } else {
    repeatAllBool = true
    _repeatAllBtn.parentNode.classList.add('btnHighlight')
  }
})

_repeatOneBtn.addEventListener('click', function (e) {
  if (repeatOneBool) {
    repeatOneBool = false
    _repeatOneBtn.parentNode.classList.remove('btnHighlight')
  } else {
    repeatOneBool = true
    _repeatOneBtn.parentNode.classList.add('btnHighlight')
  }
})

volumeSlider.oninput = function(){
  //console.log(volumeSlider.value)
  _player.volume = volumeSlider.value * volumeSlider.value /10000
  console.log(_player.volume)
}
/////////////////////////////////////////////////////////
//Stop user from dragging buttons
/////////////////////////////////////////////////////////
document.getElementById('prevBtn').ondragstart = function(){return false;};
document.getElementById('playPauseBtn').ondragstart = function(){return false;};
document.getElementById('nextBtn').ondragstart = function(){return false;};
document.getElementById('randomBtn').ondragstart = function(){return false;};
document.getElementById('repeatAllBtn').ondragstart = function(){return false;};
document.getElementById('repeatOneBtn').ondragstart = function(){return false;};
document.getElementById('playlistBtn').ondragstart = function(){return false;};

/////////////////////////////////////////////////////////
//Playlist Menu popping up on click playlistBtn
/////////////////////////////////////////////////////////
playlistBtn.addEventListener('click', function(){
  if(playlistMenu.style.display =='inherit'){
    playlistMenu.setAttribute('style','display:none')
  } else {
    playlistMenu.setAttribute('style','display:inherit')
  }
})

playlistMenu.onclick = function(e){
  if(e.target.classList.contains('playlistMenuItem')){
    var toChange = document.getElementById(e.target.innerHTML)
    if(toChange.getAttribute('style')=='display:none'){
      toChange.setAttribute('style','display:grid')
      e.target.setAttribute('style','background-color:#7F7FD5')
      e.target.setAttribute('data-toggle', "true")
    } else {
      toChange.setAttribute('style','display:none')
      e.target.setAttribute('style','background-color:transparent')
      e.target.setAttribute('data-toggle', "false")
    }
    storeDataToggle()
  }
}

