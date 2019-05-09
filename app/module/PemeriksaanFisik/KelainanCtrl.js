define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelainanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {
			$scope.title = "Tanda Vital";
			$rootScope.showMenu = true;
			$scope.noCM = $state.params.noCM;
			$scope.item = {};
			ModelItem.get("RiwayatTumbuhKembang").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
            
			$scope.now = new Date();
			
			$scope.ListAntenatal = [
				{"id": 3, "name": "Sp.OG"},
				{"id": 4, "name": "Bidan"},
				{"id": 5, "name": "Tidak Pernah"}
			]
			$scope.ListYaTidak = [
				{"id": 1, "name": "Tidak Teratur"},
				{"id": 2, "name": "Teratur"}
			]
			$scope.listKelainan = [
				{"id": 1, "name": "Isoimunisasi"},
				{"id": 2, "name": "Toxemia"},
				{"id": 3, "name": "Hidramnion"},
				{"id": 5, "name": "Diabetes"},
				{"id": 4, "name": "Perdarahan per Vagina"},
				{"id": 6, "name": "Infeksi Traktus Urinarius"},
				{"id": 7, "name": "Lain-lain..."},
			]
			
		}
	]);
});