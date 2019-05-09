define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokMedisCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisTindakanMedis", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisTindakanMedis;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisTindakanMedis = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisTindakanMedis",
"title": "jenis Tindakan Medis"
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
"field": "kdJenisTindakanMedis",
"title": "kd Jenis Tindakan Medis"
},
{
"field": "kelompokTM",
"title": "kelompok TM"
},
{
"field": "kelompokTMId",
"title": "kelompok TMId"
},
{
"field": "qJenisTindakanMedis",
"title": "q Jenis Tindakan Medis"
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
 columns: $scope.columnJenisTindakanMedis,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisTindakanMedis = current.jenisTindakanMedis;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kdJenisTindakanMedis = current.kdJenisTindakanMedis;
$scope.item.kelompokTM = current.kelompokTM;
$scope.item.kelompokTMId = current.kelompokTMId;
$scope.item.qJenisTindakanMedis = current.qJenisTindakanMedis;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisTindakanMedis&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisTindakanMedis&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisTindakanMedis",
	"listField": {
"jenisTindakanMedis": $scope.item.jenisTindakanMedis,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisTindakanMedis": $scope.item.kdJenisTindakanMedis,
"kelompokTM": $scope.item.kelompokTM,
"kelompokTMId": $scope.item.kelompokTMId,
"qJenisTindakanMedis": $scope.item.qJenisTindakanMedis,
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
 "class": "JenisTindakanMedis",
	"listField": {
"jenisTindakanMedis": $scope.item.jenisTindakanMedis,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisTindakanMedis": $scope.item.kdJenisTindakanMedis,
"kelompokTM": $scope.item.kelompokTM,
"kelompokTMId": $scope.item.kelompokTMId,
"qJenisTindakanMedis": $scope.item.qJenisTindakanMedis,
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
IPSRSService.getFieldListData("KelompokTindakanMedis&select=id,namaExternal", true).then(function(dat){
$scope.listkelompoktm= dat.data;
});

var initg = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MapTindakanMedisToKualitasHasil", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MapTindakanMedisToKualitasHasil;

					$scope.dataSourceg = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initg();




			$scope.columnMapTindakanMedisToKualitasHasil = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kualitasHasil",
				"title": "kualitas Hasil"
			},
			{
				"field": "kualitasHasilId",
				"title": "kualitas Hasil Id"
			},
			{
				"field": "tindakanMedis",
				"title": "tindakan Medis"
			},
			{
				"field": "tindakanMedisId",
				"title": "tindakan Medis Id"
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
				"template" : "<button class='btnEdit' ng-click='enableDatag()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatag()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsg = { 
				pageable: true,
				columns: $scope.columnMapTindakanMedisToKualitasHasil,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikg = function(currentg){
	$scope.showEditg = true;
	$scope.currentg = currentg;
	$scope.item.kualitasHasil = currentg.kualitasHasil;
	$scope.item.kualitasHasilId = currentg.kualitasHasilId;
	$scope.item.tindakanMedis = currentg.tindakanMedis;
	$scope.item.tindakanMedisId = currentg.tindakanMedisId;
	$scope.item.id = currentg.id;
	$scope.item.noRec = currentg.noRec;
	$scope.item.reportDisplay = currentg.reportDisplay;
	$scope.item.kodeExternal = currentg.kodeExternal;
	$scope.item.namaExternal = currentg.namaExternal;
	$scope.item.statusEnabled = currentg.statusEnabled;
};
$scope.disableDatag=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MapTindakanMedisToKualitasHasil&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initg();
	});
};
$scope.enableDatag=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MapTindakanMedisToKualitasHasil&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initg();

	});
};

$scope.tambahg = function()
{
	var data = {
		"class": "MapTindakanMedisToKualitasHasil",
		"listField": {
			"kualitasHasil": $scope.item.kualitasHasil,
			"kualitasHasilId": $scope.item.kualitasHasilId,
			"tindakanMedis": $scope.item.tindakanMedis,
			"tindakanMedisId": $scope.item.tindakanMedisId,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initg();
		$scope.item = {};
	});
}

