define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ProsedurKeselamatanCtrl', ['$rootScope', '$scope', '$state', 'CacheHelper', 'ManagePhp','ModelItemAkuntansi',
        function ($rootScope, $scope, $state, cacheHelper, ManagePhp,modelItemAkuntansi) {

            $scope.item = {};
            $scope.cc = {};
            var namaEMR = ''
            var nomorEMR = ''
            $scope.tombolSimpanVis = true
            var dataLoad = []

            // nomorEMR = $state.params.nomorEMR
            nomorEMR = '-'
            var chacePeriode = cacheHelper.get('cacheNomorEMR');
            if(chacePeriode != undefined){
                nomorEMR = chacePeriode[0]
            }

            if (nomorEMR == '-') {
                ManagePhp.getData("rekam-medis/get-rekam-medis-dynamic?emrid=" + $state.params.namaEMR).then(function (e) {
                    $scope.listData = e.data
                    $scope.item.title = e.data.title
                    $scope.item.classgrid = e.data.classgrid
                    
                    $scope.cc.emrfk = $state.params.namaEMR
                    $scope.item.objcbo = []
                    for (var i = e.data.kolom1.length - 1; i >= 0; i--) {
                        if (e.data.kolom1[i].cbotable != null) {
                            modelItemAkuntansi.getDataDummyPHP2(e.data.kolom1[i].id,e.data.kolom1[i].cbotable, true, true, 20).then(function(data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom1[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom1[i].child[ii].cbotable != null) {
                                modelItemAkuntansi.getDataDummyPHP2(e.data.kolom1[i].child[ii].id,e.data.kolom1[i].child[ii].cbotable, true, true, 20).then(function(data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    
                    for (var i = e.data.kolom2.length - 1; i >= 0; i--) {
                        if (e.data.kolom2[i].cbotable != null) {
                            modelItemAkuntansi.getDataDummyPHP2(e.data.kolom2[i].id,e.data.kolom2[i].cbotable, true, true, 20).then(function(data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom2[i].child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom2[i].child[ii].cbotable != null) {
                                modelItemAkuntansi.getDataDummyPHP2(e.data.kolom2[i].child[ii].id,e.data.kolom2[i].child[ii].cbotable, true, true, 20).then(function(data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    for (var i = e.data.kolom3.length - 1; i >= 0; i--) {
                        if (e.data.kolom3[i].cbotable != null) {
                            modelItemAkuntansi.getDataDummyPHP2(e.data.kolom3[i].id,e.data.kolom3[i].cbotable, true, true, 20).then(function(data) {
                                $scope.item.objcbo[data.options.idididid] = data
                            })
                        }
                        for (var ii = e.data.kolom3.child.length - 1; ii >= 0; ii--) {
                            if (e.data.kolom3[i].child[ii].cbotable != null) {
                                modelItemAkuntansi.getDataDummyPHP2(e.data.kolom3[i].child[ii].id,e.data.kolom3[i].child[ii].cbotable, true, true, 20).then(function(data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                        }
                    }
                    
                })
            }else{
                var chekedd = false
                // ManagePhp.getData("rekam-medis/get-emr-transaksi-detail?noemr="+$state.params.nomorEMR, true).then(function(dat){
                    ManagePhp.getData("rekam-medis/get-rekam-medis-dynamic?emrid=" + $state.params.namaEMR).then(function (e) {
                        $scope.listData = e.data
                        $scope.item.title = e.data.title
                        $scope.item.classgrid = e.data.classgrid
                        
                        $scope.cc.emrfk = $state.params.namaEMR

                        $scope.item.objcbo = []
                        for (var i = e.data.kolom1.length - 1; i >= 0; i--) {
                            if (e.data.kolom1[i].cbotable != null) {
                                modelItemAkuntansi.getDataDummyPHP2(e.data.kolom1[i].id,e.data.kolom1[i].cbotable, true, true, 20).then(function(data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                            for (var ii = e.data.kolom1[i].child.length - 1; ii >= 0; ii--) {
                                if (e.data.kolom1[i].child[ii].cbotable != null) {
                                    modelItemAkuntansi.getDataDummyPHP2(e.data.kolom1[i].child[ii].id,e.data.kolom1[i].child[ii].cbotable, true, true, 20).then(function(data) {
                                        $scope.item.objcbo[data.options.idididid] = data
                                    })
                                }
                            }
                        }
                        for (var i = e.data.kolom2.length - 1; i >= 0; i--) {
                            if (e.data.kolom2[i].cbotable != null) {
                                modelItemAkuntansi.getDataDummyPHP2(e.data.kolom2[i].id,e.data.kolom2[i].cbotable, true, true, 20).then(function(data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                            for (var ii = e.data.kolom2[i].child.length - 1; ii >= 0; ii--) {
                                if (e.data.kolom2[i].child[ii].cbotable != null) {
                                    modelItemAkuntansi.getDataDummyPHP2(e.data.kolom2[i].child[ii].id,e.data.kolom2[i].child[ii].cbotable, true, true, 20).then(function(data) {
                                        $scope.item.objcbo[data.options.idididid] = data
                                    })
                                }
                            }
                        }
                        for (var i = e.data.kolom3.length - 1; i >= 0; i--) {
                            if (e.data.kolom3[i].cbotable != null) {
                                modelItemAkuntansi.getDataDummyPHP2(e.data.kolom3[i].id,e.data.kolom3[i].cbotable, true, true, 20).then(function(data) {
                                    $scope.item.objcbo[data.options.idididid] = data
                                })
                            }
                            for (var ii = e.data.kolom3.child.length - 1; ii >= 0; ii--) {
                                if (e.data.kolom3[i].child[ii].cbotable != null) {
                                    modelItemAkuntansi.getDataDummyPHP2(e.data.kolom3[i].child[ii].id,e.data.kolom3[i].child[ii].cbotable, true, true, 20).then(function(data) {
                                        $scope.item.objcbo[data.options.idididid] = data
                                    })
                                }
                            }
                        }
                        ManagePhp.getData("rekam-medis/get-emr-transaksi-detail?noemr="+nomorEMR+"&emrfk="+$scope.cc.emrfk, true).then(function(dat){
                            $scope.item.obj = []
                            $scope.item.obj2 = []
                            dataLoad = dat.data.data
                            for (var i = 0; i <= dataLoad.length - 1; i++) {
                                if (parseFloat($scope.cc.emrfk)  == dataLoad[i].emrfk) {
                                    if(dataLoad[i].type == "textbox") {
                                        $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                    }
                                    if(dataLoad[i].type == "checkbox") {
                                        chekedd = false
                                        if (dataLoad[i].value == '1') {
                                            chekedd = true
                                        }
                                        $scope.item.obj[dataLoad[i].emrdfk] = chekedd
                                    }

                                    if(dataLoad[i].type == "datetime") {
                                        $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                                    }
                                    if(dataLoad[i].type == "time") {
                                        $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                                    }
                                    if(dataLoad[i].type == "date") {
                                        $scope.item.obj[dataLoad[i].emrdfk] = new Date(dataLoad[i].value)
                                    }

                                    if(dataLoad[i].type == "checkboxtextbox") {
                                        $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                        $scope.item.obj2[dataLoad[i].emrdfk] = true
                                    }
                                    if(dataLoad[i].type == "textarea") {
                                        $scope.item.obj[dataLoad[i].emrdfk] = dataLoad[i].value
                                    }
                                    if(dataLoad[i].type == "combobox") {
                                        var str = dataLoad[i].value
                                        var res = str.split("~");
                                        // $scope.item.objcbo[dataLoad[i].emrdfk]= {value:res[0],text:res[1]}
                                        $scope.item.obj[dataLoad[i].emrdfk] = {value:res[0],text:res[1]}

                                    }
                                }
                                
                            }
                        })
                        

                        // for (var i = 0; i < dat.data.data.length - 1; i++) {
                        //     switch(dat.data.data[i].type) {
                        //       case "textbox":
                        //         this.item.obj[dat.data.data[i].emrdfk] = dat.data.data[i].value
                        //         // $scope.item.obj[dat.data.data[i].emrdfk] = dat.data.data[i].value
                        //         // break;
                                
                        //         // break;
                        //       default:
                        //         // code block
                        //     }
                        // }
                    // })
                    
                    
                });
            }
            

             
            // 0: $scope.header.nocm,
            // 1: $scope.header.namapasien,
            // 2: $scope.header.jeniskelamin,
            // 3: $scope.header.noregistrasi,
            // 4: $scope.header.umur,
            // 5: $scope.header.kelompokpasien,
            // 6: $scope.header.tglregistrasi,
            // 7: $scope.header.norec,
            // 8: $scope.header.norec_pd,
            // 9: $scope.header.objectkelasfk,
            // 10: $scope.header.namakelas,
            // 11: $scope.header.objectruanganfk,
            // 12: $scope.header.namaruangan,
            // 13: $scope.header.DataNoregis

            var chacePeriode = cacheHelper.get('cacheRekamMedis');
            if(chacePeriode != undefined){
                $scope.cc.nocm = chacePeriode[0]
                $scope.cc.namapasien = chacePeriode[1]
                $scope.cc.jeniskelamin = chacePeriode[2]
                $scope.cc.noregistrasi = chacePeriode[3]
                $scope.cc.umur = chacePeriode[4]
                $scope.cc.kelompokpasien = chacePeriode[5]
                $scope.cc.tglregistrasi = chacePeriode[6]
                $scope.cc.norec = chacePeriode[7]
                $scope.cc.norec_pd = chacePeriode[8]
                $scope.cc.objectkelasfk = chacePeriode[9]
                $scope.cc.namakelas =chacePeriode[10]
                $scope.cc.objectruanganfk =chacePeriode[11]
                $scope.cc.namaruangan =chacePeriode[12]  
                $scope.cc.DataNoregis =chacePeriode[12]  
                if (nomorEMR == '') {
                    $scope.cc.norec_emr = ''
                }else{
                    $scope.cc.norec_emr = nomorEMR       
                }
            }


            $scope.txt_change = function(index){
                $scope.item.txt[index] = "asdasdad"
            };
            $scope.kembali = function(){
                
            }


             $scope.checkClick = function(data) {
                // var index = $scope.currentKelainan.indexOf(data);
                // if (_.filter($scope.currentKelainan, {
                //         id: data.id
                //     }).length === 0)
                //     $scope.currentKelainan.push(data);
                // else {
                //     $scope.currentKelainan.splice(index, 1);
                // }
                
            }
            

            $scope.getdata = function () {
                var objectfk = "KLU";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
                    + '&riwayatfk=' + $scope.noRecPap).then(function (e) {
                        $scope.dataEdukasi = e.data.data;
                        if ($scope.dataEdukasi.length != 0) {
                            for (var i = 0; i < $scope.dataEdukasi.length; i++) {
                                if ($scope.dataEdukasi[i].objectfk == "KLU-000001") {
                                    $scope.noRec = $scope.dataEdukasi[i].norec
                                    $scope.item.keluhanUtama = $scope.dataEdukasi[i].nilai
                                }
                            }
                        }
                    })
            }
            // $scope.getdata();

            $scope.Save = function () {
                var arrobj = Object.keys($scope.item.obj)
                var arrSave = []
                for (var i = arrobj.length - 1; i >= 0; i--) {
                    arrSave.push({id:arrobj[i],values:$scope.item.obj[parseInt(arrobj[i])]})
                }
                var jsonSave = {
                    head : $scope.cc,
                    data : arrSave//$scope.item.obj
                }
                ManagePhp.saveDataEMR(jsonSave).then(function (e) {
                    $scope.showInputan = false;
                    // $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                    //     namaEMR : $scope.cc.emrfk,
                    //     nomorEMR : e.data.data.noemr 
                    // });

                    var arrStr = {
                            0: e.data.data.noemr 
                        }
                    cacheHelper.set('cacheNomorEMR', arrStr);
                });
            }

        }
    ]);
});