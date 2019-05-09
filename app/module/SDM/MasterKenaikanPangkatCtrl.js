define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKenaikanPangkatCtrl', ['$rootScope', '$scope', 'ModelItem','$state','HubunganKeluarga','NamaAsuransi','RekamDataPegawai','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,HubunganKeluarga,NamaAsuransi,RekamDataPegawai,ManageSdm) {
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
			 
			  $scope.ListStatusPerkawinan = [{
					"id": 1,
					"kode": "1",
					"name": "Honor"
				},{
					"id": 2,
					"kode": "2",
					"name": "Konsumsi"
				},{
					"id": 3,
					"kode": "3",
					"name": "Seminar Kit"
				},{
					"id": 4,
					"kode": "4",
					"name": "Dokumentasi"
				},{
					"id": 5,
					"kode": "5",
					"name": "Modul"
				},{
					"id": 6,
					"kode": "6",
					"name": "Materi"
				}

			];
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
				data:[]			
			});
			
			$scope.columnLaporanUjiNaker = [{
				field: "noPks",
				title: "Nomor SK Menpan", 
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "namaPerusahaan",
				title: "Unsur",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "alamat",
				title: "Persentase",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "contactPerson",
				title: "Jabatan",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "jumlahKaryawan",
				title: "Golongan",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "jumlahKaryawan",
				title: "Angka Kredit",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			}];
			
			
			
			
				$scope.columnLaporanUjiHasil = [
			{
				"field": "nokartu",
				"title": "Nomor SK Menpan ",
				"width": "30%"
			},
			{
				"field": "hubkeluarga.hubunganKeluarga",
				"title": "Unsur",
				"width": "20%"
			},
			{
				"field": "hubkeluarga.hubunganKeluarga",
				"title": "Persentase",
				"width": "20%"
			},
			{
				"field": "hubkeluarga.hubunganKeluarga",
				"title": "Jabatan",
				"width": "20%"
			},
			{
				"field": "hubkeluarga.hubunganKeluarga",
				"title": "Golongan",
				"width": "20%"
			},
			{
				"field": "hubkeluarga.hubunganKeluarga",
				"title": "Angka Kredit",
				"width": "20%"
			},
			{
				"field": "hubkeluarga.hubunganKeluarga",
				"title": "Status Aktif",
				"width": "20%"
			}
			];
		
		HubunganKeluarga.getOrderList("service/list-generic/?view=HubunganKeluarga&select=*", true).then(function(dat){
				$scope.ListHubunganKeluarga = dat.data;
		
				});	
				
		RekamDataPegawai.getOrderList("service/list-generic/?view=RekamDataPegawai&select=*", true).then(function(dat){
				$scope.ListRekamDataPegawai = dat.data;
		
				});			
				
		NamaAsuransi.getOrderList("service/list-generic/?view=NamaAsuransi&select=*", true).then(function(dat){
				$scope.ListNamaAsuransi = dat.data;
		
				});			
			
$scope.addDataBahanLinen = function() {

				var tempDataBahanLinen = {
					"nokartu": $scope.item.nomorKartu,
					"hubkeluarga": $scope.item.hubunganKeluarga
					
				
				}

				$scope.daftarBahanLinen.add(tempDataBahanLinen);
				$scope.item.nomorKartu="",
				$scope.item.hubunganKeluarga=""
			
			}
			
			
			$scope.Save = function () {
	          				var detail = $scope.daftarBahanLinen._data;
				var i = 0;
				var detailHVA = [];
				detail.forEach(function (data) {
					var data = {
						
						"hubunganKeluarga":{
						"id":data.hubkeluarga.id
					},
						
					
						
						"nomorkartu": data.nokartu
						
						
					
						
					}
					detailHVA[i] = data;
					i++;
				})
		var data1 = {
				
			    "namaPegawai":$scope.item.namaPegawai,
				"nip":$scope.item.nip,
				"nomorpolis":$scope.item.nomorPolis,
				"tanggalLahir":new Date($scope.item.tanggalLahir).getTime(),
				"namaAsuransi":$scope.item.namaAsuransi,
				"BPJSNaker":$scope.item.nomorBPJS,
			//	"hubunganKeluarga": detailHVA
				
				
		}
				console.log(JSON.stringify(data1));
                ManageSdm.saveAsuransiNaker(data1, "sdm/save-asuransi-naker").then(function (e) {
					console.log(JSON.stringify(e.data));
					$scope.Back();
                });
				
				$scope.daftarBahanLinen = [];
			};
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});