/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function(initialize) {

    'use strict';
    initialize.controller('DaftarPasienMasukRawatInapCtrl', ['$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem',
        function($state, findPasien, $rootScope, $scope, ModelItem) {
            $scope.title = "Daftar Pasien Masuk Rawat Inap";
            $scope.dataVOloaded = false;
            $scope.item = {};
            $scope.now = new Date();
            ModelItem.get("DaftarPasienMasukRawatInap").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            // ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
            //     $scope.listRuangan = data;
            // })
            // ModelItem.getDataDummyGeneric("Kelas", false).then(function(data) {
            //     $scope.listKelas = data;
            // });

            var dataItem = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
            dataItem.fetch(function() {
                $scope.listRuangan = dataItem._data;
            })

            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined) return;
                var ruanganId = $scope.item.ruangan.id;
                findPasien.getKelasByRuangan(ruanganId).then(function(a) {
                    $scope.listKelas = a.data.data.listData;
                })
            });

            $scope.mainGridOptions = {
                dataBound: function() {}
            };
            $scope.masuk = function() {
                var dataItem = $scope.data;
                debugger;
                if ($scope.data.statusRegistrasi.indexOf('Menunggu') >= 0)
                    $state.go('MasukKamar', {
                        noRec: $scope.data.pasienDaftar.pasienDaftar.noRec,
                        noPersetujuan: $scope.data.noRec,
                        instruksi: $scope.data.pertolongan === null ? "-" : $scope.data.pertolongan,
                        noCm: $scope.data.pasienDaftar.pasienDaftar.pasien.noCm
                    })
                else
                    window.messageContainer.log("Pasien sudah diregistrasikan");
            }
            $scope.group = {
                field: "ruanganTujuan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruanganTujuan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.findData = function() {
                debugger;
                findPasien.getSuratPermintaanMasukRumahSakitAll("papgeneric/find-medical-record-tglInput/?key=tglMasukRuangan&i=SuratPermintaanMasuk&from=" + moment($scope.from).format('YYYY-MM-DD hh:mm:ss') + "&until=" + moment($scope.until).format('YYYY-MM-DD hh:mm:ss')).then(function(e) {
                    $scope.listDaftar = new kendo.data.DataSource({
                        data: ModelItem.beforePost(_.filter(e.data.data.SuratPermintaanMasuk, function(p) {
                            if (p.unit == null)
                                p.unit = {"namaRuangan":""};
                            if (p.statusRegistrasi === true){
                                p.statusRegistrasi = "Sudah Registrasi";
                            } else {
                                p.statusRegistrasi = "Menunggu verifikasi";
                            }
                                
                            return true; //p.statusRegistrasi === undefined || p.statusRegistrasi === false;
                            $scope.xxxx = p
                        }), true)
                    });
                });

            }
            $scope.findData();

            /*if (unit.namaRuangan== null) {
                    unit.namaRuangan = "kosong"
                }*/
            $scope.columnDaftar = [{
                    field: "pasienDaftar.pasienDaftar.pasien.noCm",
                    title: ModelItem.translate("No Rekam Medis", 1),
                    width: 120
                }, {
                    field: "pasienDaftar.pasienDaftar.pasien.namaPasien",
                    title: ModelItem.translate("Nama", 1)
                }, {
                    field: "pasienDaftar.ruangan.namaRuangan",
                    title: ModelItem.translate("Ruangan Asal", 1),
                    aggregates: ["count"],
                    groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
                }, {
                    field: "pasienDaftar.pasienDaftar.kelas.namaKelas",
                    title: ModelItem.translate("Kelas Perawatan", 1),
                    width: 150
                },
                // {
                //     field: "tglRencana",
                //     title: ModelItem.translate("Tanggal Rencana", 1),
                //     template: "#= new moment(new Date(tglRencana)).format('DD-MM-YYYY') #",
                //     width: 120
                // },

                {
                    hidden: true,
                    field: "pasienDaftar.ruangan.namaRuangan",
                    title: ModelItem.translate("Nama Ruangan", 1),
                }, {
                    field: "pasienDaftar.pasienDaftar.kelompokPasien.kelompokPasien",
                    title: ModelItem.translate("Tipe Pembayaran", 1),
                    width: 150
                }, {
                    field: "statusRegistrasi",
                    title: ModelItem.translate("Status", 1),
                    width: 150
                },
            ];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }


        }
    ]);

});