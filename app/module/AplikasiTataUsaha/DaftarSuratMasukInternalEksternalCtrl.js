define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarSuratMasukInternalEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
		function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
 			$scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now; 

            ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function(data) {
                $scope.ruangans = data;
            });

          var onDataBound = function() {
           debugger
                $('td').each(function() {
                  if ($(this).text() == "Pending") {
                    $(this).addClass('yellow')
                  }
                });
                $('td').each(function() {
                  if ($(this).text() == "Selesai") {
                    $(this).addClass('green')
                  }
                });
                $('td').each(function() {
                  if ($(this).text() == "Belum Dikerjakan") {
                    $(this).addClass('red')
                  }
                })
              };


            $scope.mainGridOptions = {
                pageable: true,
                dataBound: onDataBound,
                filterable: {
                  extra: false,
                  operators: {
                    string: {
                      startsWith: "Pencarian"
                    }
                  }
                }
            }

            //Ini Masih di Set Di Frontend
            $scope.GetRuanganUserLogin = function(){
                $scope.item.ruangan = "Sub Bagian Tata Usaha";
            }
            $scope.GetRuanganUserLogin();

            $scope.OnInit = function(){
                debugger
                //Ini Masih di set Di Frontend dan akan di sebarkan
              $scope.item.tujuanRuangan = {
                "id":304,
                "namaRuangan":"Sub Bagian Tata Usaha"   
              } 
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, "day").format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-daftar-distribusi-surat-by-ruangan-tujuan-periode/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + $scope.item.tujuanRuangan.id, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.tglDokumen =moment(dat.data.data[i].tglDokumen).format('DD-MM-YYYY'); 
                    }
                    $scope.gridDaftarSurat = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });
                });
            }
            $scope.OnInit();


            function pencarianData() {   
                // var ruangan = ModelItem.getPegawai().ruangan;
                // var idRuangan = "";
                // if (!_.isUndefined(ruangan.id)) {
                //     idRuangan = ruangan.id;
                // }   
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                //var tglAkhir = moment($scope.item.tanggalAkhir).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                debugger
                //console.log("surat-masuk/get-daftar-distribusi-surat-by-ruangan-tujuan-periode/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + $scope.item.tujuanRuangan);
                ManageSarpras.getOrderList("surat-masuk/get-daftar-distribusi-surat-by-ruangan-tujuan-periode/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + $scope.item.tujuanRuangan.id, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.tglDokumen =moment(dat.data.data[i].tglDokumen).format('DD-MM-YYYY'); 
                    }
                    $scope.gridDaftarSurat = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });
                });
              }
            $scope.cari = function(){
            	 pencarianData(); 	
            }
            $scope.colGridDaftarSurat = {
								pageable : true,
								 filterable: {
                           		 extra: false,
			                            operators: {
			                                string: {
			                                    startswith: "Dimulai dengan",
				                                eq: "Sama dengan",
				                                neq: "Mengandung kata"
			                                }
			                            }
			                        },
  								columns : [
									{
										field: "noDokumen",
										title: "<h3 align=center>No. Surat<h3>",
										width: "10%"
									},{
										field: "namaJudulDokumen",
										title: "<h3 align=center>Nama Surat<h3>",
										width: "10%"
									},{
										field: "ruanganPengirimNamaRuangan",
										title: "<h3 align=center>Ruangan Pengirim<h3>",
										width: "15%"
									},{
										field: "namaLengkap",
										title: "<h3 align=center>Nama Pengirim<h3>",
										width: "15%"
									},{
										field: "ruanganPenerimaNamaRuangan",
										title: "<h3 align=center>Ruangan Tujuan<h3>",
										width: "15%"
									},{
										field: "strukVerifikasinoRec",
										title: "<h3 align=center>Nomor Verifikasi<h3>",
										width: "15%"
									},{
										field: "status",
										title: "<h3 align=center>Status<h3>",
										width: "10%"
									}
								] 
							}

			$scope.klik = function(current) { 
                debugger
                var selectedItem = current; 
                $scope.idDocument = selectedItem.noRec; 
            };	
            
            $scope.terimaDokumen = function() {  
            	if($scope.idDocument === undefined){
            		toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
            	}
            	$state.go('TerimaSurat', { idDokumen:  $scope.idDocument }); 
            };	
		}])
})