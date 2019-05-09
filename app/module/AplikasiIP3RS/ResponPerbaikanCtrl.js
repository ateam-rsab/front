define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ResponPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem','IPSRSService', 'ManageIPSRS', 'DateHelper', '$state', '$location', 'socket', '$window', '$mdDialog', 'ManagePhp', 'ModelItemAkuntansi', 'CacheHelper',
		function($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS, DateHelper, $state, $location, socket, $window, $mdDialog, ManagePhp, modelItemAkuntansi, cacheHelper) {
		$scope.isLoadingData = true;
		$scope.AllData = true;
		$scope.dataVOloaded = true;
		$scope.showUser = true;
		$scope.showAdmin = true;	
		$scope.item = {};
		$scope.item.noOrder = "";
		$scope.dataSelected = {};
		$scope.isRouteLoading=false;
		$scope.btnPscDisabled = true;
		$scope.btnPerbaikanDisabled = true;
		$scope.btnResponDisabled = true;
		$scope.jenisUser = JSON.parse(localStorage.getItem('pegawai'));
		if ($scope.jenisUser.ruangan.id != 229) {
			$scope.btnPscDisabled = false,
			$scope.btnPerbaikanDisabled = false,
			$scope.btnResponDisabled = false
		}
		// debugger
		$scope.now = new Date();
		var tanggalSekarang = new moment($scope.now).format('YYYY-MM-DD');
		$scope.item.tanggalAwal = tanggalSekarang;
		$scope.item.tanggalAkhir = tanggalSekarang;
		// DATAGRID
			        $scope.columnGrid = [
			        {
			            "field": "no",
			            "title": "No",
			            "width" : "30px",
			        },
			        {
			            "field": "noorder",
			            "title": "No Order",
			            "width" : "70px",
			        },
			        {
			            "field": "tglorder",
			            "title": "Tgl Order",
			            "width" : "100px",
			        },
			        {
			            "field": "ruanganasal",
			            "title": "Ruang Pemesan",
			            "width" : "60px",
			        },
			        {
			            "field": "ruangantujuan",
			            "title": "Ruangan Tujuan",
			            "width" : "80px",
			        },
			        {
			            "field": "namalengkap",
			            "title": "Nama User Pemesan",
			            "width" : "100px",
			        },
			        {
			            "field": "noverifikasi",
			            "title": "No Respon",
			            "width" : "100px",
			        }
			        ];

			    $scope.data2 = function(dataItem) {
	                return {
	                    dataSource: new kendo.data.DataSource({
	                        data: dataItem.details
	                    }),
	                    columns: [
	                        {
	                            "field": "produkid",
	                            "title": "Kode Smart",
	                            "width" : "50px",
	                        },
	                        {
	                            "field": "kdproduk",
	                            "title": "Kode Sirs",
	                            "width" : "50px",
	                        },
	                        {
	                            "field": "namaproduk",
	                            "title": "Kerusakan Peralatan/Gedung",
	                            "width" : "100px",
	                        },
	                        {
	                            "field": "kategoriperbaikan",
	                            "title": "Kategori Perbaikan",
	                            "width" : "100px",
	                        },
	                        {
	                            "field": "keteranganlainnya",
	                            "title": "Keterangan Permintaan",
	                            "width" : "100px",
	                        }
	                    ]
	                }
	            };  
			        // END DATAGRID
				$scope.klikGrid = function(dataSelected){
					// debugger
					var dataKlik;
					dataKlik = {
						norec: dataSelected.norec
					}
				};

				// DATA GRID
				function init() {
	                $scope.isRouteLoading=true;
	                var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm:ss');
	                var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm:ss');
	                ManagePhp.getData("ip3rs/get-daftar-permintaan-perbaikan?"
	                    +"tanggalAwal=" + tglAwal
	                    +"&tanggalAkhir=" + tglAkhir
	                    +"&noOrder=" + $scope.item.noOrder, true)
	                .then(function(data){
	                       $scope.isRouteLoading=false;   
		                   for (var i = 0; i < data.data.daftar.length; i++) {
                        		data.data.daftar[i].no = i+1
                    		}
                    		$scope.dataGrid = data.data.daftar;
	                });
            	}
            	// END DATA GRID
            	$scope.cari = function(){
                init();
            	}
            	$scope.respon=function(){
            		if ($scope.dataSelected.norec == undefined) {
        				messageContainer.error("Daftar Permintaan belum dipilih !!!")
                		return;
        			}
        			if ($scope.dataSelected.norec == null) {
        				messageContainer.error("Daftar Permintaan belum dipilih !!!")
                		return;
        			}
        			if ($scope.dataSelected.noverifikasi != undefined) {
        				messageContainer.error("Permintaan Perbaikan sudah direspon !!!")
                		return;
        			}
        			if ($scope.dataSelected.noverifikasi != null) {
						messageContainer.error("Permintaan Perbaikan sudah direspon !!!")
                		return;
        			}
	                var dataNorec = {
	                	"norec_so" : $scope.dataSelected.norec
	                }
	                ManagePhp.postPerbaikanIP3RS(dataNorec).then(function(e) {
	                	init();
	                })
        		}
        		$scope.perbaikan=function(){
        			var arrStr ={
        				 0:$scope.dataSelected.noorder,
        				 1:$scope.dataSelected.tglorder,
        				 2:$scope.dataSelected.norec
        			}
                    cacheHelper.set('PenangananCtrl', arrStr);
                    $state.go('Penanganan')
        		}
        		// --
			 }
	     ]);
       });