define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('InformasiDistribusiSuratCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.item.awal=$scope.now;
			$scope.item.akhir=$scope.now;
			$scope.search = function(){
				var awal =  DateHelper.getPeriodeFormatted($scope.item.awal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
				var url = "dateStart=" + awal + "&dateEnd=" + akhir;
		
				FindSarpras.getSarpras("dokumen-internal/get-dokumen-by?" + url).then(function(dat){
					// debugger;
				    $scope.sourceInformasiDistribusiSurat = dat.data;
				});
			}
			$scope.search();

			FindSarpras.getSarpras("dokumen-internal/get-dokumen-by").then(function(dat){
				$scope.sourceInformasiDistribusiSurat= dat.data;
				// debugger;
			});	
			$scope.columnInformasiDistribusiSurat = [
				{
					"field": "noSurat",
					"title": "<center>No. Surat</center>"
				},
				{
					"field": "tglSurat",
					"title": "<center>Tanggal Surat</center>"
				},
				{
					"field": "judulSurat",
					"title": "<center>Judul Surat</center>"
				},
				{
					"field": "namaPengirimSurat",
					"title": "<center>Nama Pengirim Surat</center>"
				},
				{
					"field": "namaPenerimaSurat",
					"title": "<center>Nama Penerima Surat</center>"
				},
				{
					"field": "statusSurat",
					"title": "<center>Status Surat</center>"
				}
			];

			$scope.Search = function(){
				var data = {
					"awal": DateHelper.getTanggalFormatted($scope.item.awal),
					"akhir": DateHelper.getTanggalFormatted($scope.item.akhir)
				}
				console.log(JSON.stringify(data));
			}

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.navToDistribusiSurat = function(current){
				$state.go("DistribusiKirimSuratMasukdariExternalKirimSurat", {
					noRec: $scope.current
				})
			}
	}])
})