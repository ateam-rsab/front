define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanRiwayatKelahiranRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper', 'ManagePhp',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper, ManagePhp) {

          $scope.noRecPap = cacheHelper.get('noRecPap');

            $rootScope.doneLoad = false;

            $scope.noCM = $state.params.noCM;
            // $scope.noRecPap = window.localStorage.getItem('noRecPap');

            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.item = {};
            $scope.formId = 356;
            $scope.getHistory=function(){
                var objectfk = "RKL";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData ("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                       + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                    $scope.dataRiwayatKel = e.data.data;
                
                    if ($scope.dataRiwayatKel.length >0){
                        for (var i = 0; i < $scope.dataRiwayatKel.length; i++) {
                            if($scope.dataRiwayatKel[i].objectfk == "RKL-000001"){
                                $scope.norecRiwayat = $scope.dataRiwayatKel[i].norec
                                for (var k = 0; k  < $scope.listKelahiran.length; k++) {
                                    if($scope.listKelahiran[k].id ==$scope.dataRiwayatKel[i].nilai )  {
                                          $scope.item.riwayatKelahiran = $scope.listKelahiran[k]
                                    }
                                }
                            }else if($scope.dataRiwayatKel[i].objectfk == "RKL-000002"){
                                $scope.norecKet = $scope.dataRiwayatKel[i].norec
                                $scope.item.ketRiwayatKelahiran =$scope.dataRiwayatKel[i].nilai
                                
                            }
                        }
                    }   
                })
            };
            $scope.getHistory();
            $scope.listKelahiran = [
                {"id": 1, "name": "Ada Masalah"},
                {"id": 2, "name": "Tidak Ada Masalah"}
            ]

            $scope.Save = function(){
                
            if ($scope.dataRiwayatKel.length != 0) {
                var data = [
                     {
                        norec: $scope.norecRiwayat,
                        objectfk: "RKL-000001",
                        nilai: $scope.item.riwayatKelahiran!== undefined ?  $scope.item.riwayatKelahiran.id :  $scope.item.riwayatKelahiran, 
                        satuan: "",
                        jenisobject : "radio"
                    },
                    {
                        norec: $scope.norecKet,
                        objectfk: "RKL-000002",
                        nilai: $scope.item.ketRiwayatKelahiran ,
                        satuan: "",
                        jenisobject: 'textarea'
                    }
                    
                    ]
                } else {
                var data = [
                    {
                        norec: "-",
                        objectfk: "RKL-000001",
                        nilai: $scope.item.riwayatKelahiran!== undefined ?  $scope.item.riwayatKelahiran.id :  $scope.item.riwayatKelahiran, 
                        satuan: "",
                        jenisobject : "radio"
                    },
                    {
                        norec: "-",
                        objectfk: "RKL-000002",
                        nilai: $scope.item.ketRiwayatKelahiran ,
                        satuan: "",
                        jenisobject: 'textarea'
                    },
                    
                    ]                                
            }
            for (var i = 0; i < data.length; i++) {
                if(data[i].norec == undefined){
                    data[i].norec = '-'
                }
                if(data[i].nilai == undefined){
                    data.splice([i],1)
                }
                

            }
            var jsonSave = {
                data: data,
                noregistrasifk: $state.params.noRec,
                riwayatpapfk: $scope.noRecPap
            }
            ManagePhp.saveData(jsonSave).then(function(e) {
                 ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Riwayat Kelahiran').then(function (res) {
                     })
            });
            }
           
        }
    ]);
});