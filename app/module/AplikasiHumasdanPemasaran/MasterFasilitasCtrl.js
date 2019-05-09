define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterFasilitasCtrl', ['$q', '$rootScope', '$scope','ManageSdm','InformasiDept','InformasiTest','InformasiRuangan','InformasiKelasDept','InformasiPegawaiTujuan',
		function($q, $rootScope, $scope, ManageSdm, InformasiDept, InformasiTest, InformasiRuangan,InformasiKelasDept,InformasiPegawaiTujuan) {
			$scope.item = {};
			$scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = true;
			$scope.now = new Date();
			$scope.object = {};
			var files;
        
		
         InformasiDept.getOrderList("fasilitas/get-list-departemen", true).then(function(dat){
         
            $scope.ListDataDept = dat.data.data;
            });
          InformasiTest.getOrderList("historiPelayananCs/get-load-produk-informasi", true).then(function(dat){
            $scope.ListDataInformasi = dat.data.data.listproduk;
           
            });
          InformasiRuangan.getOrderList("/ruangan/get-all-ruangan-by-id-dept", true).then(function(dat){
            
            $scope.ListDataRuangan = dat.data.data.data;
            });

          // InformasiKelasDept.getOrderList("/kelas/get-kelas-by-ruangan/?ruanganId="+$scope.item.ruangan, true).then(function(dat){
          //   debugger;
          //   $scope.ListDataKelas = dat.data.data.data;
          //   });
            
             $scope.getDataRuangan = function(){
          
               $scope.idruang = $scope.item.ruangan.id;
               ManageSdm.getItem("/kelas/get-kelas-by-ruangan/?ruanganId="+$scope.idruang,true).then(function(dat){
               
               $scope.ListDataKelas = dat.data.data.list;
               });
            }

            InformasiPegawaiTujuan.getOrderList("service/list-generic/?view=Pegawai&select=*", true).then(function(dat){
            $scope.ListDataPegawaiTujuan = dat.data;
            });

            // $scope.onSelect = function(e) {
            // 	debugger;
            //     $("#preview").empty();
            //     for (var i = 0; i < e.files.length; i++) {
            //         var file = e.files[i].rawFile;

            //         if (file) {
            //             var reader  = new FileReader();
            //             reader.onload = function(readerEvt) {
            //                 var binaryString = readerEvt.target.result;
            //                 var fileInput = {
            //                     "fileInput" : btoa(binaryString)
            //                 }
            //                 $scope.item.image = btoa(binaryString);
            //                 console.log(btoa(binaryString))
            //             }
            //             reader.onloadend = function () {
            //                 $("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview"));
            //             };

            //             reader.readAsDataURL(file);
            //         }
            //     }
            // }

               $scope.onSelect = function(e) {
                $("#preview").empty();
                for (var i = 0; i < e.files.length; i++) {
                    var file = e.files[i].rawFile;

                    if (file) {
                        var reader  = new FileReader();
                        reader.onload = function(readerEvt) {
                            debugger;
                            var binaryString = readerEvt.target.result;
                            $scope.item.image = btoa(binaryString);
                            $scope.newImage = binaryString;
                            // localStorage.setItem('imgData', binaryString); // save image json to localStorage
                            // localStorage.removeItem('imgData'); // hapus data json image dari localStorage
                        }
                        reader.onloadend = function () {
                            $("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview"));
                        };

                        reader.readAsDataURL(file);
                    }
                }
            }

            $scope.tes = function(e) {
            	debugger;
                $("#preview2").empty();
                for (var i = 0; i < e.files.length; i++) {
                    var file = e.files[i].rawFile;

                    if (file) {
                        var reader  = new FileReader();
                        reader.onload = function(readerEvt) {
                            var binaryString = readerEvt.target.result;
                            var fileInput = {
                                "fileInput" : btoa(binaryString)
                            }
                            $scope.item.image = btoa(binaryString);
                            console.log(btoa(binaryString))
                        }
                        reader.onloadend = function () {
                            $("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview2"));
                        };

                        reader.readAsDataURL(file);
                    }
                }
            }
            $scope.tes2 = function(e) {
            	debugger;
                $("#preview3").empty();
                for (var i = 0; i < e.files.length; i++) {
                    var file = e.files[i].rawFile;

                    if (file) {
                        var reader  = new FileReader();
                        reader.onload = function(readerEvt) {
                            var binaryString = readerEvt.target.result;
                            var fileInput = {
                                "fileInput" : btoa(binaryString)
                            }
                            $scope.item.image = btoa(binaryString);
                            console.log(btoa(binaryString))
                        }
                        reader.onloadend = function () {
                            $("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview3"));
                        };

                        reader.readAsDataURL(file);
                    }
                }
            }

            $scope.tes3 = function(e) {
            	debugger;
                $("#preview4").empty();
                for (var i = 0; i < e.files.length; i++) {
                    var file = e.files[i].rawFile;

                    if (file) {
                        var reader  = new FileReader();
                        reader.onload = function(readerEvt) {
                            var binaryString = readerEvt.target.result;
                            var fileInput = {
                                "fileInput" : btoa(binaryString)
                            }
                            $scope.item.image = btoa(binaryString);
                            console.log(btoa(binaryString))
                        }
                        reader.onloadend = function () {
                            $("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview4"));
                        };

                        reader.readAsDataURL(file);
                    }
                }
            }
		
		
		
		

			$scope.Save = function () {
				debugger;
				var data = {

				       	"namaFasilitas" : $scope.item.namaFasilitas,
						"kdFasilitas" : 1,
						"reportFasilitas" : $scope.item.namaFasilitas,
						"deskirpsiDetailFasilitas": $scope.item.deskripsi,
						"pathFileGambar1" : "stylesheets/Gambar/images1.jpg",
						"pathFileGambar2" : "stylesheets/Gambar/images1.jpg",
						"pathFileGambar3" : "stylesheets/Gambar/images1.jpg",
						"pathFileGambar4" : "stylesheets/Gambar/images1.jpg",
						"kdFasilitasHead" : $scope.item.kodeFasilitas,
						"kdJenisProduk" : {"id" : $scope.item.informasi.idProduk},
						"kdPegawaiPJawab" : {"id" : $scope.item.namaLengkap.id},
						"kdRuangan" : {"id" : $scope.item.ruangan.id},
						"kdKelas" : {"id" : $scope.item.namaKelas.id},
						"qtyFasilitas" : $scope.item.JmlFasilitas,
						"keteranganLainnya" : $scope.item.keterangan,
						"kdDepartemen" : {"id" : $scope.item.departemen.idDept},
						"kodeExternal" : $scope.item.kodeFasilitas,

						};



					ManageSdm.saveData(data,"fasilitas/save-fasilitas").then(function(e) {
						console.log(JSON.stringify(e.data));


					});
				
			}



			
	
		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }

		}
		]);
});