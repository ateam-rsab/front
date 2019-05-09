define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenelitianPegawaiRevCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSarpras','ModelItemAkuntansi','ManageServicePhp','DateHelper','CacheHelper',
		function($rootScope, $scope, ModelItem,$state,ManageSarpras,modelItemAkuntansi,manageServicePhp,dateHelper,cacheHelper) {
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			$scope.item.tglawal = new moment($scope.now).format('YYYY-MM-DD 00:00');
			$scope.item.tglakhir = new moment($scope.now).format('YYYY-MM-DD 23:59');
			var norec ="";
			LoadCombo();
			Load();
			
			function Load(){
				var chacePeriode = cacheHelper.get('DaftarPenelitianEksternalRevCtrl');
				if(chacePeriode != undefined){
                   // var arrPeriode = chacePeriode.split('~');
                   $scope.item.tglawal= new Date(chacePeriode[0]);
                   $scope.item.tglakhir = new Date(chacePeriode[1]);

                }else{
                    $scope.item.tglawal = moment($scope.now).format('YYYY-MM-DD 00:00');
                    $scope.item.tglakhir = moment($scope.now).format('YYYY-MM-DD 23:59');          
                }
			}

			function LoadCombo(){
				modelItemAkuntansi.getDataTableTransaksi("sdm-penelitian/get-data-combo-penelitian?", true).then(function(dat){
	            	$scope.listDataInstitusiPendidikan=dat.institusi;
	            	$scope.listDataFakultas=dat.fakultas;
	            });
			}

			function GetData(){
				$scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
                var NamaPeneliti="";
                if ($scope.item.NamaPeneliti !== undefined) {
                    NamaPeneliti ="&NamaPeneliti=" +$scope.item.NamaPeneliti
                }
                var JudulPenelitian="";
                if ($scope.item.JudulPenelitian !== undefined) {
                    JudulPenelitian = "&JudulPenelitians=" +$scope.item.JudulPenelitian;
                }
                var UnitKerja="";
                if ($scope.item.UnitKerja !== undefined) {
                    UnitKerja = "&UnitKerja=" +$scope.item.UnitKerja;
                }
                manageServicePhp.getDataTableTransaksi("sdm-penelitian/get-daftar-penelitian-pegawai?"
                    +"tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir
                    +NamaPeneliti+JudulPenelitian+UnitKerja, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var datas = dat.data.datas;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                    }

                    $scope.DataPenelitian = new kendo.data.DataSource({
                        data: datas,
                        total: datas.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });

                    var chacePeriode ={ 0 : tglAwal ,
	                    1 : tglAkhir,
	                    2 : '',
	                    3 : '', 
	                    4 : '',
	                    5 : '',
	                    6 : ''
	                }
                    cacheHelper.set('DaftarPenelitianPegawaiRevCtrl', chacePeriode);
                });
			}

			$scope.SearchData = function(e){
                GetData()
            }

            $scope.ClearData = function(){
            	$scope.item = {};
            }

			$scope.kl = function(current){
			 	toastr.info(current.namalengkap+" Terpilih");
				$scope.current = current;
				console.log(JSON.stringify($scope.current));
			}

			$scope.Ubah = function(current){

                if ($scope.current == undefined) {
                    toastr.error('Data Kegiatan Belum Dipilih','Info');
					return;
                }                
                
                var chacePeriode ={ 
                	0 : $scope.current.norec,
                    1 : 'EditPenelitianPegawai',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }

                cacheHelper.set('PenelitianPegawaiRevCtrl', chacePeriode);
                $state.go('PenelitianPegawaiRev', {
                    norec:  $scope.current.norec,
                    noOrder:'EditPenelitianPegawai'
                });
			}

			$scope.Hapus = function(current){
				if ($scope.current == undefined || $scope.current == '') {
					toastr.error('Data Kegiatan Belum Dipilih','Info');
					return;
				}

                var data = 
                {
                    // kpid:  $scope.current.kpid, 
                    norec: $scope.current.norec,                 
                    tglbatal : moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.hapuskegiatanpenelitianpegawai(objSave).then(function (e) {
                    GetData()
                })
            }

			$scope.columnPenelitian = {
                toolbar:["excel"],
                excel: {
                    fileName:"Data Penelitian Eksternal"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                selectable: 'row',
                pageable: true,
                columns: [
                 	{
						"field": "no",
						"title": "No",
						"width": "10%"
					},
	                {
						"field": "nip_pns",
						"title": "Nip",
						"width": "15%"
					},
					{
						"field": "namalengkap",
						"title": "Nama Peneliti",
						"width": "20%"
					},
					{
						"field": "unitkerja",
						"title": "Unit Kerja",
						"width": "20%"
					},
					{
						"field": "judulpenelitian",
						"title": "Judul Penelitian",
						"width": "20%"
					},
					{
						"field": "tanggalmulai",
						"title": "Tanggal Mulai",
						"width": "20%"
					},
					{
						"field": "tanggalselesai",
						"title": "Tanggal Selesai",
						"width": "20%"
					
					}
              	]
            }
		}
	]);
});