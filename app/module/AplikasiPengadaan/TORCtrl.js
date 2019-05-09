define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('TORCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'TORService',
		function ($rootScope, $scope, ModelItem, DateHelper, TORService) {
			ModelItem.get("AplikasiPengadaan/TOR").then(function (data) {
				$scope.item = data;
				$scope.titimangsaLabel = DateHelper.getTanggalFormatted(new Date());
				$scope.dataVOloaded = true;
				$scope.item.latarBelakang = "1. Dasar Hukum \n\n\n\n2. Gambaran Umum";
			}, function errorCallBack(err) { });

			TORService.getListJabatan("Jabatan&select=id,namaJabatan").then(
				function (e) {
					$scope.listJabatan = e;
				}
			)

			$scope.Save = function () {
                debugger;
				var data = {
					"strategiPencapaiKeluaran": $scope.item.strategiPencapaiKeluaran,
					"penerimaManfaat": $scope.item.penerimaManfaat,
					"title1": $scope.item.title1,
					"title2": $scope.item.title2,
					"title3": $scope.item.title3,
					"jabatan": {
						"id": $scope.item.jabatan.id
					},
					"biayaYangDikeluarkan": $scope.item.biayaYangDikeluarkan,
					"noRab": $scope.item.noRAB,
					"kurunWaktuPencapaiKeluaran": $scope.item.kurunWaktuPencapaianKeluaran,
					"latarBelakang": $scope.item.latarBelakang

				};
				console.log(JSON.stringify(data));
                TORService.saveTOR(ModelItem.beforePost(data), "tor/save-tor/").then(
					function (e) {
						$scope.item = {};
					});
            };
		}
	]);
});



