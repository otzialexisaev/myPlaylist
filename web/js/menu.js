// events listeners work
songContainers = document.getElementsByClassName('songContainer')
for (var i = 0; i < songContainers.length; i++) {
  songContainers[i].addEventListener('mouseenter', function (e) {
    showSongMenuBtn(e)
  })
  songContainers[i].addEventListener('mouseleave', function (e) {
    onMouseLeave(e)
  })
}

/**
 * Отображает кнпоку меню showWongMenuBtn при наведении на контейнер-песни.
 * 
 * Ищет в документе меню по id, которое добавляется на страницу 
 * через Playlist::addMenu(). Снимает с него невидимость. Если
 * произошло наведение на тот же контейнер, то функция прерывается.
 * Меню копируется, удаляется. Скопированное меню добавляется в начало 
 * контейнера-песни, ему незначается прослушиватель кликов для отображения меню.
 * Добавляется прослушивание кликов по элементам меню. 
 * 
 * @param {*} e 
 */
function showSongMenuBtn (e) {
  menu = document.getElementById('showSongMenuBtn')
  menu.style.display = 'unset'
  if (e.target.contains(menu)) {
    return
  }
  clone = menu.cloneNode(true)
  menu.parentNode.removeChild(menu)
  e.target.prepend(clone)
  clone.addEventListener('click', function () {
    showSongMenuBtnClickListener()
  })
  addItemClickListeners()
}

/**
 * Обработка клика по кнопке меню.
 * 
 * Отображает меню если оно не отображено и наоборот.
 */
function showSongMenuBtnClickListener () {
  dropdownChild = document.getElementById('songMenu')
  if (dropdownChild.style.display == 'unset') {
    dropdownChild.style.display = 'none'
    return
  }
  dropdownChild.style.display = 'unset'
}

/**
 * Отключить видимость меню когда мышь покидает
 * пределы контейнера-песни либо его внутренних блоков
 *
 * @param {*} event
 */
function onMouseLeave (event) {
  dropdownChild = document.getElementById('songMenu')
  dropdownChild.style.display = 'none'
}

/**
 * Прослушивание кликов по элементам меню
 */
function addItemClickListeners () {
  menuitems = document.getElementsByClassName('songMenu-item')

  for (let index = 0; index < menuitems.length-1; index++) {
    menuitems[index].addEventListener('click', function (e) {
      addToPlaylist(e.target)
    })
  }
  menuitems[menuitems.length-1].addEventListener('click', function(e) {
    showAddPlaylist()
  })
}

function showAddPlaylist(){
  var xhttp = new XMLHttpRequest()
  xhttp.open("GET", "/index.php?r=playlist%2Fshowaddplaylistmenu", true)
  xhttp.onload = function() {
    var div = document.createElement("div")
    div.style.position = "static"
    div.innerHTML = JSON.parse(this.responseText).html
    document.body.appendChild(div)
    
  }
  xhttp.send()
}
 
/**
 * Ajax запрос на добавление песни в плейлист 
 * */
function addToPlaylist (el) {
  song = el.parentNode.parentNode.parentNode
  cloneSong = song.cloneNode(true)

  while (cloneSong.firstChild) {
    cloneSong.removeChild(cloneSong.firstChild);
  }
  
  var xhttp = new XMLHttpRequest()
  xhttp.open("GET", "/index.php?r=relsongsplaylists%2Fadd&playlistId=" + el.getAttribute('data-playlistid') +
    "&songId=" + cloneSong.getAttribute('data-songid'), true)
  xhttp.onload = function() {
    console.log(this.responseText);
  }
  xhttp.send()
}

function parseSongPath(el){
  result = el.getAttribute('data-audio')
  resultArr = result.split("/")
  pathArr = []
  for(i = 0; i<resultArr.length-1; i++) {
    pathArr.push(resultArr[i])
  }
  path = pathArr.join('/') + '/'
  return path
}

function parseSongNameFromPath(el){
  result = el.getAttribute('data-audio')
  resultArr = result.split("/")
  last = resultArr[resultArr.length-1]
  sub = last.substr(0,last.length-4)
  return sub
}