define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StandarPelayananMakananRevCtrl', ['$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageServicePhp' ,'$window', '$timeout',
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
				manageServicePhp.getDataTableTransaksi("gizi/get-combo-standarpelayananmakan"
					).then(function(e) {
						$scope.listMenuMakan = e.data.detailjenisproduk
						$scope.listJenisWaktu = e.data.jeniswaktu
						$scope.listKelas = e.data.kelas
						$scope.listRuangan = e.data.ruangan

					})

				}
				function loadData(){
					$scope.isRouteLoading=true;
					var id =""
					if ($scope.item.id != undefined){
						id ="&id=" +$scope.item.id
					}
					var menuMakanId =""
					if ($scope.item.menuMakan != undefined){
						menuMakanId ="&menuMakanId=" +$scope.item.menuMakan.id
					}
					var jenis =""
					if ($scope.item.jenisWaktu != undefined){
						jenis ="&jenisWaktuId=" +$scope.item.jenisWaktu.id
					}	
					var kel =""
					if ($scope.item.kelas != undefined){
						kel ="&kelasId=" +$scope.item.kelas.id
					}
					var ruangan =""
					if ($scope.item.ruangan != undefined){
						ruangan ="&ruanganId=" +$scope.item.ruangan.id
					}
					manageServicePhp.getDataTableTransaksi("gizi/get-daftar-standarpelayananmakan?"
						+menuMakanId
						+jenis
						+kel
						+id
						+ruangan).then(function(data) {
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
							"title": "No",
							"width": "40px"
						},
						{
							"field": "detailjenisproduk",
							"title": "Menu Makan",
							"width": "150px"
						}, {
							"field": "jeniswaktu",
							"title": "Jenis Waktu",
							"width": "100px"
						},
						{
							"field": "namakelas",
							"title": "Kelas",
							"width": "100px"
						}, 
						{
							"field": "namaruangan",
							"title": "Ruangan",
							"width": "100px"
						}, {
							"field": "berat",
							"title": "Berat (gr)",
							"width": "100px"
						}, {
							"field": "satuanstandar",
							"title": "Satuan",
							"width": "100px",
							footerTemplate: "<h3 align=center>Jumlah:<h3>"
						}, {
							"title": "<span class='style-right'> Nilai Gizi</span>",
							  headerAttributes: { style: "text-align : center" },
							"columns": [{
								"field": "energi",
								"title": "Energi (Kkal)",
								"width": "80px",
								headerAttributes: {
									style: "text-align : center"
								},
								footerTemplate: "<span class='style-right'><h3 align=center>{{jumlahenergi}}</h3></span>"
							}, {
								"field": "protein",
								"title": "Protein (gr)",
								"width": "80px",
								footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahProtein}}</h3></span>"
							}, {
								"field": "lemak",
								"title": "Lemak (gr)",
								"width": "80px",
								footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahLemak}}</h3></span>"
							}, {
								"field": "karbonhidrat",
								"title": "Karbohidrat (gr)",
								"width": "100px",
								footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahKarbohidrat}}</h3></span>"
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

							]}

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

