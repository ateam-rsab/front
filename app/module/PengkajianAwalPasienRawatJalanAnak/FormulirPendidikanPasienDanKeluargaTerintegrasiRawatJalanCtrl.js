define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormulirPendidikanPasienDanKeluargaTerintegrasiRawatJalanCtrl', ['$rootScope', '$scope', '$state', 
		function($rootScope, $scope, $state){
			$scope.item = {};
			$scope.angka = 3;
			$scope.getList = function(num) {
				return new Array(num);
			};
			$scope.listBahasa = ["Indonesia", "Inggris", "Daerah", "Lain - Lain"];
			$scope.listYaTidak = ["Ya", "Tidak"];
			$scope.listPendidikanPasien = ["SD", "SLTP", "SLTA", "DIII/S1", "Lain-lain"];
			$scope.listBacaTulis = ["Baik", "Kurang"];
			$scope.listTipePembelajaran = ["Verbal", "Kurang"];
			$scope.listHambatanPendidikan = ["Tidak Ada", "Penglihatan Terganggu", "Bahasa", "Kognitif Kurang", "Budaya/Agama/Spiritual", "Emosional", "Gangguan Bicara", "Fisik Lemah", "Lain - Lain"];
			$scope.listEvaluasi = ["Sudah Mengerti", "Re-pendidikan", "Re-demonstrasi"];
			$scope.listJenisKelamin = ["L", "P"];
			$scope.columnPendidikanPasien = [{
				"field": "tgl",
				"title": "Tgl"
			}, {
				"field": "penjelasanPendidikan",
				"title": "Penjelasan / Pendidikan Tentang"
			}, {
				"field": "tandaTangan",
				"title": "Tanda Tangan, Nama Petugas Dan Profesi"
			}, {
				"field": "sasaranPendidikan",
				"title": "Sasaran Pendidikan (Nama Dan Hubungannya Dengan Pasien)"
			}, {
				"field": "evaluasi",
				"title": "Evaluasi"
			}];
			$scope.dataTest = [{
				"isCrud": "U"
			}, {
				"isCrud": "I"
			}, {
				"isCrud": "D"
			}];
			/*debugger;*/
			$scope.listData = [{
                "kdProfile": 0,
                "statusEnabled": true,
                "id": 77,
                "noRec": "826d0028166f4acb88a545c56d7944f0",
                "reportDisplay": "",
                "kodeExternal": "0",
                "namaExternal": "",
                "detailDataCRUD": "{method:'2',user:'admin',class:'com.jasamedika.medifirst2000.entities.Pegawai', entity:'Pegawai', table:'Pegawai_M', property : [{name : 'golonganPegawai', column : '', oldData : 'com.jasamedika.medifirst2000.entities.GolonganPegawai@7ee53113', newData : 'null', },{name : 'jabatanInternal', column : '', oldData : 'com.jasamedika.medifirst2000.entities.Jabatan@5b364abf', newData : 'null', },{name : 'noHandphone', column : 'NoHandphone', oldData : 'null', newData : '08112122221', },{name : 'satuanKerja', column : '', oldData : 'com.jasamedika.medifirst2000.entities.SatuanKerja@326b9578', newData : 'null', },{name : 'statusPerkawinanPegawai', column : '', oldData : 'com.jasamedika.medifirst2000.entities.StatusPerkawinanPegawai@6ea04221', newData : 'null', },{}],id : 0,noRecP : EAF19C1C-995B-4877-855B-49FFEA7E}",
                "isCRUD": "U",
                "historyLogin": null,
                "historyLoginId": 173,
                "namaObjekCRUD": "com.jasamedika.medifirst2000.entities.Pegawai",
                "noRecord": "EAF19C1C-995B-4877-855B-49FFEA7E",
                "tglCRUDin": 1491555965906,
                "tglCRUDout": 1491555967253
            },
            {
                "kdProfile": 0,
                "statusEnabled": true,
                "id": 78,
                "noRec": "c771fa9bd96242f985a44d0305673d36",
                "reportDisplay": "",
                "kodeExternal": "0",
                "namaExternal": "",
                "detailDataCRUD": "{method:'2',user:'admin',class:'com.jasamedika.medifirst2000.entities.Pegawai', entity:'Pegawai', table:'Pegawai_M', property : [{name : 'email', column : 'Email', oldData : 'null', newData : 'bebas@bebas.com', },{}],id : 0,noRecP : EAF19C1C-995B-4877-855B-49FFEA7E}",
                "isCRUD": "U",
                "historyLogin": null,
                "historyLoginId": 173,
                "namaObjekCRUD": "com.jasamedika.medifirst2000.entities.Pegawai",
                "noRecord": "EAF19C1C-995B-4877-855B-49FFEA7E",
                "tglCRUDin": 1491555994895,
                "tglCRUDout": 1491555994913
            }];
			$scope.dataSource = new kendo.data.DataSource({
				data: $scope.dataTest
			});
			$scope.columnTest = [{
				"field": "isCrud",
				"title": "isCrud",
				"template": "<span>{{formatData('#: isCrud #')}}</span>"
			}, {
				"field": "detail",
				"title": "Detail"
			}];
			$scope.mainGridOptions = {
				columns: $scope.columnTest,
				pageable: true
			};
			
			$scope.formatData = function(value) {
				var data = value;
				if (data == "U") {
					return "Update"
				}
				else if(data == "I") {
					return "Insert"
				}
				else {
					return "Delete"
				}
				/*debugger;*/
			};
			
		}
	]);
});