define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('InformasiDaftarPerencanaanRTDPCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.columnInfo = [
				{
					"field": "noPerencanaan",
					"title": "No Perencanaan"
				},
				{
					"field": "tglPerencanaan",
					"title": "Tanggal Perencanaan"
				},
				{
					"field": "ruangan",
					"title": "Ruangan"
				},
				{
					"field": "status",
					"title": "Status"
				}
			];
	}])
})