define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPemeriksaanLuarLabCtrl', ['$q', '$scope', 'CacheHelper', 'DateHelper', 'ManagePhp', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $scope, cacheHelper, dateHelper, ManagePhp, modelItemAkuntansi, $mdDialog) {

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.isRouteLoading = false;
            $scope.dataPasienSelected = {};
            $scope.item.jmlRows = 100

            loadCombo();

            function loadCombo() {
                var chacePeriode = cacheHelper.get('cacheLaporanKSM');
                if (chacePeriode != undefined) {
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]);
                } else {
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;
                }
                ManagePhp.getData("operator/get-data-combo-operator", false).then(function (data) {
                    $scope.listDepartemen = data.data.departemen;
                    $scope.listKelompokPasien = data.data.kelompokpasien;
                    $scope.listDokter = data.data.dokter;
                });
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function (data) {
                    $scope.listProduk = data;
                });


            }
            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }


            $scope.columnGrid = {
                toolbar: [
                    "excel",
                ],
                excel: {
                    fileName: "PemeriksaanKeluar.xlsx",
                    allPages: true,
                },
               
                excelExport: function (e) {

                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:K1"];
                    sheet.name = "Daftar";

                    var myHeaders = [

                        {
                            value: "Daftar Pemeriksaan Keluar",
                            fontSize: 15,
                            textAlign: "center",
                            background: "#c1d2d2",
                            // color:"#ffffff"
                        }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 50 });
                },
                selectable: 'row',
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "20px",
                    },
                    {
                        "field": "tglorder",
                        "title": "Tgl Order",
                        "width": "50px",
                    },
                    {
                        "field": "noorder",
                        "title": "No Order",
                        "width": "60px",
                    },
                    {
                        "field": "noregistrasi",
                        "title": "No Registasi",
                        "width": "100px"
                    },
                    {
                        "field": "nocm",
                        "title": "No RM",
                        "width": "70px"
                    },
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": "120px"
                    },
                    {
                        "field": "dokter",
                        "title": "Dokter",
                        "width": "100px"
                    },
                    {
                        "field": "namaruanganasal",
                        "title": "Ruangan Asal",
                        "width": "100px",
                    },
                    {
                        "field": "namaruangantujuan",
                        "title": "Ruangan Tujuan",
                        "width": "100px",
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Jenis Pasien",
                        "width": "100px",
                    },
                    {
                        "field": "statusorder",
                        "title": "Status",
                        "width": "70px",
                    }

                ],
                sortable: {
                    mode: "single",
                    allowUnsort: false,
                }
                ,
                pageable: {
                    messages: {
                        display: "Menampilkan {0} - {1} data dari {2} data"
                    },
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
            };


            $scope.SearchData = function () {
                loadData()
            }

            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            field: "namaproduk",
                            title: "Deskripsi",
                            width: "300px"
                        },
                        {
                            field: "qtyproduk",
                            title: "Qty",
                            width: "100px"
                        }]
                };
            };
            function loadData() {
                var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

                var ins = ""
                if ($scope.item.instalasi != undefined) {
                    ins = "&deptId=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan != undefined) {
                    rg = "&ruangId=" + $scope.item.ruangan.id
                }

                var jmlRows = "";
                if ($scope.item.jmlRows != undefined) {
                    jmlRows = $scope.item.jmlRows
                }

                var noRegistrasi = ""
                if ($scope.item.noRegistrasi != undefined) {
                    noRegistrasi = "&noregistrasi=" + $scope.item.noRegistrasi
                }
                var namaPasien = ""
                if ($scope.item.namaPasien != undefined) {
                    namaPasien = "&namapasien=" + $scope.item.namaPasien
                }
                var nocm = ""
                if ($scope.item.noCm != undefined) {
                    nocm = "&nocm=" + $scope.item.noCm
                }
                var noOrder = ""
                if ($scope.item.noOrder != undefined) {
                    noOrder = "&noOrder=" + $scope.item.noOrder
                }
                var kelompok = ""
                if ($scope.item.kelompok != undefined) {
                    kelompok = "&kelPasienId=" + $scope.item.kelompok.id
                }
                $scope.isRouteLoading = true;
                ManagePhp.getData("lab-radiologi/get-pemeriksaan-keluar?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    noRegistrasi + nocm + noOrder +
                    namaPasien + ins + rg + kelompok +
                    '&jmlRows=' + jmlRows
                ).then(function (e) {
                    var result = [];
                    result = e.data.data
                    $scope.isRouteLoading = false;
                    if (result.length > 0) {
                    
                        for (var i = result.length - 1; i >= 0; i--) {
                            if (result[i].details.length == 0) {
                                result.splice([i], 1)
                            }
                            // result[i].no = i + 1
                        }
                        for (let index = 0; index < result.length; index++) {
                            result[index].no = index + 1
                            
                        }
                        console.log(result)
                        $scope.dataSourceGrid = {
                            data: result,
                            selectable: true,
                            refresh: true,
                            pageSize: 10,
                            selectable: true,
                            refresh: true,
                            total: result.length,
                            serverPaging: false,
                            groupable: true,
                            allowCopy: true,
  
                        };
                    }
                    var chacePeriode = tglAwal + "~" + tglAkhir;
                    cacheHelper.set('cacheLaporanKSM', chacePeriode);
                });
            };

            $scope.klikGrid = function (dataSelected) {
                if (dataSelected != undefined) {
                }
            }
            $scope.Clear = function () {
                delete $scope.item.instalasi
                delete $scope.item.ruangan
                delete $scope.item.layanan
            }

            $scope.batalBatal = function () {
                loadData();
            }

        }
    ]);
});
