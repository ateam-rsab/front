
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PreaddReturPengirimanCtrl', ['$rootScope', '$scope', '$state', 'FindProduk', 'ManageSarpras', 'ModelItem', 'DateHelper',
            function($rootScope, $scope, $state, findProduk, manageSarpras, ModelItem, DateHelper) {     

            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.listJenisPemeriksaan = [{ name: "Kelompok Produk", id: 1 },
                { name: "Jenis Produk", id: 2 }
            ];
            $scope.cari = function(){
                var periode, noTerima, idnamaProduk;

                if ($scope.item.noTerima === undefined) {
                    noTerima = "";
                } else {
                    noTerima = $scope.item.noTerima
                }

                if ($scope.item.periodeAwal !== undefined && $scope.item.periodeAhir !== undefined ) {
                    periode = "?periodeAwal=" + DateHelper.getPeriodeFormatted($scope.item.periodeAwal) + "&periodeAhir=" + DateHelper.getPeriodeFormatted($scope.item.periodeAhir)
                } else {
                    periode = "?periodeAwal=&periodeAhir="
                }

                if ($scope.item.namaBarang === undefined) {
                    idnamaProduk = "";
                } else {
                    idnamaProduk = $scope.item.namaBarang.id
                }
                findProduk.getDataPengiriman(periode, noTerima, idnamaProduk).then(function(e) {
                    // debugger;
                    $scope.isReport = true;
                    $scope.isEdit = true;

                    e.data.data.forEach(function(dats){
                        dats.tanggalKirim = DateHelper.getPeriodeFormatted(new Date(dats.tanggalKirim));
                    })

                    $scope.dataPengiriman = new kendo.data.DataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                id: "noKirim",
                                fields: {
                                    tanggalKirim: {editable: false},
                                    ruanganAsal: {editable: false, type: "string"},
                                    ruanganTujuan: {editable: false, type: "string"}
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
                    "field": "noKirim",
                    "title": "No Terima",
                    "width": 180,
                    filterable: false,
                    attributes: {
                        style: "text-align:center"
                    }
                }, {
                    "field": "tanggalKirim",
                    "title": "Tanggal Terima",
                    "width": 180,
                    filterable: false,
                    attributes: {
                        style: "text-align:center"
                    }
                }, {
                    "field": "ruanganAsal",
                    "title": "Ruangan Asal"
                }, {
                    "field": "ruanganTujuan",
                    "title": "Ruangan Tujuan"
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
            $scope.navTo = function() {
                console.log($scope.current.noRecStrukKonfirmasi);
                
                $state.go('ReturPengiriman', {
                    noRec: $scope.current.noRecStrukKonfirmasi
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