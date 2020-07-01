define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('Ruangan2Ctrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'CacheHelper',
		function ($q, $rootScope, $scope, $state, manageSarprasPhp, cacheHelper) {
			$scope.item = {};

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.isRouteLoading = true;

			manageSarprasPhp.getDataTableTransaksi("ruangan/get-data-combo", false).then(function (data) {
				$scope.listDepartemen = data.data.departemen;
			})
			loadData()

			$scope.cariFilter = function () {
				$scope.isRouteLoading = true;
				loadData()
			}
			$scope.clearSearch = function () {
				$scope.ClearSearch();
			}

			//fungsi clear kriteria search
			$scope.ClearSearch = function () {
				$scope.item = {};
				loadData();
			}

			function loadData() {
				manageSarprasPhp.getDataTableTransaksi("ruangan/get-data-ruangan?idRuangan=" + ($scope.item.idSrc ? $scope.item.idSrc : "") + "&namaRuangan=" + ($scope.item.namaRuanganSrc ? $scope.item.namaRuanganSrc : "") + "&idDepartemen=" + ($scope.item.departemen ? $scope.item.departemen.id : "") + "&kdExternal=" + ($scope.item.kdExternalSrc ? $scope.item.kdExternalSrc : "")).then(function (dat) {
					$scope.isRouteLoading = false;
					$scope.listDataMaster = dat.data.ruangan;

					$scope.dataSourceRuangan = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true
					});

				});
			}


			$scope.columnRuangan = [

				{
					"field": "id",
					"title": "<h3>ID</h3>"
				},
				{
					"field": "namaruangan",
					"title": "<h3>Nama Ruangan</h3>"
				},
				{
					"field": "kodeexternal",
					"title": "<h3>Kode External</h3>"
				},
				{
					"field": "namadepartemen",
					"title": "<h3>Departemen</h3>"
				},
				{
					"field": "modulaplikasi",
					"title": "<h3>Modul Aplikasi</h3>"
				},
				{
					"field": "statusenabled",
					"title": "<h3>Status Enabled</h3>"
				},
				{
					// "title": "Action",
					"width": "200px",
					"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
						"<button class='btnHapus' ng-click='disableData()'>Disable</button>"

				}
			];

			$scope.tambah = function () {
				$state.go("RuanganEdit")
			}
			$scope.klik = function (current) {

				$scope.item.idx = current.id;
			}
			$scope.edit = function () {
				if ($scope.item.idx == undefined) {
					alert("Pilih 1 Data Untuk di edit!!")
				} else {
					$state.go("RuanganEdit", {
						idx: $scope.item.idx
					})
				}
			}

			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnRuangan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			$scope.disableData = function () {
				manageSarprasPhp.getClassMaster("delete-master-table?className=Ruangan&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
					init();

				});
			};

			$scope.enableData = function () {
				manageSarprasPhp.getClassMaster("delete-master-table?className=Ruangan&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					init();

				});
			};

			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

		}
	]);
});