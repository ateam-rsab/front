define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterFasilitasRevCtrl', ['$q', '$rootScope', '$scope','ManageSdm','InformasiDept','InformasiTest','InformasiRuangan','InformasiKelasDept','InformasiPegawaiTujuan','ModelItemAkuntansi','ManageLogistikPhp',
		function($q, $rootScope, $scope, ManageSdm, InformasiDept, InformasiTest, InformasiRuangan,InformasiKelasDept,InformasiPegawaiTujuan,modelItemAkuntansi,manageLogistikPhp) {
			$scope.item = {};
			$scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = true;
            loadDataCombo();
			$scope.now = new Date();
			$scope.object = {};
			var files;
            var data1;
            var data2;
            var data3;
            var data4;
        
        function loadDataCombo(){
            debugger;
            modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawaipp", true, true, 20).then(function(data) {
                $scope.listPegawai=data;
            });

            modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function(dat){
                $scope.ListKelas=dat.kelaskamar;
                $scope.ListRuangan=dat.ruangan;
                $scope.Listkelompokproduk=dat.kelompokproduk;
                $scope.ListDept=dat.departemen;
            })
            // LoadData();
        }

         // InformasiDept.getOrderList("fasilitas/get-list-departemen", true).then(function(dat){
         
         //    $scope.ListDataDept = dat.data.data;
         //    });
         //  InformasiTest.getOrderList("historiPelayananCs/get-load-produk-informasi", true).then(function(dat){
         //    $scope.ListDataInformasi = dat.data.data.listproduk;
           
         //    });
         //  InformasiRuangan.getOrderList("/ruangan/get-all-ruangan-by-id-dept", true).then(function(dat){
            
         //    $scope.ListDataRuangan = dat.data.data.data;
         //    });

          // InformasiKelasDept.getOrderList("/kelas/get-kelas-by-ruangan/?ruanganId="+$scope.item.ruangan, true).then(function(dat){
          //   debugger;
          //   $scope.ListDataKelas = dat.data.data.data;
          //   });
            
            //  $scope.getDataRuangan = function(){
          
            //    $scope.idruang = $scope.item.ruangan.id;
            //    ManageSdm.getItem("/kelas/get-kelas-by-ruangan/?ruanganId="+$scope.idruang,true).then(function(dat){
               
            //    $scope.ListDataKelas = dat.data.data.list;
            //    });
            // }

            // InformasiPegawaiTujuan.getOrderList("service/list-generic/?view=Pegawai&select=*", true).then(function(dat){
            // $scope.ListDataPegawaiTujuan = dat.data;
            // });

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
                        data1=file;
                        console.log(data1);
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
                        data2=file;
                        console.log(data2);
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
                        data3=file;
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
                        data4=file;
                        reader.readAsDataURL(file);
                    }
                }
            }

			$scope.Save = function () {
				debugger;
                if ($scope.item.ruangan == undefined) {
                    alert("Pilih Ruangan Terlebih Dahulu!!")
                    return
                }
                if ($scope.item.kelas == undefined) {
                    alert("Pilih Kelas Terlebih Dahulu!!")
                    return
                }
                if ($scope.item.informasi == undefined) {
                    alert("Pilih Kelompok Produk Terlebih Dahulu!!")
                    return
                }
                    
                if ($scope.item.pegawai == undefined) {
                    alert("Pilih Pegawai Penanggung Jawab Terlebih Dahulu!!")
                    return
                }                

				var data = {

				       	"namaFasilitas" : $scope.item.namaFasilitas,
						"kdFasilitas" : 1,
						"reportFasilitas" : $scope.item.namaFasilitas,
						"deskirpsiDetailFasilitas": $scope.item.deskripsi,
						"filegambar1" : data1,
						"filegambar2" : data2,
						"filegambar3" : data3,
						"filegambar4" : data4,
						"kdFasilitasHead" : $scope.item.kodeFasilitas,
						"kdJenisProduk" : {"id" : $scope.item.informasi.id},
						"kdPegawaiPJawab" : {"id" : $scope.item.namaLengkap.id},
						"kdRuangan" : {"id" : $scope.item.ruangan.id},
						"kdKelas" : {"id" : $scope.item.kelas.id},
						"qtyFasilitas" : $scope.item.JmlFasilitas,
						"keteranganLainnya" : $scope.item.keterangan,
						"kdDepartemen" : {"id" : $scope.item.departemen.id},
						"kodeExternal" : $scope.item.kodeFasilitas,

						};

					manageLogistikPhp.postfasilitas(data,"fasilitas/save-fasilitas").then(function(e) {
					});
				
			}

		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }

		}
		]);
});