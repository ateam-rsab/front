define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarPasienKeluhanUtamaCtrl', ['DateHelper', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper',
        function(dateHelper, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper) {

            //$rootScope.listActive -> data listMenu
            ModelItem.setActiveMenu($rootScope.listActive, 0);

            $scope.isNext = true;

            $rootScope.showMenu = true;
            $rootScope.showMenuPengkajianMedis = false;
            $rootScope.showMenuDetail = false;
            $scope.noCM = $state.params.noCM;
            $scope.listDetailData = [];

            $scope.selectedIndex = -1;
            $scope.item = {};
            var date = new Date();
            $scope.item.tglKeluhan = date;
            $scope.now = date;

            $scope.showAnamesa = false;
            $scope.listKeluhan = [];
            $scope.detailKeluhan = [];
            $scope.listTimeLine = [];
            // $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            findPasien.getKeluhanUtama($state.params.noCM, $state.params.tanggal).then(function(e) {
                if (e.data.data.papKeluhanUtama !== undefined)
                    if (e.data.data.papKeluhanUtama.keluhanUtama != undefined) {
                        $scope.item.keluhanUtama = e.data.data.papKeluhanUtama.keluhanUtama;
                        if ($scope.item.keluhanUtama !== undefined)
                            $scope.editMode = true;
                        $scope.item.noRec = e.data.data.papKeluhanUtama.noRec;
                    }
            });

            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data.data;
                $scope.item.pasien = data.data.data;
                $scope.item.tglKeluhan = date;
                $scope.now = date;
                if ($scope.kajianAwal !== undefined) {
                    if ($scope.kajianAwal.detailKeluhan !== undefined)
                        $scope.detailKeluhan = $scope.kajianAwal.detailKeluhan;
                    if ($scope.kajianAwal.keluhanUtama !== undefined)
                        $scope.item.keluhanUtama = $scope.kajianAwal.keluhanUtama;
                    if ($scope.kajianAwal.listKeluhan !== undefined)
                        $scope.listKeluhan = $scope.kajianAwal.listKeluhan;
                }


            });

            if ($scope.kajianAwal !== undefined && $scope.kajianAwal.listTimeLine !== undefined) {
                $scope.listTimeLine = $scope.kajianAwal.listTimeLine;
            }
            // findPasien.getPelayananByNoCM($scope.noCM).then(function(data) {

            // });

            $scope.editMode = false;
            // var dateParam = dateHelper.toDate($state.params.tanggal);
            // var formatedDate = dateHelper.formatDate(dateParam, "YYYY-MM-DD");
            findPasien.getDataKeluhanTambahan($state.params.noRec).then(function(data) {
                if (data.data.data.PapKeluhanTambahan) {

                    $scope.item.keluhanTambahan = ModelItem.beforePost(data.data.data.PapKeluhanTambahan, true);
                    $scope.detailKeluhan = $scope.item.keluhanTambahan;
                    var temp = []

                    for (var key in $scope.item.keluhanTambahan) {
                        if ($scope.item.keluhanTambahan.hasOwnProperty(key)) {
                            var element = $scope.item.keluhanTambahan[key];
                            // var arr = element.tanggal.split('T')[0].split('/');
                            element.tanggal = element.tglMerasaKeluhan;
                            var size = _.filter(temp, function(e) {
                                return moment(e.tanggal).format('DD MM YYYY') === moment(element.tglMerasaKeluhan).format('DD MM YYYY');
                            });
                            if (size.length == 0)
                                temp.push({
                                    tanggal: element.tglMerasaKeluhan,
                                    display: moment(element.tglMerasaKeluhan).format('DD MMM')
                                });
                        }
                    }
                    var order = _.sortBy(temp, function(e) {
                        return e.tanggal.getTime();
                    })
                    $scope.kajianAwal.listTimeLine = order;
                    // temp.push({  
                    //     tanggal: new Date(),
                    //     display: moment().format('DD MMM')
                    // });
                    // temp = _.sortBy(temp, function(num) {
                    //     var arr = num.tanggal;
                    //     return (parseInt(arr.getDate()) + parseInt(arr.getMonth()) * 31 + parseInt(arr.getYear()) * 365);
                    // });
                    if ($scope.kajianAwal.listTimeLine !== undefined) {
                        $scope.listTimeLine = $scope.kajianAwal.listTimeLine;
                    } else
                        $scope.listTimeLine = temp;
                    $scope.selectedDate = data.data[data.data.length - 1];
                    $scope.item.noRec = data.data.data.noRec;
                } else {
                    $scope.editMode = false;
                }
            })
            findPasien.getKeluhanUtama($state.params.noCM, $state.params.tanggal).then(function(data) {
                $scope.noRecKeluhan = data.data.data.papKeluhanUtama.noRec;
                debugger;
            });

            $scope.SimpanKeluhanUtama = function() {
                $scope.kajianAwal.detailKeluhan = $scope.detailKeluhan;
                $scope.kajianAwal.keluhanUtama = $scope.item.keluhanUtama;
                $scope.kajianAwal.listKeluhan = $scope.listKeluhan;
                $scope.kajianAwal.listTimeLine = $scope.listTimeLine;

                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                var pasien = { noRec: $state.params.noRec };
                managePasien.saveKeluhanUtama(ModelItem.beforePost(pasien), dateHelper.toTimeStamp($state.params.tanggal), $scope.item.keluhanUtama, $scope.noRecKeluhan).then(function(e) {
                    /*$state.go('dashboardpasien.inputAlergi', {
                        noCM: $scope.noCM
                    });*/
                });



            }
            $scope.ChoiceDate = function(data) {

                $scope.selectedDate = data;
                $scope.showAnamesa = ($scope.selectedDate === $scope.listTimeLine.length - 1);

                var index = -1;
                var item = undefined;
                for (var i in $scope.listTimeLine) {
                    index++;
                    if (data === index) {
                        item = $scope.listTimeLine[i];
                    }
                }

                var datas = [];
                var items = $scope.item.keluhanTambahan;
                for (var key in items) {
                    if (items.hasOwnProperty(key)) {
                        var element = items[key];
                        if (element.tanggal !== undefined) {
                            if (element.tanggal.getDate() == item.tanggal.getDate() && element.tanggal.getMonth() == item.tanggal.getMonth() && element.tanggal.getYear() == item.tanggal.getYear()) {
                                datas.push(element);
                            }
                        }
                    }
                }
                if (datas.length === 0) {
                    findPasien.getKeluhan($scope.noCM, item.tanggal).then(function(data) {
                        var temp = [];

                        for (var key in data.data.data.keluhanTambahan) {
                            if (data.data.data.keluhanTambahan.hasOwnProperty(key)) {
                                var element = data.data.data.keluhanTambahan[key];
                                $scope.listKeluhan.push({
                                    tanggal: item.tanggal,
                                    keluhan: element.keluhanTambahan
                                });
                                temp.push({
                                    tanggal: item.tanggal,
                                    keluhan: element.keluhanTambahan
                                });
                            }
                        }
                        $scope.detailKeluhan = temp;
                    });
                } else {
                    $scope.detailKeluhan = datas;
                }
                $scope.showDetailKeluhan = true;
            };
            $scope.AddKeluhan = function(data) {
                var date = $scope.item.tglKeluhan;
                var any = _.filter($scope.listTimeLine, function(num) {
                    return num.tanggal === date;
                });
                $scope.item.noRecAntrian = $state.params.noRec;
                var formatTanggal = new Date($scope.item.tglKeluhan);
                $scope.item.tanggalKeluhan = dateHelper.getTanggalFormattedNew(formatTanggal);
                debugger;
                managePasien.saveKeluhanTambahan(ModelItem.beforePost($scope.item.pasien), $state.params.tanggal, $scope.item, $scope.noRecKeluhan).then(function(e) {
                    if (any.length === 0)
                        $scope.listTimeLine.push({
                            tanggal: date,
                            display: moment(date).format('DD MMM')
                        });
                    var temp = [];
                    for (var key in $scope.listTimeLine) {
                        if ($scope.listTimeLine.hasOwnProperty(key)) {
                            var element = $scope.listTimeLine[key];
                            temp.push(element);
                        }
                    }
                    temp = _.sortBy(temp, function(num) {
                        if (num.tanggal === undefined) return 0;
                        var arr = num.tanggal;
                        return (parseInt(arr.getDate()) + parseInt(arr.getMonth()) * 31 + parseInt(arr.getYear()) * 365);
                    });
                    $scope.selectedDate = $scope.listTimeLine[$scope.listTimeLine.length - 1];

                    $scope.listTimeLine = temp;
                    $scope.selectedDate = $scope.listTimeLine[$scope.listTimeLine.length - 1];
                    $scope.listKeluhan.push({
                        tanggal: date,
                        keluhanTambahan: $scope.item.keluhan
                    });
                    $scope.item.keluhanTambahan = "";
                }, function(err) {});

            };
            $scope.Bind = function(data) {
                $scope.messsage = data;
            };

            $scope.Next = function() {

                $rootScope.next();
            }
        }
    ]);
});