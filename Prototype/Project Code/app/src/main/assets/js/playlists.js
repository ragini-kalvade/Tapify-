const playlistPage = (function(){
    function addListItem(playlistName){
        const buttonList = document.querySelector('.buttonList');
        const newListItem = document.createElement('li');
        newListItem.classList.add('listItem');

        const newImage = document.createElement('img');
        newImage.classList.add('image');
        newImage.src = getIcon();
        newListItem.appendChild(newImage);

        const newTitle = document.createElement('p');
        newTitle.classList.add('title', 'fullTitle');
        newTitle.textContent = playlistName;
        newListItem.appendChild(newTitle);

//        const playImg = document.createElement('img');
//        playImg.classList.add('image');
//        playImg.src = './images/play.png';
//        newListItem.appendChild(playImg);

        newListItem.addEventListener('click', function() {
            singlePlaylistPage.show(playlistName);
        });

        buttonList.appendChild(newListItem);
    }

    function addList(){
        for (let playlistName in playlists) {
            addListItem(playlistName);
        }
    }

    function show(){
        document.getElementById('pageTitle').textContent = 'Playlists';
        initList();
        addList();
    }

    return{show}
})()


