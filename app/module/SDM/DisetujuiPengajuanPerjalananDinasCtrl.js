define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DisetujuiPengajuanPerjalananDinasCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.item = {};
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"unitKerja",title:"Unit Kerja" },
				{ field:"namaPegawai",title:"Nama Pegawai" },
				{ field:"tanggal",title:"Tanggal" },
				{ field:"catatan",title:"Catatan" },
				{ field:"status",title:"Status" }],
				editable: false
			};
		}
		]);
});