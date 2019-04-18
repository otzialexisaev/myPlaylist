// events listeners work
classes = document.getElementsByClassName('songContainer')
for (var i = 0; i < classes.length; i++) {
  classes[i].addEventListener('mouseenter', function (e) {
    showMenuBtn(e)
  })
  classes[i].addEventListener('mouseleave', function (e) {
    onMouseLeave(e)
  })
  document.getElementById('testdiv').addEventListener('click', function () {
    showMenuBtnOnClickListener()
  })
}

/**
 * Отображает меню при наведении на контейнер-песни.
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

function showMenuBtn (e) {
  menu = document.getElementById('showMenuBtn')
  menu.style.display = 'unset'
  if (e.target.contains(menu)) {
    console.log('contains')
    return
  }
  clone = menu.cloneNode(true)
  menu.parentNode.removeChild(menu)
  e.target.prepend(clone)
  clone.addEventListener('click', function () {
    showMenuBtnClickListener()
  })
  addItemClickListeners()
}

/**
 * Обработка клика по кнопке меню.
 * 
 * Отображает меню если оно не отображено и наоборот.
 */

function showMenuBtnClickListener () {
  dropdownChild = document.getElementById('showMenuBtn-child')
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
  dropdownChild = document.getElementById('showMenuBtn-child')
  dropdownChild.style.display = 'none'
}

/**
 * Прослушивание кликов по элементам меню
 */
function addItemClickListeners () {
  menuitems = document.getElementsByClassName('showMenuBtn-child-item')
  for (let index = 0; index < menuitems.length; index++) {
    menuitems[index].addEventListener('click', function (e) {
      addToPlaylist(e.target)
    })
  }
}

/**
 * Ajax запрос на добавление песни в плейлист 
 * */

function addToPlaylist (el) {
  console.log('asdasd')
}
