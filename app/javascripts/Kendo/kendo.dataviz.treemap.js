/** 
 * Kendo UI v2016.1.420 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('util/main', ['kendo.core'], f);
}(function () {
    (function () {
        var math = Math, kendo = window.kendo, deepExtend = kendo.deepExtend;
        var DEG_TO_RAD = math.PI / 180, MAX_NUM = Number.MAX_VALUE, MIN_NUM = -Number.MAX_VALUE, UNDEFINED = 'undefined';
        function defined(value) {
            return typeof value !== UNDEFINED;
        }
        function round(value, precision) {
            var power = pow(precision);
            return math.round(value * power) / power;
        }
        function pow(p) {
            if (p) {
                return math.pow(10, p);
            } else {
                return 1;
            }
        }
        function limitValue(value, min, max) {
            return math.max(math.min(value, max), min);
        }
        function rad(degrees) {
            return degrees * DEG_TO_RAD;
        }
        function deg(radians) {
            return radians / DEG_TO_RAD;
        }
        function isNumber(val) {
            return typeof val === 'number' && !isNaN(val);
        }
        function valueOrDefault(value, defaultValue) {
            return defined(value) ? value : defaultValue;
        }
        function sqr(value) {
            return value * value;
        }
        function objectKey(object) {
            var parts = [];
            for (var key in object) {
                parts.push(key + object[key]);
            }
            return parts.sort().join('');
        }
        function hashKey(str) {
            var hash = 2166136261;
            for (var i = 0; i < str.length; ++i) {
                hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
                hash ^= str.charCodeAt(i);
            }
            return hash >>> 0;
        }
        function hashObject(object) {
            return hashKey(objectKey(object));
        }
        var now = Date.now;
        if (!now) {
            now = function () {
                return new Date().getTime();
            };
        }
        function arrayLimits(arr) {
            var length = arr.length, i, min = MAX_NUM, max = MIN_NUM;
            for (i = 0; i < length; i++) {
                max = math.max(max, arr[i]);
                min = math.min(min, arr[i]);
            }
            return {
                min: min,
                max: max
            };
        }
        function arrayMin(arr) {
            return arrayLimits(arr).min;
        }
        function arrayMax(arr) {
            return arrayLimits(arr).max;
        }
        function sparseArrayMin(arr) {
            return sparseArrayLimits(arr).min;
        }
        function sparseArrayMax(arr) {
            return sparseArrayLimits(arr).max;
        }
        function sparseArrayLimits(arr) {
            var min = MAX_NUM, max = MIN_NUM;
            for (var i = 0, length = arr.length; i < length; i++) {
                var n = arr[i];
                if (n !== null && isFinite(n)) {
                    min = math.min(min, n);
                    max = math.max(max, n);
                }
            }
            return {
                min: min === MAX_NUM ? undefined : min,
                max: max === MIN_NUM ? undefined : max
            };
        }
        function last(array) {
            if (array) {
                return array[array.length - 1];
            }
        }
        function append(first, second) {
            first.push.apply(first, second);
            return first;
        }
        function renderTemplate(text) {
            return kendo.template(text, {
                useWithBlock: false,
                paramName: 'd'
            });
        }
        function renderAttr(name, value) {
            return defined(value) && value !== null ? ' ' + name + '=\'' + value + '\' ' : '';
        }
        function renderAllAttr(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                output += renderAttr(attrs[i][0], attrs[i][1]);
            }
            return output;
        }
        function renderStyle(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                var value = attrs[i][1];
                if (defined(value)) {
                    output += attrs[i][0] + ':' + value + ';';
                }
            }
            if (output !== '') {
                return output;
            }
        }
        function renderSize(size) {
            if (typeof size !== 'string') {
                size += 'px';
            }
            return size;
        }
        function renderPos(pos) {
            var result = [];
            if (pos) {
                var parts = kendo.toHyphens(pos).split('-');
                for (var i = 0; i < parts.length; i++) {
                    result.push('k-pos-' + parts[i]);
                }
            }
            return result.join(' ');
        }
        function isTransparent(color) {
            return color === '' || color === null || color === 'none' || color === 'transparent' || !defined(color);
        }
        function arabicToRoman(n) {
            var literals = {
                1: 'i',
                10: 'x',
                100: 'c',
                2: 'ii',
                20: 'xx',
                200: 'cc',
                3: 'iii',
                30: 'xxx',
                300: 'ccc',
                4: 'iv',
                40: 'xl',
                400: 'cd',
                5: 'v',
                50: 'l',
                500: 'd',
                6: 'vi',
                60: 'lx',
                600: 'dc',
                7: 'vii',
                70: 'lxx',
                700: 'dcc',
                8: 'viii',
                80: 'lxxx',
                800: 'dccc',
                9: 'ix',
                90: 'xc',
                900: 'cm',
                1000: 'm'
            };
            var values = [
                1000,
                900,
                800,
                700,
                600,
                500,
                400,
                300,
                200,
                100,
                90,
                80,
                70,
                60,
                50,
                40,
                30,
                20,
                10,
                9,
                8,
                7,
                6,
                5,
                4,
                3,
                2,
                1
            ];
            var roman = '';
            while (n > 0) {
                if (n < values[0]) {
                    values.shift();
                } else {
                    roman += literals[values[0]];
                    n -= values[0];
                }
            }
            return roman;
        }
        function romanToArabic(r) {
            r = r.toLowerCase();
            var digits = {
                i: 1,
                v: 5,
                x: 10,
                l: 50,
                c: 100,
                d: 500,
                m: 1000
            };
            var value = 0, prev = 0;
            for (var i = 0; i < r.length; ++i) {
                var v = digits[r.charAt(i)];
                if (!v) {
                    return null;
                }
                value += v;
                if (v > prev) {
                    value -= 2 * prev;
                }
                prev = v;
            }
            return value;
        }
        function memoize(f) {
            var cache = Object.create(null);
            return function () {
                var id = '';
                for (var i = arguments.length; --i >= 0;) {
                    id += ':' + arguments[i];
                }
                if (id in cache) {
                    return cache[id];
                }
                return f.apply(this, arguments);
            };
        }
        function ucs2decode(string) {
            var output = [], counter = 0, length = string.length, value, extra;
            while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 55296 && value <= 56319 && counter < length) {
                    extra = string.charCodeAt(counter++);
                    if ((extra & 64512) == 56320) {
                        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                    } else {
                        output.push(value);
                        counter--;
                    }
                } else {
                    output.push(value);
                }
            }
            return output;
        }
        function ucs2encode(array) {
            return array.map(function (value) {
                var output = '';
                if (value > 65535) {
                    value -= 65536;
                    output += String.fromCharCode(value >>> 10 & 1023 | 55296);
                    value = 56320 | value & 1023;
                }
                output += String.fromCharCode(value);
                return output;
            }).join('');
        }
        deepExtend(kendo, {
            util: {
                MAX_NUM: MAX_NUM,
                MIN_NUM: MIN_NUM,
                append: append,
                arrayLimits: arrayLimits,
                arrayMin: arrayMin,
                arrayMax: arrayMax,
                defined: defined,
                deg: deg,
                hashKey: hashKey,
                hashObject: hashObject,
                isNumber: isNumber,
                isTransparent: isTransparent,
                last: last,
                limitValue: limitValue,
                now: now,
                objectKey: objectKey,
                round: round,
                rad: rad,
                renderAttr: renderAttr,
                renderAllAttr: renderAllAttr,
                renderPos: renderPos,
                renderSize: renderSize,
                renderStyle: renderStyle,
                renderTemplate: renderTemplate,
                sparseArrayLimits: sparseArrayLimits,
                sparseArrayMin: sparseArrayMin,
                sparseArrayMax: sparseArrayMax,
                sqr: sqr,
                valueOrDefault: valueOrDefault,
                romanToArabic: romanToArabic,
                arabicToRoman: arabicToRoman,
                memoize: memoize,
                ucs2encode: ucs2encode,
                ucs2decode: ucs2decode
            }
        });
        kendo.drawing.util = kendo.util;
        kendo.dataviz.util = kendo.util;
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('util/text-metrics', [
        'kendo.core',
        'util/main'
    ], f);
}(function () {
    (function ($) {
        var doc = document, kendo = window.kendo, Class = kendo.Class, util = kendo.util, defined = util.defined;
        var LRUCache = Class.extend({
            init: function (size) {
                this._size = size;
                this._length = 0;
                this._map = {};
            },
            put: function (key, value) {
                var lru = this, map = lru._map, entry = {
                        key: key,
                        value: value
                    };
                map[key] = entry;
                if (!lru._head) {
                    lru._head = lru._tail = entry;
                } else {
                    lru._tail.newer = entry;
                    entry.older = lru._tail;
                    lru._tail = entry;
                }
                if (lru._length >= lru._size) {
                    map[lru._head.key] = null;
                    lru._head = lru._head.newer;
                    lru._head.older = null;
                } else {
                    lru._length++;
                }
            },
            get: function (key) {
                var lru = this, entry = lru._map[key];
                if (entry) {
                    if (entry === lru._head && entry !== lru._tail) {
                        lru._head = entry.newer;
                        lru._head.older = null;
                    }
                    if (entry !== lru._tail) {
                        if (entry.older) {
                            entry.older.newer = entry.newer;
                            entry.newer.older = entry.older;
                        }
                        entry.older = lru._tail;
                        entry.newer = null;
                        lru._tail.newer = entry;
                        lru._tail = entry;
                    }
                    return entry.value;
                }
            }
        });
        var defaultMeasureBox = $('<div style=\'position: absolute !important; top: -4000px !important; width: auto !important; height: auto !important;' + 'padding: 0 !important; margin: 0 !important; border: 0 !important;' + 'line-height: normal !important; visibility: hidden !important; white-space: nowrap!important;\' />')[0];
        function zeroSize() {
            return {
                width: 0,
                height: 0,
                baseline: 0
            };
        }
        var TextMetrics = Class.extend({
            init: function (options) {
                this._cache = new LRUCache(1000);
                this._initOptions(options);
            },
            options: { baselineMarkerSize: 1 },
            measure: function (text, style, box) {
                if (!text) {
                    return zeroSize();
                }
                var styleKey = util.objectKey(style), cacheKey = util.hashKey(text + styleKey), cachedResult = this._cache.get(cacheKey);
                if (cachedResult) {
                    return cachedResult;
                }
                var size = zeroSize();
                var measureBox = box ? box : defaultMeasureBox;
                var baselineMarker = this._baselineMarker().cloneNode(false);
                for (var key in style) {
                    var value = style[key];
                    if (defined(value)) {
                        measureBox.style[key] = value;
                    }
                }
                $(measureBox).text(text);
                measureBox.appendChild(baselineMarker);
                doc.body.appendChild(measureBox);
                if ((text + '').length) {
                    size.width = measureBox.offsetWidth - this.options.baselineMarkerSize;
                    size.height = measureBox.offsetHeight;
                    size.baseline = baselineMarker.offsetTop + this.options.baselineMarkerSize;
                }
                if (size.width > 0 && size.height > 0) {
                    this._cache.put(cacheKey, size);
                }
                measureBox.parentNode.removeChild(measureBox);
                return size;
            },
            _baselineMarker: function () {
                return $('<div class=\'k-baseline-marker\' ' + 'style=\'display: inline-block; vertical-align: baseline;' + 'width: ' + this.options.baselineMarkerSize + 'px; height: ' + this.options.baselineMarkerSize + 'px;' + 'overflow: hidden;\' />')[0];
            }
        });
        TextMetrics.current = new TextMetrics();
        function measureText(text, style, measureBox) {
            return TextMetrics.current.measure(text, style, measureBox);
        }
        function loadFonts(fonts, callback) {
            var promises = [];
            if (fonts.length > 0 && document.fonts) {
                try {
                    promises = fonts.map(function (font) {
                        return document.fonts.load(font);
                    });
                } catch (e) {
                    kendo.logToConsole(e);
                }
                Promise.all(promises).then(callback, callback);
            } else {
                callback();
            }
        }
        kendo.util.TextMetrics = TextMetrics;
        kendo.util.LRUCache = LRUCache;
        kendo.util.loadFonts = loadFonts;
        kendo.util.measureText = measureText;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('util/base64', ['util/main'], f);
}(function () {
    (function () {
        var kendo = window.kendo, deepExtend = kendo.deepExtend, fromCharCode = String.fromCharCode;
        var KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        function encodeBase64(input) {
            var output = '';
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = encodeUTF8(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
            }
            return output;
        }
        function encodeUTF8(input) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                var c = input.charCodeAt(i);
                if (c < 128) {
                    output += fromCharCode(c);
                } else if (c < 2048) {
                    output += fromCharCode(192 | c >>> 6);
                    output += fromCharCode(128 | c & 63);
                } else if (c < 65536) {
                    output += fromCharCode(224 | c >>> 12);
                    output += fromCharCode(128 | c >>> 6 & 63);
                    output += fromCharCode(128 | c & 63);
                }
            }
            return output;
        }
        deepExtend(kendo.util, {
            encodeBase64: encodeBase64,
            encodeUTF8: encodeUTF8
        });
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('mixins/observers', ['kendo.core'], f);
}(function () {
    (function ($) {
        var math = Math, kendo = window.kendo, deepExtend = kendo.deepExtend, inArray = $.inArray;
        var ObserversMixin = {
            observers: function () {
                this._observers = this._observers || [];
                return this._observers;
            },
            addObserver: function (element) {
                if (!this._observers) {
                    this._observers = [element];
                } else {
                    this._observers.push(element);
                }
                return this;
            },
            removeObserver: function (element) {
                var observers = this.observers();
                var index = inArray(element, observers);
                if (index != -1) {
                    observers.splice(index, 1);
                }
                return this;
            },
            trigger: function (methodName, event) {
                var observers = this._observers;
                var observer;
                var idx;
                if (observers && !this._suspended) {
                    for (idx = 0; idx < observers.length; idx++) {
                        observer = observers[idx];
                        if (observer[methodName]) {
                            observer[methodName](event);
                        }
                    }
                }
                return this;
            },
            optionsChange: function (e) {
                this.trigger('optionsChange', e);
            },
            geometryChange: function (e) {
                this.trigger('geometryChange', e);
            },
            suspend: function () {
                this._suspended = (this._suspended || 0) + 1;
                return this;
            },
            resume: function () {
                this._suspended = math.max((this._suspended || 0) - 1, 0);
                return this;
            },
            _observerField: function (field, value) {
                if (this[field]) {
                    this[field].removeObserver(this);
                }
                this[field] = value;
                value.addObserver(this);
            }
        };
        deepExtend(kendo, { mixins: { ObserversMixin: ObserversMixin } });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('kendo.dataviz.treemap', [
        'kendo.data',
        'kendo.userevents',
        'kendo.dataviz.themes'
    ], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.treeMap',
        name: 'TreeMap',
        category: 'dataviz',
        description: 'The Kendo DataViz TreeMap',
        depends: [
            'data',
            'userevents',
            'dataviz.themes'
        ]
    };
    (function ($, undefined) {
        var math = Math, proxy = $.proxy, isArray = $.isArray, kendo = window.kendo, Class = kendo.Class, Widget = kendo.ui.Widget, template = kendo.template, deepExtend = kendo.deepExtend, HierarchicalDataSource = kendo.data.HierarchicalDataSource, getter = kendo.getter, dataviz = kendo.dataviz;
        var NS = '.kendoTreeMap', CHANGE = 'change', DATA_BOUND = 'dataBound', ITEM_CREATED = 'itemCreated', MAX_VALUE = Number.MAX_VALUE, MOUSEOVER_NS = 'mouseover' + NS, MOUSELEAVE_NS = 'mouseleave' + NS, UNDEFINED = 'undefined';
        var TreeMap = Widget.extend({
            init: function (element, options) {
                kendo.destroy(element);
                $(element).empty();
                Widget.fn.init.call(this, element, options);
                this.wrapper = this.element;
                this._initTheme(this.options);
                this.element.addClass('k-widget k-treemap');
                this._setLayout();
                this._originalOptions = deepExtend({}, this.options);
                this._initDataSource();
                this._attachEvents();
                kendo.notify(this, dataviz.ui);
            },
            options: {
                name: 'TreeMap',
                theme: 'default',
                autoBind: true,
                textField: 'text',
                valueField: 'value',
                colorField: 'color'
            },
            events: [
                DATA_BOUND,
                ITEM_CREATED
            ],
            _initTheme: function (options) {
                var that = this, themes = dataviz.ui.themes || {}, themeName = ((options || {}).theme || '').toLowerCase(), themeOptions = (themes[themeName] || {}).treeMap;
                that.options = deepExtend({}, themeOptions, options);
            },
            _attachEvents: function () {
                this.element.on(MOUSEOVER_NS, proxy(this._mouseover, this)).on(MOUSELEAVE_NS, proxy(this._mouseleave, this));
                this._resizeHandler = proxy(this.resize, this, false);
                kendo.onResize(this._resizeHandler);
            },
            _setLayout: function () {
                if (this.options.type === 'horizontal') {
                    this._layout = new SliceAndDice(false);
                    this._view = new SliceAndDiceView(this, this.options);
                } else if (this.options.type === 'vertical') {
                    this._layout = new SliceAndDice(true);
                    this._view = new SliceAndDiceView(this, this.options);
                } else {
                    this._layout = new Squarified();
                    this._view = new SquarifiedView(this, this.options);
                }
            },
            _initDataSource: function () {
                var that = this, options = that.options, dataSource = options.dataSource;
                that._dataChangeHandler = proxy(that._onDataChange, that);
                that.dataSource = HierarchicalDataSource.create(dataSource).bind(CHANGE, that._dataChangeHandler);
                if (dataSource) {
                    if (that.options.autoBind) {
                        that.dataSource.fetch();
                    }
                }
            },
            setDataSource: function (dataSource) {
                var that = this;
                that.dataSource.unbind(CHANGE, that._dataChangeHandler);
                that.dataSource = dataSource.bind(CHANGE, that._dataChangeHandler);
                if (dataSource) {
                    if (that.options.autoBind) {
                        that.dataSource.fetch();
                    }
                }
            },
            _onDataChange: function (e) {
                var node = e.node;
                var items = e.items;
                var options = this.options;
                var item, i;
                if (!node) {
                    this._cleanItems();
                    this.element.empty();
                    item = this._wrapItem(items[0]);
                    this._layout.createRoot(item, this.element.outerWidth(), this.element.outerHeight(), this.options.type === 'vertical');
                    this._view.createRoot(item);
                    this._root = item;
                    this._colorIdx = 0;
                } else {
                    if (items.length) {
                        var root = this._getByUid(node.uid);
                        root.children = [];
                        items = new kendo.data.Query(items)._sortForGrouping(options.valueField, 'desc');
                        for (i = 0; i < items.length; i++) {
                            item = items[i];
                            root.children.push(this._wrapItem(item));
                        }
                        var htmlSize = this._view.htmlSize(root);
                        this._layout.compute(root.children, root.coord, htmlSize);
                        this._setColors(root.children);
                        this._view.render(root);
                    }
                }
                for (i = 0; i < items.length; i++) {
                    items[i].load();
                }
                if (node) {
                    this.trigger(DATA_BOUND, { node: node });
                }
            },
            _cleanItems: function () {
                var that = this;
                that.angular('cleanup', function () {
                    return { elements: that.element.find('.k-leaf div,.k-treemap-title,.k-treemap-title-vertical') };
                });
            },
            _setColors: function (items) {
                var colors = this.options.colors;
                var colorIdx = this._colorIdx;
                var color = colors[colorIdx % colors.length];
                var colorRange, item;
                if (isArray(color)) {
                    colorRange = colorsByLength(color[0], color[1], items.length);
                }
                var leafNodes = false;
                for (var i = 0; i < items.length; i++) {
                    item = items[i];
                    if (!defined(item.color)) {
                        if (colorRange) {
                            item.color = colorRange[i];
                        } else {
                            item.color = color;
                        }
                    }
                    if (!item.dataItem.hasChildren) {
                        leafNodes = true;
                    }
                }
                if (leafNodes) {
                    this._colorIdx++;
                }
            },
            _contentSize: function (root) {
                this.view.renderHeight(root);
            },
            _wrapItem: function (item) {
                var wrap = {};
                if (defined(this.options.valueField)) {
                    wrap.value = getField(this.options.valueField, item);
                }
                if (defined(this.options.colorField)) {
                    wrap.color = getField(this.options.colorField, item);
                }
                if (defined(this.options.textField)) {
                    wrap.text = getField(this.options.textField, item);
                }
                wrap.level = item.level();
                wrap.dataItem = item;
                return wrap;
            },
            _getByUid: function (uid) {
                var items = [this._root];
                var item;
                while (items.length) {
                    item = items.pop();
                    if (item.dataItem.uid === uid) {
                        return item;
                    }
                    if (item.children) {
                        items = items.concat(item.children);
                    }
                }
            },
            dataItem: function (node) {
                var uid = $(node).attr(kendo.attr('uid')), dataSource = this.dataSource;
                return dataSource && dataSource.getByUid(uid);
            },
            findByUid: function (uid) {
                return this.element.find('.k-treemap-tile[' + kendo.attr('uid') + '=\'' + uid + '\']');
            },
            _mouseover: function (e) {
                var target = $(e.target);
                if (target.hasClass('k-leaf')) {
                    this._removeActiveState();
                    target.removeClass('k-state-hover').addClass('k-state-hover');
                }
            },
            _removeActiveState: function () {
                this.element.find('.k-state-hover').removeClass('k-state-hover');
            },
            _mouseleave: function () {
                this._removeActiveState();
            },
            destroy: function () {
                Widget.fn.destroy.call(this);
                this.element.off(NS);
                if (this.dataSource) {
                    this.dataSource.unbind(CHANGE, this._dataChangeHandler);
                }
                this._root = null;
                kendo.unbindResize(this._resizeHandler);
                kendo.destroy(this.element);
            },
            items: function () {
                return $();
            },
            getSize: function () {
                return kendo.dimensions(this.element);
            },
            _resize: function () {
                var root = this._root;
                if (root) {
                    var element = this.element;
                    var rootElement = element.children();
                    root.coord.width = element.outerWidth();
                    root.coord.height = element.outerHeight();
                    rootElement.css({
                        width: root.coord.width,
                        height: root.coord.height
                    });
                    this._resizeItems(root, rootElement);
                }
            },
            _resizeItems: function (root, element) {
                if (root.children && root.children.length) {
                    var elements = element.children('.k-treemap-wrap').children();
                    var child, childElement;
                    this._layout.compute(root.children, root.coord, { text: this._view.titleSize(root, element) });
                    for (var idx = 0; idx < root.children.length; idx++) {
                        child = root.children[idx];
                        childElement = elements.filter('[' + kendo.attr('uid') + '=\'' + child.dataItem.uid + '\']');
                        this._view.setItemSize(child, childElement);
                        this._resizeItems(child, childElement);
                    }
                }
            },
            setOptions: function (options) {
                var dataSource = options.dataSource;
                options.dataSource = undefined;
                this._originalOptions = deepExtend(this._originalOptions, options);
                this.options = deepExtend({}, this._originalOptions);
                this._setLayout();
                this._initTheme(this.options);
                Widget.fn._setEvents.call(this, options);
                if (dataSource) {
                    this.setDataSource(HierarchicalDataSource.create(dataSource));
                }
                if (this.options.autoBind) {
                    this.dataSource.fetch();
                }
            }
        });
        var Squarified = Class.extend({
            createRoot: function (root, width, height) {
                root.coord = {
                    width: width,
                    height: height,
                    top: 0,
                    left: 0
                };
            },
            leaf: function (tree) {
                return !tree.children;
            },
            layoutChildren: function (items, coord) {
                var parentArea = coord.width * coord.height;
                var totalArea = 0, itemsArea = [], i;
                for (i = 0; i < items.length; i++) {
                    itemsArea[i] = parseFloat(items[i].value);
                    totalArea += itemsArea[i];
                }
                for (i = 0; i < itemsArea.length; i++) {
                    items[i].area = parentArea * itemsArea[i] / totalArea;
                }
                var minimumSideValue = this.layoutHorizontal() ? coord.height : coord.width;
                var firstElement = [items[0]];
                var tail = items.slice(1);
                this.squarify(tail, firstElement, minimumSideValue, coord);
            },
            squarify: function (tail, initElement, width, coord) {
                this.computeDim(tail, initElement, width, coord);
            },
            computeDim: function (tail, initElement, width, coord) {
                if (tail.length + initElement.length == 1) {
                    var element = tail.length == 1 ? tail : initElement;
                    this.layoutLast(element, width, coord);
                    return;
                }
                if (tail.length >= 2 && initElement.length === 0) {
                    initElement = [tail[0]];
                    tail = tail.slice(1);
                }
                if (tail.length === 0) {
                    if (initElement.length > 0) {
                        this.layoutRow(initElement, width, coord);
                    }
                    return;
                }
                var firstElement = tail[0];
                if (this.worstAspectRatio(initElement, width) >= this.worstAspectRatio([firstElement].concat(initElement), width)) {
                    this.computeDim(tail.slice(1), initElement.concat([firstElement]), width, coord);
                } else {
                    var newCoords = this.layoutRow(initElement, width, coord);
                    this.computeDim(tail, [], newCoords.dim, newCoords);
                }
            },
            layoutLast: function (items, w, coord) {
                items[0].coord = coord;
            },
            layoutRow: function (items, width, coord) {
                if (this.layoutHorizontal()) {
                    return this.layoutV(items, width, coord);
                } else {
                    return this.layoutH(items, width, coord);
                }
            },
            orientation: 'h',
            layoutVertical: function () {
                return this.orientation === 'v';
            },
            layoutHorizontal: function () {
                return this.orientation === 'h';
            },
            layoutChange: function () {
                this.orientation = this.layoutVertical() ? 'h' : 'v';
            },
            worstAspectRatio: function (items, width) {
                if (!items || items.length === 0) {
                    return MAX_VALUE;
                }
                var areaSum = 0, maxArea = 0, minArea = MAX_VALUE;
                for (var i = 0; i < items.length; i++) {
                    var area = items[i].area;
                    areaSum += area;
                    minArea = minArea < area ? minArea : area;
                    maxArea = maxArea > area ? maxArea : area;
                }
                return math.max(width * width * maxArea / (areaSum * areaSum), areaSum * areaSum / (width * width * minArea));
            },
            compute: function (children, rootCoord, htmlSize) {
                if (!(rootCoord.width >= rootCoord.height && this.layoutHorizontal())) {
                    this.layoutChange();
                }
                if (children && children.length > 0) {
                    var newRootCoord = {
                        width: rootCoord.width,
                        height: rootCoord.height - htmlSize.text,
                        top: 0,
                        left: 0
                    };
                    this.layoutChildren(children, newRootCoord);
                }
            },
            layoutV: function (items, width, coord) {
                var totalArea = this._totalArea(items), top = 0;
                width = round(totalArea / width);
                for (var i = 0; i < items.length; i++) {
                    var height = round(items[i].area / width);
                    items[i].coord = {
                        height: height,
                        width: width,
                        top: coord.top + top,
                        left: coord.left
                    };
                    top += height;
                }
                var ans = {
                    height: coord.height,
                    width: coord.width - width,
                    top: coord.top,
                    left: coord.left + width
                };
                ans.dim = math.min(ans.width, ans.height);
                if (ans.dim != ans.height) {
                    this.layoutChange();
                }
                return ans;
            },
            layoutH: function (items, width, coord) {
                var totalArea = this._totalArea(items);
                var height = round(totalArea / width), top = coord.top, left = 0;
                for (var i = 0; i < items.length; i++) {
                    items[i].coord = {
                        height: height,
                        width: round(items[i].area / height),
                        top: top,
                        left: coord.left + left
                    };
                    left += items[i].coord.width;
                }
                var ans = {
                    height: coord.height - height,
                    width: coord.width,
                    top: coord.top + height,
                    left: coord.left
                };
                ans.dim = math.min(ans.width, ans.height);
                if (ans.dim != ans.width) {
                    this.layoutChange();
                }
                return ans;
            },
            _totalArea: function (items) {
                var total = 0;
                for (var i = 0; i < items.length; i++) {
                    total += items[i].area;
                }
                return total;
            }
        });
        var SquarifiedView = Class.extend({
            init: function (treeMap, options) {
                this.options = deepExtend({}, this.options, options);
                this.treeMap = treeMap;
                this.element = $(treeMap.element);
                this.offset = 0;
            },
            titleSize: function (item, element) {
                var text = element.children('.k-treemap-title');
                return text.height();
            },
            htmlSize: function (root) {
                var rootElement = this._getByUid(root.dataItem.uid);
                var htmlSize = { text: 0 };
                if (root.children) {
                    this._clean(rootElement);
                    var text = this._getText(root);
                    if (text) {
                        var title = this._createTitle(root);
                        rootElement.append(title);
                        this._compile(title, root.dataItem);
                        htmlSize.text = title.height();
                    }
                    rootElement.append(this._createWrap());
                    this.offset = (rootElement.outerWidth() - rootElement.innerWidth()) / 2;
                }
                return htmlSize;
            },
            _compile: function (element, dataItem) {
                this.treeMap.angular('compile', function () {
                    return {
                        elements: element,
                        data: [{ dataItem: dataItem }]
                    };
                });
            },
            _getByUid: function (uid) {
                return this.element.find('.k-treemap-tile[' + kendo.attr('uid') + '=\'' + uid + '\']');
            },
            render: function (root) {
                var rootElement = this._getByUid(root.dataItem.uid);
                var children = root.children;
                if (children) {
                    var rootWrap = rootElement.find('.k-treemap-wrap');
                    for (var i = 0; i < children.length; i++) {
                        var leaf = children[i];
                        var htmlElement = this._createLeaf(leaf);
                        rootWrap.append(htmlElement);
                        this._compile(htmlElement.children(), leaf.dataItem);
                        this.treeMap.trigger(ITEM_CREATED, { element: htmlElement });
                    }
                }
            },
            createRoot: function (root) {
                var htmlElement = this._createLeaf(root);
                this.element.append(htmlElement);
                this._compile(htmlElement.children(), root.dataItem);
                this.treeMap.trigger(ITEM_CREATED, { element: htmlElement });
            },
            _clean: function (root) {
                this.treeMap.angular('cleanup', function () {
                    return { elements: root.children(':not(.k-treemap-wrap)') };
                });
                root.css('background-color', '');
                root.removeClass('k-leaf');
                root.removeClass('k-inverse');
                root.empty();
            },
            _createLeaf: function (item) {
                return this._createTile(item).css('background-color', item.color).addClass('k-leaf').toggleClass('k-inverse', this._tileColorBrightness(item) > 180).append($('<div></div>').html(this._getText(item)));
            },
            _createTile: function (item) {
                var tile = $('<div class=\'k-treemap-tile\'></div>');
                this.setItemSize(item, tile);
                if (defined(item.dataItem) && defined(item.dataItem.uid)) {
                    tile.attr(kendo.attr('uid'), item.dataItem.uid);
                }
                return tile;
            },
            _itemCoordinates: function (item) {
                var coordinates = {
                    width: item.coord.width,
                    height: item.coord.height,
                    left: item.coord.left,
                    top: item.coord.top
                };
                if (coordinates.left && this.offset) {
                    coordinates.width += this.offset * 2;
                } else {
                    coordinates.width += this.offset;
                }
                if (coordinates.top) {
                    coordinates.height += this.offset * 2;
                } else {
                    coordinates.height += this.offset;
                }
                return coordinates;
            },
            setItemSize: function (item, element) {
                var coordinates = this._itemCoordinates(item);
                element.css({
                    width: coordinates.width,
                    height: coordinates.height,
                    left: coordinates.left,
                    top: coordinates.top
                });
            },
            _getText: function (item) {
                var text = item.text;
                if (this.options.template) {
                    text = this._renderTemplate(item);
                }
                return text;
            },
            _renderTemplate: function (item) {
                var titleTemplate = template(this.options.template);
                return titleTemplate({
                    dataItem: item.dataItem,
                    text: item.text
                });
            },
            _createTitle: function (item) {
                return $('<div class=\'k-treemap-title\'></div>').append($('<div></div>').html(this._getText(item)));
            },
            _createWrap: function () {
                return $('<div class=\'k-treemap-wrap\'></div>');
            },
            _tileColorBrightness: function (item) {
                return colorBrightness(item.color);
            }
        });
        var SliceAndDice = Class.extend({
            createRoot: function (root, width, height, vertical) {
                root.coord = {
                    width: width,
                    height: height,
                    top: 0,
                    left: 0
                };
                root.vertical = vertical;
            },
            init: function (vertical) {
                this.vertical = vertical;
                this.quotient = vertical ? 1 : 0;
            },
            compute: function (children, rootCoord, htmlSize) {
                if (children.length > 0) {
                    var width = rootCoord.width;
                    var height = rootCoord.height;
                    if (this.vertical) {
                        height -= htmlSize.text;
                    } else {
                        width -= htmlSize.text;
                    }
                    var newRootCoord = {
                        width: width,
                        height: height,
                        top: 0,
                        left: 0
                    };
                    this.layoutChildren(children, newRootCoord);
                }
            },
            layoutChildren: function (items, coord) {
                var parentArea = coord.width * coord.height;
                var totalArea = 0;
                var itemsArea = [];
                var i;
                for (i = 0; i < items.length; i++) {
                    var item = items[i];
                    itemsArea[i] = parseFloat(items[i].value);
                    totalArea += itemsArea[i];
                    item.vertical = this.vertical;
                }
                for (i = 0; i < itemsArea.length; i++) {
                    items[i].area = parentArea * itemsArea[i] / totalArea;
                }
                this.sliceAndDice(items, coord);
            },
            sliceAndDice: function (items, coord) {
                var totalArea = this._totalArea(items);
                if (items[0].level % 2 === this.quotient) {
                    this.layoutHorizontal(items, coord, totalArea);
                } else {
                    this.layoutVertical(items, coord, totalArea);
                }
            },
            layoutHorizontal: function (items, coord, totalArea) {
                var left = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var width = item.area / (totalArea / coord.width);
                    item.coord = {
                        height: coord.height,
                        width: width,
                        top: coord.top,
                        left: coord.left + left
                    };
                    left += width;
                }
            },
            layoutVertical: function (items, coord, totalArea) {
                var top = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var height = item.area / (totalArea / coord.height);
                    item.coord = {
                        height: height,
                        width: coord.width,
                        top: coord.top + top,
                        left: coord.left
                    };
                    top += height;
                }
            },
            _totalArea: function (items) {
                var total = 0;
                for (var i = 0; i < items.length; i++) {
                    total += items[i].area;
                }
                return total;
            }
        });
        var SliceAndDiceView = SquarifiedView.extend({
            htmlSize: function (root) {
                var rootElement = this._getByUid(root.dataItem.uid);
                var htmlSize = {
                    text: 0,
                    offset: 0
                };
                if (root.children) {
                    this._clean(rootElement);
                    var text = this._getText(root);
                    if (text) {
                        var title = this._createTitle(root);
                        rootElement.append(title);
                        this._compile(title, root.dataItem);
                        if (root.vertical) {
                            htmlSize.text = title.height();
                        } else {
                            htmlSize.text = title.width();
                        }
                    }
                    rootElement.append(this._createWrap());
                    this.offset = (rootElement.outerWidth() - rootElement.innerWidth()) / 2;
                }
                return htmlSize;
            },
            titleSize: function (item, element) {
                var size;
                if (item.vertical) {
                    size = element.children('.k-treemap-title').height();
                } else {
                    size = element.children('.k-treemap-title-vertical').width();
                }
                return size;
            },
            _createTitle: function (item) {
                var title;
                if (item.vertical) {
                    title = $('<div class=\'k-treemap-title\'></div>');
                } else {
                    title = $('<div class=\'k-treemap-title-vertical\'></div>');
                }
                return title.append($('<div></div>').html(this._getText(item)));
            }
        });
        function getField(field, row) {
            if (row === null) {
                return row;
            }
            var get = getter(field, true);
            return get(row);
        }
        function defined(value) {
            return typeof value !== UNDEFINED;
        }
        function colorsByLength(min, max, length) {
            var minRGBtoDecimal = rgbToDecimal(min);
            var maxRGBtoDecimal = rgbToDecimal(max);
            var isDarker = colorBrightness(min) - colorBrightness(max) < 0;
            var colors = [];
            colors.push(min);
            for (var i = 0; i < length; i++) {
                var rgbColor = {
                    r: colorByIndex(minRGBtoDecimal.r, maxRGBtoDecimal.r, i, length, isDarker),
                    g: colorByIndex(minRGBtoDecimal.g, maxRGBtoDecimal.g, i, length, isDarker),
                    b: colorByIndex(minRGBtoDecimal.b, maxRGBtoDecimal.b, i, length, isDarker)
                };
                colors.push(buildColorFromRGB(rgbColor));
            }
            colors.push(max);
            return colors;
        }
        function colorByIndex(min, max, index, length, isDarker) {
            var minColor = math.min(math.abs(min), math.abs(max));
            var maxColor = math.max(math.abs(min), math.abs(max));
            var step = (maxColor - minColor) / (length + 1);
            var currentStep = step * (index + 1);
            var color;
            if (isDarker) {
                color = minColor + currentStep;
            } else {
                color = maxColor - currentStep;
            }
            return color;
        }
        function buildColorFromRGB(color) {
            return '#' + decimalToRgb(color.r) + decimalToRgb(color.g) + decimalToRgb(color.b);
        }
        function rgbToDecimal(color) {
            color = color.replace('#', '');
            var rgbColor = colorToRGB(color);
            return {
                r: rgbToHex(rgbColor.r),
                g: rgbToHex(rgbColor.g),
                b: rgbToHex(rgbColor.b)
            };
        }
        function decimalToRgb(number) {
            var result = math.round(number).toString(16).toUpperCase();
            if (result.length === 1) {
                result = '0' + result;
            }
            return result;
        }
        function colorToRGB(color) {
            var colorLength = color.length;
            var rgbColor = {};
            if (colorLength === 3) {
                rgbColor.r = color[0];
                rgbColor.g = color[1];
                rgbColor.b = color[2];
            } else {
                rgbColor.r = color.substring(0, 2);
                rgbColor.g = color.substring(2, 4);
                rgbColor.b = color.substring(4, 6);
            }
            return rgbColor;
        }
        function rgbToHex(rgb) {
            return parseInt(rgb.toString(16), 16);
        }
        function colorBrightness(color) {
            var brightness = 0;
            if (color) {
                color = rgbToDecimal(color);
                brightness = math.sqrt(0.241 * color.r * color.r + 0.691 * color.g * color.g + 0.068 * color.b * color.b);
            }
            return brightness;
        }
        function round(value) {
            var power = math.pow(10, 4);
            return math.round(value * power) / power;
        }
        dataviz.ui.plugin(TreeMap);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));