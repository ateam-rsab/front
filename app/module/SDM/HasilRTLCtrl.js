define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HasilRTLCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
			
			$scope.item = {}; 
			$scope.dataVOloaded = true;
			$scope.daftarPegawaiOpt = {
  				pageable: true,
                scrollable:true, 
                 filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    startswith: "Dimulai dengan",
                                    eq: "mengandung kata",
                                    neq: "Tidak mengandung kata"
                                }
                            }
                        },
			columns: [
			{
				"field": "nip",
				"title": "NIP",
				"width": "10%"
			},
			{
				"field": "namaLengkap",
				"title": "Nama Pegawai",
				"width": "15%" 
				 
			},
			
			{
				"field": "unitKerja",
				"title": "Unit Kerja",
				"width": "10%"
			},
			{
				"field": "jabatanInternal",
				"title": "Jabatan",
				"width": "10%"
			},
			{
				"field": "tglPenilaian",
				"title": "Tanggal Penilaian",
				"width": "10%" 
			},
			{
				"field": "statusKepegawaian",
				"title": "Status Kepegawaian",
				"width": "10%"
			},
			{
				"field": "nilaiHasilEvaluasi",
				"title": "Nilai Prestasi Kerja",
				"width": "10%"
			},
			{
				"field": "rekomendasi",
				"title": "Rencana Tindak Lanjut",
				"width": "15%"
			}
			]};
 
/*      "nilaiHasilEvaluasi": 3,
      "namaLengkap": "Wawan Iswanta, S.Kom",
      "idPegawai": 1009,
      "unitKerja": "Sub Bag. P2 SDM",
      "statusKepegawaian": "Pegawai Tetap BLU",
      "rekomendasi": "yeyeyey",
      "tglPenilaian": 1484179200000,
      "nip": "19610805 198903 2 001",
      "jabatanInternal": "Pengelola Urusan Pendayagunaan Pegawai"*/
 
			ManageSdm.getOrderList("sdm/get-rencana-tindak-lanjut").then(function(dat){
				$scope.daftarPegawai = new kendo.data.DataSource({ 
					data: dat.data.data
				});
			});



			

		}
	]);
});