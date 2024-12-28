const searchPage = (function(){
    function initPage(existingText){
        const container = document.getElementById('container')
        container.innerHTML = `
           <div class="search-div">
                  <input
                          type="text"
                          class="search-box"
                          id="search"
                          placeholder="Search for music, albums, or artists..."
                          name="search">
                  <img src="./images/icon.png" alt="Search Icon" class="search-icon">
              </div>

              <ul class="buttonList"></ul>
        `;

        if(existingText.length > 0){
            const searchBox = document.getElementById('search');
            searchBox.value = existingText;
        }
    }

    function showSearchResults(searchString){
        const buttonList = document.getElementsByClassName('buttonList')[0];
        buttonList.innerHTML = '';
        if (searchString.length <= 0) { return; }
        const songsString = androidInterface.getSongsStartingWith(searchString);
        const songs = parseSongsString(songsString);
        songs.forEach(song => {
            addListItem(song);
        })
    }

    function initEvents(){
        const searchBox = document.getElementById('search');
        if (searchBox.hasInputEventListener) { return; }

        searchBox.addEventListener('input', function() {
           showSearchResults(this.value);
        });

        searchBox.hasInputEventListener = true;
        searchBox.focus();
    }

    function show(existingText){
        document.getElementById('pageTitle').textContent = 'Search';
        initPage(existingText);
        initEvents();
    }

    return {show}
})();


const searchButton = document.getElementById('navSearchButton');
navSearchButton.onclick = function(existingText) {
    searchPage.show(existingText);
};
