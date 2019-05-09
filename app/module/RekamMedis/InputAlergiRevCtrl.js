define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('InputAlergiRevCtrl', ['$state','$scope', 'ManagePhp', 'CacheHelper' ,
        function($state,$scope,ManagePhp, cacheHelper) {
            $scope.data = {};
            $scope.listDataAlergi = [
                { name: "Ya", id: 1},
                { name: "Tidak", id: 2 }
            ];
            var norecPap = ''
            loadCache()
            function loadCache (){
                var cache = cacheHelper.get('noRecPap');
                if (cache != undefined){
                    norecPap =cache

                }
            }
            
            $scope.getDataAlergi=function(){
                var objectfk = "ALG";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                + '&riwayatfk=' + norecPap).then(function(e) {
                    var data = e.data.data;
                    if(data.length != 0){
                        // $scope.dataAlergi = data[0].nilai;
                        // $scope.noRecAlergi = data[0].norec;

                        // $scope.data.alergi = data[0].nilai;
                        for (let i = 0; i < data.length; i++) {
                            if(data[i].objectfk == "ALG-000001"){
                                $scope.noRecAlergi = data[i].norec
                                $scope.data.alergi =data[i].nilai
                            }else if(data[i].objectfk == "ALG-000002"){
                                $scope.noRecKet = data[i].norec
                                $scope.data.keterangan = data[i].nilai
                            }
                            
                        }
                        // if($scope.dataAlergi=="true"){
                        //     $scope.data.alergi = true
                        // }else{
                        //     $scope.data.alergi = false
                        // }
                    }
                    
                })
            };
            $scope.getDataAlergi();
            $scope.klikOption = function(data, stat) {
                $scope.data.alergi = stat.value;
                console.log("pilihan anda adalah " + stat.value)
            }
            $scope.Save = function() {
                if($scope.data.alergi==undefined){
                    var nilai = ""
                }else{
                    var nilai = $scope.data.alergi.toString()
                }
                var data = [
                    {
                        norec: $scope.noRecAlergi,
                        objectfk: "ALG-000001",
                        nilai: nilai,
                        satuan: "-",
                        jenisobject : "radio button"
                    },
                    {
                        norec: $scope.noRecKet,
                        objectfk: "ALG-000002",
                        nilai: $scope.data.keterangan,
                        satuan: "-",
                        jenisobject : "textbox"
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
                if(jsonSave.data.length == 0){
                    window.messageContainer.error('Data belum di isi !!!');
                }else{
                    ManagePhp.saveData(jsonSave).then(function(e) {
                        $scope.getDataAlergi()
                         ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Alergi').then(function (res) {
                          })
                    });
                }
            };
        }
    ]);
});