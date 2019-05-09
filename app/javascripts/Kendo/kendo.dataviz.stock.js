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
    define('kendo.dataviz.stock', ['kendo.dataviz.chart'], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.stockchart',
        name: 'StockChart',
        category: 'dataviz',
        description: 'StockChart widget and associated financial series.',
        depends: ['dataviz.chart']
    };
    (function ($, undefined) {
        var kendo = window.kendo, Class = kendo.Class, Observable = kendo.Observable, deepExtend = kendo.deepExtend, math = Math, proxy = $.proxy, util = kendo.util, last = util.last, renderTemplate = util.renderTemplate, dataviz = kendo.dataviz, defined = util.defined, filterSeriesByType = dataviz.filterSeriesByType, template = kendo.template, Chart = dataviz.ui.Chart, Selection = dataviz.Selection, addDuration = dataviz.addDuration, limitValue = util.limitValue, lteDateIndex = dataviz.lteDateIndex, toDate = dataviz.toDate, toTime = dataviz.toTime;
        var AUTO_CATEGORY_WIDTH = 28, CHANGE = 'change', CSS_PREFIX = 'k-', DRAG = 'drag', DRAG_END = 'dragEnd', NAVIGATOR_PANE = '_navigator', NAVIGATOR_AXIS = NAVIGATOR_PANE, EQUALLY_SPACED_SERIES = dataviz.EQUALLY_SPACED_SERIES, ZOOM_ACCELERATION = 3, ZOOM = 'zoom', ZOOM_END = 'zoomEnd';
        var StockChart = Chart.extend({
            init: function (element, userOptions) {
                $(element).addClass(CSS_PREFIX + 'chart');
                Chart.fn.init.call(this, element, userOptions);
            },
            _applyDefaults: function (options, themeOptions) {
                var chart = this, width = chart.element.width() || dataviz.DEFAULT_WIDTH;
                var stockDefaults = {
                    seriesDefaults: { categoryField: options.dateField },
                    axisDefaults: {
                        categoryAxis: {
                            name: 'default',
                            majorGridLines: { visible: false },
                            labels: { step: 2 },
                            majorTicks: { visible: false },
                            maxDateGroups: math.floor(width / AUTO_CATEGORY_WIDTH)
                        }
                    }
                };
                if (themeOptions) {
                    themeOptions = deepExtend({}, themeOptions, stockDefaults);
                }
                if (!chart._navigator) {
                    Navigator.setup(options, themeOptions);
                }
                Chart.fn._applyDefaults.call(chart, options, themeOptions);
            },
            _initDataSource: function (userOptions) {
                var options = userOptions || {}, dataSource = options.dataSource, hasServerFiltering = dataSource && dataSource.serverFiltering, mainAxis = [].concat(options.categoryAxis)[0], naviOptions = options.navigator || {}, select = naviOptions.select, hasSelect = select && select.from && select.to, filter, dummyAxis;
                if (hasServerFiltering && hasSelect) {
                    filter = [].concat(dataSource.filter || []);
                    dummyAxis = new dataviz.DateCategoryAxis(deepExtend({ baseUnit: 'fit' }, mainAxis, {
                        categories: [
                            select.from,
                            select.to
                        ]
                    }));
                    dataSource.filter = Navigator.buildFilter(dummyAxis.range().min, select.to).concat(filter);
                }
                Chart.fn._initDataSource.call(this, userOptions);
            },
            options: {
                name: 'StockChart',
                dateField: 'date',
                axisDefaults: {
                    categoryAxis: {
                        type: 'date',
                        baseUnit: 'fit',
                        justified: true
                    },
                    valueAxis: {
                        narrowRange: true,
                        labels: { format: 'C' }
                    }
                },
                navigator: {
                    select: {},
                    seriesDefaults: {
                        markers: { visible: false },
                        tooltip: {
                            visible: true,
                            template: '#= kendo.toString(category, \'d\') #'
                        },
                        line: { width: 2 }
                    },
                    hint: {},
                    visible: true
                },
                tooltip: { visible: true },
                legend: { visible: false }
            },
            _resize: function () {
                var t = this.options.transitions;
                this.options.transitions = false;
                this._fullRedraw();
                this.options.transitions = t;
            },
            _redraw: function () {
                var chart = this, navigator = chart._navigator;
                if (!this._dirty() && navigator && navigator.dataSource) {
                    navigator.redrawSlaves();
                } else {
                    chart._fullRedraw();
                }
            },
            _dirty: function () {
                var options = this.options;
                var series = [].concat(options.series, options.navigator.series);
                var seriesCount = $.grep(series, function (s) {
                    return s && s.visible;
                }).length;
                var dirty = this._seriesCount !== seriesCount;
                this._seriesCount = seriesCount;
                return dirty;
            },
            _fullRedraw: function () {
                var chart = this, navigator = chart._navigator;
                if (!navigator) {
                    navigator = chart._navigator = new Navigator(chart);
                }
                navigator._setRange();
                Chart.fn._redraw.call(chart);
                navigator._initSelection();
            },
            _onDataChanged: function () {
                var chart = this;
                Chart.fn._onDataChanged.call(chart);
                chart._dataBound = true;
            },
            _bindCategoryAxis: function (axis, data, axisIx) {
                var chart = this, categoryAxes = chart.options.categoryAxis, axesLength = categoryAxes.length, currentAxis;
                Chart.fn._bindCategoryAxis.apply(this, arguments);
                if (axis.name === NAVIGATOR_AXIS) {
                    while (axisIx < axesLength) {
                        currentAxis = categoryAxes[axisIx++];
                        if (currentAxis.pane == NAVIGATOR_PANE) {
                            currentAxis.categories = axis.categories;
                        }
                    }
                }
            },
            _trackSharedTooltip: function (coords) {
                var chart = this, plotArea = chart._plotArea, pane = plotArea.paneByPoint(coords);
                if (pane && pane.options.name === NAVIGATOR_PANE) {
                    chart._unsetActivePoint();
                } else {
                    Chart.fn._trackSharedTooltip.call(chart, coords);
                }
            },
            destroy: function () {
                var chart = this;
                chart._navigator.destroy();
                Chart.fn.destroy.call(chart);
            }
        });
        var Navigator = Observable.extend({
            init: function (chart) {
                var navi = this;
                navi.chart = chart;
                navi.options = deepExtend({}, navi.options, chart.options.navigator);
                navi._initDataSource();
                if (!defined(navi.options.hint.visible)) {
                    navi.options.hint.visible = navi.options.visible;
                }
                chart.bind(DRAG, proxy(navi._drag, navi));
                chart.bind(DRAG_END, proxy(navi._dragEnd, navi));
                chart.bind(ZOOM, proxy(navi._zoom, navi));
                chart.bind(ZOOM_END, proxy(navi._zoomEnd, navi));
            },
            options: {},
            _initDataSource: function () {
                var navi = this, options = navi.options, autoBind = options.autoBind, dsOptions = options.dataSource;
                if (!defined(autoBind)) {
                    autoBind = navi.chart.options.autoBind;
                }
                navi._dataChangedHandler = proxy(navi._onDataChanged, navi);
                if (dsOptions) {
                    navi.dataSource = kendo.data.DataSource.create(dsOptions).bind(CHANGE, navi._dataChangedHandler);
                    if (autoBind) {
                        navi.dataSource.fetch();
                    }
                }
            },
            _onDataChanged: function () {
                var navi = this, chart = navi.chart, series = chart.options.series, seriesIx, seriesLength = series.length, categoryAxes = chart.options.categoryAxis, axisIx, axesLength = categoryAxes.length, data = navi.dataSource.view(), currentSeries, currentAxis, naviCategories;
                for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                    currentSeries = series[seriesIx];
                    if (currentSeries.axis == NAVIGATOR_AXIS && chart._isBindable(currentSeries)) {
                        currentSeries.data = data;
                    }
                }
                for (axisIx = 0; axisIx < axesLength; axisIx++) {
                    currentAxis = categoryAxes[axisIx];
                    if (currentAxis.pane == NAVIGATOR_PANE) {
                        if (currentAxis.name == NAVIGATOR_AXIS) {
                            chart._bindCategoryAxis(currentAxis, data, axisIx);
                            naviCategories = currentAxis.categories;
                        } else {
                            currentAxis.categories = naviCategories;
                        }
                    }
                }
                if (chart._model) {
                    navi.redraw();
                    navi.filterAxes();
                    if (!chart.options.dataSource || chart.options.dataSource && chart._dataBound) {
                        navi.redrawSlaves();
                    }
                }
            },
            destroy: function () {
                var navi = this, dataSource = navi.dataSource;
                if (dataSource) {
                    dataSource.unbind(CHANGE, navi._dataChangeHandler);
                }
                if (navi.selection) {
                    navi.selection.destroy();
                }
            },
            redraw: function () {
                this._redrawSelf();
                this._initSelection();
            },
            _initSelection: function () {
                var navi = this, chart = navi.chart, options = navi.options, axis = navi.mainAxis(), axisClone = clone(axis), range = axis.range(), min = range.min, max = range.max, groups = axis.options.categories, select = navi.options.select, selection = navi.selection, from = toDate(select.from), to = toDate(select.to);
                if (groups.length === 0) {
                    return;
                }
                if (selection) {
                    selection.destroy();
                    selection.wrapper.remove();
                }
                axisClone.box = axis.box;
                selection = navi.selection = new Selection(chart, axisClone, {
                    min: min,
                    max: max,
                    from: from,
                    to: to,
                    selectStart: $.proxy(navi._selectStart, navi),
                    select: $.proxy(navi._select, navi),
                    selectEnd: $.proxy(navi._selectEnd, navi),
                    mousewheel: { zoom: 'left' }
                });
                if (options.hint.visible) {
                    navi.hint = new NavigatorHint(chart.element, {
                        min: min,
                        max: max,
                        template: options.hint.template,
                        format: options.hint.format
                    });
                }
            },
            _setRange: function () {
                var plotArea = this.chart._createPlotArea(true);
                var axis = plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
                var axisOpt = axis.options;
                var range = axis.range();
                var min = range.min;
                var max = addDuration(range.max, axisOpt.baseUnitStep, axisOpt.baseUnit);
                var select = this.options.select || {};
                var from = toDate(select.from) || min;
                if (from < min) {
                    from = min;
                }
                var to = toDate(select.to) || max;
                if (to > max) {
                    to = max;
                }
                this.options.select = {
                    from: from,
                    to: to
                };
                this.filterAxes();
            },
            _redrawSelf: function (silent) {
                var plotArea = this.chart._plotArea;
                if (plotArea) {
                    plotArea.redraw(last(plotArea.panes), silent);
                }
            },
            redrawSlaves: function () {
                var navi = this, chart = navi.chart, plotArea = chart._plotArea, slavePanes = plotArea.panes.slice(0, -1);
                plotArea.srcSeries = chart.options.series;
                plotArea.redraw(slavePanes);
            },
            _drag: function (e) {
                var navi = this, chart = navi.chart, coords = chart._eventCoordinates(e.originalEvent), navigatorAxis = navi.mainAxis(), naviRange = navigatorAxis.datesRange(), inNavigator = navigatorAxis.pane.box.containsPoint(coords), axis = chart._plotArea.categoryAxis, range = e.axisRanges[axis.options.name], select = navi.options.select, selection = navi.selection, duration, from, to;
                if (!range || inNavigator || !selection) {
                    return;
                }
                if (select.from && select.to) {
                    duration = toTime(select.to) - toTime(select.from);
                } else {
                    duration = toTime(selection.options.to) - toTime(selection.options.from);
                }
                from = toDate(limitValue(toTime(range.min), naviRange.min, toTime(naviRange.max) - duration));
                to = toDate(limitValue(toTime(from) + duration, toTime(naviRange.min) + duration, naviRange.max));
                navi.options.select = {
                    from: from,
                    to: to
                };
                if (navi._liveDrag()) {
                    navi.filterAxes();
                    navi.redrawSlaves();
                }
                selection.set(from, to);
                navi.showHint(from, to);
            },
            _dragEnd: function () {
                var navi = this;
                navi.filterAxes();
                navi.filterDataSource();
                navi.redrawSlaves();
                if (navi.hint) {
                    navi.hint.hide();
                }
            },
            _liveDrag: function () {
                var support = kendo.support, isTouch = support.touch, browser = support.browser, isFirefox = browser.mozilla, isOldIE = browser.msie && browser.version < 9;
                return !isTouch && !isFirefox && !isOldIE;
            },
            readSelection: function () {
                var navi = this, selection = navi.selection, src = selection.options, dst = navi.options.select;
                dst.from = src.from;
                dst.to = src.to;
            },
            filterAxes: function () {
                var navi = this, select = navi.options.select || {}, chart = navi.chart, allAxes = chart.options.categoryAxis, from = select.from, to = select.to, i, axis;
                for (i = 0; i < allAxes.length; i++) {
                    axis = allAxes[i];
                    if (axis.pane !== NAVIGATOR_PANE) {
                        axis.min = toDate(from);
                        axis.max = toDate(to);
                    }
                }
            },
            filterDataSource: function () {
                var navi = this, select = navi.options.select || {}, chart = navi.chart, chartDataSource = chart.dataSource, hasServerFiltering = chartDataSource && chartDataSource.options.serverFiltering, axisOptions;
                if (navi.dataSource && hasServerFiltering) {
                    axisOptions = new dataviz.DateCategoryAxis(deepExtend({ baseUnit: 'fit' }, chart.options.categoryAxis[0], {
                        categories: [
                            select.from,
                            select.to
                        ]
                    })).options;
                    chartDataSource.filter(Navigator.buildFilter(addDuration(axisOptions.min, -axisOptions.baseUnitStep, axisOptions.baseUnit), addDuration(axisOptions.max, axisOptions.baseUnitStep, axisOptions.baseUnit)));
                }
            },
            _zoom: function (e) {
                var navi = this, chart = navi.chart, delta = e.delta, axis = chart._plotArea.categoryAxis, select = navi.options.select, selection = navi.selection, categories = navi.mainAxis().options.categories, fromIx, toIx;
                if (!selection) {
                    return;
                }
                fromIx = lteDateIndex(selection.options.from, categories);
                toIx = lteDateIndex(selection.options.to, categories);
                e.originalEvent.preventDefault();
                if (math.abs(delta) > 1) {
                    delta *= ZOOM_ACCELERATION;
                }
                if (toIx - fromIx > 1) {
                    selection.expand(delta);
                    navi.readSelection();
                } else {
                    axis.options.min = select.from;
                    select.from = axis.scaleRange(-e.delta).min;
                }
                if (!kendo.support.touch) {
                    navi.filterAxes();
                    navi.redrawSlaves();
                }
                selection.set(select.from, select.to);
                navi.showHint(navi.options.select.from, navi.options.select.to);
            },
            _zoomEnd: function (e) {
                this._dragEnd(e);
            },
            showHint: function (from, to) {
                var navi = this, chart = navi.chart, plotArea = chart._plotArea;
                if (navi.hint) {
                    navi.hint.show(from, to, plotArea.backgroundBox());
                }
            },
            _selectStart: function (e) {
                var chart = this.chart;
                chart._selectStart.call(chart, e);
            },
            _select: function (e) {
                var navi = this, chart = navi.chart;
                navi.showHint(e.from, e.to);
                chart._select.call(chart, e);
            },
            _selectEnd: function (e) {
                var navi = this, chart = navi.chart;
                if (navi.hint) {
                    navi.hint.hide();
                }
                navi.readSelection();
                navi.filterAxes();
                navi.filterDataSource();
                navi.redrawSlaves();
                chart._selectEnd.call(chart, e);
            },
            mainAxis: function () {
                var plotArea = this.chart._plotArea;
                if (plotArea) {
                    return plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
                }
            }
        });
        Navigator.setup = function (options, themeOptions) {
            options = options || {};
            themeOptions = themeOptions || {};
            var naviOptions = deepExtend({}, themeOptions.navigator, options.navigator), panes = options.panes = [].concat(options.panes), paneOptions = deepExtend({}, naviOptions.pane, { name: NAVIGATOR_PANE });
            if (!naviOptions.visible) {
                paneOptions.visible = false;
                paneOptions.height = 0.1;
            }
            panes.push(paneOptions);
            Navigator.attachAxes(options, naviOptions);
            Navigator.attachSeries(options, naviOptions, themeOptions);
        };
        Navigator.attachAxes = function (options, naviOptions) {
            var categoryAxes, valueAxes, series = naviOptions.series || [];
            categoryAxes = options.categoryAxis = [].concat(options.categoryAxis);
            valueAxes = options.valueAxis = [].concat(options.valueAxis);
            var equallySpacedSeries = filterSeriesByType(series, EQUALLY_SPACED_SERIES);
            var justifyAxis = equallySpacedSeries.length === 0;
            var base = deepExtend({
                type: 'date',
                pane: NAVIGATOR_PANE,
                roundToBaseUnit: !justifyAxis,
                justified: justifyAxis,
                _collapse: false,
                majorTicks: { visible: true },
                tooltip: { visible: false },
                labels: { step: 1 },
                autoBind: !naviOptions.dataSource,
                autoBaseUnitSteps: {
                    minutes: [1],
                    hours: [
                        1,
                        2
                    ],
                    days: [
                        1,
                        2
                    ],
                    weeks: [],
                    months: [1],
                    years: [1]
                },
                _overlap: false
            });
            var user = naviOptions.categoryAxis;
            categoryAxes.push(deepExtend({}, base, { maxDateGroups: 200 }, user, {
                name: NAVIGATOR_AXIS,
                baseUnit: 'fit',
                baseUnitStep: 'auto',
                labels: { visible: false },
                majorTicks: { visible: false }
            }), deepExtend({}, base, user, {
                name: NAVIGATOR_AXIS + '_labels',
                maxDateGroups: 20,
                baseUnitStep: 'auto',
                plotBands: [],
                autoBaseUnitSteps: { minutes: [] }
            }), deepExtend({}, base, user, {
                name: NAVIGATOR_AXIS + '_ticks',
                maxDateGroups: 200,
                majorTicks: { width: 0.5 },
                plotBands: [],
                labels: {
                    visible: false,
                    mirror: true
                }
            }));
            valueAxes.push(deepExtend({
                name: NAVIGATOR_AXIS,
                pane: NAVIGATOR_PANE,
                majorGridLines: { visible: false },
                visible: false
            }, naviOptions.valueAxis));
        };
        Navigator.attachSeries = function (options, naviOptions, themeOptions) {
            var series = options.series = options.series || [], navigatorSeries = [].concat(naviOptions.series || []), seriesColors = themeOptions.seriesColors, defaults = naviOptions.seriesDefaults, i;
            for (i = 0; i < navigatorSeries.length; i++) {
                series.push(deepExtend({
                    color: seriesColors[i % seriesColors.length],
                    categoryField: naviOptions.dateField,
                    visibleInLegend: false,
                    tooltip: { visible: false }
                }, defaults, navigatorSeries[i], {
                    axis: NAVIGATOR_AXIS,
                    categoryAxis: NAVIGATOR_AXIS,
                    autoBind: !naviOptions.dataSource
                }));
            }
        };
        Navigator.buildFilter = function (from, to) {
            return [
                {
                    field: 'Date',
                    operator: 'gte',
                    value: toDate(from)
                },
                {
                    field: 'Date',
                    operator: 'lt',
                    value: toDate(to)
                }
            ];
        };
        var NavigatorHint = Class.extend({
            init: function (container, options) {
                var hint = this;
                hint.options = deepExtend({}, hint.options, options);
                hint.container = container;
                hint.chartPadding = {
                    top: parseInt(container.css('paddingTop'), 10),
                    left: parseInt(container.css('paddingLeft'), 10)
                };
                hint.template = hint.template;
                if (!hint.template) {
                    hint.template = hint.template = renderTemplate('<div class=\'' + CSS_PREFIX + 'navigator-hint\' ' + 'style=\'display: none; position: absolute; top: 1px; left: 1px;\'>' + '<div class=\'' + CSS_PREFIX + 'tooltip ' + CSS_PREFIX + 'chart-tooltip\'>&nbsp;</div>' + '<div class=\'' + CSS_PREFIX + 'scroll\' />' + '</div>');
                }
                hint.element = $(hint.template()).appendTo(container);
            },
            options: {
                format: '{0:d} - {1:d}',
                hideDelay: 500
            },
            show: function (from, to, bbox) {
                var hint = this, middle = toDate(toTime(from) + toTime(to - from) / 2), options = hint.options, text = kendo.format(hint.options.format, from, to), tooltip = hint.element.find('.' + CSS_PREFIX + 'tooltip'), scroll = hint.element.find('.' + CSS_PREFIX + 'scroll'), scrollWidth = bbox.width() * 0.4, minPos = bbox.center().x - scrollWidth, maxPos = bbox.center().x, posRange = maxPos - minPos, range = options.max - options.min, scale = posRange / range, offset = middle - options.min, hintTemplate;
                if (hint._hideTimeout) {
                    clearTimeout(hint._hideTimeout);
                }
                if (!hint._visible) {
                    hint.element.stop(false, true).css('visibility', 'hidden').show();
                    hint._visible = true;
                }
                if (options.template) {
                    hintTemplate = template(options.template);
                    text = hintTemplate({
                        from: from,
                        to: to
                    });
                }
                tooltip.html(text).css({
                    left: bbox.center().x - tooltip.outerWidth() / 2,
                    top: bbox.y1
                });
                scroll.css({
                    width: scrollWidth,
                    left: minPos + offset * scale,
                    top: bbox.y1 + parseInt(tooltip.css('margin-top'), 10) + parseInt(tooltip.css('border-top-width'), 10) + tooltip.height() / 2
                });
                hint.element.css('visibility', 'visible');
            },
            hide: function () {
                var hint = this;
                if (hint._hideTimeout) {
                    clearTimeout(hint._hideTimeout);
                }
                hint._hideTimeout = setTimeout(function () {
                    hint._visible = false;
                    hint.element.fadeOut('slow');
                }, hint.options.hideDelay);
            }
        });
        function ClonedObject() {
        }
        function clone(obj) {
            ClonedObject.prototype = obj;
            return new ClonedObject();
        }
        dataviz.ui.plugin(StockChart);
        deepExtend(dataviz, { Navigator: Navigator });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));