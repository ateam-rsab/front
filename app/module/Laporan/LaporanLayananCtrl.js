define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanLayananCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
            //Inisial Variable 
        $scope.isRouteLoading=false;
        $scope.isLoading=false;
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        LoadCombo();
        var details =[];
        // var noId='';
        // LoadData();
        // $scope.dataSourceLaporanLayananService = []
        // $scope.item.tglawal = $scope.now;
        // $scope.item.tglakhir = $scope.now;
        $scope.dataSelected={};
        $scope.item={};
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
        $scope.nonbpjs={id:153,kelompokpasien:"Non BPJS"};
        // LoadData();
         function LoadCombo(){
            $scope.ListKondisi = [
                {
                    id: 1,
                    kondisi: "Jam Kerja"
                },{
                    id: 2,
                    kondisi: "Luar Jam Kerja"
                }
            ]
            manageTataRekening.getDataTableTransaksi("laporan/get-data-combo-laporan", false).then(function(data) {
                var datas = data.data;
                $scope.listDepartemen = data.data.departemen;
                $scope.listKelompokPasien = data.data.kelompokpasien;
                if($scope.listKelompokPasien != undefined){
                  $scope.listKelompokPasien.push($scope.nonbpjs)
                }
                $scope.listPegawai = data.data.dokter;
                $scope.listKelas = data.data.kelas;
                $scope.listPetugasPel= data.data.petugaspe;
            });

            modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                 $scope.listProduk = data;
            });

        }
        
        $scope.mainGroupOptLaporanLayananDokter = {
            pageable:{
                pageSize: 10,
                // previousNext: false,
            },
            columns: $scope.columnLaporanLayananDokter,
            sortable: {
                mode: "single",
                allowUnsort: false,
                showIndexes: true,
            },

        }
        $scope.LoadData=function(){
        
        var tglSekarang = new moment($scope.item.tglawal).format('YYYY-MM-DD 00:00')
        var tglAkhir = new moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59');
        var dept = "";
         if($scope.item.departement != undefined)
            dept = $scope.item.departement.id
        var ruangan = "";
        if($scope.item.ruangan != undefined || ruangan == null )
            ruangan = $scope.item.ruangan.id        
        var kelompok = "";
        if($scope.item.namaPenjamin != undefined || kelompok == null)
            kelompok = $scope.item.namaPenjamin.id
        var dokter = ""
        if($scope.item.namaDokter != undefined || dokter == null)
            dokter = $scope.item.namaDokter.id    
        var tindakan = ""
        if($scope.item.produk != undefined || tindakan == null)
            tindakan = $scope.item.produk.id        
        var kondisi = ""
        if($scope.item.Kondisi != undefined || kondisi == null)
            kondisi = $scope.item.Kondisi.id        
        var kelas = ""
        if($scope.item.kelas != undefined || kelas == null)
            kelas = $scope.item.kelas.id   
        var petugaspe = ""
        if($scope.item.PetugasPel != undefined || petugaspe == null)
            petugaspe = $scope.item.PetugasPel.id   
        $scope.isRouteLoading = true;
        $scope.dataSourceLaporanLayananService = modelItemAkuntansi.getDataTableTransaksi('laporan/get-detail-layanan?'
        +'tglAwal=' + tglSekarang 
        + '&tglAkhir=' + tglAkhir
        + '&idDept='+ dept
        + '&idRuangan=' + ruangan
        + '&idKelompok='+ kelompok
        + '&idDokter='+ dokter
        + '&tindakan='+ tindakan
        + '&kondisi='+ kondisi
        + '&kelas='+ kelas
        + '&PetugasPe='+ petugaspe
        ).then(function(dat){    
            details =  dat.data;      
            $scope.dataSourceLaporanPelayananDokter = new kendo.data.DataSource({               
                data:dat.data,
                selectable: true,
                refresh: true,
                serverPaging: false,
                // scrollable: false,
                // pageSize: 5
                
            })
            $scope.isRouteLoading = false;
        });
    }
    
    $scope.JadwalDokter=function(){ 
        $scope.isRouteLoading = true;
        var tglSekarang = new moment($scope.item.tglawal).format('M')
        var tglAkhir = new moment($scope.item.tglakhir).format('M');
        var bulan = "";
        switch(tglSekarang) {
          case "1": {bulan ="Januari"; break;}
          case "2": {bulan ="Februari"; break;}
          case "3": {bulan ="Maret"; break;}
          case "4": {bulan="April"; break;}
          case "5": {bulan="Mei"; break;}
          case "6": {bulan="Juni"; break;}  
          case "7": {bulan="Juli"; break;}
          case "8": {bulan="Agustus"; break;}
          case "9": {bulan="September"; break;}
          case "10": {bulan="Oktober"; break;}
          case "11": {bulan="November"; break;}
          case "12": {bulan="Desember"; break;}
          default : {bulan="";}
        }
        var ruangan = "";
        if($scope.item.ruangan != undefined || ruangan == null )
            ruangan = $scope.item.ruangan.id        
        var dokter = ""
        if($scope.item.namaDokter != undefined || dokter == null)
            dokter = $scope.item.namaDokter.id    
        modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-jadwaldokter-lap?"
        + "namabulan=" + bulan
        // + '&tglAkhir=' + tglAkhir
        + '&idDokter='+ dokter, true).then(function(dat){    
            details =  dat.data;
            $scope.winDialog.center().open();
            $scope.isRouteLoading=false;
            for (var i = 0; i < details.length; i++) {
                details[i].no = i+1
            }            
            $scope.dataGridDokter = new kendo.data.DataSource({               
                data:dat.data,
                selectable: true,
                refresh: true,
                serverPaging: false,
                // scrollable: false,
                // pageSize: 5
                
            })
        });
    }
        
        // $scope.dataSourceLaporanLayanan = [
        //     {no:1, tglpelayanan:'11/01/12',nocm: 111,namapasien:'Sulo',dokter:'Refel', inap:'y', rekanan:'KIS', unit:'1', ruangan:'Melati',layanan:'kasur',tarif:50000+'/hari',jumlah:1,statusbayar:'y'},
        //     {no:2, tglpelayanan:'11/01/12',nocm: 112,namapasien:'Aan',dokter:'Rubi', inap:'y', rekanan:'BPJS', unit:'1', ruangan:'Mawar',layanan:'kasur',tarif:100000+'/hari',jumlah:1,statusbayar:'y'},
        //     {no:3, tglpelayanan:'11/01/14',nocm: 113,namapasien:'Sandi',dokter:'Dhana', inap:'n', rekanan:'Pribadi', unit:'2', ruangan:'Anggrek',layanan:'kasur',tarif:500000+'/hari',jumlah:1,statusbayar:'n'},
        //     {no:4, tglpelayanan:'11/01/16',nocm: 114,namapasien:'Roki',dokter:'Dhana', inap:'y', rekanan:'Asuransi lain', unit:'1',ruangan:'Puspa',layanan:'kasur',tarif:250000+'/hari',jumlah:1,statusbayar:'y'},
        //     {no:5, tglpelayanan:'11/01/18',nocm: 115,namapasien:'Asman',dokter:'Rudi', inap:'n', rekanan:'Pribadi', unit:'1',ruangan:'Melati',layanan:'kasur',tarif:50000+'/hari',jumlah:1,statusbayar:'y'},
        //     {no:6, tglpelayanan:'11/01/20',nocm: 116,namapasien:'Jajang',dokter:'Sukmawan', inap:'y', rekanan:'BPJS', unit:'4',ruangan:'Delima',layanan:'kasur',tarif:100000+'/hari',jumlah:1,statusbayar:'y'},            
        // ]
        $scope.mainGroupOptionsLapLayananDok = {
            pageable:{
                // pageSize: 5,
                // previousNext: false,
                messages: {
                    display: "Showing {0} - {1} from {2} data items",                    
                },
            },            
            columns: $scope.columnLaporanLayananDokter,
            // dataSource:$scope.dataSourceLaporanLayanan,            
            selectable: true,
            refresh: true,
            scrollable: false,
            // dataSource: $scope.dataSourceLaporanLayanan2,
            sortable: {
                mode: "single",
                allowUnsort: false,
                showIndexes: true,
            },
        };

        $scope.columnLaporanLayananDokter = [           
            {
                "field": "tglpelayanan",
                "title": "Tanggal"
            },
            {
                "field": "nocm",
                "title": "No. RM"
            },
            {
                "field": "noregistrasi",
                "title": "Noregistrasi"
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien"
            },            
            {
                "field": "dokter",
                "title": "Nama Dokter"
            },
            {
                "field":"iddokter",
                "title":"ID Dokter"
            },
            {
                "field": "inap",
                "title": "Inap"
            },
            {
                "field": "namakelas",
                "title": "Nama Kelas"
            },
            {
                "field": "rekanan",
                "title": "Perusahaan Penjamin"
            },
            {
                "field":"ruangan",
                "title": "Ruangan"
            },
            {
                "field": "layanan",
                "title": "Layanan"
            },
            {
                "field": "tarif",
                "title": "Tarif"
            },
            {
                "field": "jumlah",
                "title": "Jumlah"
            },
            {
                "field": "statusbayar",
                "title": "Paid"
            }
        ];

        $scope.columnGridDokter = [           
            {
                "field": "no",
                "title": "No"
            },
            {
                "field": "namadokter",
                "title": "Dokter"
            },        
            {
                "field": "tanggal",
                "title": "Tanggal"
            },
            {
                "field": "namahari",
                "title": "Hari"
            },
            {
                "field":"namabulan",
                "title":"Bulanr"
            },
            {
                "field": "jammasuk",
                "title": "Jam Masuk"
            },
            {
                "field": "jampulang",
                "title": "Jam Pulang"
            }           
        ];

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
        //sdm service hanya sementara, nanti harus diganti pake service kasir !!

	    // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
	    // $scope.listRuangan = dat.data;
	    // });

        $scope.getIsiComboRuangan = function(){
            $scope.listRuangan = $scope.item.departement.ruangan
        }
        
        // ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
        //     $scope.listPegawai = dat.data;
        // });
	    // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
	    // $scope.listPasien = dat.data;
	    // });
        // manageLogistikPhp.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo", true).then(function(dat){
        //     debugger;
        //     //$scope.listPegawai = dat.data.dataDokter;
        //     $scope.listRuangan = dat.data.dataruangan;
        //     //$scope.listPegawaiKasir = dat.data.datakasir;
        //     //$scope.dataLogin = dat.data.datalogin[0];
        //     $scope.listKelompokPasien = dat.data.datakelompokpasien;
        // });
        findPasien.getKelompokPasien().then(function(e) {
            $scope.kelompokPasiens = e.data.data
        })
        $scope.$watch('item.namaPenjamin', function(e){
            // debugger;
            if (e === undefined) return;
            findPasien.getDataRekanan(e.id).then(function(data) {
                $scope.sourceDataRekanan = data.data.data.listData;
                $scope.item.institusiAsalPasien = $scope.sourceDataRekanan;
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

        $scope.listDataFormat = [
             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }
		];
        
        // debugger;
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
            // debugger;
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
            if($scope.item.namaPenjamin == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.namaPenjamin.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaDokter == undefined)
                var namaPegawai = "";
            else
                var namaPegawai = $scope.item.namaDokter.id;

            if($scope.item.produk == undefined)
                var layanan = "";
            else
                var layanan = $scope.item.produk.id;
            if($scope.item.Kondisi == undefined)
                var kondisi = "";
            else
                var kondisi = $scope.item.Kondisi.id;
            // if (noId != '') {
            //     var stt = 'false'
            //         if (confirm('View Laporan Rekap Layanan Dokter? ')){
            //             stt='true';
            //         }else {
            //             stt='false'
            //         }
            //         var client = new HttpClient();        
            //              client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-rekaplayanan='+$scope.dataLogin.id+'&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&idlaporan='+noId+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&layanan='+layanan+'&strIdPegawai='+namaPegawai+'&view='+ stt, function(response) {
            //                      // http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal=2017-08-01%2000:00:00&tglAkhir=2017-09-08%2023:59:59&idlaporan=PP18070001&strIdDepartement=16&strIdRuangan=18&strIdKelompokPasien=2&strIdPegawai=1&strIdPerusahaan=&view=true
                    
            //         });
            //         noId ='';
            // }else{
                var data2 = details
                var  TempData = []
                        for(var i=0;i<data2.length; i++){
                           // if (details[i].rekananfk != null && details[i].statusbarang == null){
                               TempData.push(data2[i])
                            // }    
                        }
                var data = 
                    {
                        tglawal:tglawal,
                        tglakhir:tglakhir,
                        details:TempData
                    }
                manageTataRekening.simpanlaporalayanan(data).then(function(e) {
                    $scope.isRouteLoading=false;
                    var noId = e.data.noId
                    var stt = 'false'
                    if (confirm('View Laporan Rekap Layanan Dokter? ')){
                        stt='true';
                    }else {
                        stt='false'
                    }
                    var client = new HttpClient();        
                        client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-rekaplayanan='+$scope.dataLogin.id+'&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&idlaporan='+noId+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&layanan='+layanan+'&strIdPegawai='+namaPegawai+'&view='+ stt, function(response) {
                                 // http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal=2017-08-01%2000:00:00&tglAkhir=2017-09-08%2023:59:59&idlaporan=PP18070001&strIdDepartement=16&strIdRuangan=18&strIdKelompokPasien=2&strIdPegawai=1&strIdPerusahaan=&view=true                   
                    });
                });

            // }        
	    }
        $scope.CetakDetail = function() {
        // if($scope.item.format == undefined){
        //  alert('format file harus dipilih terlebih dahulu !!!')
        // }
            // debugger;
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
            if($scope.item.namaPenjamin == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.namaPenjamin.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaDokter == undefined || $scope.item.namaDokter.id == undefined)
                var namaPegawai = "";
            else
                var namaPegawai = $scope.item.namaDokter.id;
            if($scope.item.produk == undefined)
                var layanan = "";
            else
                var layanan = $scope.item.produk.id;
            if($scope.item.Kondisi == undefined)
                var kondisi = "";
            else
                var kondisi = $scope.item.Kondisi.id;
            // if (noId != '') {
            //     var stt = 'false'
            //         if (confirm('View Laporan Detail Layanan Dokter? ')){
            //             stt='true';
            //         }else {
            //             stt='false'
            //         }
            //         var client = new HttpClient();        
            //             client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-detaillayanan='+$scope.dataLogin.id+'&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&idlaporan='+noId+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&layanan='+layanan+'&strIdPegawai='+namaPegawai+'&view='+ stt, function(response) {
            //                      // http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal=2017-08-01%2000:00:00&tglAkhir=2017-09-08%2023:59:59&idlaporan=PP18070001&strIdDepartement=16&strIdRuangan=18&strIdKelompokPasien=2&strIdPegawai=1&strIdPerusahaan=&view=true
            //              noId ='';
            //         });
            // }else{
                var data2 = details

                var  TempData = []
                        for(var i=0;i<data2.length; i++){
                           // if (details[i].rekananfk != null && details[i].statusbarang == null){
                               TempData.push(data2[i])
                            // }    
                        }
                var data = 
                    {   
                        tglawal:tglawal,
                        tglakhir:tglakhir,
                        details:TempData
                    }
                manageTataRekening.simpanlaporalayanan(data).then(function(e) {
                    $scope.isRouteLoading=false;
                    var noId = e.data.noId
                    var stt = 'false'
                    if (confirm('View Laporan Detail Layanan Dokter? ')){
                        stt='true';
                    }else {
                        stt='false'
                    }
                    var client = new HttpClient();        
                        client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-detaillayanan='+$scope.dataLogin.id+'&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&idlaporan='+noId+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&layanan='+layanan+'&strIdPegawai='+namaPegawai+'&view='+ stt, function(response) {
                                 // http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal=2017-08-01%2000:00:00&tglAkhir=2017-09-08%2023:59:59&idlaporan=PP18070001&strIdDepartement=16&strIdRuangan=18&strIdKelompokPasien=2&strIdPegawai=1&strIdPerusahaan=&view=true                        
                    });

                });

            // }
          
            }
        }
    ]);
});