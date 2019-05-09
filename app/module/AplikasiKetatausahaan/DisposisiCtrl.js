define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DisposisiCtrl', ['$rootScope', '$scope', 'ModelItem', 'FindSarpras', 'ManageSarpras',
		function($rootScope, $scope, ModelItem, FindSarpras, ManageSarpras) {
			$scope.item = {};
			ModelItem.get("Ketatausahaan/Disposisi").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			FindSarpras.getSarpras("service/list-generic/?view=SifatSurat&select=id,name").then(function(dat){
				$scope.sourceSifatSurat = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=Jabatan&select=id,namaJabatan").then(function(dat){
				$scope.sourceJabatan = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=TipePengirimSurat&select=id,name").then(function(dat){
				$scope.sourceTipePengirim = dat.data;
			});

			$scope.tambah1=true;
			$scope.Tambah1 = function() {

				$scope.tambah2 = true;
				$scope.kepada2 = true;
				$scope.label2 = true;
				$scope.pegawai2 = true;
				$scope.tambah1 = false;
				
            };
            $scope.Tambah2 = function() {

				$scope.tambah3 = true;
				$scope.kepada3 = true;
				$scope.label3 = true;
				$scope.pegawai3 = true;
				$scope.tambah2 = false;

            };
            $scope.Tambah3 = function() {

				$scope.tambah4 = true;
				$scope.kepada4 = true;
				$scope.label4 = true;
				$scope.pegawai4 = true;
				$scope.tambah3 = false;

            };
            $scope.Tambah4 = function() {
            	$scope.kepada5 = true;
				$scope.label5 = true;
				$scope.pegawai5 = true;
				$scope.tambah4 = false;
			};

			$scope.sourcePermohonan = [
				{
					"id": "1",
					"name": "Ditanggapi"
				},
				{
					"id": "2",
					"name": "Dijawab"
				},
				{
					"id": "3",
					"name": "Dikoreksi"
				},
				{
					"id": "4",
					"name": "Dibahas"
				},
				{
					"id": "5",
					"name": "Diselesaikan"
				},
				{
					"id": "6",
					"name": "Diketahui"
				},
				{
					"id": "7",
					"name": "Disebarluaskan"
				},
				{
					"id": "8",
					"name": "Diarsipkan"
				}
			];
		}
	]);
});