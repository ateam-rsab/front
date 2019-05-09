define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DetailJenisProdukEditCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManagePhp', 'ModelItem', '$mdDialog', 'CacheHelper',
		function ($q, $rootScope, $scope, $state, ManagePhp, ModelItem, $mdDialog, cacheHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;

			$scope.kembali = function () {
				$state.go('DetailJenisProduk')
			}

			load()

			function load() {

				var cache=cacheHelper.get('CacheFormDetailJenisProduk')	
				if (cache != undefined){
						$scope.item.id= cache.id
						
						$scope.item.detailjenisproduk = cache.detailjenisproduk;
						$scope.item.isregistrasiaset = cache.isregistrasiaset;
						$scope.item.account = {id:cache.objectaccountfk,namaaccount:cache.namaaccount};

						$scope.item.kddetailjenisproduk = cache.kddetailjenisproduk;
						$scope.item.jenisproduk = {id:cache.objectjenisprodukfk,jenisproduk:cache.jenisproduk};

						$scope.item.departemen ={id:cache.objectdepartemenfk,namadepartemen:cache.namadepartemen};

						$scope.item.persenhargacito = parseFloat(cache.persenhargacito);
						// $scope.item.persenhargacito = 1;

						$scope.item.qdetailjenisproduk = cache.qdetailjenisproduk;
						
						$scope.item.norec = cache.norec;
						$scope.item.reportdisplay = cache.reportdisplay;
						$scope.item.kodeexternal = cache.kodeexternal;
						$scope.item.namaexternal = cache.namaexternal;
						$scope.item.statusenabled = cache.statusenabled;

				}
			

				
			}



			ManagePhp.getData("detail-jenis-produk/get-data-for-combo-in-form-detail-jenis-produk").then(function(dat){
				$scope.listaccount= dat.data.account;
				$scope.listdepartemen= dat.data.departemen;
				$scope.listjenisproduk= dat.data.jenisproduk;
			});

			

			$scope.batal = function () {
				
				// $scope.item = {};
				$state.go("DetailJenisProduk2")
			}
		
			$scope.simpan = function(){

				var id="";
				// var kdprofile="";
				// var statusenabled="";
				var kodeexternal=null;
				var namaexternal=null;
				// var norec=null;
				var reportdisplay="";
				var objectaccountfk=null;
				var objectdepartemenfk=null;
				var objectjenisprodukfk=null;
				var detailjenisproduk="";
				var isregistrasiaset="";
				var kddetailjenisproduk="";
				var persenhargacito="";
				var qdetailjenisproduk="";

				if ($scope.item.detailjenisproduk == undefined || $scope.item.detailjenisproduk=="") {
					alert("Detail Jenis produk harus di isi!")
					return
				}else{
					detailjenisproduk = $scope.item.detailjenisproduk
				}
				
				if ($scope.item.kodeexternal != undefined) {
					kodeexternal=$scope.item.kodeexternal
				}

				if ($scope.item.namaexternal != undefined) {
					namaexternal=$scope.item.namaexternal
				}

				if ($scope.item.reportdisplay != undefined) {
					reportdisplay=$scope.item.reportdisplay
				}

				if ($scope.item.account.id != undefined) {
					objectaccountfk=$scope.item.account.id
				}

				if ($scope.item.departemen.id != undefined) {
					objectdepartemenfk=$scope.item.departemen.id
				}

				if ($scope.item.jenisproduk.id != undefined) {
					objectjenisprodukfk=$scope.item.jenisproduk.id
				}

				if ($scope.item.isregistrasiaset != undefined) {
					isregistrasiaset=$scope.item.isregistrasiaset
				}

				if ($scope.item.kddetailjenisproduk != undefined) {
					kddetailjenisproduk=$scope.item.kddetailjenisproduk
				}

				if ($scope.item.persenhargacito != undefined) {
					persenhargacito=$scope.item.persenhargacito
				}

				if ($scope.item.qdetailjenisproduk != undefined) {
					qdetailjenisproduk=$scope.item.qdetailjenisproduk
				}

				if ($scope.item.id != undefined) {
					id=$scope.item.id
				}


				var data = {

									kodeexternal:kodeexternal,
									namaexternal:namaexternal,
									reportdisplay:reportdisplay,
									objectaccountfk:objectaccountfk,
									objectdepartemenfk:objectdepartemenfk,
									objectjenisprodukfk:objectjenisprodukfk,
									detailjenisproduk:detailjenisproduk,
									isregistrasiaset:isregistrasiaset,
									kddetailjenisproduk:kddetailjenisproduk,
									persenhargacito:persenhargacito,
									qdetailjenisproduk:qdetailjenisproduk,
									id: id,
									
					

				}

				var objSave =
					{
						detailjenisproduk: data

					}
				
					ManagePhp.postData2("detail-jenis-produk/post-data-detail-jenis-produk",objSave).then(function (e) {

						// loadData();
						// $scope.item = {};
						

					});

			  }


			  $scope.radioIsRegistrasiAset=[
	                {"id":1,"nama":"Ya "},{"id":2,"nama":"Tidak "}]


		}
	]);
});
