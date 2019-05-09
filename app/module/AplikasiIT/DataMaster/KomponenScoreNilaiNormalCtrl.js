////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenScoreNilaiNormalCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenScoreNilaiNormal", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenScoreNilaiNormal;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKomponenScoreNilaiNormal = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "komponenScore",
				"title": "komponen Score"
			},
			{
				"field": "komponenScoreId",
				"title": "komponen Score Id"
			},
			{
				"field": "nilaiMaksimum",
				"title": "nilai Maksimum"
			},
			{
				"field": "nilaiMinimum",
				"title": "nilai Minimum"
			},
			{
				"field": "nilaiNormal",
				"title": "nilai Normal"
			},
			{
				"field": "qRangeNilai",
				"title": "q Range Nilai"
			},
			{
				"field": "rangeNilai",
				"title": "range Nilai"
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
				columns: $scope.columnKomponenScoreNilaiNormal,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.komponenScore = current.komponenScore;
	
	$scope.item.nilaiMaksimum = current.nilaiMaksimum;
	$scope.item.nilaiMinimum = current.nilaiMinimum;
	$scope.item.nilaiNormal = current.nilaiNormal;
	$scope.item.qRangeNilai = current.qRangeNilai;
	$scope.item.rangeNilai = current.rangeNilai;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenScoreNilaiNormal&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenScoreNilaiNormal&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KomponenScoreNilaiNormal",
		"listField": {
			"komponenScore": $scope.item.komponenScore,
			
			"nilaiMaksimum": $scope.item.nilaiMaksimum,
			"nilaiMinimum": $scope.item.nilaiMinimum,
			"nilaiNormal": $scope.item.nilaiNormal,
			"qRangeNilai": $scope.item.qRangeNilai,
			"rangeNilai": $scope.item.rangeNilai,
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
		"class": "KomponenScoreNilaiNormal",
		"listField": {
			"komponenScore": $scope.item.komponenScore,
			
			"nilaiMaksimum": $scope.item.nilaiMaksimum,
			"nilaiMinimum": $scope.item.nilaiMinimum,
			"nilaiNormal": $scope.item.nilaiNormal,
			"qRangeNilai": $scope.item.qRangeNilai,
			"rangeNilai": $scope.item.rangeNilai,
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
IPSRSService.getFieldListData("KomponenScore&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenScore= dat.data;
});
}
]);
});