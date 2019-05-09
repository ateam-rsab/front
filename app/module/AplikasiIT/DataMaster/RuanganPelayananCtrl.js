define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RuanganPelayananCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Departemen", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Departemen;
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"agama": e.agama,
						 		"kdAgama": e.kdAgama,
						 		"qAgama": e.qAgama,
						 		"reportDisplay": e.reportDisplay,
						 		"kodeExternal": e.kodeExternal,
						 		"namaExternal": e.namaExternal,
						 		"statusEnabled": e.statusEnabled,
						 		"id": e.id,
						 		"noRec": e.noRec,
						 		"no": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});
					$scope.source = data;
					$scope.dataSource = new kendo.data.DataSource({
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
			init();

			IPSRSService.getFieldListData("JenisPerawatan&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisPerawatan = dat.data;
			});

			IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listpegawaiKepala = dat.data;
			});

			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnDepartemen,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
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
			$scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.alamatEmail = current.alamatEmail;
				$scope.item.faksimile = current.faksimile;
				$scope.item.fixedPhone = current.fixedPhone;
				$scope.item.kdDepartemen = current.kdDepartemen;
				$scope.item.jenisPerawatan = current.jenisPerawatan;
				$scope.item.jenisPerawatanId = current.jenisPerawatanId;
				$scope.item.pegawaiKepala = current.pegawaiKepala;
				$scope.item.pegawaiKepalaId = current.pegawaiKepalaId;
				$scope.item.mobilePhone = current.mobilePhone;
				$scope.item.namaDepartemen = current.namaDepartemen;
				$scope.item.prefixNoAntrian = current.prefixNoAntrian;
				$scope.item.qDepartemen = current.qDepartemen;
				$scope.item.website = current.website;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Departemen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Departemen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Departemen",
					"listField": {
							"alamatEmail": $scope.item.alamatEmail,
					 		"faksimile": $scope.item.faksimile,
					 		"fixedPhone": $scope.item.fixedPhone,
					 		"kdDepartemen": $scope.item.kdDepartemen,
					 		"jenisPerawatan": $scope.item.jenisPerawatan,
					 		"pegawaiKepala": $scope.item.pegawaiKepala,
					 		"mobilePhone": $scope.item.mobilePhone,
					 		"namaDepartemen": $scope.item.namaDepartemen,
					 		"prefixNoAntrian": $scope.item.prefixNoAntrian,
					 		"qDepartemen": $scope.item.qDepartemen,
					 		"website": $scope.item.website,
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

		    $scope.edit = function()
		    {	
		        var data = {
					"class": "Departemen",
					"listField": {
							"id": $scope.item.id,
							"alamatEmail": $scope.item.alamatEmail,
					 		"faksimile": $scope.item.faksimile,
					 		"fixedPhone": $scope.item.fixedPhone,
					 		"kdDepartemen": $scope.item.kdDepartemen,
					 		"jenisPerawatan": $scope.item.jenisPerawatan,
					 		"pegawaiKepala": $scope.item.pegawaiKepala,
					 		"mobilePhone": $scope.item.mobilePhone,
					 		"namaDepartemen": $scope.item.namaDepartemen,
					 		"prefixNoAntrian": $scope.item.prefixNoAntrian,
					 		"qDepartemen": $scope.item.qDepartemen,
					 		"website": $scope.item.website,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
		        });
		    }
		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }
			
			var initn = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Kamar", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Kamar;
                                    					
$scope.dataSourcen = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initn();



$scope.columnKamar = [
{
"field": "No",
"title": "No"
},
{
"field": "kdKamar",
"title": "kd Kamar"
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
"field": "keterangan",
"title": "keterangan"
},
{
"field": "jumlaKamarIsi",
"title": "jumla Kamar Isi"
},
{
"field": "jumlaKamarKosong",
"title": "jumla Kamar Kosong"
},
{
"field": "namaKamar",
"title": "nama Kamar"
},
{
"field": "qKamar",
"title": "q Kamar"
},
{
"field": "qtyBed",
"title": "qty Bed"
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
 columns: $scope.columnKamar,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikn = function(currentn){
$scope.showEditn = true;
$scope.currentn = currentn;
$scope.item.kdKamar = currentn.kdKamar;
$scope.item.kelas = currentn.kelas;

$scope.item.ruangan = currentn.ruangan;

$scope.item.keterangan = currentn.keterangan;
$scope.item.jumlaKamarIsi = currentn.jumlaKamarIsi;
$scope.item.jumlaKamarKosong = currentn.jumlaKamarKosong;
$scope.item.namaKamar = currentn.namaKamar;
$scope.item.qKamar = currentn.qKamar;
$scope.item.qtyBed = currentn.qtyBed;
$scope.item.id = currentn.id;
$scope.item.noRec = currentn.noRec;
$scope.item.reportDisplay = currentn.reportDisplay;
$scope.item.kodeExternal = currentn.kodeExternal;
$scope.item.namaExternal = currentn.namaExternal;
$scope.item.statusEnabled = currentn.statusEnabled;
};
$scope.disableDatan=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Kamar&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initn();
 });
 };
