define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterStandarDietCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("Gizi/MasterSiklusMenu").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.StatusSave = true;
				$scope.isLoadingData = true;
				$scope.ShowDaftar = false;
				$scope.disabled = false;
			}, function errorCallBack(err) {});
			
			  $scope.dataJadi = new kendo.data.DataSource({
				 data: []
			   });


			 $scope.dataMasterDiet = new kendo.data.DataSource({
				data: []
			});		

			//waktu makanan
			FindPasienGizi.getGizi("jenis-waktu/get-jenis-waktu/").then(function(dat){
				$scope.ListjenisWaktu = dat.data;
			})

			//satuan
		    FindPasienGizi.getGizi("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function(dat){
				$scope.ListSatuan= dat;
			});
		    
		    //Bahan Makanan
		    FindPasienGizi.getGizi("map-jenis-diet-to-produk/get-produk-gizi/").then(function(dat){
				$scope.ListbahanMakanan= dat.data.data;
			});

		    //Jenis Diet
			FindPasienGizi.getGizi("jenis-diet/find-all/").then(function(dat){
				$scope.ListjenisDiet = dat.data;
			})					

		   $scope.init = function(){
				$scope.isLoadingData = true;
				$scope.ShowDaftar = false
				$scope.nomor = 1;
				FindPasienGizi.getGizi("map-jenis-diet-to-produk/get/").then(function(dat){
					$scope.dataJadi = dat.data.data;
					for(var i=0; i<$scope.dataJadi.length; i++){
						$scope.dataJadi[i].no =  $scope.nomor++;
					}
					    $scope.isLoadingData = false;
						$scope.ShowDaftar = true;
				})
			}
			$scope.init();

			$scope.mainGridOptions_1_1 = {
			 	    dataSource : $scope.dataJadi,
	                pageable: true,
	                scrollable: true,
	                shortable: true,
			        pageSize: 30,
			        filterable: {
			        			extra: false,operators: {string: {startsWith: "Pencarian"}}
							    },
			        columns: [
			        {
			            "field": "no",
			            "title": "<h3 align=center>No. </h3>",
			            "width": "10px",
			            "filterable" : false
			        },
			        {
			            "field": "jenisDiet",
			            "title": "<h3 align=center>Jenis Diet</h3>",
			            "width": "250px",
			            "filterable" : {search : true,multi: true}
			        }
			      ]
			  };


		  $scope.mainGridOptions_1_2 = function(dataItem) {
	   	    var SubDaftarMapping = []
	    	$scope.dataJadi.forEach(function(data){
	    		   $scope.number = 1;
	                 data.MapJenisDietToProduk.forEach(function(Subdata){
	                       var dataChild =	{ 
	                       					"no" : $scope.number++,
	                 					  	"berat" : Subdata.Berat,
											"id" : Subdata.id,
											"idMapJenisDietToProduk" : Subdata.idMapJenisDietToProduk,
											"idProduk" : Subdata.idProduk,
											"idSatuanStandar" : Subdata.idSatuanStandar,
											"jenisDiet" : Subdata.jenisDiet,
											"jenisWaktu" : Subdata.jenisWaktu,
											"namaProduk" : Subdata.namaProduk,
											"satuanStandar" : Subdata.SatuanStandar
	                                        }
	                        SubDaftarMapping.push(dataChild); 
	                     })
	           })
	    	   $scope.SubdataGrid = SubDaftarMapping; 
		          return {
		                dataSource: {
		                    data: $scope.SubdataGrid,
		                    pageSize: 20,
		                     filter: { field: "id", operator: "eq", value: dataItem.id}
		                },
		               filterable: {
									 extra: false,operators: {string: {startsWith: "Pencarian"}}
						 			},
		                pageable: true,
		                scrollable: true,
		                shortable: true,
		                columns: 
		                $scope.columns = [
		                {
		                    "field": "no",
		                    "title": "<h3 align=center>No</h3>",
		                    "width" : "20px",
		                    "filterable" : false
		                },                
		                {
		                    "field": "jenisDiet",
		                    "title": "<h3 align=center>Jenis Diet</h3>",
		                    "width" : "30px",
		                },
		                {
		                    "field": "jenisWaktu",
		                    "title": "<h3 align=center>Jenis Waktu</h3>",
		                    "width" : "30px",
		                },
		                {
		                    "field": "namaProduk",
		                    "title": "<h3 align=center>Nama Produk</h3>",
		                    "width" : "80px",
		                },	                
		                {
		                    "field": "satuanStandar",
		                    "title": "<h3 align=center>Satuan Standar</h3>",
		                    "width" : "80px",
		                }
		            ]
		          }
	        };


			$scope.ChangeData = function() {
				// body...
				$scope.disabledCombo = false;
				$scope.item.waktuMakan = "";
				$scope.item.bahanMakanan = "";
				$scope.item.berat = "";
				$scope.item.satuan = "";
			}
	    

		  $scope.number = 1;
		  $scope.Tambah = function() {
		  var listRawRequired = [
	            "item.jenisDiet|k-ng-model|Jenis Diet",
				"item.waktuMakan|k-ng-model|Waktu Makan",
				"item.bahanMakanan|k-ng-model|Bahan Makan",
				"item.berat|ng-model|Berat",
				"item.satuan|k-ng-model|Satuan"
           ];
			var isValid = ModelItem.setValidation($scope, listRawRequired); 
            if(isValid.status){
            	var tempDataPenerimaanLinen = {
					"no" : $scope.number++,
					"jenisDiet" : $scope.item.jenisDiet.jenisDiet,
					"ObjectjenisDiet" : {name : $scope.item.jenisDiet.jenisDiet, id : $scope.item.jenisDiet.id},
					"waktuMakan" : $scope.item.waktuMakan.jenisWaktu,
					"ObjectwaktuMakan" : {id : $scope.item.waktuMakan.id, name : $scope.item.waktuMakan.jenisWaktu},
					"bahanMakanan" : $scope.item.bahanMakanan.namaProduk,
					"ObjectbahanMakanan" : {name : $scope.item.bahanMakanan.namaProduk, id : $scope.item.bahanMakanan.idProduk},
					"berat" : $scope.item.berat,
					"satuan" : $scope.item.satuan.satuanStandar,
					"Objectsatuan" : {id :$scope.item.satuan.id, name :$scope.item.satuan.satuanStandar},
					"statusEnabled" : true
		       }
				$scope.dataMasterDiet.add(tempDataPenerimaanLinen);
		    }else{
			  	   ModelItem.showMessages(isValid.messages);
			 } 
			}
    
			$scope.standarDiet = {
                pageable: true,
                scrollable:false,
                columns: [
                {
					"field": "no",
					"title": "<h3 align=center>No.</h3>",
					"width": "10%"
				},                
				{
					"field": "jenisDiet",
					"title": "<h3 align=center>Jenis Diet</h3>",
					"width": "10%"
				},
				{
					"field": "waktuMakan",
					"title": "<h3 align=center>Waktu Makan</h3>",
					"width": "30%"
				},
				{
					"field": "bahanMakanan",
					"title": "<h3 align=center>Bahan Makanan</h3>",
					"width": "10%"
				},
				{
					"field": "berat",
					"title": "<h3 align=center>Berat</h3>",
					"width": "30%"
				},
				{
					"field": "satuan",
					"title": "<h3 align=center>Satuan</h3>",
					"width": "10%"
				},
				{
					command: { text: "Hapus", click: removeSiklus },
			        title: "&nbsp",
			        width: "10%"
				}]
			}

			$scope.addStandarDiet = function() {
				var tempStandarDiet = {
					"jenisDietId":e.ObjectjenisDiet.id,
					"waktuMakan":$scope.item.waktuMakan,
					"bahanMakanan":$scope.item.bahanMakanan,
					"berat":$scope.item.berat,
					"satuan":$scope.item.satuan
				}
				$scope.sourceStandarDiet.add(tempStandarDiet);
			}

			function removeSiklus(e) {
				e.preventDefault();
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempSiklus== $scope.dataJadi
			    .filter(function(el){
			    	return el.no !== grid._data[0].no;
			    });
			    grid.removeRow(row);
			};

			$scope.Refresh = function(){
				$scope.item = {};
			}

			$scope.Save = function(){
			 var isiData = $scope.dataMasterDiet._data[0];
			 if(isiData != undefined){
			   var data = [];
	            $scope.dataMasterDiet._data.forEach(function(e){
					var dataTemp = {
							"jenisDietId":e.ObjectjenisDiet.id,
							"produkId":e.ObjectbahanMakanan.id,
							"jenisWaktuId":e.ObjectwaktuMakan.id,
							"berat":e.berat,
							"statusEnabled":e.statusEnabled
						}
					   data.push(dataTemp);
				})
			    ManageGizi.saveGizi(data,"map-jenis-diet-to-produk/save/").then(function(e) {
			    	$scope.init();
			    });
			}else{
				window.messageContainer.error('Daftar Masih Kosong');
			}
		  }
		}
	]);
});


