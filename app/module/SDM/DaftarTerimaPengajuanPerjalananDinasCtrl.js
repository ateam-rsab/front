define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarTerimaPengajuanPerjalananDinasCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.item = {};
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"noPengajuan",title:"No Pengajuan" },
				{ field:"unitKerjaPemohon",title:"Unit Kerja Pemohon" },
				{ field:"tanggal",title:"Tanggal Pengajuan" },
				{ field:"tipe",title:"Tipe TUjuan Perjalanan Dinas" }],
				editable: false
			};
		}
		]);
});