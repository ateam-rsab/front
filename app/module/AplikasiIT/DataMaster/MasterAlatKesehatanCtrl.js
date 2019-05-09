////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterAlatKesehatanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisAlatKesehatan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisAlatKesehatan;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnJenisAlatKesehatan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisAlkes",
				"title": "jenis Alkes"
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
				"field": "kdJenisAlkes",
				"title": "kd Jenis Alkes"
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
				columns: $scope.columnJenisAlatKesehatan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.jenisAlkes = current.jenisAlkes;
	$scope.item.departemen = current.departemen;
	$scope.item.departemenId = current.departemenId;
	$scope.item.kdJenisAlkes = current.kdJenisAlkes;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=JenisAlatKesehatan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=JenisAlatKesehatan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "JenisAlatKesehatan",
		"listField": {
			"jenisAlkes": $scope.item.jenisAlkes,
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"kdJenisAlkes": $scope.item.kdJenisAlkes,
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
		"class": "JenisAlatKesehatan",
		"listField": {
			"jenisAlkes": $scope.item.jenisAlkes,
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"kdJenisAlkes": $scope.item.kdJenisAlkes,
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

	   var initw = function () {
 				IPSRSService.getFieldsMasterTable("get-data-master?className=AlatKesehatan", true).then(function(dat){
 					$scope.listDataMaster = dat.data.data.AlatKesehatan;

 					$scope.dataSourcew = new kendo.data.DataSource({
 						pageSize: 10,
 						data: $scope.listDataMaster,
 						autoSync: true

 					});

 				});
 			}
 			initw();




 			$scope.columnAlatKesehatan = [
 			{
 				"field": "No",
 				"title": "No"
 			},
 			{
 				"field": "kdAlkes",
 				"title": "kd Alkes"
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
 				"field": "jenisAlkes",
 				"title": "jenis Alkes"
 			},
 			{
 				"field": "jenisAlkesId",
 				"title": "jenis Alkes Id"
 			},
 			{
 				"field": "namaAlkes",
 				"title": "nama Alkes"
 			},
 			{
 				"field": "nomorAlamatAlkes",
 				"title": "nomor Alamat Alkes"
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
 				"template" : "<button class='btnEdit' ng-click='enableDataw()'>Enable</button>"+
 				"<button class='btnHapus' ng-click='disableDataw()'>Disable</button>"
 			}
 			];
 			$scope.mainGridOptionsw = { 
 				pageable: true,
 				columns: $scope.columnAlatKesehatan,
 				editable: "popup",
 				selectable: "row",
 				scrollable: false
 			};
////fungsi klik untuk edit
$scope.klikw = function(currentw){
	$scope.showEditw = true;
	$scope.currentw = currentw;
	$scope.item.kdAlkes = currentw.kdAlkes;
	$scope.item.departemen = currentw.departemen;
	$scope.item.departemenId = currentw.departemenId;
	$scope.item.jenisAlkes = currentw.jenisAlkes;
	$scope.item.jenisAlkesId = currentw.jenisAlkesId;
	$scope.item.namaAlkes = currentw.namaAlkes;
	$scope.item.nomorAlamatAlkes = currentw.nomorAlamatAlkes;
	$scope.item.id = currentw.id;
	$scope.item.noRec = currentw.noRec;
	$scope.item.reportDisplay = currentw.reportDisplay;
	$scope.item.kodeExternal = currentw.kodeExternal;
	$scope.item.namaExternal = currentw.namaExternal;
	$scope.item.statusEnabled = currentw.statusEnabled;
};
$scope.disableDataw=function(){
	IPSRSService.getClassMaster("delete-master-table?className=AlatKesehatan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initw();
	});
};
$scope.enableDataw=function(){
	IPSRSService.getClassMaster("delete-master-table?className=AlatKesehatan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initw();

	});
};

$scope.tambahw = function()
{
	var data = {
		"class": "AlatKesehatan",
		"listField": {
			"kdAlkes": $scope.item.kdAlkes,
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"jenisAlkes": $scope.item.jenisAlkes,
			"jenisAlkesId": $scope.item.jenisAlkesId,
			"namaAlkes": $scope.item.namaAlkes,
			"nomorAlamatAlkes": $scope.item.nomorAlamatAlkes,
			"id": $scope.item.id,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initw();
		$scope.item = {};
	});
}

$scope.editw = function()
{	
	var data = {
		"class": "AlatKesehatan",
		"listField": {
			"kdAlkes": $scope.item.kdAlkes,
			"departemen": $scope.item.departemen.id,
			"departemenId": $scope.item.departemenId,
			"jenisAlkes": $scope.item.jenisAlkes.id,
			"jenisAlkesId": $scope.item.jenisAlkesId,
			"namaAlkes": $scope.item.namaAlkes,
			"nomorAlamatAlkes": $scope.item.nomorAlamatAlkes,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initw();
	});
}
$scope.batalw = function () {
	$scope.showEditw = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisAlatKesehatan&select=id,jenisAlkes", true).then(function(dat){
	$scope.listjenisalkes= dat.data;
});	



}
]);
});
/////end