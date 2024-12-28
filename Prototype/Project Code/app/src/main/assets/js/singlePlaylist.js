const singlePlaylistPage = (function(){
    function addList(playlistName){
        const songs = playlists[playlistName];
        songs.forEach((song, index) => {
            console.log(song)
            addListItem(song);
        })
    }

    function show(playlistName){
        document.getElementById('pageTitle').textContent = playlistName;
        initList();
        addList(playlistName);
    }

    return{show}
})()


