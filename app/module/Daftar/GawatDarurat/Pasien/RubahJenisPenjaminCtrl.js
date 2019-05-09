define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('RubahJenisPenjaminCtrl', ['ManagePasien','ManageSarprasPhp', '$scope', 'ModelItem', '$state', '$rootScope', '$timeout', '$window','FindPasien', 'FindPegawai', 'DateHelper', 'CetakHelper',
        function(managePasien,ManageSarprasPhp, $scope, modelItem, $state, $rootScope, $timeout, $window, findPasien, findPegawai, dateHelper, cetakHelper) { // form registrasi pelayanan untuk rawat inap duplicate from RegistrasiPelayananCtrl
            var responData;
            $scope.item = {};
            $scope.model = {};
            // $scope.dataPasienSelected = {};
            $scope.jenisPasiens = [{
                id: 1, name: "Reguler"
            }, {
                id: 2, name: "Eksekutif"
            }]
            $scope.isRouteLoading=false;
            $scope.item.periodeAwal =  new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.now = new Date();
            $scope.formatJam24 = {
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm" 		//set drop down time format to 24 hours
            }
            $scope.listPasien = [];
            $scope.doneLoad = $rootScope.doneLoad;
            $scope.pilihRuangan = function(id) {
                var ruanganId = id;
                findPasien.getKelasByRuangan(ruanganId).then(function(e) {
                    $scope.listKelas = e.data.data.listData;
                })
                findPasien.findDokterDPJP(id).then(function(e){
                    $scope.dokters = new kendo.data.DataSource({
                        data: e.data
                    });
                })
            }

            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            ManageSarprasPhp.getDataTableTransaksi("penjamin/get-data-combo", true).then(function (dat) {
                $scope.listDokter = dat.dokter;
                $scope.listRuangan = dat.data.ruangan;
            })

             loadData();
            $scope.SearchData = function(){
                loadData()
            }
            function loadData(){
                $scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

                var reg =""
                if ($scope.item.noRegistrasi != undefined){
                    var reg ="&noreg=" +$scope.item.noRegistrasi
                }
                var rm =""
                if ($scope.item.noRmNama != undefined){
                    var reg ="&norm=" +$scope.item.noRmNama
                }   

                var rg =""
                if ($scope.item.ruangan != undefined){
                    var rg ="&ruangId=" +$scope.item.ruangan.id
                }

                ManageSarprasPhp.getDataTableTransaksi("penjamin/get-daftar-pasien?"+
                    "tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir+
                    reg+rm+rg)
                .then(function(data) {
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < data.data.daftar.length; i++) {
                        data.data.daftar[i].no = i+1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(data.data.daftar[i].tgllahir);
                        var umurzz = dateHelper.CountAge(tanggalLahir, tanggal);
                        data.data.daftar[i].umurzz =umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'

                    }                        
                    $scope.dataSourceGrid = data.data.daftar;

                });

            };

            $scope.group = {
                field: "kelompokpasien",
                aggregates: [{
                    field: "kelompokpasien",
                    aggregate: "count"
                }, {
                    field: "kelompokpasien",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "kelompokpasien",
                aggregate: "count"
            }, {
                field: "kelompokpasien",
                aggregate: "count"
            }]


            $scope.columnGrid= [
            {
                "field": "tglregistrasi",
                "title": "Tgl Registrasi",
                "width":"80px",
                "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width":"80px"
            },
            {
                "field": "nocm",
                "title": "No RM",
                "width":"80px",
                "template": "<span class='style-center'>#: nocm #</span>"
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width":"150px",
                "template": "<span class='style-left'>#: namapasien #</span>"
            },
            {
                "field": "jeniskelamin",
                "title": "Jenis Kelamin",
                "width":"100px",
                "template": "<span class='style-center'>#: jeniskelamin #</span>"
            },
            {
                "field": "umurzz",
                "title": "Umur",
                "width":"100px",
                "template": "<span class='style-center'>#: umurzz #</span>"
            },
            {
                "field": "namaruangan",
                "title": "Ruangan",
                "width":"150px",
                "template": "<span class='style-left'>#: namaruangan #</span>"
            },
            {
                "field": "namadokter",
                "title": "Nama Dokter",
                "width":"130px",
                "template": "<span class='style-left'>#: namadokter #</span>"
            },
            {
                "field": "kelompokpasien",
                "title": "Tipe Penjamin",
                "width":"100px",
                "template": "<span class='style-left'>#: kelompokpasien #</span>"
            },
            {
                "field": "namakelas",
                "title": "Kelas",
                "width":"100px",
                "template": "<span class='style-left'>#: namakelas #</span>"
            },

            

            ];

            $scope.klikGrid = function(dataPasienSelected){


                if (dataPasienSelected != undefined) {
                    $scope.tampungDataSelected ={
                        nocm: dataPasienSelected.nocm,
                        namapasien: dataPasienSelected.namapasien,
                        noregistrasi: dataPasienSelected.noregistrasi,
                        tglregistrasi: dataPasienSelected.tglregistrasi,
                        objectpegawaifk: dataPasienSelected.objectpegawaifk,
                        namadokter: dataPasienSelected.namadokter,
                        objectruanganfk: dataPasienSelected.objectruanganfk,
                        namaruangan: dataPasienSelected.namaruangan,
                        norec_apd: dataPasienSelected.norec_apd,
                        norec_pd: dataPasienSelected.norec_pd,
                        tgllahir: dataPasienSelected.tgllahir,
                        objectkelompokpasienlastfk: dataPasienSelected.objectkelompokpasienlastfk,
                        kelompokpasien: dataPasienSelected.kelompokpasien,
                        namakelas: dataPasienSelected.namakelas,
                        jeniskelamin: dataPasienSelected.jeniskelamin,
                        objectruanganlastfk: dataPasienSelected.objectruanganlastfk,
                        noidentitas: dataPasienSelected.noidentitas,
                        alamatlengkap: dataPasienSelected.alamatlengkap,
                        objectjeniskelaminfk: dataPasienSelected.objectjeniskelaminfk,
                        nocmfk: dataPasienSelected.nocmfk,
                        noidentitas: dataPasienSelected.noidentitas,
                        
                    }

                    $scope.item.kelompokPasien = 
                    {
                        id:dataPasienSelected.objectkelompokpasienlastfk,
                        kelompokPasien:dataPasienSelected.kelompokpasien}
                    }

                    var nocmm =""
                    if ($scope.tampungDataSelected.nocm != undefined){
                        var nocmm ="&nocm=" +$scope.tampungDataSelected.nocm
                    }  
                    ManageSarprasPhp.getDataTableTransaksi("penjamin/get-asuransi-pasien?"
                        + nocmm)
                    .then(function(data) {    
                        $scope.dataAsuransiPasien = data.data.data;

                    });

                }
                $scope.$watch('item.kelompokPasien', function(e) {
                 if (e === undefined) return;
                 if (e.kelompokPasien === undefined) return;
                 if (e.kelompokPasien.indexOf('Umum') < 0) {
                    $scope.asuransi=true;
                    $scope.model.namaPenjamin = $scope.item.kelompokPasien;
                    $scope.model.hubunganPeserta = $scope.sourceHubunganPasien[0];
                    if (e.kelompokPasien.indexOf('BPJS') >= 0) {
                        $scope.item.jenisPasien = $scope.jenisPasiens[0];
                        $scope.disableTipePelayanan = true;
                        $scope.noBPJS = true;
                        $scope.isCheckSJP = true;
                        // $scope.tampungDataSelected=$scope.tampungDataSelected;
                    }
                } else{
                    $scope.asuransi=false;
                    $scope.noBPJS = false;
                    $scope.isCheckSJP = false;
                    $scope.disableTipePelayanan = false;
                } 
            })
                $scope.$watch('item.kelas', function(e) {
                    if (e === undefined) return;
                    var kelasId = $scope.item.kelas.id;
                    var ruanganId = $scope.item.ruangan.id;
                // debugger;
                findPasien.getKamarByKelas(kelasId, ruanganId).then(function(a) {
                    // $scope.listKamar = a.data.data.listData;
                    $scope.listKamar = _.filter(a.data.data.listData, function(v) {
                        return v.qtyBed > v.jumlaKamarIsi;
                    })
                })
            });
                $scope.$watch('item.kamar', function(e) {
                    if (e === undefined) return;
                    var kamarId = $scope.item.kamar.id;
                    findPasien.getNoBed(kamarId).then(function(a) {
                    // $scope.listNoBed = a.data.data.listData;
                    $scope.listNoBed = _.filter(a.data.data.listData, function(v) {
                        return v.statusBed === "KOSONG";
                    })
                })
                });
                $scope.now = new Date();
                $scope.asalrujukans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-asal-rujukan');
                $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
                /*add_hanafi_03112016*/
                findPasien.getKelompokPasien().then(function(e) {
                    $scope.kelompokPasiens = e.data.data
                })
                $scope.Column = [{
                    field: "noCm",
                    title: "No Rekam Medik",
                    aggregates: ["count"]
                }, {
                    field: "namaLengkap",
                    title: "Nama Pasien",
                    aggregates: ["count"]
                }, {
                    field: "jenisKelamin.jenisKelamin",
                    title: "Jenis Kelamin",
                    aggregates: ["count"]
                }, {
                    field: "namaIbu",
                    title: "Nama Ibu",
                    aggregates: ["count"]
                }];
            // $scope.$watch('noCm', function(e) {
            //     $scope.itemPatiens = findPasien.getDataPasien("", $scope.noCm, "", "", "");
            //     $scope.itemPatiens.then(function(e) {
            //         $scope.listPasien = new kendo.data.DataSource({
            //             data: e.data.data.listData,
            //         });
            //     });

            // });
            $scope.currentNoCm = $state.params.noCm;
            
            
            var tempNoRec = 0;

            // $scope.cetak = function() {
            //     window.location = configuration.urlPrinting + "registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
            // }



            $scope.inputTindakan = function(){

                if ($scope.item){
                    $state.go('dashboardpasien.InputBilling',{
                     noRec:responData.norec,
                     noAntrianPasien: responData.norec,
                     noRegister: $scope.item.pasien.pasienDaftar.noRec,  
                        // noRec:$scope.item.pasien.pasienDaftar.noRec,
                        // noAntrianPasien: $scope.item.pasien.noRecAntrianPasien,
                        // noRegister: $scope.item.pasien.pasienDaftar.noRegistrasi,   
                    });
                } else {
                    messageContainer.error('Pasien belum di pilih')
                }
            }
            if ($scope.model.tglRujukan === undefined)
                $scope.model.tglRujukan = new Date();
            $scope.model.lakalantas = false;

            // findPasien.getByNoRegistrasi($state.params.noRegister).then(function(e) {
            //     $scope.item.registrasi = e.data;
            // });

            // findPasien.getByNoCM($state.params.noCm).then(function(e) {
            //     debugger;
            //     $scope.model.pasien = e.data.data;
            //     $scope.sourcePasien = e.data.data;
            //     // $scope.tglLahir = new Date(e.data.data.tglLahir);
            // });

            // findPasien.getDataAsuransi(id, $state.params.noCm).then(function(e) {
            //     $scope.sourceAsuransiPasien = e.data.data;
            // });

            // $scope.arrSendiri = [];
            $scope.Sendiri = function(data){
                if (data === true) {
                    $scope.model.namaPeserta = $scope.tampungDataSelected.namapasien;
                    $scope.model.tglLahir =  $scope.tampungDataSelected.tgllahir;
                    $scope.model.noIdentitas =  $scope.tampungDataSelected.noidentitas;
                    $scope.model.alamatPeserta = $scope.tampungDataSelected.alamatlengkap;
                    // $scope.model.noSep="2345";
                    $scope.kelasBpjs = false;
                    $scope.kelasPenjamin = true;
                }else{
                    $scope.model.noKepesertaan="";
                    $scope.model.namaPeserta = "";
                    $scope.model.tglLahir =  "";
                    $scope.model.noIdentitas =  "";
                    $scope.model.alamatPeserta = "";
                    $scope.model.noSep=undefined;
                    $scope.kelasBpjs = true;
                    $scope.kelasPenjamin = false;
                }
                $scope.disableSEP = data;
            };

            findPasien.getJenisPembiayaan().then(function(e){
                $scope.sourceJenisPembiayaan = e.data.data.listData;
            });

            findPasien.getDataAsuransiPasien().then(function(e){
                $scope.isRouteLoading = true;
                $scope.sourceHubunganPasien = e.data.data.hubunganPesertaAsuransi;
                $scope.sourceUnitTugas = e.data.data.unitBagian;
                $scope.sourceKelasDitanggung = e.data.data.kelasDitanggung;
                $scope.sourceDiagnosa = e.data.data.diagnosa;
                $scope.sourceGolonganAsuransi = e.data.data.golonganAsuransi;
            }).then(function(){
                // get pasien's registration detail and bind to $scope.model (termasuk data asuransi yang di input di registrasi pelayanan)
                findPasien.getDataPelayananPasien($state.params.noRec).then(function(data){
                    $scope.model = data.data.data;
                    $scope.model.tglRegistrasi = new Date($scope.model.tglRegistrasi);
                    $scope.item.asalRujukan = $scope.model.asalRujukan;
                    $scope.item.kelompokPasien = $scope.model.kelompokPasien;

                    // $scope.model.namaPenjamin = $scope.model.kelompokPasien; //di set saat kelompok pasien bukan umum/pribadi
                    switch($scope.model.jenisLayanan){
                        case ("Reguler"):
                        $scope.item.jenisPasien = $scope.jenisPasiens[0];
                        break;
                        case ("Eksekutif"):
                        $scope.item.jenisPasien = $scope.jenisPasiens[1];
                        break;
                        default:
                        break;
                    }
                    // checking rawat inap or not based on departemenId
                    // if ($scope.model.ruangan.departemenId === 16 || $scope.model.ruangan.departemenId === 35)
                    //     $scope.model.rawatInap = true;
                    if ($scope.model.asuransi !== undefined){
                        $scope.model.sendiri = true;
                        if($scope.model.asuransi.pemakaianAsuransi.lakalantas === 2)
                            $scope.model.lakalantas = false;
                        else
                            $scope.model.lakalantas = true;
                        $scope.model.diagnosa = $scope.model.asuransi.pemakaianAsuransi.diagnosis;
                        $scope.model.noSep = $scope.model.asuransi.pemakaianAsuransi.noSep;
                        $scope.model.tglSEP = $scope.model.asuransi.pemakaianAsuransi.tanggalSep === undefined ? new Date() : new Date($scope.model.asuransi.pemakaianAsuransi.tanggalSep);
                        $scope.model.tglRujukan = $scope.model.asuransi.pemakaianAsuransi.tglRujukan === undefined ? new Date() : new Date($scope.model.asuransi.pemakaianAsuransi.tglRujukan);
                        $scope.model.noRujukan = $scope.model.asuransi.pemakaianAsuransi.noRujukan;
                        $scope.model.noKepesertaan = $scope.model.asuransi.asuransiPasien.noAsuransi;
                        $scope.model.namaPeserta = $scope.model.asuransi.asuransiPasien.namaPeserta;
                        $scope.model.tglLahir = new Date($scope.model.asuransi.pemakaianAsuransi.asuransiPasien.tglLahir);
                        $scope.model.noIdentitas = $scope.model.asuransi.asuransiPasien.noIdentitas;
                        $scope.model.alamatPeserta = $scope.model.asuransi.asuransiPasien.alamatLengkap;
                        $scope.model.hubunganPeserta = $scope.model.asuransi.asuransiPasien.hubunganPeserta;
                        $scope.model.kelasDitanggung = $scope.model.asuransi.asuransiPasien.kelasDiJamin;
                        $scope.model.namaAsalRujukan = $scope.model.asuransi.asuransiPasien.nmProvider;
                        $scope.model.institusiAsalPasien = {
                            id: parseInt($scope.model.asuransi.asuransiPasien.nikInstitusiAsal)
                        };
                    }
                })
            }).then(function(){
                // findPasien.getRencanaAdmisi($state.params.noRecAdmisi).then(function(data) {
                //     $scope.dataAdmisi = data.data.admisiRencanaPindahRuangan;
                //     $scope.noBedRencana ={
                //         "id": $scope.dataAdmisi.noBedRencana
                //     }

                //     $scope.item.tglDaftar=new Date($scope.dataAdmisi.tglKeluarRencana);
                //     $scope.item.ruangan=$scope.dataAdmisi.ruanganRencana;
                //     $scope.item.kelas=$scope.dataAdmisi.kelasRencana;
                //     $scope.item.kamar=$scope.dataAdmisi.kelasKamarRencana;
                //     $scope.item.nomorTempatTidur = $scope.noBedRencana
                //     if($scope.item.ruangan!==undefined){
                //         findPasien.findDokterDPJP($scope.item.ruangan.id).then(function(e){
                //             $scope.dokters = new kendo.data.DataSource({
                //                 data: e.data
                //             });
                //         })
                //     }
                // });
                $scope.isRouteLoading = false;
            }).then(function(){
                // get data antrian berdasarkan nomor antrian (tanpa data asuransi yang di input di registrasi pelayanan)
                // findPasien.getDataByNorecAntrian($state.params.noRecAntrian).then(function(e){
                //     $scope.item.pasien = e.data.data;
                //     $scope.item.pasien.tglLahir = new Date($scope.item.pasien.tglLahir);
                //     $scope.item.pasien.tglDaftar = new Date($scope.item.pasien.tglDaftar);
                // });
                modelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    $scope.sourceDiagnosisPrimer = data;
                });
            });

            findPasien.getAsalRujukan().then(function(data){
                $scope.asalrujukans = data.data;
            });
            $scope.$watch('model.namaPenjamin', function(e){
                if (e === undefined) return;
                findPasien.getDataRekanan(e.id).then(function(data) {
                    $scope.sourceDataRekanan = data.data.data.listData;
                    $scope.model.institusiAsalPasien = $scope.sourceDataRekanan[0];
                });
                if($scope.model.namaPenjamin.kelompokPasien === "BPJS"){
                    $scope.SepCheck=false;
                }else{
                    $scope.SepCheck=true;
                }
            })
            // $scope.DataRekanan=function(){
            //     var id = $scope.model.namaPenjamin.id;
            //     findPasien.getDataRekanan(id).then(function(e) {
            //         $scope.sourceDataRekanan = e.data.data.listData;
            //     });
            //     if($scope.model.namaPenjamin.kelompokPasien.indexOf('BPJS') >= 0){
            //         $scope.SepCheck=false;
            //     }else{
            //         $scope.SepCheck=true;
            //     }
            // };

            $scope.DataGolonganAsuransi=function(){
                var id = $scope.model.institusiAsalPasien.id;
                findPasien.getDataGolonganAsuransi(id, $state.params.noCm).then(function(e) {
                    $scope.sourceDataGolonganAsuransi = e.data.data.listData;
                });
            };

            // $scope.listSendiri = [
            //     {"id": 1, "name": "Sendiri"}
            // ];

            $scope.ListAsuransi = [
            {"id": "1", "name": "No. SEP Otomatis"}
            ];
            // ModelItem.getDataDummyGeneric("Sendiri", false).then(function(data) {
            //     $scope.listSendiri = data;
            // })
            // ModelItem.getDataDummyGeneric("Asuransi", false).then(function(data) {
            //     $scope.ListAsuransi = data;
            // })
            $scope.checkRujukan = function() {
                if ($scope.noRujukan === '' || $scope.noRujukan === undefined) return;
                $scope.isLoadingRujukan = true;

                findPasien.checkRujukanBpjs($scope.noRujukan).then(function(e) {
                    if (e.data.data.metadata.code === "200") {
                        $scope.model.asuransi = e.data.data.response.peserta;
                        $scope.model.ppkRujukan = $scope.model.asuransi.provUmum.kdProvider + " - " + $scope.model.asuransi.provUmum.nmProvider;
                    } else {
                        window.messageContainer.error('')
                    }
                    $scope.isLoadingRujukan = false;
                }, function(err) {
                    $scope.isLoadingRujukan = false;
                });
            };
            $scope.SepCheck = true;
            $scope.disAnakKe = true;
            $scope.textAnakKe = function(){
                // debugger;
                if($scope.model.hubunganPeserta.id === 3){
                    $scope.disAnakKe = false;
                }else{
                    $scope.model.anakKe="";
                    $scope.disAnakKe = true;
                }
            };

            $scope.getRujukan=function(){
                // debugger;
                if($scope.item.asalRujukan != undefined){
                    $scope.model.asalRujukan = $scope.item.asalRujukan
                }
            }

            // $scope.check=function(){
            //     var id = $scope.model.namaPenjamin.id;
            //     if(id === 2 || id === 4){
            //         $scope.checkKepesertaan();
            //     }
            // }
            $scope.checkKepesertaan = function() {
                if ($scope.model.noKepesertaan === '' || $scope.model.noKepesertaan === undefined) return;
                if ($scope.model.sendiri === true) return;
                $scope.isLoading = true;

                findPasien.checkKepesertaan($scope.model.noKepesertaan).then(function(e) {
                    // debugger;
                    if (e.data.data.metadata.code === "200") {
                        var tglLahir = new Date(e.data.data.response.peserta.tglLahir);
                        // $scope.item.asuransi = e.data.data.response.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                        // $scope.model.kelasDitanggung = e.data.data.response.peserta.kelasTanggungan;
                        $scope.model.kelasDitanggung = {
                            id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                            kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                            nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                            namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        };
                        $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            };
            // check kepesertaan berdasarkan NIK
            $scope.checkKepesertaanByNik = function() {
                if (!$scope.model.noIdentitas) return;
                if ($scope.model.sendiri) return;
                $scope.isLoading = true;

                findPasien.checkKepesertaanByNik($scope.model.noIdentitas).then(function(e) {
                    // debugger;
                    if (e.data.data.metadata.code === "200") {
                        var tglLahir = new Date(e.data.data.response.peserta.tglLahir);
                        // $scope.item.asuransi = e.data.data.response.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                        // $scope.model.kelasDitanggung = e.data.data.response.peserta.kelasTanggungan;
                        $scope.model.kelasDitanggung = {
                            id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                            kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                            nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                            namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        };
                        $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            };
            // check kepesertaan berdasarkan SEP
            $scope.checkKepesertaanBySep = function() {
                if (!$scope.model.noSep) return;
                if ($scope.model.sendiri) return;
                if ($scope.model.isCheckSJP) return;
                $scope.isLoading = true;

                findPasien.getDetailSep($scope.model.noSep).then(function(e) {
                    if (e.data.data.metadata.code === "200") {
                        $scope.disableSEP = true;
                        var tglLahir = new Date(e.data.data.response.peserta.tglLahir);
                        // $scope.item.asuransi = e.data.data.response.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        // $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                        // $scope.model.kelasDitanggung = e.data.data.response.peserta.kelasTanggungan;
                        $scope.model.kelasDitanggung = {
                            id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                            kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                            nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                            namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        };
                        $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                        // $scope.model.diagnosa = {
                        //     kdDiagnosa : e.data.data.response.diagAwal.kdDiag,
                        //     namaDiagnosa: e.data.data.response.diagAwal.nmDiag
                        // };
                        $scope.model.diagnosa = e.data.data.response.diagAwal.kdDiag;
                        if (e.data.data.response.lakaLantas.status === "0") {
                            // magics will appear
                        } else {
                            $scope.model.lakalantas = true;
                            $scope.model.lokasiLakaLantas = e.data.data.response.lakaLantasketerangan;
                        }
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            };
            // $scope.arrNoSEP = [];
            // $scope.NoSEP = function(){
            //     debugger;
            //     if ($scope.model.noSEP === true) {
            //         var data = {
            //             nokartu: $scope.noKartu,
            //             tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD'),
            //             noRujukan: $scope.model.noRujukan,
            //             ppkRujukan: '0901R001',
            //             isRawatJalan: 'T',
            //             catatan: '',
            //             kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
            //             kelasRawat: $scope.model.kelasDitanggung.kdKelas,
            //             noCm: $state.params.noCm
            //         };
            //         console.log(JSON.stringify(data));
            //         managePasien.generateSep(data).then(function(e) {
            //             if (e.data.data.metadata.code === "200")
            //                 $scope.model.noSep = e.data.data.response;
            //             else {
            //                 window.messageContainer.error(e.data.data.metadata.message)
            //             }
            //             $scope.isLoadingRujukan = false;
            //         }, function(err) {
            //             $scope.isLoadingRujukan = false;
            //         });
            //     }else{
            //         $scope.model.noSep = "";
            //     }
            //     debugger;
            // };
            // $scope.cekAsuransi = function(){
            //     if($scope.item.kelompokPasien.kelompokPasien != "BPJS"){
            //         $scope.kelasPenjamin = true;
            //         $scope.kelasBpjs = false;
            //         $scope.noNonBPJS = true;
            //         $scope.noBPJS = false;
            //         $scope.isCheckSJP = false;
            //         $scope.isNoCheckSJP = true;
            //     }else{
            //         $scope.kelasBpjs = true;
            //         $scope.kelasPenjamin = false;
            //         $scope.noNonBPJS = false;
            //         $scope.noBPJS = true;
            //         $scope.isCheckSJP = true;
            //         $scope.isNoCheckSJP = false;
            //     }
            // }
            $scope.generateSep = function() {
                var listRawRequired = [
                "item.ruangan|k-ng-model|Ruangan",
                "item.asalRujukan|ng-model|Asal Rujukan",
                "item.kelompokPasien|ng-model|Kelompok Pasien",
                    // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                    "model.namaPenjamin|k-ng-model|Nama Penjamin",
                    "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
                    "model.noKepesertaan|ng-model|No Kepesertaan",
                    "model.asalRujukan|k-ng-model|Asal Rujukan",
                    // "model.noRujukan|ng-model|No Rujukan",
                    "model.tglRujukan|ng-model|Tgl Rujukan",
                    "model.diagnosa|k-ng-model|Diagnosa"
                    ];
                    if ($scope.model.rawatInap) {
                        listRawRequired.push("item.kelas|k-ng-model|Kelas Ditanggung");
                    }
                    var isValid = modelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        if($scope.model.lokasiLakaLantas !=undefined){
                         var lokasiLaka = $scope.model.lokasiLakaLantas;
                     }else{
                        var lokasiLaka = '';
                    }
                //    if($scope.model.diagnosa){
                //        findPasien.findDiagnosabyKode($scope.model.diagnosa).then(function(e){
                //            $scope.model.diagnosis = e.data.data[0];
                //        })
                //    }
                var data = {
                    nokartu: $scope.noKartu,
                    tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD HH:mm:ss'),
                    noRujukan: $scope.model.noRujukan === undefined ? 0 : $scope.model.noRujukan,
                    ppkRujukan: '0901R001',
                    isRawatJalan: 'F',
                    catatan: '',
                    poliTujuan: $scope.item.ruangan.id,
                    kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
                    kelasRawat: $scope.item.kelas.id,
                    noCm: $state.params.noCm,
                    lakaLantas: $scope.model.lakalantas === true ? 1 : 2,
                    lokasiLaka: lokasiLaka,
                    tglSep: new moment($scope.model.tglSEP).format('YYYY-MM-DD HH:mm:ss')
                };
                managePasien.generateSep(data).then(function(e) {
                        // debugger;
                        if (e.data.data.metadata.code === "200" || e.data.data.metadata.code === "201"){
                            $scope.model.noSep = e.data.data.response;
                            $scope.Simpan();
                        }else {
                            window.messageContainer.error(e.data.data.metadata.message)
                        }
                        $scope.isLoadingRujukan = false;
                    }, function(err) {
                        $scope.isLoadingRujukan = false;
                    });
            }else{
                modelItem.showMessages(isValid.messages);
            }
        };

        $scope.now = new Date();
        $scope.Save = function() {
                // if($scope.model.noRujukan){
                //     var num=$scope.model.noRujukan;
                //     var str = num.toString();
                //     if(str.length !== 19){
                //         messageContainer.error('No Rujukan harus 19 Karakter');
                //         return;
                //     }
                // };
                if($scope.model.tglRujukan && $scope.model.tglSEP){
                    if(new Date($scope.model.tglRujukan) > new Date($scope.model.tglSEP)){
                        messageContainer.error('TANGGAL SEP HARUS LEBIH KECIL DARI TGL RUJUKAN');
                        return;
                    }
                }
                if($scope.model.generateNoSEP === true){
                    $scope.generateSep();
                }else{
                    $scope.Simpan();
                }
            }
            $scope.Simpan = function() {
                  
                if($scope.model.kelasDitanggung==undefined && $scope.item.kelompokPasien.kelompokPasien!='Umum/Pribadi' ){
                        messageContainer.error('Kelas Ditanggung Harus di isi');
                        return;
                }
              if ($scope.item.kelompokPasien.kelompokPasien=='Umum/Pribadi'){
               
                    var penjaminumum = {
                        // tglpermintaan: moment($scope.item.tglPermintaan).format('YYYY-MM-DD hh:mm:ss'),
                            noregistrasi: $scope.tampungDataSelected.noregistrasi,
                            norec_pd: $scope.tampungDataSelected.norec_pd,
                            objectkelompokpasienlastfk: $scope.item.kelompokPasien.id
                    }

                    var jsonUmum = {
                        penjaminumum: penjaminumum,
                    }
                     ManageSarprasPhp.savePenjaminUmum(jsonUmum).then(function(e) {
                             responData = e.data.data;
                          
                           $state.params.noRegistrasi = e.data.data.noRegistrasi;
                             loadData();
                        if ($scope.currentNoCm.indexOf('*') > 0) {}
                          if (window.isPerjanjian !== undefined) {
                                        findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                       }
                     });
                }
               else if ($scope.item.kelompokPasien.kelompokPasien!='Umum/Pribadi')
                {
                 var noasuransi = "";
                 if ($scope.model.noKepesertaan == undefined) {
                    noasuransi = null;
                 } else
                    noasuransi = $scope.model.noKepesertaan;

                var noidentitas = "";
                 if ($scope.model.noIdentitas == undefined) {
                    noidentitas = null;
                 } else
                    noidentitas = $scope.model.noIdentitas;

               var diagnosisfk = "";
                 if ($scope.model.diagnosa == undefined) {
                    diagnosisfk = null;
                 } else
                    diagnosisfk = $scope.model.diagnosa.id;

                var norujukan = "";
                 if ($scope.model.noRujukan == undefined) {
                    norujukan = null;
                 } else
                    norujukan = $scope.model.noRujukan;

                      var nosep = "";
                 if ($scope.model.noSep == undefined) {
                    nosep = null;
                 } else
                    nosep = $scope.model.noSep;


                   var tanggalsep = "";
                 if (  $scope.model.tglSEP == undefined) {
                    tanggalsep = null;
                 } else
                    tanggalsep =   $scope.model.tglSEP;

                    
                   var tglRujukan = "";
                 if (  $scope.model.tglRujukan == undefined) {
                    tglRujukan = null;
                 } else
                    tglRujukan =   $scope.model.tglRujukan;
                var nocmfkasuransi="";
                if ($scope.dataAsuransiPasien.length==0)
                 nocmfkasuransi=null
                else
                 nocmfkasuransi=   $scope.dataAsuransiPasien[0].nocmfk
                     var asuransipasien = {
                             noregistrasi: $scope.tampungDataSelected.noregistrasi,
                        // tglpermintaan: moment($scope.item.tglPermintaan).format('YYYY-MM-DD hh:mm:ss'),
                            nocmfk: nocmfkasuransi,
                            alamatlengkap: $scope.model.alamatPeserta,
                            objecthubunganpesertafk: $scope.model.hubunganPeserta.id,
                            objectjeniskelaminfk: $scope.tampungDataSelected.objectjeniskelaminfk,
                            kdinstitusiasal: $scope.model.institusiAsalPasien.id,
                            // kdlastunitbagian: $scope.tampungDataSelected.alamatlengkap,
                            kdpenjaminpasien: $scope.model.institusiAsalPasien.id,
                            objectkelasdijaminfk: $scope.model.kelasDitanggung.id,
                            namapeserta: $scope.model.namaPeserta,
                            nikinstitusiasal: $scope.model.institusiAsalPasien.id,
                            // nippns: $scope.tampungDataSelected.alamatlengkap,
                            noasuransi: noasuransi,
                            // noasuransihead: $scope.tampungDataSelected.alamatlengkap,
                            nocmfkpasien: $scope.tampungDataSelected.nocmfk,
                            noidentitas: noidentitas,
                            // notelpfixed: $scope.tampungDataSelected.alamatlengkap,
                            // notelpmobile: $scope.tampungDataSelected.alamatlengkap,
                            // objectpegawaifk: $scope.tampungDataSelected.alamatlengkap,
                            qasuransi: $scope.model.namaPenjamin.id,
                             kelompokpasien: $scope.model.namaPenjamin.id,
                            // tglakhirberlakulast: $scope.tampungDataSelected.alamatlengkap,
                            tgllahir: $scope.tampungDataSelected.tgllahir,
                            // tglmulaiberlakulast: $scope.tampungDataSelected.alamatlengkap,
                            // jenispeserta: $scope.tampungDataSelected.alamatlengkap,
                            // kdprovider: $scope.tampungDataSelected.alamatlengkap,
                            // nmprovider: $scope.tampungDataSelected.alamatlengkap,

                    }
                 var pemakaianasuransi = {
                        // tglpermintaan: moment($scope.item.tglPermintaan).format('YYYY-MM-DD hh:mm:ss'),
                            noregistrasifk: $scope.tampungDataSelected.norec_pd,
                            diagnosisfk: diagnosisfk,
                            // tglregistrasi: $scope.model.hubunganPeserta.id,
                            lakalantas: $scope.model.lakalantas === true ? 1 : 2,
                            nokepesertaan: $scope.model.institusiAsalPasien.id,
                            norujukan: norujukan,
                            nosep: nosep,
                            tglrujukan: tglRujukan,
                            // objectasuransipasienfk: $scope.model.noKepesertaan,
                            objectdiagnosafk: diagnosisfk,
                            tanggalsep:tanggalsep,
                            // catatan: $scope.tampungDataSelected.alamatlengkap,          

                    }
                    var jsonNonUmum = {
                        asuransipasien: asuransipasien,
                        pemakaianasuransi: pemakaianasuransi
                    }
                     ManageSarprasPhp.savePenjaminNonUmum(jsonNonUmum).then(function(e) {
                             responData = e.data.data;
                                   loadData();
                          
                           $state.params.noRegistrasi = e.data.data.noRegistrasi;
                        if ($scope.currentNoCm.indexOf('*') > 0) {}
                          if (window.isPerjanjian !== undefined) {
                                        findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                       }
                    });
                }
            

                
            };
        }
        ]);
});