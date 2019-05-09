define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanIndexPenyakitRJCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi','ModelItem', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi,ModelItem, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading=false;

       manageTataRekening.getDataTableTransaksi("laporan/get-data-combo-rm", true).then(function (dat) {
                $scope.listJenisDiagnosa = dat.data.jenisdiagnosa;
           
            });
            $scope.CariData = function () {
                LoadData()
            }
            function LoadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;

                var idDiagnosaAwal = "";
                if ($scope.item.diagnosa1 != undefined) {
                    idDiagnosaAwal = "&idDiagnosaAwal=" + $scope.item.diagnosa1.kdDiagnosa;
                }
                  var idDiagnosaAkhir = "";
                if ($scope.item.diagnosa2 != undefined) {
                    idDiagnosaAkhir = "&idDiagnosaAkhir=" + $scope.item.diagnosa2.kdDiagnosa;
                }
              
               var idJenisDiagnosa = "";
                if ($scope.item.jenisdiagnosa != undefined) {
                    idJenisDiagnosa = "&idJenisDiagnosa=" + $scope.item.jenisdiagnosa.id;
                }

                modelItemAkuntansi.getDataTableTransaksi("laporan/get-index-rj?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + idDiagnosaAwal
                    + idDiagnosaAkhir
                    +idJenisDiagnosa
                  
                    ).then(function (data) {
                        // for (var i = 0; i < data.data.length; i++) {
                        //     data.data[i].no = i + 1
                        // }
                        for (var i = 0; i < data.data.length; i++) {
                        data.data[i].no = i+1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(data.data[i].tglLahir);
                        var umurzz = DateHelper.CountAge(tanggalLahir, tanggal);
                        data.data[i].umurzz =umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    } $scope.isRouteLoading=false;
                        $scope.sourceLaporan = new kendo.data.DataSource({

                            data: data.data,
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

                        $scope.dataExcel = data.data;
                    })
                }

                $scope.click = function (dataPasienSelected) {
                    var data = dataPasienSelected;

                };
                $scope.formatTanggal = function (tanggal) {
                    return moment(tanggal).format('DD-MMM-YYYY HH:mm');
                }
                $scope.formatRupiah = function (value, currency) {
                    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                }

                $scope.selectedData = [];
                $scope.onClick = function (e) {
                    var element = $(e.currentTarget);

                    var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#kGrid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                // $scope.selectedData[dataItem.noRec] = checked;
                if (checked) {
                    var result = $.grep($scope.selectedData, function (e) {
                        return e.noregistrasi == dataItem.noregistrasi;
                    });
                    if (result.length == 0) {
                        $scope.selectedData.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                            $scope.selectedData.push(dataItem);
                        }
                        row.addClass("k-state-selected");
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                            row.removeClass("k-state-selected");
                        }
                    }

            // $scope.group = {
            //     field: "pendudukdki",
            //     aggregates: [{
            //         field: "pendudukdki",
            //         aggregate: "count"
            //     }, {
            //         field: "pendudukdki",
            //         aggregate: "count"
            //     }]
            // };
            // $scope.aggregate = [{
            //     field: "pendudukdki",
            //     aggregate: "count"
            // }, {
            //     field: "pendudukdki",
            //     aggregate: "count"
            // }]
            // var record = 0;
            $("#kGrid").kendoGrid({
                toolbar: ["excel"],
                    // , "pdf"],

                    excel: {
                        fileName: "IndexPenyakitRawatJalan.xlsx",
                        allPages: true,

                    },
                // pdf: {
                //     fileName: "LaporanPasienMasuk.pdf",
                //     allPages: true,
                // },

                dataSource: $scope.dataExcel,
                sortable: true,
                // reorderable: true,
                // filterable: true,
                pageable: true,
                // groupable: true,
                // columnMenu: true,
                // resizable: true,
                excelExport: function(e) {
                    var rows = e.workbook.sheets[0].rows;
                    rows.unshift({
                        cells: [ { value: "Index Penyakit RJ", background: "#fffff" } ]
                    });
                },
                columns: [
               {
                  field: "no", 
                  title: "No. Urut",
                  Template: "<span class='style-center'>#: no #</span>",
                  width:"70px"
                 },
                 {
                    field: "noregistrasi",
                    title: "No Registrasi",
                    width: "120px",
                    template: "<span class='style-center'>#: noregistrasi #</span>",
                    headerAttributes: { style: "text-align : center" },
                    rows: [
                    {
                        cells: [
                        {
                            value: "Border",
                            borderTop: { color: "#ff0000", size: 3 }
                        }]
                    }
                    ]

                },
                {
                    field: "nocm",
                    title: "No RM",
                    width: "90px",
                    template: "<span class='style-center'>#: nocm #</span>",
                    headerAttributes: { style: "text-align : center" },
                    rows: [
                    {
                        cells: [
                        {
                            value: "Border",
                            borderTop: { color: "#ff0000", size: 3 }
                        }]
                    }
                    ]

                },
                {
                    title: "UMUR",
                    headerAttributes: { style: "text-align : center" },
                    columns: [
                    {
                        field: "umur28hari",
                        title: "0-28 Hr",
                        width: "100px",
                        headerAttributes: { style: "text-align : center" }
                    },
                    {
                        field: "umur11bln",
                        title: "1-11 Bln",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },  
                    },
                    {
                        field: "umur4thn",
                        title: "1-4 Thn",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },  
                    },
                    {
                        field: "umur14thn",
                        title: "5-14 Thn",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },  
                    },
                    {
                        field: "umur24thn",
                        title: "15-24 Thn",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },  
                    },
                    {
                        field: "umur44thn",
                        title: "25-44 Thn",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },  
                    },
                    {
                        field: "umur64thn",
                        title: "45-64 Thn",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },  
                    },
                    {
                        field: "umur65thn",
                        title: "> 65 Thn",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },  
                    }
                    ]
                },
                {
                    field: "kddiagnosa  ",
                    title: "ICD",
                    width: "150px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "umurzz",
                    title: "Umur",
                    width: "130px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "jk",
                    title: "Sex",
                    width: "80px",
                    headerAttributes: { style: "text-align : center" },
                    // jumlah kunjungan

                },
                {
                    field: "kodepos",
                    title: "Kode Pos",
                    width: "100px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "kelompokpasien",
                    title: "Tipe",
                    width: "100px",
                    headerAttributes: { style: "text-align : center" },
                },
                 {
                    field: "namarekanan",
                    title: "Penanggung",
                    width: "100px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "asalrujukan",
                    title: "Asal Rujukan",
                    width: "100px",
                    headerAttributes: { style: "text-align : center" },
                },

                {
                    field: "tglregistrasi",
                    title: "Tgl Masuk",
                    width: "100px",
                    headerAttributes: { style: "text-align : center" },
                    template: "#if (tglregistrasi) {# #= new moment(tglregistrasi).format(\'DD-MMM-YYYY HH:mm\')# #} else {# - #} #",

                },
                {
                    field: "tglpulang",
                    title: "Tgl Keluar",
                    width: "100px",
                    headerAttributes: { style: "text-align : center" },
                    template: "#if (tglpulang) {# #= new moment(tglpulang).format(\'DD-MMM-YYYY HH:mm\')# #} else {# - #} #",

                },
                {
                    field: "",
                    title: "Vc/Ges",
                    width: "80px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "",
                    title: "JR/JK",
                    width: "50px",
                    headerAttributes: { style: "text-align : center" },
                        // template: "#if (tglmasukinap) {# #= new moment(tglmasukinap).format(\'DD-MMM-YYYY HH:mm\')# #} else {# - #} #",
                    },

                    {
                        field: "hasil",
                        title: "Hasil",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },
                    },
                    {
                        field: "",
                        title: "Kateg",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },
                    },
                    
                    {
                        field: "namalengkap",
                        title: "Dokter",
                        width: "150px",
                        headerAttributes: { style: "text-align : center" },
                    },
                 
                    

                    ]

                });
