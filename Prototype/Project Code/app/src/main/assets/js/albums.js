const albumsPage = (function () {
    function addListItem(album) {
        const buttonList = document.querySelector('.buttonList');
        const newListItem = document.createElement('li');
        newListItem.classList.add('listItem');

//        // Album cover image
//        const newImage = document.createElement('img');
//        newImage.classList.add('image');
//        const albumCover = getAlbumCover(album);
//        newImage.src = albumCover ? albumCover : './images/default-placeholder.png'; // Use placeholder if no cover
//        newImage.alt = `${album} cover`;
//        newListItem.appendChild(newImage);

        // Album title
        const newTitle = document.createElement('p');
        newTitle.classList.add('title', 'fullTitle');
        newTitle.textContent = album;
        newListItem.appendChild(newTitle);

        // Shuffle icon
        const shuffleImg = document.createElement('img');
        shuffleImg.classList.add('icon', 'shuffleIcon'); // Add specific class for icons
        shuffleImg.src = './images/shuffle.png';
        shuffleImg.alt = 'Shuffle';
        shuffleImg.title = 'Shuffle';
        shuffleImg.addEventListener('click', function () {
            // Shuffle logic here
            alert(`Shuffling songs in album: ${album}`);
        });
        newListItem.appendChild(shuffleImg);

        // Play icon
        const playImg = document.createElement('img');
        playImg.classList.add('icon', 'playIcon'); // Add specific class for icons
        playImg.src = './images/play.png';
        playImg.alt = 'Play';
        playImg.title = 'Play';
        playImg.addEventListener('click', function () {
            // Play logic here
            alert(`Playing album: ${album}`);
        });
        newListItem.appendChild(playImg);

        // Click event for album title
        newTitle.addEventListener('click', function () {
            const albumName = newTitle.textContent;
            singleAlbumPage.show(albumName);
        });

        // Append to the list
        buttonList.appendChild(newListItem);
    }

    function addList() {
        const albumsString = androidInterface.getAlbums();
        const albums = albumsString.split(",");

        albums.forEach(album => {
            addListItem(album.trim());
        });
    }

    function show() {
        document.getElementById('pageTitle').textContent = 'Albums';
        initList();
        addList();
    }

    return { show };
})();
