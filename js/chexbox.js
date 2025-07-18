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
        function syncCheckboxes(groupName) {
            const checkboxes = document.querySelectorAll(`input[name="${groupName}[]"]`);
            checkboxes.forEach((checkbox => {
                checkbox.addEventListener("change", (() => {
                    checkboxes.forEach((sibling => {
                        if (sibling !== checkbox && sibling.value === checkbox.value) sibling.checked = checkbox.checked;
                    }));
                }));
            }));
        }
        [ "volume", "brand", "who", "rating" ].forEach(syncCheckboxes);
    }));
})();
