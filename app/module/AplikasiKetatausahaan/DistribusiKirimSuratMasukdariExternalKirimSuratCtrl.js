define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DistribusiKirimSuratMasukdariExternalKirimSuratCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'FindSarpras', 'ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper, FindSarpras, ManageSarpras) {
			ModelItem.get("Ketatausahaan/DistribusiKirimSuratMasukdariExternalKirimSurat").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			// ModelItem.getDataDummyGeneric("Departemen", true).then(function(data) {
			// 	$scope.listDepartemen = data;
			// })
			// ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
			// 	$scope.listPegawai = data;
			// })
			FindSarpras.getSarpras("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat){
				$scope.sourceRuangan = dat;
			});
			FindSarpras.getSarpras("user/get-all-user/").then(function(dat){
				$scope.sourceNamaPengirim = dat.data.data.data;
			});
			FindSarpras.getSarpras("user/get-all-user/").then(function(dat){
				$scope.sourceTujuanSurat= dat.data.data.data;
			});
			FindSarpras.getSarpras("dokumen-internal/get-dokumen-by-norec/?noRec="+ $state.params.noRec).then(function(dat){
				$scope.distribusi= dat.data[0];
			});
			$scope.Save = function(){
				// var TglTerima = DateHelper.getTanggalFormatted($scope.item.TglTerima);
				var TglTerima = $scope.now;
				// var TglSurat = DateHelper.getTanggalFormatted($scope.item.tanggal);
            	var data = {
            		"tglKirimDistribusi" : $scope.item.tanggal,
            		"userPenerimaDistribusi": $scope.item.penerimaSurat,
            		"noRec": $state.params.noRec

            	};
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"dokumen-internal/set-distribusi-dokumen/").then(function(e) {
            		$scope.item = {};
            	});
			};
		}
	]);
});