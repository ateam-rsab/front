define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('TandaVitalRevCtrl', ['$rootScope', '$scope', '$state', 'ManagePhp', 'CacheHelper',
        function($rootScope, $scope, $state, ManagePhp, cacheHelper) {

            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuSkrining = true;
            $scope.noCM = $state.params.noCM;
            $scope.dataVOloaded = true;
            $scope.item = {};
            var norecPap = ''
            loadCache()
            function loadCache (){
                var cache = cacheHelper.get('noRecPap');
                if (cache != undefined){
                    norecPap =cache

                }
            }

            $scope.getdataVital=function(){
                var objectfk = "TVI";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk 
                    + '&riwayatfk=' + norecPap).then(function(e) {
                        $scope.dataTandaVital = e.data.data;
                        for (var i = 0; i < $scope.dataTandaVital.length; i++) {
                            if($scope.dataTandaVital[i].objectfk == "TVI-000001"){
                                $scope.noRecSuhu = $scope.dataTandaVital[i].norec
                                $scope.item.suhu = parseFloat($scope.dataTandaVital[i].nilai)
                            }else if($scope.dataTandaVital[i].objectfk == "TVI-000002"){
                                $scope.noRecNadi = $scope.dataTandaVital[i].norec
                                $scope.item.nadi =  parseFloat($scope.dataTandaVital[i].nilai)
                            }else if($scope.dataTandaVital[i].objectfk == "TVI-000003"){
                                $scope.noRecPernapasan = $scope.dataTandaVital[i].norec
                                $scope.item.pernapasan =  parseFloat($scope.dataTandaVital[i].nilai)
                            }else if($scope.dataTandaVital[i].objectfk == "TVI-000004"){
                                $scope.noRecTekananDarah = $scope.dataTandaVital[i].norec
                                $scope.item.tekananDarah = $scope.dataTandaVital[i].nilai
                            }
                        }
                    })
                };
                $scope.getdataVital();

                $scope.Save = function() {
                    var data = [
                    {
                        norec: $scope.noRecSuhu,
                        objectfk: "TVI-000001",
                        nilai: $scope.item.suhu == null ? "" : $scope.item.suhu,
                        satuan: "°C",
                        jenisobject : "textbox"
                    },
                    {
                        norec: $scope.noRecNadi,
                        objectfk: "TVI-000002",
                        nilai:  $scope.item.nadi == null ? "" : $scope.item.nadi,
                        satuan: "x/menit",
                        jenisobject: 'textbox'
                    },
                    {
                        norec: $scope.noRecPernapasan,
                        objectfk: "TVI-000003",
                        nilai:  $scope.item.pernapasan == null ? "" : $scope.item.pernapasan,
                        satuan: "x/menit",
                        jenisobject: "textbox"
                    },
                    {
                        norec: $scope.noRecTekananDarah,
                        objectfk: "TVI-000004",
                        nilai: $scope.item.tekananDarah,
                        satuan: "mmHg",
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
                    riwayatpapfk: norecPap
                }
                ManagePhp.saveData(jsonSave).then(function(e) {
                 $scope.getdataVital()
                  ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Tanda Vital').then(function (res) {
                  })
             });
            };
        }
        ]);
});