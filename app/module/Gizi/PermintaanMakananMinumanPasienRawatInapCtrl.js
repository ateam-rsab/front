define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanMakananMinumanPasienRawatInapCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.titleTable = function(){
					$scope.columnDaftarAnalisaSwot = [
				{
					"field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "50px"
				}, {
					"field": "noCM",
					"title": "<h3 align=center>No CM</h3>",
					"width": "100px"
				}, {
					"field": "namaPasien",
					"title": "<h3 align=center>Nama Pasien<h3>",
					"width": "200px"
				},{
					"field": "jk",
					"title": "<h3 align=center>JK<h3>",
					"width": "20px"
				},{
					"field": "kelas",
					"title": "<h3 align=center>Kelas<h3>",
					"width": "100px"
				},{
					"field": "alergi",
					"title": "<h3 align=center>Alergi<h3>",
					"width": "100px"
				}, {
					"field": "diagnosis",
					"title": "<h3 align=center>Diagnosis</h3>",
					"width": "150px"
				}, {
					"field": "jenisDiet",
					"title": "<h3 align=center>Jenis Diet<h3>",
					"width": "100px"
				},{
					"field": "tipeMakanan",
					"title": "<h3 align=center>Tipe Makanan/Minuman<h3>",
					"width": "150px"
				}, {
					"field": "waktumakan",
					"title": "<h3 align=center>Waktu Makan/Minum</h3>",
					"width": "150px"
				}, {
					"field": "magnesium",
					"title": "<h3 align=center>Magnesium<h3>",
					"width": "100px"
				},{
					"field": "seng",
					"title": "<h3 align=center>Seng<h3>",
					"width": "100px"
				}, {
					"field": "tembaga",
					"title": "<h3 align=center>Tembaga(cu)</h3>",
					"width": "100px"
				}, {
					"field": "energiprotein",
					"title": "<h3 align=center>% Energi Protein<h3>",
					"width": "100px"
				},{
					"field": "energiLemak",
					"title": "<h3 align=center>% Energi Lemak<h3>",
					"width": "100px"
				},{
					"field": "osmolantus",
					"title": "<h3 align=center>Osmolantus<h3>",
					"width": "100px"
				}];
			
			}
		}
	]);
});