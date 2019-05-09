define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KesanPsikologisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function ($rootScope, $scope, ModelItem, $state) {
            $scope.title = "Kesan Psikologis - Diagnosis";
            $scope.dataVOloaded = true;

            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;

                var items = [];
				if (data.psikologi !== undefined && data.psikologi.kesanPsikologis !== undefined)
                    items = data.psikologi.kesanPsikologis;
				$scope.DaftarKesanPsikologis = new kendo.data.DataSource({
					data: items
				});

                $scope.Selanjutnya = function (model) {
                    var kesanPsikologis = [];
                    for (var i in $scope.DaftarKesanPsikologis._data) {
                        var dataItem = $scope.DaftarKesanPsikologis._data[i];
                        var temp = {};
                        if (dataItem.kesanPsikologis !== undefined || dataItem.keterangan !== undefined) {
                            temp = {
                                kesanPsikologis: { id: dataItem.kesanPsikologis.id },
                                tglRegistrasi: 1469791366435,
                                pasien: { id: "1631" },
                                keterangan: dataItem.keterangan
                            }
                            kesanPsikologis.push(temp);
                        }
                    }
                    if ($scope.item.psikologi === undefined)
                        $scope.item.psikologi = {};
                    $scope.item.psikologi.kesanPsikologis = kesanPsikologis;
                    $scope.item.state = model;
                    ModelItem.set("Psikologi", $scope.item);
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.Psikokonseling');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };

                $scope.columnKesanPsikologis = [{
					"field": "no",
					"title": "No",
					width: "50px"
				}, {
						"field": "kesanPsikologis.name",
						"title": "Kesan Psikologis",
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

                $scope.Back = function () {
                    history.back();
                }

            }, function errorCallBack(err) { });
            $scope.tambah = function () {
				var temp = {
					"no": $scope.DaftarKesanPsikologis._data.length + 1,
					"kesanPsikologis": $scope.item.kesanPsikologis,
					"keterangan": $scope.item.keterangan

				}
				$scope.DaftarKesanPsikologis.add(temp);
				$scope.reset();
			}

			$scope.removeDaftarKesanPsikologis = function (e) {
				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				$scope.temp == $scope.DaftarKesanPsikologis
					.filter(function (el) {
						return el.name !== grid._data[0].name;
					});
				grid.removeRow(row);
			};

			$scope.reset = function () {
					$scope.item.kesanPsikologis = undefined,
					$scope.item.keterangan = undefined
			}
            ModelItem.getDataDummyGeneric("KesanPsikologis", false).then(function (data) {
                $scope.listKesanPsikologis = data;
            })
        }
    ]);
});