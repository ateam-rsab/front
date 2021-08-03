define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TransaksiPelayananLaboratoriumDokterRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'FindProduk',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, FindProduk) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            let tempDataGrid = [];
            $scope.item.qty = 1
            $scope.riwayatForm = false
            $scope.inputOrder = true
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false
            $scope.header.DataNoregis = true
            // var pegawaiUser = {}
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            let getJenisPegawai = $scope.dataLogin.jenisPegawai.jenispegawai ? $scope.dataLogin.jenisPegawai.jenispegawai : $scope.dataLogin.jenisPegawai.jenisPegawai;
            var detail = ''
            let baseURLFiltering = "idjenisperiksapenunjang="

            let dataPengkajian = JSON.parse(localStorage.getItem("cacheHelper"));
            dataPengkajian = dataPengkajian[1].value;
            $scope.listFilters = [
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            ];
            LoadCacheHelper();

            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
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
                init()
            }

            var data2 = [];
            $scope.PegawaiLogin2 = {};
            var namaRuangan = ''
            var namaRuanganFk = ''
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            //  LoadCache();
            //  function LoadCache(){
            //      var chacePeriode = cacheHelper.get('TransaksiPelayananLaboratoriumDokterCtrl');
            //      if(chacePeriode != undefined){
            //          norec_apd = chacePeriode[0]
            //          nocm_str = chacePeriode[1]
            //          // $scope.item.ruanganAsal = namaRuangan;
            //          // manageLogistikPhp.getDataTableTransaksi("logistik/get_detailPD?norec_apd="+norec_apd, true).then(function(data_ih){
            //          //     $scope.item.jenisPenjamin = data_ih.data.detailPD[0].namarekanan
            //          //     $scope.item.kelompokPasien = data_ih.data.detailPD[0].kelompokpasien
            //          //     $scope.item.beratBadan = data_ih.data.detailPD[0].beratbadan
            //          // });
            //          init()
            //     }else{

            //     }

            // }

            $scope.getDataPaket = function () {
                // http://192.168.12.3:8080/jasamedika-web/service/list-generic/?view=Paket&select=id,namaPaket&criteria=statusEnabled,jenisPaketId&values=true,4&order=namaPaket:asc
                manageLogistikPhp.getDataTableMaster("produk/master-paket?idjenispaket=4").then(function (dat) {
                    $scope.listPaket = dat.data;

                });
            }
            $scope.getDataPaket();

            $scope.getDataKategori = () => {
                manageLogistikPhp.getDataTableMaster("produk/grup-penunjang").then(function (dat) {
                    $scope.listKategori = dat.data.penunjang.jenisperiksapenunjang;

                    // jenisperiksapenunjang
                })
            }
            $scope.getDataKategori();

            $scope.changeBaseUrlFiltering = (data, id) => {
                if (data) {
                    $scope.item.paket = null;
                } else {
                    $scope.item.kategori = null;
                }
                baseURLFiltering = (data ? "idjenisperiksapenunjang=" : "idpaket=") + (id ? id : "");
            }

            $scope.filterPelayanan = function (data) {
                $scope.isLoading = true;
                manageLogistikPhp.getDataTableTransaksi("pelayanan/get-order-penunjang?departemenfk=3&nocm=" + nocm_str + '&norec_apd=' + norec_apd + "&" + baseURLFiltering + "&filter_huruf=" + (data ? data.toLowerCase() : "") + "&filter_contain=" + ($scope.filterContain ? $scope.filterContain : ""), true).then(function (dat) {
                    for (let i in dat.data.produk) {
                        dat.data.produk[i].checked = false;
                        dat.data.produk[i].jmlLayanan = 0;
                        dat.data.produk[i].checkedPemeriksaanLuar = false;
                    }

                    $scope.item.ruanganAsal = dat.data.data[0].namaruangan
                    $scope.listRuanganTujuan = dat.data.ruangantujuan;
                    $scope.item.ruangantujuan = {
                        id: dat.data.ruangantujuan[2].id,
                        namaruangan: dat.data.ruangantujuan[2].namaruangan

                    }
                    $scope.listLayanan = dat.data.produk;
                    namaRuanganFk = dat.data.data[0].objectruanganfk
                    norec_pd = dat.data.data[0].noregistrasifk
                    $scope.isLoading = false;
                });
            }
            $scope.filterPelayanan("");

            $scope.columnGridPreview = [{
                "field": "noregistrasi",
                "title": "No. Registrasi",
                "width": 100,
            }, {
                "field": "noorder",
                "title": "No. Order",
                "width": 100,
            }, {
                "field": "tglorder",
                "title": "Tanggal Order",
                "width": 100,
            }, {
                "field": "namaruanganasal",
                "title": "Ruangan",
                "width": 150,
            }, {
                "field": "dokter",
                "title": "Dokter Order",
                "width": 150,
            }, {
                "field": "statusorder",
                "title": "Status Order",
                "width": 100,
            }, ]

            function init() {
                $scope.isDokter = getJenisPegawai === "DOKTER";

                manageLogistikPhp.getDataTableTransaksi("rekam-medis/get-combo").then(function (e) {
                    $scope.listDokter = e.data.dokter;
                });

                manageLogistikPhp.getDataTableTransaksi("laporan/get-riwayat-harian?noregistrasi=" + dataPengkajian[3], true).then(function (dat) {
                    $scope.dataDailyPreview = new kendo.data.DataSource({
                        data: dat.data.daftar,
                        pageSize: 5
                    })
                });
                manageLogistikPhp.getDataTableTransaksi("get-detail-login", true).then(function (dat) {
                    $scope.PegawaiLogin2 = dat.data
                });

                if ($scope.header.DataNoregis == false) {
                    manageLogistikPhp.getDataTableTransaksi('laporan/get-order-lab-new?NoCM=' + $scope.item.noMr).then(function (e) {
                        for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                            e.data.daftar[i].no = i + 1
                        }
                        $scope.dataGridRiwayat = new kendo.data.DataSource({
                            data: e.data.daftar,
                            pageSize: 10
                        });

                    });
                } else {
                    manageLogistikPhp.getDataTableTransaksi('laporan/get-order-lab-new?NoCM=' + $scope.item.noMr).then(function (e) {
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
            
            $scope.selectedDataProduk = [];
            $scope.updateSelectedData = (data, i) => {
                $scope.selectedDataProduk = [];
                $scope.listLayanan[i].checked = !$scope.listLayanan[i].checked;

                for (let i in $scope.listLayanan) {

                    if ($scope.listLayanan[i].checked) {
                        $scope.selectedDataProduk.push($scope.listLayanan[i]);
                    }
                }
            }
            $scope.updateDataPemeriksaanLuar = (data, i) => {
                $scope.listLayanan[i].checkedPemeriksaanLuar = !$scope.listLayanan[i].checkedPemeriksaanLuar;
            }


            
            $scope.tambahData = () => {

                for (let i in $scope.selectedDataProduk) {
                    tempDataGrid.push({
                        namaproduk: $scope.selectedDataProduk[i].namaproduk,
                        no: tempDataGrid.length + 1,
                        objectkelasfk: $scope.item.idKelas,
                        objectruanganfk: namaRuanganFk,
                        objectruangantujuanfk: $scope.item.ruangantujuan.id,
                        produkfk: $scope.selectedDataProduk[i].id,
                        qtyproduk: 1,
                        pemeriksaanluar: $scope.selectedDataProduk[i].checkedPemeriksaanLuar,
                        catatanOrder: $scope.selectedDataProduk[i].catatan
                    })
                }

                data2 = tempDataGrid;
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: tempDataGrid,
                    pageSize: 20
                });

                // tempDataGrid = [];
                $scope.selectedDataProduk = [];
                $scope.popupAddLayanan.close();
            }

            $rootScope.getRekamMedisCheck = function (bool) {
                if (bool) {
                    manageLogistikPhp.getDataTableTransaksi('laporan/get-order-lab-new?NoCM' + $scope.item.noMr).then(function (e) {
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
                    manageLogistikPhp.getDataTableTransaksi('laporan/get-order-lab-new?NoCM=' + $scope.item.noMr).then(function (e) {
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
            $scope.LihatHasil = function (data) {
                //debugger;
                if ($scope.dataSelectedRiwayat == undefined) {
                    toastr.error('Pilih data dulu');
                    return
                }
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('cacheHasilLaboratorium', arrStr);
                $state.go('HasilLaboratorium', {
                    norecPd: $scope.dataSelectedRiwayat.norecpd,
                    noOrder: $scope.dataSelectedRiwayat.noorder,
                    norecApd: $scope.dataSelectedRiwayat.norecapd,
                })
                // $state.go(data ? data : 'DashboardLaboratoriumCtrlInputHasil', {
                //     noRegistrasi: $scope.dataSelectedRiwayat.norecpd,
                //     noOrder: $scope.dataSelectedRiwayat.noorder,
                //     noAntrianPasien: $scope.dataSelectedRiwayat.norecapd,
                //     status : "hasil"
                // })
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [{
                    "field": "no",
                    "title": "No",
                    "width": "10px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Order",
                    "width": "90px",
                },
                {
                    "field": "ruangan",
                    "title": "Nama Ruangan",
                    "width": "140px"
                },
                {
                    "field": "produkfk",
                    "title": "Kode",
                    "width": "40px",
                },
                {
                    "field": "namaproduk",
                    "title": "Layanan",
                    "width": "160px",
                },
                {
                    "field": "jumlah",
                    "title": "Qty",
                    "width": "40px",
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan",
                    "width": "80px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                },
                {
                    "field": "hargadiscount",
                    "title": "Diskon",
                    "width": "80px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                },
                {
                    "field": "total",
                    "title": "Total",
                    "width": "80px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                },
                {
                    "field": "nostruk",
                    "title": "No Struk",
                    "width": "80px"
                }
            ];

            $scope.columnGridOrder = [{
                    "field": "no",
                    "title": "No",
                    "width": "10px",
                },
                {
                    "field": "namaproduk",
                    "title": "Layanan",
                    "width": "160px",
                },
                {
                    "field": "qtyproduk",
                    "title": "Qty",
                    "width": "40px",
                }, {
                    "field": "catatanOrder",
                    "title": "Catatan",
                    "width": "40px",
                }
            ];

            $scope.gridOrderOption = {
                toolbar: [{
                    name: "create",
                    template: '<button ng-click="showPopUpOrder()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridOrder
            }

            $scope.showPopUpOrder = function () {
                // if (getJenisPegawai !== "DOKTER") {
                //     toastr.info('Anda tidak memiliki akses menambahkan konsultasi');
                //     return;
                // }
                $scope.popupAddLayanan.open().center();
            }

            $scope.columnGridRiwayat = [{
                "field": "no",
                "title": "No",
                "width": "20px",
            }, {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width": "70px",
            }, {
                "field": "tglorder",
                "title": "Tgl Order",
                "width": "50px",
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
                    text: "PDF",
                    click: exportToPdf
                }],
                title: "&nbsp;",
                width: 50,
                attributes: {
                    style: "text-align:center;valign=middle"
                }

            }];

            function exportToPdf(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                window.open('https://smart.rsabhk.co.id:2222/service-reporting/lap-lab/' + dataItem.noregistrasi);
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
                        },
                        {
                            field: "qtyproduk",
                            title: "Qty",
                            width: "100px"
                        }
                    ]
                };
            };
            $scope.back = function () {
                window.history.back();
            }
            $scope.order = function () {
                $scope.CmdOrderPelayanan = false;
                $scope.OrderPelayanan = true;
            }
            $scope.Batal = function () {

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
                if (!$scope.item.ruangantujuan) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return;
                }
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
                            data.namaproduk = $scope.item.layanan.namaproduk;
                            data.no = $scope.item.no;
                            data.objectkelasfk = $scope.item.idKelas;
                            data.objectruanganfk = namaRuanganFk;
                            data.objectruangantujuanfk = $scope.item.ruangantujuan.id;
                            data.produkfk = $scope.item.layanan.id;
                            data.qtyproduk = parseFloat($scope.item.qty);
                            data.pemeriksaanluar = $scope.item.pemeriksaanKeluar === true ? 1 : 0;


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
                        objectruanganfk: namaRuanganFk,
                        objectruangantujuanfk: $scope.item.ruangantujuan.id,
                        pemeriksaanluar: $scope.item.pemeriksaanKeluar === true ? 1 : 0,
                        objectkelasfk: $scope.item.idKelas
                    }
                    data2.push(data)
                    // $scope.dataGrid.add($scope.dataSelected)
                    $scope.dataGridOrder = new kendo.data.DataSource({
                        data: data2
                    });
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
                $scope.item.pemeriksaanKeluar = dataSelected.pemeriksaanluar == 1 ? true : false
            }

            $scope.hapus = function () {
                if ($scope.item.qty == 0) {
                    alert("Qty harus di isi!")
                    return;
                }
                if ($scope.item.ruangantujuan == undefined) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return;
                }
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
            $scope.batal = function () {
                $scope.item.layanan = ''
                $scope.item.qty = 1
                $scope.item.no = undefined
            }
            $scope.BatalOrder = function () {
                data2 = []
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: data2
                });
                $scope.item.klinis = null;
                $scope.item.dpjp = null;
                $scope.CmdOrderPelayanan = true;
                $scope.OrderPelayanan = false;
            }
            $scope.riwayat = function () {
                $scope.riwayatForm = true
                $scope.inputOrder = false;
            }

            $scope.tambahTindakan = () => {
                if ($scope.dataSelectedRiwayat.statusorder === "SELESAI DIPERIKSA") {
                    toastr.warning("Tidak bisa tambah tindakkan!", "Pasien Selesai Diperiksa");
                    return;
                }
                localStorage.setItem("dataRiwayatLab", JSON.stringify($scope.dataSelectedRiwayat));

                $state.go("TambahTindakanLabDokter");
            }

            $scope.Simpan = function () {

                if (!$scope.item.klinis) {
                    toastr.warning("Harap isi Klinis terlebih dahulu!");
                    return;
                }

                if(!$scope.isDokter && !$scope.item.dpjp) {
                    toastr.warning("Harap pilih DPJP terlebih dahulu!");
                    return;
                }

                if (data2.length == 0) {
                    toastr.warning("Pilih layanan terlebih dahulu!!")
                    return
                }
                var objSave = {
                    norec_so: '',
                    norec_apd: norec_apd,
                    norec_pd: norec_pd,
                    klinis: $scope.item.klinis.toUpperCase(),
                    qtyproduk: data2.length,
                    objectruanganfk: namaRuanganFk,
                    objectruangantujuanfk: $scope.item.ruangantujuan.id,
                    departemenfk: 3,
                    pegawaiorderfk: $scope.PegawaiLogin2.pegawai[0].id,
                    objectDpjp: $scope.isDokter ? $scope.PegawaiLogin2.pegawai[0].id : $scope.item.dpjp.id,
                    details: data2
                }

                manageLogistikPhp.saveData("transaksi/lab-radiologi/save-order-layanan-new", objSave).then(function (e) {
                    init();
                    $scope.BatalOrder();
                    manageLogistikPhp.postLogging('Order Laboratorium', 'Norec strukorder_t', e.data.strukorder.norec, 'Menu Dokter').then(function (res) {})
                    // $scope.item.resep = e.data.noresep.norec
                    // var stt = 'false'
                    // if (confirm('View resep? ')) {
                    //     // Save it!
                    //     stt='true';
                    // } else {
                    //     // Do nothing!
                    //     stt='false'
                    // }
                    // var client = new HttpClient();
                    // client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores='+e.data.noresep.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //     //aadc=response;
                    // });
                    // if (noOrder == 'EditResep') {
                    //     var objDelete = {norec:norecResep}
                    //     manageLogistikPhp.posthapuspelayananapotik(objDelete).then(function(e) {

                    //     })
                    // }
                    // window.history.back();
                })
            }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            // $scope.back=function(){
            //     //$state.go("DaftarPasienApotik")
            //     window.history.back();
            // }
            // $scope.TambahObat =function(){
            //      ////debugger;
            //     var arrStr ={ 0 : $scope.item.noMr ,
            //         1 : $scope.item.namaPasien,
            //         2 : $scope.item.jenisKelamin,
            //         3 : $scope.item.noregistrasi, 
            //         4 : $scope.item.umur,
            //         5 : $scope.item.kelas.id,
            //         6 : $scope.item.kelas.namakelas,
            //         7 : $scope.item.tglRegistrasi,
            //         8 : norec_apd,
            //         9 : '',
            //         10 : $scope.item.jenisPenjamin,
            //         11 : $scope.item.kelompokPasien,
            //         12 : $scope.item.beratBadan,
            //         13 : $scope.item.AlergiYa
            //     }
            //     cacheHelper.set('InputResepApotikCtrl', arrStr);
            //     $state.go('InputResepApotik')
            // }
            // $scope.EditResep =function(){
            //      ////debugger;
            //     var arrStr ={ 0 : $scope.item.noMr ,
            //         1 : $scope.item.namaPasien,
            //         2 : $scope.item.jenisKelamin,
            //         3 : $scope.item.noregistrasi, 
            //         4 : $scope.item.umur,
            //         5 : $scope.item.kelas.id,
            //         6 : $scope.item.kelas.namakelas,
            //         7 : $scope.item.tglRegistrasi,
            //         8 : norec_apd,
            //         9 : 'EditResep',
            //         10 : $scope.item.jenisPenjamin,
            //         11 : $scope.item.kelompokPasien,
            //         12 : $scope.item.beratBadan,
            //         13 : $scope.item.AlergiYa,
            //         14 : $scope.dataSelected.norec_resep
            //     }
            //     cacheHelper.set('InputResepApotikCtrl', arrStr);
            //     $state.go('InputResepApotik')
            // }

            // $scope.orderApotik =function(){
            //     $state.go("InputResepApotikOrder")
            // }
            // $scope.HapusResep = function(){
            //     var objDelete = {norec:$scope.dataSelected.norec_resep}
            //     manageLogistikPhp.posthapuspelayananapotik(objDelete).then(function(e) {
            //         init();
            //     })
            // }
            // $scope.cetakEtiket = function(){
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec='+$scope.dataSelected.norec_resep+'&cetak=1', function(response) {
            //         // aadc=response;
            //     });
            // }
            $scope.cetakResep = function () {
                if ($scope.dataSelected == undefined) {
                    alert('Pilih resep yg akan di cetak')
                    return;
                }
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=' + $scope.dataSelected.norec_resep + '&view=' + stt + '&user=' + $scope.dataSelected.detail.userData.namauser, function (response) {
                    // aadc=response;
                });
            }
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }

            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,

                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }

            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }
            $scope.hapusOrder = function () {
                if ($scope.dataSelectedRiwayat == undefined) {
                    toastr.error('Pilih data yang mau dihapus')
                    return
                }
                if ($scope.dataSelectedRiwayat.statusorder != 'PENDING') {
                    toastr.error('Tidak bisa dihapus');
                    return
                }
                var data = {
                    norec_order: $scope.dataSelectedRiwayat.norecSo
                }
                manageLogistikPhp.saveDataProduk2(data, "lab-radiologi/delete-orderlabrad")
                    .then(function (e) {
                        init()

                    })
            }
            //***********************************

        }
    ]);
});

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1