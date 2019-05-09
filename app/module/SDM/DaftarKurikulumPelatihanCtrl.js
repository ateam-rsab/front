define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarKurikulumPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', '$state','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem, ManageSdm, $state, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			var data2 = [];		
			loadDataCombo();
			// LoadCache();
			init();
			 // function LoadCache(){
	   //          var chacePeriode = cacheHelper.get('DaftarKurikulumPelatihanCtrl');
	   //          if(chacePeriode != undefined){
	   //             //var arrPeriode = chacePeriode.split(':');
	   //              $scope.item.tglawal = new Date(chacePeriode[0]);
	   //              $scope.item.tglakhir = new Date(chacePeriode[1]);
	               
	   //              init();
	   //          }else{
	   //             $scope.item.tglawal=moment($scope.now).format('YYYY-MM-DD 00:00');
				//    $scope.item.tglakhir=moment($scope.now).format('YYYY-MM-DD 23:59');	
	   //             init();
	   //          }
    //        	}

			function loadDataCombo(){	
	            modelItemAkuntansi.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
	            	$scope.listJabatan=dat.jabatan;
	            	$scope.listJenisPelatihan=dat.jenispelatihan;
	            });
		    }

		    function init() {
                $scope.isRouteLoading=true;
                var jenisPelatihan =""
                if ($scope.item.jenisPelatihan != undefined){
                    var jenisPelatihan ="&jenisPelatihan=" +$scope.item.jenisPelatihan.id
                }
                var JudulKurikulum =""
                if ($scope.item.judulKurikulum != undefined){
                    var JudulKurikulum ="&JudulKurikulum=" +$scope.item.judulKurikulum
                }
                // var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                // var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan-kurikulum/get-detail-kurikulum-kompetensi?"+
                    // "tglAwal=" + tglAwal + 
                    // "&tglAkhir=" + tglAkhir +
                    jenisPelatihan+JudulKurikulum, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                    }
                    $scope.dataGrid = dat.data.daftar;
                });

                // var chacePeriode ={ 0 : tglAwal ,
                //     1 : tglAkhir,
                //     2 : '',
                //     3 : '', 
                //     4 : '',
                //     5 : '',
                //     6 : ''
                // }
                // cacheHelper.set('PermintaaanPelatihanRevCtrl', chacePeriode);                
            }

		    $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
            }

		    $scope.columnGrid = [
	            {
					field: "jenispelatihan",
					title: "Jenis Pelatihan",
					width: "150px"
				},
				{
					field: "judulkurikulum",
					title: "Judul Kurikulum",
					width: "150px"
				},
				{
					field: "latarbelangkang",
					title: "Latar Belangkang",
					width: "120px"
				},
				{
					field: "filosofipelatihan",
					title: "Filosofi Pelatihan",
					width: "120px"
				}
            ];

		    $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "pegawaifk",
                            "title": "Id Peserta",
                            "width" : "70px",
                        },
                        {
                            "field": "namalengkap",
                            "title": "Nama Peserta",
                            "width" : "120px",
                        }
                    ]
                }
            };  			
			
			$scope.tambahPengajuanPelatihan = function () {
				$state.go('InputKurikulumPelatihanRev',{})
			}

			$scope.SearchData = function (){
				init()
			}

			$scope.ClearData = function (){
				$scope.item = {};
				$scope.item.tglawal=moment($scope.now).format('YYYY-MM-DD 00:00');
				$scope.item.tglakhir=moment($scope.now).format('YYYY-MM-DD 23:59');	
			}

			$scope.editPengajuanPelatihan = function(current){

                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }                
                
                var chacePeriode ={ 
                    0 : $scope.dataSelected.norec,
                    1 : 'EditKurikulum',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }

                cacheHelper.set('InputKurikulumPelatihanRevCtrl', chacePeriode);
                $state.go('InputKurikulumPelatihanRev', {
                    kpid:  $scope.dataSelected.norec,
                    noOrder:'EditKurikulum'
                });
            }

            $scope.Hapus = function(current){

                var data = 
                {
                    norec: $scope.dataSelected.norec,               
                    tglbatal : moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.hapuskurikulumkompetensi(objSave).then(function(e) {
                	init();
                    ClearAll();                   
            	});
            }
			
		}
	]);
});