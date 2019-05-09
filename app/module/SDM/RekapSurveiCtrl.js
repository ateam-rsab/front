define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RekapSurveiCtrl', ['FindSdm', '$rootScope', '$scope', 'ModelItem', '$state',
        function(findSdm, $rootScope, $scope, ModelItem, $state) {
            $rootScope.isDoneLoad = false;
            $scope.source = [];
            ModelItem.getDataDummyGeneric("Survei").then(function(dat) {
                $scope.List = dat;
                $scope.listResponded = [];
                for (var key in _.groupBy(_.filter(dat, function(e) {
                        return e.kelompok === 'Data Respondend'
                    }), 'question')) {
                    if (_.groupBy(dat, 'question').hasOwnProperty(key)) {
                        var element = _.groupBy(dat, 'report')[key];
                        $scope.listResponded.push({
                            key: key,
                            value: element
                        })
                    }
                }
                ModelItem.getDataDummyGeneric("SurveiDetail").then(function(dat) {
                    $scope.ListDetail = dat;
                    $rootScope.isDoneLoad = true;
                });
            });
            $scope.changeLayoutDetail = function(data) {
                var item = data;
                var listSeries = _.filter($scope.ListDetail, function(e) {
                    return e.surveiId === data.value[0].id;
                });
                $scope.series = [];
                var model = {
                    name: item.key,
                    data: []
                }
                for (var key in listSeries) {
                    if (listSeries.hasOwnProperty(key)) {
                        var element = listSeries[key];
                        $scope.series.push(element.report);
                        model.data.push(0);
                    }
                }

                findSdm.getRekapSurvei(new Date(), new Date(), data.value[0].id).then(function(e) {
                    var item = [];
                    for (var key in e.data.data.detail) {
                        if (e.data.data.detail.hasOwnProperty(key)) {
                            var element = e.data.data.detail[key];
                            item.push(element.surveiDetail)
                        }
                    }
                    $scope.dataName = _.groupBy(item, 'id');
                    $scope.items = [];
                    findSdm.getRekapAll().then(function(f) {
                        var rekapSurvei = [];
                        var listItems = [];
                        for (var key in $scope.dataName) {
                            if ($scope.dataName.hasOwnProperty(key)) {
                                var element = $scope.dataName[key];
                                listItems.push(parseInt(key));
                            }
                        }

                        for (var key in f.data.data.detail) {
                            if (f.data.data.detail.hasOwnProperty(key)) {
                                var element = f.data.data.detail[key];
                                if (listItems.indexOf(element.surveiDetail.id) >= 0) {
                                    rekapSurvei.push(element);
                                }

                            }
                        }
                        $("#chartGroup").kendoChart({
                            title: {
                                text: "Rekapitulasi Surver berdasarkan " + item.key
                            },
                            legend: {
                                position: "bottom"
                            },
                            seriesDefaults: {
                                type: "column"
                            },
                            series: items,
                            valueAxis: {
                                labels: {
                                    format: "{0} ",
                                },
                                line: {
                                    visible: false
                                },

                            },
                            categoryAxis: {
                                categories: $scope.series,
                                line: {
                                    visible: false
                                }
                            },
                            tooltip: {
                                visible: true,
                                format: "{0} ",
                                template: "#= series.name #: #= value #"
                            }
                        });
                    })


                })
            }
            $scope.changeLayout = function(data) {
                var item = data;
                var listSeries = _.filter($scope.ListDetail, function(e) {
                    return e.surveiId === data.value[0].id;
                });
                $scope.series = [];
                var model = {
                    name: item.key,
                    data: []
                }
                for (var key in listSeries) {
                    if (listSeries.hasOwnProperty(key)) {
                        var element = listSeries[key];
                        $scope.series.push(element.report);
                        model.data.push(0);
                    }
                }

                findSdm.getRekapSurvei(new Date(), new Date(), data.value[0].id).then(function(e) {
                    var item = [];
                    for (var key in e.data.data.detail) {
                        if (e.data.data.detail.hasOwnProperty(key)) {
                            var element = e.data.data.detail[key];
                            item.push(element.surveiDetail)
                        }
                    }
                    var data = _.groupBy(item, 'name');
                    var items = [];

                    items.push(model)
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            var element = data[key];
                            var curentIndex = -1;
                            var index = 0;

                            for (var seriesKey in $scope.series) {
                                if (key === $scope.series[seriesKey])
                                    curentIndex = index;
                                index++;
                            }
                            if (curentIndex !== -1)
                                model.data[curentIndex] = element.length;

                        }
                    }

                    $("#chart").kendoChart({
                        title: {
                            text: "Rekapitulasi Surver berdasarkan " + item.key
                        },
                        legend: {
                            position: "bottom"
                        },
                        seriesDefaults: {
                            type: "column"
                        },
                        series: items,
                        valueAxis: {
                            labels: {
                                format: "{0} ",
                            },
                            line: {
                                visible: false
                            },

                        },
                        categoryAxis: {
                            categories: $scope.series,
                            line: {
                                visible: false
                            },
                            labels: {
                                rotation: 45
                            },
                        },
                        tooltip: {
                            visible: true,
                            format: "{0} ",
                            template: "#= series.name #: #= value #"
                        }
                    });

                })
            }




        }
    ]);
});