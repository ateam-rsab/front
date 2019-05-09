////header nya
define(['initialize'], function(initialize) {

	'use strict';

	initialize.controller('DetailJenisProduk2Ctrl', ['$q', '$rootScope', '$scope', '$state','ManagePhp', 'CacheHelper',
	function($q, $rootScope, $scope,$state,ManagePhp,CacheHelper) {

		$scope.item = {};
		$scope.dataVOloaded = true;
		$scope.now = new Date();
		var init = function () {

			loadData();
		}

		
		init();


		function loadData() {
			var detailjenisproduk = "";
					if ($scope.item.caridetailjenisproduk != undefined) {
						detailjenisproduk = "&detailjenisproduk=" + $scope.item.caridetailjenisproduk;
					}

					
			ManagePhp.getData("detail-jenis-produk/get-data-master-for-form-detail-jenis-produk?"
				+ detailjenisproduk).then(function(dat){

				$scope.listDataMaster = dat.data.detailjenisproduk;
			                                    					
				$scope.dataSource = new kendo.data.DataSource({
				pageSize: 10,
				data: $scope.listDataMaster,
				autoSync: true

				});

			});
		
		}


		$scope.cari = function () {
				// $scope.isRouteLoading = true;
				loadData()
		}  

		///colom tabel
		$scope.columnDetailJenisProduk = [
		{
			"field": "id",
			"title": "Id"
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
			"field": "norec",
			"title": "No Rec",
			"hidden": "true"
		},

		{
			"field": "reportdisplay",
			"title": "Report Display",
			"hidden": "true"
		},

		{
			"field": "objectaccountfk",
			"title": "Account ID",
			"hidden": "true"
		},

		{
			"field": "namaaccount",
			"title": "Account",
			"hidden": "true"
		},

		{
			"field": "objectdepartementfk",
			"title": "Departemen ID",
			"hidden": "true"
		},

		{
			"field": "namadepartemen",
			"title": "Nama Departemen",
			"hidden": "true"
		},

		{
			"field": "objectjenisprodukfk",
			"title": "Jenis Produk ID",
			"hidden": "true"
		},

		{
			"field": "jenisproduk",
			"title": "Jenis Produk",
			"hidden": "true"
		},

		{
			"field": "detailjenisproduk",
			"title": "Detail Jenis Produk"
		},

		{
			"field": "isregistrasiaset",
			"title": "Is Registrasi Aset",
			"hidden": "true"
		},

		{
			"field": "kddetailjenisproduk",
			"title": "Kode Detail Jenis Produk",
			"hidden": "true"
		},

		{
			"field": "qdetailjenisproduk",
			"title": "Q Detail Jenis Produk"
		},

		{
			"field": "persenhargacito",
			"title": "Persen Harga Cito"
		},

		{
			"field": "kodeexternal",
			"title": "Kode External",
			"hidden": "true"
		},

		{
			"field": "namaexternal",
			"title": "Nama External"
		},

		{
			"field": "statusenabled",
			"title": "Status Enabled"
		},

		// {
		// 	"title" : "Action",
		// 	"width" : "200px",
		// 	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
		// 	"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
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
		columns: $scope.columnDetailJenisProduk,
		editable: "popup",
		selectable: "row",
		scrollable: false
	 };

	function enableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				

				ManagePhp.getData("detail-jenis-produk/update-status-enabled-detail-jenis-produk?id="+dataItem.id+"&statusenabled=true").then(function(dat){
				 
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

				ManagePhp.getData("detail-jenis-produk/update-status-enabled-detail-jenis-produk?id="+dataItem.id+"&statusenabled=false").then(function(dat){
				 toastr.success(dat.data.message);
				 init();
				 });
	} 

	

	
	
		$scope.tambah = function () {
			$state.go("DetailJenisProdukEdit")
			CacheHelper.set('CacheFormDetailJenisProduk','')
		}
			

	

		////edit
		$scope.edit = function(){	

		 	CacheHelper.set('CacheFormDetailJenisProduk',$scope.current)
		 	$state.go('DetailJenisProdukEdit');
		}


		$scope.batal = function () {
			$scope.showEdit = false;
			$scope.item = {};
		}

		


		$scope.hapus = function () {
			ManagePhp.getData("detail-jenis-produk/hapus-data-detail-jenis-produk?id="+$scope.item.id).then(function (e) {
			
				if (e.data.status==400){
					toastr.error(e.data.message);
				}else{
					$scope.item = {};
					toastr.success(e.data.message);
					init();
					
				}
					

				});
		}

		////fungsi klik untuk edit
		$scope.klik = function(current){
			

			$scope.current = current;
			$scope.item.id = current.id;
			
		};



		

/////end
}
]);
});