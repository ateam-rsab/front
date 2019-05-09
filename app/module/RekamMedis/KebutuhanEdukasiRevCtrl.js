/**
 * Created by jasamedika on 6/13/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KebutuhanEdukasiRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'GetPostOnPengkajianAwal', 'ManagePasien', 'FindPasien', 'DateHelper', 'CacheHelper','ManagePhp',
        function($rootScope, $scope, ModelItem, $state, GetPostOnPengkajianAwal, managePasien, findPasien, dateHelper, cacheHelper,ManagePhp) {
        //$rootScope.listActive -> data listMenu

            $scope.title = "KEBUTUHAN EDUKASI (Rawat Jalan dan Rawat Inap)";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.formId = 675;
            $scope.noRecPap = cacheHelper.get('noRecPap'); // noRecPap
            $scope.item = {};
            $scope.arrKebutuhanEdukasi = [];

            $scope.listHambatan=[
                {"id":1,"nama":"Hambatan pembelajaran","detail":[{"id":1,"nama":"Tidak ada"},{"id":2,"nama":" Penglihatan"},{"id":3,"nama":"Budaya/Kepercayaan"},{"id":4,"nama":"Bahasa"},{"id":5,"nama":"Pendengaran"},{"id":6,"nama":"Kognitif"},{"id":7,"nama":"Emosi"},{"id":8,"nama":" Lain-Lain"},]}
            ]
            $scope.listEdukasi=[
                {"id":2,"nama":"Edukasi yang diperlukan","detail":[{"id":1,"nama":"Stimulasi Tumbuh Kembang"},{"id":2,"nama":" Perawatan Luka"},{"id":3,"nama":"Manajemen Nyeri"},{"id":4,"nama":"Rehabilitasi"},{"id":5,"nama":"Nutrisi"},{"id":6,"nama":"Perawatan Stoma"},{"id":7,"nama":"Medikasi"},{"id":8,"nama":"Jaminan Finansial"},{"id":9,"nama":"Cara menyusui yang benar"},{"id":10,"nama":"Perawatan tali pusat"},{"id":11,"nama":"Pencegah Infeksi"},{"id":12,"nama":"Lain-Lain"}]}
            ]
            
            $scope.getdata=function(){
                var objectfk = "EDU";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                         + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                    $scope.dataEdukasi = e.data.data;
                    if($scope.dataEdukasi.length != 0){
                        for (var i = 0; i < $scope.dataEdukasi.length; i++) {
                            if($scope.dataEdukasi[i].objectfk == "EDU-000001"){
                                $scope.noRecHambatanSatu = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000002"){
                                $scope.noRecHambatanDua = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000003"){
                                $scope.noRecHambatanTiga = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000004"){
                                $scope.noRecHambatanEmpat = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000005"){
                                $scope.noRecHambatanLima = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000006"){
                                $scope.noRecHambatanEnam = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000007"){
                                $scope.noRecHambatanTujuh = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000008"){
                                $scope.noRecHambatanDelapan = $scope.dataEdukasi[i].norec
                                $scope.listHambatan[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentHambatan.push(dataid)
                                    }
                                })
                            }
                            //listEdukasi
                            if($scope.dataEdukasi[i].objectfk == "EDU-000009"){
                                $scope.noRecEdukasiSatu = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000010"){
                                $scope.noRecEdukasiDua = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000011"){
                                $scope.noRecEdukasiTiga = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000012"){
                                $scope.noRecEdukasiEmpat = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000013"){
                                $scope.noRecEdukasiLima = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000014"){
                                $scope.noRecEdukasiEnam = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000015"){
                                $scope.noRecEdukasiTujuh = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000016"){
                                $scope.noRecEdukasiDelapan = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000017"){
                                $scope.noRecEdukasiSembilan = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000018"){
                                $scope.noRecEdukasiSepuluh = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000019"){
                                $scope.noRecEdukasiSebelas = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000020"){
                                $scope.noRecEdukasiDuaBelas = $scope.dataEdukasi[i].norec
                                $scope.listEdukasi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataEdukasi[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentEdukasi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataEdukasi[i].objectfk == "EDU-000021"){
                                $scope.noRecLain2 = $scope.dataEdukasi[i].norec
                                $scope.item.lain2 =$scope.dataEdukasi[i].nilai
                            }
                        }
                    }
                })
            }
            $scope.getdata();

            $scope.currentHambatan=[];
            $scope.addListHambatan = function(bool,data) {
                var index = $scope.currentHambatan.indexOf(data);
                if (_.filter($scope.currentHambatan, {
                        id: data.id
                    }).length === 0)
                    $scope.currentHambatan.push(data);
                else {
                    $scope.currentHambatan.splice(index, 1);
                }
                
            }
            $scope.currentEdukasi=[];
            $scope.addListEdukasi = function(bool,data) {
                var index = $scope.currentEdukasi.indexOf(data);
                if (_.filter($scope.currentEdukasi, {
                        id: data.id
                    }).length === 0)
                    $scope.currentEdukasi.push(data);
                else {
                    $scope.currentEdukasi.splice(index, 1);
                }
                
            }

             $scope.Save = function() {
                var dataForm = [];  
                var tempData = [];

                $scope.currentHambatan.forEach(function(data){
                    if(data.id === 1){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanSatu,
                            objectfk: "EDU-000001",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                    if(data.id === 2){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanDua,
                            objectfk: "EDU-000002",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                    if(data.id === 3){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanTiga,
                            objectfk: "EDU-000003",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                    if(data.id === 4){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanEmpat,
                            objectfk: "EDU-000004",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                    if(data.id === 5){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanLima,
                            objectfk: "EDU-000005",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                    if(data.id === 6){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanEnam,
                            objectfk: "EDU-000006",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                    if(data.id === 7){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanTujuh,
                            objectfk: "EDU-000007",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                    if(data.id === 8){
                        var tmpDataHambatan = {
                            norec: $scope.noRecHambatanDelapan,
                            objectfk: "EDU-000008",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataHambatan);
                    }
                })
                $scope.currentEdukasi.forEach(function(data){
                    if(data.id === 1){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiSatu,
                            objectfk: "EDU-000009",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 2){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiDua,
                            objectfk: "EDU-000010",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 3){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiTiga,
                            objectfk: "EDU-000011",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 4){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiEmpat,
                            objectfk: "EDU-000012",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 5){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiLima,
                            objectfk: "EDU-000013",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 6){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiEnam,
                            objectfk: "EDU-000014",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 7){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiTujuh,
                            objectfk: "EDU-000015",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 8){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiDelapan,
                            objectfk: "EDU-000016",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 9){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiSembilan,
                            objectfk: "EDU-000017",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 10){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiSepuluh,
                            objectfk: "EDU-000018",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 11){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiSebelas,
                            objectfk: "EDU-000019",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                    if(data.id === 12){
                        var tmpDataEdukasi = {
                            norec: $scope.noRecEdukasiDuaBelas,
                            objectfk: "EDU-000020",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataEdukasi);
                    }
                })
                if ($scope.item.lain2!= undefined){
                    var tmpDataEdukasi = {
                        norec: $scope.noRecLain2,
                        objectfk: "EDU-000021",
                        nilai: $scope.item.lain2,
                        satuan: "-",
                        jenisobject : "textbox"
                    }
                    tempData.push(tmpDataEdukasi);
                }
                for (var i = tempData.length - 1; i >= 0; i--) {
                    if(tempData[i].nilai == undefined){
                        tempData.splice([i],1)
                    }
                    if(tempData[i].norec == undefined){
                        tempData[i].norec = '-'
                    }

                }
                debugger;
                var jsonSave = {
                    data: tempData,
                    noregistrasifk: $state.params.noRec,
                    riwayatpapfk: $scope.noRecPap
                }
                ManagePhp.saveData(jsonSave).then(function(e) {
                    $scope.arrNyeriMempengaruhi=[];  
                    $scope.getdata();
                    ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Kebutuhan Edukasi').then(function (res) {
                    })
                });
            }
            
        }
    ]);
});