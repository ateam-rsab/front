define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('FormulirPraAnastesiSedasiCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'DateHelper','CetakBedah',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, dateHelper,CetakBedah) {
            $scope.isLoadingData = true;
            $scope.showdat = false;
            $scope.item={};
            $scope.title="FORMULIR PRA - ANASTESI / SEDASI ( Pasien/Keluarga )";
            $scope.isReport = true;  
            findPasien.getPasienBedah().then(function(data){
            });
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
            $scope.noRegistrasiNorec = $state.params.noRec;
            $scope.noRegistrasi = data.data.pasienDaftar.noRegistrasi;
            $scope.item.jenisKelamin = data.data.pasien.jenisKelamin.namaExternal;
            $scope.item.umur = data.data.pasien.umur;
            $scope.item.pasien = data.data.pasien;
            $scope.item.NoRekamMedis = data.data.pasien.noCm; //00001523
            $scope.item.dokterFk = data.data.pasienDaftar.dokterPenanggungJawab.id //id dokter penanggung jawab
            $scope.item.Idpasien = data.data.pasien.id;
            $scope.item.namaPasien = data.data.pasien.namaPasien;
            $scope.item.ruangantujuan = data.data.ruangan.id
            $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-TYYYY HH:mm');
            $scope.item.merokok=1;
            $scope.item.alkohol=1;
            $scope.item.kopi=1;
            $scope.item.olahraga=1;
            $scope.item.obatPengencerDarah=1;
            $scope.item.obatAntiSakit=1;
            $scope.item.lainnyaObat=1;
            $scope.item.alergiObat=1;
            $scope.item.alergiMakanan=1;
            $scope.item.astma=1;
            $scope.item.tekananDarahTinggi=1;
            $scope.item.kencingManis=1;
            $scope.item.maag=1;
            $scope.item.kelainanJantung=1;
            $scope.item.kejang=1;
            $scope.item.lainnyaRiwayatPenyakit=1;
            $scope.item.riwayatTranfusiDarah=1;
            $scope.item.reaksiTranfusi=1;
            $scope.item.hiv=1;
            $scope.item.kacamata=1;
            $scope.item.alatBantuDengar=1;
            $scope.item.gigiPalsu=1;
            $scope.item.perhiasan=1;
            $scope.item.riwayatPembedahan=1;
            $scope.isLoadingData = false;
            $scope.showdat = true;
            });
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
            $scope.sourceDiagnosisPrimer = data;
            });


              $scope.columnFormulirPasien = [
                    {
                        "field": "tglRegistrasi",
                        "title": "Tanggal Registrasi",
                        "template": "#= new moment(new Date(tglRegistrasi)).format('DD-MM-YYYY') #"
                    },
                    // {
                    //     "field": "noRec",
                    //     "title": "Norec"
                    // },
                    {
                       "field": "namaPegawai",
                       "title": "Nama Pegawai"
                    }
              ];


            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
            });
            
            $scope.klik=function(){
                if($scope.item.merokok==1){
                    $scope.item.qmerokok="";
                }
                if($scope.item.alkohol==1){
                    $scope.item.qalkohol="";
                }
                if($scope.item.kopi==1){
                    $scope.item.qkopi="";
                }
                if($scope.item.olahraga==1){
                    $scope.item.qolahraga="";
                }
                if($scope.item.obatPengencerDarah===1){
                    $scope.item.dObatPengencerDarah="";
                    $scope.item.fObatPengencerDarah=""
                }
                if($scope.item.obatAntiSakit===1){
                    $scope.item.dObatAntiSakit="";
                    $scope.item.fObatAntiSakit=""
                }
                if($scope.item.lainnyaObat===1){
                    $scope.item.KetLainnyaObat="";
                }
                if($scope.item.alergiObat===1){
                    $scope.item.namaObat="";
                    $scope.item.tipeReaksiObat=""
                }
                if($scope.item.alergiMakanan===1){
                    $scope.item.namaMakanan="";
                    $scope.item.tipeReaksiMakanan=""
                }
                if($scope.item.lainnyaRiwayatPenyakit===1){
                    $scope.item.KetLainnyaRiwayatPenyakit="";
                }
                if($scope.item.riwayatTranfusiDarah===1){
                    $scope.item.tahunTranfusi="";
                }
                if($scope.item.reaksiTranfusi===1){
                    $scope.item.reaksiTranfusiDarah="";
                }
                if($scope.item.hiv===1){
                    $scope.item.tahunPeriksaHiv="";
                    $scope.item.hasilPeriksaHiv=""
                }
                if($scope.item.riwayatPembedahan===1){
                    $scope.item.tahunPembedahan="";
                    $scope.item.jenisOperasi="";
                    $scope.item.jenisAnestesi="";
                    $scope.item.keluhan="";
                }
            }


            $scope.loadGrid = function () {
            findPasien.getLoadFormulirPasien($state.params.noRec).then(function(data) {
              $scope.dataMaster = data.data.data.showData;
              $scope.dataSource = new kendo.data.DataSource({
              pageSize:50,
              data : $scope.dataMaster,
              $scrollable : true
              });
              });
             }
            $scope.loadGrid();



        $scope.click = function(dataSelected){
          $scope.isLoadingDetail = true;
          if (dataSelected != undefined){
              $scope.item ={};
              $scope.item.ModeEdit = true;
              $scope.item.idCheckin = dataSelected.noRec;
              findPasien.getLoadSubFormulirPasien($scope.item.idCheckin).then(function(data) {
              toastr.info("1 Dipilih");
              $scope.subdatamaster = data.data.data.showData;
              $scope.NorecForm= $scope.subdatamaster[1].PraAnestesiPasien[0].noRec
              var tree = $scope.subdatamaster[0].Detail;
              for(var i = 0; i<tree.length; i++){
              switch(tree[i].id){
                    case 2 :
                      $scope.item.merokok = tree[i].yesNo;
                      $scope.item.qmerokok = tree[i].keterangan;
                      $scope.Norec1 = tree[i].noRec;
                     break;
                    case 3:
                      $scope.item.alkohol = tree[i].yesNo;
                      $scope.item.qalkohol = tree[i].keterangan;
                      $scope.Norec2 = tree[i].noRec;
                     break;
                    case 4 :
                      $scope.item.kopi = tree[i].yesNo;
                      $scope.item.qkopi = tree[i].keterangan;
                      $scope.Norec3 = tree[i].noRec;
                     break; 
                    case 7 :
                      $scope.item.olahraga = tree[i].yesNo;
                      $scope.item.qolahraga = tree[i].keterangan;
                      $scope.Norec4 = tree[i].noRec;
                     break;
                    case 9 :
                      $scope.item.obatPengencerDarah = tree[i].yesNo;   
                      $scope.item.dObatPengencerDarah = tree[i].keterangan;
                      $scope.item.fObatPengencerDarah = tree[i].ketTambahan;
                      $scope.Norec5 = tree[i].noRec;
                     break;       
                    case 10 :
                      $scope.item.obatAntiSakit = tree[i].yesNo;    
                      $scope.item.dObatAntiSakit = tree[i].keterangan;  
                      $scope.item.fObatAntiSakit = tree[i].ketTambahan;
                      $scope.Norec6 = tree[i].noRec; 
                     break;  
                    case 11 :
                      $scope.item.lainnyaObat = tree[i].yesNo;    
                      $scope.item.KetLainnyaObat = tree[i].keterangan;
                      $scope.Norec7 = tree[i].noRec;   
                     break;   
                    case 13 :
                     $scope.item.alergiObat = tree[i].yesNo;    
                     $scope.item.namaObat = tree[i].keterangan;    
                     $scope.item.tipeReaksiObat = tree[i].ketTambahan;
                     $scope.Norec8 = tree[i].noRec;
                     break;   
                    case 14 :
                     $scope.item.alergiMakanan = tree[i].yesNo;      
                     $scope.item.namaMakanan = tree[i].keterangan;   
                     $scope.item.tipeReaksiMakanan = tree[i].ketTambahan;
                     $scope.Norec9 = tree[i].noRec;
                     break;   
                    case 16 :
                     $scope.item.astma = tree[i].yesNo;
                     $scope.Norec10 = tree[i].noRec;
                     break;   
                    case 17 :
                     $scope.item.tekananDarahTinggi = tree[i].yesNo;
                     $scope.Norec11 = tree[i].noRec;
                     break;                  
                    case 18 :
                     $scope.item.kencingManis = tree[i].yesNo;
                     $scope.Norec12 = tree[i].noRec;
                     break;   
                    case 19 :
                     $scope.item.maag = tree[i].yesNo;
                     $scope.Norec13 = tree[i].noRec;
                     break;   
                    case 20 :
                     $scope.item.kelainanJantung = tree[i].yesNo;
                     $scope.Norec14 = tree[i].noRec;
                     break;   
                    case 21 :
                     $scope.item.kejang = tree[i].yesNo;
                     $scope.Norec15 = tree[i].noRec;
                     break;   
                    case 24 :
                     $scope.item.lainnyaRiwayatPenyakit = tree[i].yesNo;  
                     $scope.item.KetLainnyaRiwayatPenyakit = tree[i].keterangan;
                     $scope.Norec16 = tree[i].noRec;
                     break;
                    case 25 :
                     $scope.item.riwayatTranfusiDarah = tree[i].yesNo;    
                     $scope.item.tahunTranfusi = tree[i].keterangan;
                     $scope.Norec17 = tree[i].noRec;
                     break; 
                    case 26 :
                     $scope.item.reaksiTranfusi = tree[i].yesNo;
                     $scope.item.reaksiTranfusiDarah = tree[i].keterangan;
                     $scope.Norec18 = tree[i].noRec;
                     break;
                    case 27 :
                     $scope.item.hiv = tree[i].yesNo; 
                     $scope.item.tahunPeriksaHiv = tree[i].keterangan; 
                     $scope.item.hasilPeriksaHiv = tree[i].ketTambahan;
                     $scope.Norec19 = tree[i].noRec;
                     break;
                    case 29 :
                     $scope.item.kacamata = tree[i].yesNo;
                     $scope.Norec20 = tree[i].noRec;
                     break; 
                    case 31 :
                     $scope.item.alatBantuDengar = tree[i].yesNo;  
                     $scope.Norec21 = tree[i].noRec;
                     break; 
                    case 32 :
                     $scope.item.gigiPalsu = tree[i].yesNo;
                     $scope.Norec22 = tree[i].noRec;
                     break; 
                    case 33 :
                     $scope.item.perhiasan = tree[i].yesNo;
                     $scope.Norec23 = tree[i].noRec;
                     break; 
                    case 34 :
                     $scope.item.riwayatPembedahan = tree[i].yesNo;
                     $scope.item.tahunPembedahan = tree[i].keterangan;
                     $scope.item.jenisOperasi = tree[i].ketTambahan;
                     $scope.item.jenisAnestesi = tree[i].ketTambahan2
                     $scope.item.keluhan = tree[i].ketTambahan3;
                     $scope.Norec24 = tree[i].noRec
                     break; 
                    case 35 :
                     $scope.item.namaPasien = tree[i].yesNo;
                     $scope.Norec25 = tree[i].noRec;
                     break; 
                    case 36 :
                     $scope.item.umur = tree[i].yesNo;
                     $scope.Norec26 = tree[i].noRec;
                     break;
                    case 37 :
                     $scope.item.jenisKelamin = tree[i].yesNo;
                     $scope.Norec27 = tree[i].noRec;
                     break;  
                  }
                }
            });
           }
           $scope.isLoadingDetail = false;
          }
    
          
            $scope.cetak = function(){
            var urlLaporan = CetakBedah.open("");
            window.open(urlLaporan, '_blank');
            }
            
            $scope.Back = function(){
            $state.go('RevDaftarPasienRuanganBedah')
            }
             
            $scope.Save=function(){
            var dateNow= moment(new Date).format('YYYY-MM-DD');
            var praAnestesiPasienBedah=[
                        {
                        "praAnestesiPasien" : {"id" : 2},
                        "yesNo" : $scope.item.merokok,    
                        "keterangan" : $scope.item.qmerokok,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec1
                        },                       
                        {
                        "praAnestesiPasien" : {"id" : 3},
                        "yesNo" : $scope.item.alkohol,    
                        "keterangan" : $scope.item.qalkohol,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec2
                        },                  
                        {
                        "praAnestesiPasien" : {"id" : 4},
                        "yesNo" : $scope.item.kopi,    
                        "keterangan" : $scope.item.qkopi,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec3
                        },                 
                        {
                        "praAnestesiPasien" : {"id" : 7},
                        "yesNo" : $scope.item.olahraga,    
                        "keterangan" : $scope.item.qolahraga,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec4
                        },
                        {
                        "praAnestesiPasien" : {"id" : 9},
                        "yesNo" : $scope.item.obatPengencerDarah,    
                        "keterangan" : $scope.item.dObatPengencerDarah,
                        "ketTambahan" : $scope.item.fObatPengencerDarah,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec5
                        },
                        {
                        "praAnestesiPasien" : {"id" : 10},
                        "yesNo" : $scope.item.obatAntiSakit,    
                        "keterangan" : $scope.item.dObatAntiSakit,
                        "ketTambahan" : $scope.item.fObatAntiSakit,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec6
                        },          
                        {
                        "praAnestesiPasien" : {"id" : 11},
                        "yesNo" : $scope.item.lainnyaObat,    
                        "keterangan" : $scope.item.KetLainnyaObat,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec7
                        },
                        {
                        "praAnestesiPasien" : {"id" : 13},
                        "yesNo" : $scope.item.alergiObat,    
                        "keterangan" : $scope.item.namaObat,
                        "ketTambahan" : $scope.item.tipeReaksiObat,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec8
                        },                        
                        {
                        "praAnestesiPasien" : {"id" : 14},
                        "yesNo" : $scope.item.alergiMakanan,    
                        "keterangan" : $scope.item.namaMakanan,
                        "ketTambahan" : $scope.item.tipeReaksiMakanan,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec9 
                        },
                        {
                        "praAnestesiPasien" : {"id" : 16},
                        "yesNo" : $scope.item.astma,    
                        "keterangan" : $scope.item.astma,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec10
                        },
                        {
                        "praAnestesiPasien" : {"id" : 17},
                        "yesNo" : $scope.item.tekananDarahTinggi,    
                        "keterangan" : $scope.item.tekananDarahTinggi,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec11
                        },                     
                        {
                        "praAnestesiPasien" : {"id" : 18},
                        "yesNo" : $scope.item.kencingManis,    
                        "keterangan" : $scope.item.kencingManis,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec12
                        },
                        {
                        "praAnestesiPasien" : {"id" : 19},
                        "yesNo" : $scope.item.maag,    
                        "keterangan" : $scope.item.maag,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec13
                        },
                        {
                        "praAnestesiPasien" : {"id" : 20},
                        "yesNo" : $scope.item.kelainanJantung,    
                        "keterangan" : $scope.item.kelainanJantung,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec14
                        },
                        {
                        "praAnestesiPasien" : {"id" : 21},
                        "yesNo" : $scope.item.kejang,    
                        "keterangan" : $scope.item.kejang,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec15
                        },
                        {
                        "praAnestesiPasien" : {"id" : 24},
                        "yesNo" : $scope.item.lainnyaRiwayatPenyakit,    
                        "keterangan" : $scope.item.KetLainnyaRiwayatPenyakit,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec16
                        },
                        {
                        "praAnestesiPasien" : {"id" : 25},
                        "yesNo" : $scope.item.riwayatTranfusiDarah,    
                        "keterangan" : $scope.item.tahunTranfusi,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec17
                        },
                        {
                        "praAnestesiPasien" : {"id" : 26},
                        "yesNo" : $scope.item.reaksiTranfusi,    
                        "keterangan" : $scope.item.reaksiTranfusiDarah,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec18
                        },
                        {
                        "praAnestesiPasien" : {"id" : 27},
                        "yesNo" :$scope.item.hiv,
                        "keterangan" : $scope.item.tahunPeriksaHiv,    
                        "ketTambahan" : $scope.item.hasilPeriksaHiv,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec19
                        },
                        {
                        "praAnestesiPasien" : {"id" : 29},
                        "yesNo" : $scope.item.kacamata,    
                        "keterangan" : $scope.item.kacamata,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec20
                        },
                        {
                        "praAnestesiPasien" : {"id" : 31},
                        "yesNo" : $scope.item.alatBantuDengar,    
                        "keterangan" : $scope.item.alatBantuDengar,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec21
                        },
                        {
                        "praAnestesiPasien" : {"id" : 32},
                        "yesNo" : $scope.item.gigiPalsu,
                        "keterangan" : $scope.item.gigiPalsu,   
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec22
                        },
                        {
                        "praAnestesiPasien" : {"id" : 33},
                        "yesNo" : $scope.item.perhiasan,
                        "keterangan" : $scope.item.perhiasan,   
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec23
                        },
                        {
                        "praAnestesiPasien" : {"id" : 34},
                        "yesNo" : $scope.item.riwayatPembedahan,
                        "keterangan" : $scope.item.tahunPembedahan,
                        "ketTambahan" : $scope.item.jenisOperasi,
                        "ketTambahan2" : $scope.item.jenisAnestesi,
                        "ketTambahan3" : $scope.item.keluhan,
                        "statusEnabled" : "true",
                        "noRec" : $scope.Norec24
                        }
                        ]

                  
                    for (var i=0; i < praAnestesiPasienBedah.length; i++){
                        debugger
                        if(praAnestesiPasienBedah[i].keterangan == "" || praAnestesiPasienBedah[i].keterangan == undefined){
                            delete praAnestesiPasienBedah[i].keterangan
                        }
                        if(praAnestesiPasienBedah[i].keterangan == "" || praAnestesiPasienBedah[i].keterangan == undefined){
                            delete praAnestesiPasienBedah[i].ketTambahan
                        }
                        if(praAnestesiPasienBedah[i].noRec == "" || praAnestesiPasienBedah[i].noRec == undefined){
                            delete praAnestesiPasienBedah[i].noRec
                        }
                    }

                      var dataHeader = {
                                        "pasienDaftar": {"noRec": $state.params.noRec},
                                        "noRec": $scope.NorecForm,
                                        "statusEnabled": "true",
                                        "tglAnestasi": dateNow,
                                        "praAnestesiPasienBedah": praAnestesiPasienBedah
                                        }
                      ManagePasien.saveFormulirAnestesiPasienRev1(dataHeader).then(function(e){
                      console.log(JSON.stringify(dataHeader));
                      })      
            }

        }
    ]);
});