define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKelompokProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var initr = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=ProdusenProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.ProdusenProduk;
                                    					
$scope.dataSourcer = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initr();
			
			
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=GolonganProduk", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.GolonganProduk;
					
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
			var inits = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DetailGolonganProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DetailGolonganProduk;
                                    					
$scope.dataSources = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inits();
 var initt = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KategoryProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KategoryProduk;
                                    					
$scope.dataSourcet = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initt();


 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=StatusProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.StatusProduk;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();

			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
				$scope.listkelompokProduk = dat.data;
			});
			
			$scope.columnProdusenProduk = [
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
			
			
			
			
			$scope.columnGolonganProduk = [
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
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
			
			
			$scope.columnDetailGolonganProduk = [
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


$scope.columnKategoryProduk = [
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

$scope.columnStatusProduk = [
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

$scope.mainGridOptionst = { 
 pageable: true,
 columns: $scope.columnKategoryProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };

$scope.mainGridOptionsr = { 
 pageable: true,
 columns: $scope.columnProdusenProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };

$scope.mainGridOptionss = { 
 pageable: true,
 columns: $scope.columnDetailGolonganProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };

			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnGolonganProduk,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
			
			$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnStatusProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
			
			
			
            $scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.golonganProduk = current.golonganProduk;
				$scope.item.departemen = current.departemen;
				$scope.item.departemenId = current.departemenId;
				$scope.item.kdGolonganProduk = current.kdGolonganProduk;
				$scope.item.kelompokProduk = current.kelompokProduk;
				$scope.item.kelompokProdukId = current.kelompokProdukId;
				$scope.item.qGolonganProduk = current.qGolonganProduk;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			
			$scope.kliks = function(currents){
$scope.showEdits = true;
$scope.currents = currents;
$scope.item.detailGolonganProduk = currents.detailGolonganProduk;
$scope.item.departemen = currents.departemen;
$scope.item.departemenId = currents.departemenId;
$scope.item.kdDetailGolonganProduk = currents.kdDetailGolonganProduk;
$scope.item.kelompokProduk = currents.kelompokProduk;
$scope.item.kelompokProdukId = currents.kelompokProdukId;
$scope.item.qDetailGolonganProduk = currents.qDetailGolonganProduk;
$scope.item.id = currents.id;
$scope.item.noRec = currents.noRec;
$scope.item.reportDisplay = currents.reportDisplay;
$scope.item.kodeExternal = currents.kodeExternal;
$scope.item.namaExternal = currents.namaExternal;
$scope.item.statusEnabled = currents.statusEnabled;
};

$scope.klikt = function(currentt){
$scope.showEditt = true;
$scope.currentt = currentt;
$scope.item.kategoryProduk = currentt.kategoryProduk;
$scope.item.departemen = currentt.departemen;
$scope.item.departemenId = currentt.departemenId;
$scope.item.kdKategoryProduk = currentt.kdKategoryProduk;
$scope.item.kelompokProduk = currentt.kelompokProduk;
$scope.item.kelompokProdukId = currentt.kelompokProdukId;
$scope.item.qKategoryProduk = currentt.qKategoryProduk;
$scope.item.id = currentt.id;
$scope.item.noRec = currentt.noRec;
$scope.item.reportDisplay = currentt.reportDisplay;
$scope.item.kodeExternal = currentt.kodeExternal;
$scope.item.namaExternal = currentt.namaExternal;
$scope.item.statusEnabled = currentt.statusEnabled;
};

 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.departemen = currentx.departemen;
$scope.item.departemenId = currentx.departemenId;
$scope.item.kelompokProduk = currentx.kelompokProduk;
$scope.item.kelompokProdukId = currentx.kelompokProdukId;
$scope.item.kdStatusProduk = currentx.kdStatusProduk;
$scope.item.qStatusProduk = currentx.qStatusProduk;
$scope.item.statusProduk = currentx.statusProduk;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};


 $scope.klikr = function(currentr){
$scope.showEditr = true;
$scope.currentr = currentr;
$scope.item.departemen = currentr.departemen;
$scope.item.departemenId = currentr.departemenId;
$scope.item.negara = currentr.negara;
$scope.item.negaraId = currentr.negaraId;
$scope.item.kdProdusenProduk = currentr.kdProdusenProduk;
$scope.item.namaProdusenProduk = currentr.namaProdusenProduk;
$scope.item.qProdusenProduk = currentr.qProdusenProduk;
$scope.item.id = currentr.id;
$scope.item.noRec = currentr.noRec;
$scope.item.reportDisplay = currentr.reportDisplay;
$scope.item.kodeExternal = currentr.kodeExternal;
$scope.item.namaExternal = currentr.namaExternal;
$scope.item.statusEnabled = currentr.statusEnabled;
};

			
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=GolonganProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=GolonganProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambahr = function()
 {
var data = {
	"class": "ProdusenProduk",
	"listField": {
"departemen": $scope.item.departemen,

"negara": $scope.item.negara,

"kdProdusenProduk": $scope.item.kdProdusenProduk,
"namaProdusenProduk": $scope.item.namaProdusenProduk,
"qProdusenProduk": $scope.item.qProdusenProduk,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initr();
$scope.item = {};
 });
  }
			
			$scope.tambah = function()
		    {
		        var data = {
					"class": "GolonganProduk",
					"listField": {
							"golonganProduk": $scope.item.golonganProduk,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdGolonganProduk": $scope.item.kdGolonganProduk,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"qGolonganProduk": $scope.item.qGolonganProduk,
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
			
			
			$scope.tambahs = function()
 {
var data = {
	"class": "DetailGolonganProduk",
	"listField": {
"detailGolonganProduk": $scope.item.detailGolonganProduk,
"departemen": $scope.item.departemen,

"kdDetailGolonganProduk": $scope.item.kdDetailGolonganProduk,
"kelompokProduk": $scope.item.kelompokProduk,

"qDetailGolonganProduk": $scope.item.qDetailGolonganProduk,

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
  
  $scope.tambaht = function()
 {
var data = {
	"class": "KategoryProduk",
	"listField": {
"kategoryProduk": $scope.item.kategoryProduk,
"departemen": $scope.item.departemen,

"kdKategoryProduk": $scope.item.kdKategoryProduk,
"kelompokProduk": $scope.item.kelompokProduk,

"qKategoryProduk": $scope.item.qKategoryProduk,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initt();
$scope.item = {};
 });
  }
  
  $scope.tambahx = function()
 {
var data = {
	"class": "StatusProduk",
	"listField": {
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"kdStatusProduk": $scope.item.kdStatusProduk,
"qStatusProduk": $scope.item.qStatusProduk,
"statusProduk": $scope.item.statusProduk,
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
  
  $scope.editr = function()
  {	
   var data = {
 "class": "ProdusenProduk",
	"listField": {
"departemen": $scope.item.departemen,

"negara": $scope.item.negara,

"kdProdusenProduk": $scope.item.kdProdusenProduk,
"namaProdusenProduk": $scope.item.namaProdusenProduk,
"qProdusenProduk": $scope.item.qProdusenProduk,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initr();
});
}
  
   $scope.editx = function()
  {	
   var data = {
 "class": "StatusProduk",
	"listField": {
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"kdStatusProduk": $scope.item.kdStatusProduk,
"qStatusProduk": $scope.item.qStatusProduk,
"statusProduk": $scope.item.statusProduk,
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

		    $scope.edit = function()
		    {	
		        var data = {
					"class": "GolonganProduk",
					"listField": {
							"id": $scope.item.id,
							"golonganProduk": $scope.item.golonganProduk,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdGolonganProduk": $scope.item.kdGolonganProduk,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"qGolonganProduk": $scope.item.qGolonganProduk,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
		        });
		    }
			
			$scope.edits = function()
  {	
   var data = {
 "class": "DetailGolonganProduk",
	"listField": {
"detailGolonganProduk": $scope.item.detailGolonganProduk,
"departemen": $scope.item.departemen,

"kdDetailGolonganProduk": $scope.item.kdDetailGolonganProduk,
"kelompokProduk": $scope.item.kelompokProduk,

"qDetailGolonganProduk": $scope.item.qDetailGolonganProduk,
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

 $scope.editt = function()
  {	
   var data = {
 "class": "KategoryProduk",
	"listField": {
"kategoryProduk": $scope.item.kategoryProduk,
"departemen": $scope.item.departemen,
"kdKategoryProduk": $scope.item.kdKategoryProduk,
"kelompokProduk": $scope.item.kelompokProduk,

"qKategoryProduk": $scope.item.qKategoryProduk,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initt();
});
}
			
		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }
			
			$scope.batals = function () {
$scope.showEdits = false;
$scope.item = {};
}

$scope.batalt = function () {
$scope.showEditt = false;
$scope.item = {};
}

$scope.batalx = function () {
$scope.showEditx = false;
$scope.item = {};
}

$scope.batalr = function () {
$scope.showEditr = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Negara&select=id,namaExternal", true).then(function(dat){
$scope.listnegara= dat.data;
});

		}
		]);
});