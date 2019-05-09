define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DataPendukungLaboratoriumCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q,$rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=BahanSample", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.BahanSample;
                    var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"kdBahanSample":e.kdBahanSample,
								"satuanKecilId":e.satuanKecilId,
								"namaBahanSample":e.namaBahanSample,
								"qBahanSample":e.qBahanSample,
								"id":e.id,
								"reportDisplay":e.reportDisplay,
								"kodeExternal":e.kodeExternal,
								"namaExternal":e.namaExternal,
								"statusEnabled":e.statusEnabled,
						 		"no": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});
					$scope.source = data;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.source,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnBahanSample = [
			{
				"field": "no",
				"title": "No"
			},
			{
				"field": "kdBahanSample",
				"title": "kd Bahan Sample"
			},
			{
				"field": "satuanKecilId",
				"title": "satuan Kecil Id"
			},
			{
				"field": "namaBahanSample",
				"title": "nama Bahan Sample"
			},
			{
				"field": "qBahanSample",
				"title": "q Bahan Sample"
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
				columns: $scope.columnBahanSample,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.kdBahanSample = current.kdBahanSample;
	$scope.item.satuanKecil = current.satuanKecil;
	
	$scope.item.namaBahanSample = current.namaBahanSample;
	$scope.item.qBahanSample = current.qBahanSample;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
	for (var x=0;x<  $scope.listsatuanKecil.length ;x++){
					if ($scope.listsatuanKecil[x].id === current.satuanKecilId){
						$scope.item.satuanKecil = $scope.listsatuanKecil[x];
						return;
					}
				}
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=BahanSample&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=BahanSample&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "BahanSample",
		"listField": {
			"kdBahanSample": $scope.item.kdBahanSample,
			"satuanKecil": $scope.item.satuanKecil,
			
			"namaBahanSample": $scope.item.namaBahanSample,
			"qBahanSample": $scope.item.qBahanSample,
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
		"class": "BahanSample",
		"listField": {
			"kdBahanSample": $scope.item.kdBahanSample,
			"satuanKecil": $scope.item.satuanKecil,
			
			"namaBahanSample": $scope.item.namaBahanSample,
			"qBahanSample": $scope.item.qBahanSample,
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
IPSRSService.getFieldListData("SatuanKecil&select=id,reportDisplay", true).then(function(dat){
	$scope.listsatuanKecil= dat.data;
});

var initv = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPemeriksaan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPemeriksaan;
 var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"name":e.name,
								"reportDisplay":e.reportDisplay,
								"kodeExternal":e.kodeExternal,
								"namaExternal":e.namaExternal,
								"statusEnabled":e.statusEnabled,
						 		"no": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});
					$scope.source = data;                                    					
$scope.dataSourcev = new kendo.data.DataSource({
pageSize: 10,
data: $scope.source,
autoSync: true

});

});
}
initv();



$scope.columnJenisPemeriksaan = [
{
"field": "no",
"title": "No"
},
{
"field": "name",
"title": "name"
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
	"template" : "<button class='btnEdit' ng-click='enableDatav()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatav()'>Disable</button>"
}
];
$scope.mainGridOptionsv = { 
 pageable: true,
 columns: $scope.columnJenisPemeriksaan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikv = function(currentv){
$scope.showEditv = true;
$scope.currentv = currentv;
$scope.item.name = currentv.name;
$scope.item.id = currentv.id;
$scope.item.noRec = currentv.noRec;
$scope.item.reportDisplay = currentv.reportDisplay;
$scope.item.kodeExternal = currentv.kodeExternal;
$scope.item.namaExternal = currentv.namaExternal;
$scope.item.statusEnabled = currentv.statusEnabled;
};
$scope.disableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPemeriksaan&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 initv();
 });
 };
$scope.enableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPemeriksaan&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 initv();

	});
};
//// save 
$scope.tambahv = function()
 {
var data = {
	"class": "JenisPemeriksaan",
	"listField": {
"name": $scope.item.name,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initv();
$scope.item = {};
 });
  }
