define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarInputJatahCutiCtrl', ['$rootScope', '$scope', 'ModelItem','$state', 'FindSdm', 'ManageSdmNew', '$timeout', 'DateHelper',
		function($rootScope, $scope, ModelItem, $state, FindSdm, ManageSdmNew, $timeout, dateHelper) {
            function firstLoad(){
                $scope.item = $scope.filter = {};
            }
			$scope.isRouteLoading = true;
            $scope.daftarpegawaiOpt = {
                toolbar: ["excel"],
                excel: {
                    allPages: true,
                    fileName: "RSAB HK Export Daftar Input Cuti - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') +".xlsx"
                },
                pageable: true,
                selectable: 'row',
                columns: [
                    { field: "namaPegawai", title: "Nama Lengkap", width: "30%" },
                    { field: "nipPegawai", title: "NIP", width: "15%" },
                    { field: "unitKerja", title: "Unit Kerja", width: "15%" },
                    { field: "subUnitKerja", title: "SubUnit Kerja", width: "15%" },
                    { field: "tahun", title: "Periode", width: "10%" },
                    { field: "value", title: "Jatah Cuti", width: "10%" },
                    { field: "cutiTerpakai", title: "Cuti Terpakai", width: "10%" },
                    { field: "sisaCuti", title: "Sisa Cuti", width: "10%" }
                ],
                // set column width to auto
                excelExport: function(e) {
                    var columns = e.workbook.sheets[0].columns;
                    columns.forEach(function(column){
                        delete column.width;
                        column.autoWidth = true;
                    });
                }
			};
            ManageSdmNew.getListData("sdm/get-all-jatah-cuti/").then(function(res) {
                // debugger
				var data = res.data.data;
				$scope.daftarPegawai = new kendo.data.DataSource({
                    data: data,
                    pageSize: 15,
                    total: data.length,
                    serverPaging: false
                });
                $scope.isRouteLoading = false;
            });
            var timeoutPromise;
			$scope.$watch('filter.namaPegawai', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter('namaPegawai', newVal)
                    }
                },500)
            }) 
			$scope.$watch('filter.unitKerja', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter('unitKerja', newVal)
                    }
                },500)
            })
            $scope.$watch('filter.subUnitKerja', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter('subUnitKerja', newVal)
                    }
                },500)
            })
            function applyFilter(filterField, filterValue){
                var gridData = $("#gridCutiPegawai").data("kendoGrid");
                var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];

                if (currentFilters && currentFilters.length > 0){
                    for(var i = 0; i < currentFilters.length; i++){
                        if(currentFilters[i].field == filterField){
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                currentFilters.push({
                    field: filterField,
                    operator: "contains",
                    value: filterValue
                });

                gridData.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            }
            $scope.resetFilters = function(){
                var gridData = $("#gridCutiPegawai").data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.item = $scope.filter = {};
            }
            
            firstLoad();
		}
	]);
});