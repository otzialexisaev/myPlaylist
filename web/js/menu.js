// events listeners work
songContainers = document.getElementsByClassName('songContainer');
for (var i = 0; i < songContainers.length; i++) {
  songContainers[i].addEventListener('mouseenter', function (e) {
    showSongMenuBtn(e)
  });
  songContainers[i].addEventListener('mouseleave', function (e) {
    onMouseLeave(e)
  });
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
  menu = document.getElementById('showSongMenuBtn');
  menu.style.display = 'unset';
  if (e.target.contains(menu)) {
    return
  }
  clone = menu.cloneNode(true);
  menu.parentNode.removeChild(menu);
  e.target.prepend(clone);
  clone.addEventListener('click', function () {
    showSongMenuBtnClickListener();
  });
  addItemClickListeners();
}

/**
 * Обработка клика по кнопке меню.
 * 
 * Отображает меню если оно не отображено и наоборот.
 */
function showSongMenuBtnClickListener () {
  dropdownChild = document.getElementById('songMenu');
  if (dropdownChild.style.display == 'unset') {
    dropdownChild.style.display = 'none';
    return;
  }
  dropdownChild.style.display = 'unset';
}

/**
 * Отключить видимость меню когда мышь покидает
 * пределы контейнера-песни либо его внутренних блоков
 *
 * @param {*} event
 */
function onMouseLeave (event) {
  dropdownChild = document.getElementById('songMenu');
  dropdownChild.style.display = 'none'
}

/**
 * Прослушивание кликов по элементам меню
 */
function addItemClickListeners () {
  menuitems = document.getElementsByClassName('songMenu-item');

  for (let index = 0; index < menuitems.length-1; index++) {
    menuitems[index].addEventListener('click', function (e) {
      addItemClick(e.target);
    })
  }
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
  xhttp.open("GET", "/index.php?r=playlist%2Fshowaddplaylistmenu", true);
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
    // console.log(playlistItems)
    for (let item of playlistItems) {
      item.addEventListener('click', function(el) {
        addPlaylistsToAddTo(el.target);
      })
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
 * Добавляет выбранные в меню плйэлисты в локалстор лмбо удаляет из него
 */
function addPlaylistsToAddTo(el){

  var store = JSON.parse( localStorage.getItem('playlists-to-add'));
  if(store == null) {
    store = [];
  }
  store.push(el.id);
  localStorage.setItem('playlists-to-add', JSON.stringify(store));
  console.log(localStorage.getItem('playlists-to-add'));
}

/**
 * Передает отмеченные в меню плейлисты в контроллер для сохранения.
 * Архив передается строкой и парсится в контроллере.
 *
 * @param id
 */
function sendPlaylistsToAddTo(id){
  let store = localStorage.getItem('playlists-to-add');
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/index.php?r=relsongsplaylists%2Faddarray&playlistIds=" + store +
      "&songId=" + id, true);
  xhttp.onload = function() {
    // console.log(this.responseText);
  };
  xhttp.send()
}

function closeMenu(){
  localStorage.clear();
  var menu = document.getElementById('add-playlist-menu');
  menu.parentNode.removeChild(menu);
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