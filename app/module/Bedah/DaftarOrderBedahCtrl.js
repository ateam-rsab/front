define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarOrderBedahCtrl', ['$q', '$rootScope','$scope', 'ManageServicePhp', '$state', 'CacheHelper', 'DateHelper', '$window','ModelItemAkuntansi',
        function ($q, $rootScope, $scope, ManageServicePhp, $state, cacheHelper, dateHelper, $window, modelItemAkuntansi) {
            $scope.item = {};       
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
                    selectable: 'row',
                    pageable: true,
                    scrollable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "<h3>No. Registrasi</h3>",
                            "width": "80px"
                        },                    
                        {
                            "field": "namaDokterTujuan",
                            "title": "<h3>Dokter yang<br> mengerjakan</h3>",
                            "width": "150px"
                        },
                        {
                            "field": "namaRuanganTujuan",
                            "title": "<h3>Ruangan<br> Tujuan</h3>",
                            "width": "120px"
                        },
                        {
                            "field": "namaruangan",
                            "title": "<h3>Nama<br> Ruangan</h3>",
                            "width": "120px",
                            // "template": "<span class='style-left'>#: if(!namaruangan) { namaruangan = '' } #</span>"
                        },
                        {
                            "field": "tgloperasi",
                            "title": "<h3>Tanggal<br> Bedah</h3>",
                            "width": "130px"                        
                        },
                        {
                            "field": "tglverifikasi",
                            "title": "<h3>Tanggal<br> Verifikasi</h3>",
                            "width": "130px",
                            "template": "<span class='style-left'>#: tglverifikasi = tglverifikasi ? tglverifikasi : '-' #</span>"
                        },
                        {
                            command: [
                                { text: "Detail", click:  verifikasiJadwalBedah, imageClass: "k-icon k-i-pencil" },
                                // { text: "Verifikasi", click: verifikasiJadwalBedah, imageClass: "k-icon k-i-pencil" },
                            ], title: "", width: "150px"
                        }
                    ]
                };

                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-combo").then(function (e) {
                    $scope.listDokter = e.data.dokter;
                });

                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi", true).then(function (data) {
                    $scope.dataDaftarJadwalBedah = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 20,
                    });                    
                });
            }

            $scope.closeModalJadwalBedah = function () {
                $scope.verifikasiJadwalBedah.close();
                $scope.isVerif = false;
            }         

            function verifikasiJadwalBedah(e) {
                
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                console.log(dataItem);
                $scope.isVerif = dataItem.tglverifikasi !== '-' ? true : false;

                $scope.item.tglOperasi = new Date(dataItem.tgloperasi);
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
                }
                
                $scope.item.tglVerifikasi = dataItem.tglverifikasi !== '-' ? new Date(dataItem.tglverifikasi): dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm');

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

                
                $scope.verifikasiJadwalBedah.open().center();
            }

            init();

            $scope.verifikasiData = function () {
                let dataSave = {
                    "norec": $scope.item.norec,
                    "pegawaiverifikasifk":$scope.pegawai.id,
                    "tglverifikasi": $scope.tglVerifikasi ? dateHelper.formatDate($scope.tglVerifikasi, 'YYYY-MM-DD HH:mm') :dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm'),
                    "tgloperasi": dateHelper.formatDate($scope.item.tglOperasi, 'YYYY-MM-DD HH:mm'),
                    "ruangoperasi" : $scope.item.ruanganOperasi.nama
                }

                console.log(dataSave);
                ManageServicePhp.saveDataTransaksi('rekam-medis/save-jadwal-operasi/verifikasi', dataSave).then(e => {
                    init();
                    $scope.closeModalJadwalBedah();
                    console.log(e);
                })
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
