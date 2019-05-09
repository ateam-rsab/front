/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function(initialize) {

    'use strict';
    initialize.controller('FormPermintaanMakananPasienDariRuangRawatCtrl', ['ManagePasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageGizi', '$state', 'FindPasien',
        function(managePasien, $rootScope, $scope, ModelItem, DateHelper, manageGizi, $state, findPasien) {
            debugger;
            $scope.title = "Form Permintaan Makanan Pasien dari Ruang Rawat";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.showTF = false;
            $scope.now = new Date();
            $scope.noAll = 1;
            $scope.data = {};
            $scope.noCM = $state.params.noCM;
            $scope.pasien = {};


            ModelItem.get("FormPermintaanMakananPasienDariRuangRawat").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            if ($state.current.name === 'dashboardpasien.PengkajianMedis.Rencana.Order.Gizi') {
                $rootScope.showMenu = false;
                $rootScope.showMenuDetail = false;
            } else {
                $rootScope.showMenu = true;
                $rootScope.showMenuDetail = false;
            }

            $scope.pasien = {};
            findPasien.getAlergiByNoCm($scope.noCM).then(function(e) {
                $scope.dataRow = new kendo.data.DataSource({
                    data: e.data.data.PapAlergi
                });
            });
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data.data;
                $scope.pasien = data.data.data;
                $scope.item.nama = $scope.pasien.namaPasien;
                $scope.data.namaPemesan = $scope.pasien.namaPasien;
                $scope.item.jenisKelamin = $scope.pasien.jenisKelamin.jenisKelamin;
                $scope.item.noCM = $scope.pasien.noCm;
                $scope.item.tglPendaftaran = DateHelper.formatDate($scope.pasien.tglDaftar);
                // $scope.item.diagnosis = $scope.pasien.diagnosis;
                // $scope.item.tipePembayaran = $scope.pasien.tipePembayaran;
                // $scope.item.kelas = $scope.pasien.kelas;
            });

            ModelItem.getDataDummyGeneric("JenisWaktu", false).then(function(data) {
                $scope.listJenisWaktu = data;
            })

            ModelItem.getDataDummyGeneric("JenisDiet", false).then(function(data) {
                $scope.listJenisDiet = data;
            })
            $scope.listNamaMenu = ModelItem.kendoHttpSource('/product/find-menu-diet', true);


            ModelItem.getDataDummyGeneric("BentukProduk", false).then(function(data) {
                var obj34 = _.find(data, function(e) {
                        return e.id === 34;
                    });
                var obj35 = _.find(data, function(e) {
                        return e.id === 35;
                    });

                $scope.listTipeMakanan = [obj34, obj35];

            })
            ModelItem.getDataDummyGeneric("SatuanWaktu", false).then(function(data) {
                $scope.listFrekuensi = data;
            })

            $scope.dataRow = new kendo.data.DataSource({
                // data: $scope.listPatients,
                // group: $scope.group
                data: []
            });

            $scope.columnData = [{
                field: "alergi.namaAlergi",
                title: "Alergi Makanan"
            }, {
                field: "reaksi",
                title: "Reaksi"
            }, {
                field: "keteranganData",
                title: "Keterangan"
            }];
            $scope.isNotVip = true;
            $scope.modelKendoGrid = {};
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.isNotVip = data.data.kelas.id === 1 || data.data.kelas.id === 2;
                if ($rootScope.$$phase === null)
                    $scope.$apply();
            });
            $scope.$watch('modelKendoGrid.noAll', function(e) {
                $scope.item.jenisDiet = $scope.modelKendoGrid.jenisDiet;
                $scope.item.tipeMakanan = $scope.modelKendoGrid.tipeMakanan;
                $scope.item.tglPesan = DateHelper.formatDate($scope.modelKendoGrid.tglPesan);
                $scope.item.namaMenu = $scope.modelKendoGrid.namaMenu;
                $scope.item.jenisWaktu = $scope.modelKendoGrid.jenisWaktu;
                $scope.item.minum = $scope.modelKendoGrid.minum;
                $scope.item.frekuensi = $scope.modelKendoGrid.frekuensi;
                $scope.item.volume = $scope.modelKendoGrid.volume;
            });

            $scope.dataAllRow = new kendo.data.DataSource({
                data: []
            });

            $scope.columnAllData = [{
                    "field": "noAll",
                    "title": "No",
                    "width": "50px"
                },
                // {
                //     "field": "namaPemesan",
                //     "title": "Nama Pemesan",

                // },
                {
                    "field": "tglPesan",
                    "title": "Tanggal Pesan",

                }, {
                    "field": "jenisWaktu.jenisWaktu",
                    "title": "Jenis Waktu",
                }, {
                    "field": "jenisDiet.jenisDiet",
                    "title": "Jenis Diet",

                }, {
                    "field": "namaMenu.namaProduk",
                    "title": "Nama Menu",

                }, {
                    "field": "tipeMakanan.namaBentukProduk",
                    "title": "Tipe Makanan",

                }
                // ,
                //  {
                //     "field": "minum",
                //     "title": "Minum",

                // }, {
                //     "field": "frekuensi.reportDisplay",
                //     "title": "Frekuensi",
                // }, {
                //     "field": "volume",
                //     "title": "Volume",

                // }
            ];

            $scope.addAllDataToRow = function() {
                if ($scope.data.jenisWaktu === undefined)
                    $scope.data.jenisWaktu = $scope.listJenisWaktu[0];
                if ($scope.data.namaMenu === undefined)
                    $scope.data.namaMenu = { id: 2, namaProduk: '-' };
                var tempData = {
                    "noAll": $scope.noAll++,
                    // "namaPemesan": $scope.data.namaPemesan,
                    "tglPesan": DateHelper.getTanggalFormatted($scope.data.tglPesan),
                    "jenisDiet": $scope.data.jenisDiet,
                    "tipeMakanan": $scope.data.tipeMakanan,
                    "jenisWaktu": $scope.data.jenisWaktu,
                    "namaMenu": $scope.data.namaMenu,
                    "minum": $scope.data.minum,
                    "frekuensi": $scope.data.frekuensi,
                    "volume": $scope.data.volume
                }
                $scope.dataAllRow.add(tempData);
                $scope.resetAll();
            };

            $scope.row = function(a, b, c, d, e, f, g, h, i) {
                $scope.item = angular.copy($scope.get(id));
            }

            $scope.resetAll = function() {
                $scope.data.jenisWaktu = null;
                $scope.data.namaMenu = null;
                $scope.data.tipeMakanan = null;
            }

            $scope.Save = function() {
                $scope.listData = [];
                for (var i in $scope.dataAllRow._data) {
                    var dataGrid = {};
                    var dataItem = $scope.dataAllRow._data[i];
                    if (dataItem.tglPesan !== undefined || dataItem.keterangan !== undefined) {
                        dataGrid = {
                            tglPesan: dataItem.tglPesan,
                            jenisWaktu: dataItem.jenisWaktu,
                            jenisDiet: dataItem.jenisDiet,
                            namaMenu: dataItem.namaMenu,
                            tipeMakanan: dataItem.tipeMakanan,
                            minum: dataItem.minum,
                            frekuensi: dataItem.frekuensi,
                            volume: dataItem.volume
                        };
                        $scope.listData.push(dataGrid);
                    }

                }
                $scope.item.orderPelayanan = $scope.listData;
                $scope.item.pasien = { noRec: $state.params.noRec };
                $scope.item.noRec = { noRec: $state.params.noRec };
                var data = [];
                for (var key in $scope.dataAllRow._data) {
                    if ($scope.dataAllRow._data.hasOwnProperty(key)) {
                        var element = $scope.dataAllRow._data[key];
                        if (element.jenisWaktu !== undefined)
                            data.push({
                                produk: element.namaMenu,
                                jenisWaktu: element.jenisWaktu,
                                tipeMakanan: element.tipeMakanan,
                                jenisDiet: element.jenisDiet
                            }
                        );
                    }
                }
                //manageGizi.saveFormPermintaanMakananPasien(ModelItem.beforePost($scope.item)).then(function() {}, function(err) {});
                managePasien.orderTindakanGizi($scope.pasien, $scope.tanggal, ModelItem.beforePost({
                    orderTindakan: data,
                    strukOrder: {
                        tglOrder: $scope.data.tglPesan,
                        pegawaiOrder: ModelItem.getPegawai(),
                        keteranganOrder: "Order Gizi"
                    },
                    ruangan: { id: 54 },
                    noRec: $state.params.noRec
                }));
            };

        }
    ]);

});