define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatKehamilanCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper',
		function($rootScope, $scope, ModelItem,DateHelper) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("NewForm/RiwayatKehamilan").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
				$scope.listJenisKelamin = data;
			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/YaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
			})
			$scope.dataRiwayatKehamilan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnRiwayatKehamilan = [{
				"field": "anakKe",
				"title": "Anak Ke",
				width: "50px",
			},
			{
				"field": "jenisKelamin",
				"title": "Jenis Kelamin",
				width: "100px"
			},
			{
				"field": "tglLahir",
				"title": "Tanggal Lahir",
				width: "100px"
			},
			{
				"field": "menyusuiEkslusif",
				"title": "Menyusui Ekslusif",
				width: "150px"
			},
			{
				"field": "umurDisapih",
				"title": "Umur Disapih",
				width: "100px"
			},
			{
				"field": "masalahDalamMenyusui",
				"title": "Masalah Dalam Menyusui",
				width: "200px"
			},
			{
				command: {text: "Delete", click:$scope.removeRiwayatKehamilan},
				title : "&nbsp;",
				width: "110px"
			}];

			$scope.addDataRiwayatKehamilan = function() {
                
                    var tanggalLahir = DateHelper.getTanggalFormatted($scope.item.TglLahir);

                    var tempDatariwayat = {
                        "anakKe" : $scope.dataRiwayatKehamilan._data.length+1,
                        "jenisKelamin" : $scope.item.JenisKelamin,
                        "tglLahir" : tanggalLahir,
                        "menyusuiEkslusif" : $scope.item.MenyusuiEkslusif,
                        "umurDisapih" : $scope.item.UmurDisapih,
                        "masalahDalamMenyusui" : $scope.item.MasalahDalamMenyusui



                    }
                    $scope.dataRiwayatKehamilan.add(tempDatariwayat);
                    $scope.item.JenisKelamin = false;
                    $scope.item.TglLahir = new Date();
                    $scope.item.MenyusuiEkslusif = false;
                    $scope.item.UmurDisapih = "";
                    $scope.item.MasalahDalamMenyusui = "";
            }
            $scope.removeRiwayatKehamilan = function(e) {

                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDatariwayat = $scope.dataRiwayatKehamilan
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };
		}
	]);
});