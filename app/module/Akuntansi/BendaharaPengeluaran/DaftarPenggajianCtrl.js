define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenggajianCtrl', ['$q', '$rootScope', '$scope', '$state','ManageSdm','DateHelper','CacheHelper',
		function($q, $rootScope, $scope,$state,manageSdm,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
        	$scope.dataSelected={};
			$scope.item={};
			$scope.item.periodeAwal =  new Date();
			$scope.item.periodeAkhir =  new Date();

			debugger;
			var chacePeriode = cacheHelper.get('DaftarPenggajian');
			if(chacePeriode != undefined){

			    var arrPeriode = chacePeriode.split('#');
			    $scope.item.periodeAwal = new Date(arrPeriode[0]);
				$scope.item.periodeAkhir = new Date(arrPeriode[1]);
			}

			LoadData();

			// $scope.dataDaftarPenggajian = new kendo.data.DataSource({
			// 	data: [{"No":"1","TanggalPengajuan":"2017-01-01","Keterangan":"Penggajian PNS bulan Januari",
			// 	"Bulan":"Januari","Tahun":"2017","JumlahPegawai":"200","Total":"Rp. 2.000.000.000","Status":"PENGAJUAN"}]
			// });
			$scope.columnDaftarPenggajian = [
			{
				"field": "tglHistori",
				"title": "Tanggal",width: "80px"
			},
			{
				"field": "jenisPegawai",
				"title": "Jenis Pegawai",width: "100px"
			},
			{
				"field": "bulan",
				"title": "Bulan",width: "70px"
			},
			{
				"field": "tahun",
				"title": "Tahun",width: "70px"
			},
			{
				"field": "total",
				"title": "Total",width: "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
			}
			];

			$scope.SearchData = function(){
				LoadData()
				var tempData=$scope.item.periodeAwal+"#"+$scope.item.periodeAkhir+"#"
	            cacheHelper.set('DaftarPenggajian', tempData);
			};
			function LoadData(){
				debugger;
				var tglTerima= moment($scope.item.periodeAwal).format('YYYY-MM-DD');
             	var tglfaktur = moment($scope.item.periodeAkhir).format('YYYY-MM-DD')
				manageSdm.getOrderList("gaji-pegawai/daftar-gaji-pegawai/?dateStart="+tglTerima+"&dateEnd="+tglfaktur).then(function(data){
					$scope.dataDaftarPenggajian=data.data.result;

					for (var i = 0; i < $scope.dataDaftarPenggajian.length; i++) {
						$scope.dataDaftarPenggajian[i].tglHistori =moment($scope.dataDaftarPenggajian[i].tglHistori).format('YYYY-MM-DD'); 
					};
				});
			};
			// $scope.detail = function(){
			// 	$state.go('PembayaranGajiPegawai')
			// };

			$scope.formatRupiah = function(value, currency) {
              return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };

            $scope.detail = function() {
            	debugger;
              if($scope.dataSelected.noRec == undefined){
               alert("Silahkan pilih data terlebih dahulu!");
               return;
             }
             
              // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
              var tempData=$scope.dataSelected.noRec+"#"+$scope.dataSelected.tglHistori+"#"+$scope.dataSelected.bulan+"#"+$scope.dataSelected.tahun+"#"+$scope.dataSelected.total+"#"+moment($scope.dataSelected.tglAwal).format('YYYY-MM-DD')+"#"+moment($scope.dataSelected.tglAkhir).format('YYYY-MM-DD')+"#"
              //setting caching
              cacheHelper.set('PembayaranGajiPegawai', tempData);
              $state.go('PembayaranGajiPegawai',{noTerima: $scope.dataSelected.noRec})
            }



		}
		


		]);
});