////edit
 $scope.editv = function()
  {	
   var data = {
 "class": "JenisPemeriksaan",
	"listField": {
"name": $scope.item.name,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initv();
});
}
$scope.batalv = function () {
$scope.showEditv = false;
$scope.item = {};
}

var initp = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanHasil", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.SatuanHasil;
					
					$scope.dataSourcep = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initp();

IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});


			$scope.columnSatuanHasil = [
			{
				"field": "No",
				"title": "No"
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
				"template" : "<button class='btnEdit' ng-click='enableDatap()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatap()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsp = { 
				pageable: true,
				columns: $scope.columnSatuanHasil,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikp = function(currentp){
	$scope.showEditp = true;
	$scope.currentp = currentp;
	//$scope.item.departemen = currentp.departemen;
	//$scope.item.departemenId = currentp.departemenId;
	$scope.item.kdSatuanHasil = currentp.kdSatuanHasil;
	$scope.item.qSatuanHasil = currentp.qSatuanHasil;
	$scope.item.satuanHasil = currentp.satuanHasil;
	$scope.item.id = currentp.id;
	$scope.item.noRec = currentp.noRec;
	$scope.item.reportDisplay = currentp.reportDisplay;
	$scope.item.kodeExternal = currentp.kodeExternal;
	$scope.item.namaExternal = currentp.namaExternal;
	$scope.item.statusEnabled = currentp.statusEnabled;
	for (var y=0;y< $scope.listdepartemen.length ;y++){
	if ($scope.listdepartemen[y].id === currentp.departemenId){
	$scope.item.departemen = $scope.listdepartemen[y];
	return;
		}
	}
};
$scope.disableDatap=function(){
	IPSRSService.getClassMaster("delete-master-table?className=SatuanHasil&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initp();
	});
};
$scope.enableDatap=function(){
	IPSRSService.getClassMaster("delete-master-table?className=SatuanHasil&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initp();

	});
};

$scope.tambahp = function()
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
		initp();
		$scope.item = {};
	});
}

$scope.editp = function()
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
		initp();
	});
}
$scope.batalp = function () {
	$scope.showEditp = false;
	$scope.item = {};
}



var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokUmur", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KelompokUmur;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();




$scope.columnKelompokUmur = [
{
"field": "No",
"title": "No"
},
{
"field": "kdKelompokUmur",
"title": "kd Kelompok Umur"
},
{
"field": "kelompokUmur",
"title": "kelompok Umur"
},
{
"field": "qKelompokUmur",
"title": "q Kelompok Umur"
},
{
"field": "statusUmur",
"title": "status Umur"
},
{
"field": "umurMax",
"title": "umur Max"
},
{
"field": "umurMin",
"title": "umur Min"
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
	"template" : "<button class='btnEdit' ng-click='enableDatax()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatax()'>Disable</button>"
}
];
$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnKelompokUmur,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.kdKelompokUmur = currentx.kdKelompokUmur;
$scope.item.kelompokUmur = currentx.kelompokUmur;
$scope.item.qKelompokUmur = currentx.qKelompokUmur;
$scope.item.statusUmur = currentx.statusUmur;
$scope.item.umurMax = currentx.umurMax;
$scope.item.umurMin = currentx.umurMin;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};
$scope.disableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokUmur&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokUmur&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};

