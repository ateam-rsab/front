 define(['initialize'], function(initialize) {
 	'use strict';
 	initialize.controller('AlatKesehatanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 		function($q, $rootScope, $scope,IPSRSService) {
 			$scope.item = {};
 			$scope.dataVOloaded = true;
 			$scope.now = new Date();
 			var init = function () {
 				
				 var alatKesehatanOb = [];
				 var departemen = [];
				 var jenisAlkesOb = [];
				 var dataLengkapalAtKesehatan = [];
				 var arrS = {};
				 var departemenS;
				 var jenisAlkesObPS;
				 var nomor = 0;

				 $q.all([
				 	
				 	IPSRSService.getFieldsMasterTable("get-data-master?className=AlatKesehatan", true),  
				 	IPSRSService.getFieldListData("Departemen&select=id,namaDepartemen"),
				 	IPSRSService.getFieldListData("JenisAlatKesehatan&select=id,jenisAlkes", true)

				 	]).then(function(data) {
				 		alatKesehatanOb = data[0].data.data.AlatKesehatan;
				 		departemen = data[1].data;
				 		jenisAlkesOb = data[2].data;

				 			

				 		if (alatKesehatanOb != undefined) {
					 		for (var i = 0; i < alatKesehatanOb.length; i++) {
					 			nomor += 1
					 			for (var j = 0; j < departemen.length; j++) {
					 				if (alatKesehatanOb[i].departemenId == departemen[j].id) {
					 					departemenS = departemen[j]
					 					break;
					 				}
					 			}

					 			for (var k = 0; k < jenisAlkesOb.length; k++) {
					 				if (alatKesehatanOb[i].jenisAlkesId == jenisAlkesOb[k].id) {
					 					jenisAlkesObPS = jenisAlkesOb[k]
					 					break;
					 				}
					 			}

					 			arrS = {
					 				nomor: nomor,
					 				id: alatKesehatanOb[i].id,
					 				statusEnabled: alatKesehatanOb[i].statusEnabled,
					 				kodeExternal: alatKesehatanOb[i].kodeExternal,
					 				namaExternal: alatKesehatanOb[i].namaExternal,
					 				reportDisplay: alatKesehatanOb[i].reportDisplay, 
					 				kdAlkes: alatKesehatanOb[i].kdAlkes,
					 				namaAlkes: alatKesehatanOb[i].namaAlkes,
					 				nomorAlamatAlkes: alatKesehatanOb[i].nomorAlamatAlkes,
					 				departemen: departemenS, 
					 				jenisAlkesOb:  jenisAlkesObPS
					 			}
					 			dataLengkapalAtKesehatan.push(arrS)
					 		} 

				 		};


				 		$scope.listdepartemen = departemen;
				 		$scope.listjenisalkes = jenisAlkesOb;

				 						 		
				 		$scope.dataSource = new kendo.data.DataSource({
				 			pageSize: 10,
				 			data: dataLengkapalAtKesehatan,
				 			autoSync: true

				 		});

				 	}); 
				}
				
				init();



			$scope.columnAlatKesehatan = [
				{
					"field": "nomor",
					"title": "No"
				},
				{
					"field": "kdAlkes",
					"title": "kd Alkes"
				},
				{
					"field": "departemen.namaDepartemen",
					"title": "departemen"
				},
				{
					"field": "jenisAlkesOb.jenisAlkes",
					"title": "jenis Alkes"
				},
				{
					"field": "namaAlkes",
					"title": "nama Alkes"
				},
				{
					"field": "nomorAlamatAlkes",
					"title": "nomor Alamat Alkes"
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
				columns: $scope.columnAlatKesehatan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.kdAlkes = current.kdAlkes;
				$scope.item.departemen = current.departemen;                                   
				
				$scope.item.jenisAlkes = current.jenisAlkesOb;
				
				$scope.item.namaAlkes = current.namaAlkes;
				$scope.item.nomorAlamatAlkes = current.nomorAlamatAlkes;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};

			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=AlatKesehatan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					init();
				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=AlatKesehatan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					init();

				});
			};


			$scope.tambah = function()
			{
				var data = {
					"class": "AlatKesehatan",
					"listField": {
						"kdAlkes": $scope.item.kdAlkes,
						"departemen": $scope.item.departemen,
						
						"jenisAlkes": $scope.item.jenisAlkes,
						
						"namaAlkes": $scope.item.namaAlkes,
						"nomorAlamatAlkes": $scope.item.nomorAlamatAlkes,
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
					"class": "AlatKesehatan",
					"listField": {
						"kdAlkes": $scope.item.kdAlkes,
						"departemen": $scope.item.departemen.id,
						
						"jenisAlkes": $scope.item.jenisAlkes.id,
						
						"namaAlkes": $scope.item.namaAlkes,
						"nomorAlamatAlkes": $scope.item.nomorAlamatAlkes,
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
	// IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	// 	$scope.listdepartemen= dat.data;
	// });

	// IPSRSService.getFieldListData("JenisAlatKesehatan&select=id,jenisAlkes", true).then(function(dat){
	// 	$scope.listjenisalkes= dat.data;
	// });
		}
	]);
});////header nya
 