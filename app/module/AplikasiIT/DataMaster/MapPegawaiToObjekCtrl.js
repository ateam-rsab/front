define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapPegawaiToObjekCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, 
			function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})


            //Data List Range
			 ManageSdm.getItem("mapegawaitobjekpajak/get-range", true).then(function(dat){
			 	debugger;
				$scope.ListRange = dat.data.data.data;
			});

			   //Daftar Objek Pajak
			 ManageSdm.getItem("mapegawaitobjekpajak/get-objek-pajak", true).then(function(dat){
				$scope.ListObjekPajak = dat.data.data.data;
				$scope.item.idx = dat.data.data.data.idJenisProduk;
			});

		

             $scope.loadGrid = function () {
             debugger;
			 ManageSdm.getItem("mapegawaitobjekpajak/get-pegawai", true).then(function(dat){
				debugger;
				var daftarProduk = dat.data.data.data;
		    			 for(var i=0; i<daftarProduk.length; i++)
		    			{
		    				daftarProduk[i].statCheckbox = false;
		    			}
		    	if(daftarProduk != undefined){
		    	$scope.CekMapping();
		    	}

				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : daftarProduk,
				$scrollable : true,
				total : daftarProduk.length });

				        var grid = $('#kGrid').data("kendoGrid");
		    			grid.setDataSource($scope.dataSource);
		    			grid.refresh();
			});
			}
			$scope.loadGrid();


	      $scope.CekMapping = function(){
	      debugger;
  		   ManageSdm.getItem("mapegawaitobjekpajak/get-map-pegawai-to-objek-pajak",true).then(function(dat){
  		   	debugger;
		   var daftarmapping = dat.data.data.data;
		       for(var i=0; i<daftarmapping.length; i++)
                    {
                        var tempId = daftarmapping[i].idPegawai;
                        	for(var y=0; y<$scope.dataSource._data.length; y++){
                        		if($scope.dataSource._data[y].idPegawai==tempId){
                        			var temps = $scope.dataSource._data[y].statCheckbox = true;
                        		};
                        	}
                    }
		   reloadDataGrid($scope.dataSource._data);
		   })
		   }

			$scope.mappegawai = function(){
            ManageSdm.getItem("mapegawaitobjekpajak/get-map-pegawai-to-objek-pajak",true).then(function(data){
            var datagrid = data.data.data.data;
            $scope.dataSource2 = new kendo.data.DataSource({
            data : datagrid,
            $scrollable : true
            });
            });
            }
            $scope.mappegawai();

			
	    	$scope.selectRow = function(dataItem)
			{
				debugger;
				var dataSelect = _.find($scope.dataSource._data, function(data){
					return data.idPegawai == dataItem.idPegawai; 
				});

				if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
				}
				else
				{
					dataSelect.statCheckbox = true;
				}
				
				
				reloadDataGrid($scope.dataSource._data);
			}

			var isCheckAll = false
			$scope.selectUnselectAllRow = function()
			{
				var tempData = $scope.dataSource._data;

				if(isCheckAll)
				{
					isCheckAll = false;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = false;
					}
				}
				else{
					isCheckAll = true;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = true;
					}
				}
				
				reloadDataGrid(tempData);
				
			}


			function reloadDataGrid(ds)
			{

				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#kGrid').data("kendoGrid");

				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}

			var aktif = false;
            var aktif = 0;
			$scope.check = function () {
				debugger;	
				if (aktif)
					aktif = 0;

				else
					aktif = 1;		
			}

			$scope.Simpan = function(){
			 	debugger;
	    		var dataPost = [];
	    		for(var i=0; i<$scope.dataSource._data.length; i++){
	    			if($scope.dataSource._data[i].statCheckbox){
                        dataPost.push({
									      "objekPajak" : {"id" : $scope.item.ObjekPajak.idObjekPajak},
										  "kdObjekPegawai" : {"id" : $scope.dataSource._data[i].idPegawai},
										  "range" : {"id" : $scope.item.Range.idRange},
										  "statusEnabled" : "true"

										},)
	    		}}
		          ManageSdm.saveData(dataPost,"mapegawaitobjekpajak/save-map-pegawai-to-objek-pajak").then(function(e) {
		          console.log(JSON.stringify(e.dataPost));
		          $scope.mappegawai();
		          }); }



            
            $scope.klik =function(ambildata){
            	debugger;
            	$scope.item.idPegawai = ambildata.idPegawai;
            	$scope.item.idObjekPajak = ambildata.idObjekPajak;
            	$scope.item.idMapping = ambildata.idMapPegawaiToObjek;
            }


		    $scope.disableData = function(){
		    	debugger
	    		var dataAdd=[];
		            dataAdd.push({
		            			  "id" : $scope.item.idMapping,
							      "objekPajak" : {"id" : $scope.item.idObjekPajak},
								  "kdObjekPegawai" : {"id" : $scope.item.idPegawai},
								  "statusEnabled" : "false"
								},)

				  ManageSdm.saveData(dataAdd,"mapegawaitobjekpajak/save-map-pegawai-to-objek-pajak").then(function(e) {
		          console.log(JSON.stringify(e.dataAdd));
		          //$scope.getProduk();
		          $scope.mappegawai();
		          });
		          }

			
           	$scope.columnDataPasienPiutang = [
			    	{ 
			    		"title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
			    		template: "# if (statCheckbox) { #"+
			    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
			    		"# } else { #"+
			    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
			    		"# } #",
			    		width:"50px"
			    	},
			    	{
			    		"field": "reportDisplay",
			    		"title": "<center style='font-size: 14px; font-weight: bold'>Nama Pegawai</center>",
			    		"width":"350px"
			    
			    	}
	    	];

	    	
	    	$scope.columnDataPasienPiutang2 = [
			    
			    	{
			    		"field": "namaExternal",
			    		"title": "<center style='font-size: 14px; font-weight: bold'>Nama Pegawai</center>",
			    		"width":"20px"
			    	},
			    	{
			    		"field": "idPegawai",
			    		"title": "<center style='font-size: 14px; font-weight: bold'>Id Pegawai</center>",
			    		"width":"20px"
			    	},
			    	{
						"title": "<center style='font-size: 14px; font-weight: bold'>Action</center>",
		    			"width" : "20px",
		    			"template" : "<button class='btnHapus' ng-click='disableData()'>UnMapping</button>"
					}
	    	];}

	]);
});