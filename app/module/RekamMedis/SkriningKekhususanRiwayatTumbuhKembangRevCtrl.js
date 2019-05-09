define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanRiwayatTumbuhKembangRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper', 'ManagePhp',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper,ManagePhp) {
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $scope.noCM = $state.params.noCM;
            $scope.numberPicker = {
                format: "{0:n0}"
            }
            $scope.formId = 363;
            $scope.item = {};
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.getRiwayatTT=function(){
                var objectfk = "RTT";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData ("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                       + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                    $scope.dataRiwayatTT= e.data.data;
                    // debugger
                    if ($scope.dataRiwayatTT.length >0){
                        for (var i = 0; i < $scope.dataRiwayatTT.length; i++) {
                            if($scope.dataRiwayatTT[i].objectfk == "RTT-000001"){
                                $scope.norecTengkurap = $scope.dataRiwayatTT[i].norec
                                $scope.item.tengkurap = $scope.dataRiwayatTT[i].nilai
                            }else if($scope.dataRiwayatTT[i].objectfk == "RTT-000002"){
                                $scope.norecBicara = $scope.dataRiwayatTT[i].norec
                                $scope.item.bicara = $scope.dataRiwayatTT[i].nilai
                            }else if($scope.dataRiwayatTT[i].objectfk == "RTT-000003"){
                                $scope.norecBerdiri = $scope.dataRiwayatTT[i].norec
                                $scope.item.berdiri = $scope.dataRiwayatTT[i].nilai
                            }else if($scope.dataRiwayatTT[i].objectfk == "RTT-000004"){
                                $scope.norecMerangkak= $scope.dataRiwayatTT[i].norec
                                $scope.item.merangkak = $scope.dataRiwayatTT[i].nilai 
                            }else if($scope.dataRiwayatTT[i].objectfk == "RTT-000005"){
                                $scope.norecTumbuhGigi = $scope.dataRiwayatTT[i].norec
                                $scope.item.tumbuhGigi = $scope.dataRiwayatTT[i].nilai 
                            }else if($scope.dataRiwayatTT[i].objectfk == "RTT-000006"){
                                $scope.norecDuduk= $scope.dataRiwayatTT[i].norec
                                $scope.item.duduk = $scope.dataRiwayatTT[i].nilai                               
                            }else if($scope.dataRiwayatTT[i].objectfk == "RTT-000007"){
                                $scope.norecBerjalan = $scope.dataRiwayatTT[i].norec
                                $scope.item.berjalan = $scope.dataRiwayatTT[i].nilai 
                            }

                        }
                    }   
                })
            };
            $scope.getRiwayatTT();

         $scope.Save = function() {
            // if ($scope.dataRiwayatTT.length != 0) {
                var data = [
                      {
                        norec: $scope.norecTengkurap,
                        objectfk: "RTT-000001",
                        nilai:  $scope.item.tengkurap,
                        satuan: "bulan",
                        jenisobject : "textbox"
                    },
                    {
                        norec: $scope.norecBicara,
                        objectfk: "RTT-000002",
                        nilai:  $scope.item.bicara,
                        satuan: "bulan",
                        jenisobject : "textbox"
                    },
                    {
                        norec:$scope.norecBerdiri,
                        objectfk: "RTT-000003",
                        nilai: $scope.item.berdiri,
                        satuan: "bulan",
                        jenisobject: 'textbox'
                    },
                    {
                        norec: $scope.norecMerangkak,
                        objectfk: "RTT-000004",
                        nilai: $scope.item.merangkak,
                        satuan: "bulan",
                        jenisobject: "textbox"
                    },
                    {
                        norec: $scope.norecTumbuhGigi,
                        objectfk: "RTT-000005",
                        nilai: $scope.item.tumbuhGigi,
                        satuan: "bulan",
                        jenisobject: "textbox"
                    },
                    {
                        norec: $scope.norecDuduk,
                        objectfk: "RTT-000006",
                        nilai:$scope.item.duduk,
                        satuan: "bulan",
                        jenisobject: "textbox"
                    },
                    {
                        norec: $scope.norecBerjalan,
                        objectfk: "RTT-000007",
                        nilai: $scope.item.berjalan,
                        satuan: "bulan",
                        jenisobject: "textbox"
                    }
                  
            ]
                
            for (var i = data.length - 1; i >= 0; i--) {
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
                ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Riwayat Tumbuh Kembang').then(function (res) {
                 })
              
            });
        }
        $scope.Back= function(){
            $scope.item = {}
        }



        }
        ]);
});