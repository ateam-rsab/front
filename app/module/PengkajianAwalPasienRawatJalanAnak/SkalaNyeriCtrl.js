define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkalaNyeriCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            
            $rootScope.showMenuPengkajianMedis = false;
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.item = {};
            var date = new Date();
            /*$scope.item.tglInputData = date;*/
            $scope.now = date;
            $rootScope.showMenuPengkajianMedis = false;
            //$rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "AsesmenGiziAwal");

            ModelItem.getDataDummyGeneric("RisikoGizi", false).then(function(data) {
                    $scope.listSkriningGizi = data;
                })
                // ModelItem.getDataDummyGeneric("AlergiMakanan", false).then(function(data) {
                //     $scope.listAlergiMakanan = data;
                // })
            ModelItem.getDataDummyGeneric("StatusHidupMati", false).then(function(data) {
                $scope.sourceJenisDiet = data;
            })

            $scope.sourceGmbrNyeri = [{"id":1,"nilai":0,"name":"no hurt"},
                                      {"id":2,"nilai":2,"name":"hurt little bit"},
                                      {"id":3,"nilai":4,"name":"hurt little more"},
                                      {"id":4,"nilai":6,"name":"hurt even bit"},
                                      {"id":5,"nilai":8,"name":"hurt whole bit"},
                                      {"id":6,"nilai":10,"name":"hurt worst"},
                                      
                                                                                          
            ]
            $scope.noRecus = $state.params.noRec


            // $scope.tanggal = $state.params.tanggal;
            // findPasien.getByNoCM($state.params.noCM).then(function(e) {
            //     $scope.item.pasien = e.data;
            //     if (!$scope.$$phase)
            //         $scope.$apply();
            // });
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.column = [
            {
                "field": "tglPartus",
                "title": "Tanggal Partus"
            }, {
                "field": "umurhamil",
                "title": "Umur Hamil"
            }, {
                "field": "penolongpersalinan",
                "title": "Penolong Persalinan"
            }, {
                "field": "tempatpartus",
                "title": "Tempat Partus"
            }, {
                "field": "jenispersalinan",
                "title": "Jenis Persalinan"
            }, {
                "field": "penyakit",
                "title": "Penyakit"
            }, {
                "field": "beratbadanlahir",
                "title": "Berat Badan Lahir"
            }, {
                "field": "status",
                "title": "Status"
            }];
            $scope.jenisMenuDiet = new kendo.data.DataSource({
                data: []
            });
            $scope.addJenisDiet = function() {
                debugger;
                $scope.jenisMenuDiet.add({

                    tglPartus: dateHelper.formatDate($scope.item.tglPartus, 'DD-MM-YYYY'),
                    umurhamil: $scope.item.umurHamil,
                    penolongpersalinan: $scope.item.penolongPersalinan,
                    tempatpartus: $scope.item.tempatPartus,
                    jenispersalinan: $scope.item.jenisPersalinan,
                    penyakit: $scope.item.penyakit,
                    beratbadanlahir: $scope.item.beratBadanLahir,
                    status: $scope.item.status.name
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
/*                $scope.listTindakLanjutGizi = tempAgain;
                for (var key in data.preskripsiDiets) {
                    if (data.preskripsiDiets.hasOwnProperty(key)) {
                        var element = data.preskripsiDiets[key];
                        $scope.jenisMenuDiet.add({
                            jenisDiet: element.jenisDiet,
                            keterangan: element.keterangan
                        });
                    }
                }*/


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
                debugger;
                $scope.data = {};

                /*var temp = $state.params.tanggal;
                $scope.data.tanggalPendaftaran = dateHelper.toTimeStamp(temp);
                $scope.data.pasien = $scope.pasien;
                $scope.data.noRec = $scope.item.noRec;
                $scope.data.risiko = $scope.item.risiko;
                $scope.data.tindakLanjutGizi = $scope.listTindakLanjut;
                $scope.data.preskripsiDiet = [];*/
                //$scope.data.preskripsiDiet.push($scope.jenisMenuDiet._data);
                

                
                //console.log(JSON.stringify($scope.data));
                $scope.item.antrianPasienDiPeriksa = {"noRec": $state.params.noRec}
                $scope.item.noRec = ""
                $scope.item.status = $scope.item.status
                $scope.data.preskripsiDiet = [];
                

                
                /*var i=$scope.jenisMenuDiet._data.length;
                for (var i in $scope.jenisMenuDiet._data) {
                    var element = $scope.jenisMenuDiet._data[i];

                        $scope.data.preskripsiDiet.push(element);
                }*/
                debugger;
                var data = [];
                    for (var key in $scope.jenisMenuDiet._data) {
                        if ($scope.jenisMenuDiet._data.hasOwnProperty(key)) {
                            var element = $scope.jenisMenuDiet._data[key];
                            if (element.id !== undefined) {
                                data.push({
                                    diagnosa: element,
                                    jenisDiagnosa: element.jenisDiagnosis,
                                    noRec: element.noRecord
                                });
                                $scope.xxxx = data;
                            }
                        }
                    }
                    $scope.aaaa = [$scope.jenisMenuDiet._data];

                /*$scope.item.tglPartus = Date.parse($scope.item.tglPartus);*/
                ManagePasien.saveKesehatanNifas(ModelItem.beforePost($scope.data.preskripsiDiet)).then(function() {
                   
                }, function(err) {

                });
            }
            
        }
    ]);
});