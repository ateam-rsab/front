define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PersetujuanTindakanAnestesiCtrl', ['$scope', '$state', 'CacheHelper', 'ManagePhp',
        function ($scope, $state, cacheHelper, managePhp) {

            $scope.item = {};
            $scope.cc = {};
            var nomorEMR = '-'
            $scope.cc.emrfk = 8
            var dataLoad = []

            nomorEMR = '-'
            var chekedd = false
            var chacePeriode = cacheHelper.get('cacheNomorEMR');
            if(chacePeriode != undefined){
                nomorEMR = chacePeriode[0]
                $scope.cc.norec_emr = nomorEMR
                managePhp.getData("rekam-medis/get-emr-transaksi-detail?noemr="+nomorEMR+"&emrfk="+$scope.cc.emrfk, true).then(function(dat){
                    $scope.item.obj = []
                    $scope.item.obj2 = []
                    dataLoad = dat.data.data
                    for (var i = 0; i <= dataLoad.length - 1; i++) {
                        if (parseFloat($scope.cc.emrfk)  == dataLoad[i].emrfk) {
                            if(dataLoad[i].type == "textbox") {
                                $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            }
                            if(dataLoad[i].type == "checkbox") {
                                chekedd = false
                                if (dataLoad[i].value == '1') {
                                    chekedd = true
                                }
                                $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                            }

                            if(dataLoad[i].type == "datetime") {
                                $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                            }

                            if(dataLoad[i].type == "checkboxtextbox") {
                                $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                $scope.item.obj2[dataLoad[i].emrdfk] = true
                            }
                            if(dataLoad[i].type == "textarea") {
                                $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                            }
                        }
                        
                    }
                })
            }

            var chacePeriode = cacheHelper.get('cacheRekamMedis');
            if(chacePeriode != undefined){
                $scope.cc.nocm = chacePeriode[0]
                $scope.cc.namapasien = chacePeriode[1]
                $scope.cc.jeniskelamin = chacePeriode[2]
                $scope.cc.noregistrasi = chacePeriode[3]
                $scope.cc.umur = chacePeriode[4]
                $scope.cc.kelompokpasien = chacePeriode[5]
                $scope.cc.tglregistrasi = chacePeriode[6]
                $scope.cc.norec = chacePeriode[7]
                $scope.cc.norec_pd = chacePeriode[8]
                $scope.cc.objectkelasfk = chacePeriode[9]
                $scope.cc.namakelas =chacePeriode[10]
                $scope.cc.objectruanganfk =chacePeriode[11]
                $scope.cc.namaruangan =chacePeriode[12]  
                $scope.cc.DataNoregis =chacePeriode[12]  
                if (nomorEMR == '-') {
                    $scope.cc.norec_emr = '-'
                }else{
                    $scope.cc.norec_emr = nomorEMR       
                }
            }


            $scope.simpan = function(){

                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    arrSave.push({id:arrobj[i],values:$scope.item.obj[parseInt(arrobj[i])]})
                }
                var jsonSave = {
                    head : $scope.cc,
                    data : arrSave
                }
                managePhp.saveDataEMR(jsonSave).then(function (e) {
                    // $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                    //     namaEMR : $scope.cc.emrfk,
                    //     nomorEMR : e.data.data.noemr 
                    // });

                    var arrStr = {
                            0: e.data.data.noemr 
                        }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }
             $scope.Batal = function(){
           
                alert('Asas')
            }


            $scope.item.datalist = [
                { id: 1, 
                    col1: [
                            {nama:"Anestesi Umum",id:1901300050}
                        ], 
                    col2: [
                            {nama:"Hasil yang di harapkan",nama2:"Total tidak sadar, kemungkinan pemakaian selang pernafarsan"},
                            {nama:"Teknik",nama2:"Obat disuntikan ke aliran darah, dihembuskan ke saluran pernafasan atau lewat alur lain"},
                            {nama:"Resiko (tapi tidak hanya terbatas pada yang di sebut)",nama2:"Nyeri pada mulut / tenggorokan, suara serak, perlukaan pada mulut atau gigi, sadar saat sedang dalam anestesi, perlukaan pada pembuluh darah, muntah, aspirasi, abrasi kornea"}
                        ]
                },
                { id: 2, 
                    col1: [
                            {nama:"Spinal atau Epidural Anestesi",id:1901300051,namacol:[
                                    {nama:"Dengan Penenang (Sedasi)",id:1901300052},
                                    {nama:"Tanpa Penenang",id:1901300053}
                                ]
                            }
                        ], 
                    col2: [
                            {nama:"Hasil yang di harapkan",nama2:"Penurunan / hilangnya sensasi / pergerakan di area bagian bawah"},
                            {nama:"Teknik",nama2:"Obat disuntikan melalui jarum / kateter yang di masukan ke cairan di dalam spinal canal atau langsung di luar saluran / spinal canal"},
                            {nama:"Resiko (tapi tidak hanya terbatas pada yang di sebut)",nama2:"Sakit kepala, sakit pinggang, berdenging telinga, kejang, infeksi, sisa nyeri pada anestesi dan cedera pada pembuluh darah 'total spinal'"}
                        ]
                },
                { id: 3, 
                    col1: [
                            {nama:"Blok Syaraf Besar / Kecil",id:1901300054,
                             namacol:[
                                    {nama:"Dengan Penenang (Sedasi)",id:1901300055},
                                    {nama:"Tanpa Penenang",id:1901300056}
                                ]
                            }
                        ], 
                    col2: [
                            {nama:"Hasil yang di harapkan",
                            nama2:"Hilang sementara dari sensai merasakan dan / pergerakan pada area khusus pada alat gerak / kaki"},
                            {nama:"Teknik",
                            nama2:"Obat disuntikan dekat syaraf untuk menghasilkan hilangnya sensasi terhadap area operasi"},
                            {nama:"Resiko (tapi tidak hanya terbatas pada yang di sebut)",
                            nama2:"Infeksi, kejang, kelemahan, mati rasa yang menetap, nyeri lanjutan / sisa yang membutuhkan tambahan anastesi, perlukaan terhadap pembuluh darah, gagal blok saraf"}
                        ]
                },
                { id: 4, 
                    col1: [
                            {nama:"Anastesi regional Intravena",id:1901300057,
                             namacol:[
                                    {nama:"Dengan Penenang (Sedasi)",id:1901300058},
                                    {nama:"Tanpa Penenang",id:1901300059}
                                ]
                            }
                        ], 
                    col2: [
                            {nama:"Hasil yang di harapkan",
                            nama2:"Hilang sementara perasaan dan / pergerakan kaki"},
                            {nama:"Teknik",
                            nama2:"Obat disuntikan kedalam pembuluh darah vena"},
                            {nama:"Resiko (tapi tidak hanya terbatas pada yang di sebut)",
                            nama2:"Infeksi, kejang, kelemahan, mati rasa yang menetap, nyeri lanjutan, perlukaan terhadap pembuluh darah"}
                        ]
                },
                { id: 5, 
                    col1: [
                            {nama:"Tindakan Termonitor Anestesi",id:1901300060,
                             namacol:[
                                    {nama:"Dengan Penenang (Sedasi)",id:1901300061},
                                    {nama:"Tanpa Penenang",id:1901300062}
                                ]
                            }
                        ], 
                    col2: [
                            {nama:"Hasil yang di harapkan",
                            nama2:"Menurunnya ansietas dan nyeri, anestesi sebagian atau total"},
                            {nama:"Teknik",
                            nama2:"Obat disuntikan ke aliran darah, dihembuskan ke saluran nafas / paru, atau lewat rute lain, menghasilkan tingkat kesadaran 'setengah sadar'"},
                            {nama:"Resiko (tapi tidak hanya terbatas pada yang di sebut)",
                            nama2:"Tidak sadar, depresi pernafasan, perlukaan terhadap pembuluh darah"}
                        ]
                },
                { id: 6, 
                    col1: [
                            {nama:"Monitor Invasif",id:1901300063,
                             namacol:[
                                    {nama:"Melalui Arteri",id:1901300064},
                                    {nama:"Melalui Vena Central",id:1901300065},
                                    {nama:"Melalui Arteri Pulmoner",id:1901300066},
                                    {nama:"TEE (Trans Esofagus Echocardiography)",id:1901300067},
                                    {nama:"Lumbar Drain",id:1901300068},
                                    {nama:"Spinal dan Mengukur Tekanan Darah",id:1901300069}
                                ]
                            }
                        ], 
                    col2: [
                            {nama:"Hasil yang di harapkan",
                            nama2:"Monitoring selama pelayanan anestesi termasuk pengambilan darah, menyuntikan obat ke dalam vena"},
                            {nama:"Teknik",
                            nama2:"",
                            kolom:[
                                {nama:"Memasang tube di pembuluh darah arteri pada tangan atau kaki untuk memonitor takanan darah",id:1901300070},
                                {nama:"Memasang tube di leher untuk memonitor tekanan pada vena",id:1901300071},
                                {nama:"Memasang tube di leher untuk memonitor tekanan didalam jantung",id:1901300072},
                                {nama:"Memasang probe ultra sound ke dalam tenggorokan untuk memonitor jantung",id:1901300073},
                                {nama:"Menempatkan tube di antara tulang belakang untuk mengeluarkan cairan",id:1901300074}
                            ]},
                            {nama:"Resiko (tapi tidak hanya terbatas pada yang di sebut)",
                            nama2:"Perlukaan terhadap pembuluh darah, kolaps paru, ritme jantung yang irreguler. Nyeri pada mulut atau tenggorokan, suara serak, perlukaan terhadap mulut dan gigi, sakit kepala, sakit punggung, mual dan muntah, perlukaan terhadap saraf, kelemahan, yang menetap, mati rasa atau nyeri"}
                        ]
                }
            ];
            $scope.item.keterangan ="Sudah dijelaskan kepada saya, semua bentuk / macam teknik anestesi termasuk resiko yang bisa timbul dan bahwa tidak ada jaminan terhadap hasil yang di capai dari tindakan atau terapi yang saya jalani" +
                " Meski jarang, dapat timbul komplikasi yang tidak terduga dari setiap teknik anestesi, termasuk kemungkinan infeksi, pendarahan, reaksi obat, bekuan darah, hilangnya sensai, hilangnya penglihatan, hilangnya fungsi kaki dan tangan, paralisys / lumpuh, stroke, kerusakan otak, serangan jantung atau kematian." 
  
             $scope.item.keterangan2 =   " Saya mengerti bahwa semua resiko di atas, dapat timbul pada semua teknik anestesi dan termasuk resiko tambahan / khusus yang dapat timbul pada teknik anestesi tertentu" 

             $scope.item.keterangan3 =   " Saya sudah diberitahu teknik anestesi yang akan digunakan pada operasi saya dan bahwa teknik anestesi yang akan dilakukan ditentukan oleh banyak faktor termasuk kondisi fisik saya, jenis tindakan yang akan digunakan oleh dokter anestesi, berdasarkan pertimbangan tertentu dari dokter, dan juga keinginan saya." 

              $scope.item.keterangan4 =  " Sudah dijelaskan kepada saya bahwa terkadang teknik anestesi lokal, dengan atau tanpa sedasi / penenang dapat berjalan tidak sesuai keinginan / harapan sehingga di butuhkan teknik anestesi lain, termasuk anestesi umum."


            $scope.item.persetujuan = ""


           

            

        }
    ]);
});