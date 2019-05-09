define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarMappingBahanMesinCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','ManageLaundry',
		function($rootScope, $scope, $state, ModelItem, DateHelper,ManageLaundry) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.daftarPencucianLinen = new kendo.data.DataSource({
			data: []
		});
			
		 $scope.kl = function(current){
		 debugger
			$scope.current = current;
			$scope.item.nmmesin=current.namaMesin;
			$scope.item.kapasitas=current.kapasitas;
			$scope.item.namaPetugas = current.namaPetugas;
			$scope.item.beratLinen=current.beratLinen;
			$scope.item.prosesCuci=current.namaProdukProsesCuci;
			$scope.item.mesinId=current.mesinId;
			$scope.item.petugasId=current.petugasId;
			$scope.item.noRecStrukPelayanan=current.noRecStrukPelayanan;
			$scope.item.namaPelanggan=current.namaPelanggan;
	        $scope.item.ruanganAsalId=current.ruanganAsalId;          				
			//console.log(JSON.stringify($scope.item.id));
		}

		$("#TombolPencarian").kendoButton({
			click:FilterFungsi
		})

		$("#TombolClear").kendoButton({
			click:ClearFilter
		})

		function ClearFilter(DataClearFungsi) {
		debugger
			var gridData = $("#grid").data("kendoGrid");
			 gridData.dataSource.filter({});
		}

		function FilterFungsi(DataFilterFungsi) {
		debugger
			var q = $("#txtSearchString").val();
			var grid = $("#grid").data("kendoGrid");
			grid.dataSource.query({
				page : 1,
				pageSize : 20,
				filter:{
						logic:"or",
							filters:[
									  {field:"namaAlat", operators:"contains", value:q},
									  {field:"kapasitasAlat",operators:"contains", value:q},
									  {field:"namaProsesCuci", operators:"contains", value:q},
							 		  {field:"namaBahan", operators:"contains", value : q}
							 		]
						}
			});
		}
	
		$scope.pindah = function(current){
			$state.go("Pelipatan",{noRecStrukPelayanan:$scope.item.noRecStrukPelayanan,namaPelanggan:$scope.item.namaPelanggan,ruanganAsalId:$scope.item.ruanganAsalId});
		}
			
			
		var Init  = function () {
			ManageLaundry.getOrderList("map-bahan-to-mesin/get-all" ).then(function(dat){
			$scope.sourceOrder = dat.data.data;
			});				
		}
		Init ();
			
		 var onChange = function(e) {
            var grid = $(this).data("mainGridOptions");
        }
			
			
		$scope.formatRupiah = function(value, currency) {
		    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		}
         
		 $scope.mainGridOptions = {
			  pageable:true,
			  //change:onChange,
			  pageSize:20,
			  scrollable:false,
	          filterable: {
						  extra: false,
						  operators: {
									   string: {
									 	  	     startsWith: "Pencarian"
									           }
								     }
				          },
	        
	            columns: [{
	                "field": "alatId",
	                "title": "Nomor Mesin ",
					"filterable":{
								   search : true,
								   multi : true
								 }		
				},{
					
	                "field": "namaAlat",
	                "title": "Nama Mesin",
					"filterable":true		
				},{
	                "field": "kapasitasAlat",
	                "title": "Kapasitas",
				    "width": "200px",
					"filterable":{ 
								   search : true,
								   multi : true
								 }	
	                	
				}, {
	                "field": "namaProsesCuci",
	                "title": "Proses Cuci"
				}, {
	                "field": "namaBahan",
	                "title": "Nama Bahan"	
	            }, {
	                "field": "jumlah",
	                "title": "Jumlah",
	                "filterable":{ 
								   search : true,
								   multi : true
								 }	
				}, {
	                "field": "namaSatuan",
	                "title": "Satuan"		
	            }]    
		}
		
			
		$scope.mainGridOptions_1_3 = function(dataItem) {
           return {
                dataSource: new kendo.data.DataSource({
					data: dataItem.produkLinens,
					aggregate: [
								{ field: "totalHargaSatuan", aggregate: "sum" }
                               ]
					
				}),
                columns: [
                {
                    field: "namaProduk",
                    title: "Nama Linen",
					width: "100px"
				
                },
                {
                    field: "jumlah",
                    title: "Jumlah",
					width: "100px"
				   
                },
				{
                    field: "namaSatuan",
                    title: "Satuan",
					width: "100px"
					
				   
                },
                {
                    field: "hargaSatuan",
                    title: "Harga Satuan",
					width: "100px",
				    template: "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}"	
					
				},
				{
                    field: "totalHargaSatuan",
                    title: "Total Harga Satuan",
					width: "200px",
					template: "{{formatRupiah('#: totalHargaSatuan #', 'Rp.')}}",	
					footerTemplate: "<center>{{formatRupiah('#: sum #', 'Rp.')}}</center> "	
				   
				}
				
				],     
    			resizable: true
            }
		  }

		}
	]);
});

  //  $scope.pengeringan=function() {
		  //  	$state.go("Pengeringan")
		  //  }