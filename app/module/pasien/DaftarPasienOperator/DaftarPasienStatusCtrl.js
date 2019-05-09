define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPasienStatusCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper','DateHelper','ManageTataRekening',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper,dateHelper,manageTataRekening) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal =  new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.dataPasienSelected = {};
			$scope.cboDokter =false;
			$scope.cboUbahDokter =true;
			$scope.isRouteLoading=false;

			loadCombo();
			// loadData();


			$scope.listStatus = [{id:1,nama:"BARU"},{id:2,nama:"LAMA"}]

			function loadCombo(){
				var chacePeriode = cacheHelper.get('DaftarRegistrasiPasienCtrl');
				if(chacePeriode != undefined){
					debugger;
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);
				}else{
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;
				}
				manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
				    $scope.listDepartemen = data.data.departemen;
				    $scope.listKelompokPasien = data.data.kelompokpasien;
				    $scope.listDokter = data.data.dokter;
				    $scope.listDokter2 = data.data.dokter;
				})
				// $scope.listStatus = manageKasir.getStatus();
			}
			$scope.getIsiComboRuangan = function(){
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.columnDaftarPasienPulang = [
				{
					"field": "tglregistrasi",
					"title": "Tgl Registrasi",
					"width":"80px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
				},
				{
					"field": "noregistrasi",
					"title": "NoReg",
					"width":"80px"
				},
				{
					"field": "nocm",
					"title": "NoRM",
					"width":"80px",
					"template": "<span class='style-center'>#: nocm #</span>"
				},
				{
					"field": "namapasien",
					"title": "Nama Pasien",
					"width":"150px",
					"template": "<span class='style-left'>#: namapasien #</span>"
				},
				{
					"field": "namaruangan",
					"title": "Nama Ruangan",
					"width":"150px",
					"template": "<span class='style-left'>#: namaruangan #</span>"
				},
				{
					"field": "namadokter",
					"title": "Nama Dokter",
					"width":"150px",
					"template": "<span class='style-left'>#: namadokter #</span>"
				},
				{
					"field": "kelompokpasien",
					"title": "Kelompok Pasien",
					"width":"100px",
					"template": "<span class='style-left'>#: kelompokpasien #</span>"
				},
				{
					"field": "tglpulang",
					"title": "Tgl Pulang",
					"width":"80px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
				},
				{
					"field": "statuspasien",
					"title": "Status",
					"width":"80px",
					"template": "<span class='style-center'>#: statuspasien #</span>"
				}
			];




			$scope.SearchData = function(){
				loadData()
			}
			function loadData(){
				$scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg =""
				if ($scope.item.noReg != undefined){
					var reg ="&noreg=" +$scope.item.noReg
				}
				var rm =""
				if ($scope.item.noRm != undefined){
					var reg ="&norm=" +$scope.item.noRm
				}	
				var nm =""
				if ($scope.item.nama != undefined){
					var nm ="&nama=" +$scope.item.nama
				}
				var ins =""
				if ($scope.item.instalasi != undefined){
					var ins ="&deptId=" +$scope.item.instalasi.id
				}
				var rg =""
				if ($scope.item.ruangan != undefined){
					var rg ="&ruangId=" +$scope.item.ruangan.id
				}
				var kp =""
				if ($scope.item.kelompokpasien != undefined){
					var kp ="&kelId=" +$scope.item.kelompokpasien.id
				}
				var dk =""
				if ($scope.item.dokter != undefined){
					var dk ="&dokId=" +$scope.item.dokter.id
				}
				var sttts =""
				if ($scope.item.status != undefined){
					var dk ="&sttts=" +$scope.item.status.nama
				}
				

				$q.all([
					manageTataRekening.getDataTableTransaksi("tatarekening/get-daftar-registrasi-pasien?"+
						"tglAwal="+tglAwal+
						"&tglAkhir="+tglAkhir+
						reg+rm+nm+ins+rg+kp+dk+sttts),
					]).then(function(data) {
						$scope.isRouteLoading=false;
						$scope.dataDaftarPasienPulang = data[0].data;
						var chacePeriode = tglAwal + "~" + tglAkhir;
						cacheHelper.set('DaftarRegistrasiPasienCtrl', chacePeriode);
					});

				}  ;
			$scope.UbahDokter = function(){
				$scope.cboDokter = true
				$scope.cboUbahDokter=false
			}
			$scope.batal = function(){
				$scope.cboDokter = false
				$scope.cboUbahDokter=true
			}
			
			
			$scope.klikGrid = function(dataPasienSelected){
				if (dataPasienSelected != undefined) {
					$scope.item.namaDokter = {id:dataPasienSelected.pgid,namalengkap:dataPasienSelected.namadokter}
				}
			}
			$scope.simpan = function(){
				var objSave = 
                    {
                        norec:$scope.dataPasienSelected.norec,
                        objectpegawaifk:$scope.item.namaDokter.id
                    }
				manageTataRekening.postSaveDokter(objSave).then(function(e) {
					loadData();
					$scope.cboDokter = false
					$scope.cboUbahDokter=true
				})	
			}
			$scope.Detail = function(){
				if($scope.dataPasienSelected.noregistrasi != undefined){
				   	var obj = {
				    	noRegistrasi : $scope.dataPasienSelected.noregistrasi
				  	}

				  	$state.go('RincianTagihanTataRekening', {
				    	dataPasien: JSON.stringify(obj)
				  	});
				}
			}
			$scope.DaftarRuangan = function(){
				if($scope.dataPasienSelected.noregistrasi != undefined){
				   	var obj = {
				    	noRegistrasi : $scope.dataPasienSelected.noregistrasi
				  	}

				  	$state.go('AntrianPasienDiperiksa', {
				    	dataPasien: JSON.stringify(obj)
				  	});
				}
			}

			}
			]);
});