define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SipStrExpiredCtrl', ['$rootScope', '$scope', '$timeout', 'ModelItem','$state','ManageSdm', 'FindSdm', 'DateHelper',
		function($rootScope, $scope, $timeout, ModelItem, $state, ManageSdm, FindSdm, dateHelper) {
            $scope.item = {};
            $scope.yearSelected = { 
                format: "MMMM yyyy",
                start: "year", 
                depth: "year" 
            };
            $scope.loadDataSip = function(){
                $scope.isRouteLoading = true;
                ManageSdm.getOrderList("pegawai/get-pegawai-sip-expired").then(function(res){
                    $scope.datagridSip = new kendo.data.DataSource({
                        data: res.data.data,
                      //  pageSize: 10,
                        group: {
                            field: "tglBerakhirSip2",
                            aggregates: [{
                                field: "tglBerakhirSip2",
                                aggregate: "count"
                            }]
                        },
                        aggregate: [ { field: "tglBerakhirSip2", aggregate: "count" }]
                    });
                    $scope.isRouteLoading = false;
                }, (err) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'masaBerlakuSip';
            };
            $scope.loadDataStr = function(){
                $scope.isRouteLoading = true;
                ManageSdm.getOrderList("pegawai/get-pegawai-str-expired").then(function(res){
                    $scope.datagridStr = new kendo.data.DataSource({
                        data: res.data.data,
                      //  pageSize: 10,
                        group: {
                            field: "tglBerakhirStr2",
                            aggregates: [{
                                field: "tglBerakhirStr2",
                                aggregate: "count"
                            }]
                        },
                        aggregate: [ { field: "tglBerakhirStr2", aggregate: "count" }]
                    });
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'masaBerlakuStr';
            };
            $scope.onTabChanges = function(value){
                if (value === 1){
                    if(!$scope.datagridSip){
                        $scope.loadDataSip();
                    }
                } else if (value === 2){
                    if(!$scope.datagridStr){
                        $scope.loadDataStr();
                    }
                }
            };
            $scope.opsiGridSip = {
                toolbar: [
                "excel", 
                ],
                excel: {
                    fileName: "Daftar SIP Pegawai.xlsx",
                    allPages: true,
                },
                excelExport: function(e){
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:G1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value:"Daftar SIP Pegawai",
                        fontSize: 20,
                        textAlign: "center",
                        background:"#ffffff",
                         // color:"#ffffff"
                     }];

                     sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
                 },
               // pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [
                    { field: "nipPns", title: "NIP", "width": 180}, 
                    { field: "namaLengkap", title: "Nama", "width": 280}, 
                    { field: "unitKerja", title: "Unit Kerja" },
                    { field: "subUnitKerja", title: "Sub-Unit Kerja" },
                    { field: "noSip", title: "Nomor SIP" },
                     { field: "tglBerakhirSip2", title: "Tanggal Berakhir"  
                      , aggregates: ["count"]
                      , groupHeaderTemplate: "Tanggal Berakhir SIP [#= kendo.toString(value) #] (Total: #= count#)" }
                 
               ]
            };
            $scope.opsiGridStr = {
                toolbar: [
                "excel", 
                ],
                excel: {
                    fileName: "Daftar STR Pegawai.xlsx",
                    allPages: true,
                },
                excelExport: function(e){
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:G1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value:"Daftar STR Pegawai",
                        fontSize: 20,
                        textAlign: "center",
                        background:"#ffffff",
                         // color:"#ffffff"
                     }];

                     sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
                 },
              //  pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [
                    { field: "nipPns", title: "NIP", "width": 180}, 
                    { field: "namaLengkap", title: "Nama", "width": 280}, 
                    { field: "unitKerja", title: "Unit Kerja" },
                    { field: "subUnitKerja", title: "Sub-Unit Kerja" },
                    { field: "noStr", title: "Nomor STR" },
                    { field: "tglBerakhirStr2", title: "Tanggal Berakhir" 
                    , aggregates: ["count"]
                    , groupHeaderTemplate: "Tanggal Berakhir STR [#= kendo.toString(value) #] (Total: #= count#)"
                  }
               ]
            };
            var timeoutPromise;
            $scope.$watch('item.tglAwalSip', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilterDate("#gridSip", "tglBerakhirSip", "gte", newVal)
                    }
                }, 500);
            });
            $scope.$watch('item.tglAkhirSip', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilterDate("#gridSip", "tglBerakhirSip", "lte", newVal)
                    }
                }, 500);
            });
            $scope.$watch('item.tglAwalStr', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilterDate("#gridStr", "tglBerakhirStr", "gte", newVal)
                    }
                }, 500);
            });
            $scope.$watch('item.tglAkhirStr', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilterDate("#gridStr", "tglBerakhirStr", "lte", newVal)
                    }
                }, 500);
            });
            function applyFilterDate(gridId, filterField, filterOperator, filterValue){
                var gridData = $(gridId).data("kendoGrid");
                var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];
                
                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField && currentFilters[i].operator == filterOperator) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterValue !== "") {
                    var tgl;
                    if(filterOperator === "gte") {
                        tgl = dateHelper.setJamAwal(new Date(filterValue));
                    } else if(filterOperator === "lte"){
                        tgl = dateHelper.setJamAkhir(new Date(filterValue));
                    }
                    currentFilters.push({
                        field: filterField,
                        operator: filterOperator,
                        value: new Date(tgl).getTime()
                    });
                }

                gridData.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                });
            };
            $scope.resetFilter = function(gridId){
                var gridData = $(gridId).data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.item = {};
            };
		}
	]);
});