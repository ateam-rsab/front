define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatMonevctrl', ['$q', '$rootScope', '$scope','DateHelper','$http','$route','$state',
        function($q, $rootScope, $scope,dateHelper,$http,$route,$state) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeTahun = $scope.now;

            $scope.monthSelectorOptions = function() {
                return {
                    start: "year",
                    depth: "year"
                }
            }

            
            
             // var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
             $http.get('module/Anggaran/dummy_json/RiwayatMonev.json').success(function(data) {

                var arraydata = data.result[0].listPaket;
                $scope.item.tahun = data.result[0].tahun; 
                $scope.item.kodeMataAnggaran = data.result[0].kodeMataAnggaran; 
                $scope.item.namaMataAnggaran = data.result[0].namaMataAnggaran; 
                $scope.item.totalMata ='Rp. ' + parseFloat(data.result[0].totalMata).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                $scope.item.realisasiBelanja ='Rp. ' +  parseFloat(data.result[0].realisasiBelanja).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                $scope.item.sisa ='Rp. ' +  parseFloat(((data.result[0].totalMata)-(data.result[0].realisasiBelanja))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");  
                $scope.dataGrid = new kendo.data.DataSource({
                    data: arraydata,
                    total: data.length,
                    serverPaging: false,


                });
            })

            $scope.columnGrid = [
            {
                "field": "no",
                "title": "No",
                "width":"50px"
            },
            {
                "field": "namaPaket",
                "title": "Nama Paket",
                "width":"300px"
            },
            {
                "field": "total",
                "title": "Total",
                "width":"150px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>"
            },
            {
                "field": "realisasiBelanja",
                "title": "Realisasi Belanja",
                "width":"150px",
                "template": "<span class='style-right'>{{formatRupiah('#: realisasiBelanja #', 'Rp.')}}</span>"
            }
                // { 	"command": { text: "View Details", click: showDetails }, title: " ", width: "180px" }
                ];

                $scope.detailGridOptions = function(dataItem) {
                    return {
                        dataSource: new kendo.data.DataSource({
                            data: dataItem.listRiwayat
                        }),
                        columns: [
                        {
                            "field": "no",
                            "title": "No",
                            "width":"50px"
                        },
                        {
                            "field": "namaRiwayat",
                            "title": "Nama Riwayat",
                            "width":"300px"
                        },
                        {
                            "field": "noSPK",
                            "title": "NO SPK",
                            "width":"100px"
                        },
                        {
                            "field": "tglSPK",
                            "title": "Tanggal SPK",
                            "width":"100px"
                        },
                        {
                            "field": "Suplier",
                            "title": "Nama Rekanan",
                            "width":"300px"
                        },
                        {
                            "field": "totalRiwayat",
                            "title": "Total",
                            "width":"150px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalRiwayat #', 'Rp.')}}</span>"
                        }]
                    };
                };



                function showDetails(e) {
                    e.preventDefault();
                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                    /*wnd.content(detailsTemplate(dataItem));
                    wnd.center().open();*/
                    function_name(dataItem);
                }
                function function_name(argument) {
                   if (argument.isVerifikasi === 'DEFINITIF') {
                      window.open('#/DefinitifRKAKL');
                  }
                  else {
                      window.open('#/IndikatifRKAKL');
                  }
                  /*$state.go('dashboardpasien.Integumen');*/

              }



              $scope.Cetak = function(){
                debugger;
                var xxx = $scope.dataPasienSelected.detail;
                var yyy = "aasas";
            }
            $scope.refresh = function() {
              /*$route.reload('#/DetailRKAKL');*/
              location.reload();
              /*$scope.item = "";*/

          }
          $scope.formatRupiah = function(value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        };
            /////////////////////////////////////////////////////////////////////
        }
        ]);
});