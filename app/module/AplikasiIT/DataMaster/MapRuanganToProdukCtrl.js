////header nya
define(['initialize'], function(initialize) {
	'use strict';

	initialize.controller('MapRuanganToProdukCtrl', ['$q', '$rootScope', '$scope', 'ManageKasir',
		function($q, $rootScope, $scope,manageKasir) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				// IPSRSService.getFieldsMasterTable("get-data-master?className=MapRuanganToProduk", true).then(function(dat){
				// 	$scope.listDataMaster = dat.data.data.MapRuanganToProduk;

				// 	$scope.dataSource = new kendo.data.DataSource({
				// 		pageSize: 10,
				// 		data: $scope.listDataMaster,
				// 		autoSync: true

				// 	});

				// });
			}
			init();



///colom tabel

$scope.columnGrid = [
{
	"field": "no",
	"title": "No",
	"width": "30px"
},
{
	"field": "namaproduk",
	"title": "Nama Produk",
	"width": "300px"
},
{
	"field": "statusenabled",
	"title": "Status Enabled",
	"width": "80px"
},
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
	"<button class='btnHapus' ng-click='disableData()'>Disable</button>",
	"width": "80px"
}
];
$scope.mainGridOptions = { 
	pageable: true,
	columns: $scope.columnGrid,
	editable: "popup",
	selectable: "row",
	scrollable: false
};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.produk = current.produk;

	$scope.item.ruangan = current.ruangan;

	$scope.item.status = current.status;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	// IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
	// 	init();
	// });
};
$scope.enableData=function(){
	// IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
	// 	init();

	// });
};
//// save 
$scope.tambah = function()
{
	var data = {
		"class": "MapRuanganToProduk",
		"listField": {
			"produk": $scope.item.produk,

			"ruangan": $scope.item.ruangan,

			"status": $scope.item.status,
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
		"class": "MapRuanganToProduk",
		"listField": {
			"produk": $scope.item.produk,

			"ruangan": $scope.item.ruangan,

			"status": $scope.item.status,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	// IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
	// 	init();
	// });
}
$scope.batal = function () {
	$scope.showEdit = false;
	$scope.item = {};
}
$scope.cari = function(){
	var idruangan = '';
	if ($scope.item.ruangan != undefined) {
		idruangan = $scope.item.ruangan.id;
	}
	manageKasir.getDataTableMaster("map/get-mapruangantoproduk?objectruanganfk=" + idruangan).then(function(dat){
		for (var i = 0; i < dat.length; i++) {
			dat[i].no = i+1;
		}
		$scope.dataSource = dat;
	});
}
manageKasir.getDataTableMaster("map/get-master?table=ruangan").then(function(dat){
	$scope.listruangan = dat
});
manageKasir.getDataTableMaster("map/get-master?table=departemen").then(function(dat){
	$scope.listDepartemen = dat
});
// IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
// 	$scope.listproduk= dat.data;
// });
// IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
// 	$scope.listruangan= dat.data;
// });
/////end
}
]);
});

