define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPemesananLaundryCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras', '$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, FindSarpras, $state) {
			$scope.item = {};
			ModelItem.get("Laundry/Pencucianlinen").then(function(data) {
				$scope.item = data;
				$scope.no = 1;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

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
					 debugger;
					$scope.sourceDaftarBahan = dat.data;
				});
			};
			$scope.Batal = function(){
				$scope.item.jumlahCycle="";
			}

			$scope.detailOrder = function(){
				$state.go("DetailOrderInt")
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



			$scope.daftarPelipatan = new kendo.data.DataSource({
			data: [{"nomorOrder" : "ODR-OO1",
					"ruanganPemesan" : "Laundry",
					"tanggalPemesanan" : "2017-01-01",
					"status" : "aktif",
					"tanggalPengiriman" : "2017-01-02",
					"petugas": "Akbar"
					}]
			});


		     $scope.klik= function(dataSelected){
		     	debugger
			  $scope.item.nomorOrder = dataSelected.nomorOrder;	
			 }
			 debugger

			$scope.kirim = function(){
			debugger
				if($scope.item.nomorOrder == undefined){
					toastr.error('Pilih 1 Data Terlebih dahulu !!')	
				}else{
					toastr.success('Data Dikirim !!')
				}
			}

			$scope.detailOrder = function(){
			debugger
			$state.go('DetailOrderInt');
			}

			$scope.daftardistribusi = function(){
			$state.go('DaftarDistribusi');
			}

			$scope.columndaftarPelipatan = [{
				"field": "nomorOrder",
				"title": "<h3 align=center>Nomor<br>Order</h3>",
				"width": "100px"
			}, {
				"field": "ruanganPemesan",
				"title": "<h3 align=center>Ruangan Pemesan</h3>",
				"width": "100px"
			},{
				"field": "tanggalPemesanan",
				"title": "<h3 align=center>Tanggal<br>Pemesanan</h3>",
				"width": "100px"
			}, {
				"field": "status",
				"title": "<h3 align=center>Status</h3>",
				"width": "100px"
			},{
				"field": "tanggalPengiriman",
				"title": "<h3 align=center>Tanggal<br>Pengiriman</h3>",
				"width": "100px"
			},{
				"field": "petugas",
				"title": "<h3 align=center>Petugas</h3>",
				"width": "100px"
		    }];

		}
		]);
});