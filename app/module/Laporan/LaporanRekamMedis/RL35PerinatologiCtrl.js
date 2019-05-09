define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RL35PerinatologiCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi','ModelItem', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
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


                modelItemAkuntansi.getDataTableTransaksi("laporan/get-laporan-rl35?"
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
                        fileName: "RL35Perinatologi.xlsx",
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
                resizable: true,
                excelExport: function(e) {
                    var rows = e.workbook.sheets[0].rows;
                    rows.unshift({
                        cells: [ { value: "Perinatologi", background: "#fffff" } ]
                    });
                },
                columns: [
                {
                  field: "no", 
                  title: "NO",
                  Template: "<span class='style-center'>#: no #</span>",
                  width:"40px"
              },
              {
                field: "jenispelayanan",
                title: "JENIS KEGIATAN",
                width: "120px",
                template: "<span class='style-center'>#: jenispelayanan #</span>",
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
                title: "RUJUKAN",
                headerAttributes: { style: "text-align : center" },
                columns: [
                        {
                        
                            title: "MEDIS",
                            headerAttributes: { style: "text-align : center" },
                            columns: [
                                    {
                                        field: "rujukanRS",
                                        title: "RUMAH SAKIT",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "rujukanBidan",
                                        title: "BIDAN",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "rujukanPuskes",
                                        title: "PUSKESMAS",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "rujukanFaskesLain",
                                        title: "FASKES LAINNYA",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "jmlMedisHidup",
                                        title: "Jumlah Hidup",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                      {
                                        field: "jmlMedisMati",
                                        title: "Jumlah Mati",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                      {
                                        field: "jmlTotalMedis",
                                        title: "Jumlah Total",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    }
                                      
                              ]
                        
                        },
                        {
                        
                            title: "NON MEDIS",
                            headerAttributes: { style: "text-align : center" },
                            columns: [
                                    {
                                        field: "jmlNonMedisHidup",
                                        title: "Jumlah Hidup",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "jmlNonMedisMati",
                                        title: "Jumlah Mati",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "jmlTotalNonMedis",
                                        title: "Jumlah Total",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },

                             ]
                        
                        },               
                        ]
                     },
                     {
                        
                            title: "NON RUJUKAN",
                            headerAttributes: { style: "text-align : center" },
                            columns: [
                                    {
                                        field: "nonRujukanHidup",
                                        title: "Jumlah Hidup",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "nonRujukanMati",
                                        title: "Jumlah Mati",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },
                                    {
                                        field: "totalNonRujukan",
                                        title: "Jumlah Total",
                                        width: "60px",
                                        headerAttributes: { style: "text-align : center" },  
                                    },

                             ]
                        
                        },
                    {
                         field: "dirujuk",
                         title: "DIRUJUK",
                         width: "60px",
                         headerAttributes: { style: "text-align : center" },  
                    },
           
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