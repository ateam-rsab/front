define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RekananCtrl2', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$http', 'CacheHelper','$mdDialog',
		function ($q, $rootScope, $scope, $state, manageSarprasPhp, modelItem, $http, cacheHelper,$mdDialog) {
			// $scope.isRouteLoading=false;
			$scope.dataVOloaded = true;
			$scope.dataSelected = {};
			$scope.item = {};
			LoadData();
			$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));

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
				var tempkdRekanan = "";
				if ($scope.item.kdrekanan != undefined) {
					tempkdRekanan = "&kdrekanan=" + $scope.item.kdrekanan;
				}
				var tempIdRekanan = "";
				if ($scope.item.idRekanan != undefined) {
					tempIdRekanan = "&id=" + $scope.item.idRekanan;
				}
				var tempnamarekanan = "";
				if ($scope.item.namarekanan != undefined) {
					tempnamarekanan = "&namarekanan=" + $scope.item.namarekanan;
				}
				var tempkodeexternal = "";
				if ($scope.item.kodeexternal != undefined) {
					tempkodeexternal = "&kodeexternal=" + $scope.item.kodeexternal;
				}
				var tempjenisrekanan = "";
				if ($scope.item.jenisrekanan != undefined) {
					tempjenisrekanan = "&objectjenisrekananfk=" + $scope.item.jenisrekanan.id;
				}

				cacheHelper.set('RekananCtrl2');
				manageSarprasPhp.getDataTableTransaksi("master/get-data-rekanan?"
					+ tempkdRekanan
					+ tempnamarekanan
					+ tempkodeexternal
					+ tempIdRekanan
				+tempjenisrekanan).then(function (data) {
						$scope.isRouteLoading = false;
						$scope.dataSourceRekanan = new kendo.data.DataSource({
							data: data.data.rekanan,
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

			$scope.click = function (dataPasienSelected) {
				var data = dataPasienSelected;

			};

			$scope.klik = function (current) {
				debugger
				$scope.item.idx = current.id;
				$scope.item.id = current.id;
			}
			$scope.edit = function () {
				if ($scope.item.idx == undefined) {
					alert("Pilih 1 Data Untuk di edit!!")
				} else {
					$state.go("RekananEdit",
						{
							idx: $scope.item.idx
						})
				}
			}


			$scope.disableData = function () {
				// aset/updaterekanan-statusenabled
				manageSarprasPhp.getDataTableTransaksi("rekanan/updaterekanan-statusenabled?idrekanan="+$scope.item.id+"&statusenabled=" + "false", true).then(function(data) {
					LoadData();
				});
				// manageSarprasPhp.getDataTableTransaksi("delete-master-table?className=Rekanan&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
				// 	init();
				// });
			};
			$scope.enableData = function () {
				manageSarprasPhp.getDataTableTransaksi("rekanan/updaterekanan-statusenabled?idrekanan="+$scope.item.id+"&statusenabled=" + "true", true).then(function(data) {
					LoadData();
				});
				// manageSarprasPhp.getDataTableMaster("delete-master-table?className=Rekanan&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
				// 	init();

				// });
			};
		manageSarprasPhp.getDataTableTransaksi("ruangan/get-data-combo", false).then(function (data) {
				$scope.listPegawai = data.data.pegawai;
				$scope.listModulAplikasi = data.data.modulaplikasi;
				$scope.listjenisrekanan = data.data.jenisrekanan;
			})

		
			$scope.tambah = function () {
				$state.go("RekananEdit")
			}

			$scope.columnRekanan = [
				{
					"field": "id",
					"title": "Id",
					"width": "100px",
				},
				{
					"field": "namarekanan",
					"title": "Nama Rekanan",
					"width": "300px",

				},
				{
					"field": "kdrekanan",
					"title": "Kode Rekanan",
					"width": "100px",
				},
				{
					"field": "jenisrekanan",
					"title": "Detail Jenis Rekanan",
					"width": "150px",
				},
				{
					"field": "statusenabled",
					"title": "Status Enabled",
					"width": "80px",
				},
				{
					"title": "Action",
					"width": "120px",
					"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
						"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				}
			];
			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
		}
	]);
});
