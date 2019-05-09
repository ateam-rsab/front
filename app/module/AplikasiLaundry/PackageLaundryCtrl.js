define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PackageLaundryCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras',
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

			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
                $scope.dataMasterPetugas = dat.data;
            });
			
            $scope.removeTeknisi = function (data) {
                $scope.arrTeknisi.pop();
                $scope.teknisi.pop();
                console.log(JSON.stringify($scope.teknisi));
                console.log(JSON.stringify($scope.arrTeknisi));
            };

			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
			debugger
                $scope.dataMasterPetugas = dat.data;
            });

            ManageSarpras.getOrderList("laundry/get-all-satuan").then(function(dat){
			$scope.sourceSatuanStandar = dat.data.data;
			});
			ManageSarpras.getOrderList("laundry/get-satuan-potong").then(function(dat){
			$scope.sourceSatuan = dat.data.data;
			});

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

              $scope.addDataPackageLaundry = function() {
				debugger
				var tempPackageRoll = {
					"no": $scope.no++,
					"namaProdukBahan" :$scope.item.bahan.name,
					"jumlahBahan" : $scope.item.JumlahBahan,
					"namaSatuanBahan" : $scope.item.satuanBahan.name
				}

				$scope.DaftarPackageLaundry.add(tempPackageRoll);
				$scope.item.bahan="";
				$scope.item.jumlahBahan="";
				$scope.item.satuanBahan = "";		
			}

			$scope.DaftarPackageLaundry = new kendo.data.DataSource({
				data: []
			});


		 $scope.arrTeknisi = [];
            $scope.tambahTeknisi = function () {
                var data = {
                    "noRec":"",
                    "pegawai":{
                        "id": ""
                    }
                }
                $scope.arrTeknisi.push(data);
                console.log(JSON.stringify($scope.item.teknisi));
            }

			$scope.listsatuan = [{
				"id" : 1,
				"name" : "pcs"
			},
			{
				"id" : 2,
				"name" : "Roll"
			},
		    {
				"id" : 3,
				"name" : "Tiang Besi"
			}]

			$scope.listbahan = [{
				"id" : 1,
				"name" : "Plastik"
			},
			{
				"id" : 2,
				"name" : "Roll Penggulung"
			},
		    {
				"id" : 3,
				"name" : "Tiang Besi"
			}]
			
			$scope.Proses = function () {
			 var gaji = $scope.mesinId ;	
			 var kerja =  $scope.prosesCuci.id;	
			ManageSarpras.getOrderList("laundry/get-bahan-from-mesin-proses?mesinId="+gaji+"&prosesCuciId="+kerja ).then(function(dat){
			$scope.sourceOrder = new kendo.data.DataSource({
				data: dat.data.data
			});				
			});		
					
			}
			
			 $scope.pindah = function(){
				$state.go("DaftarPembilasanLinen");
			 }

			$scope.dataBahan = new kendo.data.DataSource({
				data: []
			});
			$scope.columndataBahan = [{
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
                });
				
			};
		}
		]);
});