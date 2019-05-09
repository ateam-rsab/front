define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('RiwayatKesehatanNifasCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
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
                "field": "tglPartuss",
                "title": "Tanggal Partus"
            }, {
                "field": "umurHamil",
                "title": "Umur Hamil"
            }, {
                "field": "penolongPersalinan",
                "title": "Penolong Persalinan"
            }, {
                "field": "tempatPartus",
                "title": "Tempat Partus"
            }, {
                "field": "jenisPersalinan",
                "title": "Jenis Persalinan"
            }, {
                "field": "penyakit",
                "title": "Penyakit"
            }, {
                "field": "beratBadanLahir",
                "title": "Berat Badan Lahir"
            }, {
                "field": "status.name",
                "title": "Status"
            }];
            $scope.jenisMenuDiet = new kendo.data.DataSource({
                data: []
            });
            $scope.addJenisDiet = function() {
                debugger;
                $scope.jenisMenuDiet.add({
                    tglPartus: $scope.item.tglPartus,
                    umurHamil: $scope.item.umurHamil,
                    penolongPersalinan: $scope.item.penolongPersalinan,
                    tempatPartus: $scope.item.tempatPartus,
                    jenisPersalinan: $scope.item.jenisPersalinan,
                    penyakit: $scope.item.penyakit,
                    beratBadanLahir: $scope.item.beratBadanLahir,
                    status: $scope.item.status,
                    antrianPasienDiPeriksa : {"noRec": $state.params.noRec}
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
            debugger;
            findPasien.getKesehatanNifas($state.params.noRec).then(function(e) {
                var data = e.data.data.RiwayatKehamilanPersalinanNifasYangLalu[e.data.data.RiwayatKehamilanPersalinanNifasYangLalu.length-1]
                if(data===undefined)return;
                /*$scope.item.umurHamil = data.umurHamil;
                $scope.item.tglPartus = data.tglPartus;
                $scope.item.penolongPersalinan = data.penolongPersalinan;
                $scope.item.tempatPartus = data.tempatPartus;
                $scope.item.jenisPersalinan = data.jenisPersalinan;
                $scope.item.penyakit = data.penyakit;
                $scope.item.beratBadanLahir = data.beratBadanLahir;
                $scope.item.status = data.status;*/

                $scope.listDiagnosa = ModelItem.beforePost(e.data.data.RiwayatKehamilanPersalinanNifasYangLalu, true);
                   
                    var temp = [];
                    var i = 1;
                    for (var key in $scope.listDiagnosa) {
                        if ($scope.listDiagnosa.hasOwnProperty(key)) {
                            var element = $scope.listDiagnosa[key];
                            temp.push({
                                tglPartus: element.tglPartus,
                                umurHamil: element.umurHamil,
                                penolongPersalinan: element.umurHamil,
                                tempatPartus: element.tempatPartus,
                                jenisPersalinan: element.jenisPersalinan,
                                penyakit: element.penyakit,
                                beratBadanLahir: element.beratBadanLahir,
                                status: element.status,
                                
                                tglPartuss: dateHelper.formatDate(element.tglPartus, 'DD-MM-YYYY'),
                            });
                            i++;
                        }
                    }
                    $scope.jenisMenuDiet = new kendo.data.DataSource({
                        data: temp
                    });
                    $scope.isLoadingDiagnosis = false;
            });
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
                $scope.jenisMenuDiet._data.antrianPasienDiPeriksa = {"noRec": $state.params.noRec}
                for (var i = 0; i < $scope.jenisMenuDiet._data.length; i++) {
                    $scope.uuuu = $scope.jenisMenuDiet._data[i];
                        data.push($scope.uuuu);
                        $scope.xxxx = data;
                }
                /*var data = [];
                    for (var key in $scope.jenisMenuDiet._data) {
                        if ($scope.jenisMenuDiet._data.hasOwnProperty(key)) {
                            var element = $scope.jenisMenuDiet._data[key];
                        }
                    }
                    $scope.aaaa = [$scope.jenisMenuDiet._data];*/

                /*$scope.item.tglPartus = Date.parse($scope.item.tglPartus);*/
                ManagePasien.saveKesehatanNifas(ModelItem.beforePost($scope.xxxx)).then(function() {
                   $scope.isNext = true;
                }, function(err) {

                });


            $scope.Next = function() {
                $rootScope.next();
            }
            }
            
        }
    ]);
});