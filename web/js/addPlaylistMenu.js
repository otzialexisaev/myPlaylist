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
    };
    xhttp.send()
}

function closeMenu(){
    localStorage.clear();
    var menu = document.getElementById('add-playlist-menu');
    menu.parentNode.removeChild(menu);
}

function toggleCircle(el) {
    console.log(el.style.background);
    if (el.style.background != 'white') {
        el.style.background = '-webkit-linear-gradient(left, #7F7FD5, #86A8E7, rgb(145, 201, 234));';
        el.style.background = 'red';
    } else {
        el.style.background = 'white';
    }
    console.log(el);
}