define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TransaksiPelayananRadiologiDokterRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', '$window',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, $window) {
            $scope.item = {};
            $scope.showInputPemeriksaanLab = false;
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            $scope.data = {};
            $scope.item.qty = 1;
            $scope.riwayatForm = false
            $scope.inputOrder = true
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false;
            $scope.showProduk = true;
            // var pegawaiUser = {}
            let dataPengkajian = JSON.parse(localStorage.getItem("cacheHelper"));
            dataPengkajian = dataPengkajian[0].value;
            let kelompokPasien = dataPengkajian[5];
            // $scope.listFilters = [
            //     "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            //     "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            // ];

            $scope.listFilters = [{
                val: "0",
                actived: false
            },
            {
                val: "1",
                actived: false
            },
            {
                val: "2",
                actived: false
            },
            {
                val: "3",
                actived: false
            },
            {
                val: "4",
                actived: false
            },
            {
                val: "5",
                actived: false
            },
            {
                val: "6",
                actived: false
            },
            {
                val: "7",
                actived: false
            },
            {
                val: "8",
                actived: false
            },
            {
                val: "9",
                actived: false
            },
            {
                val: "A",
                actived: true
            },
            {
                val: "B",
                actived: false
            },
            {
                val: "C",
                actived: false
            },
            {
                val: "D",
                actived: false
            },
            {
                val: "E",
                actived: false
            },
            {
                val: "F",
                actived: false
            },
            {
                val: "G",
                actived: false
            },
            {
                val: "H",
                actived: false
            },
            {
                val: "I",
                actived: false
            },
            {
                val: "J",
                actived: false
            },
            {
                val: "K",
                actived: false
            },
            {
                val: "L",
                actived: false
            },
            {
                val: "M",
                actived: false
            },
            {
                val: "N",
                actived: false
            },
            {
                val: "O",
                actived: false
            },
            {
                val: "P",
                actived: false
            },
            {
                val: "Q",
                actived: false
            },
            {
                val: "R",
                actived: false
            },
            {
                val: "S",
                actived: false
            },
            {
                val: "T",
                actived: false
            },
            {
                val: "U",
                actived: false
            },
            {
                val: "V",
                actived: false
            },
            {
                val: "W",
                actived: false
            },
            {
                val: "X",
                actived: false
            },
            {
                val: "Y",
                actived: false
            },
            {
                val: "Z",
                actived: false
            }];


            $scope.item.ruangantujuan = {
                id: 35,
                namaruangan: "Radiologi"
            }
            var data2 = [];
            $scope.PegawaiLogin2 = {};
            var namaRuangan = ''
            var namaRuanganFk = ''
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            var detail = ''
            $scope.header.DataNoregis = true
            LoadCacheHelper();

            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('TransaksiPelayananRadiologiDokterRevCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    $scope.header.DataNoregis = chacePeriode[13]
                    if ($scope.header.DataNoregis == undefined) {
                        $scope.header.DataNoregis = false;
                    }
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                    manageLogistikPhp.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi=" +
                        $scope.item.noregistrasi, true).then(function (dat) {
                            $scope.item.statusVerif = dat.data.status
                        });
                }
                init();
            }

            $scope.selectedDataProduk = [];
            $scope.updateSelectedData = (data, i) => {
                // if(kelompokPasien === "BPJS" && $scope.selectedDataProduk.length >= 1) {
                //     toastr.info("Untuk Pasien BPJS tidak bisa lebih dari 1 tindakan");
                //     return;
                // }
                $scope.selectedDataProduk = [];
                $scope.listLayanan[i].checked = !$scope.listLayanan[i].checked;
                for (let i in $scope.listLayanan) {

                    if ($scope.listLayanan[i].checked) {
                        $scope.selectedDataProduk.push($scope.listLayanan[i]);
                    }
                }
            }

            let tempDataGrid = [];
            $scope.tambahData = () => {

                for (let ii in $scope.listLayananLainnya) {

                    if (!$scope.listLayananLainnya[ii].namaLayanan) {
                        toastr.info("Nama tindakkan masih kosong", "Perhatian");
                        return;
                    }

                    // if (!$scope.listLayananLainnya[ii].jmlLayanan) {
                    //     toastr.info("Jumlah layanan " + $scope.listLayananLainnya[ii].namaLayanan + " masih kosong", "Perhatian");
                    //     return;
                    // }

                    tempDataGrid.push({
                        namaproduk: $scope.listLayananLainnya[ii].namaLayanan,
                        no: tempDataGrid.length + 1,
                        objectkelasfk: $scope.item.idKelas,
                        objectruanganfk: namaRuanganFk,
                        objectruangantujuanfk: $scope.item.ruangantujuan.id,
                        qtyproduk: 1,
                        persiapan: $scope.listLayananLainnya[ii].persiapan,
                        catatanTambahan: $scope.listLayananLainnya[ii].catatanTambahan,
                        riwayat: $scope.listLayananLainnya[ii].riwayatRadiologi
                    })
                }

                for (let i in $scope.selectedDataProduk) {

                    // if (!$scope.selectedDataProduk[i].jmlLayanan) {
                    //     toastr.info("Jumlah layanan " + $scope.selectedDataProduk[i].namaproduk + " masih kosong", "Perhatian");
                    //     return;
                    // }

                    tempDataGrid.push({
                        namaproduk: $scope.selectedDataProduk[i].namaproduk,
                        no: tempDataGrid.length + 1,
                        objectkelasfk: $scope.item.idKelas,
                        objectruanganfk: namaRuanganFk,
                        objectruangantujuanfk: $scope.item.ruangantujuan.id,
                        qtyproduk: 1,
                        persiapan: $scope.selectedDataProduk[i].persiapan,
                        catatanTambahan: $scope.selectedDataProduk[i].catatanTambahan,
                        riwayat: $scope.selectedDataProduk[i].riwayatRadiologi
                    })
                }

                data2 = tempDataGrid;
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: tempDataGrid,
                    pageSize: 20
                });

                console.log(tempDataGrid);
                $scope.selectedDataProduk = [];
                $scope.resetFormInputTindakan();
                $scope.popupAddLayanan.close();
            }

            $scope.filterPelayanan = function (data, index) {
                for (let i = 0; i < $scope.listFilters.length; i++) {
                    $scope.listFilters[i].actived = false;
                }

                if (index) $scope.listFilters[index].actived = true;
                // if (!data && !$scope.filterContain) {
                //     toastr.warning("Harap pilih salah satu alphabet atau isi Kata Pencarian", "Perhatian");
                //     return;
                // }

                $scope.isLoading = true;
                manageLogistikPhp.getDataTableTransaksi("pelayanan/get-order-penunjang?departemenfk=27&nocm=" + nocm_str + "&norec_apd=" + norec_apd + "&filter_huruf=" + (data ? data.val.toLowerCase() : "A") + "&filter_contain=" + ($scope.filterContain ? $scope.filterContain : ""), true).then(function (dat) {
                    $scope.item.ruanganAsal = dat.data.data[0].namaruangan
                    $scope.listRuanganTujuan = dat.data.ruangantujuan;
                    // $scope.item.ruangantujuan = {
                    //     id: dat.data.ruangantujuan[0].id,
                    //     namaruangan: dat.data.ruangantujuan[0].namaruangan
                    // };
                    for (let i in dat.data.produk) {
                        dat.data.produk[i].checked = false;
                        dat.data.produk[i].jmlLayanan = 0;
                    }
                    $scope.listLayanan = dat.data.produk;

                    namaRuanganFk = dat.data.data[0].objectruanganfk

                    $scope.showInputKhusus = namaRuanganFk === 328 || namaRuanganFk === 76;
                    $scope.item.konsultasiAnestesi = "Tidak",
                        $scope.item.pemeriksaanLab = "Tidak",
                        // $scope.item.prosesPersalinan = $scope.showInputKhusus ? "Normal" : null,
                        $scope.item.kelainanKonengital = $scope.showInputKhusus ? "Tidak" : null,
                        $scope.item.klinisPneumonia = $scope.showInputKhusus ? "Tidak" : null,
                        $scope.item.terpasangOksigen = $scope.showInputKhusus ? "Tidak" : null,
                        $scope.item.terpasangEtt = $scope.showInputKhusus ? "Tidak" : null,
                        $scope.item.umbilicalCatheter = $scope.showInputKhusus ? "Tidak" : null,
                        $scope.item.PICC = $scope.showInputKhusus ? "Tidak" : null,
                        $scope.item.catheterDrain = $scope.showInputKhusus ? "Tidak" : null,

                        norec_pd = dat.data.data[0].noregistrasifk
                    $scope.isLoading = false;
                });
            }


            $scope.filterPelayanan("");

            function getDataRiwayat() {
                manageLogistikPhp.getDataTableTransaksi('lab-radiologi/get-riwayat-rad?NoCM=' + $scope.item.noMr).then((e) => {
                    for (let i = e.data.daftar.length - 1; i >= 0; i--) {
                        e.data.daftar[i].no = i + 1
                    }
                    $scope.dataGridRiwayat = new kendo.data.DataSource({
                        data: e.data.daftar,
                        pageSize: 10
                    });
                })
            }

            function init() {
                manageLogistikPhp.getDataTableTransaksi("rekam-medis/get-combo").then(function (e) {
                    // $scope.listDokter = e.data.dokter;
                    $scope.listRuangan = e.data.ruangankonsul;
                });

                manageLogistikPhp.getDataTableTransaksi("get-detail-login", true).then(function (dat) {
                    $scope.PegawaiLogin2 = dat.data
                });
                if ($scope.header.DataNoregis == false) {
                    getDataRiwayat();
                    // manageLogistikPhp.getDataTableTransaksi('laporan/get-order-rad?noregistrasi=' + $scope.item.noregistrasi).then(function (e) {
                    //     //debugger;
                    //     for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                    //         e.data.daftar[i].no = i + 1
                    //     }
                    //     $scope.dataGridRiwayat = new kendo.data.DataSource({
                    //         data: e.data.daftar,
                    //         pageSize: 10
                    //     });


                    // });
                } else {
                    manageLogistikPhp.getDataTableTransaksi('laporan/get-order-lab?NoCM=' + $scope.item.noMr).then(function (e) {
                        for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                            e.data.daftar[i].no = i + 1
                        }
                        $scope.dataGridRiwayat = new kendo.data.DataSource({
                            data: e.data.daftar,
                            pageSize: 10
                        });

                    });
                }

            }

            $scope.onChangeTab = (tab) => {
                // console.log(tab);
                // if(tab === 2)
            }

            $scope.onChangePemeriksaanLab = (kondisi) => {
                $scope.showInputPemeriksaanLab = kondisi;
            }

            // khusus nicu dan icu
            $scope.onChangeRuangan = (id) => {
                console.log(id);
                $scope.showInputKhusus = id === 328 || id === 76;
            }

            $rootScope.getRekamMedisCheck = function (boolean) {
                if (boolean) {
                    manageLogistikPhp.getDataTableTransaksi('laporan/get-order-rad?noregistrasi=' + $scope.item.noregistrasi).then(function (e) {
                        //debugger;
                        for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                            e.data.daftar[i].no = i + 1
                        }
                        $scope.dataGridRiwayat = new kendo.data.DataSource({
                            data: e.data.daftar,
                            pageSize: 10
                        });


                    });
                } else {
                    manageLogistikPhp.getDataTableTransaksi('laporan/get-order-rad?NoCM=' + $scope.item.noMr).then(function (e) {
                        for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                            e.data.daftar[i].no = i + 1
                        }
                        $scope.dataGridRiwayat = new kendo.data.DataSource({
                            data: e.data.daftar,
                            pageSize: 10
                        });

                    });
                }
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.listLayananLainnya = [];
            $scope.tambahLayananLainnya = () => {
                $scope.listLayananLainnya = [...$scope.listLayananLainnya, {
                    namaLayanan: "",
                    jmlLayanan: "",
                    persiapan: "",
                    catatanTambahan: "",
                    riwayatRadiologi: "",
                }]
            }
            // $scope.tambahLayananLainnya();

            $scope.columnGrid = [{
                "field": "no",
                "title": "No",
                "width": "30px",
            }, {
                "field": "tglpelayanan",
                "title": "Tgl Pelayanan",
                "width": "90px",
            }, {
                "field": "ruangan",
                "title": "Nama Ruangan",
                "width": "140px"
            }, {
                "field": "produkfk",
                "title": "Kode",
                "width": "40px",
            }, {
                "field": "namaproduk",
                "title": "Layanan",
                "width": "160px",
            }, {
                "field": "jumlah",
                "title": "Qty",
                "width": "40px",
            }, {
                "field": "hargasatuan",
                "title": "Harga Satuan",
                "width": "80px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
            }, {
                "field": "hargadiscount",
                "title": "Diskon",
                "width": "80px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
            }, {
                "field": "total",
                "title": "Total",
                "width": "80px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            }, {
                "field": "nostruk",
                "title": "No Struk",
                "width": "80px"
            }];

            $scope.columnGridOrder = [{
                "field": "no",
                "title": "No",
                "width": "30px",
            }, {
                "field": "namaproduk",
                "title": "Layanan",
                "width": "160px",
            }, {
                "field": "persiapan",
                "title": "Persiapan",
                "width": "150px",
            }, {
                "field": "catatanTambahan",
                "title": "Catatan Tambahan",
                "width": "150px",
            }, {
                "field": "riwayat",
                "title": "Riwayat",
                "width": "150px",
            }, {
                "field": "qtyproduk",
                "title": "Qty",
                "width": "20px",
            }];

            $scope.gridOrderOption = {
                toolbar: [{
                    name: "create",
                    template: '<button ng-click="showPopUpOrder()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Layanan</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridOrder
            }

            $scope.showPopUpOrder = function () {
                $scope.listLayananLainnya = [];
                console.log($scope.listLayanan);

                $scope.popupAddLayanan.open().center();
            }

            $scope.resetFormInputTindakan = () => {
                for (let i = 0; i < $scope.listLayanan.length; i++) {
                    $scope.listLayanan[i].checked = false;
                    $scope.listLayanan[i].riwayatRadiologi = null;
                    $scope.listLayanan[i].catatanTambahan = null;
                    $scope.listLayanan[i].persiapan = null;
                    $scope.listLayanan[i].jmlLayanan = null;
                }

                if ($scope.listLayananLainnya.length != 0) {
                    for (let ii = 0; ii < $scope.listLayananLainnya.length; ii++) {
                        $scope.listLayananLainnya[ii].checked = false;
                        $scope.listLayananLainnya[ii].riwayatRadiologi = null;
                        $scope.listLayananLainnya[ii].catatanTambahan = null;
                        $scope.listLayananLainnya[ii].persiapan = null;
                        $scope.listLayananLainnya[ii].jmlLayanan = null;
                    }
                }

            }

            $scope.optGridRiwayat = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
            }

            $scope.columnGridRiwayat = [{
                "field": "no",
                "title": "No",
                "width": "50px",
            }, {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width": "70px",
            }, {
                "field": "tglorder",
                "title": "Tanggal<br> Order",
                "width": "80px",
            }, {
                "field": "noorder",
                "title": "No Order",
                "width": "60px",
            }, {
                "field": "dokter",
                "title": "Dokter",
                "width": "100px"
            }, {
                "field": "namaruangantujuan",
                "title": "Ruangan",
                "width": "100px",
            }, {
                "field": "statusorder",
                "title": "Status",
                "width": "70px",
            }, {

                command: [{
                    text: "Lihat Hasil",
                    click: lihatHasil,
                    imageClass: "k-icon k-i-pencil"
                }, {
                    text: "Hapus",
                    click: hapusOrderRad,
                    imageClass: "k-icon k-i-cancel"
                },],
                title: "",
                width: 100

            }];

            function hapusOrderRad(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.statusorder != 'Belum Kirim Ke RIS') {
                    toastr.error('Tidak bisa dihapus');
                    return
                }

                var data = {
                    norec_order: dataItem.norec
                }
                manageLogistikPhp.saveDataProduk2(data, "lab-radiologi/delete-order-rad").then(function (e) {
                    getDataRiwayat();
                })
            }

            function lihatHasil(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                manageLogistikPhp.getDataTableTransaksi("dokter/get-acc-number-radiologi?noOrder=" + dataItem.noOrder).then(function (e) {
                    $scope.dataRisOrder = e.data.data[0];
                    console.log(e);

                    if (!$scope.dataRisOrder) {
                        toastr.info('Hasil tidak ada');
                        return;
                    }

                    $window.open("http://182.23.26.34:1111/URLCall.do?LID=dok&LPW=dok&LICD=003&PID=" + $scope.item.noMr + '&ACN=' + $scope.dataRisOrder.accession_num, "_blank");
                })


            }

            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                        field: "namaproduk",
                        title: "Deskripsi",
                        width: "300px"
                    }, {
                        field: "konsul_anest",
                        title: "Konsultasi Anestesi",
                        width: "100px"
                    }, {
                        field: "pemeriksaan_radiologi",
                        title: "Pemeriksaan Radiologi",
                        width: "100px"
                    }, {
                        field: "perisapan_radiologi",
                        title: "Perisapan Radiologi",
                        width: "100px"
                    }, {
                        field: "qtyproduk",
                        title: "Qty",
                        width: "100px"
                    }]
                };
            };

            $scope.back = function () {
                window.history.back();
            }

            $scope.order = function () {
                $scope.CmdOrderPelayanan = false;
                $scope.OrderPelayanan = true;
            }

            $scope.add = function () {
                if ($scope.item.statusVerif == true) {
                    toastr.error("Data Sudah Diclosing, Hubungi Tatarekening!");
                    return;
                }
                if ($scope.item.qty == 0) {
                    alert("Qty harus di isi!")
                    return;
                }
                // if ($scope.item.ruangantujuan == undefined) {
                //     alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                //     return;
                // }
                if ($scope.item.layanan == undefined) {
                    alert("Pilih Layanan terlebih dahulu!!")
                    return;
                }
                var nomor = 0
                if ($scope.dataGridOrder == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data.no = $scope.item.no

                            data.produkfk = $scope.item.layanan.id
                            data.namaproduk = $scope.item.layanan.namaproduk
                            data.qtyproduk = parseFloat($scope.item.qty)
                            data.objectruanganfk = namaRuanganFk
                            data.objectruangantujuanfk = $scope.item.ruangantujuan.id
                            data.objectkelasfk = $scope.item.idKelas

                            data2[i] = data;
                            $scope.dataGridOrder = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                } else {
                    data = {
                        no: nomor,
                        produkfk: $scope.item.layanan.id,
                        namaproduk: $scope.item.layanan.namaproduk,
                        qtyproduk: parseFloat($scope.item.qty),
                        qtyproduk: 1,
                        objectruanganfk: namaRuanganFk,
                        objectruangantujuanfk: $scope.item.ruangantujuan.id,
                        objectkelasfk: $scope.item.idKelas
                    }
                    data2.push(data)
                    $scope.dataGridOrder = new kendo.data.DataSource({
                        data: data2
                    });
                    console.log(data2);
                }
                $scope.batal();
            }
            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
                //no:no,
                $scope.item.no = dataSelected.no
                for (var i = $scope.listLayanan.length - 1; i >= 0; i--) {
                    if ($scope.listLayanan[i].id == dataSelected.produkfk) {
                        dataProduk = $scope.listLayanan[i]
                        break;
                    }
                }
                $scope.item.layanan = dataProduk; //{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
                // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

                $scope.item.qty = dataSelected.qtyproduk
            }

            $scope.hapus = function () {
                if ($scope.item.qty == 0) {
                    alert("Qty harus di isi!")
                    return;
                }

                // if ($scope.item.ruangantujuan == undefined) {
                //     alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                //     return;
                // }

                if ($scope.item.layanan == undefined) {
                    alert("Pilih Layanan terlebih dahulu!!")
                    return;
                }

                var nomor = 0
                if ($scope.dataGrid == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }

                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data2.splice(i, 1);
                            for (var i = data2.length - 1; i >= 0; i--) {
                                data2[i].no = i + 1
                            }
                            // data2[i] = data;
                            $scope.dataGridOrder = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                }
                $scope.batal();
            }

            $scope.batalTambah = () => {
                $scope.popupAddLayanan.close();
                $scope.selectedDataProduk = [];
                $scope.listLayanan = [];
            }

            $scope.batal = function () {
                $scope.item.layanan = ''
                $scope.item.qty = 1
                $scope.item.no = undefined
            }

            $scope.BatalOrder = function () {
                data2 = [];
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: []
                });


                $scope.CmdOrderPelayanan = true;
                $scope.OrderPelayanan = false;

                $scope.item.ruanganAsal = null;
                $scope.item.klinis = null;
                $scope.item.catatanKhusus = null;
                $scope.item.konsultasiAnestesi = null;
                $scope.item.pemeriksaanLab = null;
                $scope.item.pemeriksaanLabLainnya = null;
                $scope.item.prematur = null;
                $scope.item.apgar = null;
                $scope.item.prosesPersalinan = null;
                $scope.item.kelainanKonengital = null;
                $scope.item.klinisPneumonia = null;
                $scope.item.terpasangOksigen = null;
                $scope.item.terpasangEtt = null;
                $scope.item.umbilicalCatheter = null;
                $scope.item.PICC = null;
                $scope.item.catheterDrain = null;

                $scope.showInputPemeriksaanLab = false;
                // $scope.showInputKhusus = false;
            }

            $scope.riwayat = function () {
                $scope.riwayatForm = true
                $scope.inputOrder = false;
            }

            $scope.Simpan = function () {

                if (kelompokPasien === "BPJS" && data2.length > 1) {
                    toastr.info("Untuk Pasien BPJS tidak bisa lebih dari 1 tindakan");
                    return;
                }

                if (!$scope.item.klinis) {
                    toastr.warning("Klinis tidak boleh kosong!");
                    return;
                }

                if (data2.length == 0) {
                    toastr.warning("Pilih layanan terlebih dahulu!");
                    return;
                }

                if (!$scope.item.prosesPersalinan && (namaRuanganFk === 328 || namaRuanganFk === 76)) {
                    toastr.warning("Harap pilih Proses Persalinan!");
                    return;
                }

                // persiapan nya ada 2
                var objSave = {
                    norec_so: '',
                    norec_apd: norec_apd,
                    norec_pd: norec_pd,
                    qtyproduk: data2.length, //
                    objectruanganfk: namaRuanganFk,
                    // objectruanganfk: $scope.item.ruanganAsal.id,
                    klinis: $scope.item.klinis.toUpperCase(),
                    objectruangantujuanfk: $scope.item.ruangantujuan.id,
                    departemenfk: 27,
                    pegawaiorderfk: $scope.PegawaiLogin2.pegawai[0].id,

                    catatanKusus: $scope.item.catatanKhusus,
                    konsultasiAnest: $scope.item.konsultasiAnestesi,
                    periksaLab: $scope.item.pemeriksaanLab === "lainnya" ? $scope.item.pemeriksaanLabLainnya : $scope.item.pemeriksaanLab,
                    prematur: $scope.item.prematur ? $scope.item.prematur : "",
                    scOrNormal: $scope.item.prosesPersalinan ? $scope.item.prosesPersalinan : "",
                    apgar: $scope.item.apgar ? $scope.item.apgar : "",
                    konengital: $scope.item.kelainanKonengital ? $scope.item.kelainanKonengital : "",
                    pneumonia: $scope.item.klinisPneumonia ? $scope.item.klinisPneumonia : "",
                    oksigen: $scope.item.terpasangOksigen ? $scope.item.terpasangOksigen : "",
                    ett: $scope.item.terpasangEtt ? $scope.item.terpasangEtt : "",
                    umbCathe: $scope.item.umbilicalCatheter ? $scope.item.umbilicalCatheter : "",
                    picc: $scope.item.PICC ? $scope.item.PICC : "",
                    drainCath: $scope.item.catheterDrain ? $scope.item.catheterDrain : "",
                    details: data2
                }

                manageLogistikPhp.postpost("lab-radiologi/save-order-rad-dokter", objSave).then(function (e) {
                    tempDataGrid = [];
                    $scope.selectedDataProduk = [];
                    $scope.BatalOrder();
                    getDataRiwayat();
                    manageLogistikPhp.postLogging('Order Radiologi', 'Norec strukorder_t', e.data.strukorder.norec, 'Menu Dokter').then(function (res) { })
                })
            }
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
        }
    ]);
});