$scope.editg = function()
{	
	var data = {
		"class": "MapTindakanMedisToKualitasHasil",
		"listField": {
			"kualitasHasil": $scope.item.kualitasHasil,
			"kualitasHasilId": $scope.item.kualitasHasilId,
			"tindakanMedis": $scope.item.tindakanMedis,
			"tindakanMedisId": $scope.item.tindakanMedisId,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initg();
	});
}
$scope.batalg = function () {
	$scope.showEditg = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("KualitasHasil&select=id,kualitasHasil", true).then(function(dat){
	$scope.listkualitasHasil= dat.data;
});
IPSRSService.getFieldListData("TindakanMedis&select=id,namaExternal", true).then(function(dat){
	$scope.listtindakanMedis= dat.data;
});


var initl = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=TindakanMedis", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.TindakanMedis;
					
					$scope.dataSourcel = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initl();




			$scope.columnTindakanMedis = [
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
				"field": "jenisTindakanMedis",
				"title": "jenis Tindakan Medis"
			},
			{
				"field": "jenisTindakanMedisId",
				"title": "jenis Tindakan Medis Id"
			},
			{
				"field": "kdTindakanMedis",
				"title": "kd Tindakan Medis"
			},
			{
				"field": "qTindakanMedis",
				"title": "q Tindakan Medis"
			},
			{
				"field": "namaTindakanMedis",
				"title": "nama Tindakan Medis"
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
				"template" : "<button class='btnEdit' ng-click='enableDatal()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatal()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsl = { 
				pageable: true,
				columns: $scope.columnTindakanMedis,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikl = function(currentl){
	$scope.showEditl = true;
	$scope.currentl = currentl;
	$scope.item.departemen = currentl.departemen;
	$scope.item.departemenId = currentl.departemenId;
	$scope.item.jenisTindakanMedis = currentl.jenisTindakanMedis;
	$scope.item.jenisTindakanMedisId = currentl.jenisTindakanMedisId;
	$scope.item.kdTindakanMedis = currentl.kdTindakanMedis;
	$scope.item.qTindakanMedis = currentl.qTindakanMedis;
	$scope.item.namaTindakanMedis = currentl.namaTindakanMedis;
	$scope.item.id = currentl.id;
	$scope.item.noRec = currentl.noRec;
	$scope.item.reportDisplay = currentl.reportDisplay;
	$scope.item.kodeExternal = currentl.kodeExternal;
	$scope.item.namaExternal = currentl.namaExternal;
	$scope.item.statusEnabled = currentl.statusEnabled;
};
$scope.disableDatal=function(){
	IPSRSService.getClassMaster("delete-master-table?className=TindakanMedis&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initl();
	});
};
$scope.enableDatal=function(){
	IPSRSService.getClassMaster("delete-master-table?className=TindakanMedis&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initl();

	});
};

$scope.tambahl = function()
{
	var data = {
		"class": "TindakanMedis",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"jenisTindakanMedis": $scope.item.jenisTindakanMedis,
			"jenisTindakanMedisId": $scope.item.jenisTindakanMedisId,
			"kdTindakanMedis": $scope.item.kdTindakanMedis,
			"qTindakanMedis": $scope.item.qTindakanMedis,
			"namaTindakanMedis": $scope.item.namaTindakanMedis, 
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initl();
		$scope.item = {};
	});
}

$scope.editl = function()
{	
	var data = {
		"class": "TindakanMedis",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"jenisTindakanMedis": $scope.item.jenisTindakanMedis,
			"jenisTindakanMedisId": $scope.item.jenisTindakanMedisId,
			"kdTindakanMedis": $scope.item.kdTindakanMedis,
			"qTindakanMedis": $scope.item.qTindakanMedis,
			"namaTindakanMedis": $scope.item.namaTindakanMedis,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initl();
	});
}
$scope.batall = function () {
	$scope.showEditl = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisTindakanMedis&select=id,namaExternal", true).then(function(dat){
	$scope.listjenisTindakanMedis= dat.data;
});


}
]);
});