const mostPlayedPage = (function() {
    const addedSongs = new Set();

    function addList() {
        const songsString = androidInterface.getMostPlayedSongs();
        let songs = parseSongsString(songsString);

        for (let i = songs.length - 1; i >= 0; i--) {
            if (!addedSongs.has(songs[i].id)) {
                addListItem(songs[i]);
                addedSongs.add(songs[i].id);
            }
        }
    }

    function show() {
        document.getElementById('pageTitle').textContent = 'Most Played';
        initList();
        addList();
    }

    return { show };
})();