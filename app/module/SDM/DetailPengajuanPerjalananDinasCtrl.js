define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailPengajuanPerjalananDinasCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.item = {};
			$scope.mainGridTanggal = { 
				pageable: true,
				columns: [
				{ field:"tanggalPerjalananDinas",title:"Tanggal Perjalanan Dinas" }],
				editable: false
			};
			$scope.mainGridBiaya = { 
				pageable: true,
				toolbar : ["create", "cancel"],
				columns: [
				{ field:"komponen",title:"Komponen",width:100,footerTemplate: "Total Tunjangan:" },
				{ field:"qty",title:"Qty",width:40 },
				{ field:"hargaSatuan",title:"Harga Satuan",width:100 },
				{ field:"totalHarga",title:"Total Harga",width:100 }],
				editable: true
			};
		}
		]);
});