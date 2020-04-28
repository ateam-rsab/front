define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SasaranMutuCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','ManageLogistikPhp','CacheHelper',
		function($rootScope, $scope, ModelItem, DateHelper,manageLogistikPhp,cacheHelper) {
			$scope.title = "Sasaran Mutu";
            $scope.dataVOloaded = true;
			$scope.item = {};
			$scope.now = new Date();

		LoadCache();
		function LoadCache(){
			manageLogistikPhp.getDataTableTransaksi("sasaranmutu/get-combo", false).then(function(data) {
				$scope.listUnitLayanan = data.data.ruangan;
				// $scope.listDokter = data.data.dokter;
			})
          	var chacePeriode = cacheHelper.get('SasaranMutuCtrl');
          	if(chacePeriode != undefined){
           //var arrPeriode = chacePeriode.split(':');
            	$scope.item.periodeAwal = new Date(chacePeriode[0]);
            	$scope.item.periodeAkhir = new Date(chacePeriode[1]);
           
            	LoadData()
        	}else{
           		$scope.item.periodeAwal = $scope.now;
           		$scope.item.periodeAkhir = $scope.now;
           		LoadData()
         	}
       	}
       	function LoadData(){
       		var ru =''
       		if ($scope.item.unitLayanan != undefined) {
       			ru = $scope.item.unitLayanan.id
       		}
       		var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
			var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
			manageLogistikPhp.getDataTableTransaksi("sasaranmutu/get-data-grid?tglAwal="+tglAwal+'&tglAkhir='+tglAkhir+'&ruanganfk='+ru, false).then(function(data) {
				$scope.dataGrid = data.data.data;
			})
			var chacePeriode ={ 0 : tglAwal ,
              1 : tglAkhir,
            }
			cacheHelper.set('SasaranMutuCtrl', chacePeriode);
       		
       	}
			
			$scope.columnGrid = [
				{
					"field": "noresep",
					"title": "Nomor Resep"
				}, {
					"field": "tglresep",
					"title": "Tanggal masuk"
				}, {
					"field": "tglselesai",
					"title": "Tgl Selesai"
				}, {
					"field": "waktulayanan",
					"title": "Waktu Layanan"
				}, {
					"field": "keterangan",
					"title": "Keterangan"
				}
			];

			$scope.Cari = function(){
				LoadData()
			}
/////////////////////////////////////////////////////////////
		}
	]);
});