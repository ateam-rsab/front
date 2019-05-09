define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanPnsCtrl', ['$rootScope', '$scope', 'ModelItem','$state','DateHelper',
		function($rootScope, $scope, ModelItem,$state,DateHelper) {
			$scope.item = {};
			ModelItem.get("PerencanaanDanPemasaran/analisaSwot").then(function(data) {
				$scope.item = data;
				$scope.item.total = 0;
				$scope.no = 1;
				$scope.now = new Date();
				$scope.item.awal= new Date($scope.now).getFullYear();
				$scope.item.akhir= new Date($scope.now).getFullYear();
				
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
          		$scope.JenisAnalisa = false;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
		
			$scope.no=1;
			
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});
			
			
			
			 $scope.pindah = function(){
				 
				$state.go("RekamDataPegawai");
				 
			 }
			 
			 
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
				"title": "NIP",
				"width": "10%"
			},
			{
				"field": "nama",
				"title": "Nama Pegawai",
				"width": "20%"
			},
			{
				field: "satuan",
				title: "Pangkat",
				width: "20%",
				headerAttributes: { style: "text-align : center"},
				columns: [
				{
					field: "tanggalAwal",
					title: "Golongan",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "TMT",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				}]
			},
			{
				field: "satuan",
				title: "Jabatan",
				width: "20%",
				headerAttributes: { style: "text-align : center"},
				columns: [
				{
					field: "tanggalAwal",
					title: "Nama",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "TMT",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				}]
			},
			{
				"field": "nama",
				"title": "Eselon",
				"width": "20%"
			},
			{
				field: "satuan",
				title: "Masa Kerja",
				width: "20%",
				headerAttributes: { style: "text-align : center"},
				columns: [
				{
					field: "tanggalAwal",
					title: "Tahun",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "Bulan",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				}]
			},
			{
				field: "satuan",
				title: "Usia",
				width: "20%",
				headerAttributes: { style: "text-align : center"},
				columns: [
				{
					field: "tanggalAwal",
					title: "Tahun",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "Bulan",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				}]
			},
				{
				field: "satuan",
				title: "Pendidikan",
				width: "20%",
				headerAttributes: { style: "text-align : center"},
				columns: [
				{
					field: "tanggalAwal",
					title: "Nama",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "Tahun Lulus",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "Tingkat Ijazah",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				}]
			}
			];

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});