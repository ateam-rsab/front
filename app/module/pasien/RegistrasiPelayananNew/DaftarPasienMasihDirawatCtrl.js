define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPasienMasihDirawatCtrl', ['CacheHelper','$timeout', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageServicePhp', 'DateHelper','DataHelper',
		function(cacheHelper,$timeout, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageServicePhp, DateHelper,DataHelper) {
			
			$scope.isRouteLoading=false;

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
				$scope.item.periodeAwal = $scope.now;
				$scope.item.periodeAkhir = $scope.now;
			$scope.item.jmlRows = 50

  		    // $scope.item.periodeAwal=$scope.now;
        //     $scope.item.tglRencanaKeluar=$scope.now;
		
			// today
			// var chacePeriode = cacheHelper.get('DaftarPasienAktif');
			// if(chacePeriode != undefined){
			// 	var arrPeriode = chacePeriode.split(':');
			// 	$scope.item.periodeAwal = new Date(arrPeriode[0]);
			// 	$scope.item.periodeAkhir = new Date(arrPeriode[1]);
			// }
			// else
			// {
			// 	$scope.item.periodeAwal = $scope.now;
			// 	$scope.item.periodeAkhir = $scope.now;
			// }
			loadData()
			loadCombo()

			function loadCombo(){
				modelItemAkuntansi.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
		            // $scope.listDepartemen = data.data.departemen;
		            // $scope.listKelompokPasien = data.data.kelompokpasien;
		            $scope.listRuangan = data.ruanganall
		        })
				// modelItemAkuntansi.getDataGeneric("ruangan", false).then(function(data) {
				// 	$scope.listRuangan = data;
				// })
			}

		
			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.columnDaftarPasienPulang = [
			{
				"field": "tglregistrasi",
				"title": "Tgl Registrasi",
				"width":"130px",
				"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
			},
		
			{
				"field": "nocm",
				"title": "No RM",
				"width":"80px",
				"template": "<span class='style-center'>#: nocm #</span>"
			},
			{
				"field": "noregistrasi",
				"title": "No Registrasi",
				"width":"100px",
				"template": "<span class='style-center'>#: noregistrasi #</span>"
			},
			{
				"field": "namapasien",
				"title": "Nama Pasien",
				"width":"200px",
				"template": "<span class='style-left'>#: namapasien #</span>"
			},
			{
				"field": "umur",
				"title": "Umur",
				"width":"150px",
				"template": "<span class='style-left'>#: umur #</span>"
			},
			{
				"field": "namadokter",
				"title": "Dokter",
				"width":"150px",
				// "template": "<span class='style-left'>#: namadokter #</span>"
				  "template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
			},
			{
				"field": "jeniskelamin",
				"title": "JK",
				"width":"80px",
				"template": "<span class='style-left'>#: jeniskelamin #</span>"
			},
			{
				"field": "namaruangan",
				"title": "Ruangan",
				"width":"150px",
				"template": "<span class='style-left'>#: namaruangan #</span>"
			},
			{
				"field": "namakelas",
				"title": "Kelas",
				"width":"80px",
				"template": "<span class='style-left'>#:  namakelas #</span>"
			},
			{
				"field": "kelompokpasien",
				"title": "Tipe Pembayaran",
				"width":"150px",
				"template": "<span class='style-center'>#: kelompokpasien #</span>"
			},
			
			];


			$scope.Perbaharui = function(){
				$scope.ClearSearch();
			}

	
		
			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}

			//fungsi clear kriteria search
			$scope.ClearSearch = function(){
				$scope.item = {};
				$scope.item.periodeAwal = $scope.now;
				$scope.item.periodeAkhir = $scope.now;
				$scope.item.ruangan = {namaExternal:""};
				$scope.SearchData();
			}

			//fungsi search data
			$scope.SearchData = function(){
				loadData()
			}
			function loadData(){
				var tglAwal = moment($scope.item.periodeAwal).format('DD-MMM-YYYY HH:mm');
				var tglAkhir = moment($scope.item.periodeAkhir).format('DD-MMM-YYYY HH:mm');
				if ($scope.item.ruangan == undefined){
					var rg =""
				}else{
					var rg ="&ruanganId=" +$scope.item.ruangan.id
				}
				if ($scope.item.noReg == undefined){
					var reg =""
				}else{
					var reg ="&noReg=" +$scope.item.noReg
				}
				if ($scope.item.noRm == undefined){
					var rm =""
				}else{
					var rm ="&noRm=" +$scope.item.noRm
				}
				if ($scope.item.nama == undefined){
					var nm =""
				}else{
					var nm ="namaPasien=" +$scope.item.nama
				}

				var jmlRows = "";
				if ($scope.item.jmlRows != undefined) {
					jmlRows = $scope.item.jmlRows
				}
				$scope.isRouteLoading=true;
				$q.all([
					modelItemAkuntansi.getDataTableTransaksi("pindahpasien/get-pasien-masih-dirawat?"
						+ nm + reg + rg + rm + '&jmlRows=' + jmlRows
						// + "&tglAwal="+ tglAwal +"&tglAkhir="+ tglAkhir
						),
				]).then(function(data) {

					if (data[0].statResponse){
						 for (var i = 0; i < data[0].data.length; i++) {
	                        // data.data[i].no = i+1
	                        var tanggal = $scope.now;
	                        var tanggalLahir = new Date(data[0].data[i].tgllahir);
	                        var umur = DateHelper.CountAge(tanggalLahir, tanggal);
	                        data[0].data[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
	                      
                   		 }
						$scope.isRouteLoading=false;
						$scope.dataDaftarPasienPulang = new kendo.data.DataSource({
							data: data[0].data,
							pageSize: 10,
							total: data[0].length,
							serverPaging: false,
							
							
						});
					}
				});
				// var chacePeriode = tglAwal + ":" + tglAkhir;
				// cacheHelper.set('DaftarPasienAktif', chacePeriode);
			}

			
			 $scope.pindah=function(){
			 	if ($scope.dataPasienSelected==undefined)
			 	{
			 		    toastr.error('Pilih Data Pasien dulu','Caution');
			 	}else{
					modelItemAkuntansi.getDataTableTransaksi('registrasi/get-norec-apd?noreg='+ $scope.dataPasienSelected.noregistrasi
					+ '&ruangId=' + $scope.dataPasienSelected.objectruanganlastfk ).then(function(e){
					   if(e.length > 0 ){
						   $state.go('PindahPulangPasien',{
							   norecPD:$scope.dataPasienSelected.norec_pd,
							   norecAPD: e[0].norec_apd
							   });
						   var CachePindah = $scope.dataPasienSelected.ruanganid                                     
						   cacheHelper.set('CachePindah', CachePindah);
					   }
					   
					})
				 	
			 	}
			 }
////////////////////// -TAMAT- /////////////////////////
}
]);
});