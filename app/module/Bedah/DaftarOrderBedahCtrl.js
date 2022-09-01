define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarOrderBedahCtrl', ['$q', '$rootScope', '$scope', 'MenuService', 'ManageServicePhp', 'ManageSdm','$state', 'CacheHelper', 'DateHelper', '$window', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, MenuService, ManageServicePhp, ManageSdm, $state, cacheHelper, dateHelper, $window, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.tglBedah = new Date();
            $scope.selectedPerawat = [];
            $scope.selectedAsisten = [];
            $scope.isRouteLoading = false;
            $scope.isVerif = false;
            // $scope.now = new Date(new Date().setDate(new Date().getDate() + 1));
            $scope.maxOrderDate = new Date(new Date().setDate(new Date().getDate() + 14));
            $scope.selectOptions = {
                placeholder: "Pilih Asisten Dokter",
            };

            $scope.selectOptionsPerawat = {
                placeholder: "Pilih Perawat",
            };
           
            $scope.verif = {};
            $scope.verif.tglBedah = new Date();
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            MenuService.get("fakerdata/ruangoperasi.json")
                .then(function(response) {
                    let optionDefault = {
                        "id":'0',
                        "namaBedah":"==Ruangan==",
                    };
                    response.data.push(optionDefault);
                    let newResponse = response.data.sort((a,b)=>a.id-b.id);
                    $scope.listRuangOperasi = newResponse;
            });

            MenuService.get("fakerdata/truefalse.json")
                .then(function(response) {
                    $scope.dataMasterICU  = response;
            });

            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true).then(function (data) {
                $scope.dataMasterPetugas = data;
                // console.log(data)
            });

            // $scope.listRuangOperasi = [{
            //     key: "Ruang Operasi 1",
            //     nama: "Ruang Operasi 1"
            // }, {
            //     key: "Ruang Operasi 2",
            //     nama: "Ruang Operasi 2"
            // }, {
            //     key: "Ruang Operasi 3",
            //     nama: "Ruang Operasi 3"
            // }, {
            //     key: "Ruang Operasi 4",
            //     nama: "Ruang Operasi 4"
            // }, {
            //     key: "Ruang Operasi 5",noregistrasi
            //     nama: "Ruang Operasi 5"
            // }, {
            //     key: "Ruang Operasi 6",
            //     nama: "Ruang Operasi 6"
            // }, {
            //     key: "Ruang Operasi 7",
            //     nama: "Ruang Operasi Pinere"
            // },]

            $scope.columnGrid = [{
                "field": "tgloperasi",
                "title": "<h3>Tanggal<br> Permintaan Bedah</h3>",
                "width": 200
            }, {
                "field": "tglverifikasi",
                "title": "<h3>Tanggal<br> Bedah</h3>",
                "width": 200,
                // "template": "<span class='style-left'>#: tglverifikasi = tglverifikasi ? tglverifikasi : '-' #</span>"
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
                command: [{
                    text: "Detail",
                    click: verifikasiJadwalBedah,
                    imageClass: "k-icon k-i-pencil"
                }, {
                    text: "Batal",
                    click: batalJadwalBedah,
                    imageClass: "k-icon k-i-cancel"
                }],
                title: "",
                width: 250
            }]

            $scope.columnDaftarJadwalBedahVerified = {
                selectable: 'row',
                pageable: true,
                scrollable: true,
                columns: [{
                    "field": "tgloperasi",
                    "title": "<h3>Tanggal<br> Permintaan Bedah</h3>",
                    "width": 200
                }, {
                    "field": "tglverifikasi",
                    "title": "<h3>Tanggal<br> Bedah</h3>",
                    "width": 200,
                    // "template": "<span class='style-left'>#: tglverifikasi = tglverifikasi ? tglverifikasi : '-' #</span>"
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
                    command: [{
                        text: "Detail",
                        click: verifikasiJadwalBedah,
                        imageClass: "k-icon k-i-pencil"
                    },],
                    title: "",
                    width: 100
                }]
            };

            $scope.getDataJadwalBedah = () => {
                $scope.isRouteLoading = true;
                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi-after-verif?tglbedah=" + ($scope.tglBedah ? dateHelper.formatDate($scope.tglBedah, 'YYYY-MM-DD') : "") + "&namaruangan=", true).then(function (data) {
                    $scope.dataValidasiJamDanRuangan = data.data;
                });
                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi?tglbedah=" + ($scope.tglBedah ? dateHelper.formatDate($scope.tglBedah, 'YYYY-MM-DD') : "") + "&namaruangan=", true).then(function (data) {
                    // $scope.isRouteLoading = false;
                    if(!data.data.data) return;
                    for (let i = 0; i < data.data.data.length; i++) {
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

            $scope.getJadwalBedahVerified = () => {
                $scope.isRouteLoading = true;
                if($scope.verif.ruanganOperasi){
                    if($scope.verif.ruanganOperasi.namaBedah=="==Ruangan=="){
                        ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi-after-verif?tglbedah=" + ($scope.verif.tglBedah ? dateHelper.formatDate($scope.verif.tglBedah, 'YYYY-MM-DD') : "") + "&namaruangan=", true).then(function (data) {
                            if(!data.data.data) return;
                            for (let i = 0; i < data.data.data.length; i++) {
                                data.data.data[i].tglverifikasi = data.data.data[i].tglverifikasi ? data.data.data[i].tglverifikasi : '-';
                                data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
                                data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
                            }
                            $scope.dataDaftarJadwalBedahVerified = new kendo.data.DataSource({
                                data: data.data.data,
                                pageSize: 20,
                            });
                            $scope.isRouteLoading = false;
                        });
                    }else{
                        ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi-after-verif?tglbedah=" + ($scope.verif.tglBedah ? dateHelper.formatDate($scope.verif.tglBedah, 'YYYY-MM-DD') : "") + "&namaruangan="+ ($scope.verif.ruanganOperasi ? $scope.verif.ruanganOperasi.namaBedah : ""), true).then(function (data) {
                            if(!data.data.data) return;
                            for (let i = 0; i < data.data.data.length; i++) {
                                data.data.data[i].tglverifikasi = data.data.data[i].tglverifikasi ? data.data.data[i].tglverifikasi : '-';
                                data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
                                data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
                            }
                            $scope.dataDaftarJadwalBedahVerified = new kendo.data.DataSource({
                                data: data.data.data,
                                pageSize: 20,
                            });
                            $scope.isRouteLoading = false;
                        });
                    }
                }else{
                    ManageServicePhp.getDataTableTransaksi("rekam-medis/get-jadwal-operasi-after-verif?tglbedah=" + ($scope.verif.tglBedah ? dateHelper.formatDate($scope.verif.tglBedah, 'YYYY-MM-DD') : "") + "&namaruangan="+ ($scope.verif.ruanganOperasi ? $scope.verif.ruanganOperasi.namaBedah : ""), true).then(function (data) {
                        if(!data.data.data) return;
                        for (let i = 0; i < data.data.data.length; i++) {
                            data.data.data[i].tglverifikasi = data.data.data[i].tglverifikasi ? data.data.data[i].tglverifikasi : '-';
                            data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
                            data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
                        }
                        $scope.dataDaftarJadwalBedahVerified = new kendo.data.DataSource({
                            data: data.data.data,
                            pageSize: 20,
                        });
                        $scope.isRouteLoading = false;
                    });
                }
                
            }

            var init = function () {
                $scope.getDataJadwalBedah();
                // $scope.getJadwalBedahVerified();

                $scope.columnDaftarJadwalBedah = {
                    toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }, {
                        template: '<button ng-click="gotToDashboard()" class="k-button k-button-icontext k-grid-upload">Dashboard Bedah</button>'
                    }],
                    selectable: 'row',
                    pageable: true,
                    scrollable: true,
                    columns: $scope.columnGrid
                };

                // ManageServicePhp.getDataTableTransaksi("rekam-medis/get-combo").then(function (e) {
                //     $scope.listDokter = e.data.dokter;
                //     $scope.listPegawai = e.data.pegawai;
                // });
            }
            init();

            $scope.exportDetail = function () {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                        value: "No. Rekam Medis"
                    }, {
                        value: "No. Registrasi"
                    }, {
                        value: "Nama Pasien"
                    }, {
                        value: "Dokter Periksa"
                    }, {
                        value: "Dokter yang Mengerjakan"
                    }, {
                        value: "Dokter Anestesi"
                    }, {
                        value: "Nama Ruangan Asal"
                    }, {
                        value: "Ruang Bedah"
                    }, {
                        value: "Tanggal Input"
                    }, {
                        value: "Tanggal Bedah"
                    }, {
                        value: "Tanggal Verifikasi"
                    }, {
                        value: "Tanggal Registrasi"
                    }, {
                        value: "Sifat Bedah"
                    }, {
                        value: "Lama Operasi"
                    }, {
                        value: "Diagnosa"
                    }, {
                        value: "Tindakan"
                    }, {
                        value: "Posisi Khusus"
                    }, {
                        value: "Macam Anestesi"
                    }]
                }];

                tempDataExport = $scope.dataDaftarJadwalBedah;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                value: data[i].nocm
                            }, {
                                value: data[i].noregistrasi
                            }, {
                                value: data[i].namapasien
                            }, {
                                value: data[i].namaDokter
                            }, {
                                value: data[i].namaDokterTujuan
                            }, {
                                value: data[i].namaDokterAnestesi
                            }, {
                                value: data[i].namaruangan
                            }, {
                                value: data[i].ruangoperasi
                            }, {
                                value: data[i].tglinput
                            }, {
                                value: data[i].tgloperasi
                            }, {
                                value: data[i].tglverifikasi
                            }, {
                                value: data[i].tglregistrasi
                            }, {
                                value: data[i].statusBedah
                            }, {
                                value: data[i].lamaoperasi
                            }, {
                                value: data[i].diagnosa
                            }, {
                                value: data[i].tindakan
                            }, {
                                value: data[i].posisikhusus
                            }, {
                                value: data[i].macamanestesi
                            }]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [{
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }],
                            // Title of the sheet
                            title: "Daftar Pasien Bedah",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "Daftar Pasien Bedah.xlsx"
                    });
                });
            };

            $scope.verifikasiAkhir = () => {
                let dataGrid = $scope.dataDaftarJadwalBedahVerified._data,
                    dataSave = {};
                dataSave.data = []


                for (let i = 0; i < dataGrid.length; i++) {
                    dataSave.data.push({
                        norec: dataGrid[i].norec
                    });
                }

                ManageServicePhp.saveDataTransaksi('rekam-medis/save-jadwal-operasi/verifakhir', dataSave).then(e => {
                    $scope.getJadwalBedahVerified();
                    $scope.isRouteLoading = false;
                });
            }

            $scope.gotToDashboard = function () {
                $state.go('DashboardRuanganBedah')
            }

            $scope.closeModalJadwalBedah = function () {
                $scope.modalVerifikasiJadwalBedah.close();
                $scope.isVerif = false;
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
                        $scope.getDataJadwalBedah();
                        $scope.isRouteLoading = false;
                    });
                }, function () {

                });

            }

            function verifikasiJadwalBedah(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.selectedAsistenDokter = [];

                console.log(dataItem);
                $scope.isVerif = dataItem.tglverifikasi !== '-' ? true : false;

                $scope.item.namaDokterAnastesi = {
                    id: dataItem.dokteranestesifk,
                    namaLengkap: dataItem.namaDokterAnestesi
                }

                $scope.item.namaDokter = {
                    namaLengkap: dataItem.namaDokter,
                    id: dataItem.dokterfk
                };

                $scope.item.namaDokterTujuan = {
                    namaLengkap: dataItem.namaDokterTujuan,
                    id: dataItem.doktertujuanfk
                };

                $scope.listRuangOperasi.forEach(listRuangOperasi => {
                    if(listRuangOperasi.namaBedah==dataItem.ruangoperasi){
                        $scope.item.ruanganOperasi = {
                            namaBedah: dataItem.ruangoperasi,
                            id: listRuangOperasi.id
                        };
                    }
                });

                //Perawat Perawat
                if(dataItem.perawat!=undefined){
                    if(dataItem.perawat.length>0){
                        let newPerawat=[];
                        dataItem.perawat.forEach(perawat => {
                            newPerawat.push({id: perawat.objectperawatfk, namalengkap: perawat.namalengkap});
                        });
                        $scope.selectedPerawat = newPerawat; 
                    }else{
                        $scope.selectedPerawat = [];
                    }
                }else{
                    $scope.selectedPerawat = [];
                }

                //Asisten Dokter
                if(dataItem.asistendokter!=undefined){
                    if(dataItem.asistendokter.length>0){
                        let newAsisten=[];
                        dataItem.asistendokter.forEach(asistendokter => {
                            newAsisten.push({id: asistendokter.objectpegawaifk, namalengkap: asistendokter.namalengkap});
                        });
                        $scope.selectedAsisten = newAsisten; 
                    }else{
                        $scope.selectedAsisten = [];
                    }
                }else{
                    $scope.selectedAsisten = [];
                }
                let newPerluIcu='';
                if(dataItem.perlu_icu=="true"){
                    newPerluIcu={
                        statusIcu:dataItem.perlu_icu,
                        namaIcu:"Ya"
                    }
                }else if(dataItem.perlu_icu=="false"){
                    newPerluIcu={
                        statusIcu:dataItem.perlu_icu,
                        namaIcu:"Tidak"
                    }
                }else{
                    newPerluIcu=null;
                }

                if($scope.isVerif==true){
                    $scope.isVerif = true;
                    $scope.isUpdate = false;
                }else{
                    $scope.isVerif = false;
                    $scope.isUpdate = true;
                }
                if(dataItem.tglverifikasi!=="-"){
                    $scope.isDate=true;
                    $scope.isNewDate=false;
                    $scope.now1 = dateHelper.formatDate(dataItem.tglverifikasi, 'YYYY-MM-DD HH:mm');$scope.item.tglVerifikasi1=dataItem.tglverifikasi;
                }else{
                    $scope.isDate=false;
                    $scope.isNewDate=true;
                    $scope.now2 = new Date(new Date().setDate(new Date().getDate() + 1));$scope.item.tglVerifikasi2=null;
                }
                // $scope.item.tglVerifikasi = dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm');
                $scope.item.tglOperasi = dataItem.tgloperasi; // dataItem.tgloperasi === '-' ? dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm'): dateHelper.formatDate(new Date(dataItem.tgloperasi), 'YYYY-MM-DD HH:mm');
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
                $scope.item.lamaOperasi = dataItem.lamaoperasi;
                $scope.item.perluIcu = newPerluIcu;
                // if (dataItem.asistendokter) {
                    // for (let i = 0; i < dataItem.asistendokter.length; i++) {
                    //     $scope.item.selectedAsistenDokter.push({
                    //         namalengkap: dataItem.asistendokter[i].namalengkap,
                    //         id: dataItem.asistendokter[i].objectpegawaifk
                    //     })
                    // }
                // }



                $scope.modalVerifikasiJadwalBedah.open().center();
            }

            $scope.verifikasiData = function () {
                let dataVerified = $scope.dataValidasiJamDanRuangan;
                let tglTerpilih = dateHelper.formatDate($scope.item.tglVerifikasi, 'YYYY-MM-DD HH:mm:ss');
                let ruanganTerpilih = $scope.item.ruanganOperasi.namaBedah;
                // if (dataVerified.length === 0) {
                //     toastr.info("Data tidak ada");
                //     return;
                // }

                // if(!$scope.item.namaPerawat) {
                //     toastr.info("Harap Pilih Perawat terlebih dahulu!");
                //     return;
                // }

                if (!$scope.item.namaDokterTujuan) {
                    toastr.info("Harap Pilih Dokter Tujuan terlebih dahulu!");
                    return;
                }

                for (let i = 0; i < dataVerified.length; i++) {

                    if (tglTerpilih === dataVerified[i].tglverifikasi && ruanganTerpilih === dataVerified[i].ruangoperasi) {
                        toastr.info("Harap pilih Tanggal atau Ruangan lain", "Tanggal dan Ruangan telah dipilih");
                        return;
                    }
                }

                if (!$scope.item.ruanganOperasi) {
                    toastr.error('Anda belum memasukan Nama Ruangan Operasi');
                    return;
                }
                // console.log($scope.item.tglVerifikasi2)
                $scope.isRouteLoading = true;
                let dataSave = {
                    norec: $scope.item.norec,
                    pegawaiverifikasifk: $scope.pegawai.id,
                    tglverifikasi: $scope.item.tglVerifikasi2 ? dateHelper.formatDate($scope.item.tglVerifikasi2, 'YYYY-MM-DD HH:mm') : dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm'),
                    tgloperasi: dateHelper.formatDate($scope.item.tglOperasi, 'YYYY-MM-DD HH:mm'),
                    ruangoperasi:ruanganTerpilih,
                    dokteranestesifk: $scope.item.namaDokterAnastesi ? $scope.item.namaDokterAnastesi.id : null,
                    doktertujuanfk: $scope.item.namaDokterTujuan ? $scope.item.namaDokterTujuan.id : null,
                    // ruangoperasi: $scope.item.ruanganOperasi.nama,
                    // objectperawatfk: $scope.item.namaPerawat.id,
                    diagnosa: $scope.item.diagnosa,
                    tindakan: $scope.item.tindakan,
                    posisikhusus: $scope.item.posisiKhusus,
                    lamaoperasi: $scope.item.lamaOperasi ? $scope.item.lamaOperasi : 0,
                    macamanestesi: $scope.item.macamAnestesi,
                    perlu_icu: $scope.item.perluIcu.statusIcu,
                    // namaVerifikator: $scope.pegawai.id,
                    perawat: []
                }
                for (let i = 0; i < $scope.selectedPerawat.length; i++) {
                    dataSave.perawat.push({
                        objectperawatfk: $scope.selectedPerawat[i].id
                    });
                }
                // console.log(dataSave)
                ManageServicePhp.saveDataTransaksi('rekam-medis/save-jadwal-operasi/verifikasi', dataSave).then(e => {
                    init();
                    $scope.closeModalJadwalBedah();
                    $scope.isRouteLoading = false;
                    clear();
                });
            }
            $scope.updateVerifikasi=()=>{
                if(!$scope.item.ruanganOperasi){
                    toastr.info("Harap pilih ruang bedah!");
                    return;
                }
                if($scope.item.namaDokterAnastesi.id==null){
                    toastr.info("Harap pilih Dokter Anestesi!");
                    return;
                }
                if($scope.item.perluIcu==null){
                    toastr.info("Harap pilih perlu ICU?");
                    return;
                }
                let dataItem = $scope.item;
                let namaPerawat=[];
                if($scope.selectedPerawat) {
                    for(let i = 0; i < $scope.selectedPerawat.length; i++) {
                        namaPerawat.push({
                            objectperawatfk: $scope.selectedPerawat[i].id
                        });
                    }
                }
                // console.log(dataItem);
                $scope.isRouteLoading = true;
                let dataPost = {
                    "norec": dataItem.norec,
                    "pegawaiverifikasifk": $scope.pegawai.id,
                    "tglverifikasi": $scope.item.tglVerifikasi1 ? dateHelper.formatDate($scope.item.tglVerifikasi1, 'YYYY-MM-DD HH:mm') : dataItem.tglVerifikasi,
                    "tgloperasi": dataItem.tglOperasi,
                    "ruangoperasi": dataItem.ruanganOperasi.namaBedah,
                    "dokteranestesifk": dataItem.namaDokterAnastesi.id,
                    "doktertujuanfk": dataItem.namaDokterTujuan.id,
                    "diagnosa": dataItem.diagnosa,
                    "tindakan": dataItem.tindakan,
                    "posisikhusus": dataItem.posisiKhusus,
                    "macamanestesi": dataItem.macamAnestesi,
                    "lamaoperasi": dataItem.lamaOperasi,
                    "perlu_icu": dataItem.perluIcu.statusIcu,
                    "perawat": namaPerawat
                };
                // console.log(dataPost);
                ManageServicePhp.saveDataTransaksi("rekam-medis/save-jadwal-operasi/update-admin",dataPost).then(res=>{
                    $scope.getJadwalBedahVerified();
                    $scope.closeModalJadwalBedah();
                    $scope.isRouteLoading = false;
                    clear();
                });
            }

            function clear() {
                $scope.item.ruanganOperasi = null;
                $scope.item.namaDokter = null;
                $scope.item.namaPerawat = null;
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