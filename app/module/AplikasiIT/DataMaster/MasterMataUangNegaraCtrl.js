////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MasterMataUangNegaraCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsalProduk", true).then(function(dat){
$scope.dataSource = dat.data.data.AsalProduk;
 debugger;                                   					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.dataSource,
autoSync: true

});

});
}
init();




$scope.columnAsalProduk = [
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
 columns: $scope.columnAsalProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.asalProduk = current.asalProduk;
$scope.item.kdAsalProduk = current.kdAsalProduk;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kelompokProduk = current.kelompokProduk;
$scope.item.kelompokProdukId = current.kelompokProdukId;
$scope.item.qAsalProduk = current.qAsalProduk;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "MapRuanganToDetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
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
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
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

var initv = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MataUang", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MataUang;
                                    					
$scope.dataSourcev = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initv();



///colom tabel

$scope.columnMataUang = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "currentKursToIDR",
				"title": "current Kurs To IDR"
			},
			{
				"field": "qMataUang",
				"title": "q Mata Uang"
			},
			{
				"field": "mataUang",
				"title": "Mata Uang"
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
 columns: $scope.columnMataUang,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikv = function(currentv){
$scope.showEditv = true;
$scope.currentv = currentv;
$scope.item.currentKursToIDR = currentv.currentKursToIDR;
$scope.item.kdMataUang = currentv.kdMataUang;
$scope.item.mataUang = currentv.mataUang;
$scope.item.qMataUang = currentv.qMataUang;
$scope.item.id = currentv.id;
$scope.item.noRec = currentv.noRec;
$scope.item.reportDisplay = currentv.reportDisplay;
$scope.item.kodeExternal = currentv.kodeExternal;
$scope.item.namaExternal = currentv.namaExternal;
$scope.item.statusEnabled = currentv.statusEnabled;
};
$scope.disableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MataUang&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initv();
 });
 };
$scope.enableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MataUang&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initv();

	});
};
//// save 
$scope.tambahv = function()
 {
var data = {
	"class": "MataUang",
	"listField": {
"currentKursToIDR": $scope.item.currentKursToIDR,
"kdMataUang": $scope.item.kdMataUang,
"mataUang": $scope.item.mataUang,
"qMataUang": $scope.item.qMataUang,
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
 "class": "MataUang",
	"listField": {
"currentKursToIDR": $scope.item.currentKursToIDR,
"kdMataUang": $scope.item.kdMataUang,
"mataUang": $scope.item.mataUang,
"qMataUang": $scope.item.qMataUang,
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


var initd = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MetodeDelivery", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MetodeDelivery;
					
					$scope.dataSourced = new kendo.data.DataSource({
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
			initd();
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("MetodeDelivery&select=id,metodeDelivery", true).then(function(dat){
				$scope.listmetodeDeliveryHead = dat.data;
			});
			$scope.columnMetodeDelivery = [
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
				"field": "kdMetodeDelivery",
				"title": "kd Metode Delivery"
			},
			{
				"field": "metodeDeliveryHead",
				"title": "metode Delivery Head"
			},
			{
				"field": "metodeDeliveryHeadId",
				"title": "metode Delivery Head Id"
			},
			{
				"field": "metodeDelivery",
				"title": "metode Delivery"
			},
			{
				"field": "qJenisDelivery",
				"title": "q Jenis Delivery"
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
    			"template" : "<button class='btnEdit' ng-click='enableDatad()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDatad()'>Disable</button>"
			}
			];

			$scope.mainGridOptionsd = { 
                pageable: true,
                columns: $scope.columnMetodeDelivery,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikd = function(currentd){
            	$scope.showEditd = true;
				$scope.currentd = currentd;
				// debugger;
				$scope.item.id = currentd.id;
				$scope.item.noRec = currentd.noRec;
				$scope.item.statusEnabled = currentd.statusEnabled;
				$scope.item.departemen = currentd.departemen;
				$scope.item.departemenId = currentd.departemenId;
				$scope.item.kdMetodeDelivery = currentd.kdMetodeDelivery;
				$scope.item.metodeDeliveryHead = currentd.metodeDeliveryHead;
				$scope.item.metodeDeliveryHeadId = currentd.metodeDeliveryHeadId;
				$scope.item.metodeDelivery = currentd.metodeDelivery;
				$scope.item.qJenisDelivery = currentd.qJenisDelivery;
				$scope.item.reportDisplay = currentd.reportDisplay;
				$scope.item.kodeExternal = currentd.kodeExternal;
				$scope.item.namaExternal = currentd.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatad=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodeDelivery&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initd();

				});
			};

			$scope.enableDatad=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodeDelivery&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initd();

				});
			};
			$scope.tambahd = function()
		    {
		        var data = {
					"class": "MetodeDelivery",
					"listField": {
							"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kdMetodeDelivery": $scope.item.kdMetodeDelivery,
					 		"metodeDeliveryHead": $scope.item.metodeDeliveryHead,
					 		"metodeDeliveryHeadId": $scope.item.metodeDeliveryHeadId,
					 		"metodeDelivery": $scope.item.metodeDelivery,
					 		"qJenisDelivery": $scope.item.qJenisDelivery,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initd();
					$scope.item = {};
		        });
		    }

		    $scope.editd = function()
		    {	
		        var data = {
					"class": "MetodeDelivery",
					"listField": {
							"id": $scope.item.id,
							"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kdMetodeDelivery": $scope.item.kdMetodeDelivery,
					 		"metodeDeliveryHead": $scope.item.metodeDeliveryHead,
					 		"metodeDeliveryHeadId": $scope.item.metodeDeliveryHeadId,
					 		"metodeDelivery": $scope.item.metodeDelivery,
					 		"qJenisDelivery": $scope.item.qJenisDelivery,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initd();
		        });
		    }
		    $scope.batald = function () {
		    	$scope.showEditd = false;
		    	$scope.item = {};
		    }


}
]);
});
/////end