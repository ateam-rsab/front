define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AsesmenGiziAwalCtrl', ['ManageGizi', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasienGizi', 'DateHelper', 'FindPasien',

        function(manageGizi, $rootScope, $scope, ModelItem, $state, findPasienGizi, dateHelper, findPasien) {
            $rootScope.showMenuPengkajianMedis = false;

            //$rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "AsesmenGiziAwal");

            ModelItem.getDataDummyGeneric("RisikoGizi", false).then(function(data) {
                    $scope.listSkriningGizi = data;
                })
                // ModelItem.getDataDummyGeneric("AlergiMakanan", false).then(function(data) {
                //     $scope.listAlergiMakanan = data;
                // })
            ModelItem.getDataDummyGeneric("JenisDiet", false).then(function(data) {
                $scope.sourceJenisDiet = data;
            })


            $scope.noRecus = $state.params.noRec


            // $scope.tanggal = $state.params.tanggal;
            // findPasien.getByNoCM($state.params.noCM).then(function(e) {
            //     $scope.item.pasien = e.data;
            //     if (!$scope.$$phase)
            //         $scope.$apply();
            // });
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.column = [{
                "field": "jenisDiet.jenisDiet",
                "title": "Jenis Diet"
            }, {
                "field": "keterangan",
                "title": "Keterangan"
            }];
            $scope.jenisMenuDiet = new kendo.data.DataSource({
                data: []
            });
            $scope.addJenisDiet = function() {
                $scope.jenisMenuDiet.add({
                    jenisDiet: $scope.item.jenisDiet,
                    keterangan: $scope.item.keterangan
                });
            }
            $scope.listTindakLanjut = [];
            $scope.addTindakLanjutGizi = function(data) {
                if ($scope.listTindakLanjut.indexOf(data) < 0) {
                    $scope.listTindakLanjut.push(data);
                }
            }
            $scope.removeJenisDiet = function() {

                $scope.jenisMenuDiet.data([]);
            };
            $scope.listTindakLanjutGizi = [{
                id: "1",
                value: "1",
                name: "Perlu Asuhan Gizi (Lanjutkan ke Asesmen Gizi)"
            }, {
                id: "2",
                value: "2",
                name: "Belum perlu asuhan gizi"
            }]

            findPasien.getAlergiByNoCm($state.params.noCM).then(function(e) {
                $scope.listAlergiMakanan = e.data.data.PapAlergi;
            });
            findPasien.getByNoCM($state.params.noCM).then(function(data) {
                $scope.pasien = {};
                $scope.pasien.noRec = $state.params.noRec;

            });
            findPasien.getAsesmentGiziAwal($state.params.noRec).then(function(e) {
                var data = e.data.data.AsesmenGiziAwal[0];
                if(data===undefined)return;
                $scope.item.noRec = data.noRec;
                $scope.item.risiko = data.risiko;
                $scope.listTindakLanjut = [];
                var temp = [];
                for (var key in data.tindakLanjutGizis) {
                    if (data.tindakLanjutGizis.hasOwnProperty(key)) {
                        var element = data.tindakLanjutGizis[key];
                        for (var keyItem in $scope.listTindakLanjutGizi) {
                            debugger;
                            if ($scope.listTindakLanjutGizi.hasOwnProperty(keyItem)) {
                                var elementItem = $scope.listTindakLanjutGizi[keyItem];
                                if (elementItem.value === element.value) {
                                    elementItem.isChecked = true;
                                    temp.push(elementItem);
                                    $scope.listTindakLanjut.push(element);
                                }

                            }
                        }
                    }
                }
                var tempAgain = [];

                for (var keyItem in $scope.listTindakLanjutGizi) {
                    if ($scope.listTindakLanjutGizi.hasOwnProperty(keyItem)) {
                        var elementItem = $scope.listTindakLanjutGizi[keyItem];
                        for (var i in temp) {
                            if (temp.hasOwnProperty(i)) {
                                var element = temp[i];
                                if (elementItem.value === element.value) {
                                    elementItem.isChecked = true;
                                }
                            }
                        }
                        tempAgain.push(elementItem);

                    }
                }
                $scope.listTindakLanjutGizi = tempAgain;
                for (var key in data.preskripsiDiets) {
                    if (data.preskripsiDiets.hasOwnProperty(key)) {
                        var element = data.preskripsiDiets[key];
                        $scope.jenisMenuDiet.add({
                            jenisDiet: element.jenisDiet,
                            keterangan: element.keterangan
                        });
                    }
                }


            });

            ModelItem.getDataDummyGeneric("PapSkriningGizi", false).then(function(data) {
                debugger;
                $scope.sourceSkriningGizi = data;
                for (var i = 0; i < $scope.sourceSkriningGizi.length; i++) {
                    if ($scope.sourceSkriningGizi[i].pasienId == $state.params.noRec) {
                        if ($scope.sourceSkriningGizi[i].totalSkor == 0) {
                            $scope.ringan = true;
                            $scope.sedang = false;
                            $scope.parah = false;
                        } else if ($scope.sourceSkriningGizi[i].totalSkor <= 3) {
                            $scope.sedang = true;
                            $scope.ringan = false;
                            $scope.parah = false;
                        } else if ($scope.sourceSkriningGizi[i].totalSkor >= 4) {
                            $scope.parah = true;
                            $scope.ringan = false;
                            $scope.sedang = false;
                        }

                    }
                }
            })
            $scope.Save = function() {
                $scope.data = {};

                var temp = $state.params.tanggal;
                $scope.data.tanggalPendaftaran = dateHelper.toTimeStamp(temp);
                $scope.data.pasien = $scope.pasien;
                $scope.data.noRec = $scope.item.noRec;
                $scope.data.risiko = $scope.item.risiko;
                $scope.data.tindakLanjutGizi = $scope.listTindakLanjut;
                $scope.data.preskripsiDiet = [];
                //$scope.data.preskripsiDiet.push($scope.jenisMenuDiet._data);
                //var i=$scope.jenisMenuDiet._data.length;
                for (var i in $scope.jenisMenuDiet._data) {
                    var element = $scope.jenisMenuDiet._data[i];
                    var tempElemen = {};
                    if (element.jenisDiet !== undefined || element.keterangan !== undefined) {
                        tempElemen.jenisDiet = element.jenisDiet;
                        tempElemen.keterangan = element.keterangan;
                        $scope.data.preskripsiDiet.push(tempElemen);
                    }
                }
                //console.log(JSON.stringify($scope.data));
                manageGizi.saveAssementAwal(ModelItem.beforePost($scope.data)).then(function() {
                    debugger
                    $scope.isNext = true;
                }, function(err) {

                });
            }
            $scope.Next = function() {
                $rootScope.next();
            }
        }
    ])
});