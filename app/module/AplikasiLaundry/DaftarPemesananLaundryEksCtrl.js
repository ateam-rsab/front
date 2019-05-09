define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPemesananLaundryEksCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras','$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, FindSarpras, $state) {
			$scope.item = {};
			ModelItem.get("Laundry/Pencucianlinen").then(function(data) {
				$scope.item = data;
				
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
		    $scope.no = 1;
		    $scope.init = function(){
		    debugger
			  ManageSarpras.getOrderList("laundry/get-order-laundry-sebelum-diterima", true).then(function(dat){
			  	debugger
			     var daftarPelipatan = dat.data.data;
			     var tempdata = [];
			      for(var i=0; i<daftarPelipatan.length; i++){
			      	 daftarPelipatan[i].no = $scope.no++;
			      	 
			      	 if(daftarPelipatan[i].tglstruk == null){
			      	 	daftarPelipatan[i].tglstruk == "";
			      	 }else{
			      	 	daftarPelipatan[i].tglstruk = new moment(daftarPelipatan[i].tglstruk).format('DD-MM-YYYY');
			      	 }
			      	 if(daftarPelipatan[i].tglterimakiriman == null){
			      	    daftarPelipatan[i].tglterimakiriman = "Belum diterima"
			      	 }else{
			      	 	daftarPelipatan[i].tglterimakiriman = new moment(daftarPelipatan[i].tglterimakiriman).format('DD-MM-YYYY');
			      	 }
			      	 tempdata.push(daftarPelipatan[i]);		
			     }
			     	$scope.daftarPelipatan = tempdata;
			  });
		    }
		    $scope.init();


			$scope.addBahanLinen = function() {
				var tempDataBahan = [
					{
						"bahan" : $scope.sourceBahan,
						"jumlah" : $scope.sourceBahan,
						"satuan" : $scope.sourceBahan
					}
				];
				$scope.dataBahan=tempDataBahan;
			}

			$scope.OpenDetail = function(){
			debugger
			  if($scope.noRec != undefined){
				$state.go('DetailOrderEks');
			  }else{
				window.messageContainer.error("Harap Pilih Data Terlebih dahulu !")
			  }
			}

			$scope.kl = function(current){
			 debugger
			   $scope.noRec =  current.noRec;
			   $scope.namaPemesanan = current.namaPemesanan;
			   $scope.nomor = current.nomor;
			   $scope.nomorOrder = current.nomorOrder;
			   $scope.petugas = current.petugas
			   $scope.status = current.status
			   $scope.tanggalPemesanan = current.tanggalPemesanan
			}

			$scope.satuan = function() {
				$scope.item.satuanKg = $scope.item.mesin.satuanStandarKapasitas;
				$scope.item.kapasitas = $scope.item.mesin.kapasitas;
			};

			$scope.bahan = function(){
				var data1 = $scope.item.mesin;
				var data2 = $scope.item.kapasitas; 
				var data1 = $scope.item.jenisLinen; 
				var url = "mesin=" + data1 + "&kapasitas=" + data2+ "&jenisLinen=" + data3

				FindSarpras.getSarpras("mapping-cycle/get-cycle-by?" + url).then(function(dat){
					// debugger;
					$scope.sourceDaftarBahan = dat.data;
				});
			};
			$scope.Batal = function(){
				$scope.item.jumlahCycle="";
			}
			$scope.Save = function(){
				var data = 
				{
					"berat": {
						"berat": parseInt($scope.item.beratLinen)
					},
					"mesin": {
						"id": $scope.item.mesin.idMesin
					},
					"tgl": $scope.item.tanggalPencucian,
					"kapasitas" : 	{
						"noRec": "2c909078570e0c3d01570e10b1510000"
					},
					"jenisLinen": {
						"id": $scope.item.jenisLinen.id
					},
					"prosesCuci" : {
						"id": $scope.item.prosesCuci.id
					}
				};
				console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"pencucian-linen/save-pencucian-linen/").then(function(e) {
					$scope.item = {};
				});
			};



		    $scope.mainGridOptions = { 
			pageable: true,
			filterable: {
						  extra: false,operators: {string: {startsWith: "Pencarian"}}
					    },
            sortable: true,
            /*editable : true*/
     	   }



			$scope.columndaftarPelipatan = [
			{
				"field": "no",
				"title": "<h3 align=center>No. <h3>",
				"width": "20px",
				"filterable" : false
			},
			{
				"field": "nostruk",
				"title": "<h3 align=center>Nomor Order<h3>",
				"width": "40px"
			},
			{
				"field": "tglstruk",
				"title": "<h3 align=center>Tanggal Pemesanan</h3>",
				"width": "40px",
				"filterable" : false
			},
			{
				"field": "tglterimakiriman",
				"title": "<h3 align=center>Tanggal Terima</h3>",
				"width": "40px",
				"filterable" : false
			},
			{
				"field": "petugas",
				"title": "<h3 align=center>Petugas</h3>",
				"width": "100px"
			}, 
			{
				"field": "qtyproduk",
				"title": "<h3 align=center>Qty Produk</h3>",
				"width": "100px",
				"filterable" : false
		    },
			{
				"field": "ket",
				"title": "<h3 align=center>Keterangan</h3>",
				"width": "100px",
				"filterable" : false
		    }
		    
		    ];

		}
		]);
});