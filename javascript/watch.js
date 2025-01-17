document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('video-player');
    const playPauseBtn = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');
    const fullscreenBtn = document.getElementById('fullscreen');

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            videoPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    // Update progress bar
    videoPlayer.addEventListener('timeupdate', () => {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = progress;
        updateTimeDisplay();
    });

    // Seek video
    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * videoPlayer.duration;
        videoPlayer.currentTime = time;
    });

    // Update time display
    const updateTimeDisplay = () => {
        const currentTime = formatTime(videoPlayer.currentTime);
        const duration = formatTime(videoPlayer.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoPlayer.requestFullscreen();
        }
    });
});
