define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DiagnosaKeperawatanRevCtrl', ['$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageServicePhp' ,'$window', 'ManagePhp',
		function($rootScope, $scope, ModelItemAkuntansi, manageServicePhp, $window, ManagePhp) {
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
						id ="id=" +$scope.item.id
					}
					var kdext =""
					if ($scope.item.kodeExternal != undefined){
						kdext ="&kodeexternal=" +$scope.item.kodeExternal
					}
					var namadiag =""
					if ($scope.item.namaDiagnosaKep != undefined){
						namadiag ="&namadiagnosakep=" +$scope.item.namaDiagnosaKep
					}	
					
					manageServicePhp.getDataTableTransaksi("rekam-medis/get-master-diagnosa-kep?"
						+namadiag
                        +kdext
                        +id
						).then(function(data) {
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
							"width": "5%",
							"attributes": {align: "center"}

						}, 
						{
							"field": "namaDiagnosaKep",
							"title": "Nama Diagnosa Keperawatan",
							"width": "60%"
						},{
							"field": "kodeexternal",
							"title": "Kode External",
							"width": "10%"
                        }, {
                        
							"field": "deskripsidiagnosakep",
							"title": "Deskripsi Diagnosa Kep",
							"width": "10%"
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
							width: "15%",
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

					
						if ($scope.popUp.namaDiagnosaKep ==undefined){
                            toastr.error('diagnosa Keperawatan harus di isi')
                            return
                        }
							

						var des=""
						if($scope.popUp.deskripsi!=undefined)
                        des =$scope.popUp.deskripsi

						
						var objSave = {
							"id" :id,
							"namadiagnosakep" :$scope.popUp.namaDiagnosaKep,
							"deskripsidiagnosakep" :des,
						
						}
                        ManagePhp.postData(objSave, 'rekam-medis/post-diagnosa-kep/save').then(function (e) {
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

                        ManagePhp.postData(itemDelete, 'rekam-medis/post-diagnosa-kep/delete').then(function (e) {
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
						$scope.popUp.namaDiagnosaKep =dataItem.namaDiagnosaKep
						$scope.popUp.deskripsi= dataItem.deskripsi
	
						$scope.popUps.center().open();

					}

					$scope.tutup = function(){
						$scope.popUps.close();

					}
					
				}
				]);
});

