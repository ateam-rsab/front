define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPenerimaanLogistikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'DaftarPenerimaanLogistik', 'dataRupService',
        function($rootScope, $scope, ModelItem, $state, DateHelper, DaftarPenerimaanLogistik, dataRupService) {
            $scope.title = "";
            $scope.dataVOloaded = true;

            $scope.now = new Date();
            $scope.item = {};
            $scope.item.dari = $scope.now;
            $scope.item.sampai = $scope.now;

            $scope.distribusiAset = false;

            // DaftarPenerimaanLogistik.getDaftarPenerimaan('', moment(new Date($scope.item.dari)).format('YYYY-MM-DD'), moment(new Date($scope.item.sampai)).format('YYYY-MM-DD'), '', '').then(function(dat) {
            //     $scope.sourcePenerimaan = new kendo.data.DataSource({
            //         data: dat.data.data,
            //         pageSize: 20,
            //         editable: false,
            //     });
            // });
            // dataRupService.getData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.sourceSuplier = data;
            // })
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
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false,
                pageable: true,
                pageSize: 20,
                columns: [{
                        "field": "noRec",
                        "title": "No Record",
                        "hidden": true
                    },
                    {
                        "field": "noFaktur",
                        "title": "No Faktur",
                        width: "200px"
                    },
                    {
                        "field": "namaBarang",
                        "title": "Nama Barang",
                        width: "320px"
                    },
                    {
                        "field": "sumberDana",
                        "title": "Sumber Dana",
                        filterable: false
                    },
                    {
                        "field": "tanggalFaktur",
                        "title": "Tanggal Faktur",
                        template: "#= new moment(tanggalFaktur).format(\'DD-MM-YYYY\') #",
                        filterable: false,
                        attributes: {
                            style: "text-align:center"
                        }
                    },
                    {
                        "field": "tanggalPenerimaan",
                        "title": "Tanggal Terima",
                        template: "#= new moment(tanggalPenerimaan).format(\'DD-MM-YYYY\') #",
                        filterable: false,
                        attributes: {
                            style: "text-align:center"
                        }
                    },
                    {
                        "field": "qtyProduk",
                        "title": "Qty",
                        filterable: false,
                        width: "60px",
                        format: "{0:n0}",
                        attributes: {
                            style: "text-align:right"
                        }
                    },
                    {
                        "field": "satuanStandar",
                        "title": "Satuan",
                        filterable: false
                    }
                ]
            };

            // dataRupService.getData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.listSuplier = data;
            // });

            $scope.cari = function() {
                var noFaktur, tglAwal, tglAhir, produkId, supplierId;
                if ($scope.item.noFaktur !== undefined) {
                    noFaktur = $scope.item.noFaktur;
                } else {
                    noFaktur=""
                }
                if ($scope.item.dari !== undefined) {
                    tglAwal = moment(new Date($scope.item.dari)).format('YYYY-MM-DD');
                } else {
                    tglAwal=""
                }
                if ($scope.item.sampai !== undefined) {
                    tglAhir = moment(new Date($scope.item.sampai)).format('YYYY-MM-DD');
                } else {
                    tglAhir=""
                }
                if ($scope.item.namaBarang !== undefined) {
                    produkId = $scope.item.namaBarang.id;
                } else {
                    produkId=""
                }
                if ($scope.item.supplier !== undefined) {
                    supplierId = $scope.item.supplier.id;
                } else {
                    supplierId=""
                }
                DaftarPenerimaanLogistik.getDaftarPenerimaan(noFaktur, tglAwal, tglAhir, produkId, supplierId).then(function(dat) {
                    $scope.dataGrid = dat.data.data;
                    $scope.sourcePenerimaan = new kendo.data.DataSource({
                        data: $scope.dataGrid,
                        pageSize: 20,
                        editable: false,
                    });
                });
                // dataRupService.getDataRUP("penerimaan-barang/grid-penerimaan-barang"+tgl, true).then(function(dat){
                //     $scope.sourcePenerimaan = dat.data.data;
                // }); 
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

            $scope.sourceSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            debugger;
            // $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-single', true);
            
            $scope.kl = function(current) {
                $scope.current = current;

                if ($scope.current.jenisPenerimaan === "bagianUmum" )
                    $scope.distribusiAset = true;
            }
            $scope.NavToDistribusi = function() {
                $state.go('DistribusiBarangLogistik', {
                    noRec: $scope.current.noRec
                });
            };

            $scope.batal = function() {
                $scope.item = {};
            }

            $scope.printQR = function() {
                debugger;
            }
        }
    ])
})