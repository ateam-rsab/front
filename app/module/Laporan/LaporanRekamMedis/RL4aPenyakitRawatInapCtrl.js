define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RL4aPenyakitRawatInapCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi','ModelItem', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi,ModelItem, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.tglawal=$scope.now;
            $scope.item.tglakhir=$scope.now;

            $scope.CariData = function () {
                LoadData()
            }
            function LoadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;

                // var idDiagnosaAwal = "";
                // if ($scope.item.diagnosa1 != undefined) {
                //     idDiagnosaAwal = "&idDiagnosaAwal=" + $scope.item.diagnosa1.kddiagnosa;
                // }
                // var idDiagnosaAkhir = "";
                // if ($scope.item.diagnosa2 != undefined) {
                //     idDiagnosaAkhir = "&idDiagnosaAkhir=" + $scope.item.diagnosa2.kddiagnosa;
                // }


                modelItemAkuntansi.getDataTableTransaksi("laporan/get-laporan-rl4a?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir

                    ).then(function (data) {

                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i].no = i+1
                            var tanggal = $scope.now;
                            var tanggalLahir = new Date(data.data[i].tglLahir);
                            var umurzz = DateHelper.CountAge(tanggalLahir, tanggal);
                            data.data[i].umurzz =umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'

                        }
                        $scope.isRouteLoading = false;

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
                        fileName: "RL4ARawatInap.xlsx",
                        allPages: true,

                    },
                // pdf: {
                //     fileName: "LaporanPasienMasuk.pdf",
                //     allPages: true,
                // },

                dataSource: $scope.dataExcel,
                sortable: true,
                reorderable: true,
                filterable: true,
                pageable: true,
                // groupable: true,
                columnMenu: true,
                resizable: true,
                excelExport: function(e) {
                    var rows = e.workbook.sheets[0].rows;
                    rows.unshift({
                        cells: [ { value: "DATA KEADAAN MORBIDITAS PASIEN RAWAT INAP", background: "#fffff" } ]
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
                                field: "nodtd",
                                title: "No. DTD",
                                width: "80px",
                                template: "<span class='style-center'>#: nodtd #</span>",
                                // headerAttributes: { style: "text-align : center" },
                              },
                              {
                                field: "kddiagnosa",
                                title: "No. Daftar Terperinci",
                                width: "100px",
                                template: "<span class='style-center'>#: kddiagnosa #</span>",
                                // headerAttributes: { style: "text-align : center" },
                              },
                              {
                                field: "golongansebabpenyakit",
                                title: "Golongan Sebab Penyakit",
                                width: "150px",
                                template: "<span class='style-center'>#: golongansebabpenyakit #</span>",
                                // headerAttributes: { style: "text-align : center" },
                              },
                              {
                                title: "Jumlah Pasien Hidup dan Mati menurut Golongan Umur & Jenis Kelamin",
                                headerAttributes: { style: "text-align : center" },
                                columns: [
                                    {
                                      
                                        title: "0-6hr",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml6HariL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml6HariP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                        title: "7-28hr",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml28HariL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml28HariP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                       
                                        title: "28hr-<1th",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml1ThnL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml1ThnP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                        title: "1-4th",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml4ThnL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml4ThnP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                        title: "5-14th",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml14ThnL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml14ThnP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                    
                                        title: "15-24th",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml24ThnL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml24ThnP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                        title: "55-44th",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml44ThnL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml44ThnP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                       
                                        title: "45-64th",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml64ThnL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml64ThnP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                    {
                                      
                                        title: ">65",
                                        headerAttributes: { style: "text-align : center" },
                                        columns: 
                                            [
                                                {
                                                    field: "jml65ThnL",
                                                    title: "L",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                },
                                                {
                                                    field: "jml65ThnP",
                                                    title: "P",
                                                    width: "40px",
                                                    headerAttributes: { style: "text-align : center" }
                                                }
                                            ]
                                    },
                                ]
                            },
                            
                            {
                                title: "Pasien Keluar (Hidup & Mati) Menurut Jenis Kelamin",
                                headerAttributes: { style: "text-align : center" },
                                columns: [
                                    {
                                        field: "totalMenurutL",
                                        title: "LK",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" }
                                    },
                                    {
                                        field: "totalMenurutP",
                                        title: "PR",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                   
                                 ]
                            },
                            {
                                field: "jmlPL",
                                title: "Jumlah Pasien Keluar Hidup & Mati (23+24)",
                                width: "100px",
                                headerAttributes: { style: "text-align : center" },
                            },
                            {
                                field: "jmlKeluarMati",
                                title: "Jumlah Pasien Keluar Mati",
                                width: "100px",
                                headerAttributes: { style: "text-align : center" },
                            }
                            
            ]

        });
            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }



           // modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-combo-rm", true,true,10).then(function (dat) {
           //      $scope.listDiagnosa = dat.diagnosa;
           //   $scope.item.diganosas = {id:$scope.listDiagnosa[0].id,kddiagnosa:$scope.listDiagnosa[0].kddiagnosa}
           //  });
            //fungsi clear kriteria search
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                
            }



        }
        ]);
});