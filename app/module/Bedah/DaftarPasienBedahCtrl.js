define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPasienBedahCtrl', ['$q', '$rootScope', '$scope', 'ManageServicePhp', '$state', 'CacheHelper', 'DateHelper', '$window', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, ManageServicePhp, $state, cacheHelper, dateHelper, $window, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.item.tglBedah = new Date();
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.columnGrid = [{
                "field": "tgloperasi",
                "title": "<h3>Tanggal<br> Permintaan Bedah</h3>",
                "width": 200
            }, {
                "field": "tglverifikasi",
                "title": "<h3>Tanggal<br> Bedah</h3>",
                "width": 200,
            }, {
                "field": "nocm",
                "title": "<h3>No.<br> Rekam Medis</h3>",
                "width": 120
            }, {
                "field": "noregistrasi",
                "title": "<h3>No. Registrasi</h3>",
                "width": 120
            }, {
                "field": "namapasien",
                "title": "<h3>Nama Pasien</h3>",
                "width": 200
            }, {
                "field": "namaDokterTujuan",
                "title": "<h3>Dokter Order</h3>",
                "width": 200
            }, {
                "field": "namaruangan",
                "title": "<h3>Nama<br> Ruangan Asal</h3>",
                "width": 200
            }, {
                "field": "ruangoperasiFormatted",
                "title": "<h3>Ruang<br> Bedah</h3>",
                "width": 200
            }, {
                "field": "telp",
                "title": "<h3>No.Telp</h3>",
                "width": 150
            }, {
                "field": "status",
                "title": "<h3>Status</h3>",
                "width": 140
            }, {
                command: [{
                    text: "Selesai",
                    click: selesai,
                    imageClass: "k-icon k-i-pencil"
                }, {
                    text: "Batal",
                    click: batalJadwalBedah,
                    imageClass: "k-icon k-i-pencil"
                }],
                title: "",
                width: 200
            }]

            $scope.getData = () => {
                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-monitoring-pasien-bedah?tgloperasi=" + ($scope.item.tglBedah ? dateHelper.formatDate($scope.item.tglBedah, 'YYYY-MM-DD') : ""), true).then(function (data) {
                    for (let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].tglverifikasi = data.data.data[i].tglverifikasi ? data.data.data[i].tglverifikasi : '-';
                        data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
                        data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
                    }

                    $scope.dataSource = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 100
                    });
                });
            }


            function batalJadwalBedah(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan membatalkan Jadwal Bedah dengan No. Rekam Medis ' + dataItem.nocm)
                    .textContent(`Anda akan membatalkan data`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.isRouteLoading = false;
                    console.log(dataItem);

                    let dataSave = {
                        norec: dataItem.norec,
                        pegawaifk: $scope.pegawai.id,
                    }

                    ManageServicePhp.saveDataTransaksi('rekam-medis/save-jadwal-operasi/batal', dataSave).then(e => {
                        $scope.getData();
                        $scope.isRouteLoading = false;
                    });
                }, function () {

                });

            }

            let init = () => {
                $scope.optGrid = {
                    dataBound: function (e) {
                        $('td').each(function () {
                            if ($(this).text() == 'BELUM DIVERIFIKASI') {
                                $(this).addClass('brown')
                            };
                            if ($(this).text() == 'SELESAI') {
                                $(this).addClass('green')
                            };
                            if ($(this).text() == 'BATAL') {
                                $(this).addClass('red')
                            };
                            if ($(this).text() == 'MASUK ANTRIAN') {
                                $(this).addClass('blue')
                            };
                            if ($(this).text() == 'DI VERIFIKASI') {
                                $(this).addClass('cyan')
                            };

                        })
                    },
                    toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }],
                    selectable: 'row',
                    pageable: true,
                    scrollable: true,
                    columns: $scope.columnGrid
                };

                $scope.getData()
            }
            init();

            function selesai(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            
                // if(dataItem)
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan merubah Status Jadwal Bedah dengan No. Rekam Medis ' + dataItem.nocm + " menjadi Selesai")
                    .textContent(`Anda akan merubah status data`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.isRouteLoading = false;
                    console.log(dataItem);

                    let dataSave = {
                        norec: dataItem.norec,
                        pegawaifk: $scope.pegawai.id,
                    }

                    ManageServicePhp.saveDataTransaksi('rekam-medis/save-jadwal-operasi/selesai', dataSave).then(e => {
                        $scope.getData();
                        $scope.isRouteLoading = false;
                    });
                }, function () {

                });


            }
        }
    ]);
});