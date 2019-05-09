define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PersetujuanTindakanKedokteranCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Pemberian Informasi";
			$scope.dataVOloaded = true;
			ModelItem.get("PersetujuanTindakanDokter/PersetujuanTindakanDokter").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
				}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("PersetujuanTindakanDokter/DokterPelaksana", true).then(function(data) {
				$scope.listDokterPelaksana = data;
			})

			ModelItem.getDataDummyGeneric("PersetujuanTindakanDokter/PemberiInfo", true).then(function(data) {
				$scope.listPemberiInfo = data;
			})

			ModelItem.getDataDummyGeneric("PersetujuanTindakanDokter/PenerimaInfo", true).then(function(data) {
				$scope.listPenerimaInfo = data;
			})
			ModelItem.getDataDummyGeneric("PersetujuanTindakanDokter/TindakanKedokteran", true).then(function(data) {
				$scope.listTindakanKedokteran = data;
			})
			ModelItem.getDataDummyGeneric("PersetujuanTindakanDokter/TataCara", false).then(function(data) {
				$scope.listTataCara = data;
			})
			ModelItem.getDataDummyGeneric("PersetujuanTindakanDokter/Tindakan", false).then(function(data) {
				$scope.listTindakan = data;

			})
		}
	]);
});