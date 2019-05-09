define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PrinterCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Printer", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Printer;
					
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
			$scope.columnPrinter = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "printerDefault",
				"title": "printer Default"
			},
			{
				"field": "printerSizeCard",
				"title": "printer Size Card"
			},
			{
				"field": "printerSizeFull1",
				"title": "printer Size Full 1"
			},
			{
				"field": "printerSizeFull2",
				"title": "printer Size Full 2"
			},
			{
				"field": "printerSizeHalf1",
				"title": "printer Size Half 1"
			},
			{
				"field": "printerSizeHalf2",
				"title": "printer Size Half 2"
			},
			{
				"field": "printerSizePer16_1",
				"title": "printer Size Per 16_1"
			},
			{
				"field": "printerSizePer16_2",
				"title": "printer Size Per 16_2"
			},
			{
				"field": "printerSizePer32_1",
				"title": "printer Size Per 32_1"
			},
			{
				"field": "printerSizePer32_2",
				"title": "printer Size Per 32_2"
			},
			{
				"field": "printerSizePer4_1",
				"title": "printer Size Per 4_1"
			},
			{
				"field": "printerSizePer4_2",
				"title": "printer Size Per 4_2"
			},
			{
				"field": "printerSizePer64_1",
				"title": "printer Size Per 64_1"
			},
			{
				"field": "printerSizePer64_2",
				"title": "printer Size Per 64_2"
			},
			{
				"field": "printerSizePer8_1",
				"title": "printer Size Per 8_1"
			},
			{
				"field": "printerSizePer8_2",
				"title": "printer Size Per 8_2"
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
                columns: $scope.columnPrinter,
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
				$scope.item.printerDefault = current.printerDefault;
				$scope.item.printerSizeCard = current.printerSizeCard;
				$scope.item.printerSizeFull1 = current.printerSizeFull1;
				$scope.item.printerSizeFull2 = current.printerSizeFull2;
				$scope.item.printerSizeHalf1 = current.printerSizeHalf1;
				$scope.item.printerSizeHalf2 = current.printerSizeHalf2;
				$scope.item.printerSizePer16_1 = current.printerSizePer16_1;
				$scope.item.printerSizePer16_2 = current.printerSizePer16_2;
				$scope.item.printerSizePer32_1 = current.printerSizePer32_1;
				$scope.item.printerSizePer32_2 = current.printerSizePer32_2;
				$scope.item.printerSizePer4_1 = current.printerSizePer4_1;
				$scope.item.printerSizePer4_2 = current.printerSizePer4_2;
				$scope.item.printerSizePer64_1 = current.printerSizePer64_1;
				$scope.item.printerSizePer64_2 = current.printerSizePer64_2;
				$scope.item.printerSizePer8_1 = current.printerSizePer8_1;
				$scope.item.printerSizePer8_2 = current.printerSizePer8_2;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Printer&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Printer&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Printer",
					"listField": {
							"printerDefault": $scope.item.printerDefault,
					 		"printerSizeCard": $scope.item.printerSizeCard,
					 		"printerSizeFull1": $scope.item.printerSizeFull1,
					 		"printerSizeFull2": $scope.item.printerSizeFull2,
					 		"printerSizeHalf1": $scope.item.printerSizeHalf1,
					 		"printerSizeHalf2": $scope.item.printerSizeHalf2,
					 		"printerSizePer16_1": $scope.item.printerSizePer16_1,
					 		"printerSizePer16_2": $scope.item.printerSizePer16_2,
					 		"printerSizePer32_1": $scope.item.printerSizePer32_1,
					 		"printerSizePer32_2": $scope.item.printerSizePer32_2,
					 		"printerSizePer4_1": $scope.item.printerSizePer4_1,
					 		"printerSizePer4_2": $scope.item.printerSizePer4_2,
					 		"printerSizePer64_1": $scope.item.printerSizePer64_1,
					 		"printerSizePer64_2": $scope.item.printerSizePer64_2,
					 		"printerSizePer8_1": $scope.item.printerSizePer8_1,
					 		"printerSizePer8_2": $scope.item.printerSizePer8_2,
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
					"class": "Printer",
					"listField": {
							"id": $scope.item.id,
							"printerDefault": $scope.item.printerDefault,
					 		"printerSizeCard": $scope.item.printerSizeCard,
					 		"printerSizeFull1": $scope.item.printerSizeFull1,
					 		"printerSizeFull2": $scope.item.printerSizeFull2,
					 		"printerSizeHalf1": $scope.item.printerSizeHalf1,
					 		"printerSizeHalf2": $scope.item.printerSizeHalf2,
					 		"printerSizePer16_1": $scope.item.printerSizePer16_1,
					 		"printerSizePer16_2": $scope.item.printerSizePer16_2,
					 		"printerSizePer32_1": $scope.item.printerSizePer32_1,
					 		"printerSizePer32_2": $scope.item.printerSizePer32_2,
					 		"printerSizePer4_1": $scope.item.printerSizePer4_1,
					 		"printerSizePer4_2": $scope.item.printerSizePer4_2,
					 		"printerSizePer64_1": $scope.item.printerSizePer64_1,
					 		"printerSizePer64_2": $scope.item.printerSizePer64_2,
					 		"printerSizePer8_1": $scope.item.printerSizePer8_1,
					 		"printerSizePer8_2": $scope.item.printerSizePer8_2,
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