$scope.Perbaharui = function () {
    $scope.ClearSearch();
}


ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function (data) {
    $scope.listDiagnosa1 = data;
      $scope.listDiagnosa2 =  $scope.listDiagnosa1 ;
    // $scope.item.diagnosa1 = {
    //     id:$scope.listDiagnosa1.id,
    //     kdDiagnosa:$scope.listDiagnosa1.kdDiagnosa,
    //     jenisKelaminId:$scope.listDiagnosa1.jenisKelaminId,
    //     kategoryDiagnosaId:$scope.listDiagnosa1.kategoryDiagnosaId,
    //     kodeExternal:$scope.listDiagnosa1.kodeExternal,
    //     kdProfile:$scope.listDiagnosa1.kdProfile,
    //     namaDiagnosa:$scope.listDiagnosa1.namaDiagnosa,
    //     namaExternal:$scope.listDiagnosa1.namaExternal,
    //     noRec:$scope.listDiagnosa1.noRec,
    //     qDiagnosa:$scope.listDiagnosa1.qDiagnosa,
    //     reportDisplay:$scope.listDiagnosa1.reportDisplay,
    //     statusEnabled:$scope.listDiagnosa1.statusEnabled,
    // };
   
    // $scope.item.diagnosa2 = {
    //     id:$scope.listDiagnosa2.id,
    //     kdDiagnosa:$scope.listDiagnosa2.kdDiagnosa,
    //     jenisKelaminId:$scope.listDiagnosa2.jenisKelaminId,
    //     kategoryDiagnosaId:$scope.listDiagnosa2.kategoryDiagnosaId,
    //     kodeExternal:$scope.listDiagnosa2.kodeExternal,
    //     kdProfile:$scope.listDiagnosa2.kdProfile,
    //     namaDiagnosa:$scope.listDiagnosa2.namaDiagnosa,
    //     namaExternal:$scope.listDiagnosa2.namaExternal,
    //     noRec:$scope.listDiagnosa2.noRec,
    //     qDiagnosa:$scope.listDiagnosa2.qDiagnosa,
    //     reportDisplay:$scope.listDiagnosa2.reportDisplay,
    //     statusEnabled:$scope.listDiagnosa2.statusEnabled,
    // };

});
           // modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-combo-rm", true,true,10).then(function (dat) {
           //      $scope.listDiagnosa = dat.diagnosa;
           //   $scope.item.diganosas = {id:$scope.listDiagnosa[0].id,kddiagnosa:$scope.listDiagnosa[0].kddiagnosa}
           //  });
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


            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.departement.ruangan
            }
            //sdm service hanya sementara, nanti harus diganti pake service kasir !!
            ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
                $scope.listPegawai = dat.data;
            });



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


            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

            //Tanggal Default
            $scope.item.tglawal = tanggals + " 00:00";
            $scope.item.tglakhir = tanggals + " 15:00";

            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;
            $scope.pegawai = modelItemAkuntansi.getPegawai();

            $scope.Cetak = function () {

                var daftarCetak = [];
                if ($scope.selectedData.length > 0) {
                    $scope.selectedData.forEach(function (items) {
                        daftarCetak.push(items)
                    })
                    var resultCetak = daftarCetak.map(a => a.noregistrasi).join("|");
                } else {
                    var resultCetak = "";
                }
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                if ($scope.item.tglawal == $scope.tglawal)
                    var tglawal = $scope.item.tglawal;
                else
                    var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
                if ($scope.item.tglakhir == $scope.tglakhir)
                    var tglakhir = $scope.item.tglakhir;
                else
                    var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

                // if ($scope.item.KelompokPasien == undefined)
                //     var kelompokPasien = "";
                // else
                //     var kelompokPasien = $scope.item.KelompokPasien.id;
                if ($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;
                if ($scope.item.departement == undefined)
                    var departement = "";
                else
                    var departement = $scope.item.departement.id;
                if ($scope.item.kelas == undefined)
                    var kelas = "";
                else
                    var kelas = $scope.item.kelas.id;
                // if ($scope.item.namaPegawai == undefined)
                //     var namaPegawai = "";
                // else
                //     var namaPegawai = $scope.item.namaPegawai.id;
                var stt = 'false'
                if (confirm('View Laporan Pendapatan Per Kelas? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatan-perkelas=1&tglAwal='
                    + tglawal + '&tglAkhir=' + tglakhir + '&strNoReg=' + resultCetak + '&strIdDepartemen=' + departement
                    + '&strIdRuangan=' + ruangan + '&strIdKelas=' + kelas + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {
                        // do something with response
                    });
            };




        }
        ]);
});