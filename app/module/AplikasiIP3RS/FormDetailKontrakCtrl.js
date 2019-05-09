define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormDetailKontrakCtrl', ['$rootScope', '$scope', 'ModelItem','$window', '$timeout', 'ManageSarpras', 'IPSRSService', '$state', 'DateHelper',
		function($rootScope, $scope, ModelItem, $window, $timeout, ManageSarpras, IPSRSService, $state, DateHelper) {
			$scope.item = {};

			IPSRSService.getItem("service/list-generic/?view=Jabatan&select=id,namaJabatan").then(function(dat){
			    $scope.dataJabatan = dat.data;
			    // debugger;
			});
			IPSRSService.getItem("service/list-generic/?view=Pegawai&select=namaLengkap,id").then(function(dat){
			    $scope.dataPegawai = dat.data;
			    // debugger;
			});
			IPSRSService.getItem("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function(dat){
			    $scope.dataSatuanStandar = dat.data;
			    // debugger;
			});

			$scope.no = 1;
			var init = function () {
				debugger
				IPSRSService.getItem("kontrak/detail-kontrak/?noRec="+$state.params.noRec).then(function(dat){
					debugger
				    $scope.dataGrid = dat.data.detail;
				    if ($scope.dataGrid == undefined) {
					    window.messageContainer.error("Data tidak ada !!!")
					} else {
						$scope.dataGrid.forEach(function(data){
						data.no = $scope.no++;
						var date1 = new Date(data.tanggalAwalKontrak);
						var date2 = new Date(data.tanggalAhirKontrak);
						data.namaRekanan = dat.data.header.namaRekanan;
						data.noSk = dat.data.header.noSk;
						data.tanggalAwalKontrak = DateHelper.getTanggalFormatted(date1);
						data.tanggalAhirKontrak = DateHelper.getTanggalFormatted(date2);
						});
					}
				    $scope.dataKontrak = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
					debugger
					$scope.item.noKontrak = dat.data.header.noSk;
					$scope.item.namaRakanan = dat.data.header.namaRekanan;
					$scope.item.namaKontrak = dat.data.header.namaKontrak;
				});
			};
			init();
			
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"no",title:"<h3 align=center>No.<h3>"},
				{ field:"noSk",title:"<h3 align=center>Nomor Kontrak<h3>" },
				{ field:"namaRekanan",title:"<h3 align=center>Nama Rekanan<h3>" },
				{ field:"nilaiKontrak",title:"<h3 align=center>Nilai Kontrak<h3>" },
				{ field:"tanggalAwalKontrak",title:"<h3 align=center>Tgl Awal kontrak<h3>" },
				{ field:"tanggalAhirKontrak",title:"<h3 align=center>Tgl Akhir Kontrak<h3>" },
				{ field:"selisihKontrak",title:"<h3 align=center>Jangka Waktu Kontrak<h3>" }],
				editable: false
			};

			$scope.batal=function(){
				$state.go("FormKontrak",
				{ 	
				});
			};

			$scope.HitungTanggal = function(date1,date2) {
			    var diff = Math.floor(date1.getTime() - date2.getTime());
			    var day = 1000 * 60 * 60 * 24;

			    var days = Math.floor(diff/day);
			    if (days >= 30 ) {
			    	var months = Math.floor(days/30);
			    	$scope.item.hari = days - (months*30);
			    	if (months >= 12) {
			    		var years = Math.floor(months/12);
			    		$scope.item.bulan = months - (years*12);
			    		$scope.item.jangkaWaktu = $scope.item.hari+" Hari "+$scope.item.bulan+" Bulan "+years+" Tahun";
			    	} else {
						$scope.item.jangkaWaktu = $scope.item.hari+" Hari "+months+" Bulan "
			    	}
			    } else {
			    	$scope.item.jangkaWaktu = days+" Hari "
			    }
		    };
		    $scope.getTanggalHari = function () {
		       debugger
				var date1 = $scope.item.tanggalAwal;
				var date2 = $scope.item.tanggalAkhir;
				$scope.item.sisaHari = $scope.HitungTanggal(date2,date1);
				console.log($scope.item.sisaHari);
			};
			$scope.save_detailKontrak = function () {
				var listRawRequired = [
				"item.detailPekerjaan|ng-model|Detail Pekerjaan",
				"item.quantity|ng-model|Quantity",
				"item.satuanStandar|k-ng-model|Satuan Standar",
				"item.tanggalAwal|k-ng-model|Tanggal Awal",
				"item.tanggalAkhir|k-ng-model|Tanggal Akhir",
				"item.jangkaWaktu|ng-model|Jangka Waktu",
				"item.penanggungJawab|k-ng-model|Penanggung Jawab",
				"item.jabatan|k-ng-model|Jabatan",
				"item.keterangan|ng-model|Keterangan",
				"item.nilaiKontrak|ng-model|Nilai Kontrak"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				var tanggalAwal = DateHelper.getTanggalFormattedNew($scope.item.tanggalAwal);
				var tanggalAkhir = DateHelper.getTanggalFormattedNew($scope.item.tanggalAkhir);
				var data = 
			    {
			    	"keteranganLainnya": $scope.item.keterangan,
				    "detailPekerjaan": $scope.item.detailPekerjaan,
				    "satuanStandar": {
				    	"id":$scope.item.satuanStandar.id
				    },
				    "tanggalAwalKontrak": tanggalAwal,
				    "jabatanPegawaiRekanan": {
				    	"id":$scope.item.jabatan.id
				    },
				    "qtyProduk": $scope.item.quantity,
				    "pegawaiRekanan": {
				    	"id":$scope.item.penanggungJawab.id
				    },
				    "nilaiKontrak": $scope.item.nilaiKontrak,
				    "rekananSkKontrak": {
				    	"noRec":$state.params.noRec
				    },
				    "selisihKontrak": $scope.item.jangkaWaktu,
				    "tanggalAhirKontrak": tanggalAkhir
			    }
			    if(isValid.status){
					IPSRSService.saveDataSarPras(data, "kontrak/save-kontrak-detail/").then(function(e) {
						console.log(JSON.stringify(e.data));
						init();
						$scope.item.tanggalAwal="";
						$scope.item.tanggalAkhir="";
						$scope.item.keterangan="";
						$scope.item.detailPekerjaan="";
						$scope.item.satuanStandar="";
						$scope.item.jabatan="";
						$scope.item.quantity="";
						$scope.item.penanggungJawab="";
						$scope.item.nilaiKontrak="";
						$scope.item.jangkaWaktu="";
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			    
			}
		}
	]);
});
