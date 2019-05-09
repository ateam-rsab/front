define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SatuanKerjaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanKerja", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.SatuanKerja;
					
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
			IPSRSService.getFieldListData("Kecamatan&select=id,namaExternal", true).then(function(dat){
				$scope.listkecamatan = dat.data;
			});
			$scope.columnSatuanKerja = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisSatuanKerja",
				"title": "jenis Satuan Kerja"
			},
			{
				"field": "jenisSatuanKerjaId",
				"title": "jenis Satuan Kerja Id"
			},
			{
				"field": "kdPimpinan",
				"title": "kd Pimpinan"
			},
			{
				"field": "kdSatuanKerja",
				"title": "kd Satuan Kerja"
			},
			{
				"field": "noSatuanKerja",
				"title": "no Satuan Kerja"
			},
			{
				"field": "qSatuanKerja",
				"title": "q Satuan Kerja"
			},
			{
				"field": "satuanKerja",
				"title": "satuan Kerja"
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
                columns: $scope.columnSatuanKerja,
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
				$scope.item.jenisSatuanKerja = current.jenisSatuanKerja;
				$scope.item.jenisSatuanKerjaId = current.jenisSatuanKerjaId;
				$scope.item.kdPimpinan = current.kdPimpinan;
				$scope.item.kdSatuanKerja = current.kdSatuanKerja;
				$scope.item.noSatuanKerja = current.noSatuanKerja;
				$scope.item.qSatuanKerja = current.qSatuanKerja;
				$scope.item.satuanKerja = current.satuanKerja;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=SatuanKerja&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=SatuanKerja&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "SatuanKerja",
					"listField": {
							"jenisSatuanKerja": $scope.item.jenisSatuanKerja,
					 		"jenisSatuanKerjaId": $scope.item.jenisSatuanKerjaId,
					 		"kdPimpinan": $scope.item.kdPimpinan,
					 		"kdSatuanKerja": $scope.item.kdSatuanKerja,
					 		"noSatuanKerja": $scope.item.noSatuanKerja,
					 		"qSatuanKerja": $scope.item.qSatuanKerja,
					 		"satuanKerja": $scope.item.satuanKerja,
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
					"class": "SatuanKerja",
					"listField": {
							"id": $scope.item.id,
							"jenisSatuanKerja": $scope.item.jenisSatuanKerja,
					 		"jenisSatuanKerjaId": $scope.item.jenisSatuanKerjaId,
					 		"kdPimpinan": $scope.item.kdPimpinan,
					 		"kdSatuanKerja": $scope.item.kdSatuanKerja,
					 		"noSatuanKerja": $scope.item.noSatuanKerja,
					 		"qSatuanKerja": $scope.item.qSatuanKerja,
					 		"satuanKerja": $scope.item.satuanKerja,
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

		}
		]);
});