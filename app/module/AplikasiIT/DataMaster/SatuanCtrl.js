////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('SatuanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanKecil", true).then(function(dat){
$scope.listDataMaster = dat.data.data.SatuanKecil;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnSatuanKecil = [
{
"field": "No",
"title": "No"
},
{
"field": "asalProduk",
"title": "asal Produk"
},
{
"field": "kdAsalProduk",
"title": "kd Asal Produk"
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
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "qAsalProduk",
"title": "q Asal Produk"
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
 columns: $scope.columnSatuanKecil,
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
$scope.item.kelompokProduk = current.kelompokProduk;
$scope.item.kelompokProdukId = current.kelompokProdukId;
$scope.item.kdSatuanKecil = current.kdSatuanKecil;
$scope.item.qSatuanKecil = current.qSatuanKecil;
$scope.item.satuanKecil = current.satuanKecil;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanKecil&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanKecil&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "SatuanKecil",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"kdSatuanKecil": $scope.item.kdSatuanKecil,
"qSatuanKecil": $scope.item.qSatuanKecil,
"satuanKecil": $scope.item.satuanKecil,
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
 "class": "SatuanKecil",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"kdSatuanKecil": $scope.item.kdSatuanKecil,
"qSatuanKecil": $scope.item.qSatuanKecil,
"satuanKecil": $scope.item.satuanKecil,
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
IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
$scope.listkelompokproduk= dat.data;
});
 var initw = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanStandar", true).then(function(dat){
$scope.listDataMaster = dat.data.data.SatuanStandar;
                                    					
$scope.dataSourcew = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initw();



$scope.columnSatuanStandar = [
{
"field": "No",
"title": "No"
},
{
"field": "asalProduk",
"title": "asal Produk"
},
{
"field": "kdAsalProduk",
"title": "kd Asal Produk"
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
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "qAsalProduk",
"title": "q Asal Produk"
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
 columns: $scope.columnSatuanStandar,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikw = function(currentw){
$scope.showEditw = true;
$scope.currentw = currentw;
$scope.item.departemen = currentw.departemen;
$scope.item.departemenId = currentw.departemenId;
$scope.item.kelompokProduk = currentw.kelompokProduk;
$scope.item.kelompokProdukId = currentw.kelompokProdukId;
$scope.item.satuanStandarHead = currentw.satuanStandarHead;
$scope.item.satuanStandarId = currentw.satuanStandarId;
$scope.item.QtyKemasan = currentw.QtyKemasan;
$scope.item.satuanStandar = currentw.satuanStandar;
$scope.item.id = currentw.id;
$scope.item.noRec = currentw.noRec;
$scope.item.reportDisplay = currentw.reportDisplay;
$scope.item.kodeExternal = currentw.kodeExternal;
$scope.item.namaExternal = currentw.namaExternal;
$scope.item.statusEnabled = currentw.statusEnabled;
};
$scope.disableDataw=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanStandar&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initw();
 });
 };
