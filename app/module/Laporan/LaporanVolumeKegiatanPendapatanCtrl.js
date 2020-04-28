define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanVolumeKegiatanPendapatanCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm, manageTataRekening) {
        //Inisial Variable 
        $scope.isRouteLoading = false;
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        
        $scope.CariLapVolumeKegiatan = function () {
            $scope.isRouteLoading = true;
            LoadData()
        }
        function LoadData() {

            var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
            var tempDepartemenId = "";
            if ($scope.item.departement != undefined) {
                tempDepartemenId = "&idDept=" + $scope.item.departement.id;
            }         

            var chacePeriode = {
                0: tglAwal,
                1: tglAkhir
            }
            cacheHelper.set('LaporanVolumeKegiatanPendapatanCtrl', chacePeriode);

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-volume-kegiatan-pendapatan?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                // + tempDepartemenId
                // + tempRuanganId
                // + tempDokterId
                + tempDepartemenId).then(function (data) {
                    $scope.isRouteLoading = false;
                    $scope.dataVolumeKegiatan = new kendo.data.DataSource({
                        data: data.data,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                })
        }

        $scope.click = function (dataPasienSelected) {
            var data = dataPasienSelected;            
        };
        $scope.formatTanggal = function (tanggal) {
            return moment(tanggal).format('DD-MMM-YYYY HH:mm');
        }
        $scope.formatRupiah = function (value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

        $scope.columnVolumeKegiatan = [          
            {
                "field": "noregistrasi",
                "title": "No. Registrasi",
                "width": "120px"              
            },
            {
                "field": "namaruangan",
                "title": "Nama Ruangan",
                "width": "180px"
            },
            {
                "field": "namakelas",
                "title": "Nama Ruangan",
                "width": "180px"
            },     
            {
                "field": "namaproduk",
                "title": "Nama Produk",
                "width": "180px"
            }, 
            {
                "field": "jenisproduk",
                "title": "Jenis Produk",
                "width": "100px",
                "template": "<span class='style-center'>#: jenisproduk #</span>"
            },
            {
                "field": "hargajual",
                "title": "Harga",
                "width": "180px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargajual #','')}}</span>"
            },                   
            {
                "field": "jumlah",
                "title": "Volume",
                "width": "180px",
                "template": "<span class='style-right'>{{formatRupiah('#: jumlah #','')}}</span>"
             
            },
            {
                "field": "total",
                "title": "Total",
                "width": "180px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #','')}}</span>"
            },
        ];

        $scope.Perbaharui = function () {
            $scope.ClearSearch();
        }

        //fungsi clear kriteria search
        $scope.ClearSearch = function () {
            $scope.item = {};
            $scope.item.tglawal = $scope.now;
            $scope.item.tglakhir = $scope.now;
            $scope.CariLapVolumeKegiatan();
        }

        var HttpClient = function() {
            this.get = function(aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function() { 
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                }

                anHttpRequest.open( "GET", aUrl, true );            
                anHttpRequest.send( null );
            }
        }
        manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
            $scope.listDepartemen = data.data.departemen;
            $scope.listKelompokPasien = data.data.kelompokpasien;
        })

        $scope.getIsiComboRuangan = function(){
            $scope.listRuangan = $scope.item.departement.ruangan
        }
        //sdm service hanya sementara, nanti harus diganti pake service kasir !!
        ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
	    $scope.listPegawai = dat.data;
	    });

	    // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,reportDisplay").then(function(dat) {
	    // $scope.listRuangan = dat.data;
	    // });

	    // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
	    // $scope.listPasien = dat.data;
	    // });

	    // ManageSdm.getItem("service/list-generic/?view=Departemen&select=*").then(function(dat) {
	    // $scope.listDepartemen = dat.data;
	    // });


        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;

        $scope.listDataFormat = [

             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }

			 ]
        
        debugger;
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 12:59";
       
        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.tglakhir = $scope.item.tglakhir;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
        $scope.CetakPendapatanInap = function() {
        // if($scope.item.format == undefined){
        // 	alert('format file harus dipilih terlebih dahulu !!!')
        // }
            debugger;
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.departement == undefined)
                var departement = "";
            else
                var departement = $scope.item.departement.id;
            var stt = 'false'
            if (confirm('View Laporan Pendapatan Rawat Inap? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatanInap=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdDepartemen='+departement+'&strIdPegawai='+$scope.pegawai.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });
            // if(client.status==0){
            //     if($scope.item.format == undefined){
            //         alert('format file harus dipilih terlebih dahulu !!!');
            //     }else{
            //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
            //         window.open(urlLaporan, '_blank');
            //     }
            // }   
	    };

       
        }
        ]);
});