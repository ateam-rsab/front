define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('Ruangan2Ctrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'CacheHelper',
		function ($q, $rootScope, $scope, $state, manageSarprasPhp, cacheHelper) {
			$scope.item = {};
			var idSeterusnya = 0;

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
				debugger

				var id = "";
				if ($scope.item.idSrc != undefined) {
					id = "&idRuangan=" + $scope.item.idSrc;
				}
				var namaRuangan = "";
				if ($scope.item.namaRuanganSrc != undefined) {
					namaRuangan = "&namaRuangan=" + $scope.item.namaRuanganSrc;
				}
				var idDepartemens = "";
				if ($scope.item.departemen != undefined) {
					idDepartemens = "&idDepartemen=" + $scope.item.departemen.id;
				}
				var kdExternal = "";
				if ($scope.item.kdExternalSrc != undefined) {
					kdExternal = "&kdExternal=" + $scope.item.kdExternalSrc;
				}

				manageSarprasPhp.getDataTableTransaksi("ruangan/get-data-ruangan?"
					+ id
					+ namaRuangan
					+ idDepartemens
					+ kdExternal).then(function (dat) {
						$scope.isRouteLoading = false;
						$scope.listDataMaster = dat.data.ruangan;

						$scope.dataSourceRuangan = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.listDataMaster,
							autoSync: true
							/*schema: {
								  model: {
									id: "asetId",
									fields: {
		
									}   
								}
							}	*/
						});

					});

			}


			$scope.columnRuangan = [

				{
					"field": "id",
					"title": "ID"
				},
				{
					"field": "namaruangan",
					"title": "Nama Ruangan"
				},
				{
					"field": "kodeexternal",
					"title": "Kode External"
				},
				{
					"field": "namadepartemen",
					"title": "Departemen"
				},
				{
					"field": "modulaplikasi",
					"title": "Modul Aplikasi"
				},
				// {
				// 	"field": "jamTutup",
				// 	"title": "jam Tutup"
				// },
				// {
				// 	"field": "departemen",
				// 	"title": "departemen"
				// },
				// {
				// 	"field": "departemenId",
				// 	"title": "departemen Id"
				// },
				// {
				// 	"field": "kelasHead",
				// 	"title": "kelas Head"
				// },
				// {
				// 	"field": "kelasHeadId",
				// 	"title": "kelas Head Id"
				// },
				// {
				// 	"field": "modulAplikasi",
				// 	"title": "modul Aplikasi"
				// },
				// {
				// 	"field": "modulAplikasiId",
				// 	"title": "modul Aplikasi Id"
				// },
				// {
				// 	"field": "pegawaiKepala",
				// 	"title": "pegawai Kepala"
				// },
				// {
				// 	"field": "pegawaiKepalaId",
				// 	"title": "pegawai Kepala Id"
				// },
				// {
				// 	"field": "kdRuangan",
				// 	"title": "kd Ruangan"
				// },
				// {
				// 	"field": "lokasiRuangan",
				// 	"title": "lokasi Ruangan"
				// },
				// {
				// 	"field": "mobilePhone",
				// 	"title": "mobile Phone"
				// },
				// {
				// 	"field": "namaRuangan",
				// 	"title": "nama Ruangan"
				// },
				// {
				// 	"field": "noCounter",
				// 	"title": "no Counter"
				// },
				// {
				// 	"field": "noRuangan",
				// 	"title": "no Ruangan"
				// },
				// {
				// 	"field": "prefixNoAntrian",
				// 	"title": "prefix No Antrian"
				// },
				// {
				// 	"field": "qRuangan",
				// 	"title": "q Ruangan"
				// },
				// {
				// 	"field": "statusViewData",
				// 	"title": "status View Data"
				// },
				// {
				// 	"field": "website",
				// 	"title": "website"
				// },
				// {
				// 	"field": "tanggal",
				// 	"title": "tanggal"
				// },
				// {
				// 	"field": "headRuangan",
				// 	"title": "head Ruangan"
				// },
				// {
				// 	"field": "headRuanganId",
				// 	"title": "head Ruangan Id"
				// },
				// {
				// 	"field": "reportDisplay",
				// 	"title": "report Display"
				// },
				// {
				// 	"field": "kodeExternal",
				// 	"title": "kode External"
				// },
				// {
				// 	"field": "namaExternal",
				// 	"title": "nama External"
				// },
				{
					"field": "statusenabled",
					"title": "Status Enabled"
				},
				{
					"title": "Action",
					"width": "200px",
					"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
						"<button class='btnHapus' ng-click='disableData()'>Disable</button>" 
			
				}
			];

			$scope.tambah = function () {
				$state.go("RuanganEdit")
			}
			$scope.klik = function (current) {
				debugger
				$scope.item.idx = current.id;
			}
			$scope.edit = function () {
				if ($scope.item.idx == undefined) {
					alert("Pilih 1 Data Untuk di edit!!")
				} else {
					$state.go("RuanganEdit",
						{
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
					// debugger;
					init();

				});
			};

			$scope.enableData = function () {
				manageSarprasPhp.getClassMaster("delete-master-table?className=Ruangan&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					// debugger;
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