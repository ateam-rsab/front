define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanLayananKlinikRajalCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.isRouteLoading=false;
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            var totalUmum = 0;
            var totalBpjs = 0;
            var totalPenjamin = 0;
            var totalPerjanjian = 0;
            LoadForm ()

            function LoadForm (){
                $scope.date = new Date();
                var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

                //Tanggal Default
                $scope.item.tglawal = tanggals + " 00:00";
                $scope.item.tglakhir = tanggals + " 23:59";

                // Tanggal Inputan
                $scope.tglawal = $scope.item.tglawal;
                $scope.tglakhir = $scope.item.tglakhir;
                $scope.pegawai = modelItemAkuntansi.getPegawai();
                $scope.tglPelayanan = $scope.item.pelayanan;
                $scope.dokter = $scope.item.namaPegawai;

                $scope.listDataFormat = [

                    {
                        "id": 1, "format": "pdf"
                    },
                    {
                        "id": 2, "format": "xls"
                    }

                ]

                modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo", true).then(function (dat) {
                    $scope.listDepartemen = dat.datadept;
                    $scope.listKelompokPasien = dat.kelompokpasien;
                });

                modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function(data) {
                    $scope.listPegawai = data;
                });
            }

            $scope.getIsiComboRuangan = function(){
                $scope.listRuangan = $scope.item.departement.ruangan
            }

            $scope.CariData = function () {
                $scope.isRouteLoading = true;
                LoadData()
            }

            function LoadData() {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
                //debugger
                var tempDepartemen = "";
                if ($scope.item.departement != undefined) {
                    tempDepartemen = "&idDept=" + $scope.item.departement.id;
                }
                var tempRuanganId = "";
                if ($scope.item.ruangan != undefined) {
                    tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
                }

                var tempKelPasienId = "";
                if ($scope.item.KelompokPasien != undefined) {
                    tempKelPasienId = "&kelompokPasien=" + $scope.item.KelompokPasien.id;
                }


                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir
                }
                cacheHelper.set('LaporanLayananKlinikRajalCtrl', chacePeriode);              
                modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-layananan-klinik?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                + tempDepartemen
                + tempRuanganId
                + tempKelPasienId).then(function (data) {
                    $scope.isRouteLoading = false;               
                    var datas = data.data;
                    for (var i = 0; i < datas.length; i++) {
                          datas[i].no = i + 1;                               
                    }
                         $scope.GridLaporan = new kendo.data.DataSource({
                            data: datas,
                            group: $scope.group,
                            // pageSize: 10,
                            total: datas.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                        daftarUmum: { type: "number" },
                                        daftarBpjs: { type: "number" },
                                        daftarPenjamin: { type: "number" },
                                        daftarPerjanjian: { type: "number" },
                                        pendapatanUmum: { type: "number" },
                                        pendapatanBpjs: { type: "number" },
                                        pendapataPenjamin: { type: "number" },
                                        pendapatanPerjanjian: { type: "number" },
                                        // diterima: { type: "number" },
                                    }
                                }
                            },
                            aggregate: [
                                { field: 'daftarUmum', aggregate: 'sum' },
                                { field: 'daftarBpjs', aggregate: 'sum' },
                                { field: 'daftarPenjamin', aggregate: 'sum' },
                                { field: 'daftarPerjanjian', aggregate: 'sum' },
                                { field: 'pendapatanUmum', aggregate: 'sum' },
                                { field: 'pendapatanBpjs', aggregate: 'sum' },
                                { field: 'pendapataPenjamin', aggregate: 'sum' },
                                { field: 'pendapatanPerjanjian', aggregate: 'sum' },
                                // { field: 'diterima', aggregate: 'sum' },

                            ]
                        });
                })
            }

            $scope.click = function (dataPasienSelected) {
                var data = dataPasienSelected;

            };
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            };
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };
                
            $scope.onClick = function (e) {
                var element = $(e.currentTarget);                
            };

            $scope.group = {
                field: "departemen",
                title: "Departemen",
                aggregates: [
                    {field: "departemen",aggregate: "sum"}, 
                    // {field: "VolNonBpjs",aggregate: "sum"},
                    // {field: "jmlVol",aggregate: "sum"}, 
                    // {field: "RupBpjs",aggregate: "sum"},
                    // {field: "RupNonBpjs",aggregate: "sum"},
                    // {field: "jmlRup",aggregate: "sum"}
                ]
            };

            $scope.aggregate = [
                {field: "departemen",aggregate: "count"}, 
                // {field: "VolBpjs",aggregate: "sum"}, 
                // {field: "VolNonBpjs",aggregate: "sum"},
                // {field: "jmlVol",aggregate: "sum"}, 
                // {field: "RupBpjs",aggregate: "sum"},
                // {field: "RupNonBpjs",aggregate: "sum"},
                // {field: "jmlRup",aggregate: "sum"}
            ]

            $scope.ColumnLaporan  = {
                toolbar: [
                    "excel",                    
                ],
                excel: { fileName: "Laporan layanan Klinik.xlsx", allPages: true, },
                excelExport: function (e) {
                    var tglAwal = moment($scope.item.tglawal).format('DD-MM-YYYY');
                    var tglAkhir = moment($scope.item.tglakhir).format('DD-MM-YYYY');           
                    var sheet = e.workbook.sheets[0]
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:L1","A2:L2"];
                    var rows = e.workbook.sheets[0].rows;
                    sheet.name = "Laporan Layanan Klinik";

                    var myHeaders = [
                        {
                            value: "Laporan Layanan Klinik",
                            fontSize: 20,
                            textAlign: "center",
                            background: "#ffffff",
                        }
                    ];

                    var myTanggal =[
                        {
                            value: "Periode " + tglAwal + " s/d " + tglAkhir,
                            fontSize: 20,
                            textAlign: "center",
                            background: "#ffffff",
                        }
                    ];
                    rows.unshift(
                        {
                            cells:  [ 
                                        { value: "Laporan Layanan Klinik", bold: true, underline: false, fontSize: 16, textAlign: "center", background: "#ffffff", height: 65, type: "header" },                                  
                                    ]
                        },
                        {
                            cells: [
                                        { value: "Periode " + tglAwal + " s/d " + tglAkhir, bold: true, underline: false, fontSize: 16, textAlign: "center", background: "#ffffff", height: 65, type: "header" }
                                   ]
                        }
                    );   
                    // sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                sortable: true,
                pageable: true,
                selectable: "row",
                columns: [  
                    { field: "no", title: "No", width: "45px" },                                    
                    {
                        "field": "namaruangan",
                        "title": "NAMA POLI",
                        "width": "180px", 
                        headerAttributes: { style: "text-align : center" },
                        groupFooterTemplate: "",
                        footerTemplate: "Total"
                    },
                    {
                        "title": "Pasien",
                        headerAttributes: { style: "text-align : center" },
                        "columns":[
                            {
                                "field": "daftarUmum",
                                "title": "UMUM",
                                headerAttributes: { style: "text-align : center" },
                                "width": "100px",
                                attributes:{style:"text-align:right;"},
                                aggregates: ["sum"], footerTemplate: "#:data.daftarUmum.sum  #",
                                footerAttributes: {style: "text-align: right;"}                              

                            },
                            {
                                "field": "daftarBpjs",
                                "title": "BPJS",
                                headerAttributes: { style: "text-align : center" },
                                "width": "100px",
                                attributes:{style:"text-align:right;"},
                                aggregates: ["sum"], 
                                footerTemplate: "#:data.daftarBpjs.sum  #",
                                footerAttributes: {style: "text-align: right;"}                                
                            },
                            {
                                "field": "daftarPenjamin",
                                "title": "Penjamin",
                                headerAttributes: { style: "text-align : center" },
                                "width": "100px",
                                attributes:{style:"text-align:right;"},
                                aggregates: ["sum"], 
                                footerTemplate: "#:data.daftarPenjamin.sum  #",
                                footerAttributes: {style: "text-align: right;"}
                            },
                            {
                                "field": "daftarPerjanjian",
                                "title": "Perjanjian",
                                headerAttributes: { style: "text-align : center" },
                                "width": "100px",
                                attributes:{style:"text-align:right;"},
                                aggregates: ["sum"], 
                                footerTemplate: "#:data.daftarPerjanjian.sum  #",
                                footerAttributes: {style: "text-align: right;"}
                            }
                        ]
                    },
                    {
                        "title": "Pendapatan",
                        headerAttributes: { style: "text-align : center" },
                        "columns":[
                            {
                                "field": "pendapatanUmum",
                                "title": "UMUM",
                                headerAttributes: { style: "text-align : center" },
                                "width": "120px",
                                template: "<span class='style-right'>Rp.  {{formatRupiah('#: pendapatanUmum #','')}}</span>",
                                footerTemplate: "#:data.pendapatanUmum.sum  #",
                            },
                            {
                                "field": "pendapatanBpjs",
                                "title": "BPJS",
                                headerAttributes: { style: "text-align : center" },
                                "width": "120px",
                                template: "<span class='style-right'>Rp. {{formatRupiah('#: pendapatanBpjs #','')}}</span>",
                                footerTemplate: "#:data.pendapatanBpjs.sum  #",
                            },
                            {
                                "field": "pendapataPenjamin",
                                "title": "Penjamin",
                                headerAttributes: { style: "text-align : center" },
                                "width": "120px",
                                template: "<span class='style-right'>Rp. {{formatRupiah('#: pendapataPenjamin #','')}}</span>",
                                footerTemplate: "#:data.pendapataPenjamin.sum  #",
                            },
                            {
                                "field": "pendapatanPerjanjian",
                                "title": "Perjanjian",
                                headerAttributes: { style: "text-align : center" },
                                "width": "120px",
                                template: "<span class='style-right'>Rp. {{formatRupiah('#: pendapatanPerjanjian #','')}}</span>",
                                footerTemplate: "#:data.pendapatanPerjanjian.sum  #",
                            }
                        ]
                    },
                    // {
                    //     "field": "",
                    //     "title": "Penerimaan Kasir",
                    //     headerAttributes: { style: "text-align : center" },
                    //     "width": "180px"
                    // }                    
                ]
            }
            
            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

            //fungsi clear kriteria search
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.CariLapPendapatanPoli();
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