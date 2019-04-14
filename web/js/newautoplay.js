class PlayerInstance {
  constructor () {
    this.audio = document.getElementById('audio')
    this.selected = null
    this.audio.preload = true
    this.randomBtn = document.getElementById('randomBtn')
    this.repeatAllBtn = document.getElementById('repeatAllBtn')
    this.repeatOneBtn = document.getElementById('repeatOneBtn')
    this.randomBool = false
    this.repeatAllBool = false
    this.repeatOneBool = false
    this.setListeners()
    console.log(this.randomBtn)
  }

  /**
   * Главная функция.
   *
   * @param {element} clicked
   */
  clicked (clicked) {
    if (this.checkDoubleClick(clicked)) {
      if (this.audio.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
      return
    }
    if (this.selected) {
      this.selected.classList.remove('selected')
    }
    clicked.classList.add('selected')
    this.audio.src = clicked.getAttribute('data-audio')
    this.setSelected()
    this.audio.play()
  }

  /**
   * Проверяет был ли нажат уже играющий трек.
   *
   * @param {element} clicked Переданный нажатый элемент
   */
  checkDoubleClick (clicked) {
    if (clicked == this.selected) {
      return true
    }
  }

  /**
   * Передает играющий трек в экземпляр
   */
  setSelected () {
    this.selected = document.querySelector('.selected')
  }

  setListeners () {
    /**
     *
     */
    this.randomBtn.addEventListener('click', function(e){
      if (this.randomBool) {
        this.randomBool = false
        this.parentNode.classList.remove('btnHighlight')
      } else {
        this.randomBool = true
        this.parentNode.classList.add('btnHighlight')
      }
    })

    this.repeatAllBtn.addEventListener('click', function(e){
      if (this.repeatAllBool) {
        this.repeatAllBool = false
        this.parentNode.classList.remove('btnHighlight')
      } else {
        this.repeatAllBool = true
        this.parentNode.classList.add('btnHighlight')
      }
    })

    this.repeatOneBtn.addEventListener('click', function(e){
      if (this.repeatOneBool) {
        this.repeatOneBool = false
        console.log(this.repeatOneBool);
        
        this.parentNode.classList.remove('btnHighlight')
      } else {
        this.repeatOneBool = true
        console.log(this.repeatOneBool);
        this.parentNode.classList.add('btnHighlight')
      }
    })

    document.getElementById('prevBtn').ondragstart = function () {
      return false
    }
    document.getElementById('playPauseBtn').ondragstart = function () {
      return false
    }
    document.getElementById('nextBtn').ondragstart = function () {
      return false
    }
    document.getElementById('randomBtn').ondragstart = function () {
      return false
    }
    document.getElementById('repeatAllBtn').ondragstart = function () {
      return false
    }
    document.getElementById('repeatOneBtn').ondragstart = function () {
      return false
    }
  }

  

}

var Player = new PlayerInstance()

// document.getElementById('testdiv').innerHTML = "asdasd"

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('songContainer')) {
    Player.clicked(e.target)
  }
})

/**
 * Stop user from dragging buttons
 */


