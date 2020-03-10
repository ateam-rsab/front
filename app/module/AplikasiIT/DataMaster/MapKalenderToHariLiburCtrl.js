define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MapKalenderToHariLiburCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'ManageSdmNew',
		function ($q, $rootScope, $scope, IPSRSService, ManageSdmNew) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			var init = function () {
				ManageSdmNew.getListData("sdm/get-mapping-hari-libur?tahun=" + moment($scope.now).format('YYYY'), true).then(function (dat) {
					$scope.listDataMaster = dat.data.data;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true
					});
				});
			}

			init();

			$scope.columnMapKalenderToHariLibur = [
				{
					"field": "tanggalId",
					"title": "Tanggal"
				},
				{
					"field": "kodeExternal",
					"title": "Kode"
				},
				{
					"field": "namaExternal",
					"title": "nama External"
				},
				{
					command: [
						{ text: "Hapus", click: disableData }
					],
					title: "Action",
					width: "200px"
				}
			];

			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnMapKalenderToHariLibur,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function (current) {
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.hariLibur = current.hariLibur;
				$scope.item.hariLiburId = current.hariLiburId;
				$scope.item.tanggal = current.tanggal;
				$scope.item.tanggalId = current.tanggalId;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};

			function disableData(e) {
				e.preventDefault();

				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return
				}
				IPSRSService.getClassMaster("delete-master-table?className=MapKalenderToHariLibur&&id=" + dataItem.id + "&&statusEnabled=false").then(function (dat) {
					init();

				});
			}

			$scope.tambah = function () {
				var idTgl = 0;
				var tglStr = moment($scope.item.tanggal).format('YYYY-MM-DD');
				ManageSdmNew.getListData("sdm/get-id-kalender?tanggal=" + tglStr).then(function (e) {
					idTgl = e.data.data[0].idKalender;
					var data = {
						"class": "MapKalenderToHariLibur",
						"listField": {
							"hariLibur": $scope.item.hariLibur,

							"tanggal": {
								"id": idTgl
							},

							"id": $scope.item.id,
							"reportDisplay": $scope.item.reportDisplay,
							"kodeExternal": $scope.item.kodeExternal,
							"namaExternal": $scope.item.namaExternal,
						}
					}
					IPSRSService.saveDataMaster(data, "save-master-table").then(function (e) {
						// console.log(JSON.stringify(e.data));
						init();
						$scope.item = {};
					});
				})
			}

			$scope.edit = function () {
				var data = {
					"class": "MapKalenderToHariLibur",
					"listField": {
						"hariLibur": $scope.item.hariLibur,

						"tanggal": $scope.item.tanggal,

						"id": $scope.item.id,
						"noRec": $scope.item.noRec,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
						"statusEnabled": $scope.item.statusEnabled
					}
				}
				IPSRSService.saveDataMaster(data, "update-master-table").then(function (e) {
					// console.log(JSON.stringify(e.data));
					init();
				});
			}

			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

			IPSRSService.getFieldListData("HariLibur&select=id,namaHariLibur", true).then(function (dat) {
				$scope.listharilibur = dat.data;
			});

			IPSRSService.getFieldListData("Kalender&select=id,tanggal", true).then(function (dat) {
				$scope.listtanggal = dat.data;
			});
		}
	]);
});