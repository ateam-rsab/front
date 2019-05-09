define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PembayaranGajiPegawaiCtrl', ['$q', '$rootScope', '$scope', '$state','CacheHelper','ManageSdm',
		function($q, $rootScope, $scope,$state,cacheHelper,manageSdm) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};

			var noRECC = "";
debugger;
            if ($state.params.noTerima !== "") {
			    //Ambil dari cache aj biar gak ada decode dan encode url jadi masalah
			    var chacePeriode = cacheHelper.get('PembayaranGajiPegawai');
			    if(chacePeriode != undefined){
			     var arrPeriode = chacePeriode.split('#');
			     noRECC = arrPeriode[0];
			     $scope.item.tanggalPengajuan = arrPeriode[1];
			     $scope.item.Bulan = arrPeriode[2];
			     $scope.item.tahun = arrPeriode[3];
			     $scope.item.Total =parseFloat(arrPeriode[4]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") ;
			     $scope.item.keterangan= arrPeriode[5]+" s.d "+arrPeriode[6];

			 }};

			loadData()

			// $scope.item.tanggalPengajuan="";
			// $scope.item.Bulan="";
			// $scope.item.tahun="";
			// $scope.item.keterangan="";
			// $scope.item.Total=""

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			};

			function loadData(){

				// $scope.dataDaftarPenggajian = new kendo.data.DataSource({
				// 	data: [{"No":"1","NIP":"198503302003121002","NamaPegawai":"Agus Sustian",
				// 	"JenisPegawai":"Non PNS","Gol":"-","NoRekening":"321230002","Jumlah":"Rp. 2.000.000","Status":"PENGAJUAN"},
				// 	{"No":"2","NIP":"198503302003121002","NamaPegawai":"Adi Putra",
				// 	"JenisPegawai":"Non PNS","Gol":"-","NoRekening":"667567344","Jumlah":"Rp. 2.500.000","Status":"PENGAJUAN"}
				// 	]
				// });
				manageSdm.getOrderList("gaji-pegawai/detail-gaji-pegawai/?noRec="+noRECC).then(function(data){
					$scope.dataDaftarPenggajian=data.data.result;
				});
			};

			$scope.columnDaftarPenggajian = [
			{
				"field": "nipPns",
				"title": "NIP",width: "60px"
			},
			{
				"field": "namaRuangan",
				"title": "Ruangan",width: "120px"
			},
			{
				"field": "namaPegawai",
				"title": "Nama Pegawai",width: "250px"
			},
			{
				"field": "golPegawai",
				"title": "Golongan",width: "80px"
			},
			{
				"field": "noRekening",
				"title": "No Rekening",width: "100px"
			},
			{
				"field": "total",
				"title": "Total",width: "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
			}
			];
			$scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.detailTunjangan
                    }),
                    columns: [
                    {
                        "field": "kompHarga",
                        "title": "Komponen Gaji",
                        "width":"150px"
                    },
                    {
                        "field": "harga",
                        "title": "Total",
                        "width":"200px",
                        "template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
                    }]
                };
            };

			$scope.Kembali = function(){
				$state.go("DaftarPenggajian")
			}



///////////////// - TAMAT - ///////////////////////
		}


		
			
		]);
});