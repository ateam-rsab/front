define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarSterilisasiAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras','IPSRSService', 'DateHelper',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper) {
			ModelItem.get("CSSD/DaftarSterilisasiAlat").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				IPSRSService.getItem("cssd-sterilisasi/list-sterilisasi?noOrder=&tanggalAwal=&tanggalAhir").then(function(dat){
					$scope.dataGrid = dat.data.data;
					$scope.dataSource = new kendo.data.DataSource({
				        pageSize: 2,
				        data: $scope.dataGrid,
				        autoSync: true
				    });
				});
				

				$scope.mainGridOptions = {
			        dataSource: $scope.dataSource,
			        pageable: false,
			        columns: [
			          	{
							field: "no",
							title: "No",
							width: 40
						},
						{
							field: "tanggal",
							title: "Tanggal",
							width: 100
						},
						{
							field: "namaSet",
							title: "Nama Set",
							width: 150
						},
						{
							field: "namaBarang",
							title: "Nama Barang",
							width: 150
						},
						{
							field: "jumlah",
							title: "Jumlah",
							width: 100
						},
						{
							field: "satuan",
							title: "Satuan",
							width: 100
						},
						{
							field: "ruangan",
							title: "Ruangan",
							width: 100
						},
						{
							field: "status",
							title: "Status",
							width: 100
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});