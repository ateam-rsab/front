////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenPemeriksaanAlkesCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaanAlkes", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaanAlkes;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKomponenPemeriksaanAlkes = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "alkes",
				"title": "alkes"
			},
			{
				"field": "alkesId",
				"title": "alkes Id"
			},
			{
				"field": "departemen",
				"title": "departemen"
			},
			{
				"field": "departemenId",
				"title": "departemen Id"
			},
			{
				"field": "komponenPeriksa",
				"title": "komponen Periksa"
			},
			{
				"field": "komponenPeriksaId",
				"title": "komponen Periksa Id"
			},
			{
				"field": "komponenPeriksaAlkes",
				"title": "komponen Periksa Alkes"
			},
			{
				"field": "komponenPeriksaAlkesId",
				"title": "komponen Periksa Alkes Id"
			},
			{
				"field": "namaKomponenPeriksaAlkes",
				"title": "nama Komponen Periksa Alkes"
			},
			{
				"field": "id",
				"title": "id"
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
				columns: $scope.columnKomponenPemeriksaanAlkes,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.alkes = current.alkes;
	$scope.item.alkesId = current.alkesId;
	$scope.item.departemen = current.departemen;
	$scope.item.departemenId = current.departemenId;
	$scope.item.komponenPeriksa = current.komponenPeriksa;
	$scope.item.komponenPeriksaId = current.komponenPeriksaId;
	$scope.item.komponenPeriksaAlkes = current.komponenPeriksaAlkes;
	$scope.item.komponenPeriksaAlkesId = current.komponenPeriksaAlkesId;
	$scope.item.namaKomponenPeriksaAlkes = current.namaKomponenPeriksaAlkes;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanAlkes&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanAlkes&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KomponenPemeriksaanAlkes",
		"listField": {
			"alkes": $scope.item.alkes,
			"alkesId": $scope.item.alkesId,
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"komponenPeriksa": $scope.item.komponenPeriksa,
		
			"komponenPeriksaAlkes": $scope.item.komponenPeriksaAlkes,
			
			"namaKomponenPeriksaAlkes": $scope.item.namaKomponenPeriksaAlkes,

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

$scope.edit = function()
{	
	var data = {
		"class": "KomponenPemeriksaanAlkes",
		"listField": {
			"alkes": $scope.item.alkes,
			"alkesId": $scope.item.alkesId,
			"departemen": $scope.item.departemen,
		
			"komponenPeriksa": $scope.item.komponenPeriksa,
			
			"komponenPeriksaAlkes": $scope.item.komponenPeriksaAlkes,
			
			"namaKomponenPeriksaAlkes": $scope.item.namaKomponenPeriksaAlkes,
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

IPSRSService.getFieldListData("AlatKesehatan&select=id,namaExternal", true).then(function(dat){
	$scope.listalkes= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("KomponenPemeriksaan&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenPeriksa= dat.data;
});
IPSRSService.getFieldListData("KomponenPemeriksaan&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenPeriksaAlkes= dat.data;
});
}
]);
});