$scope.tambahx = function()
 {
var data = {
	"class": "KelompokUmur",
	"listField": {
"kdKelompokUmur": $scope.item.kdKelompokUmur,
"kelompokUmur": $scope.item.kelompokUmur,
"qKelompokUmur": $scope.item.qKelompokUmur,
"statusUmur": $scope.item.statusUmur,
"umurMax": $scope.item.umurMax,
"umurMin": $scope.item.umurMin,
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

 $scope.editx = function()
  {	
   var data = {
 "class": "KelompokUmur",
	"listField": {
"kdKelompokUmur": $scope.item.kdKelompokUmur,
"kelompokUmur": $scope.item.kelompokUmur,
"qKelompokUmur": $scope.item.qKelompokUmur,
"statusUmur": $scope.item.statusUmur,
"umurMax": $scope.item.umurMax,
"umurMin": $scope.item.umurMin,
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
				IPSRSService.getFieldsMasterTable("get-data-master?className=MetodePemeriksaanPenunjang", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MetodePemeriksaanPenunjang;
					
					$scope.dataSourcey = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			inity();




			$scope.columnMetodePemeriksaanPenunjang = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "departemenId",
				"title": "departemen Id"
			},
			{
				"field": "kdMetodePeriksa",
				"title": "kd Metode Periksa"
			},
			{
				"field": "keteranganMetode",
				"title": "keterangan Metode"
			},
			{
				"field": "metodePeriksa",
				"title": "metode Periksa"
			},
			{
				"field": "qMetodePeriksa",
				"title": "q Metode Periksa"
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
				columns: $scope.columnMetodePemeriksaanPenunjang,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.kliky = function(currenty){
	$scope.showEdity = true;
	$scope.currenty = currenty;
	$scope.item.departemen = currenty.departemen;
	$scope.item.departemenId = currenty.departemenId;
	$scope.item.kdMetodePeriksa = currenty.kdMetodePeriksa;
	$scope.item.keteranganMetode = currenty.keteranganMetode;
	$scope.item.metodePeriksa = currenty.metodePeriksa;
	$scope.item.qMetodePeriksa = currenty.qMetodePeriksa;
	$scope.item.id = currenty.id;
	$scope.item.noRec = currenty.noRec;
	$scope.item.reportDisplay = currenty.reportDisplay;
	$scope.item.kodeExternal = currenty.kodeExternal;
	$scope.item.namaExternal = currenty.namaExternal;
	$scope.item.statusEnabled = currenty.statusEnabled;
	for (var y=0;y< $scope.listdepartemen.length ;y++){
	if ($scope.listdepartemen[y].id === currenty.departemenId){
	$scope.item.departemen = $scope.listdepartemen[y];
	return;
		}
	}
};
$scope.disableDatay=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MetodePemeriksaanPenunjang&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		inity();
	});
};
$scope.enableDatay=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MetodePemeriksaanPenunjang&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		inity();

	});
};

$scope.tambahy = function()
{
	var data = {
		"class": "MetodePemeriksaanPenunjang",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"kdMetodePeriksa": $scope.item.kdMetodePeriksa,
			"keteranganMetode": $scope.item.keteranganMetode,
			"metodePeriksa": $scope.item.metodePeriksa,
			"qMetodePeriksa": $scope.item.qMetodePeriksa,
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
		"class": "MetodePemeriksaanPenunjang",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"kdMetodePeriksa": $scope.item.kdMetodePeriksa,
			"keteranganMetode": $scope.item.keteranganMetode,
			"metodePeriksa": $scope.item.metodePeriksa,
			"qMetodePeriksa": $scope.item.qMetodePeriksa,
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


var inits = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaan;
					
					$scope.dataSources = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			inits();




			$scope.columnKomponenPemeriksaan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "departemenId",
				"title": "departemen Id"
			},
			{
				"field": "kdKomponenPeriksa",
				"title": "kd Komponen Periksa"
			},
			{
				"field": "produkId",
				"title": "produk Id"
			},
			{
				"field": "satuanHasilId",
				"title": "satuan Hasil Id"
			},
			{
				"field": "memoHasilPeriksa",
				"title": "memo Hasil Periksa"
			},
			{
				"field": "namaKomponenPeriksa",
				"title": "nama Komponen Periksa"
			},
			{
				"field": "noUrutKomponenPeriksa",
				"title": "no Urut Komponen Periksa"
			},
			{
				"field": "noUrutProduk",
				"title": "no Urut Produk"
			},
			{
				"field": "qKomponenPeriksa",
				"title": "q Komponen Periksa"
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
				"template" : "<button class='btnEdit' ng-click='enableDatas()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatas()'>Disable</button>"
			}
			];
			$scope.mainGridOptionss = { 
				pageable: true,
				columns: $scope.columnKomponenPemeriksaan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.kliks = function(currents){
	$scope.showEdits = true;
	$scope.currents = currents;
	$scope.item.departemen = currents.departemen;
	
	$scope.item.kdKomponenPeriksa = currents.kdKomponenPeriksa;
	$scope.item.produk = currents.produk;
	
	$scope.item.satuanHasil = currents.satuanHasil;
	
	$scope.item.memoHasilPeriksa = currents.memoHasilPeriksa;
	$scope.item.namaKomponenPeriksa = currents.namaKomponenPeriksa;
	$scope.item.noUrutKomponenPeriksa = currents.noUrutKomponenPeriksa;
	$scope.item.noUrutProduk = currents.noUrutProduk;
	$scope.item.qKomponenPeriksa = currents.qKomponenPeriksa;
	$scope.item.id = currents.id;
	$scope.item.noRec = currents.noRec;
	$scope.item.reportDisplay = currents.reportDisplay;
	$scope.item.kodeExternal = currents.kodeExternal;
	$scope.item.namaExternal = currents.namaExternal;
	$scope.item.statusEnabled = currents.statusEnabled;
	for (var y=0;y< $scope.listdepartemen.length ;y++){
	if ($scope.listdepartemen[y].id === currents.departemenId){
	$scope.item.departemen = $scope.listdepartemen[y];
	
		}
	}
	for (var p=0;p< $scope.listproduk.length ;p++){
	if ($scope.listproduk[p].id === currents.produkId){
	$scope.item.produk = $scope.listproduk[p];
	
		}
	}
	
	for (var t=0;t< $scope.listsatuanHasil.length ;t++){
	if ($scope.listsatuanhasil[t].id === currents.satuanHasilId){
	$scope.item.satuanHasil = $scope.listsatuanhasil[t];
	return;
		}
	}
};
$scope.disableDatas=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		inits();
	});
};
$scope.enableDatas=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		inits();

	});
};

