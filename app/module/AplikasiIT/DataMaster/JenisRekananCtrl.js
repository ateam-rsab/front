define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisRekananCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				debugger
				$scope.nomor = 1;
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisRekanan", true).then(function(dat){
					debugger
					$scope.listDataMaster = dat.data.data.JenisRekanan;
					for(var i=0; i<$scope.listDataMaster.length; i++){
						$scope.listDataMaster[i].no = $scope.nomor+++" .";
					}
					
				});
			}
			init();
			IPSRSService.getFieldListData("JenisRekanan&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisRekanan = dat.data;
			});
			$scope.columnJenisRekanan = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				 "attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			}
			},
			{
				"field": "namaJenisRekanan",
				"title": "<h3 align=center>Nama Jenis Rekanan<h3>"
			},
			{
				"field": "kdJenisRekanan",
				"title": "<h3 align=center>Kd Jenis Rekanan<h3>"
			},
			{
				"field": "qJenisRekanan",
				"title": "<h3 align=center>Q Jenis Rekanan<h3>"
			},
			{
				"field": "jenisRekanan",
				"title": "<h3 align=center>Jenis Rekanan<h3>"
			},
			{
				"field": "jenisRekananId",
				"title": "<h3 align=center>Jenis Rekanan Id<h3>"
			},
			{
				"field": "reportDisplay",
				"title": "<h3 align=center>Report Display<h3>"
			},
			{
				"field": "kodeExternal",
				"title": "<h3 align=center>Kode External<h3>"
			},
			{
				"field": "namaExternal",
				"title": "<h3 align=center>Nama External<h3>"
			},
			{
				"field": "statusEnabled",
				"title": "<h3 align=center>Status Enable<h3>"
			},
			{
				"title": "<h3 align=center>Action<h3>",
    			"width" : "200px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];


			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnJenisRekanan,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klik = function(current){
            	debugger
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.namaJenisRekanan = current.namaJenisRekanan;
				$scope.item.kdJenisRekanan = current.kdJenisRekanan;
				$scope.item.qJenisRekanan = current.qJenisRekanan;
				$scope.item.jenisRekanan = current.jenisRekanan;
				$scope.item.jenisRekananId = current.jenisRekananId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisRekanan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisRekanan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisRekanan",
					"listField": {
							"namaJenisRekanan": $scope.item.namaJenisRekanan,
					 		"kdJenisRekanan": $scope.item.kdJenisRekanan,
					 		"qJenisRekanan": $scope.item.qJenisRekanan,
					 		"jenisRekanan": $scope.item.jenisRekanan,
					 		"jenisRekananId": $scope.item.jenisRekananId,
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
					"class": "JenisRekanan",
					"listField": {
							"id": $scope.item.id,
							"namaJenisRekanan": $scope.item.namaJenisRekanan,
					 		"kdJenisRekanan": $scope.item.kdJenisRekanan,
					 		"qJenisRekanan": $scope.item.qJenisRekanan,
					 		"jenisRekanan": $scope.item.jenisRekanan,
					 		"jenisRekananId": $scope.item.jenisRekananId,
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