$scope.enableDataw=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanStandar&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initw();

	});
};
//// save 
$scope.tambahw = function()
 {
var data = {
	"class": "SatuanStandar",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"satuanStandarHead": $scope.item.satuanStandarHead,
"satuanStandarId": $scope.item.satuanStandarId,
"QtyKemasan": $scope.item.QtyKemasan,
"satuanStandar": $scope.item.satuanStandar,
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
////edit
 $scope.editw = function()
  {	
   var data = {
 "class": "SatuanStandar",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"satuanStandarHead": $scope.item.satuanStandarHead,
"satuanStandarId": $scope.item.satuanStandarId,
"QtyKemasan": $scope.item.QtyKemasan,
"satuanStandar": $scope.item.satuanStandar,
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
IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
$scope.listkelompokproduk= dat.data;
});
IPSRSService.getFieldListData("SatuanStandar&select=id,satuanStandar", true).then(function(dat){
$scope.listsatuanstandarhead= dat.data;
});



 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanWaktu", true).then(function(dat){
$scope.listDataMaster = dat.data.data.SatuanWaktu;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();



$scope.columnSatuanWaktu = [
{
"field": "No",
"title": "No"
},
{
"field": "asalProduk",
"title": "asal Produk"
},
{
"field": "kdAsalProduk",
"title": "kd Asal Produk"
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
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "qAsalProduk",
"title": "q Asal Produk"
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
$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnSatuanWaktu,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.kdSatuanWaktu = currentx.kdSatuanWaktu;
$scope.item.qSatuanWaktu = currentx.qSatuanWaktu;
$scope.item.satuanWaktu = currentx.satuanWaktu;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};
$scope.disableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanWaktu&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanWaktu&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};
//// save 
$scope.tambahx = function()
 {
var data = {
	"class": "SatuanWaktu",
	"listField": {
"kdSatuanWaktu": $scope.item.kdSatuanWaktu,
"qSatuanWaktu": $scope.item.qSatuanWaktu,
"satuanWaktu": $scope.item.satuanWaktu,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initx();
$scope.item = {};
 });
  }
////edit
 $scope.editx = function()
  {	
   var data = {
 "class": "SatuanWaktu",
	"listField": {
"kdSatuanWaktu": $scope.item.kdSatuanWaktu,
"qSatuanWaktu": $scope.item.qSatuanWaktu,
"satuanWaktu": $scope.item.satuanWaktu,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initx();
});
}
$scope.batalx = function () {
$scope.showEditx = false;
$scope.item = {};
}

var inity = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanHasil", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.SatuanHasil;
					
					$scope.dataSourcey = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			inity();




			$scope.columnSatuanHasil = [
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
				"field": "kdSatuanHasil",
				"title": "kd Satuan Hasil"
			},
			{
				"field": "qSatuanHasil",
				"title": "q Satuan Hasil"
			},
			{
				"field": "satuanHasil",
				"title": "satuan Hasil"
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
				"template" : "<button class='btnEdit' ng-click='enableDatay()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatay()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsy = { 
				pageable: true,
				columns: $scope.columnSatuanHasil,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.kliky = function(currenty){
	$scope.showEdityy = true;
	$scope.currenty = currenty;
	$scope.item.departemen = currenty.departemen;
	$scope.item.departemenId = currenty.departemenId;
	$scope.item.kdSatuanHasil = currenty.kdSatuanHasil;
	$scope.item.qSatuanHasil = currenty.qSatuanHasil;
	$scope.item.satuanHasil = currenty.satuanHasil;
	$scope.item.id = currenty.id;
	$scope.item.noRec = currenty.noRec;
	$scope.item.reportDisplay = currenty.reportDisplay;
	$scope.item.kodeExternal = currenty.kodeExternal;
	$scope.item.namaExternal = currenty.namaExternal;
	$scope.item.statusEnabled = currenty.statusEnabled;
};
$scope.disableDatay=function(){
	IPSRSService.getClassMaster("delete-master-table?className=SatuanHasil&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		inity();
	});
};
$scope.enableDatay=function(){
	IPSRSService.getClassMaster("delete-master-table?className=SatuanHasil&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		inity();

	});
};

$scope.tambahy = function()
{
	var data = {
		"class": "SatuanHasil",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"kdSatuanHasil": $scope.item.kdSatuanHasil,
			"qSatuanHasil": $scope.item.qSatuanHasil,
			"satuanHasil": $scope.item.satuanHasil, 
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		inity();
		$scope.item = {};
	});
}

$scope.edity = function()
{	
	var data = {
		"class": "SatuanHasil",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"kdSatuanHasil": $scope.item.kdSatuanHasil,
			"qSatuanHasil": $scope.item.qSatuanHasil,
			"satuanHasil": $scope.item.satuanHasil,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		inity();
	});
}
$scope.bataly = function () {
	$scope.showEdity = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});

var initp = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanAnggaran", true).then(function(dat){
$scope.listDataMaster = dat.data.data.SatuanAnggaran;
                                    					
$scope.dataSourcep = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initp();




$scope.columnSatuanAnggaran = [
{
"field": "No",
"title": "No"
},
{
"field": "kdSatuanAnggaran",
"title": "kd Satuan Anggaran"
},
{
"field": "qSatuanAnggaran",
"title": "q Satuan Anggaran"
},
{
"field": "satuanAnggaran",
"title": "satuan Anggaran"
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
 columns: $scope.columnSatuanAnggaran,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikp = function(currentp){
$scope.showEditp = true;
$scope.currentp = currentp;
$scope.item.kdSatuanAnggaran = currentp.kdSatuanAnggaran;
$scope.item.qSatuanAnggaran = currentp.qSatuanAnggaran;
$scope.item.satuanAnggaran = currentp.satuanAnggaran;
$scope.item.id = currentp.id;
$scope.item.noRec = currentp.noRec;
$scope.item.reportDisplay = currentp.reportDisplay;
$scope.item.kodeExternal = currentp.kodeExternal;
$scope.item.namaExternal = currentp.namaExternal;
$scope.item.statusEnabled = currentp.statusEnabled;
};
$scope.disableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanAnggaran&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initp();
 });
 };
$scope.enableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=SatuanAnggaran&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initp();

	});
};

$scope.tambahp = function()
 {
var data = {
	"class": "SatuanAnggaran",
	"listField": {
"kdSatuanAnggaran": $scope.item.kdSatuanAnggaran,
"qSatuanAnggaran": $scope.item.qSatuanAnggaran,
"satuanAnggaran": $scope.item.satuanAnggaran,
"id": $scope.item.id,
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
 "class": "SatuanAnggaran",
	"listField": {
"kdSatuanAnggaran": $scope.item.kdSatuanAnggaran,
"qSatuanAnggaran": $scope.item.qSatuanAnggaran,
"satuanAnggaran": $scope.item.satuanAnggaran,
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

/////end
}
]);
});
