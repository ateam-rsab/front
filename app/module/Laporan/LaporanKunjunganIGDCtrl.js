define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanKunjunganIGDCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi','ModelItem', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi,ModelItem, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.tglawal=$scope.now;
            $scope.item.tglakhir=$scope.now;
            $scope.showTotal=true;
            var TotalAll =0

            $scope.CariData = function () {
                LoadData()
            }
            function LoadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;

                modelItemAkuntansi.getDataTableTransaksi("laporan/get-lap-kunjungan-igd?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    ).then(function (data) {
                        var datas= data
                        var total =0;
                        for (var i = 0; i < datas.length; i++) {
                            datas[i].no = i+1
                            total=total+ parseFloat(datas[i].jml)
                            datas[i].subtotal=total;
                        }
                        $scope.isRouteLoading = false;
                        $scope.item.totalAll = total;
                        $scope.sourceLaporan = new kendo.data.DataSource({

                            data: datas,                            
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

             
                
            $("#kGrid").kendoGrid({
                toolbar: ["excel"],
                    excel: {
                        fileName: "LaporanKunjunganIGD.xlsx",
                        allPages: true,
                    },
                
                dataSource: $scope.dataExcel,
                sortable: true,
                pageable: true,
                resizable: true,
                aggregate: [
                  { field: "total", 
                    aggregate: "sum" 
                }],
                columns: [
                {
                    field: "no", 
                    title: "NO",
                    Template: "<span class='style-center'>#: no #</span>",
                    width:"80px"
                },
                {
                    field: "tglregistrasi", 
                    title: "Tgl. Registrasi",
                    // "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>",
                    width:"80px"
                },
                {
                    field: "kelompokpasien",
                    title: "Jenis Pasien",
                    width: "100px",
                    template: "<span class='style-center'>#: kelompokpasien #</span>",
                    headerAttributes: { style: "text-align : center" },
                },
                {
                    field: "jml",
                    title: "Total Kunjungan",
                    width: "100px",
                    template: "<span class='style-center'>#: jml #</span>",
                    headerAttributes: { style: "text-align : center" },
                }]

             });
                $scope.Perbaharui = function () {
                    $scope.ClearSearch();
                }
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
             
            }
        }
        ]);
});