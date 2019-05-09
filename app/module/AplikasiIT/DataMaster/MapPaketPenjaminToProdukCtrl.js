define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapPaketPenjaminToProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MapPaketPenjaminToProduk", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MapPaketPenjaminToProduk;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();


			$scope.columnMapPaketPenjaminToProduk = [
				{
					"field": "No",
					"title": "No"
				},
				{
					"field": "kdGolonganAsuransi",
					"title": "kd Golongan Asuransi"
				},
				{
					"field": "golonganAsuransiId",
					"title": "golongan Asuransi Id"
				},
				{
					"field": "hubunganPeserta",
					"title": "hubungan Peserta"
				},
				{
					"field": "hubunganPesertaId",
					"title": "hubungan Peserta Id"
				},
				{
					"field": "kelompokPasien",
					"title": "kelompok Pasien"
				},
				{
					"field": "kelompokPasienId",
					"title": "kelompok Pasien Id"
				},
				{
					"field": "paket",
					"title": "paket"
				},
				{
					"field": "paketId",
					"title": "paket Id"
				},
				{
					"field": "kdPenjaminPasien",
					"title": "kd Penjamin Pasien"
				},
				{
					"field": "produk",
					"title": "produk"
				},
				{
					"field": "produkId",
					"title": "produk Id"
				},
				{
					"field": "qtyMaxProduk",
					"title": "qty Max Produk"
				},
				{
					"field": "id",
					"title": "id"
				},
				{
					"field": "reportDisplay",
					"title": "report Display"
				},
				{
					"field": "kodeExternal",
					"title": "kode External"
				},
				{
					"field": "namaExternal",
					"title": "nama External"
				},
				{
					"field": "statusEnabled",
					"title": "status Enabled"
				},

				{
					"title" : "Action",
					"width" : "200px",
					"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
					"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				}
			];


			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnMapPaketPenjaminToProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.kdGolonganAsuransi = current.kdGolonganAsuransi;
				$scope.item.golonganAsuransiId = current.golonganAsuransiId;
				$scope.item.hubunganPeserta = current.hubunganPeserta;
				$scope.item.hubunganPesertaId = current.hubunganPesertaId;
				$scope.item.kelompokPasien = current.kelompokPasien;
				$scope.item.kelompokPasienId = current.kelompokPasienId;
				$scope.item.paket = current.paket;
				$scope.item.paketId = current.paketId;
				$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
				$scope.item.produk = current.produk;
				$scope.item.produkId = current.produkId;
				$scope.item.qtyMaxProduk = current.qtyMaxProduk;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};

	$scope.disableData=function(){
		IPSRSService.getClassMaster("delete-master-table?className=MapPaketPenjaminToProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
			init();
		});
	};

$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MapPaketPenjaminToProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "MapPaketPenjaminToProduk",
		"listField": {
			"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

			"hubunganPeserta": $scope.item.hubunganPeserta,

			"kelompokPasien": $scope.item.kelompokPasien,

			"paket": $scope.item.paket,

			"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
			"produk": $scope.item.produk,

			"qtyMaxProduk": $scope.item.qtyMaxProduk,
			"id": $scope.item.id,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		init();
		$scope.item = {};
	});
}

$scope.edit = function()
{	
	var data = {
		"class": "MapPaketPenjaminToProduk",
		"listField": {
			"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

			"hubunganPeserta": $scope.item.hubunganPeserta,

			"kelompokPasien": $scope.item.kelompokPasien,

			"paket": $scope.item.paket,

			"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
			"produk": $scope.item.produk,

			"qtyMaxProduk": $scope.item.qtyMaxProduk,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		init();
	});
}

$scope.batal = function () {
	$scope.showEdit = false;
	$scope.item = {};
}

IPSRSService.getFieldListData("GolonganAsuransi&select=id,namaExternal", true).then(function(dat){
		$scope.listGolonganAsuransi= dat.data;
	});

IPSRSService.getFieldListData("HubunganPesertaAsuransi&select=id,namaExternal", true).then(function(dat){
		$scope.listHubunganPeserta= dat.data;
	});

IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
		$scope.listKelompokPasien= dat.data;
	});

IPSRSService.getFieldListData("Paket&select=id,namaPaket", true).then(function(dat){
		$scope.listPaket= dat.data;
	});

IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
		$scope.listProduk= dat.data;
	});
}
]);
});