$scope.tambahs = function()
{
	var data = {
		"class": "KomponenPemeriksaan",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"kdKomponenPeriksa": $scope.item.kdKomponenPeriksa,
			"produk": $scope.item.produk,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"memoHasilPeriksa": $scope.item.memoHasilPeriksa,
			"namaKomponenPeriksa": $scope.item.namaKomponenPeriksa,
			"noUrutKomponenPeriksa": $scope.item.noUrutKomponenPeriksa,
			"noUrutProduk": $scope.item.noUrutProduk,
			"qKomponenPeriksa": $scope.item.qKomponenPeriksa,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		inits();
		$scope.item = {};
	});
}

$scope.edits = function()
{	
	var data = {
		"class": "KomponenPemeriksaan",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"kdKomponenPeriksa": $scope.item.kdKomponenPeriksa,
			"produk": $scope.item.produk,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"memoHasilPeriksa": $scope.item.memoHasilPeriksa,
			"namaKomponenPeriksa": $scope.item.namaKomponenPeriksa,
			"noUrutKomponenPeriksa": $scope.item.noUrutKomponenPeriksa,
			"noUrutProduk": $scope.item.noUrutProduk,
			"qKomponenPeriksa": $scope.item.qKomponenPeriksa,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		inits();
	});
}
$scope.batals = function () {
	$scope.showEdits = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
	$scope.listproduk= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
	$scope.listsatuanhasil= dat.data;
});


