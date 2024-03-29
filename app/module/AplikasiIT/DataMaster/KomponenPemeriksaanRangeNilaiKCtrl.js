////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenPemeriksaanRangeNilaiKCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaanRangeNilaiK", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaanRangeNilaiK;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKomponenPemeriksaanRangeNilaiK = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisKelamin",
				"title": "jenis Kelamin"
			},
			{
				"field": "jenisKelaminId",
				"title": "jenis Kelamin Id"
			},
			{
				"field": "kelompokUmur",
				"title": "kelompok Umur"
			},
			{
				"field": "kelompokUmurId",
				"title": "kelompok Umur Id"
			},
			{
				"field": "komponenPeriksa",
				"title": "komponen Periksa"
			},
			{
				"field": "komponenPeriksaId",
				"title": "komponen Periksa Id"
			},
			{
				"field": "metodePeriksa",
				"title": "metode Periksa"
			},
			{
				"field": "metodePeriksaId",
				"title": "metode Periksa Id"
			},
			{
				"field": "keteranganRangeNilai",
				"title": "keterangan Range Nilai"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
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
				columns: $scope.columnKomponenPemeriksaanRangeNilaiK,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.jenisKelamin = current.jenisKelamin;
	
	$scope.item.kelompokUmur = current.kelompokUmur;
	
	$scope.item.komponenPeriksa = current.komponenPeriksa;
	
	$scope.item.metodePeriksa = current.metodePeriksa;
	
	$scope.item.keteranganRangeNilai = current.keteranganRangeNilai;
	$scope.item.noUrut = current.noUrut;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilaiK&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilaiK&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KomponenPemeriksaanRangeNilaiK",
		"listField": {
			"jenisKelamin": $scope.item.jenisKelamin,
		
			"kelompokUmur": $scope.item.kelompokUmur,
		
			"komponenPeriksa": $scope.item.komponenPeriksa,
		
			"metodePeriksa": $scope.item.metodePeriksa,
		
			"keteranganRangeNilai": $scope.item.keteranganRangeNilai,
			"noUrut": $scope.item.noUrut,
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
		"class": "KomponenPemeriksaanRangeNilaiK",
		"listField": {
			"jenisKelamin": $scope.item.jenisKelamin,
		
			"kelompokUmur": $scope.item.kelompokUmur,
		
			"komponenPeriksa": $scope.item.komponenPeriksa,
			
			"metodePeriksa": $scope.item.metodePeriksa,
		
			"keteranganRangeNilai": $scope.item.keteranganRangeNilai,
			"noUrut": $scope.item.noUrut,
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
IPSRSService.getFieldListData("JenisKelamin&select=id,namaExternal", true).then(function(dat){
	$scope.listjenisKelamin= dat.data;
});
IPSRSService.getFieldListData("KelompokUmur&select=id,namaExternal", true).then(function(dat){
	$scope.listkelompokUmur= dat.data;
});
IPSRSService.getFieldListData("KomponenPemeriksaan&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenPeriksa= dat.data;
});
IPSRSService.getFieldListData("MetodePemeriksaanPenunjang&select=id,namaExternal", true).then(function(dat){
	$scope.listmetodePeriksa= dat.data;
});
}
]);
});