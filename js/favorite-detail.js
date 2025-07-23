(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        if (document.querySelector(".info-product__fav")) document.querySelectorAll(".info-product__fav").forEach((btn => {
            btn.addEventListener("click", (() => {
                btn.classList.toggle("is-active");
            }));
        }));
    }));
})();
