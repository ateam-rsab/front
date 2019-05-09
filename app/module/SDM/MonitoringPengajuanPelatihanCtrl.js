define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringPengajuanPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', '$state','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem, ManageSdm, $state, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
			$scope.now = new Date();
            $scope.item.KelompokUser='';
			var data2 = [];
			$scope.inputPelatihan = [
			{"id":1,"name":"Pelatihan Tersedia"},
			{"id":2,"name":"Pelatihan Baru"}]
			loadDataCombo();
			LoadCache()

			 function LoadCache(){
	            var chacePeriode = cacheHelper.get('MonitoringPengajuanPelatihanCtrl');
	            if(chacePeriode != undefined){
	               //var arrPeriode = chacePeriode.split(':');
	                $scope.item.tglawal = new Date(chacePeriode[0]);
	                $scope.item.tglakhir = new Date(chacePeriode[1]);
	               
	                init();
	            }else{
	               $scope.item.tglawal=moment($scope.now).format('YYYY-MM-DD 00:00');
				   $scope.item.tglakhir=moment($scope.now).format('YYYY-MM-DD 23:59');	
	               init();
	            }
           	}

			function loadDataCombo(){	
	            modelItemAkuntansi.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
	            	$scope.listJabatan=dat.jabatan;
	            	$scope.listJenisPelatihan=dat.jenispelatihan;
                    $scope.item.KelompokUser=dat.datapegawai.objectkelompokuserfk
	            });
		    }

		    function init() {
                $scope.isRouteLoading=true;
                var jenisPelatihan =""
                if ($scope.item.jenisPelatihan != undefined){
                    var jenisPelatihan ="&jenisPelatihan=" +$scope.item.jenisPelatihan.id
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-daftar-monitoring-pengajuan-pelatihan?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    jenisPelatihan, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                        if (dat.data.daftar[i].verifikasifk != null) {
                            dat.data.daftar[i].statusverifikasi = 'Verifikasi';
                        }else{
                            dat.data.daftar[i].statusverifikasi = '-';
                        }
                    }
                    $scope.dataGrid = dat.data.daftar;
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('MonitoringPengajuanPelatihanCtrl', chacePeriode);                
            }

		    $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
            }

		    $scope.columnGrid = [
	           {
                    field: "namaplanning",
                    title: "Nama Paket",
                    width: "150px"
                },
                {
                    field: "deskripsiplanning",
                    title: "Penyelenggara",
                    width: "150px"
                },
                {
                    field: "tempat",
                    title: "Tempat",
                    width: "120px"
                },
				{
					field: "tglsiklusawal",
					groupHeaderTemplate: "#=value#",
					title: "Tanggal Awal",
					width: "120px"
				},
				{
					field: "tglsiklusakhir",
					title: "Tanggal Akhir",
					format:"{0:dd MMMM yyyy}",
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
                            field: "tanggaleksekusi",
                            title: "Tanggal",
                            format:"{0:dd MMMM yyyy}",
                            width: "100px"
                        },
                        {
                            field: "noverifikasi",
                            title: "Dokumen",
                            width: "150px"
                        },
                        {
                            field: "namalengkap",
                            title: "Penanggung Jawab",
                            width: "120px"
                        },
                        {
                            "field": "kelompoktransaksi",
                            "title": "Keterangan",
                            "width" : "105px",
                        }
                    ]
                }
            };  			
			
			$scope.tambahPengajuanPelatihan = function () {
				$state.go('TambahPengajuanPelatihanRev',{
				})
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

                if ($scope.dataSelected.verifikasifk != undefined) {
                    alert("Pengajuan telah diverifikasif tidak bisa diubah!")
                    return;
                }                
                
                var chacePeriode ={ 
                    0 : $scope.dataSelected.norec,
                    1 : 'EditPengajuan',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }

                cacheHelper.set('TambahPengajuanPelatihanRevCtrl', chacePeriode);
                $state.go('TambahPengajuanPelatihanRev', {
                    kpid:  $scope.dataSelected.norec,
                    noOrder:'EditPengajuan'
                });
            }

            $scope.VerifikasiPengajuan = function(current){
                var sdm = 41;
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };

                if ($scope.dataSelected.verifikasifk != undefined) {
                    alert("Pengajuan telah diverifikasi!")
                    return;
                }

                if ($scope.item.KelompokUser != parseFloat(sdm)) {
                    alert("Hanya SDM yang bisa melakukan Verifikasi!")
                    return;
                }

                var data = 
                {
                    norec: $scope.dataSelected.norec,
                    noplanning : $scope.dataSelected.noplanning,
                    norecmonitoring:$scope.dataSelected.norecmonitoring,
                    norecmonitoringdetail:$scope.dataSelected.norecmonitoringdetail, 
                    verifikasifk: $scope.dataSelected.verifikasifk,            
                    tglpengajuan : moment($scope.dataSelected.tglpengajuan).format('YYYY-MM-DD HH:mm'),
                    tglsiklusawal : moment($scope.dataSelected.tglsiklusawal).format('YYYY-MM-DD HH:mm'),
                    tglsiklusakhir : moment($scope.dataSelected.tglsiklusakhir).format('YYYY-MM-DD HH:mm')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.verifikasisdmpengajuanpelatihan(objSave).then(function(e) {
                    init();
                    ClearAll();                   
                });   
            }

            $scope.UnverifikasiPengajuan = function(current){
                var sdm = 41;
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };

                if ($scope.dataSelected.verifikasifk == undefined) {
                    alert("Pengajuan belum diverifikasi tidak bisa unverifikasi!")
                    return;
                } 

                if ($scope.item.KelompokUser != parseFloat(sdm)) {
                    alert("Hanya SDM yang bisa melakukan Verifikasi!")
                    return;
                }

                var data = 
                {
                    norec: $scope.dataSelected.norec,
                    noplanning : $scope.dataSelected.noplanning,
                    norecmonitoring:$scope.dataSelected.norecmonitoring,
                    norecmonitoringdetail:$scope.dataSelected.norecmonitoringdetail, 
                    verifikasifk: $scope.dataSelected.verifikasifk,            
                    tglpengajuan : moment($scope.dataSelected.tglpengajuan).format('YYYY-MM-DD HH:mm'),
                    tglsiklusawal : moment($scope.dataSelected.tglsiklusawal).format('YYYY-MM-DD HH:mm'),
                    tglsiklusakhir : moment($scope.dataSelected.tglsiklusakhir).format('YYYY-MM-DD HH:mm')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.unverifikasisdmpengajuanpelatihan(objSave).then(function(e) {
                    init();
                    ClearAll();                   
                });   
            }

            $scope.hapusPengajuan = function(current){
                 if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                } 

                if ($scope.dataSelected.verifikasifk != undefined) {
                    alert("Pengajuan telah diverifikasi tidak bisa dihapus!")
                    return;
                } 

                var data = 
                {
                    norec: $scope.dataSelected.norec,               
                    tglbatal : moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.hapuspengajuanpelatihan(objSave).then(function(e) {
                	init();
                    ClearAll();                   
            	});
            }
			
		}
	]);
});