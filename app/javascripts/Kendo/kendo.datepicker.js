(function(f, define) {
    define('kendo.datepicker', [
        'kendo.calendar',
        'kendo.popup'
    ], f);
}(function() {

    var __meta__ = {
        id: 'datepicker',
        name: 'DatePicker',
        category: 'web',
        description: 'The DatePicker widget allows the user to select a date from a calendar or by direct input.',
        depends: [
            'calendar',
            'popup'
        ]
    };
    (function($, undefined) {

        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget,
            parse = kendo.parseDate,
            keys = kendo.keys,
            template = kendo.template,
            activeElement = kendo._activeElement,
            DIV = '<div />',
            SPAN = '<span />',
            ns = '.kendoDatePicker',
            CLICK = 'click' + ns,
            OPEN = 'open',
            CLOSE = 'close',
            CHANGE = 'change',
            DISABLED = 'disabled',
            READONLY = 'readonly',
            DEFAULT = 'k-state-default',
            FOCUSED = 'k-state-focused',
            SELECTED = 'k-state-selected',
            STATEDISABLED = 'k-state-disabled',
            HOVER = 'k-state-hover',
            HOVEREVENTS = 'mouseenter' + ns + ' mouseleave' + ns,
            MOUSEDOWN = 'mousedown' + ns,
            ID = 'id',
            MIN = 'min',
            MAX = 'max',
            MONTH = 'month',
            ARIA_DISABLED = 'aria-disabled',
            ARIA_EXPANDED = 'aria-expanded',
            ARIA_HIDDEN = 'aria-hidden',
            ARIA_READONLY = 'aria-readonly',
            calendar = kendo.calendar,
            isInRange = calendar.isInRange,
            restrictValue = calendar.restrictValue,
            isEqualDatePart = calendar.isEqualDatePart,
            extend = $.extend,
            proxy = $.proxy,
            DATE = Date;

        function normalize(options) {
            var parseFormats = options.parseFormats,
                format = options.format;
            calendar.normalize(options);
            parseFormats = $.isArray(parseFormats) ? parseFormats : [parseFormats];
            if (!parseFormats.length) {
                parseFormats.push('yyyy-MM-dd');
            }
            if ($.inArray(format, parseFormats) === -1) {
                parseFormats.splice(0, 0, options.format);
            }
            options.parseFormats = parseFormats;
        }

        function preventDefault(e) {
            e.preventDefault();
        }
        var DateView = function(options) {
            var that = this,
                id, body = document.body,
                div = $(DIV).attr(ARIA_HIDDEN, 'true').addClass('k-calendar-container').appendTo(body);
            that.options = options = options || {};
            id = options.id;
            if (id) {
                id += '_dateview';
                div.attr(ID, id);
                that._dateViewID = id;
            }
            that.popup = new ui.Popup(div, extend(options.popup, options, {
                name: 'Popup',
                isRtl: kendo.support.isRtl(options.anchor)
            }));
            that.div = div;
            that.value(options.value);
        };
        DateView.prototype = {
            _calendar: function() {
                var that = this;
                var calendar = that.calendar;
                var options = that.options;
                var div;
                if (!calendar) {
                    div = $(DIV).attr(ID, kendo.guid()).appendTo(that.popup.element).on(MOUSEDOWN, preventDefault).on(CLICK, 'td:has(.k-link)', proxy(that._click, that));
                    that.calendar = calendar = new ui.Calendar(div);
                    that._setOptions(options);
                    kendo.calendar.makeUnselectable(calendar.element);
                    calendar.navigate(that._value || that._current, options.start);
                    that.value(that._value);
                }
            },
            _setOptions: function(options) {
                this.calendar.setOptions({
                    focusOnNav: false,
                    change: options.change,
                    culture: options.culture,
                    dates: options.dates,
                    depth: options.depth,
                    footer: options.footer,
                    format: options.format,
                    max: options.max,
                    min: options.min,
                    month: options.month,
                    start: options.start,
                    disableDates: options.disableDates
                });
            },
            setOptions: function(options) {
                var old = this.options;
                var disableDates = options.disableDates;
                if (disableDates) {
                    options.disableDates = calendar.disabled(disableDates);
                }
                this.options = extend(old, options, {
                    change: old.change,
                    close: old.close,
                    open: old.open
                });
                if (this.calendar) {
                    this._setOptions(this.options);
                }
            },
            destroy: function() {
                this.popup.destroy();
            },
            open: function() {
                var that = this;
                that._calendar();
                that.popup.open();
            },
            close: function() {
                this.popup.close();
            },
            min: function(value) {
                this._option(MIN, value);
            },
            max: function(value) {
                this._option(MAX, value);
            },
            toggle: function() {
                var that = this;
                that[that.popup.visible() ? CLOSE : OPEN]();
            },
            move: function(e) {
                var that = this,
                    key = e.keyCode,
                    calendar = that.calendar,
                    selectIsClicked = e.ctrlKey && key == keys.DOWN || key == keys.ENTER,
                    handled = false;
                if (e.altKey) {
                    if (key == keys.DOWN) {
                        that.open();
                        e.preventDefault();
                        handled = true;
                    } else if (key == keys.UP) {
                        that.close();
                        e.preventDefault();
                        handled = true;
                    }
                } else if (that.popup.visible()) {
                    if (key == keys.ESC || selectIsClicked && calendar._cell.hasClass(SELECTED)) {
                        that.close();
                        e.preventDefault();
                        return true;
                    }
                    that._current = calendar._move(e);
                    handled = true;
                }
                return handled;
            },
            current: function(date) {
                this._current = date;
                this.calendar._focus(date);
            },
            value: function(value) {
                var that = this,
                    calendar = that.calendar,
                    options = that.options,
                    disabledDate = options.disableDates;
                if (disabledDate && disabledDate(value)) {
                    value = null;
                }
                that._value = value;
                that._current = new DATE(+restrictValue(value, options.min, options.max));
                if (calendar) {
                    calendar.value(value);
                }
            },
            _click: function(e) {
                if (e.currentTarget.className.indexOf(SELECTED) !== -1) {
                    this.close();
                }
            },
            _option: function(option, value) {
                var that = this;
                var calendar = that.calendar;
                that.options[option] = value;
                if (calendar) {
                    calendar[option](value);
                }
            }
        };
        DateView.normalize = normalize;
        kendo.DateView = DateView;
        var DatePicker = Widget.extend({
            init: function(element, options) {

                var that = this,
                    disabled, div;
                Widget.fn.init.call(that, element, options);
                element = that.element;

                options = that.options;
                options.disableDates = kendo.calendar.disabled(options.disableDates);
                options.min = parse(element.attr('min')) || parse(options.min);
                options.max = parse(element.attr('max')) || parse(options.max);
                normalize(options);
                that._initialOptions = extend({}, options);
                that._wrapper();
                that.dateView = new DateView(extend({}, options, {
                    id: element.attr(ID),
                    anchor: that.wrapper,
                    change: function() {
                        that._change(this.value());
                        that.close();
                    },
                    close: function(e) {
                        if (that.trigger(CLOSE)) {
                            e.preventDefault();
                        } else {
                            element.attr(ARIA_EXPANDED, false);
                            div.attr(ARIA_HIDDEN, true);
                        }
                    },
                    open: function(e) {

                        var options = that.options,
                            date;
                        if (that.trigger(OPEN)) {
                            e.preventDefault();
                        } else {
                            if (that.element.val() !== that._oldText) {
                                date = parse(element.val(), options.parseFormats, options.culture);
                                that.dateView[date ? 'current' : 'value'](date);
                            }
                            element.attr(ARIA_EXPANDED, true);
                            div.attr(ARIA_HIDDEN, false);
                            that._updateARIA(date);
                        }
                    }
                }));
                div = that.dateView.div;
                that._icon();
                try {
                    element[0].setAttribute('type', 'text');
                } catch (e) {
                    element[0].type = 'text';
                }

                element.addClass('k-input').attr({
                    role: 'combobox',
                    'aria-expanded': false,
                    'aria-owns': that.dateView._dateViewID
                });


                element.attr({
                    placeholder: options.format
                });
                that._reset();
                that._template();
                disabled = element.is('[disabled]') || $(that.element).parents('fieldset').is(':disabled');
                if (disabled) {
                    that.enable(false);
                } else {
                    that.readonly(element.is('[readonly]'));
                }
                that._old = that._update(options.value || that.element.val());
                that._oldText = element.val();
                kendo.notify(that);
                var mask = options.format;
                var prefix = ['M', 'd', 'y', 'h', 'H', 'm', 's'];
                for (var j = 0; j < 4; j++)
                    for (var i in prefix)
                        mask = mask.replace(prefix[i], '9');

                var item = $(element);
                // that.mask(mask);
                this.$angular_scope.$parent.$watch("ctrl." + $(element).attr('k-ng-model'), function(e) {
                    that.value(e);
                })

            },
            caret: function(begin, end) {
                var range;
                if (0 !== this.element.length && !this.element.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin,
                    this.element.each(function() {
                        this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(),
                            range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin),
                            range.select());
                    })) : (this.element[0].setSelectionRange ? (begin = this.element[0].selectionStart, end = this.element[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(),
                    begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), {
                    begin: begin,
                    end: end
                });
            },
            unmask: function() {
                return this.trigger("unmask");
            },
            mask: function(mask, settings) {
                var caretTimeoutId, ua = navigator.userAgent,
                    iPhone = /iphone/i.test(ua),
                    chrome = /chrome/i.test(ua),
                    android = /android/i.test(ua);
                var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
                var that = this.element;
                var root = this;
                if (!mask && this.length > 0) {
                    input = $(this[0]);
                    var fn = input.data(that.options.dataName);
                    return fn ? fn() : void 0;
                }
                return settings = this.options, defs = this.options.definitions, tests = [], partialPosition = len = mask.length,
                    firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
                        "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])),
                            null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
                    }), $(that).trigger("unmask").each(function() {
                        function tryFireCompleted() {
                            if (settings.completed) {
                                for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++)
                                    if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                                settings.completed.call(input);
                            }
                        }

                        function getPlaceholder(i) {
                            var position = settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                            console.log(position);
                            return position;
                        }

                        function seekNext(pos) {
                            for (; ++pos < len && !tests[pos];);
                            return pos;
                        }

                        function seekPrev(pos) {
                            for (; --pos >= 0 && !tests[pos];);
                            return pos;
                        }

                        function shiftL(begin, end) {
                            var i, j;
                            if (!(0 > begin)) {
                                for (i = begin, j = seekNext(end); len > i; i++)
                                    if (tests[i]) {
                                        if (!(len > j && tests[i].test(buffer[j]))) break;
                                        buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                                    }
                                writeBuffer(), root.caret(Math.max(firstNonMaskPos, begin));
                            }
                        }

                        function shiftR(pos) {
                            var i, c, j, t;
                            for (i = pos, c = getPlaceholder(pos); len > i; i++)
                                if (tests[i]) {
                                    if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                                    c = t;
                                }
                        }

                        function androidInputEvent() {
                            var curVal = input.val(),
                                pos = root.caret();
                            if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                                for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1];) pos.begin--;
                                if (0 === pos.begin)
                                    for (; pos.begin < firstNonMaskPos && !tests[pos.begin];) pos.begin++;
                                root.caret(pos.begin, pos.begin);
                            } else {
                                for (checkVal(!0); pos.begin < len && !tests[pos.begin];) pos.begin++;
                                root.caret(pos.begin, pos.begin);
                            }
                            tryFireCompleted();
                        }

                        function blurEvent() {
                            checkVal(), input.val() != focusText && input.change();
                        }

                        function keydownEvent(e) {
                            if (!input.prop("readonly")) {
                                var pos, begin, end, k = e.which || e.keyCode;
                                oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = root.caret(),
                                    begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1),
                                        end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1),
                                    e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText),
                                    root.caret(0, checkVal()), e.preventDefault());
                            }
                        }

                        function keypressEvent(e) {
                            if (!input.prop("readonly")) {
                                var p, c, next, k = e.which || e.keyCode,
                                    pos = root.caret();
                                if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                                    if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)),
                                        p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                                        if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                            var proxy = function() {
                                                $.proxy($.fn.caret, input, next)();
                                            };
                                            setTimeout(proxy, 0);
                                        } else root.caret(next);
                                        pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                                    }
                                    e.preventDefault();
                                }
                            }
                        }

                        function clearBuffer(start, end) {
                            var i;
                            for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
                        }

                        function writeBuffer() {
                            input.val(buffer.join(""));
                        }

                        function checkVal(allow) {
                            var i, c, pos, test = input.val(),
                                lastMatch = -1;
                            for (i = 0, pos = 0; len > i; i++)
                                if (tests[i]) {
                                    for (buffer[i] = getPlaceholder(i); pos++ < test.length;)
                                        if (c = test.charAt(pos - 1),
                                            tests[i].test(c)) {
                                            buffer[i] = c, lastMatch = i;
                                            break;
                                        }
                                    if (pos > test.length) {
                                        clearBuffer(i + 1, len);
                                        break;
                                    }
                                } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                            return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""),
                                    clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))),
                                partialPosition ? i : firstNonMaskPos;
                        }
                        var input = $(that),
                            buffer = $.map(mask.split(""), function(c, i) {
                                return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                            }),
                            defaultBuffer = buffer.join(""),
                            focusText = input.val();
                        input.data(root.options.dataName, function() {
                                return $.map(buffer, function(c, i) {
                                    return tests[i] && c != getPlaceholder(i) ? c : null;
                                }).join("");
                            }), input.one("unmask", function() {
                                input.off(".mask").removeData(this.options.dataName);
                            }).on("focus.mask", function() {
                                if (!input.prop("readonly")) {
                                    clearTimeout(caretTimeoutId);
                                    var pos;
                                    focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                                        input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? root.caret(0, pos) : root.caret(pos));
                                    }, 10);
                                }
                            }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                                input.prop("readonly") || setTimeout(function() {
                                    var pos = checkVal(!0);
                                    root.caret(pos), tryFireCompleted();
                                }, 0);
                            }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent),
                            checkVal();
                    });
            },
            events: [
                OPEN,
                CLOSE,
                CHANGE
            ],
            options: {
                name: 'DatePicker',
                definitions: {
                    "9": "[0-9]",
                    a: "[A-Za-z]",
                    "*": "[A-Za-z0-9]"
                },
                autoclear: !0,
                dataName: "rawMaskFn",
                placeholder: "_",
                value: null,
                footer: '',
                format: '',
                culture: '',
                parseFormats: [],
                min: new Date(1900, 0, 1),
                max: new Date(2099, 11, 31),
                start: MONTH,
                depth: MONTH,
                animation: {},
                month: {},
                dates: [],
                ARIATemplate: 'Current focused date is #=kendo.toString(data.current, "D")#'
            },
            setOptions: function(options) {
                var that = this;
                var value = that._value;
                Widget.fn.setOptions.call(that, options);
                options = that.options;
                options.min = parse(options.min);
                options.max = parse(options.max);
                normalize(options);
                that.dateView.setOptions(options);
                if (value) {
                    that.element.val(kendo.toString(value, options.format, options.culture));
                    that._updateARIA(value);
                }
            },
            _editable: function(options) {
                var that = this,
                    icon = that._dateIcon.off(ns),
                    element = that.element.off(ns),
                    wrapper = that._inputWrapper.off(ns),
                    readonly = options.readonly,
                    disable = options.disable;
                if (!readonly && !disable) {
                    wrapper.addClass(DEFAULT).removeClass(STATEDISABLED).on(HOVEREVENTS, that._toggleHover);
                    element.removeAttr(DISABLED).removeAttr(READONLY).attr(ARIA_DISABLED, false).attr(ARIA_READONLY, false).on('keydown' + ns, proxy(that._keydown, that)).on('focusout' + ns, proxy(that._blur, that)).on('focus' + ns, function() {
                        that._inputWrapper.addClass(FOCUSED);
                    });
                    icon.on(CLICK, proxy(that._click, that)).on(MOUSEDOWN, preventDefault);
                } else {
                    wrapper.addClass(disable ? STATEDISABLED : DEFAULT).removeClass(disable ? DEFAULT : STATEDISABLED);
                    element.attr(DISABLED, disable).attr(READONLY, readonly).attr(ARIA_DISABLED, disable).attr(ARIA_READONLY, readonly);
                }
            },
            readonly: function(readonly) {
                this._editable({
                    readonly: readonly === undefined ? true : readonly,
                    disable: false
                });
            },
            enable: function(enable) {
                this._editable({
                    readonly: false,
                    disable: !(enable = enable === undefined ? true : enable)
                });
            },
            destroy: function() {
                var that = this;
                Widget.fn.destroy.call(that);
                that.dateView.destroy();
                that.element.off(ns);
                that._dateIcon.off(ns);
                that._inputWrapper.off(ns);
                if (that._form) {
                    that._form.off('reset', that._resetHandler);
                }
            },
            open: function() {
                this.dateView.open();
            },
            close: function() {
                this.dateView.close();
            },
            min: function(value) {
                return this._option(MIN, value);
            },
            max: function(value) {
                return this._option(MAX, value);
            },
            value: function(value) {
                var that = this;
                if (value === undefined) {
                    return that._value;
                }
                that._old = that._update(value);
                if (that._old === null) {
                    that.element.val('');
                }
                that._oldText = that.element.val();
            },
            _toggleHover: function(e) {
                $(e.currentTarget).toggleClass(HOVER, e.type === 'mouseenter');
            },
            _blur: function() {

                var that = this,
                    value = that.element.val();
                that.close();
                if (value !== that._oldText) {
                    that._change(value);
                }
                that._inputWrapper.removeClass(FOCUSED);
            },
            _click: function() {
                var that = this,
                    element = that.element;
                that.dateView.toggle();
                if (!kendo.support.touch && element[0] !== activeElement()) {
                    element.focus();
                }
            },
            _change: function(value) {

                var that = this,
                    oldValue = that.element.val(),
                    dateChanged;
                value = that._update(value);
                dateChanged = +that._old != +value;
                var valueUpdated = dateChanged && !that._typing;
                var textFormatted = oldValue !== that.element.val();
                if (valueUpdated || textFormatted) {
                    that.element.trigger(CHANGE);
                }
                if (dateChanged) {
                    that._old = value;
                    that._oldText = that.element.val();
                    that.trigger(CHANGE);
                }
                that._typing = false;
            },
            _keydown: function(e) {

                var that = this,
                    dateView = that.dateView,
                    value = that.element.val(),
                    handled = false;
                if (!dateView.popup.visible() && e.keyCode == '40') {
                    that.dateView.toggle();
                } else if (!dateView.popup.visible() && e.keyCode == keys.ENTER && value !== that._oldText) {
                    that._change(value);
                } else {
                    handled = dateView.move(e);
                    that._updateARIA(dateView._current);
                    if (!handled) {
                        that._typing = true;
                    }
                }
            },
            _icon: function() {
                var that = this,
                    element = that.element,
                    icon;
                icon = element.next('span.k-select');
                if (!icon[0]) {
                    icon = $('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar">select</span></span>').insertAfter(element);
                }
                that._dateIcon = icon.attr({
                    'role': 'button',
                    'aria-controls': that.dateView._dateViewID
                });
            },
            _option: function(option, value) {
                var that = this,
                    options = that.options;
                if (value === undefined) {
                    return options[option];
                }
                value = parse(value, options.parseFormats, options.culture);
                if (!value) {
                    return;
                }
                options[option] = new DATE(+value);
                that.dateView[option](value);
            },
            _update: function(value) {

                var that = this,
                    options = that.options,
                    min = options.min,
                    max = options.max,
                    current = that._value,
                    date = parse(value, options.parseFormats, options.culture),
                    isSameType = date === null && current === null || date instanceof Date && current instanceof Date,
                    formattedValue;

                if (options.disableDates(date)) {
                    date = null;
                    if (!that._old) {
                        value = null;
                    }
                }
                if (date === null && value !== '') {
                    that.element.addClass('error');
                } else
                    that.element.removeClass('error');
                if (+date === +current && isSameType) {
                    formattedValue = kendo.toString(date, options.format, options.culture);
                    if (formattedValue !== value) {
                        that.element.val(date === null ? value : formattedValue);
                    }
                    return date;
                }
                if (date !== null && isEqualDatePart(date, min)) {
                    date = restrictValue(date, min, max);
                } else if (!isInRange(date, min, max)) {
                    date = null;
                }
                that._value = date;
                that.dateView.value(date);
                that.element.val(date ? kendo.toString(date, options.format, options.culture) : value);
                that._updateARIA(date);
                return date;
            },
            _wrapper: function() {
                var that = this,
                    element = that.element,
                    wrapper;
                wrapper = element.parents('.k-datepicker');
                if (!wrapper[0]) {
                    wrapper = element.wrap(SPAN).parent().addClass('k-picker-wrap k-state-default');
                    wrapper = wrapper.wrap(SPAN).parent();
                }
                wrapper[0].style.cssText = element[0].style.cssText;
                element.css({
                    width: '100%',
                    height: element[0].style.height
                });

                that.wrapper = wrapper.addClass('k-widget k-datepicker k-header').addClass(element[0].className);
                that._inputWrapper = $(wrapper[0].firstChild);
                var ngModel = that.element.attr('k-ng-model');
                that.$angular_scope.$parent.$watch("ctrl." + that.element.attr('k-ng-model'), function(e) {

                    that.value(e);
                });

                that.$angular_scope.$parent.$watch(that.element.attr('k-ng-model'), function(e) {

                    that.value(e);
                });
            },
            _reset: function() {
                var that = this,
                    element = that.element,
                    formId = element.attr('form'),
                    form = formId ? $('#' + formId) : element.closest('form');
                if (form[0]) {
                    that._resetHandler = function() {
                        that.value(element[0].defaultValue);
                        that.max(that._initialOptions.max);
                        that.min(that._initialOptions.min);
                    };
                    that._form = form.on('reset', that._resetHandler);
                }
            },
            _template: function() {
                this._ariaTemplate = template(this.options.ARIATemplate);
            },
            _updateARIA: function(date) {
                var cell;
                var that = this;
                var calendar = that.dateView.calendar;
                that.element.removeAttr('aria-activedescendant');
                if (calendar) {
                    cell = calendar._cell;
                    cell.attr('aria-label', that._ariaTemplate({
                        current: date || calendar.current()
                    }));
                    that.element.attr('aria-activedescendant', cell.attr('id'));
                }
            }
        });
        ui.plugin(DatePicker);
    }(window.kendo.jQuery));

    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) {
    (a3 || a2)();
}));