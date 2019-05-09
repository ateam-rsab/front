define(['initialize'], function(initialize) {
	
			'use strict';
			
			initialize.controller('JenisProdukCtrl', ['$q', '$rootScope', '$scope', 'ManagePhp', 
				function($q, $rootScope, $scope,ManagePhp) {
			 
			 $scope.item = {};
			 $scope.dataVOloaded = true;
			 $scope.now = new Date();


			 init();

			function init () {

				loadData();	

			}

			
			


			function loadData(){
				var JenisProduk = "";
				if ($scope.item.carijenisproduk != undefined) {
					JenisProduk = "&jenisproduk=" + $scope.item.carijenisproduk;
				}

				ManagePhp.getData("jenis-produk/get-data-master-for-form-jenis-produk?"+ JenisProduk).then(function(dat){
					$scope.listDataMaster = dat.data.jenisproduk;
					                                    					
						$scope.dataSource = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.listDataMaster,
							autoSync: true

						});

				});
			}


			

			$scope.columnJenisProduk = [
						{
							"field": "id",
							"title": "ID"
						},

						{
							"field": "kdjenisproduk",
							"title": "Kode Jenis Produk"
						},

						{
							"field": "jenisproduk",
							"title": "Jenis Produk"
						},

						{
							"field": "kdprofile",
							"title": "Kode Profile",
							"hidden": "true"
						},
						
						{
							"field": "kodeexternal",
							"title": "Kode External",
							"hidden": "true"
						},
						{
							"field": "namaexternal",
							"title": "Nama External",
							"hidden": "true"
						},
						{
							"field": "norec",
							"title": "NoRec",
							"hidden": "true"
						},

						{
							"field": "kelompokproduk",
							"title": "Kelompok Produk"
						},

						{
							"field": "objectaccountfk",
							"title": "Account ID",
							"hidden": "true"
						},
						{
							"field": "namaaccount",
							"title": "Account"
						},
						
						{
							"field": "objectdepartemenfk",
							"title": "Departmen ID",
							"hidden": "true"
						},
						
						{
							"field": "namadepartemen",
							"title": "Departmen"
						},

						{
							"field": "statusenabled",
							"title": "Status Enabled"
						},

						{
							"field": "objectjenisprodukheadfk",
							"title": "Jenis Produk ID",
							"hidden": "true"
						},
						
						{
							"field": "objectkelompokprodukfk",
							"title": "Kelompok Produk ID",
							"hidden": "true"
						},


						// {
						// 	"field": "qjenisproduk",
						// 	"title": "Q Jenis Produk",
						// 	"hidden": "true"
						// },

						// {
						// 	"title" : "Action",
						// 	"width" : "200px",
						// 	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
						// "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
						// }
						{
							"command":
								[
									{
										text: "Enabled", 
										click: enableData, 
										// imageClass: "k-icon k-floppy"
									},
								
									{
										text: "Disable", 
										click: disableData, 
										// imageClass: "k-icon k-delete"	
									}
								],

							title: "",
							width: "200px",
						}
			];


			$scope.mainGridOptions = { 
				 pageable: true,
				 columns: $scope.columnJenisProduk,
				 editable: "popup",
				 selectable: "row",
				 scrollable: false
			 };

			////fungsi klik untuk edit
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.jenisproduk = current.jenisproduk;
				$scope.item.account = {id:current.objectaccountfk,namaaccount:current.namaaccount};
				$scope.item.accountId = current.accountId;
				$scope.item.departemen = {id:current.objectdepartemenfk,namadepartemen:current.namadepartemen};
				$scope.item.departemenid = current.departemenid;
				$scope.item.kdjenisproduk = current.kdjenisproduk;
				$scope.item.jenisprodukhead = current.jenisprodukhead;
				$scope.item.jenisprodukheadid = current.jenisprodukheadid;
				$scope.item.kelompokproduk = {id:current.objectkelompokprodukfk,kelompokproduk:current.kelompokproduk};
				$scope.item.kelompokprodukid = current.kelompokProdukid;
				// $scope.item.qjenisproduk = current.qjenisproduk;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportdisplay = current.reportdisplay;
				$scope.item.kodeexternal = current.kodeexternal;
				$scope.item.namaexternal = current.namaexternal;
				$scope.item.statusenabled = current.statusenabled;
			};


		

			function enableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				

				ManagePhp.getData("jenis-produk/update-status-enabled-jenis-produk?id="+dataItem.id+"&statusenabled=true").then(function(dat){
				 
						toastr.success(dat.data.message);
						init();
				 });
			}

			function disableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				var itemDelete = {
					"id": dataItem.id
				}

				ManagePhp.getData("jenis-produk/update-status-enabled-jenis-produk?id="+dataItem.id+"&statusenabled=false").then(function(dat){
				 toastr.success(dat.data.message);
				  init();
				 });
			}
			
			//// save 
			$scope.simpan = function(){

				var kodeexternal="";
				var namaexternal="";
				var reportdisplay="";
				var objectaccountfk=null;
				var objectdepartemenfk=null;
				var objectjenisprodukheadfk=null;
				var objectkelompokprodukfk=null;
				var kdjenisproduk="";
				var jenisproduk="";
				// var qjenisproduk="";
				var id="";
				
				if ($scope.item.jenisproduk == undefined || $scope.item.jenisproduk=="") {
					alert("Jenis produk harus di isi!")
					return
				}else{
					jenisproduk = $scope.item.jenisproduk
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

				// if ($scope.item.jenisprodukhead.objectjenisprodukheadfk != undefined) {
				// 	objectjenisprodukheadfk=$scope.item.jenisprodukhead.objectjenisprodukheadfk
				// }

				if ($scope.item.kelompokproduk.id != undefined) {
					objectkelompokprodukfk=$scope.item.kelompokproduk.id
				}

				if ($scope.item.kdjenisproduk != undefined) {
					kdjenisproduk=$scope.item.kdjenisproduk
				}

				if ($scope.item.jenisproduk != undefined) {
					jenisproduk=$scope.item.jenisproduk
				}

				if ($scope.item.kodeexternal != undefined) {
					kodeexternal=$scope.item.kodeexternal
				}

				// if ($scope.item.qjenisproduk != undefined) {
				// 	qjenisproduk=$scope.item.qjenisproduk
				// }

				if ($scope.item.id != undefined) {
					id=$scope.item.id
				}

				var data = {
									kodeexternal: kodeexternal,
									namaexternal: namaexternal,
									reportdisplay: reportdisplay,	
									objectaccountfk : objectaccountfk,	
									objectdepartemenfk : objectdepartemenfk,
									// objectjenisprodukheadfk : objectjenisprodukheadfk,	
									objectkelompokprodukfk : objectkelompokprodukfk,	
									kdjenisproduk: kdjenisproduk,
									jenisproduk: jenisproduk,
									// "qjenisproduk": qjenisproduk,
									id: id,
									
					

				}

				var objSave =
					{
						jenisproduk: data

					}
				
					ManagePhp.postData2("jenis-produk/post-data-jenis-produk",objSave).then(function (e) {

						loadData();
						$scope.item = {};
						

					});

			  }


			// 



			
			$scope.cari = function () {
					// $scope.isRouteLoading = true;
					loadData()
			}  

			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

			ManagePhp.getData("jenis-produk/get-data-for-combo-in-form-jenis-produk").then(function(dat){
				$scope.listaccount= dat.data.account;
				$scope.listdepartemen= dat.data.departemen;
				$scope.listkelompokproduk= dat.data.kelompokproduk;
				$scope.listjenisprodukhead= dat.data.jenisprodukhead;
			});

			
			$scope.hapus = function () {
				ManagePhp.getData("jenis-produk/hapus-data-jenis-produk?id="+$scope.item.id).then(function (e) {
				
					
						loadData();
						$scope.item = {};
						

					});
			}


		}
	]);
});