define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarMonitoringUsulanRuanganCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            var pegawaiUser = {}
            $scope.item.tglAwal = $scope.now;
            $scope.item.tglAkhir = $scope.now;
            $scope.dataGridDetail = new kendo.data.DataSource({
                data: [],
                pageSize: 10
            });
            loadCombo();


            function loadCombo() {
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function (data) {
                    $scope.listNamaBarang = data;
                });
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function () {
                $state.go('UsulanPermintaanBarangJasaRuanganRev')
            }

            function init() {
                $scope.isRouteLoading = true;
                var ins = ""
                if ($scope.item.instalasi != undefined) {
                    var ins = "&dpid=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan != undefined) {
                    var rg = "&ruid=" + $scope.item.ruangan.id
                }
                var produkfk = ""
                if ($scope.item.namaBarang != undefined) {
                    var produkfk = "&produkfk=" + $scope.item.namaBarang.id
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("data/get-monitoring-usulan-permintaan-ruangan?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk +
                    "&nofaktur=" + $scope.item.nofaktur +
                    "&namarekanan=" + $scope.item.namarekanan +
                    produkfk, true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    var data = dat.data.daftar;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i + 1
                        // var tanggal = $scope.now;
                        // var tanggalLahir = new Date(dat.data.daftar[i].tgllahir);
                        // var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        // dat.data.daftar[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                    // $scope.dataGrid = dat.data.daftar;
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.daftar,
                        pageSize: 5
                    })

                    pegawaiUser = dat.data.datalogin;

                });

                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir,
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('DaftarMonitoringUsulanCtrl', chacePeriode);


            }

            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }

            $scope.cariFilter = function () {
                init();
            }

            $scope.newUPK = function () {
                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditTerima',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('UsulanPelaksanaanKegiatanCtrl', chacePeriode);
                $state.go('UsulanPelaksanaanKegiatan')
            }

            $scope.CetakRincian = function () {
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores=' + $scope.dataSelected.norec + '&view=' + stt + '&user=' + pegawaiUser.userData.namauser, function (response) {
                    //aadc=response;
                });
            }

            $scope.CetakBuktiLayanan = function () {
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpelaksanaankegiatan=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {
                    //aadc=response;
                });
            }

            $scope.Cetak = function () {
                var stt = 'false'
                if (confirm('View Bukti Usulan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {
                    //aadc=response;
                });
            }

            $scope.EditTerima = function () {
                if ($scope.dataSelected.noverifikasi) {
                    alert("Data Sudah Diverifikasi!!")
                    return;
                }

                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditTerima',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }

            $scope.HapusPenerimaan = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                if ($scope.dataSelected.nosbm != undefined) {
                    alert("Sudah di bayar tidak dapat di hapus!!")
                    return;
                }
                var stt = 'false'
                if (confirm('Hapus Penerimaan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?" + "norec_sp=" + $scope.dataSelected.norec, true).then(function (dat) {
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            function detailData(e) {

                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);
                let dataTemp = [];

                dataItem.detailsItem.forEach(element => {
                    dataTemp.push(element);
                });

                $scope.dataGridDetail = new kendo.data.DataSource({
                    data: dataTemp,
                    pageSize: 10
                });

                $scope.dataGridDetail.fetch();

                $scope.popupDetail.open().center();
            }

            $scope.columnGrid = [{
                    "field": "no",
                    "title": "<h3>No</h3>",
                    "width": "40px",
                },
                {
                    "field": "tglorder",
                    "title": "<h3>Tanggal<br> Usulan</h3>",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "tglkebutuhan",
                    "title": "<h3>Tanggal<br> Kebutuhan</h3>",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                },
                {
                    "field": "noorder",
                    "title": "<h3>No. Usulan</h3>",
                    "width": "150px",
                },
                {
                    "field": "keterangan",
                    "title": "<h3>Jenis Usulan</h3>",
                    "width": "200px",
                },
                {
                    "field": "koordinator",
                    "title": "<h3>Koordinator<br> Barang</h3>",
                    "width": "120px",
                },
                {
                    "field": "ruangan",
                    "title": "<h3>Unit Pengusul</h3>",
                    "width": "200px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "<h3>Unit Tujuan</h3>",
                    "width": "200px",
                },
                {
                    "field": "penanggungjawab",
                    "title": "<h3>Penanggung Jawab</h3>",
                    "width": "200px",
                },
                {
                    "field": "mengetahui",
                    "title": "<h3>Mengetahui</h3>",
                    "width": "200px",
                },
                {
                    "field": "noverifikasi",
                    "title": "<h3>No. UPK</h3>",
                    "width": "150px",
                },
                {
                    "field": "tglverifikasi",
                    "title": "<h3>Tanggal<br> Verifikasi</h3>",
                    "width": "120px",
                    "template": "<span class='style-right'>{{tglverifikasi ? formatTanggal('#: tglverifikasi #', '') : '-'}}</span>"
                }, {
                    command: [{
                        text: "Detail",
                        align: "center",
                        attributes: {
                            align: "center"
                        },
                        click: detailData,
                        // imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: "120px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }

            ];

            $scope.columnGridDetail = [
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width": "150px",
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan Standar",
                    "width": "100px",
                },
                {
                    "field": "qtyusulan",
                    "title": "QTY Usulan",
                    "width": "100px",
                },
                {
                    "field": "qtyupk",
                    "title": "QTY UPK",
                    "width": "100px",
                },
                {
                    "field": "qtyspk",
                    "title": "QTY SPK",
                    "width": "100px",
                },
                {
                    "field": "hargausulan",
                    "title": "Harga Usulan",
                    "width": "100px",
                },
                {
                    "field": "hargaupk",
                    "title": "Harga UPK",
                    "width": "100px",
                },
                {
                    "field": "hargaspk",
                    "title": "Harga SPK",
                    "width": "100px",
                },
                
            ];

            

            $scope.data2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                            "field": "tglrealisasi",
                            "title": "Tgl Perpindahan",
                            "width": "80px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglrealisasi #', '')}}</span>"
                        },
                        {
                            "field": "noverifikasi",
                            "title": "No Dokumen",
                            "width": "85px",
                        },
                        {
                            "field": "namalengkap",
                            "title": "Penanggung Jawab",
                            "width": "110px",
                        },
                        {
                            "field": "kelompoktransaksi",
                            "title": "Keterangan",
                            "width": "80px",
                        }
                    ]
                }
            };

            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD/MM/YYYY HH:mm');
            }

            function itungUsia(tgl) {
                debugger;
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih / (1000 * 60 * 60 * 24 * 365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn ' // + bln + ' bln'
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
        }
    ]);
});