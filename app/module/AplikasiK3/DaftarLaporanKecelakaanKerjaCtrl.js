define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarLaporanKecelakaanKerjaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras', 'ManageKKKL', '$timeout', '$window', 'CetakHelper',
        function ($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras, ManageKKKL, $timeout, $window, cetakHelper) {

            ModelItem.get("Hukor/DaftarUsulanEvaluasiDanKajianOrganisasiTujuan").then(function (data) {
                $scope.item = data;
                $scope.isEditKejadian = false;
                $scope.isShowPopUp = false;
                $scope.verifiedData = true;
                $scope.dataKorban = {};
                $scope.item.periodeAwal = new Date();
                $scope.item.periodeAkhir = new Date();
                $scope.showDetailUsulan = false;
                $scope.idJabatanSelected = 0;
                $scope.now = new Date();
                $scope.jumlahKorban = []
                $scope.dataVOloaded = true;

            }, function errorCallBack(err) { });


            var idPegawai = ModelItem.getPegawai().id;
            var noRec;
            var noRecVerif;
            var noRecKejadian;
            var noRecSaksi;
            var noRecKorban;
            var noRecKerugian;
            var noRecTindakLanjut;
            var verifikasi;
            var selKej;
            var selectedNoRec;
            // $scope.item.statusVerifikasi = [];
            // if (idPegawai == 2) {
            //     $scope.isPelapor = true;
            // }


            $scope.listJenisKelamin = [
                {
                    "idJenisKelamin": 1,
                    "jenisKelamin": "Laki-laki"
                },
                {
                    "idJenisKelamin": 2,
                    "jenisKelamin": "Perempuan"
                }
            ]

            $scope.listRawatInap = [
                {
                    "id": 0,
                    "rawatInap": "Tidak"
                },
                {
                    "id": 1,
                    "rawatInap": "Ya"
                }
            ]

            $scope.listRawatJalan = [
                {
                    "id": 0,
                    "rawatJalan": "Tidak"
                },
                {
                    "id": 1,
                    "rawatJalan": "Ya"
                }
            ]

            $scope.listPengobatanDiLuar = [
                {
                    "id": 0,
                    "pengobatanDiLuar": "Tidak"
                },
                {
                    "id": 1,
                    "pengobatanDiLuar": "Ya"
                }
            ]

            $scope.listStatusAda = [
                {
                    "id": 0,
                    "statusAda": "Tidak Ada"
                },
                {
                    "id": 1,
                    "statusAda": "Ada"
                }
            ]

            $scope.listSatuan = [
                {
                    "id": 0,
                    "satuan": "Jam"
                },
                {
                    "id": 1,
                    "satuan": "Hari"
                }
            ]

            $scope.listSatuanPemulihan = [
                {
                    "id": 0,
                    "satuanPemulihan": "Hari"
                },
                {
                    "id": 1,
                    "satuanPemulihan": "Minggu"
                },
                {
                    "id": 1,
                    "satuanPemulihan": "Bulan"
                }
            ]

            $scope.listStatusPekerjaan = [
                {
                    "idStatusPekerjaan": 1,
                    "statusPekerjaan": "Pasien"
                },
                {
                    "idStatusPekerjaan": 2,
                    "statusPekerjaan": "Keluarga Pasien"
                },
                {
                    "idStatusPekerjaan": 3,
                    "statusPekerjaan": "Pengunjung Pasien"
                },
                {
                    "idStatusPekerjaan": 4,
                    "statusPekerjaan": "Karyawan RSAB"
                },
                {
                    "idStatusPekerjaan": 5,
                    "statusPekerjaan": "Keluarga Karyawan RSAB"
                },
                {
                    "idStatusPekerjaan": 6,
                    "statusPekerjaan": "Siswa (PPDS-KOAS-AKPER-AKBID-SMA/SMK PRAKTEK)"
                },
                {
                    "idStatusPekerjaan": 7,
                    "statusPekerjaan": "Lainnya"
                }
            ]

            $scope.listStatusJabatan = [
                {
                    "idStatusJabatan": 1,
                    "statusJabatan": "Dewas"
                },
                {
                    "idStatusJabatan": 2,
                    "statusJabatan": "Direksi"
                },
                {
                    "idStatusJabatan": 3,
                    "statusJabatan": "Ka. Komite"
                },
                {
                    "idStatusJabatan": 4,
                    "statusJabatan": "Ka. SMF"
                },
                {
                    "idStatusJabatan": 5,
                    "statusJabatan": "Ka. Satuan"
                },
                {
                    "idStatusJabatan": 6,
                    "statusJabatan": "Ka. Bidang"
                },
                {
                    "idStatusJabatan": 7,
                    "statusJabatan": "Ka. Bag"
                },
                {
                    "idStatusJabatan": 8,
                    "statusJabatan": "Ka. Instalasi"
                },
                {
                    "idStatusJabatan": 9,
                    "statusJabatan": "Ka. Unit"
                },
                {
                    "idStatusJabatan": 10,
                    "statusJabatan": "Ka. Sub. Bid"
                },
                {
                    "idStatusJabatan": 11,
                    "statusJabatan": "Ka. Sub. Bag"
                },
                {
                    "idStatusJabatan": 12,
                    "statusJabatan": "Pengelola Urusan"
                },
                {
                    "idStatusJabatan": 13,
                    "statusJabatan": "Staf"
                },
                {
                    "idStatusJabatan": 14,
                    "statusJabatan": "Fungsional"
                },
                {
                    "idStatusJabatan": 15,
                    "statusJabatan": "Lainnya"
                }
            ]

            ManageSarpras.getOrderList("k3-laporan-kecelakaan-kerja/get-unit-ruangan").then(function (dat) {

                $scope.listUnitRuangan = dat.data.data.unitRuangan;
            });

            var getList = function () {
                // var jmlKorban;
                // ManageSarpras.getOrderList("k3-laporan-kecelakaan-kerja/get-identifikasi-kejadian?idPegawai=" + idPegawai).then(function (dat) {
                ManageKKKL.getOrderList("k3-laporan-kecelakaan-kerja/get-identifikasi-kejadian?idPegawai=" + 2).then(function (dat) {
                    for (var i = 0; i < dat.data.data.identifikasiKejadian.length; i++) {
                        if (dat.data.data.identifikasiKejadian[i].verifikasi == 1) {
                            dat.data.data.identifikasiKejadian[i].verifikasi = 'Belum di Verifikasi';
                        } else if (dat.data.data.identifikasiKejadian[i].verifikasi == 2) {
                            dat.data.data.identifikasiKejadian[i].verifikasi = 'Sudah di Verifikasi';
                        }
                    }

                    $scope.listLaporanKecelakaan = new kendo.data.DataSource({
                        data: [],
                        pageSize: 5,
                        schema: {
                            model: {
                                id: "namaKorban",
                                fields: {
                                    namaLengkap: { editable: false, nullable: false, validation: { required: true } },
                                    tempatKejadian: { editable: false, nullable: false, validation: { required: true } },
                                    tanggal: { editable: false, nullable: false, validation: { required: true } },
                                    awalKejadian: { editable: false, nullable: false, validation: { required: true } },
                                    jamKejadian: { editable: false, nullable: false, validation: { required: true } },
                                    kondisiSaatKejadian: { editable: false, nullable: false, validation: { required: true } },
                                    penolongPertama: { editable: false, nullable: false, validation: { required: true } },
                                    tindakanPenolong: { editable: false, nullable: false, validation: { required: true } },
                                    jumlahKorbah: { editable: false, nullable: false, validation: { required: true } },
                                    verifikasi: { editable: false, nullable: false, validation: { required: true } },

                                }
                            }
                        }

                    })
                    var i = 1;

                    // solusi looping dat.data.data didalemnya looping identifikasiKejadian dan jmlkorban
                    // var dataTemp = d;
                    dat.data.data.identifikasiKejadian.forEach(function (data) {
                        data.tanggal = new Date(data.tanggal);
                        data.jamKejadian = new Date(data.jamKejadian);
                        $scope.listLaporanKecelakaan.add(data);
                    });
                    // dat.data.data.jumlahKorbah.forEach(function (dataa) {
                    //     var data = {};
                    //     data = dataa
                    //     $scope.jumlahKorban.push(data);
                    // });
                    // var dataJumlahKorban = $scope.jumlahKorban;
                    // $scope.listLaporanKecelakaan.add(dataJumlahKorban);
                    $scope.listLaporanKecelakaan._data.forEach(function (datas) {
                        datas.no = i;
                        i++
                    });
                });
                $scope.optionGridKecelakaanKerja = {
                    columns: $scope.columnLaporanKecelakaan,
                    pageable: true
                }


            }
            getList();
            $scope.columnLaporanKecelakaan = [
                {
                    "field": "no",
                    "title": "<h3 align='center'>No</h3>",
                    "width": "35px"
                },
                {
                    "field": "tempatKejadian",
                    "title": "<h3 align='center'>Tempat Kejadian</h3>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    "field": "tanggal",
                    "title": "<h3 align='center'>Tanggal Kejadian</h3>",
                    "width": "150px",
                    template: '#= kendo.toString(tanggal, "dd MMMM yyyy") #'
                },
                {
                    "title": "<h3 align='center'>List Korban</h3>",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" },
                    width: '200px',
                    command: [
                        {
                            text: 'List Korban',
                            name: 'listKorban',
                            click: function (e) {
                                var grid = $('#gridLaporanKecelakaanKerja').data('kendoGrid');
                                var item = grid.dataItem($(e.target).closest('tr'));
                                var popUp = $('#winPopUp');

                                e.preventDefault();

                                ManageSarpras.getOrderList("k3-laporan-kecelakaan-kerja/get-lkk-by-norec?noRec=" + item.noRec).then(function (res) {
                                    $scope.listKorbanPopUp = res.data.data.lkkIdentifikasiKorban;
                                    
                                    res.data.data.lkkIdentifikasiKorban.forEach(function (datas) {
                                        datas.tglLahir = new Date(datas.tglLahir)
                                        var namaHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
                                        var namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
                                        var awal = new Date(datas.tglLahir),
                                            hariAwal = namaHari[awal.getDay() - 1],
                                            tglAwal = awal.getDate(),
                                            bulanAwal = namaBulan[awal.getMonth()],
                                            tahunAwal = awal.getFullYear(),
                                            startDate = hariAwal + ', ' + tglAwal + ' ' + bulanAwal + ' ' + tahunAwal;
                                        datas.tglLahir = startDate;
                                    })
                                    $scope.isShowPopUp = true;
                                });
                                popUp.data('kendoWindow').open();
                                popUp.data('kendoWindow').center();
                            }
                        }
                    ]
                },
                {
                    "field": "jumlahKorban",
                    "title": "<h3 align='center'>Jumlah Korban</h3>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" }
                },
                {

                    "title": "<h3 align='center'>Kronologi Kejadian</h3>",
                    columns: [
                        {
                            "field": "awalKejadian",
                            "title": "<h3 align='center'>Awal Kejadian</h3>",
                            "width": "150px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                            headerAttributes: { style: "text-align : center" }
                        },
                        {
                            "field": "jamKejadian",
                            "title": "<h3 align='center'>Jam Kejadian</h3>",
                            "width": "150px",
                            template: '#= kendo.toString(jamKejadian, "HH:mm") #',
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                            headerAttributes: { style: "text-align : center" }
                        },
                        {
                            "field": "kondisiSaatKejadian",
                            "title": "<h3 align='center'>Kondisi</h3>",
                            "width": "150px"
                        },
                        {
                            "field": "penolongPertama",
                            "title": "<h3 align='center'>Nama Penolong</h3>",
                            "width": "150px"
                        },
                        {
                            "field": "tindakanPenolong",
                            "title": "<h3 align='center'>Tindakan Pertolongan</h3>",
                            "width": "150px"
                        },
                    ]
                },
                {
                    "field": "namaLengkap",
                    "title": "<h3 align='center'>Pelapor</h3>",
                    "width": "150px"
                },
                {
                    "field": 'verifikasi',
                    "title": "<h3 align='center'>Status</h3>",
                    "width": "150px"
                },
            ];


            var showDetail = function (selectedDataKecelakaan) {
                if(!selectedDataKecelakaan) {
                    toastr.warning('Anda belum memilih data');
                }
                // localStorage.noVerifikasi = selectedDataKecelakaan.noRec_verifikasi;
                sessionStorage.noVerifikasi = selectedDataKecelakaan.noRec_verifikasi;
                noRec = selectedDataKecelakaan.noRec;
                selectedNoRec = selectedDataKecelakaan.noRec;
                verifikasi = selectedDataKecelakaan.verifikasi;

                $scope.kejadian = selectedDataKecelakaan;

                if (selectedDataKecelakaan != undefined) {
                    $scope.showDetailLaporan = true;
                    if ($scope.showDetailLaporan == true) {
                        if (selectedDataKecelakaan.verifikasi == "Belum di Verifikasi") {
                            $scope.verifiedData = true;
                        } else if (selectedDataKecelakaan.verifikasi == "Sudah di Verifikasi") {
                            $scope.verifiedData = false;
                        }
                    }
                    ManageKKKL.getOrderList("k3-laporan-kecelakaan-kerja/get-lkk-by-norec?noRec=" + selectedDataKecelakaan.noRec).then(function (dat) {
                        $scope.kejadian.tindakanLanjutan = dat.data.data.lkkIdentifikasiKorban[0].tindakanLanjutan
                        $scope.listSaksi = new kendo.data.DataSource({
                            data: [],
                            schema: {
                                model: {
                                    id: "namaSaksi",
                                    fields: {
                                        namaSaksi: { editable: false, nullable: false, validation: { required: true } },
                                        pekerjaan: { editable: false, nullable: false, validation: { required: true } },
                                        noKontak: { editable: false, nullable: false, validation: { required: true } },
                                    }
                                }
                            }

                        })
                        if (dat.data.data.lkkSaksiKejadian != undefined) {
                            dat.data.data.lkkSaksiKejadian.forEach(function (data) {
                                $scope.listSaksi.add(data)
                            });                           
                        }

                        if(dat.data.data.lkkIdentifikasiKorban) {
                            for(let i = 0; i < dat.data.data.lkkIdentifikasiKorban.length; i++) {
                                dat.data.data.lkkIdentifikasiKorban[i].tglLahirFormatted = DateHelper.formatDate(dat.data.data.lkkIdentifikasiKorban[i].tglLahir, 'DD MMMM YYYY');
                            }
                        }

                        $scope.listKorban = dat.data.data.lkkIdentifikasiKorban;
                        
                        console.log($scope.listKorban);
                    });
                }
            }

            $scope.columnPopUpKorban = [
                {
                    "field": "namaKorban",
                    "title": "<h5 align='center'>Nama Korban</h5>",
                    "width": "150px"
                },
                {
                    "field": "niKependudukan",
                    "title": "<h5 align='center'>NIK</h5>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    "field": "tempatLahir",
                    "title": "<h5 align='center'>Tempat Lahir</h5>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    "field": "noRec_korban",
                    "name": "Norec Korban",
                    "hidden": true
                },
                {
                    "field": "tglLahir",
                    "title": "<h5 align='center'>Tanggal Lahir</h5>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" },
                    template: '#= kendo.toString(tglLahir, "dd/MMM/yyyy") #'
                },
                {
                    "field": "jenisKelamin",
                    "title": "<h5 align='center'>Jenis Kelamin</h5>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" }
                },
            ]

            $scope.columnKorban = [
                {
                    "field": "noRec_korban",
                    "name": "Norec Korban",
                    "hidden": true
                },
                {
                    "field": "namaKorban",
                    "title": "<h3 align='center'>Nama Korban</h3>",
                    "width": "150px"
                },
                {
                    "field": "niKependudukan",
                    "title": "<h3 align='center'>NIK</h3>",
                    "width": "150px"
                },
                {
                    "field": "tempatLahir",
                    "title": "<h3 align='center'>Tempat Lahir</h3>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    "field": "tglLahirFormatted",
                    "title": "<h3 align='center'>Tanggal Lahir</h3>",
                    "width": "150px",
                    // template: '#= kendo.toString(tglLahir, "dd MMMM yyyy") #'
                },
                {
                    "field": "jenisKelamin",
                    "title": "<h3 align='center'>Jenis Kelamin</h3>",
                    "width": "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" }
                },
                // {
                //     "field": "statusPekerjaan",
                //     "title": "<h3 align='center'>Status Pekerjaan <br> di RSAB-HK</h3>",
                //     "width": "150px"
                // },
                {
                    "field": "statusJabatan",
                    "title": "<h3 align='center'>Status Jabatan <br> di RSAB-HK</h3>",
                    "width": "150px"
                },
                {
                    "field": "namaRuangan",
                    "title": "<h3 align='center'>Ruangan Kerja <br> di RSAB-HK</h3>",
                    "width": "250px"
                },
                // {
                //     "field": "noRec_korban",
                //     title: "norec korban"
                // },
                {
                    "field": "action",
                    "width": "100px",
                    "title": "<h3 align='center'>Action</h3>",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                    headerAttributes: { style: "text-align : center" },
                    command: [
                        {
                            text: 'Batal',
                            name: 'batal',
                            click: function (e) {
                                var grid = $('#gridLaporanKecelakaanKerja').data('kendoGrid');
                                var item = grid.dataItem($(e.target).closest('tr'));
                                e.preventDefault()
                                // alert('delete Korban')
                                $scope.hapusKorban(item)
                            }
                        }
                    ]
                }
            ];

            $scope.columnSaksi = [
                {
                    "field": "namaSaksi",
                    "title": "<h3 align='center'>Nama Saksi</h3>",
                    "width": "150px"
                },
                {
                    "field": "pekerjaan",
                    "title": "<h3 align='center'>Pekerjaan</h3>",
                    "width": "150px"
                },
                {
                    "field": "noKontak",
                    "title": "<h3 align='center'>No. Kontak</h3>",
                    "width": "150px",
                    attributes: { style: "text-align:center;valign=middle" },
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    field: "<h3 align='center'>Action</h3>",
                    width: "50px",
                    attributes: { style: "text-align:center;valign=middle" },
                    headerAttributes: { style: "text-align : center" },
                    command: {
                        text: 'Batal',
                        name: 'batal',
                        click: function (e) {
                            var grid = $('#gridSaksi').data('kendoGrid');
                            var item = grid.dataItem($(e.target).closest('tr'));
                            e.preventDefault()
                            $scope.hapusSaksi(item);
                            grid.refresh();
                            grid.read();
                        }
                    }
                }
            ];


            $scope.edit = function (data) {

                showDetail(data)
                if (data == undefined) {
                    toastr.warning('Anda Belum Memilih Data untuk di Edit')
                } else {
                    if (data.verifikasi == "Belum di Verifikasi") {
                        $scope.verifiedData = true;
                    } else if (data.verifikasi == "Sudah di Verifikasi") {
                        $scope.verifiedData = false;
                    }
                    $scope.isEdit = true;
                    $scope.isEditKejadian = true;
                    $scope.isDisabled = false;
                    selKej = data;
                    showDetail(data);
                }
            }



            $scope.detailLaporan = function (selectedData) {
                if (selectedData == undefined) {
                    toastr.warning('Anda belum memilih data untuk melihat Detail')
                } else {
                    $scope.isEdit = false;
                    $scope.isDisabled = true;
                    debugger
                    showDetail(selectedData);
                }
            }

            $scope.selectKorban = function (data) {

                $scope.detailKorban = true;
                $scope.item = data;
                $scope.item.statusJabatanInput = {
                    statusJabatan: data.statusJabatan
                }
                console.log($scope.item.tglLahir);
                $scope.item.tglLahir = new Date($scope.item.tglLahir);
                noRecKorban = data.noRec_korban;
                noRecKerugian = data.noRec_kerugian;
                noRecTindakLanjut = data.noRec_tindakLanjut;
                $scope.jk = data.jenisKelamin;
                $scope.sp = data.statusPekerjaan;
                $scope.sj = data.statusJabatan;
                $scope.ru = data.namaRuangan;
                // $scope.statusPekerjaan = {
                //     "statusPekerjaan": data.statusPekerjaan
                // }
                // $scope.jenisKelamin = {
                //     "jenisKelamin": data.jenisKelamin
                // }
                // $scope.statusJabatan = {
                //     "statusJabatan": data.statusJabatan
                // }
                // $scope.ruangan = {
                //     "namaRuangan": data.namaRuangan
                // }
            }

            $scope.simpanKejadian = function () {
                noRecKejadian = $scope.kejadian.noRec;
                var data = {
                    "noRec": $scope.kejadian.noRec,
                    "tempatKejadian": $scope.kejadian.tempatKejadian,
                    "tanggal": $scope.kejadian.tanggal,
                    "awalKejadian": $scope.kejadian.awalKejadian,
                    "jamKejadian": $scope.kejadian.jamKejadian,
                    "kondisiSaatKejadian": $scope.kejadian.kondisiSaatKejadian,
                    "penolongPertama": $scope.kejadian.penolongPertama,
                    "tindakanPenolong": $scope.kejadian.tindakanPenolong,
                    "lkkIdentifikasiKorban": [
                        {
                            "lkkRencanaTindakLanjut": {
                                "tindakanLanjutan": $scope.kejadian.tindakanLanjutan
                            }
                        }
                    ]
                    // "lkkRencanaTindakLanjut": {
                    //     // "noRec": sessionStorage.noVerifikasi,
                    //     "tindakanLanjutan": $scope.kejadian.tindakanLanjutan
                    // }
                }

                ManageKKKL.saveDataSarPras(data, "k3-laporan-kecelakaan-kerja/update-identifikasi-kejadian").then(function (e) {
                    // console.log(JSON.stringify(e.data));
                    getList();
                });

            }

            $scope.simpanSaksi = function () {
                var data = {
                    "noRec": $scope.saksi.noRec,
                    "namaSaksi": $scope.saksi.namaSaksi,
                    "noKontak": $scope.saksi.noKontak,
                    "pekerjaan": $scope.saksi.pekerjaan

                }

                ManageSarpras.saveDataSarPras(data, "k3-laporan-kecelakaan-kerja/update-saksi-kejadian").then(function (e) {
                    $scope.verifiedData = true;
                    showDetail(selKej);
                });
            }

            $scope.simpanKorban = function () {

                if ($scope.item.ru == undefined) {
                    $scope.item.ru = {
                        "ruanganId": $scope.item.idRuangan
                    }
                }
                if ($scope.item.jk == undefined) {
                    $scope.item.jk = {
                        "jenisKelamin": $scope.item.jenisKelamin
                    }
                }
                if ($scope.item.sp == undefined) {
                    $scope.item.sp = {
                        "statusPekerjaan": $scope.item.statusPekerjaan
                    }
                }
                if ($scope.item.sj == undefined) {
                    $scope.item.sj = {
                        "statusJabatan": $scope.item.statusJabatan
                    }
                }
                var data = {
                    "noRec": noRecKorban,
                    "niKependudukan": $scope.item.niKependudukan,
                    "namaKorban": $scope.item.namaKorban,
                    "tempatLahir": $scope.item.tempatLahir,
                    "tglLahir": $scope.item.tglLahir,
                    "jenisKelamin": $scope.item.jk.jenisKelamin,
                    "statusPekerjaan": $scope.item.sp.statusPekerjaan,
                    "statusJabatan": $scope.item.sj.statusJabatan,
                    "unitRuangan": {
                        "id": $scope.item.ru.ruanganId
                    },
                    "lkkRencanaTindakLanjut": {
                        "noRec": noRecTindakLanjut,
                        "bagianTubuh": $scope.item.bagianTubuh,
                        "jenisCedera": $scope.item.jenisCedera,
                        "jenisPengobatan": $scope.item.jenisPengobatan,
                        "tindakanRawatInap": $scope.item.tindakanRawatInap,
                        "tindakanRawatJalan": $scope.item.tindakanRawatJalan,
                        "tindakanDiLuarRsab": $scope.item.tindakanDiLuarRsab
                    },
                    "lkkPerkiraanKerugian": {
                        "noRec": noRecKerugian,
                        "lamaTidakKerjaPerJam": $scope.item.lamaTidakKerjaPerJam,
                        "lamaIstirahatPerJam": $scope.item.lamaIstirahatPerJam,
                        "lamaPemulihanPerHari": $scope.item.lamaPemulihanPerHari,
                        "ketKerugianWaktu": $scope.item.ketKerugianWaktu,
                        "biayaPostKecelakaan": $scope.item.biayaPostKecelakaan,
                        "biayaPengobatan": $scope.item.biayaPengobatan,
                        "biayaPemulihan": $scope.item.biayaPemulihan,
                        "ketKerugianKesehatan": $scope.item.ketKerugianKesehatan
                    }
                }

                ManageKKKL.saveDataSarPras(data, "k3-laporan-kecelakaan-kerja/update-identifikasi-korban").then(function (e) {
                    showDetail(selKej);
                });

            }

            $scope.hapusKejadian = function (data) {
                ManageKKKL.getOrderList("k3-laporan-kecelakaan-kerja/delete-identifikasi-kejadian?noRec=" + data.noRec_verifikasi).then(

                    function (e) {

                        // toastr.success('Data Kejadian Telah Berhasil di Hapus')
                        console.log(JSON.stringify(e));
                        $timeout(function () {

                            $window.location.reload();
                        }, 5500);
                        $scope.item = {};
                        getList();
                    }

                );
            }

            $scope.hapusSaksi = function (selectedDataSaksi) {
                ManageKKKL.getOrderList("k3-laporan-kecelakaan-kerja/delete-saksi-kejadian?noRec=" + selectedDataSaksi.noRec).then(
                    function (e) {
                        toastr.success('Anda Berhasil Menghapus Saksi')
                        // $scope.gridSaksi.refresh();
                        // $(e.target).closest
                    }

                );
            }

            $scope.batalEditKorban = function () {
                $scope.detailKorban = false
            }

            $scope.cetak = function (selectedData) {
                if (selectedData == undefined) {
                    toastr.warning('Anda Belum Memilih Data Yang Akan di Cetak', 'Perhatian');
                } else {
                    var url = 'reporting/formulirLaporanKecelakaanKerja?noRec=' + selectedData.noRec_verifikasi;
                    var urlLaporan = cetakHelper.openURLReporting(url);
                    if (selectedData == undefined) {
                        toastr.warn('Harap Pilih data terlebih dahulu')
                    } else {
                        window.open(urlLaporan, '', 'width:600, height:500');
                        console.log(selectedData.noRec)
                    }
                }
            }

            $scope.hapusKorban = function (data) {
                ManageSarpras.getOrderList("k3-laporan-kecelakaan-kerja/delete-identifikasi-korban?noRec=" + noRecKorban).then(
                    function (e) {
                        // code here setelah delete                        
                        console.log(JSON.stringify(e));
                        $timeout(function () {

                            $window.location.reload();
                        }, 5500);
                        // $scope.item = {};
                    }

                );
            }

            $scope.verifikasi = function (status) {
                // if (status == 2) {
                //     if (verifikasi == 1)
                //         verifikasi = 2;
                //     else if (verifikasi == 2)
                //         verifikasi = 3;


                // } else if (status == 1) {
                //     verifikasi = 4;
                // }
                // console.log(status);
                // showDetail();
                var grid = $('#gridLaporanKecelakaanKerja').data('kendoGrid');
                // verifikasi = status

                var data = {
                    "verifikasi": status,
                    "noRec": sessionStorage.noVerifikasi
                }


                ManageKKKL.saveDataSarPras(ModelItem.beforePost(data), "k3-laporan-kecelakaan-kerja/verifikasi-lkk").then(function (e) {
                    console.log(JSON.stringify(e.data));
                    $scope.showDetailLaporan = true;
                    grid.refresh();
                    getList();
                });
                $scope.showDetailLaporan = false;

            }
        }
    ]);
});