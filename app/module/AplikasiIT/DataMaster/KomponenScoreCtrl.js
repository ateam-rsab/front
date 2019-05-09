////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenScoreCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenScore", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenScore;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKomponenScore = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "komponenKlinis",
				"title": "komponen Klinis"
			},
			{
				"field": "komponenKlinisId",
				"title": "komponen Klinis Id"
			},
			{
				"field": "kdKomponenScore",
				"title": "kd Komponen Score"
			},
			{
				"field": "satuanHasil",
				"title": "satuan Hasil"
			},
			{
				"field": "satuanHasilId",
				"title": "satuan Hasil Id"
			},
			{
				"field": "komponenScore",
				"title": "komponen Score"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qKomponenScore",
				"title": "q Komponen Score"
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
				columns: $scope.columnKomponenScore,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.komponenKlinis = current.komponenKlinis;
	$scope.item.komponenKlinisId = current.komponenKlinisId;
	$scope.item.kdKomponenScore = current.kdKomponenScore;
	$scope.item.satuanHasil = current.satuanHasil;
	$scope.item.satuanHasilId = current.satuanHasilId;
	$scope.item.komponenScore = current.komponenScore;
	$scope.item.noUrut = current.noUrut;
	$scope.item.qKomponenScore = current.qKomponenScore;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenScore&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenScore&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KomponenScore",
		"listField": {
			"komponenKlinis": $scope.item.komponenKlinis,
			
			"kdKomponenScore": $scope.item.kdKomponenScore,
			"satuanHasil": $scope.item.satuanHasil,
			
			"komponenScore": $scope.item.komponenScore,
			"noUrut": $scope.item.noUrut,
			"qKomponenScore": $scope.item.qKomponenScore,
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
		"class": "KomponenScore",
		"listField": {
			"komponenKlinis": $scope.item.komponenKlinis,
			
			"kdKomponenScore": $scope.item.kdKomponenScore,
			"satuanHasil": $scope.item.satuanHasil,
			
			"komponenScore": $scope.item.komponenScore,
			"noUrut": $scope.item.noUrut,
			"qKomponenScore": $scope.item.qKomponenScore,
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
IPSRSService.getFieldListData("KomponenKlinis&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenKlinis= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
	$scope.listsatuanHasil= dat.data;
});
}
]);
});