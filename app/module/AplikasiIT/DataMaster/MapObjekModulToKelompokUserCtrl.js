define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapObjekModulToKelompokUserCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.items = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.dataMapObjekModul = [{
				id: 1,
				namaExternal: "Simpan",
				simpan: false
			}, {
				id: 2,
				namaExternal: "Edit",
				edit: false
			}, {
				id: 3,
				namaExternal: "Hapus",
				hapus: false
			}, {
				id: 4,
				namaExternal: "Cetak",
				cetak: false
			}];
			$scope.arrMapObjekModul = [];
			var dataCheckbox = $('#check2 input[type=checkbox]');
			debugger;
            $scope.checkdataMapObjekModul = function (data) {

                var isExist = _.find($scope.arrMapObjekModul, function(dataExist) {
                    return dataExist == data;
                });
                if (isExist == undefined) {
                    $scope.arrMapObjekModul.push(data);
                    data.isChecked = true;
                    debugger;
                } else {
                    $scope.arrMapObjekModul = _.without($scope.arrMapObjekModul, data);
                }
                debugger;
            };
            $scope.checkAll = function(data) {
            	var data = data;
            	var dataCheckbox = $('#check2 input[type=checkbox]');
            	var namaExternal = "";
            	debugger;
            	if (data == true) {
            		$('#check2 input[type=checkbox]').prop('checked', true);
            		$scope.item.simpan = dataCheckbox[0].checked;
            		$scope.item.hapus = dataCheckbox[1].checked;
            		$scope.item.edit = dataCheckbox[2].checked;
            		$scope.item.cetak = dataCheckbox[3].checked;
            		debugger;
            	}
            	else {
            		$('#check2 input[type=checkbox]').prop('checked', false);
            		$scope.item.simpan = dataCheckbox[0].checked;
            		$scope.item.hapus = dataCheckbox[1].checked;
            		$scope.item.edit = dataCheckbox[2].checked;
            		$scope.item.cetak = dataCheckbox[3].checked;
            	}
            };
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MapObjekModulToKelompokUser", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MapObjekModulToKelompokUser;
					
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
			IPSRSService.getFieldListData("KelompokUser&select=id,kelompokUser", true).then(function(dat){
				$scope.listkelompokUser = dat.data;
			});

			IPSRSService.getFieldListData("ObjekModulAplikasi&select=id,objekModulAplikasi", true).then(function(dat){
				$scope.listobjekModulAplikasi = dat.data;
			});
			$scope.columnMapObjekModulToKelompokUser = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kelompokUser",
				"title": "kelompok User"
			},
			{
				"field": "kelompokUserId",
				"title": "kelompok User Id"
			},
			{
				"field": "objekModulAplikasi",
				"title": "objek Modul Aplikasi"
			},
			{
				"field": "objekModulAplikasiId",
				"title": "objek Modul Aplikasi Id"
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
                columns: $scope.columnMapObjekModulToKelompokUser,
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
				$scope.item.kelompokUser = current.kelompokUser;
				$scope.item.kelompokUserId = current.kelompokUserId;
				$scope.item.objekModulAplikasi = current.objekModulAplikasi;
				$scope.item.objekModulAplikasiId = current.objekModulAplikasiId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapObjekModulToKelompokUser&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapObjekModulToKelompokUser&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.item.simpan = false;
			$scope.item.edit = false;
			$scope.item.hapus = false;
			$scope.item.cetak = false;
			$scope.clickSimpan =  function(data) {
				$scope.item.simpan = data;
			};
			$scope.clickEdit = function(data) {
				$scope.items.edit = data;
			};
			$scope.clickHapus = function(data) {
				$scope.item.hapus = data;
			};
			$scope.clickCetak = function(data) {
				$scope.item.cetak = data;
			};

			$scope.tambah = function()
		    {
		        var data = {
					"class": "MapObjekModulToKelompokUser",
					"listField": {
							"kelompokUser": $scope.item.kelompokUser,
					 		"kelompokUserId": $scope.item.kelompokUserId,
					 		"objekModulAplikasi": $scope.item.objekModulAplikasi,
					 		"objekModulAplikasiId": $scope.item.objekModulAplikasiId,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"simpan": $scope.item.simpan,
					 		"hapus": $scope.item.hapus,
					 		"edit": $scope.item.edit,
					 		"cetak": $scope.item.cetak
					 		
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
					"class": "MapObjekModulToKelompokUser",
					"listField": {
							"id": $scope.item.id,
							"kelompokUser": $scope.item.kelompokUser,
					 		"kelompokUserId": $scope.item.kelompokUserId,
					 		"objekModulAplikasi": $scope.item.objekModulAplikasi,
					 		"objekModulAplikasiId": $scope.item.objekModulAplikasiId,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec,
					 		"simpan": $scope.item.simpan,
					 		"hapus": $scope.item.hapus,
					 		"edit": $scope.item.edit,
					 		"cetak": $scope.item.cetak
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