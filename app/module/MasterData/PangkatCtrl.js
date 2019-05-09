define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PangkatCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Pangkat", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Pangkat;
					
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
			IPSRSService.getFieldListData("GolonganPegawai&select=id,kodeExternal", true).then(function(dat){
				$scope.listkdGolonganPegawai = dat.data;
			});
			$scope.columnPangkat = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdGolonganPegawai",
				"title": "kd Golongan Pegawai"
			},
			{
				"field": "golonganPegawaiId",
				"title": "golongan Pegawai Id"
			},
			{
				"field": "kdPangkat",
				"title": "kd Pangkat"
			},
			{
				"field": "namaPangkat",
				"title": "nama Pangkat"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qPangkat",
				"title": "q Pangkat"
			},
			{
				"field": "ruang",
				"title": "ruang"
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
                columns: $scope.columnPangkat,
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
				$scope.item.kdGolonganPegawai = current.kdGolonganPegawai;
				$scope.item.golonganPegawaiId = current.golonganPegawaiId;
				$scope.item.kdPangkat = current.kdPangkat;
				$scope.item.namaPangkat = current.namaPangkat;
				$scope.item.noUrut = current.noUrut;
				$scope.item.qPangkat = current.qPangkat;
				$scope.item.ruang = current.ruang;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Pangkat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Pangkat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Pangkat",
					"listField": {
							"kdGolonganPegawai": $scope.item.kdGolonganPegawai,
					 		"golonganPegawaiId": $scope.item.golonganPegawaiId,
					 		"kdPangkat": $scope.item.kdPangkat,
					 		"namaPangkat": $scope.item.namaPangkat,
					 		"noUrut": $scope.item.noUrut,
					 		"qPangkat": $scope.item.qPangkat,
					 		"ruang": $scope.item.ruang,
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
					"class": "Pangkat",
					"listField": {
							"id": $scope.item.id,
							"kdGolonganPegawai": $scope.item.kdGolonganPegawai,
					 		"golonganPegawaiId": $scope.item.golonganPegawaiId,
					 		"kdPangkat": $scope.item.kdPangkat,
					 		"namaPangkat": $scope.item.namaPangkat,
					 		"noUrut": $scope.item.noUrut,
					 		"qPangkat": $scope.item.qPangkat,
					 		"ruang": $scope.item.ruang,
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