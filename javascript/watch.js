document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('videoUrl');
    if (videoUrl) {
        const videoPlayer = document.getElementById('video-player');
        videoPlayer.src = videoUrl;
        videoPlayer.load();
    }
});