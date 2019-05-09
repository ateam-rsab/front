define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanTambahanRevCtrl', ['$q', '$rootScope', '$scope', '$state', 'CacheHelper', 'ManagePhp','DateHelper',
        function($q, $rootScope, $scope, $state, cacheHelper, ManagePhp, dateHelper) {


            //indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.item ={};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            $scope.title ='Skrining Tambahan';

            $scope.listBatuk =[
            {"id":1,"nama":"Batuk","no":"1)","detail":[{"id":1,"nama":"Ya"},{"id":2,"nama":"Tidak"}]}
            ]
            $scope.listLendir =[
            {"id":1,"nama":"Lendir","no":"2)","detail":[{"id":1,"nama":"Ya  "},{"id":2,"nama":"Tidak  "}]}
            ]
            $scope.listSesak  =[
            {"id":1,"nama":"Sesak","no":"3)","detail":[{"id":1,"nama":"Ya "},{"id":2,"nama":"Tidak "}]}
            ]
            $scope.listMuntah  =[
            {"id":1,"nama":"Muntah ","no":"4)","detail":[{"id":1,"nama":"Ya   "},{"id":2,"nama":"Tidak   "}]}
            ]
            $scope.listDiare   =[
            {"id":1,"nama":"Diare ","no":"5)","detail":[{"id":1,"nama":"Ya    "},{"id":2,"nama":"Tidak    "}]}
            ]
            $scope.listKejang   =[
            {"id":1,"nama":"Kejang","no":"6)","detail":[{"id":1,"nama":"Ya     "},{"id":2,"nama":"Tidak     "}]}
            ]
            $scope.listIkterik   =[
            {"id":1,"nama":"Ikterik ","no":"7)","detail":[{"id":1,"nama":"Ya      "},{"id":2,"nama":"Tidak      "}]}
            ]
            $scope.listPucat   =[
            {"id":1,"nama":"Pucat ","no":"8)","detail":[{"id":1,"nama":"Ya       "},{"id":2,"nama":"Tidak       "}]}
            ]
            $scope.listPerdarahan   =[
            {"id":1,"nama":"Perdarahan ","no":"9)","detail":[{"id":1,"nama":"Ya        "},{"id":2,"nama":"Tidak         "}]}
            ]
            $scope.listMemar   =[
            {"id":1,"nama":"Memar ","no":"10)","detail":[{"id":1,"nama":"Ya           "},{"id":2,"nama":"Tidak           "}]}
            ]
            $scope.formId = 323;
            $scope.arrParameterSkriningTmbhn = [];
            $scope.getdata = function(){
                var objectfk = "KHT";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                    + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                        $scope.dataResult = e.data.data;
                        if($scope.dataResult.length != 0){
                            for (var i = 0; i < $scope.dataResult.length; i++) {

                                if($scope.dataResult[i].objectfk == "KHT-000001"){
                                    $scope.noRecBatuk = $scope.dataResult[i].norec
                                    $scope.item.batuk = $scope.dataResult[i].nilai;
                                }
                                if($scope.dataResult[i].objectfk == "KHT-000002"){
                                    $scope.noRecKejang = $scope.dataResult[i].norec
                                    $scope.item.kejang = $scope.dataResult[i].nilai;
                                }
                                if($scope.dataResult[i].objectfk == "KHT-000003"){
                                    $scope.noRecLendir = $scope.dataResult[i].norec
                                    $scope.item.lendir = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KHT-000004"){
                                    $scope.noRecIkterik = $scope.dataResult[i].norec
                                    $scope.item.ikterik = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KHT-000005"){
                                    $scope.noRecSesak = $scope.dataResult[i].norec
                                    $scope.item.sesak = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KHT-000006"){
                                    $scope.noRecMemar = $scope.dataResult[i].norec
                                    $scope.item.memar = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KHT-000007"){
                                    $scope.noRecPucat = $scope.dataResult[i].norec
                                    $scope.item.pucat = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KHT-000008"){
                                    $scope.noRecMuntah = $scope.dataResult[i].norec
                                    $scope.item.muntah = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KHT-000009"){
                                    $scope.noRecPendarahan = $scope.dataResult[i].norec
                                    $scope.item.pendarahan = $scope.dataResult[i].nilai;
                                } if($scope.dataResult[i].objectfk == "KHT-000010"){
                                    $scope.noRecDiare = $scope.dataResult[i].norec
                                    $scope.item.diare = $scope.dataResult[i].nilai;
                                }

                            }
                        }
                    })
              }
            $scope.getdata();

            $scope.Save = function() {
                var tempData = []
                if($scope.item.batuk !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecBatuk,
                        objectfk: "KHT-000001",
                        nilai: $scope.item.batuk.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.kejang !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKejang,
                        objectfk: "KHT-000002",
                        nilai: $scope.item.kejang.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.lendir !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecLendir,
                        objectfk: "KHT-000003",
                        nilai: $scope.item.lendir.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.ikterik !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecIkterik,
                        objectfk: "KHT-000004",
                        nilai: $scope.item.ikterik.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.sesak !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecSesak,
                        objectfk: "KHT-000005",
                        nilai: $scope.item.sesak.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.memar !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecMemar,
                        objectfk: "KHT-000006",
                        nilai: $scope.item.memar.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.pucat !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecPucat,
                        objectfk: "KHT-000007",
                        nilai: $scope.item.pucat.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.muntah !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecMuntah,
                        objectfk: "KHT-000008",
                        nilai: $scope.item.muntah.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.pendarahan !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecPendarahan,
                        objectfk: "KHT-000009",
                        nilai: $scope.item.pendarahan.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.diare !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecDiare,
                        objectfk: "KHT-000010",
                        nilai: $scope.item.diare.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }

                for (var i = tempData.length - 1; i >= 0; i--) {
                    if(tempData[i].nilai == undefined){
                        tempData.splice([i],1)
                    }
                    if(tempData[i].norec == undefined){
                        tempData[i].norec = '-'
                    }

                }
   
            var jsonSave = {
                data: tempData,
                noregistrasifk: $state.params.noRec,
                riwayatpapfk: $scope.noRecPap
            }
            ManagePhp.saveData(jsonSave).then(function(e) {
                $scope.currentStatus=[];  
                $scope.getdata();
            });

        }

        $scope.Next = function() {
            $rootScope.next();
        }


    }
    ]);
});