var inith = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaanRangeNilai", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaanRangeNilai;

					$scope.dataSourceh = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			inith();




			$scope.columnKomponenPemeriksaanRangeNilai = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "departemenId",
				"title": "departemen Id"
			},
			{
				"field": "jenisKelaminId",
				"title": "jenis Kelamin Id"
			},
			{
				"field": "kelompokUmurId",
				"title": "kelompok Umur Id"
			},
			{
				"field": "komponenPeriksaId",
				"title": "komponen Periksa Id"
			},
			{
				"field": "metodePeriksaId",
				"title": "metode Periksa Id"
			},
			{
				"field": "satuanHasilId",
				"title": "satuan Hasil Id"
			},
			{
				"field": "keteranganLainnya",
				"title": "keterangan Lainnya"
			},
			{
				"field": "rangeNilaiMax",
				"title": "range Nilai Max"
			},
			{
				"field": "rangeNilaiMin",
				"title": "range Nilai Min"
			},
			{
				"field": "rangeNilaiNormal",
				"title": "range Nilai Normal"
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
				"template" : "<button class='btnEdit' ng-click='enableDatah()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatah()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsh = { 
				pageable: true,
				columns: $scope.columnKomponenPemeriksaanRangeNilai,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikh = function(currenth){
	$scope.showEdith = true;
	$scope.currenth = currenth;
	$scope.item.departemen = currenth.departemen;
	
	$scope.item.jenisKelamin = currenth.jenisKelamin;
	
	$scope.item.kelompokUmur = currenth.kelompokUmur;

	$scope.item.komponenPeriksa = currenth.komponenPeriksa;
	
	$scope.item.metodePeriksa = currenth.metodePeriksa;
	
	$scope.item.satuanHasil = currenth.satuanHasil;
	
	$scope.item.keteranganLainnya = currenth.keteranganLainnya;
	$scope.item.rangeNilaiMax = currenth.rangeNilaiMax;
	$scope.item.rangeNilaiMin = currenth.rangeNilaiMin;
	$scope.item.rangeNilaiNormal = currenth.rangeNilaiNormal;
	$scope.item.id = currenth.id;
	$scope.item.noRec = currenth.noRec;
	$scope.item.reportDisplay = currenth.reportDisplay;
	$scope.item.kodeExternal = currenth.kodeExternal;
	$scope.item.namaExternal = currenth.namaExternal;
	$scope.item.statusEnabled = currenth.statusEnabled;
	for (var y=0;y< $scope.listdepartemen.length ;y++){
	if ($scope.listdepartemen[y].id === currenth.departemenId){
	$scope.item.departemen = $scope.listdepartemen[y];
	
		}
	}
	
	for (var w=0;w< $scope.listkelompokUmur.length ;w++){
	if ($scope.listkelompokUmur[w].id === currenth.kelompokUmurId){
	$scope.item.kelompokUmur = $scope.listkelompokUmur[w];
	
		}
	}
	
	for (var n=0;n< $scope.listmetodePeriksa.length ;n++){
	if ($scope.listmetodePeriksa[n].id === currenth.metodePeriksaId){
	$scope.item.metodePeriksa = $scope.listmetodePeriksa[n];
	
		}
	}
	
	for (var x=0;x< $scope.listjenisKelamin.length ;x++){
	if ($scope.listjenisKelamin[x].id === currenth.jenisKelaminId){
	$scope.item.jenisKelamin = $scope.listjenisKelamin[x];
	
		}
	}
	
	for (var t=0;t< $scope.listkomponenPeriksa.length ;t++){
	if ($scope.listkomponenPeriksa[t].id === currenth.komponenPeriksaId){
	$scope.item.komponenPeriksa = $scope.listkomponenPeriksa[t];
	
		}
	}
	
	for (var c=0;c< $scope.listsatuanHasil.length ;c++){
	if ($scope.listsatuanHasil[c].id === currenth.satuanHasilId){
	$scope.item.satuanHasil = $scope.listsatuanHasil[c];
	
		}
	}
	
	
	
};
$scope.disableDatah=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		inith();
	});
};
$scope.enableDatah=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		inith();

	});
};

