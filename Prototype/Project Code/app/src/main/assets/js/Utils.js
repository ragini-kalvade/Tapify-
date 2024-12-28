let playlists = {
    "My Tunes": [],
    "Chill Commute Mix": []
}

function parseSongsString(songsString) {
  const entries = songsString.split('---').map(entry => entry.trim()).filter(entry => entry.length > 0);

  const musicData = entries.map(entry => {
    const lines = entry.split('\n').map(line => line.trim());

    const song = {};

    lines.forEach(line => {
      const [key, value] = line.split(':', 2)
      if (key && value) {
        song[key] = value;
      }
    });

    return song;
  });

  return musicData;
}

// TODO: temporary hardcoding for album covers
function getAlbumCover(albumName, root=".") {
    const albumCovers = {
        "Operation": root + "/images/Doomsday.png",
        "Operation: Doomsday": root + "/images/Doomsday.png",
        "OK Computer": root + "/images/OkComputer.png",
        "MM..FOOD": root + "/images/MMFood.png"
    };

    return albumCovers[albumName.trim()];
}

// TODO: temporary hardcoding
function getIcon(imageName="default", root=".") {
    const images = {
        "MF DOOM": root + "/images/Doomsday.png",
        "Radiohead": root + "/images/OkComputer.png",
        "default": root + "/images/defaultCover.png",
    };

    return images[imageName.trim()];
}


function initList(){
    const container = document.getElementById('container');
    container.innerHTML = `
        <ul class="buttonList"></ul>
    `;
}
let currentlyPlaying = null; // Keep track of the currently playing song

function playSong(song) {
    const songPreview = document.getElementsByClassName("songPreview")[0];
    const progressBar = document.getElementsByClassName("progressBar")[0];
    const songTitle = document.getElementsByClassName("songTitle")[0];
    const songArtist = document.getElementsByClassName("songArtist")[0];

    if (currentlyPlaying && currentlyPlaying.Title === song.Title) {
        // If the same song is playing, toggle pause
        androidInterface.pauseSong(); // Pause the song through the interface
        currentlyPlaying = null; // Reset the state
        updatePlayPauseIcon(song, "play"); // Change icon to play
    } else {
        if (currentlyPlaying) {
            // If a different song is already playing, stop it first
            updatePlayPauseIcon(currentlyPlaying, "play");
        }

        // Play the new song
        androidInterface.playSongTitled(song.Title); // Play song via the interface
        currentlyPlaying = song; // Update currently playing

        // Update UI
        updatePlayPauseIcon(song, "pause");
        songPreview.src = getAlbumCover(song.Album);
        songTitle.textContent = song.Title;
        songArtist.textContent = song.Artist;

        progressBar.style.transition = 'none';
        progressBar.style.width = "0%";
        setTimeout(() => {
            progressBar.style.transition = 'width 60s ease-in-out';
            progressBar.style.width = "100%";
        }, 50);
    }
}

// Helper function to update the play/pause icon
function updatePlayPauseIcon(song, action) {
    const buttonList = document.querySelectorAll(".listItem");
    buttonList.forEach(item => {
        const title = item.querySelector(".title").textContent;
        const playPauseIcon = item.querySelector("img[src='./images/play.png'], img[src='./images/pause.png']");

        if (title === song.Title && playPauseIcon) {
            playPauseIcon.src = action === "play" ? "./images/play.png" : "./images/pause.png";
        }
    });
}


function showMetadataEditor(song) {
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const metadataContainer = document.createElement('div');
    metadataContainer.className = 'metadata-editor';

    // Title for Metadata Editor
    const title = document.createElement('h2');
    title.textContent = 'Edit Song Metadata';
    title.className = 'metadata-title';
    metadataContainer.appendChild(title);

    // Populate metadata editor with fields
    for (let key in song) {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'field-wrapper';

        const label = document.createElement('label');
        label.textContent = key;
        label.htmlFor = key;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = song[key];
        input.id = key;

        fieldWrapper.appendChild(label);
        fieldWrapper.appendChild(input);
        metadataContainer.appendChild(fieldWrapper);
    }

    // Add action buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const okButton = document.createElement('button');
    okButton.className = 'okButton';
    okButton.textContent = 'Save';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancelButton';
    cancelButton.textContent = 'Cancel';

    buttonContainer.appendChild(okButton);
    buttonContainer.appendChild(cancelButton);
    metadataContainer.appendChild(buttonContainer);

    overlay.appendChild(metadataContainer);
    document.body.appendChild(overlay);

    // Event listeners for buttons
    okButton.onclick = function () {
        // Save updated song metadata
        for (let key in song) {
            const updatedValue = document.getElementById(key).value;
            song[key] = updatedValue;
        }
        document.body.removeChild(overlay);
    };

    cancelButton.onclick = function () {
        document.body.removeChild(overlay);
    };
}


function addListItem(song) {
    const buttonList = document.querySelector('.buttonList');
    const newListItem = document.createElement('li');
    newListItem.classList.add('listItem');

//    // Album cover
//    const newImage = document.createElement('img');
//    newImage.classList.add('image');
//    newImage.src = getAlbumCover(song.Album);
//    newListItem.appendChild(newImage);

    // Song title
    const newTitle = document.createElement('p');
    newTitle.classList.add('title', 'fullTitle');
    newTitle.textContent = song.Title;
    newListItem.appendChild(newTitle);

    // Play/Pause icon
    const playImg = document.createElement('img');
    playImg.classList.add('image');
    playImg.src = './images/play.png';
    playImg.alt = 'Play';
    newListItem.appendChild(playImg);

    // Metadata edit icon
    const editImage = document.createElement('img');
    editImage.classList.add('image');
    editImage.src = './images/pencil.png';
    newListItem.appendChild(editImage);

    // Add to playlist icon
    const plusImg = document.createElement('img');
    plusImg.classList.add('plusImg', 'image');
    plusImg.src = './images/plus.png';
    newListItem.appendChild(plusImg);

    // Play song on click
    playImg.addEventListener('click', function () {
        playSong(song);

        // Toggle play/pause within this specific list item
        playImg.src = playImg.src.includes('play.png') ? './images/pause.png' : './images/play.png';
        playImg.alt = playImg.src.includes('pause.png') ? 'Pause' : 'Play';
    });

    // Metadata editor
    editImage.addEventListener('click', function () {
        showMetadataEditor(song);
    });

    // Add to playlist menu
    plusImg.addEventListener('click', function () {
        showPlaylistMenu(song);
    });

    buttonList.appendChild(newListItem);
}


function showPlaylistMenu(song){
    const container = document.getElementById('container');
    container.innerHTML += `<div class="overlay"></div>`;

    const playlistOverlay = document.getElementsByClassName('overlay')[0];

    for (let playlistName in playlists) {
        const playlist = playlists[playlistName];
        playlistOverlay.innerHTML += `
            <div style="display: flex; gap: 10px;">
                ${playlistName}
                <img class="plusImg image" src="./images/plus.png" id="plusImg-${playlistName}" />
            </div>
        `;
    }

    playlistOverlay.innerHTML += `
        <button id="cancelButton" class="cancelButton">Cancel</button>
    `;

    for (let playlistName in playlists) {
        const plusImg = document.getElementById(`plusImg-${playlistName}`);
        plusImg.addEventListener('click', function() {
            playlists[playlistName].push(song);
            container.removeChild(playlistOverlay);
        });
    }

    document.getElementById('cancelButton').onclick = function() {
        container.removeChild(playlistOverlay);
    };
}
