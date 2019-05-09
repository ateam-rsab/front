define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ChecklistSanitasiKLDetailCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService','PenerimaanBarangLogistik',
		function($q, $rootScope, $scope,IPSRSService, penerimaanBarangLogistik) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=ChecklistSanitasiKLDetail", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.ChecklistSanitasiKLDetail;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();

			$scope.columnChecklistSanitasiKLDetail = [
				{
					"field": "No",
					"title": "No"
				},
				{
					"field": "sanitasiKesehatanLingkungan",
					"title": "sanitasi Kesehatan Lingkungan"
				},
				{
					"field": "parameterCheckSanitasiDetail",
					"title": "parameter Check Sanitasi Detail"
				},
				{
					"field": "statusYaTidak",
					"title": "status Ya Tidak"
				},
				{
					"field": "keterangan",
					"title": "keterangan"
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
				columns: $scope.columnChecklistSanitasiKLDetail,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.sanitasiKesehatanLingkungan = current.sanitasiKesehatanLingkungan;

	$scope.item.parameterCheckSanitasiDetail = current.parameterCheckSanitasiDetail;

	$scope.item.statusYaTidak = current.statusYaTidak;

	$scope.item.keterangan = current.keterangan;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=ChecklistSanitasiKLDetail&&id="+$scope.item.id

		+"&&statusEnabled=false").then(function(dat){
			init();
		});
	};
	$scope.enableData=function(){
		IPSRSService.getClassMaster("delete-master-table?className=ChecklistSanitasiKLDetail&&id="+$scope.item.id

			+"&&statusEnabled=true").then(function(dat){
				init();

			});
		};
//// save 
$scope.tambah = function()
{
	var data = {
		"class": "ChecklistSanitasiKLDetail",
		"listField": {
			"sanitasiKesehatanLingkungan": $scope.item.sanitasiKesehatanLingkungan,

			"parameterCheckSanitasiDetail": $scope.item.parameterCheckSanitasiDetail,

			"statusYaTidak": $scope.item.statusYaTidak,

			"keterangan": $scope.item.keterangan,
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
////edit
$scope.edit = function()
{	
	var data = {
		"class": "ChecklistSanitasiKLDetail",
		"listField": {
			"sanitasiKesehatanLingkungan": $scope.item.sanitasiKesehatanLingkungan,

			"parameterCheckSanitasiDetail": $scope.item.parameterCheckSanitasiDetail,

			"statusYaTidak": $scope.item.statusYaTidak,

			"keterangan": $scope.item.keterangan,
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


penerimaanBarangLogistik.getNamaProduk("SanitasiKesehatanLingkungan&select=id,namaExternal", true).then(function(dat){
	debugger;
	$scope.listsanitasikesehatanlingkungan= dat.data;
});

// IPSRSService.getFieldListData("SanitasiKesehatanLingkungan&select=id,namaExternal", true).then(function(dat){
// 	debugger;
// 	$scope.listsanitasikesehatanlingkungan= dat.data;
// });
IPSRSService.getFieldListData("ParameterCheckSanitasiDetail&select=id,namaExternal", true).then(function(dat){
	$scope.listparameterchecksanitasidetail= dat.data;
});
IPSRSService.getFieldListData("StatusYaTidak&select=id,name", true).then(function(dat){
	$scope.liststatusyatidak= dat.data;
});
}
]);
});