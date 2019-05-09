define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapProdukToObjekCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
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


            //Data List Jenis Produk
			 ManageSdm.getItem("produktoobjekpajak/get-jenis-produk", true).then(function(dat){
				$scope.ListJenisProduk = dat.data.data.data;
			});

			   //Daftar Objek Pajak
			 ManageSdm.getItem("produktoobjekpajak/get-objek-pajak", true).then(function(dat){
				$scope.ListObjekPajak = dat.data.data.data;
				$scope.item.idx = dat.data.data.data.idJenisProduk;
			});

		

             $scope.getProduk = function () {
				ManageSdm.getItem("produktoobjekpajak/get-map-produk-to-objek-pajak-by-jenis-produk?idJenis="+$scope.item.Produk.idJenisProduk, true).then(function(dat){
				$scope.dataMaster2 = dat.data.data.data;
				debugger;
				var dataMapping = dat.data.data.data;
				if(dataMapping!=undefined){
		    			 for(var i=0; i<dataMapping.length; i++)
		    			{
		    				var idDataMapping = dataMapping[i].jenisId;
		    			}
		    			}
				$scope.dataSource2 = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster2,
				$scrollable : true
				

					});
				});
			 ManageSdm.getItem("produktoobjekpajak/get-produk-by-jenis?idJenis="+$scope.item.Produk.idJenisProduk, true).then(function(dat){
				var daftarProduk = dat.data.data.data;
		    			 for(var i=0; i<daftarProduk.length; i++)
		    			{
		    				daftarProduk[i].statCheckbox = false;
		    			}
		    	if(daftarProduk!=undefined){
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
			};

		  $scope.CekMapping = function(){
  		   ManageSdm.getItem("produktoobjekpajak/get-map-produk-to-objek-pajak-by-jenis-produk?idJenis="+$scope.item.Produk.idJenisProduk,true).then(function(dat){
		   var daftarmapping = dat.data.data.data;
		       for(var i=0; i<daftarmapping.length; i++)
                    {
                        var tempId = daftarmapping[i].produkId;
                        	for(var y=0; y<$scope.dataSource._data.length; y++){
                        		if($scope.dataSource._data[y].idProduk==tempId){
                        			var temps = $scope.dataSource._data[y].statCheckbox = true;
                        		};
                        	}
                    }
		   reloadDataGrid($scope.dataSource._data);
		   })
		   }

		
	    	$scope.selectRow = function(dataItem)
			{
				debugger;
				var dataSelect = _.find($scope.dataSource._data, function(data){
					return data.idProduk == dataItem.idProduk; 
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

			$scope.cekData = function()
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
					for(var i=0; i<5; i++)
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
			 $scope.dataSource._data;
			  if($scope.item.ObjekPajak == undefined){
			  	alert('Objek Pajak Harus Dipilih dahulu !!')
			  }else{
	    		var dataPost = [];
	    		for(var i=0; i<$scope.dataSource._data.length; i++){
	    			if($scope.dataSource._data[i].statCheckbox){
                        dataPost.push({
									      "kdObjekPajak" : {"id" : $scope.item.ObjekPajak.idObjekPajak},
										  "kdProduk" : {"id" : $scope.dataSource._data[i].idProduk},
										  "statusEnabled" : "true"

										},)
	    		}}
		          ManageSdm.saveData(dataPost,"produktoobjekpajak/save-map-produk-to-objek-pajak").then(function(e) {
		          console.log(JSON.stringify(e.dataPost));
		          $scope.getProduk();
		          }); }
		          }

		    $scope.disableData = function(){
		    debugger
	    		var dataAdd=[];
			   
			    dataAdd.push({
				      "kdObjekPajak" : {"id" : $scope.item.obejekPajakId},
					  "kdProduk" : {"id" : $scope.item.produk},
					  "statusEnabled" : "false",
					  "noRec" : $scope.item.norec
				},)

				  ManageSdm.saveData(dataAdd,"produktoobjekpajak/save-map-produk-to-objek-pajak").then(function(e) {
		          console.log(JSON.stringify(e.dataAdd));
		          $scope.getProduk();
		          });
		          }


		   $scope.klik =function(ambildata){
            	debugger
            	$scope.item.nama = ambildata.namaProduk;
            	$scope.item.norec = ambildata.noRec;
            	$scope.item.produk = ambildata.produkId;
            	$scope.item.jenis = ambildata.jenisId;
            	$scope.item.stat = ambildata.statusEnabled;
            	$scope.item.ObjekPajak = ambildata.statusEnabled;
            	$scope.item.obejekPajakId = ambildata.obejekPajakId;
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
			    		"field": "namaProduk",
			    		"title": "<center style='font-size: 14px; font-weight: bold'>Nama Produk</center>",
			    		"width":"350px"
			    
			    	}
	    	];

	    	$scope.columnDataPasienPiutang2 = [
			    
			    	{
			    		"field": "namaProduk",
			    		"title": "<center style='font-size: 14px; font-weight: bold'>Nama Produk</center>",
			    		"width":"20px"
			    	},
			    	{
			    		"field": "statusEnabled",
			    		"title": "<center style='font-size: 14px; font-weight: bold'>Status Enabled</center>",
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