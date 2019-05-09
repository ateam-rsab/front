define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('DaftarPelayananMedikCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapRuanganToDetailJenisProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapRuanganToDetailJenisProduk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnDepartemen = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "alamatEmail",
				"title": "alamat Email"
			},
			{
				"field": "faksimile",
				"title": "faksimile"
			},
			{
				"field": "fixedPhone",
				"title": "fixed Phone"
			},
			{
				"field": "kdDepartemen",
				"title": "kd Departemen"
			},
			{
				"field": "jenisPerawatan",
				"title": "jenis Perawatan"
			},
			{
				"field": "jenisPerawatanId",
				"title": "jenis Perawatan Id"
			},
			{
				"field": "pegawaiKepala",
				"title": "pegawai Kepala"
			},
			{
				"field": "pegawaiKepalaId",
				"title": "pegawai Kepala Id"
			},
			{
				"field": "mobilePhone",
				"title": "mobile Phone"
			},
			{
				"field": "namaDepartemen",
				"title": "nama Departemen"
			},
			{
				"field": "prefixNoAntrian",
				"title": "prefix No Antrian"
			},
			{
				"field": "qDepartemen",
				"title": "q Departemen"
			},
			{
				"field": "website",
				"title": "website"
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
 columns: $scope.columnMapRuanganToDetailJenisProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.detailJenisProduk = current.detailJenisProduk;

$scope.item.ruangan = current.ruangan;

$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToDetailJenisProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToDetailJenisProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MapRuanganToDetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,

"ruangan": $scope.item.ruangan,

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
 "class": "MapRuanganToDetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,

"ruangan": $scope.item.ruangan,

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
IPSRSService.getFieldListData("DetailJenisProduk&select=id,namaExternal", true).then(function(dat){
$scope.listdetailjenisproduk= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});

 var initp = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapRuanganToProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapRuanganToProduk;
                                    					
$scope.dataSourcep = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initp();



///colom tabel

$scope.columnDepartemen = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "alamatEmail",
				"title": "alamat Email"
			},
			{
				"field": "faksimile",
				"title": "faksimile"
			},
			{
				"field": "fixedPhone",
				"title": "fixed Phone"
			},
			{
				"field": "kdDepartemen",
				"title": "kd Departemen"
			},
			{
				"field": "jenisPerawatan",
				"title": "jenis Perawatan"
			},
			{
				"field": "jenisPerawatanId",
				"title": "jenis Perawatan Id"
			},
			{
				"field": "pegawaiKepala",
				"title": "pegawai Kepala"
			},
			{
				"field": "pegawaiKepalaId",
				"title": "pegawai Kepala Id"
			},
			{
				"field": "mobilePhone",
				"title": "mobile Phone"
			},
			{
				"field": "namaDepartemen",
				"title": "nama Departemen"
			},
			{
				"field": "prefixNoAntrian",
				"title": "prefix No Antrian"
			},
			{
				"field": "qDepartemen",
				"title": "q Departemen"
			},
			{
				"field": "website",
				"title": "website"
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
 columns: $scope.columnMapRuanganToProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikp = function(currentp){
$scope.showEditp = true;
$scope.currentp = currentp;
$scope.item.produk = currentp.produk;

$scope.item.ruangan = currentp.ruangan;

$scope.item.status = currentp.status;
$scope.item.id = currentp.id;
$scope.item.noRec = currentp.noRec;
$scope.item.reportDisplay = currentp.reportDisplay;
$scope.item.kodeExternal = currentp.kodeExternal;
$scope.item.namaExternal = currentp.namaExternal;
$scope.item.statusEnabled = currentp.statusEnabled;
};
$scope.disableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initp();
 });
 };
$scope.enableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initp();

	});
};
//// save 
$scope.tambahp = function()
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
initp();
$scope.item = {};
 });
  }
////edit
 $scope.editp = function()
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
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initp();
});
}
$scope.batalp = function () {
$scope.showEditp = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listproduk= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});

var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapRuanganToKelas", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapRuanganToKelas;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();



$scope.columnMapRuanganToKelas = [
{
"field": "No",
"title": "No"
},
{
"field": "kelas",
"title": "kelas"
},
{
"field": "kelasId",
"title": "kelas Id"
},
{
"field": "ruangan",
"title": "ruangan"
},
{
"field": "ruanganId",
"title": "ruangan Id"
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
	"template" : "<button class='btnEdit' ng-click='enableDatax()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatax()'>Disable</button>"
}
];
$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnMapRuanganToKelas,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.kelas = currentx.kelas;
$scope.item.kelasId = currentx.kelasId;
$scope.item.ruangan = currentx.ruangan;
$scope.item.ruanganId = currentx.ruanganId;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};
$scope.disableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToKelas&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToKelas&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};
//// save 
$scope.tambahx = function()
 {
var data = {
	"class": "MapRuanganToKelas",
	"listField": {
"kelas": $scope.item.kelas,

"ruangan": $scope.item.ruangan,

"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
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
 "class": "MapRuanganToKelas",
	"listField": {
"kelas": $scope.item.kelas,

"ruangan": $scope.item.ruangan,

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
IPSRSService.getFieldListData("Kelas&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});

}
		]);
});