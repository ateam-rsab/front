define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TipeKoleksiCtrl', ['$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageServicePhp' ,'$window', '$timeout',
		function($rootScope, $scope, ModelItemAkuntansi, manageServicePhp, $window, $timeout) {
			$scope.item = {};
			$scope.search = {};
			$scope.isRouteLoading=false;

			loadData();
			$scope.Search = function(){
				loadData()
			}
			$scope.Clear = function (){
				$scope.item={}	
				$scope.search={}

			}


			
			function loadData(){
				$scope.isRouteLoading=true;
				
				var id =""
				if ($scope.item.id != undefined){
					id ="&id=" +$scope.item.id
				}
				var kode =""
				if ($scope.item.kode != undefined){
					kode ="&kode=" +$scope.item.kode
				}
				var tipe =""
				if ($scope.item.tipeKoleksi != undefined){
					tipe ="&tipeKoleksi=" +$scope.item.tipeKoleksi
				}	
				
				manageServicePhp.getDataTableTransaksi("perpustakaan/get-tipe-koleksi?"
					+tipe
					+kode
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
					pageable: true,
					scrollable: true,
					columns: [{
						"field": "no",
						"title": "No",
						"width": "23px",
						"attributes": {align: "center"}

					}, 
					{
						"field": "id",
						"title": "ID",
						"width": "50px"
					},
					{
						"field": "kodeexternal",
						"title": "Kode",
						"width": "80px"
					},
					{
						"field": "name",
						"title": "Tipe Keanggotaan",
						"width": "200px"
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
						width: "100px",
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

					var kode=""
					if ($scope.popUp.kode !=undefined)
						kode =$scope.popUp.kode 

					var tipeKoleksi=""
					if($scope.popUp.tipeKoleksi!=undefined)
						tipeKoleksi =$scope.popUp.tipeKoleksi

					
					var objSave = {
						"id" :id,
						"kode" :kode,
						"tipekoleksi" :tipeKoleksi,

					}
					manageServicePhp.saveDataTransaksi("perpustakaan/save-tipe-koleksi",objSave).then(function(res){
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

					manageServicePhp.saveDataTransaksi("perpustakaan/delete-tipe-koleksi",itemDelete).then(function(e){
						if(e.status === 201){
							loadData();
								// grid.removeRow(row);
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
					$scope.popUp.kode =dataItem.kodeexternal
					$scope.popUp.tipeKoleksi= dataItem.name

					$scope.popUps.center().open();

				}

				$scope.tutup = function(){
					$scope.popUps.close();

				}

			}
			]);
});

