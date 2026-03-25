const songName = document.getElementById("song-name")
const audio = document.getElementById("audio")
const playPause = document.getElementById("play-pause")

songName.innerText = "ชีวิตไม่พร้อม แต่หัวใจพร้อม"

function playMusic() {
    audio.play()
    playPause.innerHTML = "<i class='bi bi-pause-circle-fill'></i>"
}

function pauseMusic() {
    audio.pause()
    playPause.innerHTML = "<i class='bi bi-play-circle-fill'></i>"
}

playPause.addEventListener("click", () => {
    if (audio.paused) {
        playMusic()
    } else {
        pauseMusic()
    }
})