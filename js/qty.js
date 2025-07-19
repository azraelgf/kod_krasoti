(() => {
    "use strict";
    function formQuantity() {
        document.addEventListener("click", (function(e) {
            const targetElement = e.target;
            const quantityContainer = targetElement.closest("[data-quantity]");
            if (quantityContainer && (targetElement.closest("[data-quantity-plus]") || targetElement.closest("[data-quantity-minus]"))) {
                const valueElement = quantityContainer.querySelector("[data-quantity-value]");
                let value = parseInt(valueElement.value);
                const max = +valueElement.dataset.quantityMax || 1 / 0;
                const min = +valueElement.dataset.quantityMin || 1;
                if (targetElement.hasAttribute("data-quantity-plus")) value = Math.min(value + 1, max); else value = Math.max(value - 1, min);
                valueElement.value = value;
            }
        }));
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
    formQuantity();
})();
