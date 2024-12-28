const singleGenrePage = (function(){
    function addList(genreName){
        const songsString = androidInterface.getSongsByGenre(genreName);
        let songs = parseSongsString(songsString);
        songs.forEach(song => {addListItem(song);})
    }

    function show(genreName){
        document.getElementById('pageTitle').textContent = genreName;
        initList();
        addList(genreName);
    }

    return {show}
})();