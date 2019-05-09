define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisWaktuRevCtrl', ['$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageServicePhp' ,'$window', '$timeout',
		function($rootScope, $scope, ModelItemAkuntansi, manageServicePhp, $window, $timeout) {
			$scope.item = {};
			$scope.popUp = {};
			$scope.isRouteLoading=false;

			loadCombo();
			loadData();
			$scope.Search = function(){
				loadData()
			}
			$scope.Clear = function (){
				$scope.item={}	
				$scope.popUp={}

			}


			function loadCombo(){
				manageServicePhp.getDataTableTransaksi("gizi/get-data-combo-gizi"
					).then(function(e) {
						$scope.listKelompokProduk = e.data.kelompokproduk
						$scope.listDepartemen = e.data.departemen
					})

				}
				function loadData(){
					$scope.isRouteLoading=true;
					var id =""
					if ($scope.item.id != undefined){
						id ="&id=" +$scope.item.id
					}
					var kdJenis =""
					if ($scope.item.kdJenisWaktu != undefined){
						kdJenis ="&kdJenis=" +$scope.item.kdJenisWaktu
					}
					var jenis =""
					if ($scope.item.jenisWaktu != undefined){
						jenis ="&jenisWaktu=" +$scope.item.jenisWaktu
					}	
					var kel =""
					if ($scope.item.kelompokProduk != undefined){
						kel ="&kelompokProdukId=" +$scope.item.kelompokProduk.id
					}
					var dep =""
					if ($scope.item.departemen != undefined){
						dep ="&departemenId=" +$scope.item.departemen.id
					}
					manageServicePhp.getDataTableTransaksi("gizi/get-daftar-jeniswaktu?"
						+kdJenis
						+jenis
						+kel
						+id
						+dep).then(function(data) {
							$scope.isRouteLoading=false;
							for (var i = 0; i < data.data.data.length; i++) {
								data.data.data[i].no = i+1
							}
							$scope.dataSource = new kendo.data.DataSource({
								data: data.data.data,
								pageSize: 10,
							// total: data.data.data.length,
							serverPaging: true,


						});



						})
					}
					$scope.columnGrid = {
						toolbar: [
						{
							name: "add",text: "Tambah",
							template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'	
						},	
						
						],


						columns: [{
							"field": "no",
							"title": "<h3 align=center>No</h3>",
							"width": "23px",
							"attributes": {align: "center"}

						}, 
						{
							"field": "id",
							"title": "<h3 align=center>ID</h3>",
							"width": "50px"
						},{
							"field": "kdjeniswaktu",
							"title": "<h3 align=center>Kode Jenis Waktu</h3>",
							"width": "80px"
						}, {
							"field": "jeniswaktu",
							"title": "<h3 align=center>Jenis Waktu</h3>",
							"width": "150px"
						}, {
							"field": "jamawal",
							"title": "<h3 align=center>Jam Awal</h3>",
							"width": "80px"
						},
						{
							"field": "jamakhir",
							"title": "<h3 align=center>Jam Akhir</h3>",
							"width": "80px"
						},
						{
							"field": "kelompokproduk",
							"title": "<h3 align=center>Kelompok Produk</h3>",
							"width": "100px"
						},
						{
							"field": "namadepartemen",
							"title": "<h3 align=center>Departemen</h3>",
							"width": "100px"
						},
						{
							"command":[{
								text: "Hapus", 
								click: hapusData, 
								imageClass: "k-icon k-delete"
							},{
								text: "Edit", 
								click: editData, 
								imageClass: "k-icon k-i-pencil"
							}],
							title: "",
							width: "130px",
						}

						]
					};

					$scope.Tambah = function(){
						$scope.popUps.center().open();
					}
					$scope.save = function(){
						var id =""
						if ($scope.popUp.id !=undefined)
							id=$scope.popUp.id

						var kdJenisWaktu=""
						if ($scope.popUp.kodeJenisWaktu !=undefined)
							kdJenisWaktu =$scope.popUp.kodeJenisWaktu 

						var jenisWaktu=""
						if($scope.popUp.jenisWaktu!=undefined)
							jenisWaktu =$scope.popUp.jenisWaktu

						var awal=""
						if ($scope.popUp.jamAwal!=undefined)
							awal=$scope.popUp.jamAwal

						var akhir=""
						if ($scope.popUp.jamAkhir!=undefined)
							akhir=$scope.popUp.jamAkhir


						var kelompokProdukId=null
						if ($scope.popUp.kelompokProduk!=undefined)
							kelompokProdukId=$scope.popUp.kelompokProduk.id

						var departemenId=null
						if ($scope.popUp.departemen!=undefined)
							departemenId=$scope.popUp.departemen.id

						var objSave = {
							"id" :id,
							"kdjeniswaktu" :kdJenisWaktu,
							"jeniswaktu" :jenisWaktu,
							"jamawal" :awal,
							"jamakhir" :akhir,
							"objectdepartemenfk" :departemenId,
							"objectkelompokprodukfk" :kelompokProdukId,
						}
						manageServicePhp.saveJenisWaktu(objSave).then(function(res){
							loadData();
							$scope.Clear ();
						})

					}



					function hapusData(e){
						e.preventDefault();
						var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

						if(!dataItem){
							toastr.error("Data Tidak Ditemukan");
							return;
						}
						var itemDelete = {
							"id": dataItem.id
						}

						manageServicePhp.hapusJenisWaktu(itemDelete).then(function(e){
							if(e.status === 201){
								loadData();
								grid.removeRow(row);
							}
						})

					}
					function editData(e){
						$scope.Clear ();
						e.preventDefault();
						var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

						if(!dataItem){
							toastr.error("Data Tidak Ditemukan");
							return;
						}
						$scope.popUp.id =dataItem.id
						$scope.popUp.kodeJenisWaktu =dataItem.kdjeniswaktu
						$scope.popUp.jenisWaktu= dataItem.jeniswaktu
						$scope.popUp.jamAkhir= dataItem.jamakhir
						$scope.popUp.jamAwal= dataItem.jamawal
						if (dataItem.objectkelompokprodukfk!=null)
							$scope.popUp.kelompokProduk={id:dataItem.objectkelompokprodukfk,kelompokproduk:dataItem.kelompokproduk}
						if (dataItem.objectdepartemenfk!=null)
							$scope.popUp.departemen= {id:dataItem.objectdepartemenfk,namadepartemen:dataItem.namadepartemen}

						$scope.popUps.center().open();

					}

					$scope.tutup = function(){
						$scope.popUps.close();

					}
					
				}
				]);
});

