const genresPage = (function(){
    function addListItem(genre){
        const buttonList = document.querySelector('.buttonList');
        const newListItem = document.createElement('li');
        newListItem.classList.add('listItem');

        const newImage = document.createElement('img');
        newImage.classList.add('image');
        newImage.src = getIcon();
        newListItem.appendChild(newImage);

        const newTitle = document.createElement('p');
        newTitle.classList.add('title', 'fullTitle');
        newTitle.textContent = genre;
        newListItem.appendChild(newTitle);

        const shuffleImg = document.createElement('img');
        shuffleImg.classList.add('image');
        shuffleImg.src = './images/shuffle.png';
        newListItem.appendChild(shuffleImg);

        shuffleImg.addEventListener('click', function() {
        });

//        shuffleImg.addEventListener('click', function() {
//            const genreName = newTitle.textContent;
//        });

        newTitle.addEventListener('click', function(){
            const genreName = newTitle.textContent;
            singleGenrePage.show(genreName);
        })

        buttonList.appendChild(newListItem);
    }

    function addList(){
        const genresString = androidInterface.getGenres();
        const genres = genresString.split(",");

        genres.forEach(genre => {
            addListItem(genre);
        })
    }

    function show(){
        document.getElementById('pageTitle').textContent = 'Genres';
        initList();
        addList();
    }

    return {show}
})();

