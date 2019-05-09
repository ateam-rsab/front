define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPasienPernahDirawatCtrl', ['SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', '$mdDialog', '$window', 'CetakHelper', 'ManageSarprasPhp', 'CacheHelper', '$q',
        function (saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, DateHelper, socket, managePasien, $mdDialog, window, cetakHelper, manageSarprasPhp, cacheHelper, $q) {
            $scope.dataVOloaded = true;
            $scope.isRouteLoading=false;
            $scope.now = new Date();
            $scope.date = new Date();
            $scope.item = {};
            $scope.itema = {};
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.item = {};
            $scope.isRouteLoading = false;
            $rootScope.isOpen = true;
            $scope.cboUbahDokter = true;         
            $scope.pegawai = ModelItem.getPegawai();
            loadCombo()
            loadData()

            $scope.SearchEnter = function () {
                loadData()
            }

            function loadCombo() {
                 //Tanggal Default                
                var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
                $scope.item.tglawal = tanggals+" 00:00";
                $scope.item.tglakhir= tanggals+" 23:59";
                var chacePeriode = cacheHelper.get('DaftarAntrianDokterRanapCtrl');
                if (chacePeriode != undefined) {
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]);                
                } else {
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;                
                }
                manageSarprasPhp.getDataTableTransaksi("dokter/get-data-combo-dokter", false).then(function (data) {
                    $scope.listRuangan = data.data.ruanganRanap;
                });
            }

            function loadData() {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');

                var nocm = ""
                if ($scope.itema.noCm != undefined) {
                    var nocm = "&norm=" + $scope.itema.noCm
                }
                var nama = ""
                if ($scope.itema.namaPasien != undefined) {
                    var nama = "&nama=" + $scope.itema.namaPasien
                }
                var noRegistrasi = ""
                if ($scope.itema.noRegistrasi != undefined) {
                    var noRegistrasi = "&noreg=" + $scope.itema.noRegistrasi
                }               
                var ruangId = ""
                if ($scope.itema.ruangan != undefined) {
                    var ruangId = "&ruangId=" + $scope.itema.ruangan.id
                }

                $q.all([
                    manageSarprasPhp.getDataTableTransaksi("laporan/get-daftar-pasien-pernah-dirawat?" 
                        +'tglAwal=' + tglAwal 
                        + '&tglAkhir=' + tglAkhir
                        + "&noRm=" + nocm +
                        "&noReg=" + noRegistrasi +
                        "&namaPasien=" + nama
                        + ruangId),
                ]).then(function (data) {
                    $scope.isRouteLoading = false;
                    var datas = data[0].data.data;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i + 1
                        // var tanggal = $scope.now;
                        // var tanggalLahir = new Date(datas[i].tgllahir);
                        // var umurzz = DateHelper.CountAge(tanggalLahir, tanggal);
                        // datas[i].umurzz = umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'
                    }
                    $scope.GridPasien = new kendo.data.DataSource({
                        data: datas,
                        group: $scope.group,
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
                    var chacePeriode = tglAwal + "~" + tglAkhir;
                    cacheHelper.set('DaftarAntrianDokterRanapCtrl', chacePeriode);
                });
            }

            $scope.klikGrid = function (item) {
                loadCombo();              
            }

            $scope.group = {
                field: "namaruangan",
                aggregates: [                    
                    {
                        field: "namaruangan",
                        aggregate: "count"
                    }]
            };

            $scope.aggregate = [              
                {
                    field: "namaruangan",
                    aggregate: "count"
                }
            ]

            $scope.ColumnPasien  = {
                toolbar: [
                    "excel",                    
                ],
                excel: { fileName: "LaporanPasienPernahDirawat.xlsx", allPages: true, },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 3;
                    sheet.mergedCells = ["A1:J1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Laporan Pasien Pernah Dirawat",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                    }];
                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                sortable: true,
                pageable: true,
                selectable: "row",
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "45px",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                        "width": "80px"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "80px"
                    },
                    {
                        "field": "nocm",
                        "title": "No. Rekam Medis",
                        "width": "80px"
                    },
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": "160px"
                    },                   
                    {
                        "field": "kelompokpasien",
                        "title": "Tipe Pembayaran",
                        "width": "80px"
                    },
                    {
                        "field": "namakelas",
                        "title": "Kelas",
                        "width": "80px"
                    },
                    {
                        "field": "tglmasuk",
                        "title": "Tgl Masuk Ruangan",
                        "template": "#= new moment(new Date(tglmasuk)).format('DD-MM-YYYY HH:mm') #",
                        "width": "110px"
                    },
                    {
                        "field": "tglkeluar",
                        "title": "Tgl Keluar Ruangan",
                        "template": "#= new moment(new Date(tglkeluar)).format('DD-MM-YYYY HH:mm') #",
                        "width": "110px"
                    },                   
                    {
                        hidden: true,
                        field: "namaruangan",
                        title: "Nama Ruangan",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
                    }
                ]
            } 

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }              

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
          

            $scope.findData = function () {
                loadData()
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