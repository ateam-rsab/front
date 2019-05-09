define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AdvokasiHukumMedicolegalCtrl', ['$q', '$rootScope', '$scope', 
		function($q, $rootScope, $scope) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();


			$scope.dataAdvokasiHukumMedicolegal = new kendo.data.DataSource({
				data: []
			});
			$scope.columnAdvokasiHukumMedicolegal = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "noKasus",
				"title": "no Kasus"
			},
			{
				"field": "tglKasus",
				"title": "tgl Kasus"
			},
			{
				"field": "user",
				"title": "user"
			},
			{
				"field": "userId",
				"title": "user Id"
			},
			{
				"field": "jenisKasus",
				"title": "jenis Kasus"
			},
			{
				"field": "jenisKasusId",
				"title": "jenis Kasus Id"
			},
			{
				"field": "deskripsiKasus",
				"title": "deskripsi Kasus"
			},
			{
				"field": "penanggungJawab",
				"title": "penanggung Jawab"
			},
			{
				"field": "penanggungJawabId",
				"title": "penanggung Jawab Id"
			},
			{
				"field": "analisaKajian",
				"title": "analisa Kajian"
			},
			{
				"field": "hasilKeputusan",
				"title": "hasil Keputusan"
			},
			{
				"field": "statusKasus",
				"title": "status Kasus"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			}
			];

		}
		]);
});