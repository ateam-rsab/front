define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HitungPiutangCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','$state',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,$state) {
			debugger;
			$scope.dataParams = JSON.parse($state.params.dataFilter);
			var dariSini = "";

			$scope.dataVOloaded = true;
			$scope.now = new Date();

			function Showbutton(){
				$scope.showBtnBack = true;
			};
			Showbutton();

			$scope.Back = function(){
				$state.go(dariSini)
			};

			if($scope.dataParams.splitString != undefined){
				var strFilter = $scope.dataParams.splitString;
				var arrFilter= strFilter.split('~');

				dariSini = arrFilter[0];
			};


			$scope.dataDetailPelayanan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnDetailPelayanan = [
			{
				"field": "No","title": "No","width":"50px"
			},
			{
				"field": "Deskripsi","title": "Deskripsi","width":"300px"
			},
			{
				"field": "Tanggal","title": "Tanggal","width":"150px"
			},
			{
				"field": "noRef","title": "No Ref","width":"100px"
			},
			{
				"field": "jumlahBayar","title": "JumlahBayar","width":"150px"
			}
			];

		}
		]);
});