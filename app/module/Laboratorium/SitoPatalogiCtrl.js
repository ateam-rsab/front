/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SitoPatalogiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'FindPasienLaboratorium', 'FindPasien','ManagePasien',

        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper, findPasienLaboratorium, findPasien,ManagePasien) {
            $scope.noOrder = $state.params.noOrder;
            findPasienLaboratorium.getOrderDetail($scope.noOrder).then(function(data) {
                debugger;
                var items = data.data.data.orders;
                var isBiopsi = [12276,12277,13214,12161,13217]
                var isHistopatologi = [12195,12200,12201,12202,12199,12198,12194,12196,12197,179,180,181,182,183,184,186,178,185,188,187]
                var isSitopatologi = [12278,12281,13215,13216,12275]
                var isPapsmir = [12279,12280]
                var temp = [];
                for (var key in items) {
                    if (items.hasOwnProperty(key)) {
                        var element = items[key];
                        var tempObj = {};
                        var index = -1;
                        var test = 12276;
                        if (isBiopsi.indexOf(test) >= 0) {
                            tempObj.isBiopsi = true;
                        } else
                        if (isHistopatologi.indexOf(test) >= 0) {
                            tempObj.isHistopatologi = true;
                        } else
                        if (isSitopatologi.indexOf(test) >= 0) {
                            tempObj.isSitopatologi = true;
                        } else
                        if (isPapsmir.indexOf(test) >= 0) {
                            tempObj.isPapsmir = true;
                        }
                        tempObj.produk = element.produk;
                        tempObj.noRecAntrian = $state.params.noAntrianPasien;
                        tempObj.noOrder = $scope.noOrder;
                        temp.push(tempObj);

                    }
                }
                debugger;
                $scope.items = temp;
            });

            ModelItem.getDataDummyGeneric("DiagnosaOnkologiMorfologi", false).then(function(data) {
                debugger;
                $scope.listDiagnosaOnkologiMorfologi = data;
            })

            ModelItem.getDataDummyGeneric("DiagnosaOnkologiTopologi", false).then(function(data) {
                debugger;
                $scope.listDiagnosaOnkologiTopologi = data;
            })
            findPasien.geticdnine("2c9090b957daf35b0157db50c6aa002e").then(function(e) {
                debugger;
                $scope.listDiagnosaNine = e.data.data.diagnosaTindakanPasien[0].diagnosisTindakan
            });

            findPasien.geticdten("2c9090b957daf35b0157db50c6aa002e").then(function(e) {
                debugger;
                $scope.listDiagnosaTen = e.data.data.diagnosaPasien[0].diagnosis
            });

            ModelItem.getDataDummyGeneric("StatusGinekologi", false).then(function(data) {
                debugger;
                $scope.listStatusGinekologik = data;
            })

            ModelItem.getDataDummyGeneric("KeteranganLainLain", false).then(function(data) {
                debugger;
                $scope.listMikroskopik = data;
            })

            ModelItem.getDataDummyGeneric("JaringanTubuh", false).then(function(data) {
                debugger;
                $scope.listJaringanTubuh = data;
            })

            $scope.listCairanFiksasi = [{
                id: 0,
                name: "Formalin Buffer 10 %"
            }]

            $scope.arrStatusTempatTinggal = [];
            $scope.cekArrStatusTempatTinggal = function(data) {
                debugger;
                var isExist = _.find($scope.arrStatusTempatTinggal, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrStatusTempatTinggal.push(data);
                    data.isChecked = true;

                } else {
                    $scope.arrStatusTempatTinggal = _.without($scope.arrStatusTempatTinggal, data);
                    data.isChecked = false;
                }
            };

            $scope.arrStatusGinekologi = [];
            $scope.cekArrStatusGinekologi = function(data) {
                debugger;
                var isExist = _.find($scope.arrStatusGinekologi, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrStatusGinekologi.push(data);
                    data.isChecked = true;

                } else {
                    $scope.arrStatusGinekologi = _.without($scope.arrStatusGinekologi, data);
                    data.isChecked = false;
                }
            };

            $scope.arrStatusCairanFiksasi = [];
            $scope.cekArrStatusCairanFiksasi = function(data) {
                debugger;
                var isExist = _.find($scope.arrStatusCairanFiksasi, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrStatusCairanFiksasi.push(data);
                    data.isChecked = true;

                } else {
                    $scope.arrStatusCairanFiksasi = _.without($scope.arrStatusCairanFiksasi, data);
                    data.isChecked = false;
                }
            };

    
            $scope.Save = function() {
                debugger;
                var xxx = $scope.items
                var array = []

                for (var i = 0; i < $scope.items.length; i++) {
                    var item = $scope.items[i];
                    item.jamJaringanKeluarDariTubuh = Date.parse(item.jamJaringanKeluarDariTubuh);
                    item.jamMulaiDilakukanFilsosif = Date.parse(item.jamMulaiDilakukanFilsosif);
                    item.diambilTanggal = Date.parse(item.diambilTanggal);
                    item.tglMenopause = Date.parse(item.tanggal);
                    item.haidTerakhir = Date.parse(item.haidTerakhir);
                    
                    
                    item.detailDetailJaringanTubuhSet = ModelItem.setObjCollectionForCheckbox($scope.listJaringanTubuh, $scope.arrStatusTempatTinggal, "jaringanTubuh");
                    item.detailStatusGinekologiDetailSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusGinekologik, $scope.arrStatusGinekologi, "statusGinekologi");
                    item.detailDetailCairanFiksasiSet = ModelItem.setObjCollectionForCheckbox($scope.listCairanFiksasi, $scope.arrStatusCairanFiksasi, "cairanFiksasi");
                    array.push(item)
                }
                ManagePasien.saveHistopatalogi(ModelItem.beforePost(array)).then(function(e) {
                    $scope.item = ""
                    /*$scope.isNext = true;*/

                });
            }



            $scope.now = new Date();
            $scope.listStatusGinekologik_lokal = [{
                id: 0,
                name: "tidak ada kelainan"
            }, {
                id: 1,
                name: "eritroplakia"
            }, {
                id: 2,
                name: "luekoplakia"
            }, {
                id: 3,
                name: "flour albus"
            }, {
                id: 4,
                name: "perdarahan sentuh"
            }, {
                id: 5,
                name: "perdarahan abnormal"
            }, {
                id: 6,
                name: "servisitis"
            }, {
                id: 7,
                name: "lesi mencurigakan"
            }]
            $scope.listMikroskopik_lokal = [{
                id: 0,
                name: "Negatif"
            }, {
                id: 1,
                name: "Inkonsklusif"
            }, {
                id: 2,
                name: "Displasia"
            }, {
                id: 3,
                name: "Positif"
            }, {
                id: 4,
                name: "Parasit"
            }]
            /*$scope.listJaringanTubuh = [{
                id: 0,
                name: "Eksisi Percobaan"
            }, {
                id: 1,
                name: "Kerokan"
            }, {
                id: 2,
                name: "Operasi"
            }, {
                id: 3,
                name: "Aspirasi / biopsis"
            }]*/
            
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak
            });
            $scope.isPapsmir = false;
            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.dokters = data;
                $scope.item.pegawai = ModelItem.getPegawai();
            });
        

        }

    ]);
});