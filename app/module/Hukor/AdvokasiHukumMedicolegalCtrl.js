define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('AdvokasiHukumMedicolegalCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
            $scope.disableNoKasus = true;
            $scope.disableIdUser = true;

			ModelItem.get("Hukor/AdvokasiHukumMedicolegal").then(function (data) {
				$scope.item = data;
				$scope.item.userId = ModelItem.getPegawai().namaLengkap;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			ManageSarpras.getListData("Pegawai&select=id,namaLengkap").then(function (dat) {
				$scope.listPenanggungJawab = dat.data;
			});

			ManageSarpras.getListData("JenisKasusMedicolegal&select=id,jenisKasus").then(function (dat) {
				$scope.listJenisKasus = dat.data;
			});

			$scope.selectTanggal = function () {
				var bulan = $scope.item.tanggalPengajuan.getMonth() + 1;
				var tahun = $scope.item.tanggalPengajuan.getFullYear();
				console.log(tahun);
				ManageSarpras.getOrderList("advokasi-hukum-medicolegal/generate-no-kasus/" + bulan + "/" + tahun).then(function (dat) {
					$scope.item.noKasus = dat.data.data.noKasus;
				});
			}

			$scope.Save = function () {
                var data = {
					"jenisKasus": {
						"id": $scope.item.jenisKasus.id
					},
					"noKasus": $scope.item.noKasus,
					"penanggungJawab": {
						"id": $scope.item.penanggungJawab.id
					},
					"analisaKajian": $scope.item.analisaKajian,
					"hasilKeputusan": $scope.item.hasilKajian,
					"user": {
						"id": ModelItem.getPegawai().id
					},
					"tglKasus": $scope.item.tanggalPengajuan,
					"deskripsiKasus": $scope.item.deskripsiKasus
				}

				debugger;
                ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "advokasi-hukum-medicolegal/save/").then(function (e) {
					debugger;
					console.log(JSON.stringify(e.data));
                    $scope.item.jenisKasus = "";
					 $scope.item.noKasus ="";
						 $scope.item.penanggungJawab = "";
					$scope.item.analisaKajian ="";
					$scope.item.hasilKajian = "";
					$scope.item.tanggalPengajuan = "";
					$scope.item.deskripsiKasus = "";

                });
            }

		}
	]);
});