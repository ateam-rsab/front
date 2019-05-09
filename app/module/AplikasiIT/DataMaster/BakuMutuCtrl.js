define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BakuMutuCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=BakuMutu", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.BakuMutu;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();


			$scope.columnBakuMutu = [
				{
					"field": "No",
					"title": "No"
				},
				{
					"field": "kdBakuMutu",
					"title": "kd Baku Mutu"
				},
				{
					"field": "namaBakuMutu",
					"title": "nama Baku Mutu"
				},
				{
					"field": "satuanStandar",
					"title": "satuan Standar"
				},
				{
					"field": "jenisBakuMutu",
					"title": "jenis Baku Mutu"
				},
				{
					"field": "bakuMutu",
					"title": "baku Mutu"
				},
				{
					"field": "kadarMaksimum",
					"title": "kadar Maksimum"
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
				columns: $scope.columnBakuMutu,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.kdBakuMutu = current.kdBakuMutu;
				$scope.item.namaBakuMutu = current.namaBakuMutu;
				$scope.item.satuanStandar = current.satuanStandar;

				$scope.item.jenisBakuMutu = current.jenisBakuMutu;

				$scope.item.kadarMaksimum = current.kadarMaksimum;
				$scope.item.bakuMutu = current.bakuMutu;

				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=BakuMutu&&id="+$scope.item.id+"&&statusEnabled=false").then

				(function(dat){
					init();
				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=BakuMutu&&id="+$scope.item.id+"&&statusEnabled=true").then

				(function(dat){
					init();

				});
			};

			//// save 
			$scope.tambah = function()
			{
				var data = {
					"class": "BakuMutu",
					"listField": {
						"kdBakuMutu": $scope.item.kdBakuMutu,
						"namaBakuMutu": $scope.item.namaBakuMutu,
						"satuanStandar": $scope.item.satuanStandar,

						"jenisBakuMutu": $scope.item.jenisBakuMutu,

						"kadarMaksimum": $scope.item.kadarMaksimum,
						"bakuMutu": $scope.item.bakuMutu,

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
					"class": "BakuMutu",
					"listField": {
						"kdBakuMutu": $scope.item.kdBakuMutu,
						"namaBakuMutu": $scope.item.namaBakuMutu,
						"satuanStandar": $scope.item.satuanStandar,

						"jenisBakuMutu": $scope.item.jenisBakuMutu,

						"kadarMaksimum": $scope.item.kadarMaksimum,
						"bakuMutu": $scope.item.bakuMutu,

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

			IPSRSService.getFieldListData("SatuanStandar&select=id,satuanStandar", true).then(function(dat){
				$scope.listsatuanstandar= dat.data;
			});

			IPSRSService.getFieldListData("JenisBakuMutu&select=id,jenisBakuMutu", true).then(function(dat){
				$scope.listjenisbakumutu= dat.data;
			});

			IPSRSService.getFieldListData("BakuMutu&select=id,namaBakuMutu", true).then(function(dat){
				$scope.listbakumutu= dat.data;
			});
		}
	]);
});
