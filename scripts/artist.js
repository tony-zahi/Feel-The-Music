let songInHTML = ''

billieSongs.forEach((song) => {
    songInHTML +=
   `<div class="main__songs__song">
        <img class="main__songs__song__img" src="${song.img}">
        <h4 class="main__songs__song__name">${song.name}</h4>
        <i class="fa-solid fa-play main__songs__song__start-sign" id="${song.playFunction.id}" data-id="${song.playFunction.dataID}"></i>
        <audio id="${song.song.Id}" data-id="${song.song.dataId}" src="${song.song.source}"></audio>
   </div>
`

  console.log(songInHTML)
  document.querySelector('.main__songs')
        .innerHTML = songInHTML
})



let progress = document.getElementById("progress");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeDisplay = document.getElementById("currentTime");
let totalTimeDisplay = document.getElementById("totalTime");
let volumeControl = document.getElementById("volumeControl");
let volumeIcon = document.getElementById("volumeIcon");
let songsControls = document.querySelector(".songs__controls");

let currentSongId = null;
let currentSong = null;

function playNext() {
    if (currentSong) {
        // Get the current song's data-id
        const currentDataId = parseInt(currentSong.dataset.id, 10);

        // Find the next song
        const nextDataId = currentDataId + 1;
        const nextSong = document.getElementById(`song${nextDataId}`);

        if (nextSong) {
            playPause(`song${nextDataId}`);
        } else {
            // Optionally reset to the first song if looping is desired
            // playPause('song1');
            songsControls.style.display = "none"; // Hide controls if no next song
        }
    }
}

function playPrevious() {
    if (currentSong) {
        const currentDataId = parseInt(currentSong.dataset.id, 10);
        const previousDataId = currentDataId - 1;
        const previousSong = document.getElementById(`song${previousDataId}`);

        if (previousSong) {
            playPause(`song${previousDataId}`);
        } else {
            songsControls.style.display = "none"; // Hide controls if no previous song
        }
    }
}


function playPause(songId) {
    let song = document.getElementById(songId);
    let songCtrl = document.getElementById(`playIcon${songId.replace('song', '')}`);

    // If there's a different song playing, pause it
    if (currentSong && currentSongId !== songId) {
        currentSong.pause();
        document.getElementById(`playIcon${currentSongId.replace('song', '')}`).classList.remove("fa-pause");
        document.getElementById(`playIcon${currentSongId.replace('song', '')}`).classList.add("fa-play");
    }

    currentSongId = songId;
    currentSong = song;

    if (song.paused) {
        song.play();
        songsControls.style.display = "flex"; // Always keep controls visible once any song starts
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        songCtrl.classList.add("fa-pause");
        songCtrl.classList.remove("fa-play");

        // Add event listener for when the song ends
        song.onended = playNext;

    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        songCtrl.classList.remove("fa-pause");
        songCtrl.classList.add("fa-play");

        // Remove event listener for when the song ends
        song.onended = null;
    }

    updateProgress();
}
// Play/pause control from the control bar
function playPauseControlBar() {
    if (currentSong) {
        let songCtrl = document.getElementById(`playIcon${currentSongId.replace('song', '')}`);
        if (currentSong.paused) {
            currentSong.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
            songCtrl.classList.add("fa-pause");
            songCtrl.classList.remove("fa-play");

            // Add event listener for when the song ends
            currentSong.onended = playNext;
        } else {
            currentSong.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
            songCtrl.classList.remove("fa-pause");
            songCtrl.classList.add("fa-play");

            // Remove event listener for when the song ends
            currentSong.onended = null;
        }
    }
}

function updateProgress() {
    if (currentSong) {
        progress.max = currentSong.duration;
        progress.value = currentSong.currentTime;
        currentTimeDisplay.textContent = formatTime(currentSong.currentTime);
        totalTimeDisplay.textContent = formatTime(currentSong.duration);
    }
}

progress.oninput = function() {
    if (currentSong) {
        currentSong.currentTime = progress.value;
    }
};

volumeControl.oninput = function() {
    if (currentSong) {
        currentSong.volume = volumeControl.value;
        updateVolumeIcon();
    }
};

function updateVolumeIcon() {
    if (currentSong && currentSong.volume === 0) {
        volumeIcon.className = 'fa-solid fa-volume-mute';
    } else if (currentSong && currentSong.volume <= 0.5) {
        volumeIcon.className = 'fa-solid fa-volume-down';
    } else if (currentSong) {
        volumeIcon.className = 'fa-solid fa-volume-up';
    }
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    return min + ':' + sec;
}

// Update progress and time every 200ms
setInterval(updateProgress, 200);

// Attach play/pause control bar event
ctrlIcon.addEventListener("click", playPauseControlBar);

// Attach click listeners dynamically for each song
document.querySelectorAll('.main__songs__song__start-sign').forEach(icon => {
    icon.addEventListener('click', () => playPause(`song${icon.dataset.id}`));
});


// Add keydown event listener for space bar
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); // Prevent default space bar action (scrolling)
        playPauseControlBar();
    }
});

