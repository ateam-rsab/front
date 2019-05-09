define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('IsiPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.item = {};
			$scope.dataGrid = new kendo.data.DataSource({
				pageSize: 10,
				data: []
			});
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"judul",title:"Judul",width:150},
				{ field:"namaFile",title:"Nama File",width:150},
				{ field:"statusAktif",title:"Status Aktif",width:100},
				],
				editable: true
			};
		}
		]);
});