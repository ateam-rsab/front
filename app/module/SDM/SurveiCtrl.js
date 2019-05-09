define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SurveiCtrl', ['FindSdm', 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope',
        function(findSdm, modelItem, manageSdm, $state, $rootScope, $scope) {
            $rootScope.isOpen = true;
            $scope.Persentase=0;
            var a = 0;
            $(".center-survei").click(function() {
                if (a == 0) {
                    a = 1;
                    $('.left').animate({
                        left: '-35%'
                    }, 1000);
                    $('.right').animate({
                        right: '-35%'
                    }, 1000);
                    $('.center-survei').hide();
                    $("#left-content").hide();
                } else {
                    a = 0;
                    $('.left').animate({
                        left: '0'
                    }, 1000);
                    $('.right').animate({
                        right: '0'
                    }, 1000);
                    $('.center-survei').css("right", "0");

                    setTimeout(function() {
                        $('.center-survei').addClass('slideOutUp');
                    }, 1000);
                }
            });
            $scope.currentIndex = 0;
            $scope.state = 'data respondend';
            $scope.$watch('currentIndex', function(e) {
                $scope.myStyle = {
                    'width': e === 0 ? 0 : e / $scope.items.length * 100 + '%',
                    '-webkit-transition': 'all 0.5s ease-in-out',
                    '-moz-transition': 'all 0.5s ease-in-out',
                    '-o-transition': 'all 0.5s ease-in-out',
                    '-ms-transition': 'all 0.5s ease-in-out',
                    'transition': 'all 0.5s ease-in-out',
                }
            })
            $scope.navigate = function(index, item, data) {
                if (index === 6 && item !== undefined && item.itemDetail !== undefined && item.itemDetail != null && $scope.state !== 'quisioner') {
                    if (item !== undefined)

                    {
                        item.isDetail = true;
                        if (data.id === 133) {
                            item.tempChoose = data;
                            item.detail = _.filter(item.itemDetail, function(e) {
                                return (e.id >= 185 && e.id <= 190) || e.id === 216;
                            });
                        } else if (data.id == 135) {
                            item.tempChoose = data;
                            item.detail = _.filter(item.itemDetail, function(e) {
                                return (e.id >= 191 && e.id <= 193);
                            });
                        } else if (data.id == 128) {
                            item.tempChoose = data;
                            item.detail = _.filter(item.itemDetail, function(e) {
                                return (e.id >= 194 && e.id <= 195);
                            });
                        } else if (data.id == 134) {
                            item.tempChoose = data;
                            item.detail = _.filter(item.itemDetail, function(e) {
                                return (e.id >= 196 && e.id <= 207);
                            });
                        } else if (data.id == 183) {
                            item.tempChoose = data;
                            item.detail = _.filter(item.itemDetail, function(e) {
                                return (e.id >= 208 && e.id <= 211);
                            });
                        } else if (data.id == 184) {
                            item.tempChoose = data;
                            item.detail = _.filter(item.itemDetail, function(e) {
                                return (e.id >= 212 && e.id <= 215);
                            });
                        } else {
                            $scope.currentIndex = index + 1;
                            if ($scope.currentIndex === 7) {
                                $scope.items[7].isDetail = true;
                                if ($scope.items[5].answer.id == 123) {
                                    $scope.items[7].detail = _.filter($scope.items[7].itemDetail, function(e) {
                                        return (e.id >= 136 && e.id <= 149);
                                    });
                                } else if ($scope.items[5].answer.id == 125) {
                                    $scope.items[7].detail = _.filter($scope.items[7].itemDetail, function(e) {
                                        return (e.id >= 150 && e.id <= 157);
                                    });
                                } else if ($scope.items[5].answer.id == 124) {
                                    $scope.items[7].detail = _.filter($scope.items[7].itemDetail, function(e) {
                                        return (e.id >= 150 && e.id <= 152);
                                    });
                                }
                            }
                        }
                    }
                } else
                    $scope.currentIndex = index + 1;
                if ($scope.currentIndex === 8 && $scope.state !== 'quisioner') {
                    $scope.items[8].isDetail = true;

                    if ($scope.items[6].tempChoose.id === 133) {
                        $scope.items[8].detail = _.filter($scope.items[8].itemDetail, function(e) {
                            return (e.id >= 217 && e.id <= 218) || e.id === 170;
                        });
                    } else if ($scope.items[6].tempChoose.id === 135) {
                        $scope.items[8].detail = _.filter($scope.items[8].itemDetail, function(e) {
                            return (e.id >= 219 && e.id <= 222);
                        });
                    } else if ($scope.items[6].tempChoose.id === 128) {
                        $scope.items[8].detail = _.filter($scope.items[8].itemDetail, function(e) {
                            return (e.id >= 223 && e.id <= 225);
                        });
                    } else if ($scope.items[6].tempChoose.id === 183) {
                        $scope.items[8].detail = _.filter($scope.items[8].itemDetail, function(e) {
                            return (e.id >= 226 && e.id <= 227);
                        });
                    } else if ($scope.items[6].tempChoose.id === 184) {
                        $scope.items[8].detail = _.filter($scope.items[8].itemDetail, function(e) {
                            return (e.id >= 212 && e.id <= 215);
                        });
                    }
                }
            }
            $scope.next = function() {
                $scope.currentIndex = $scope.currentIndex + 1;
            }
            $scope.prev = function(index) {
                if ($scope.currentIndex === 0) return;
                $scope.currentIndex = $scope.currentIndex - 1;
            }
            $scope.result = [];
            $scope.Save = function() {
                for (var key in $scope.items) {
                    if ($scope.items.hasOwnProperty(key)) {
                        var element = $scope.items[key];
                        $scope.result.push(element);

                    }
                }
                $(".center-survei").trigger("click");
                $scope.isLoading = true;
                manageSdm.saveSurvei(($scope.result)).then(function() {
                    $("#message-front").html("Terima kasih");
                    $rootScope.doneLoad = false;
                });
            }
            $scope.changeLayout = function(data) {
                var item = data;
                var listSeries = [];
                if (data.value !== undefined)
                    listSeries = _.filter($scope.ListDetail, function(e) {
                        return e.surveiId === data.value[0].id;
                    });
                else {
                    data.value = [{
                        id: 1
                    }]
                }
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
                    var countLaki = 0;
                    var countPerempuan = 0;
                    for (var key in e.data.data.detail) {
                        if (e.data.data.detail.hasOwnProperty(key)) {
                            var element = e.data.data.detail[key];
                            if (element.surveiDetail.name === "Lelaki")
                                countLaki++;
                            else
                                countPerempuan++;
                            item.push(element.surveiDetail)
                        }
                    }
                    $scope.Persentase = e.data.data.detail.length / $scope.pegawai.length;
                    var data = _.groupBy(item, 'name');
                    $scope.itemsRekap = [];

                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            var element = data[key];
                            var curentIndex = -1;
                            var index = 0;
                            for (var seriesKey in $scope.series) {
                                if (key === $scope.series[seriesKey]) {
                                    curentIndex = index;
                                    var countPegawai = 0;
                                    var respondedn = 0;
                                    var list = _.groupBy($scope.pegawai, 'jenisKelaminId')
                                    if (key === 'Lelaki') {
                                        for (var j in list) {
                                            if (list.hasOwnProperty(j)) {
                                                var elem = list[j];
                                                if (j === "1") {
                                                    countPegawai = elem.length;
                                                    respondedn = countLaki
                                                }
                                            }
                                        }

                                    } else {
                                        for (var j in list) {
                                            if (list.hasOwnProperty(j)) {
                                                var elem = list[j];
                                                if (j === "2") {
                                                    countPegawai = elem.length;
                                                    respondedn = countPerempuan
                                                }
                                            }
                                        }

                                    }
                                    $scope.itemsRekap.push({
                                            key: key,
                                            element: element,
                                            count: countPegawai,
                                            respondedn: respondedn
                                        })
                                        // $scope.series[seriesKey].key = seriesKey;
                                        // $scope.series[seriesKey].element = element;
                                }
                                index++;
                            }


                        }
                    }



                })
            }
            modelItem.getDataDummyGeneric("Pegawai").then(function(e) {
                $scope.pegawai = e;
                modelItem.getDataDummyGeneric("Survei").then(function(dat) {
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
                    modelItem.getDataDummyGeneric("SurveiDetail").then(function(dat) {
                        $scope.ListDetail = dat;
                        $rootScope.isDoneLoad = true;
                        $scope.changeLayout($scope.listResponded[0]);

                        findSdm.getSurvei('Data Respondend').then(function(e) {
                            $scope.items = [];
                            for (var key in e.data.data.items) {
                                if (e.data.data.items.hasOwnProperty(key)) {
                                    var element = e.data.data.items[key];

                                    if (!(element.id === 32 || element.id === 33 || element.id === 34)) {
                                        $scope.items.push({
                                            question: element.question,
                                            answers: element.detail,
                                            survei: element
                                        });
                                    } else {
                                        var arr = [];
                                        for (var i in element.detail) {
                                            if (element.detail.hasOwnProperty(i)) {
                                                var subElement = element.detail[i];
                                                if (subElement.id <= 184)
                                                    arr.push(subElement);

                                            }
                                        }
                                        $scope.items.push({
                                            question: element.question,
                                            answers: arr,
                                            survei: element,
                                            itemDetail: element.detail
                                        });
                                    }

                                }
                            }
                            findSdm.getSurvei('Quisioner').then(function(e) {
                                $scope.itemsQuisioner = [];
                                for (var key in e.data.data.items) {
                                    if (e.data.data.items.hasOwnProperty(key)) {
                                        var element = e.data.data.items[key];
                                        $scope.itemsQuisioner.push({
                                            question: element.question,
                                            answers: element.detail,
                                            survei: element
                                        });
                                    }
                                }

                            });
                            setTimeout(function() {
                                $rootScope.doneLoad = true;
                                $scope.$apply();
                            }, 1000);

                        });
                    });
                });

            });

            $scope.Done = function() {
                $(".center-survei").trigger("click");
            }

            $scope.Next = function() {
                $scope.state = 'quisioner';
                for (var key in $scope.items) {
                    if ($scope.items.hasOwnProperty(key)) {
                        var element = $scope.items[key];
                        $scope.result.push(element);
                    }
                }
                $scope.items = $scope.itemsQuisioner;

                $scope.currentIndex = 0;

            }

        }
    ])
});