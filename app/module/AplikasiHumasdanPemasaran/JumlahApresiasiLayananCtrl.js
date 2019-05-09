define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('JumlahApresiasiLayananCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','JumlahApresiasiLayanan','$state',
        function($rootScope, $scope, ModelItem,DateHelper,JumlahApresiasiLayanan,$state) {
		$scope.item = {};
		 $scope.now = new Date();
		 $scope.item.tanggalPengajuanAwal = $scope.now;
		 $scope.item.tanggalPengajuanAhir = $scope.now;
		 $scope.mainGridOptions = {
                pageable: true,
                scrollable: true,
                selectable: "row"
            };


			$scope.columndataMasterDataPerusahaan= [
			{
			  "field" : "no",
			  "title" : "<h3 align=center>No<h3>",
			  "width" : "20px",
			  "attributes" : { style:"text-align:center"}
			},
			{
			"field": "apresiasi",
			"title": "<h3 align=center>Apresiasi<h3>",
			"width": "100px"
			},
			{
		    "field": "Puas",
			"title": "<h3 align=center>Puas<h3>",
			"width": "100px"
			},{
		    "field": "KurangPuas",
			"title": "<h3 align=center>Kurang Puas<h3>",
			"width": "100px"
			},{
		    "field": "TidakPuas",
			"title": "<h3 align=center>Tidak Puas<h3>",
			"width": "100px"
				
			
		    }];
			
			
		$scope.batal = function()
			{
			  $scope.item= {};
			}	

		 $scope.Apresiasi = function(){
		 	$state.go('ApresiasiLayanan');
		 }

		$scope.cari = function(){
			var nomor = 1;
			var awal  =  DateHelper.getPeriodeFormatted($scope.item.tanggalPengajuanAwal);
			var akhir = DateHelper.getPeriodeFormatted($scope.item.tanggalPengajuanAhir); 
            JumlahApresiasiLayanan.getOrderList("apresiasi-atas-layanan/rekap-apresiasi?from="+awal+"&to="+akhir).then(function(dat){
			$scope.sourceOrder = dat.data.data;
			$scope.sourceOrder = [];
			$scope.sourceOrder.push(dat.data.data)	;
			for (var i=0; i<$scope.sourceOrder.length;i++){			
					$scope.sourceOrder[i].no = nomor+++".";
					$scope.sourceOrder[i].apresiasi= "Jumlah"  ;
			 }
		  });
	   }
	   $scope.cari();
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}
	]);
});