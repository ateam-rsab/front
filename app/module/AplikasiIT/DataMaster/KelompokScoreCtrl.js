define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelompokScoreCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
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

var initz = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenScoreNilaiNormal", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenScoreNilaiNormal;
					
					$scope.dataSourcez = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initz();




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
				"template" : "<button class='btnEdit' ng-click='enableDataz()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDataz()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsz = { 
				pageable: true,
				columns: $scope.columnKomponenScoreNilaiNormal,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikz = function(currentz){
	$scope.showEditz = true;
	$scope.currentz = currentz;
	$scope.item.komponenScore = currentz.komponenScore;
	
	$scope.item.nilaiMaksimum = currentz.nilaiMaksimum;
	$scope.item.nilaiMinimum = currentz.nilaiMinimum;
	$scope.item.nilaiNormal = currentz.nilaiNormal;
	$scope.item.qRangeNilai = currentz.qRangeNilai;
	$scope.item.rangeNilai = currentz.rangeNilai;
	$scope.item.id = currentz.id;
	$scope.item.noRec = currentz.noRec;
	$scope.item.reportDisplay = currentz.reportDisplay;
	$scope.item.kodeExternal = currentz.kodeExternal;
	$scope.item.namaExternal = currentz.namaExternal;
	$scope.item.statusEnabled = currentz.statusEnabled;
};
$scope.disableDataz=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenScoreNilaiNormal&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initz();
	});
};
$scope.enableDataz=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenScoreNilaiNormal&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initz();

	});
};

$scope.tambahz = function()
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
		initz();
		$scope.item = {};
	});
}

$scope.editz = function()
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
		initz();
	});
}
$scope.batalz = function () {
	$scope.showEditz = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("KomponenScore&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenScore= dat.data;
});



}
]);
});