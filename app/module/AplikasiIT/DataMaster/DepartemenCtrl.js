define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DepartemenCtrl', ['$q', '$rootScope', '$scope', '$state', 'IPSRSService',
		function ($q, $rootScope, $scope, $state, IPSRSService) {
			$scope.item = {};

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
				},
				{
					"title": "<h3>#</h3>",
					"width": "200px",
					"template": "<div class='grid_6'><md-button class='md-raised md-primary' ng-click='enableData()'>Enable</md-button></div>" +
						"<div class='grid_6'><md-button class='md-raised md-warn ' ng-click='enableData()'>Disable</md-button></div>"
				}
			];

			let getDataMasterDept = () => {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Departemen", true).then(function (dat) {
					for (let i = 0; i < dat.data.data.Departemen.length; i++) {
						dat.data.data.Departemen[i].no = i + 1;
					}
					$scope.listDataMaster = dat.data.data.Departemen;


					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster
					});
				});
			}

			$scope.init = function () {
				IPSRSService.getFieldListData("JenisPerawatan&select=id,namaExternal", true).then(function (dat) {
					$scope.listjenisPerawatan = dat.data;
				});

				IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function (dat) {
					$scope.listpegawaiKepala = dat.data;
				});

				$scope.mainGridOptions = {
					pageable: true,
					scrollable: true,
					columns: $scope.columnGrid
				};

				getDataMasterDept();
			}

			$scope.init();

			$scope.klik = function (current) {
				$scope.showEdit = true;
				$scope.dataSelected = current;

				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.alamatEmail = current.alamatEmail;
				$scope.item.faksimile = current.faksimile;
				$scope.item.fixedPhone = current.fixedPhone;
				$scope.item.kdDepartemen = current.kdDepartemen;
				$scope.item.jenisPerawatan = current.jenisPerawatan;
				$scope.item.jenisPerawatanId = current.jenisPerawatanId;
				$scope.item.pegawaiKepala = current.pegawaiKepala;
				$scope.item.pegawaiKepalaId = current.pegawaiKepalaId;
				$scope.item.mobilePhone = current.mobilePhone;
				$scope.item.namaDepartemen = current.namaDepartemen;
				$scope.item.prefixNoAntrian = current.prefixNoAntrian;
				$scope.item.qDepartemen = current.qDepartemen;
				$scope.item.website = current.website;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;

			};

			$scope.tambah = function () {
				var data = {
					"class": "Departemen",
					"listField": {
						"alamatEmail": $scope.item.alamatEmail,
						"faksimile": $scope.item.faksimile,
						"fixedPhone": $scope.item.fixedPhone,
						"kdDepartemen": $scope.item.kdDepartemen,
						"jenisPerawatan": $scope.item.jenisPerawatan,
						"pegawaiKepala": $scope.item.pegawaiKepala,
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
					console.log(JSON.stringify(e.data));
					getDataMasterDept();
					$scope.item = {};
				});
			}

			$scope.edit = function () {
				var data = {
					"class": "Departemen",
					"listField": {
						"id": $scope.item.id,
						"alamatEmail": $scope.item.alamatEmail,
						"faksimile": $scope.item.faksimile,
						"fixedPhone": $scope.item.fixedPhone,
						"kdDepartemen": $scope.item.kdDepartemen,
						"jenisPerawatan": $scope.item.jenisPerawatan,
						"pegawaiKepala": $scope.item.pegawaiKepala,
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
				IPSRSService.saveDataMaster(data, "update-master-table").then(function (e) {
					console.log(JSON.stringify(e.data));
					getDataMasterDept();
				});
			}
			$scope.batal = function () {
				$scope.showEdit = false;

				$scope.item = {};
			}

			$scope.disableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=Departemen&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
					getDataMasterDept();

				});
			};

			$scope.enableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=Departemen&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					getDataMasterDept();
				});
			};
		}
	]);
});