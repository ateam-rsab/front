define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanTindakanPerKSMCtrl', ['$q', '$scope', 'CacheHelper', 'DateHelper', 'ManagePhp', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $scope, cacheHelper, dateHelper, ManagePhp, modelItemAkuntansi, $mdDialog) {

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.isRouteLoading = false;
            $scope.dataPasienSelected = {};
            $scope.item.jmlRows = 100
            $scope.datePickerOptions = {
                start: "year",

                // defines when the calendar should return date
                depth: "year",

                // display month and year in the input
                format: "MMMM yyyy",
                // format: 'MM-yyyy',
                change: onChangeDate
                // min: twoDaysAfter($scope.now)
            }
            var tglLiburna = "";
            var tglAwals = moment($scope.item.periodeAwal).format('DD-MM-YYYY');
            var tglAkhirs = moment($scope.item.periodeAkhir).format('DD-MM-YYYY');
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
                $scope.ListKondisi = [
                    {
                        id: 1,
                        kondisi: "Jam Kerja"
                    }, {
                        id: 2,
                        kondisi: "Luar Jam Kerja"
                    }
                ]

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
                    "pdf",
                ],
                excel: {
                    fileName: "LaporanKSM.xlsx",
                    allPages: true,
                },
                pdf: {

                    fileName: "LaporanKSM.pdf",
                    allPages: true,
                    avoidLinks: true,
                    paperSize: "A4",
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    landscape: true,
                    repeatHeaders: true,
                    template: $("#page-template").html(),
                    scale: 0.8
                },
                excelExport: function (e) {
                    
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:E1"];
                    sheet.name = "KSM";

                    var myHeaders = [
 
                        {
                            value: "LAPORAN TINDAKAN PER-KSM " +dateHelper.formatDate($scope.item.periodeAwal, 'DD-MM-YY') +' sampai ' +
                                dateHelper.formatDate($scope.item.periodeAkhir, 'DD-MM-YY'),
                            fontSize: 15,
                            textAlign: "center",
                            background: "#c1d2d2",
                            // color:"#ffffff"
                        }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header",height: 50});
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
                        "field": "namadepartemen",
                        "title": "Departemen",
                        "width": "90px",
                        "template": "<span class='style-left'>#: namadepartemen #</span>"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "90px",
                        "template": "<span class='style-left'>#: namaruangan #</span>"
                    },
                    // {
                    //     "field": "tglpelayanan",
                    //     "title": "Tanggal",
                    //     "width": "20%",
                    //     "template": "<span class='style-left'>{{formatTanggal('#: tglpelayanan #')}}</span>"
                    // },
                    {
                        "field": "namaproduk",
                        "title": "Nama Pelayanan",
                        "width": "180px"
                    },
                    {
                        "field": "jumlah",
                        "title": "Volume",
                        "width": "40px",
                        "template": "<span class='style-center'>#: jumlah #</span>"
                    },


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
                // loadData()
                $scope.winDialog.center().open();
            }

            function loadData() {
                // var confirm = $mdDialog.confirm()
                // .title('Peringatan')
                // .textContent('Pastikan PELAYANAN sudah di Input semua ! Lanjut Simpan? ')
                // .ariaLabel('Lucky day')
                // .cancel('Tidak')
                // .ok('Ya')
                //  $mdDialog.show(confirm).then(function () 
                // })


                // var tglKecuali =prompt("Masukan Tanggal Libur", "");

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

                var layanan = ""
                if ($scope.item.layanan != undefined) {
                    layanan = "&namaProduk=" + $scope.item.layanan
                }

                var jmlRows = "";
                if ($scope.item.jmlRows != undefined) {
                    jmlRows = $scope.item.jmlRows
                }

                var kondisi = ""
                if ($scope.item.kondisi != undefined) {
                    kondisi = "&kondisi=" + $scope.item.kondisi.id
                }
                // if (tglKecuali != null) {
                //     tglKecuali = tglKecuali;
                // } else
                //     tglKecuali = ''
                $scope.isRouteLoading = true;
                ManagePhp.getData("laporan/get-lap-ksm?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    layanan + ins + rg + kondisi +
                    '&jmlRows=' + jmlRows +
                    '&kecualiTanggal=' + tglLiburna)
                    .then(function (e) {
                        var result = [];
                        result = e.data.data
                        $scope.isRouteLoading = false;
                        if (result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                result[i].no = i + 1
                            }
                            $scope.dataSourceGrid = {
                                data: result,
                                schema: {
                                    model: {
                                        fields: {
                                            namaproduk: { type: "string" },
                                            jumlah: { type: "number" },
                                            namaruangan: { type: "string" },
                                            namadepartemen: { type: "string" },
                                            // totalPenerimaan:{type:"number"},
                                        }
                                    }
                                },
                                selectable: true,
                                refresh: true,
                                pageSize: 10,
                                selectable: true,
                                refresh: true,
                                total: result.length,
                                serverPaging: false,
                                groupable: true,
                                allowCopy: true,
                                // group:[
                                //     {
                                //         field:"kelompokpasien", aggregates:[
                                //             {field:'subtotal', aggregate:'sum'},
                                //             {field:"jumlah", aggregate:'sum'},
                                //             {field:'harga', aggregate:'sum'},
                                //         ]                            
                                //     },                        
                                // ],
                                // aggregate:[
                                //     {field:'harga', aggregate:'sum'},
                                //     {field:'subtotal', aggregate:'sum'},
                                //     {field:'jumlah',  aggregate:'sum'},
                                // ]
                            };
                        }
                        tglLiburna = ''
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
                // $scope.item.periodeAwal = new Date();
                // $scope.item.periodeAkhir = new Date();
                // loadData()
            }
            $scope.arrayTglLibur = [{
                id: 1,
                tgl: "",
                isDuplicate: false
            }]
            function onChangeDate(e) {
                if ($scope.arrayTglLibur.length > 1) {
                    var lastModel = $scope.arrayTglLibur.length - 1;
                    for (var i = 0; i < $scope.arrayTglLibur.length; i++) {
                        // if (i < lastModel && kendo.toString($scope.arrayTglLibur[i].tgl, "MM/dd/yyyy") === kendo.toString(this.value(), "MM/dd/yyyy")) {
                        //     if ($scope.item.statusPegawai.id != 24 && $scope.item.statusPegawai.id != 25) {
                        //         toastr.error("Tanggal " + kendo.toString(this.value(), "dd/MM/yyyy") + " sudah diajukan", "Peringatan");
                        //         $scope.arrayTglLibur[lastModel].tgl = "";
                        //         $(this.element).closest('span').addClass("duplicateDate");
                        //         $(this.element).parent('span').addClass("duplicateDate");
                        //         this.value("");
                        //     }
                        // } else {
                        //     $(this.element).closest('span').removeClass("duplicateDate");
                        //     $(this.element).parent('span').removeClass("duplicateDate");
                        // }
                    }
                }
            }
            $scope.addNewTgl = function () {
                var lastDate = $scope.arrayTglLibur.length - 1;
                if ($scope.arrayTglLibur[lastDate].tgl instanceof Date) {
                    if ($scope.arrayTglLibur[lastDate].hari == undefined) {
                        toastr.error('Tanggal belum di isi')
                        return
                    }
                    if ($scope.arrayTglLibur[lastDate].hari == "") {
                        toastr.error('Tanggal belum di isi')
                        return
                    }
                    var newItemNo = $scope.arrayTglLibur.length + 1;
                    $scope.arrayTglLibur.push({
                        id: newItemNo,
                        tgl: "MM/yyyy",
                        hari: ''
                    })
                } else {
                    messageContainer.error('Bulan/Tahun belum di pilih')
                }

            }
            $scope.showAddTgl = function (current) {
                return current.id === $scope.arrayTglLibur[$scope.arrayTglLibur.length - 1].id;
            }
            $scope.removeNewTgl = function (id) {
                if (id == 1) return;
                for (var i = 0; i < $scope.arrayTglLibur.length; i++) {
                    if (id == $scope.arrayTglLibur[i].id) {
                        $scope.arrayTglLibur.splice(i, 1);
                        break;
                    }
                }
            }
            $scope.lanjutCari = function () {
                var data = []
                if ($scope.arrayTglLibur.length > 0) {
                    if ($scope.arrayTglLibur[0].tgl instanceof Date) {
                        for (var i = $scope.arrayTglLibur.length - 1; i >= 0; i--) {
                            var arrDay = $scope.arrayTglLibur[i].hari.split(',')
                            for (let index = 0; index < arrDay.length; index++) {
                                data.push(moment($scope.arrayTglLibur[i].tgl).format('YYYY-MM-') + arrDay[index]);
                            }
                        }
                    }

                }

                if (data.length > 0) {
                    var a = ""
                    var b = ""
                    for (var i = data.length - 1; i >= 0; i--) {
                        var c = data[i]
                        b = "," + c
                        a = a + b
                    }
                    tglLiburna = a.slice(1, a.length)
                }
                $scope.winDialog.close();
                loadData();
                // $scope.arrayTglLibur = [{
                //     id: 1,
                //     tgl: "",
                //     isDuplicate: false
                // }]

            }
            $scope.batalBatal = function () {
                // $scope.arrayTglLibur = [{
                //     id: 1,
                //     tgl: "",
                //     isDuplicate: false
                // }]
                tglLiburna = ''
                loadData();
            }

        }
    ]);
});
