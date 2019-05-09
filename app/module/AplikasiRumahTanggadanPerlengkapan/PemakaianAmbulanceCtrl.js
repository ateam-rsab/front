define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemakaianAmbulanceCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','ManageSarpras', '$state',
		function($rootScope, $scope, ModelItem, DateHelper,ManageSarpras, $state) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.now = new Date();
			ModelItem.get("AplikasiRumahTanggadanPerlengkapan/PemakaianAmbulance").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("ModelPelayanan", false).then(function(data) {
				$scope.ListPelayanan= data;
			})
			ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
			$scope.ListPegawai = data;
			})
			$scope.enableNoOrder=true;

			ManageSarpras.getOrderList("daftar-pesan-ambulance/find-by-no-order/?noOrder=" + $state.params.noOrder).then(function(data){
				    $scope.orderAmbulance = data.data.data.data[0];
				    $scope.strukOrder = $scope.orderAmbulance.strukOrder;
				    $scope.strukOrder.tglOrder = new Date($scope.strukOrder.tglOrder);
					// debugger;
				});

			ManageSarpras.getOrderList("pemakaian-ambulance/find-asset-ambulance/").then(function(data){
				$scope.ListKendaraan = data.data.data;
			});

			ManageSarpras.getOrderList("order-ambulance/find-produk-ambulance/").then(function(data){
				$scope.ListProduk = data.data.data;
			})

			
			ManageSarpras.getOrderList("jadwalDokter/get-jadwal-supir-ambulance/" + $scope.now.getMonth() +"/" + $scope.now.getFullYear()).then(function(data){
				var supir = data.data.data.data;
            	// $scope.listPerawat = [];
            	debugger;
            	$scope.listSupir = [];
            	// data = data.data;
            	supir.forEach(function(dat){
            		$scope.listSupir.push(dat.pegawai);
            	})
            	// for (var i = 0; i < data.length; i++) {
            	// 	if(data[i].jenisPegawaiId == 2) $scope.listPerawat.push(data[i]);
            	// 	else if(data[i].jenisPegawaiId == 10) $scope.listSupir.push(data[i]);
            	// }
            	// debugger;
            })

            ManageSarpras.getListData("Pegawai&select=id,namaLengkap,jenisPegawaiId").then(function(data){
            	$scope.listPerawat = [];
            	var perawat = data.data;
            	perawat.forEach(function(dat){
            		if(dat.jenisPegawaiId == 2) $scope.listPerawat.push(dat);
            	})
            })

            $scope.remove = function(index){
            	$scope.arrPerawat.splice(index, 1);
            }

             $scope.arrPerawat = [
             {
             	"perawat": {
            		"id": "",
            		"namaLengkap": "",
            		"jenisPegawaiId": ""
            	}
            }
            ];

            $scope.addPerawat = function(){
            	var newData = {
            		"perawat":
	            	{
	            		"id": "",
	            		"namaLengkap": "",
	            		"jenisPegawaiId": ""
	            	}
            	}
            	$scope.arrPerawat.push(newData);
            }

			$scope.Save=function()
			{
				debugger;
				var data = {
						"asset":{
					       "noRec" : $scope.item.kendaraan.noRec
					    },
					    "orderPelayanan":{
					       "noRec" : $scope.orderAmbulance.noRec
					    },
					    // "produk": {
					    // 	"id": $scope.orderAmbulance.produk.id
					    // },
					    "supir": $scope.item.supir,
					    "mapPegawaiAmbulance": ModelItem.beforePost($scope.arrPerawat),
					    "namaAsset": $scope.item.barang
				}

                ManageSarpras.saveDataSarPras(data,"pemakaian-ambulance/save-pemakaian-ambulance/").then(function(e) {
					console.log(JSON.stringify(e.data));
					$scope.Back();
                });
			};

			$scope.Back = function(){
				$state.go("DaftarPesanAmbulance");
			}
		}
	]);
});