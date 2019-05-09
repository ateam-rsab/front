define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RisikoRuanganKerjaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', 'RisikoRuanganKerjaService',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, r, RisikoRuanganKerjaService) {

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.enableKdRuangan = true;

			$scope.daftarRuangan = new kendo.data.DataSource({
				data: [
					{
						"kode": "10101010",
						"nama": "Poliklinik Anak",
						"resiko": "Ringan"
					},
					{

						"kode": "10202020",
						"nama": "Poliklinik Dahlia",
						"resiko": "Sedang"
					},
					{

						"kode": "10303030",
						"nama": "Poliklinik",
						"resiko": "Tinggi"
					}
				]
			});
			$scope.columnRuangan = [
				{
					"field": "ruangan.kdRuangan",
					"title": "Kode Ruangan",
					"width": "150px"
				}, {
					"field": "ruangan.namaRuangan",
					"title": "Nama Ruangan",
					"width": "300px"
				}, {
					"field": "statusRisikoKerja.name",
					"title": "Risiko Kerja",
					"width": "200px"
				}];


			$scope.onChange = function (data) {
                $scope.selected = data;
                console.log($scope.selected.id);
                // console.log(moment($scope.selected.joinDate).format("DD-MM-YYYY"));
            };

			ModelItem.get("K3/RisikoRuanganKerja").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			RisikoRuanganKerjaService.getListRisikoKerja("StatusRisikoKerja&select=id,name").then(
				function (e) {
					$scope.listRisikoKerja = e;
				}
			)

			RisikoRuanganKerjaService.getListRuangan("Ruangan&select=id,namaRuangan").then(
				function (e) {
					$scope.listRuangan = e;
				}
			)

			RisikoRuanganKerjaService.findAllResikoKerja("risiko-kerja-ruangan/find-all/").then(function (dat) {
				$scope.daftarRuangan = dat.data.data;
				console.log($scope.daftarRuangan);
			});

			$scope.Save = function () {
                // debugger;
				var data = {
					"ruangan": {
						"id": "" + $scope.item.ruangan.id
					},
					"statusRisikoKerja": {
						"id": $scope.item.risikoKerja.id
					}
				};
				console.log($scope.item.ruangan.id)
				console.log(JSON.stringify(data));
                RisikoRuanganKerjaService.saveRisikoRuanganKerja(ModelItem.beforePost(data), "risiko-kerja-ruangan/save-risiko-kerja-ruangan/").then(
					function () {
						$scope.item = {};						
						RisikoRuanganKerjaService.findAllResikoKerja("risiko-kerja-ruangan/find-all/").then(function (dat) {
							$scope.daftarRuangan = dat.data.data;
							console.log($scope.daftarRuangan);
						});
						$scope.item.ruangan.id = "";
						$scope.item.risikoKerja = "";
						$scope.item.namaRuangan = "";
					}	

				);

            };

			$scope.Delete = function () {
                // debugger;
				var data = $scope.selected.id;

				console.log(data);
                RisikoRuanganKerjaService.deleteRisikoRuanganKerja("risiko-kerja-ruangan/delete-risiko-kerja-ruangan?id=" + data).then(
					function (e) {
						console.log(e.data);
						$scope.item = {};
						RisikoRuanganKerjaService.findAllResikoKerja("risiko-kerja-ruangan/find-all/").then(function (dat) {
							$scope.daftarRuangan = dat.data.data;
							console.log($scope.daftarRuangan);
						});
					});
            };
		}
	]);
});