define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasterEvaluasiJabatanCtrl', ['ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope',
        function(managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, $state, $rootScope, $scope) {
            //get data jabatan
          $scope.listData={};
          $scope.item = {};
            findPegawai.getJabatan().then(function(result) {
                 
                $scope.listData = result.data.data.data;
                
            })
             function getListFaktor(listFaktor, idfaktor){
                var faktorItem={};
                for (var key in listFaktor) {
                    if (listFaktor.hasOwnProperty(key)) {
                        var element = listFaktor[key];
                        if (element.id == idfaktor){
                            faktorItem= element;
                            break;
                        }
                    }
                }
                return faktorItem;
            }
           
            $scope.choose = function(item) {
                $scope.item = item;
                //reset data field
                 $scope.totalNilaiJabatan="";
                //Ambil data faktor dari database
                manageSdm.findDatafaktorEvaluasiJabatan(item.id,$scope.selectedBulan.name,$scope.selectedTahun.id).then(function(result) {
                   //debugger;
                  
                   // $scope.listData = result.data.data.data;
                    $scope.item.faktor1 = result.data.data.data[0].faktor1;
                    $scope.item.faktor2 = result.data.data.data[0].faktor2;
                    $scope.item.faktor3 = result.data.data.data[0].faktor3;
                    $scope.item.faktor4 = result.data.data.data[0].faktor4;
                    $scope.item.faktor5 = result.data.data.data[0].faktor5;
                    $scope.item.faktor6 = result.data.data.data[0].faktor6;
                    $scope.item.faktor7 = result.data.data.data[0].faktor7;
                    $scope.item.faktor8 = result.data.data.data[0].faktor8;
                    $scope.item.faktor9 = result.data.data.data[0].faktor9;
                    $scope.item.faktor10 = result.data.data.data[0].faktor10;

                    $scope.item.faktorA = result.data.data.data[0].faktorA;
                    $scope.item.faktorB = result.data.data.data[0].faktorB;
                    $scope.item.faktorC = result.data.data.data[0].faktorC;
                    $scope.item.faktorD = result.data.data.data[0].faktorD;
                    $scope.item.faktorE = result.data.data.data[0].faktorE;
                    $scope.item.faktorF = result.data.data.data[0].faktorF;
                    $scope.item.faktorG = result.data.data.data[0].faktorG;
                    $scope.item.faktorH = result.data.data.data[0].faktorH;
                    $scope.item.faktorI = result.data.data.data[0].faktorI;
                    $scope.item.faktorJ = result.data.data.data[0].faktorJ;
                    $scope.item.faktorK = result.data.data.data[0].faktorK;
                    $scope.item.faktorL = result.data.data.data[0].faktorL;
                    $scope.item.noRec=result.data.data.data[0].noRec;
                });
            }

            $scope.listFaktor = [];
            modelItem.getDataDummyGeneric('MapFaktorEvaluasi').then(function(e) {
                $scope.map = e;
                modelItem.getDataDummyGeneric('FaktorEvaluasi').then(function(e) {
                    var arr = _.groupBy(e, "faktor");
                    var temp = [];
                    for (var key in arr) {
                        if (arr.hasOwnProperty(key)) {
                            var element = arr[key];
                            temp.push(key);
                        }
                    }
                    //debugger;
                    $scope.listFaktor = arr;
                    $scope.listFaktorA = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        //console.log(e);
                        return e.profile.indexOf('A') >= 0;
                        //debugger;
                    })
                    $scope.listFaktorB = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('B') >= 0;
                    })
                    $scope.listFaktorC = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('C') >= 0;
                    })
                    $scope.listFaktorD = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('D') >= 0;
                    })
                    $scope.listFaktorE = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('E') >= 0;
                    })
                    $scope.listFaktorF = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('F') >= 0;
                    })
                    $scope.listFaktorG = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('G') >= 0;
                    })
                    $scope.listFaktorH = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('H') >= 0;
                    })
                    $scope.listFaktorI = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('I') >= 0;
                    })
                    $scope.listFaktorJ = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('J') >= 0;
                    })
                    $scope.listFaktorK = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('K') >= 0;
                    })
                    $scope.listFaktorL = _.filter($scope.listFaktor['Faktor 6'], function(e) {
                        return e.profile.indexOf('L') >= 0;
                    })
                })
            });

            $scope.listTahun = [];
            for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({ id: i });
            $scope.listMonth = [];
            for (var i = 0; i <= 11; i++)
                $scope.listMonth.push({
                    id: i,
                    name: dateHelper.toMonth(i)
                });
             
            $scope.$watch('selectedTahun', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            });
            $scope.$watch('selectedBulan', function(e) {
                if (e === undefined) return;

                $scope.refresh();
            });
            $scope.selectedBulan = $scope.listMonth[new Date().getMonth()];
            $scope.selectedTahun = $scope.listTahun[$scope.listTahun.length - 1];
            $scope.Save = function() {

                for (var key in $scope.listData) {
                    if ($scope.listData.hasOwnProperty(key)) {
                        var element = $scope.listData[key];
                        element.tahun = $scope.selectedTahun.id;
                        element.bulan = $scope.selectedBulan.name;
                        var id= element.id;
                        var namaJabatan=element.namaJabatan;
                        delete element.id;
                        delete element.namaJabatan;
                        element.jabatan = {"id": id,"namaJabatan":namaJabatan};
                        element.totalNilai=$scope.totalNilaiJabatan;
                    }
                }
                var arr = [];
                 for (var key in $scope.listData) {
                    if ($scope.listData.hasOwnProperty(key)) {
                        var element = $scope.listData[key];
                        
                        if (element.faktor1 !== undefined)
                            arr.push(element);
                    }
                }
                manageSdm.saveMasterEvaluasiJabatan(modelItem.beforePost(arr[0])).then(function(e) {
                    $scope.temp = "";
                    $scope.refresh();

                });
            };
            $scope.Hitung=function(){
                
                var arrayFaktor=[];             
                //86
                
                arrayFaktor.push({  "faktorA":getListFaktor($scope.listFaktorA,$scope.item.faktorA.id),
                                    "faktorB":getListFaktor($scope.listFaktorB,$scope.item.faktorB.id),
                                    "faktorC":getListFaktor($scope.listFaktorC,$scope.item.faktorC.id),
                                    "faktorD":getListFaktor($scope.listFaktorD,$scope.item.faktorD.id),
                                    "faktorE":getListFaktor($scope.listFaktorE,$scope.item.faktorE.id),
                                    "faktorF":getListFaktor($scope.listFaktorF,$scope.item.faktorF.id),
                                    "faktorG":getListFaktor($scope.listFaktorG,$scope.item.faktorG.id),
                                    "faktorH":getListFaktor($scope.listFaktorH,$scope.item.faktorH.id),
                                    "faktorI":getListFaktor($scope.listFaktorI,$scope.item.faktorI.id),
                                    "faktorJ":getListFaktor($scope.listFaktorJ,$scope.item.faktorJ.id),
                                    "faktorK":getListFaktor($scope.listFaktorK,$scope.item.faktorK.id),
                                    "faktorL":getListFaktor($scope.listFaktorL,$scope.item.faktorL.id),
                                    


                                    "faktor1":$scope.item.faktor1,
                                    "faktor2":$scope.item.faktor2,
                                    "faktor3":$scope.item.faktor3,
                                    "faktor4":$scope.item.faktor4,
                                    "faktor5":$scope.item.faktor5,
                                    "faktor6":$scope.item.faktor6,
                                    "faktor7":$scope.item.faktor7,
                                    "faktor8":$scope.item.faktor8,
                                    "faktor9":$scope.item.faktor9,
                                    "faktor10":$scope.item.faktor10
                                    });


                
                 if (arrayFaktor[0] === undefined || arrayFaktor[0] === null){
                    return;
                }
                //console.log(JSON.stringify(arrayFaktor[0]));
               // debugger;
                 manageSdm.hitungMasterEvaluasiJabatan(modelItem.beforePost(arrayFaktor[0])).then(function(e) {
                   $scope.totalNilaiJabatan= Math.ceil( e.data.data.result);
                     //console.log( e.data.data.result);
                   
                });
            };
             //Tombol Batal
            $scope.Back = function(){
                $scope.item={};
            };
            $scope.refresh = function() {
                $scope.total = 0;
                if ($scope.selectedBulan === undefined || $scope.selectedTahun === undefined ) {
                    return;
                }
                if ( $scope.selectedTahun.id + "" + $scope.selectedBulan.id === $scope.temp)
                    return;
                $rootScope.doneLoad = false;
                $scope.temp =  $scope.selectedTahun.id + "" + $scope.selectedBulan.id;
                $scope.listData = [];
                $scope.temp =  $scope.selectedTahun.id + "" + $scope.selectedBulan.id;
                $rootScope.doneLoad = false;
                findPegawai.getJabatan().then(function(e) {
                    var arr = [];
                    $rootScope.doneLoad = true;
                    for (var i = 0; i < e.data.data.data.length; i++) {
                        var element = e.data.data.data[i];
                        element.jadwal = undefined;
                        element.faktor6 = $scope.listFaktor['Faktor 6'][0];
                        element.idPegawai = undefined;
                        arr.push(element);
                    }

                    $scope.listData = arr;
                    findPegawai.getDataEvaluasi($scope.data.ruangan.id, $scope.selectedTahun.id).then(function(e) {
                        for (var key in $scope.listData) {
                            if ($scope.listData.hasOwnProperty(key)) {
                                var element = $scope.listData[key];
                                for (var i in e.data.data.items) {
                                    if (e.data.data.items.hasOwnProperty(i)) {
                                        var subElement = e.data.data.items[i];
                                        if (subElement.pegawai.id === element.pegawai.id) {
                                            element.faktor1 = subElement.faktor1;
                                            element.faktor2 = subElement.faktor2;
                                            element.faktor3 = subElement.faktor3;
                                            element.faktor4 = subElement.faktor4;
                                            element.faktor5 = subElement.faktor5;
                                            element.faktor6 = subElement.faktor6;
                                            element.faktor7 = subElement.faktor7;
                                            element.faktor8 = subElement.faktor8;
                                            element.faktor9 = subElement.faktor9;
                                            element.faktor10 = subElement.faktor10;

                                            element.faktorA = subElement.faktorA;
                                            element.faktorB = subElement.faktorB;
                                            element.faktorC = subElement.faktorC;
                                            element.faktorD = subElement.faktorD;
                                            element.faktorE = subElement.faktorE;
                                            element.faktorF = subElement.faktorF;
                                            element.faktorG = subElement.faktorG;
                                            element.faktorH = subElement.faktorH;
                                            element.faktorI = subElement.faktorI;
                                            element.faktorJ = subElement.faktorJ;
                                            element.faktorK = subElement.faktorK;
                                            element.faktorL = subElement.faktorL;
                                            element.noRec = subElement.noRec;
                                        }
                                    }
                                }
                            }
                        }
                    })
                });
            }
        }

    ])
});