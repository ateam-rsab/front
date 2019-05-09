define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemantauanAnestesiCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'DateHelper','CetakBedah','ManagePasien',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, DateHelper, CetakBedah,managePasien) {
            // $scope.isLoadingData2 = true;
            $scope.item={};
            $scope.item.obatPengencerDarah=1;
            // $scope.title="PEMANTAUAN ANESTESI LOKAL";
            $scope.title2="Data Pasien";
            $scope.isReport=true;
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });
            $scope.title="PEMANTAUAN ANESTESI LOKAL ";

            findPasien.getPasienBedah().then(function(data){
            });

            $scope.loadGrid = function () {
             debugger
             $scope.item.obatPengencerDarah=1;
             findPasien.GetAntrianPemantauanAnestesi($state.params.noRec).then(function(data) {
             debugger
              $scope.dataMaster = data.data.data.listData;
              $scope.dataSource = new kendo.data.DataSource({
              pageSize:50,
              data : $scope.dataMaster,
              $scrollable : true
              });
              });
             }
            $scope.loadGrid();


            $scope.clicks = function(dataSelected){
            debugger
               $scope.isChecked;
              if (dataSelected != undefined){
               $scope.item.ModeEdit = true;
               $scope.item.idCheckin = dataSelected.noTrans;
               findPasien.getSubPemantauanAnestesi($scope.item.idCheckin).then(function(data) {
                debugger
                toastr.info("1 Dipilih");
                $scope.subdatamaster = data.data.data;
                $scope.NoRecParents = $scope.subdatamaster.noRec;
                var tempp = [];
                for(var n = 0; n<$scope.subdatamaster.loadData[1].detail.length; n++){
                   switch($scope.subdatamaster.loadData[1].detail[n].id){
                        case 290 :
                          $scope.NoRec1 = $scope.subdatamaster.loadData[1].detail[n].noRec
                          $scope.item.DosisDigunakan = $scope.subdatamaster.loadData[1].detail[n].keterangan;
                        break;
                        case 294 :
                          $scope.NoRec2 = $scope.subdatamaster.loadData[1].detail[n].noRec
                          $scope.item.LokasiPemberian = $scope.subdatamaster.loadData[1].detail[n].keterangan;
                        break;
                        case 287 :
                        $scope.NoRec3 = $scope.subdatamaster.loadData[1].detail[n].noRec
                        var BucketTemporary = [];
                        for (var key in $scope.listRadioo) {
                            if ($scope.listRadioo.hasOwnProperty(key)) {
                                var element = $scope.listRadioo[key];
                            if (element !== true) {
                                element.value = null;
                                if ($scope.subdatamaster.loadData[1].detail[n].keterangan == "Normal"){
                                    element.value = $scope.listPemeriksaanFisik[0];
                                }else{
                                    element.value = $scope.listPemeriksaanFisik[1];
                                }   
                           BucketTemporary.push(element);
                          }
                         }
                        }
                        $scope.listradiologi = BucketTemporary;
                        break;
                        case 288 :
                          $scope.NoRec4 = $scope.subdatamaster.loadData[1].detail[n].noRec
                          $scope.item.ObatDigunakan = $scope.subdatamaster.loadData[1].detail[n].keterangan;
                        break;
                        case 289 :
                        $scope.NoRec5 = $scope.subdatamaster.loadData[1].detail[n].noRec
                        var temps = [];
                        for (var key in $scope.dataPengencer) {
                            if ($scope.dataPengencer.hasOwnProperty(key)) {
                                var element = $scope.dataPengencer[key];
                            if (element !== true) {
                                element.value = null;
                                if ($scope.subdatamaster.loadData[1].detail[n].keterangan == "2"){
                                    element.value = $scope.listPengencer[1];
                                }else{
                                    element.value = $scope.listPengencer[0];
                                }   
                           temps.push(element);
                          }
                         }
                        }
                        $scope.listPengencerx = temps;
                        if($scope.subdatamaster.loadData[1].detail[n].keterangan == "2"){
                            $scope.item.obatPengencerDarah = 2
                        }else{
                            $scope.item.obatPengencerDarah = 1
                        }
                        break;
                        case 291 :
                          $scope.NoRec6 = $scope.subdatamaster.loadData[1].detail[n].noRec;
                          $scope.item.jamPemberian = new moment($scope.subdatamaster.loadData[1].detail[n].keterangan).format('HH:mm');
                        break;
                        case 293 :
                          $scope.NoRec7 = $scope.subdatamaster.loadData[1].detail[n].noRec
                          $scope.item.Dosis = $scope.subdatamaster.loadData[1].detail[n].keterangan;
                        break;
                        case 292 :
                            $scope.NoRec8 = $scope.subdatamaster.loadData[1].detail[n].noRec
                            $scope.listPemantauan = null;
                            var temPemantau = [];
                            for (var key in $scope.listPemantau) {
                            if ($scope.listPemantau.hasOwnProperty(key)) {
                                var element = $scope.listPemantau[key];
                            if (element !== true) {
                                element.value = null;
                                if ($scope.subdatamaster.loadData[1].detail[n].keterangan == "Ya"){
                                    element.value = $scope.listAdrenaline[0];
                                }else{
                                    element.value = $scope.listAdrenaline[1];
                                }   
                            temPemantau.push(element);
                            }
                            }
                            }
                            $scope.listPemantauan = temPemantau;
                        break;
                        case 357 :
                        $scope.NoRec9 = $scope.subdatamaster.loadData[1].detail[n].noRec
                        $scope.item.JenisPengencer = $scope.subdatamaster.loadData[1].detail[n].keterangan;
                        break;
                     }
                   }
                 for (var p = 0; p<$scope.subdatamaster.loadData[2].detail.length; p++){
                    if($scope.subdatamaster.loadData[2].detail[p].id == 323){
                       $scope.noRecGrid = $scope.subdatamaster.loadData[2].detail[p].noRec;
                        for(var i = 0; i<$scope.PemantauanAnestesiData.length; i++){
                            switch(i){
                                case 0 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c15
                                }
                                tempp.push(datah)
                                break;
                                case 1 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c30
                                }
                                tempp.push(datah)
                                break;
                                case 2 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c35
                                }
                                tempp.push(datah) 
                                break;
                                case 3 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c45
                                }
                                tempp.push(datah) 
                                break;
                                case 4 :
                                 var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c60
                                }
                                tempp.push(datah)  
                                break;
                                case 5 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c75
                                }
                                tempp.push(datah)
                                break;
                                case 6 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c90
                                }
                                tempp.push(datah) 
                                break;
                                case 7 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c105
                                }
                                tempp.push(datah) 
                                break;
                                case 8 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c120
                                }
                                tempp.push(datah) 
                                break;
                                case 9 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c135
                                }
                                tempp.push(datah) 
                                break;
                                 case 10 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c165
                                }
                                tempp.push(datah) 
                                break;
                                case 11 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c180
                                }
                                tempp.push(datah)  
                                break;
                                case 12 :
                                var datah = {
                                namaExternal : $scope.subdatamaster.loadData[2].detail[p].c195
                                }
                                tempp.push(datah) 
                                break;
                            }
                        }

                 }
                }
               $scope.dataModelGrid = tempp;

               var tempp2 = [];
               // $scope.noRecGrid2 = $scope.subdatamaster.loadData[2].detail[0].noRec;
                for(var i = 0; i<$scope.PemantauanAnestesiData.length; i++){
                    for (var p = 0; p<$scope.subdatamaster.loadData[2].detail.length; p++){
                        if($scope.subdatamaster.loadData[2].detail[p].id == 337){
                            $scope.noRecGrid2 = $scope.subdatamaster.loadData[2].detail[p].noRec;
                 switch(i){
                    case 0 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c15
                    }
                    tempp2.push(datah)
                    break;
                    case 1 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c30
                    }
                    tempp2.push(datah)
                    break;
                    case 2 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c35
                    }
                    tempp2.push(datah) 
                    break;
                    case 3 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c45
                    }
                    tempp2.push(datah) 
                    break;
                    case 4 :
                     var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c60
                    }
                    tempp2.push(datah)  
                    break;
                    case 5 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c75
                    }
                    tempp2.push(datah)
                    break;
                    case 6 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c90
                    }
                    tempp2.push(datah) 
                    break;
                    case 7 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c105
                    }
                    tempp2.push(datah) 
                    break;
                    case 8 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c120
                    }
                    tempp2.push(datah) 
                    break;
                    case 9 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c135
                    }
                    tempp2.push(datah) 
                    break;
                     case 10 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c165
                    }
                    tempp2.push(datah) 
                    break;
                    case 11 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c180
                    }
                    tempp2.push(datah)  
                    break;
                    case 12 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c195
                    }
                    tempp2.push(datah) 
                    break;
                   }
                  }
                 }
               }
              $scope.dataModelGrid2 = tempp2;

          var tempp3 = [];
            for(var i = 0; i<$scope.PemantauanAnestesiData.length; i++){
               for (var p = 0; p<$scope.subdatamaster.loadData[2].detail.length; p++){
                 if($scope.subdatamaster.loadData[2].detail[p].id == 309){
                    $scope.noRecGrid3 = $scope.subdatamaster.loadData[2].detail[p].noRec;
                   switch(i){
                    case 0 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c15
                    }
                    tempp3.push(datah)
                    break;
                    case 1 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c30
                    }
                    tempp3.push(datah)
                    break;
                    case 2 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c35
                    }
                    tempp3.push(datah) 
                    break;
                    case 3 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c45
                    }
                    tempp3.push(datah) 
                    break;
                    case 4 :
                     var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c60
                    }
                    tempp3.push(datah)  
                    break;
                    case 5 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c75
                    }
                    tempp3.push(datah)
                    break;
                    case 6 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c90
                    }
                    tempp3.push(datah) 
                    break;
                    case 7 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c105
                    }
                    tempp3.push(datah) 
                    break;
                    case 8 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c120
                    }
                    tempp3.push(datah) 
                    break;
                    case 9 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c135
                    }
                    tempp3.push(datah) 
                    break;
                     case 10 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c165
                    }
                    tempp3.push(datah) 
                    break;
                    case 11 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c180
                    }
                    tempp3.push(datah)  
                    break;
                    case 12 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c195
                    }
                    tempp3.push(datah) 
                    break;
                 }
                }
               }
             }
                $scope.dataModelGrid3 = tempp3;


               var tempp4 = [];
            
                for(var i = 0; i<$scope.PemantauanAnestesiData.length; i++){
                  for(var p = 0; p<$scope.subdatamaster.loadData[2].detail.length; p++){
                   if($scope.subdatamaster.loadData[2].detail[p].id == 295){
                    $scope.noRecGrid4 = $scope.subdatamaster.loadData[2].detail[p].noRec;
                   switch(i){
                    case 0 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c15
                    }
                    tempp4.push(datah)
                    break;
                    case 1 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c30
                    }
                    tempp4.push(datah)
                    break;
                    case 2 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c35
                    }
                    tempp4.push(datah) 
                    break;
                    case 3 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c45
                    }
                    tempp4.push(datah) 
                    break;
                    case 4 :
                     var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c60
                    }
                    tempp4.push(datah)  
                    break;
                    case 5 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c75
                    }
                    tempp4.push(datah)
                    break;
                    case 6 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c90
                    }
                    tempp4.push(datah) 
                    break;
                    case 7 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c105
                    }
                    tempp4.push(datah) 
                    break;
                    case 8 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c120
                    }
                    tempp4.push(datah) 
                    break;
                    case 9 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c135
                    }
                    tempp4.push(datah) 
                    break;
                     case 10 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c165
                    }
                    tempp4.push(datah) 
                    break;
                    case 11 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c180
                    }
                    tempp4.push(datah)  
                    break;
                    case 12 :
                    var datah = {
                    namaExternal : $scope.subdatamaster.loadData[2].detail[p].c195
                    }
                    tempp4.push(datah) 
                    break;
                   }
                  }
                 }
                }
                $scope.dataModelGrid4 = tempp4;

                debugger
                //$scope.item.tgl = new moment($scope.subdatamaster.tglLahir).format('DD-MM-YYYY HH:mm:ss');
                //new moment($scope.subdatamaster.tglTindakan).format('DD-MM-YYYY HH:mm');
                $scope.item.tgl = new moment ($scope.subdatamaster.tglLahir).format("YYYY-MM-DD");
                $scope.item.tglTindakan = new moment ($scope.subdatamaster.tglTindakan).format("YYYY-MM-DD");
                $scope.item.prosedurOperasi = $scope.subdatamaster.prosedurOperasi;                                                                       
                $scope.NoTrans = $scope.subdatamaster.noTrans;
                $scope.NoRec = $scope.subdatamaster.noRec;
                $scope.item.teknikAnestesia = $scope.subdatamaster.teknikAnestesi;                                                                                                                              
                $scope.item.diagnosisPascaBedah = $scope.subdatamaster.diagnosaPostOperasi;
                $scope.item.diagnosisiPraBedah = $scope.subdatamaster.diagnosaPreOperasi;

                for(var i=0; i<$scope.subdatamaster.loadData[0].detail.length; i++){
                    switch($scope.subdatamaster.loadData[0].detail[i].id){
                        case 276 :
                            $scope.item.bb = $scope.subdatamaster.loadData[0].detail[i].keterangan;
                            $scope.Norecx1 = $scope.subdatamaster.loadData[0].detail[i].noRec;
                        break;
                         case 277 :
                            $scope.item.td = $scope.subdatamaster.loadData[0].detail[i].keterangan
                            $scope.Norecx2 = $scope.subdatamaster.loadData[0].detail[i].noRec; 
                         break;
                         case 278 :
                            $scope.item.tb = $scope.subdatamaster.loadData[0].detail[i].keterangan ;
                            $scope.Norecx3 = $scope.subdatamaster.loadData[0].detail[i].noRec;
                         break;
                        case 279 :
                            $scope.item.nadi = $scope.subdatamaster.loadData[0].detail[i].keterangan;
                            $scope.Norecx4 = $scope.subdatamaster.loadData[0].detail[i].noRec;
                         break;
                         case 280 :
                            $scope.item.golDarah = $scope.subdatamaster.loadData[0].detail[i].keterangan;
                            $scope.Norecx5 = $scope.subdatamaster.loadData[0].detail[i].noRec; 
                         break;
                         case 281 :
                            $scope.item.suhu = $scope.subdatamaster.loadData[0].detail[i].keterangan;
                            $scope.Norecx6 = $scope.subdatamaster.loadData[0].detail[i].noRec;
                         break;
                         case 282 :
                            $scope.item.rh = $scope.subdatamaster.loadData[0].detail[i].keterangan;
                            $scope.Norecx7 = $scope.subdatamaster.loadData[0].detail[i].noRec; 
                         break;
                          case 283 :
                            $scope.item.hb = $scope.subdatamaster.loadData[0].detail[i].keterangan ;
                            $scope.Norecx8 = $scope.subdatamaster.loadData[0].detail[i].noRec;
                         break;
                          case 284 :
                            $scope.item.ht = $scope.subdatamaster.loadData[0].detail[i].keterangan;
                            $scope.Norecx9 = $scope.subdatamaster.loadData[0].detail[i].noRec;
                         break;
                          case 285 :
                            $scope.item.alergi = $scope.subdatamaster.loadData[0].detail[i].keterangan;
                            $scope.Norecx10 = $scope.subdatamaster.loadData[0].detail[i].noRec; 
                         break;
                      }
                }
                });
               }
              }

            $scope.columnPemantauan = [
            {
                "field": "noTrans",
                "title": "No Transaksi"
            }
            ];


            $scope.now = new Date();
            $scope.item = {};
            $scope.tempItem = {};
            $state.params.noRec;
  




          $scope.listPemeriksaanFisik=[
                {id:287, name:"Normal", namaExternal:"Normal"},
                {id:287, name:"Abnormal", namaExternal:"Abnormal"}
            ];

                $scope.listRadioo=[
                    {id:1, name:"Jalan Nafas"}
                ];
                var temp = [];
                for (var key in $scope.listRadioo) {
                
                    if ($scope.listRadioo.hasOwnProperty(key)) {
                        var element = $scope.listRadioo[key];
                        if (element !== true) {
                            element.value = $scope.listPemeriksaanFisik[0];
                            temp.push(element);
                        }
                    }
                 }
                 $scope.listradiologi = temp;





                $scope.listAdrenaline=[
                {id:1, name:"Ya", namaExternal:"Ya"},
                {id:2, name:"Tidak", namaExternal:"Tidak"}
            ];

                $scope.listPemantau=[
                    {id:1, name:"Menggunakan Adrenalin"}
                ];
                var temporar = [];
                for (var key in $scope.listPemantau) {
                    if ($scope.listPemantau.hasOwnProperty(key)) {
                        var element = $scope.listPemantau[key];
                        if (element !== true) {
                            element.value = $scope.listAdrenaline[0];
                            temporar.push(element);
                        }
                    }
                 }
                $scope.listPemantauan = temporar;
               


             $scope.listPengencer=[
                {id:1, name:"Tidak ", namaExternal:"Tidak "},
                {id:2, name:"Ya ", namaExternal:"Ya "}
            ];

             $scope.dataPengencer=[
                    {id:1, name:"Di encerkan"}
                ];
                var temppengencer = [];
                for (var key in $scope.dataPengencer) {
                    if ($scope.dataPengencer.hasOwnProperty(key)) {
                        var element = $scope.dataPengencer[key];
                        if (element !== true) {
                            element.value = $scope.listPengencer[0];
                            $scope.item.obatPengencerDarah=1;
                            temppengencer.push(element);
                        }
                    }
                 }
                 $scope.listPengencerx = temppengencer;

                $scope.loadx = function(){
                manage
                }

                $scope.klikPengencer = function(data){
                 debugger
                 if(data.value.id == 2){
                 $scope.item.obatPengencerDarah = 2
                 }else{
                 $scope.item.obatPengencerDarah = 1
                 $scope.item.JenisPengencer = ""
                 }
                }
        
    
            $scope.listDatax = [{
                "data": {
                    "loadData": [
                        {
                            "header": "Pemantauan Anestsi Lokal",
                            "detail": [
                                {
                                    "namaExternal": "Keadaan Bedah",
                                    "id": 275,
                                    "detail": [
                                        {
                                            "namaExternal": "BB",
                                            "id": 276,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "TD",
                                            "id": 277,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "TB",
                                            "id": 278,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Nadi",
                                            "id": 279,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Gol darah",
                                            "id": 280,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Suhu",
                                            "id": 281,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Rh",
                                            "id": 282,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Hb",
                                            "id": 283,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Ht",
                                            "id": 284,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Alergi",
                                            "id": 285,
                                            "detail": []
                                        }
                                    ]
                                },
                                {
                                    "namaExternal": "Pemeriksaan Fisik",
                                    "id": 286,
                                    "detail": [
                                        {
                                            "namaExternal": "Jalan Nafas",
                                            "id": 287,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Obat lokal anestesi yang digunakan",
                                            "id": 288,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Diencerkan",
                                            "id": 289,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Dosis/jumlah obat yang digunakan",
                                            "id": 290,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Jam pemberian",
                                            "id": 291,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Menggunakan Adrenalin",
                                            "id": 292,
                                            "detail": []
                                        },
                                        {
                                            "namaExternal": "Tanda-Tanda Vital",
                                            "id": 294,
                                            "detail": [
                                                {
                                                    "namaExternal": "Suhu",
                                                    "id": 323,
                                                    "detail": [
                                                        {
                                                            "namaExternal": "15 menit",
                                                            "id": 324
                                                        },
                                                        {
                                                            "namaExternal": "30 menit",
                                                            "id": 325
                                                        },
                                                        {
                                                            "namaExternal": "35 menit",
                                                            "id": 326
                                                        },
                                                        {
                                                            "namaExternal": "45 menit",
                                                            "id": 327
                                                        },
                                                        {
                                                            "namaExternal": "60 menit",
                                                            "id": 328
                                                        },
                                                        {
                                                            "namaExternal": "75 menit",
                                                            "id": 329
                                                        },
                                                        {
                                                            "namaExternal": "90 menit",
                                                            "id": 330
                                                        },
                                                        {
                                                            "namaExternal": "105 menit",
                                                            "id": 331
                                                        },
                                                        {
                                                            "namaExternal": "120 menit",
                                                            "id": 332
                                                        },
                                                        {
                                                            "namaExternal": "135 menit",
                                                            "id": 333
                                                        },
                                                        {
                                                            "namaExternal": "165 menit",
                                                            "id": 334
                                                        },
                                                        {
                                                            "namaExternal": "180 menit",
                                                            "id": 335
                                                        },
                                                        {
                                                            "namaExternal": "195 menit",
                                                            "id": 336
                                                        }
                                                    ]
                                                },
                                                {
                                                    "namaExternal": "Pernafasan (X/mnt)",
                                                    "id": 337,
                                                    "detail": [
                                                        {
                                                            "namaExternal": "15 menit",
                                                            "id": 338
                                                        },
                                                        {
                                                            "namaExternal": "30 menit",
                                                            "id": 339
                                                        },
                                                        {
                                                            "namaExternal": "35 menit",
                                                            "id": 340
                                                        },
                                                        {
                                                            "namaExternal": "45 menit",
                                                            "id": 341
                                                        },
                                                        {
                                                            "namaExternal": "75 menit",
                                                            "id": 343
                                                        },
                                                        {
                                                            "namaExternal": "60 menit",
                                                            "id": 342
                                                        },
                                                        {
                                                            "namaExternal": "90 menit",
                                                            "id": 344
                                                        },
                                                        {
                                                            "namaExternal": "105 menit",
                                                            "id": 345
                                                        },
                                                        {
                                                            "namaExternal": "120 menit",
                                                            "id": 346
                                                        },
                                                        {
                                                            "namaExternal": "135 menit",
                                                            "id": 347
                                                        },
                                                        {
                                                            "namaExternal": "165 menit",
                                                            "id": 348
                                                        },
                                                        {
                                                            "namaExternal": "180 menit",
                                                            "id": 349
                                                        },
                                                        {
                                                            "namaExternal": "195 menit",
                                                            "id": 350
                                                        }
                                                    ]
                                                },
                                                {
                                                    "namaExternal": "Nadi (X/mnt)",
                                                    "id": 309,
                                                    "detail": [
                                                        {
                                                            "namaExternal": "105 menit",
                                                            "id": 317
                                                        },
                                                        {
                                                            "namaExternal": "120 menit",
                                                            "id": 318
                                                        },
                                                        {
                                                            "namaExternal": "135 menit",
                                                            "id": 319
                                                        },
                                                        {
                                                            "namaExternal": "165 menit",
                                                            "id": 320
                                                        },
                                                        {
                                                            "namaExternal": "180 menit",
                                                            "id": 321
                                                        },
                                                        {
                                                            "namaExternal": "195 menit",
                                                            "id": 322
                                                        },
                                                        {
                                                            "namaExternal": "15 menit",
                                                            "id": 310
                                                        },
                                                        {
                                                            "namaExternal": "30 menit",
                                                            "id": 311
                                                        },
                                                        {
                                                            "namaExternal": "35 menit",
                                                            "id": 312
                                                        },
                                                        {
                                                            "namaExternal": "45 menit",
                                                            "id": 313
                                                        },
                                                        {
                                                            "namaExternal": "60 menit",
                                                            "id": 314
                                                        },
                                                        {
                                                            "namaExternal": "75 menit",
                                                            "id": 315
                                                        },
                                                        {
                                                            "namaExternal": "90 menit",
                                                            "id": 316
                                                        }
                                                    ]
                                                },
                                                {
                                                    "namaExternal": "Tekanan Darah",
                                                    "id": 295,
                                                    "detail": [
                                                        {
                                                            "namaExternal": "30 menit",
                                                            "id": 297
                                                        },
                                                        {
                                                            "namaExternal": "15 menit",
                                                            "id": 296
                                                        },
                                                        {
                                                            "namaExternal": "35 menit",
                                                            "id": 298
                                                        },
                                                        {
                                                            "namaExternal": "45 menit",
                                                            "id": 299
                                                        },
                                                        {
                                                            "namaExternal": "90 menit",
                                                            "id": 302
                                                        },
                                                        {
                                                            "namaExternal": "75 menit",
                                                            "id": 301
                                                        },
                                                        {
                                                            "namaExternal": "60 menit",
                                                            "id": 300
                                                        },
                                                        {
                                                            "namaExternal": "105 menit",
                                                            "id": 303
                                                        },
                                                        {
                                                            "namaExternal": "120 menit",
                                                            "id": 304
                                                        },
                                                        {
                                                            "namaExternal": "135 menit",
                                                            "id": 305
                                                        },
                                                        {
                                                            "namaExternal": "165 menit",
                                                            "id": 306
                                                        },
                                                        {
                                                            "namaExternal": "180 menit",
                                                            "id": 307
                                                        },
                                                        {
                                                            "namaExternal": "195 menit",
                                                            "id": 308
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "namaExternal": "Dosis",
                                            "id": 293,
                                            "detail": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "messages": {
                    "label-success": "SUKSES"
                }
            }
            ];

        $scope.dataModelGrid = {};
        $scope.BuatGrid2 = function () {
        debugger
        $scope.datasouce = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail;
        var datas = [];
        for(var y = 0; y<1; y++){
        var Temps = {
                      "TandatandaVital":$scope.datasouce[y].namaExternal,
                      "child":$scope.datasouce[y].detail,
                    }
        datas.push(Temps);
        $scope.datax = datas;
        if($scope.datax!=undefined){
        if($scope.datax[$scope.datax.length-1].TandatandaVital =="Suhu"){
        $scope.PemantauanAnestesiData = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail[0].detail;
        var list = [];
        for (var i = 0; i < $scope.PemantauanAnestesiData.length; i++) {
        var data = {
        title: ($scope.PemantauanAnestesiData[i].namaExternal),
        template: "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid["+[i]+"].namaExternal'/>",
        format: "{0:n1}",
        width: "50px"
        };

         list.push(data);
        }
        $scope.list = list;
        }
        }
        $scope.sourceOrder = new kendo.data.DataSource({
            data: $scope.datax,
        });

        $scope.mainGridOption = [
            {
                field: "TandatandaVital", title: "Tanda-tanda Vital", width: "100px"
            },
            { 
                title: "<center>Waktu Pemantauan Setelah Pemberian lokal anestesi (Setiap 15 Menit)</center> ",
                columns: $scope.list,
            }
        ];
            var grid = $("#gridOrder").data("kendoGrid");
            if (grid != undefined) {
                grid.destroy();
                $("#gridOrder").empty().kendoGrid({
                    dataSource: $scope.sourceOrder,
                    columns: $scope.mainGridOption
                });
            }
          }
           $scope.isLoadingData = false;
          }
 
        $scope.dataModelGrid2 = {};
        $scope.BuatGrid3 = function () {
  
        $scope.datasouce = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail;
        var datas = [];
        for(var y = 1; y<2; y++){
        debugger;
            var Temps = {
                          "TandatandaVital":$scope.datasouce[y].namaExternal,
                          "child":$scope.datasouce[y].detail,
                        }
        datas.push(Temps);
        //$scope.BuatGrid();
        $scope.datax = datas;
        if($scope.datax!=undefined){
        if ($scope.datax[$scope.datax.length-1].TandatandaVital =="Pernafasan (X/mnt)"){
        $scope.PemantauanAnestesiData = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail[1].detail;
        var list = [];
        for (var i = 0; i < $scope.PemantauanAnestesiData.length; i++) {
        var data = {
        title: ($scope.PemantauanAnestesiData[i].namaExternal),
        template: "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid2["+[i]+"].namaExternal'/>",
        format: "{0:n1}",
        width: "50px"
        };
        list.push(data);
        }
        $scope.list = list;
        }
        }

        $scope.sourceOrder2 = new kendo.data.DataSource({
            data: $scope.datax,
        });
        $scope.mainGridOption2 = [
            {
                field: "TandatandaVital", 
                title: "Tanda-tanda Vital", width: "100px"
            },
            { 
                columns: $scope.list,
            }
        ];
     
        // $scope.totalKuantitas = dat.data.data.totalKuantitas;
        var grid = $("#gridOrder2").data("kendoGrid");
        if (grid != undefined) {
            grid.destroy();
            $("#gridOrder2").empty().kendoGrid({
                dataSource: $scope.sourceOrder2,
                columns: $scope.mainGridOption2
            });
        }
      }
    $scope.isLoadingData = false;
}
       $scope.dataModelGrid3 = {};
       $scope.BuatGrid4 = function () {
        $scope.datasouce = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail;
        var datas = [];
        for(var y = 2; y<3; y++){
        debugger;
            var Temps = {
                          "TandatandaVital":$scope.datasouce[y].namaExternal,
                          "child":$scope.datasouce[y].detail,
                        }
        datas.push(Temps);
        //$scope.BuatGrid();
        $scope.datax = datas;
        if($scope.datax!=undefined){
        if ($scope.datax[$scope.datax.length-1].TandatandaVital =="Nadi (X/mnt)"){
        $scope.PemantauanAnestesiData = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail[2].detail;
        var list = [];
        for (var i = 0; i < $scope.PemantauanAnestesiData.length; i++) {
        var data = {
        title: ($scope.PemantauanAnestesiData[i].namaExternal),
        template: "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid3["+[i]+"].namaExternal'/>",
        format: "{0:n1}",
        width: "50px"
        };
        list.push(data);
        }
        $scope.list = list;
        }
        }

        $scope.sourceOrder3 = new kendo.data.DataSource({
            data: $scope.datax,
        });
        $scope.mainGridOption3 = [
            {
                field: "TandatandaVital", title: "Tanda-tanda Vital", width: "100px"
            },
            { 
                columns: $scope.list,
            }
        ];
     
        var grid = $("#gridOrder3").data("kendoGrid");
        if (grid != undefined) {
            grid.destroy();
            $("#gridOrder3").empty().kendoGrid({
                dataSource: $scope.sourceOrder3,
                columns: $scope.mainGridOption3
            });
        }
      }
    // });
    $scope.isLoadingData = false;
    }

    $scope.Back = function(){
    debugger
    $state.go('RevDaftarPasienRuanganBedah')
     }
             

       $scope.dataModelGrid4 = {};
       $scope.BuatGrid5 = function () {
        $scope.datasouce = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail;
        var datas = [];
        for(var y = 3; y<4; y++){
            var Temps = {
                          "TandatandaVital":$scope.datasouce[y].namaExternal,
                          "child":$scope.datasouce[y].detail,
                        }
        datas.push(Temps);
        //$scope.BuatGrid();
        $scope.datax = datas;
        if($scope.datax!=undefined){
        if ($scope.datax[$scope.datax.length-1].TandatandaVital =="Tekanan Darah"){
        $scope.PemantauanAnestesiData = $scope.listDatax[0].data.loadData[0].detail[1].detail[6].detail[3].detail;
        var list = [];
        for (var i = 0; i < $scope.PemantauanAnestesiData.length; i++) {
        var data = {
        title: ($scope.PemantauanAnestesiData[i].namaExternal),
        template: "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid4["+[i]+"].namaExternal'/>",
        format: "{0:n1}",
        width: "50px"
        };
        list.push(data);
        }
        $scope.list = list;
        }
        }
        $scope.sourceOrder4 = new kendo.data.DataSource({
            data: $scope.datax,
        });
        $scope.mainGridOption4 = [
            {
                field: "TandatandaVital", title: "Tanda-tanda Vital", width: "100px"
            },
            { 
                columns: $scope.list,
            }
        ];
        var grid = $("#gridOrder4").data("kendoGrid");
        if (grid != undefined) {
            grid.destroy();
            $("#gridOrder4").empty().kendoGrid({
                dataSource: $scope.sourceOrder4,
                columns: $scope.mainGridOption4
            });
        }
      }
    $scope.isLoadingData = false;
}


            $scope.BuatGrid2();
            $scope.BuatGrid3();
            $scope.BuatGrid4();
            $scope.BuatGrid5();
            $scope.dataPasien=function(){
                debugger;
            var now = new Date();
            var tglLahir = moment($scope.item.pasien.tglLahir).format('YYYY-MM-DD');
            var umur=dateHelper.CountAge(tglLahir, now);
            $scope.item.umur = umur.year+' thn, '+ umur.month + " bln, " + umur.day+ " hr";
            $scope.item.jenisKelamin="Laki-laki";
            }
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
            $scope.listStatusYaTidak = data;
            });
          

            $scope.klik=function(){
            debugger
            if($scope.item.obatPengencerDarah===1){
                $scope.item.dObatPengencerDarah="";
                $scope.item.fObatPengencerDarah=""
            }
            }
     

            $scope.cetak = function() {
            debugger;
                    var urlLaporan = CetakBedah.open("");
                    window.open(urlLaporan, '_blank');
                };
             
            $state.params.noRec;



            $scope.Save=function(){
            debugger;
            var dataTemp = [];
            var TemporaryGrid = [];
            var grid = $('#gridOrder').data("kendoGrid");
            var grid2 = $('#gridOrder2').data("kendoGrid");
            var grid3 = $('#gridOrder3').data("kendoGrid");
            var grid4 = $('#gridOrder4').data("kendoGrid");

            for(var i=0; i<grid._data[0].child.length; i++){
             debugger
            if($scope.dataModelGrid[i] != undefined){
                if($scope.dataModelGrid[i].namaExternal != undefined){
                switch(grid._data[0].child[i].id){
                    case 324 :
                    $scope.Temp0 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 325 :
                    $scope.Temp1 = $scope.dataModelGrid[i].namaExternal;
                    break; 
                    case 326 :
                    $scope.Temp2 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 327 :
                    $scope.Temp3 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 328 :
                    $scope.Temp4 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 329 :
                    $scope.Temp5 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 330 :
                    $scope.Temp6 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 331 :
                    $scope.Temp7 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 332 :
                    $scope.Temp8 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 333 :
                    $scope.Temp9 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 334 :
                    $scope.Temp10 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 335 :
                    $scope.Temp11 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    case 336 :
                    $scope.Temp12 = $scope.dataModelGrid[i].namaExternal;
                    break;
                    }
                  }
                 }
                }

             for(var i=0; i<grid._data[0].child.length; i++){
              if($scope.dataModelGrid2[i] != undefined){
                if($scope.dataModelGrid2[i].namaExternal != undefined){
                switch(grid2._data[0].child[i].id){
                    case 338 :
                    $scope.Temps0 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 339 :
                    $scope.Temps1 = $scope.dataModelGrid2[i].namaExternal;
                    break; 
                    case 340 :
                    $scope.Temps2 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 341 :
                    $scope.Temps3 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 342 :
                    $scope.Temps4 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 343 :
                    $scope.Temps5 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 344 :
                    $scope.Temps6 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 345 :
                    $scope.Temps7 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 346 :
                    $scope.Temps8 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 347 :
                    $scope.Temps9 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 348 :
                    $scope.Temps10 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 349 :
                    $scope.Temps11 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    case 350 :
                    $scope.Temps12 = $scope.dataModelGrid2[i].namaExternal;
                    break;
                    }
                  }
                 }
                }

            for(var i=0; i<grid3._data[0].child.length; i++){
             if($scope.dataModelGrid3[i] != undefined){
               if($scope.dataModelGrid3[i].namaExternal != undefined){
                switch(grid3._data[0].child[i].id){
                    case 317 :
                    $scope.Demps0 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 318 :
                    $scope.Demps1 = $scope.dataModelGrid3[i].namaExternal;
                    break; 
                    case 319 :
                    $scope.Demps2 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 320 :
                    $scope.Demps3 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 321 :
                    $scope.Demps4 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 322 :
                    $scope.Demps5 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 310 :
                    $scope.Demps6 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 311 :
                    $scope.Demps7 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 312 :
                    $scope.Demps8 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 313 :
                    $scope.Demps9 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 314 :
                    $scope.Demps10 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 315 :
                    $scope.Demps11 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    case 316 :
                    $scope.Demps12 = $scope.dataModelGrid3[i].namaExternal;
                    break;
                    }
                  }
                 }
                }


            for(var i=0; i<grid4._data[0].child.length; i++){
             if($scope.dataModelGrid4[i] != undefined){
              if($scope.dataModelGrid4[i].namaExternal != undefined){
                switch(grid4._data[0].child[i].id){
                    case 297 :
                    $scope.ready0 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 296 :
                    $scope.ready1 = $scope.dataModelGrid4[i].namaExternal;
                    break; 
                    case 298 :
                    $scope.ready2 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 299 :
                    $scope.ready3 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 302 :
                    $scope.ready4 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 301:
                    $scope.ready5 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 300 :
                    $scope.ready6 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 303 :
                    $scope.ready7 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 304 :
                    $scope.ready8 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 305 :
                    $scope.ready9 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 306 :
                    $scope.ready10 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 307 :
                    $scope.ready11 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    case 308 :
                    $scope.ready12 = $scope.dataModelGrid4[i].namaExternal;
                    break;
                    }
                  }
               }
             }

            var dat = {
                            "objekDataMasalah":{
                                "id": 287
                            },
                            "keterangan": $scope.listradiologi[0].value.name,
                            "statusEnabled" : "true",
                            "noRec" : $scope.NoRec3,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                      }
            dataTemp.push(dat)
            var dat = {
                            "objekDataMasalah":{
                                "id":288
                            },
                            "keterangan": $scope.item.ObatDigunakan,
                             "statusEnabled" : "true",
                             "noRec" : $scope.NoRec4,
                             "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
            dataTemp.push(dat)
            var dat = {
                            "objekDataMasalah":{
                                "id": 289
                            },
                            "keterangan": $scope.item.obatPengencerDarah,
                            //"KetTambahan" : $scope.listPengencerx[0].value.name,
                             "statusEnabled" : "true",
                             "noRec" : $scope.NoRec5,
                             "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
            dataTemp.push(dat)
              var dat = {
                            "objekDataMasalah":{
                                "id":290
                         },
                            "keterangan": $scope.item.DosisDigunakan,
                             "statusEnabled" : "true",
                             "noRec" : $scope.NoRec1,
                             "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
            dataTemp.push(dat)
              var dat = {
                            "objekDataMasalah":{
                                "id": 294
                            },
                            "keterangan": $scope.item.LokasiPemberian,
                             "statusEnabled" : "true",
                             "noRec" : $scope.NoRec2,
                             "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
             dataTemp.push(dat)
             var dat = {
                        "objekDataMasalah":{
                            "id":291
                        },
                        "keterangan": $scope.item.jamPemberian,
                         "statusEnabled" : "true",
                         "noRec" : $scope.NoRec6,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)
            
            var dat = {
                        "objekDataMasalah":{
                            "id":292
                       },
                        "keterangan":$scope.listPemantauan[0].value.name,
                         "statusEnabled" : "true",
                         "noRec" : $scope.NoRec8,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi

                       }
             dataTemp.push(dat)

             var dat = {
                        "objekDataMasalah":{
                            "id":357
                       },
                        "keterangan": $scope.item.JenisPengencer,
                        "statusEnabled" : "true",
                        "noRec" : $scope.NoRec9,
                        "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
             dataTemp.push(dat)
            
            var dat = {
                        "objekDataMasalah":{
                            "id":293
                       },
                        "keterangan": $scope.item.Dosis,
                         "statusEnabled" : "true",
                         "noRec" : $scope.NoRec7,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)
      

            var dat = {
                        "objekDataMasalah":{
                            "id":276
                       },
                        "keterangan": $scope.item.bb,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx1,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)
            var dat = {
                        "objekDataMasalah":{
                            "id":277
                       },
                        "keterangan": $scope.item.td,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx2,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)
            var dat = {
                        "objekDataMasalah":{
                            "id":278
                       },
                        "keterangan": $scope.item.tb,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx3,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)
            var dat = {
                        "objekDataMasalah":{
                            "id":279
                       },
                        "keterangan": $scope.item.nadi,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx4,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)
            var dat = {
                        "objekDataMasalah":{
                            "id":280
                       },
                        "keterangan": $scope.item.golDarah,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx5,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)

            var dat = {
                        "objekDataMasalah":{
                            "id":281
                       },
                        "keterangan": $scope.item.suhu,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx6,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)
            var dat = {
                        "objekDataMasalah":{
                            "id":282
                       },
                        "keterangan": $scope.item.rh,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx7,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)

            var dat = {
                        "objekDataMasalah":{
                            "id":283
                       },
                        "keterangan": $scope.item.hb,
                         "statusEnabled" : "true",
                          "noRec" : $scope.Norecx8,
                          "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)

            var dat = {
                        "objekDataMasalah":{
                            "id":284
                       },
                        "keterangan": $scope.item.ht,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx9,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)

            var dat = {
                        "objekDataMasalah":{
                            "id":285
                       },
                        "keterangan": $scope.item.alergi,
                         "statusEnabled" : "true",
                         "noRec" : $scope.Norecx10,
                         "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                       }
            dataTemp.push(dat)


            var data = {
                            "pasienDaftar" : {"noRec" : $state.params.noRec},
                            "noRec" : $scope.NoRecParents,
                            //"noTrans" : $scope.noTrans,
                            "diagnosaPreOperasi" : $scope.item.diagnosisiPraBedah,
                            "diagnosaPostOperasi" : $scope.item.diagnosisPascaBedah,
                            "statusEnabled" : "true",
                            "tanggal" : $scope.item.tgl,
                            "tglTindakan" : $scope.item.tglTindakan,
                            "asuhanTrans" : dataTemp,
                            "tindakan" : "Tidak Ada Tindakan",
                            "noTrans" : $scope.Keytransaksi,
                            "prosedurOperasi" : $scope.item.prosedurOperasi,
                            "teknikAnestesi" : $scope.item.teknikAnestesia,
                            "tandaVitalDetail" : [
                            {
                                "tandaVital" : {"id" : 323},
                                "statusEnabled" : "true",
                                "anestesiLokalId" : $scope.Keytransaksi,
                                "noRec" : $scope.noRecGrid,
                                "c15" : $scope.Temp0,
                                "c30" : $scope.Temp1,
                                "c35" : $scope.Temp2,
                                "c45" : $scope.Temp3,
                                "c60" : $scope.Temp4,
                                "c75" : $scope.Temp5,
                                "c90" : $scope.Temp6,
                                "c105" : $scope.Temp7,
                                "c120" : $scope.Temp8,
                                "c135" : $scope.Temp9,
                                "c165" : $scope.Temp10,
                                "c180" : $scope.Temp11,
                                "c195" : $scope.Temp12
                            },
                            {
                                "tandaVital" : {"id" : 337},
                                "statusEnabled" : "true",
                                "anestesiLokalId" : $scope.Keytransaksi,
                                "noRec" : $scope.noRecGrid2,
                                "c15" : $scope.Temps0,
                                "c30" : $scope.Temps1,
                                "c35" : $scope.Temps2,
                                "c45" : $scope.Temps3,
                                "c60" : $scope.Temps4,
                                "c75" : $scope.Temps5,
                                "c90" : $scope.Temps6,
                                "c105" : $scope.Temps7,
                                "c120" : $scope.Temps8,
                                "c135" : $scope.Temps9,
                                "c165" : $scope.Temps10,
                                "c180" : $scope.Temps11,
                                "c195" : $scope.Temps12
                            }, 
                            {
                                "tandaVital" : {"id" : 309},
                                "statusEnabled" : "true",
                                "anestesiLokalId" : $scope.Keytransaksi,
                                "noRec" : $scope.noRecGrid3,
                                "c15" : $scope.Demps0,
                                "c30" : $scope.Demps1,
                                "c35" : $scope.Demps2,
                                "c45" : $scope.Demps3,
                                "c60" : $scope.Demps4,
                                "c75" : $scope.Demps5,
                                "c90" : $scope.Demps6,
                                "c105" : $scope.Demps7,
                                "c120" : $scope.Demps8,
                                "c135" : $scope.Demps9,
                                "c165" : $scope.Demps10,
                                "c180" : $scope.Demps11,
                                "c195" : $scope.Demps12
                            
                            },
                            {
                                "tandaVital" : {"id" : 295},
                                "statusEnabled" : "true",
                                "anestesiLokalId" : $scope.Keytransaksi,
                                "noRec" : $scope.noRecGrid4,
                                "c15" : $scope.ready0,
                                "c30" : $scope.ready1,
                                "c35" : $scope.ready2,
                                "c45" : $scope.ready3,
                                "c60" : $scope.ready4,
                                "c75" : $scope.ready5,
                                "c90" : $scope.ready6,
                                "c105" : $scope.ready7,
                                "c120" : $scope.ready8,
                                "c135" : $scope.ready9,
                                "c165" : $scope.ready10,
                                "c180" : $scope.ready11,
                                "c195" : $scope.ready12
                            
                            }
                            ]
                        }

          console.log(JSON.stringify(data));
          managePasien.SavePemantauaAnestesi(data).then(function(e){
          debugger  
          $scope.loadGrid();
            // savenya pake asuhan keperawatan
          })
         }
        }
    ]);
});