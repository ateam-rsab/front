define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SkriningGiziNeoCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
		function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) 
		{
			debugger;
			$scope.dataForm = {};
			var isNotClick = true;
			$scope.isRawatInap = window.isRawatInap;
			// if ($scope.isRawatInap === undefined)
			// 	$scope.isRawatInap = true;
			// console.log(JSON.stringify($scope.isRawatInap));
			// debugger;
			$rootScope.showMenuPengkajianMedis = false;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;
			$scope.pasien = {};
			$scope.item = {};
			var date = new Date();
            $scope.arrSkriningGiziNeo = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "gram", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" }
            ];
			/*$scope.item.tglInputData = date;*/
			$scope.now = date;
            ModelItem.getDataDummyGeneric("DataTandaVital", false).then(function(data){
                debugger;
                $scope.DataTandaVital = data
            })
            $scope.setSkriningGiziCurrentData = function(listDataSkriningGizi, arrSkriningGizi) {
                 for (var i = 8; i < listDataSkriningGizi.length; i++) {
                     for (var j = 0; j < arrSkriningGizi.length; j++) {
                         if (listDataSkriningGizi[i].dataSkriningGizi.name == arrSkriningGizi[j].name) {
                             arrSkriningGizi[j].nilai = listDataSkriningGizi[i].nilai;
                             arrSkriningGizi[j].noRec = listDataSkriningGizi[j].noRec;
                         }
                     }
                 }
                 return arrSkriningGizi;
             };

            $scope.setSkriningGiziForSend = function(masterSkriningGizi, arrSkriningGizi) {
                debugger;
                 var listDataSkriningGizi = [];
                 for (var i = 8; i < masterSkriningGizi.length; i++) {

                     var nilai = "";
                     var noRec = "";
                     var objDataSkriningGizi = "";

                     for (var j = 0; j < arrSkriningGizi.length; j++) {
                         if (arrSkriningGizi[j].name == masterSkriningGizi[i].name) {
                             noRec = arrSkriningGizi[j].noRec;
                             nilai = arrSkriningGizi[j].nilai;
                             break;
                         }
                     }

                     if (masterSkriningGizi[i] != "") {
                         var obj = {
                             "noRec": noRec,
                             "nilai": nilai,
                             "dataSkriningGizi": masterSkriningGizi[i]
                         }

                         listDataSkriningGizi.push(obj);
                     }
                 }

                 return listDataSkriningGizi;
            };

            $scope.DataSourceSkriningGizi=function(){
                var noCm = $state.params.noCM;
                var tglAwal = "";
                var tglAkhir = "";
                var status = 2;

                findPasien.getTandaVitals(noCm, tglAwal, tglAkhir, status).then(function(e) {
                    debugger;
                    var dataSkriningGizi = e.data[0];
                    $scope.arrSkriningGiziNeo[0].nilai=dataSkriningGizi.beratBadan;
                    $scope.arrSkriningGiziNeo[1].nilai=dataSkriningGizi.tinggiBadan;
                    $scope.arrSkriningGiziNeo[2].nilai=dataSkriningGizi.lingkarKepala;
                    
                    $scope.dataSkriningGizi = e.data;
                    $scope.sourceSkriningGizi = new kendo.data.DataSource({
                        pageSize: 10,
                        data:$scope.dataSkriningGizi
                    });
                })
            };
            $scope.DataSourceSkriningGizi();
            $scope.Save = function() {
                debugger;
                // $scope.item.TekananDarah = $scope.td.tekananDarah1 + "/" + $scope.td.tekananDarah2;
                $scope.item.skriningGizi = $scope.setSkriningGiziForSend($scope.DataTandaVital, $scope.arrSkriningGiziNeo);
                    
                var beratBadan = $scope.item.skriningGizi[0].nilai;
                var tinggiBadan = $scope.item.skriningGizi[1].nilai;
                var lingkarKepala = $scope.item.skriningGizi[2].nilai;
                if($scope.dataSkriningGizi){
                    debugger;
                    var tglInput;
                    if ($scope.dataSkriningGizi[0].tglInput === null) {
                        tglInput = dateHelper.getPeriodeFormatted(new Date());
                    } else {
                        tglInput =$scope.dataSkriningGizi[0].tglInput
                    }

                    var data = {
                        "noRec": $scope.dataSkriningGizi[0].noRec,
                        "tglInput": tglInput,
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "beratBadan": beratBadan,
                        "tinggiBadan": tinggiBadan,
                        "lingkarKepala": lingkarKepala
                    }
                    // console.log(JSON.stringify(data));
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        $scope.DataSourceSkriningGizi();
                    });
                }else{
                    debugger;
                    var data = {
                    "noRec":  null,
                    "pasienDaftar":{
                        "noRec": $state.params.noRec
                    },
                    "beratBadan": beratBadan,
                    "tinggiBadan": tinggiBadan,
                    "lingkarKepala": lingkarKepala
                    }
                    // console.log(JSON.stringify(data));
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        $scope.DataSourceSkriningGizi();
                    });
                }
            }
		}
	]);
});