$scope.enableDatan=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Kamar&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initn();

	});
};
//// save 
$scope.tambahn = function()
 {
var data = {
	"class": "Kamar",
	"listField": {
"kdKamar": $scope.item.kdKamar,
"kelas": $scope.item.kelas,

"ruangan": $scope.item.ruangan,

"keterangan": $scope.item.keterangan,
"jumlaKamarIsi": $scope.item.jumlaKamarIsi,
"jumlaKamarKosong": $scope.item.jumlaKamarKosong,
"namaKamar": $scope.item.namaKamar,
"qKamar": $scope.item.qKamar,
"qtyBed": $scope.item.qtyBed,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initn();
$scope.item = {};
 });
  }
////edit
 $scope.editn = function()
  {	
   var data = {
 "class": "Kamar",
	"listField": {
"kdKamar": $scope.item.kdKamar,
"kelas": $scope.item.kelas,

"ruangan": $scope.item.ruangan,

"keterangan": $scope.item.keterangan,
"jumlaKamarIsi": $scope.item.jumlaKamarIsi,
"jumlaKamarKosong": $scope.item.jumlaKamarKosong,
"namaKamar": $scope.item.namaKamar,
"qKamar": $scope.item.qKamar,
"qtyBed": $scope.item.qtyBed,
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
IPSRSService.getFieldListData("Kelas&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});

  var inity = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=TempatTidur", true).then(function(dat){
$scope.listDataMaster = dat.data.data.TempatTidur;
                                    					
$scope.dataSourcey = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inity();



$scope.columnTempatTidur = [
{
"field": "No",
"title": "No"
},
{
"field": "kamar",
"title": "kamar"
},
{
"field": "kamarId",
"title": "kamar Id"
},
{
"field": "statusBed",
"title": "status Bed"
},
{
"field": "statusBedId",
"title": "status Bed Id"
},
{
"field": "nomorBed",
"title": "nomor Bed"
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
 columns: $scope.columnTempatTidur,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.kliky = function(currenty){
$scope.showEdity = true;
$scope.currenty = currenty;
$scope.item.kamar = currenty.kamar;
$scope.item.kamarId = currenty.kamarId;
$scope.item.statusBed = currenty.statusBed;
$scope.item.statusBedId = currenty.statusBedId;
$scope.item.nomorBed = currenty.nomorBed;
$scope.item.id = currenty.id;
$scope.item.noRec = currenty.noRec;
$scope.item.reportDisplay = currenty.reportDisplay;
$scope.item.kodeExternal = currenty.kodeExternal;
$scope.item.namaExternal = currenty.namaExternal;
$scope.item.statusEnabled = currenty.statusEnabled;
};
$scope.disableDatay=function(){
 IPSRSService.getClassMaster("delete-master-table?className=TempatTidur&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 inity();
 });
 };
$scope.enableDatay=function(){
 IPSRSService.getClassMaster("delete-master-table?className=TempatTidur&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 inity();

	});
};
//// save 
$scope.tambahy = function()
 {
var data = {
	"class": "TempatTidur",
	"listField": {
"kamar": $scope.item.kamar,

"statusBed": $scope.item.statusBed,

"nomorBed": $scope.item.nomorBed,
"id": $scope.item.id,
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
////edit
 $scope.edity = function()
  {	
   var data = {
 "class": "TempatTidur",
	"listField": {
"kamar": $scope.item.kamar,

"statusBed": $scope.item.statusBed,

"nomorBed": $scope.item.nomorBed,
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
IPSRSService.getFieldListData("Kamar&select=id,namaExternal", true).then(function(dat){
$scope.listkamar= dat.data;
});
IPSRSService.getFieldListData("StatusBed&select=id,namaExternal", true).then(function(dat){
$scope.liststatusbed= dat.data;
});
			

		}
		]);
});