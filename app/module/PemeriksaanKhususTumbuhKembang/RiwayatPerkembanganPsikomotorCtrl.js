define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPerkembanganPsikomotorCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {
			$scope.title = "Riwayat Perkembangan Psikomotor";
			$scope.item = {};
			
			ModelItem.get("Riwayat Perkembangan Psikomotor").then(function(data) {
				$scope.item = data;
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

			
			
			$scope.Save = function() {
				debugger
				$scope.item.praAnestesiDokter= {"noRec":"2c909071562b19cb01562b1e808d0000"};
				$scope.item.klasifikasiASA={id:$scope.item.klasifikasiASA};
				$scope.item.penyulitAnestesi=[];
				$scope.item.penyulitAnestesi.push(keterangan=$scope.dataUtama.data);
				console.log(JSON.stringify($scope.item));
			};
		}
	]);
});