define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SukuCadangDariPihakLuarCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'DateHelper', '$state', '$mdDialog',
		function($rootScope, $scope, ModelItem, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.disProduk = true;
			$scope.disNamaProduk = true;

			$scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
			$scope.listRuangan = ModelItem.kendoHttpSource('/service/list-generic/?view=Ruangan&select=id,namaRuangan', true);
			$scope.listSatuan = ModelItem.kendoHttpSource('/service/list-generic/?view=SatuanStandar&select=id,satuanStandar', true);
			
			$scope.$watch('item.kelompokProduk', function(e) {
				if (e === undefined) return;
				if (e.id === undefined) return;
				$rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
				$scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
				$scope.disProduk = false;
			})
			$scope.$watch('item.jenisProduk', function(e) {
				if (e === undefined) return;
				if (e.id === undefined) return;
				//old lisnamabarang
				//$scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
			    IPSRSService.getItem("product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk="+ e.id, true).then(function(f){
				$scope.dataBarang = f.data.data;
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-suku-cadang-by-strukorder?strukOrder="+$state.params.strukOrder, true).then(function(f){
				$scope.dataBarangByNorec = f.data.data;
				var datatemps = []
				for(var y = 0; y<$scope.dataBarang.length; y++){
					for(var x = 0; x<$scope.dataBarangByNorec.length; x++){
					  if($scope.dataBarang[y].id == $scope.dataBarangByNorec[x].idProduk){
				         $scope.dataBarang[y].noRec = $scope.dataBarangByNorec[x].noRec;
				       }
				     }
				    datatemps.push($scope.dataBarang[y])		
				}
				$scope.listNamaBarang = datatemps;
				});
				})
				$scope.disNamaProduk = false;
			})
			$scope.dataMaster = [];
			$scope.dataKirim = [];

			var load = function () {
				$scope.nomor = 1;
				$scope.dataMaster.forEach(function(data){
					data.no = $scope.nomor++;
				})
				$scope.dataSource = new kendo.data.DataSource({
					pageSize: 10,
					data: $scope.dataMaster
				});
			}
			load();

		    $scope.batal1 = function(){
			 $scope.item.kelompokProduk = "";
			 $scope.item.jenisProduk = "";
			 $scope.item.namaProduk = "";
			 $scope.item.jumlahBarangLama = "";
			}

		     $scope.batal2 = function(){
			 $scope.item.namaBarangBaru = "";
			 $scope.item.jumlahBarangBaru = "";
			 $scope.item.satuanBarangBaru = "";
			 $scope.item.jumlahBarangLama = "";
			}


			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"no",title:"No" },
				{ field:"namaBarang",title:"Nama Barang" },
				{ field:"jumlah",title:"Jumlah" },
				{ field:"satuan",title:"Satuan" },
				{ field:"ruangan",title:"Ruangan" }],
				editable: false
			};
			$scope.tambahBarangLama = function () {
				var data = {
					"strukOrder":{
						"noRec":$state.params.strukOrder
					},
				    "produk": {
				    	"id":$scope.item.namaProduk.id
				    },
				    "jumlah": parseInt($scope.item.jumlahBarangLama),
				    "satuanStandar": {
				    	"id":$scope.item.namaProduk.idSatuanStandar
				    },
				    "namaBarang": $scope.item.namaProduk.namaProduk,
				    "noRec" : $scope.item.namaProduk.noRec
				};
				var dataView = {
					"namaBarang":$scope.item.namaProduk.namaProduk,
					"jumlah":$scope.item.jumlahBarangLama,
					"satuan":$scope.item.namaProduk.namaSatuanStandar
				};

				$scope.dataKirim.push(data);
				$scope.dataMaster.push(dataView);
				$scope.item.kelompokProduk = "";
				$scope.item.jenisProduk = "";
				$scope.item.namaProduk = "";
				$scope.item.jumlahBarangLama = "";
				$scope.item.ruanganBarangLama = "";
				$scope.disProduk = true;
				$scope.disNamaProduk = true;
				load();
			}
			$scope.tambahBarangbaru = function () {
			 $scope.noRecBaru = undefined;
			 IPSRSService.getItem("psrsPermintaanPerbaikan/get-suku-cadang-by-strukorder?strukOrder="+$state.params.strukOrder, true).then(function(f){
				$scope.dataBarangByNorec = f.data.data;
				for(var x = 0; x<$scope.dataBarangByNorec.length; x++){
					if($scope.item.namaBarangBaru == $scope.dataBarangByNorec[x].namaProduk){
				       $scope.noRecBaru = $scope.dataBarangByNorec[x].noRec;
				     }
				 }		
				 var data = {
							"strukOrder":{
								"noRec":$state.params.strukOrder
							},
						    "jumlah": parseInt($scope.item.jumlahBarangBaru),
						    "satuanStandar": {
						    	"id":$scope.item.satuanBarangBaru.id
						    },
						    "namaBarang": $scope.item.namaBarangBaru,
						    "noRec": $scope.noRecBaru
				 };
				 var dataView = {
					"namaBarang":$scope.item.namaBarangBaru,
					"jumlah":$scope.item.jumlahBarangBaru,
					"satuan":$scope.item.satuanBarangBaru.satuanStandar
				 };
				 $scope.dataKirim.push(data);
				 $scope.dataMaster.push(dataView);
				 load();
				 $scope.item.namaBarangBaru = "";
				 $scope.item.jumlahBarangBaru = "";
				 $scope.item.satuanBarangBaru = "";
				 $scope.item.ruanganBarangBaru = "";
			  });
			}

		    $scope.batal = function(){
			$state.go("RespondPerbaikan")
			}
			$scope.simpan = function () {
				console.log(JSON.stringify($scope.dataKirim));
				IPSRSService.saveDataSarPras($scope.dataKirim, "psrsPermintaanPerbaikan/save-suku-cadang-luar/").then(function(e) {
				});
			  }
		    }
		]);
});
