////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokHargaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisKomponenHarga", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisKomponenHarga;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisKomponenHarga = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisKomponenHarga",
"title": "jenis Komponen Harga"
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
"field": "kdJenisKomponenHarga",
"title": "kd Jenis Komponen Harga"
},
{
"field": "jenisKomponenHargaHead",
"title": "jenis Komponen Harga Head"
},
{
"field": "jenisKomponenHargaHeadId",
"title": "jenis Komponen Harga Head Id"
},
{
"field": "noUrut",
"title": "no Urut"
},
{
"field": "qJenisKomponenHarga",
"title": "q Jenis Komponen Harga"
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
 columns: $scope.columnJenisKomponenHarga,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisKomponenHarga = current.jenisKomponenHarga;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kdJenisKomponenHarga = current.kdJenisKomponenHarga;
$scope.item.jenisKomponenHargaHead = current.jenisKomponenHargaHead;
$scope.item.jenisKomponenHargaHeadId = current.jenisKomponenHargaHeadId;
$scope.item.noUrut = current.noUrut;
$scope.item.qJenisKomponenHarga = current.qJenisKomponenHarga;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKomponenHarga&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKomponenHarga&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisKomponenHarga",
	"listField": {
"jenisKomponenHarga": $scope.item.jenisKomponenHarga,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisKomponenHarga": $scope.item.kdJenisKomponenHarga,
"jenisKomponenHargaHead": $scope.item.jenisKomponenHargaHead,
"jenisKomponenHargaHeadId": $scope.item.jenisKomponenHargaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisKomponenHarga": $scope.item.qJenisKomponenHarga,
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

 $scope.edit = function()
  {	
   var data = {
 "class": "JenisKomponenHarga",
	"listField": {
"jenisKomponenHarga": $scope.item.jenisKomponenHarga,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisKomponenHarga": $scope.item.kdJenisKomponenHarga,
"jenisKomponenHargaHead": $scope.item.jenisKomponenHargaHead,
"jenisKomponenHargaHeadId": $scope.item.jenisKomponenHargaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisKomponenHarga": $scope.item.qJenisKomponenHarga,
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
IPSRSService.getFieldListData("JenisKomponenHarga&select=id,jenisKomponenHarga", true).then(function(dat){
$scope.listjeniskomponenhargahead= dat.data;
});

 var inith = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenHarga", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KomponenHarga;
                                    					
$scope.dataSourceh = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inith();



$scope.columnKomponenHarga = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "golonganProduk",
				"title": "golongan Produk"
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
				"field": "kdGolonganProduk",
				"title": "kd Golongan Produk"
			},
			{
				"field": "kelompokProduk",
				"title": "kelompok Produk"
			},
			{
				"field": "kelompokProdukId",
				"title": "kelompok Produk Id"
			},
			{
				"field": "qGolonganProduk",
				"title": "q Golongan Produk"
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
	"template" : "<button class='btnEdit' ng-click='enableDatah()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatah()'>Disable</button>"
}
];
$scope.mainGridOptionsh = { 
 pageable: true,
 columns: $scope.columnKomponenHarga,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikh = function(currenth){
$scope.showEdith = true;
$scope.currenth = currenth;
$scope.item.departemen = currenth.departemen;
$scope.item.departemenId = currenth.departemenId;
$scope.item.jenisKomponenHarga = currenth.jenisKomponenHarga;
$scope.item.jenisKomponenHargaId = currenth.jenisKomponenHargaId;
$scope.item.kdKomponenHarga = currenth.kdKomponenHarga;
$scope.item.produkPK = currenth.produkPK;
$scope.item.produkPKId = currenth.produkPKId;
$scope.item.komponenHarga = currenth.komponenHarga;
$scope.item.nilaiNormal = currenth.nilaiNormal;
$scope.item.noUrut = currenth.noUrut;
$scope.item.qKomponenHarga = currenth.qKomponenHarga;
$scope.item.id = currenth.id;
$scope.item.noRec = currenth.noRec;
$scope.item.reportDisplay = currenth.reportDisplay;
$scope.item.kodeExternal = currenth.kodeExternal;
$scope.item.namaExternal = currenth.namaExternal;
$scope.item.statusEnabled = currenth.statusEnabled;
};
$scope.disableDatah=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenHarga&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 inith();
 });
 };
$scope.enableDatah=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenHarga&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 inith();

	});
};
//// save 
$scope.tambahh = function()
 {
var data = {
	"class": "KomponenHarga",
	"listField": {
"departemen": $scope.item.departemen,

"jenisKomponenHarga": $scope.item.jenisKomponenHarga,

"kdKomponenHarga": $scope.item.kdKomponenHarga,
"produkPK": $scope.item.produkPK,

"komponenHarga": $scope.item.komponenHarga,
"nilaiNormal": $scope.item.nilaiNormal,
"noUrut": $scope.item.noUrut,
"qKomponenHarga": $scope.item.qKomponenHarga,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
inith();
$scope.item = {};
 });
  }
