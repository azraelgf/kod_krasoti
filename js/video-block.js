(() => {
    "use strict";
    function videoPlayer() {
        const videoInit = selector => {
            const videos = document.querySelectorAll(`${selector}`);
            if (videos.length > 0) videos.forEach((video => {
                setupVideo(video);
            }));
        };
        function setupVideo(video) {
            const btn = video.querySelector(".video-btn");
            const videoSrc = btn.dataset.videoSrc;
            const container = video.querySelector(".video-block__inner");
            btn.addEventListener("click", (() => {
                const iframe = generateYoutubeIframe(videoSrc);
                container.innerHTML = "";
                container.appendChild(iframe);
            }));
        }
        function generateYoutubeIframe(code) {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("src", `https://www.youtube.com/embed/${code}?autoplay=1&rel=0&showinfo=0`);
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "autoplay; encrypted-media");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("loading", "lazy");
            return iframe;
        }
        videoInit(".video-block__value");
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    videoPlayer();
})();
