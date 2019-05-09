define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RevMappingBMHPToSetAlatCtrl', ['$rootScope', '$scope', 'ModelItem','$state','IPSRSService','$mdDialog',
		function($rootScope, $scope, ModelItem,$state,IPSRSService,$mdDialog) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, 
	     function errorCallBack(err) {});
			
		 IPSRSService.getItem("bundlesetalat/get-bundle-set-alat", true).then(function(dat){
	      $scope.listBundel = dat.data.data;
		 });

	    $scope.mainGridOptions = {
            pageable: true,
            height: 300,
            selectable: "row",
            columns: $scope.columnProduk,
            filterable: {
                extra: false,
                operators: {
                    string: {
                        startsWith: "Cari Alat",
                    }
                }
            },
             editable : true
        };

       $scope.Cari = function(GetPencarian){
	    if(GetPencarian != undefined){
			  var q = GetPencarian;
		      var grid = $("#kGrid2").data("kendoGrid");
		     	  grid.dataSource.query({
		          page:1,
		          pageSize:20,
		          filter:{
		          	logic:"or",
		         		 filters:[
		            		       {field:"namaAlat", operator:"contains",value:q}
		           				 ]
		           }
		      });
	       }
	     }

	    $scope.ClearCari = function(){
		     $scope.Pencarians = "";
		    var gridData = $("#kGrid2").data("kendoGrid");
		    gridData.dataSource.filter({});
		 }

        $scope.klikmapping =function(ambildata){
            $scope.bundel = ambildata.bundel;
            $scope.idSatuan = ambildata.idSatuan;
            $scope.idalat = ambildata.idalat;
			$scope.jumlah = ambildata.jumlah;
			$scope.bundel =ambildata.bundel;
			$scope.IdMapping = ambildata.id;
			$scope.satuanStandar = ambildata.satuanStandar;
			$scope.statCheckbox = ambildata.statCheckbox
			toastr.info("Nama Alat : "+$scope.namaAlat+" Terpilih");
        }


        $scope.disableData = function(){
         var AllData = this.dataItem;
    		var data = [];
              data.push({
				  "bundleSetAlat" : {"id":$scope.item.bundel.id},
				  "bmhp":{"id":AllData.idalat},
				  "jumlah":parseInt(AllData.jumlah),
				  "statusEnabled": false,
				  "id" : AllData.id
				},)
             console.log(JSON.stringify(data));
             IPSRSService.saveDataSarPras(data,"mapping-bmhp-to-set-alat/save-all-mapping-bmhp-to-set-alat/").then(function(e) {
             $scope.fetchgridMapping();
			 });
	     }


		$scope.number = 1;
		$scope.fetchgridMapping = function(){
           $scope.isLoadingData = true;
           if($scope.item.bundel.id != undefined){
           IPSRSService.getItem("mapping-bmhp-to-set-alat/get-bundle-set-bmhp-by-id?idBundle="+$scope.item.bundel.id, true).then(function(dat){
		   var daftarMapping = dat.data.data;
		   if(daftarMapping[0] != undefined){
	       for(var i=0; i<daftarMapping.length; i++)
                {
                   daftarMapping[i].no = $scope.number++;
                   daftarMapping[i].statCheckbox = false;
                   daftarMapping[i].bundel = $scope.item.bundel.namaExternal;
                }
		    $scope.dataSourceMapping = new kendo.data.DataSource({
            pageSize:50,
            data : daftarMapping,
            $scrollable : true,
            });
	         for(var i=0; i<daftarMapping.length; i++)
                {
                    var tempId = daftarMapping[i].idalat;
                    	for(var y=0; y<$scope.dataSource._data.length; y++){
                    		if($scope.dataSource._data[y].id!=tempId){
                    			var temps = $scope.dataSource._data[y].statCheckbox = false;
                    			$scope.dataSource._data[y].noRec = undefined;
                    			$scope.dataSource._data[y].Jumlah = "";
                    		};
                    	}
                }
		       for(var i=0; i<daftarMapping.length; i++)
                {
                	var tempNorec = daftarMapping[i].id;
                	var tempJumlah = daftarMapping[i].jumlah;
                    var tempId = daftarMapping[i].idalat;
                    	for(var y=0; y<$scope.dataSource._data.length; y++){
                    		if($scope.dataSource._data[y].id==tempId){
                    			var temps = $scope.dataSource._data[y].statCheckbox = true;
                    			$scope.dataSource._data[y].noRec = tempNorec;
                    			$scope.dataSource._data[y].idplh = true;
                    			$scope.dataSource._data[y].jumlah = tempJumlah;
                    			$scope.dataSource._data[y].Jumlah = tempJumlah;
                    		};
                    	}
                }
		   reloadDataGrid($scope.dataSource._data);
		   }else{
		   	    $scope.fetchmappingAlatToBundel();
		    	$scope.dataSourceMapping = [];
		     }
		    })
		   }
		   $scope.isLoadingData =false
           }
          

		  $scope.columnDataAlat = [
			    	{ 
			    		"title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
			    		template: "# if (statCheckbox) { #"+
			    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
			    		"# } else { #"+
			    		"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
			    		"# } #",
			    		width:"15px"
			    	},
			    	{
			    		"field": "namaAlat",
			    		"title": "<h3 align=center>Nama Alat</h3>",
			    		"width":"120px"
			    
			    	},
			    	{
			    		"field": "Jumlah",
			    		"title": "<h3 align=center>Jumlah</h3>",
			    		"width":"50px",
			    		"filterable"  : false
			    
			    	},
			    	{
			    		"field": "satuanStandar",
			    		"title": "<h3 align=center>Satuan</h3>",
			    		"width":"60px",
			    		"filterable"  : false
			    
			    	}
	    	];

	    	$scope.columnDataMapping = [ 				    	
			    	{
			    		"field": "bundel",
			    		"title": "<h3 align=center>Bundel</h3>",
			    		"width":"150px"
			    
			    	},
			    	{
			    		"field": "namaAlat",
			    		"title": "<h3 align=center>Nama Alat</h3>",
			    		"width":"150px"
			    
			    	},
			    	{
			    		"field": "jumlah",
			    		"title": "<h3 align=center>Jumlah</h3>",
			    		"width":"150px"
			    
			    	},
			    	{
					    "title": "<h3 align=center>Action</h3>",
		    		    "width" : "100px",
		    		    "template" : "<button class='btnHapus' ng-click='disableData()'>Unmapping</button>"
			        }
	    	 ];

	    	$scope.tutup = function(){
	    		$state.go("home")
	    	}
           
           $scope.fetchmappingAlatToBundel = function(){
           IPSRSService.getItem("mapping-alat-to-bundle/get-mesin-all", true).then(function(dat){
		   var daftarteknisi = dat.data.data;
		       for(var i=0; i<daftarteknisi.length; i++)
                    {
                        daftarteknisi[i].statCheckbox = false;
                        daftarteknisi[i].idplh = null;                       
                    }
		    $scope.dataSource = new kendo.data.DataSource({
            pageSize:50,
            data : daftarteknisi,
            $scrollable : true,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        namaAlat:{ editable: false},
                        jumlah: { editable: true},
                        satuanStandar: { editable: false}
                    }
                  }
             },
            total : daftarteknisi.length });
            var grid = $('#kGrid').data("kendoGrid");
            grid.setDataSource($scope.dataSource);
            grid.refresh();
		   })
           }
           $scope.fetchmappingAlatToBundel();
          
	    	$scope.selectRow = function(dataItem)
			{
				var dataSelect = _.find($scope.dataSource._data, function(data){
					return data.id == dataItem.id; 
				});	

				if(dataSelect.statCheckbox){
					dataSelect.statCheckbox = false;
					dataSelect.Jumlah = null;
					dataSelect.idplh = true;
				}
				else
				{
					dataSelect.statCheckbox = true;
					dataSelect.idplh = true;
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
						tempData[i].idplh = true;
					}
				}
				else{
					isCheckAll = true;
					for(var i=0; i<tempData.length; i++)
					{
						tempData[i].statCheckbox = true;
						tempData[i].idplh = true;
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
				if (aktif)
					aktif = 0;
				else
					aktif = 1;		
			}


			$scope.Simpan = function(){
		     if(($scope.item.bundel != undefined)){		
             var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Apakah anda akan Mapping data ini?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

	           $mdDialog.show(confirm).then(function() {
	             $scope.Save();
	           })
	          }else{
	          	window.messageContainer.error('Pilih Bundel Terlebih dahulu');
	          }
             }



			$scope.Save = function(){
	    		var data = [];
	    	    for(var i=0; i<$scope.dataSource._data.length; i++){
	    			if(($scope.dataSource._data[i].statCheckbox)&&($scope.dataSource._data[i].idplh == true)){                 
                         data.push({
									  "bundleSetAlat" : {"id":$scope.item.bundel.id},
									  "bmhp":{"id":$scope.dataSource._data[i].id},
									  "jumlah":parseInt($scope.dataSource._data[i].Jumlah),
									  "statusEnabled": $scope.dataSource._data[i].statCheckbox,
									  "id" : $scope.dataSource._data[i].noRec
									},)


	    		    }else if(($scope.dataSource._data[i].statCheckbox == false)&&($scope.dataSource._data[i].idplh == true)){
                        data.push({ "bundleSetAlat" : {id : $scope.item.bundel.id},
									"bmhp" : {"id" : $scope.dataSource._data[i].id},
									"jumlah" : parseInt($scope.dataSource._data[i].Jumlah),
									"statusEnabled" : $scope.dataSource._data[i].statCheckbox,
									"id" : $scope.dataSource._data[i].noRec
						},)
	    		    }
	    	   }
               IPSRSService.saveDataSarPras(data,"mapping-bmhp-to-set-alat/save-all-mapping-bmhp-to-set-alat/").then(function(e) {
               	$scope.fetchgridMapping()
			   });
		    }
	    }

	]);
});