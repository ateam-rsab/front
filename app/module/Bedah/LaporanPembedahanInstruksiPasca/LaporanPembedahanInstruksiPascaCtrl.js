define(['initialize'], function(initialize) {
  'use strict';
initialize.controller('LaporanPembedahanInstruksiPascaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper','CetakBedah','FindPasien','$mdDialog','ManagePasien',
    function($rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, CetakBedah,findPasien, $mdDialog, managePasien) {
      $scope.item = {};
      $scope.isLoadingData = true;
      $scope.AllData = false;
      $scope.now = new Date();
       $scope.dataVOloaded = false;
       $scope.isReport = true;
       var data2 = []
          $scope.reset=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Tambah Baru akan mereset form Input dan Daftar Rencana, Tetap Lanjutkan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.reset2();
                     $("#grid2").data('kendoGrid').dataSource.data([]);
                })
            };

            findPasien.getDokter().then(function(data){
            $scope.listDataDokter = data.data.data;    
            });

            $scope.$watchGroup(['item.MulaiJam', 'item.selesaiJam'], function(newValued, OldValue){
             var MulaiFormatJam = new moment($scope.item.MulaiJam).format('HH');
             var SelesaiFormatJam = new moment($scope.item.selesaiJam).format('HH');
             var formatLamaJam = SelesaiFormatJam - MulaiFormatJam ;
             var MulaiFormatMenit = new moment($scope.item.MulaiJam).format('mm');
             var SelesaiFormatMenit = new moment($scope.item.selesaiJam).format('mm');
             var formatLamaMenit = SelesaiFormatMenit - MulaiFormatMenit;
             $scope.item.LamaPembedahan = formatLamaJam+" Jam,"+formatLamaMenit+" Menit";
            })

           findPasien.getMasterInfus().then(function(data) {
           $scope.listmacam = data.data.data.listData;
           });
          
          findPasien.getPerawat().then(function(dat) {
           $scope.listPerawat = dat.data;
          });

           $scope.loadGrid = function(){
              debugger
              findPasien.getLoadAntrianLaporanPembedahanInstruksi($state.params.noRec).then(function(data) {
               debugger
              if(data.data.data != undefined){
                debugger
              $scope.dataMaster = data.data.data.listData;
              $scope.dataSource = new kendo.data.DataSource({
              pageSize:50,
              data : $scope.dataMaster,
              $scrollable : true
               });
               }
              });
            }
            $scope.loadGrid();

            $scope.klik = function(dataSelected){
              debugger
              $scope.isChecked;
              if (dataSelected != undefined){
               $scope.item.ModeEdit = true;
               $scope.item.idCheckin = dataSelected.noTrans;
               $scope.Keytransaksi = dataSelected.noTrans;
               findPasien.getSubLoadAntrianLaporanPembedahanInstruksi($scope.item.idCheckin).then(function(data) {
                debugger
                toastr.info("1 Dipilih");
                $scope.subdatamaster = data.data.data;
                $scope.subdatamaster = data.data.data;
                 $scope.NorecParent = $scope.subdatamaster.noRec;
                 //Laporan Pembedahaan
                 for(var x=0; x<$scope.subdatamaster.loadData[0].detail.length; x++){
                  debugger
                    switch($scope.subdatamaster.loadData[0].detail[x].id){
                      case 260 :
                      $scope.item.MacamJaringan = $scope.subdatamaster.loadData[0].detail[x].keterangan;
                      $scope.Norec1 = $scope.subdatamaster.loadData[0].detail[x].noRec;
                      break; 
                      case 256 :
                      $scope.Norec5 = $scope.subdatamaster.loadData[0].detail[x].noRec
                      $scope.item.UraianPembedahan = $scope.subdatamaster.loadData[0].detail[x].keterangan;
                      break; 
                      case 249 :
                      $scope.Norec9 = $scope.subdatamaster.loadData[0].detail[x].noRec
                      $scope.item.Tindakan1 = $scope.subdatamaster.loadData[0].detail[x].keterangan
                      break; 
                    }    
                 }

                   $scope.listKategori1.forEach(function(t){
                      t.isChecked = false     
                   })

                    $scope.checkListKategori = [];
                    $scope.subdatamaster.loadData[0].detail.forEach(function(data){
                    $scope.listKategori1.forEach(function(e){
                    if (e.id == data.id)
                    {
                      if(data.keterangan != null){
                        e.isChecked = true
                        var dataid =   
                                      {
                                        "namaExternal": data.namaExternal,
                                        "keterangan": data.keterangan,
                                        "noTrans": data.noTrans,
                                        "id": data.id,
                                        "noRec": data.noRec,
                                        "idParent": data.idParent
                                      }
                                  }
                    $scope.checkListKategori.push(dataid)
                    }
                    })
                    })

                    $scope.listKategori2.forEach(function(t){
                        t.isChecked = false     
                     })
                    $scope.checkListKategori2 = [];
                    $scope.subdatamaster.loadData[0].detail.forEach(function(data){
                    $scope.listKategori2.forEach(function(e){
                    if (e.id == data.id)
                    {
                      if(data.keterangan != null){
                        e.isChecked = true
                        var dataid =   
                                      {
                                        "namaExternal": data.namaExternal,
                                        "keterangan": data.keterangan,
                                        "noTrans": data.noTrans,
                                        "id": data.id,
                                        "noRec": data.noRec,
                                        "idParent": data.idParent
                                      }
                                  }
                    $scope.checkListKategori2.push(dataid)
                    }
                    })
                    })


                var tempss = [];
                  for (var key in $scope.listPatology) {
                    if ($scope.listPatology.hasOwnProperty(key)) {
                        var element2 = $scope.listPatology[key];
                        if (element2 !== true) {
                             $scope.subdatamaster.loadData[0].detail.forEach(function(datax){
                                if(datax.id === 258){
                                    element2.value = $scope.listPatologi[1];
                                   element2.noRec = datax.noRec;
                                tempss.push(element2);
                                }else if(datax.id === 259){
                                    element2.value = $scope.listPatologi[0];
                                   element2.noRec = datax.noRec;
                                tempss.push(element2);
                             }
                               
                            })
                        }
                    }
                  }
                  $scope.DatalistPatologi = tempss;

                var temporary2 = [];
                  for (var key in $scope.listLabelPasienParanet) {
                    if ($scope.listLabelPasienParanet.hasOwnProperty(key)) {
                        var element = $scope.listLabelPasienParanet[key];
                        if (element !== true) {
                            element.value = null;
                             $scope.subdatamaster.loadData[1].detail.forEach(function(datax){
                                if(element.id == datax.id){
                                       if(datax.keterangan  == "1"){
                                          element.value = $scope.listLabelPasien[0];
                                          element.noRec = datax.noRec;
                                        }else{
                                          element.value = $scope.listLabelPasien[1];
                                          element.noRec = datax.noRec;
                                        }
                                 temporary2.push(element);
                                 }
                            })
                        }
                    }
                  }
                  $scope.DatalistLabel = temporary2;
 
                for(var x=0; x<$scope.subdatamaster.loadData[1].detail.length; x++){
                  switch($scope.subdatamaster.loadData[1].detail[x].id){
                      case 264 :
                      $scope.item.nadi = $scope.subdatamaster.loadData[1].detail[x].keterangan;
                      $scope.Norecx1 = $scope.subdatamaster.loadData[1].detail[x].noRec;
                      break; 
                      case 263 :
                      $scope.item.tekananDarah = $scope.subdatamaster.loadData[1].detail[x].keterangan;
                      $scope.Norecx2 = $scope.subdatamaster.loadData[1].detail[x].noRec;
                      break;

                      case 268 :
                      $scope.noRecx4 = $scope.subdatamaster.loadData[1].detail[x].noRec
                      $scope.item.bolehMakan = $scope.subdatamaster.loadData[1].detail[x].keterangan;
                      break; 

                      case 265 :
                      $scope.Norecx5 = $scope.subdatamaster.loadData[1].detail[x].noRec
                      $scope.item.suhu = $scope.subdatamaster.loadData[1].detail[x].keterangan;
                      break; 
                      
                      case 267 :
                      $scope.Norecx6 = $scope.subdatamaster.loadData[1].detail[x].noRec
                      $scope.item.bolehMinum = $scope.subdatamaster.loadData[1].detail[x].keterangan
                      break; 
                      
                      case 266 :
                      $scope.Norecx7 = $scope.subdatamaster.loadData[1].detail[x].noRec
                      $scope.item.pernafasan = $scope.subdatamaster.loadData[1].detail[x].keterangan
                      break; 

                      case 273 :
                      $scope.Norecx8 = $scope.subdatamaster.loadData[1].detail[x].noRec
                      $scope.item.obatobatan = $scope.subdatamaster.loadData[1].detail[x].keterangan
                      break;
                      
                      case 274 :
                      $scope.Norecx9 = $scope.subdatamaster.loadData[1].detail[x].noRec
                      $scope.item.InstruksiKhusus = $scope.subdatamaster.loadData[1].detail[x].keterangan
                      break;
                    
                  }    
               }
                $scope.item.jam = $scope.subdatamaster.jam;
                $scope.item.MulaiJam = $scope.subdatamaster.operasiMulai;
                $scope.item.selesaiJam = $scope.subdatamaster.operasiSelesai;
                if($scope.item.selesaiJam != null){ 
                var MulaiFormatJam2 = $scope.item.selesaiJam.slice(0, 2);
                var SelesaiFormatJam2 = $scope.item.MulaiJam.slice(0, 2);
                if(SelesaiFormatJam2>MulaiFormatJam2){
                   var formatLamaMenit2 = SelesaiFormatJam2 - MulaiFormatJam2;
                }else{
                   var formatLamaMenit2 = SelesaiFormatJam2 + MulaiFormatJam2;
                }

                var formatLamaJam2 = SelesaiFormatJam2 - MulaiFormatJam2 ;
               
                var MulaiFormatMenit2 = parseInt($scope.item.MulaiJam.slice(3, 5));
                var SelesaiFormatMenit2 = parseInt($scope.item.selesaiJam.slice(3, 5));
                if(SelesaiFormatMenit2>MulaiFormatMenit2){
                   var formatLamaMenit2 = SelesaiFormatMenit2 - MulaiFormatMenit2;
                }else{
                   var formatLamaMenit2 = SelesaiFormatMenit2 + MulaiFormatMenit2;
                }
                $scope.item.LamaPembedahan = formatLamaJam2+" Jam,"+formatLamaMenit2+" Menit";
                }
                $scope.dataLaporanPembedahan.data([]);
                for(var i = 0; i<$scope.subdatamaster.loadData[2].detail.length; i++){
                  debugger
                    $scope.dataLaporanPembedahan.add({
                     macam : {name : $scope.subdatamaster.loadData[2].detail[i].name, id : $scope.subdatamaster.loadData[2].detail[i].id},
                     jumlah : $scope.subdatamaster.loadData[2].detail[i].jumlah,
                     tetesan : $scope.subdatamaster.loadData[2].detail[i].tetesan,
                     noRec : $scope.subdatamaster.loadData[2].detail[i].noRec,
                     id : $scope.subdatamaster.loadData[2].detail[i].id
                    })
                 }
                 $scope.NorecParent = $scope.subdatamaster.noRec;
                 $scope.item.Anestesiologi = $scope.subdatamaster.anestesiologi;
                 $scope.item.PenataAnestesi = $scope.subdatamaster.penataAnestesi;
                 $scope.item.DiagnosaPraBedah = $scope.subdatamaster.diagnosaPreOperasi;
                 $scope.item.DiagnosaPascaPraBedah = $scope.subdatamaster.diagnosaPostOperasi;
                 $scope.item.AsistenOperator = {
                    id: $scope.subdatamaster.idAsistenOperator,
                    namaLengkap : ""
                 }
                 $scope.item.PerawatInstrumen = {
                  id : $scope.subdatamaster.idPerawatInstrumen,
                  namaExternal : ""
                 }
                $scope.item.Operator = {
                  id : $scope.subdatamaster.idOperator,
                  namaLengkap : ""
                }
                $scope.item.tglPembedahan = new moment ($scope.subdatamaster.tanggal).format("YYYY-MM-DD");
                $scope.item.jenisKelamin = $scope.subdatamaster.jenisKelamin;
                $scope.item.namaPasien = $scope.subdatamaster.namaPasien;
                $scope.subdatamaster.loadGrid;

                });
               }
              }

            $scope.columnLaporanPembedahan = [
            {
                "field": "noRec",
                "title": "Norec"
            },
            {
                "field": "noTrans",
                "title": "No Transaksi"
            }
            ];

           $scope.Add = function() {
            $scope.dataLaporanPembedahan.add($scope.cullen);
            } 
            $scope.now = new Date();
            $scope.column = [
            {
                "field": "macam.name",
                "title": "Macam",
                "width": "150px"
            },
            {
                "field": "jumlah",
                "title": "Jumlah",
                "width": "150px"
            },
            {
                "field": "tetesan",
                "title": "Tetesan",
                "width": "150px"
            }

            ];


            if (cacheHelper !== undefined) {
                $scope.dataLaporanPembedahan = new kendo.data.DataSource({
                    data: cacheHelper.get('Kasa' + $state.params.noRegister)
                });;
            } else
                $scope.dataLaporanPembedahan = new kendo.data.DataSource({
                    data: []
                });


            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
            $scope.sourceDiagnosisPrimer = data;
            });

            $state.params.noRec;
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {   
             $scope.item.pasien = data.data.pasien;
             $scope.isLoadingData = false;
             $scope.AllData = true;
             });
      
            // findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
            //   $scope.item.Idpasien = data.data.pasien.id;
            //   $scope.item.namaPasien = data.data.pasien.namaPasien;
            //   $scope.item.ruangantujuan = data.data.ruangan.id
            //   $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-TYYYY HH:mm');
            // });

            $scope.reset2 = function(){
             $scope.item.NoPlanningIntern = "";
             $scope.item.NamaPlanning = "";
             $scope.item.DeskripsiPlanning = "";
             $scope.item.TglPengajuan = "";
             $scope.item.TglPlanning = "";
             $scope.item.TglPlanningAkhir ="";
             $scope.item.Ruangan = "";
             $scope.item.Ruangan2 = "";
             $scope.item.TglDimulai ="";
             $scope.item.TglBerakhir ="";
             $scope.item.TglSiklusAwal ="";
             $scope.item.TglSiklusAkhir ="";
             $scope.item.DokumenSk ="";
             $scope.item.JenisAnggaran ="";
            }

            
          $scope.dataModelGrid = {};
          $scope.cutiHabis = false;
          $scope.dataVOloaded = true;
          $scope.disJumlahCuti = true;
          $scope.hideJumlahCuti = false;
          $scope.showJumlahCuti = function () {
            if ($scope.item.statusPegawai.id == 1) {
              $scope.hideJumlahCuti = true;
              $scope.getCuti();
              
            } else {
              $scope.hideJumlahCuti = false;
            }
          }




         $scope.listKategori1=[
                {id:250, name:"Emergensi", namaExternal:"Emergensi"},
                {id:251, name:"Elektif", namaExternal:"Elektif"}
         ];

         $scope.checkListKategori = [];
          $scope.checkKategori = function(data) {
           debugger;
              var isExist = _.find($scope.checkListKategori, function(dataExist) {
                  return dataExist == data;
              });
              if (isExist == undefined) {
                  $scope.checkListKategori.push(data);
              } else {
                  $scope.checkListKategori = _.without($scope.checkListKategori, data);    
              }
           };
      
        $scope.listKategori2=[
            {id:252, name:"Minor", namaExternal:"Minor"},
            {id:253, name:"Medium", namaExternal:"Medium"},
            {id:254, name:"Mayor", namaExternal:"Mayor"},
            {id:255, name:"Khusus", namaExternal:"Khusus"}
        ];

         $scope.checkListKategori2 = [];
          $scope.checkKategori2 = function(data) {
           debugger;
              var isExist = _.find($scope.checkListKategori2, function(dataExist) {
                  return dataExist == data;
              });
              if (isExist == undefined) {
                  $scope.checkListKategori2.push(data);
              } else {
                  $scope.checkListKategori2 = _.without($scope.checkListKategori2, data);    
              }
           };


        $scope.listPatologi=[
            {id:259, name:"Tidak", namaExternal:"Tidak"},
            {id:258, name:"Ya", namaExternal:"Ya"}
        ];

         $scope.listPatology=[
              {id:1, name:"Jaringan Ke Patologi :"}
          ];

          var temp = [];
          for (var key in $scope.listPatology) {
              if ($scope.listPatology.hasOwnProperty(key)) {
                  var element = $scope.listPatology[key];
                  if (element !== true) {
                      element.value = $scope.listPatologi[0];
                      temp.push(element);
                  }
              }
           }
           $scope.DatalistPatologi = temp;

        $scope.listLabelPasien=[
                  {id:1, name:"Belum", namaExternal:"Belum"},
                  {id:2, name:"Sudah", namaExternal:"Sudah"}
         ];

        $scope.listLabelPasienParanet=[
              {id:261, name:"Label Pasien Sudah ditempel"}
        ];

        var temp = [];
        for (var key in $scope.listLabelPasienParanet) {
        if ($scope.listLabelPasienParanet.hasOwnProperty(key)) {
        var element = $scope.listLabelPasienParanet[key];
        if (element !== true) {
          element.value = $scope.listLabelPasien[0];
          temp.push(element);
        }
        }
        }
        $scope.DatalistLabel = temp;


          $scope.cetak = function(){
          debugger;
          var urlLaporan = CetakBedah.open("");
          window.open(urlLaporan, '_blank');
          }

          $scope.Back = function(){
          $state.go('RevDaftarPasienRuanganBedah')
          }

          $scope.Save=function(){
              var confirm = $mdDialog.confirm()
                    .title('Peringatan!')
                    .textContent('Apakah anda yakin akan menyimpan data ini?')
                    .ariaLabel('Lucky day')
                    .ok('Ya')
                    .cancel('Tidak')

              $mdDialog.show(confirm).then(function() {
                  $scope.Simpan();
              })
          };

            $scope.Simpan = function() {
             debugger
             var dataAsuhan = [];
             var infusDetailx = [];
             for(var i = 0; i<$scope.dataLaporanPembedahan._data.length; i++){
                    var tglSteri= new moment($scope.dataLaporanPembedahan._data[i].tglSteri).format('DD-MM-YYYY');
                    var datax = {
                                  macamInfus : {id : $scope.dataLaporanPembedahan._data[i].macam.id},
                                  jumlah : $scope.dataLaporanPembedahan._data[i].jumlah,
                                  tetesan : $scope.dataLaporanPembedahan._data[i].tetesan,
                                  statusEnabled : true,
                                  noRec : $scope.dataLaporanPembedahan._data[i].noRec
                                 }
                   infusDetailx.push(datax);
              }

                for (var key in $scope.DatalistPatologi) {
                  debugger
                    if ($scope.DatalistPatologi.hasOwnProperty(key)) {
                        var element = $scope.DatalistPatologi[key];
                        if(element.value!=undefined){
                          if(element.value.id == 258){
                              dataAsuhan.push({
                                  objekDataMasalah : {id : element.value.id},
                                  keterangan : new moment($scope.item.tanggal).format("DD-MM-YYYY"),
                                  flagHeader : "Asuhan",
                                  flagasuhan : "Data & Masalah Keperawatan",
                                  statusEnabled : "true",
                                  noRec : element.noRec,
                                  asuhankeperawatanHeaderId : $scope.Keytransaksi
                             })
                           }else{
                                dataAsuhan.push({
                                  objekDataMasalah : {id : element.value.id},
                                  keterangan : element.value.name,
                                  flagHeader : "Asuhan",
                                  flagasuhan : "Data & Masalah Keperawatan",
                                  statusEnabled : "true",
                                  noRec : element.noRec,
                                  asuhankeperawatanHeaderId : $scope.Keytransaksi
                             })
                           }
                        }
                    }
                }
                  //Combonya beda sendiri dengan master
                  for (var key in $scope.DatalistLabel) {
                    debugger
                    if ($scope.DatalistLabel.hasOwnProperty(key)) {
                        var element = $scope.DatalistLabel[key];
                        if(element.value!=undefined){
                              dataAsuhan.push({
                                  objekDataMasalah : {id : element.id},
                                  keterangan : element.value.id,
                                  flagHeader : "Asuhan",
                                  flagasuhan : "Data & Masalah Keperawatan",
                                  statusEnabled : "true",
                                  noRec : element.noRec,
                                  asuhankeperawatanHeaderId : $scope.Keytransaksi
                             })
                        }
                    }
                }

             // Kategori 1
              for(var i=0 ;  i<$scope.checkListKategori.length; i++) {
                debugger
              var dat = {
                    "objekDataMasalah":{
                        "id":$scope.checkListKategori[i].id
                    },
                    "keterangan": $scope.checkListKategori[i].name,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.checkListKategori[i].noRec,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
                dataAsuhan.push(dat)
             }

             // Kategori 2
              for(var i=0 ;  i<$scope.checkListKategori2.length; i++) {
                debugger
              var dat = {
                    "objekDataMasalah":{
                        "id":$scope.checkListKategori2[i].id
                    },
                    "keterangan": $scope.checkListKategori2[i].name,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.checkListKategori2[i].noRec,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
                dataAsuhan.push(dat)
             }

             //Tindakan Pembdahan
              if($scope.item.Tindakan1 != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":249
                    },
                    "keterangan": $scope.item.Tindakan1,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.Norec9,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
              dataAsuhan.push(dat)
              }
              

              //Uraian Pembedahan
              if($scope.item.UraianPembedahan != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":256
                    },
                    //"keterangan": $scope.item.UraianPembedahan,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "keterangan" : $scope.item.UraianPembedahan,
                     "noRec" : $scope.Norec5,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
                dataAsuhan.push(dat)
              }
              
              //Uraian  MacamJaringan
              if($scope.item.MacamJaringan != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":260
                    },
                    "keterangan": $scope.item.MacamJaringan,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.Norec1,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
                dataAsuhan.push(dat)
              }

              //Tanda Tangan di buat fp
              // if($scope.item.TandaTangan != undefined){
              //   var dat = {
              //       "objekDataMasalah":{
              //           "id":300
              //       },
              //       "keterangan": $scope.item.TandaTangan.namaLengkap,
              //        "flagHeader" : "Asuhan",
              //        "flagasuhan" : "Data & Masalah Keperawatan",
              //        "statusEnabled" : "true"
              //   }
              //   dataAsuhan.push(dat)
              // }
              //tekananDarah
              if($scope.item.tekananDarah != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":263
                    },
                    "keterangan": $scope.item.tekananDarah,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.Norecx2,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
                dataAsuhan.push(dat)
              }

                //nadi
              if($scope.item.nadi != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":264
                    },
                    "keterangan": $scope.item.nadi,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.Norecx1,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
              dataAsuhan.push(dat)
              }

              //suhu
              if($scope.item.suhu != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":265
                    },
                    "keterangan": $scope.item.suhu,
                    "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.Norecx5,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
              dataAsuhan.push(dat)
              }
              //pernafasan
              if($scope.item.pernafasan != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":266
                    },
                    "keterangan": $scope.item.pernafasan,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.Norecx7,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
               dataAsuhan.push(dat)
              }

                //bolehMinum
              if($scope.item.bolehMinum != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":267
                    },
                    "keterangan": $scope.item.bolehMinum,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.Norecx6,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
                dataAsuhan.push(dat)
              }
             
              if($scope.item.bolehMakan != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":268
                    },
                    "keterangan": $scope.item.bolehMakan,
                     "flagHeader" : "Asuhan",
                     "flagasuhan" : "Data & Masalah Keperawatan",
                     "statusEnabled" : "true",
                     "noRec" : $scope.noRecx4,
                     "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
              dataAsuhan.push(dat)
              }
              //Intruksi Khusus
              if($scope.item.obatobatan != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":273
                    },
                    "keterangan": $scope.item.obatobatan,
                    "flagHeader" : "Asuhan",
                    "flagasuhan" : "Data & Masalah Keperawatan",
                    "statusEnabled" : "true",
                    "noRec" : $scope.Norecx8,
                    "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                }
                dataAsuhan.push(dat)
              }

                if($scope.item.InstruksiKhusus != undefined){
                var dat = {
                    "objekDataMasalah":{
                        "id":274
                    },
                    "keterangan": $scope.item.InstruksiKhusus,
                    "flagHeader" : "Asuhan",
                    "flagasuhan" : "Data & Masalah Keperawatan",
                    "statusEnabled" : "true",
                    "noRec" : $scope.Norecx9,
                    "asuhankeperawatanHeaderId" : $scope.Keytransaksi

              }
              dataAsuhan.push(dat)
              }
              debugger
                if($scope.item.ModeEdit != true){
                  $scope.item.MulaiJam = new moment($scope.item.MulaiJam).format('HH:mm');
                  $scope.item.selesaiJam = new moment($scope.item.selesaiJam).format('HH:mm');
                  }
                  var data = {
                                "pasienDaftar" : {"noRec" : $state.params.noRec},
                                "noRec" : $scope.NorecParent,
                                "noTrans" : $scope.Keytransaksi,
                                "statusEnabled" : "true",
                                "operasiMulai" : $scope.item.MulaiJam,
                                "operasiSelesai" : $scope.item.selesaiJam,
                                "tanggal" : dateHelper.formatDate($scope.item.tglPembedahan,"YYYY-MM-DD"),
                                "diagnosaPreOperasi" : $scope.item.DiagnosaPraBedah,
                                "diagnosaPostOperasi" : $scope.item.DiagnosaPascaPraBedah,
                                "anestesiologi" : $scope.item.Anestesiologi,
                                "penataAnestesi" : $scope.item.PenataAnestesi, 
                                "tindakan" : "lanjutkan",
                                "dokterBedah" : {"id" : $scope.item.Operator.id},
                                "asistenBedah" : {"id" : $scope.item.AsistenOperator.id},
                                "perawatInstrumen1" : {"id" : $scope.item.PerawatInstrumen.id},
                                "asuhanTrans" : dataAsuhan,
                                "infusDetail" : infusDetailx
                              }
                    console.log(JSON.stringify(data));
                    managePasien.saveLaporanPembedahanInstruksiPasca(data).then(function(e){ 
                    $scope.loadGrid(); 
                    })
                  };

      }
    ]);
});