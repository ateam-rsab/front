define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('TandaVitalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
        
            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "PemeriksaanKesehatan");

            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            debugger;
            $scope.title = "Tanda Vital";
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuSkrining = true;
            $scope.noCM = $state.params.noCM;
            $scope.dataVOloaded = true;
            $scope.now = new Date();

            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            // if ($state.params.noRec !== undefined) {
            //     findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
            //         $scope.pasien = e.data.data;
            //     });
            // }
            $scope.isKesadaranTerganggu = false;
            $scope.$watch('item.kesadaran', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ya") {
                        $scope.isKesadaranTerganggu = true;
                    } else {
                        $scope.isKesadaranTerganggu = false;

                    }
                }
            });

            //scope tekanan darah
            $scope.td = {};
            $scope.TotalSkor = function() {
                return parseInt($scope.GCS.E) + parseInt($scope.GCS.M) + parseInt($scope.GCS.V)

            }
            //scope variabe untuk GCS
            $scope.GCS = {};
            $scope.GCS.E = 4;
            $scope.GCS.M = 2;
            $scope.GCS.V = 4;

            $scope.item = {};
            $scope.item.noRec = "";

            $scope.arrTandaVital = [
                // { "name": "Berat Badan", "nilai": "", "type": "", "ket": "Kg", "noRec": "" },
                { "name": "Suhu", "nilai": "", "type": "numeric", "ket": "'C", "noRec": "" },
                { "name": "Nadi", "nilai": "", "type": "", "ket": "x/menit", "noRec": "" },
                { "name": "Pernapasan", "nilai": "", "type": "", "ket": "x/menit", "noRec": "" },
                { "name": "Tekanan Darah", "nilai": "", "type": "", "ket": "mmHg", "noRec": "" }
            ];

            $q.all([ModelItem.getDataDummyGeneric("StatusYaTidak", false),
                ModelItem.getDataDummyGeneric("DataTandaVital", false),
                ModelItem.get("PemeriksaanFisikTandaVital"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {
                debugger;
                if (data[0].statResponse)
                    $scope.listStatusKesadaran = data[0];

                if (data[1].statResponse)
                    $scope.DataTandaVital = data[1];

                if (data[2].statResponse) {
                    $scope.item = data[2];
                    $scope.item.noRec = "";
                }

                if (data[3].statResponse) {
                    debugger;
                    $rootScope.currentPasien = data[3].data.data;
                    // $scope.pasien = data[3].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                // getDataCurentPasien();
            });

            // function getDataCurentPasien() {
            //     debugger;
            //     findPasien.getTandaVital($state.params.noRec).then(function(e) {
            //         debugger;
            //         if (e.data.data.dataFound) {
            //             debugger;
            //             $scope.item.rasioksigen = e.data.data.papTandaVital.rasiOksigen;
            //             $scope.item.PapTandaVital = e.data.data.papTandaVital;
            //             $scope.item.noRec = $scope.item.PapTandaVital.noRec;
            //             /*$scope.item.kesadaran = e.data.data.kesadaran;*/
                        

            //             $scope.arrTandaVital = ModelItem.setTandaVitalCurrentData($scope.item.PapTandaVital.papDataTandaVitalSet, $scope.arrTandaVital);
            //             var arr = $scope.item.PapTandaVital.gcs.split(';');
            //             $scope.GCS.E = arr[0].substring(1);
            //             $scope.GCS.M = arr[1].substring(1);
            //             $scope.GCS.V = arr[2].substring(1);
            //             $scope.item.kesadaran = $scope.listStatusKesadaran[1];
            //             // debugger;
            //         }
            //     });
            // };
            $scope.getdataVital=function(){
                var noCm = $state.params.noCM;
                var tglAwal = "";
                var tglAkhir = "";
                var status = 0;
                findPasien.getTandaVitals(noCm, tglAwal, tglAkhir, status).then(function(e) {
                    $scope.dataTandaVital = e.data[0];
                    if (e.data.length !== 0){
                        $scope.arrTandaVital[0].nilai=$scope.dataTandaVital.suhu;
                        $scope.arrTandaVital[1].nilai=$scope.dataTandaVital.nadi;
                        $scope.arrTandaVital[2].nilai=$scope.dataTandaVital.pernapasan;
                        $scope.arrTandaVital[3].nilai=$scope.dataTandaVital.tekananDarah;

                    } else {
                        $scope.arrTandaVital[0].nilai="";
                        $scope.arrTandaVital[1].nilai="";
                        $scope.arrTandaVital[2].nilai="";
                        $scope.arrTandaVital[3].nilai="";
                    }
                })
            };
           $scope.getdataVital();

            $scope.Save = function() {
                // $scope.item.TekananDarah = $scope.td.tekananDarah1 + "/" + $scope.td.tekananDarah2;
                // if ($scope.item.kesadaran.name == "Ya") {
                //     $scope.item.GCS = "E" + $scope.GCS.E + ";M" + $scope.GCS.M + ";V" + $scope.GCS.V;
                // }

                // $scope.item.tandaVital = ModelItem.setTandaVitalForSend($scope.DataTandaVital, $scope.arrTandaVital);
                if ($scope.dataTandaVital) {
                    var data = {
                        "noRec": $scope.dataTandaVital.noRec,
                        "tglInput": $scope.dataTandaVital.tglInput,
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "suhu": $scope.arrTandaVital[0].nilai,
                        "nadi": $scope.arrTandaVital[1].nilai,
                        "pernapasan": $scope.arrTandaVital[2].nilai,
                        "tekananDarah" : $scope.arrTandaVital[3].nilai
                    }
                    
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        // debugger;
                        // $scope.kajianAwal.tandaVital = e.data;
                        // cacheHelper.set("kajianAwal", $scope.kajianAwal);
                        // $scope.isNext = true;
                    });
                } else {
                    var data = {
                        "tglInput": new Date(),
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "suhu": $scope.arrTandaVital[0].nilai,
                        "nadi": $scope.arrTandaVital[1].nilai,
                        "pernapasan": $scope.arrTandaVital[2].nilai,
                        "tekananDarah" : $scope.arrTandaVital[3].nilai
                    }
                    
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        // debugger;
                        // $scope.kajianAwal.tandaVital = e.data;
                        // cacheHelper.set("kajianAwal", $scope.kajianAwal);
                        // $scope.isNext = true;
                    });

                }
            };
            $scope.Next = function() {
                $rootScope.next();
            }
        }
    ]);
});