////edit
 $scope.edith = function()
  {	
   var data = {
 "class": "KomponenHarga",
	"listField": {
"departemen": $scope.item.departemen,

"jenisKomponenHarga": $scope.item.jenisKomponenHarga,

"kdKomponenHarga": $scope.item.kdKomponenHarga,
"produkPK": $scope.item.produkPK,

"komponenHarga": $scope.item.komponenHarga,
"nilaiNormal": $scope.item.nilaiNormal,
"noUrut": $scope.item.noUrut,
"qKomponenHarga": $scope.item.qKomponenHarga,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
inith();
});
}
$scope.batalh = function () {
$scope.showEdith = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisKomponenHarga&select=id,jenisKomponenHarga", true).then(function(dat){
$scope.listjeniskomponenharga= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
$scope.listprodukpk= dat.data;
});



var initn = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenHargaR", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenHargaR;
					
					$scope.dataSourcen = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initn();




			$scope.columnKomponenHargaR = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "namaKomponenHargaR",
				"title": "nama Komponen Harga R"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qKomponenHargaR",
				"title": "q Komponen Harga R"
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
				"template" : "<button class='btnEdit' ng-click='enableDatan()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatan()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsn = { 
				pageable: true,
				columns: $scope.columnKomponenHargaR,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikn = function(currentn){
	$scope.showEditn = true;
	$scope.currentn = currentn;
	$scope.item.namaKomponenHargaR = currentn.namaKomponenHargaR;
	$scope.item.noUrut = currentn.noUrut;
	$scope.item.qKomponenHargaR = currentn.qKomponenHargaR;
	$scope.item.id = currentn.id;
	$scope.item.noRec = currentn.noRec;
	$scope.item.reportDisplay = currentn.reportDisplay;
	$scope.item.kodeExternal = currentn.kodeExternal;
	$scope.item.namaExternal = currentn.namaExternal;
	$scope.item.statusEnabled = currentn.statusEnabled;
};
$scope.disableDatan=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenHargaR&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initn();
	});
};
$scope.enableDatan=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenHargaR&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initn();

	});
};

$scope.tambahn = function()
{
	var data = {
		"class": "KomponenHargaR",
		"listField": {
			"namaKomponenHargaR": $scope.item.namaKomponenHargaR,
			"noUrut": $scope.item.noUrut,
			"qKomponenHargaR": $scope.item.qKomponenHargaR,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initn();
		$scope.item = {};
	});
}

$scope.editn = function()
{	
	var data = {
		"class": "KomponenHargaR",
		"listField": {
			"namaKomponenHargaR": $scope.item.namaKomponenHargaR,
			"noUrut": $scope.item.noUrut,
			"qKomponenHargaR": $scope.item.qKomponenHargaR,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initn();
	});
}
$scope.bataln = function () {
	$scope.showEditn = false;
	$scope.item = {};
}

var initp = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenHargaDetailR", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenHargaDetailR;
					
					$scope.dataSourcep = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initp();




			$scope.columnKomponenHargaDetailR = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "namaKomponenHargaDetailR",
				"title": "nama Komponen Harga Detail R"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qKomponenHargaDetailR",
				"title": "q Komponen Harga Detail R"
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
				"template" : "<button class='btnEdit' ng-click='enableDatap()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatap()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsp = { 
				pageable: true,
				columns: $scope.columnKomponenHargaDetailR,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikp = function(currentp){
	$scope.showEditp = true;
	$scope.currentp = currentp;
	$scope.item.namaKomponenHargaDetailR = currentp.namaKomponenHargaDetailR;
	$scope.item.noUrut = currentp.noUrut;
	$scope.item.qKomponenHargaDetailR = currentp.qKomponenHargaDetailR;
	$scope.item.id = currentp.id;
	$scope.item.noRec = currentp.noRec;
	$scope.item.reportDisplay = currentp.reportDisplay;
	$scope.item.kodeExternal = currentp.kodeExternal;
	$scope.item.namaExternal = currentp.namaExternal;
	$scope.item.statusEnabled = currentp.statusEnabled;
};
$scope.disableDatap=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenHargaDetailR&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initp();
	});
};
$scope.enableDatap=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenHargaDetailR&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initp();

	});
};

$scope.tambahp = function()
{
	var data = {
		"class": "KomponenHargaDetailR",
		"listField": {
			"namaKomponenHargaDetailR": $scope.item.namaKomponenHargaDetailR,
			"noUrut": $scope.item.noUrut,
			"qKomponenHargaDetailR": $scope.item.qKomponenHargaDetailR,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initp();
		$scope.item = {};
	});
}

$scope.editp = function()
{	
	var data = {
		"class": "KomponenHargaDetailR",
		"listField": {
			"namaKomponenHargaDetailR": $scope.item.namaKomponenHargaDetailR,
			"noUrut": $scope.item.noUrut,
			"qKomponenHargaDetailR": $scope.item.qKomponenHargaDetailR,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initp();
	});
}
$scope.batalp = function () {
	$scope.showEditp = false;
	$scope.item = {};





}

}
]);
});
/////end
