
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenangananKeluhanPelangganRevCtrl', ['$rootScope', '$scope', 'ModelItem','IPSRSService','$state','ManageSarpras','ModelItemAkuntansi','ManageServicePhp','ManageLogistikPhp','DateHelper','CacheHelper',
		function($rootScope, $scope, ModelItem,IPSRSService,$state,ManageSarpras,modelItemAkuntansi,manageServicePhp,manageLogistikPhp,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			$scope.item.tglawal = new moment($scope.now).format('YYYY-MM-DD 00:00');
			$scope.item.tglakhir = new moment($scope.now).format('YYYY-MM-DD HH:mm');
			$scope.pegawai = ModelItem.getPegawai();
			Load();
			GetData();

			function Load(){
				var chacePeriode = cacheHelper.get('DaftarPenangananKeluhanPelangganRevCtrl');
				if(chacePeriode != undefined){
                    var arrPeriode = chacePeriode.split('~');
                   $scope.item.tglawal= new Date(arrPeriode[0]);
                   $scope.item.tglakhir = new Date(arrPeriode[1]);

                }else{

                    $scope.item.tglawal=$scope.now;
                    $scope.item.tglakhir=$scope.now;              
                }

			}

			function GetData(){
				$scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 0:00:00');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                var noMR="";
                if ($scope.item.ruangan !== undefined) {
                    noMR ="&noRm=" +$scope.item.noRm
                }
                var namaPasien="";
                if ($scope.item.produk !== undefined) {
                    namaPasien = "&namaPasien=" +$scope.item.namaPasien;
                }
                manageLogistikPhp.getDataTableTransaksi("humas/get-penanganan-keluhan-pelanggan?"
                    +"tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir
                    +noMR+namaPasien, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var datas = dat.data.datas;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                        datas[i].umur =  datas[i].umur + "  " + "Tahun"
                        if (datas[i].jkid ==  1) {
                        	datas[i].jeniskelamin = "L";
                        }else{
                        	datas[i].jeniskelamin = "P";
                        }
                    }

                    $scope.DataKeluhan = new kendo.data.DataSource({
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
                    var chacePeriode = tglAwal + "~" + tglAkhir ;
                    cacheHelper.set('DaftarPenangananKeluhanPelangganRevCtrl', chacePeriode);
                    
                });
			}		


            $scope.SearchData = function(e){
                GetData()
            }

            $scope.ClearData = function(){
            	$scope.item.tglawal = new moment($scope.now).format('YYYY-MM-DD 00:00');
				$scope.item.tglakhir = new moment($scope.now).format('YYYY-MM-DD HH:mm');
				$scope.item.noRm = "";
				$scope.item.namaPasien="";
            }

            $scope.CariKeluhan = function(dataSource){
            	var q = dataSource;
            	var grid = $("#kGrid").data("kendoGrid");
            	grid.dataSource.query({
            		page:1,
            		pageSize:20,
            		filter:{
            			logic : "or",
            			filters : [{field:"namaPasien", operators:"contains", value : q}, 
            			           {field:"umur", operators:"contains", value : q},
            			           {field:"email", operators:"contains", value : q}]
            		}
            	})
            }

            $scope.OnInit = function(){
			  	$scope.SearchData();
			}
			$scope.OnInit();
         		
			$scope.batal = function(){
			  $scope.item= {};
			}

            $scope.Hapus = function(current){
                debugger;
                if ($scope.current == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }         

                var data = 
                {
                    kpid:  $scope.current.kpid, 
                    norec: $scope.current.norec_pp,                 
                    tglbatal : moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.hapusPenangananKeluhanPelanggan(objSave).then(function (e) {
                    GetData()
                })
            }
			
			$scope.kl = function(current){
			 	toastr.info(current.namapasien+" Terpilih");
				$scope.current = current;
				$scope.item.keluhan = current.keluhan;
				$scope.item.saran = current.saran;
				$scope.item.namaPasien=current.namapasien;
				$scope.item.email=current.email;
				$scope.item.idKeluhan = current.kpid;
				$scope.item.pegawai={id:current.pegawaiid,namalengkap:current.namalengkap};
				$scope.item.idKeluhan = current.kpid;
				console.log(JSON.stringify($scope.item.idKeluhan));
			}

			$scope.pindah = function(current){

                if ($scope.current == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }                
                
                var chacePeriode ={ 
                	0 : $scope.current.kpid,
                    1 : 'EditPenangananKeluhan',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }

                cacheHelper.set('PenangananKeluhanPelangganRevCtrl', chacePeriode);
                $state.go('PenangananKeluhanPelangganRev', {
                    kpid:  $scope.current.kpid,
                    noOrder:'EditPenangananKeluhan'
                });
			}

			$scope.optionsDataKeluhan = {
                toolbar:["excel"],
                excel: {
                    fileName:"Data Penanganan Keluhan Pelanggan"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                selectable: 'row',
                pageable: true,
                columns: [
	                {
	                    "field": "no",
	                    "title": "No",
	                    "width": 25,
	                },
	                {
	                    "field": "nocm",
	                    "title": "No RM",
	                    "width": 85,
	                }, 
	                {
	                    "field": "namapasien",
	                    "title": "Nama Pasien",
	                    "width": 100,
	                },
	                {
	                    "field": "jeniskelamin",
	                    "title": "JK",
	                    "width": 25,
	                },
	                {
	                    "field": "umur",
	                    "title": "Umur",
	                    "width": 45,
	                },
	                {
	                    "field": "pekerjaan",
	                    "title": "Pekerjaan",
	                    "width": 100,
	                },
	                {
	                    "field": "alamat",
	                    "title": "Alamat",
	                    "width": 110,
	                },
	                {
	                    "field": "keluhan",
	                    "title": "Keluhan",
	                    "width": 150,
	                }, 
	                {
	                    "field": "saran",
	                    "title": "Saran",
	                    "width": 150,
	                },
                    {
                        "field": "reply",
                        "title": "Balasan",
                        "width": 150,
                    }
              	],

            };			  
		}
	]);
});