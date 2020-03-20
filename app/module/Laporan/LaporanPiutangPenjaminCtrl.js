define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanPiutangPenjaminCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien) {
    		//Inisial Variable 
        $scope.isRouteLoading=false;
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));

        manageLogistikPhp.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo", true).then(function (dat) {
            $scope.listDepartemen = dat.data.departemen;
            $scope.listKelompokPasien = dat.data.datakelompokpasien;
        });
        $scope.getIsiComboRuangan = function(){
            $scope.listRuangan = $scope.item.departement.ruangan
        }


        $scope.CariLapPiutangPenjamin = function () {
            $scope.isRouteLoading = true;
            LoadData()
        }
        function LoadData() {

            var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');            
            var tempRuanganId = "";
            if ($scope.item.ruangan != undefined) {
                tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
            }
            var tempDepartemenId = "";
            if ($scope.item.tempDepartemenId != undefined) {
                tempDokterId = "&idDept=" + $scope.item.departement.id;
            }
            var tempKelPasienId = "";
            if ($scope.item.namaPenjamin != undefined) {
                tempKelPasienId = "&kelompokPasien=" + $scope.item.namaPenjamin.id;
            }

            var chacePeriode = {
                0: tglAwal,
                1: tglAkhir
            }
            cacheHelper.set('LaporanPiutangPenjaminCtrl', chacePeriode);

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-piutang-penjamin?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                + tempDepartemenId
                + tempRuanganId
                + tempKelPasienId).then(function (data) {
                    $scope.isRouteLoading = false;
                    $scope.dataPiutangPasien = new kendo.data.DataSource({
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

        $scope.columnPiutangPasien = [
            {
                "field": "tglregistrasi",
                "title": "Tgl Masuk",
                "width": "150px",
                "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
            },
            {
                "field": "nocm",
                "title": "No MR",
                "width": "120px"     
            },
            {
                "field": "namapasien",
                "title": "Nama pasien",
                "width": "180px"
            },
            {
                "field":"namaruangan",
                "title":"Unit Tujuan",
                "width":"180px"                   
            },
            {
                "field":"kelompokpasien",
                "title":"Kelompok Pasien",
                "width":"100px"                   
            },
            {
                "field":"namarekanan",
                "title":"Nama Penjamin",
                "width":"180px"                   
            },
            {
                "field": "karcis",
                "title": "Karcis",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: karcis #','')}}</span>"
            },          
            {
                "field": "embos",
                "title": "Embos",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: embos #','')}}</span>"
            },
            {
                "field": "konsul",
                "title": "Konsultasi",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: konsul #','')}}</span>"
            }, 
            {
                "field": "tindakan",
                "title": "Tindakan",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>"
            },                 
            {
                "field": "diskon",
                "title": "Diskon",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>"
            },
            {
                "field": "totalresep",
                "title": "Resep",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: totalresep #','')}}</span>"
            },
            {
                "field": "totalharusdibayar",
                "title": "Cash",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: totalharusdibayar #','')}}</span>"
             
            },
            {
                "field": "totalprekanan",
                "title": "Tagihan",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: totalprekanan #','')}}</span>" 
            },
            {
                "field": "totalbiaya",
                "title": "Total Biaya",
                "width": "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: totalbiaya #','')}}</span>" 
            }

        ];

        $scope.Perbaharui = function () {
            $scope.ClearSearch();
        }

        //fungsi clear kriteria search
        $scope.ClearSearch = function () {
            $scope.item = {};
            $scope.item.tglawal = $scope.now;
            $scope.item.tglakhir = $scope.now;
            $scope.CariLapPiutangPenjamin();
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
        findPasien.getKelompokPasien().then(function(e) {
            $scope.kelompokPasiens = e.data.data
        })
        $scope.$watch('item.namaPenjamin', function(e){
            //debugger
            if (e === undefined) return;
            findPasien.getDataRekanan(e.id).then(function(data) {
                $scope.sourceDataRekanan = data.data.data.listData;
                // $scope.item.institusiAsalPasien = $scope.sourceDataRekanan;
            });
            if(e.id==5 || e.id==3 ){
                $scope.Perusahaan=true
            }else{
                $scope.Perusahaan=false
                $scope.item.institusiAsalPasien=""
            }
        })

        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;
        
        //debugger
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 23:59";
       
        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.tglakhir = $scope.item.tglakhir;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
        $scope.Cetak = function() {
        // if($scope.item.format == undefined){
        // 	alert('format file harus dipilih terlebih dahulu !!!')
        // }
            //debugger
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.namaPenjamin == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.namaPenjamin.id;
            
            if($scope.item.institusiAsalPasien == undefined || $scope.item.institusiAsalPasien.id == undefined)
                var perusahaan = "";
            else
                var perusahaan = $scope.item.institusiAsalPasien.id;

            if($scope.item.departement == undefined)
                var departement = "";
            else
                var departement = $scope.item.departement.id;
            
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;

            var stt = 'false'
            if (confirm('View Kwitansi? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-kwitansiPiutang=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdKelompokPasien='+kelompokPasien+'&strIdPerusahaan='+perusahaan+'&login='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
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
        $scope.CetakTagihan = function() {
        // if($scope.item.format == undefined){
        //  alert('format file harus dipilih terlebih dahulu !!!')
        // }
            //debugger
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.namaPenjamin == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.namaPenjamin.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.institusiAsalPasien == undefined || $scope.item.institusiAsalPasien.id == undefined)
                var perusahaan = "";
            else
                var perusahaan = $scope.item.institusiAsalPasien.id;
            
            if($scope.item.departement == undefined)
                var departement = "";
            else
                var departement = $scope.item.departement.id;
            
            if(kelompokPasien=="" || perusahaan==""){
                alert('Kelompok Penjamin / Nama Perusahaan harus di isi !!!')
            }else{
                var stt = 'false'
                if (confirm('View Laporan Pasien Pulang? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                    // client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-LaporanTagihanPenjaminAll=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPerusahaan='+perusahaan+'&login='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                    client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-LaporanTagihanPenjaminAll=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&strIdPerusahaan='+perusahaan+'&view='+ stt, function(response) {
                    // do something with response
                });
            }
            // if(client.status==0){
            //     if($scope.item.format == undefined){
            //         alert('format file harus dipilih terlebih dahulu !!!');
            //     }else{
            //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
            //         window.open(urlLaporan, '_blank');
            //     }
            // }   
        };
        $scope.CetakSurat = function() {
        // if($scope.item.format == undefined){
        //  alert('format file harus dipilih terlebih dahulu !!!')
        // }
            //debugger
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.namaPenjamin == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.namaPenjamin.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.institusiAsalPasien == undefined || $scope.item.institusiAsalPasien.id == undefined)
                var perusahaan = "";
            else
                var perusahaan = $scope.item.institusiAsalPasien.id;
            var stt = 'false'
            if (confirm('View Laporan Pasien Pulang? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-LaporanTagihanPenjaminSurat=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPerusahaan='+perusahaan+'&login='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });           
        };

        $scope.CetakTransaksiPiutang = function() {       
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            var kelompokPasien = ""
            if($scope.item.namaPenjamin != undefined){
                kelompokPasien = $scope.item.namaPenjamin.id;
            }
            
            var ruangan = "";
            if($scope.item.ruangan != undefined){
                 ruangan = $scope.item.ruangan.id;
            }
            
            var perusahaanId = "";
            if($scope.item.institusiAsalPasien != undefined){
                perusahaanId = $scope.item.institusiAsalPasien.id;
            }

            if(kelompokPasien==""){
                alert('Kelompok Penjamin / Nama Perusahaan harus di isi !!!')
            }else{
                var stt = 'false'
                if (confirm('View Laporan? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-transaksipiutangperusahaan=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdKelompokPasien='+kelompokPasien+'&strIdPerusahaan='+perusahaanId+'&login='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
                });
            }        
        };
       
        }
    ]);
});