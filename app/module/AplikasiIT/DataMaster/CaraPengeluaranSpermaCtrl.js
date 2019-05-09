define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CaraPengeluaranSpermaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=CaraPengeluaranSperma", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.CaraPengeluaranSperma;

					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"deskripsi": e.deskripsi,
						 		"reportDisplay": e.reportDisplay,
						 		"kodeExternal": e.kodeExternal,
						 		"namaExternal": e.namaExternal,
						 		"statusEnabled": e.statusEnabled,
						 		"id": e.id,
						 		"noRec": e.noRec,
						 		"nomor": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});

					$scope.source = data
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.source,
						//data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();


			$scope.dataCaraPengeluaranSperma = new kendo.data.DataSource({
				data: []
			});
			$scope.columnCaraPengeluaranSperma = [
			{
				"field": "nomor",
				"title": "No"
			},
			{
				"field": "deskripsi",
				"title": "deskripsi"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			},
			{
				"title" : "Action",
				"width" : "200px",
				"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnCaraPengeluaranSperma,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.deskripsi = current.deskripsi;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=CaraPengeluaranSperma&&id="+$scope.item.id

		+"&&statusEnabled=false").then(function(dat){
			init();
		});
	};
	$scope.enableData=function(){
		IPSRSService.getClassMaster("delete-master-table?className=CaraPengeluaranSperma&&id="+$scope.item.id

			+"&&statusEnabled=true").then(function(dat){
				init();

			});
		};
//// save 
$scope.tambah = function()
{
	var data = {
		"class": "CaraPengeluaranSperma",
		"listField": {
			"deskripsi": $scope.item.deskripsi,
			"id": $scope.item.id,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		init();
		$scope.item = {};
	});
}
////edit
$scope.edit = function()
{	
	var data = {
		"class": "CaraPengeluaranSperma",
		"listField": {
			"deskripsi": $scope.item.deskripsi,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		init();
	});
}
$scope.batal = function () {
	$scope.showEdit = false;
	$scope.item = {};
}
}
]);
});