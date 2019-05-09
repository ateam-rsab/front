define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('SuratMasukEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
		function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
 			var fileTypes = ['doc', 'docx']; //acceptable file types
            var files;
			$scope.item ={};
			$scope.item.ruanganTujuan=[]; 

 		    ManageSarpras.getOrderList("service/list-generic/?view=TipePengirimSurat&select=id,name,reportDisplay", true).then(function(dat) {
                 $scope.listTipeSurat = dat.data; 
             }); 	

 		    ManageSarpras.getOrderList("service/list-generic/?view=SifatSurat&select=id,name", true).then(function(dat) {
                 $scope.listSifatSurat = dat.data;
            }); 	

 		    ManageSarpras.getOrderList("service/list-generic/?view=StatusBerkas&select=id,name", true).then(function(dat) {
                 $scope.listStatusBerkas = dat.data;
            });

 		    ManageSarpras.getOrderList("service/list-generic/?view=JenisSurat&select=id,name", true).then(function(dat) {
                 $scope.listJenisSurat = dat.data;
             });

 		    ManageSarpras.getOrderList("service/list-generic/?view=JenisArsip&select=id,name", true).then(function(dat) {
                 $scope.listJenisArsip = dat.data;
             });

 		    ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true).then(function(dat) {
                 $scope.ListRuangan = dat.data;
            });

			$scope.redirect = function() {
                $state.go('ListDaftarSuratMasuk', { jenisSurat:  $scope.dok }); 
            }
 		
            initial();
 			function initial(){
 					$scope.item ={};
 					$scope.item.ruanganTujuan=[];
 				    $scope.item.pegawai = ModelItem.getPegawai();
		            $scope.item.penerimaSurat = $scope.item.pegawai.namaLengkap;             
		            $scope.item.ruanganPenerima = $scope.item.pegawai.ruangan.namaRuangan; 
 			}
 

 		    $scope.listJangkaWaktuRange =[{'id':1,'name':'Hari'},{'id':2,'name':'Minggu'},{'id':3,'name':'Bulan'},{'id':4,'name':'Tahun'}]
	
   			 $scope.Cancel = function() {
                 initial();
             }

            
            $scope.onSelectFile = function(e)
            {
                var tempArray = e.files[0].rawFile.name.split(".");
                files = e.files[0].rawFile;
                /*if(tempArray[tempArray.length-1] != "doc"){
                    window.messageContainer.error("File upload tidak sesuai \n extension file harus .doc atau docx");
                    
                    if(files != e.files[0].rawFile)
                    {
                        setTimeout(function(){ 
                            $(".k-widget.k-upload.k-header.k-upload-sync").find("ul").remove(); 
                        }, 5);
                    }
                }
                else
                {
                    files = e.files[0].rawFile;
                }*/
            }

             $scope.Save = function(){
             	if( $scope.item.tanggalAwal === undefined, 
             		$scope.item.namaSurat  === undefined,
             		$scope.item.tipeSurat  === undefined,
             		$scope.item.sifatSurat  === undefined,
             		$scope.item.statusBerkas  === undefined,
             		$scope.item.jenisSurat  === undefined,
             		$scope.item.jenisArsip === undefined,
             		$scope.item.jangkaWaktu === undefined,
             		$scope.item.jangkaWaktuRange === undefined,
             		$scope.item.asalSurat === undefined,
             		$scope.item.penerimaSurat === undefined,
             		$scope.item.ruanganPenerima === undefined,
             		$scope.item.nomorSurat === undefined,
             		$scope.item.perihal === undefined,
             		$scope.item.lampiranPerihal === undefined,
             		$scope.item.ruanganTujuan === undefined){
             		 toastr.warning("Lengkapi semua data");
                     return;
             	}
                console.log($scope.item);
                var f = files;
                {
                    var reader = new FileReader();
                    
                    var name = f.name;
                    reader.onload = function(e) {
                        var data = e.target.result;
                         var paramSave = {
                           "tglSurat" : $scope.item.tanggalAwal , 
                            "namaSurat" : $scope.item.namaSurat ,
                            "tipePengirimSurat" : $scope.item.tipeSurat  ,
                            "sifatSurat" : $scope.item.sifatSurat  ,
                            "statusBerkas" : $scope.item.statusBerkas  ,
                            "jenisSurat" : $scope.item.jenisSurat ,
                            "jenisArsip" : $scope.item.jenisArsip ,
                            "jangkaWaktu" : $scope.item.jangkaWaktu ,
                            "jangkaWaktuRange" : $scope.item.jangkaWaktuRange.name,
                            "asalSurat" : $scope.item.asalSurat ,
                            "pegawaiPenerima" : $scope.item.pegawai ,
                            "ruanganPenerima" : $scope.item.pegawai.ruangan ,
                            "noSurat" : $scope.item.nomorSurat,
                            "perihal" : $scope.item.perihal ,
                            "lampiran" : $scope.item.lampiranPerihal ,
                            "ruanganTujuan" : $scope.item.ruanganTujuan ,
                                 "fileName" : name,
                                "bodyFile" : btoa(data)

                            }
                            console.log(paramSave);
                            ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-surat-masuk-dari-external").then(function(dat) {
                                console.log(dat);
                               
                                $scope.item = {};
                                initial();
                            });
 
                    };

                    reader.readAsBinaryString(f);
                }
             }

		}])
})