(() => {
    var __webpack_modules__ = {
        713: function(module, exports) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(global, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ module, exports ], __WEBPACK_AMD_DEFINE_FACTORY__ = factory,
                    __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__,
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else ;
            })(0, (function(module, exports) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                var _class, _temp;
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                var _createClass = function() {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }
                    return function(Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();
                function isIn(needle, haystack) {
                    return haystack.indexOf(needle) >= 0;
                }
                function extend(custom, defaults) {
                    for (var key in defaults) if (custom[key] == null) {
                        var value = defaults[key];
                        custom[key] = value;
                    }
                    return custom;
                }
                function isMobile(agent) {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
                }
                function createEvent(event) {
                    var bubble = arguments.length <= 1 || arguments[1] === void 0 ? false : arguments[1];
                    var cancel = arguments.length <= 2 || arguments[2] === void 0 ? false : arguments[2];
                    var detail = arguments.length <= 3 || arguments[3] === void 0 ? null : arguments[3];
                    var customEvent = void 0;
                    if (document.createEvent != null) {
                        customEvent = document.createEvent("CustomEvent");
                        customEvent.initCustomEvent(event, bubble, cancel, detail);
                    } else if (document.createEventObject != null) {
                        customEvent = document.createEventObject();
                        customEvent.eventType = event;
                    } else customEvent.eventName = event;
                    return customEvent;
                }
                function emitEvent(elem, event) {
                    if (elem.dispatchEvent != null) elem.dispatchEvent(event); else if (event in (elem != null)) elem[event](); else if ("on" + event in (elem != null)) elem["on" + event]();
                }
                function addEvent(elem, event, fn) {
                    if (elem.addEventListener != null) elem.addEventListener(event, fn, false); else if (elem.attachEvent != null) elem.attachEvent("on" + event, fn); else elem[event] = fn;
                }
                function removeEvent(elem, event, fn) {
                    if (elem.removeEventListener != null) elem.removeEventListener(event, fn, false); else if (elem.detachEvent != null) elem.detachEvent("on" + event, fn); else delete elem[event];
                }
                function getInnerHeight() {
                    if ("innerHeight" in window) return window.innerHeight;
                    return document.documentElement.clientHeight;
                }
                var WeakMap = window.WeakMap || window.MozWeakMap || function() {
                    function WeakMap() {
                        _classCallCheck(this, WeakMap);
                        this.keys = [];
                        this.values = [];
                    }
                    _createClass(WeakMap, [ {
                        key: "get",
                        value: function get(key) {
                            for (var i = 0; i < this.keys.length; i++) {
                                var item = this.keys[i];
                                if (item === key) return this.values[i];
                            }
                            return;
                        }
                    }, {
                        key: "set",
                        value: function set(key, value) {
                            for (var i = 0; i < this.keys.length; i++) {
                                var item = this.keys[i];
                                if (item === key) {
                                    this.values[i] = value;
                                    return this;
                                }
                            }
                            this.keys.push(key);
                            this.values.push(value);
                            return this;
                        }
                    } ]);
                    return WeakMap;
                }();
                var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function() {
                    function MutationObserver() {
                        _classCallCheck(this, MutationObserver);
                        if (typeof console !== "undefined" && console !== null) {
                            console.warn("MutationObserver is not supported by your browser.");
                            console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
                        }
                    }
                    _createClass(MutationObserver, [ {
                        key: "observe",
                        value: function observe() {}
                    } ]);
                    return MutationObserver;
                }(), _class.notSupported = true, _temp);
                var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {
                    var getComputedStyleRX = /(\-([a-z]){1})/g;
                    return {
                        getPropertyValue: function getPropertyValue(prop) {
                            if (prop === "float") prop = "styleFloat";
                            if (getComputedStyleRX.test(prop)) prop.replace(getComputedStyleRX, (function(_, _char) {
                                return _char.toUpperCase();
                            }));
                            var currentStyle = el.currentStyle;
                            return (currentStyle != null ? currentStyle[prop] : void 0) || null;
                        }
                    };
                };
                var WOW = function() {
                    function WOW() {
                        var options = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
                        _classCallCheck(this, WOW);
                        this.defaults = {
                            boxClass: "wow",
                            animateClass: "animated",
                            offset: 0,
                            mobile: true,
                            live: true,
                            callback: null,
                            scrollContainer: null
                        };
                        this.animate = function animateFactory() {
                            if ("requestAnimationFrame" in window) return function(callback) {
                                return window.requestAnimationFrame(callback);
                            };
                            return function(callback) {
                                return callback();
                            };
                        }();
                        this.vendors = [ "moz", "webkit" ];
                        this.start = this.start.bind(this);
                        this.resetAnimation = this.resetAnimation.bind(this);
                        this.scrollHandler = this.scrollHandler.bind(this);
                        this.scrollCallback = this.scrollCallback.bind(this);
                        this.scrolled = true;
                        this.config = extend(options, this.defaults);
                        if (options.scrollContainer != null) this.config.scrollContainer = document.querySelector(options.scrollContainer);
                        this.animationNameCache = new WeakMap;
                        this.wowEvent = createEvent(this.config.boxClass);
                    }
                    _createClass(WOW, [ {
                        key: "init",
                        value: function init() {
                            this.element = window.document.documentElement;
                            if (isIn(document.readyState, [ "interactive", "complete" ])) this.start(); else addEvent(document, "DOMContentLoaded", this.start);
                            this.finished = [];
                        }
                    }, {
                        key: "start",
                        value: function start() {
                            var _this = this;
                            this.stopped = false;
                            this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass));
                            this.all = this.boxes.slice(0);
                            if (this.boxes.length) if (this.disabled()) this.resetStyle(); else for (var i = 0; i < this.boxes.length; i++) {
                                var box = this.boxes[i];
                                this.applyStyle(box, true);
                            }
                            if (!this.disabled()) {
                                addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                                addEvent(window, "resize", this.scrollHandler);
                                this.interval = setInterval(this.scrollCallback, 50);
                            }
                            if (this.config.live) {
                                var mut = new MutationObserver((function(records) {
                                    for (var j = 0; j < records.length; j++) {
                                        var record = records[j];
                                        for (var k = 0; k < record.addedNodes.length; k++) {
                                            var node = record.addedNodes[k];
                                            _this.doSync(node);
                                        }
                                    }
                                    return;
                                }));
                                mut.observe(document.body, {
                                    childList: true,
                                    subtree: true
                                });
                            }
                        }
                    }, {
                        key: "stop",
                        value: function stop() {
                            this.stopped = true;
                            removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                            removeEvent(window, "resize", this.scrollHandler);
                            if (this.interval != null) clearInterval(this.interval);
                        }
                    }, {
                        key: "sync",
                        value: function sync() {
                            if (MutationObserver.notSupported) this.doSync(this.element);
                        }
                    }, {
                        key: "doSync",
                        value: function doSync(element) {
                            if (typeof element === "undefined" || element === null) element = this.element;
                            if (element.nodeType !== 1) return;
                            element = element.parentNode || element;
                            var iterable = element.querySelectorAll("." + this.config.boxClass);
                            for (var i = 0; i < iterable.length; i++) {
                                var box = iterable[i];
                                if (!isIn(box, this.all)) {
                                    this.boxes.push(box);
                                    this.all.push(box);
                                    if (this.stopped || this.disabled()) this.resetStyle(); else this.applyStyle(box, true);
                                    this.scrolled = true;
                                }
                            }
                        }
                    }, {
                        key: "show",
                        value: function show(box) {
                            this.applyStyle(box);
                            box.className = box.className + " " + this.config.animateClass;
                            if (this.config.callback != null) this.config.callback(box);
                            emitEvent(box, this.wowEvent);
                            addEvent(box, "animationend", this.resetAnimation);
                            addEvent(box, "oanimationend", this.resetAnimation);
                            addEvent(box, "webkitAnimationEnd", this.resetAnimation);
                            addEvent(box, "MSAnimationEnd", this.resetAnimation);
                            return box;
                        }
                    }, {
                        key: "applyStyle",
                        value: function applyStyle(box, hidden) {
                            var _this2 = this;
                            var duration = box.getAttribute("data-wow-duration");
                            var delay = box.getAttribute("data-wow-delay");
                            var iteration = box.getAttribute("data-wow-iteration");
                            return this.animate((function() {
                                return _this2.customStyle(box, hidden, duration, delay, iteration);
                            }));
                        }
                    }, {
                        key: "resetStyle",
                        value: function resetStyle() {
                            for (var i = 0; i < this.boxes.length; i++) {
                                var box = this.boxes[i];
                                box.style.visibility = "visible";
                            }
                            return;
                        }
                    }, {
                        key: "resetAnimation",
                        value: function resetAnimation(event) {
                            if (event.type.toLowerCase().indexOf("animationend") >= 0) {
                                var target = event.target || event.srcElement;
                                target.className = target.className.replace(this.config.animateClass, "").trim();
                            }
                        }
                    }, {
                        key: "customStyle",
                        value: function customStyle(box, hidden, duration, delay, iteration) {
                            if (hidden) this.cacheAnimationName(box);
                            box.style.visibility = hidden ? "hidden" : "visible";
                            if (duration) this.vendorSet(box.style, {
                                animationDuration: duration
                            });
                            if (delay) this.vendorSet(box.style, {
                                animationDelay: delay
                            });
                            if (iteration) this.vendorSet(box.style, {
                                animationIterationCount: iteration
                            });
                            this.vendorSet(box.style, {
                                animationName: hidden ? "none" : this.cachedAnimationName(box)
                            });
                            return box;
                        }
                    }, {
                        key: "vendorSet",
                        value: function vendorSet(elem, properties) {
                            for (var name in properties) if (properties.hasOwnProperty(name)) {
                                var value = properties[name];
                                elem["" + name] = value;
                                for (var i = 0; i < this.vendors.length; i++) {
                                    var vendor = this.vendors[i];
                                    elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;
                                }
                            }
                        }
                    }, {
                        key: "vendorCSS",
                        value: function vendorCSS(elem, property) {
                            var style = getComputedStyle(elem);
                            var result = style.getPropertyCSSValue(property);
                            for (var i = 0; i < this.vendors.length; i++) {
                                var vendor = this.vendors[i];
                                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
                            }
                            return result;
                        }
                    }, {
                        key: "animationName",
                        value: function animationName(box) {
                            var aName = void 0;
                            try {
                                aName = this.vendorCSS(box, "animation-name").cssText;
                            } catch (error) {
                                aName = getComputedStyle(box).getPropertyValue("animation-name");
                            }
                            if (aName === "none") return "";
                            return aName;
                        }
                    }, {
                        key: "cacheAnimationName",
                        value: function cacheAnimationName(box) {
                            return this.animationNameCache.set(box, this.animationName(box));
                        }
                    }, {
                        key: "cachedAnimationName",
                        value: function cachedAnimationName(box) {
                            return this.animationNameCache.get(box);
                        }
                    }, {
                        key: "scrollHandler",
                        value: function scrollHandler() {
                            this.scrolled = true;
                        }
                    }, {
                        key: "scrollCallback",
                        value: function scrollCallback() {
                            if (this.scrolled) {
                                this.scrolled = false;
                                var results = [];
                                for (var i = 0; i < this.boxes.length; i++) {
                                    var box = this.boxes[i];
                                    if (box) {
                                        if (this.isVisible(box)) {
                                            this.show(box);
                                            continue;
                                        }
                                        results.push(box);
                                    }
                                }
                                this.boxes = results;
                                if (!this.boxes.length && !this.config.live) this.stop();
                            }
                        }
                    }, {
                        key: "offsetTop",
                        value: function offsetTop(element) {
                            while (element.offsetTop === void 0) element = element.parentNode;
                            var top = element.offsetTop;
                            while (element.offsetParent) {
                                element = element.offsetParent;
                                top += element.offsetTop;
                            }
                            return top;
                        }
                    }, {
                        key: "isVisible",
                        value: function isVisible(box) {
                            var offset = box.getAttribute("data-wow-offset") || this.config.offset;
                            var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
                            var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;
                            var top = this.offsetTop(box);
                            var bottom = top + box.clientHeight;
                            return top <= viewBottom && bottom >= viewTop;
                        }
                    }, {
                        key: "disabled",
                        value: function disabled() {
                            return !this.config.mobile && isMobile(navigator.userAgent);
                        }
                    } ]);
                    return WOW;
                }();
                exports.default = WOW;
                module.exports = exports["default"];
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
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
        var wow = __webpack_require__(713);
        let wow_wow = new wow({
            boxClass: "wow",
            animateClass: "animate__animated",
            offset: 0,
            mobile: true,
            live: true,
            scrollContainer: null,
            resetAnimation: true
        });
        wow_wow.init();
    })();
})();
