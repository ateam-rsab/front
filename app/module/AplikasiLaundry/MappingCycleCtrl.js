define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MappingCycleCtrl', ['$rootScope', '$scope', 'ModelItem','FindSarpras','ManageSarpras','$state','$mdDialog',
		function($rootScope, $scope, ModelItem, FindSarpras, ManageSarpras,$state,$mdDialog) {
			ModelItem.get("Laundry/MappingCycle").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, 
			function errorCallBack(err) {});
			$scope.item = {};
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Ruangan", true).then(function(data) {
				$scope.listRuangan = data;
			})
			ModelItem.getDataDummyGeneric("StatusLaundry", true).then(function(data) {
				$scope.listStatusLaundry = data;
			})

			$scope.GetEdit = function(){
				debugger
				if($state.params.noRec != ""){
					if($state.params.noRec != undefined){
					$scope.ModeEdit = true;
					FindSarpras.getSarpras("mapping-cycle/get-mapping-cycle-by-norec/?noRec="+$state.params.noRec).then(function(dat){
	        		$scope.sourceMasterProsesCuci = dat.data.data.listMappingCycleByNoRec;
	        			$scope.sourceMasterProsesCuci[0].namaBahan.forEach(function(dataLinen){
	        		  		var tempDataBahanLinenEdit = {
								"no": $scope.no++,
								"namaBahan" : {namaProduk : dataLinen.namaBahan, idProduk : dataLinen.idBahan},
								"jumlah" : dataLinen.jumlah,
								"satuanStandar" : {idSatuanStandar : dataLinen.idSatuan, satuanStandar : dataLinen.satuan},
								"noRec" :dataLinen.noRec,
								"statusEnabled" : null
						 	 }
			      			$scope.daftarBahanLinen.add(tempDataBahanLinenEdit);
			      		})
					$scope.item.mesin = {id : $scope.sourceMasterProsesCuci[0].idMesin,
										namaMesin: $scope.sourceMasterProsesCuci[0].namaMesin}
					$scope.item.jenisLinen = {id : $scope.sourceMasterProsesCuci[0].idJenisLinen,
											  jenisLinen :$scope.sourceMasterProsesCuci[0].jenisLinen} 
					$scope.item.prosesCuci = {id: $scope.sourceMasterProsesCuci[0].idProsesCuci,
											  prosesCuci : $scope.sourceMasterProsesCuci[0].prosesCuci}
					FindSarpras.getSarpras("mesin/find-mesin-laundry/").then(function(dat){
	       			$scope.sourceMasterMesin = dat.data.data.data;
	       				for(var y=0; y<$scope.sourceMasterMesin.length; y++){
	       					if($scope.sourceMasterMesin[y].id == $scope.item.mesin.id ){
	                           $scope.item.mesin.satuan = $scope.sourceMasterMesin[y].satuan
	                           $scope.item.mesin.kapasitas = $scope.sourceMasterMesin[y].kapasitas
	       					}
	       				}
	        	    });
					$scope.satuan();
	         	  });
			     }else{
			     	$scope.item = {};	
					$scope.item.mesin = "";
					$scope.item.jenisLinen = "";
					$scope.item.prosesCuci = "";
					$scope.item.satuan = "";
					$scope.item.kapasitas = "";
					$state.params.noRec = undefined;
					$scope.ModeEdit = false;
			     }
				
				}else{
					debugger
					$scope.item = {};	
					$scope.item.mesin = "";
					$scope.item.jenisLinen = "";
					$scope.item.prosesCuci = "";
					$scope.item.satuan = "";
					$scope.item.kapasitas = "";
					$state.params.noRec = undefined;
					$scope.ModeEdit = false;
				}
			 }
			$scope.GetEdit();

            FindSarpras.getSarpras("jenis-linen/find-all-jenis-linen/").then(function(dat){
            	$scope.sourceMasterJenisLinen = dat.data.data;
            });
            FindSarpras.getSarpras("proses-cuci/find-all-proses-cuci/").then(function(dat){
            	$scope.sourceMasterProsesCuci= dat.data.data;
            });
            
            FindSarpras.getSarpras("mesin/find-mesin-laundry/").then(function(dat){
            $scope.sourceMasterMesin= dat.data.data.data;
            });

            FindSarpras.getSarpras("mapping-cycle/find-nama-bahan/").then(function(dat){
            	$scope.sourceMasterProduk= dat.data;
            });


			$scope.Batal = function(){
			debugger
			  $scope.item = {};	
			  $scope.item.mesin = "";
			  $scope.item.jenisLinen = "";
			  $scope.item.prosesCuci = "";
			  $scope.item.satuan = "";
			  $scope.item.kapasitas = "";
			  $state.params.noRec = undefined;
			  $scope.ModeEdit = false;
			  $state.go('DaftarMappingCycle')
			}

			$scope.satuan = function() {
			if($scope.item.mesin != undefined){
				if($scope.item.mesin != ""){
					$scope.item.satuanKg = $scope.item.mesin.satuan;
					$scope.item.kapasitas = $scope.item.mesin.kapasitas;
				 }
			  }
			};

			$scope.daftarBahanLinen = new kendo.data.DataSource({
				data: []
			});
			$scope.columndaftarBahanLinen = [
			{
				"field": "no",
				"title": "<h3 align=center>No</h3>",
				"width": "30px",
				"attributes": {align:"center"}
			}, {
				"field": "namaBahan.namaProduk",
				"title": "<h3 align=center>Nama Bahan<h3>",
				"width": "300px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah<h3>",
				"width": "100px",
				"attributes": {align:"center"}
			}, {
				"field": "satuanStandar.satuanStandar",
				"title": "<h3 align=center>Satuan<h3>",
				"width": "150px"
			}, {
				command: { 
					text: "Hapus",
					width:"30px", 
					attributes: {align:"center"}, 
					click: $scope.removeDataBahanLinen 
				},
				title: "<h3 align=center>Action</h3>",
				width: "80px"
			}];

			$scope.addDataBahanLinen = function() {
				var tempDataBahanLinen = {
					"no": $scope.no++,
					"namaBahan" : $scope.item.namaProduk,
					"jumlah" : $scope.item.jumlah,
					"satuanStandar" : $scope.item.satuanStandar
				}
				$scope.daftarBahanLinen.add(tempDataBahanLinen);
				$scope.item.namaProduk="",
				$scope.item.jumlah="",
				$scope.item.satuanStandar=""
			}

			$scope.temp = [];
			$scope.removeDataBahanLinen = function(e) {
				if($scope.ModeEdit == false){
					e.preventDefault();
					var grid = this;
					var row = $(e.currentTarget).closest("tr");
					$scope.tempDataBahanLinen = $scope.daftarBahanLinen
					.filter(function(el){
						return el.name !== grid[0].name;
					});
					grid.removeRow(row);
				}else{ 
   		             var grid = $("#DataIdGrid").data("kendoGrid");
                    var selectedItem = grid.dataItem(grid.select());
                     	if(selectedItem != null){
                     		for(var i=0; i<$scope.daftarBahanLinen._data.length; i++){
                     			if(selectedItem.no == $scope.daftarBahanLinen._data[i].no){
                     	   		   var isiData = $scope.daftarBahanLinen._data[i];
                     	   		   $scope.daftarBahanLinen._data[i].statusEnabled = false;
                     	   		   $scope.temp.push(isiData);
                     			}
                     		}
                 		}else{
                 			toastr.warning('Daftar Harus Dipilih Terlebih dahulu !!')
                 		}
					 e.preventDefault();
					 var gridEdit = this;	
					 var OneRow = $(e.currentTarget).closest("tr");
					 $scope.tempDataBahanLinen = $scope.daftarBahanLinen
					 .filter(function(el){
						return el.name !== gridEdit[0].name;
					 });
					 //OneRow.hide();
					 if(selectedItem == null){
					 	/*toastr.warning('Data Harus Dipilih Terlebih dahulu !!')*/
					 }else{
					 	grid.removeRow(OneRow);
					 	$scope.DataTemp = $scope.temp;
					 }

				  }
			};

	   		$scope.temp = [];
			$scope.Save = function(){
			debugger 
				var dat = $scope.daftarBahanLinen._data;
				console.log(JSON.stringify(dat));
				var i=0;
				var mapCycle = [];
				if($scope.DataTemp != undefined){
					$scope.DataTemp.forEach(function(DataEdit){
							var data = {
										 "namaBahan":{"id" : DataEdit.namaBahan.idProduk},
										 "jumlah" : parseInt(DataEdit.jumlah),
										 "satuan":{"id" : DataEdit.satuanStandar.idSatuanStandar},
										 "statusEnabled":"false",
										 "noRec" : DataEdit.noRec
								       }
						mapCycle[i] =data;
						i++;
					}) 
				}

				dat.forEach(function(data){
					var data ={
						"namaBahan":{"id" : data.namaBahan.idProduk},
						"jumlah" : parseInt(data.jumlah),
						"satuan":{"id" : data.satuanStandar.idSatuanStandar},
						"statusEnabled":"true",
						"noRec" : data.noRec
					}
					mapCycle[i] =data;
					i++;
				})
				console.log(JSON.stringify(mapCycle));
				
				var data = {
					"mesin": 
							{
							 "id": $scope.item.mesin.id
						    },
					  "jenisLinen": 
						{
							"id": $scope.item.jenisLinen.id
						},
					"prosesCuci": 
						{
							"id": $scope.item.prosesCuci.id
						},
					"noRec" : $state.params.noRec,
					"statusEnabled":"true",
					"mapCycle": mapCycle
				}

        		console.log(JSON.stringify(data));
        		ManageSarpras.saveSarpras(data,"mapping-cycle/save-mapping-cycle/").then(function(e) {
	        		$scope.item = {};
	                var confirm = $mdDialog.confirm()
	                      .title('Caution')
	                      .textContent('Apakah anda akan menuju Daftar Mapping Cycle?')
	                      .ariaLabel('Lucky day')
	                      .ok('Ya')
	                      .cancel('Tidak')
	                $mdDialog.show(confirm).then(function() {
	                    $state.go("DaftarMappingCycle");
	                })
            	});
              };
            }
         ]);
     });

       /*  @. . .OLD SOURCE==================================================== 		
    		
			if($state.params.noRec != ""){
				toastr.warning('Data Belum Memiliki service untuk edit');
			}else{
				toastr.warning('Ini Adalah Data Baru')
			}

    		$scope.item.noMesin="",
    		$scope.item.jenisLinen="",
    		$scope.item.kapasitas="",
    		$scope.daftarBahanLinen._data=""
             ModelItem.getDataDummyGeneric("JenisLinen", true).then(function(data) {
                $scope.listJenisLinen = data;
            })
            ModelItem.getDataDummyGeneric("NoMesin", true).then(function(data) {
                $scope.listMesin = data;
            })

            FindSarpras.getSarpras("mapping-cycle/find-mesin-dengan-kapasitas/").then(function(dat){
            	$scope.sourceMasterMesin= dat.data.data;
            });

            $scope.daftarmapping = function(){
            	$state.go('DaftarMappingCycle')
            }


			mapping-jenis-linen-ke-bahan/find-produk-by-kelompok-produk/
			FindSarpras.getSarpras("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function(dat){
				$scope.sourceMasterSatuan= dat;
			});

			$scope.satuanBahan = function() {
				if($scope.item.namaProduk != undefined){
				   $scope.item.satuanStandar = $scope.item.namaProduk.satuanStandar;
				}
			};*/

			      // var dataSelect = _.find($scope.daftarBahanLinen._data, function(data){
			 // return data.no == dataSelect.no; 
			 // });
            //if(dataSelect.statCheckbox){
				//dataSelect.statCheckbox = false;
			//}else{
		 		//dataSelect.statCheckbox = true;
			// }


