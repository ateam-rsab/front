define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('ProfilSensoriCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function ($rootScope, $scope, ModelItem, $state) {
			ModelItem.get("Psikologi").then(function (data) {
				$scope.item = data;
				$scope.title = "Profil Sensori";
				$scope.now = new Date();
				$scope.dateTimePickerOptions = {}

				var items = [];
				if (data.psikologi !== undefined && data.psikologi.profilSensori !== undefined)
                    items = data.psikologi.profilSensori;
				$scope.DaftarProfilSensori = new kendo.data.DataSource({
					data: items
				});

				$scope.Selanjutnya = function (model) {
					$scope.listData = [];
					for (var i in $scope.DaftarProfilSensori._data) {
						var dataGrid = {};
						var dataItem = $scope.DaftarProfilSensori._data[i];
						if (dataItem.sistemProfilSensori !== undefined || dataItem.respon !== undefined || dataItem.keterangan !== undefined) {
							dataGrid = {
								sistemProfilSensori: { id: dataItem.sistemProfilSensori.id },
                                tglRegistrasi: 1469791366435,
                                pasien: { id: "1631" },
								respon: dataItem.respon,
                                keterangan: dataItem.keterangan
							};
							$scope.listData.push(dataGrid);
						}
					}
					if ($scope.item.psikologi === undefined)
                        $scope.item.psikologi = {};
                    $scope.item.psikologi.profilSensori = $scope.listData;
					$scope.item.state = model;
					ModelItem.set("Psikologi", $scope.item);
					$state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.TesPsikologi');
					console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
				};
				$scope.Back = function () {
					history.back();
				}

				$scope.columnProfilSensori = [{
					"field": "no",
					"title": "No",
					width: "50px"
				}, {
						"field": "sistemProfilSensori.name",
						"title": "Sistem",
						width: "200px"
					}, {
						"field": "respon",
						"title": "Respon",
						width: "200px"

					}, {
						"field": "keterangan",
						"title": "Keterangan",
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
					"no": $scope.DaftarProfilSensori._data.length + 1,
					"sistemProfilSensori": $scope.item.sistem,
					"respon": $scope.item.respon,
					"keterangan": $scope.item.keterangan

				}
				$scope.DaftarProfilSensori.add(temp);
				$scope.reset();
			}

			$scope.removeDaftarProfilSensori = function (e) {
				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				$scope.temp == $scope.DaftarProfilSensori
					.filter(function (el) {
						return el.name !== grid._data[0].name;
					});
				grid.removeRow(row);
			};

			$scope.reset = function () {
				$scope.item.respon = undefined,
					$scope.item.sistem = undefined,
					$scope.item.keterangan = undefined
			}

			ModelItem.getDataDummyGeneric("ListSistem", false).then(function (data) {
				$scope.listSistem = data;
			})

		}
	]);
});