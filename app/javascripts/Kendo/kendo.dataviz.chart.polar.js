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
    define('kendo.dataviz.chart.polar', [
        'kendo.dataviz.chart',
        'kendo.drawing'
    ], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.chart.polar',
        name: 'Polar Charts',
        category: 'dataviz',
        depends: ['dataviz.chart'],
        hidden: true
    };
    (function ($, undefined) {
        var math = Math, kendo = window.kendo, deepExtend = kendo.deepExtend, util = kendo.util, append = util.append, draw = kendo.drawing, geom = kendo.geometry, dataviz = kendo.dataviz, AreaSegment = dataviz.AreaSegment, Axis = dataviz.Axis, AxisGroupRangeTracker = dataviz.AxisGroupRangeTracker, BarChart = dataviz.BarChart, Box2D = dataviz.Box2D, CategoryAxis = dataviz.CategoryAxis, CategoricalChart = dataviz.CategoricalChart, CategoricalPlotArea = dataviz.CategoricalPlotArea, ChartElement = dataviz.ChartElement, CurveProcessor = dataviz.CurveProcessor, DonutSegment = dataviz.DonutSegment, LineChart = dataviz.LineChart, LineSegment = dataviz.LineSegment, LogarithmicAxis = dataviz.LogarithmicAxis, NumericAxis = dataviz.NumericAxis, PlotAreaBase = dataviz.PlotAreaBase, PlotAreaFactory = dataviz.PlotAreaFactory, Point2D = dataviz.Point2D, Ring = dataviz.Ring, ScatterChart = dataviz.ScatterChart, ScatterLineChart = dataviz.ScatterLineChart, SeriesBinder = dataviz.SeriesBinder, ShapeBuilder = dataviz.ShapeBuilder, SplineSegment = dataviz.SplineSegment, SplineAreaSegment = dataviz.SplineAreaSegment, getSpacing = dataviz.getSpacing, filterSeriesByType = dataviz.filterSeriesByType, limitValue = util.limitValue, round = dataviz.round;
        var ARC = 'arc', BLACK = '#000', COORD_PRECISION = dataviz.COORD_PRECISION, DEFAULT_PADDING = 0.15, DEG_TO_RAD = math.PI / 180, GAP = 'gap', INTERPOLATE = 'interpolate', LOGARITHMIC = 'log', PLOT_AREA_CLICK = 'plotAreaClick', POLAR_AREA = 'polarArea', POLAR_LINE = 'polarLine', POLAR_SCATTER = 'polarScatter', RADAR_AREA = 'radarArea', RADAR_COLUMN = 'radarColumn', RADAR_LINE = 'radarLine', SMOOTH = 'smooth', X = 'x', Y = 'y', ZERO = 'zero', POLAR_CHARTS = [
                POLAR_AREA,
                POLAR_LINE,
                POLAR_SCATTER
            ], RADAR_CHARTS = [
                RADAR_AREA,
                RADAR_COLUMN,
                RADAR_LINE
            ];
        var GridLinesMixin = {
            createGridLines: function (altAxis) {
                var axis = this, options = axis.options, radius = math.abs(axis.box.center().y - altAxis.lineBox().y1), majorAngles, minorAngles, skipMajor = false, gridLines = [];
                if (options.majorGridLines.visible) {
                    majorAngles = axis.majorGridLineAngles(altAxis);
                    skipMajor = true;
                    gridLines = axis.renderMajorGridLines(majorAngles, radius, options.majorGridLines);
                }
                if (options.minorGridLines.visible) {
                    minorAngles = axis.minorGridLineAngles(altAxis, skipMajor);
                    append(gridLines, axis.renderMinorGridLines(minorAngles, radius, options.minorGridLines, altAxis, skipMajor));
                }
                return gridLines;
            },
            renderMajorGridLines: function (angles, radius, options) {
                return this.renderGridLines(angles, radius, options);
            },
            renderMinorGridLines: function (angles, radius, options, altAxis, skipMajor) {
                var radiusCallback = this.radiusCallback && this.radiusCallback(radius, altAxis, skipMajor);
                return this.renderGridLines(angles, radius, options, radiusCallback);
            },
            renderGridLines: function (angles, radius, options, radiusCallback) {
                var style = {
                    stroke: {
                        width: options.width,
                        color: options.color,
                        dashType: options.dashType
                    }
                };
                var center = this.box.center();
                var circle = new geom.Circle([
                    center.x,
                    center.y
                ], radius);
                var container = this.gridLinesVisual();
                for (var i = 0; i < angles.length; i++) {
                    var line = new draw.Path(style);
                    if (radiusCallback) {
                        circle.radius = radiusCallback(angles[i]);
                    }
                    line.moveTo(circle.center).lineTo(circle.pointAt(angles[i]));
                    container.append(line);
                }
                return container.children;
            },
            gridLineAngles: function (altAxis, size, skip, step, skipAngles) {
                var axis = this, divs = axis.intervals(size, skip, step, skipAngles), options = altAxis.options, altAxisVisible = options.visible && (options.line || {}).visible !== false;
                return $.map(divs, function (d) {
                    var alpha = axis.intervalAngle(d);
                    if (!altAxisVisible || alpha !== 90) {
                        return alpha;
                    }
                });
            }
        };
        var RadarCategoryAxis = CategoryAxis.extend({
            options: {
                startAngle: 90,
                labels: { margin: getSpacing(10) },
                majorGridLines: { visible: true },
                justified: true
            },
            range: function () {
                return {
                    min: 0,
                    max: this.options.categories.length
                };
            },
            reflow: function (box) {
                this.box = box;
                this.reflowLabels();
            },
            lineBox: function () {
                return this.box;
            },
            reflowLabels: function () {
                var axis = this, labelOptions = axis.options.labels, skip = labelOptions.skip || 0, step = labelOptions.step || 1, measureBox = new Box2D(), labels = axis.labels, labelBox, i;
                for (i = 0; i < labels.length; i++) {
                    labels[i].reflow(measureBox);
                    labelBox = labels[i].box;
                    labels[i].reflow(axis.getSlot(skip + i * step).adjacentBox(0, labelBox.width(), labelBox.height()));
                }
            },
            intervals: function (size, skip, step, skipAngles) {
                var axis = this, options = axis.options, categories = options.categories.length, angle = 0, divCount = categories / size || 1, divAngle = 360 / divCount, divs = [], i;
                skip = skip || 0;
                step = step || 1;
                for (i = skip; i < divCount; i += step) {
                    if (options.reverse) {
                        angle = 360 - i * divAngle;
                    } else {
                        angle = i * divAngle;
                    }
                    angle = round(angle, COORD_PRECISION) % 360;
                    if (!(skipAngles && dataviz.inArray(angle, skipAngles))) {
                        divs.push(angle);
                    }
                }
                return divs;
            },
            majorIntervals: function () {
                return this.intervals(1);
            },
            minorIntervals: function () {
                return this.intervals(0.5);
            },
            intervalAngle: function (interval) {
                return (360 + interval + this.options.startAngle) % 360;
            },
            majorAngles: function () {
                return $.map(this.majorIntervals(), $.proxy(this.intervalAngle, this));
            },
            createLine: function () {
                return [];
            },
            majorGridLineAngles: function (altAxis) {
                var majorGridLines = this.options.majorGridLines;
                return this.gridLineAngles(altAxis, 1, majorGridLines.skip, majorGridLines.step);
            },
            minorGridLineAngles: function (altAxis, skipMajor) {
                var options = this.options;
                var minorGridLines = options.minorGridLines;
                var majorGridLines = options.majorGridLines;
                var majorGridLineAngles = skipMajor ? this.intervals(1, majorGridLines.skip, majorGridLines.step) : null;
                return this.gridLineAngles(altAxis, 0.5, minorGridLines.skip, minorGridLines.step, majorGridLineAngles);
            },
            radiusCallback: function (radius, altAxis, skipMajor) {
                if (altAxis.options.type !== ARC) {
                    var minorAngle = 360 / (this.options.categories.length * 2);
                    var minorRadius = math.cos(minorAngle * DEG_TO_RAD) * radius;
                    var majorAngles = this.majorAngles();
                    var radiusCallback = function (angle) {
                        if (!skipMajor && dataviz.inArray(angle, majorAngles)) {
                            return radius;
                        } else {
                            return minorRadius;
                        }
                    };
                    return radiusCallback;
                }
            },
            createPlotBands: function () {
                var axis = this, options = axis.options, plotBands = options.plotBands || [], i, band, slot, singleSlot, head, tail;
                var group = this._plotbandGroup = new draw.Group({ zIndex: -1 });
                for (i = 0; i < plotBands.length; i++) {
                    band = plotBands[i];
                    slot = axis.plotBandSlot(band);
                    singleSlot = axis.getSlot(band.from);
                    head = band.from - math.floor(band.from);
                    slot.startAngle += head * singleSlot.angle;
                    tail = math.ceil(band.to) - band.to;
                    slot.angle -= (tail + head) * singleSlot.angle;
                    var ring = ShapeBuilder.current.createRing(slot, {
                        fill: {
                            color: band.color,
                            opacity: band.opacity
                        },
                        stroke: { opacity: band.opacity }
                    });
                    group.append(ring);
                }
                axis.appendVisual(group);
            },
            plotBandSlot: function (band) {
                return this.getSlot(band.from, band.to - 1);
            },
            getSlot: function (from, to) {
                var axis = this, options = axis.options, justified = options.justified, box = axis.box, divs = axis.majorAngles(), totalDivs = divs.length, slots, slotAngle = 360 / totalDivs, slotStart, angle;
                if (options.reverse && !justified) {
                    from = (from + 1) % totalDivs;
                }
                from = limitValue(math.floor(from), 0, totalDivs - 1);
                slotStart = divs[from];
                if (justified) {
                    slotStart = slotStart - slotAngle / 2;
                    if (slotStart < 0) {
                        slotStart += 360;
                    }
                }
                to = limitValue(math.ceil(to || from), from, totalDivs - 1);
                slots = to - from + 1;
                angle = slotAngle * slots;
                return new Ring(box.center(), 0, box.height() / 2, slotStart, angle);
            },
            slot: function (from, to) {
                var slot = this.getSlot(from, to);
                var startAngle = slot.startAngle + 180;
                var endAngle = startAngle + slot.angle;
                return new geom.Arc([
                    slot.c.x,
                    slot.c.y
                ], {
                    startAngle: startAngle,
                    endAngle: endAngle,
                    radiusX: slot.r,
                    radiusY: slot.r
                });
            },
            pointCategoryIndex: function (point) {
                var axis = this, index = null, i, length = axis.options.categories.length, slot;
                for (i = 0; i < length; i++) {
                    slot = axis.getSlot(i);
                    if (slot.containsPoint(point)) {
                        index = i;
                        break;
                    }
                }
                return index;
            }
        });
        deepExtend(RadarCategoryAxis.fn, GridLinesMixin);
        var RadarNumericAxisMixin = {
            options: { majorGridLines: { visible: true } },
            createPlotBands: function () {
                var axis = this, options = axis.options, plotBands = options.plotBands || [], type = options.majorGridLines.type, altAxis = axis.plotArea.polarAxis, majorAngles = altAxis.majorAngles(), center = altAxis.box.center(), i, band, bandStyle, slot, ring;
                var group = this._plotbandGroup = new draw.Group({ zIndex: -1 });
                for (i = 0; i < plotBands.length; i++) {
                    band = plotBands[i];
                    bandStyle = {
                        fill: {
                            color: band.color,
                            opacity: band.opacity
                        },
                        stroke: { opacity: band.opacity }
                    };
                    slot = axis.getSlot(band.from, band.to, true);
                    ring = new Ring(center, center.y - slot.y2, center.y - slot.y1, 0, 360);
                    var shape;
                    if (type === ARC) {
                        shape = ShapeBuilder.current.createRing(ring, bandStyle);
                    } else {
                        shape = draw.Path.fromPoints(axis.plotBandPoints(ring, majorAngles), bandStyle).close();
                    }
                    group.append(shape);
                }
                axis.appendVisual(group);
            },
            plotBandPoints: function (ring, angles) {
                var innerPoints = [], outerPoints = [];
                var center = [
                    ring.c.x,
                    ring.c.y
                ];
                var innerCircle = new geom.Circle(center, ring.ir);
                var outerCircle = new geom.Circle(center, ring.r);
                for (var i = 0; i < angles.length; i++) {
                    innerPoints.push(innerCircle.pointAt(angles[i]));
                    outerPoints.push(outerCircle.pointAt(angles[i]));
                }
                innerPoints.reverse();
                innerPoints.push(innerPoints[0]);
                outerPoints.push(outerPoints[0]);
                return outerPoints.concat(innerPoints);
            },
            createGridLines: function (altAxis) {
                var axis = this, options = axis.options, majorTicks = axis.radarMajorGridLinePositions(), majorAngles = altAxis.majorAngles(), minorTicks, center = altAxis.box.center(), gridLines = [];
                if (options.majorGridLines.visible) {
                    gridLines = axis.renderGridLines(center, majorTicks, majorAngles, options.majorGridLines);
                }
                if (options.minorGridLines.visible) {
                    minorTicks = axis.radarMinorGridLinePositions();
                    append(gridLines, axis.renderGridLines(center, minorTicks, majorAngles, options.minorGridLines));
                }
                return gridLines;
            },
            renderGridLines: function (center, ticks, angles, options) {
                var tickRadius, tickIx, angleIx;
                var style = {
                    stroke: {
                        width: options.width,
                        color: options.color,
                        dashType: options.dashType
                    }
                };
                var container = this.gridLinesVisual();
                for (tickIx = 0; tickIx < ticks.length; tickIx++) {
                    tickRadius = center.y - ticks[tickIx];
                    if (tickRadius > 0) {
                        var circle = new geom.Circle([
                            center.x,
                            center.y
                        ], tickRadius);
                        if (options.type === ARC) {
                            container.append(new draw.Circle(circle, style));
                        } else {
                            var line = new draw.Path(style);
                            for (angleIx = 0; angleIx < angles.length; angleIx++) {
                                line.lineTo(circle.pointAt(angles[angleIx]));
                            }
                            line.close();
                            container.append(line);
                        }
                    }
                }
                return container.children;
            },
            getValue: function (point) {
                var axis = this, options = axis.options, lineBox = axis.lineBox(), altAxis = axis.plotArea.polarAxis, majorAngles = altAxis.majorAngles(), center = altAxis.box.center(), r = point.distanceTo(center), distance = r;
                if (options.majorGridLines.type !== ARC && majorAngles.length > 1) {
                    var dx = point.x - center.x, dy = point.y - center.y, theta = (math.atan2(dy, dx) / DEG_TO_RAD + 540) % 360;
                    majorAngles.sort(function (a, b) {
                        return angularDistance(a, theta) - angularDistance(b, theta);
                    });
                    var midAngle = angularDistance(majorAngles[0], majorAngles[1]) / 2, alpha = angularDistance(theta, majorAngles[0]), gamma = 90 - midAngle, beta = 180 - alpha - gamma;
                    distance = r * (math.sin(beta * DEG_TO_RAD) / math.sin(gamma * DEG_TO_RAD));
                }
                return axis.axisType().fn.getValue.call(axis, new Point2D(lineBox.x1, lineBox.y2 - distance));
            }
        };
        var RadarNumericAxis = NumericAxis.extend({
            radarMajorGridLinePositions: function () {
                return this.getTickPositions(this.options.majorUnit);
            },
            radarMinorGridLinePositions: function () {
                var axis = this, options = axis.options, minorSkipStep = 0;
                if (options.majorGridLines.visible) {
                    minorSkipStep = options.majorUnit;
                }
                return axis.getTickPositions(options.minorUnit, minorSkipStep);
            },
            axisType: function () {
                return NumericAxis;
            }
        });
        deepExtend(RadarNumericAxis.fn, RadarNumericAxisMixin);
        var RadarLogarithmicAxis = LogarithmicAxis.extend({
            radarMajorGridLinePositions: function () {
                var axis = this, positions = [];
                axis.traverseMajorTicksPositions(function (position) {
                    positions.push(position);
                }, axis.options.majorGridLines);
                return positions;
            },
            radarMinorGridLinePositions: function () {
                var axis = this, positions = [];
                axis.traverseMinorTicksPositions(function (position) {
                    positions.push(position);
                }, axis.options.minorGridLines);
                return positions;
            },
            axisType: function () {
                return LogarithmicAxis;
            }
        });
        deepExtend(RadarLogarithmicAxis.fn, RadarNumericAxisMixin);
        var PolarAxis = Axis.extend({
            init: function (options) {
                var axis = this;
                Axis.fn.init.call(axis, options);
                options = axis.options;
                options.minorUnit = options.minorUnit || axis.options.majorUnit / 2;
            },
            options: {
                type: 'polar',
                startAngle: 0,
                reverse: false,
                majorUnit: 60,
                min: 0,
                max: 360,
                labels: { margin: getSpacing(10) },
                majorGridLines: {
                    color: BLACK,
                    visible: true,
                    width: 1
                },
                minorGridLines: { color: '#aaa' }
            },
            getDivisions: function (stepValue) {
                return NumericAxis.fn.getDivisions.call(this, stepValue) - 1;
            },
            reflow: function (box) {
                this.box = box;
                this.reflowLabels();
            },
            reflowLabels: function () {
                var axis = this, options = axis.options, labelOptions = options.labels, skip = labelOptions.skip || 0, step = labelOptions.step || 1, measureBox = new Box2D(), divs = axis.intervals(options.majorUnit, skip, step), labels = axis.labels, labelBox, i;
                for (i = 0; i < labels.length; i++) {
                    labels[i].reflow(measureBox);
                    labelBox = labels[i].box;
                    labels[i].reflow(axis.getSlot(divs[i]).adjacentBox(0, labelBox.width(), labelBox.height()));
                }
            },
            lineBox: function () {
                return this.box;
            },
            intervals: function (size, skip, step, skipAngles) {
                var axis = this, options = axis.options, divisions = axis.getDivisions(size), min = options.min, current, divs = [], i;
                skip = skip || 0;
                step = step || 1;
                for (i = skip; i < divisions; i += step) {
                    current = (360 + min + i * size) % 360;
                    if (!(skipAngles && dataviz.inArray(current, skipAngles))) {
                        divs.push(current);
                    }
                }
                return divs;
            },
            majorIntervals: function () {
                return this.intervals(this.options.majorUnit);
            },
            minorIntervals: function () {
                return this.intervals(this.options.minorUnit);
            },
            intervalAngle: function (i) {
                return (540 - i - this.options.startAngle) % 360;
            },
            majorAngles: RadarCategoryAxis.fn.majorAngles,
            createLine: function () {
                return [];
            },
            majorGridLineAngles: function (altAxis) {
                var majorGridLines = this.options.majorGridLines;
                return this.gridLineAngles(altAxis, this.options.majorUnit, majorGridLines.skip, majorGridLines.step);
            },
            minorGridLineAngles: function (altAxis, skipMajor) {
                var options = this.options;
                var minorGridLines = options.minorGridLines;
                var majorGridLines = options.majorGridLines;
                var majorGridLineAngles = skipMajor ? this.intervals(options.majorUnit, majorGridLines.skip, majorGridLines.step) : null;
                return this.gridLineAngles(altAxis, this.options.minorUnit, minorGridLines.skip, minorGridLines.step, majorGridLineAngles);
            },
            createPlotBands: RadarCategoryAxis.fn.createPlotBands,
            plotBandSlot: function (band) {
                return this.getSlot(band.from, band.to);
            },
            getSlot: function (a, b) {
                var axis = this, options = axis.options, start = options.startAngle, box = axis.box, tmp;
                a = limitValue(a, options.min, options.max);
                b = limitValue(b || a, a, options.max);
                if (options.reverse) {
                    a *= -1;
                    b *= -1;
                }
                a = (540 - a - start) % 360;
                b = (540 - b - start) % 360;
                if (b < a) {
                    tmp = a;
                    a = b;
                    b = tmp;
                }
                return new Ring(box.center(), 0, box.height() / 2, a, b - a);
            },
            slot: function (from, to) {
                var options = this.options;
                var start = 360 - options.startAngle;
                var slot = this.getSlot(from, to);
                var startAngle;
                var endAngle;
                var min;
                var max;
                if (!dataviz.util.defined(to)) {
                    to = from;
                }
                min = math.min(from, to);
                max = math.max(from, to);
                if (options.reverse) {
                    startAngle = min;
                    endAngle = max;
                } else {
                    startAngle = 360 - max;
                    endAngle = 360 - min;
                }
                startAngle = (startAngle + start) % 360;
                endAngle = (endAngle + start) % 360;
                return new geom.Arc([
                    slot.c.x,
                    slot.c.y
                ], {
                    startAngle: startAngle,
                    endAngle: endAngle,
                    radiusX: slot.r,
                    radiusY: slot.r
                });
            },
            getValue: function (point) {
                var axis = this, options = axis.options, center = axis.box.center(), dx = point.x - center.x, dy = point.y - center.y, theta = math.round(math.atan2(dy, dx) / DEG_TO_RAD), start = options.startAngle;
                if (!options.reverse) {
                    theta *= -1;
                    start *= -1;
                }
                return (theta + start + 360) % 360;
            },
            range: NumericAxis.fn.range,
            labelsCount: NumericAxis.fn.labelsCount,
            createAxisLabel: NumericAxis.fn.createAxisLabel
        });
        deepExtend(PolarAxis.fn, GridLinesMixin);
        var RadarClusterLayout = ChartElement.extend({
            options: {
                gap: 1,
                spacing: 0
            },
            reflow: function (sector) {
                var cluster = this, options = cluster.options, children = cluster.children, gap = options.gap, spacing = options.spacing, count = children.length, slots = count + gap + spacing * (count - 1), slotAngle = sector.angle / slots, slotSector, angle = sector.startAngle + slotAngle * (gap / 2), i;
                for (i = 0; i < count; i++) {
                    slotSector = sector.clone();
                    slotSector.startAngle = angle;
                    slotSector.angle = slotAngle;
                    if (children[i].sector) {
                        slotSector.r = children[i].sector.r;
                    }
                    children[i].reflow(slotSector);
                    children[i].sector = slotSector;
                    angle += slotAngle + slotAngle * spacing;
                }
            }
        });
        var RadarStackLayout = ChartElement.extend({
            reflow: function (sector) {
                var stack = this, reverse = stack.options.isReversed, children = stack.children, childrenCount = children.length, childSector, i, first = reverse ? childrenCount - 1 : 0, step = reverse ? -1 : 1;
                stack.box = new Box2D();
                for (i = first; i >= 0 && i < childrenCount; i += step) {
                    childSector = children[i].sector;
                    childSector.startAngle = sector.startAngle;
                    childSector.angle = sector.angle;
                }
            }
        });
        var RadarSegment = DonutSegment.extend({
            init: function (value, options) {
                DonutSegment.fn.init.call(this, value, null, options);
            },
            options: {
                overlay: { gradient: null },
                labels: { distance: 10 }
            }
        });
        var RadarBarChart = BarChart.extend({
            pointType: function () {
                return RadarSegment;
            },
            clusterType: function () {
                return RadarClusterLayout;
            },
            stackType: function () {
                return RadarStackLayout;
            },
            categorySlot: function (categoryAxis, categoryIx) {
                return categoryAxis.getSlot(categoryIx);
            },
            pointSlot: function (categorySlot, valueSlot) {
                var slot = categorySlot.clone(), y = categorySlot.c.y;
                slot.r = y - valueSlot.y1;
                slot.ir = y - valueSlot.y2;
                return slot;
            },
            reflow: CategoricalChart.fn.reflow,
            reflowPoint: function (point, pointSlot) {
                point.sector = pointSlot;
                point.reflow();
            },
            options: {
                clip: false,
                animation: { type: 'pie' }
            },
            createAnimation: function () {
                this.options.animation.center = this.box.toRect().center();
                BarChart.fn.createAnimation.call(this);
            }
        });
        var RadarLineChart = LineChart.extend({
            options: { clip: false },
            pointSlot: function (categorySlot, valueSlot) {
                var valueRadius = categorySlot.c.y - valueSlot.y1, slot = Point2D.onCircle(categorySlot.c, categorySlot.middle(), valueRadius);
                return new Box2D(slot.x, slot.y, slot.x, slot.y);
            },
            createSegment: function (linePoints, currentSeries, seriesIx) {
                var segment, pointType, style = currentSeries.style;
                if (style == SMOOTH) {
                    pointType = SplineSegment;
                } else {
                    pointType = LineSegment;
                }
                segment = new pointType(linePoints, currentSeries, seriesIx);
                if (linePoints.length === currentSeries.data.length) {
                    segment.options.closed = true;
                }
                return segment;
            }
        });
        var RadarAreaSegment = AreaSegment.extend({
            points: function () {
                return LineSegment.fn.points.call(this, this.stackPoints);
            }
        });
        var SplineRadarAreaSegment = SplineAreaSegment.extend({ closeFill: $.noop });
        var RadarAreaChart = RadarLineChart.extend({
            createSegment: function (linePoints, currentSeries, seriesIx, prevSegment) {
                var chart = this, options = chart.options, isStacked = options.isStacked, stackPoints, segment, style = (currentSeries.line || {}).style;
                if (style === SMOOTH) {
                    segment = new SplineRadarAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx);
                    segment.options.closed = true;
                } else {
                    if (isStacked && seriesIx > 0 && prevSegment) {
                        stackPoints = prevSegment.linePoints.slice(0).reverse();
                    }
                    linePoints.push(linePoints[0]);
                    segment = new RadarAreaSegment(linePoints, stackPoints, currentSeries, seriesIx);
                }
                return segment;
            },
            seriesMissingValues: function (series) {
                return series.missingValues || ZERO;
            }
        });
        var PolarScatterChart = ScatterChart.extend({
            pointSlot: function (slotX, slotY) {
                var valueRadius = slotX.c.y - slotY.y1, slot = Point2D.onCircle(slotX.c, slotX.startAngle, valueRadius);
                return new Box2D(slot.x, slot.y, slot.x, slot.y);
            },
            options: { clip: false }
        });
        var PolarLineChart = ScatterLineChart.extend({
            pointSlot: PolarScatterChart.fn.pointSlot,
            options: { clip: false }
        });
        var PolarAreaSegment = AreaSegment.extend({
            points: function () {
                var segment = this, chart = segment.parent, plotArea = chart.plotArea, polarAxis = plotArea.polarAxis, center = polarAxis.box.center(), stackPoints = segment.stackPoints, points = LineSegment.fn.points.call(segment, stackPoints);
                points.unshift([
                    center.x,
                    center.y
                ]);
                points.push([
                    center.x,
                    center.y
                ]);
                return points;
            }
        });
        var SplinePolarAreaSegment = SplineAreaSegment.extend({
            closeFill: function (fillPath) {
                var center = this._polarAxisCenter();
                fillPath.lineTo(center.x, center.y);
            },
            _polarAxisCenter: function () {
                var chart = this.parent, plotArea = chart.plotArea, polarAxis = plotArea.polarAxis, center = polarAxis.box.center();
                return center;
            },
            strokeSegments: function () {
                var segments = this._strokeSegments;
                if (!segments) {
                    var center = this._polarAxisCenter(), curveProcessor = new CurveProcessor(false), linePoints = LineSegment.fn.points.call(this);
                    linePoints.push(center);
                    segments = this._strokeSegments = curveProcessor.process(linePoints);
                    segments.pop();
                }
                return segments;
            }
        });
        var PolarAreaChart = PolarLineChart.extend({
            createSegment: function (linePoints, currentSeries, seriesIx) {
                var segment, style = (currentSeries.line || {}).style;
                if (style == SMOOTH) {
                    segment = new SplinePolarAreaSegment(linePoints, null, false, currentSeries, seriesIx);
                } else {
                    segment = new PolarAreaSegment(linePoints, [], currentSeries, seriesIx);
                }
                return segment;
            },
            createMissingValue: function (value, missingValues) {
                var missingValue;
                if (dataviz.hasValue(value.x) && missingValues != INTERPOLATE) {
                    missingValue = {
                        x: value.x,
                        y: value.y
                    };
                    if (missingValues == ZERO) {
                        missingValue.y = 0;
                    }
                }
                return missingValue;
            },
            seriesMissingValues: function (series) {
                return series.missingValues || ZERO;
            },
            _hasMissingValuesGap: function () {
                var series = this.options.series;
                for (var idx = 0; idx < series.length; idx++) {
                    if (this.seriesMissingValues(series[idx]) === GAP) {
                        return true;
                    }
                }
            },
            sortPoints: function (points) {
                var value, point;
                points.sort(xComparer);
                if (this._hasMissingValuesGap()) {
                    for (var idx = 0; idx < points.length; idx++) {
                        point = points[idx];
                        if (point) {
                            value = point.value;
                            if (!dataviz.hasValue(value.y) && this.seriesMissingValues(point.series) === GAP) {
                                delete points[idx];
                            }
                        }
                    }
                }
                return points;
            }
        });
        var PolarPlotAreaBase = PlotAreaBase.extend({
            init: function (series, options) {
                var plotArea = this;
                plotArea.valueAxisRangeTracker = new AxisGroupRangeTracker();
                PlotAreaBase.fn.init.call(plotArea, series, options);
            },
            render: function () {
                var plotArea = this;
                plotArea.addToLegend(plotArea.series);
                plotArea.createPolarAxis();
                plotArea.createCharts();
                plotArea.createValueAxis();
            },
            alignAxes: function () {
                var axis = this.valueAxis;
                var range = axis.range();
                var crossingValue = axis.options.reverse ? range.max : range.min;
                var slot = axis.getSlot(crossingValue);
                var center = this.polarAxis.getSlot(0).c;
                var axisBox = axis.box.translate(center.x - slot.x1, center.y - slot.y1);
                axis.reflow(axisBox);
            },
            createValueAxis: function () {
                var plotArea = this, tracker = plotArea.valueAxisRangeTracker, defaultRange = tracker.query(), range, valueAxis, axisOptions = plotArea.valueAxisOptions({
                        roundToMajorUnit: false,
                        zIndex: -1
                    }), axisType, axisDefaultRange;
                if (axisOptions.type === LOGARITHMIC) {
                    axisType = RadarLogarithmicAxis;
                    axisDefaultRange = {
                        min: 0.1,
                        max: 1
                    };
                } else {
                    axisType = RadarNumericAxis;
                    axisDefaultRange = {
                        min: 0,
                        max: 1
                    };
                }
                range = tracker.query(name) || defaultRange || axisDefaultRange;
                if (range && defaultRange) {
                    range.min = math.min(range.min, defaultRange.min);
                    range.max = math.max(range.max, defaultRange.max);
                }
                valueAxis = new axisType(range.min, range.max, axisOptions);
                plotArea.valueAxis = valueAxis;
                plotArea.appendAxis(valueAxis);
            },
            reflowAxes: function () {
                var plotArea = this, options = plotArea.options.plotArea, valueAxis = plotArea.valueAxis, polarAxis = plotArea.polarAxis, box = plotArea.box, defaultPadding = math.min(box.width(), box.height()) * DEFAULT_PADDING, padding = getSpacing(options.padding || {}, defaultPadding), axisBox = box.clone().unpad(padding), valueAxisBox = axisBox.clone().shrink(0, axisBox.height() / 2);
                polarAxis.reflow(axisBox);
                valueAxis.reflow(valueAxisBox);
                var heightDiff = valueAxis.lineBox().height() - valueAxis.box.height();
                valueAxis.reflow(valueAxis.box.unpad({ top: heightDiff }));
                plotArea.axisBox = axisBox;
                plotArea.alignAxes(axisBox);
            },
            backgroundBox: function () {
                return this.box;
            }
        });
        var RadarPlotArea = PolarPlotAreaBase.extend({
            options: {
                categoryAxis: { categories: [] },
                valueAxis: {}
            },
            createPolarAxis: function () {
                var plotArea = this, categoryAxis;
                categoryAxis = new RadarCategoryAxis(plotArea.options.categoryAxis);
                plotArea.polarAxis = categoryAxis;
                plotArea.categoryAxis = categoryAxis;
                plotArea.appendAxis(categoryAxis);
                plotArea.aggregateCategories();
            },
            valueAxisOptions: function (defaults) {
                var plotArea = this;
                if (plotArea._hasBarCharts) {
                    deepExtend(defaults, {
                        majorGridLines: { type: ARC },
                        minorGridLines: { type: ARC }
                    });
                }
                if (plotArea._isStacked100) {
                    deepExtend(defaults, {
                        roundToMajorUnit: false,
                        labels: { format: 'P0' }
                    });
                }
                return deepExtend(defaults, plotArea.options.valueAxis);
            },
            appendChart: CategoricalPlotArea.fn.appendChart,
            aggregateSeries: CategoricalPlotArea.fn.aggregateSeries,
            aggregateCategories: function () {
                CategoricalPlotArea.fn.aggregateCategories.call(this, this.panes);
            },
            filterSeries: function (currentSeries) {
                return currentSeries;
            },
            createCharts: function () {
                var plotArea = this, series = plotArea.filterVisibleSeries(plotArea.series), pane = plotArea.panes[0];
                plotArea.createAreaChart(filterSeriesByType(series, [RADAR_AREA]), pane);
                plotArea.createLineChart(filterSeriesByType(series, [RADAR_LINE]), pane);
                plotArea.createBarChart(filterSeriesByType(series, [RADAR_COLUMN]), pane);
            },
            chartOptions: function (series) {
                var options = { series: series };
                var firstSeries = series[0];
                if (firstSeries) {
                    var filteredSeries = this.filterVisibleSeries(series);
                    var stack = firstSeries.stack;
                    options.isStacked = stack && filteredSeries.length > 1;
                    options.isStacked100 = stack && stack.type === '100%' && filteredSeries.length > 1;
                    if (options.isStacked100) {
                        this._isStacked100 = true;
                    }
                }
                return options;
            },
            createAreaChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var areaChart = new RadarAreaChart(this, this.chartOptions(series));
                this.appendChart(areaChart, pane);
            },
            createLineChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var lineChart = new RadarLineChart(this, this.chartOptions(series));
                this.appendChart(lineChart, pane);
            },
            createBarChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var firstSeries = series[0];
                var options = this.chartOptions(series);
                options.gap = firstSeries.gap;
                options.spacing = firstSeries.spacing;
                var barChart = new RadarBarChart(this, options);
                this.appendChart(barChart, pane);
                this._hasBarCharts = true;
            },
            seriesCategoryAxis: function () {
                return this.categoryAxis;
            },
            click: function (chart, e) {
                var plotArea = this, coords = chart._eventCoordinates(e), point = new Point2D(coords.x, coords.y), category, value;
                category = plotArea.categoryAxis.getCategory(point);
                value = plotArea.valueAxis.getValue(point);
                if (category !== null && value !== null) {
                    chart.trigger(PLOT_AREA_CLICK, {
                        element: $(e.target),
                        category: category,
                        value: value
                    });
                }
            },
            createCrosshairs: $.noop
        });
        var PolarPlotArea = PolarPlotAreaBase.extend({
            options: {
                xAxis: {},
                yAxis: {}
            },
            createPolarAxis: function () {
                var plotArea = this, polarAxis;
                polarAxis = new PolarAxis(plotArea.options.xAxis);
                plotArea.polarAxis = polarAxis;
                plotArea.axisX = polarAxis;
                plotArea.appendAxis(polarAxis);
            },
            valueAxisOptions: function (defaults) {
                var plotArea = this;
                return deepExtend(defaults, {
                    majorGridLines: { type: ARC },
                    minorGridLines: { type: ARC }
                }, plotArea.options.yAxis);
            },
            createValueAxis: function () {
                var plotArea = this;
                PolarPlotAreaBase.fn.createValueAxis.call(plotArea);
                plotArea.axisY = plotArea.valueAxis;
            },
            appendChart: function (chart, pane) {
                var plotArea = this;
                plotArea.valueAxisRangeTracker.update(chart.yAxisRanges);
                PlotAreaBase.fn.appendChart.call(plotArea, chart, pane);
            },
            createCharts: function () {
                var plotArea = this, series = plotArea.filterVisibleSeries(plotArea.series), pane = plotArea.panes[0];
                plotArea.createLineChart(filterSeriesByType(series, [POLAR_LINE]), pane);
                plotArea.createScatterChart(filterSeriesByType(series, [POLAR_SCATTER]), pane);
                plotArea.createAreaChart(filterSeriesByType(series, [POLAR_AREA]), pane);
            },
            createLineChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var plotArea = this, lineChart = new PolarLineChart(plotArea, { series: series });
                plotArea.appendChart(lineChart, pane);
            },
            createScatterChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var plotArea = this, scatterChart = new PolarScatterChart(plotArea, { series: series });
                plotArea.appendChart(scatterChart, pane);
            },
            createAreaChart: function (series, pane) {
                if (series.length === 0) {
                    return;
                }
                var plotArea = this, areaChart = new PolarAreaChart(plotArea, { series: series });
                plotArea.appendChart(areaChart, pane);
            },
            click: function (chart, e) {
                var plotArea = this, coords = chart._eventCoordinates(e), point = new Point2D(coords.x, coords.y), xValue, yValue;
                xValue = plotArea.axisX.getValue(point);
                yValue = plotArea.axisY.getValue(point);
                if (xValue !== null && yValue !== null) {
                    chart.trigger(PLOT_AREA_CLICK, {
                        element: $(e.target),
                        x: xValue,
                        y: yValue
                    });
                }
            },
            createCrosshairs: $.noop
        });
        function xComparer(a, b) {
            return a.value.x - b.value.x;
        }
        function angularDistance(a, b) {
            return 180 - math.abs(math.abs(a - b) - 180);
        }
        PlotAreaFactory.current.register(PolarPlotArea, POLAR_CHARTS);
        PlotAreaFactory.current.register(RadarPlotArea, RADAR_CHARTS);
        SeriesBinder.current.register(POLAR_CHARTS, [
            X,
            Y
        ], ['color']);
        SeriesBinder.current.register(RADAR_CHARTS, ['value'], ['color']);
        dataviz.DefaultAggregates.current.register(RADAR_CHARTS, {
            value: 'max',
            color: 'first'
        });
        deepExtend(dataviz, {
            PolarAreaChart: PolarAreaChart,
            PolarAxis: PolarAxis,
            PolarLineChart: PolarLineChart,
            PolarPlotArea: PolarPlotArea,
            RadarAreaChart: RadarAreaChart,
            RadarBarChart: RadarBarChart,
            RadarCategoryAxis: RadarCategoryAxis,
            RadarClusterLayout: RadarClusterLayout,
            RadarLineChart: RadarLineChart,
            RadarNumericAxis: RadarNumericAxis,
            RadarPlotArea: RadarPlotArea,
            SplinePolarAreaSegment: SplinePolarAreaSegment,
            SplineRadarAreaSegment: SplineRadarAreaSegment,
            RadarStackLayout: RadarStackLayout
        });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));