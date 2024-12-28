const albumsByArtistPage = (function(){
    function addList(artistName){
       const songsString = androidInterface.getSongsBy(artistName);
       const songs = parseSongsString(songsString);

       songs.forEach(song => {
            addListItem(song);
        })
    }

    function show(artistName){
        document.getElementById("pageTitle").textContent = artistName
        initList();
        addList(artistName);
    }

    return {show}
})();


