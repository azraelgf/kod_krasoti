(() => {
    "use strict";
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spoilers() {
        const spoilersArray = document.querySelectorAll("[data-spoilers]");
        if (spoilersArray.length > 0) {
            const spoilersRegular = Array.from(spoilersArray).filter((function(item, index, self) {
                return !item.dataset.spoilers.split(",")[0];
            }));
            if (spoilersRegular.length) initspoilers(spoilersRegular);
            let mdQueriesArray = dataMediaQueries(spoilersArray, "spoilers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initspoilers(spoilersArray, matchMedia = false) {
                spoilersArray.forEach((spoilersBlock => {
                    spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spoilersBlock.classList.add("_spoiler-init");
                        initSpollerBody(spoilersBlock);
                        spoilersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spoilersBlock.classList.remove("_spoiler-init");
                        initSpollerBody(spoilersBlock, false);
                        spoilersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spoilersBlock, hideSpollerBody = true) {
                let spollerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spoilers]") === spoilersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoiler-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoiler]")) {
                    const spollerTitle = el.closest("[data-spoiler]");
                    const spoilersBlock = spollerTitle.closest("[data-spoilers]");
                    const oneSpoller = spoilersBlock.hasAttribute("data-one-spoller");
                    const spoilerspeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                    if (!spoilersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoiler-active")) hidespoilersBody(spoilersBlock);
                        spollerTitle.classList.toggle("_spoiler-active");
                        _slideToggle(spollerTitle.nextElementSibling, spoilerspeed);
                    }
                    e.preventDefault();
                }
            }
            function hidespoilersBody(spoilersBlock) {
                const spollerActiveTitle = spoilersBlock.querySelector("[data-spoiler]._spoiler-active");
                const spoilerspeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                if (spollerActiveTitle && !spoilersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoiler-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spoilerspeed);
                }
            }
            const spoilersClose = document.querySelectorAll("[data-spoiler-close]");
            if (spoilersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spoilers]")) spoilersClose.forEach((spollerClose => {
                    const spoilersBlock = spollerClose.closest("[data-spoilers]");
                    if (spoilersBlock.classList.contains("_spoiler-init")) {
                        const spoilerspeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                        spollerClose.classList.remove("_spoiler-active");
                        _slideUp(spollerClose.nextElementSibling, spoilerspeed);
                    }
                }));
            }));
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function showMore() {
        window.addEventListener("load", (function(e) {
            const showMoreBlocks = document.querySelectorAll("[data-showmore]");
            let showMoreBlocksRegular;
            let mdQueriesArray;
            if (showMoreBlocks.length) {
                showMoreBlocksRegular = Array.from(showMoreBlocks).filter((function(item, index, self) {
                    return !item.dataset.showmoreMedia;
                }));
                showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                document.addEventListener("click", showMoreActions);
                window.addEventListener("resize", showMoreActions);
                mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
                if (mdQueriesArray && mdQueriesArray.length) {
                    mdQueriesArray.forEach((mdQueriesItem => {
                        mdQueriesItem.matchMedia.addEventListener("change", (function() {
                            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                        }));
                    }));
                    initItemsMedia(mdQueriesArray);
                }
            }
            function initItemsMedia(mdQueriesArray) {
                mdQueriesArray.forEach((mdQueriesItem => {
                    initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function initItems(showMoreBlocks, matchMedia) {
                showMoreBlocks.forEach((showMoreBlock => {
                    initItem(showMoreBlock, matchMedia);
                }));
            }
            function initItem(showMoreBlock, matchMedia = false) {
                showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
                let showMoreContent = showMoreBlock.querySelectorAll("[data-showmore-content]");
                let showMoreButton = showMoreBlock.querySelectorAll("[data-showmore-button]");
                showMoreContent = Array.from(showMoreContent).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                showMoreButton = Array.from(showMoreButton).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                if (matchMedia.matches || !matchMedia) if (hiddenHeight < getOriginalHeight(showMoreContent)) {
                    _slideUp(showMoreContent, 0, showMoreBlock.classList.contains("_showmore-active") ? getOriginalHeight(showMoreContent) : hiddenHeight);
                    showMoreButton.hidden = false;
                } else {
                    _slideDown(showMoreContent, 0, hiddenHeight);
                    showMoreButton.hidden = true;
                } else {
                    _slideDown(showMoreContent, 0, hiddenHeight);
                    showMoreButton.hidden = true;
                }
            }
            function getHeight(showMoreBlock, showMoreContent) {
                let hiddenHeight = 0;
                const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : "size";
                const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) ? parseFloat(getComputedStyle(showMoreContent).rowGap) : 0;
                if (showMoreType === "items") {
                    const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
                    const showMoreItems = showMoreContent.children;
                    for (let index = 1; index < showMoreItems.length; index++) {
                        const showMoreItem = showMoreItems[index - 1];
                        const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop) ? parseFloat(getComputedStyle(showMoreItem).marginTop) : 0;
                        const marginBottom = parseFloat(getComputedStyle(showMoreItem).marginBottom) ? parseFloat(getComputedStyle(showMoreItem).marginBottom) : 0;
                        hiddenHeight += showMoreItem.offsetHeight + marginTop;
                        if (index == showMoreTypeValue) break;
                        hiddenHeight += marginBottom;
                    }
                    rowGap ? hiddenHeight += (showMoreTypeValue - 1) * rowGap : null;
                } else {
                    const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
                    hiddenHeight = showMoreTypeValue;
                }
                return hiddenHeight;
            }
            function getOriginalHeight(showMoreContent) {
                let parentHidden;
                let hiddenHeight = showMoreContent.offsetHeight;
                showMoreContent.style.removeProperty("height");
                if (showMoreContent.closest(`[hidden]`)) {
                    parentHidden = showMoreContent.closest(`[hidden]`);
                    parentHidden.hidden = false;
                }
                let originalHeight = showMoreContent.offsetHeight;
                parentHidden ? parentHidden.hidden = true : null;
                showMoreContent.style.height = `${hiddenHeight}px`;
                return originalHeight;
            }
            function showMoreActions(e) {
                const targetEvent = e.target;
                const targetType = e.type;
                if (targetType === "click") {
                    if (targetEvent.closest("[data-showmore-button]")) {
                        const showMoreButton = targetEvent.closest("[data-showmore-button]");
                        const showMoreBlock = showMoreButton.closest("[data-showmore]");
                        const showMoreContent = showMoreBlock.querySelector("[data-showmore-content]");
                        const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : "500";
                        const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                        if (!showMoreContent.classList.contains("_slide")) {
                            showMoreBlock.classList.contains("_showmore-active") ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
                            showMoreBlock.classList.toggle("_showmore-active");
                        }
                    }
                } else if (targetType === "resize") {
                    showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                    mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
                }
            }
        }));
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
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
    addLoadedClass();
    menuInit();
    spoilers();
    showMore();
    formRating();
})();
