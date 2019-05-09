define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('DaftarKeluhanPelangganBaru', ['$rootScope', '$scope', 'ModelItem','DateHelper','InformasiDokter','InformasiRuangan','$state',
        function($rootScope, $scope, ModelItem,DateHelper,InformasiDokter,InformasiRuangan,$state) {
				$scope.item = {};
		
		
			    InformasiDokter.getOrderList("pegawai/get-all-dokter2", true).then(function(dat){
			     $scope.ListDataDokter = dat.data;
				});
				
				InformasiRuangan.getOrderList("pegawai/get-all-dokter2", true).then(function(dat){
					$scope.ListRuangan = dat.data;
				});
				
				$scope.$watch("item.dokter",function(){
					if ( $scope.item.dokter != undefined ){$scope.tampil=true; }
				});
		
				$scope.columndataMasterDataPerusahaan= [{
				   "field": "pendidikan.namaPendidikan",
				   "title": "Pendidikan</h3>",
				   "width": "100px"
				},{
				   "field": "penghargaan",
				   "title": "Penghargaan</h3>",
				   "width": "100px"			
			    }];
				
			
		       $scope.columndataMasterDataJadwal= [{
				"field": "ruangan.namaRuangan",
				"title": "Ruangan",
				"width": "300px"
				},{
					"field": "tanggalJadwal",
				"title": "Hari Praktek",
				"width": "300px"
				},{
			    "field": "jadwalPraktek.jamPraktek",
				"title": "Jam Praktek",
				"width": "300px"
		      }];
			
			
			   $scope.batal = function(){
			  		$scope.item= {};
			   }


		       $scope.cari = function(){
	            InformasiDokter.getOrderList("pegawai/get-pegawai-by-id/"+$scope.item.dokter.id+"/").then(function(dat){
			   	    $scope.sourceOrder = [];
		            $scope.sourceOrder.push(dat.data.data.data)	;
		            for (var i=0; i<$scope.sourceOrder.length;i++){			
						$scope.sourceOrder[i].penghargaan= "SATYALANCANA KARYA SATYA XXX TAHUN"  ;
					}
		     	});	
			    
			    InformasiRuangan.getOrderList("jadwalDokter/get-jadwal-dokter-by-id?id="+$scope.item.dokter.id).then(function(dat){
					$scope.sourceOrde = dat.data.data.data;
					debugger;
					$scope.sourceOrde.forEach(function(data){
						var date = new Date(data.tanggalJadwal);
						data.tanggalJadwal = DateHelper.DescDay(date);

					 })	
			     });			
		 	}
	
		    $scope.Save = function() {
             	ManageSarpras.saveDataPerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function (e) {
                });
            };
		
		}
	]);
});