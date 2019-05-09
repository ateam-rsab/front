define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringBiayaCtrl', ['$q', '$rootScope', '$scope', 'ManageUC','DataHelper','$state',
		function($q, $rootScope, $scope, manageUC,stringHelper,$state) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item ={}

			$scope.item.tanggalAwal = $scope.now;
			$scope.item.tanggalAkhir = $scope.now;

			LoadCombo();

			function LoadCombo(){
				manageUC.getDataTableMaster("unit-cost/table-master?jenis=departemen").then(function(data){
	           		$scope.listinstalasi=data;
	        	});
	        	manageUC.getDataTableMaster("unit-cost/table-master?jenis=ruangan").then(function(data){
	           		$scope.listnamaRuangan=data;
	        	});
	        	manageUC.getDataTableMaster("unit-cost/table-master?jenis=produk").then(function(data){
	           		$scope.listnamaLayanan=data;
	        	});
    		};
            $scope.produkByRuangan =function(){
                manageUC.getDataTableMaster("unit-cost/table-master?jenis=produk&byRuangan="+$scope.item.ruangan.id).then(function(data){
                    $scope.listnamaLayanan = data;
                });
            }
            $scope.ruanganByDepartemen =function(){
                manageUC.getDataTableMaster("unit-cost/table-master?jenis=ruangan&byDepartemen="+$scope.item.instalasi.id).then(function(data){
                    $scope.listnamaRuangan = data;
                });
            }
    		$scope.SearchData = function(){
    			 
    			 
    			//{"tanggalAwal":"2017-03-16T04:53:01.503Z","tanggalAkhir":"2017-03-16T04:53:01.503Z","instalasi":{"id":28,"namaDepartemen":"Instalasi Rehabilitas Medik"},"ruangan":{"id":18,"namaRuangan":"Klinik Alamanda"},"Layanan":{"idProduk":395,"namaProduk":"Karcis"}}
    			var tanggalAkhir=moment($scope.item.tanggalAkhir).format('YYYY-MM-DD');
    			var tanggalAwal=moment($scope.item.tanggalAwal).format('YYYY-MM-DD');
    			var idRuangan= stringHelper.isUndefinedObjectField($scope.item.ruangan);
    			var idLayanan= stringHelper.isUndefinedObjectField($scope.item.Layanan);
    			var idInstalasi= stringHelper.isUndefinedObjectField($scope.item.instalasi);
    			 
    			manageUC.getDataTableMaster("unit-cost/monitoring-tindakan-by-unitcost?idRuangan="+idRuangan
    				+"&idProduk="+idLayanan
    				+"&idDepartemen="+idInstalasi
    				+"&tglawal="+tanggalAwal
    				+"&tglAkhir="+tanggalAkhir).then(function(data){
	           		 $scope.dataDaftarBiaya = data
	        	});
    			// manageUC.getDataTableMaster("unit-cost/detail-unit-cost?prid="+idLayanan
    			// 	+"&ruid="+idRuangan
    			// 	+"&depid="+idInstalasi).then(function(data){
	      //      		 $scope.datadetails = data
	      //   	});
    		}
    		$scope.SearchData();
			$scope.details = function(){
				$state.go('DetailBiaya')
			}
			 
			$scope.columnDaftarBiaya = [
			{
				"field": "namaruangan",
				"title": "Nama Ruangan"
			},
			{
				"field": "namaproduk",
				"title": "Nama Kegiatan"
			},
			{
				"field": "direct",
				"title": "Direct",
				"template": "<span class='style-right'>{{formatRupiah('#: direct #', '')}}</span>"
			},
			{
				"field": "hargasatuan",
				"title": "Tarif",
				"template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
			},
			{
				"field": "jml",
				"title": "Qty Kegiatan",
				"template": "<span class='style-right'>{{formatRupiah('#: jml #', '')}}</span>"
			},
			{
				"field": "totaluc",
				"title": "Total Unit Cost",
				"template": "<span class='style-right'>{{formatRupiah('#: totaluc #', '')}}</span>"
			},
			{
				"field": "totaljual",
				"title": "Total",
				"template": "<span class='style-right'>{{formatRupiah('#: totaljual #', '')}}</span>"
			},
			{
				"field": "selisih",
				"title": "+/-",
				"template": "<span class='style-right'>{{formatRupiah('#: selisih #', '')}}</span>"
			}
			];

			$scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
		
		}
		]);
});