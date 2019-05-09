define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TypeProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'ManageLogistikPhp',
		function($q, $rootScope, $scope,IPSRSService, manageLogistikPhp) {
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var kdetype = "";
			loadDataCombo();
			var init = function () {
				$scope.isRouteLoading=true;
				manageLogistikPhp.getDataTableTransaksi("aset/get-type-barang", true).then(function(data) {
					var datas = data.data.datas;
					$scope.isRouteLoading=false;
					for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                    }
					$scope.dataSource = new kendo.data.DataSource({
						data: datas,
						pageSize: 10,
						autoSync: true

					});
				});
				// IPSRSService.getFieldsMasterTable("get-data-master?className=TypeProduk", true).then(function(dat){
				// 	$scope.listDataMaster = dat.data.data.TypeProduk;

					// $scope.dataSource = new kendo.data.DataSource({
					// 	pageSize: 10,
					// 	data: $scope.listDataMaster,
					// 	autoSync: true

					// });

				// });
			}
			init();

			function loadDataCombo(){
				manageLogistikPhp.getDataTableTransaksi("aset/get-combo-aset", true).then(function(data) {
					$scope.listdepartemen = data.data.departemen;
					$scope.listkelompokproduk = data.data.kelompokproduk;
					$scope.listmerkproduk = data.data.merkproduk;
				});
			}


			$scope.columnTypeProduk = [
			{
				"field": "no",
				"title": "No"
			},
			{
				"field": "id",
				"title": "Kde TypeProduk"
			},
			{
				"field": "typeproduk",
				"title": "Type Produk"
			},
			{
				"field": "reportdisplay",
				"title": "Report Display"
			},
			{
				"field": "kodeexternal",
				"title": "Kode External"
			},
			{
				"field": "namaexternal",
				"title": "Nama External"
			},
			{
				"field": "statusenabled",
				"title": "Status Enabled"
			},
			{
				"field": "namadepartemen",
				"title": "Departemen"
			},
			{
				"field": "kelompokproduk",
				"title": "Kelompok Produk"
			},
			{
				"field": "merkproduk",
				"title": "Merk Produk"
			},
			{
				"title" : "Action",
				"width" : "200px",
				"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnTypeProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.departemen = {id:current.deptid ,namadepartemen:current.namadepartemen};
	// $scope.item.departemenId = current.departemenId;
	$scope.item.kelompokProduk = {id:current.kdid ,kelompokProduk:current.mpid};
	// $scope.item.kelompokProdukId = current.kelompokProdukId;
	$scope.item.merkProduk = {id:current.mpid ,merkproduk:current.merkproduk};
	// $scope.item.merkProdukId = current.merkProdukId;
	$scope.item.kdTypeProduk = current.kdtypeproduk;
	$scope.item.qTypeProduk = current.qtypeproduk;
	$scope.item.typeProduk = current.typeproduk;
	kdetype = current.id;
	$scope.item.id = current.id;
	$scope.item.noRec = current.norec;
	$scope.item.reportDisplay = current.reportdisplay;
	$scope.item.kodeExternal = current.kodeexternal;
	$scope.item.namaExternal = current.namaexternal;
	$scope.item.statusEnabled = current.statusenabled;
};
$scope.disableData=function(){
	manageLogistikPhp.getDataTableTransaksi("aset/updatetypebarang-statusenabled?kdetype="+$scope.item.id+"&statusenabled=" + "false", true).then(function(data) {
		init();
	});
	// IPSRSService.getClassMaster("delete-master-table?className=TypeProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
	// 	init();
	// });  aset/updatetypebarang-statusenabled
};
$scope.enableData=function(){
	// IPSRSService.getClassMaster("delete-master-table?className=TypeProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
	// 	init();

	// });  aset/updatetypebarang-statusenabled
	manageLogistikPhp.getDataTableTransaksi("aset/updatetypebarang-statusenabled?kdetype="+$scope.item.id+"&statusenabled=" + "true", true).then(function(data) {
		init();
	});
};
//// save 
$scope.tambah = function()
{

	var departemen=null;
	if ($scope.item.departemen != undefined) {
		departemen = $scope.item.departemen.id;
	}

	var kelompokProduk=null;
	if ($scope.item.kelompokProduk != undefined) {
		kelompokProduk = $scope.item.kelompokProduk.id;
	}

	var merkProduk=null;
	if ($scope.item.merkProduk != undefined) {
		merkProduk = $scope.item.merkProduk.id;
	}

	var kdeexternal='';
	if ($scope.item.kodeExternal != null) {
		kdeexternal=$scope.item.kodeExternal;
	}

	var reportdisplay='';
	if ($scope.item.reportDisplay != null) {
		reportdisplay=$scope.item.reportDisplay;
	}

	var namaexternal='';
	if ($scope.item.namaExternal != null) {
		namaexternal=$scope.item.namaExternal;
	}

	var data = {

			kdetype: kdetype,
			kodeexternal : kdeexternal,
			namaexternal :namaexternal,
			reportdisplay : reportdisplay,
			typeproduk : $scope.item.typeProduk,
			kdtypeproduk : $scope.item.kdTypeProduk,
			// qtypeproduk : $scope.item.qTypeProduk,
			objectdepartemenfk : departemen,
			objectkelompokprodukfk : kelompokProduk,
			objectmerkprodukfk : merkProduk,
	}

	var objSave = {
        data:data,
    }

    manageLogistikPhp.simpantypeproduk(objSave).then(function(e) {
        $scope.item = {};
        init();
    })  

	// IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
	// 	console.log(JSON.stringify(e.data));
	// 	init();
	// 	$scope.item = {};
	// });
}
////edit
$scope.edit = function()
{	
	var departemen=null;
	if ($scope.item.departemen != undefined) {
		departemen = $scope.item.departemen.id
	}

	var kelompokProduk=null;
	if ($scope.item.kelompokProduk != undefined) {
		kelompokProduk = $scope.item.kelompokProduk.id
	}

	var merkProduk=null;
	if ($scope.item.merkProduk != undefined) {
		merkProduk = $scope.item.merkProduk.id
	}

	var kdeexternal='';
	if ($scope.item.kodeExternal != null) {
		kdeexternal=$scope.item.kodeExternal;
	}

	var reportdisplay='';
	if ($scope.item.reportDisplay != null) {
		reportdisplay=$scope.item.reportDisplay;
	}

	var namaexternal='';
	if ($scope.item.namaExternal != null) {
		namaexternal=$scope.item.namaExternal;
	}

	var data = {

			kdetype: kdetype,
			kodeexternal : kdeexternal,
			namaexternal :namaexternal,
			reportdisplay : reportdisplay,
			typeproduk : $scope.item.typeProduk,
			kdtypeproduk : $scope.item.kdTypeProduk,
			// qtypeproduk : $scope.item.qTypeProduk,
			objectdepartemenfk : departemen,
			objectkelompokprodukfk : kelompokProduk,
			objectmerkprodukfk : merkProduk,
	}

	// var data = {
	// 	"class": "TypeProduk",
	// 	"listField": {
	// 		"departemen": departemen,

	// 		"kelompokProduk": kelompokProduk,

	// 		"merkProduk": merkProduk,

	// 		"kdTypeProduk": $scope.item.kdTypeProduk,
	// 		"qTypeProduk": $scope.item.qTypeProduk,
	// 		"typeProduk": $scope.item.typeProduk,
	// 		"id": $scope.item.id,
	// 		"noRec": $scope.item.noRec,
	// 		"reportDisplay": $scope.item.reportDisplay,
	// 		"kodeExternal": $scope.item.kodeExternal,
	// 		"namaExternal": $scope.item.namaExternal,
	// 		"statusEnabled": $scope.item.statusEnabled
	// 	}
	// }

	var objSave = {
        data:data,
    }

    manageLogistikPhp.simpantypeproduk(objSave).then(function(e) {
        $scope.item = {};
        init();
    })  
	// IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
	// 	init();
	// });
}

$scope.batal = function () {
	$scope.showEdit = false;
	$scope.item = {};
}
// IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
// 	$scope.listdepartemen= dat.data;
// });
// IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
// 	$scope.listkelompokproduk= dat.data;
// });
// IPSRSService.getFieldListData("MerkProduk&select=id,namaExternal", true).then(function(dat){
// 	$scope.listmerkproduk= dat.data;
// });

}
]);
});

/////end