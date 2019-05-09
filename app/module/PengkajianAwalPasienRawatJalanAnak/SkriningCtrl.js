define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SkriningCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {

			//indikator harap tunggu
			$scope.dataVOloaded = true;
			$rootScope.doneLoad = false;

			$rootScope.showMenu = true;$rootScope.showMenuDetail = false;
			//dummy data rasa nyeri
			$scope.listStatusRasaNyeri = [{
				"id": "1",
				"name": "Ya"
			}, {
				"id": "2",
				"name": "Tdak"
			}];

			//dummy data locaksi nyeri
			$scope.listLokasiNyeri = [{
				"id": "1",
				"name": "lokasi 1"
			}, {
				"id": "2",
				"name": "lokasi 2"
			}, {
				"id": "3",
				"name": "lokasi 3"
			}, {
				"id": "4",
				"name": "lokasi 4"
			}, {
				"id": "5",
				"name": "lokasi 5"
			}, ];

			$scope.item = {};
			$scope.item.lokasiNyeri = {
				"id": "1",
				"name": "lokasi 1"
			};

			//dummy data list tipe nyeri
			$scope.listTipeNyeri = [{
				"id": "1",
				"name": "Terus Menerus"
			}, {
				"id": "2",
				"name": "Hilang Timbul"
			}, {
				"id": "4",
				"name": "Tipe Nyeri 1"
			}, {
				"id": "5",
				"name": "Tipe Nyeri 2"
			}, {
				"id": "6",
				"name": "Tipe Nyeri 3"
			}, {
				"id": "4",
				"name": "Tipe Nyeri 1"
			}, {
				"id": "5",
				"name": "Tipe Nyeri 2"
			}, {
				"id": "6",
				"name": "Tipe Nyeri 3"
			}, {
				"id": "4",
				"name": "Tipe Nyeri 1"
			}, {
				"id": "5",
				"name": "Tipe Nyeri 2"
			}, {
				"id": "6",
				"name": "Tipe Nyeri 3"
			}, {
				"id": "4",
				"name": "Tipe Nyeri 1"
			}, {
				"id": "5",
				"name": "Tipe Nyeri 2"
			}, {
				"id": "6",
				"name": "Tipe Nyeri 3"
			}, {
				"id": "7",
				"name": "Tipe Nyeri 4"
			}];

			//dummy data kareteristik nyeri
			$scope.listKaraterisitikNyeri = [{
				"id": "1",
				"name": "Terbakar"
			}, {
				"id": "1",
				"name": "Tertekan"
			}, {
				"id": "1",
				"name": "Kram"
			}, {
				"id": "1",
				"name": "Tertusuk"
			}, {
				"id": "1",
				"name": "Berat"
			}, {
				"id": "1",
				"name": "Tumpul"
			}, ];

			//dummy data penaruh nyeri
			$scope.listPengaruhNyeri = [{
				"id": "1",
				"name": "Tidur"
			}, {
				"id": "1",
				"name": "Emosi"
			}, {
				"id": "1",
				"name": "Aktifitas Fisi"
			}, {
				"id": "1",
				"name": "Nafsu Makan"
			}, {
				"id": "1",
				"name": "Konsentasi"
			}, {
				"id": "1",
				"name": "Tidur"
			}, ];

			//dummy data list skrining gizi
			$scope.listDataSkriningGizi = [{
				"id": "1",
				"deskripsi": "Apakah Pasien memiliki status nutrisi kurang atau buruk secara klinis? (anak kurus/sangat kurus, mata cekung, wajah tampak 'tua'. edema, rambut tipis dan jarang, otot lengan dan paha tipis, iga gambang, perut kempes, bokong tipis dan kisut"
			}, {
				"id": "2",
				"deskripsi": "Apakah terdapat penurunan berat badan tidak naik selama 3 bulan terakhir? Jika ibu pasien menjawab tidak tahu, dianggap jawaban 'ya' (1)"
			}, {
				"id": "3",
				"deskripsi": "Apakah terdapat SALAH SATU dari kondisi berikut? Diare profuse (>5x/hari) dan atau muntah (>3x/hari) Asupan makanan berkurang selama 1 minggu terakhir"
			}, {
				"id": "4",
				"deskripsi": "Apakah terdapat penyakit dasar atau keadaan yang mengakibatkan pasien beresiko mengalami malnutrisi (lihat tabel dibawah) ?"
			}];


		}
	]);
});