define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterProsesCuciCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageLaundry', 'FindLaundry', '$state',
		function ($rootScope, $scope, ModelItem, ManageLaundry, FindLaundry, $state) {
			$scope.item = {};
			$scope.SembunyikanKode = true;

			$scope.init = function () {
				$scope.nomor = 1;
				FindLaundry.getLaundry("proses-cuci/find-all-proses-cuci/").then(function (dat) {
					$scope.sourceMasterProsesCuci = dat.data.data.data;
					$scope.dataSourceMasterProsesCuci = new kendo.data.DataSource({
						data: $scope.sourceMasterProsesCuci,
						pageSize: 10
					})
					for (var i = 0; i < $scope.sourceMasterProsesCuci.length; i++) {
						$scope.sourceMasterProsesCuci[i].no = $scope.nomor++;
					}
				});
			}
			$scope.init();


			$scope.tutup = function () {
				$state.go('home');
			}

			$scope.baru = function () {				
				$scope.item.prosesCuci = "";
				$scope.item.KodeExternal = "";
				$scope.item.NamaEksternal = "";
				$scope.SembunyikanKode = true;
				$scope.SelectedId = undefined;
				toastr.info("Mode Baru : Aktif");
			}

			$scope.columndataMasterProsesCuci =
				[
					{
						"field": "no",
						"title": "<h3 align=center>No.<h3>",
						"width": "40px"
					},
					{
						"field": "kdProsesCuci",
						"title": "<h3 align=center>Kode Proses Cuci</h3>",
						"width": "150px"
					},
					{
						"field": "prosesCuci",
						"title": "<h3 align=center>Proses Cuci</h3>",
						"width": "200px"
					},
					{
						"field": "kodeExternal",
						"title": "<h3 align=center>Kode Eksternal</h3>",
						"width": "150px"
					},
					{
						"field": "namaExternal",
						"title": "<h3 align=center>Nama Eksternal</h3>",
						"width": "200px"
					},
					// {
					// 	"field": "statusEnabled",
					// 	"title": "<h3 align=center>Status Enabled</h3>",
					// 	"width": "150px"
					// }
					{
						"title": "<h3 align=center>Action</h3>",
						"width": "100px",
						"template": "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
					}
				];


			$scope.SelectProsesCuci = function (data) {

				if ($scope.SelectedId == undefined) {
					toastr.info("Mode Edit : Aktif");
				}

				console.log(JSON.stringify(data));
				$scope.item.kodeProsesCuci = data.kdProsesCuci,
					$scope.item.prosesCuci = data.prosesCuci,
					$scope.item.KodeExternal = data.kodeExternal,
					$scope.item.NamaEksternal = data.namaExternal,
					$scope.SelectedId = data.id,
					$scope.SembunyikanKode = false
			};
			ModelItem.get("Laundry/MasterProsesCuci").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			$scope.enableKodeMesin = "true";

			$scope.mainGridOptions = {
				pageable: true,
				sortable: true,
			}

			$scope.disableData = function () {
				this.dataItem;
				var dataFalse = {
					"id": this.dataItem.id,
					"prosesCuci": this.dataItem.prosesCuci,
					"KodeExternal": this.dataItem.kodeExternal,
					"NamaEksternal": this.dataItem.namaExternal,
					"statusEnabled": false
				}
				console.log(JSON.stringify(dataFalse));
				ManageLaundry.saveSarpras(ModelItem.beforePost(dataFalse), "proses-cuci/save-proses-cuci/").then(function (EditData) {
					$scope.item.prosesCuci = "";
					$scope.item.KodeExternal = "";
					$scope.item.NamaEksternal = "";
					$scope.SelectedId = undefined;
					$scope.SembunyikanKode = true;

					FindLaundry.getLaundry("proses-cuci/find-all-proses-cuci/").then(function (CariData) {
						$scope.sourceMasterProsesCuci = CariData.data.data;
					});
					$scope.item.prosesCuci = "";
				});

			}

			$scope.Save = function () {
				var data = {
					"id": $scope.SelectedId,
					"prosesCuci": $scope.item.prosesCuci,
					"kodeExternal": $scope.item.KodeExternal,
					"namaExternal": $scope.item.NamaEksternal,
					// "statusEnabled": aktif
					"statusEnabled": true
				};
				console.log(JSON.stringify(data));
				ManageLaundry.saveSarpras(ModelItem.beforePost(data), "proses-cuci/save-proses-cuci/").then(function (e) {
					$scope.init();
					$scope.SelectedId = undefined;
					$scope.SembunyikanKode = true;
					$scope.item.prosesCuci = "";
					$scope.item.KodeExternal = "";
					$scope.item.NamaEksternal = "";

				});
			};
			$scope.Batal = function () {
				$scope.item.kodeProsesCuci = "",
					$scope.item.prosesCuci = "",
					$scope.item.kodeEksternal = "",
					$scope.item.namaEksternal = "",
					$scope.item.statusEnabled = ""
			};

		}
	]);
});

	// var aktif = false;
	// 		$scope.checkbox = function () {
	// 			if (aktif)
	// 				aktif = "false";

	// 			else
	// 				aktif = "true";

	// 			console.log(aktif);
	// 		}

	// 		console.log($scope.checkbox);

				// $scope.dataMasterMesin = new kendo.data.DataSource({
			// 	data: [
			// 	{ 
			// 		"kodeMesin":"001",
			// 		"noMesin":"No 1",
			// 		"kodeEksternal":"",
			// 		"namaEksternal":"",
			// 		"statusEnabled":"1"
			// 	},
			// 	{ 
			// 		"kodeMesin":"002",
			// 		"noMesin":"No 2",
			// 		"kodeEksternal":"",
			// 		"namaEksternal":"",
			// 		"statusEnabled":"1"
			// 	},
			// 	{ 
			// 		"kodeMesin":"003",
			// 		"noMesin":"No 3",
			// 		"kodeEksternal":"",
			// 		"namaEksternal":"",
			// 		"statusEnabled":"1"
			// 	}
			// 	]
			// });