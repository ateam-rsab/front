define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarStokCtrl', ['FindProduk', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'PengajuanUsulanAnggaranService',
        function(findProduk, $rootScope, $scope, ModelItem, DateHelper, PengajuanUsulanAnggaranService) {
            $scope.now = new Date();
            PengajuanUsulanAnggaranService.getGetData("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
                $scope.listSumberDana = dat;
                // debugger;
            });

            var init = function(){ 
                $scope.item = {
                    from: $scope.now,
                    until: $scope.now,
                    kelUser: document.cookie.split(';')[0].split('=')[1]
                };

                PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                    $scope.item.ruangan = dat.data.data;
                });

                if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                    $scope.bukanLogistik = false;
                } else {
                    $scope.bukanLogistik = true;
                }
                $scope.isKelompok = true;
                $scope.isJenis = true;
            }

            init();

            $scope.$watch('item.ruanganAsal', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                // jenisBarangId, ruanganId, asalProdukId, produkId

                $scope.item.ruangan.id = e.id;

            })
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
                // jenisBarangId, ruanganId, asalProdukId, produkId

                // findProduk.getDaftarStok(e.id, $scope.item.ruangan.id, '', '').then(function(e) {
                //     $scope.daftarKartuStok = new kendo.data.DataSource({
                //         data: e.data.data
                //     });
                //     $scope.daftarKartuStok.fetch();
                // })

            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);

            // $scope.$watch('item.kelompokBarang', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === undefined) return;
            //     $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
            //     $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            //     $scope.isKelompok = false;
            // })
            // $scope.$watch('item.jenisProduk', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === undefined) return;
            //     $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            //     $scope.isJenis = false;
            // })
            // $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });
            $scope.Proses = function() {
                if (!$scope.item.kelompokBarang) {
                    var kelompokBarangIdx = '';
                } else {
                    var kelompokBarangIdx = $scope.item.kelompokBarang.id;
                }
                if (!$scope.item.namaBarang) {
                    var namaBarangIdx = '';
                } else {
                    var namaBarangIdx = $scope.item.namaBarang.id;
                }

                if (!$scope.item.asalProduk ) {
                    var asalProdukId = '';
                } else {
                    var asalProdukId = $scope.item.asalProduk.id;
                }

                if (!$scope.item.ruanganAsal) {
                    var ruanganId = $scope.item.ruangan.id;
                } else {
                    var ruanganId = $scope.item.ruanganAsal.id;
                }

                findProduk.getDaftarStok(kelompokBarangIdx, ruanganId, asalProdukId, namaBarangIdx).then(function(e) {
                    e.data.tanggalKejadian = DateHelper.getPeriodeFormatted(new Date(e.data.tanggalKejadian));

                    $scope.daftarKartuStok = new kendo.data.DataSource({
                        data: e.data.data
                    });
                    $scope.daftarKartuStok.fetch();
                })
            }
            $scope.columnKartuStok = [
                {
                    "field": "kodeProduk",
                    "title": "Kode Produk",
                    "width": 200,
                    type: "date",
                    format: "{0:dd/MM/yyyy}"
                },{
                    "field": "namaProduk",
                    "title": "Nama Produk",
                    "width": 200,
                    type: "date",
                    format: "{0:dd/MM/yyyy}"
                },
                {
                    "field": "asalProduk",
                    "title": "Asal Produk",
                    "width": "25%"
                }, {
                    "field": "qtyProduk",
                    "title": "Saldo",
                    "width": "10%",
                    type: "number",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:right"
                    }
                }, {
                    "field": "qtyTerkecil",
                    "title": "Saldo Minimum",
                    "width": "10%",
                    type: "number",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:center"
                    }
                }, {
                    "field": "qtyTerkecil",
                    "title": "Saldo Maksimum",
                    "width": "10%",
                    type: "number",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:center"
                    }
                }
            ];
            $scope.Batal = function(){
                $scope.daftarKartuStok = new kendo.data.DataSource({
                    data: []
                });
                $scope.daftarKartuStok.fetch();
                init();
            }
        }
    ]);
});