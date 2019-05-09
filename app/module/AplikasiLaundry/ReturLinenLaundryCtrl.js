define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReturLinenLaundryCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras', '$timeout', '$window','$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, FindSarpras, $timeout, $window,$state) {
			$scope.item = {};
			ModelItem.get("Laundry/PenerimaanLinen").then(function(data) {
				$scope.item = data;
				// $scope.item.petugas = "admin";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			$scope.now = new Date();
			
			$scope.noStruk=$state.params.noStrukPelayanan;
			$scope.namaPelanggan=$state.params.namaPelanggan;
			$scope.idPelanggan=$state.params.pelangganId;
			$scope.alamat=$state.params.alamat;
			$scope.noRecStrukPelayanan=$state.params.noRecStrukPelayanan;
			// FindSarpras.getRuangan("/penerimaan-linen/find-ruang-loundry/").then(function(dat){
			// 	$scope.sourceRuangan = dat.data.data;
			// 	// debugger;
			// });
			 var init = function () {
				 
				 
			     var a=$scope.noRecStrukPelayanan;
			ManageSarpras.getOrderList("laundry/get-retur-linen?noRecStrukPelayanan="+a, true).then(function (dat) {
				$scope.sourceOrder =  new kendo.data.DataSource({
                         data: dat.data.data.produkLinens,
						 change:onChange
						
						
                     });
		          
			});
			
			
		
			
			}
			init();
			
			debugger;
			
			
			
			var b=$scope.noRecStrukPelayanan;
			FindSarpras.getSarpras("laundry/get-retur-linen?noRecStrukPelayanan="+b).then(function(dat){
				$scope.item.totalBiaya = $scope.formatRupiah(dat.data.data.grantTotalHargaSatuan,"Rp");
				$scope.item.jumlahBayar = $scope.formatRupiah(dat.data.data.grantTotalHargaSatuan,"Rp");
				 debugger;
			});
			
			
		  $scope.satuan = function() {
		//		$scope.item.satuanKg = $scope.item.mesin.satuanStandarKapasitas;
				$scope.item.kapasitas = $scope.item.mesin.kapasitasAlat;
			};
			
			 $scope.batton = function() {
			
                if ($scope.item.mesin == $scope.item.mesin)   {
			      $scope.item.kapasitas = $scope.item.mesin.kapasitasAlat
				  
			
				}
				
			 }	
			
			$scope.dataPenerimaanLinen = new kendo.data.DataSource({
				data: []
			});
			
			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
         
			
		//	$scope.columndataPenerimaanLinen = [{
		//		"field": "ruangan.namaRuangan",
		//		"title": "<h3 align=center>Nomor Terima<h3>",
		//		"width": "300px"
		//	},{
		//		"field": "ruangan.namaRuangan",
		//		"title": "<h3 align=center>Ruangan<h3>",
		//		"width": "300px"
		//	}, {
		//		"field": "berat",
		//		"title": "<h3 align=center>Berat<h3>",
		//		"width": "100px",
		//		"attributes": {align:"center"}
		//	}, {
		//		"field": "satuan.satuanStandar",
		//		"title": "<h3 align=center>Satuan<h3>",
		//		"width": "100px",
		//		"attributes": {align:"center"}
		//	}, {
		//       command: { 
		//        	text: "Hapus",
		//        	width:"50px", 
		//        	align:"center",
		//			attributes: {align:"center"},
		//        	click: $scope.removeDataPenerimaanLinen 
		//        	},
		//        title: "<h3 align=center>Action</h3>",
		//        width: "80px"
		//	}];
		

		
			
			 $scope.mainGridOptions =  {
				pageable:true,
				change:onChange,
				
				pageSize:10,
				selectable:'row',
				scrollable:true,
				 filterable: {
                            extra: false,
                            operators: {
                               string: {
                                   startswith: "Dimulai dengan",
                                    contains: "mengandung kata",
                                   neq: "Tidak mengandung kata"
                                }
                            }
                        },
                columns: [{
                    "field": "namaProduk",
                    "title": "Nama Linen"	,
				    "width": "200px",
					"filterable":false
                   			
				},{
                    "field": "hargaSatuan",
                    "title": "Harga Satuan",
					"type":"number",
				    "width": "200px",
					"filterable":false,
					template: "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}",	
                   					
				}, {
                    "field": "jumlah",
                    "title": "Jumlah",
					"type" : "number",
					"filterable":false		
                  
				}, {
                    "field": "retur",
                    "title": "Jumlah Retur",
					"type" :"number",
					"filterable":false		
				}, {
                    "field": "totalHargaSatuan",
                    "title": "Total",
					"type" : "number",
					"filterable":false,
					template: "{{formatRupiah('#: totalHargaSatuan #', 'Rp.')}}",						
				}, {
                    "field": "tot",
                    "title": "Total Harga",
					"type" : "number",
					"filterable":false
					
					
                   
				
                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };
			
			
			
			  var onChange = function(e) {
				
				 if ((e.field && e.action === "itemchange")){ 
				  $scope.ff.tot=$scope.ff.retur * $scope.ff.hargaSatuan;
				   $scope.item.totalRetur=$scope.formatRupiah($scope.ff.tot,"Rp");
				   $scope.item.jumlahRetur=$scope.formatRupiah($scope.ff.tot,"Rp");
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");
				 }
            }
			
			
			
	 
			
			
			
			
			

			$scope.addDataPenerimaanLinen = function() {
				// var tgl = DateHelper.getTanggalFormatted($scope.item.tanggal);
				var tempDataPenerimaanLinen = {
					"no": $scope.no++,
					"namaBahan" : $scope.item.namaProduk,
					"jumlah" : $scope.item.jumlah,
					"satuan" : $scope.item.satuanStandar.satuanBahan,
					"kapasitasAlat":$scope.item.kapasitas,
					"namaAlat":$scope.item.mesin.namaAlat,
					"prosesCuciId":$scope.item.prosesCuci.produkId,
					"namaProsesCuci":$scope.item.prosesCuci.namaProduk,
					"alatId":$scope.item.mesin.alatId,
					"satuanId":$scope.item.satuanStandar.id
				}

				$scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
				
				
				$scope.item.namaProduk="",
				$scope.item.jumlah="",
				$scope.item.satuanStandar=""
			}

			$scope.removeDataPenerimaanLinen= function(e) {
				e.preventDefault();
                debugger;
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataPenerimaanLinen = $scope.dataPenerimaanLinen
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			    });
			    grid.removeRow(row);
			};


		//	$scope.Save=function()
		//{
		//		var dat = $scope.dataPenerimaanLinen._data;
				
		//		var i=0;
		//		var mapPenerimaanLinen = [];
		//		dat.forEach(function(data){
		//			var data ={
		//				  "id":"",
		//				"namaBahan": data.namaBahan.namaProduk,					
        //                "jumlah"   : data.jumlah,
        //                "namaSatuan": data.satuan,
		//			    "kapasitasAlat":data.kapasitasAlat,
		//				"namaAlat":data.namaAlat,
		//				"statusEnabled":"",
		//				"prosesCuciId":data.prosesCuciId,
		//		"namaProsesCuci":data.namaProsesCuci,
		//				"bahanId":data.namaBahan.produkId,
		//				"alatId":data.alatId,
		//				"satuanId":data.satuanId
		//			}
		//			mapPenerimaanLinen[i] =data;
		//			i++;
		//		})
				
				
		//		ManageSarpras.saveSarpras(mapPenerimaanLinen, "map-bahan-to-mesin/save").then(function(e) {
					
		//			    $timeout(function () {
         //                   $window.location.reload();
         //               }, 5500);
		//		});

		//	};
		
		$scope.Save = function(){
				var dat = $scope.sourceOrder._data;
				//console.log(JSON.stringify(dat));
				var i=0;
				var mapLinen = [];
				dat.forEach(function(data){
					var data ={
						
						"noRecStrukPelayananDetail" : data.noRecStrukPelayananDetail,
						"produkId":data.produkId,
						"namaProduk":data.namaProduk,
						"hargaSatuan":data.hargaSatuan,
						"jumlah"   :data.jumlah,
						"satuanId" :data.satuanId,
						"namaSatuan" :data.namaSatuan,
						"totalHargaSatuan" :data.totalHargaSatuan,
						"jumlahRetur" : data.retur,
						"totalRetur" : data.tot
						
						
						
						
					}
					mapLinen[i] =data;
					i++;
				})
				//console.log(JSON.stringify(mapCycle));
				
				var data1 = {
					"noRecStrukPelayanan" : $scope.noRecStrukPelayanan,
					"keteranganAlasan" :$scope.item.keterangan,
					"alamat" :$scope.alamat,
					"tglRetur" : moment($scope.item.tanggalProses).format("YYYY-MM-DD hh:mm:ss"),
					"noPelanggan" :$scope.idPelanggan,
					"namaPelanggan" :$scope.namaPelanggan,
					"noTelepon" : $scope.item.telepon,
					"noRetur" : "",
					"produkLinens":mapLinen
					
				}
            		// "mapCycle": $scope.daftarBahanLinen._data	
            //		console.log(JSON.stringify(data));
            		ManageSarpras.saveSarpras(data1,"laundry/retur-laundry").then(function(e) {
            			$scope.item = {};
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""

            	});
            	};
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}
	]);
});
 