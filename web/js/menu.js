// events listeners work
songContainers = document.getElementsByClassName('songContainer');
for (var i = 0; i < songContainers.length; i++) {
  songContainers[i].addEventListener('mouseenter', function (e) {
    showSongMenuBtn(e);
  });
  songContainers[i].addEventListener('mouseleave', function (e) {
    hideSongMenuBtn(e);
  });
}

var onMouseLeaveTimer = false;
var tempSongContainer;

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
  if(onMouseLeaveTimer){
    tempSongContainer = e;
    return;
  }
  var menu = document.getElementById('showSongMenuBtn');
  menu.style.display = 'unset';
  if (e.target.contains(menu)) {
    return;
  } else {
    // смотрит если меню видимо - не переносит его на див на который указывает мышь
    var songMenu = document.getElementById('songMenu');
    if (songMenu.style.display == 'unset') {
      return;
    }
  }
  var clone = menu.cloneNode(true);
  menu.parentNode.removeChild(menu);
  e.target.prepend(clone);
  clone.addEventListener('click', function () {
    toggleSongMenu();
  });
  document.getElementById('songMenu').addEventListener('mouseenter', function(){
    onMouseLeaveTimer = false;
  });
  document.getElementById('songMenu').addEventListener('mouseleave', function(){
    onMouseLeaveMenu(e)
  });
  addItemClickListeners();
}

function hideSongMenuBtn() {
  if (onMouseLeaveTimer) {
    return;
  }
  var btn = document.getElementById('showSongMenuBtn');
  var menu = document.getElementById('songMenu');
  btn.style.display = 'none';
  menu.style.display = 'none';
}

/**
 * Срабатывает когда мышь покидает songMenu.
 * Переводит onMouseLeaveTimer в 1 и ждет секунду. Если он остался 1 то меню исчезает.
 * Он может перейти обратно в false если снова навестись на songMenu.
 *
 *
 * @param e
 * @returns {Promise<void>}
 */
async function onMouseLeaveMenu(e){
  onMouseLeaveTimer = true;
  setTimeout(function(){
    if (onMouseLeaveTimer) {
      var songMenu = document.getElementById('songMenu');
      songMenu.style.display = 'none';
      onMouseLeaveTimer = false;
      showSongMenuBtn(tempSongContainer);
    }
  },500)
}


/**
 * Обработка клика по кнопке меню.
 * 
 * Отображает меню если оно не отображено и наоборот.
 */
function toggleSongMenu () {
  var dropdownChild = document.getElementById('songMenu');
  if (dropdownChild.style.display != 'none') {
    dropdownChild.style.display = 'none';
  } else {
    dropdownChild.style.display = 'unset';
  }
}

/**
 * Прослушивание кликов по элементам меню
 */
function addItemClickListeners () {
  var menuitems = document.getElementsByClassName('songMenu-item');

  for (let index = 0; index < menuitems.length-1; index++) {
    menuitems[index].addEventListener('click', function (e) {
      addItemClick(e.target);
    })
  }
  // Клик по кнопке "Другой плейлист" которая находится в нижней части меню
  menuitems[menuitems.length-1].addEventListener('click', function(e) {
    let songContainer = e.target.parentNode.parentNode.parentNode;
    let id = songContainer.getAttribute('data-songid');
    showAddPlaylistMenu(id);
  })
}

/**
 * Получение меню из пхп файла в виде json как html и добавление его к body
 * и прослушивание сабмита формы
 *
 * @param id
 */
function showAddPlaylistMenu(id){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/index.php?r=playlist%2Fshowmultipleplaylistsform", true);
  xhttp.onload = function() {
    //создание контэйнера для меню и добавление его к body
    var menu = document.createElement("div");
    menu.style.position = "static";
    menu.id = "add-playlist-menu";
    menu.innerHTML = JSON.parse(this.responseText).html;
    document.body.appendChild(menu);

    // очистка локалстора чтобы при случайной перезгрузке страницы выбранные плейлисты не сохранялись в памяти
    localStorage.clear();

    // прослушивание кликов по плейлистам. на клик - доабвление id плейлиста в локалстор
    var playlistItems = document.getElementsByClassName('add-playlist-menu-item');
    for (let item of playlistItems) {
      item.addEventListener('click', function(el) {
        addPlaylistsToAddTo(el.target);
      })
    }

    // прослушивание кликов по кругам рядом с названиями плейлистов
    var circles = document.getElementsByClassName('add-playlist-menu-item-circle');
    for (var i = 0; i < circles.length; i++) {
      circles[i].addEventListener('click', function(el) {
        toggleCircle(el.target);
      });
    }

    var bg = document.getElementById('background');
    bg.addEventListener('click', function () {
      closeMenu();
    });

    //прослушивание сабмита формы. на сабмит - ajax запрос с id выбранных плейлистов
    var submitBtn = document.getElementById('add-playlist-menu-submit-form');
    submitBtn.addEventListener('submit', function(event) {
      event.preventDefault();
      sendPlaylistsToAddTo(id);
      closeMenu();
      return false;
    })
  };
  xhttp.send()
}

/**
 * Ajax запрос на добавление песни в плейлист 
 * */
function addItemClick (el) {
  let song = el.parentNode.parentNode.parentNode;
  let cloneSong = song.cloneNode(true);

  while (cloneSong.firstChild) {
    cloneSong.removeChild(cloneSong.firstChild);
  }

  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/index.php?r=relsongsplaylists%2Fadd&playlistId=" + el.getAttribute('data-playlistid') +
    "&songId=" + cloneSong.getAttribute('data-songid'), true);
  xhttp.onload = function() {
    console.log(this.responseText);
  };
  xhttp.send();
}