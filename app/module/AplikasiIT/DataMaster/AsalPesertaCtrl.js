define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AsalPesertaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				 var asalPesertaOb = [];
				 var departemen = [];
				 var dataLengkapAsalPeserta = [];
				 var arrS = {};
				 var departemenS;
				 var nomor = 0;

				 $q.all([
				 	IPSRSService.getFieldsMasterTable("get-data-master?className=AsalPeserta", true),  
				 	IPSRSService.getFieldListData("Departemen&select=id,namaDepartemen")

				 	]).then(function(data) {
				 		asalPesertaOb = data[0].data.data.AsalPeserta;
				 		departemen = data[1].data;

				 		if (asalPesertaOb != undefined) {
					 		for (var i = 0; i < asalPesertaOb.length; i++) {
					 			nomor += 1

					 			for (var j = 0; j < departemen.length; j++) {
					 				if (asalPesertaOb[i].departemenId!=null) {
						 				if (asalPesertaOb[i].departemenId == departemen[j].id) {
						 					departemenS = departemen[j]
						 					break;
						 				}
						 			} else {
						 				departemenS ="-"
						 			};
					 			}


					 			arrS = {
					 				nomor: nomor,
					 				id: asalPesertaOb[i].id,
					 				statusEnabled: asalPesertaOb[i].statusEnabled,
					 				kodeExternal: asalPesertaOb[i].kodeExternal,
					 				namaExternal: asalPesertaOb[i].namaExternal,
					 				reportDisplay: asalPesertaOb[i].reportDisplay, 
					 				kdAsalPeserta: asalPesertaOb[i].kdAsalPeserta,
					 				asalPeserta: asalPesertaOb[i].asalPeserta,
					 				departemen: departemenS 

					 			}
					 			dataLengkapAsalPeserta.push(arrS)
					 		} 

				 		};

				 		$scope.listdepartemen = departemen;

				 		$scope.dataSource = new kendo.data.DataSource({
				 			pageSize: 10,
				 			data: dataLengkapAsalPeserta,
				 			autoSync: true
				 		});
				 	}); 
			}

			init();

			$scope.columnAsalPeserta = [
			{
				"field": "nomor",
				"title": "No"
			},
			{
				"field": "kdAsalPeserta",
				"title": "kd Asal Peserta"
			},

			{
				"field": "asalPeserta",
				"title": "asal Peserta"
			},
			{
				"field": "departemen.namaDepartemen",
				"title": "departemen"
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
				columns: $scope.columnAsalPeserta,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function(current){
				debugger;
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.asalPeserta = current.asalPeserta;
				$scope.item.kdAsalPeserta = current.kdAsalPeserta;
				if (current.departemen!="-") {
					$scope.item.departemen = current.departemen;
				}else{

					$scope.item.departemen={};
				};
				

				$scope.item.qAsalPeserta = current.qAsalPeserta;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};

			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=AsalPeserta&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					init();
				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=AsalPeserta&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					init();

				});
			};

			//Simpan ke tabel
			$scope.tambah = function()
			{
				var data = {
					"class": "AsalPeserta",
					"listField": {
						"asalPeserta": $scope.item.asalPeserta,
						"kdAsalPeserta": $scope.item.kdAsalPeserta,
						"departemen": $scope.item.departemen,
						"qAsalPeserta": $scope.item.qAsalPeserta,
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
					"class": "AsalPeserta",
					"listField": {
						"asalPeserta": $scope.item.asalPeserta,
						"kdAsalPeserta": $scope.item.kdAsalPeserta,
						"departemen": $scope.item.departemen,
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
		}
	]);
});