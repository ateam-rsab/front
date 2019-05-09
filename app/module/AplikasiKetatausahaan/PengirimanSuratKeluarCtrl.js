define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PengirimanSuratKeluarCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.item = {};

			$scope.sourceSifatSurat = [
				{
					"id": "1",
					"sifatSurat": "Biasa"
				},
				{
					"id": "2",
					"sifatSurat": "Kilat"
				}
			];

			$scope.sourceKlasifikasi = [
				{
					"id": "1",
					"klasifikasi": "Kerumah Tanggaan"
				}
			];

			$scope.sourceStatusBerkas = [
				{
					"id": "1",
					"statusBerkas": "Asli"
				},
				{
					"id": "2",
					"statusBerkas": "Salinan"
				}
			];

			$scope.sourceSubKlasifikasiArsip = [
				{
					"id": "1",
					"subKlasifikasiArsip": "Klasifikasi Arsip"
				}
			];

			$scope.sourceJenisSurat = [
				{
					"id": "1",
					"jenisSurat": "Biasa"
				}
			];

			$scope.sourceNamaPengirim = [
				{
					"id": "1",
					"namaPengirim": "Kepala Sub Bagian Tata Usaha"
				}
			];

			$scope.sourceMetodeKirim = [
				{
					"id": "1",
					"metodeKirim": "Pos"
				},
				{
					"id": "2",
					"metodeKirim": "Email"
				},
				{
					"id": "3",
					"metodeKirim": "Kurir"
				}
			];

			$scope.sourcePetugasKirim = [
				{
					"id": "1",
					"namaPetugas": "Handoko"
				}
			];

			$scope.Save = function(){
				console.log(JSON.stringify($scope.item));
			}
	}])
})