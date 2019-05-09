define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanRiwayatImunisasiDasarRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper', 'ManagePhp',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper, ManagePhp) {

            

            $rootScope.doneLoad = false;

            $scope.noCM = $state.params.noCM;
            $scope.noRecPap = cacheHelper.get('noRecPap');

            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.item = {};

            $scope.formId = 359;
            $scope.getHistory=function(){
                var objectfk = "RID";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData ("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                       + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                    $scope.dataRiwayatImun = e.data.data;
                
                    if ($scope.dataRiwayatImun.length >0){
                        for (var i = 0; i < $scope.dataRiwayatImun.length; i++) {
                            if($scope.dataRiwayatImun[i].objectfk == "RID-000001"){
                                $scope.norecRiwayat = $scope.dataRiwayatImun[i].norec
                                for (var k = 0; k  < $scope.listRiwayatImun.length; k++) {
                                    if($scope.listRiwayatImun[k].id ==$scope.dataRiwayatImun[i].nilai )  {
                                          $scope.item.riwayatImunisasi = $scope.listRiwayatImun[k]
                                    }
                                }
                            }
                        }
                    }   
                })
            };
            $scope.getHistory();
            $scope.listRiwayatImun = [
                {"id": 1, "name": "Lengkap"},
                {"id": 2, "name": "Tidak Lengkap"},
                {"id": 3, "name": "Tidak Pernah"}
            ]

            $scope.Save = function(){
                
            if ($scope.dataRiwayatImun.length != 0) {
                var data = [
                     {
                        norec: $scope.norecRiwayat,
                        objectfk: "RID-000001",
                        nilai: $scope.item.riwayatImunisasi !== undefined ?  $scope.item.riwayatImunisasi.id : $scope.item.riwayatImunisasi,
                        satuan: "",
                        jenisobject : "radio"
                    }
                   
                    
                    ]
                } else {
                var data = [
                    {
                        norec: "-",
                        objectfk: "RID-000001",
                        nilai: $scope.item.riwayatImunisasi !== undefined ?  $scope.item.riwayatImunisasi.id : $scope.item.riwayatImunisasi,
                        satuan: "",
                        jenisobject : "radio"
                    }
                   
                    
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
                ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Riwayat Imunisasi Dasar').then(function (res) {
                 })
            });
            }
           
        }
    ]);
});