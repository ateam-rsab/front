define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanPenerimaanKasirCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ManageSdm', 'ManageLogistikPhp', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, DateHelper, $http, $state, ManageSdm, manageLogistikPhp, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.item.tglawal = new Date();
            $scope.item.tglakhir = new Date();


            //sdm service hanya sementara, nanti harus diganti pake service kasir !!
            //    ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=jenisPegawai&values=1", true).then(function(dat){
            //    $scope.listPegawai = dat.data;
            // });

            // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,reportDisplay").then(function(dat) {
            //    $scope.listRuangan = dat.data;
            // });

            // // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
            // // $scope.listPasien = dat.data;
            // // });

            //    ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=jenisPegawai&values=10", true).then(function(dat){
            //        $scope.listPegawaiKasir = dat.data;
            //    });

            // manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
            //        $scope.listDepartemen = data.data.departemen;
            //        $scope.listKelompokPasien = data.data.kelompokpasien;
            //    })

            //  ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
            //     $scope.listKelompokPasien = dat.data;
            // });
            manageLogistikPhp.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function (dat) {
                $scope.listPegawai = dat.data.dokter;
                $scope.listDepartemen = dat.data.departemen;
                $scope.listPegawaiKasir = dat.data.kasir;
                //$scope.dataLogin = dat.data.datalogin[0];
                $scope.listKelompokPasien = dat.data.kelompokpasien;
                $scope.listJenisLap = [{ id: 1, names: "Laporan Penerimaan Kasir Harian" },
                { id: 2, names: "Laporan Penerimaan Kasir Perusahaan" }];
            });
            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.departement.ruangan
            }

            $scope.CariLapPenerimaanKasir = function () {
                if ($scope.item.jenisLap == undefined) {
                    alert("Pilih dulu Jenis Laporan")
                    return;
                }
                LoadData()

                if ($scope.item.jenisLap.names == 'Laporan Penerimaan Kasir Harian') {
                    $scope.laporanPenerimaanHarian = false;
                    $scope.laporanPenerimaanPerusahaan = false;
                } else {
                    $scope.laporanPenerimaanPerusahaan = true;
                    $scope.laporanPenerimaanHarian = true;
                }

            }


            // $scope.CariLapPenerimaanKasirPerusahaan = function () {
            //     LoadData()

            // }

            function LoadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
                debugger;

                var tempKasirId = "";
                if ($scope.item.namaKasir != undefined) {
                    tempKasirId = "&idKasir=" + $scope.item.namaKasir.id;
                }
                var tempRuanganId = "";
                if ($scope.item.ruangan != undefined) {
                    tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
                }
                var tempDokterId = "";
                if ($scope.item.namaPegawai != undefined) {
                    tempDokterId = "&idDokter=" + $scope.item.namaPegawai.id;
                }
                var tempKelPasienId = "";
                if ($scope.item.kelompokPasien != undefined) {
                    tempKelPasienId = "&kelompokPasien=" + $scope.item.kelompokPasien.id;
                }
                var tempDepartemen = "";
                if ($scope.item.departement != undefined) {
                    tempDepartemen = "&idDept=" + $scope.item.departement.id;
                }

                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir
                }
                cacheHelper.set('LaporanPenerimaanKasirCtrl', chacePeriode);

                $scope.click = function () {
                    //$scope.item.jenislaporan;

                }
                if ($scope.item.jenisLap.id == 1) {
                    $scope.item.total = 0;
                    $scope.laporanPenerimaanPerusahaan == false
                    // if ($scope.laporanPenerimaanHarian == true) {
                    modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-penerimaan-kasir-harian?"
                        + "tglAwal=" + tglAwal
                        + "&tglAkhir=" + tglAkhir
                        + tempKasirId
                        + tempRuanganId
                        + tempDokterId
                        + tempDepartemen
                        + tempKelPasienId).then(function (data) {
                            var doubleTotal = 0;
                            for (var i = 0; i < data.data.length; i++) {
                                doubleTotal = doubleTotal + parseFloat(data.data[i].totaldibayar)

                            }
                            
                         
                            $scope.item.total = doubleTotal;
                            $scope.dataPenerimaanKasir = new kendo.data.DataSource({
                                data: data.data,
                                pageSize: 10,
                                total: data.length,
                                serverPaging: false,
                                schema: {
                                    model: {
                                        fields: {
                                        }
                                    }
                                }
                            });
                        })
                }
                // if ($scope.laporanPenerimaanPerusahaan == true)

                if ($scope.item.jenisLap.id == 2) {
                    $scope.item.total = 0;
                    $scope.laporanPenerimaanPerusahaan == true
                    $scope.laporanPenerimaanHarian == false
                    modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-penerimaan-kasir-perusahaan?"
                        + "tglAwal=" + tglAwal
                        + "&tglAkhir=" + tglAkhir
                        + "&idRuangan=" + tempRuanganId
                        + "&idDokter=" + tempDokterId
                        // + "&kelompokPasien=" + tempKelPasienId
                    ).then(function (data) {
                        var dbtotal = 0;
                        for (var i = 0; i < data.data.length; i++) {
                            dbtotal = dbtotal + parseFloat(data.data[i].totalppenjamin)

                        }
                       

                        $scope.item.total = dbtotal;
                        $scope.dataPenerimaanKasirPerusahaan = new kendo.data.DataSource({
                            data: data.data,
                            pageSize: 10,
                            total: data.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        });
                    })
                }
            }

            $scope.click = function (dataPasienSelected) {
                var data = dataPasienSelected;
                //debugger;
            };
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.optPenerimaanKasir = {
                toolbar: [
                    { text: "export", name: "Export detail", template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' }
                ]
            }

            $scope.optPenerimaanKasirPerusahaan = {
                toolbar: [
                    { text: "export", name: "Export detail", template: '<button ng-click="exportExcelPerusahaan()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' }
                ]
            }

            $scope.exportExcel = function () {
                var rows = [
                    {
                        cells: [
                            { value: "No. Registrasi" },
                            { value: "Tanggal Bayar" },
                            { value: "No. RM" },
                            { value: "Nama" },
                            { value: "Ruangan" },
                            { value: "Kelompok Pasien" },
                            { value: "Dokter" },
                            { value: "Kasir" },
                            { value: "Total Biaya" },
                            { value: "Hutang Penjamin" },
                            { value: "Jumlah Bayar" },
                            { value: "Tunai" },
                            { value: "Card/CC" }
                        ]
                    }
                ];

                let tempDataExport = $scope.dataPenerimaanKasir;
                console.log(tempDataExport);
                for (let i = 0; i < tempDataExport._data.length; i++) {
                    rows.push({
                        cells: [
                            { value: tempDataExport._data[i].noregistrasi },
                            { value: tempDataExport._data[i].tglsbm },
                            { value: tempDataExport._data[i].nocm },
                            { value: tempDataExport._data[i].namapasien },
                            { value: tempDataExport._data[i].namaruangan },
                            { value: tempDataExport._data[i].kelompokpasien },
                            { value: tempDataExport._data[i].namalengkap },
                            { value: tempDataExport._data[i].kasir },
                            { value: tempDataExport._data[i].totalharusdibayar },
                            { value: tempDataExport._data[i].hutangpenjamin },
                            { value: tempDataExport._data[i].totaldibayar },
                            { value: tempDataExport._data[i].tunai },
                            { value: tempDataExport._data[i].nontunai }
                        ]
                    })
                }

                var workbook = new kendo.ooxml.Workbook({
                    sheets: [
                        {
                            freezePane: { rowSplit: 1 },
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
                                { autoWidth: true }
                            ],
                            // Title of the sheet
                            title: "Laporan Penerimaan Kasir",
                            // Rows of the sheet
                            rows: rows
                        }
                    ]
                });
                //save the file as Excel file with extension xlsx
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "lap-penerimaan-kasir.xlsx" });
            }

            $scope.exportExcelPerusahaan = function () {
                var rows = [
                    {
                        cells: [
                            { value: "No. Registrasi" },
                            { value: "Tanggal Bayar" },
                            { value: "No. RM" },
                            { value: "Nama" },
                            { value: "Ruangan" },
                            { value: "Kelompok Pasien" },
                            { value: "Dokter" },
                            { value: "Kasir" },
                            { value: "Total Biaya" },
                            { value: "Piutang Penjamin" },
                            { value: "Di Tanggung Pasien" }
                        ]
                    }
                ];

                let tempDataExport = $scope.dataPenerimaanKasirPerusahaan;
                console.log(tempDataExport);
                for (let i = 0; i < tempDataExport._data.length; i++) {
                    rows.push({
                        cells: [
                            { value: tempDataExport._data[i].noregistrasi },
                            { value: tempDataExport._data[i].tglsbm },
                            { value: tempDataExport._data[i].nocm },
                            { value: tempDataExport._data[i].namapasien },
                            { value: tempDataExport._data[i].namaruangan },
                            { value: tempDataExport._data[i].kelompokpasien },
                            { value: tempDataExport._data[i].namalengkap },
                            { value: tempDataExport._data[i].totalharusdibayar },
                            { value: tempDataExport._data[i].totalppenjamin },
                            { value: tempDataExport._data[i].sisabayar }
                        ]
                    })
                }

                var workbook = new kendo.ooxml.Workbook({
                    sheets: [
                        {
                            freezePane: { rowSplit: 1 },
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
                                { autoWidth: true }
                            ],
                            // Title of the sheet
                            title: "Laporan Penerimaan Kasir Perusahaan",
                            // Rows of the sheet
                            rows: rows
                        }
                    ]
                });
                //save the file as Excel file with extension xlsx
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "lap-penerimaan-kasir-perusahaan.xlsx" });
            }

            $scope.columnPenerimaanKasir = [
                {
                    "field": "noregistrasi",
                    "title": "No. Registrasi",
                    "width": "120px",
                    "template": "<span class='style-center'>#: noregistrasi #</span>"
                },
                {
                    "field": "tglsbm",
                    "title": "Tgl Bayar",
                    "width": "180px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglsbm #')}}</span>"
                },
                {
                    "field": "nocm",
                    "title": "No. RM",
                    "width": "120px",
                    "template": "<span class='style-center'>#: nocm #</span>"
                },
                {
                    "field": "namapasien",
                    "title": "Nama",
                    "width": "180px"
                },

                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "180px"
                },
                {
                    "field": "kelompokpasien",
                    "title": "Kelompok Pasien",
                    "width": "120px"
                },
                {
                    "field": "namalengkap",
                    "title": "Dokter",
                    "width": "180px"
                },
                {
                    "field": "kasir",
                    "title": "Kasir",
                    "width": "150px",
                },
                {
                    "field": "totalharusdibayar",
                    "title": "Total Biaya",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalharusdibayar #','')}}</span>",
                },
                {
                    "field": "hutangpenjamin",
                    "title": "Hutang Penjamin",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hutangpenjamin #','')}}</span>",
                },
                {
                    "field": "totaldibayar",
                    "title": "Jml Bayar",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totaldibayar #','')}}</span>",
                },
                {
                    "field": "tunai",
                    "title": "Tunai",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: tunai #','')}}</span>",
                },
                {
                    "field": "nontunai",
                    "title": "Card/CC",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: nontunai #','')}}</span>",
                }


            ];

            $scope.columnPenerimaanKasirPerusahaan = [
                {
                    "field": "noregistrasi",
                    "title": "No. Registrasi",
                    "width": "100px",
                    "template": "<span class='style-center'>#: noregistrasi #</span>"
                },
                {
                    "field": "tglregistrasi",
                    "title": "Tgl Registrasi",
                    "width": "120px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                },
                {
                    "field": "nocm",
                    "title": "No. RM",
                    "width": "80px",
                    "template": "<span class='style-center'>#: nocm #</span>"
                },
                {
                    "field": "namapasien",
                    "title": "Nama",
                    "width": "180px"
                },

                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "120px"
                },
                {
                    "field": "kelompokpasien",
                    "title": "Kelompok Pasien",
                    "width": "120px"
                },
                {
                    "field": "namalengkap",
                    "title": "Dokter",
                    "width": "180px"
                },
                {
                    "field": "totalharusdibayar",
                    "title": "Total Bayar",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalharusdibayar #','')}}</span>",
                },
                {
                    "field": "totalppenjamin",
                    "title": "Piutang Penjamin",
                    "width": "120px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalppenjamin #','')}}</span>",
                },
                // {
                //     "field": "totalsudahdibayar",
                //     "title": "Total ",
                //     "width": "120px",
                //     "template": "<span class='style-right'>{{formatRupiah('#: totaldibayar #','')}}</span>",
                // },
                {
                    "field": "sisabayar",
                    "title": "Di Tanggung Pasien",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: sisabayar #','')}}</span>",
                },

            ];
            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

            //fungsi clear kriteria search
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.CariLapPenerimaanKasir();
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
            $scope.CetakLaporanPenerimaanHarian = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var idPegawai = ''
                if ($scope.item.namaKasir != undefined) {
                    idPegawai = $scope.item.namaKasir.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-kasir=' + $scope.dataLogin.namalengkap + '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idPegawai=' + idPegawai + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&view=true', function (response) {
                });
                // client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan='+$scope.dataLogin.id+
                //     '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&idRuangan='+ruanganId+'&idDokter='+dokter+'&namaKasir='+$scope.dataLogin.namalengkap+'&view=true', function(response) {

                // });
            }

            $scope.CetakLaporanPenerimaanPerusahaan = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var idPegawai = ''
                if ($scope.item.namaKasir != undefined) {
                    idPegawai = $scope.item.namaKasir.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-kasir-perusahaan=' + $scope.dataLogin.namalengkap + '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idPegawai=' + idPegawai + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&view=true', function (response) {
                });
                // client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan='+$scope.dataLogin.id+
                //     '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&idRuangan='+ruanganId+'&idDokter='+dokter+'&namaKasir='+$scope.dataLogin.namalengkap+'&view=true', function(response) {

                // });
            }
            $scope.CetakRincianPendapatanAdminMaterai = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var idPegawai = ''
                if ($scope.item.namaKasir != undefined) {
                    idPegawai = $scope.item.namaKasir.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-pendapatan-adminmaterai=1' +//$scope.item.namaKasir.id+
                  '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&PrinteDBY=' + $scope.dataLogin.namaLengkap + '&idDokter=1'  + '&tgllibut=1'  + '&view=1', function (response) {

                  });
            }
            $scope.CetakLaporanPenerimaan = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var idPegawai = ''
                if ($scope.item.namaKasir != undefined) {
                    idPegawai = $scope.item.namaKasir.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan=' + idPegawai +
                    '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&namaKasir=' + $scope.dataLogin.namalengkap + '&view=true', function (response) {

                    });
                // client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan='+$scope.dataLogin.id+
                //     '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&idRuangan='+ruanganId+'&idDokter='+dokter+'&namaKasir='+$scope.dataLogin.namalengkap+'&view=true', function(response) {

                // });
            }

            $scope.CetakRekapPenerimaanKasir = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-rekap-penerimaan=' + $scope.item.namaKasir.id +
                    '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&namaKasir=' + $scope.dataLogin.namalengkap + '&view=true', function (response) {

                    });
            }
            $scope.CetakLaporanPenerimaanFFS = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-ffs=' + $scope.item.namaKasir.id +
                    '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&namaKasir=' + $scope.dataLogin.namalengkap + '&view=true', function (response) {

                    });
            }
            $scope.CetakLaporanPenerimaanRemun = function () {
                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                    dokter = $scope.item.namaPegawai.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-remun=' + $scope.item.namaKasir.id +
                    '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&namaKasir=' + $scope.dataLogin.namalengkap + '&view=true', function (response) {

                    });
            }

            // $scope.CetaklapPenerimaanPertransaksi=function(){
            //     var dokter = ''
            //     if ($scope.item.namaPegawai != undefined) {
            //         dokter = $scope.item.namaPegawai.id
            //     }
            //     var ruanganId = ''
            //     if ($scope.item.ruangan != undefined) {
            //         ruanganId = $scope.item.ruangan.id
            //     }

            //     var kasirId = ''
            //     if ($scope.item.namaKasir != undefined) {
            //         kasirId = $scope.item.namaKasir.id
            //     }
            //     var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
            //     var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-pertransaksi=' + kasirId+
            //         '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

            //         });
            //    }
            $scope.CetaklapPenerimaanPertransaksi=function(){
                var dokter = ''
                    if ($scope.item.namaPegawai != undefined) {
                        dokter = $scope.item.namaPegawai.id
                    }
                    var ruanganId = ''
                    if ($scope.item.ruangan != undefined) {
                        ruanganId = $scope.item.ruangan.id
                    }

                    var kasirId = ''
                    if ($scope.item.namaKasir != undefined) {
                        kasirId = $scope.item.namaKasir.id
                    }
                    var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                    var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/kasir?cetak-lapporan-detailkasir-pertransaksi=' + kasirId+
                        '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=true', function (response) {

                        });
            }

            //       $scope.tglPelayanan = $scope.item.pelayanan;
            //       $scope.dokter = $scope.item.namaPegawai;

            //       $scope.listDataFormat = [

            //            {
            //            "id":1, "format":"pdf"
            //            },
            //            {
            //             "id":2, "format":"xls"
            //            }

            // 	 ]

            //       debugger;
            //       $scope.date = new Date();
            //       var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

            //       //Tanggal Default
            //       $scope.item.tglawal = tanggals+" 00:00";
            //       $scope.item.tglakhir= tanggals+" 12:59";

            //       // Tanggal Inputan
            //       $scope.tglawal = $scope.item.tglawal;
            //       $scope.tglakhir = $scope.item.tglakhir;

            //       $scope.CetakGeneral = function() {
            //       if($scope.item.format == undefined){
            //       	alert('format file harus dipilih terlebih dahulu !!!')
            //       }
            //       if($scope.item.tglawal == $scope.tglawal || $scope.item.tglakhir == $scope.tglakhir){
            //       var tglawal = $scope.item.tglawal;
            //       var tglakhir = $scope.item.tglakhir;
            //       }else{
            //       var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            //       var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
            //       }
            //       if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //       else if($scope.item.ruangan == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //       else if($scope.item.KelompokPasien == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }else{
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //    };


            //    $scope.CetakKarcis = function() {
            //       if($scope.item.format == undefined){
            //       	alert('format file harus dipilih terlebih dahulu !!!')
            //       }
            //       if($scope.item.tglawal == $scope.tglawal || $scope.item.tglakhir == $scope.tglakhir){
            //       var tglawal = $scope.item.tglawal;
            //       var tglakhir = $scope.item.tglakhir;
            //       }else{
            //       var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            //       var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
            //       }
            // if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){	
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //       else if($scope.item.KelompokPasien == undefined){	
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //       else if($scope.item.ruangan == undefined){	
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }else{
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //    };

            //    $scope.CetakTanpaKarcis = function() {
            //    if($scope.item.format == undefined){
            //       	alert('format file harus dipilih terlebih dahulu !!!')
            //       }
            //       if($scope.item.tglawal == $scope.tglawal || $scope.item.tglakhir == $scope.tglakhir){
            //       var tglawal = $scope.item.tglawal;
            //       var tglakhir = $scope.item.tglakhir;
            //       }else{
            //       var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            //       var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
            //       }
            //    if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //    }

            //    else if($scope.item.KelompokPasien == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //    }
            //    else if ($scope.item.ruangan == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //    }else{
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //    }
            //    };

            //    $scope.CetakTanpaKarcisAll = function() {
            //    if($scope.item.format == undefined){
            //       	alert('format file harus dipilih terlebih dahulu !!!')
            //       }
            //       if($scope.item.tglawal == $scope.tglawal || $scope.item.tglakhir == $scope.tglakhir){
            //       var tglawal = $scope.item.tglawal;
            //       var tglakhir = $scope.item.tglakhir;
            //       }else{
            //       var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            //       var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
            //       }
            //    if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&idDokter=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //       else if($scope.item.KelompokPasien == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&idDokter=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }
            //       else if($scope.item.ruangan == undefined){
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //       }else{
            //       var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter=&format="+$scope.item.format.format);
            //       window.open(urlLaporan, '_blank');
            //    }
            //    };

        }

    ]);
});