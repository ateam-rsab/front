define(["initialize"], function(initialize) {
	"use strict";
	initialize.controller("ProduksiNonSterilCtrl", ["$rootScope", "$scope", "ModelItem","$http",'DateHelper',
		function($rootScope, $scope, ModelItem, $http, DateHelper) {
			$scope.cek = "ProduksiNonSterilCtrl";
			$scope.dataVOloaded = true;

			$scope.item = {};

			$scope.now = new Date();

			$http.get("http://172.16.70.120:8000/service/master/produk/list-produk").then(function(data){
				$scope.listDataNamaBarang = data;
				console.log($scope.listDataNamaBarang);
				debugger;
			})
			$http.get("http://172.16.70.120:8000/service/transaksi/pegawai/data-pegawai").then(function(data){
				$scope.listDataNamaPegawai = data;
			})

			

			$scope.idSequence = 1;
			$scope.isInputMode = true;
			$scope.idDataProduksiNonSteril = "";

			$scope.DataProduksiNonSteril = [];
			$scope.AddDataProduksiNonSteril = function()
			{
				
				var tanggalexpired = DateHelper.getTanggalFormattedNew($scope.item.expired);
				var tanggalproduksi = DateHelper.getTanggalFormattedNew($scope.item.tglProduksi);
				var data = {
					"statusenabled": $scope.item.statusenable,
					"hargasatuan":$scope.item.hargaSatuan,
					"jumlahproduksi":$scope.item.jmlProduksi,
					"noproduksi":$scope.item.noProduksi,
					"objectpegawaiygmemberikanfk":$scope.item.yangMemberikan.pegawaiId,
					"objectpegawaiygmemintafk":$scope.item.yangMeminta.pegawaiId,
					"objectpegawaiygmengetahuifk":$scope.item.mengetahui.pegawaiId,
					"objectprodukfk":$scope.item.namabarang.id,
					"satuan":$scope.item.hargaSatuan,
					"spesifikasi":$scope.item.spesifikasi,
					"tanggalexpired": tanggalexpired,
					"tglproduksi":tanggalproduksi,
					"unitcost":$scope.item.unitCost
									
				};
				console.log(data);
				$http.post("http://172.16.70.120:8000/service/master/produk/svc-produksinonsteril/add",data).then(function(data){
					alert("sukses");
					console.log(JSON.stringify(data));
				})
				$scope.item = {};
				$scope.DataProduksiNonSterfil.push(data);
				$scope.idSequence++;
			}



			$scope.EditDataProduksiNonSteril = function()
			{
				var data = _.find($scope.DataProduksiNonSteril, function(data){
				 return data.id == $scope.idDataProduksiNonSteril; 
				});

				data.noProduksi = $scope.item.noProduksi,
				data.tglProduksi = $scope.item.tglProduksi
				data.namaBarang = $scope.item.namaBarang,
				data.spesifikasi = $scope.item.spesifikasi,
				data.jmlProduksi = $scope.item.jmlProduksi,
				data.hargaSatuan = $scope.item.hargaSatuan,
				data.expired = $scope.item.expired,
				data.unitCost = $scope.item.unitCost,
				data.yangMeminta = $scope.item.yangMeminta,
				data.yangMemberikan = $scope.item.yangMemberikan,
				data.mengetahui = $scope.item.mengetahui,
				data.kodeBarang = $scope.item.namaBarang,
				data.satuan = $scope.item.satuan

				$scope.isInputMode = true;

				$scope.item = {};
			}

			$scope.getEditData = function(id)
			{
				$scope.idDataProduksiNonSteril = id;
				$scope.isInputMode = false;

				var data = _.find($scope.DataProduksiNonSteril, function(data){
				 return data.id == id; 
				});

				$scope.item.noProduksi = data.noProduksi;
				$scope.item.tglProduksi = data.tglProduksi;
				$scope.item.namaBarang = data.namaBarang;
				$scope.item.spesifikasi = data.spesifikasi;
				$scope.item.jmlProduksi = data.jmlProduksi;
				$scope.item.hargaSatuan = data.hargaSatuan;
				$scope.item.expired = data.expired;
				$scope.item.unitCost = data.unitCost;
				$scope.item.yangMeminta = data.yangMeminta;
				$scope.item.yangMemberikan = data.yangMemberikan;
				$scope.item.mengetahui = data.mengetahui;
				$scope.item.satuan = data.satuan;
			}


			$scope.removeDataProduksiNonSteril = function(data)
			{
				$scope.DataProduksiNonSteril = _.without($scope.DataProduksiNonSteril, data);
			}


			$scope.showDetailData = function(id)
			{
				var data = _.find($scope.DataProduksiNonSteril, function(data){
				 return data.id == id; 
				});


				if(data.statVisible)
				{
					data.statVisible = false;
				}
				else
				{
					data.statVisible = true;
				}
			}

		}
	]);
});