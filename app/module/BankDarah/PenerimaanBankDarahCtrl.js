define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PenerimaanBankDarahCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.listBentukDarah = ModelItem.kendoHttpSource('/product/find-bentuk-darah', true);
            ModelItem.getDataDummyGeneric("Rhesus", false).then(function(data) {
                $scope.listRhesus = data;
            });
            /*ModelItem.getDataDummyGeneric("GolonganDarah", false).then(function(data) {
                $scope.listGolonganDarah = data;
            });*/
            findPasien.getListGolonganDarah().then(function(e) {
                $scope.listGolonganDarah = e.data.data.golonganDarahRhesus
            });
            ModelItem.getDataDummyGeneric("StatusDarah", false).then(function(data) {
                $scope.listStatusDarah = data;
                $scope.statusDarah = $scope.listStatusDarah.namaExternal; 
            });
            ModelItem.getDataDummyGeneric("SupplierDarah", false).then(function(data) {
                $scope.listSupplierDarah = data;
                $scope.supplierDarah = $scope.listSupplierDarah.namaExternal; 
            });
            ModelItem.getDataDummyGeneric("LokasiDarah", false).then(function(data) {
                $scope.listLokasiDarah = data;
                $scope.lokasiDarah = $scope.listLokasiDarah.namaExternal; 
            });

            $scope.Add = function() {
                $scope.dataLabu.add($scope.item);
                $scope.item.noKantung = undefined;
                $scope.item.noSelang = undefined;
                $scope.item.jumlahDarah = undefined;
                $scope.item.nameGolDarahAndRhesus = undefined;
                /*$scope.item.rhesus = undefined;*/
                $scope.item.bentukDarah = undefined;
                $scope.item.statusDarah = undefined;
                $scope.item.supplierDarah = undefined;
                $scope.item.lokasiDarah = undefined;
            }

            $scope.dataLabu = new kendo.data.DataSource({
                data: []
            });
            
            $scope.columnPenerimaan = [{
                field: "noKantung",
                title: "No. Kantung"
            }, {
                field: "noSelang",
                title: "No. Selang"
            }, {
                field: "jumlahDarah",
                title: "Jumlah"
            }, {
                field: "nameGolDarahAndRhesus.nameGolDarahAndRhesus",
                title: "Golongan Darah Rhesus"
            }, {
                field: "bentukDarah.namaBentukProduk",
                title: "Bentuk Darah"
            }, {
                field: "statusDarah.namaExternal",
                title: "Status Darah"
            }, {
                field: "supplierDarah.namaExternal",
                title: "Supplier Darah"
            }, {
                field: "lokasiDarah.namaExternal",
                title: "Lokasi Darah"
            }];
            $scope.Save = function() {
                var data = [];
                var tempData = $scope.dataLabu._data;
                debugger;

                for(var i=0; i<tempData.length; i++){

                    data.push({
                        golonganDarahRhesus: {
                            idGolDarahAndRhesus: tempData[i].nameGolDarahAndRhesus.idGolDarahAndRhesus
                        },
                        kdproduk: {                            
                            bentukProduk: {
                                id: tempData[i].bentukDarah.id
                            }
                        },
                        nobatch: tempData[i].noSelang,
                        nokantongkemasan: tempData[i].noKantung,                      
                        qtyproduk: tempData[i].jumlahDarah,
                        tglkadaluarsa: tempData[i].tglkadaluarsa,
                        tglproduksi: tempData[i].tglproduksi,
                        volumen: tempData[i].volumen,
                        supplierDarah: {
                            id: tempData[i].statusDarah.id
                        },
                        lokasiDarah: {
                            id: tempData[i].lokasiDarah.id
                        },
                        statusDarah: {
                            id: tempData[i].statusDarah.id
                        }
                    });                        
                }

                /*for (var key in tempData) {
                    if (tempData.hasOwnProperty(key)) {
                        var element = tempData[key];
                        if (element !== undefined && element.nameGolDarahAndRhesus !== undefined)
                        debugger;
                        data.push({
                            kdproduk: {
                                golonganDarahRhesus: {
                                    idGolDarahAndRhesus: element.nameGolDarahAndRhesus,
                                    nameGolDarahAndRhesus: element.nameGolDarahAndRhesus
                                },
                                bentukProduk: {
                                    id: element.bentukDarah.id
                                }
                            },
                            nobatch: element.noSelang,
                            nokantongkemasan: element.noKantung,
                            qtyproduk: element.jumlahDarah,
                            tglkadaluarsa: element.tglkadaluarsa,
                            tglproduksi: element.tglproduksi,
                            volumen: element.volumen,
                            supplierDarah: {
                                id: element.statusDarah.namaExternal
                            },
                            lokasiDarah: {
                                id: element.lokasiDarah.namaExternal
                            },
                            statusDarah: {
                                id: element.statusDarah.namaExternal
                            }
                        });                        
                    }
                }*/

                debugger;

                var model = {
                    strukPelayanan: {
                        tglstruk: $scope.item.penerimaan,
                        kdruangan: {
                            id: 1
                        },
                        kdruanganasal: {
                            id: 1
                        }
                    },
                    strukPelayananDNoBatch: data
                };
                ManagePasien.saveKantungDarah(ModelItem.beforePost(model)).then(function(e) {
                    $scope.item.noStruk = e.data.data.noStruk;
                });
            }
        }
    ]);
});