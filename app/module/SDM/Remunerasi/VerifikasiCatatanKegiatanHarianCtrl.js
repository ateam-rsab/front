define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('VerifikasiCatatanKegiatanHarianCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.init = () => {
                $scope.optGrid = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "namaIndikator",
                        title: "<h3>Indikator</h3>",
                        width: 150
                    }, {
                        field: "namaKegiatan",
                        title: "<h3>Kegiatan</h3>",
                        width: 100
                    }, {
                        field: "hasil",
                        title: "<h3>Hasil</h3>",
                        width: 50
                    }, {
                        field: "satuanIndikator",
                        title: "<h3>Satuan</h3>",
                        width: 70
                    }, {
                        field: "catatan",
                        title: "<h3>Catatan</h3>",
                        width: 200
                    }, {
                        field: "tglKegiatanFormat",
                        title: "<h3>Tanggal</h3>",
                        width: 100
                    }, {
                        field: "statusVerifikasi",
                        title: "<h3>Status</h3>",
                        width: 100
                    }, {
                        command: [{
                            text: "Verifikasi",
                            click: verifData,
                            imageClass: "k-icon k-i-pencil"
                        }, ],
                        title: "",
                        width: 70
                    }],
                }

                ManageSdmNew.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true&order=namaLengkap:asc").then((res) => {
                    $scope.listPegawai = res.data;
                });
            }
            $scope.init();

            $scope.getJabatanByIdPegawai = (id) => {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + id).then((res) => {
                    $scope.listJabatan = res.data.data;
                })
            }

            $scope.getDataCatatanKegiatan = () => {
                $scope.isRouteLoading = true;
                // let URL = "iki-remunerasi/get-catatan-kegiatan-harian?pegawaiId=" + ($scope.item.srcPegawai ? $scope.item.srcPegawai.id : "") + "&jabatanId=" + ($scope.item.srcJabatan ? $scope.item.srcJabatan.id : "") + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : '')
                let URL = "iki-remunerasi/get-catatan-kegiatan-harian?pegawaiId=1316&jabatanId=2122&bulan=1614531600000"

                ManageSdmNew.getListData(URL).then((res) => {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 50
                    });

                    $scope.isRouteLoading = false;
                })
            }

            $scope.simpanVerif = (data) => {

                let dataSave = {
                    namaKegiatan: data.namaIndikator,
                    capaian: data.hasil,
                    catatan: data.catatan,
                    statusVerifikasi: true,
                    logbookKinerja: {
                        noRec: data.logbookKinerja.noRec
                    },
                    kdProfile: 0,
                    statusEnabled: true,
                    noRec: data.noRec
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-kontrak-kinerja").then(res => {
                    $scope.getDataCatatanKegiatan();
                })
            }

            function verifData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                console.log(dataItem);

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan Verifikasi Catatan Kegiatan ' + dataItem.namaIndikator + '?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.simpanVerif(dataItem);
                }, function () {

                    console.error('Tidak jadi verif');
                });
            }
        }
    ])
});