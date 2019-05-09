define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('JadwalRetensiArsipCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.item.awal=$scope.now;
			$scope.item.akhir=$scope.now;

			FindSarpras.getSarpras("dokumen-internal/get-dokumen-by").then(function(dat){
				$scope.sourceJadwalRetensiArsip= dat.data;
				// debugger;
			});	
			$scope.columnJadwalRetensiArsip = [
				{
					"field": "noSurat",
					"title": "<center>No Surat</center>",
                    "width":"100px"
				},
				{
					"field": "statusSurat",
					"title": "<center>Status Surat</center>"
				},
				{
					"field": "TglSuratMasuk/Keluar",
					"title": "<center>Tgl Surat Masuk/Keluar</center>"
				},
				{
					"field": "jangkaWaktu",
					"title": "<center>Jangka Waktu</center>"
				},
				{
					"field": "JadwalRetensiArsip",
					"title": "<center>Jadwal Retensi Arsip</center>"
				},
				{
					"field": "keterangan",
					"title": "<center>keterangan</center>"
				}
			];

			$scope.Save = function(){
				var data = {
					"awal": DateHelper.getTanggalFormatted($scope.item.awal),
					"akhir": DateHelper.getTanggalFormatted($scope.item.akhir)
				}
				console.log(JSON.stringify(data));
			}

	}])
})