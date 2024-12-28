function showIndexPage(){
    const container = document.getElementById('container')
    container.innerHTML = `
        <div class="search-div">
            <input
                    type="text"
                    class="search-box"
                    id="search"
                    placeholder="Search for music, albums, or artists..."
                    name="search">
            <img src="images/icon.png" alt="Search Icon" class="search-icon">
        </div>

        <section class="grid-container">
            <button class="homeButton" onclick="playlistPage.show();">
                <img src="images/playlist.png" alt="Playlist Icon" class="icon">
                <span>Playlists</span>
            </button>
            <button class="homeButton" onclick="albumsPage.show();">
                <img src="images/albums.png" alt="Albums Icon" class="icon">
                <span>Albums</span>
            </button>
            <button class="homeButton" onclick="artistsPage.show();">
                <img src="images/artists.png" alt="Artists Icon" class="icon">
                <span>Artists</span>

            </button>
            <button class="homeButton" onclick="genresPage.show();">
                <img src="images/genres.png" alt="Genres Icon" class="icon">
                <span>Genres</span>
            </button>
            <button class="homeButton" onclick="mostRecentPage.show();">
                <img src="images/recentlyPlayed.png" alt="Recently Played Icon" class="icon">
                <span>Recently Played</span>
            </button>
            <button class="homeButton" onclick="mostPlayedPage.show();">
                <img src="images/mostPlayed.png" alt="Most Played Icon" class="icon">
                <span>Most Played</span>
            </button>
        </section>
    `;
}

showIndexPage();

const mainMenuSearchBar = document.getElementById('search');
mainMenuSearchBar.addEventListener('input', function() {
    searchPage.show(this.value);
});

