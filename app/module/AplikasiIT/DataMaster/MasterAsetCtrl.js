define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterAsetCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisAset", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisAset;
					
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
			IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
				$scope.listaccount = dat.data;
			});

			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("JenisAset&select=id,jenisAset", true).then(function(dat){
				$scope.listjenisAset = dat.data;
			});
			$scope.columnJenisAset = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisAset",
				"title": "jenis Aset"
			},
			{
				"field": "account",
				"title": "account"
			},
			{
				"field": "accountId",
				"title": "account Id"
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
				"field": "kdJenisAset",
				"title": "kd Jenis Aset"
			},
			{
				"field": "jenisAsetHead",
				"title": "jenis Aset Head"
			},
			{
				"field": "jenisAsetHeadId",
				"title": "jenis Aset Head Id"
			},
			{
				"field": "qJenisAset",
				"title": "q Jenis Aset"
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
                columns: $scope.columnJenisAset,
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
				$scope.item.jenisAset = current.jenisAset;
				$scope.item.account = current.account;
			
				$scope.item.departemen = current.departemen;
				
				$scope.item.kdJenisAset = current.kdJenisAset;
				$scope.item.jenisAsetHead = current.jenisAsetHead;
				
				$scope.item.qJenisAset = current.qJenisAset;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisAset&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisAset&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisAset",
					"listField": {
							"jenisAset": $scope.item.jenisAset,
					 		"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisAset": $scope.item.kdJenisAset,
					 		"jenisAsetHead": $scope.item.jenisAsetHead,
					 		
					 		"qJenisAset": $scope.item.qJenisAset,
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
					"class": "JenisAset",
					"listField": {
							"id": $scope.item.id,
							"jenisAset": $scope.item.jenisAset,
					 		"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 	
					 		"kdJenisAset": $scope.item.kdJenisAset,
					 		"jenisAsetHead": $scope.item.jenisAsetHead,
					 		
					 		"qJenisAset": $scope.item.qJenisAset,
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
		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }
			
			
			var initt = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokAset", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KelompokAset;
					
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
			initt();
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("JenisAset&select=id,jenisAset", true).then(function(dat){
				$scope.listjenisAset = dat.data;
			});

			IPSRSService.getFieldListData("MetodePenyusutan&select=id,metodePenyusutan", true).then(function(dat){
				$scope.listmetodePenyusutan = dat.data;
			});
			IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
				$scope.listaccount = dat.data;
			});
			$scope.columnKelompokAset = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "account",
				"title": "account"
			},
			{
				"field": "accountId",
				"title": "account Id"
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
				"field": "jenisAset",
				"title": "jenis Aset"
			},
			{
				"field": "jenisAsetId",
				"title": "jenis Aset Id"
			},
			{
				"field": "kdKelompokAset",
				"title": "kd Kelompok Aset"
			},
			{
				"field": "metodePenyusutan",
				"title": "metode Penyusutan"
			},
			{
				"field": "metodePenyusutanId",
				"title": "metode Penyusutan Id"
			},
			{
				"field": "kelompokAset",
				"title": "kelompok Aset"
			},
			{
				"field": "persenPenyusutan",
				"title": "persen Penyusutan"
			},
			{
				"field": "qKelompokAset",
				"title": "q Kelompok Aset"
			},
			{
				"field": "rumusPenyusutan",
				"title": "rumus Penyusutan"
			},
			{
				"field": "umurEkonomis_Thn",
				"title": "umur Ekonomis _Thn"
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
    			"template" : "<button class='btnEdit' ng-click='enableDatat()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDatat()'>Disable</button>"
			}
			];

			$scope.mainGridOptionst = { 
                pageable: true,
                columns: $scope.columnKelompokAset,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikt = function(currentt){
            	$scope.showEditt = true;
				$scope.currentt = currentt;
				// debugger;
				$scope.item.id = currentt.id;
				$scope.item.noRec = currentt.noRec;
				$scope.item.statusEnabled = currentt.statusEnabled;
				$scope.item.account = currentt.account;
				
				$scope.item.departemen = currentt.departemen;
			
				$scope.item.jenisAset = currentt.jenisAset;
				
				$scope.item.kdKelompokAset = currentt.kdKelompokAset;
				$scope.item.metodePenyusutan = currentt.metodePenyusutan;
				
				$scope.item.kelompokAset = currentt.kelompokAset;
				$scope.item.persenPenyusutan = currentt.persenPenyusutan;
				$scope.item.qKelompokAset = currentt.qKelompokAset;
				$scope.item.rumusPenyusutan = currentt.rumusPenyusutan;
				$scope.item.umurEkonomis_Thn = currentt.umurEkonomis_Thn;
				$scope.item.reportDisplay = currentt.reportDisplay;
				$scope.item.kodeExternal = currentt.kodeExternal;
				$scope.item.namaExternal = currentt.namaExternal;
				
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatat=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokAset&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initt();

				});
			};

			$scope.enableDatat=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokAset&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initt();

				});
			};
			$scope.tambaht = function()
		    {
		        var data = {
					"class": "KelompokAset",
					"listField": {
							"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"jenisAset": $scope.item.jenisAset,
					 		
					 		"kdKelompokAset": $scope.item.kdKelompokAset,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		
					 		"kelompokAset": $scope.item.kelompokAset,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qKelompokAset": $scope.item.qKelompokAset,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"umurEkonomis_Thn": $scope.item.umurEkonomis_Thn,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initt();
					$scope.item = {};
		        });
		    }

		    $scope.editt = function()
		    {	
		        var data = {
					"class": "KelompokAset",
					"listField": {
							"id": $scope.item.id,
							"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"jenisAset": $scope.item.jenisAset,
					 		
					 		"kdKelompokAset": $scope.item.kdKelompokAset,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		
					 		"kelompokAset": $scope.item.kelompokAset,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qKelompokAset": $scope.item.qKelompokAset,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"umurEkonomis_Thn": $scope.item.umurEkonomis_Thn,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initt();
		        });
		    }
		    $scope.batalt = function () {
		    	$scope.showEditt = false;
		    	$scope.item = {};
		    }
			
			var initp = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MetodePenyusutan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MetodePenyusutan;
					
					$scope.dataSourcep = new kendo.data.DataSource({
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
			initp();
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});
			$scope.columnMetodePenyusutan = [
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
				"field": "kdMetodePenyusutan",
				"title": "kd Metode Penyusutan"
			},
			{
				"field": "metodePenyusutan",
				"title": "metode Penyusutan"
			},
			{
				"field": "persenPenyusutan",
				"title": "persen Penyusutan"
			},
			{
				"field": "qMetodePenyusutan",
				"title": "q Metode Penyusutan"
			},
			{
				"field": "rumusPenyusutan",
				"title": "rumus Penyusutan"
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
                columns: $scope.columnMetodePenyusutan,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikp = function(currentp){
            	$scope.showEditp = true;
				$scope.currentp = currentp;
				// debugger;
				$scope.item.id = currentp.id;
				$scope.item.noRec = currentp.noRec;
				$scope.item.statusEnabled = currentp.statusEnabled;
				$scope.item.departemen = currentp.departemen;
				$scope.item.departemenId = currentp.departemenId;
				$scope.item.kdMetodePenyusutan = currentp.kdMetodePenyusutan;
				$scope.item.metodePenyusutan = currentp.metodePenyusutan;
				$scope.item.persenPenyusutan = currentp.persenPenyusutan;
				$scope.item.qMetodePenyusutan = currentp.qMetodePenyusutan;
				$scope.item.rumusPenyusutan = currentp.rumusPenyusutan;
				$scope.item.reportDisplay = currentp.reportDisplay;
				$scope.item.kodeExternal = currentp.kodeExternal;
				$scope.item.namaExternal = currentp.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatap=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodePenyusutan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initp();

				});
			};

			$scope.enableDatap=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodePenyusutan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initp();

				});
			};
			$scope.tambahp = function()
		    {
		        var data = {
					"class": "MetodePenyusutan",
					"listField": {
							"departemen": $scope.item.departemen,
					 		
					 		"kdMetodePenyusutan": $scope.item.kdMetodePenyusutan,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qMetodePenyusutan": $scope.item.qMetodePenyusutan,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
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
					"class": "MetodePenyusutan",
					"listField": {
							"id": $scope.item.id,
							"departemen": $scope.item.departemen,

					 		"kdMetodePenyusutan": $scope.item.kdMetodePenyusutan,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qMetodePenyusutan": $scope.item.qMetodePenyusutan,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initp();
		        });
		    }
		    $scope.batalp = function () {
		    	$scope.showEditp = false;
		    	$scope.item = {};
		    }
			
			var initw = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokAset", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KelompokAset;
					
					$scope.dataSourcew = new kendo.data.DataSource({
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
			initw();
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("JenisAset&select=id,jenisAset", true).then(function(dat){
				$scope.listjenisAset = dat.data;
			});

			IPSRSService.getFieldListData("MetodePenyusutan&select=id,metodePenyusutan", true).then(function(dat){
				$scope.listmetodePenyusutan = dat.data;
			});
			IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
				$scope.listaccount = dat.data;
			});
			$scope.columnKelompokAset = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "account",
				"title": "account"
			},
			{
				"field": "accountId",
				"title": "account Id"
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
				"field": "jenisAset",
				"title": "jenis Aset"
			},
			{
				"field": "jenisAsetId",
				"title": "jenis Aset Id"
			},
			{
				"field": "kdKelompokAset",
				"title": "kd Kelompok Aset"
			},
			{
				"field": "metodePenyusutan",
				"title": "metode Penyusutan"
			},
			{
				"field": "metodePenyusutanId",
				"title": "metode Penyusutan Id"
			},
			{
				"field": "kelompokAset",
				"title": "kelompok Aset"
			},
			{
				"field": "persenPenyusutan",
				"title": "persen Penyusutan"
			},
			{
				"field": "qKelompokAset",
				"title": "q Kelompok Aset"
			},
			{
				"field": "rumusPenyusutan",
				"title": "rumus Penyusutan"
			},
			{
				"field": "umurEkonomis_Thn",
				"title": "umur Ekonomis _Thn"
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
    			"template" : "<button class='btnEdit' ng-click='enableDataw()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDataw()'>Disable</button>"
			}
			];

			$scope.mainGridOptionsw = { 
                pageable: true,
                columns: $scope.columnKelompokAset,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikw = function(currentw){
            	$scope.showEditw = true;
				$scope.currentw = currentw;
				// debugger;
				$scope.item.id = currentw.id;
				$scope.item.noRec = currentw.noRec;
				$scope.item.statusEnabled = currentw.statusEnabled;
				$scope.item.account = currentw.account;
				
				$scope.item.departemen = currentw.departemen;
			
				$scope.item.jenisAset = currentw.jenisAset;
				
				$scope.item.kdKelompokAset = currentw.kdKelompokAset;
				$scope.item.metodePenyusutan = currentw.metodePenyusutan;
				
				$scope.item.kelompokAset = currentw.kelompokAset;
				$scope.item.persenPenyusutan = currentw.persenPenyusutan;
				$scope.item.qKelompokAset = currentw.qKelompokAset;
				$scope.item.rumusPenyusutan = currentw.rumusPenyusutan;
				$scope.item.umurEkonomis_Thn = currentw.umurEkonomis_Thn;
				$scope.item.reportDisplay = currentw.reportDisplay;
				$scope.item.kodeExternal = currentw.kodeExternal;
				$scope.item.namaExternal = currentw.namaExternal;
				
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDataw=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokAset&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initw();

				});
			};

			$scope.enableDataw=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokAset&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initw();

				});
			};
			$scope.tambahw = function()
		    {
		        var data = {
					"class": "KelompokAset",
					"listField": {
							"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"jenisAset": $scope.item.jenisAset,
					 		
					 		"kdKelompokAset": $scope.item.kdKelompokAset,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		
					 		"kelompokAset": $scope.item.kelompokAset,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qKelompokAset": $scope.item.qKelompokAset,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"umurEkonomis_Thn": $scope.item.umurEkonomis_Thn,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initw();
					$scope.item = {};
		        });
		    }

		    $scope.editw = function()
		    {	
		        var data = {
					"class": "KelompokAset",
					"listField": {
							"id": $scope.item.id,
							"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"jenisAset": $scope.item.jenisAset,
					 		
					 		"kdKelompokAset": $scope.item.kdKelompokAset,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		
					 		"kelompokAset": $scope.item.kelompokAset,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qKelompokAset": $scope.item.qKelompokAset,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"umurEkonomis_Thn": $scope.item.umurEkonomis_Thn,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initw();
		        });
		    }
		    $scope.batalw = function () {
		    	$scope.showEditw = false;
		    	$scope.item = {};
		    }

		}
		]);
});