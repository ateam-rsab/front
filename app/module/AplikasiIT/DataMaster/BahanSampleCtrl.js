////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BahanSampleCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				// IPSRSService.getFieldsMasterTable("get-data-master?className=BahanSample", true).then(function(dat){
				// 	$scope.listDataMaster = dat.data.data.BahanSample;

				// 	$scope.dataSource = new kendo.data.DataSource({
				// 		pageSize: 10,
				// 		data: $scope.listDataMaster,
				// 		autoSync: true

				// 	});

				// });
				 var bahanSampleOb = [];
				 var satuanKecilOb = [];
				 var dataLengkapBahanSample = [];
				 var arrS = {};
				 var satuanKecilS;
				 var nomor = 0;			

				 $q.all([
				 	IPSRSService.getFieldsMasterTable("get-data-master?className=BahanSample", true),  
				 	IPSRSService.getFieldListData("SatuanKecil&select=id,satuanKecil",true)

				 	]).then(function(data) {
				 		bahanSampleOb = data[0].data.data.BahanSample;
				 		satuanKecilOb = data[1].data;
				 		
				 		if (bahanSampleOb != undefined) {
					 		for (var i = 0; i < bahanSampleOb.length; i++) {
					 			nomor += 1

					 			for (var j = 0; j < satuanKecilOb.length; j++) {
					 				if (bahanSampleOb[i].satuanKecilId!=null) {
						 				if (bahanSampleOb[i].satuanKecilId == satuanKecilOb[j].id) {
						 					satuanKecilS = satuanKecilOb[j]
						 					break;
						 				}
						 			} else {
						 				satuanKecilS ="-"
						 			};
					 			}

					 			arrS = {
					 				nomor: nomor,
					 				id: bahanSampleOb[i].id,
					 				statusEnabled: bahanSampleOb[i].statusEnabled,
					 				kodeExternal: bahanSampleOb[i].kodeExternal,
					 				namaExternal: bahanSampleOb[i].namaExternal,
					 				reportDisplay: bahanSampleOb[i].reportDisplay, 
					 				kdBahanSample: bahanSampleOb[i].kdBahanSample,
					 				namaBahanSample: bahanSampleOb[i].namaBahanSample,
					 				satuanKecilOb: satuanKecilS

					 			}
					 			dataLengkapBahanSample.push(arrS)
					 		} 
				 		};

				 		$scope.listsatuanKecil = satuanKecilOb;

				 		$scope.dataSource = new kendo.data.DataSource({
				 			pageSize: 10,
				 			data: dataLengkapBahanSample,
				 			autoSync: true
				 		});
				 	});
			}
			init();


			// IPSRSService.getFieldListData("SatuanKecil&select=id,reportDisplay", true).then(function(dat){
			// 	$scope.listsatuanKecil= dat.data;
			// }); 

			$scope.columnBahanSample = [
				{
					"field": "nomor",
					"title": "No"
				},
				{
					"field": "kdBahanSample",
					"title": "kd Bahan Sample"
				},
				{
					"field": "namaBahanSample",
					"title": "nama Bahan Sample"
				},
				{
					"field": "satuanKecilOb.satuanKecil",
					"title": "satuan Kecil"
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
				columns: $scope.columnBahanSample,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

		////fungsi klik untuk edit
		$scope.klik = function(current){
			$scope.showEdit = true;
			$scope.current = current;
			$scope.item.kdBahanSample = current.kdBahanSample;
			//$scope.item.satuanKecil = current.satuanKecil;
			
			$scope.item.namaBahanSample = current.namaBahanSample;
			$scope.item.qBahanSample = current.qBahanSample;
			$scope.item.id = current.id;
			$scope.item.noRec = current.noRec;
			$scope.item.reportDisplay = current.reportDisplay;
			$scope.item.kodeExternal = current.kodeExternal;
			$scope.item.namaExternal = current.namaExternal;
			$scope.item.statusEnabled = current.statusEnabled;
			$scope.item.satuanKecil = $scope.satuanKecilOb;

			// for (var x=0;x<  $scope.listsatuanKecil.length ;x++){
			// 	if ($scope.listsatuanKecil[x].id === current.satuanKecilId){
			// 		$scope.item.satuanKecil = $scope.listsatuanKecil[x];
			// 		return;
			// 	}
			// }
		};

		$scope.disableData=function(){
			IPSRSService.getClassMaster("delete-master-table?className=BahanSample&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
				init();
			});
		};
		$scope.enableData=function(){
			IPSRSService.getClassMaster("delete-master-table?className=BahanSample&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
				init();

			});
		};

		$scope.tambah = function()
		{
			var data = {
				"class": "BahanSample",
				"listField": {
					"kdBahanSample": $scope.item.kdBahanSample,
					"satuanKecil": $scope.item.satuanKecil,
					
					"namaBahanSample": $scope.item.namaBahanSample,
					"qBahanSample": $scope.item.qBahanSample,
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
				"class": "BahanSample",
				"listField": {
					"kdBahanSample": $scope.item.kdBahanSample,
					"satuanKecil": $scope.item.satuanKecil,
					
					"namaBahanSample": $scope.item.namaBahanSample,
					"qBahanSample": $scope.item.qBahanSample,
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