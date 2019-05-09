define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengkajianPemeriksaanFisikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {
			$scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pemeriksaan Fisik";
			$rootScope.showMenu = true;$rootScope.showMenuDetail = false;
			$scope.noCM = $state.params.noCM;
			//dummy data kesadaran
			$scope.listKesadaran = [{
				"id": "1",
				"name": "Kompos mentis"
			}, {
				"id": "1",
				"name": "Apatis"
			}, {
				"id": "1",
				"name": "Somnolen"
			}, {
				"id": "1",
				"name": "Sopor"
			}, {
				"id": "1",
				"name": "Coma"
			}, {
				"id": "1",
				"name": "Tumpul"
			}, ];

			$scope.listStatGanguanNeurologi = [{
				"id": "1",
				"name": "Tidak Ada"
			}, {
				"id": "1",
				"name": "Ada"
			}];
		}
	]);
});