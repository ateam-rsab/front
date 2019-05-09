define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KualifikasiJurusanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KualifikasiJurusan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KualifikasiJurusan;
					
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
			IPSRSService.getFieldListData("Pendidikan&select=id,namaExternal", true).then(function(dat){
				$scope.listpendidikan = dat.data;
			});
			$scope.columnKualifikasiJurusan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdKualifikasiJurusan",
				"title": "kd Kualifikasi Jurusan"
			},
			{
				"field": "pendidikan",
				"title": "pendidikan"
			},
			{
				"field": "pendidikanId",
				"title": "pendidikan Id"
			},
			{
				"field": "kualifikasiJurusan",
				"title": "kualifikasi Jurusan"
			},
			{
				"field": "qKualifikasiJurusan",
				"title": "q Kualifikasi Jurusan"
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
                columns: $scope.columnKualifikasiJurusan,
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
				$scope.item.kdKualifikasiJurusan = current.kdKualifikasiJurusan;
				$scope.item.pendidikan = current.pendidikan;
				$scope.item.pendidikanId = current.pendidikanId;
				$scope.item.kualifikasiJurusan = current.kualifikasiJurusan;
				$scope.item.qKualifikasiJurusan = current.qKualifikasiJurusan;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KualifikasiJurusan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KualifikasiJurusan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "KualifikasiJurusan",
					"listField": {
							"kdKualifikasiJurusan": $scope.item.kdKualifikasiJurusan,
					 		"pendidikan": $scope.item.pendidikan,
					 		
					 		"kualifikasiJurusan": $scope.item.kualifikasiJurusan,
					 		"qKualifikasiJurusan": $scope.item.qKualifikasiJurusan,
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
					"class": "KualifikasiJurusan",
					"listField": {
							"id": $scope.item.id,
							"agama": $scope.item.namaKualifikasiJurusan,
					 		"kdKualifikasiJurusan": $scope.item.kdKualifikasiJurusan,
					 		"qKualifikasiJurusan": $scope.item.qKualifikasiJurusan,
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