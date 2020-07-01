define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterDepartemenITCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'CacheHelper',
		function ($q, $rootScope, $scope, $state, ManageSarprasPhp, cacheHelper) {
			$scope.item = {};

			$scope.init = function () {
				let cookie = document.cookie.split(';')[1];
				let token = cookie.split('=');
				ManageSarprasPhp.getDataMaster("get-data-master?className=Departemen&X-AUTH-TOKEN=" + token[1]).then(function (dat) {
					for (let i = 0; i < dat.data.data.Departemen.length; i++) {
						dat.data.data.Departemen[i].no = i + 1;
					}
					// $scope.listDataMaster = dat.data.data.Departemen;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: dat.data.data.Departemen
					});
				});

				ManageSarprasPhp.getDataMaster("get-data-master?className=JenisPerawatan&X-AUTH-TOKEN=" + token[1]).then(function (dat) {
					$scope.listjenisPerawatan = dat.data.data.JenisPerawatan;
				});

				ManageSarprasPhp.getDataMaster("get-data-master?className=Pegawai&X-AUTH-TOKEN=" + token[1]).then(function (dat) {
					$scope.listKepalaDepartemen = dat.data.data.Pegawai;
				});
			}

			$scope.init();

			$scope.mainGridOptions = {
				toolbar: [{
						text: "export",
						name: "Export detail",
						template: '<button ng-click="showModalTambahBaru()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Departemen</button>'
					}

				],
				pageable: true,
				scrollable: true,
				columns: $scope.columnGrid
			};

			$scope.columnGrid = [{
					"field": "no",
					"title": "<h3>No</h3>",
					"width": "50px"
				},
				{
					"field": "kdDepartemen",
					"title": "<h3>Kode Departemen</h3>",
					"width": "200px"
				},
				{
					"field": "kodeExternal",
					"title": "<h3>Kode External</h3>",
					"width": "200px"
				},
				{
					"field": "namaDepartemen",
					"title": "<h3>Nama Departemen</h3>",
					"width": "200px"
				},
				{
					"field": "namaExternal",
					"title": "<h3>Nama External</h3>",
					"width": "200px"
				},
				{
					"field": "reportDisplay",
					"title": "<h3>Report Display</h3>",
					"width": "200px"
				},
				{
					"field": "statusEnabled",
					"title": "<h3>Status Enabled</h3>",
					"width": "100px"
				}
			];

			$scope.showModalTambahBaru = () => {
				$scope.popUpTambahBaru.open().center();
			};

			$scope.simpanDepartemen = () => {
				var data = {
					"class": "Departemen",
					"listField": {
						"alamatEmail": $scope.item.alamatEmail,
						"faksimile": $scope.item.faksimile,
						"fixedPhone": $scope.item.fixedPhone,
						"kdDepartemen": $scope.item.kdDepartemen,
						"jenisPerawatan": $scope.item.jenisPerawatan ? $scope.item.jenisPerawatan.id : "",
						"pegawaiKepala": $scope.item.kepalaDepartemen ? $scope.item.kepalaDepartemen.id : "",
						"mobilePhone": $scope.item.mobilePhone,
						"namaDepartemen": $scope.item.namaDepartemen,
						"prefixNoAntrian": $scope.item.prefixNoAntrian,
						"qDepartemen": $scope.item.qDepartemen,
						"website": $scope.item.website,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal
					}
				}

				IPSRSService.saveDataMaster(data, "save-master-table").then(function (e) {
					// console.log(JSON.stringify(e.data));
					$scope.init();
					$scope.item = {};
				});
			}

			$scope.closePopup = () => {
				$scope.popUpTambahBaru().close();
			}
		}
	]);
});