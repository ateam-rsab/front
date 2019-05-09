define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterAsuransiPegawaiCtrl', ['$rootScope', '$scope',
		'ModelItem', '$state','ManageSdm',
		function ($rootScope, $scope, ModelItem, $state, ManageSdm) {

			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
				$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			$scope.no = 1;

			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function (data) {
				$scope.listPenandatangan = data;
			})

			ManageSdm.getOrderList("pegawai-sk-asuransi/get-komponenharga-by-jenis", true).then(function (dat) {
				$scope.ListKomponenHarga = dat.data.data;
		    
			});
			ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function (dat) {
				$scope.ListRuangan = dat.data;
			debugger;
			});
			
			ManageSdm.getOrderList("pay-roll/find-rekanan-penjamin-pasien", true).then(function (dat) {
				$scope.ListRekananAsuransi = dat.data.data;
			
			
			});
			
			 var init = function () {
			
			ManageSdm.getOrderList("pegawai-sk-asuransi/get-all-pegawai-sk-asuransi", true).then(function (dat) {
				$scope.ListTampilGrid = dat.data.data;
		
			});
			
			}
			init();


			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});

			$scope.pindah = function () {

				$state.go("RekamDataPegawai");

			}

			$scope.Listketerangan = [
				//   {
				// 	"id": 1,
				// 	"kode": "1",
				// 	"keterangan": "Kepala Instalasi"
				// },{"id": 2,
				// 	"kode": "2",
				// 	"keterangan": "Pengelola Urusan"
				// },{
				// 	"id": 3,
				// 	"kode": "3",
				// 	"keterangan": "Pegawai Administrasi"					
				// }

			];


		

			$scope.pindah1 = function () {

				$state.go("DataKeluarga");

			}




			$scope.Listpublikasi = [
				{
					"id": 1,
					"kode": "1",
					"keterangan": "Ya"
				}, {
					"id": 2,
					"kode": "2",
					"keterangan": "Tidak"




				}

			];
			
			
				$scope.Listoperatorfactorrate = [
				{
					"id": 1,
					"kode": "1",
					"keterangan": "+"
				}, {
					"id": 2,
					"kode": "2",
					"keterangan": "-"
				}, {
					"id": 3,
					"kode": "2",
					"keterangan": "x"
				}, {
					"id": 3,
					"kode": "2",
					"keterangan": "/"		




				}

			];
			
			


			


			$scope.pindah1 = function () {

				$state.go("DataKeluarga");

			}
			
			 var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

            }


			
             $scope.mainGridOptions = {
				
                columns: [{
					"field": "noSuratKeputusan",
					"title": "No SK",
			         "width" : "250px",
					 "filterable":false			
				},{
					"field": "namaSuratKeputusan",
					"title": "Nama SK",
					"width" : "250px",
					 "filterable":false			
				},{
					"field": "tglBerlakuAwal",
					"title": "Tanggal Berlaku Awal",
					"width" : "180px",
				 "filterable":false,			
					"template": "#= new moment(new Date(tglBerlakuAwal)).format('DD-MM-YYYY') #"
				},{
					"field": "tglBerlakuAkhir",
					"title": "Tanggal Berlaku Akhir",
					"width" : "180px",
					 "filterable":false,		
					"template": "#= new moment(new Date(tglBerlakuAkhir)).format('DD-MM-YYYY') #"
				},{
					"field": "namaRuangan",
					"title": "Ruangan",
					"width" : "200px",
					"filterable":false			
				},{
					"field": "namaRekananPenjaminAsuransi",
					"title": "Rekanan Penjamin Asuransi",
					"width" : "190px",
					"filterable":false			
				},{
					"field": "namaKomponenHarga",
					"title": "Komponen Harga",
					"width" : "160px",
					"filterable":false			
				},{
					"field": "hargaSatuanPremi",
					"title": "Harga Satuan Premi",
					"width" : "150px",
					"filterable":false			
				},{
					"field": "persenPremi",
					"title": "Persen Premi",
					"width" : "120px",
					"filterable":false			
				},{
					"field": "factorRate",
					"title": "Factor Rate",
					"width" : "120px",
					"filterable":false			
				},{
					"field": "operatorFactorRatePremi",
					"title": "Operator Factor Rate",
					"width" : "150px",
					"filterable":false			
				},{
					"field": "totalFactorRatePremi",
					"title": "Total Factor Rate Premi",
					"width" : "160px",
					"filterable":false			
				},{
					"field": "isByMonth",
					"title": "Per Bulan",
					"width" : "120px",
					"filterable":false			
				},{
					"field": "isByYear",
					"title": "Per Tahun",
					"width" : "120px",
					"filterable":false			
				},{
					"field": "pegawaiSkAsuransiId",
					"title": "Pegawai SK Asuransi Id",
					"width" : "170px",
					"filterable":false,
                     hidden:true					
				},{
					"field": "suratKeputusanId",
					"title": "Surat Keputusan Id",
					"width" : "150px",
					"filterable":false,
					 hidden : true
				},{
					"field": "statusEnabled",
					"title": "Status Aktif",
					"width" : "190px"	 
                    					
				
              
                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			

			
			
			$scope.klik = function(m){

$scope.m = m;
 if (m.statusEnabled === true) {
                     $scope.vals = true;
                 } else {
                     $scope.vals = false;
                 }	

$scope.item.nosk = m.noSuratKeputusan;
$scope.item.namask = m.namaSuratKeputusan;


var a=moment($scope.item.e).format("DD-MM-YYYY");
var x=moment(m.tglBerlakuAkhir).format("DD-MM-YYYY");
a=x;
$scope.item.e=a;

var f=moment($scope.item.c).format("DD-MM-YYYY");
var t=moment(m.tglBerlakuAwal).format("DD-MM-YYYY");
f=t;
$scope.item.c=f;
$scope.item.namaRuangan = m.namaRuangan;
$scope.item.hargaSatuanPremi = m.hargaSatuanPremi;
$scope.item.persenPremi = m.persenPremi;
$scope.item.factorRate = m.factorRate;
$scope.item.totalFactorRatePremi= m.totalFactorRatePremi;
$scope.item.komponenHarga=m.namaKomponenHarga;
$scope.item.cb1=m.isByMonth;
$scope.item.pegawaiSkAsuransiId=m.pegawaiSkAsuransiId;
$scope.item.suratKeputusanId=m.suratKeputusanId;

 

for (var x=0;x<  $scope.ListTampilGrid.length ;x++){
					if ($scope.ListTampilGrid[x].namaRuangan === m.namaRuangan){
						$scope.item.namaRuangan = $scope.ListTampilGrid[x];
					
						
					}
				}

for (var y=0;y<  $scope.ListKomponenHarga.length ;y++){
					if ($scope.ListKomponenHarga[y].komponenHarga === m.namaKomponenHarga){
						$scope.item.komponenHarga = $scope.ListKomponenHarga[y];
						
						
					}
				}
				
for (var z=0;z<  $scope.Listoperatorfactorrate.length ;z++){
					if ($scope.Listoperatorfactorrate[z].keterangan === m.operatorFactorRatePremi){
						$scope.item.operatorFactorRate = $scope.Listoperatorfactorrate[z];
						
						
					}
				}				

for (var t=0;x<  $scope.ListRekananAsuransi.length ;t++){
if ($scope.ListRekananAsuransi[t].namaRekanan === m.namaRekananPenjaminAsuransi){
$scope.item.penjaminAsuransi = $scope.ListRekananAsuransi[t];

						
					}
				}		
				
};
			
			


			var aktif = "0";
			$scope.check = function () {
				if (aktif)
					aktif = "0";

				else
					aktif = "1";				
			}
			
			
	 var aktip = "0";		
			$scope.check2 = function () {
				if (aktip)
					aktip = "0";

				else
					aktip = "1";				
			}
			
	 var aktiv = "false";		
			$scope.check3 = function () {
				if (aktiv)
					aktiv = "false";

				else
					aktiv = "true";				
			}		
			
			


			$scope.Save = function() {
			
				
			//	if ($scope.item.isByYear==undefined)
			//	{
			//	$scope.item.isByYear=1;	
			//	}
			//	else
			//	{
			//		$scope.item.isByYear=$scope.item.isByYear;
					
			//	}	
				
			//	if ($scope.item.isByMonth==undefined)
			//	{
			//	$scope.item.isByMonth=1;	
			//	}
			//	else
			//	{
			//		$scope.item.isByMonth=$scope.item.isByMonth;
					
			//	}
			if ($scope.item.dataAktif === undefined) {
                     $scope.item.dataAktif = false;
                 }	
				
				
				
				
				
				debugger;
				var data1 = {
					
					
					"pegawaiSkAsuransiId":$scope.item.pegawaiSkAsuransiId,
					
					"suratKeputusanId":$scope.item.suratKeputusanId,
					"noSuratKeputusan"    :$scope.item.nosk,
					"namaSuratKeputusan"    :$scope.item.namask,
					"tglBerlakuAwal"  :moment($scope.item.c).format("YYYY-MM-DD"),
					"tglBerlakuAkhir" :moment($scope.item.e).format("YYYY-MM-DD"),
				
					"ruanganId":$scope.item.namaRuangan.id,
					"namaRuangan":"",
					"rekananPenjaminAsuransiId":$scope.item.penjaminAsuransi.id,
					"namaRekananPenjaminAsuransi":"",
					"komponenHargaId":$scope.item.komponenHarga.id,
					"namaKomponenHarga": "",
					"persenPremi": $scope.item.persenPremi,
					"factorRate": $scope.item.factorRate,
					"operatorFactorRate": $scope.item.operatorFactorRate.keterangan,
					"totalFactorRatePremi": $scope.item.totalFactorRatePremi,
					"hargaSatuanPremi": $scope.item.hargaSatuanPremi,
					"isByMonth": aktif,
					"isByYear": aktip,
					"statusEnabled" : $scope.item.dataAktif
					
				
					
					
					
					
					
					
				}			
	
						
			 	
             ManageSdm.saveSKAsuransiPegawai(data1,"pegawai-sk-asuransi/save-pegawai-sk-asuransi").then(function (e) {
				 debugger;
                  $scope.item= {};
                  init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };





















		}
	]);
});