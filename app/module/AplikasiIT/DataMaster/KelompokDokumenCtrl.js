////header nya
define(['initialize'], function(initialize) {
'use strict';
initialize.controller('KelompokDokumenCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KategoryDokumen", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KategoryDokumen;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnKategoryDokumen = [
{
"field": "No",
"title": "No"
},
{
"field": "kategoryDokumen",
"title": "kategory Dokumen"
},
{
"field": "kdKategoryDokumen",
"title": "kd Kategory Dokumen"
},
{
"field": "qKategoryDokumen",
"title": "q Kategory Dokumen"
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
 columns: $scope.columnKategoryDokumen,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kategoryDokumen = current.kategoryDokumen;
$scope.item.kdKategoryDokumen = current.kdKategoryDokumen;
$scope.item.qKategoryDokumen = current.qKategoryDokumen;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KategoryDokumen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KategoryDokumen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "KategoryDokumen",
	"listField": {
"kategoryDokumen": $scope.item.kategoryDokumen,
"kdKategoryDokumen": $scope.item.kdKategoryDokumen,
"qKategoryDokumen": $scope.item.qKategoryDokumen,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
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
 "class": "KategoryDokumen",
	"listField": {
"kategoryDokumen": $scope.item.kategoryDokumen,
"kdKategoryDokumen": $scope.item.kdKategoryDokumen,
"qKategoryDokumen": $scope.item.qKategoryDokumen,
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

var initl = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisDokumen", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisDokumen;
					
					$scope.dataSourcel = new kendo.data.DataSource({
	                    pageSize: 10,
	                    data: $scope.listDataMaster,
	                    autoSync: true
	                    /*schema: {
	                      	model: {
	                        	id: "asetId",
	                        	fields: {
	                            	
	                        	}   
	                    	}
	                	}	*/
	            	});
					
				});
			}
			initl();
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("JenisDokumen&select=id,jenisDokumen", true).then(function(dat){
				$scope.listjenisDokumen = dat.data;
			});
			$scope.columnJenisDokumen = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisDokumen",
				"title": "jenis Dokumen"
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
				"field": "kdJenisDokumen",
				"title": "kd Jenis Dokumen"
			},
			{
				"field": "jenisDokumenHead",
				"title": "jenis Dokumen Head"
			},
			{
				"field": "jenisDokumenHeadId",
				"title": "jenis Dokumen Head Id"
			},
			{
				"field": "qJenisDokumen",
				"title": "q Jenis Dokumen"
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
                columns: $scope.columnJenisDokumen,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikl = function(currentl){
            	$scope.showEditl = true;
				$scope.currentl = currentl;
				// debugger;
				$scope.item.id = currentl.id;
				$scope.item.noRec = currentl.noRec;
				$scope.item.statusEnabled = currentl.statusEnabled;
				$scope.item.jenisDokumen = currentl.jenisDokumen;
				$scope.item.departemen = currentl.departemen;
			
				$scope.item.kdJenisDokumen = currentl.kdJenisDokumen;
				$scope.item.jenisDokumenHead = currentl.jenisDokumenHead;
				
				$scope.item.qJenisDokumen = currentl.qJenisDokumen;
				$scope.item.reportDisplay = currentl.reportDisplay;
				$scope.item.kodeExternal = currentl.kodeExternal;
				$scope.item.namaExternal = currentl.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatal=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisDokumen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initl();

				});
			};

			$scope.enableDatal=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisDokumen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initl();

				});
			};
			$scope.tambahl = function()
		    {
		        var data = {
					"class": "JenisDokumen",
					"listField": {
							"jenisDokumen": $scope.item.jenisDokumen,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisDokumen": $scope.item.kdJenisDokumen,
					 		"jenisDokumenHead": $scope.item.jenisDokumenHead,
					 	
					 		"qJenisDokumen": $scope.item.qJenisDokumen,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
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
					"class": "JenisDokumen",
					"listField": {
							"id": $scope.item.id,
							"jenisDokumen": $scope.item.jenisDokumen,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisDokumen": $scope.item.kdJenisDokumen,
					 		"jenisDokumenHead": $scope.item.jenisDokumenHead,
					 		
					 		"qJenisDokumen": $scope.item.qJenisDokumen,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initl();
		        });
		    }
		    $scope.batall = function () {
		    	$scope.showEditl = false;
		    	$scope.item = {};
		    }

			var initz = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Lokasi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Lokasi;
                                    					
$scope.dataSourcez = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initz();



///colom tabel
$scope.columnLokasi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisDokumen",
				"title": "jenis Dokumen"
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
				"field": "kdJenisDokumen",
				"title": "kd Jenis Dokumen"
			},
			{
				"field": "jenisDokumenHead",
				"title": "jenis Dokumen Head"
			},
			{
				"field": "jenisDokumenHeadId",
				"title": "jenis Dokumen Head Id"
			},
			{
				"field": "qJenisDokumen",
				"title": "q Jenis Dokumen"
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
 columns: $scope.columnLokasi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikz = function(currentz){
$scope.showEditz = true;
$scope.currentz = currentz;
$scope.item.departemen = currentz.departemen;
$scope.item.departemenId = currentz.departemenId;
$scope.item.kdLokasi = currentz.kdLokasi;
$scope.item.lokasiHead = currentz.lokasiHead;
$scope.item.lokasiHeadId = currentz.lokasiHeadId;
$scope.item.namaLokasi = currentz.namaLokasi;
$scope.item.qLokasi = currentz.qLokasi;
$scope.item.id = currentz.id;
$scope.item.noRec = currentz.noRec;
$scope.item.reportDisplay = currentz.reportDisplay;
$scope.item.kodeExternal = currentz.kodeExternal;
$scope.item.namaExternal = currentz.namaExternal;
$scope.item.statusEnabled = currentz.statusEnabled;
};
$scope.disableDataz=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Lokasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initz();
 });
 };
