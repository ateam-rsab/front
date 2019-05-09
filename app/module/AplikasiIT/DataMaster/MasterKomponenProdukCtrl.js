define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MasterKomponenProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=BentukProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.BentukProduk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


var inity = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=BahanProduk", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.BahanProduk;
					
					$scope.dataSourcey = new kendo.data.DataSource({
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
			inity();

IPSRSService.getFieldListData("MerkProduk&select=id,namaExternal", true).then(function(dat){
$scope.listmerkproduk= dat.data;
});

 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=TypeProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.TypeProduk;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();

var initv = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MerkProduk", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MerkProduk;
					
					$scope.dataSourcev = new kendo.data.DataSource({
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
			initv();
			
 var initq = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=WarnaProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.WarnaProduk;
                                    					
$scope.dataSourceq = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initq();			
			
$scope.columnWarnaProduk = [
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
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "kdWarnaProduk",
"title": "kd Warna Produk"
},
{
"field": "qWarnaProduk",
"title": "q Warna Produk"
},
{
"field": "warnaProduk",
"title": "warna Produk"
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



			
			
$scope.columnBahanProduk = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdBahanProduk",
				"title": "kd Bahan Produk"
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
				"field": "namaBahanProduk",
				"title": "nama Bahan Produk"
			},
			{
				"field": "qBahanProduk",
				"title": "q Bahan Produk"
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
			

$scope.columnTypeProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "namaBentukProduk",
"title": "Bentuk Produk"
},
{
"field": "kdBentukProduk",
"title": "kd Bentuk Produk"
},
{
"field": "qBentukProduk",
"title": "q Bentuk Produk"
},
{
"field": "id",
"title": "id"
},
{
"field": "",
"title": "report Display"
},
{
"field": "",
"title": "kode External"
},
{
"field": "",
"title": "nama External"
},
{
"field": "",
"title": "status Enabled"
},
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];						
			
$scope.columnMerkProduk = [
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
				"field": "kdMerkProduk",
				"title": "kd Merk Produk"
			},
			{
				"field": "merkProduk",
				"title": "merk Produk"
			},
			{
				"field": "qMerkProduk",
				"title": "q Merk Produk"
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

///colom tabel
$scope.columnBentukProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "namaBentukProduk",
"title": "Bentuk Produk"
},
{
"field": "kdBentukProduk",
"title": "kd Bentuk Produk"
},
{
"field": "qBentukProduk",
"title": "q Bentuk Produk"
},
{
"field": "id",
"title": "id"
},
{
"field": "",
"title": "report Display"
},
{
"field": "",
"title": "kode External"
},
{
"field": "",
"title": "nama External"
},
{
"field": "",
"title": "status Enabled"
},
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];

$scope.mainGridOptionsv = { 
                pageable: true,
                columns: $scope.columnMerkProduk,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
			
$scope.mainGridOptionsq = { 
 pageable: true,
 columns: $scope.columnWarnaProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };			
			
$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnTypeProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };			

 	$scope.mainGridOptionsy = { 
                pageable: true,
                columns: $scope.columnBahanProduk,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };


$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnBentukProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
 
  $scope.klikq = function(currentq){
$scope.showEditq = true;
$scope.currentq = currentq;
$scope.item.departemen = currentq.departemen;
$scope.item.departemenId = currentq.departemenId;
$scope.item.kelompokProduk = currentq.kelompokProduk;
$scope.item.kelompokProdukId = currentq.kelompokProdukId;
$scope.item.kdWarnaProduk = currentq.kdWarnaProduk;
$scope.item.qWarnaProduk = currentq.qWarnaProduk;
$scope.item.warnaProduk = currentq.warnaProduk;
$scope.item.id = currentq.id;
$scope.item.noRec = currentq.noRec;
$scope.item.reportDisplay = currentq.reportDisplay;
$scope.item.kodeExternal = currentq.kodeExternal;
$scope.item.namaExternal = currentq.namaExternal;
$scope.item.statusEnabled = currentq.statusEnabled;
};
 
 
 $scope.kliky = function(currenty){
            	$scope.showEdity = true;
				$scope.currenty = currenty;
				// debugger;
				$scope.item.id = currenty.id;
				$scope.item.noRec = currenty.noRec;
				$scope.item.statusEnabled = currenty.statusEnabled;
				$scope.item.kdBahanProduk = currenty.kdBahanProduk;
				$scope.item.departemen = currenty.departemen;
				$scope.item.departemenId = currenty.departemenId;
				$scope.item.kelompokProduk = currenty.kelompokProduk;
				$scope.item.kelompokProdukId = currenty.kelompokProdukId;
				$scope.item.namaBahanProduk = currenty.namaBahanProduk;
				$scope.item.qBahanProduk = currenty.qBahanProduk;
				$scope.item.reportDisplay = currenty.reportDisplay;
				$scope.item.kodeExternal = currenty.kodeExternal;
				$scope.item.namaExternal = currenty.namaExternal;
				// $scope.item.idPelapor = 

					
			}; 
 
$scope.klikv = function(currentv){
            	$scope.showEditv = true;
				$scope.currentv = currentv;
				// debugger;
				$scope.item.id = currentv.id;
				$scope.item.noRec = currentv.noRec;
				$scope.item.statusEnabled = currentv.statusEnabled;
				$scope.item.departemen = currentv.departemen;
				$scope.item.departemenId = currentv.departemenId;
				$scope.item.kdMerkProduk = currentv.kdMerkProduk;
				$scope.item.merkProduk = currentv.merkProduk;
				$scope.item.qMerkProduk = currentv.qMerkProduk;
				$scope.item.reportDisplay = currentv.reportDisplay;
				$scope.item.kodeExternal = currentv.kodeExternal;
				$scope.item.namaExternal = currentv.namaExternal;
				// $scope.item.idPelapor = 

					
			};

$scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.departemen = currentx.departemen;
$scope.item.departemenId = currentx.departemenId;
$scope.item.kelompokProduk = currentx.kelompokProduk;
$scope.item.kelompokProdukId = currentx.kelompokProdukId;
$scope.item.merkProduk = currentx.merkProduk;
$scope.item.merkProdukId = currentx.merkProdukId;
$scope.item.kdTypeProduk = currentx.kdTypeProduk;
$scope.item.qTypeProduk = currentx.qTypeProduk;
$scope.item.typeProduk = currentx.typeProduk;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};			
 
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kdBentukProduk = current.kdBentukProduk;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kelompokProduk = current.kelompokProduk;
$scope.item.kelompokProdukId = current.kelompokProdukId;
$scope.item.namaBentukProduk = current.namaBentukProduk;
$scope.item.qBentukProduk = current.qBentukProduk;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=BentukProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=BentukProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save
$scope.tambahy = function()
		    {
		        var data = {
					"class": "BahanProduk",
					"listField": {
							"kdBahanProduk": $scope.item.kdBahanProduk,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"namaBahanProduk": $scope.item.namaBahanProduk,
					 		"qBahanProduk": $scope.item.qBahanProduk,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					inity();
					$scope.item = {};
		        });
		    }
			
$scope.tambahq = function()
 {
var data = {
	"class": "WarnaProduk",
	"listField": {
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"kdWarnaProduk": $scope.item.kdWarnaProduk,
"qWarnaProduk": $scope.item.qWarnaProduk,
"warnaProduk": $scope.item.warnaProduk,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initq();
$scope.item = {};
 });
  }

$scope.editq = function()
  {	
   var data = {
 "class": "WarnaProduk",
	"listField": {
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"kdWarnaProduk": $scope.item.kdWarnaProduk,
"qWarnaProduk": $scope.item.qWarnaProduk,
"warnaProduk": $scope.item.warnaProduk,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initq();
});
}

$scope.batalq = function () {
$scope.showEditq = false;
$scope.item = {};
}




  
			
 $scope.edity = function()
		    {	
		        var data = {
					"class": "BahanProduk",
					"listField": {
							"id": $scope.item.id,
							"kdBahanProduk": $scope.item.kdBahanProduk,
					 		"departemen": $scope.item.departemen,
					 	
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"namaBahanProduk": $scope.item.namaBahanProduk,
					 		"qBahanProduk": $scope.item.qBahanProduk,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					inity();
		        });
		    }

 $scope.bataly = function () {
		    	$scope.showEdity = false;
		    	$scope.item = {};
		    }			





$scope.tambahx = function()
 {
var data = {
	"class": "TypeProduk",
	"listField": {
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"merkProduk": $scope.item.merkProduk,

"kdTypeProduk": $scope.item.kdTypeProduk,
"qTypeProduk": $scope.item.qTypeProduk,
"typeProduk": $scope.item.typeProduk,
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

$scope.tambahv = function()
		    {
		        var data = {
					"class": "MerkProduk",
					"listField": {
							"departemen": $scope.item.departemen,
					 		
					 		"kdMerkProduk": $scope.item.kdMerkProduk,
					 		"merkProduk": $scope.item.merkProduk,
					 		"qMerkProduk": $scope.item.qMerkProduk,
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
 
$scope.tambah = function()
 {
var data = {
	"class": "BentukProduk",
	"listField": {
"kdBentukProduk": $scope.item.kdBentukProduk,
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"namaBentukProduk": $scope.item.namaBentukProduk,
"qBentukProduk": $scope.item.qBentukProduk,
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
$scope.editx = function()
  {	
   var data = {
 "class": "TypeProduk",
	"listField": {
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"merkProduk": $scope.item.merkProduk,

"kdTypeProduk": $scope.item.kdTypeProduk,
"qTypeProduk": $scope.item.qTypeProduk,
"typeProduk": $scope.item.typeProduk,
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

 $scope.editv = function()
		    {	
		        var data = {
					"class": "MerkProduk",
					"listField": {
							"id": $scope.item.id,
							"departemen": $scope.item.departemen,
					 		
					 		"kdMerkProduk": $scope.item.kdMerkProduk,
					 		"merkProduk": $scope.item.merkProduk,
					 		"qMerkProduk": $scope.item.qMerkProduk,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initv();
		        });
		    }


 $scope.edit = function()
  {	
   var data = {
 "class": "BentukProduk",
	"listField": {
"kdBentukProduk": $scope.item.kdBentukProduk,
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"namaBentukProduk": $scope.item.namaBentukProduk,
"qBentukProduk": $scope.item.qBentukProduk,
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

$scope.batalx = function () {
$scope.showEditx = false;
$scope.item = {};
}

  $scope.batalv = function () {
		    	$scope.showEditv = false;
		    	$scope.item = {};
		    }



IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
$scope.listkelompokproduk= dat.data;
});

 }
]);
});
