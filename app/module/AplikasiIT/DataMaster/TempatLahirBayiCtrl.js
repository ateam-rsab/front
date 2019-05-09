////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TempatLahirBayiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=TempatLahirBayi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.TempatLahirBayi;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnTempatLahirBayi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdTempatLahirBayi",
				"title": "kd Tempat Lahir Bayi"
			},
			{
				"field": "qTempatLahirBayi",
				"title": "q Tempat Lahir Bayi"
			},
			{
				"field": "namaTempatLahirBayi",
				"title": "nama Tempat Lahir Bayi"
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
				columns: $scope.columnTempatLahirBayi,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.kdTempatLahirBayi = current.kdTempatLahirBayi;
	$scope.item.qTempatLahirBayi = current.qTempatLahirBayi;
	$scope.item.namaTempatLahirBayi = current.namaTempatLahirBayi;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=TempatLahirBayi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=TempatLahirBayi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "TempatLahirBayi",
		"listField": {
			"kdTempatLahirBayi": $scope.item.kdTempatLahirBayi,
			"qTempatLahirBayi": $scope.item.qTempatLahirBayi,
			"namaTempatLahirBayi": $scope.item.namaTempatLahirBayi,
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
		"class": "TempatLahirBayi",
		"listField": {
			"kdTempatLahirBayi": $scope.item.kdTempatLahirBayi,
			"qTempatLahirBayi": $scope.item.qTempatLahirBayi,
			"namaTempatLahirBayi": $scope.item.namaTempatLahirBayi,
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