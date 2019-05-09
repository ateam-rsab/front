define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PegawaiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
		function($rootScope, $scope, ModelItem, $state,GetPostOnPengkajianAwal) {
			$scope.title = "Tanda Vital";
			
			
			 $scope.isShowForm = false;
			
			$scope.isAdaGangguan = false;
			$scope.$watch('item.Genetalia', function(newValue, oldValue) {
			  if(newValue == "Ya")
			  {
			  	$scope.isAdaGangguan = true;
			  }
			  else
			  {
			  	$scope.isAdaGangguan = false;
			  }
			});
			
			
		
			
						
			$scope.item = {};
			ModelItem.get("PatalogiAnatomik").then(function(data) {
				$scope.item = data;

				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});
			
			
			$scope.dataLembarPengobatan = new kendo.data.DataSource({
			data: []
			});
			$scope.columnLembarPengobatan = [{
				"field": "id",
				"title": "no",
				 width: "90px"
			}, {
				"field": "jenis",
				"title": "Jenis Pegawai",
                  width: "150px"
			}, {
				"field": "gelar",
				"title": "Gelar"
			}, {
				"field": "namalengkap",
				"title": "Nama Lengkap",
				     width: "150px"
			}, {
				"field": "jk",
				"title": "Jenis Kelamin",
				     width: "150px"
			}, {
				"field": "tempatlahir",
				"title": "Tempat Lahir",
				     width: "150px"
			}, {
				"field": "tanggallahir",
				"title": "Tanggal Lahir",
                     width: "150px"				
			}, {
				"field": "tanggalmasuk",
				"title": "Tanggal Masuk",
				     width: "150px"
			}, {
				"field": "pangkat",
				"title": "pangkat",
				     width: "150px"
			}, {
				"field": "pendidikan",
				"title": "Kualifikasi Pendidikan",
     width: "150px"				
			}, {
				"field": "jabatan",
				"title": "Jabatan",
				     width: "150px"
			}, {
				"field": "nip",
				"title": "NIP",
     width: "150px"				
			}, {
				"field": "suku",
				"title": "Suku"	,
     width: "150px"				
		    },{
		        command: { text: "Hapus", click: $scope.removeRiwayatPenyakitOrObat },
		        title: "&nbsp;",
		        width: "110px"
		    
				
			}];
			
			
			
					$scope.addDataLembarPengobatan = function() {
						var xx = {
							'id'  :$scope.item.id,
							'jenis':$scope.item.JenisPegawai.name,
							'suku' :$scope.item.Suku.suku,
							'gelar' :$scope.item.Gelar.name,
							'namalengkap' :$scope.item.NamaLengkap,
							'jk' :$scope.item.jk.jenisKelamin,
							'tempatlahir' :$scope.item.TempatLahir,
							'tanggallahir' :$scope.item.TanggalLahir,
							'tanggalmasuk' :$scope.item.TanggalMasuk,
							'jabatan':$scope.item.Jabatan.namaJabatan,
							'pendidikan':$scope.item.Kualifikasi.pendidikan,
							'nip':$scope.item.Nip,
							'pangkat':$scope.item.Pangkat.name
							
							
						}
						
				$scope.dataLembarPengobatan.add(xx);
				
			
			}
			
			
				
			
			$scope.removeRiwayatKelahiran = function() {

				$scope.dataRiwayatKelahiran.data([]);
			};
			
				$scope.sourceGelar = [{
					"id": 1,
					"kode": "1",
					"name": "Sarjana"
				}, {
					"id": 2,
					"kode": "2",
					"name": "Dokter"
				}, {
					"id": 3,
					"kode": "3",
					"name": "Profesor"
				}

			];
			
			
				$scope.sourcePangkat = [{
					"id": 1,
					"kode": "1",
					"name": "Jendral"
				}, {
					"id": 2,
					"kode": "2",
					"name": "Mayor"
				}

			];
			
			
			$scope.sourceJenisPegawai = [{
					"id": 1,
					"kode": "1",
					"name": "Tetap"
				}, {
					"id": 2,
					"kode": "2",
					"name": "Tidak Tetap"
				}

			];
			
			
			$scope.sourceTipe = [{
					"id": 1,
					"kode": "1",
					"name": "Tetap"
				}, {
					"id": 2,
					"kode": "2",
					"name": "Tidak Tetap"
				}

			];
			
			$scope.sourceJenjang = [{
					"id": 1,
					"kode": "1",
					"name": "kontrak"
				}, {
					"id": 2,
					"kode": "2",
					"name": "tetap"
				}

			];
			
			$scope.sourceRuang = [{
					"id": 1,
					"kode": "1",
					"name": "lantai 1"
				}, {
					"id": 2,
					"kode": "2",
					"name": "lantai 2"
				}

			];
			
			$scope.sourceAtasan = [{
					"id": 1,
					"kode": "1",
					"name": "punya"
				}, {
					"id": 2,
					"kode": "2",
					"name": "tidak punya"
				}

			];
			
			
				$scope.sourceRhesus = [{
					"id": 1,
					"kode": "1",
					"name": "positif"
				}, {
					"id": 2,
					"kode": "2",
					"name": "negatif"
				}

			];
			
			$scope.listJenisPegawai = new kendo.data.DataSource({
				data: $scope.sourceJenisPegawai
			});
			
			$scope.listGelar = new kendo.data.DataSource({
				data: $scope.sourceGelar
			});
			
			$scope.listPangkat = new kendo.data.DataSource({
				data: $scope.sourcePangkat
			});
			
			$scope.listJenjang = new kendo.data.DataSource({
				data: $scope.sourceJenjang
			});
			
			$scope.listRuang = new kendo.data.DataSource({
				data: $scope.sourceRuang
			});
			
			$scope.listAtasan = new kendo.data.DataSource({
				data: $scope.sourceAtasan
			});
			
			$scope.listRhesus = new kendo.data.DataSource({
				data: $scope.sourceRhesus
			});
			
			
			
			$scope.listTipe = new kendo.data.DataSource({
				data: $scope.sourceTipe
			});
			
			
			$scope.listPharmasi = new kendo.data.DataSource({
				data: $scope.sourcePharmasi
			});
			
			ModelItem.getDataDummyGeneric("Suku", false).then(function(data) {
				$scope.listSuku = data;
			})
			
			ModelItem.getDataDummyGeneric("Agama", false).then(function(data) {
				$scope.listAgama = data;
			})
			
			ModelItem.getDataDummyGeneric("GolonganDarah", false).then(function(data) {
				$scope.listgoldar = data;
			})
			
			ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
				$scope.listkelamin = data;
			})
			
			ModelItem.getDataDummyGeneric("Jabatan", false).then(function(data) {
				$scope.listjabatan = data;
			})
			
			ModelItem.getDataDummyGeneric("Negara", false).then(function(data) {
				$scope.listNegara = data;
			})
			
			
			ModelItem.getDataDummyGeneric("Pendidikan", false).then(function(data) {
				$scope.listPendidikan = data;
			})
			
			
			ModelItem.getDataDummyGeneric("Eselon", false).then(function(data) {
				$scope.listEselon = data;
			})
			
			
				ModelItem.getDataDummyGeneric("StatusPerkawinan", false).then(function(data) {
				$scope.listStatusPerkawinan = data;
			})
			
			
			
			
			
			
			
			
			
			
			
			
			
			

			
			
			
			
		
			
			$scope.now = new Date();
			
			$scope.Save = function() {
				$scope.item.dataRiwayat = $scope.datariwayat;

				if($scope.item.RiwayatDalamKeluarga == "Tidak")
				{
					$scope.item.PenyakitMayor = "";
				}  

				var dataVO = delete $scope.item.attributes;
				console.log(JSON.stringify($scope.item));

				//kirim data inputan dari frontend ke server
				GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/PatologiAnatomik")
				.then(
					function(res) {

					},
					function(err) {
						/*alert(err.data);*/
					})
			};
			
			
			

		}
	]);
});