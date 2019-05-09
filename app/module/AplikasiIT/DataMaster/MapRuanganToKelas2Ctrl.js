define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapRuanganToKelas2Ctrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageLogistikPhp',
		function($rootScope, $scope, ModelItem,$state,ManageLogistikPhp) {
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

		  //get departement
		   ManageLogistikPhp.getDataTableMaster("produk/object-departemen", true).then(function(dat){
		   $scope.listDepartement= dat;
		   });

		   $scope.DepartemenToRuangan = function(){
		   ManageLogistikPhp.getDataTableMaster("produk/get-ruanganbyidDepart/"+$scope.item.departement.id,true).then(function(dat){
		   $scope.listRuangan = dat;
		   })
		   }
  			
  		   $scope.kelas = function(){
  		   	debugger;
  		   $scope.item.ruangan.id;
  		   ManageLogistikPhp.getDataTableMaster("produk/get-kelas/"+$scope.item.ruangan.id,true).then(function(dat){
		   debugger;
		   var daftarKelas = dat.data;
		    for(var i=0; i<daftarKelas.length; i++)
                    {
                        var tempId = daftarKelas[i].id;
                        	for(var y=0; y<$scope.dataSource._data.length; y++){
                        		if($scope.dataSource._data[y].id!=tempId){
                        			var temps = $scope.dataSource._data[y].statCheckbox = false;
                        		};
                        	}
                    }
		       for(var i=0; i<daftarKelas.length; i++)
                    {
                        var tempId = daftarKelas[i].id;
                        	for(var y=0; y<$scope.dataSource._data.length; y++){
                        		if($scope.dataSource._data[y].id==tempId){
                        			var temps = $scope.dataSource._data[y].statCheckbox = true;
                        		};
                        	}
                    }

              

		   reloadDataGrid($scope.dataSource._data);
		   })
		   }
           
           $scope.fetchgrid = function(){
           ManageLogistikPhp.getDataTableMaster("produk/get-kelas",true).then(function(dat){
		   var daftarKelas = dat.data;
		       for(var i=0; i<daftarKelas.length; i++)
                    {
                        daftarKelas[i].statCheckbox = false;
                    }
		    $scope.dataSource = new kendo.data.DataSource({
            pageSize:50,
            data : daftarKelas,
            $scrollable : true,
            total : daftarKelas.length });
            var grid = $('#kGrid').data("kendoGrid");
            grid.setDataSource($scope.dataSource);
            grid.refresh();
		   })
           }
           $scope.fetchgrid();
		   
		   
		   
	    	$scope.selectRow = function(dataItem)
			{
				debugger;
				var dataSelect = _.find($scope.dataSource._data, function(data){
					return data.id == dataItem.id; 
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
	    		var data = [];
	    		for(var i=0; i<$scope.dataSource._data.length; i++){
	    			if($scope.dataSource._data[i].statCheckbox){
                        data.push({ "idkelas" :  $scope.dataSource._data[i].id,
									"idruangan" : $scope.item.ruangan.id
								 },)
	    		              }
	    	           }


                  //Clone Test
	                // var data = {"idkelas" : 16,
				 // 	"idruangan" : 58
					// },
		    	ManageLogistikPhp.saveDataProduk(data,"produk/add-kelastoruangan").then(function(e) {
	            console.log(JSON.stringify(e.data));
	            $scope.item = {};
	            });
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
			    		"field": "namakelas",
			    		"title": "<center style='font-size: 14px; font-weight: bold'>Nama Kelas</center>",
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