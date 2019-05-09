define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailOrderEksCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras', '$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, FindSarpras, $state) {
			$scope.item = {};
			ModelItem.get("Laundry/Pencucianlinen").then(function(data) {
				$scope.item = data;
				$scope.no = 1;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
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

			$scope.Batal = function(){
				$scope.item.jumlahCycle="";
			}

			$scope.kl = function(current){
			 debugger
			  $scope.biaya = current.biaya
			  $scope.jumlahKirim = current.jumlahKirim
			  $scope.jumlahOrder = current.jumlahOrder
			  $scope.namaLinen = current.namaLinen
			  $scope.no = current.no
			  $scope.petugas = current.petugas
			  $scope.satuanKirim = current.satuanKirim
			  $scope.satuanOrder = current.satuanOrder

			}

			$scope.OpenHome = function(){
				debugger
				$state.go('DaftarPemesananLaundryEks');
			}

		   $scope.mainGridOptions = { 
			pageable: true,
			filterable: {
						  extra: false,operators: {string: {startsWith: "Pencarian"}}
					    },
            sortable: true,
            /*editable : true*/
     	   }

			$scope.daftarDetailOrder = new kendo.data.DataSource({
			data: [
					{    
						"no" : 1,
						"namaLinen": "Popok",
						"jumlahOrder": 3,
						"satuanOrder": "Buah",
						"jumlahKirim": 3,
						"satuanKirim": "Buah",
						"petugas":"admins",
						"biaya" : "1000"
					},
					{ 
						"no" : 2,
						"namaLinen": "Handuk",
						"jumlahOrder": 2,
						"satuanOrder": "Buah",
						"jumlahKirim": 1,
						"satuanKirim": "Buah",
						"petugas":"admins",
						"biaya" : "1000"
					},
					{
						"no" : 3,
						"namaLinen": "Seperai",
						"jumlahOrder": 2,
						"satuanOrder": "Buah",
						"jumlahKirim": 1,
						"satuanKirim": "Buah",
						"petugas":"admins",
						"biaya" : "1000"
					}
				]
			});
			$scope.columndaftarDetailOrder = [
			{
				"field": "no",
				"title": "<h3 align=center>No.</h3>",
				"width": "40px",
				"filterable" : false
			},{
				"field": "namaLinen",
				"title": "<h3 align=center>Nama Linen</h3>",
				"width": "200px"
			}, 
			{
				"field": "jumlahOrder",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "100px"
			},{
				"field": "satuanOrder",
				"title": "<h3 align=center>Satuan</h3>",
				"width": "100px",
				"filterable" : false
			}, {
				"field": "jumlahKirim",
				"title": "<h3 align=center>Jumlah Kirim</h3>",
				"width": "100px",
				"editable": "true"
			},{
				"field": "satuanKirim",
				"title": "<h3 align=center>Satuan Kirim</h3>",
				"width": "100px",
				"filterable" : false
			},{
				"field": "biaya",
				"title": "<h3 align=center>Harga</h3>",
				"width": "200px",
				"filterable" : false
		    }];

		}
		]);
});