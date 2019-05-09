define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarJadwalMaintenanceCtrl', ['$rootScope', '$scope', 'ModelItem','IPSRSService', 'ManageIPSRS', 'DateHelper', '$state', '$location', 'socket', '$window', '$mdDialog', 'ManagePhp', 'ModelItemAkuntansi', 'CacheHelper',
		function($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS, DateHelper, $state, $location, socket, $window, $mdDialog, managePhp, modelItemAkuntansi, cacheHelper) {
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
		// var tanggalSekarang = new moment($scope.now).format('YYYY-MM-DD');
		$scope.item.tanggalAwal = moment($scope.now).format('YYYY-MM-DD 00:00');
		$scope.item.tanggalAkhir = moment($scope.now).format('YYYY-MM-DD 23:59');
		// DATAGRID
        $scope.columnGrid = [
	        {
	            "field": "no",
	            "title": "No",
	            "width" : "30px",
	        },
	        {
	            "field": "idmaintenance",
	            "title": "Id Maintenance",
	            "width" : "70px",
	        },
	        {
	            "field": "jadwalmaintenanse",
	            "title": "Tgl Maintenance",
	            "width" : "100px",
	        },
	        {
	            "field": "keterangan",
	            "title": "Keterangan",
	            "width" : "110px",
	        },
	        {
	            "field": "namaruangan",
	            "title": "Ruangan",
	            "width" : "80px",
	        }
        ];
			    
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
            managePhp.getData("ip3rs/get-data-jawdalmaintenance-ip3rs?"
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

		$scope.Buat=function(){
            $state.go('JadwalMaintenanceIP3RS')
		}

		$scope.Hapus = function(current){
            if ($scope.dataSelected == undefined) {
                alert("Data Belum Dipilih!")
                return;
            }

            var data = 
            {
                norec: $scope.dataSelected.norec,               
            }

            var objSave = {
                data: data,
            }

            managePhp.hapusJadwalMaintenace(objSave).then(function(e) {
            	init();
                // ClearAll();                   
        	});
        }

        $scope.Ubah = function(current){

            if ($scope.dataSelected == undefined) {
                alert("Data Belum Dipilih!")
                return;
            }                      
            
            var chacePeriode ={ 
                0 : $scope.dataSelected.norec,
                1 : 'EditJadwal',
                2 : '',
                3 : '', 
                4 : '',
                5 : '',
                6 : ''
            }

            cacheHelper.set('JadwalMaintenanceIP3RSCtrl', chacePeriode);
            $state.go('JadwalMaintenanceIP3RS', {
                kpid:  $scope.dataSelected.norec,
                noOrder:'EditJadwal'
            });
        }

	 }
 ]);
});