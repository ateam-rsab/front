define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarPasienLayananMedikRawatJalanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'CacheHelper', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, ManagePasien, findPasien, cacheHelper, dateHelper) {
            $rootScope.showMenu = false;
            $scope.noCM = $state.params.noCM;
            $scope.noRec = $state.params.noRec;
            $scope.listDetailData = [];
            $scope.selectedIndex = -1;
            $scope.isDetail = false;
            $rootScope.showMenuPengkajianMedis = false;
            $scope.descDay = dateHelper.DescDay;
            $scope.Day = dateHelper.DescDay;
            $scope.statusCode = ModelItem.getStatusUser();
            
            $scope.now = new Date();
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data.data;
                $scope.pasien = data.data.data;
                $scope.item = data.data.data;

            });
            findPasien.getPelayananByNoCM($scope.noCM).then(function(data) {
                debugger;
                if (data.statResponse) {
                    
                    var temp = []
                    data.data = ModelItem.beforePost(data.data);
                    for (var key in data.data) {
                        if (data.data.hasOwnProperty(key)) {
                            debugger;
                            /*var element = data.data[key];
                            element.tanggal = new Date(element.tanggal);
                            temp.push(element);*/
                            var element = data.data[key];
                            $scope.tanggal = new moment(element.tanggal).format('YYYY-MM-DD HH:mm:ss');
                            var jam = moment(element.tanggal).format('HH:mm:ss');
                            var headDiagnosa = "";
                            var headDiagnosaTindakan = "";
                            var tindakanHead = "";

                            // var arr = element.tanggal.split(' ')[0].split('/');
                            // element.tanggal = new Date(arr[2], arr[1] - 1, arr[0]);
                            for (var j in element.diagnosa) {
                                if (element.diagnosa.hasOwnProperty(j)) {
                                    var diagnosa = element.diagnosa[j];
                                    for (var k in diagnosa.diagnosis) {
                                        if (diagnosa.diagnosis.hasOwnProperty(k)) {
                                            var diagnosis = diagnosa.diagnosis[k];
                                            if (headDiagnosa === "") {
                                                headDiagnosa += diagnosis.diagnosa.namaDiagnosa;
                                            } else
                                                headDiagnosa += "," + diagnosis.diagnosa.namaDiagnosa;
                                        }
                                    }
                                }
                            }   
                            debugger;
                            for (var x in element.tindakan) {
                                if (element.tindakan.hasOwnProperty(x)) {
                                    var tindakan = element.tindakan[x];
                                    for (var y in tindakan.diagnosisTindakan) {
                                        if (tindakan.diagnosisTindakan.hasOwnProperty(y)) {
                                            var tindakan = tindakan.diagnosisTindakan[y];
                                            if (headDiagnosaTindakan === "") {
                                                headDiagnosaTindakan += tindakan.diagnosaTindakan.diagnosaTindakan.namaDiagnosa;
                                            } else
                                                headDiagnosaTindakan += "," + tindakan.diagnosaTindakan.diagnosaTindakan.namaDiagnosa;
                                        }
                                    }
                                }
                            }   
                            element.jam = jam;
                            element.diagnosaHeader = headDiagnosa;
                            element.tindakanHead = headDiagnosaTindakan;
                            temp.push(element);
                        }
                    }
                    temp = _.sortBy(temp, function(num) {
                        var arr = num.tanggal;
                        return (parseInt(arr.getDate()) + parseInt(arr.getMonth()) * 31 + parseInt(arr.getYear()) * 365);
                    });
                    var lastKajian = _.filter(temp, {
                        isKajianAwal: true
                    });
                    var isKajianAwal = false;
                    if (lastKajian.length > 0) {
                        var different = new Date() - lastKajian[0].tanggal;
                        different = different / (1000 * 60 * 60 * 24 * 30);
                        if (different > 13) {
                            isKajianAwal = true;
                        }
                    } else {
                        isKajianAwal = true;
                    }
                    // temp.push({
                    //     tanggal: new Date(),
                    //     display: moment().format('DD MMM'),
                    //     isKajianAwal: isKajianAwal
                    // });
                    temp = _.sortBy(temp, function(num) {
                        var arr = num.tanggal;
                        return (parseInt(arr.getDate()) + parseInt(arr.getMonth()) * 31 + parseInt(arr.getYear()) * 365) * -1;
                    });
                    debugger;
                    $scope.listTimeLine = temp;
                    $scope.selectedDate = data.data[data.data.length - 1];

                }
            });
            $scope.showDetailSoap = function(data) {

                $scope.isHideSoap = true;
                $scope.getDetailSoap();
            }

            $scope.getDetailSoap=function(){
                findPasien.getDetailSoap($scope.noRec).then(function(data){
                    var temp = []
                    data.data.data.soapSet = ModelItem.beforePost(data.data.data.soapSet);
                    for (var key in data.data.data.soapSet) {
                        if (data.data.data.soapSet.hasOwnProperty(key)) {
                            debugger;
                            /*var element = data.data[key];
                            element.tanggal = new Date(element.tanggal);
                            temp.push(element);*/
                            var element = data.data.data.soapSet[key];
                            $scope.tanggal = new moment(element.tglInput).format('YYYY-MM-DD HH:mm:ss')
                            $scope.day = new moment(element.tglInput).format('DD');
                            $scope.date = new moment(element.tglInput).format('DD');
                            $scope.month = new moment(element.tglInput).format('MMMM YYYY');
                            $scope.hour = new moment(element.tglInput).format('HH:mm:ss');
                            // var verif= element.isVerifikasi;
                            // if(verif===null){
                            //     $scope.verifikasi=true;
                            //     $scope.verifi=false;
                            // }else{
                            //     $scope.verifikasi=false;
                            //     $scope.verifi=true;
                            // }
                            temp.push(element);
                        }
                    }
                    $scope.listSoap = temp;
                });
            }

            $scope.verifikasi=function(object){
                debugger;
                var data = {
                    "tglInput": object.tglInput,
                    "noRec": object.noRec,
                    "s": object.s,
                    "o": object.o,
                    "a": object.a,
                    "p": object.p,
                    "pasienDaftar":{  
                      "noRec": object.pasienDaftar.noRec
                   },
                   "pegawai":{  
                      "id":object.pegawai.id
                   },
                    "isVerifikasi": true
                };
                console.log(JSON.stringify(data)); 
                ManagePasien.saveSOAPMedik(data,"soap/save-soap/").then(function(e) {
                })
                $scope.refresh();
            }

            $scope.refresh = function() {
              /*$route.reload('#/DetailRKAKL');*/
              location.reload();
              /*$scope.item = "";*/

            }
        }
    ]);
});