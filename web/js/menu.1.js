// events listeners work
classes = document.getElementsByClassName('songContainer')
for (var i = 0; i < classes.length; i++) {
  classes[i].addEventListener('mouseover', function (e) {
    showSongMenuBtn(e)
  })
  classes[i].addEventListener('mouseout', onMouseOut, true)
  console.log(classes)
}

function showSongMenuBtn (e) {
  menu = document.getElementById('mainmenubtn')
  if (e.target.contains(menu)) {
    return
  }
  clone = menu.cloneNode(true)
  menu.parentNode.removeChild(menu)
  e.target.appendChild(clone)
  showSongMenuBtnMouseOverListener()
}

function onMouseOut (event) {
  e = event.toElement || event.relatedTarget
  if (e.parentNode == this || e == this) {
    return
  }
  console.log(classes)
  // handle mouse event here!
}

function showSongMenuBtnMouseOverListener(){
    document
    .getElementById('mainmenubtn')
    .addEventListener('click', function (e) {
      showMenuBody(e)
    })
}

function showSongMenuBtnMouseOutListener(){
    document
    .getElementById('songMenuBtn')
    .addEventListener('mouseout', onMouseOut, true)
}

function showMenuBody (e) {
  console.log('menubody')
  menu = document.getElementById('songMenu')
  if (e.target.contains(menu)) {
    return
  }
  clone = menu.cloneNode(true)
  menu.parentNode.removeChild(menu)
  e.target.appendChild(clone)
}
