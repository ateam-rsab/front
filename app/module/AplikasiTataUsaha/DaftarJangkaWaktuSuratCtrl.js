define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarJangkaWaktuSuratCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper',
	 '$state', '$window',
		function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
 						$scope.now = new Date();
 						$scope.item ={};
 						$scope.item.tanggalAwal = $scope.now ;
 						$scope.item.tanggalAkhir = $scope.now ;
 			 pencarianData();

            function pencarianData() {  
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }    
                debugger; 
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-daftar-surat-masuk-jangka-waktu/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) {
                    var dataFull =[]; 
                      	angular.forEach(dat.data.data, function(item){ 
                        var element = item; 
                        var tgl1 = moment(item.tglDokumen).format('YYYY-MM-DD HH:mm:ss');   
                        var oneDay = 24*60*60*1000;
                        var firstDate = new Date(tgl1);    
						var secondDate = new Date(); 
                        element.tglDokumen = moment(item.tglDokumen).format('DD-MM-YYYY');  
						var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
						var jangka = element.jangkaWaktu.split("-");
						var jml = 0;
						if(jangka[1] === 'Hari'){
							jml = jangka[0];
						}else if(jangka[1] === 'Minggu'){
							jml = jangka[0] * 7;
						}else if(jangka[1] === 'Bulan'){
							jml = jangka[0] * 30; 
						}else if(jangka[1] === 'Tahun'){
							jml = jangka[0] * 365; 
						}
						if(jml >= diffDays){
							element.flag = 'Berlaku';
						}else{
							element.flag = 'Kadaluarsa';
						}
						dataFull.push(element);
                    });
                    $scope.gridDaftarSurat = new kendo.data.DataSource({
                        data: dataFull,
                        pageSize: 10,
                        total: dataFull.length,
                        serverPaging: false
                    });
               });
            }
             $scope.cari = function() {
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
										field: "tglDokumen",
										title: "Tanggal Dokumen",
										width: "10%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									},{
										field: "noDokumen",
										title: "No Surat",
										width: "10%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									},{
										field: "namaJudulDokumen",
										title: "Nama Surat",
										width: "15%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									},{
										field: "ruanganPengirim",
										title: "Ruangan Pengirim",
										width: "15%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									},{
										field: "tujuanSurat",
										title: "Tujuan Surat",
										width: "15%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									},{
										field: "jenisSurat",
										title: "Jenis Surat",
										width: "10%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									},{
										field: "sifatSurat",
										title: "Sifat Surat",
										width: "15%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									},{
										field: "jangkaWaktu",
										title: "Jangka Waktu",
										width: "10%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	}
									} ,{
										field: "flag",
										title: "Jangka Waktu",
										width: "10%",
						                attributes: {
						                class: "#=flag != 'Berlaku' ? 'red' : 'green' #"
						              	} 
									} 
								] 
							}					 

		}])
})