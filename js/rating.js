(() => {
    "use strict";
    function formRating() {
        const ratings = document.querySelectorAll("[data-rating]");
        if (ratings.length) ratings.forEach((rating => {
            const ratingValue = +rating.dataset.ratingValue || 0;
            const ratingSize = +rating.dataset.ratingSize || 5;
            formRatingInit(rating, ratingSize);
            if (ratingValue) formRatingSet(rating, ratingValue);
            document.addEventListener("click", formRatingAction);
        }));
        function formRatingAction(e) {
            const inputElement = e.target.closest(".rating__input");
            if (inputElement) {
                const ratingValue = +inputElement.value;
                const rating = inputElement.closest(".rating");
                if (rating.dataset.rating === "set") formRatingGet(rating, ratingValue);
            }
        }
        function formRatingInit(rating, ratingSize) {
            const ratingItems = Array.from({
                length: ratingSize
            }, ((_, index) => `\n\t\t\t<label class="rating__item">\n\t\t\t\t<input class="rating__input" type="radio" name="rating" value="${index + 1}">\n\t\t\t</label>\n\t\t`)).join("");
            rating.insertAdjacentHTML("beforeend", `<div class="rating__items">${ratingItems}</div>`);
        }
        function formRatingGet(rating, ratingValue) {
            formRatingSet(rating, ratingValue);
        }
        function formRatingSet(rating, value) {
            const ratingItems = rating.querySelectorAll(".rating__item");
            const fullItems = Math.floor(value);
            const partialItemWidth = (value - fullItems) * 100;
            if (rating.hasAttribute("data-rating-title")) rating.title = value;
            ratingItems.forEach(((ratingItem, index) => {
                ratingItem.classList.toggle("rating__item--active", index < fullItems);
                const span = ratingItem.querySelector("span");
                if (index === fullItems && partialItemWidth) span ? span.style.width = `${partialItemWidth}%` : ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${partialItemWidth}%"></span>`); else if (span) span.remove();
            }));
        }
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
    formRating();
})();
