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
    showAddPlaylistMenu()
  })
}

/**
 * Получение меню из пхп файла в виде json как html и добавление его к body
 * и прослушивание сабмита формы
 */
function showAddPlaylistMenu(){
  var xhttp = new XMLHttpRequest()
  xhttp.open("GET", "/index.php?r=playlist%2Fshowaddplaylistmenu", true)
  xhttp.onload = function() {
    //создание контэйнера для меню и добавление его к body
    var menu = document.createElement("div")
    menu.style.position = "static"
    menu.id = "add-playlist-menu"
    menu.innerHTML = JSON.parse(this.responseText).html
    document.body.appendChild(menu)

    // прослушивание кликов по плейлистам. на клик - доабвление id плейлиста в локалстор
    var playlistItems = document.getElementsByClassName('add-playlist-menu-item')
    console.log(playlistItems)
    for (let item of playlistItems) {
      item.addEventListener('click', function(el) {
        addPlaylistsToAddTo(el.target)
      })
    }

    //прослушивание сабмита формы. на сабмит - ajax запрос с id выбранных плэйлистов
    var submitBtn = document.getElementById('add-playlist-menu-submit-form')
    submitBtn.addEventListener('submit', function(event) {
      event.preventDefault()
      sendPlaylistsToAddTo()
      closeMenu()
      return false
    })
  }
  xhttp.send()
}

/**
 * Добавляет выбранные в меню плйэлисты в локалстор лмбо удаляет из него
 */
function addPlaylistsToAddTo(el){

  var store = JSON.parse( localStorage.getItem('playlists-to-add'))
  if(store == null) {
    store = []
  }
  store.push(el.id)
  localStorage.setItem('playlists-to-add', JSON.stringify(store))
  console.log(localStorage.getItem('playlists-to-add'))


//////////////////////////////////////////////////////
// How many there are elements in the playlistMenu
//   function storeDataToggleLog () {
//     var len = $('.playlistMenuItem').siblings().length
//   console.log('siblings count: ' + len)
//   for (var i = 1; i <= len; i++) {
//     localStorage.setItem('test' + i, $('#MenuItem'+i).attr('data-toggle'))
//     console.log("MenuItem's data-toggle" + i + ": " + localStorage.getItem('test' + i))
//   }
// }

//   var names = [];
//   names[0] = prompt("New member name?");
//   localStorage.setItem("names", JSON.stringify(names));
//
// //...
//   var storedNames = JSON.parse(localStorage.getItem("names"));


}

function sendPlaylistsToAddTo(){
  var menu = document.getElementById('add-playlist-menu')
}

function closeMenu(){
  localStorage.clear()
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