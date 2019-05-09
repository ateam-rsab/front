define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterProduksiBMHPCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state',
		function($rootScope, $scope, ModelItem, IPSRSService, $state) {
			$scope.dataVOloaded = true;
			$scope.item = {};

		  $scope.no = 1;
		  $scope.GetGrid = function(){
		 	IPSRSService.getItem("cssd-bmhp/master-bmhp").then(function(dat){
			$scope.dataMaster = dat.data.data;
			for(var i=0; i<$scope.dataMaster.length; i++){
				$scope.dataMaster[i].no = $scope.no++;
			}
			$scope.dataSourceBMHP = new kendo.data.DataSource({
				pageSize: 5,
				data: $scope.dataMaster,
			});
		  }); 	
		  }
		  $scope.GetGrid();


	  	   $scope.dataSource = new kendo.data.DataSource({
				data: [],
		        batch: true,
				pageSize: 20,
				schema: {
                model: {
                    id: "id",
                    fields: {
                        no:{ editable: false},
                        ProdukNama: { editable: false},
                        quantity: { editable: true}
                    }
                  }
              },
			})

		  $scope.tutup = function(){
		   	$state.go('home')
		   }
			

		function init() {
				IPSRSService.getItem("cssd-bmhp/barang-persediaan", true).then(function(dat){
					$scope.dataProduk = dat.data.data;
				});

			}
			init();
			
			$scope.listSatuan = ModelItem.kendoHttpSource('service/list-generic/?view=SatuanStandar&select=satuanStandar,id', true);
			$scope.Cari = function(Pencarians){
			  var q = Pencarians;
		      var grid = $("#detailGrid").data("kendoGrid");
		     	  grid.dataSource.query({
		          page:1,
		          pageSize:20,
		          filter:{
		          	logic:"or",
		         		 filters:[{field:"namaProduk", operator:"contains",value:q},
		         		 {field:"satuanStandar", operator:"contains",value:q}]
		           }
		      });
			}

			$scope.ClearCari = function(){
		     $scope.Pencarians = "";
		     var gridData = $("#detailGrid").data("kendoGrid");
		     gridData.dataSource.filter({});
		    }

		    $scope.columndataBahan = [
				{ field:"no",
			     title:"<h3 align=center>No</h3>", width:"20px"},
				{ field:"ProdukNama",title:"<h3 align=center>Nama Produk</h3>", width:"160px"},
				{ field:"quantity",title:"<h3 align=center>Quantity</h3>", width:"80px"},
				{
					command: { 
						text: "Delete",
						width:"70px", 
						align:"center", 
						click: removeItemGrid 
					},
					title: "<h3 align=center>Action</h3>",
					width: "80px"
			}]

			$scope.mainGridOptions = { 
		     pageable: true,
			filterable: {
						  extra: false,operators: {string: {startsWith: "Pencarian"}}
					    },
            sortable: true,
            editable : true
			};


		   function removeItemGrid(e) {
				e.preventDefault();
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataPenerimaanLinen = $scope.dataSource
			    .filter(function(el){
			    	return el.id !== grid[0].id;
			    });
			    grid.removeRow(row);
			};

			$scope.mainGridBMHP = { 
				pageable: true,
				pageSize : 5,
				columns: [
				{ field:"no",title:"<h3 align=center>No</h3>",width:"20px"},
				{ field:"namaProduk",title:"<h3 align=center>Nama Produk</h3>", width:"160px" },
				{ field:"satuanStandar",title:"<h3 align=center>Satuan</h3>", width:"120px" }],
				editable: false
			};

			$scope.NoTambah = 1;
			$scope.tambahData = function () {
			var listRawRequired = [
				"item.bahanProduk|k-ng-model|Nama Produk Detail",
				"item.quantity|ng-model|Quantity"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
	                var TemporarryDataGrid = {
						"no" : $scope.NoTambah++,
						"produk": {
							"id": $scope.item.bahanProduk.idProduk,
							"nama": $scope.item.bahanProduk.namaProduk
						},
						"ProdukNama" : $scope.item.bahanProduk.namaProduk,
						"quantity":$scope.item.quantity
					}
					if($scope.dataSource._data[0] != undefined){
					  for(var i = 0; i<$scope.dataSource._data.length; i++){
						  var idProduk = $scope.dataSource._data[i].produk.id;
						  if(idProduk == TemporarryDataGrid.produk.id){
							  return window.messageContainer.error('Produk Sudah ada')
						  }
					   }
					   $scope.dataSource.add(TemporarryDataGrid);
					}else{
						$scope.dataSource.add(TemporarryDataGrid)
					}
					init();
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}

			$scope.simpan = function () {
				var listRawRequired = [
				"item.namaProduk|ng-model|Nama Produk",
				"item.harga|ng-model|Harga",
				"item.satuan|k-ng-model|Satuan"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				var dataArray = [];
				for (var i=0;i<$scope.dataSource._data.length;i++){
					var temp = 
					{
						"produk": {
							"id": $scope.dataSource._data[i].produk.id
						},
						"qtyProduk": $scope.dataSource._data[i].quantity
					}
					dataArray.push(temp);
				}
				var dataSimpan = 
				{
					"namaProduk": $scope.item.namaProduk,
					"harga": parseInt($scope.item.harga),
					"satuanStandar": {
						"id": $scope.item.satuan.id
					},
					"cssdBmhpDetail": dataArray
				}
				if(isValid.status){
					IPSRSService.saveDataSarPras(dataSimpan, "cssd-bmhp/save-bmhp/").then(function(e) {
						$scope.GetGrid();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			$scope.klik = function(current){
				$scope.current = current;
				$scope.item.idProduk = current.idProduk;
			};
			$scope.detail = function () {
			 if($scope.item.idProduk != undefined){
			 	    $state.go('DetailProdukBMHP',{
					produkId: $scope.item.idProduk
				})
			 }else{
			 	window.messageContainer.error('Pilih data')
			 }

			}

		}
		]);
});