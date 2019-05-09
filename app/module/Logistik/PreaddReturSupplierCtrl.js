
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PreaddReturSupplierCtrl', ['$rootScope', '$scope', '$state', 'FindProduk', 'ManageSarpras', 'ModelItem', 'DateHelper',
            function($rootScope, $scope, $state, findProduk, manageSarpras, ModelItem, DateHelper) {     

            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.listJenisPemeriksaan = [{ name: "Kelompok Produk", id: 1 },
                { name: "Jenis Produk", id: 2 }
            ];
            $scope.cari = function(){
                var periode, kelompokId, jenisId, produkId, noTerima, supplierId;

                if ($scope.item.periodeAwal !== undefined && $scope.item.periodeAhir !== undefined ) {
                    periode = "?periodeAwal=" + DateHelper.getPeriodeFormatted($scope.item.periodeAwal) + "&periodeAhir=" + DateHelper.getPeriodeFormatted($scope.item.periodeAhir)
                } else {
                    periode = "?periodeAwal=&periodeAhir="
                }

                if ($scope.item.kelompokBarang !== undefined) {
                    kelompokId = $scope.item.kelompokBarang.id
                } else {
                    kelompokId = ""
                }

                if ($scope.item.jenisProduk !== undefined) {
                    jenisId = $scope.item.jenisProduk.id
                } else {
                    jenisId = ""
                }

                if ($scope.item.namaBarang !== undefined) {
                    produkId = $scope.item.namaBarang.id
                } else {
                    produkId = ""
                }

                if ($scope.item.noTerima !== undefined) {
                    noTerima = $scope.item.noTerima
                } else {
                    noTerima = ""
                }

                if ($scope.item.supplier !== undefined) {
                    supplierId = $scope.item.supplier
                } else {
                    supplierId = ""
                }

                manageSarpras.getPenerimaanSupplier(periode, kelompokId, jenisId, produkId, noTerima, supplierId).then(function(e) {
                    debugger;
                    $scope.isReport = true;
                    $scope.isEdit = true;

                    e.data.data.forEach(function(dats){
                        dats.tanggalKirim = DateHelper.getPeriodeFormatted(new Date(dats.tanggal));
                    })

                    $scope.dataPengiriman = new kendo.data.DataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                id: "noTerima",
                                fields: {
                                    // tanggalKirim: {editable: false},
                                    namaRuangan: {editable: false, type: "string"},
                                    namaRekanan: {editable: false, type: "string"}
                                }
                            }
                        },
                        pageSize: 20,
                        change: function (e) {
                            console.log("change :" + e.action);
                        }
                    });
                })
            }
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
            $scope.optionsDataPengiriman = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                sortable: true,
                pageable: true,
                editable: false,
                columns: [{
                    "field": "noTerima",
                    "title": "No Terima",
                    "width": 180,
                    filterable: false,
                    attributes: {
                        style: "text-align:center"
                    }
                }, {
                    "field": "namaRuangan",
                    "title": "Ruangan"
                }, {
                    "field": "namaRekanan",
                    "title": "Supplier"
                }]

            };
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            })
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            $scope.listSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // manageSarpras.getListData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.listSuplier = data;
            // });
            $scope.navTo = function() {
                // console.log($scope.current.noRec);
                
                $state.go('ReturPengirimanSupplier', {
                    noRec: $scope.current.noRec
                });
            }
            $scope.cetak = function() {
                window.messageContainer.error('Fitur belum tersedia');
            }
            $scope.batal = function() {
                $scope.item = {};
            }
            $scope.Back = function(){
                window.history.back();
            }
        }
    ]);
});