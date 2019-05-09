define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PembilasanLinenCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, FindSarpras) {
			$scope.item = {};
			ModelItem.get("Laundry/Pencucianlinen").then(function(data) {
				$scope.item = data;
				$scope.no = 1;
				$scope.bahan1 = "Laudet";
				$scope.berat1 = 100;
				$scope.satuan1 = "Gram";
				$scope.namaBahan2 = "Aldet";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.now = new Date();
			debugger;
			$scope.nmmesin=$state.params.nmmesin;
			$scope.kapasitas=$state.params.kapasitas;
			$scope.namaPetugas=$state.params.namaPetugas;
			$scope.beratLinen=$state.params.beratLinen;
			$scope.mesinId=$state.params.mesinId;
			$scope.petugasId=$state.params.petugasId;
			$scope.ruanganAsalId=$state.params.ruanganAsalId;
			$scope.noRecStrukPelayanan=$state.params.noRecStrukPelayanan;
			var a =$state.params.prosesCuci;
			
			 FindSarpras.getSarpras("laundry/get-proses-bilas?prosesCuci="+a).then(function(dat){
            	$scope.sourceMasterMesin= dat.data.data;
				
            });
			
			$scope.Proses = function () {
				
			 var gaji = $scope.mesinId ;	
			 var kerja =  $scope.prosesCuci.id;	
		//	 var period =  moment($scope.item.Periode).format("MM-YYYY");
			 
			debugger;	
			ManageSarpras.getOrderList("laundry/get-bahan-from-mesin-proses?mesinId="+gaji+"&prosesCuciId="+kerja ).then(function(dat){
			debugger;
			$scope.sourceOrder = new kendo.data.DataSource({
				data: dat.data.data
			
			});				
			
			debugger;
			});		
					
			}
			
			 $scope.pindah = function(){
				 
				$state.go("DaftarPembilasanLinen");
				 
			 }
			

		//	FindSarpras.getSarpras("mapping-cycle/find-mesin-dengan-kapasitas/").then(function(dat){
		//		$scope.sourceMasterMesin= dat.data.data;
		//	});
		//	FindSarpras.getSarpras("jenis-linen/find-all-jenis-linen/").then(function(dat){
		//		$scope.sourceMasterJenisLinen = dat.data.data;
		//	});
		//	FindSarpras.getSarpras("proses-cuci/find-all-proses-cuci/").then(function(dat){
		//		$scope.sourceMasterProsesCuci= dat.data.data;	
		//	});
		//	FindSarpras.getSarpras("pencucian-linen/find-satuan-standar/").then(function(dat){
		//		$scope.sourceSatuanStand= dat.data.data;
		//	});
		//	FindSarpras.getSarpras("pencucian-linen/find-mapping-cycle-dengan-bahan/").then(function(dat){
		//		$scope.sourceBahan= dat.data.data;
				// debugger;
		//	});
		//	FindSarpras.getSarpras("user/get-user").then(function(dat){
		//		$scope.item.petugas = dat.data.data.namaUser;
				// debugger;
		//	});
			$scope.dataBahan = new kendo.data.DataSource({
				data: []
			});
			$scope.columndataBahan = [{
				// "field": "no",
				// "title": "<h3 align=center>No</h3>",
				// "width": "50px"
			// }, {
				"field": "namaProdukBahan",
				"title": "<h3 align=center>Nama Bahan<h3>",
				"width": "300px"
			}, {
				"field": "jumlahBahan",
				"title": "<h3 align=center>Jumlah<h3>",
				"width": "100px"
			}, {
				"field": "namaSatuanBahan",
				"title": "<h3 align=center>Satuan<h3>",
				"width": "150px"
			}];
			
		//	$scope.addBahanLinen = function() {
		//		var tempDataBahanLinen = [
		//			{
		//				"bahan" : "MD.PINE",
		//				"berat" : 100,
		//				"satuan" : "Gram"
		//			},
		//			{
		//				"bahan" : "ALDET",
		//				"berat" : 100,
		//				"satuan" : "Gram"
		//			},
		//			{
		//				"bahan" : "LAUDET",
		//				"berat" : 100,
		//				"satuan" : "Gram"
		//			}
		//		] 
		//		$scope.dataPencucianLinen = tempDataBahanLinen;
		//	}
			// $scope.addBahanLinen = function() {
			// 	var tempDataBahan = [
			// 		{
			// 			"bahan" : $scope.sourceBahan,
			// 			"jumlah" : $scope.sourceBahan,
			// 			"satuan" : $scope.sourceBahan
			// 		}
			// 	];
			// 	$scope.dataBahan=tempDataBahan;
			// }

		//	$scope.daftar=function() {
		//		$state.go("DaftarPencucianLinen")
		//	}

		//	$scope.satuan = function() {
		//		$scope.item.satuanKg = $scope.item.mesin.satuanStandarKapasitas;
		//		$scope.item.kapasitas = $scope.item.mesin.kapasitas;
		//	};

		//	$scope.bahan = function(){
		//		var data1 = $scope.item.mesin;
		//		var data2 = $scope.item.kapasitas; 
		//		var data1 = $scope.item.jenisLinen; 
		//		var url = "mesin=" + data1 + "&kapasitas=" + data2+ "&jenisLinen=" + data3/

		//		FindSarpras.getSarpras("mapping-cycle/get-cycle-by?" + url).then(function(dat){
					// debugger;
	//				$scope.sourceDaftarBahan = dat.data;
	//			});

		//	};
		     $scope.disProduksi = true;
			 $scope.detailListProduksi = [];
			$scope.Save = function () {
				$scope.detailListProduksi = [];
	          				var detail = $scope.sourceOrder._data;
				var i = 0;
				var detailHVA = [];
				detail.forEach(function (data) {
					var data = {
					"mesinId":data.mesinId,
					"namaMesin":data.namaMesin,
                    "produkProsesCuciId":data.produkProsesCuciId,
                    "namaProdukProsesCuci":data.namaProdukProsesCuci,
                    "produkBahanId":data.produkBahanId,					
					"namaProdukBahan":data.namaProdukBahan,
					"jumlahBahan":data.jumlahBahan,
                    "satuanBahanId":data.satuanBahanId,
					"namaSatuanBahan":data.namaSatuanBahan
					
				

					
						
					
						
					}
					detailHVA[i] = data;
					i++;
				})
				
				debugger;
		var data1 = {
			"noRecStrukPlanning": "",
			"tglPencucianLinen": moment($scope.item.tanggalPencucian).format("YYYY-MM-DD"),
			"mesinId":$scope.mesinId,
			"namaMesin":$scope.nmmesin,
			"kapasitas":$scope.kapasitas,
			"petugasId":$scope.petugasId,
			"namaPetugas":$scope.namaPetugas,
			"beratLinen":$scope.beratLinen,
			"produkProsesCuciId":$scope.prosesCuci.id,
			"namaProdukProsesCuci":$scope.prosesCuci.namaProduk,
			"ruanganAsalId":$scope.ruanganAsalId,
			"noRecStrukPelayanan":$scope.noRecStrukPelayanan,
		    "kapasitasBahanMesins":detailHVA
			
			  
				
		}
		
		
		var a= 0;
			     
			  
			   ManageSarpras.saveDataUji(data1, "laundry/cek-stok-ruangan").then(function (e) {
				   $scope.detailListProduksi = e.data.data;
					console.log(JSON.stringify(e.data));
					for (var i=0;i<$scope.detailListProduksi.length;i++){
						if ($scope.detailListProduksi[i].stokLess == true) {
							window.messageContainer.error('Tolong Lakukan Pemesanan '+$scope.detailListProduksi[i].produk)
							a = 1;
						} 
					};
					debugger;
					if (a === 0){
                     ManageSarpras.savePengeringan(data1, "laundry/save-pembilasan").then(function (e) {
					 });					

					
					}
						
					
					debugger;
                });
		
				//console.log(JSON.stringify(data1));
             //   ManageSarpras.saveDataUji(data1, "laundry/save-pembilasan").then(function (e) {
					//console.log(JSON.stringify(e.data));
				//	$scope.Back();
             //   });
				
				
			};
		}
		]);
});