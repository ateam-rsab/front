define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarDepositPasienCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper','DateHelper','ManageTataRekening',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper,dateHelper,manageTataRekening) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal =  new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang= new Date();
			$scope.dataPasienSelected = {};
			// $scope.cboDokter =false;	
			// $scope.pasienPulang =false;		
			// $scope.cboUbahDokter =true;
			$scope.isRouteLoading=false;

			loadCombo();
			// loadData();

			function loadCombo(){
				var chacePeriode = cacheHelper.get('DaftarDepositPasienCtrl');
				if(chacePeriode != undefined){
					//debugger;
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);	
					$scope.item.tglpulang = new Date(arrPeriode[2]);				
				}else{
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;					
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
				

				$q.all([
					manageTataRekening.getDataTableTransaksi("tatarekening/get-daftar-deposit-pasien?"+
						"tglAwal="+tglAwal+
						"&tglAkhir="+tglAkhir+
						reg+rm+nm+ins+rg+kp+dk),
					]).then(function(data) {
						$scope.isRouteLoading=false;
						
						$scope.dataDaftarPasienPulang = data[0].data.daftar;
						var chacePeriode = tglAwal + "~" + tglAkhir;
						cacheHelper.set('DaftarRegistrasiPasienCtrl', chacePeriode);
					});

				};
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
					"width":"130px",
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
				// {
				// 	"field": "statuspasien",
				// 	"title": "Status",
				// 	"width":"80px",
				// 	"template": "<span class='style-center'>#: statuspasien #</span>"
				// },
				{
					"field": "nostruk",
					"title": "NoStrukVerif",
					"width":"100px",
					"template": "<span class='style-center'>#: nostruk #</span>"
				},
				{
					"field": "nosbm",
					"title": "NoSBM",
					"width":"100px",
					"template": "<span class='style-center'>#: nosbm #</span>"
				},
				{
					"field": "totaldeposit",
					"title": "Total Deposit",
					"width":"130px",
					"template": "<span class='style-center'>{{formatRupiah('#: totaldeposit #', 'Rp.')}}</span>"
				}
				];
				$scope.data2 = function(dataItem) {
					for (var i = 0; i < dataItem.details.length; i++) {
						dataItem.details[i].no = i+1

					}
					return {  
						dataSource: new kendo.data.DataSource({
							data: dataItem.details,

						}),
						columns: [
						{
							"field": "no",
							"title": "No",
							"width" : "5px",
						},
						{
							"field": "tglpelayanan",
							"title": "Tgl Deposit",
							"width" : "50px",
							"template": "<span class='style-center'>{{formatTanggal('#: tglpelayanan #')}}</span>"
						},
                        //  {
                        //     "field": "jumlah",
                        //     "title": "Jumlah",
                        //     "width" : "50px",
                        // },
                        // {
                        //     "field": "hargajual",
                        //     "title": "Harga Jual",
                        //     "width" : "50px",
                        //     "template": "<span class='style-center'>{{formatRupiah('#: hargajual #', '')}}</span>"
                        // },
                        {
                        	"field": "hargasatuan",
                        	"title": "Deposit",
                        	"width" : "50px",
                        	"template": "<span class='style-center'>{{formatRupiah('#: hargasatuan #', 'Rp.')}}</span>"
                        }
                        // {
                        //     "field": "satuanstandar",
                        //     "title": "Satuan",
                        //     "width" : "30px",
                        // },
                        // {
                        //     "field": "qtyproduk",
                        //     "title": "Qty",
                        //     "width" : "30px",
                        // },
                        // {
                        //     "field": "hargasatuan",
                        //     "title": "Harga Satuan",
                        //     "width" : "50px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        // },
                        // {
                        //     "field": "hargadiscount",
                        //     "title": "Discount",
                        //     "width" : "50px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                        // },
                        // {
                        //     "field": "hargatambahan",
                        //     "title": "Jasa",
                        //     "width" : "50px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargatambahan #', '')}}</span>"
                        // },
                        // {
                        //     "field": "total",
                        //     "title": "Total",
                        //     "width" : "70px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        // }
                        ]
                    }
                };  




	    }
	    ]);
});