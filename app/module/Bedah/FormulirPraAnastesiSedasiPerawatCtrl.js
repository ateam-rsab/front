define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('FormulirPraAnastesiSedasiPerawatCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru','DateHelper','CetakBedah',
        function(findPasien, managePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru,DateHelper,CetakBedah) {
            $scope.isLoadingData = true;
            $scope.AllData = false;
            $scope.rawatInap=true;
            $scope.rawatJalan=true;
            $scope.rawatKhusus=true;
            $scope.item={};
            $scope.title="FORMULIR PRA - ANASTESI / SEDASI";
            $scope.now = new Date();
            $scope.title2="Data Pasien";
            $scope.isReport = true;
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {   
             $scope.item.pasien = data.data.pasien;
             $scope.isLoadingData = false;
             $scope.AllData = true;
             });

            $scope.listRegional=[
                {id:71, name:"Spinal", namaExternal:"Spinal"},
                {id:72, name:"Epidural", namaExternal:"Epidural"},
                {id:73, name:"Kaudal", namaExternal:"Kaudal"},
                {id:74, name:"Blok prifer", namaExternal:"Blok prifer"},
                {id:75, name:"Lain-lain Regional", namaExternal:"Lain-lain"}
            ];
            $scope.listTeknikKhusus=[
                {id:77, name:"Hipotensi", namaExternal:"Hipotensi"},
                {id:78, name:"Vertilasi satu paru", namaExternal:"Vertilasi satu paru"},
                {id:79, name:"TCL", namaExternal:"TCL"},
                {id:80, name:"Lain-lain Teknik Khusus", namaExternal:"Lain-lain"}
            ];
            $scope.listMonitoring=[
                {id:82, name:"EKG Lead", namaExternal:"EKG Lead"},
                {id:83, name:"SPO2", namaExternal:"SPO2"},
                {id:84, name:"NIBP", namaExternal:"NIBP"},
                {id:85, name:"Temp", namaExternal:"Temp"},
                {id:86, name:"Lain-lain Monitoring", namaExternal:"Lain-lain"},
                {id:87, name:"CVP", namaExternal:"CVP"},
                {id:88, name:"Arteri Line", namaExternal:"Arteri Line"},
                {id:89, name:"EtCo2", namaExternal:"EtCo2"},
                {id:90, name:"BIS", namaExternal:"BIS"}
            ];
            $scope.listAlatKhusus=[
                {id:92, name:"Bronchoscopy", namaExternal:"Bronchoscopy"},
                {id:93, name:"Glidescope", namaExternal:"Glidescope"},
                {id:94, name:"USG", namaExternal:"USG"},
                {id:95, name:"Lain-lain Alat Khusus", namaExternal:"Lain-lain"}
            ];
            $scope.listPerawatan=[
                {id:97, name:"Rawat Inap"},
                {id:98, name:"Rawat Jalan"},
                {id:99, name:"Rawat Khusus"}
            ];
            $scope.listRawatKhusus=[
                {id:100, name:"ICU"},
                {id:101, name:"HDU"},
                {id:102, name:"PICU"}
            ];

           findPasien.getDataPasienAnastesi().then(function(data){
            debugger
            $scope.listPasien = data.data.data.listData;
            $scope.noRegistrasi = data.data.data.listData;
            $scope.idPasien = data.data.data.listData;
            $scope.kelamin = data.data.data.listData;
            $scope.tglLahir = data.data.data.listData;
            $scope.namaAyah = data.data.data.listData;
            });

            $scope.loadGrid = function () {
            debugger
             findPasien.getLoadFormulirDokter($state.params.noRec).then(function(data) {
             debugger
              if(data.data.data != undefined){
              $scope.dataMaster = data.data.data.showData;
              $scope.dataSource = new kendo.data.DataSource({
              pageSize:50,
              data : $scope.dataMaster,
              $scrollable : true
               });
              }
              });
            }
            $scope.loadGrid();
            

            $scope.columnFormulirDokter = [
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
                $scope.listKajianSistem=[
                    {id:36, name:"Hilangnya gigi"},
                    {id:37, name:"Masalah Mobilitas Leher"},
                    {id:38, name:"Leher pendek"},
                    {id:39, name:"Batuk"},
                    {id:40, name:"Sesak napas"},
                    {id:41, name:"Baru saja menderita infeksi"},
                    {id:42, name:"Sakit dada"},
                    {id:43, name:"Denyut jantung tidak normal"},
                    {id:44, name:"Muntah"},
                    {id:45, name:"Pingsan"},
                    {id:46, name:"Kejang"},
                    {id:47, name:"Sedang hamil"},
                    {id:48, name:"kelainan tulang belakang"},
                    {id:49, name:"Stroke"},
                    {id:50, name:"Obesitas"}
                ];
                var temp = [];
                for (var key in $scope.listKajianSistem) {
                    if ($scope.listKajianSistem.hasOwnProperty(key)) {
                        var element = $scope.listKajianSistem[key];
                        if (element !== true) {
                            element.value = $scope.listStatusYaTidak[0];
                            temp.push(element);
                        }
                    }
                 }
                $scope.listkajian = temp;
             })


        $scope.click = function(dataSelected){
          $scope.item = {};
          $scope.isLoadingDetail = true;
          $scope.item.ModeEdit = true
          if (dataSelected != undefined){
              $scope.item.ModeEdit = true;
              $scope.item.idCheckin = dataSelected.noRec;
              findPasien.getLoadSubFormulirDokter($scope.item.idCheckin).then(function(data) {
              toastr.info("1 Dipilih");
              $scope.subdatamaster = data.data.data.showData;
              $scope.NorecForm = $scope.subdatamaster[1].PraAnestesiDokter[0].noRec
              var tree = $scope.subdatamaster[0].Detail;
                
            //Remove all checked true
                $scope.listRegional.forEach(function(a){
                a.isChecked = false     
                })
                $scope.listTeknikKhusus.forEach(function(b){
                b.isChecked = false     
                })
                $scope.listMonitoring.forEach(function(c){
                c.isChecked = false     
                })
                $scope.listAlatKhusus.forEach(function(d){
                d.isChecked = false     
                })
                $scope.listPerawatan.forEach(function(e){
                e.isChecked = false     
                })
                $scope.listRawatKhusus.forEach(function(f){
                f.isChecked = false     
                })
                
            //Temps from child Loop
                $scope.checkListRegional = [];
                $scope.checkListTeknisKhusus = [];
                $scope.checkListMonitoring = [];
                $scope.checkListAlatKhusus = [];
                $scope.checkListPerawatan = [];
                $scope.ListAlatKhusus = [];
             
             //Parent Loop Checkbox
              tree.forEach(function(data){
              $scope.listRegional.forEach(function(e){
              if (e.id == data.id){
                    e.isChecked = true
                    var dataid = {"id":data.id,
                                 "noRex":data.noRec,
                                 "status": data.statusEnabled}
                    $scope.checkListRegional.push(dataid)
                 }
               })
             $scope.listTeknikKhusus.forEach(function(i){
              if (i.id == data.id){
                    i.isChecked = true
                    var dataid = {"id":data.id,
                                 "noRex":data.noRec,
                                 "status": data.statusEnabled}
                    $scope.checkListTeknisKhusus.push(dataid)
                 }
               })
              $scope.listMonitoring.forEach(function(j){
              if (j.id == data.id){
                    j.isChecked = true
                    var dataid = {"id":data.id,
                                 "noRex":data.noRec,
                                 "status": data.statusEnabled}
                    $scope.checkListMonitoring.push(dataid)
                 }
               })
             $scope.listAlatKhusus.forEach(function(h){
              if (h.id == data.id){
                    h.isChecked = true
                    var dataid = {"id":data.id,
                                 "noRex":data.noRec,
                                 "status": data.statusEnabled}
                   $scope.checkListAlatKhusus.push(dataid)
                 }
               })
            $scope.listPerawatan.forEach(function(k){
              if (k.id == data.id){
                    if(data.id == 97){
                        $scope.item.rawatInap = {id : data.yesNo, name : data.keterangan}
                        $scope.rawatInap = false
                    }
                    if(data.id == 98){
                        $scope.item.rawatJalan = {id : data.YesNo, name : data.keterangan}
                        $scope.rawatJalan = false
                    }
                    k.isChecked = true
                    var dataid = {"id":data.id,
                                  "noRex":data.noRec,
                                  "status": data.statusEnabled,
                                  "yesNo" :data.yesNo,
                                  "keterangan":data.keterangan}
                    $scope.checkListPerawatan.push(dataid)
                 }
               })
            $scope.listRawatKhusus.forEach(function(l){
              if (l.id == data.id){
                    l.isChecked = true
                    var dataid = {"id":data.id,
                                 "noRex":data.noRec,
                                 "status": data.statusEnabled}
                    $scope.ListAlatKhusus.push(dataid)
                 }
               })
              })

            //Load Data
              for(var i = 0; i<tree.length; i++){
              switch(tree[i].id){
                    case 54 :
                      $scope.item.Mallampasti = tree[i].keterangan;
                      $scope.Norec1 = tree[i].noRec;
                     break;
                    case 55:
                      $scope.item.Jantung = tree[i].keterangan;
                      $scope.Norec2 = tree[i].noRec;
                     break;
                    case 56 :
                      $scope.item.Paruparu = tree[i].keterangan;
                      $scope.Norec3 = tree[i].noRec;
                     break; 
                    case 57 :
                      $scope.item.Abdomen = tree[i].keterangan;
                      $scope.Norec4 = tree[i].noRec;
                     break;
                    case 58 :
                      $scope.item.Extremitas = tree[i].keterangan;   
                      $scope.Norec5 = tree[i].noRec;
                     break;       
                    case 59 :
                      $scope.item.Neurologi = tree[i].keterangan;
                      $scope.Norec6 = tree[i].noRec; 
                     break;  
                    case 60 :  
                      $scope.item.Keterangan = tree[i].keterangan;
                      $scope.Norec7 = tree[i].noRec;   
                     break;   
                    case 61 :
                     $scope.item.GigiPalsu = tree[i].keterangan;       
                     $scope.Norec8 = tree[i].noRec;
                     break;   
                    case 115 :
                     $scope.item.Hb = tree[i].keterangan;      
                     $scope.Norec9 = tree[i].noRec;
                     break;   
                    case 116 :
                     $scope.item.Leukosit = tree[i].keterangan;
                     $scope.Norec10 = tree[i].noRec;
                     break;   
                    case 117 :
                     $scope.item.Trombosit = tree[i].keterangan;
                     $scope.Norec11 = tree[i].noRec;
                     break;                  
                    case 118 :
                     $scope.item.PT = tree[i].keterangan;
                     $scope.Norec12 = tree[i].noRec;
                     break;   
                    case 119 :
                     $scope.item.Diagnosa = tree[i].keterangan;
                     $scope.Norec13 = tree[i].noRec;
                     break;   
                    case 120 :
                     $scope.item.JenisTindakan = tree[i].keterangan;
                     $scope.Norec14 = tree[i].noRec;
                     break;   
                    case 121 :
                     $scope.item.JenisAnestesi = tree[i].keterangan;
                     $scope.Norec15 = tree[i].noRec;
                     break;   
                    case 62 :
                     $scope.item.klasAsa = tree[i].keterangan;  
                     $scope.Norec16 = tree[i].noRec;
                     break;
                    case 63 :
                     $scope.item.Catatan1 = tree[i].keterangan;    
                     $scope.Norec17 = tree[i].noRec;
                     break; 
                    case 64 :
                     $scope.item.Penyulit1 = tree[i].keterangan;
                     $scope.item.Penyulit2 = tree[i].ketTambahan;
                     $scope.Norec18 = tree[i].noRec;
                     break;
                    case 65 :
                     $scope.item.Catatan2 = tree[i].keterangan; 
                     $scope.Norec19 = tree[i].noRec;
                     break;
                    case 68 :
                     $scope.item.Sedasi = tree[i].keterangan;
                     $scope.Norec20 = tree[i].noRec;
                     break; 
                    case 69 :
                     $scope.item.Ga = tree[i].keterangan;  
                     $scope.Norec21 = tree[i].noRec;
                     break; 
                    case 113 :
                     $scope.item.CatatanPersiapan = tree[i].keterangan;
                     $scope.Norec22 = tree[i].noRec;
                     break; 
                    case 111 :
                     $scope.item.Rencana = tree[i].keterangan;
                     $scope.Norec25 = tree[i].noRec;
                     break; 
                    case 105 :
                     $scope.item.puasa = tree[i].keterangan;
                     $scope.Norec26 = tree[i].noRec;
                     break;
                    case 108 :
                     $scope.item.Premediksi = tree[i].keterangan;
                     $scope.Norec27 = tree[i].noRec;
                     break;  
                  }
                }
              var temporary = [];
              for (var key in $scope.listKajianSistem) {
                  debugger
                  if ($scope.listKajianSistem.hasOwnProperty(key)) {
                      var element = $scope.listKajianSistem[key];
                      if (element !== true) {
                         element.value = null;
                           tree.forEach(function(datax){
                            debugger
                               if(element.id == datax.id){
                                 debugger
                                      if(datax.yesNo == "2"){
                                        element.value = $scope.listStatusYaTidak[1];
                                        element.noRex = datax.noRec;
                                      }else{
                                        element.value = $scope.listStatusYaTidak[0];
                                        element.noRex = datax.noRec;
                                      }
                               temporary.push(element);
                               }
                              })
                      }
                  }
              }
           $scope.listPengobatanKhusus = temporary;
            });
           }
           $scope.isLoadingDetail = false;
          }

         
            // findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
            //     debugger;
            //     $scope.noRegistrasiNorec = $state.params.noRec;
            //     $scope.noRegistrasi = data.data.pasienDaftar.noRegistrasi;
            //     $scope.item = ModelItem.beforePost(data.data, true);
            //     $scope.item.pasien = data.data.pasien;
            //     $scope.item.NoRekamMedis = data.data.pasien.noCm; //00001523
            //     $scope.dokterFk = data.data.pasienDaftar.dokterPenanggungJawab.id //id dokter penanggung jawab
            //     $scope.item.Idpasien = data.data.pasien.id;
            //     $scope.item.namaPasien = data.data.pasien.namaPasien;
            //     $scope.item.ruangantujuan = data.data.ruangan.id
            //     $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');
            //     $scope.isLoadingData = false;
            // });
            
 
        
           $scope.listkajianASA =
           [
            {
                "name":"1",
                "id": 1
            },
            {
                "name":"2",
                "id": 2
            },
            {
                "name":"3",
                "id": 3
            },
            {
                "name":"4",
                "id": 4
            },
            {
                "name":"5",
                "id": 5
            },
            {
                "name":"e",
                "id": 6
            }
            ];

               $scope.listDataRawatInap = [{id:1, name :"Data Rawat Inap (Dummy Tes)"}]
               $scope.listDataRawatJalan = [{id:1, name :"Data Rawat Jalan (Dummy Tes)"}]


    
            $scope.ListDataRuangan = [{
                "namaExternal":"Poliklinik Bedah - 1",
                "id": 20
            }];

            $scope.listJenisKelamin = [
            {
                "namaExternal":"Laki-laki",
                "id": 1
            },
            {
                "namaExternal":"Perempuan",
                "id": 2
            }];

             
            $scope.checkListRegional = [];
             $scope.checkRegional = function(data) {
                if($scope.item.ModeEdit == true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.checkListRegional.length; i++){
                      if (data.id == $scope.checkListRegional[i].id){
                         if($scope.checkListRegional[i].status == true){
                            var getNorec = $scope.checkListRegional[i].noRex;
                            $scope.checkListRegional.splice(i, 1)
                            data.status = false;
                            data.noRex = getNorec;
                            $scope.checkListRegional.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListRegional;
                          }else{
                            var getNorec = $scope.checkListRegional[i].noRex;
                            $scope.checkListRegional.splice(i, 1)
                            data.status = true;
                            data.noRex = getNorec;
                            $scope.checkListRegional.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListRegional;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       data.status = true;
                       $scope.checkListRegional.push(data);
                    }
                }else{
                        var isExist = _.find($scope.checkListRegional, function(dataExist) {
                            return dataExist == data;
                        });
                        if (isExist == undefined) {
                            $scope.checkListRegional.push(data);
                        } else {
                            $scope.checkListRegional = _.without($scope.checkListRegional, data);    
                        }
                    }
            };

        
            $scope.checkListTeknisKhusus = [];
             $scope.checkTeknisKhusus = function(data) {
                if($scope.item.ModeEdit == true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.checkListTeknisKhusus.length; i++){
                      if (data.id == $scope.checkListTeknisKhusus[i].id){
                         if($scope.checkListTeknisKhusus[i].status == true){
                            var getNorec = $scope.checkListTeknisKhusus[i].noRex;
                            $scope.checkListTeknisKhusus.splice(i, 1)
                            data.status = false;
                            data.noRex = getNorec;
                            $scope.checkListTeknisKhusus.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListTeknisKhusus;
                          }else{
                            var getNorec = $scope.checkListTeknisKhusus[i].noRex;
                            $scope.checkListTeknisKhusus.splice(i, 1)
                            data.status = true;
                            data.noRex = getNorec;
                            $scope.checkListTeknisKhusus.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListTeknisKhusus;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       data.status = true;
                       $scope.checkListTeknisKhusus.push(data);
                    }
                }else{
                        var isExist = _.find($scope.checkListTeknisKhusus, function(dataExist) {
                            return dataExist == data;
                        });
                        if (isExist == undefined) {
                            $scope.checkListTeknisKhusus.push(data);
                        } else {
                            $scope.checkListTeknisKhusus = _.without($scope.checkListTeknisKhusus, data);    
                        }
                    }
            };


    
             $scope.checkListMonitoring = [];
             $scope.checkMonitoring = function(data) {
                if($scope.item.ModeEdit == true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.checkListMonitoring.length; i++){
                      if (data.id == $scope.checkListMonitoring[i].id){
                         if($scope.checkListMonitoring[i].status == true){
                            var getNorec = $scope.checkListMonitoring[i].noRex;
                            $scope.checkListMonitoring.splice(i, 1)
                            data.status = false;
                            data.noRex = getNorec;
                            $scope.checkListMonitoring.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListMonitoring;
                          }else{
                            var getNorec = $scope.checkListMonitoring[i].noRex;
                            $scope.checkListMonitoring.splice(i, 1)
                            data.status = true;
                            data.noRex = getNorec;
                            $scope.checkListMonitoring.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListMonitoring;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       data.status = true;
                       $scope.checkListTeknisKhusus.push(data);
                    }
                }else{
                        var isExist = _.find($scope.checkListTeknisKhusus, function(dataExist) {
                            return dataExist == data;
                        });
                        if (isExist == undefined) {
                            $scope.checkListTeknisKhusus.push(data);
                        } else {
                            $scope.checkListTeknisKhusus = _.without($scope.checkListTeknisKhusus, data);    
                        }
                    }
            };


            $scope.checkListAlatKhusus = [];
             $scope.checkAlatKhusus = function(data) {
                debugger
                if($scope.item.ModeEdit == true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.checkListAlatKhusus.length; i++){
                      if (data.id == $scope.checkListAlatKhusus[i].id){
                         if($scope.checkListAlatKhusus[i].status == true){
                            var getNorec = $scope.checkListAlatKhusus[i].noRex;
                            $scope.checkListAlatKhusus.splice(i, 1)
                            data.status = false;
                            data.noRex = getNorec;
                            $scope.checkListAlatKhusus.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListAlatKhusus;
                          }else{
                            var getNorec = $scope.checkListAlatKhusus[i].noRex;
                            $scope.checkListAlatKhusus.splice(i, 1)
                            data.status = true;
                            data.noRex = getNorec;
                            $scope.checkListAlatKhusus.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListAlatKhusus;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       data.status = true;
                       $scope.checkListAlatKhusus.push(data);
                    }
                }else{
                        var isExist = _.find($scope.checkListAlatKhusus, function(dataExist) {
                            return dataExist == data;
                        });
                        if (isExist == undefined) {
                            $scope.checkListAlatKhusus.push(data);
                        } else {
                            $scope.checkListAlatKhusus = _.without($scope.checkListAlatKhusus, data);    
                        }
                    }
            };

/*
            $scope.ListAlatKhusus = [];
            $scope.manageCheck = function(data){
            debugger;
                var isExist = _.find($scope.ListAlatKhusus, function(dataExist) {
                    return dataExist == data;
                });
                if (isExist == undefined) {
                    $scope.ListAlatKhusus.push(data);
                } else {
                    $scope.ListAlatKhusus = _.without($scope.ListAlatKhusus, data);    
                }
            }
*/
            $scope.ListAlatKhusus = [];
             $scope.manageCheck = function(data) {
                debugger
                if($scope.item.ModeEdit == true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.ListAlatKhusus.length; i++){
                        debugger
                      if (data.id == $scope.ListAlatKhusus[i].id){
                         if($scope.ListAlatKhusus[i].status == true){
                            var getNorec = $scope.ListAlatKhusus[i].noRex;
                            $scope.ListAlatKhusus.splice(i, 1)
                            data.status = false;
                            data.noRex = getNorec;
                            $scope.ListAlatKhusus.push(data);
                            $scope.ModeHapus = true;
                            return $scope.ListAlatKhusus;
                          }else{
                            var getNorec = $scope.ListAlatKhusus[i].noRex;
                            $scope.ListAlatKhusus.splice(i, 1)
                            data.status = true;
                            data.noRex = getNorec;
                            $scope.ListAlatKhusus.push(data);
                            $scope.ModeHapus = true;
                            return $scope.ListAlatKhusus;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       data.status = true;
                       $scope.ListAlatKhusus.push(data);
                    }
                }else{
                        var isExist = _.find($scope.ListAlatKhusus, function(dataExist) {
                            return dataExist == data;
                        });
                        if (isExist == undefined) {
                            $scope.ListAlatKhusus.push(data);
                        } else {
                            $scope.ListAlatKhusus = _.without($scope.ListAlatKhusus, data);    
                        }
                    }
            };


            $scope.checkListPerawatan = [];
             $scope.checkPerawatan = function(data) {
                if($scope.item.ModeEdit == true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.checkListPerawatan.length; i++){
                      if (data.id == $scope.checkListPerawatan[i].id){
                         if($scope.checkListPerawatan[i].status == true){
                            var getNorec = $scope.checkListPerawatan[i].noRex;
                            $scope.checkListPerawatan.splice(i, 1)
                            data.status = false;
                            data.noRex = getNorec;
                            $scope.checkListPerawatan.push(data);
                            $scope.ModeHapus = true;
                            if (data.name == "Rawat Inap") {
                            $scope.rawatInap = true;
                            $scope.item.rawatInap = null;
                            }
                            if (data.name == "Rawat Jalan") {
                            $scope.rawatJalan = true;
                            $scope.item.rawatJalan = null;
                            }
                            if (data.name == "Rawat Khusus") {
                            // $scope.rawatKhusus = true;
                            }
                            return $scope.checkListPerawatan;
                          }else{
                            var getNorec = $scope.checkListPerawatan[i].noRex;
                            $scope.checkListPerawatan.splice(i, 1)
                            data.status = true;
                            if (data.name == "Rawat Inap") {
                            $scope.rawatInap = false;
                            
                            }
                            if (data.name == "Rawat Jalan") {
                            $scope.rawatJalan = false;
                            }
                            if (data.name == "Rawat Khusus") {
                            // $scope.rawatKhusus = false;
                            }
                            data.noRex = getNorec;
                            $scope.checkListPerawatan.push(data);
                            $scope.ModeHapus = true;
                            return $scope.checkListPerawatan;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       data.status = true;
                       $scope.checkListPerawatan.push(data);
                    }
                }else{
                        var isExist = _.find($scope.checkListPerawatan, function(dataExist) {
                        return dataExist == data;
                        });
                        if (isExist == undefined) {
                             $scope.checkListPerawatan.push(data);
                        if (data.name == "Rawat Inap") {
                             $scope.rawatInap = false;
                           
                        }
                        if (data.name == "Rawat Jalan") {
                             $scope.rawatJalan = false;
                        }
                        if (data.name == "Rawat Khusus") {
                            //$scope.rawatKhusus = false;
                        }
                        } else {
                                $scope.checkListPerawatan = _.without($scope.checkListPerawatan, data);
                                if (data.name == "Rawat Inap") {
                                     $scope.rawatInap = true;
                                     $scope.item.rawatInap = null;
                                }
                                if (data.name == "Rawat Jalan") {
                                     $scope.rawatJalan = true;
                                      $scope.item.rawatJalan = null;
                                }
                                if (data.name == "Rawat Khusus") {
                                    //$scope.rawatKhusus = true;
                                }
                        }
                    }
            };

            $scope.checkListAsa = [];
            $scope.checkAsa = function(data) {
                debugger;
                var isExist = _.find($scope.checkListAsa, function(dataExist) {
                    return dataExist == data;
                });
                if (isExist == undefined) {
                    $scope.checkListAsa.push(data);
                } else {
                    $scope.checkListAsa = _.without($scope.checkListAsa, data);    
                }
            };

     
        // $scope.checkListAsa = [];
        //      $scope.checkAsa = function(data) {
        //         if($scope.item.ModeEdit = true){
        //           $scope.ModeHapus = false;
        //             for(var i = 0; i<$scope.checkListAsa.length; i++){
        //               if (data.id == $scope.checkListAsa[i].id){
        //                  if($scope.checkListAsa[i].status == true){
        //                     var getNorec = $scope.checkListAsa[i].noRex;
        //                     $scope.checkListAsa.splice(i, 1)
        //                     data.status = false;
        //                     data.noRex = getNorec;
        //                     $scope.checkListAsa.push(data);
        //                     $scope.ModeHapus = true;
        //                     return $scope.checkListAsa;
        //                   }else{
        //                     var getNorec = $scope.checkListAsa[i].noRex;
        //                     $scope.checkListAsa.splice(i, 1)
        //                     data.status = true;
        //                     data.noRex = getNorec;
        //                     $scope.checkListAsa.push(data);
        //                     $scope.ModeHapus = true;
        //                     return $scope.checkListAsa;
        //                   }
        //               }
        //             }
        //            if ($scope.ModeHapus == false){
        //                data.status = true;
        //                $scope.checkListAsa.push(data);
        //             }
        //         }else{
        //                 var isExist = _.find($scope.checkListAsa, function(dataExist) {
        //                     return dataExist == data;
        //                 });
        //                 if (isExist == undefined) {
        //                     $scope.checkListAsa.push(data);
        //                 } else {
        //                     $scope.checkListAsa = _.without($scope.checkListAsa, data);    
        //                 }
        //             }
        //     };

            $scope.cetak = function(){
                var urlLaporan = CetakBedah.open("");
                window.open(urlLaporan, '_blank');
            }

              $scope.Back = function(){
                $state.go('RevDaftarPasienRuanganBedah')
             }

            $scope.Save=function(){

            if($scope.item.puasa == undefined){
               $scope.item.puasa = new Date();
               $scope.item.puasa =  new moment(new Date($scope.item.puasa)).format('DD-MM-YYYY HH:mm');
            }
            if($scope.item.Premediksi == undefined){
                $scope.item.Premediksi = new Date();
                $scope.item.Premediksi = new moment(new Date($scope.item.Premediksi)).format('DD-MM-YYYY HH:mm');
            }
            if($scope.item.Rencana == undefined){
                $scope.item.Rencana = new Date();
                $scope.item.Rencana = new moment(new Date($scope.item.Rencana)).format('DD-MM-YYYY HH:mm');
            }
            $scope.item.tglAnastesi = new Date();
            $scope.item.NoRekamMedis;
            $scope.dokterFk;// 437;
            $scope.item.ruangantujuan; 
            var datafix = [];

            $scope.item.tglAnastesi = DateHelper.getTanggalFormattedNew($scope.item.tglAnastesi);

              for(var i=0 ;  i<$scope.checkListPerawatan.length; i++) {
                 if($scope.checkListPerawatan[i].status == undefined){ 
                    $scope.checkListPerawatan[i].status = true;
                 }
                if($scope.checkListPerawatan[i].id == 97){ 
                    if($scope.item.rawatInap != undefined){
                      $scope.checkListPerawatan[i].name = $scope.item.rawatInap.name;
                      $scope.yess = $scope.item.rawatInap.id;
                    }
                 }
                if($scope.checkListPerawatan[i].id == 98){ 
                    if($scope.item.rawatJalan != undefined){
                       $scope.checkListPerawatan[i].name = $scope.item.rawatJalan.name;
                       $scope.yess = $scope.item.rawatJalan.id;
                    }
                 }
                var dat = {
                                "praAnestesiDokter" : {"id" : $scope.checkListPerawatan[i].id},
                                "yesNo" : $scope.yess,
                                "keterangan" : $scope.checkListPerawatan[i].name,
                                "statusEnabled" : $scope.checkListPerawatan[i].status,
                                "ketTambahan" : $scope.checkListPerawatan[i].name,
                                "noRec" :  $scope.checkListPerawatan[i].noRex
                                }
                                datafix.push(dat)
               }

            for (var key in $scope.listKajianSistem) {
                debugger;
                if ($scope.listKajianSistem.hasOwnProperty(key)) {
                    var element = $scope.listKajianSistem[key];
                    if (element.value !== undefined) {
                        datafix.push({
                                       praAnestesiDokter: { id: element.id },
                                       yesNo : element.value.id,
                                       keterangan: element.value.name,
                                       statusEnabled : true,
                                       noRec : element.noRex
                                    });
                                }
                     }
               }



            for(var i=0 ;  i<$scope.checkListRegional.length; i++) {
                 if($scope.checkListRegional[i].status == undefined){ 
                    $scope.checkListRegional[i].status = true
                 }
                 var dat = {
                            "praAnestesiDokter" : {"id" : $scope.checkListRegional[i].id},
                            "yesNo" : $scope.checkListRegional[i].id,
                            "keterangan" : $scope.checkListRegional[i].name,
                            "statusEnabled" : $scope.checkListRegional[i].status,
                            "ketTambahan" : $scope.checkListRegional[i].name,
                            "noRec" :  $scope.checkListRegional[i].noRex
                            }
                datafix.push(dat)
             }

            for(var i=0 ;  i<$scope.checkListAsa.length; i++) {
                if($scope.checkListAsa[i].status == undefined){ 
                    $scope.checkListAsa[i].status = true
                 }
                 var dat = {
                            "praAnestesiDokter" : {"id" : $scope.checkListAsa[i].id},
                            "yesNo" : $scope.checkListAsa[i].id,
                            "keterangan" : $scope.checkListAsa[i].name,
                            "statusEnabled" : $scope.checkListAsa[i].status,
                            "ketTambahan" : $scope.checkListAsa[i].name,
                            "noRec" :  $scope.checkListAsa[i].noRex
                            }
                datafix.push(dat)
                }



             for(var i=0 ;  i<$scope.checkListTeknisKhusus.length; i++) {
                if($scope.checkListTeknisKhusus[i].status == undefined){ 
                    $scope.checkListTeknisKhusus[i].status = true
                 }
                  var dat = {
                                "praAnestesiDokter" : {"id" : $scope.checkListTeknisKhusus[i].id},
                                "yesNo" : $scope.checkListTeknisKhusus[i].id,
                                "keterangan" : $scope.checkListTeknisKhusus[i].name,
                                "statusEnabled" : $scope.checkListTeknisKhusus[i].status,
                                "ketTambahan" : $scope.checkListTeknisKhusus[i].name,
                                "noRec" :  $scope.checkListTeknisKhusus[i].noRex
                                }
                    datafix.push(dat)
             }

             for(var i=0 ;  i<$scope.checkListMonitoring.length; i++) {
                 if($scope.checkListMonitoring[i].status == undefined){ 
                    $scope.checkListMonitoring[i].status = true
                 }
                  var dat = {
                          
                                "praAnestesiDokter" : {"id" : $scope.checkListMonitoring[i].id},
                                "yesNo" : $scope.checkListMonitoring[i].id,
                                "keterangan" : $scope.checkListMonitoring[i].name,
                                "statusEnabled" : $scope.checkListMonitoring[i].status,
                                "ketTambahan" : $scope.checkListMonitoring[i].name,
                                "noRec" :  $scope.checkListMonitoring[i].noRex
                                }
                    datafix.push(dat)
             }
             
             for(var i=0; i<$scope.ListAlatKhusus.length; i++){
                if($scope.ListAlatKhusus[i].status == undefined){ 
                    $scope.ListAlatKhusus[i].status = true
                 }
                var dat = {
    
                                "praAnestesiDokter" : {"id" : $scope.ListAlatKhusus[i].id},
                                "yesNo" : $scope.ListAlatKhusus[i].id,
                                "keterangan" : $scope.ListAlatKhusus[i].name,
                                "statusEnabled" : $scope.ListAlatKhusus[i].status,
                                "ketTambahan" : $scope.ListAlatKhusus[i].name,
                                "noRec" :  $scope.ListAlatKhusus[i].noRex
                                }
                datafix.push(dat)

             }
            
              for(var i=0 ;  i<$scope.checkListAlatKhusus.length; i++) {
                if($scope.checkListAlatKhusus[i].status == undefined){ 
                    $scope.checkListAlatKhusus[i].status = true
                 }
                 var dat = {
                                "praAnestesiDokter" : {"id" : $scope.checkListAlatKhusus[i].id},
                                "yesNo" : $scope.checkListAlatKhusus[i].id,
                                "keterangan" : $scope.checkListAlatKhusus[i].name,
                                "statusEnabled" : $scope.checkListAlatKhusus[i].status,
                                "ketTambahan" : $scope.checkListAlatKhusus[i].name,
                                "noRec" :  $scope.checkListAlatKhusus[i].noRex
                                }
                                datafix.push(dat)
                           }




            if($scope.item.Mallampasti!=undefined){
                     var dat = {
                                "praAnestesiDokter" : {"id" : 54},
                                "keterangan" : $scope.item.Mallampasti,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Mallampasti,
                                "noRec" : $scope.Norec1
                                }
                  datafix.push(dat)
              }

              if($scope.item.Jantung!=undefined){
                var dat = {
                                "praAnestesiDokter" : {"id" : 55},
                                "keterangan" : $scope.item.Jantung,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Jantung,
                                "noRec" : $scope.Norec2
                            }
                 datafix.push(dat)
                }

              if($scope.item.Paruparu!=undefined){
                  var dat = {
                                "praAnestesiDokter" : {"id" : 56},
                                "keterangan" : $scope.item.Paruparu,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Paruparu,
                                "noRec" : $scope.Norec3
                            }
                 datafix.push(dat)
                }

               if($scope.item.Abdomen!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 57},
                                "keterangan" : $scope.item.Abdomen,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Abdomen,
                                "noRec" : $scope.Norec4
                            }
                    datafix.push(dat)
                }

                if($scope.item.Extremitas!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 58},
                                "keterangan" : $scope.item.Extremitas,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Extremitas,
                                "noRec" : $scope.Norec5
                             }
                    datafix.push(dat)
                }

                if($scope.item.Neurologi!=undefined){
                     var dat = {

                                "praAnestesiDokter" : {"id" : 59},
                                "keterangan" : $scope.item.Neurologi,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Neurologi,
                                "noRec" : $scope.Norec6
                            }
                    datafix.push(dat)
                }

                 if($scope.item.Keterangan!=undefined){
                     var dat = {
                                "praAnestesiDokter" : {"id" : 60},
                                "keterangan" : $scope.item.Keterangan,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Keterangan,
                                "noRec" : $scope.Norec7
                            }
                    datafix.push(dat)
                }

                if($scope.item.GigiPalsu!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 61},
                                "keterangan" : $scope.item.GigiPalsu,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.GigiPalsu,
                                "noRec" : $scope.Norec8
                             }
                    datafix.push(dat)
                }


                 if($scope.item.Hb!=undefined){
                     var dat = {
                                "praAnestesiDokter" : {"id" : 115},
                                "keterangan" : $scope.item.Hb,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Hb,
                                "noRec" : $scope.Norec9
                            }
                    datafix.push(dat)
                }
                if($scope.item.Leukosit!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 116},
                                "keterangan" : $scope.item.Leukosit,
                                "statusEnabled" : "true",
                                "noRec" : $scope.Norec10
                            }
                    datafix.push(dat)
                }

                if($scope.item.Trombosit!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 117},
                                "keterangan" : $scope.item.Trombosit,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Trombosit,
                                "noRec" : $scope.Norec11
                              }
                    datafix.push(dat)
                }
                if($scope.item.PT!=undefined){
                     var dat = {
                           
                                "praAnestesiDokter" : {"id" : 118},
                                "keterangan" : $scope.item.PT,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.PT,
                                "noRec" : $scope.Norec12
                            }
                    datafix.push(dat)
                }


                 if($scope.item.Diagnosa!=undefined){
                     var dat = {
                           
                                "praAnestesiDokter" : {"id" : 119},
                                "keterangan" : $scope.item.Diagnosa,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Diagnosa,
                                "noRec" : $scope.Norec13
                            }
                    datafix.push(dat)
                }

                 if($scope.item.JenisTindakan!=undefined){
                     var dat = {
                           
                                "praAnestesiDokter" : {"id" : 120},
                                "keterangan" : $scope.item.JenisTindakan,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.JenisTindakan,
                                "noRec" : $scope.Norec14
                               }
                    datafix.push(dat)
                }

                if($scope.item.JenisAnestesi!=undefined){
                    var dat = {
                           
                                "praAnestesiDokter" : {"id" : 121},
                                "keterangan" : $scope.item.JenisAnestesi,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.JenisAnestesi,
                                "noRec" : $scope.Norec15
                            }
                    datafix.push(dat)
                }

                 if($scope.item.klasAsa!=undefined){
                   var dat = {
                           
                                "praAnestesiDokter" : {"id" : 62},
                                "yesNo" : 1,
                                "keterangan" : $scope.item.Catatan1,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Catatan1,
                                "noRec" : $scope.Norec16
                            }
                    datafix.push(dat)
                }

                if($scope.item.Catatan1!=undefined){
                   var dat = {
                                "praAnestesiDokter" : {"id" : 63},
                                "keterangan" : $scope.item.Catatan1,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Catatan1,
                                "noRec" : $scope.Norec17
                            }
                    datafix.push(dat)
                }

                 if($scope.item.Penyulit1!=undefined || $scope.item.Penyulit2!=undefined){
                     var dat = {
                           
                                "praAnestesiDokter" : {"id" : 64},
                                "keterangan" : $scope.item.Penyulit1,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Penyulit2,
                                "noRec" : $scope.Norec18
                              }
                    datafix.push(dat)
                }
                

                if($scope.item.Catatan2!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 65},
                                "keterangan" : $scope.item.Catatan2,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Catatan2,
                                "noRec" : $scope.Norec19
                             }
                    datafix.push(dat)
                }

                if($scope.item.Sedasi!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 68},
                                "keterangan" : $scope.item.Sedasi,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Sedasi,
                                "noRec" : $scope.Norec20
                             }
                    datafix.push(dat)
                }

                if($scope.item.Ga!=undefined){
                    var dat = {
                                "praAnestesiDokter" : {"id" : 69},
                                "keterangan" : $scope.item.Ga,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Ga,
                                "noRec" : $scope.Norec21
                               }
                    datafix.push(dat)
                }

                
                if($scope.item.CatatanPersiapan!=undefined){
                    var dat = {
                           
                                "praAnestesiDokter" : {"id" : 113},
                                "keterangan" : $scope.item.CatatanPersiapan,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.CatatanPersiapan,
                                "noRec" : $scope.Norec22
                            }
                    datafix.push(dat)
                }


                 if($scope.item.Rencana!=undefined){
                   var dat = {
                           
                                "praAnestesiDokter" : {"id" : 111},
                                "keterangan" : $scope.item.Rencana,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Rencana,
                                "noRec" : $scope.Norec25
                            }
                    datafix.push(dat)
                }
                 if($scope.item.puasa!=undefined){
                     var dat = {
                                "praAnestesiDokter" : {"id" : 105},
                                "keterangan" : $scope.item.puasa,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.puasa,
                                "noRec" : $scope.Norec26
                            }
                    datafix.push(dat)
                }
                if($scope.item.Premediksi!=undefined){
                     var dat = {
                           
                                "praAnestesiDokter" : {"id" : 108},
                                "keterangan" : $scope.item.Premediksi,
                                "statusEnabled" : "true",
                                "ketTambahan" : $scope.item.Premediksi,
                                "noRec" : $scope.Norec27
                               }
                    datafix.push(dat)
                }
                var data =  {
                                "pasienDaftar" : {"noRec" : $state.params.noRec},
                                "noRec" : $scope.NorecForm,
                                "dokterFk" : {"id" : $scope.dokterFk},
                                "statusEnabled" : "true",
                                "tglAnestasi" : $scope.item.tglAnastesi,
                                "praAnestesiDokterBedah" : datafix
                               
                            }
                console.log(JSON.stringify(data));
                managePasien.saveFormulirAnestesiDokterRev1(data).then(function(e){
                $scope.loadGrid();
                })
 
            }
            
        }
    ]);
});