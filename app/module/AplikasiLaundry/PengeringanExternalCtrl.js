define(['initialize'], function(initialize){
    'use strict';
    initialize.controller('PengeringanExternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','ManageSarpras','FindSarpras',
        function($rootScope, $scope,$state, ModelItem , dateHelper,ManageSarpras,FindSarpras){
            $scope.item = {};
            $scope.now = new Date();
            
            $scope.item.beratlinen = $state.params.beratLinen
            $scope.satuan = function() {
             if($scope.item.mesin != undefined){
                $scope.item.kapasitas = $scope.item.mesin.kapasitasMesin;
                $scope.item.satuan = $scope.item.mesin.namaSatuanStandar;
              }
            };

            // set data fix Pengeringan
             $scope.item.satuanlinen = "Kilogram";

             // set parameter external
             $scope.item.petugas = $state.params.Petugas;
             $scope.noRecStrukPelayanan = $state.params.noRec;
             $scope.item.beratlinen= $state.params.beratLinen;
             $scope.item.IdPetugas = $state.params.IdPetugas;

            $scope.SetTotalJam = function(){
              var tanggalAwalPencucian = new moment($scope.item.tanggalPengeringan).format('YYYY-MM-DD');
              var tanggalAkhirPencucian = new moment($scope.item.tanggalKerja).format('YYYY-MM-DD');
              var JamAwalPencucian = new moment($scope.item.jamAwal).format('HH:mm');
              var JamAkhirPencucian = new moment($scope.item.jamAkhir).format('HH:mm');
              var TotalWaktu = dateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian+" "+JamAwalPencucian, tanggalAkhirPencucian+" "+JamAkhirPencucian);
              return $scope.item.TotalJam = TotalWaktu;
             }
             

            FindSarpras.getSarpras("alat/get-mesin-laundry").then(function(dat){
               $scope.sourceMasterMesin = dat.data.data
            });
            

            $scope.kembali = function(){
              $state.go("DaftarPencucianLinenEks");
            }

            $scope.DaftarPengeringan = function(){
                $state.go('DaftarPengeringanExternal')
            }


        $scope.Save = function() {
        debugger
            var TanggalMulai = dateHelper.formatDate($scope.item.tanggalPengeringan,"YYYY-MM-DD")
            var TanggalSelesai = dateHelper.formatDate($scope.item.tanggalKerja,"YYYY-MM-DD")
            var JamAwal = dateHelper.formatDate($scope.item.jamAwal, "HH:mm:ss");
            var JamAkhir = dateHelper.formatDate($scope.item.jamAkhir, "HH:mm:ss");
           var listRawRequired = [
              "item.tanggalPengeringan|k-ng-model|Tanggal Awal",
              "item.tanggalKerja|k-ng-model|Tanggal Kerja",
              "item.jamAwal|k-ng-model|Jam Awal",
              "item.jamAkhir|k-ng-model|Jam Akhir",
              "item.mesin|k-ng-model|Mesin",
              "item.beratlinen|ng-model|Berat",
              "item.jumlahCycle|ng-model|Jumlah Cycle"
            ];
         var isValid = ModelItem.setValidation($scope, listRawRequired);
          if(isValid.status){
             var data = {
                          "tgl":TanggalMulai+" "+JamAwal,
                          "tglKerja":TanggalSelesai+" "+JamAkhir,
                          "beratLinen":parseInt($scope.item.beratlinen),
                          "mesinId": $scope.item.mesin.alatId,
                          "petugasId":$scope.item.IdPetugas,
                          "noRecStrukPelayanan" : $scope.noRecStrukPelayanan,
                          "jumlahCycle" : parseInt($scope.item.jumlahCycle)
                        }
         ManageSarpras.savePengeringan(data,"laundry/save-proses-pengeringan-external").then(function (e) {
           $scope.item = {};
           });
          }else{
             ModelItem.showMessages(isValid.messages);
          }  

       };
      }
    ])
})

