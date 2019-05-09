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
    define('kendo.dataviz.chart.funnel', [
        'kendo.dataviz.chart',
        'kendo.drawing'
    ], f);
}(function () {
    var __meta__ = {
        id: 'dataviz.chart.funnel',
        name: 'Funnel Chart',
        category: 'dataviz',
        depends: ['dataviz.chart'],
        hidden: true
    };
    (function ($, undefined) {
        var kendo = window.kendo, deepExtend = kendo.deepExtend, extend = $.extend, isFn = kendo.isFunction, template = kendo.template, util = kendo.util, append = util.append, draw = kendo.drawing, geom = kendo.geometry, dataviz = kendo.dataviz, Color = kendo.drawing.Color, ChartElement = dataviz.ChartElement, PieChartMixin = dataviz.PieChartMixin, PlotAreaBase = dataviz.PlotAreaBase, PlotAreaFactory = dataviz.PlotAreaFactory, Point2D = dataviz.Point2D, Box2D = dataviz.Box2D, SeriesBinder = dataviz.SeriesBinder, TextBox = dataviz.TextBox, autoFormat = dataviz.autoFormat, evalOptions = dataviz.evalOptions, limitValue = util.limitValue, seriesTotal = dataviz.seriesTotal;
        var CATEGORY = 'category', COLOR = 'color', FUNNEL = 'funnel', VALUE = 'value', BLACK = 'black', WHITE = 'white';
        var FunnelPlotArea = PlotAreaBase.extend({
            render: function () {
                var plotArea = this, series = plotArea.series;
                plotArea.createFunnelChart(series);
            },
            createFunnelChart: function (series) {
                var plotArea = this, firstSeries = series[0], funnelChart = new FunnelChart(plotArea, {
                        series: series,
                        legend: plotArea.options.legend,
                        neckRatio: firstSeries.neckRatio,
                        dynamicHeight: firstSeries.dynamicHeight,
                        dynamicSlope: firstSeries.dynamicSlope,
                        segmentSpacing: firstSeries.segmentSpacing,
                        highlight: firstSeries.highlight
                    });
                plotArea.appendChart(funnelChart);
            },
            appendChart: function (chart, pane) {
                PlotAreaBase.fn.appendChart.call(this, chart, pane);
                append(this.options.legend.items, chart.legendItems);
            }
        });
        var FunnelChart = ChartElement.extend({
            init: function (plotArea, options) {
                var chart = this;
                ChartElement.fn.init.call(chart, options);
                chart.plotArea = plotArea;
                chart.points = [];
                chart.labels = [];
                chart.legendItems = [];
                chart.render();
            },
            options: {
                neckRatio: 0.3,
                width: 300,
                dynamicSlope: false,
                dynamicHeight: true,
                segmentSpacing: 0,
                labels: {
                    visible: false,
                    align: 'center',
                    position: 'center'
                }
            },
            formatPointValue: function (point, format) {
                return autoFormat(format, point.value);
            },
            render: function () {
                var chart = this, options = chart.options, colors = chart.plotArea.options.seriesColors || [], colorsCount = colors.length, series = options.series[0], pointData, fields, data = series.data;
                if (!data) {
                    return;
                }
                var total = seriesTotal(series), value, i;
                for (i = 0; i < data.length; i++) {
                    pointData = SeriesBinder.current.bindPoint(series, i);
                    value = pointData.valueFields.value;
                    if (value === null || value === undefined) {
                        continue;
                    }
                    fields = pointData.fields;
                    if (!isFn(series.color)) {
                        series.color = fields.color || colors[i % colorsCount];
                    }
                    fields = deepExtend({
                        index: i,
                        owner: chart,
                        series: series,
                        category: fields.category,
                        dataItem: data[i],
                        percentage: Math.abs(value) / total,
                        visibleInLegend: fields.visibleInLegend,
                        visible: fields.visible
                    }, fields);
                    var segment = chart.createSegment(value, fields);
                    var label = chart.createLabel(value, fields);
                    if (segment && label) {
                        segment.append(label);
                    }
                }
            },
            evalSegmentOptions: function (options, value, fields) {
                var series = fields.series;
                evalOptions(options, {
                    value: value,
                    series: series,
                    dataItem: fields.dataItem,
                    index: fields.index
                }, {
                    defaults: series._defaults,
                    excluded: [
                        'data',
                        'toggle',
                        'visual'
                    ]
                });
            },
            createSegment: function (value, fields) {
                var chart = this, segment;
                var seriesOptions = deepExtend({}, fields.series);
                chart.evalSegmentOptions(seriesOptions, value, fields);
                chart.createLegendItem(value, seriesOptions, fields);
                if (fields.visible !== false) {
                    segment = new FunnelSegment(value, seriesOptions, fields);
                    extend(segment, fields);
                    chart.append(segment);
                    chart.points.push(segment);
                    return segment;
                }
            },
            createLabel: function (value, fields) {
                var chart = this, series = fields.series, dataItem = fields.dataItem, labels = deepExtend({}, chart.options.labels, series.labels), text = value, textBox;
                if (labels.visible) {
                    if (labels.template) {
                        var labelTemplate = template(labels.template);
                        text = labelTemplate({
                            dataItem: dataItem,
                            value: value,
                            percentage: fields.percentage,
                            category: fields.category,
                            series: series
                        });
                    } else if (labels.format) {
                        text = autoFormat(labels.format, text);
                    }
                    if (!labels.color && labels.align === 'center') {
                        var brightnessValue = new Color(series.color).percBrightness();
                        if (brightnessValue > 180) {
                            labels.color = BLACK;
                        } else {
                            labels.color = WHITE;
                        }
                    }
                    chart.evalSegmentOptions(labels, value, fields);
                    textBox = new TextBox(text, deepExtend({ vAlign: labels.position }, labels));
                    chart.labels.push(textBox);
                    return textBox;
                }
            },
            labelPadding: function () {
                var labels = this.labels, label, align, width, padding = {
                        left: 0,
                        right: 0
                    }, i;
                for (i = 0; i < labels.length; i++) {
                    label = labels[i];
                    align = label.options.align;
                    if (align !== 'center') {
                        width = labels[i].box.width();
                        if (align === 'left') {
                            padding.left = Math.max(padding.left, width);
                        } else {
                            padding.right = Math.max(padding.right, width);
                        }
                    }
                }
                return padding;
            },
            reflow: function (chartBox) {
                var chart = this, options = chart.options, segments = chart.points, count = segments.length, decreasingWidth = options.neckRatio <= 1, i, height, lastUpperSide, points, percentage, offset, box = chartBox.clone().unpad(chart.labelPadding()), width = box.width(), previousHeight = 0, previousOffset = decreasingWidth ? 0 : (width - width / options.neckRatio) / 2, segmentSpacing = options.segmentSpacing, dynamicSlope = options.dynamicSlope, totalHeight = box.height() - segmentSpacing * (count - 1), neckRatio = decreasingWidth ? options.neckRatio * width : width;
                if (!count) {
                    return;
                }
                if (dynamicSlope) {
                    var firstSegment = segments[0], maxSegment = firstSegment, nextSegment, nextPercentage;
                    $.each(segments, function (idx, val) {
                        if (val.percentage > maxSegment.percentage) {
                            maxSegment = val;
                        }
                    });
                    lastUpperSide = firstSegment.percentage / maxSegment.percentage * width;
                    previousOffset = (width - lastUpperSide) / 2;
                    for (i = 0; i < count; i++) {
                        percentage = segments[i].percentage;
                        nextSegment = segments[i + 1];
                        nextPercentage = nextSegment ? nextSegment.percentage : percentage;
                        points = segments[i].points = [];
                        height = options.dynamicHeight ? totalHeight * percentage : totalHeight / count;
                        if (!percentage) {
                            offset = nextPercentage ? 0 : width / 2;
                        } else {
                            offset = (width - lastUpperSide * (nextPercentage / percentage)) / 2;
                        }
                        offset = limitValue(offset, 0, width);
                        points.push(new geom.Point(box.x1 + previousOffset, box.y1 + previousHeight));
                        points.push(new geom.Point(box.x1 + width - previousOffset, box.y1 + previousHeight));
                        points.push(new geom.Point(box.x1 + width - offset, box.y1 + height + previousHeight));
                        points.push(new geom.Point(box.x1 + offset, box.y1 + height + previousHeight));
                        previousOffset = offset;
                        previousHeight += height + segmentSpacing;
                        lastUpperSide = limitValue(width - 2 * offset, 0, width);
                    }
                } else {
                    var topMostWidth = decreasingWidth ? width : width - previousOffset * 2, finalNarrow = (topMostWidth - neckRatio) / 2;
                    for (i = 0; i < count; i++) {
                        points = segments[i].points = [];
                        percentage = segments[i].percentage;
                        offset = options.dynamicHeight ? finalNarrow * percentage : finalNarrow / count;
                        height = options.dynamicHeight ? totalHeight * percentage : totalHeight / count;
                        points.push(new geom.Point(box.x1 + previousOffset, box.y1 + previousHeight));
                        points.push(new geom.Point(box.x1 + width - previousOffset, box.y1 + previousHeight));
                        points.push(new geom.Point(box.x1 + width - previousOffset - offset, box.y1 + height + previousHeight));
                        points.push(new geom.Point(box.x1 + previousOffset + offset, box.y1 + height + previousHeight));
                        previousOffset += offset;
                        previousHeight += height + segmentSpacing;
                    }
                }
                for (i = 0; i < count; i++) {
                    segments[i].reflow(chartBox);
                }
            }
        });
        deepExtend(FunnelChart.fn, PieChartMixin);
        var FunnelSegment = ChartElement.extend({
            init: function (value, options, segmentOptions) {
                var segment = this;
                ChartElement.fn.init.call(segment, options);
                segment.value = value;
                segment.options.index = segmentOptions.index;
            },
            options: {
                color: WHITE,
                border: { width: 1 }
            },
            reflow: function (chartBox) {
                var segment = this, points = segment.points, label = segment.children[0];
                segment.box = new Box2D(points[0].x, points[0].y, points[1].x, points[2].y);
                if (label) {
                    label.reflow(new Box2D(chartBox.x1, points[0].y, chartBox.x2, points[2].y));
                }
            },
            createVisual: function () {
                var segment = this;
                var options = segment.options;
                var visual;
                ChartElement.fn.createVisual.call(this);
                if (options.visual) {
                    visual = options.visual({
                        category: segment.category,
                        dataItem: segment.dataItem,
                        value: segment.value,
                        series: segment.series,
                        percentage: segment.percentage,
                        points: segment.points,
                        options: options,
                        createVisual: function () {
                            return segment.createPath();
                        }
                    });
                } else {
                    visual = segment.createPath();
                }
                if (visual) {
                    this.visual.append(visual);
                }
            },
            createPath: function () {
                var options = this.options;
                var border = options.border;
                var path = draw.Path.fromPoints(this.points, {
                    fill: {
                        color: options.color,
                        opacity: options.opacity
                    },
                    stroke: {
                        color: border.color,
                        opacity: border.opacity,
                        width: border.width
                    }
                }).close();
                return path;
            },
            createHighlight: function (style) {
                return draw.Path.fromPoints(this.points, style);
            },
            highlightVisual: function () {
                return this.visual.children[0];
            },
            highlightVisualArgs: function () {
                var path = draw.Path.fromPoints(this.points).close();
                return {
                    options: this.options,
                    path: path
                };
            },
            highlightOverlay: function (view, opt) {
                var options = this.options, hlOptions = options.highlight || {};
                if (hlOptions.visible === false) {
                    return;
                }
                var border = hlOptions.border || {};
                var calcOptions = extend({}, opt, {
                    fill: hlOptions.color,
                    stroke: border.color,
                    strokeOpacity: border.opacity,
                    strokeWidth: border.width,
                    fillOpacity: hlOptions.opacity
                });
                var element = view.createPolyline(this.points, true, calcOptions);
                return element;
            },
            tooltipAnchor: function (tooltipWidth) {
                var box = this.box;
                return new Point2D(box.center().x - tooltipWidth / 2, box.y1);
            },
            formatValue: function (format) {
                var point = this;
                return point.owner.formatPointValue(point, format);
            }
        });
        deepExtend(FunnelSegment.fn, dataviz.PointEventsMixin);
        PlotAreaFactory.current.register(FunnelPlotArea, [FUNNEL]);
        SeriesBinder.current.register([FUNNEL], [VALUE], [
            CATEGORY,
            COLOR,
            'visibleInLegend',
            'visible'
        ]);
        deepExtend(dataviz, {
            FunnelChart: FunnelChart,
            FunnelSegment: FunnelSegment
        });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));