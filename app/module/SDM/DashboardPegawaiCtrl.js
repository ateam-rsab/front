define(['initialize'], function(initialize) {'use strict';
	initialize.controller('DashboardPegawaiCtrl', ['$q', '$state', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSdmNew', 'CetakHelper',
		function($q, $state, $rootScope, $scope, ModelItem, DateHelper, ManageSdmNew, cetakHelper) {
            $scope.item ={};
			$scope.chartUnitKerja = {
				legend: {
                    visible: false,
                    position: "bottom"
				},
				// seriesDefaults: { type: 'pie' },
                seriesDefaults: {
                    labels: {
                        // template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        template: "#= category # : #= value#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
				// series: [{ field: 'value', categoryField: 'unitKerja', padding: 0 }],
                series: [{
                    type: "pie",
                    field:"value",
                    categoryField:"unitKerja"
                }],
				tooltip: {
                    visible: true,
                    // format: "{0:N0}"
                    // template: "#=category#<br />Total: #= kendo.format('{0:N0}',value) #"
                    template: "#=category#<br />Total: #= kendo.format('{0:P}', percentage)#"
                },
            };
			$scope.chartJK = {
				legend: {
                    visible: false,
                    position: "bottom"
				},
				// seriesDefaults: { type: 'pie' },
                seriesDefaults: {
                    labels: {
                        // template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        template: "#= category # : #= value#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
				// series: [{ field: 'value', categoryField: 'jenisKelamin', padding: 0 }],
                series: [{
                    type: "pie",
                    field:"value",
                    categoryField:"jenisKelamin"
                }],
				tooltip: {
                    visible: true,
                    // format: "{0:N0}"
                    template: "#=category#<br />Total: #= kendo.format('{0:P}', percentage)#"
                },
            };
			$scope.chartStatusPg = {
				legend: {
                    visible: false,
                    position: "bottom"
				},
				// seriesDefaults: { type: 'pie' },
                seriesDefaults: {
                    labels: {
                        // template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        template: "#= category # : #= value#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
				// series: [{ field: 'value', categoryField: 'kategoryPegawai', padding: 0 }],
                series: [{
                    type: "pie",
                    field:"value",
                    categoryField:"kategoryPegawai"
                }],
				tooltip: {
                    visible: true,
                    // format: "{0:N0}"
                    // template: "#=category#<br />Total: #= kendo.format('{0:N0}',value) #"
                    template: "#=category#<br />Total: #= kendo.format('{0:P}', percentage)#"
                },
            };
			$scope.chartKelompokJbtn = {
				legend: {
                    visible: false,
                    position: "bottom"
				},
				// seriesDefaults: { type: 'pie' },
                seriesDefaults: {
                    labels: {
                        // template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        template: "#= category # : #= value#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
				// series: [{ field: 'value', categoryField: 'kelompokJabatan', padding: 0 }],
                series: [{
                    type: "pie",
                    field:"value",
                    categoryField:"kelompokJabatan"
                }],
				tooltip: {
                    visible: true,
                    // template: "#=category#<br />Total: #= kendo.format('{0:N0}',value) #"
                    template: "#=category#<br />Total: #= kendo.format('{0:P}', percentage)#"
                },
            };
            $scope.cetakDashboardPegawai = function(){
                var fixUrlLaporan = cetakHelper.openURLReporting("reporting/dashboardDataPegawai?");
                window.open(fixUrlLaporan, '', 'width=800,height=600')           
            };
            $q.all([
                ManageSdmNew.getListData("pegawai/get-count-pegawai-by-unit-kerja"),
                ManageSdmNew.getListData("pegawai/get-count-pegawai-by-jk"),
                ManageSdmNew.getListData("pegawai/get-count-pegawai-by-status-pegawai"),
                ManageSdmNew.getListData("pegawai/get-count-pegawai-by-kelompok-jabatan")
            ]).then(function(res){
                if(res[0].statResponse){
                    $scope.sourceUnitKerja = new kendo.data.DataSource({
                        data: res[0].data.data
                    });
                }
                if(res[1].statResponse){
                    $scope.sourceJK = new kendo.data.DataSource({
                        data: res[1].data.data
                    });
                }
                if(res[2].statResponse){
                    $scope.sourceStatusPg = new kendo.data.DataSource({
                        data: res[2].data.data
                    });
                }
                if(res[3].statResponse){
                    $scope.sourceKelompokJbtn = new kendo.data.DataSource({
                        data: res[3].data.data
                    });
                }
            });
		}
	])
});