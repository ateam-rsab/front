define(['Configuration', 'jQuery', 'kendo.angular',
    'kendo.panelbar', 'kendo.color',
    'kendo.dataviz.qrcode',
    'kendo.dataviz.barcode',
    'kendo.button',
    'kendo.notification',
    'kendo.menu',
    'kendo.datepicker',
    'kendo.datetimepicker',
    'kendo.combobox',
    'kendo.window',
    'kendo.autocomplete',
    'kendo.grid',
    'kendo.panelbar',
    'kendo.splitter',
    'kendo.tooltip',
    'kendo.scheduler',
    'kendo.dataviz.chart',
    'kendo.treeview',
    'kendo.upload',
    'kendo.editor',
    'kendo.drawing',
    'kendo.tabstrip',
    'kendo.pdf', 'HttpService',
    'kendo.multiselect',
    'kendo.list',
    'kendo.mobile.scroller'


], function(configuration, jQuery, kendoAngular, kendoPanelBar, color, a) {
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '' + s4() + '' + s4() + '' +
            s4() + '' + s4() + s4() + s4();
    }
    String.prototype.formatMoney = function(c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    var core = angular.module('core', ["kendo.directives", 'btford.socket-io', 'HttpServices'])
        .factory('socket', function(socketFactory) {

            var myIoSocket = null;

            try{
                myIoSocket = io.connect(configuration.urlSocket);
            }catch(err){

            }

            var mySocket = socketFactory({
                ioSocket: myIoSocket
            });

            return mySocket;
        }).service('fileUpload', ['$http', function($http) {
            this.uploadFileToUrl = function(file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);

                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })

                .success(function() {})

                .error(function() {});
            }
        }])
        .directive('rupiah', function(socketFactory) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                },
                controller: function($scope, $element, $attrs, $interval) {
                    var stop = $interval(function() {
                        if (isNaN(Number($element.html())) === false && $element.html() !== '') {
                            $element.attr('value', $element.html());
                            if ($attrs.template === undefined)
                                $attrs.template = "{0}";
                            $element.html($attrs.template.replace("{0}", "<span class='left-cur'>Rp. </span>" + "<span class='right-cur'>" + $element.html().formatMoney(0, ",", ".") + "</span>"));
                            $interval.cancel(stop);
                        }
                    }, 200);

                }
            }
        })
        .directive('cFocus', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.focus(function() {
                        console.log('Focus');
                    });
                    element.bind('blur', function() {
                        console.log('Blur');
                    });
                }
            }
        })
        .directive('fileModel', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            }
        }]).filter('any', function() {
            return function(input, params) {
                if (params.items.length === 0) return input;
                for (var key in input) {
                    if (input.hasOwnProperty(key)) {
                        var element = input[key];
                        var arr = element[params.property].split(',');
                        for (var i in params.items) {
                            if (params.items.hasOwnProperty(i)) {
                                var subElement = params.items[i];
                                for (var j in arr) {
                                    if (arr.hasOwnProperty(j)) {
                                        var jItem = arr[j];
                                        if (jItem === subElement[params.key])
                                            return input;
                                    }
                                }

                            }
                        }
                    }
                }
            };
        })
        .directive('fileModel', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            }
        }])
        .factory('bindItems', function($timeout, $window) {
            var factory =
                function(data) {
                    var html = "<ul>";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].children !== undefined) {
                            html += "<li data-link='" + data[i].link + "'>" + data[i].name + bindItems(data[i]) + "</li>";
                        } else {
                            html += "<li data-link='" + data[i].link + "'>" + data[i].name + "</li>";
                        }
                    }
                    html += "</ul>";
                    return html;
                }

            function bindItems(data, margin) {
                if (margin === undefined)
                    margin = 0;
                margin++;
                var temp = "";
                var html = "<ul>";
                for (var i = 0; i < data.children.length; i++) {

                    if (data.children[i].children !== undefined) {
                        html += "<li data-link='" + data.children[i].link + "'>" + temp + data.children[i].name + bindItems(data.children[i], margin) + "</li>";
                    } else {
                        html += "<li data-link='" + data.children[i].link + "'>" + temp + data.children[i].name + "</li>";
                    }
                }
                html += "</ul>";
                return html;
            }

            return factory;
        }).directive('cQueue', function($compile, bindItems, $timeout, $rootScope) {
            return {
                restrict: 'A',
                scope: {
                    item: '=?',
                    click: '=?'
                },
                link: function(scope, elem, attr) {
                    $rootScope.$watch('showSideMenu', function(e) {
                        var countIndex = 0;
                        var parent = undefined;
                        setTimeout(function() {
                            var width = 0;
                            var height = 0;
                            var sideItem = undefined;
                            $(elem).parent().find('.queue-detail').each(function() {
                                sideItem = this;
                            })
                            parent = $(elem);
                            $(elem).find(".dashboard").each(function() {
                                $(this).addClass('queue');

                                var side = parent.width() * 15 / 100;
                                var margin = ((parent.width() / 100));
                                if (e === true)
                                    $(sideItem).width(parent.parent().width() - parent.width());
                                else
                                    $(sideItem).width(parent.parent().width() - parent.width());
                                width = (parent.width() - 5) / 2;
                                height = (($(window).height() - 73) / 2) - 15;
                                countIndex++;
                            });
                            $(".dashboard").each(function() {
                                $(this).width(width);
                                $(this).height(height);
                                countIndex++;
                            });
                        }, 100);
                    });

                }
            }
        }).directive('canInput', function($compile, bindItems, $timeout, $rootScope) {
            return {
                restrict: 'A',
                scope: {
                    item: '='
                },
                link: function(scope, elem, attr) {
                    var temp = scope.item.indexOf('...');
                    var result = "<span id='result_" + scope.$id + "'>";
                    if (temp >= 0) {
                        var str = scope.item;
                        var i = 1;
                        while (str.indexOf('...') > 0) {
                            result += str.substring(0, str.indexOf('...'));
                            result += " <b data=" + scope.$id + i + " id='label_" + scope.$id + i + "'>...</b><input style='width: auto;display:none' class='k-textbox'     data=" + scope.$id + i + " type='text' id='text_" + scope.$id + i + "'/> ";
                            str = str.substring(str.indexOf('...') + 3);
                            i++;
                        }
                        result += "</span>";
                        var id = scope.$id;
                        setTimeout(function() {
                            for (var j = 1; j <= i; j++) {
                                $("#text_" + id + j).on('keydown', function(e) {
                                    if (e.key === "Enter") {
                                        $("#label_" + $(this).attr('data')).show();
                                        $("#text_" + $(this).attr('data')).hide();
                                        $("#label_" + $(this).attr('data')).html($("#text_" + $(this).attr('data')).val());
                                        scope.item = $("#result_" + scope.$id).text();
                                        scope.$apply();
                                    }
                                });
                                $("#label_" + id + j).on('click', function() {
                                    $("#label_" + $(this).attr('data')).hide();
                                    $("#text_" + $(this).attr('data')).show();
                                    $("#text_" + $(this).attr('data')).focus();
                                });
                            }
                        });
                    } else {
                        result = scope.item;
                    }
                    $(elem).html(result);
                }
            }
        })
    .directive('cDashboard', ['R', 'socket', function(r, socket, $compile, bindItems, $timeout, $http) {
            return {
                restrict: 'A',
                scope: {
                    items: '=?',
                    title: '=?',
                    height: '=?',
                    type: '=?',
                    group: '=?',
                    detail: '=?',
                    url: '=?'

                },
                // transclude: true,
                // template: " <div class='header-panel' ><div ng-transclude></div> Hello </div>",
                link: function(scope, elem, attr) {

                    socket.on(scope.title, function(e) {
                        if (e === undefined) return;
                        var temp = scope.url;
                        scope.url = undefined;
                        $timeout(function() {
                            scope.url = temp;

                        });
                    })
                    scope.$watch('url', function(e) {
                        if (e === undefined) return;
                        return r.get({
                            url: configuration.baseApiPostData + e
                        }).then(function(e) {
                            var datas = e.data.data.items;
                            var groupItem = _.groupBy(datas, scope.group);
                            var hasilGroup = [];
                            for (var key in groupItem) {
                                if (groupItem.hasOwnProperty(key)) {
                                    var element = groupItem[key];
                                    if (scope.detail === scope.group)
                                        hasilGroup.push({
                                            category: key,
                                            value: element.length
                                        });
                                    else {
                                        hasilGroup.push({
                                            category: key,
                                            value: _.reduce(element, function(init, result) {
                                                return init + result[scope.detail]
                                            }, 0)
                                        });
                                    }
                                }
                            }
                            var chartArea = {};
                            if (scope.height !== undefined && scope.height !== 0 && scope.height !== null)
                                chartArea = {
                                    height: scope.height
                                };
                            if (scope.type === 'pie')
                                $(elem).kendoChart({
                                    renderAs: "canvas", // alter syamsu
                                    title: {
                                        text: ""
                                    },
                                    chartArea: chartArea,
                                    legend: {
                                        position: "top"
                                    },
                                    seriesDefaults: {
                                        labels: {
                                            template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                            position: "outsideEnd",
                                            visible: true,
                                            background: "transparent"
                                        },
                                        area: {
                                            line: {
                                                style: "smooth"
                                            }
                                        }
                                    },
                                    series: [{
                                        type: scope.type,
                                        data: hasilGroup,
                                        animation: {
                                            duration: 7000
                                        }
                                    }],
                                    tooltip: {
                                        visible: true,
                                        template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                                    }
                                });
                            else {
                                var groupItem = _.groupBy(datas, scope.group);
                                var hasilGroup = [];
                                for (var key in groupItem) {
                                    if (groupItem.hasOwnProperty(key)) {
                                        var element = groupItem[key];
                                        hasilGroup.push({
                                            category: key,
                                            value: element.length
                                        })
                                    }
                                }

                                var series = [];
                                var categories = [];
                                var groupItem = _.groupBy(datas, scope.group);
                                var hasilGroup = [];
                                var data = [];
                                for (var key in groupItem) {
                                    if (groupItem.hasOwnProperty(key)) {
                                        var element = groupItem[key];

                                        if (scope.detail === scope.group) {
                                            categories.push(key);
                                            data.push(element.length);
                                        } else {
                                            categories.push(key);
                                            data.push(_.reduce(element, function(init, result) {
                                                return init + result[scope.detail]
                                            }, 0));

                                        }
                                    }
                                }
                                series.push({
                                    name: "Jumlah",
                                    data: data,
                                    type: 'pie',
                                    // Line chart marker type
                                    markers: { type: "square" },
                                    animation: {
                                        duration: 7000
                                    }
                                });

                                $(elem).kendoChart({
                                    renderAs: "canvas", // alter syamsu
                                    title: {
                                        text: ""
                                    },
                                    chartArea: chartArea,
                                    legend: {
                                       position: "top"
                                    },
                                    seriesDefaults: {
                                        type: scope.type,
                                        stack: true,
                                        labels: {
                                            visible: true,
                                            position: "outsideEnd",
                                            background: "transparent",
                                            template: " #= kendo.toString(value, 'n3') #"
                                        },
                                        "pie": {
                                             "overlay": {
                                                 "gradient": "sharpBevel"
                                             }
                                         },
                                         "column": {
                                             "overlay": {
                                                 "gradient": "sharpBevel"
                                            }
                                        }
                                    },
                                    series: series,
                                    valueAxis: {
                                        line: {
                                            visible: true
                                        }
                                    },
                                    categoryAxis: {
                                        labels: {
                                            rotation: scope.type === 'bar' ? 0 : -45,
                                            template: " #= kendo.toString(value, 'n3') #"
                                        },
                                        categories: categories,
                                        majorGridLines: {
                                            visible: false
                                        }
                                    },
                                    tooltip: {
                                        visible: true,
                                        format: "{0}",
                                        template: " #= kendo.toString(value, 'n3') #"
                                    }
                                });
                            }
                        });
                    })

                },
                contorller: function($scope) {
                    if ($scope.isShow === undefined)
                        $scope.isShow = false;
                }
            }
        }])
        .directive('cFreewall', function($compile, bindItems, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    items: '=?',
                    click: '=?',
                    state: '=?',
                    show: '=?',
                    item: '=?'
                },
                link: function(scope, elem, attr) {
                    var template = $("#" + attr.templateId).html();
                    scope.$watch("items", function(e) {
                        if (e === undefined) return;
                        var colour = [
                            "rgb(0, 0, 0)"
                        ];
                        var html = '',
                            size = '',
                            color = '',
                            limitItem = 100;
                        var str = [];
                        for (var i = 0; i < e.length; ++i) {
                            var temp = "<div data-id='{id}' class='brick {size}' style='background-color: {color}'>" + template + "</div>";
                            var element = e[i];
                            var htmlElement = "<div></div>";
                            var id = guid();
                            str.push(id);
                            temp = temp.replace("{id}", id);
                            for (var key in element) {
                                if (element.hasOwnProperty(key)) {
                                    var item = element[key];
                                    temp = temp.replace("{" + key + "}", item);
                                }
                            }
                            for (var key in element.Info) {
                                if (element.Info.hasOwnProperty(key)) {
                                    var item = element.Info[key];
                                    temp = temp.replace("{item.Info." + key + "}", item.Value);
                                }
                            }
                            size = "size11";
                            color = colour[colour.length * Math.random() << 0];
                            html += temp.replace(/\{size\}/g, size).replace("{color}", color);
                            size = "size22";
                            color = colour[colour.length * Math.random() << 0];
                            html += temp.replace(/\{size\}/g, size).replace("{color}", color);
                            size = "size44";
                            color = colour[colour.length * Math.random() << 0];
                            html += temp.replace(/\{size\}/g, size).replace("{color}", color);
                            size = "size88";
                            color = colour[colour.length * Math.random() << 0];
                            html += temp.replace(/\{size\}/g, size).replace("{color}", color);
                        }
                        $(elem).html(html);

                        var wall = new Freewall(elem);
                        wall.reset({
                            selector: '.brick',
                            animate: true,
                            cellW: 160,
                            cellH: 160,
                            fixSize: 0,
                            onResize: function() {
                                wall.refresh();
                            }
                        });
                        wall.filter(".size23");
                        $(".filter-label").click(function() {
                            $(".filter-label").removeClass("active");
                            var filter = $(this).addClass('active').data('filter');
                            if (size.indexOf('size') >= 0) {
                                scope.item = e[0];
                                scope.state = filter.replace(".", "");
                            } else
                                scope.state = undefined;

                            if (scope.show !== undefined) {
                                scope.show = filter === '.size88';
                                if (scope.show === true)
                                    scope.state = undefined;
                                scope.$apply();
                            }
                            if (filter) {
                                wall.filter(filter);
                            } else {
                                wall.unFilter();
                            }
                        });

                        wall.fitWidth();
                        $(elem).find('img').each(function(e) {
                            $(this).click(function(data) {
                                alert('asd');
                            });
                        })
                    })


                }
            }
        })
        .directive('cTimeLine', function($compile, bindItems, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    item: '=?',
                    click: '=?'
                },
                link: function(scope, elem, attr) {
                    var timelines = $(elem),
                        eventsMinDistance = 30;
                    scope.$watch('item', function(e) {
                        if (e === undefined) return;
                        setTimeout(function() {
                            timelines = $(elem);
                            (timelines.length > 0) && initTimeline(timelines);
                        }, 200);
                    });


                    function initTimeline(timelines) {
                        timelines.each(function() {
                            var timeline = $(this),
                                timelineComponents = {};
                            //cache timeline components 
                            timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
                            timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
                            timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
                            timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');

                            timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
                            timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
                            timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
                            timelineComponents['eventsContent'] = timeline.children('.events-content');

                            //assign a left postion to the single events along the timeline
                            setDatePosition(timelineComponents, eventsMinDistance);
                            //assign a width to the timeline
                            var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
                            //the timeline has been initialize - show it
                            timeline.addClass('loaded');

                            //detect click on the next arrow
                            timelineComponents['timelineNavigation'].on('click', '.next', function(event) {
                                event.preventDefault();
                                updateSlide(timelineComponents, timelineTotWidth, 'next');
                            });
                            //detect click on the prev arrow
                            timelineComponents['timelineNavigation'].on('click', '.prev', function(event) {
                                event.preventDefault();
                                updateSlide(timelineComponents, timelineTotWidth, 'prev');
                            });
                            //detect click on the a single event - show new event content
                            timelineComponents['eventsWrapper'].on('click', 'a', function(event) {
                                event.preventDefault();
                                timelineComponents['timelineEvents'].removeClass('selected');
                                $(this).addClass('selected');
                                updateOlderEvents($(this));
                                updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                                updateVisibleContent($(this), timelineComponents['eventsContent']);
                            });

                            //on swipe, show next/prev event content
                            timelineComponents['eventsContent'].on('swipeleft', function() {
                                var mq = checkMQ();
                                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
                            });
                            timelineComponents['eventsContent'].on('swiperight', function() {
                                var mq = checkMQ();
                                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
                            });

                            //keyboard navigation
                            $(document).keyup(function(event) {
                                if (event.which == '37' && elementInViewport(timeline.get(0))) {
                                    showNewContent(timelineComponents, timelineTotWidth, 'prev');
                                } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                                    showNewContent(timelineComponents, timelineTotWidth, 'next');
                                }
                            });
                        });
                    }

                    function updateSlide(timelineComponents, timelineTotWidth, string) {
                        //retrieve translateX value of timelineComponents['eventsWrapper']

                        var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
                            wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
                        //translate the timeline to the left('next')/right('prev') 
                        (string == 'next') ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth): translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
                    }

                    function showNewContent(timelineComponents, timelineTotWidth, string) {
                        //go from one event to the next/previous one
                        var visibleContent = timelineComponents['eventsContent'].find('.selected'),
                            newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

                        if (newContent.length > 0) { //if there's a next/prev event - show it

                            var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
                                newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

                            updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
                            updateVisibleContent(newEvent, timelineComponents['eventsContent']);
                            newEvent.addClass('selected');
                            selectedDate.removeClass('selected');
                            updateOlderEvents(newEvent);
                            updateTimelinePosition(string, newEvent, timelineComponents);
                        }
                    }

                    function updateTimelinePosition(string, event, timelineComponents) {
                        //translate timeline to the left/right according to the position of the selected event
                        var position = $(event.get(0)).position();
                        if (position === undefined) {
                            position = {};
                            position.left = 0;
                        }
                        var left = position.left;
                        var
                            eventLeft = Number(position),
                            timelineWidth = Number($(timelineComponents['timelineWrapper']).width()),
                            timelineTotWidth = Number($(timelineComponents['eventsWrapper']).width());
                        var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);
                        if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < -timelineTranslate)) {
                            translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
                        }
                    }

                    function translateTimeline(timelineComponents, value, totWidth) {
                        var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
                        value = (value > 0) ? 0 : value; //only negative translate value
                        value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
                        setTransformValue(eventsWrapper, 'translateX', value + 'px');
                        //update navigation arrows visibility
                        (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive'): timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
                        (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive'): timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
                    }

                    function updateFilling(selectedEvent, filling, totWidth) {
                        //change .filling-line length according to the selected event

                        var position = $(selectedEvent.get(0)).position();
                        if (position === undefined) {
                            position = {};
                            position.left = 0;
                        }
                        var
                            eventLeft = position.left,
                            eventWidth = $(selectedEvent.get(0)).width();
                        eventLeft = Number(eventLeft) + Number(eventWidth) / 2;
                        var scaleValue = eventLeft / totWidth;
                        setTransformValue(filling.get(0), 'scaleX', scaleValue);
                    }

                    function setDatePosition(timelineComponents, min) {
                        for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
                            var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]);
                            if (timelineComponents['eventsMinLapse'] === 0)
                                timelineComponents['eventsMinLapse'] = 1;
                            var distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
                            timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
                        }
                    }

                    function setTimelineWidth(timelineComponents, width) {
                        var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
                            timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
                            timeSpanNorm = Math.round(timeSpanNorm) + 4,
                            totalWidth = timeSpanNorm * width;
                        timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
                        updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
                        updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

                        return totalWidth;
                    }

                    function updateVisibleContent(event, eventsContent) {
                        var eventDate = event.data('date'),
                            visibleContent = eventsContent.find('.selected'),
                            selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
                            selectedContentHeight = selectedContent.height();
                        if (scope.click !== undefined) {
                            scope.click(eventDate);
                            scope.$apply();
                        }

                        if (selectedContent.index() > visibleContent.index()) {
                            var classEnetering = 'selected enter-right',
                                classLeaving = 'leave-left';
                        } else {
                            var classEnetering = 'selected enter-left',
                                classLeaving = 'leave-right';
                        }

                        selectedContent.attr('class', classEnetering);
                        visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                            visibleContent.removeClass('leave-right leave-left');
                            selectedContent.removeClass('enter-left enter-right');
                        });
                        eventsContent.css('height', selectedContentHeight + 'px');
                    }

                    function updateOlderEvents(event) {
                        event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
                    }

                    function getTranslateValue(timeline) {
                        var timelineStyle = window.getComputedStyle(timeline.get(0), null),
                            timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
                            timelineStyle.getPropertyValue("-moz-transform") ||
                            timelineStyle.getPropertyValue("-ms-transform") ||
                            timelineStyle.getPropertyValue("-o-transform") ||
                            timelineStyle.getPropertyValue("transform");

                        if (timelineTranslate.indexOf('(') >= 0) {
                            var timelineTranslate = timelineTranslate.split('(')[1];
                            timelineTranslate = timelineTranslate.split(')')[0];
                            timelineTranslate = timelineTranslate.split(',');
                            var translateValue = timelineTranslate[4];
                        } else {
                            var translateValue = 0;
                        }

                        return Number(translateValue);
                    }

                    function setTransformValue(element, property, value) {
                        element.style["-webkit-transform"] = property + "(" + value + ")";
                        element.style["-moz-transform"] = property + "(" + value + ")";
                        element.style["-ms-transform"] = property + "(" + value + ")";
                        element.style["-o-transform"] = property + "(" + value + ")";
                        element.style["transform"] = property + "(" + value + ")";
                    }

                    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
                    function parseDate(events) {
                        var dateArrays = [];
                        events.each(function() {
                            var singleDate = $(this),
                                dateComp = singleDate.data('date').split('T');
                            if (singleDate.data('date')[0] === '"') {
                                dateComp = singleDate.data('date').substring(1, singleDate.data('date').length - 1).split('T')
                            }
                            if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                                var dayComp = dateComp[0].split('/'),
                                    timeComp = dateComp[1].split(':');
                                if (dateComp[1].indexOf('Z') >= 0) {
                                    dayComp = dateComp[0].split('-');
                                    var a = dayComp[0];
                                    dayComp[0] = dayComp[2];
                                    dayComp[2] = a;
                                }
                            } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                                var dayComp = ["2000", "0", "0"],
                                    timeComp = dateComp[0].split(':');
                            } else { //only DD/MM/YEAR
                                var dayComp = dateComp[0].split('/'),
                                    timeComp = ["0", "0"];
                            }
                            var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
                            dateArrays.push(newDate);
                        });
                        return dateArrays;
                    }

                    function daydiff(first, second) {
                        return Math.round((second - first));
                    }

                    function minLapse(dates) {
                        //determine the minimum distance among events
                        var dateDistances = [];
                        for (i = 1; i < dates.length; i++) {
                            var distance = daydiff(dates[i - 1], dates[i]);
                            // if(distance===0) distance=1;
                            dateDistances.push(distance);
                        }
                        return Math.min.apply(null, dateDistances);
                    }

                    /*
                        How to tell if a DOM element is visible in the current viewport?
                        http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
                    */
                    function elementInViewport(el) {
                        var top = el.offsetTop;
                        var left = el.offsetLeft;
                        var width = el.offsetWidth;
                        var height = el.offsetHeight;

                        while (el.offsetParent) {
                            el = el.offsetParent;
                            top += el.offsetTop;
                            left += el.offsetLeft;
                        }

                        return (
                            top < (window.pageYOffset + window.innerHeight) &&
                            left < (window.pageXOffset + window.innerWidth) &&
                            (top + height) > window.pageYOffset &&
                            (left + width) > window.pageXOffset
                        );
                    }

                    function checkMQ() {
                        //check if mobile or desktop device
                        return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
                    }
                },
                contorller: function($scope) {

                }
            }
        })
        .directive('cHeader', function($compile, bindItems, $timeout) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                template: " <div class='header-panel' ><div ng-transclude></div>  </div>",
                link: function(scope, elem, attr) {
                    if (scope.isShow === undefined)
                        scope.isShow = true;
                },
                contorller: function($scope) {
                    if ($scope.isShow === undefined)
                        $scope.isShow = false;
                }
            }
        })
        .directive('cPanel', [
            'TextHelper',
            function(textHelper) {
                return {
                    restrict: 'E',
                    transclude: true,
                    scope: {},
                    controllerAs: 'ctrl',
                    bindToController: {
                        header: '=?',
                        item: '=?',
                    },
                    template: "<div class=' grid_12 panel panel-default'><div class='panel-heading'><span ng-class='{rotate180:isToggle,rotate360:!isToggle}' ng-click='toggle()' ng-hide='hideToggle' class='icon fa fa-chevron-up'></span>{{caption}}</div><div class='panel-body animated' ng-transclude ng-class='{slideOutDown:isToggle,slideInDown:!isToggle}'></div></div>",
                    link: function(scope, elem, attr) {
                        var panel = $(elem).find('.panel-place');
                        panel.remove();
                        $(elem).find('.panel-heading').append(panel);
                        if (attr.hide === 'true')
                            $(elem).find('.panel-heading').css({
                                'display': 'none'
                            });
                    },
                    controller: function($scope, $element, $timeout) {

                        $scope.hideToggle = false;
                        if ($($element).attr('disabled'))
                            $scope.hideToggle = true;

                        $scope.isToggle = false;
                        $scope.toggle = function() {
                            $scope.isToggle = !$scope.isToggle;
                            if ($scope.isToggle) {
                                var element = $($element).find('.panel-heading')
                                $($element).attr('data-height', $($element).find('.panel-default').height());
                                $($element).find('.panel-default').animate({
                                    height: element.height() + 21
                                }, 500, function() {});
                                //alert(element.height());
                            } else {
                                var element = $($element).find('.panel-heading');
                                $($element).find('.panel-default').animate({
                                    height: $($element).attr('data-height')
                                }, 500, function() {
                                    $($element).height(element.height());
                                });
                            }
                        }
                        if ($($element).attr('real') !== 'true')
                            $scope.caption = textHelper.convertToStatement($scope.ctrl.header, 1);
                        else
                            $scope.caption = textHelper.convertToStatement($scope.ctrl.header, undefined, 3);
                        $scope.$watch('item2', function(e) {
                            if (e === undefined) return;
                            if (e[$scope.header] !== undefined) {
                                $scope.caption = e[$scope.header];
                            }
                        });
                    }
                }
            }
        ]).directive('cTranslate', ['TextHelper', function(textHelper) {
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, elem, attr) {

                },
                controller: function($scope, $element) {
                    $element.html(textHelper.convertToStatement($element.html(), 1));
                }
            }
        }])
        .directive('cNormalTidakNormal', function($compile, bindItems, $timeout) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    isShowForm: '=?',
                    selanjutnya: '=?'
                },
                template: "<div ng-hide='isShowForm'>" +
                    "<div class='grid_12'>" +
                    "<div class='grid_6'>" +
                    "<button class='btnShowNormalTidakNormal' ng-click='selanjutnya()' style='position:relative'>" +
                    "<img src='stylesheets/yes.png' style='left: 19px;position: absolute;top: 13px;right: 20px;'/><span style='top: 51%;position: absolute;right:10px'>Normal</span></button>" +
                    "</div>" +
                    "<div class='grid_6'>" +
                    "<button class='btnShowNormalTidakNormal' style='position:relative' ng-click='showForm()'><span style='top: 51%;position: absolute;right:10px'>Tidak Normal</span><img src='stylesheets/no.png' style='left: 19px;position: absolute;top: 13px;right: 20px;'/></button>" +
                    "</div>" +
                    "</div>" +
                    "</div>",

                link: function(scope, elem, attr) {

                },
                controller: function($scope) {
                    $scope.isShowForm = true;
                    $scope.showForm = function() {
                        $scope.isShowForm = true;
                    }
                }
            }
        })
        .directive('cLoading', function($compile, bindItems, $timeout) {
            return {
                restrict: 'E',
                scope: {
                    isShow: '=?',
                    message: '=?',
                    isModal: '=?'
                },
                template: "<div ng-class='{background_loading:isModal}' ng-show='isShow'></div><div class='wrap' ng-show='isShow'> <div class='loading'> <div class='bounceball' ></div> <div class='text' >Sedang Menunggu</div> <br /><h1>{{message}}</h1>  </div> </div>",
                link: function(scope, elem, attr) {
                    scope.$watch('isModal', function(e) {});
                    if (scope.isShow === undefined)
                        scope.isShow = true;
                },
                controller: function($scope) {

                    if ($scope.isShow === undefined)
                        $scope.isShow = false;
                }
            }
        })
        .directive('cSideNav', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},

                template: "<div ng-class='{side_right: ctrl.position===\"right\"}' style='z-index:5;position:absolute;top:{{ctrl.top}}px'>" +
                    "          <div ng-hide='ctrl.hideToggle' class='side-nav-hide animated'  ng-class='{slideInLeft:ctrl.isOpen ,slideOutLeft:!ctrl.isOpen }'>" +
                    "            <i  class='fa ' ng-class='{\"fa-angle-left\": ctrl.position===\"right\",\"fa-angle-right\":ctrl.position!==\"right\"}'  ng-click='toggle()'></i>" +
                    "          </div>" +
                    "              <div class='side-nav header animated' ng-class='{slideOutLeft:ctrl.isOpen && ctrl.position!==\"right\",slideInLeft:!ctrl.isOpen && ctrl.position!==\"right\",  slideOutRight:ctrl.isOpen && ctrl.position===\"right\",slideInRight:!ctrl.isOpen && ctrl.position===\"right\" }'>" +
                    "               <i ng-hide='ctrl.hideToggle' class='fa ' ng-class='{\"fa-angle-left\": ctrl.position!==\"right\",\"fa-angle-right\":ctrl.position===\"right\"}' ng-click='toggle()'></i>" +
                    "               <span class='title' style='margin-left:13px'>{{ctrl.header}}</span>" +
                    "           </div>" +
                    "        <div  class='parent-side-nav animated' style='height:{{height}}' ng-class='{slideOutLeft:ctrl.isOpen && ctrl.position!==\"right\",slideInLeft:!ctrl.isOpen && ctrl.position!==\"right\",  slideOutRight:ctrl.isOpen && ctrl.position===\"right\",slideInRight:!ctrl.isOpen && ctrl.position===\"right\" }'>" +

                    "           <span  ng-transclude></span>" +
                    "       </div>" +
                    "      </div>",
                controllerAs: 'ctrl',
                bindToController: {
                    header: '=?',
                    isOpen: '=?',
                    isTablet: '=?',
                    top: '=?',
                    hideToggle: '=?',
                    position: '=?'

                },
                link: function(scope, elem, attr) {
                    if (scope.isShow === undefined)
                        scope.isShow = true;
                },
                controller: function($scope, $element, $timeout) {
                    if ($scope.ctrl.top === undefined)
                        $scope.ctrl.top = 0;

                    if ($scope.ctrl.isOpen === undefined)
                        $scope.ctrl.isOpen = $(window).width() < 960;
                    $scope.$watch('ctrl.isOpen', function(e) {
                        setTimeout(function() {
                            if ($scope.ctrl.hideToggle)
                                if (e)
                                    $($element).find('div').css('display', 'none');
                        }, 1000);
                        if ($scope.ctrl.hideToggle)
                            if (!e)
                                $($element).find('div').css('display', 'inherit');

                    });

                    $(window).on('resize', function() {
                        // if (!$scope.ctrl.hideToggle) {
                        //     $scope.ctrl.isOpen = $(this).width() < 960;
                        //     $scope.ctrl.isTablet = $(this).width() < 960;
                        // }
                        if ($scope.height === undefined) {
                            var element = $($element).find('div')[0];
                            var pos = $(element).position();
                            var header = $(($element).find('.side-nav')[0]);
                            var height = $(window).height();
                            $scope.height = (height - pos.top - header.height() + $scope.ctrl.top) + 'px';
                        }
                        $scope.$apply();
                    });

                    // $scope.isOpen = false;
                    $scope.ctrl.isTablet = $(window).width() < 960;
                    if ($scope.isShow === undefined)
                        $scope.isShow = false;

                    if ($scope.ctrl.header === undefined) {
                        $scope.ctrl.header = 'Header';
                    }
                    $scope.toggle = function() {
                        $scope.ctrl.isOpen = !$scope.ctrl.isOpen;
                    }
                }
            }
        })
        .directive('treeBind', function($compile, bindItems, $timeout) {
            return {
                scope: {
                    items: '=?data',
                    options: '=?options'
                },
                link: function(scope, elem, attr) {
                    scope.$watch('items', function(e) {
                        var menus = e;
                        var html = bindItems(menus);
                        elem[0].innerHTML = html; //($compile(html)(scope));
                        var item = elem.children()[0];

                        if ($.isFunction($(item).kendoPanelBar))
                            $(item).kendoPanelBar({
                                'k-options': scope.options,
                                select: function onSelect(e, f, g, h) {
                                    if ($(e.item).attr('data-link') !== 'undefined') {
                                        window.location = $(e.item).attr('data-link');
                                    }
                                }
                            });
                        else {
                            kendoPanelBar.init($(item, {
                                'k-options': scope.options,
                                select: function onSelect(e, f, g, h) {
                                    if ($(e.item).attr('data-link') !== 'undefined') {
                                        window.location = $(e.item).attr('data-link');
                                    }
                                }
                            }));
                        }

                    });
                    if (scope.items !== undefined) {


                    }

                }
            }
        })
        .directive('cContent', function($compile, bindItems, $timeout, $window) {
            return {
                link: function(scope, elem, attr) {
                    elem.addClass('c-frame');
                    var children = elem.children().find("input");
                    for (var i = 0; i < children.length; i++) {
                        if ($(children[i]).attr('data-key') !== undefined) {
                            var sender = $(children[i]);
                            scope.$watch(sender.attr('data-key'), function(e) {
                                sender.val(e);
                            })
                            sender.on('blur', function() {
                                var arr = sender.attr('data-key').split('.');
                                scope[arr[0]][arr[1]] = sender.val();
                                scope.$apply();
                            })
                        }
                    }
                }
            }
        })
        .directive('cInfo', [
            'TextHelper',
            function(textHelper) {
                return {
                    scope: {},
                    replac: true,
                    bindToController: {
                        text: '=?'
                    },
                    controllerAs: "ctrl",
                    link: function(scope, elem, attr) {
                        scope.$watch('ctrl.text', function(e) {
                            if (scope.ctrl.text === undefined)
                                $(elem).html('&nbsp;');
                            else
                                $(elem).html(scope.ctrl.text);
                        });
                        if (scope.ctrl.text === undefined)
                            $(elem).html('&nbsp;');
                        else
                            $(elem).html(scope.ctrl.text);
                    },
                    controller: function($scope) {

                    }

                }
            }
        ])
        .directive('cLabel', [
            'TextHelper',
            function(textHelper) {
                return {
                    scope: {},
                    bindToController: {
                        item: '=?'
                    },
                    controllerAs: "ctrl",
                    link: function(scope, elem, attr) {
                        elem.addClass('c-label');
                        var cls = attr.class;
                        if (cls === undefined)
                            cls = "";
                        var text = cls.indexOf('title');
                        if (text === -1) {
                            if ($(elem).parent().attr('class') !== undefined)
                                text = $(elem).parent().attr('class').indexOf('title');
                            if (text === -1) {
                                text = (attr.statment !== undefined ? 0 : -1);
                            }
                        }
                        if (attr.noBold === '') {
                            $(elem).css({
                                'fontWeight': 'Normal'
                            });
                        }

                        if (attr.fontSize !== undefined && attr.fontSize !== '') {
                            $(elem).css({
                                'fontSize': attr.fontSize
                            });
                        }
                        var isReal = attr.real;
                        if (attr.cLabelText !== '')
                            $(elem).html(textHelper.convertToStatement(attr.cLabelText, text, isReal));
                        else
                            $(elem).html('&nbsp;');
                        scope.$watch('ctrl.item', function(e) {
                            if (e !== undefined)
                                if (attr.cLabelText !== undefined) {
                                    var attribute = _.where(e.attributes, {
                                        'name': attr.cLabelText
                                    });
                                    var isReal = attr.real;
                                    if (attribute.length !== 0) {
                                        $(elem).html(attribute[0].caption);
                                    } else {
                                        $(elem).html(textHelper.convertToStatement(attr.cLabelText, isReal));
                                    }

                                }
                        })
                    },
                    controller: function() {}
                }
            }
        ])
        .directive('cLabelInfo', function($compile, bindItems, $timeout, $window) {
            return {
                link: function(scope, elem, attr) {
                    elem.addClass('c-label-info');
                }
            }
        })
        .directive('cNumber', function($compile, bindItems, $timeout, $window) {
            return {
                link: function(scope, elem, attr) {
                    elem.addClass('c-label-info');
                }
            }
        })
        .directive('cNone', function($compile, bindItems, $timeout, $window) {
            return {
                restrict: 'E',
                link: function(scope, elem, attr) {
                    elem.addClass('c-none');
                    elem[0].innerHTML = '<span class="c-none" style="height:200px;">&nbsp;</span>';
                }
            }
        })
        .directive('isValidate', function($compile, bindItems, $timeout, $window) {
            return {
                controller: function($scope, $element) {
                    if ($scope.item !== undefined) {
                        var listNotNull = $scope.item.NotNulls;
                        var listHasValidate = [];
                        for (var item in listNotNull) {
                            var data = $scope.item[listNotNull[item]];
                            if ($($element).attr('ng-model') === 'item.' + listNotNull[item].name || $($element).attr('k-ng-model') === 'item.' + listNotNull[item].name) {
                                if (listNotNull[item].lengthLength !== undefined)
                                    $($element).attr('maxLength', listNotNull[item].lengthLength);
                                break;
                            }
                        }
                    }
                }
            }
        })
        .directive('cButtonHeader', ['Validation', function(validation) {
            return {
                restrict: 'E',
                transclude: true,
                require: 'cButtonHeader',
                template: "<div  ng-show='isShow' ng-click='validationClick()' data='{{isShow}}' class='c-button-header'><a class='{{icon}}'></a><span ng-transclude >{{text}}</span></div>",
                scope: {
                    ngShow: '=?',
                    text: '=?',
                    item: '=?',
                    'click': '=?',
                },
                link: function(scope, elem, attr) {
                    scope.isShow = scope.ngShow === undefined ? true : scope.ngShow;
                    scope.$watch('ngShow', function(e) {
                        if (e !== undefined)
                            scope.isShow = e;
                    });
                    for (var i in attr) {
                        if (!(attr[i] instanceof Object))
                            if (scope[i] === undefined) {
                                if (i.indexOf('on') !== 0)
                                    scope[i] = attr[i];
                            }
                    }
                    //scope.icon = attr.icon;                
                },
                controller: function($scope, $element, $timeout) {
                    function onClick() {
                        if ($($element).attr('is-validate') !== undefined) {

                            var parent = $($element).parent();
                            while (true) {
                                if (parent[0].localName === 'c-content') {
                                    break;
                                }
                                if (parent[0].nodeName === 'BODY')
                                    break;
                                parent = $(parent).parent();
                            }
                            if ($scope.item !== undefined) {
                                var listNotNull = $scope.item.attributes;
                                listNotNul = _.filter(listNotNull, {
                                    isNull: true
                                });
                                if ($scope.item.attributes === undefined || ($scope.item.attributes !== undefined && $scope.item.attributes.length === 0)) {
                                    $scope.click();
                                    return;
                                }
                                var children = parent.children().find('input');
                                var list = [];
                                for (var i in children) {
                                    if (children[i].className !== undefined && (children[i].className.indexOf('k-input') > -1 || children[i].className.indexOf('k-textbox') > -1)) {
                                        {
                                            if ($(children[i]).is(':visible'))
                                                list.push(children[i]);
                                        }
                                    }
                                }
                                children = list;
                                var isFocus = false;
                                var isValid = true;
                                var listHasValidate = [];

                                for (var item in listNotNull) {
                                    var data = $scope.item[listNotNull[item].name];
                                    if (data === undefined || data === null || data === '') {
                                        if (listNotNull[item].isNull === true)
                                            for (var child in children) {
                                                var ctrl = $(children[child]);
                                                var ngModel = ctrl.attr('ng-model');
                                                if (ngModel === undefined) {
                                                    ngModel = $(ctrl).attr('k-ng-model');
                                                    if (ngModel === undefined) {
                                                        ctrl = ctrl.parent().parent().children()[1];
                                                        ngModel = $(ctrl).attr('ng-model');
                                                        if (ngModel === undefined)
                                                            ngModel = $(ctrl).attr('k-ng-model');
                                                    }
                                                }
                                                if (ngModel === 'item.' + listNotNull[item].name) {

                                                    if (listNotNull[item].isNull === true) {
                                                        if (!$(ctrl).is(":disabled") && $(ctrl).is(":visible")) {
                                                            if (!isFocus)
                                                                $(ctrl).focus();
                                                            isFocus = true;
                                                            window.messageContainer.error(listNotNull[item].messagesRequired);
                                                            $(ctrl).addClass('error');
                                                            listHasValidate.push($(ctrl));
                                                            isValid = false;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                    } else {
                                        for (var child in children) {
                                            var ctrl = $(children[child]);
                                            var ngModel = ctrl.attr('ng-model');
                                            if (ngModel === undefined) {
                                                ngModel = $(ctrl).attr('k-ng-model');
                                                if (ngModel === undefined) {
                                                    ctrl = ctrl.parent().parent().children()[1];
                                                    ngModel = $(ctrl).attr('ng-model');
                                                    if (ngModel === undefined)
                                                        if (ngModel === undefined)
                                                            ngModel = $(ctrl).attr('k-ng-model');
                                                }

                                            }
                                            if (ngModel === 'item.' + listNotNull[item].name) {
                                                $(children[child]).removeClass('error');
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else
                                $scope.click();
                            if (isValid)
                                $scope.click();

                        }
                        if ($($element).attr('is-clear') !== undefined) {
                            var parent = $($element).parent();
                            while (true) {
                                if (parent[0].localName === 'c-content') {
                                    break;
                                }
                                if (parent[0].nodeName === 'BODY')
                                    break;
                                parent = $(parent).parent();
                            }
                            var children = parent.children().find('input');
                            var list = [];
                            for (var i in children) {
                                if (children[i].className !== undefined && (children[i].className.indexOf('k-input') > -1 || children[i].className.indexOf('k-textbox') > -1)) {
                                    {
                                        if ($(children[i]).is(':visible'))
                                            list.push(children[i]);
                                    }
                                }
                            }
                            for (var j = 0; j < list.length; j++) {
                                $(list[j]).removeClass('error');
                                var ctrl = $(list[j]);
                                var name = "";
                                var ngModel = ctrl.attr('ng-model');
                                if (ngModel === undefined) {
                                    ngModel = $(ctrl).attr('k-ng-model');

                                    if (ngModel === undefined) {
                                        ctrl = ctrl.parent().parent().children()[1];
                                        ngModel = $(ctrl).attr('ng-model');
                                        if (ngModel === undefined)
                                            ngModel = $(ctrl).attr('k-ng-model');
                                    }
                                    var arr = ngModel.split('.');
                                    name = arr[1];
                                    if ($scope.item !== undefined)
                                        $scope.item[name] = "";
                                } else {
                                    var arr = ngModel.split('.');
                                    name = arr[1];
                                    if ($scope.item !== undefined)
                                        if ($scope.item[name] !== undefined)
                                            $scope.item[name] = "";
                                }
                            }
                        }
                    }
                    $scope.validationClick = function() {
                        $(".panel-message").html("");

                        if ($($element).attr('is-must-authentication') !== undefined) {
                            $($element).removeAttr('is-must-authentication');
                            validation.Show($scope, function(username, password) {
                                onClick();
                                $($element).attr('is-must-authentication');
                            });
                        } else {
                            onClick();
                        }
                    }
                }
            }
        }])
        .directive('isBack', ['Validation', function(validation) {
            return {
                restrict: 'A',

                link: function link(scope, element, attrs) {
                    $(element).on('click', function() {
                        history.go(-1);
                    });

                }
            }
        }])
        .directive('cButton', ['Validation', function(validation) {
            return {
                restrict: 'E',
                transclude: true,
                //require: 'Button',
                template: '<button class="c-button {{class}}"  ng-click="validationClick()">' +
                    '<div class="fa {{ctrl.icon}}" style="float: {{ctrl.position}};px;min-width:{{ctrl.size}}px;">&nbsp;</div>' +
                    '<div style="position: relative;margin-right: auto;margin-left: auto;width: auto">' +
                    ' ' +
                    ' <span  style="float: initial" ng-transclude></span>' +
                    '</div>' +
                    '</button>',
                scope: {},
                controllerAs: 'ctrl',
                bindToController: {
                    text: '=?',
                    item: '=?',
                    link: '=?',
                    icon: '=?',
                    size: '=?',
                    position: '=?',
                    'click': '=',
                },
                link: function(scope, elem, attr) {
                    if (scope.ctrl !== undefined) {
                        if (scope.ctrl.size === undefined) {
                            scope.ctrl.size = 24;
                        }
                        if (scope.ctrl.position === undefined) {
                            scope.ctrl.position = 'left';
                        }
                    }
                    scope.class = attr.class;
                    scope.isShow = scope.ngShow === undefined ? true : scope.ngShow;
                    scope.$watch('ngShow', function(e) {
                        if (e !== undefined)
                            scope.isShow = e;
                    });
                    for (var i in attr) {
                        if (!(attr[i] instanceof Object))
                            if (scope[i] === undefined) {
                                if (i.indexOf('on') !== 0) { //scope[i] = attr[i];
                                }
                            }
                    }
                },
                controller: function($scope, $element, $timeout) {
                    function onClick() {
                        if ($($element).attr('is-validate') !== undefined) {
                            var parent = $($element).parent();
                            while (true) {
                                if (parent[0].localName === 'c-form') {
                                    break;
                                }
                                if (parent[0].nodeName === 'BODY')
                                    break;
                                parent = $(parent).parent();
                            }
                            if ($scope.ctrl.item !== undefined) {
                                var listNotNull = $scope.ctrl.item.attributes;
                                listNotNul = _.filter(listNotNull, {
                                    isNull: true
                                });
                                if ($scope.ctrl.item.attributes === undefined || ($scope.ctrl.item.attributes !== undefined && $scope.ctrl.item.attributes.length === 0)) {
                                    if ($scope.ctrl !== undefined && $scope.ctrl.click !== undefined)
                                        $scope.ctrl.click();
                                    return;
                                }
                                var children = parent.children().find('input,textarea');
                                var list = [];
                                for (var i in children) {
                                    if (children[i].className !== undefined && (children[i].localName.indexOf('textarea') >= 0 || children[i].className.indexOf('k-input') > -1 || children[i].className.indexOf('k-textbox') > -1)) {
                                        {

                                            if ($(children[i]).is(':visible') || $(children[i])[0].localName.indexOf('textarea') >= 0 || $(children[i]).attr('kendo-combo-box') !== undefined)
                                                list.push(children[i]);
                                        }
                                    }
                                }
                                children = list;
                                var isFocus = false;
                                var isValid = true;
                                var listHasValidate = [];

                                for (var key in list) {
                                    if (list.hasOwnProperty(key)) {
                                        var element = list[key];
                                        if ($(element).attr('required') !== undefined) {
                                            var data = $(element).val();
                                            if (data === undefined || data === null || data === '' || (!(data instanceof Date) && data instanceof Object && data.id === undefined)) {
                                                if (!isFocus)
                                                    $(element).focus();
                                                isFocus = true;
                                                $(element).addClass('error');
                                                listHasValidate.push($(element));
                                                isValid = false;
                                            } else {
                                                $(element).removeClass('error');
                                            }
                                        }
                                    }
                                }
                                for (var item in listNotNull) {
                                    var data = $scope.ctrl.item[listNotNull[item].name];
                                    var dd = listNotNull[item].name;
                                    if (data === undefined || data === null || data === '' || (!(data instanceof Date) && data instanceof Object && data.id === undefined)) {
                                        if (listNotNull[item].isNull === false || listNotNull[item].isNull === 'false')
                                            for (var child in children) {
                                                var ctrl = $(children[child]);
                                                var ngModel = ctrl.attr('ng-model');
                                                if (ngModel === undefined) {
                                                    ngModel = $(ctrl).attr('k-ng-model');
                                                    if (ngModel === undefined) {
                                                        ctrl = ctrl.parent().parent().children()[1];
                                                        ngModel = $(ctrl).attr('ng-model');
                                                        if (ngModel === undefined)
                                                            ngModel = $(ctrl).attr('k-ng-model');
                                                    }
                                                }
                                                if (ngModel === 'item.' + listNotNull[item].name) {

                                                    if (listNotNull[item].isNull === false || listNotNull[item].isNull === 'false') {
                                                        if (!$(ctrl).is(":disabled") && $(ctrl).is(":visible")) {
                                                            if (!isFocus)
                                                                $(ctrl).focus();
                                                            isFocus = true;
                                                            window.messageContainer.error(listNotNull[item].messagesRequired);
                                                            $(ctrl).addClass('error');
                                                            listHasValidate.push($(ctrl));
                                                            isValid = false;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                    } else {
                                        for (var child in children) {
                                            var ctrl = $(children[child]);
                                            var ngModel = ctrl.attr('ng-model');
                                            if (ngModel === undefined) {
                                                ngModel = $(ctrl).attr('k-ng-model');
                                                if (ngModel === undefined) {
                                                    ctrl = ctrl.parent().parent().children()[1];
                                                    ngModel = $(ctrl).attr('ng-model');
                                                    if (ngModel === undefined)
                                                        if (ngModel === undefined)
                                                            ngModel = $(ctrl).attr('k-ng-model');
                                                }

                                            }
                                            if (ngModel === 'item.' + listNotNull[item].name) {
                                                $(children[child]).removeClass('error');
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else
                            if ($scope.ctrl !== undefined && $scope.ctrl.click !== undefined)
                                $scope.ctrl.click();

                            if (isValid)
                                if ($scope.ctrl !== undefined && $scope.ctrl.click !== undefined)
                                    $scope.ctrl.click();

                        } else {
                            if ($scope.ctrl !== undefined && $scope.ctrl.click !== undefined)
                                $scope.ctrl.click();
                        }
                        if ($($element).attr('is-clear') !== undefined) {
                            var parent = $($element).parent();
                            while (true) {
                                if (parent[0].localName === 'c-content') {
                                    break;
                                }
                                if (parent[0].nodeName === 'BODY')
                                    break;
                                parent = $(parent).parent();
                            }
                            var children = parent.children().find('input');
                            var list = [];
                            for (var i in children) {
                                if (children[i].className !== undefined && (children[i].className.indexOf('k-input') > -1 || children[i].className.indexOf('k-textbox') > -1)) {
                                    {
                                        if ($(children[i]).is(':visible'))
                                            list.push(children[i]);
                                    }
                                }
                            }
                            for (var j = 0; j < list.length; j++) {
                                $(list[j]).removeClass('error');
                                var ctrl = $(list[j]);
                                var name = "";
                                var ngModel = ctrl.attr('ng-model');
                                if (ngModel === undefined) {
                                    ngModel = $(ctrl).attr('k-ng-model');

                                    if (ngModel === undefined) {
                                        ctrl = ctrl.parent().parent().children()[1];
                                        ngModel = $(ctrl).attr('ng-model');
                                        if (ngModel === undefined)
                                            ngModel = $(ctrl).attr('k-ng-model');
                                    }
                                    var arr = ngModel.split('.');
                                    name = arr[1];
                                    if ($scope.ctrl.item !== undefined)
                                        $scope.ctrl.item[name] = "";
                                } else {
                                    var arr = ngModel.split('.');
                                    name = arr[1];
                                    if ($scope.ctrl.item !== undefined)
                                        if ($scope.ctrl.item[name] !== undefined)
                                            $scope.ctrl.item[name] = "";
                                }
                            }
                        }
                        // $scope.$apply();
                    }
                    $scope.validationClick = function() {

                        $(".panel-message").html("");

                        if ($scope.ctrl.link !== undefined) {
                            var link = $scope.ctrl.link;
                            for (var j = 0; j < 3; j++) {
                                link = link.replace('"', '').replace("'", '');
                            }
                            window.location = link;
                            return;
                        }
                        if ($($element).attr('is-must-authentication') !== undefined) {
                            $($element).removeAttr('is-must-authentication');
                            $scope.module = $($element).attr('module');
                            validation.Show($scope, function(username, password, module) {
                                $($element).attr('is-must-authentication', '');
                                onClick();

                            }, function() {
                                $($element).attr('is-must-authentication', '');
                            });
                        } else {
                            onClick();
                        }
                    }
                }
            }
        }])
        .directive('isMustAuthentication', ['Validation', function(validation) {
            return {
                link: function(scope, $element, attr) {
                    if ($($element).attr('is-must-authentication') !== undefined) {
                        $($element).on('focus', function() {
                            if ($($element).attr('is-must-authentication') !== undefined) {
                                $($element).removeAttr('is-must-authentication');
                                $($element).attr('data-must', 'is-must-authentication');
                                $($element).prop('disabled', true);
                                validation.Show(scope, function(username, password) {

                                }, function() {
                                    $($element).removeAttr('is-must-authentication');
                                    $($element).attr('data-must', 'is-must-authentication');
                                    $($element).prop('disabled', false);
                                    $($element).focus();
                                });
                            }

                        });
                        $($element).on('blur', function() {
                            $($element).attr($($element).attr('data-must'), '');
                            $($element).removeAttr('data-must');
                        });
                    }
                }
            }
        }])
        .directive('cTextBox', ['Validation', function(validation) {
            return {
                restrict: 'A',
                scope: {
                    isEnabled: "=isEnabled",
                    filter: "=?",
                    isBusy: "=?"
                },
                link: function(scope, $element, attr) {
                    var element = $element;
                    $($element).parent().css({
                        'position': 'relative'
                    });
                    if (attr.top === undefined) {
                        if ($($element).position().top === 0)
                            attr.top = 8;
                        else
                            attr.top = 24;
                    }

                    var loading = $('<img ng=show="\'isBusy\' style="position:absolute;right:0;top:' + attr.top + 'px;" height="24" src="stylesheets/Flat/loading-image.gif" />').appendTo($element.parent());
                    loading.hide();
                    scope.$watch('isBusy', function(e) {
                        if (e === true)
                            loading.show();
                        else
                            loading.hide();

                    })

                    $element.addClass('c-text-box');
                    if (scope.filter !== undefined)
                        $($element).on('keydown', function(e) {
                            if (!(e.keyCode === 8 || e.keyCode === 32 || e.keyCode === 9)) {
                                if (scope.filter === 'string') {
                                    if ((e.keyCode >= 48 && e.keyCode <= 57))
                                        e.preventDefault();
                                }
                                if (scope.filter === 'numeric') {
                                    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {} else
                                        e.preventDefault();
                                }
                            }

                        });
                    scope.$on('is-must-authentication', function(e, eh, f, g) {
                        $($element).on('focus', function() {
                            if ($($element).attr('is-must-authentication') !== undefined) {
                                $($element).removeAttr('is-must-authentication');
                                $($element).attr('data-must', 'is-must-authentication');
                                $($element).prop('disabled', true);
                                validation.Show(scope, function(username, password) {

                                }, function() {
                                    $($element).removeAttr('is-must-authentication');
                                    $($element).attr('data-must', 'is-must-authentication');
                                    $($element).prop('disabled', false);
                                    $($element).focus();
                                }, $(element));
                            }

                        });
                        $($element).on('blur', function() {
                            $($element).attr($($element).attr('data-must'), '');
                            $($element).removeAttr('data-must');
                        });
                    });
                }
            }
        }])
        .directive('mContent', function($compile, bindItems, $timeout, $document) {
            return {
                restrict: 'A',
                scope: {},
                controllerAs: 'ctrl',
                bindToController: {
                    cWidth: '=?',
                },


                transclude: true,
                template: "<div class='m-content'>" +
                    "           <div ng-transclude>" +
                    "      </div>",
                link: function(scope, elem, attr) {
                    var window = this;

                },
                controller: function($rootScope, $scope, $timeout, $element) {
                    $scope.$watch('ctrl.cWidth', function(e) {
                        $($element).width(e);
                    });
                }
            }
        })
        .directive('textLoading', function() {
            return {
                restrict: 'E',
                scope: {
                    busy: '=?'
                },
                link: function(scope, elem, attr) {
                    var window = this;
                    if (attr.top !== undefined && attr.top !== '')
                        $(elem).find('img').css({
                            'top': attr.top + 'px'
                        });
                },
                controller: function($scope, $timeout, $element) {
                    $($element).parent().css({
                        'position': 'relative'
                    });
                    $element.html('<img  style="position:absolute;right:0;top:0;" height="24" src="stylesheets/Flat/loading-image.gif" />')
                }
            }
        })
        .directive('cForm', function() {
            return {
                restrict: 'E',
                scope: {
                    item: '=?',
                    disabled: '=?'
                },
                controller: function($scope, $timeout, $element) {
                    $scope.$watch('disabled', function(e) {
                        if (e === undefined) return;
                        if (e === true) {
                            $($element).children().find('*').attr("disabled", "disabled").off('click');
                        } else if (e === false) {
                            $($element).children().find('*').removeAttr("disabled");
                        }
                    });
                    $scope.$watch('item2', function(e) {
                        var scope = $scope;
                        var elemet = $element;
                        var children = $(elemet).children().find('input,textarea');
                        var list = [];
                        for (var i in children) {
                            if (children[i] !== undefined && children[i].className !== undefined) {
                                var className = children[i].className;
                                if (children[i].className !== undefined && (children[i].className.indexOf('k-input') > -1 || children[i].className.indexOf('k-textbox') > -1)) {
                                    if ($(children[i]).is(':visible'))
                                        list.push(children[i]);
                                }
                            }
                        }
                        var listMaxLength = _.filter(list, function(num) {
                            return num.className.indexOf('k-textbox') > -1 || num.className.indexOf('k-input') > -1;
                        })
                        var items = scope.item;
                        if (items != null) {
                            var notNulls = items.attributes;
                            for (var j = 0; j < listMaxLength.length; j++) {
                                var temp = "";
                                var ctrl = $(listMaxLength[j]);
                                if (ctrl.attr('class').indexOf('k-input') < 0) {
                                    if (ctrl.attr('ng-model') !== undefined)
                                        temp = ctrl.attr('ng-model').replace('item.', '');
                                } else {
                                    if (ctrl.attr('ng-model') === undefined) {
                                        ctrl = $(ctrl.parent().parent().children()[1]);
                                    }
                                    if (ctrl.attr('ng-model') !== undefined)
                                        temp = ctrl.attr('ng-model').replace('item.', '');
                                }
                                var control = _.filter(notNulls, function(n) {
                                    return n.name.toLowerCase() === temp.toLowerCase();
                                });
                                if (control[0] !== undefined) {

                                    $(listMaxLength[j]).attr('maxlength', control[0].length);

                                    if (control[0].isNull === true) {
                                        $(listMaxLength[j]).attr('is-validate', 'is');
                                        var item = $(listMaxLength[j]);
                                        item.on('keydown ', function() {
                                            $(this).removeClass('error');
                                        });
                                        item.on('blur', function() {
                                            if ($(this).val() === '') {
                                                var ctrl = $(this).parent().children()[0];
                                                $(this).addClass('error');
                                            } else
                                                $(this).removeClass('error');
                                        });
                                    }
                                }
                            }


                        }
                        var count = 0;

                        for (var i in list) {
                            if (list[i].localName === 'input' || list[i].localName === 'textarea') {
                                count++;
                                var temp = i;
                                $(list[i]).attr('index', i);
                                $(list[i]).on('keydown', function(e) {

                                    if (e.keyCode === 13) {
                                        var temp = $(this).attr('index');
                                        if (temp < count) {
                                            $(list[parseInt(temp) + 1]).focus();
                                        }
                                    }
                                })
                            } else {
                                break;
                            }
                        }

                    })

                }
            }
        })
        .directive('coreBusy', function() {
            return {
                scope: {
                    busy: "=?"
                },
                template: '<div ng-show="busy" class="k-loading-mask" style="width: 100%; height: 100%; top: 0px; left: 0px;"> <span class="k-loading-text">Loading...</span><div class="k-loading-image"></div> <div class="k-loading-color"></div></div>',
                controller: function($scope) {
                    $scope.$watch('busy', function(e) {})
                }
            }
        })

    .directive('coreLoginWindow', ['socket', function(socket) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    'login': '&?onLogin',
                    isLoading: '='
                },
                templateUrl: 'resources/template/my-login-screen.html',
                link: function(scope) {
                    scope.isLoading = false;
                    scope.keyDown = function(data) {
                        if (data.code === 'Enter') {
                            scope.validate();
                        }
                    };
                    scope.$watch('isLoading', function(e) {})
                    scope.validate = function() {
                        if ((scope.userName !== '' && scope.userName !== undefined) && scope.password !== '' && scope.password !== undefined) {
                            scope.isLoading = true;
                            scope.login({
                                userName: scope.userName,
                                password: scope.password
                            });
                        } else {
                            if (scope.userName === '')
                                // focus('userName');
                                toastr.info('Username masih kosong');
                            else
                                focus('password');
                                toastr.error('Username dan password salah!');
                            scope.notification.show("User Id atau kata kunci belum terisi", "info");
                        }
                    }
                    scope.reset = function() {
                        scope.userName = '';
                        scope.password = "";
                    }

                    function guid() {
                        function s4() {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                .toString(16)
                                .substring(1);
                        }
                        return s4() + s4() + s4() + s4() +
                            s4() + s4() + s4() + s4();
                    }

                    scope.showPageLogin = false;
                    function readCookie(name) {
                        var nameEQ = name + "=";
                        var ca = document.cookie.split(';');
                        for(var i=0;i < ca.length;i++) {
                            var c = ca[i];
                            while (c.charAt(0)==' ') c = c.substring(1,c.length);
                            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                        }
                        return null;
                    }

                    if(readCookie('authorization') != null){
                        window.location = "/app/#/home";
                        scope.showPageLogin = false;
                    }
                    else{
                        scope.showPageLogin = true;
                    }


                    var norec = guid();
                    socket.on(norec, function(e) {
                        scope.userName = e.message.userName;
                        scope.password = e.message.password;
                        scope.validate();
                    })
                    scope.qrcode = window.location.origin + '/app/mobile-authentication/' + norec;
                }
            };
        }])
        .directive('coreLoginForm', function(focus) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    'login': '&?onLogin',
                    isLoading: '=?busy',
                    message: '=?'
                },
                templateUrl: 'resources/template/my-login-form.html',
                controller: function($scope) {

                },
                link: function(scope) {
                    scope.isLoading = false;
                    scope.validate = function() {
                        if ((scope.userName !== '' && scope.userName !== undefined) && scope.password !== '' && scope.password !== undefined) {
                            scope.isLoading = true;
                            scope.login({
                                userName: scope.userName,
                                password: scope.password
                            });
                        } else {
                            if (scope.userName === '' || scope.userName === undefined)
                                focus('userName_form');
                            else
                                focus('password_form');
                            scope.notification_form.show("User Id atau kata kunci belum terisi", "info");
                        }
                    }
                    scope.$watch('message', function(e) {
                        if (e !== '' || e !== undefined) {
                            var message = e.content || e;
                            if (message !== '')
                                scope.notification_form.show(message, e.type || "info");
                        }
                    });
                    scope.reset = function() {
                        scope.userName = '';
                        scope.password = "";
                    }
                }
            };
        })
        .factory('focus', function($timeout, $window) {
            return function(id) {
                // timeout makes sure that is invoked after any other event has been triggered.
                // e.g. click events that need to run before the focus or
                // inputs elements that are in a disabled state but are enabled when those events
                // are triggered.
                $timeout(function() {
                    var element = $window.document.getElementById(id);
                    if (element)
                        element.focus();
                });
            };
        })
        .directive('eventFocus', function(focus) {
            return function(scope, elem, attr) {
                elem.on(attr.eventFocus, function() {
                    focus(attr.eventFocusId);
                });

                // Removes bound events in the element itself
                // when the scope is destroyed
                scope.$on('$destroy', function() {
                    element.off(attr.eventFocus);
                });
            };
        })


    .directive('cWizard', function() {
        return {
            restrict: 'E',
            scope: {
                listData: '=',
                chooseKriteria: "=",
                pagePrev: "=",
                isFirstPage: "="

            },
            template: '<div class="grid_12" ng-repeat="data in listData">' +
                '<div ng-show="data.statVisible">' +
                '<div class="grid_12 headerBox">' +
                '<p>{{data.name}}</p>' +
                '</div>' +
                '<div class="grid_12 borderBox">' +
                '<div class="grid_3" style="margin-right: 0px;width: 25%;" ng-repeat="child in data.children">' +
                '<div class="containerCenter" ng-click="chooseKriteria(data, child)">' +
                '<p>{{child.name}}</p>' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="grid_3" style="float:right;margin-top:15px" ng-hide="isFirstPage">' +
                '<c-button  class="cancel" style="width: 100%; font-size: 24px; padding:0px, margin:0px;" ng-click="pagePrev(data)">' +
                '<span class="title">Sebelumnya</span>' +
                '</c-button>' +
                '</div>' +
                '</div>' +
                '</div>'

        };
    })

    .animation('.item', function() {

        var animateUp = function(element, className, done) {
            if (className != 'active') {
                return;
            }
            element.css({
                position: 'absolute',
                top: 500,
                left: 0,
                display: 'block'
            });

            jQuery(element).animate({
                top: 0
            }, done);

            return function(cancel) {
                if (cancel) {
                    element.stop();
                }
            };
        }

        var animateDown = function(element, className, done) {
            if (className != 'active') {
                return;
            }
            element.css({
                position: 'absolute',
                left: 0,
                top: 0
            });

            jQuery(element).animate({
                top: -500
            }, done);

            return function(cancel) {
                if (cancel) {
                    element.stop();
                }
            };
        }

        return {
            addClass: animateUp,
            removeClass: animateDown
        };
    });
    return core;
});