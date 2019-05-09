define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterMesinCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras','$state',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras,$state) {
			$scope.item = {};
			$scope.KodeSembunyi = true;
			ModelItem.get("Laundry/MasterMesin").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.kode = function() {
				$scope.item.idProduk = $scope.item.namaProduk.idProduk;
			};
			$scope.satuan = function() {
				if($scope.item.namaProduk != undefined){
				$scope.item.idProduk = $scope.item.namaProduk.idProduk;
				}
			};

		     ManageSarpras.getOrderList("alat/get-satuan", true).then(function(dat) {
			    $scope.sourceSatuan= dat.data.data;
              });

			$scope.baru = function(){
			$scope.KodeSembunyi = true;
			$scope.item.namaProduk ="";
			$scope.item.kapasitas ="";
			$scope.item.satuan ="";
			$scope.item.kodeEksternal ="";
			$scope.item.namaEksternal ="";
			$scope.idSelected = undefined
			toastr.info("Mode Baru : Aktif");
			}

			$scope.tutup = function(){
				$state.go('home');
			}

			FindSarpras.getSarpras("mesin/find-mesin/").then(function(dat){
				$scope.sourceMasterMesin= dat.data.data;
			});

			$scope.init = function(){
			FindSarpras.getSarpras("mesin/find-mesin-laundry/").then(function(dat){
				$scope.sourceDataLaundry= dat.data.data;
			});
			}
			$scope.init();


			$scope.mainGridOptions = { 
				pageable: true,
				filterable: {
				extra: false,
				operators: {
							string: {
									  startsWith: "Pencarian"
									}
							}
				},
             sortable: true,
	     	}

			$scope.columndataMasterMesin = 
			[
			{
				"field": "idMesin",
				"title": "<h3 align=center>Kode Mesin</h3>",
				"width": "100px",
				"filterable" : false
			},
			{
				"field": "namaMesin",
				"title": "<h3 align=center>Mesin</h3>",
				"width": "200px",
				"filterable" : true
			},
			{
				"field": "kapasitas",
				"title": "<h3 align=center>Kapasitas</h3>",
				"width": "150px",
				"filterable" : false
			},
			{
				"field": "satuan",
				"title": "<h3 align=center>Satuan</h3>",
				"width": "100px",
				"filterable" : false
			},
			{
				"field": "kodeExternal",
				"title": "<h3 align=center>Kode Eksternal</h3>",
				"width": "100px",
				"filterable" : false
			},
			{
				"field": "namaExternal",
				"title": "<h3 align=center>Nama Eksternal</h3>",
				"width": "200px",
				"filterable" : false
			},
			// {
			// 	"field": "statusEnabled",
			// 	"title": "<h3 align=center>Status Enabled</h3>",
			// 	"width": "100px"
			// }
			{
			 "title": "<h3 align=center>Action</h3>",
		      "width" : "100px",
		     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
	

			$scope.SelectMesin=function(data){
					// console.log(JSON.stringify(data));
					// $scope.item.idProduk=data.idProduk,
					// $scope.item.namaProduk=data.namaProduk,
					// $scope.item.aktif=aktif
				if($scope.idSelected == undefined){
					   toastr.info("Mode Edit : Aktif");	
				}
				$scope.item.idProduk = data.idProduk,
				$scope.item.namaProduk = {idProduk : data.idMesin, namaProduk : data.namaMesin},
				$scope.item.kapasitas = data.kapasitas,
				$scope.item.satuan = {id : data.idSatuan, namaSatuanStandar : data.satuan},
				$scope.item.kodeEksternal = data.kodeExternal,
				$scope.item.namaEksternal = data.namaExternal,
				$scope.idSelected = data.id,
				$scope.KodeSembunyi = false;
			};
			$scope.enableKodeMesin = "true";

			$scope.Save=function()
			{
				var data = {
					"id" : $scope.idSelected,
					"mesin": 
						{
							"id": $scope.item.namaProduk.idProduk
						},
					"kapasitas": $scope.item.kapasitas,
					"satuan": 
						{
							"id": $scope.item.satuan.id
						},
					"kodeExternal": $scope.item.kodeEksternal,
					"namaExternal": $scope.item.namaEksternal,
					"statusEnabled": true
				};
				console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(ModelItem.beforePost(data), "mesin/save-mesin/").then(function(e) {
					FindSarpras.getSarpras("mesin/find-all-mesin/").then(function(dat){
						$scope.sourceMasterMesin= dat.data.data;
					});
					$scope.item = {};
					$scope.KodeSembunyi = true;
					$scope.idSelected = undefined;
					$scope.init();

				});
			};

		   $scope.disableData = function(){
             if($scope.idSelected != undefined){
				var data = {
					"id" : $scope.idSelected,
					"mesin": 
						{
							"id": $scope.item.namaProduk.idProduk
						},
					"kapasitas": $scope.item.kapasitas,
					"satuan": 
						{
							"id": $scope.item.satuan.id
						},
					"kodeExternal": $scope.item.kodeEksternal,
					"namaExternal": $scope.item.namaEksternal,
					"statusEnabled": false
				};
				console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(ModelItem.beforePost(data), "mesin/save-mesin/").then(function(e) {
					FindSarpras.getSarpras("mesin/find-all-mesin/").then(function(dat){
						$scope.sourceMasterMesin= dat.data.data;
					});
					$scope.item = {};
					$scope.KodeSembunyi = true;
					$scope.idSelected = undefined;
					$scope.init();

				});
			}else{
			  	window.messageContainer.error('Pilih 1 Data Terlebih Dahulu')
			  }
		     }
			$scope.Batal = function () {
                // debugger;
                $scope.item.idProduk="",
                $scope.item.namaProduk="",
                $scope.item.kapasitas="",
                $scope.item.satuan="",
                $scope.item.kodeEksternal="",
                $scope.item.namaEksternal="",
                $scope.item.statusEnabled=""
            };
        }
        ]);
});

		// var aktif = false;
			// $scope.checkbox = function () {
			// 	if (aktif)
			// 		aktif = false;

			// 	else
			// 		aktif = true;

			// 	console.log(aktif);
			// }
			// console.log($scope.checkbox);

// FindSarpras.getSarpras("mesin/find-satuan-standar-kg/").then(function(dat){
			// 	$scope.sourceSatuan= dat.data.data;
			// });