define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarDisposisiCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper, FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item.awal=$scope.now;
			$scope.item.akhir=$scope.now;
			$scope.search = function(){
				var awal =  DateHelper.getPeriodeFormatted($scope.item.awal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
				var nomor = $scope.item.noTerima;
				var url = "dateStart=" + awal + "&dateEnd=" + akhir + "&noTerima=" + nomor;
				FindSarpras.getSarpras("dokumen-internal/get-dokumen?" + url).then(function(dat){
				    $scope.sourceDaftarSuratMasuk = dat.data;
				});
			}
			$scope.search();

			FindSarpras.getSarpras("").then(function(dat){
				$scope.sourceDaftarDraftSurat= dat.data;
				// debugger;
			});	
			$scope.columnDaftarDraftSurat = [
				{
					"field": "nomor",
					"title": "<center>Nomor<br>Nomor Agenda</center>",
					"width": "150px"
				},
				{
					"field": "tanggal",
					"title": "<center>Tanggal</center>",
					"width": "200px"
				},
				{
					"field": "nomorSurat",
					"title": "<center>Nomor Surat</center>",
					"width": "150px"
				},
				{
					"field": "disampaikanOleh",
					"title": "<center>Disampaikan Oleh</center>",
					"width": "150px"
				},
				{
					"field": "sifatSurat",
					"title": "<center>Sifat Surat</center>",
					"width": "100px"
				},
				{
					"field": "perihal",
					"title": "<center>Perihal</center>",
					"width": "100px"
				},
				{
					"field": "asalSurat",
					"title": "<center>Asal Surat</center>",
					"width": "100px"
				},
				{
					"field": "penerima",
					"title": "<center>Penerima Surat</center>",
					"width": "200px"
				},
				{
					"field": "mohonUntuk",
					"title": "<center>Mohon Untuk</center>",
					"width": "200px"
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

			$scope.navToDraft = function(current){
				$state.go("DraftSurat", {
					noRec: $scope.current
				})
			}
	}])
})