const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist-name");
const albumArt = document.getElementById("album-art");
const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const isShuffle = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const likeButton = document.getElementById("like");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const music00 = {
    songName: 'ชีวิตไม่พร้อม แต่หัวใจพร้อม',
    artistName: 'เสถียร ทำมือ',
    albumArt: '/image/album_00.png',
    audio: '/music/เสถียร ทำมือ - ชีวิตไม่พร้อม แต่หัวใจพร้อม.mp3',
    liked: false
}

const music01 = {
    songName: 'เจ็บเมื่อไหร่ก็โทรมา',
    artistName: 'เสถียร ทำมือ',
    albumArt: '/image/album_01.png',
    audio: '/music/เจ็บเมื่อไหร่ก็โทรมา - เสถียร ทำมือ-OFFICIAL MV.mp3',
    liked: false
}

const music02 = {
    songName: 'ทุกที่ก็ทุกที',
    artistName: 'เสถียร ทำมือ',
    albumArt: '/image/album_02.png',
    audio: '/music/ทุกที่ก็ทุกที - Satien Tummue.mp3',
    liked: false
}

const originalPlaylist = [music00, music01, music02];
let sortedPlaylist = [...originalPlaylist];
let index = 0;
let shuffle = false;
let repeatOn = false;

function playMusic() {
    audio.play();
    // Seleciona o ícone (i) que está dentro do botão (playPause)
    const icon = playPause.querySelector('i');
    icon.classList.remove('bi-play-circle-fill');
    icon.classList.add('bi-pause-circle-fill');
}

function pauseMusic() {
    audio.pause();
    // Inverso para voltar ao ícone de Play
    const icon = playPause.querySelector('i');
    icon.classList.remove('bi-pause-circle-fill');
    icon.classList.add('bi-play-circle-fill');
}

function loadMusic() {
    albumArt.src = sortedPlaylist[index].albumArt;
    audio.src = sortedPlaylist[index].audio;
    songName.textContent = sortedPlaylist[index].songName;
    artistName.textContent = sortedPlaylist[index].artistName;
    updateLikeButton();
}

function updateProgress() {
    const barWidth = (audio.currentTime / audio.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpto(event) {
    const rect = progressContainer.getBoundingClientRect();
    const width = rect.width;
    const x = event.clientX - rect.left;
    const newTime = (x / width) * audio.duration;
    audio.currentTime = newTime;
}

function shuffleArray() {
    const size = sortedPlaylist.length;
    for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sortedPlaylist[i], sortedPlaylist[j]] = [sortedPlaylist[j], sortedPlaylist[i]];
    }
}

function shuffebutton() {
    if (shuffle === false) {
        shuffle = true;
        shuffleArray();
        isShuffle.style.color = "#1db954";
    } else {
        shuffle = false;
        sortedPlaylist = [...originalPlaylist];
        isShuffle.style.color = "inherit";
    }
}

function toggleRepeat() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.style.color = "#1db954";
    } else {
        repeatOn = false;
        repeatButton.style.color = "inherit";
    }
}

function nextOrRepeat() {
    if (repeatOn) {
        audio.currentTime = 0;
        playMusic();
    } else {
        if (index === sortedPlaylist.length - 1) {
            index = 0;
        } else {
            index++;
        }
        loadMusic();
        playMusic();
    }
}

function updateCurrentTime() {
    currentTime.innerText = toHHMMSS(audio.currentTime);
}

function updateTotalTime() {
    duration.textContent = toHHMMSS(audio.duration);
}

function toHHMMSS(originalTime) {
    const hours = Math.floor(originalTime / 3600);
    const minutes = Math.floor((originalTime % 3600) / 60);
    const secs = Math.floor(originalTime % 60);

    const formattedSecs = secs.toString().padStart(2, '0');

    if (hours > 0) {
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${hours}:${formattedMinutes}:${formattedSecs}`;
    } else {
        return `${minutes}:${formattedSecs}`;
    }
}

function updateLikeButton() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('i').classList.remove('bi-hand-thumbs-up');
        likeButton.querySelector('i').classList.add('bi-hand-thumbs-up-fill');
        likeButton.style.color = "#1db954";
    } else {
        likeButton.querySelector('i').classList.remove('bi-hand-thumbs-up-fill');
        likeButton.querySelector('i').classList.add('bi-hand-thumbs-up');
        likeButton.style.color = "inherit";
    }
}

function LikeButtonClicked() {
    sortedPlaylist[index].liked = !sortedPlaylist[index].liked;
    updateLikeButton();
}

playPause.addEventListener('click', () => {
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

previous.addEventListener('click', () => {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index--;
    }

    loadMusic();
    playMusic();
});

next.addEventListener('click', () => {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index++;
    }

    loadMusic();
    playMusic();
});

audio.addEventListener('timeupdate', () => {
    updateProgress();
});

progressContainer.addEventListener('click', jumpto);
isShuffle.addEventListener('click', shuffebutton);
repeatButton.addEventListener('click', toggleRepeat);
audio.addEventListener('ended', nextOrRepeat);
audio.addEventListener('timeupdate', updateCurrentTime);
audio.addEventListener('loadedmetadata', updateTotalTime);
likeButton.addEventListener('click', LikeButtonClicked);

loadMusic();