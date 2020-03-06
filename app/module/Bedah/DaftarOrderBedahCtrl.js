define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarOrderBedahCtrl', ['$q', '$rootScope','$scope', 'ManageServicePhp', '$state', 'CacheHelper', 'DateHelper', '$window','ModelItemAkuntansi',
        function ($q, $rootScope, $scope, ManageServicePhp, $state, cacheHelper, dateHelper, $window, modelItemAkuntansi) {
            $scope.item = {};
            $scope.tglBedah = new Date();
            
            $scope.isRouteLoading = false;
            $scope.isVerif = false;
            $scope.now = new Date();
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.listRuangOperasi = [
                { key:"Ruang Operasi 1", nama:"Ruang Operasi 1"},
                { key:"Ruang Operasi 2", nama:"Ruang Operasi 2"},
                { key:"Ruang Operasi 3", nama:"Ruang Operasi 3"},
                { key:"Ruang Operasi 4", nama:"Ruang Operasi 4"},
                { key:"Ruang Operasi 5", nama:"Ruang Operasi 5"},
                { key:"Ruang Operasi 6", nama:"Ruang Operasi 6"},
            ]

            var init = function () {
                $scope.columnDaftarJadwalBedah = {
                    toolbar: [
                        {
                            text: "export",
                            name: "Export detail",
                            template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                        },
                        {
                            template: '<button ng-click="gotToDashboard()" class="k-button k-button-icontext k-grid-upload">Dashboard Bedah</button>'
                        }
                    ],
                    selectable: 'row',
                    pageable: true,
                    scrollable: true,
                    columns: [
                        {
                            "field": "tgloperasi",
                            "title": "<h3>Tanggal<br> Permintaan Bedah</h3>",
                            "width": 200
                        },
                        {
                            "field": "tglverifikasi",
                            "title": "<h3>Tanggal<br> Bedah</h3>",
                            "width": 200,
                            // "template": "<span class='style-left'>#: tglverifikasi = tglverifikasi ? tglverifikasi : '-' #</span>"
                        },
                        {
                            "field": "nocm",
                            "title": "<h3>No.<br> Rekam Medis</h3>",
                            "width": 120
                        },
                        {
                            "field": "noregistrasi",
                            "title": "<h3>No. Registrasi</h3>",
                            "width": 120
                        },
                        {
                            "field": "namapasien",
                            "title": "<h3>Nama Pasien</h3>",
                            "width": 200
                        },
                        {
                            "field": "namaDokterTujuan",
                            "title": "<h3>Dokter yang<br> mengerjakan</h3>",
                            "width": 200
                        },
                        {
                            "field": "namaruangan",
                            "title": "<h3>Nama<br> Ruangan Asal</h3>",
                            "width": 200
                        },
                        {
                            "field": "ruangoperasiFormatted",
                            "title": "<h3>Ruang<br> Bedah</h3>",
                            "width": 200
                        },
                        {
                            "field": "telp",
                            "title": "<h3>No.Telp</h3>",
                            "width": 150
                        },
                        {
                            "field": "statusBedah",
                            "title": "<h3>Sifat Bedah</h3>",
                            "width": 140
                        },
                        {
                            command: [
                                { text: "Detail", click:  verifikasiJadwalBedah, imageClass: "k-icon k-i-pencil" }
                            ], title: "", width: 100
                        }
                    ]
                };

                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-combo").then(function (e) {
                    $scope.listDokter = e.data.dokter;
                });
                $scope.getDataJadwalBedah();
            }

            $scope.getDataJadwalBedah = function() {
                $scope.isRouteLoading = true;
                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi?tglbedah=" + ($scope.tglBedah ? dateHelper.formatDate($scope.tglBedah, 'YYYY-MM-DD') : "") + "&namaruangan=" + ($scope.ruanganOperasi ? $scope.ruanganOperasi.nama : ""), true).then(function (data) {
                    for(let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].tglverifikasi = data.data.data[i].tglverifikasi ? data.data.data[i].tglverifikasi : '-';
                        data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
                        data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
                    }
                    $scope.dataDaftarJadwalBedah = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 20,
                    });
                    $scope.isRouteLoading = false;
                });
            }

            $scope.exportDetail = function () {
                var tempDataExport = [];
                var rows = [
                    {
                        cells: [
                            { value: "No. Rekam Medis" },
                            { value: "No. Registrasi" },
                            { value: "Nama Pasien" },
                            { value: "Dokter Periksa" },
                            { value: "Dokter yang Mengerjakan" },
                            { value: "Dokter Anestesi" },
                            { value: "Nama Ruangan Asal" },
                            { value: "Ruang Bedah" },
                            { value: "Tanggal Input" },
                            { value: "Tanggal Bedah" },
                            { value: "Tanggal Verifikasi" },
                            { value: "Tanggal Registrasi" },
                            { value: "Sifat Bedah" },
                            { value: "Lama Operasi" },
                            { value: "Diagnosa" },
                            { value: "Tindakan" },
                            { value: "Posisi Khusus" },
                            { value: "Macam Anestesi" },
                        ]
                    }
                ];

                tempDataExport = $scope.dataDaftarJadwalBedah;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].nocm },
                                { value: data[i].noregistrasi },
                                { value: data[i].namapasien },
                                { value: data[i].namaDokter },
                                { value: data[i].namaDokterTujuan },
                                { value: data[i].namaDokterAnestesi },
                                { value: data[i].namaruangan },
                                { value: data[i].ruangoperasi },
                                { value: data[i].tglinput },
                                { value: data[i].tgloperasi },
                                { value: data[i].tglverifikasi },
                                { value: data[i].tglregistrasi },
                                { value: data[i].statusBedah },
                                { value: data[i].lamaoperasi },
                                { value: data[i].diagnosa },
                                { value: data[i].tindakan },
                                { value: data[i].posisikhusus },
                                { value: data[i].macamanestesi },
                                
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "Daftar Pasien Bedah",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Daftar Pasien Bedah.xlsx" });
                });
            };

            $scope.gotToDashboard = function() {
                $state.go('DashboardRuanganBedah')
            }

            $scope.closeModalJadwalBedah = function () {
                $scope.modalVerifikasiJadwalBedah.close();
                $scope.isVerif = false;
            }

            function verifikasiJadwalBedah(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                console.log(dataItem);
                $scope.isVerif = dataItem.tglverifikasi !== '-' ? true : false;

                $scope.item.namaDokterAnastesi = {
                    id: dataItem.dokteranestesifk,
                    namalengkap: dataItem.namaDokterAnestesi
                }
                
                $scope.item.namaDokter = {
                    namalengkap:dataItem.namaDokter,
                    id:dataItem.dokterfk
                };
                
                $scope.item.namaDokterTujuan = {
                    namalengkap: dataItem.namaDokterTujuan,
                    id: dataItem.doktertujuanfk
                };

                $scope.item.ruanganOperasi ={
                    nama:dataItem.ruangoperasi,
                    key:dataItem.ruangoperasi
                };
                
                $scope.item.tglVerifikasi = dataItem.tgloperasi !== '-' ? new Date(dataItem.tgloperasi): dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm');
                $scope.item.tglOperasi = new Date(dataItem.tgloperasi);
                $scope.item.notelp = dataItem.telp;
                $scope.item.norec = dataItem.norec;
                $scope.item.namaRuangan = dataItem.namaruangan;
                $scope.item.namaRuanganTujuan = dataItem.namaRuanganTujuan;
                $scope.item.noRegistrasi = dataItem.noregistrasi;
                $scope.item.tglRegistrasi = dataItem.tglregistrasi;
                $scope.item.nocm = dataItem.nocm;
                $scope.item.namaPasien = dataItem.namapasien;
                $scope.item.diagnosa = dataItem.diagnosa;
                $scope.item.tindakan = dataItem.tindakan;
                $scope.item.posisiKhusus = dataItem.posisikhusus;
                $scope.item.macamAnestesi = dataItem.macamanestesi;
                $scope.item.lamaOperasi = dataItem.lamaoperasi

                
                $scope.modalVerifikasiJadwalBedah.open().center();
            }

            init();

            $scope.verifikasiData = function () {
                // if(!(dateHelper.formatDate($scope.item.tglOperasi, 'YYYY-MM-DD') > dateHelper.formatDate(new Date(), 'YYYY-MM-DD'))) {
                //     toastr.info('Tanggal sudah melebihi tanggal permintaan.');
                //     return;
                // }
                $scope.isRouteLoading = true;
                if(!$scope.item.ruanganOperasi) {
                    toastr.error('Anda belum memasukan Nama Ruangan Operasi');
                    return;
                }
                
                let dataSave = {
                    "norec": $scope.item.norec,
                    "pegawaiverifikasifk":$scope.pegawai.id,
                    "tglverifikasi": $scope.item.tglVerifikasi ? dateHelper.formatDate($scope.item.tglVerifikasi, 'YYYY-MM-DD HH:mm') :dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm'),
                    "tgloperasi": dateHelper.formatDate($scope.item.tglOperasi, 'YYYY-MM-DD HH:mm'),
                    "doktertujuanfk":$scope.item.namaDokterTujuan ? $scope.item.namaDokterTujuan.id : null,
                    "dokteranestesifk": $scope.item.namaDokterAnastesi ? $scope.item.namaDokterAnastesi.id : null,
                    "ruangoperasi" : $scope.item.ruanganOperasi.nama
                }

                ManageServicePhp.saveDataTransaksi('rekam-medis/save-jadwal-operasi/verifikasi', dataSave).then(e => {
                    init();
                    $scope.closeModalJadwalBedah();
                    $scope.isRouteLoading = false;
                });
            }

            function clear() {
                $scope.item.ruanganOperasi = null;
                $scope.item.namaDokter = null;
                $scope.item.namaDokterTujuan = null;
                $scope.item.norec = '';
                $scope.item.namaRuangan = '';
                $scope.item.namaRuanganTujuan = '';
                $scope.item.noRegistrasi = '';
                $scope.item.tglRegistrasi = '';
                $scope.item.nocm = '';
                $scope.item.namaPasien = '';
                $scope.item.diagnosa = '';
                $scope.item.tindakan = '';
                $scope.item.posisiKhusus = '';
                $scope.item.macamAnestesi = '';
                $scope.item.lamaOperasi = '';
            }
        }
    ]);
});
