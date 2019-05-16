define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPenerimaanAsetCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'DaftarPenerimaanLogistik', 'dataRupService',
        function($rootScope, $scope, ModelItem, $state, DateHelper, DaftarPenerimaanLogistik, dataRupService) {
            // duplicate from daftar penerimaan logistik
            $scope.title = "";
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {
                kelUser: document.cookie.split(';')[0].split('=')[1]
            };
            if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                $scope.bukanLogistik = false;
                $scope.item.ruangan = "";
            } else {
                $scope.bukanLogistik = true;
                DaftarPenerimaanLogistik.getDaftarPenerimaan("anggaran/get-ruangan", true).then(function(dat){
                    $scope.item.ruangan = dat.data.data;
                });
            }
            dataRupService.getData("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });
            $scope.listSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // dataRupService.getData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.listSuplier = data;
            // });
            // $scope.isSelected = false;
            
            // Get all data on window load
            // dataRupService.getDataRUP("penerimaan-barang/list-penerimaan-barang/?" + noTerima + produk + jenisProduk + kelProduk + periode, true).then(function(dat){
            //     $scope.sourcePenerimaan = new kendo.data.DataSource({
            //         data: dat.data.data,
            //         groupable: true,
            //         group: {
            //             field: "namaProduk",
            //             dir: "asc"
            //         }
            //     });
            // });
            $scope.mainGridOptions = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                schema: {
                    total: function(response) {
                        debugger;
                        return response.total; // total is returned in the "total" field of the response
                    }
                },
                pageSize: 10,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false,
                pageable: true,
                columns: [{
                        "field": "namaProduk",
                        "title": "Nama Barang",
                        width: "320px"
                    },
                    {
                        "field": "noRegistrasiAset",
                        "title": "No. Aset"
                    },
                    {
                        "field": "namaRuangan",
                        "title": "Ruangan"
                    }
                ]
            };
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
                // $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            })
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            $scope.cariKontrak = function() {
                var noTerima,kelProduk,jenisProduk,produk,periode;
                // if ($scope.item.dari !== undefined && !$scope.item.sampai !== undefined) {
                //     tgl = "?tanggalTerimAwal="+moment(new Date($scope.item.dari)).format('YYYY-MM-DD')+"&tanggalTerimAhir="+moment(new Date($scope.item.sampai)).format('YYYY-MM-DD');
                // } else {
                //     tgl="?tanggalTerimAhir=&tanggalTerimAhir="
                // }
                if ($scope.item.noTerima !== undefined) {
                    noTerima = "noTerima=" + $scope.item.noTerima
                } else {
                    noTerima = "noTerima="
                }

                if ($scope.item.kelompokBarang !== undefined) {
                    kelProduk = "&kelompokProdukId=" + $scope.item.kelompokBarang.id
                } else {
                    kelProduk = "&kelompokProdukId="
                }

                if ($scope.item.jenisProduk !== undefined) {
                    jenisProduk = "&jenisProdukId=" + $scope.item.jenisProduk.id
                } else {
                    jenisProduk = "&jenisProdukId="
                }

                if($scope.item.namaBarang !== undefined) {
                    produk = "&produkId=" + $scope.item.namaBarang.id
                } else {
                    produk = "&produkId="
                }

                if ($scope.item.periodeAwal !== undefined && $scope.item.periodeAhir !== undefined) {
                    periode = "&tanggalAwal=" + moment(new Date($scope.item.periodeAwal)) + "&tanggalAhir=" + moment(new Date($scope.item.periodeAhir))
                } else {
                    periode = "&tanggalAwal=&tanggalAhir="
                }

                // if ($scope.enableNamaRuangan === true && $scope.item.ruanganAsal !== undefined) {
                //     ruangan = "ruanganId=" + $scope.item.ruanganAsal.id
                // } else {
                //     ruangan = "ruanganId=" + $scope.item.ruangan.id
                // }

                dataRupService.getDataRUP("penerimaan-barang/list-penerimaan-barang/?" + noTerima + produk + jenisProduk + kelProduk + periode, true).then(function(dat){
                    $scope.sourcePenerimaan = new kendo.data.DataSource({
                        data: dat.data.data,
                        groupable: true,
                        group: {
                            field: "namaProduk",
                            dir: "asc"
                        }
                    });
                }); 
            }

            $scope.kl = function(current) {
                $scope.current = current;
            }
            $scope.NavToDistribusi = function() {
                $state.go('DistribusiBarangLogistik', {
                    noRec: $scope.current.noRec
                });
            };

            $scope.batal = function() {
                $scope.item = {};
            }
        }
    ])
})