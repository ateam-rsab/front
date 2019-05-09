define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ObservasiIGDCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManagePasien', '$state', 'FindPasien','DateHelper',
        function ($rootScope, $scope, ModelItem, managePasien, $state, findPasien,dateHelper) {
			$scope.title = "Observasi IGD";
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.no = 1;
			$scope.showGridData = true;
			$scope.item = {};

			ModelItem.get("Sample/ObservasiIGD").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			ModelItem.getDataDummyGeneric("DataNamaObat", false).then(function (data) {
				$scope.listNamaObat = data;
			});

			ModelItem.getDataDummyGeneric("DataCaraPemberian", false).then(function (data) {
				$scope.listCaraPemberian = data;
			});

			$scope.dataObservasiIGD = new kendo.data.DataSource({
				data: []
			});


			$scope.columnObservasiIGD = [{
				"field": "no",
				"title": "No",
				"width": "50px"
			}, {
					"field": "namaObat.name",
					"title": "Nama Obat",

				}, {
					"field": "caraPemberian.name",
					"title": "Cara Pemberian",

				}, {
					"field": "dosis",
					"title": "Dosis",
					"width": "150px"

				}, {
					"field": "frekuensi",
					"title": "Frekuensi",
					"width": "150px"
				}];

			$scope.addDataObservasi = function () {

				var tempDataObservasi = {
					"no": $scope.no++,
					"namaObat": $scope.item.namaObat,
					"caraPemberian": $scope.item.caraPemberian,
					"dosis": $scope.item.dosis,
					"frekuensi": $scope.item.frekuensi
				}

				$scope.dataObservasiIGD.add(tempDataObservasi);
				$scope.clearField();
			};

			$scope.clearField = function () {
				$scope.item.namaObat = null,
					$scope.item.caraPemberian = null,
					$scope.item.dosis = null,
					$scope.item.frekuensi = null
			}

			$scope.Save = function (model) {
                debugger
				$scope.noCm = $state.params.noCm;
				findPasien.getByNoCM($scope.noCM).then(function (data) {
					debugger
					$scope.item.pelayanan={};
					$scope.pasien = data.data.data.id;
					var pelayanan = [];
					for (var i in $scope.dataObservasiIGD._data) {
						var dataItem = $scope.dataObservasiIGD._data[i];
						var temp = {};
						if (dataItem.namaObat !== undefined || dataItem.caraPemberian !== undefined || dataItem.frekuensi !== undefined) {
							temp = {
								obat: { id: dataItem.namaObat.id },
								caraPemberianObat: { id: dataItem.caraPemberian.id },
								dosis: dataItem.dosis,
								frekuensi: dataItem.frekuensi,
								tglRegistrasi : dateHelper.formatDate(new Date,"YYYY-MM-DD"),
      							pasien:{"id":$scope.pasien}
							}
							pelayanan.push(temp);
						}
					}
					$scope.item.pelayanan.observasiIGD = pelayanan;
					$scope.item.pelayanan.noRec="";
					console.log(JSON.stringify(ModelItem.beforePost($scope.item.pelayanan)));
					managePasien.saveObservasiIGD(ModelItem.beforePost($scope.item.pelayanan))
					.then(function () {
						debugger
					}, function (err) {
						debugger
					});
				}, function (err) {
						debugger
					});
            };
        }
    ]);
});
