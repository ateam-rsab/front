define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MasterKonstruksiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisKontruksi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisKontruksi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnJenisKontruksi = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisKontruksi",
"title": "jenis Kontruksi"
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
 columns: $scope.columnJenisKontruksi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisKontruksi = current.jenisKontruksi;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKontruksi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKontruksi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "JenisKontruksi",
	"listField": {
"jenisKontruksi": $scope.item.jenisKontruksi,
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
 "class": "JenisKontruksi",
	"listField": {
"jenisKontruksi": $scope.item.jenisKontruksi,
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

 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisSertifikat", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisSertifikat;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();
$scope.columnJenisSertifikat = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisSertifikat",
"title": "jenis Sertifikat"
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
 columns: $scope.columnJenisSertifikat,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
		$scope.showEditx = true;
		$scope.currentx = currentx;
		$scope.item.jenisSertifikat = currentx.jenisSertifikat;
		$scope.item.id = currentx.id;
		$scope.item.noRec = currentx.noRec;
		$scope.item.reportDisplay = currentx.reportDisplay;
		$scope.item.kodeExternal = currentx.kodeExternal;
		$scope.item.namaExternal = currentx.namaExternal;
		$scope.item.statusEnabled = currentx.statusEnabled;
	};
	
	$scope.disableDatax=function(){
		IPSRSService.getClassMaster("delete-master-table?className=JenisSertifikat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initx();
    });
    };
   
	$scope.enableDatax=function(){
		IPSRSService.getClassMaster("delete-master-table?className=JenisSertifikat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initx();
	});
	};
//// save 
$scope.tambahx = function()
 {
	 debugger;
		var data = {
		"class": "JenisSertifikat",
		"listField": {
			"jenisSertifikat": $scope.item.jenisSertifikat,
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
 "class": "JenisSertifikat",
	"listField": {
"jenisSertifikat": $scope.item.jenisSertifikat,
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
				IPSRSService.getFieldsMasterTable("get-data-master?className=StatusSuratIjin", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.StatusSuratIjin;
					
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
			$scope.columnStatusSuratIjin = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdStatusSuratIjin",
				"title": "kd Status Surat Ijin"
			},
			{
				"field": "qStatusSuratIjin",
				"title": "q Status Surat Ijin"
			},
			{
				"field": "statusSuratIjin",
				"title": "status Surat Ijin"
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
                columns: $scope.columnStatusSuratIjin,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.kliky = function(currenty){
            	$scope.showEdity = true;
				$scope.currenty = currenty;
				// debugger;
				$scope.item.id = currenty.id;
				$scope.item.noRec = currenty.noRec;
				$scope.item.statusEnabled = currenty.statusEnabled;
				$scope.item.kdStatusSuratIjin = currenty.kdStatusSuratIjin;
				$scope.item.qStatusSuratIjin = currenty.qStatusSuratIjin;
				$scope.item.statusSuratIjin = currenty.statusSuratIjin;
				$scope.item.reportDisplay = currenty.reportDisplay;
				$scope.item.kodeExternal = currenty.kodeExternal;
				$scope.item.namaExternal = currenty.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatay=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusSuratIjin&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					inity();

				});
			};

			$scope.enableDatay=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusSuratIjin&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					inity();

				});
			};
			$scope.tambahy = function()
		    {
		        var data = {
					"class": "StatusSuratIjin",
					"listField": {
							"kdStatusSuratIjin": $scope.item.kdStatusSuratIjin,
					 		"qStatusSuratIjin": $scope.item.qStatusSuratIjin,
					 		"statusSuratIjin": $scope.item.statusSuratIjin,
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

		    $scope.edity = function()
		    {	
		        var data = {
					"class": "StatusSuratIjin",
					"listField": {
							"id": $scope.item.id,
							"kdStatusSuratIjin": $scope.item.kdStatusSuratIjin,
					 		"qStatusSuratIjin": $scope.item.qStatusSuratIjin,
					 		"statusSuratIjin": $scope.item.statusSuratIjin,
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
var initn = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=StatusAkreditasi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.StatusAkreditasi;
					
					$scope.dataSourcen = new kendo.data.DataSource({
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
			initn();
			$scope.columnStatusAkreditasi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdStatusAkreditasi",
				"title": "kd Status Akreditasi"
			},
			{
				"field": "qStatusAkreditasi",
				"title": "q Status Akreditasi"
			},
			{
				"field": "statusAkreditasi",
				"title": "status Akreditasi"
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
                columns: $scope.columnStatusAkreditasi,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikn = function(currentn){
            	$scope.showEditn = true;
				$scope.currentn = currentn;
				// debugger;
				$scope.item.id = currentn.id;
				$scope.item.noRec = currentn.noRec;
				$scope.item.statusEnabled = currentn.statusEnabled;
				$scope.item.kdStatusAkreditasi = currentn.kdStatusAkreditasi;
				$scope.item.qStatusAkreditasi = currentn.qStatusAkreditasi;
				$scope.item.statusAkreditasi = currentn.statusAkreditasi;
				$scope.item.reportDisplay = currentn.reportDisplay;
				$scope.item.kodeExternal = currentn.kodeExternal;
				$scope.item.namaExternal = currentn.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatan=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusAkreditasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initn();

				});
			};

			$scope.enableDatan=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusAkreditasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initn();

				});
			};
			$scope.tambahn = function()
		    {
		        var data = {
					"class": "StatusAkreditasi",
					"listField": {
							"kdStatusAkreditasi": $scope.item.kdStatusAkreditasi,
					 		"qStatusAkreditasi": $scope.item.qStatusAkreditasi,
					 		"statusAkreditasi": $scope.item.statusAkreditasi,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initn();
					$scope.item = {};
		        });
		    }

		    $scope.editn = function()
		    {	
		        var data = {
					"class": "StatusAkreditasi",
					"listField": {
							"id": $scope.item.id,
							"kdStatusAkreditasi": $scope.item.kdStatusAkreditasi,
					 		"qStatusAkreditasi": $scope.item.qStatusAkreditasi,
					 		"statusAkreditasi": $scope.item.statusAkreditasi,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initn();
		        });
		    }
		    $scope.bataln = function () {
		    	$scope.showEditn = false;
		    	$scope.item = {};
		    }


}
]);
});