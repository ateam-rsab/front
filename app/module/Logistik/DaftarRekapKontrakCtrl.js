define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarRekapKontrakCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'DaftarPenerimaanLogistik', 'dataRupService',
        function($rootScope, $scope, ModelItem, $state, DateHelper, DaftarPenerimaanLogistik, dataRupService ) {
            $scope.title = "";
            $scope.dataVOloaded = true;

            $scope.now = new Date();
            $scope.item = {};

            //show button distribusi if field value = bagianUmum else show button Input Penerimaan
            $scope.item.awal = $scope.now;
            $scope.item.akhir = $scope.now;

            $scope.kirimPersediaan = true;
            $scope.kirimAset = false;

            $scope.listSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // dataRupService.getData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.listSuplier = data;
            // });

            $scope.loadAwal = function() {

                // DaftarPenerimaanLogistik.getDaftarPenerimaan("kartu-pengendali/pre-add-penerimaan").then(function(dat) {
                dataRupService.getDataRUP("kartu-pengendali/pre-add-penerimaan", true).then(function(dat){
                    $scope.sourcePenerimaan = dat.data.data;

                    for (var i = $scope.sourcePenerimaan.length - 1; i >= 0; i--) {
                        // $scope.sourcePenerimaan[i].tanggalFaktur = moment(new Date($scope.sourcePenerimaan[i].tanggalFaktur)).format('YYYY-MM-DD');
                        // $scope.sourcePenerimaan[i].tanggalPenerimaan = moment(new Date($scope.sourcePenerimaan[i].tanggalPenerimaan)).format('YYYY-MM-DD');
                    }

                });

            };

            $scope.mainGridOptions = {
                data: $scope.sourcePenerimaan,
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
                        return response.totalRow; // total is returned in the "total" field of the response
                    }
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageable: true,
                columns: [{
                        "field": "noRec",
                        "title": "No Record",
                        "hidden": true
                    },
                    {
                        "field": "noRekap",
                        "title": "No Kontrak",
                        width: "120px",
                        attributes: {
                            style: "text-align:center"
                        },
                        headerAttributes: {
                            style: "text-align:center"
                        }
                    },
                    {
                        "field": "tanggal",
                        "title": "Tanggal Kontrak",
                        filterable: false,
                        width: "120px",
                        attributes: {
                            style: "text-align:center"
                        },
                        headerAttributes: {
                            style: "text-align:center"
                        }
                    },
                    {
                        "field": "namaSupplier",
                        "title": "Nama Supplier"
                    },
                    {
                        "field": "totalCount",
                        "title": "Jumlah Item",
                        width: "120px",
                        attributes: {
                            style: "text-align:center"
                        },
                        filterable: false,
                        headerAttributes: {
                            style: "text-align:center"
                        }
                    },
                    {
                        "field": "totalHargaBarangSupplier",
                        "title": "Total Biaya",
                        filterable: false,
                        format: "{0:n0}",
                        attributes: {
                            style: "text-align:right"
                        },
                        width: "120px",
                        headerAttributes: {
                            style: "text-align:center"
                        }
                    }
                ]
            };

            $scope.loadAwal();

            $scope.cariKontrak = function() {
                var tgl,supplier;
                if ($scope.item.dari !== undefined && !$scope.item.sampai !== undefined) {
                    tgl = "?dateStart="+DateHelper.getPeriodeFormatted($scope.item.dari)+"&dateEnd="+DateHelper.getPeriodeFormatted($scope.item.sampai);
                } else {
                    tgl="?dateStart=&dateEnd="
                }

                if ($scope.item.supplier !== undefined) {
                    debugger;
                    supplier= "&supplierId=" + $scope.item.supplier.id;
                } else {
                    supplier = "&supplierId=";
                }

                dataRupService.getDataRUP("kartu-pengendali/pre-add-penerimaan"+tgl+supplier, true).then(function(dat){
                    
                    $scope.sourcePenerimaan = dat.data.data;

                    $scope.sourcePenerimaan.forEach(function(items){

                        items.tanggal = DateHelper.getPeriodeFormatted(new Date(items.tanggal));
                        // var isVerifikasiCustom = [];

                        // items.isVerifikasi.forEach(function(items){
                        //     isVerifikasiCustom.push(data.isVerifikasi);
                        // })

                        // items.isVerifikasi = JSON.stringify(isVerifikasiCustom);

                    })
                }); 
            }

            $scope.kl = function(current) {
                $scope.current = current;
                // console.log(current)

                //show button distribusi if field value = bagianUmum else show button Input Penerimaan
                // if ($scope.current.jenisPenerimaan !== "logistik") {
                //     $scope.kirimPersediaan = false;
                //     $scope.kirimAset = true;
                // }
            }

            $scope.NavToPenerimaan = function() {
                // $state.go('PenerimaanBarangLogistik', {
                //     noRec: $scope.current.noRec
                // });
                $state.go('DemoPenerimaanLogistik', {
                    noRec: $scope.current.noRec
                });
            }
            // $scope.NavToDistribusi = function() {
            //     $state.go('DistribusiBarangLogistik', {
            //         noRec: $scope.current.noRec
            //     });
            // }
            $scope.batal = function() {
                $scope.item = {};
            }
            $scope.kembali = function() {
                window.history.back();
            }
        }
    ])
})