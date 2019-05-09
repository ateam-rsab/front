define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('anggaranCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','DataAnggaran','TampilDataAnggaran',
        function($rootScope, $scope, ModelItem,DateHelper,DataAnggaran,TampilDataAnggaran) {
		$scope.item = {};
		  $scope.now = new Date();
		$scope.item.tanggalPengajuanAwal=$scope.now;
			$scope.item.tanggalPengajuanAhir=$scope.now;
		
		DataAnggaran.getOrderList("service/list-generic/?view=Pengendali&select=*", true).then(function(dat){
			$scope.ListDataAnggaran = dat;
			
			
			
				});
				
				
		TampilDataAnggaran.getOrderList("anggaran/grid-detail-anggaran?tahun=2016&namaPengendali=&page=0&take=10&sort=&dir=asc").then(function(dat){
			debugger;
		$scope.sourceOrder = dat.data.data;
		$scope.ok = {
                dataBound: function () { }
            };

			$scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

			
			
			
			
		
		
		
		for (var i=0; i<$scope.sourceOrder.length;i++)
				{			
			
				if(i>0) 
				
					{
						
					$scope.sourceOrder[i].kegiatan= "1"  ;
				
					}
					else
					{
						
						$scope.sourceOrder[i].kegiatan= " "  ;	
						
						
					}
				}
		
		$scope.sourceOrder.forEach(function(data){
						var date = new Date(data.tanggalPengajuan);
						data.tanggalPengajuan = DateHelper.getTanggalFormatted(date);

					})
		
		debugger;
		
			
		
			
			
		
			
			
		});
		
			
			
	//define column untuk grid
//MasterLinen.getOrderList("service/list-generic/?view=JenisLinen&select=*").then(function(dat){
	//			$scope.sourceOrder = dat;
	//		});
			// $scope.dataSasaranStrategis = new kendo.data.DataSource({
			// 	data: [
			// 	{
			// 		"kodeSasaranStrategis": "001",
			// 		"sasaranStrategis": "Terpenuhinya SDM yang kompeten"
			// 	}
			// 	]
			// });

			$scope.columndataMasterDataPerusahaan= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "kegiatan",
			"title": "<h3 align = center>Kegiatan</h3>",
			"width": "300px"
		}, {
			"field": "kegiatanDetail",
			"title": "<h3 align = center>KegiatanDetail</h3>",
			"width": "300px"
				
		}, {
			"field": "namaKomponen",
			"title": "<h3 align = center>Komponen</h3>",
				"width": "300px"
				
		}, {
			"field": "sumberDana",
			"title": "<h3 align = center>Sumber Dana</h3>",
				"width": "300px"	
        }, {
			"field": "spesifikasi",
			"title": "<h3 align = center>Spesifikasi</h3>",
				"width": "300px"
		 }, {
			"field": "namaProduk",
			"title": "<h3 align = center>Nama Produk</h3>",
				"width": "300px"	
		 }, {
			"field": "tahunAnggaran",
			"title": "<h3 align = center>Tahun Anggaran</h3>",
				"width": "300px"

		 }, {
			"field": "tanggalPengajuan",
			"title": "<h3 align = center>Tanggal Pengajuan</h3>",
				"width": "300px"		
          }, {
			"field": "namaSatuan",
			"title": "<h3 align = center>Satuan</h3>",
				"width": "300px"	
				
		}, {
			"field": "volume",
			"title": "<h3 align = center>Volume</h3>",
				"width": "300px"		
        }, {
			"field": "jumlahBiaya",
			"title": "<h3 align = center>Jumlah Biaya</h3>",
				"width": "300px"						
					
		

				
				
				
        
				
			
            
				
			
		    }];
			
			
	//			var data1=[];
			
			
		//		$scope.item.sourceOrder = $scope.sourceOrder;
			
			
			
			
			
			
			
			
			
			
			
			
			
	//		anggaran/grid-detail-anggaran?tahun=2016&namaPengendali=Bagian&page=0&take=10&sort=&dir=asc&tanggalPengajuanAwal=2009-11-11&tanggalPengajuanAhir=2018-12-12
			

		//$scope.cari = function()
		//	{
		//	TampilDataAnggaran.getOrderList("anggaran/grid-detail-anggaran?tahun=2016&namaPengendali=Bagian&page=0&take=10&sort=&dir=asc&tanggalPengajuanAwal=2009-11-11&tanggalPengajuanAhir=2018-12-12" ).then(function(dat){
		//$scope.sourceOrder = dat.data.data;
	//		});	
	//		}
	
	$scope.batal = function()
			{
			  $scope.item= {};
			}
	
	
	
	$scope.cari = function()
	
	
	

			{
				var awal  =  DateHelper.getPeriodeFormatted($scope.item.tanggalPengajuanAwal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.tanggalPengajuanAhir);
		debugger;
			TampilDataAnggaran.getOrderList("anggaran/grid-detail-anggaran?tahun="+$scope.item.tahun+"&pengendaliId="+$scope.item.pengendali.id+"&tanggalPengajuanAwal="+awal+"&tanggalPengajuanAhir="+akhir).then(function(dat){
		$scope.sourceOrder = dat.data.data;
			});	
			}
		
	
	
		//http://localhost:9090/jasamedika-web/informasi-tarif-layanan/get-harga-netto-by-nama-produk?namaProduk="....."
		  $scope.Save = function() {
						
			  
            

            };
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}
	]);
});