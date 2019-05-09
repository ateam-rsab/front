define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('SettingDataFixed2Ctrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$http', 'CacheHelper','$mdDialog',
		function ($q, $rootScope, $scope, $state, manageSarprasPhp, modelItem, $http, cacheHelper,$mdDialog) {
			// $scope.isRouteLoading=false;
			$scope.dataVOloaded = true;
			$scope.dataSelected = {};
			$scope.item = {};
			LoadData();


			$scope.cariFilter = function () {
				$scope.isRouteLoading = true;
				LoadData()
			}
			$scope.clearSearch = function () {
				$scope.ClearSearch();
			}

			//fungsi clear kriteria search
			$scope.ClearSearch = function () {
				$scope.item = {};
				loadData()
			}

			function LoadData() {
				var idSetting = "";
				if ($scope.item.idfixed != undefined) {
					idSetting = "&idDataFixed=" + $scope.item.idfixed;
				}
				var ketFungsi = "";
				if ($scope.item.ketFungsi != undefined) {
					ketFungsi = "&ketFungsi=" + $scope.item.ketFungsi;
				}
				var namaFild = "";
				if ($scope.item.namaFild != undefined) {
					namaFild = "&namaFild=" + $scope.item.namaFild;
				}
				

				cacheHelper.set('RekananCtrl2');
				manageSarprasPhp.getDataTableTransaksi("settingdatafixed/get-settingdatafixed?"
					+ idSetting
					+ ketFungsi
					+ namaFild).then(function (data) {
						$scope.isRouteLoading = false;
						$scope.dataSourceDataFixed = new kendo.data.DataSource({
							data: data.data.settingdatafixed,
							pageSize: 10,
							total: data.length,
							serverPaging: false,
							schema: {
								model: {
									fields: {
									}
								}
							}
						});
					})
			}

			$scope.columnDataFixed = [
				{
					"field": "id",
					"title": "Id",
					"width": "100px",
				},
				{
					"field": "keteranganfungsi",
					"title": "Keterangan Fungsi",
					"width": "100px",

				},
				{
					"field": "namafield",
					"title": "Nama Field",
					"width": "300px",
				},
				{
					"field": "nilaifield",
					"title": "Nilai",
					"width": "150px",
				},
				{
					"field": "tabelrelasi",
					"title": "Tabel Relasi",
					"width": "180px",
				},
				{
					"field": "typefield",
					"title": "Type Field",
					"width": "80px",
				},
				// {
				// 	"title": "Action",
				// 	"width": "120px",
				// 	"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
				// 		"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				// }
			];

			$scope.click = function (dataPasienSelected) {
				

			};

		
			$scope.edit = function () {
				if ($scope.dataPasienSelected == undefined) {
					alert("Pilih 1 Data Untuk di edit!!")
				} else {
					$state.go("SettingDataFixedEdit",
						{
							idx: $scope.dataPasienSelected.id
						})
				}
			}
			$scope.hapus = function () {
				if ($scope.dataPasienSelected == undefined) {
					alert("Pilih 1 Data Untuk di Hapus!!")
				} else {				
					var data = {
					"iddatafixed": $scope.dataPasienSelected.id,
					
					}
					manageSarprasPhp.postHapusDataFixed(data).then(function (e) {
						//  console.log(JSON.stringify(e.rekanan));
					LoadData()
					});
				}
			}
		
			$scope.tambah = function () {
				$state.go("SettingDataFixedEdit",)
			}

		
		}
	]);
});
