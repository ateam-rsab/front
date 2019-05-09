
define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DistribusiSuratCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window', '$filter',
		function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window, $filter) {
 			 $scope.item = {}; 
 			 $scope.afterSend = true;
 			 $scope.item.namaPengirim = ModelItem.getPegawai().namaLengkap;
 			if ($state.params.idDokumen !== "") { 
                ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-internal-eksternal-by-id-dokumen/?idDokumen=" + $state.params.idDokumen).then(function(dat) {
                     $scope.item.tanggalKirim =new Date(dat.data.data.tglDokumen);
                     $scope.item.ruanganTujuan = dat.data.data.ruangans;
                     $scope.item.noSurat = dat.data.data.noDokumen;
                     $scope.item.namaSurat = dat.data.data.judulDokumen;
                     $scope.item.ruanganPengirim= dat.data.data.ruanganPengirim;
                })
            }  
  			
  			$scope.download = function() { 
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + $state.params.idDokumen, true);
            }

  			$scope.redirect = function(){ 
				window.location = "#/DaftarDistribusiSuratInternaldanEksternal";
			}

 			$scope.item.ruanganTujuan = []; 
			 ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true).then(function(dat) {
                 debugger
                 $scope.ListRuangan = dat.data; 
            });

 			 ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat) {
                $scope.listNamaPengirimSurat = dat.data; 
             }); 

             ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=ruangan.id&values=304", true).then(function(dat) {
                $scope.listNamaPengantarSurat = dat.data;  
             });  

            $scope.kirim = function() { 
                 if($scope.item.namaPengantarSurat === undefined || $scope.item.jam === undefined){
                    toastr.warning("Pengantar surat dan jam harus terisi..");
                    return;
                } 

                            var paramSave = {
                            	"dokumen" : {
                            		"id": $state.params.idDokumen
                            	},
                                "pegawaiPengantarSurat": $scope.item.namaPengantarSurat, 
                                "jamKirim": moment($scope.item.jam).format('HH:mm')

                            }
 
                            ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-kirim-distribusi-surat").then(function(dat) {
                                $scope.afterSend = false;
                            });
            }

			
		}])
})