$scope.enableDataz=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Lokasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initz();

	});
};
//// save 
$scope.tambahz = function()
 {
var data = {
	"class": "Lokasi",
	"listField": {
"departemen": $scope.item.departemen,

"kdLokasi": $scope.item.kdLokasi,
"lokasiHead": $scope.item.lokasiHead,

"namaLokasi": $scope.item.namaLokasi,
"qLokasi": $scope.item.qLokasi,
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
////edit
 $scope.editz = function()
  {	
   var data = {
 "class": "Lokasi",
	"listField": {
"departemen": $scope.item.departemen,

"kdLokasi": $scope.item.kdLokasi,
"lokasiHead": $scope.item.lokasiHead,

"namaLokasi": $scope.item.namaLokasi,
"qLokasi": $scope.item.qLokasi,
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
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("Lokasi&select=id,namaLokasi", true).then(function(dat){
$scope.listlokasihead= dat.data;
});


var initp = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Dokumen", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Dokumen;
                                    					
$scope.dataSourcep = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initp();



///colom tabel
$scope.columnDokumen = [
{
"field": "No",
"title": "No"
},
{
"field": "deskripsiDokumen",
"title": "deskripsi Dokumen"
},
{
"field": "isDokumenInOutInt",
"title": "is Dokumen In Out Int"
},
{
"field": "kdDokumen",
"title": "kd Dokumen"
},
{
"field": "dokumenHead",
"title": "dokumen Head"
},
{
"field": "dokumenHeadId",
"title": "dokumen Head Id"
},
{
"field": "jenisDokumen",
"title": "jenis Dokumen"
},
{
"field": "jenisDokumenId",
"title": "jenis Dokumen Id"
},
{
"field": "kategoryDokumen",
"title": "kategory Dokumen"
},
{
"field": "kategoryDokumenId",
"title": "kategory Dokumen Id"
},
{
"field": "lokasi",
"title": "lokasi"
},
{
"field": "lokasiId",
"title": "lokasi Id"
},
{
"field": "pegawaiPembuat",
"title": "pegawai Pembuat"
},
{
"field": "pegawaiPembuatId",
"title": "pegawai Pembuat Id"
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
"field": "namaJudulDokumen",
"title": "nama Judul Dokumen"
},
{
"field": "noDokumen",
"title": "no Dokumen"
},
{
"field": "pathFile",
"title": "path File"
},
{
"field": "namaPegawaiPembuat",
"title": "nama Pegawai Pembuat"
},
{
"field": "qDokumen",
"title": "q Dokumen"
},
{
"field": "qtyLampiran",
"title": "qty Lampiran"
},
{
"field": "tglDokumen",
"title": "tgl Dokumen"
},
{
"field": "surat",
"title": "surat"
},
{
"field": "suratId",
"title": "surat Id"
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
 columns: $scope.columnDokumen,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikp = function(currentp){
$scope.showEditp = true;
$scope.currentp = currentp;
$scope.item.deskripsiDokumen = currentp.deskripsiDokumen;
$scope.item.isDokumenInOutInt = currentp.isDokumenInOutInt;
$scope.item.kdDokumen = currentp.kdDokumen;
$scope.item.dokumenHead = currentp.dokumenHead;
$scope.item.dokumenHeadId = currentp.dokumenHeadId;
$scope.item.jenisDokumen = currentp.jenisDokumen;
$scope.item.jenisDokumenId = currentp.jenisDokumenId;
$scope.item.kategoryDokumen = currentp.kategoryDokumen;
$scope.item.kategoryDokumenId = currentp.kategoryDokumenId;
$scope.item.lokasi = currentp.lokasi;
$scope.item.lokasiId = currentp.lokasiId;
$scope.item.pegawaiPembuat = currentp.pegawaiPembuat;
$scope.item.pegawaiPembuatId = currentp.pegawaiPembuatId;
$scope.item.ruangan = currentp.ruangan;
$scope.item.ruanganId = currentp.ruanganId;
$scope.item.namaJudulDokumen = currentp.namaJudulDokumen;
$scope.item.noDokumen = currentp.noDokumen;
$scope.item.pathFile = currentp.pathFile;
$scope.item.namaPegawaiPembuat = currentp.namaPegawaiPembuat;
$scope.item.qDokumen = currentp.qDokumen;
$scope.item.qtyLampiran = currentp.qtyLampiran;
$scope.item.tglDokumen = currentp.tglDokumen;
$scope.item.tglBerakhir = currentp.tglBerakhir;
$scope.item.tglTerbit = currentp.tglTerbit;
$scope.item.surat = currentp.surat;
$scope.item.suratId = currentp.suratId;
$scope.item.id = currentp.id;
$scope.item.noRec = currentp.noRec;
$scope.item.reportDisplay = currentp.reportDisplay;
$scope.item.kodeExternal = currentp.kodeExternal;
$scope.item.namaExternal = currentp.namaExternal;
$scope.item.statusEnabled = currentp.statusEnabled;
};
$scope.disableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Dokumen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initp();
 });
 };
$scope.enableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Dokumen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initp();

	});
};
//// save 
$scope.tambahp = function()
 {
var data = {
	"class": "Dokumen",
	"listField": {
"deskripsiDokumen": $scope.item.deskripsiDokumen,
"isDokumenInOutInt": $scope.item.isDokumenInOutInt,
"kdDokumen": $scope.item.kdDokumen,
"dokumenHead": $scope.item.dokumenHead,
"dokumenHeadId": $scope.item.dokumenHeadId,
"jenisDokumen": $scope.item.jenisDokumen,
"jenisDokumenId": $scope.item.jenisDokumenId,
"kategoryDokumen": $scope.item.kategoryDokumen,
"kategoryDokumenId": $scope.item.kategoryDokumenId,
"lokasi": $scope.item.lokasi,
"lokasiId": $scope.item.lokasiId,
"pegawaiPembuat": $scope.item.pegawaiPembuat,
"pegawaiPembuatId": $scope.item.pegawaiPembuatId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
"namaJudulDokumen": $scope.item.namaJudulDokumen,
"noDokumen": $scope.item.noDokumen,
"pathFile": $scope.item.pathFile,
"namaPegawaiPembuat": $scope.item.namaPegawaiPembuat,
"qDokumen": $scope.item.qDokumen,
"qtyLampiran": $scope.item.qtyLampiran,
"tglDokumen": $scope.item.tglDokumen,
"tglBerakhir": $scope.item.tglBerakhir,
"tglTerbit": $scope.item.tglTerbit,
"surat": $scope.item.surat,
"suratId": $scope.item.suratId,
"id": $scope.item.id,
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
 "class": "Dokumen",
	"listField": {
"deskripsiDokumen": $scope.item.deskripsiDokumen,
"isDokumenInOutInt": $scope.item.isDokumenInOutInt,
"kdDokumen": $scope.item.kdDokumen,
"dokumenHead": $scope.item.dokumenHead,
"dokumenHeadId": $scope.item.dokumenHeadId,
"jenisDokumen": $scope.item.jenisDokumen,
"jenisDokumenId": $scope.item.jenisDokumenId,
"kategoryDokumen": $scope.item.kategoryDokumen,
"kategoryDokumenId": $scope.item.kategoryDokumenId,
"lokasi": $scope.item.lokasi,
"lokasiId": $scope.item.lokasiId,
"pegawaiPembuat": $scope.item.pegawaiPembuat,
"pegawaiPembuatId": $scope.item.pegawaiPembuatId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
"namaJudulDokumen": $scope.item.namaJudulDokumen,
"noDokumen": $scope.item.noDokumen,
"pathFile": $scope.item.pathFile,
"namaPegawaiPembuat": $scope.item.namaPegawaiPembuat,
"qDokumen": $scope.item.qDokumen,
"qtyLampiran": $scope.item.qtyLampiran,
"tglDokumen": $scope.item.tglDokumen,
"tglBerakhir": $scope.item.tglBerakhir,
"tglTerbit": $scope.item.tglTerbit,
"surat": $scope.item.surat,
"suratId": $scope.item.suratId,
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
IPSRSService.getFieldListData("Dokumen&select=id,namaJudulDokumen", true).then(function(dat){
$scope.listdokumenhead= dat.data;
});
IPSRSService.getFieldListData("JenisDokumen&select=id,namaExternal", true).then(function(dat){
$scope.listjenisdokumen= dat.data;
});
IPSRSService.getFieldListData("KategoryDokumen&select=id,namaExternal", true).then(function(dat){
$scope.listkategorydokumen= dat.data;
});
IPSRSService.getFieldListData("Lokasi&select=id,namaExternal", true).then(function(dat){
$scope.listlokasi= dat.data;
});
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listpegawaipembuat= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});
IPSRSService.getFieldListData("Surat&select=id,nama", true).then(function(dat){
$scope.listsurat= dat.data;
});




}
]);
});
/////end