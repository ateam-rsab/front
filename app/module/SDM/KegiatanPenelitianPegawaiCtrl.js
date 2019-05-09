define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KegiatanPenelitianPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','InstitusiPendidikan','JenisSantunanService',
		function($rootScope, $scope, ModelItem,$state,InstitusiPendidikan,JenisSantunanService) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});
			
			 $scope.pindah = function(){
				 
				$state.go("RekamDataPegawai");
				 
			 }
			 
			  $scope.Listketerangan = [{
					"id": 1,
					"kode": "1",
					"keterangan": "KTP"
				},{"id": 2,
					"kode": "2",
					"keterangan": "Kartu Mahasiswa"
				},{
					"id": 3,
					"kode": "3",
					"keterangan": "CV"
					
				},{
					"id": 4,
					"kode": "4",
					"keterangan": "Ethical Clearance"
				},{
					"id": 4,
					"kode": "4",
					"keterangan": "Proposal Penelitian"	
				},{
					"id": 5,
					"kode": "5",
					"keterangan": "Kuesioner Penelitian"		
					
					
					
				}

			];
			
			//List bantuan dana
			$scope.columnDaftarBantuan = [
				 {
					"field": "no",
					"title": "Tahap Ke- "					 
				 },
				 {
				 	"field": "tahap",
				 	"title": " Jumlah Bantuan "				 	 
				 },
				 {
				 	"field": "noUyhd",
				 	"title": "No UYHD"				 	 
				},
				 {
				 	"field": "jumlahSPJ",
				 	"title": "Jumlah SPJ"				 	 
				},
				 {
				 	"field": "tanggalSPJ",
				 	"title": "Tanggal SPJ"				 	 
				}
			];
			 InstitusiPendidikan.getOrderList("service/list-generic/?view=InstitusiPendidikan&select=*", true).then(function(dat){
				$scope.ListInstitusiPendidikan = dat.data;
		
				});		
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			 
			 
			 
			 
			   $scope.Listpublikasi = [{
					"id": 1,
					"kode": "1",
					"keterangan": "Ya"
				},{"id": 2,
					"kode": "2",
					"keterangan": "Tidak"
				
					
					
					
				}

			];
			
			
			 InstitusiPendidikan.getOrderList("service/list-generic/?view=InstitusiPendidikan&select=*", true).then(function(dat){
				$scope.ListInstitusiPendidikan = dat.data;
		
				});		
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			
			
			$scope.daftarJenisBahan = new kendo.data.DataSource({
			data: [
					{ 
						"kodeJenis":"BHN001",
						"JenisBahan":"Aldet"
					},
					{ 
						"kodeJenis":"BHN002",
						"JenisBahan":"Laudet"
					},
					{ 
						"kodeJenis":"BHN003",
						"JenisBahan":"MC. Bleach"
					},
					{ 
						"kodeJenis":"BHN004",
						"JenisBahan":"OXO. Bleach"
					},
					{ 
						"kodeJenis":"BHN005",
						"JenisBahan":"E. 951"
					},
					{ 
						"kodeJenis":"BHN006",
						"JenisBahan":"M. Saur"
					},
					{ 
						"kodeJenis":"BHN007",
						"JenisBahan":"M. Soft"
					}

				]
			});
			
			
			$scope.daftarBahanLinen = new kendo.data.DataSource({
				data:[
					{ 
						"kodeJenis":"BHN001",
						"JenisBahan":"Aldet"
					},
					{ 
						"kodeJenis":"BHN002",
						"JenisBahan":"Laudet"
					},
					{ 
						"kodeJenis":"BHN003",
						"JenisBahan":"MC. Bleach"
					},
					{ 
						"kodeJenis":"BHN004",
						"JenisBahan":"OXO. Bleach"
					},
					{ 
						"kodeJenis":"BHN005",
						"JenisBahan":"E. 951"
					},
					{ 
						"kodeJenis":"BHN006",
						"JenisBahan":"M. Saur"
					},
					{ 
						"kodeJenis":"BHN007",
						"JenisBahan":"M. Soft"
					}

				]
			});
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "No Anggota",
				"width": "5%"
			},
			{
				"field": "nama",
				"title": "Tanggal",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Nama",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Jenis Kelamin",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Tempat dan Tanggal Lahir",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Alamat",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Asal Instansi",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "No HP",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Email",
				"width": "20%"
			}
			];
		
			

			
			$scope.Save = function () {
                // debugger;
				var data = {
					"nim": $scope.item.nim,
					"namaPeneliti":$scope.item.namaPeneliti,
					"periodePengajaran":$scope.item.periodePengajaran,
					"institusiPendidikan":$scope.item.institusiPendidikan,
					"jurusanPeminatan":$scope.item.jurusanPeminatan,
					"fakultas": $scope.item.fakultas,
					"judulPeneltian":$scope.item.judulPenelitian,
					"lokasiPenelitian":$scope.item.lokasiPenelitian,
					"tanggalMulai":$scope.item.tanggalMulai,
					"NamaPendamping":$scope.item.namaPendamping,
					"biayaPenelitian":$scope.item.biayaPenelitian,
					"tanggalPembayaran":$scope.item.tanggalPembayaran,
					"nomorKwitansi":$scope.item.nomorKwitansi,
					"tanggalSelesai":$scope.item.tanggalSelesai,
					"tanggalPresentasi":$scope.item.tanggalPresentasi,
					"laporanPenelitian":$scope.item.laporanPenelitian
					
	                		
				};				
                JenisSantunanService.saveJenisSantunan(ModelItem.beforePost(data), "baku-mutu/save-baku-mutu/").then(
					function (e) {
						$scope.item = {};
					});
            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});