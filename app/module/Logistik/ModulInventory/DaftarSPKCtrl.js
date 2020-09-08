define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarSPKCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.dataSPKExport = [];
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarSPKCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.tglAwal = new Date(chacePeriode[0]);
                    $scope.item.tglAkhir = new Date(chacePeriode[1]);

                    init();
                }
                else {
                    $scope.item.tglAwal = $scope.now;
                    $scope.item.tglAkhir = $scope.now;
                    init();
                }
            }
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
                $state.go('KegiatanSPK')
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
                manageLogistikPhp.getDataTableTransaksi("spk/get-daftar-spk?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&noKontrak=" + $scope.item.nousulan +
                    "&keterangan=" + $scope.item.jenisusulan
                    + produkfk
                    // "&namarekanan=" + $scope.item.namarekanan
                    , true).then(function (dat) {
                        $scope.isRouteLoading = false;
                        var dataPasien = [];
                        for (var i = 0; i < dat.data.daftar.length; i++) {
                            dat.data.daftar[i].no = i + 1
                            if (dat.data.daftar[i].status == 1) {
                                dat.data.daftar[i].status2 = "Done"
                            } else {
                                dat.data.daftar[i].status2 = ""
                            }
                        }
                        $scope.dataSPKExport = dat.data.daftar;

                        $scope.dataGrid = new kendo.data.DataSource({
                            data: dat.data.daftar,
                            pageSize: 10,
                        });



                        pegawaiUser = dat.data.datalogin
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
                cacheHelper.set('DaftarSPKCtrl', chacePeriode);


            }
            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {

                init();
            }

            $scope.newSPPB = function () {
                // debugger;
                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditOrder',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('OrderBarangSPPBCtrl', chacePeriode);
                $state.go('OrderBarangSPPB', {
                    norec: $scope.dataSelected.norec,
                    noOrder: 'EditOrder'
                });
                // $state.go('OrderBarangSPPB')
            }

            $scope.PenerimaanSPK = function () {
                var chacePeriode = {
                    0: '',
                    1: 'SPK',
                    2: $scope.dataSelected.norec,
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('PenerimaanBarangSuplierCtrl', chacePeriode);
                $state.go('PenerimaanBarangSuplier', {
                    norec: $scope.dataSelected.norec,
                    noOrder: 'SPK'
                });
            }

            $scope.Verifikasi = function () {
                var chacePeriode = {
                    0: '',
                    1: 'VerifSPK',
                    2: $scope.dataSelected.norec,
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('InputSPKBaruCtrl', chacePeriode);
                $state.go('InputSPKBaru', {
                    norec: $scope.dataSelected.norec,
                    noOrder: 'VerifSPK'
                });
            }

            // $scope.TransaksiPelayanan = function(){
            //     debugger;
            //     var arrStr ={ 0 : $scope.dataSelected.nocm ,
            //         1 : $scope.dataSelected.namapasien,
            //         2 : $scope.dataSelected.jeniskelamin,
            //         3 : $scope.dataSelected.noregistrasi, 
            //         4 : $scope.dataSelected.umur,
            //         5 : $scope.dataSelected.klid,
            //         6 : $scope.dataSelected.namakelas,
            //         7 : $scope.dataSelected.tglregistrasi,
            //         8 : $scope.dataSelected.norec_apd,
            //         9 : 'resep'
            //     }
            //     cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
            //     $state.go('TransaksiPelayananApotik')

            //     var arrStr2 ={ 0 : $scope.dataSelected.norec 
            //     }
            //     cacheHelper.set('DaftarResepCtrl', arrStr2);
            //     $state.go('DaftarResepCtrl')
            // }

            // $scope.CetakRincian = function(){
            //     var stt = 'false'
            //     if (confirm('View resep? ')) {
            //         // Save it!
            //         stt='true';
            //     } else {
            //         // Do nothing!
            //         stt='false'
            //     }
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
            //         //aadc=response;
            //     });
            // }
            // $scope.CetakBukti = function(){
            //     var stt = 'false'
            //     if (confirm('View Bukti Penerimaan? ')) {
            //         // Save it!
            //         stt='true';
            //     } else {
            //         // Do nothing!
            //         stt='false'
            //     }
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
            //         //aadc=response;
            //     });
            // }
            $scope.Cetak = function () {
                var stt = 'false'
                if (confirm('View Bukti SPK? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-spk=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {
                    //aadc=response;
                });
            }

            $scope.EditTerima = function () {
                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditTerima',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('EditKegiatanSPKCtrl', chacePeriode);
                $state.go('EditKegiatanSPK', {
                    norec: $scope.dataSelected.norec,
                    noOrder: 'EditTerima'
                });
                // $state.go('EditKegiatanSPK')
            }

            $scope.HapusSPK = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }

                if ($scope.dataSelected.norecpenerimaan != undefined) {
                    alert("SPK Sudah Diterima, Tidak Dapat Dihapus!!")
                    return;
                }

                manageLogistikPhp.getDataTableTransaksi("spk/get-data-SPKkeUPK?"
                    + "&ketOrder=" + $scope.dataSelected.keterangan
                    + "&rekananfk=" + $scope.dataSelected.rekananfk, true)
                    .then(function (dat) {
                        var data = dat.data;
                        var datae = {
                            "data": data,
                        }
                        var datas = {
                            "norec_so": $scope.dataSelected.norec,
                            "nokontrakspk": $scope.dataSelected.nospk
                        }

                        if (data != undefined) {
                            manageLogistikPhp.updatedataspkkeupk(datae).then(function (e) {
                                // init()
                            })
                            manageLogistikPhp.deletespk(datas).then(function (e) {
                                init()
                            })
                        }
                    });
            }

            $scope.TambahSPK = function () {
                $state.go('InputSPKBaru');
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


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "50px",
                },
                {
                    "field": "nospk",
                    "title": "No SPK",
                    "width": "120px"
                },
                {
                    "field": "nousulan",
                    "title": "No. Usulan",
                    "width" : "100px",
                },
                {
                    "field": "tglorder",
                    "title": "Tanggal",
                    "width": "100px",
                    "template": "<span>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "supplier",
                    "title": "Supplier",
                    "width": "120px"
                },
                {
                    "field": "jmlitem",
                    "title": "Item",
                    "width": "80px",
                    "template": "<span style='text-align: center;'>#= kendo.toString(jmlitem) #</span>",
                },
                // {
                //     "field": "tglkebutuhan",
                //     "title": "Tgl Kebutuhan",
                //     "width" : "85px",
                //     "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                // },
                // {
                //     "field": "keterangan",
                //     "title": "Jenis Usulan",
                //     "width" : "120px",
                // },
                // {
                //     "field": "koordinator",
                //     "title": "Koordinator Barang",
                //     "width" : "60px",
                // },
                {
                    "field": "ruangan",
                    "title": "Unit Pembuat",
                    "width": "200px",
                },
                {
                    "field": "penanggungjawab",
                    "title": "Pembuat PO",
                    "width": "200px",
                },
                {
                    "field": "mengetahui",
                    "title": "Mengetahui",
                    "width": "200px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "Unit Peminta",
                    "width": "120px",
                },
                {
                    command: [
                        {
                            text: "Edit",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: editSPK,
                            imageClass: "k-icon k-i-pencil"
                        },
                        {
                            text: "Hapus",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: confirmHapusSPK,
                            imageClass: "k-icon k-delete"
                        },
                        {
                            text: "Penerimaan",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: penerimaanSPK,
                            imageClass: "k-icon k-i-checkmark"
                        }
                    ],
                    title: "",
                    width: "300px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
                // {
                //     "field": "tglkontrak",
                //     "title": "Tgl Kontrak",
                //     "width" : "100px",
                //      "template": '# if( tglkontrak==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tglkontrak), "dd-MM-yyyy HH:mm") #<span>#} #',
                // },
                // {
                //     "field": "status2",
                //     "title": "Status",
                //     "width" : "100px"
                // }
            ];

            function penerimaanSPK(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.dataSelected = dataItem;

                $scope.PenerimaanSPK();
            }

            function editSPK(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                $scope.dataSelected = dataItem;
                $scope.EditTerima();
            }

            function confirmHapusSPK(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data Surat Perintah Kerja (SPK) ?')
                    .textContent(`Anda akan menghapus data Surat Perintah Kerja (SPK) secara permanen`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.HapusSPK();
                }, function () {
                    toastr.info('Hapus SPK dibatalkan');
                });

                $scope.dataSelected = dataItem;


            }

            $scope.opsiGridSip = {
                toolbar: [
                    // "excel", 
                    { text: "export", name: "Export detail", template: '<button ng-click="exportSPK()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' },
                    { text: "export", name: "Export detail", template: '<button ng-click="TambahSPK()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Buat SPK</button>' },
                    { text: "export", name: "Export detail", template: '<button ng-click="Cetak()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-print"></span>Cetak</button>' }
                ],
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
                excel: {
                    fileName: "Daftar SIP Pegawai.xlsx",
                    allPages: true,
                },

                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:F1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Daftar Surat Perintah Kerja (SPK)",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                pageable: true,
                selectable: "row",
                scrollable: false,
                columns: $scope.columnGrid
            };

            $scope.exportSPK = function () {
                console.log($scope.dataSourceExportSPK);
                console.log($scope.dataGrid.data());

                let dataGridSPK = $scope.dataGrid.data();
                let dataTempSourceExportSPK = [];

                // console.log(dataGridSPK.length);
                for (let i = 0; i < dataGridSPK.length; i++) {

                    for (let ii = 0; ii < dataGridSPK[i].details.length; ii++) {
                        let dataTemp2 = {
                            noPO: dataGridSPK[i].nospk,
                            noUsulan: dataGridSPK[i].nousulan,
                            supplier: dataGridSPK[i].supplier,
                            namaproduk: dataGridSPK[i].details[ii].namaproduk,
                            satuanstandar: dataGridSPK[i].details[ii].satuanstandar,
                            qtyproduk: dataGridSPK[i].details[ii].qtyproduk,
                            qtyterimalast: dataGridSPK[i].details[ii].qtyterimalast,
                            hargasatuan: dataGridSPK[i].details[ii].hargasatuan,
                            hargadiscount: dataGridSPK[i].details[ii].hargadiscount,
                            hargappn: dataGridSPK[i].details[ii].hargappn,
                            total: dataGridSPK[i].details[ii].total,
                            totalkonfirmasi: dataGridSPK[i].details[ii].totalkonfirmasi,
                            tglkebutuhan: dataGridSPK[i].details[ii].tglkebutuhan,
                            spesifikasi: dataGridSPK[i].details[ii].spesifikasi,
                            prid: dataGridSPK[i].details[ii].prid,
                            hargasatuanquo: dataGridSPK[i].details[ii].hargasatuanquo,
                            qtyprodukkonfirmasi: dataGridSPK[i].details[ii].qtyprodukkonfirmasi
                        }
                        dataTempSourceExportSPK.push(dataTemp2);
                    }

                }

                $scope.dataSourceExportSPK = new kendo.data.DataSource({
                    data: dataTempSourceExportSPK
                });

                console.log($scope.dataSourceExportSPK);

                var tempDataExport = [];
                var rows = [
                    {
                        cells: [
                            { value: "No. PO" },
                            { value: "No. Usulan" },
                            { value: "Supplier" },
                            { value: "Tanggal Kebutuhan" },
                            { value: "Kode Produk" },
                            { value: "Nama Produk" },
                            { value: "Spesifikasi" },
                            { value: "Satuan" },
                            { value: "Qty" },
                            { value: "Sudah Terima" },
                            { value: "Harga Satuan" },
                            { value: "Total" },
                        ]
                    }
                ];

                tempDataExport = $scope.dataSourceExportSPK;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].noPO },
                                { value: data[i].noUsulan },
                                { value: data[i].supplier },
                                { value: data[i].tglkebutuhan },
                                { value: data[i].prid },
                                { value: data[i].namaproduk },
                                { value: data[i].spesifikasi },
                                { value: data[i].satuanstandar },
                                { value: data[i].qtyproduk },
                                { value: data[i].qtyterimalast },
                                { value: data[i].hargasatuan },
                                { value: data[i].total },
                                
                                // { value: data[i].totalkonfirmasi },
                                
                                
                                // { value: data[i].hargasatuanquo },
                                // { value: data[i].qtyprodukkonfirmasi },
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
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "Daftar Surat Perintah Kerja (SPK)",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Daftar Surat Perintah Kerja (SPK).xlsx" });
                });
            }

            $scope.data2 = function (dataItem) {
                // console.log(dataItem);
                // $scope.dataSPKExport = new kendo.data.DataSource({
                //     data:dataItem.details,
                // });
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "tglkebutuhan",
                            "title": "Tgl Kebutuhan",
                            "width": "80px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                        },
                        {
                            "field": "prid",
                            "title": "Kode Produk",
                            "width": "40px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width": "90px",
                        },
                        {
                            "field": "spesifikasi",
                            "title": "Spesifikasi",
                            "width": "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width": "30px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width": "50px",
                        },
                        {
                            "field": "qtyterimalast",
                            "title": "Sdh Terima",
                            "width": "65px",
                        },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width": "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width": "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        }
                        //  {
                        //     "field": "qtyprodukkonfirmasi",
                        //     "title": "Qty Confirm",
                        //     "width" : "40px",
                        // },
                        // {
                        //     "field": "hargasatuanquo",
                        //     "title": "Harga Confirm",
                        //     "width" : "40px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
                        // },
                        // {
                        //     "field": "totalkonfirmasi",
                        //     "title": "Total Confirm",
                        //     "width" : "50px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                        // }
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
                return moment(tanggal).format('DD/MM/YYYY');
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
                return thn + ' thn '// + bln + ' bln'
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
            //***********************************

        }
    ]);
});
