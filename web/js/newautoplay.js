class PlayerInstance {
  constructor () {
    /**
     * Аудио-тег
     */
    this.audio = document.getElementById('audio')
    /**
     * Играющий трек
     */
    this.selected = null
    this.audio.preload = true
    this.randomBtn = document.getElementById('randomBtn')
    this.repeatAllBtn = document.getElementById('repeatAllBtn')
    this.repeatOneBtn = document.getElementById('repeatOneBtn')
    this.prevBtn = document.getElementById('prevBtn')
    this.nextBtn = document.getElementById('nextBtn')
    this.playPauseBtn = document.getElementById('playPauseBtn')
    this.randomBool = false
    this.repeatAllBool = false
    this.repeatOneBool = false
    this.songTitle = document.getElementById('songTitle')
    this.playlistBtn = document.getElementById('playlistBtn')
    this.playlistMenu = document.getElementById('playlistMenu')
    this.volumeSlider = document.getElementById('myRange')
    this.progress = document.getElementById('progressBar')
    this.scrubber = document.getElementById('scrubber')
    this.setListeners()
  }

  /**
   * Главная функция.
   *
   * @param {element} clicked
   */
  clicked (clicked) {
    if (this.checkDoubleClick(clicked)) {
      if (this.audio.paused) {
        this.playPauseBtn.src = 'css/resources/player/pauseBtn.jpg'
        this.audio.play()
      } else {
        this.playPauseBtn.src = 'css/resources/player/playBtn.jpg'
        this.audio.pause()
      }
      return
    }
    if (this.selected) {
      this.selected.classList.remove('selected')
    }
    clicked.classList.add('selected')
    this.setSelected()
    this.songTitle.innerHTML = clicked.innerHTML
    this.audio.src = clicked.getAttribute('data-audio')
    this.playPauseBtn.src = 'css/resources/player/pauseBtn.jpg'
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
  /**
   * Функция проигрывания следующего трека.
   */
  playNext () {
    if (this.randomBool) {
      for (var i = 0; i < Math.floor(Math.random() * 100) + 1; i++) {
        if (this.selected.nextElementSibling) {
          this.clicked(this.selected.nextElementSibling)
        } else {
          this.skipToStart()
        }
      }
      return
    }

    if (this.selected && this.selected.nextElementSibling) {
      this.clicked(this.selected.nextElementSibling)
      return
    }

    if (this.selected && this.repeatAllBool) {
      skipToStart()
    }
  }

  /**
   * Функция проигрывания первого трека.
   */
  skipToStart () {
    while (this.selected.previousElementSibling) {
      this.setSelected()
      this.playPrev()
    }
  }

  /**
   * Функция проигрывания предыдущего трека.
   */
  playPrev () {
    this.setSelected()
    if (this.selected && this.selected.previousElementSibling) {
      this.clicked(this.selected.previousElementSibling)
    }
  }

  /**
   * Функция проигрывания случайного трека.
   */
  playRandom () {
    for (var i = 0; i < Math.floor(Math.random() * 100) + 1; i++) {
      this.playNext()
    }
  }

  playSame () {
    this.setSelected()
    this.clicked(this.selected)
  }

  /**
   * Прослушивание кликов кнопок и др.
   */
  setListeners () {
    /**
     * Хранит ссылку на объект PlayerInstance
     */
    var _self = this
    _self.randomBtn.addEventListener('click', function (e) {
      if (_self.randomBool) {
        _self.randomBool = false
        e.target.parentNode.classList.remove('btnHighlight')
      } else {
        _self.randomBool = true
        e.target.parentNode.classList.add('btnHighlight')
      }
    })

    _self.repeatAllBtn.addEventListener('click', function (e) {
      if (_self.repeatAllBool) {
        _self.repeatAllBool = false
        e.target.parentNode.classList.remove('btnHighlight')
      } else {
        _self.repeatAllBool = true
        e.target.parentNode.classList.add('btnHighlight')
      }
    })

    _self.repeatOneBtn.addEventListener('click', function (e) {
      if (_self.repeatOneBool) {
        _self.repeatOneBool = false
        e.target.parentNode.classList.remove('btnHighlight')
      } else {
        _self.repeatOneBool = true
        e.target.parentNode.classList.add('btnHighlight')
      }
    })

    /**
     * Запрет на перенос картинок-кнопок.
     */
    _self.prevBtn.ondragstart = function () {
      return false
    }
    _self.playPauseBtn.ondragstart = function () {
      return false
    }
    _self.nextBtn.ondragstart = function () {
      return false
    }
    _self.randomBtn.ondragstart = function () {
      return false
    }
    _self.repeatAllBtn.ondragstart = function () {
      return false
    }
    _self.repeatOneBtn.ondragstart = function () {
      return false
    }

    _self.playPauseBtn.onclick = function (e) {
      if (_self.selected == null) {
        _self.clicked(document.querySelector('.songContainer'))
        return
      }
      _self.clicked(_self.selected)
    }

    _self.nextBtn.onclick = function (e) {
      _self.playNext()
    }

    _self.prevBtn.onclick = function (e) {
      _self.playPrev()
    }

    _self.audio.addEventListener('timeupdate', function (e) {
      var songTime = document.getElementById('songTime')
      var duration = _self.audio.duration
      var percentDuration = _self.audio.currentTime / duration
      var oneWidthPercent = _self.scrubber.offsetWidth / 100
      var dur2min =
        Math.floor(duration / 60) +
        ':' +
        pad(Math.floor(duration - Math.floor(duration / 60) * 60), 2)
      var cur2min =
        Math.floor(_self.audio.currentTime / 60) +
        ':' +
        pad(
          Math.floor(
            _self.audio.currentTime -
              Math.floor(_self.audio.currentTime / 60) * 60
          ),
          2
        )
      songTime.innerHTML = cur2min + ' - ' + dur2min
      _self.progress.setAttribute(
        'style',
        'width: ' + percentDuration * oneWidthPercent * 100 + 'px'
      )
    })

    function pad (number, length) {
      var str = '' + number
      while (str.length < length) {
        str = '0' + str
      }
      return str
    }

    _self.scrubber.addEventListener('click', function (e) {
      var relativeLeft = e.clientX - leftPos(_self.scrubber)
      _self.audio.currentTime =
        (_self.audio.duration / 100) *
        ((relativeLeft / _self.scrubber.offsetWidth) * 100)
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

    _self.audio.addEventListener('ended', songEnded)

    function songEnded () {
      _self.setSelected()
      if (_self.repeatOneBool) {
        _self.playSame()
        return
      }

      if (_self.randomBool) {
        _self.playRandom()
        return
      }

      if (_self.selected && _self.selected.nextElementSibling) {
        _self.playNext()
        return
      }

      if (_self.repeatAllBool) {
        _self.skipToStart()
      }
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
