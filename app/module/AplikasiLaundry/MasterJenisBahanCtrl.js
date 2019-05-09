define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJenisBahanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'FindLaundry', 'ManageSarpras', 'ManageLaundry',
		function ($rootScope, $scope, ModelItem, DateHelper, $state, FindLaundry, ManageSarpras, ManageLaundry) {
			$scope.item = {};
			$scope.daftarJenisBahan = new kendo.data.DataSource({
				data: []
			});
			$scope.SembunyiKodeJenisBahan = true;

			$scope.InitMasterBahan = function () {
				$scope.number = 1;
				FindLaundry.getLaundry("jenis-bahan/get-jenis-bahan/").then(function (dat) {
					$scope.sourceMasterJenisBahan = dat.data.data;
					$scope.dataSourceMasterJenisBahan = new kendo.data.DataSource({
						data: $scope.sourceMasterJenisBahan,
						pageSize: 10,
					})
					for (var i = 0; i < $scope.sourceMasterJenisBahan.length; i++) {
						$scope.sourceMasterJenisBahan[i].no = $scope.number++
					}
				});
			}
			$scope.InitMasterBahan();


			$scope.Kl = function (currentData) {
				debugger
				$scope.Induks = currentData.id;
				$scope.AllData = currentData;
				$scope.item.KodeExternal = currentData.kodeExternal;
				$scope.item.NamaEksternal = currentData.namaExternal;
				$scope.item.JenisBahan = currentData.jenisBahan;
			}



			$scope.SelectJenisBahan = function (data) {
				console.log(JSON.stringify(data));
				$scope.item.kodeJenisBahan = data.kodeJenis;
				$scope.item.JenisBahan = data.JenisBahan;
				$scope.item.KodeExternal = data.kodeEksternal;
				$scope.item.NamaEksternal = data.namaEksternal;
			}

			$scope.mainGridOptions = {
				pageable: true,
				sortable: true,
			}

			$scope.tutup = function () {
				$state.go('home');
			}

			$scope.baru = function () {
				$scope.item.kodeJenisBahan = "";
				$scope.item.JenisBahan = "";
				$scope.item.KodeExternal = "";
				$scope.item.NamaEksternal = "";
			}


			$scope.columnJenisBahan = [
				{
					"field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "40px",

				},
				{
					"field": "kdJenisBahan",
					"title": "<h3 align=center>Kode Jenis Bahan</h3>",
					"width": "100px"
				}, {
					"field": "jenisBahan",
					"title": "<h3 align=center>Jenis Bahan</h3>",
					"width": "200px"
				}, {
					"field": "kodeExternal",
					"title": "<h3 align=center>Kode Eksternal</h3>",
					"width": "150px"
				}, {
					"field": "namaExternal",
					"title": "<h3 align=center>Nama Eksternal</h3>",
					"width": "200px"
				},
				{
					"title": "<h3 align=center>Action</h3>",
					"width": "100px",
					"template": "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				}
			];

			$scope.disableData = function () {
				debugger
				var data = {
					"Id": this.dataItem.id,
					"namaExternal": this.dataItem.namaExternal,
					"jenisBahan": this.dataItem.jenisBahan,
					"kodeExternal": this.dataItem.kodeExternal,
					"statusEnabled": "false"
				}
				ManageLaundry.saveLaundry(ModelItem.beforePost(data), "jenis-bahan/save-jenis-bahan/").then(function (e) {
					$scope.SembunyikanKode = true;
					$scope.selectedid = undefined;					
					$scope.InitMasterBahan();
				});
			}

			$scope.Save = function () {
				debugger
				var data = {
					"Id": $scope.Induks,
					"namaExternal": $scope.item.NamaEksternal,
					"jenisBahan": $scope.item.JenisBahan,
					"kodeExternal": $scope.item.KodeExternal,
					"statusEnabled": "true"
				}
				ManageLaundry.saveLaundry(ModelItem.beforePost(data), "jenis-bahan/save-jenis-bahan/").then(function (e) {
					$scope.SembunyikanKode = true;
					$scope.selectedid = undefined;
					$scope.InitMasterBahan();
				});
			}



			ModelItem.get("Laundry/MasterJenisBahan").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			ModelItem.getDataDummyGeneric("Laundry/MasterJenisBahan/JenisBahan", true).then(function (data) {
				$scope.ListJenisBahan = data;
			})
			$scope.enableKodeJenisBahan = "true";
		}
	]);
});


/*// @Source Data Old Data ====================================================================
	    
	    // {
		// 	"field": "statusEnabled",
		// 	"title": "<h3 align=center>Status Enabled</h3>",
		// 	"width": "200px"
		// }
		$scope.daftarJenisBahan = new kendo.data.DataSource({
				data: [
				{ 
					"kodeJenis":"BHN001",
					"JenisBahan":"Aldet",
					"kodeEksternal":"100",
					"namaEksternal":"TES",
					"statusEnabled":"1"
				},
				{ 
					"kodeJenis":"BHN002",
					"JenisBahan":"Laudet",
					"kodeEksternal":"",
					"namaEksternal":"",
					"statusEnabled":"1"
				},
				{ 
					"kodeJenis":"BHN003",
					"JenisBahan":"MC. Bleach",
					"kodeEksternal":"",
					"namaEksternal":"",
					"statusEnabled":"1"
				},
				{ 
					"kodeJenis":"BHN004",
					"JenisBahan":"OXO. Bleach",
					"kodeEksternal":"",
					"namaEksternal":"",
					"statusEnabled":"1"
				},
				{ 
					"kodeJenis":"BHN005",
					"JenisBahan":"E. 951",
					"kodeEksternal":"",
					"namaEksternal":"",
					"statusEnabled":"1"
				},
				{ 
					"kodeJenis":"BHN006",
					"JenisBahan":"M. Saur",
					"kodeEksternal":"",
					"namaEksternal":"",
					"statusEnabled":"1"
				},
				{ 
					"kodeJenis":"BHN007",
					"JenisBahan":"M. Soft",
					"kodeEksternal":"",
					"namaEksternal":"",
					"statusEnabled":"1"
				}

				]
			});
// .*/