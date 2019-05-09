define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisDietRevCtrl', ['$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageServicePhp' ,'$window', '$timeout',
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
				delete 	$scope.item.id
				delete 	$scope.item.kdJenisDiet
				delete 	$scope.item.jenisDiet
				delete 	$scope.item.kelompokProduk
				delete 	$scope.popUp.id
				delete 	$scope.popUp.kodeJenisDiet
				delete 	$scope.popUp.jenisDiet
				delete 	$scope.popUp.kelompokProduk
				delete 	$scope.popUp.Keterangan


			}


			function loadCombo(){
				manageServicePhp.getDataTableTransaksi("gizi/get-data-combo-gizi"
					).then(function(e) {
						$scope.listKelompokProduk = e.data.kelompokproduk
					})

				}
				function loadData(){
					$scope.isRouteLoading=true;
					var id =""
					if ($scope.item.id != undefined){
						id ="&id=" +$scope.item.id
					}
					var kdJenis =""
					if ($scope.item.kdJenisDiet != undefined){
						kdJenis ="&kdJenis=" +$scope.item.kdJenisDiet
					}
					var jenis =""
					if ($scope.item.jenisDiet != undefined){
						jenis ="&jenisDiet=" +$scope.item.jenisDiet
					}	
					var kel =""
					if ($scope.item.kelompokProduk != undefined){
						kel ="&kelompokProdukId=" +$scope.item.kelompokProduk.id
					}
					manageServicePhp.getDataTableTransaksi("gizi/get-daftar-jenisdiet?"
						+kdJenis
						+jenis
						+kel
						+id).then(function(data) {
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
							"field": "kdjenisdiet",
							"title": "<h3 align=center>Kode Jenis Diet</h3>",
							"width": "80px"
						}, {
							"field": "jenisdiet",
							"title": "<h3 align=center>Jenis Diet</h3>",
							"width": "150px"
						}, {
							"field": "keterangan",
							"title": "<h3 align=center>Keterangan</h3>",
							"width": "200px"
						},
						{
							"field": "kelompokproduk",
							"title": "<h3 align=center>Kelompok Produk</h3>",
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
						$scope.popUp.center().open();
					}
					$scope.save = function(){
						var id =""
						if ($scope.popUp.id !=undefined)
							id=$scope.popUp.id

						var kdJenisDiet=""
						if ($scope.popUp.kodeJenisDiet !=undefined)
							kdJenisDiet =$scope.popUp.kodeJenisDiet 

						var jenisDiet=""
						if($scope.popUp.jenisDiet!=undefined)
							jenisDiet =$scope.popUp.jenisDiet

						var ket=""
						if ($scope.popUp.Keterangan!=undefined)
							ket=$scope.popUp.Keterangan

						var kelompokProdukId=null
						if ($scope.popUp.kelompokProduk!=undefined)
							kelompokProdukId=$scope.popUp.kelompokProduk.id

						var objSave = {
							"id" :id,
							"kdjenisdiet" :kdJenisDiet,
							"jenisdiet" :jenisDiet,
							"keterangan" :ket,
							"objectkelompokprodukfk" :kelompokProdukId,
						}
						manageServicePhp.saveJenisDiet(objSave).then(function(res){
							loadData();
							$scope.Clear ();
						})

					}

					// $scope.klikGrid= function(dataSelected){
					// 	// $scope.popUp.id =dataSelected.id
					// 	// $scope.popUp.kdJenisDiet =dataSelected.kdjenisdiet
					// 	// $scope.popUp.jenisDiet= dataSelected.jenisidiet
					// 	// $scope.popUp.kelompokProduk={id:dataSelected.objectkelompokprodukfk,kelompokproduk:dataSelected.kelompokproduk}
					// 	// $scope.popUp.Keterangan= dataSelected.keterangan


					// }




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

						manageServicePhp.hapusJenisDiet(itemDelete).then(function(e){
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
						$scope.popUp.kodeJenisDiet =dataItem.kdjenisdiet
						$scope.popUp.jenisDiet= dataItem.jenisdiet
						if (dataItem.objectkelompokprodukfk!=null){
							$scope.popUp.kelompokProduk={id:dataItem.objectkelompokprodukfk,kelompokproduk:dataItem.kelompokproduk}
						}

						$scope.popUp.Keterangan= dataItem.keterangan
						$scope.popUp.center().open();

					}

				}
				]);
});

