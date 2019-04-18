// events listeners work
classes = document.getElementsByClassName('songContainer')
for (var i = 0; i < classes.length; i++) {
  classes[i].addEventListener('mouseover', function (e) {
    showMenuBtn(e)
  })
  classes[i].addEventListener('mouseout', onMouseOut, true)
  console.log(classes)
}

function showMenuBtn (e) {
  menu = document.getElementById('mainmenubtn')
  if (e.target.contains(menu)) {
    return
  }
  clone = menu.cloneNode(true)
  menu.parentNode.removeChild(menu)
  e.target.appendChild(clone)
  showMenuBtnMouseOverListener()
}

function onMouseOut (event) {
  e = event.toElement || event.relatedTarget
  if (e.parentNode == this || e == this) {
    return
  }
  console.log(classes)
  // handle mouse event here!
}

function showMenuBtnMouseOverListener(){
    document
    .getElementById('mainmenubtn')
    .addEventListener('click', function (e) {
      showMenuBody(e)
    })
}

function showMenuBtnMouseOutListener(){
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
