const singleAlbumPage = (function(){
    function addList(albumName){
        pageTitle.textContent = albumName;

        const songsString = androidInterface.getSongsOnAlbum(albumName);
        let songs = parseSongsString(songsString);

       songs.forEach(song => {addListItem(song);})
    }

    function show(albumName){
        document.getElementById('pageTitle').textContent = 'Albums';
        initList();
        addList(albumName);
    }

    return{show}
})();