$scope.tambahh = function()
{
	var data = {
		"class": "KomponenPemeriksaanRangeNilai",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"jenisKelamin": $scope.item.jenisKelamin,
			
			"kelompokUmur": $scope.item.kelompokUmur,
			
			"komponenPeriksa": $scope.item.komponenPeriksa,
			
			"metodePeriksa": $scope.item.metodePeriksa,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"keteranganLainnya": $scope.item.keteranganLainnya,
			"rangeNilaiMax": $scope.item.rangeNilaiMax,
			"rangeNilaiMin": $scope.item.rangeNilaiMin,
			"rangeNilaiNormal": $scope.item.rangeNilaiNormal,

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

$scope.edith = function()
{	
	var data = {
		"class": "KomponenPemeriksaanRangeNilai",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"jenisKelamin": $scope.item.jenisKelamin,
		
			"kelompokUmur": $scope.item.kelompokUmur,
			
			"komponenPeriksa": $scope.item.komponenPeriksa,
			
			"metodePeriksa": $scope.item.metodePeriksa,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"keteranganLainnya": $scope.item.keteranganLainnya,
			"rangeNilaiMax": $scope.item.rangeNilaiMax,
			"rangeNilaiMin": $scope.item.rangeNilaiMin,
			"rangeNilaiNormal": $scope.item.rangeNilaiNormal,
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
IPSRSService.getFieldListData("JenisKelamin&select=id,namaExternal", true).then(function(dat){
	$scope.listjenisKelamin= dat.data;
});
IPSRSService.getFieldListData("KelompokUmur&select=id,namaExternal", true).then(function(dat){
	$scope.listkelompokUmur= dat.data;
});
IPSRSService.getFieldListData("KomponenPemeriksaan&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenPeriksa= dat.data;
});
IPSRSService.getFieldListData("MetodePemeriksaanPenunjang&select=id,namaExternal", true).then(function(dat){
	$scope.listmetodePeriksa= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
	$scope.listsatuanHasil= dat.data;
});


var initc = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Alat", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Alat;
                                    					
$scope.dataSourcec = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initc();



$scope.columnAlat = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdAlat",
				"title": "kd Alat"
			},
			{
				"field": "namaAlat",
				"title": "nama Alat"
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
	"template" : "<button class='btnEdit' ng-click='enableDatac()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatac()'>Disable</button>"
}
];
$scope.mainGridOptionsc = { 
 pageable: true,
 columns: $scope.columnAlat,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikc = function(currentc){
$scope.showEditc = true;
$scope.currentc = currentc;
$scope.item.kdAlat = currentc.kdAlat;
$scope.item.namaAlat = currentc.namaAlat;
$scope.item.id = currentc.id;
$scope.item.noRec = currentc.noRec;
$scope.item.reportDisplay = currentc.reportDisplay;
$scope.item.kodeExternal = currentc.kodeExternal;
$scope.item.namaExternal = currentc.namaExternal;
$scope.item.statusEnabled = currentc.statusEnabled;
};
$scope.disableDatac=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Alat&&id="+$scope.item.id+"&&statusEnabled=false").then

(function(dat){
 initc();
 });
 };
$scope.enableDatac=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Alat&&id="+$scope.item.id+"&&statusEnabled=true").then

(function(dat){
 initc();

	});
};
//// save 
$scope.tambahc = function()
 {
var data = {
	"class": "Alat",
	"listField": {
"kdAlat": $scope.item.kdAlat,
"namaAlat": $scope.item.namaAlat,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initc();
$scope.item = {};
 });
  }
////edit
 $scope.editc = function()
  {	
   var data = {
 "class": "Alat",
	"listField": {
"kdAlat": $scope.item.kdAlat,
"namaAlat": $scope.item.namaAlat,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initc();
});
}
$scope.batalc = function () {
$scope.showEditc = false;
$scope.item = {};
}




}
]);
});