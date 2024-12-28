const artistsPage = (function(){
    function addListItem(artist){
        const buttonList = document.querySelector('.buttonList');
        const newListItem = document.createElement('li');
        newListItem.classList.add('listItem');

        const newImage = document.createElement('img');
        newImage.classList.add('image');
        newImage.src = getIcon(artist);
        newListItem.appendChild(newImage);

        const newTitle = document.createElement('p');
        newTitle.classList.add('title', 'fullTitle');
        newTitle.textContent = artist;
        newListItem.appendChild(newTitle);

        const shuffleImg = document.createElement('img');
        shuffleImg.classList.add('image');
        shuffleImg.src = 'images/shuffle.png';
        newListItem.appendChild(shuffleImg);

        shuffleImg.addEventListener('click', function() {
           const artistName = newTitle.textContent;
           console.log('shuffle button clicked')
        });

        newTitle.addEventListener('click', function(){
            const artistName = newTitle.textContent;
            albumsByArtistPage.show(artistName);
        })

        buttonList.appendChild(newListItem);
    }

    function addList(){
        const artistsString = androidInterface.getArtists();
        if(artistsString.length == 0){return;}

        const artists = artistsString.split(",");
        artists.forEach(artist => {
            addListItem(artist);
        })
    }


    function show(){
        document.getElementById('pageTitle').textContent = 'Artists';
        initList();
        addList();
    }

    return{show}
})();



