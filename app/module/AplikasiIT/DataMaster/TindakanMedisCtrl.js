////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TindakanMedisCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=TindakanMedis", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.TindakanMedis;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();



			$scope.columnTindakanMedis = [
			{
				"field": "No",
				"title": "No"
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
				"field": "jenisTindakanMedis",
				"title": "jenis Tindakan Medis"
			},
			{
				"field": "jenisTindakanMedisId",
				"title": "jenis Tindakan Medis Id"
			},
			{
				"field": "kdTindakanMedis",
				"title": "kd Tindakan Medis"
			},
			{
				"field": "qTindakanMedis",
				"title": "q Tindakan Medis"
			},
			{
				"field": "namaTindakanMedis",
				"title": "nama Tindakan Medis"
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
				columns: $scope.columnTindakanMedis,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.departemen = current.departemen;
	$scope.item.departemenId = current.departemenId;
	$scope.item.jenisTindakanMedis = current.jenisTindakanMedis;
	$scope.item.jenisTindakanMedisId = current.jenisTindakanMedisId;
	$scope.item.kdTindakanMedis = current.kdTindakanMedis;
	$scope.item.qTindakanMedis = current.qTindakanMedis;
	$scope.item.namaTindakanMedis = current.namaTindakanMedis;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=TindakanMedis&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=TindakanMedis&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "TindakanMedis",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"jenisTindakanMedis": $scope.item.jenisTindakanMedis,
			"jenisTindakanMedisId": $scope.item.jenisTindakanMedisId,
			"kdTindakanMedis": $scope.item.kdTindakanMedis,
			"qTindakanMedis": $scope.item.qTindakanMedis,
			"namaTindakanMedis": $scope.item.namaTindakanMedis, 
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
		"class": "TindakanMedis",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"jenisTindakanMedis": $scope.item.jenisTindakanMedis,
			"jenisTindakanMedisId": $scope.item.jenisTindakanMedisId,
			"kdTindakanMedis": $scope.item.kdTindakanMedis,
			"qTindakanMedis": $scope.item.qTindakanMedis,
			"namaTindakanMedis": $scope.item.namaTindakanMedis,
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
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisTindakanMedis&select=id,namaExternal", true).then(function(dat){
	$scope.listjenisTindakanMedis= dat.data;
});
}
]);
});