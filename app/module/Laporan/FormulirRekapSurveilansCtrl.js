define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('FormulirRekapSurveilansCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading=false;

            $scope.CariData = function () {
                LoadData()
            }
            function LoadData() {

             $scope.isRouteLoading = true;
             var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
             var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');

             var tempRuanganId = "";
             if ($scope.item.ruangan != undefined) {
                tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
            }


            var chacePeriode = {
                0: tglAwal,
                1: tglAkhir
            }
            cacheHelper.set('LaporanKematianRsCtrl', chacePeriode);

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-formulir-rekap-surveilans?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                    // + tempDepartemenId
                    + tempRuanganId
                    // + tempKelasId
                    // + tempKelPasienId
                    ).then(function (data) {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i].no = i + 1
                        }
                        $scope.isRouteLoading=false;
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
                        fileName: "DataKematian.xlsx",
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
                        cells: [ { value: "FORMULIR", background: "#fffff" } ]
                    });
                },
                columns: [
                // {
                //     title: "No",
                //     template: "# #",
                //     field: "no",
                //     width: 40
                // },
                {
                    field: "date",
                    title: "Tanggal",
                    width: "120px",
                    template: "<span class='style-center'>#: date #</span>",
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
                    field: "jumlah",
                    title: "Jml Pasien",
                    width: "100px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "jeniskelamin",
                    title: "Jml Pasien Terpasang Central Line/Hari",
                    width: "200px",
                    headerAttributes: { style: "text-align : center" },

                },
                {
                    field: "pendudukdki",
                    title: "Jml Pasien Terpasang Vena Line/Hari",
                    width: "200px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "",
                    title: "Jml Pasien Terpasang Kateter Urine/Hari",
                    width: "200px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "agama",
                    title: "Jml Pasien Terpasang Ventilator/Hari",
                    width: "200px",
                    headerAttributes: { style: "text-align : center" },
                },

                {
                    field: "alamatlengkap",
                    title: "Jml Pasien Terpasang Tirah Baring/Hari",
                    width: "200px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "namakotakabupaten",
                    title: "IAD",
                    width: "80px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "namakecamatan",
                    title: "PHLEBITIS",
                    width: "80px",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "namadesakelurahan",
                    title: "ISK",
                    width: "80px",
                    headerAttributes: { style: "text-align : center" },
                        // template: "#if (tglmasukinap) {# #= new moment(tglmasukinap).format(\'DD-MMM-YYYY HH:mm\')# #} else {# - #} #",
                    },

                    {
                        field: "",
                        title: "HAP",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },
                    },
                    {
                        field: "",
                        title: "VAP",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },
                    },
                    {
                        field: "",
                        title: "IDO",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },
                    },
                    {
                        field: "",
                        title: "DEKUBITUS",
                        width: "80px",
                        headerAttributes: { style: "text-align : center" },
                    },

                    ]

                });
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
            manageTataRekening.getDataTableTransaksi("laporan/get-data-combo-laporan", false).then(function (data) {
                $scope.listRuangan = data.data.ruangan;
                $scope.listKelompokPasien = data.data.kelompokpasien;
                $scope.listKelas = data.data.kelas;
                $scope.listKamar = data.data.kamar;
                $scope.listMutasi =
                [{ id: 1, namamutasi: "MASUK" },
                { id: 2, namamutasi: "KELUAR" },
                { id: 3, namamutasi: "DIPINDAHKAN" },
                { id: 4, namamutasi: "PINDAHAN" },
                { id: 5, namamutasi: "MENINGAL" }
                ];

            })

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
            $scope.item.tglakhir =  new Date();
            // $scope.item.tglakhir = tanggals + " 15:00";

            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;
            $scope.pegawai = modelItemAkuntansi.getPegawai();





        }
        ]);
});