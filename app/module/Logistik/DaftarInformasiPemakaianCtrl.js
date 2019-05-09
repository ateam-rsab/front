define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('DaftarInformasiPemakaianCtrl', ['$sce', '$state', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'PengajuanUsulanAnggaranService', 'DateHelper', 'FindSarpras',
        function($sce, $state, $rootScope, $scope, ModelItem, manageSarpras, PengajuanUsulanAnggaranService, DateHelper, findSarpras) {
            $scope.item = {};
            $scope.now = new Date();
            PengajuanUsulanAnggaranService.getKomponen("request-permintaan-barang/get-no-order", true).then(function(dat){
                $scope.item.noOrder = dat.data.noOrder;
            });
            var init = function() {
                PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                    $scope.item.ruangan = dat.data.data;
                });
                $scope.dataOrder = new kendo.data.DataSource({
                    data: []
                });
            }
            init();
            $scope.isNext = true;
            $scope.optionsOrder = {
                pageable: true,
                scrollable: true,
                columns: [{
                    "field": "namaProduk",
                    "title": "Nama Barang"
                }, {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width": "150px"
                }, 
                // {
                //     "field": "stok",
                //     "title": "Saldo",
                //     "width": "120px"
                // }, 
                {
                    "field": "qtyProduk",
                    "title": "Qty",
                    "width": "120px"
                }, {
                    "field": "keterangan",
                    "title": "Keterangan"
                }]
            };
            $scope.cari = function(){
                var kelBarang, jenBarang, barangId, periode;
                if ($scope.item.periodeAwal === undefined && $scope.item.periodeAhir === undefined) {
                    periode = "&dateStart=&dateEnd=";
                } else {
                    periode = "&dateStart=" + DateHelper.getPeriodeFormatted($scope.item.periodeAwal) + "&dateEnd=" + DateHelper.getPeriodeFormatted($scope.item.periodeAhir);
                }

                if ($scope.item.kelompokBarang === undefined) {
                    kelBarang = "";
                } else {
                    kelBarang = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jenBarang = "";
                } else {
                    jenBarang = $scope.item.jenisProduk.id
                }

                if ($scope.item.namaBarang === undefined) {
                    barangId = "";
                } else {
                    barangId = $scope.item.namaBarang.id
                }
                manageSarpras.getDaftarPemakaian(kelBarang, jenBarang, barangId, periode).then(function(e) {
                    $scope.isReport = true;
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: e.data.data
                    });
                })
            }
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

            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })
            $scope.Back = function(){
                window.history.back();
            }
            $scope.batal = function(){
                $scope.item = {};
                init();
            }
            $scope.cetak = function() {
                var kelBarang, jenBarang, barangId, dateStart, dateEnd;
                if ($scope.item.kelompokBarang === undefined) {
                    kelBarang = "";
                } else {
                    kelBarang = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jenBarang = "";
                } else {
                    jenBarang = $scope.item.jenisProduk.id
                }

                if ($scope.item.namaBarang === undefined) {
                    barangId = "";
                } else {
                    barangId = $scope.item.namaBarang.id
                }

                if ($scope.item.periodeAwal === undefined) {
                    dateStart = "";
                } else {
                    dateStart = DateHelper.getPeriodeFormatted($scope.item.periodeAwal)
                }

                if ($scope.item.periodeAhir === undefined) {
                    dateEnd = "";
                } else {
                    dateEnd = DateHelper.getPeriodeFormatted($scope.item.periodeAhir)
                }

                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.cetakBarangHabispakai(kelBarang, jenBarang, barangId, dateStart, dateEnd));
                window.open($scope.urlBilling, '','width=800,height=600');
            }
        }
    ]);
});