define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DepartemenCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
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

		}
		]);
});