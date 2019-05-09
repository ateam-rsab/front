////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisInfeksiNosokomialCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisInfeksiNosokomial", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisInfeksiNosokomial;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnJenisInfeksiNosokomial = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisInfeksiNosokomial",
				"title": "jenis Infeksi Nosokomial"
			},
			{
				"field": "kdJenisInfeksiNosokomial",
				"title": "kd Jenis Infeksi Nosokomial"
			},
			{
				"field": "qJenisInfeksiNosokomial",
				"title": "q Jenis Infeksi Nosokomial"
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
				columns: $scope.columnJenisInfeksiNosokomial,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.jenisInfeksiNosokomial = current.jenisInfeksiNosokomial;
	$scope.item.kdJenisInfeksiNosokomial = current.kdJenisInfeksiNosokomial;
	$scope.item.qJenisInfeksiNosokomial = current.qJenisInfeksiNosokomial;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=JenisInfeksiNosokomial&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=JenisInfeksiNosokomial&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "JenisInfeksiNosokomial",
		"listField": {
			"jenisInfeksiNosokomial": $scope.item.jenisInfeksiNosokomial,
			"kdJenisInfeksiNosokomial": $scope.item.kdJenisInfeksiNosokomial,
			"qJenisInfeksiNosokomial": $scope.item.qJenisInfeksiNosokomial,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal
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
		"class": "JenisInfeksiNosokomial",
		"listField": {
			"jenisInfeksiNosokomial": $scope.item.jenisInfeksiNosokomial,
			"kdJenisInfeksiNosokomial": $scope.item.kdJenisInfeksiNosokomial,
			"qJenisInfeksiNosokomial": $scope.item.qJenisInfeksiNosokomial,
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
}
]);
});