/*===============================================Source Data Old================================================================
			FindPasienGizi.getGizi("service/list-generic/?view=JenisWaktu&select=id,jenisWaktu").then(function(dat){
				$scope.SourceJenisWaktu = dat.data;
				// debugger;
			})
			FindPasienGizi.getGizi("service/list-generic/?view=Kelas&select=id,namaKelas").then(function(dat){
				$scope.SourceKelas = dat.data;
				// debugger;
			})

			FindPasienGizi.getGizi("service/list-generic/?view=Kelas&select=id,namaKelas", false).then(function(dat){
				$scope.SourceKelas2 = dat.data;
				// debugger;
			})

			FindPasienGizi.getGizi("service/list-generic/?view=KategoryDiet&select=id,kategoryDiet").then(function(dat){
				$scope.SourceKategoryDiet = dat.data;
				// debugger;
			})

			FindPasienGizi.getGizi("bentuk-produk/get-bentuk-gizi/").then(function(dat){
				$scope.SourceBentukProduk = dat.data.data;
			})

			FindPasienGizi.getGizi("kategory-produk/get-kategory-produk-gizi/").then(function(dat){
				$scope.SourceKategoryProduk = dat.data.data;
			})*/

				// $scope.item.jenisDiet = "";
				// $scope.item.waktuMakan = "";
				// $scope.item.bahanMakanan = "";
				// $scope.item.berat = "";
				// $scope.item.satuan = "";