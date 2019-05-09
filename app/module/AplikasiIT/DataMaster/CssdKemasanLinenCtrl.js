define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CssdKemasanLinenCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=CssdKemasanLinen", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.CssdKemasanLinen;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();



			$scope.columnCssdKemasanLinen = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "cssdPenyerahanBarang",
				"title": "cssd Penyerahan Barang"
			},
			{
				"field": "cssdPenyerahanBarangId",
				"title": "cssd Penyerahan Barang Id"
			},
			{
				"field": "linenBs",
				"title": "linen Bs"
			},
			{
				"field": "linenB",
				"title": "linen B"
			},
			{
				"field": "linenS",
				"title": "linen S"
			},
			{
				"field": "linenK",
				"title": "linen K"
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
				columns: $scope.columnCssdKemasanLinen,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.cssdPenyerahanBarang = current.cssdPenyerahanBarang;

	$scope.item.linenBs = current.linenBs;
	$scope.item.linenB = current.linenB;
	$scope.item.linenS = current.linenS;
	$scope.item.linenK = current.linenK;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=CssdKemasanLinen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=CssdKemasanLinen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};
//// save 
$scope.tambah = function()
{
	var data = {
		"class": "CssdKemasanLinen",
		"listField": {
			"cssdPenyerahanBarang": $scope.item.cssdPenyerahanBarang,

			"linenBs": $scope.item.linenBs,
			"linenB": $scope.item.linenB,
			"linenS": $scope.item.linenS,
			"linenK": $scope.item.linenK,
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
		"class": "CssdKemasanLinen",
		"listField": {
			"cssdPenyerahanBarang": $scope.item.cssdPenyerahanBarang,

			"linenBs": $scope.item.linenBs,
			"linenB": $scope.item.linenB,
			"linenS": $scope.item.linenS,
			"linenK": $scope.item.linenK,
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
IPSRSService.getFieldListData("CssdPenyerahanBarang&select=id,namaExternal", true).then(function(dat){
	$scope.listcssdpenyerahanbarang= dat.data;
});
}
]);
});