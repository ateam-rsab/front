define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('ChangeOrderRadiologiCtrl', ['FindProduk', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai', 'FindPasienLaboratorium', 'DateHelper', 'ManageRadiologi', 'FindPasienRadiologi',
        function(produkService, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai, findPasienLaboratorium, dateHelper, manageRadiologi, findPasienRadiologi) {

            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.now = new Date();
            $scope.items = {
                "tanggalPermintaan": $scope.now,
                "tglHaidTerkait": $scope.now
            };
            if ($state.params.noAntrianPasien !== undefined) {
                debugger;
                findPasien.getByNoRegistrasi($state.params.noAntrianPasien).then(function(data) {
                    $scope.item = ModelItem.beforePost(data.data, true);
                    $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                    $scope.item.jenisKelamin = data.data.pasien.jenisKelamin.jenisKelamin;
                    $scope.item.statusPerkawinan = data.data.pasien.statusPerkawinan.statusPerkawinan;
                    $scope.item.alamat = data.data.alamat.alamatLengkap;
                    $scope.item.ruangan = data.data.pasienDaftar.ruanganId;
                    // $scope.item.pasien.umur = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                    $scope.item.tglRegistrasi = new moment(data.data.tglRegistrasi).format('DD MMMM YYYY');
                    $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
                    $scope.item.displayCito = $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
                });

                // add_by_hanafi
                produkService.jenisProdukByKelompokProduk(2).then(function(e) {
                    $scope.listJenisProduk = e.data.data;
                    // akhir
                });

            } else {
                debugger;
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
            $scope.$watch('items.detailProduk', function(e) {
                if (e === undefined) return;
                produkService.produkByJenisProduk(e.id).then(function(e) {
                    $scope.listProduk = e.data.data;
                });
            });
            $scope.$watch('items.jenisProduk', function(e) {
                if (e === undefined) return;
                produkService.detailJenisProdukByJenisProduk(e.id).then(function(e) {
                    $scope.listDetailJenisProduk = e.data.data;
                });
            });
            $scope.navigate = function() {
                // temporary disable
                // var obj = {};
                // for (var key in $state.params) {
                //     if ($state.params.hasOwnProperty(key)) {
                //         var element = $state.params[key];
                //         obj[key] = element;
                //     }
                // }
                // $state.go('dashboardpasien.PengkajianMedis.Rencana.Order.HistoryRadiologi', obj);
            }
            $scope.removeOrderPemeriksaan = function(e) {
                e.preventDefault();

                var grid = this,
                    row = $(e.currentTarget).closest("tr"),
                    selectedItem = grid.dataItem(row);

                $scope.dataPemeriksaanRadiolog.remove(selectedItem);
                $scope.reloadDataRadiologi();
            };
            $scope.reloadDataRadiologi = function(){
                var i = 1;
                $scope.dataPemeriksaanRadiolog._data.forEach(function(items){
                    items.no = i;
                    i++;
                })
                $scope.dataRadiologi.refresh();
                debugger;
            }
            $scope.columnPemeriksaanRadiolog = [{
                "field": "no",
                "title": "No",
                "width": 40,
            }, {
                "field": "produk.namaProduk",
                "title": "Nama Pemeriksaan"
            }, {
                "field": "produk.ketkeluhan",
                "title": "Keluhan"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeOrderPemeriksaan
                },
                title: "&nbsp;",
                width: 80
            }];
            findPasienRadiologi.getOrder($state.params.noOrder).then(function(data) {
                $scope.orders = data.data.data.orders[0];
                var items = $scope.orders.detail;
                // $scope.noRec = data.data.data.orders[0].noRec;
                var data = [];
                for (var key in items) {
                    if (items.hasOwnProperty(key)) {
                        var element = items[key];
                        element.no = data.length + 1;
                        debugger;
                        // element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                        if (element.keteranganLainnya === "Sudah diverifikasi")
                            element.check = true;
                        element.orderRec = element.noRec;
                        data.push(element);
                    }
                }
                // console.log(JSON.stringify(data));
                // $scope.dataPemeriksaanRadiolog = _.groupBy(data, 'jenisPeriksa');
                $scope.dataPemeriksaanRadiolog = new kendo.data.DataSource({
                    data: data
                })
                // debugger;
            });
            // $scope.dataPemeriksaanRadiolog = new kendo.data.DataSource({
            //     data: []
            // })
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
                data.ketkeluhan = $scope.items.keluhan;
                debugger;
                data.no = $scope.dataPemeriksaanRadiolog._data.length + 1;
                $scope.dataPemeriksaanRadiolog.add({
                    "no": data.no,
                    "noRec": "",
                    "tglPelayanan": new Date(),
                    "qtyProduk": 1,
                    "qtyProdukRetur":1,
                    "isCito": 0,
                    "produk":{
                        "id": data.id,
                        "namaProduk": data.namaProduk,
                        "ketkeluhan": data.ketkeluhan
                    },
                    "ruangan":{
                        "id":$scope.orders.strukOrder.ruanganId
                    },
                    "ruanganTujuan":{
                        "id":$scope.orders.strukOrder.ruanganTujuanId
                    }
                });
                toastr.info(data.namaProduk + " telah di tambahkan");
                // console.log(JSON.stringify($scope.dataPemeriksaanRadiolog._data));
            }

            $scope.removeOrderRaiolog = function() {
                $scope.dataPemeriksaanRadiolog.data([]);
            };

            $scope.Save = function() {
                var data = [];
                $scope.dataPemeriksaanRadiolog._data.forEach(function(element){
                    if (element.produk.id !== undefined) {
                        debugger;
                        data.push({
                            "noRec": element.noRec,
                            "tglPelayanan": element.tglPelayanan,
                            "qtyProduk": element.qtyProduk,
                            "qtyProdukRetur": element.qtyProdukRetur,
                            "isCito": element.isCito,
                            "produk":{
                                "id": element.produk.id,
                            },
                            "ruangan":{
                                "id":element.ruangan.id,
                            },
                            "ruanganTujuan":{
                                "id":element.ruanganTujuan.id,
                            }
                        });
                    }
                })
                $scope.items.tglHaidTerkait = dateHelper.getDateTimeFormatted(new Date($scope.items.tglHaidTerkait));
                $scope.items.tanggalPermintaan = dateHelper.getDateTimeFormatted(new Date($scope.items.tanggalPermintaan));
                // console.log(JSON.stringify(data));
                manageRadiologi.updateOrderRadiologi($scope.orders.strukOrder.noRec, $scope.orders.strukOrder.noOrder, data).then(function(e){
                    // debugger;
                    // console.log(e.data);
                    $scope.isNext = true;
                }) ;
            }
        }

    ]);
});