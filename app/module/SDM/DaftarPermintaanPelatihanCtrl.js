define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPermintaanPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.item = {};
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"no",title:"No",width:40 },
				{ field:"noPengajuan",title:"No Pengajuan",width:150 },
				{ field:"jenisPelatihan",title:"Jenis Pelatihan",width:150 },
				{ field:"namaPaketPelatihan",title:"Nama Paket Pelatihan",width:200 },
				{ field:"tanggalMulai",title:"Tanggal Mulai",width:100 },
				{ field:"tanggalSelesai",title:"Tanggal Selesai",width:100 },
				{ field:"alasan",title:"Alasan",width:200 },
				{ field:"statusPersetujuan",title:"Status Persetujuan",width:150 }],
				editable: false
			};
		}
		]);
});