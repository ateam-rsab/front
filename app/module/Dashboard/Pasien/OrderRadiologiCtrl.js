define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('OrderRadiologiCtrl', ['FindProduk', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai',

        function(produkService, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai) {
            $scope.item = {};
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.now = new Date();
            $scope.item.tglPermintaan= new Date($scope.now);
            
            if ($state.params.noRec !== undefined) {
                findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
                    $scope.noCM = e.data.data.pasien.noCm;
                    $scope.tanggal = moment(ModelItem.beforePost(e.data.data).tglRegistrasi).format('YYYY-MM-DD HH:mm:ss.SSS');
                    findPasien.getByNoCM($scope.noCM).then(function(data) {
                        $rootScope.currentPasien = data.data;
                        $scope.pasien = data.data.data;
                    });
                });

                // add_by_hanafi
                produkService.jenisProdukByKelompokProduk(2).then(function(e) {
                    $scope.listJenisProduk = e.data.data;
                    // akhir
                });

            } else {
                findPasien.getByNoCM($scope.noCM).then(function(data) {
                    $rootScope.currentPasien = data.data.data;
                    $scope.pasien = data.data.data;
                });
                findPasien.getDiagnosisKerja($scope.noCM, $scope.tanggal).then(function(e) {
                    $scope.diagnosisKerja = e.data;
                })

                findPasien.getDiagnosisTindakan($scope.noCM, $scope.tanggal).then(function(e) {
                    $scope.diagnosisTerapi = e.data;
                });

            }
            produkService.jenisProdukByKelompokProduk(2).then(function(e) {
                $scope.listJenisProduk = e.data.data;
            });
            $scope.$watch('item.detailProduk', function(e) {
                if (e === undefined) return;
                produkService.produkByJenisProduk(e.id).then(function(e) {
                    $scope.listProduk = e.data.data;

                });

            });
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                produkService.detailJenisProdukByJenisProduk(e.id).then(function(e) {
                    $scope.listDetailJenisProduk = e.data.data;

                });


            });

            $scope.navigate = function() {
                var obj = {};
                for (var key in $state.params) {
                    if ($state.params.hasOwnProperty(key)) {
                        var element = $state.params[key];
                        obj[key] = element;
                    }
                }
                $state.go('dashboardpasien.PengkajianMedis.Rencana.Order.HistoryRadiologi', obj);

            }


            $scope.removeRiwayatPenyakitOrObat = function(e) {
                debugger;
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataPemeriksaanRadiolog.remove(selectedItem);
            };

            $scope.columnPemeriksaanRadiolog = [{
                "field": "no",
                "title": "No",
                "width": 50
            }, {
                "field": "namaProduk",
                "title": "NamaPemeriksaan"
            }, {
                "field": "ketkeluhan",
                "title": "Keluhan"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatPenyakitOrObat
                },
                title: "&nbsp;",
                width: "110px"
            }];

            $scope.dataPemeriksaanRadiolog = new kendo.data.DataSource({
                data: []
            })
            $scope.AddProduk = function(data) {
                debugger;
                if (data.namaBahanSample == undefined) {
                    data.namaBahanSample = "";
                }
                if (data.bahanSample !== undefined) {
                    data.namaBahanSample = data.bahanSample.namaBahanSample;
                }
                if (data.keterangan !== undefined) {
                    if (data.keterangan.length > 0) {
                        alert(data.keterangan);
                    }
                }
                data.ketkeluhan = $scope.item.keluhan
                data.no = $scope.dataPemeriksaanRadiolog._data.length + 1;
                $scope.dataPemeriksaanRadiolog.add(data);
                toastr.info(data.namaProduk + " telah di tambahkan");
            }

            


            $scope.removeOrderRaiolog = function() {

                $scope.dataPemeriksaanRadiolog.data([]);
            };

            $scope.Save = function() {
                debugger;
                var data = [];
                for (var key in $scope.dataPemeriksaanRadiolog._data) {
                    if ($scope.dataPemeriksaanRadiolog._data.hasOwnProperty(key)) {
                        var element = $scope.dataPemeriksaanRadiolog._data[key];
                        if (element.id !== undefined)
                            data.push({
                                produk: element
                            });
                    }
                }
                managePasien.orderTindakanRadiologi($scope.pasien, $scope.tanggal, ModelItem.beforePost({
                    detailRadiologi: {
                        tglHaidTerkait: $scope.item.tglHaidTerkait,
                        keluhan: $scope.item.keluhan,
                    },
                    orderTindakan: data,
                    strukOrder: {
                        tglOrder: $scope.item.tglPermintaan,
                        pegawaiOrder: ModelItem.getPegawai(),
                        keteranganOrder: "Permintaan Radiologi"
                    },
                    noRec: $state.params.noRec
                }));
            }
        }

    ]);
});