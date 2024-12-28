const mostRecentPage = (function () {

    const addedSongs = new Set();

    function addList() {
        const songsString = androidInterface.getMostRecentlyPlayedSongs();
        const songs = parseSongsString(songsString);

        for (let i = songs.length - 1; i >= 0; i--) {
            const song = songs[i];
            if (!addedSongs.has(song.id)) {
                addListItem(song);
                addedSongs.add(song.id);
            }
        }
    }

    function show() {
        document.getElementById('pageTitle').textContent = 'Recently Played';

        initList();

        addList();
    }

    return { show };
})();