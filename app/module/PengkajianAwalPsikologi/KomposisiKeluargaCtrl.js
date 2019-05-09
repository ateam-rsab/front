define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomposisiKeluargaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("PengkajianAwalPsikologi/KomposisiKeluarga").then(function(data) {
				$scope.item = data;
				$scope.title = "Komposisi Keluarga";
				$scope.now = new Date();
				$scope.item = data;
				$scope.tempItem = {};
				$scope.dateTimePickerOptions = {}
				$scope.now = new Date();
				$scope.DaftarKomposisiKeluarga = new kendo.data.DataSource({
						data: []
			});
			
			$scope.Selanjutnya = function() {
				modelItem.set("Psikologi", $scope.item);
					$state.go('Psikologi.PohonKeluarga');
			};
			$scope.Back = function() {
				history.back();
			}

			$scope.columnKomposisiKeluarga = [{
				"field":"Nomor",
				"title":"NO",
				width : "50px"
			},{
				"field": "NamaGrid",
				"title": "Nama"	
			}, {
				"field": "JK",
				"title": "Jenis Kelamin"

			}, {
				"field": "UmurGrid",
				"title": "Umur",
				width : "80px"
			}, {
				"field": "PekerjaanGrid",
				"title": "Pekerjaan / Sekolah"
			}, {
				"field": "KeteranganGrid",
				"title": "Keterangan"
			}, {
		        command: { text: "Hapus", click: $scope.removeDaftarKomposisiKeluarga },
		        title: "&nbsp;",
		        width: "110px"
		    }];




		    $scope.dataVOloaded = true; 

			}, function errorCallBack(err) {});

		$scope.addDaftarKomposisiKeluarga = function() {
			
				var tempDaftarKomposisiKeluarga = {
					"Nomor":$scope.DaftarKomposisiKeluarga._data.length+1,
					"NamaGrid": $scope.item.Nama,
					"JK" : $scope.item.JenisKelamin,
					"UmurGrid" :$scope.item.Umur,
					"PekerjaanGrid": $scope.item.Pekerjaan,
					"KeteranganGrid": $scope.item.Keterangan
					
				}

				$scope.DaftarKomposisiKeluarga.add(tempDaftarKomposisiKeluarga);
			}

			$scope.removeDaftarKomposisiKeluarga = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempDaftarKomposisiKeluarga== $scope.DaftarKomposisiKeluarga
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);
			};

			$scope.$watch('item.Pekerjaan', function(newValue, oldValue) {
				if (newValue == "Sekolah") {
					$scope.isSekolah = true;
				} else {
					$scope.isSekolah = false;
					$scope.tempItem = {};
					$scope.Sekolah = {};
				}
			});
		

		ModelItem.getDataDummyGeneric("PengkajianAwalPsikologi/JenisKelamin", false).then(function(data) {
				$scope.listDataJenisKelamin = data;
			})

		ModelItem.getDataDummyGeneric("PengkajianAwalPsikologi/Pekerjaan", false).then(function(data) {
				$scope.listDataPekerjaan = data;
			})
		ModelItem.getDataDummyGeneric("PengkajianAwalPsikologi/Sekolah", true).then(function(data) {
				$scope.listSekolah = data;
			})
		}
	]);
});