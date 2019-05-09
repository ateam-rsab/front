define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanPerjalananDinasCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.item = {};
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"noPengajuan",title:"No Pengajuan", width:120 },
				{ field:"tipeTujuanPerjalananDinas",title:"Tipe Tujuan Perjalanan Dinas", width:200 },
				{ field:"namaPegawai",title:"Nama Pegawai", width:150 },
				{ field:"nip",title:"NIP", width:100 },
				{ field:"golongan",title:"Golongan", width:100 },
				{ field:"unitKerja",title:"Unit Kerja", width:100 },
				{ field:"jabatan",title:"Jabatan", width:100 },
				{ field:"namaKegiatan",title:"Nama Kegiatan", width:170 },
				{ field:"tanggalMulai",title:"Tanggal Mulai", width:120 },
				{ field:"tanggalSelesai",title:"Tanggal Selesai", width:120 },
				{ field:"Penyelenggara",title:"No Pengajuan", width:120 },
				{ field:"tempat",title:"Tempat", width:120 },
				{ field:"noSurat",title:"No Surat", width:120 },
				{ field:"tanggalSurat",title:"Tanggal Surat", width:120 },
				{ field:"statusPersetujuan",title:"Status Persetujuan", width:120 }],
				editable: false
			};
		}
		]);
});