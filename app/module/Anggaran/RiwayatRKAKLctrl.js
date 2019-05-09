define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatRKAKLctrl', ['$q', '$rootScope', '$scope','DateHelper','$http','$route','$state',
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

            
            
            var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
            /*findPasien.getDataDetail(tahunPriode).then(function(data) {*/
            $http.get('module/Anggaran/dummy_json/RiwayatRKAKL.json').success(function(data) {
                var arraydata = data.result;
                $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                    data: arraydata,
                    total: data.length,
                    serverPaging: false,
                    pageSize: 10,
                    
                });
            })

            $scope.findData = function() {

                var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
                findPasien.lalala(tahunPriode).then(function(data) {

                    var arraydata = data.data.data;
                    $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                        data: arraydata,
                        total: data.length,
                        serverPaging: false,
                        
                    });
                })

            }


            $scope.columnPenyusunanTRPNBP = [
                {
                    "field": "no",
                    "title": "No",
                    "width":"150px"
                },
                {
                    "field": "tahun",
                    "title": "Tanggal Update"
                },
                {
                    "field": "isVerifikasi",
                    "title": "Status"
                },
                { 	"command": { text: "View Details", click: showDetails }, title: " ", width: "180px" }
            ];

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
            /////////////////////////////////////////////////////////////////////
        }
    ]);
});