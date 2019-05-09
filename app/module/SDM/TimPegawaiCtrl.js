define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TimPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','RekamDataPegawai','JenisHonor','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,RekamDataPegawai,JenisHonor,ManageSdm) {
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
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			 
			 $scope.isNama = [
				{"id": "1","status": "andi"}, 
				{"id": "2","status":"rudi"}, 
				{"id": "3", "status": "sdad"}
				
			]
			
			$scope.dataListPengajuan = new kendo.data.DataSource({
                data: [
				{
				  "noUsulanPermintaan"	: "001",
				  "pengendali"          :"bnbvvhj"	,
				  "tanggal"             :"gghgh",
				}
				
				],
                editable: true,
                serverPaging: true
            });
			
			
			RekamDataPegawai.getOrderList("service/list-generic/?view=RekamDataPegawai&select=*", true).then(function(dat){
				$scope.ListRekamDataPegawai = dat.data;
		
				});	


			JenisHonor.getOrderList("service/list-generic/?view=JenisHonor&select=*", true).then(function(dat){
				$scope.ListJenisHonor = dat.data;
		
				});		

			$scope.columnUsulanPermintaanBarangJasa= [{
				"field": "noUsulanPermintaan",
				"title": "Nama",
				"width": "150px",
				
			}, {
				"field": "tanggal",
				"title": "Golongan",
				"width": "150px"
			}, {
				"field": "pengendali",
				"title": "Nama Tim",
				"width": "250px",
				
				}, {
				"field": "pengendali",
				"title": "Jabatan",
				"width": "250px",
				
			}, {
				"field": "pengendali",
				"title": "Honor Tim Kotor",
				"width": "250px"
			}, {
				"field": "tanggal",
				"title": "PPH",
				"width": "150px"	
			}, {
				"field": "tanggal",
				"title": "Honor Tim Bersih",
				"width": "150px"	
				
			}];

			
			
			
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
		
			

			
			$scope.Save = function() {
						
			  
             ManageSdm.saveTimPegawai(ModelItem.beforePost($scope.item)).then(function (e) {
				 debugger;
                  $scope.item= {};
                   init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});