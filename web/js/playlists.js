var addBtn = document.getElementById('new-playlist-btn');
console.log(addBtn)
addBtn.addEventListener('click', function() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/index.php?r=playlist%2Fshowaddplaylistform", true);
    xhttp.onload = function() {
        var menu = document.createElement("div");
        menu.style.position = "static";
        menu.id = "add-playlist-menu";
        menu.innerHTML = JSON.parse(this.responseText).html;
        document.body.appendChild(menu);
        // var submitBtn = document.getElementById('add-playlist-menu-submit-form');
        // submitBtn.addEventListener('submit', function(event) {
        //     // event.preventDefault();
        //     // addPlaylist();
        //     return false;
        // })
    };
    xhttp.send();
});

// addBtn.addEventListener('click', function() {
//     let xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "/index.php?r=playlist%2Faddplaylist&name=" + el.getAttribute('data-playlistid') +
//         "&songId=" + cloneSong.getAttribute('data-songid'), true);
//     xhttp.onload = function() {
//         console.log(this.responseText);
//     };
//     xhttp.send();
// });