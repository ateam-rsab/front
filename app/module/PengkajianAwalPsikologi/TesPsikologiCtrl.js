define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('TesPsikologiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','DateHelper',
		function ($rootScope, $scope, ModelItem, $state, dateHelper) {
			ModelItem.get("Psikologi").then(function (data) {
				$scope.item = data;
				$scope.title = "Tes Psikologi";
				$scope.dateTimePickerOptions = {}
				$scope.now = new Date();
				var items = [];
				if (data.psikologi !== undefined && data.psikologi.tesPsikologi !== undefined)
                    items = data.psikologi.tesPsikologi;
				$scope.DaftarTesPsikologi = new kendo.data.DataSource({
					data: items
				});

				$scope.Selanjutnya = function (model) {
					$scope.listData = [];
					for (var i in $scope.DaftarTesPsikologi._data) {
						var dataGrid = {};
						var dataItem = $scope.DaftarTesPsikologi._data[i];
						if (dataItem.tanggal !== undefined || dataItem.jenisTes !== undefined || dataItem.tujuan !== undefined ) {
							dataGrid = {
								tanggal: dataItem.tanggal,
                                jenisTes: dataItem.jenisTes,
                                pasien: {id:"1631"},
								tglRegistrasi: 1469791366435,
                                tujuan:dataItem.tujuan
							};
							$scope.listData.push(dataGrid);
						}
					}
					if ($scope.item.psikologi === undefined)
						$scope.item.psikologi = {};
					$scope.item.psikologi.tesPsikologi = $scope.listData;
					//$scope.item.state = model;
					ModelItem.set("Psikologi", $scope.item);
					$state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.Analisis');
					console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
				};
				$scope.Back = function () {
					history.back();
				}

				$scope.columnTesPsikologi = [{
					"field": "no",
					"title": "No",
					width: "50px"
				}, {
						"field": "tanggal",
						"title": "Tanggal",
						width: "200px"
					}, {
						"field": "jenisTes",
						"title": "Jenis Tes",
						width: "200px"

					}, {
						"field": "tujuan",
						"title": "Tujuan",
						width: "200px"

					}, {
						command: { text: "Hapus", click: $scope.removeDaftarProfilSensori },
						title: "&nbsp;",
						width: "110px"
					}];

				$scope.dataVOloaded = true;

			}, function errorCallBack(err) { });

			$scope.tambah = function () {
				var temp = {
					"no": $scope.DaftarTesPsikologi._data.length + 1,
					"tanggal": dateHelper.getTanggalFormatted($scope.item.tanggal),
					"jenisTes": $scope.item.jenisTes,
					"tujuan": $scope.item.tujuan

				}
				$scope.DaftarTesPsikologi.add(temp);
				$scope.reset();
			}

			$scope.removeDaftarProfilSensori = function (e) {
				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				$scope.temp == $scope.DaftarTesPsikologi
					.filter(function (el) {
						return el.name !== grid._data[0].name;
					});
				grid.removeRow(row);
			};

			$scope.reset = function () {
				$scope.item.tanggal=undefined,
				$scope.item.jenisTes=undefined,
				$scope.item.tujuan=undefined
			}
			
			ModelItem.getDataDummyGeneric("ListSistem", false).then(function (data) {
				$scope.listSistem = data;
			})

		}
	]);
});