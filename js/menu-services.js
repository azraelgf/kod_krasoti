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
        document.querySelectorAll(".services-menu").forEach((menu => {
            const toggleBtn = menu.querySelector(".services-menu__title");
            const btnText = toggleBtn.querySelector("span");
            const menuItems = menu.querySelectorAll(".services-menu__item");
            toggleBtn.addEventListener("click", (() => {
                menu.classList.toggle("_active-menu");
            }));
            menuItems.forEach((item => {
                item.addEventListener("click", (() => {
                    menu.classList.remove("_active-menu");
                    btnText.textContent = item.textContent.trim();
                }));
            }));
        }));
    }));
})();
