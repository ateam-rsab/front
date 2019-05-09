define(['initialize'], function(initialize) {
	
		'use strict';
		initialize.controller('KelompokProdukCtrl', ['$q', '$rootScope', '$scope', 'ManageSarprasPhp',
	 	function($q, $rootScope, $scope,manageSarprasPhp) {
			 	$scope.item = {};
			 	$scope.dataVOloaded = true;
			 	$scope.now = new Date();

			 	init();


				function init() {
					manageSarprasPhp.getDataTableTransaksi("kelompok-produk/get-data-combo-kelompok-produk", true).then(function(dat){
					$scope.listdepartemen = dat.data.departemen;
					$scope.listjenistransaksi = dat.data.jenistransaksi;
																		
					});
				

					loadData();
				}



		$scope.simpan = function () {

				var id = "";
				var kdKelompokProduk = "";
				var kelompokProduk = "";
				var qKelompokProduk = "";
				
				var objectdepartemenfk=null
				
				var objectjenistransaksifk=null

				var isHavingPrice = "";
				var isHavingStok = "";
				var reportDisplay = "";
				var kodeExternal = "";
				var namaExternal = "";
				
				var kdprofil="";
				var status="";
				var noRec="";

				if ($scope.item.kelompokProduk == undefined || $scope.item.kelompokProduk=="") {
					alert("Kelompok produk harus di isi!")
					return
				}else{
					kelompokProduk=	$scope.item.kelompokProduk
				}
				
				if ($scope.item.id != undefined) {
					id=$scope.item.id
				}

				if ($scope.item.qKelompokProduk != undefined) {
					qKelompokProduk=$scope.item.qKelompokProduk
				}

		
				if ($scope.item.departemen != undefined) {
					objectdepartemenfk = $scope.item.departemen.id
				}
				
				if ($scope.item.jenisTransaksi != undefined) {
					objectjenistransaksifk = $scope.item.jenisTransaksi.id
				}

				if ($scope.item.isHavingPrice != undefined) {
					isHavingPrice = $scope.item.isHavingPrice
				}

				if ($scope.item.isHavingStok != undefined) {
					isHavingStok = $scope.item.isHavingStok
				}

				if ($scope.item.reportDisplay != undefined) {
					reportDisplay = $scope.item.reportDisplay
				}
				
				if ($scope.item.namaExternal != undefined) {
					namaExternal = $scope.item.namaExternal
				}
				
				if ($scope.item.kodeExternal != undefined) {
					kodeExternal = $scope.item.kodeExternal
				}
				
				
				var kelompokproduk = {
						id : id,
						kdkelompokproduk : kdKelompokProduk,
						kelompokproduk : kelompokProduk,
						qkelompokproduk : qKelompokProduk,
						objectdepartemenfk : objectdepartemenfk,
						objectjenistransaksifk : objectjenistransaksifk,
						ishavingprice : isHavingPrice,
						ishavingstok : isHavingStok,
						reportdisplay : reportDisplay,
						kodeexternal : kodeExternal,
						namaexternal : namaExternal,
						kdprofil : kdprofil,
						status : status,
						noRec : noRec,
					
				}


				var objSave =
					{
						kelompokproduk: kelompokproduk

					}
				
					manageSarprasPhp.saveDataTransaksi("kelompok-produk/post-data-kelompok-produk",objSave).then(function (e) {

						loadData();
						$scope.item = {};
						

					});
				

			}


			$scope.columnKelompokProduk = [
				{
					"field": "id",
					"title": "ID"
				},

				{
					"field": "kelompokproduk",
					"title": "kelompok Produk"
				},

				{
					"field": "qkelompokproduk",
					"title": "Q Kelompok Produk",
					"hidden": "true"
				},

				{
					"field": "namadepartemen",
					"title": "Nama Departemen"
				},

				{
					"field": "jenistransaksi",
					"title": "Jenis Transaksi"
				},

				{
					"field": "ishavingprice",
					"title": "is Having Price",
					"hidden": "true"
				},

				{
					"field": "ishavingstok",
					"title": "is Having Stok",
					"hidden": "true"
				},

				{
					"field": "departemenid",
					"title": "departemen Id",
					"hidden": "true"
				},

				{
					"field": "jenisTransaksiid",
					"title": "jenis Transaksi Id",
					"hidden": "true"
				},


				{
					"field": "reportdisplay",
					"title": "report Display",
					"hidden": "true"
				},

				{
					"field": "kodeexternal",
					"title": "kode External",
					"hidden": "true"
				},
				{
					"field": "namaexternal",
					"title": "nama External",
					"hidden": "true"
				},

				{
					"field": "statusenabled",
					"title": "status Enabled"
				},

				
				{
					"command":
						[
							{
								text: "Enabled", 
								click: enableData, 
								// imageClass: "k-icon k-delete"
							},
						
							{
								text: "Disable", 
								click: disableData, 
								// imageClass: "k-icon k-floppy"	
							}
						],

					title: "",
					width: "200px",
				}

			];

			function enableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				

				manageSarprasPhp.getDataTableTransaksi("kelompok-produk/update-status-enabled-kelompok-produk?id="+dataItem.id+"&statusenabled=true").then(function(dat){
				 
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

				manageSarprasPhp.getDataTableTransaksi("kelompok-produk/update-status-enabled-kelompok-produk?id="+dataItem.id+"&statusenabled=false").then(function(dat){
				 toastr.success(dat.data.message);
				 init();
				 });
			}


			$scope.mainGridOptions = { 
				 pageable: true,
				 columns: $scope.columnKelompokProduk,
				 editable: "popup",
				 selectable: "row",
				 scrollable: false,

			 };


			// ////fungsi klik untuk edit
			 $scope.klik = function(current){
					$scope.showEdit = true;
					$scope.current = current;
					$scope.item.isHavingPrice = current.ishavingprice;
					$scope.item.isHavingStok = current.ishavingstok;
					$scope.item.departemen = {id:current.objectdepartemenfk,namaexternal:current.namadepartemen};
					$scope.item.jenisTransaksi = {id:current.objectjenistransaksifk,jenistransaksi:current.jenistransaksi};
					$scope.item.jenisTransaksiId = current.jenistransaksiid;
					$scope.item.kdKelompokProduk = current.kdkelompokproduk;//
					$scope.item.kelompokProduk = current.kelompokproduk;
					$scope.item.qKelompokProduk = current.qKelompokProduk;
					$scope.item.id = current.id;
					$scope.item.noRec = current.noRec;
					$scope.item.reportDisplay = current.reportdisplay;
					$scope.item.kodeExternal = current.kodeexternal;
					$scope.item.namaExternal = current.namaexternal;
					$scope.item.statusEnabled = current.statusEnabled;
			};

			$scope.disableData=function(){
				manageSarprasPhp.getDataTableTransaksi("kelompok-produk/update-status-enabled-kelompok-produk?id="+$scope.item.id+"&statusenabled=false").then(function(dat){
				 init();
				 });
			 };

			$scope.enableData=function(){
			 	manageSarprasPhp.getDataTableTransaksi("kelompok-produk/update-status-enabled-kelompok-produk?id="+$scope.item.id+"&statusenabled=true").then(function(dat){
				init();

				});
			};


			$scope.radioIsHavingStok=[
	                {"id":1,"nama":"Ya "},{"id":2,"nama":"Tidak "}]

			$scope.radioIsHavingPrice=[
	                {"id":1,"nama":"Ya"},{"id":2,"nama":"Tidak"}]

			$scope.cari = function () {
					// $scope.isRouteLoading = true;
					loadData()
			}   


			function loadData() {
							// debugger

					var kelompokProduk = "";
					if ($scope.item.cariKelompokProduk != undefined) {
						kelompokProduk = "&kelompokproduk=" + $scope.item.cariKelompokProduk;
					}

					manageSarprasPhp.getDataTableTransaksi("kelompok-produk/get-data-kelompok-produk?" 
							+ kelompokProduk
							
							).then(function (dat) {

									$scope.isRouteLoading = false;
									

									$scope.dataSource = new kendo.data.DataSource({
										pageSize: 10,
										data:dat.data.kelompokproduk,
										autoSync: true
										/*schema: {
											  model: {
												id: "asetId",
												fields: {
					
												}   
											}
										}	*/
									});

								});
							

							

			}


			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

			$scope.hapus = function () {
				manageSarprasPhp.hapusDataTransaksi("kelompok-produk/hapus-data-kelompok-produk?id="+$scope.item.id).then(function (e) {
				
					
						loadData();
						$scope.item = {};
						

					});
			}


}
]);
});
