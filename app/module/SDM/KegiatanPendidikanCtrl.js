define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KegiatanPendidikanCtrl', ['$rootScope', '$scope', 'ModelItem','$state', 'ManagePhp',
		function($rootScope, $scope, ModelItem,$state, managePhp, ) {
			// ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			// }, function errorCallBack(err) {});
			// $scope.no=1;
			// $scope.dataLaporanUjiHasil = new kendo.data.DataSource({
			// 	data: []
			// });
			
			// $scope.pindah = function(){

			// 	$state.go("RekamDataPegawai");

			// }
			init();
			managePhp.getData("pendidikan/get-cbo-kegiatan-pendidikan").then(function(dat){
				$scope.listInstitusiPendidikan = dat.data.dataInstitusipPendidikan;
				$scope.listKategori = dat.data.dataDiklatKategori;
				$scope.listProgramStudi = dat.data.datafakultas;
				$scope.listJurusan = dat.data.datadiklatjurusan;
				$scope.listPembimbing = dat.data.dataTenagaPengajar;
			});
			function init(){
				managePhp.getData("pendidikan/get-daftar-kegiatan-pendidikan").then(function(dat){
					$scope.dataGrid = dat.data.data;
				});
			}
			

			//
			$scope.cariNim = function () {

				managePhp.getMaster("pendidikan/get-daftar-pesertadidik").then(function(dat){
					$scope.sourceKomponens = dat.data.data;
					$scope.popup.center().open();
				});
				

				// ManageSdm.getItem("diklat/get-kegiatan-pendidikan-by-nim?nim="+$scope.item.nomorContoh).then(function(dat){
    //                 $scope.dataMaster = dat.data.data[0];
    //                 if (dat.data.data.length > 1 || dat.data.data.length == 0) {
    //                 	window.messageContainer.error('Data Tidak Ditemukan');
    //                 	$scope.item = {};
    //                 } else {
    //                 	$scope.item.namaLengkap = $scope.dataMaster.namaLengkap;
				// 		$scope.item.periode = $scope.dataMaster.periodeTahunAjaran;
				// 		$scope.item.institusiPendidikan = $scope.dataMaster.institusiPendidikan;
				// 		$scope.item.jurusan = $scope.dataMaster.jurusan;
				// 		$scope.item.programStudi = $scope.dataMaster.programStudi;
    //                 }
                    
    //             });
			}
			$scope.CariNamaPeserta = function(){
				var nama = '?nama='
				if ($scope.item.namaPeserta != undefined) {
					nama = '?nama=' + $scope.item.namaPeserta
				}
				var instst = ''
				if ($scope.item.institusiPendidikan != undefined) {
					instst = ' &institusipendidikanfk=' + $scope.item.institusiPendidikan.id
				}
				managePhp.getMaster("pendidikan/get-daftar-pesertadidik" + nama + instst).then(function(dat){
					$scope.sourceKomponens = dat.data.data;
					$scope.popup.center().open();
				});
			}
			$scope.filterByInstst = function(){
				var nama = '?nama='
				if ($scope.item.namaPeserta != undefined) {
					nama = '?nama=' + $scope.item.namaPeserta
				}
				var instst = ''
				if ($scope.item.institusiPendidikan != undefined) {
					instst = ' &institusipendidikanfk=' + $scope.item.institusiPendidikan.id
				}
				managePhp.getMaster("pendidikan/get-daftar-pesertadidik" + nama + instst).then(function(dat){
					$scope.sourceKomponens = dat.data.data;
					$scope.popup.center().open();
				});
			}

			$scope.gunakanPeserta = function(){
				$scope.popup.center().close();

			}

			$scope.klikKomponen = function(dataSelectedKomponen){
				$scope.item.norec = dataSelectedKomponen.norec
				$scope.item.nim = dataSelectedKomponen.nim
				$scope.item.nama = dataSelectedKomponen.nama
				$scope.item.institusiPendidikan2 = dataSelectedKomponen.institusipendidikan
				$scope.item.jurusan = dataSelectedKomponen.jurusanpeminatan
				$scope.item.programStudi = dataSelectedKomponen.fakultas
			}
			// ManageSdm.getItem("diklat/get-jurusan-peminatan").then(function(dat){
			// 	$scope.listJurusan = dat.data.data;
			// });
			// ManageSdm.getItem("diklat/get-program-studi").then(function(dat){
			// 	$scope.listProgramStudi = dat.data.data;
			// });
			// ManageSdm.getItem("diklat/get-pembimbing").then(function(dat){
			// 	$scope.listPembimbing = dat.data.data;
			// });
			// ManageSdm.getItem("diklat/get-diklat-kategori").then(function(dat){
			// 	$scope.listKategori = dat.data.data;
			// });
			// ManageSdm.getItem("diklat/get-survey-kepuasan").then(function(dat){
			// 	$scope.listSurvei = dat.data.data;
			// });
			$scope.simpan = function () {
				var data = {
					"pesertafk":$scope.item.norec,
					"diklatkatregorifk":$scope.item.kategori.id,
					"fakultasfk":$scope.item.programPendidikan.id,
					"diklatjurusanfk":$scope.item.jurusanKualifikasi.id,
					"tenagapengajarfk":$scope.item.pembimbing.id,
					"tglmulai":$scope.item.tanggalMulai,
					"nilaipraktek":$scope.item.nilaiPraktek,
					"nilaiujian":$scope.item.nilaiUjian,
					"surveykepuasan":$scope.item.survey.id,
					"biayapendidikan":$scope.item.biayaPendidikan,
					"tglpembayaran":$scope.item.tanggalPembayaran,
					"nokwitansi":$scope.item.noKwitansi
				}
				managePhp.postData2("pendidikan/save-kegiatan-pendidikan",data).then(function(e) {
					init();
				});
			}
			$scope.columnKegiatanPendidikan = [
			];
			$scope.columnKomponens = [{
				"field": "nim",
				"title": "NIM" 
			},
			{
				"field": "nama",
				"title": "Nama Mahasiswa"
			},
			{
				"field": "institusipendidikan",
				"title": "Institusi Pendidikan"
			},
			{
				"field": "jurusanpeminatan",
				"title": "Jurusan"
			}
			];
			$scope.columnGrid = {
				// toolbar: [
				// 	"excel",
					
				// 	],
				// 	excel: {
				// 		fileName: "DaftarRegistrasiPasien.xlsx",
				// 		allPages: true,
				// 	},
				// 	excelExport: function(e){
				// 		var sheet = e.workbook.sheets[0];
				// 		sheet.frozenRows = 2;
				// 		sheet.mergedCells = ["A1:M1"];
				// 		sheet.name = "Orders";

				// 		var myHeaders = [{
				// 			value:"Daftar Registrasi Pasien",
				// 			fontSize: 20,
				// 			textAlign: "center",
				// 			background:"#ffffff",
	   //                   // color:"#ffffff"
	   //               }];

	   //               sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
	   //           },
				selectable: 'row',
				pageable: true,
	            columns:
	            [
					{
						"field": "nama",
						"title": "Nama Mahasiswa"
					},
					{
						"field": "tglmulai",
						"title": "Tgl Mulai"
					},
					{
						"field": "fakultas",
						"title": "Institusi Pendidikan"
					},
					{
						"field": "diklatjurusan",
						"title": "Jurusan"
					},
					{
						"field": "diklatkategori",
						"title": "Diklat Kategori"
					},
					{
						"field": "namalengkap",
						"title": "Pembimbing"
					}
				]
			};







			$scope.closePopup = function(){

				$scope.item.norec = ''
				$scope.item.nim = ''
				$scope.item.nama = ''
				$scope.item.institusiPendidikan2 = ''
				$scope.item.jurusan = ''
				$scope.item.programStudi = ''
				$scope.popup.center().close();

			}




		}
		]);
});