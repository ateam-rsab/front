define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('HeaderSkriningGiziCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', '$mdDialog', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, $mdDialog, findPasien, cacheHelper, ManagePasien, dateHelper) {
        
            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "PemeriksaanKesehatan");

            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            //$scope.noRecPap = window.localStorage.getItem('noRecPap');
            debugger;
            $scope.title = "Status Skrining Gizi";
            // $rootScope.showMenu = true;
            $rootScope.showMenuPengkajianLanjutan = true;
            // $rootScope.showMenuDetail = false;
            $scope.noCM = $state.params.noCM;
            $scope.dataVOloaded = true;
            $scope.now = new Date();

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                debugger;
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.noCm = data.data.pasien.noCm;
                // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

                $scope.item.pasien.umurPasien = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                var bln = $scope.item.pasien.umurPasien.month,
                    thn = $scope.item.pasien.umurPasien.year,
                    usia = ($scope.item.pasien.umurPasien.year * 12) + $scope.item.pasien.umurPasien.month;
                if (usia >= 1 && usia <= 216) {$scope.isAnak = true}
                if (usia >= 0 && usia < 1) {$scope.isNeonatal = true}
                if (usia >= 217) {$scope.isDewasa = true}
                    
                $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');

                var departemen = data.data.ruangan.departemenId;
                if (departemen === 18 || departemen === 28){$scope.isRawatJalan = true}
                if (departemen === 16 || departemen === 35){$scope.isRawatInap = true}
            });

            $scope.pasien = {};
            // $scope.kajianAwal = cacheHelper.get("kajianAwal");
            // if ($scope.kajianAwal === undefined)
            //     $scope.kajianAwal = {};

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

            $scope.item = {};
            $scope.item.noRec = "";

            var validVital = null;

            $scope.arrTandaVital = [
                { "name": "Suhu", "nilai": "", "type": "numeric", "ket": "°C", "noRec": "" },
                { "name": "Nadi", "nilai": "", "type": "", "ket": "x/menit", "noRec": "" },
                { "name": "Pernapasan", "nilai": "", "type": "", "ket": "x/menit", "noRec": "" },
                { "name": "Tekanan Darah", "nilai": "", "type": "", "ket": "mmHg", "noRec": "" }
            ];

            $scope.DataSourceTandaVital=function(){
                var noCm = $state.params.noCM;
                var tglAwal = "";
                var tglAkhir = "";
                var status = 0;

                findPasien.getTandaVitals(noCm, tglAwal, tglAkhir, status).then(function(e) {
                    debugger;
                    $scope.dataTandaVital = e.data;

                    $scope.sourceTandaVital = new kendo.data.DataSource({
                        pageSize: 10,
                        data:$scope.dataTandaVital
                    })
                })
            };
            $scope.DataSourceTandaVital();

            $scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "template": "#= new moment(tglInput).format('DD-MM-YYYY') #",
                    "title": "<h3 align=center>Tgl Input<h3>",
                    "width": "30px",
                    "attributes": {align:"center"}
                }, {
                    "template": "#= new moment(tglInput).format('HH:mm') #",
                    "title": "<h3 align=center>Jam Input<h3>",
                    "width": "30px",
                    "attributes": {align:"center"}
                }, {
                    "field": "suhu",
                    "title": "<h3 align=center>Suhu</h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                }, {
                    "field": "nadi",
                    "title": "<h3 align=center>Nadi<h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                }, {
                    "field": "pernapasan",
                    "title": "<h3 align=center>Pernapasan<h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                }, {
                    "field": "tekananDarah",
                    "title": "<h3 align=center>Tekanan Darah<h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                }]
            };

            $q.all([ModelItem.getDataDummyGeneric("StatusYaTidak", false),
                ModelItem.getDataDummyGeneric("DataTandaVital", false),
                ModelItem.get("PemeriksaanFisikTandaVital"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {
                debugger;
                if (data[0].statResponse)
                    $scope.listStatusKesadaran = data[0];

                if (data[1].statResponse) {
                    $scope.DataTandaVital = data[1];
                    debugger;
                }

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
            //             $scope.arrSkriningGiziNeo = ModelItem.setTandaVitalCurrentData($scope.item.PapTandaVital.papDataTandaVitalSet, $scope.arrSkriningGiziNeo);
            //             $scope.arrSkriningGiziAnak = ModelItem.setTandaVitalCurrentData($scope.item.PapTandaVital.papDataTandaVitalSet, $scope.arrSkriningGiziAnak);
            //             $scope.arrSkriningGiziDewasa = ModelItem.setTandaVitalCurrentData($scope.item.PapTandaVital.papDataTandaVitalSet, $scope.arrSkriningGiziDewasa);

            //             var arr = $scope.item.PapTandaVital.gcs.split(';');
            //             $scope.item.kesadaran = $scope.listStatusKesadaran[1];
            //             // debugger;
            //         }
            //     });
            // };

            $scope.Batal=function(){
                $scope.arrTandaVital[0].nilai="";
                $scope.arrTandaVital[1].nilai="";
                $scope.arrTandaVital[2].nilai="";
                $scope.arrTandaVital[3].nilai="";
                validVital=null;
            }

            $scope.SelectGrid=function(data)
            {
                debugger;
                validVital=1;
                console.log(JSON.stringify(data));
                $scope.arrTandaVital[0].nilai=data.suhu;
                $scope.arrTandaVital[1].nilai=data.nadi;
                $scope.arrTandaVital[2].nilai=data.pernapasan;
                $scope.arrTandaVital[3].nilai=data.tekananDarah;
                // debugger;
            };
            $scope.validasi= function(){
                var confirm = $mdDialog.confirm()
                  .title('Validasi')
                  .textContent('Data belum di pilih !!!')
                  .ariaLabel('Lucky day')
                  .cancel('Ok')
                $mdDialog.show(confirm).then(function() {
                })
            };

            
            $scope.Save = function() {
                debugger;
                $scope.item.tandaVital = ModelItem.setTandaVitalForSend($scope.DataTandaVital, $scope.arrTandaVital);
                // $scope.item.SkriningGiziAnak = ModelItem.setTandaVitalForSend($scope.DataTandaVital, $scope.arrSkriningGiziAnak);

                // cacheHelper.set("kajianAwal", $scope.kajianAwal);
                $scope.pasien = { noRec: $state.params.noRec };
                var suhu = $scope.item.tandaVital[1].nilai;
                var nadi = $scope.item.tandaVital[2].nilai;
                var pernapasan = $scope.item.tandaVital[3].nilai;
                var tekananDarah = $scope.item.tandaVital[0].nilai
                if($scope.dataTandaVital.length != 0 ){
                    if(validVital != null){
                    var data = {
                        "noRec": $scope.dataTandaVital[0].noRec,
                        "tglInput": $scope.dataTandaVital[0].tglInput,
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "suhu": suhu,
                        "nadi": nadi,
                        "pernapasan": pernapasan,
                        "tekananDarah" : tekananDarah
                        }
                        ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                            $scope.DataSourceTandaVital();
                            $scope.DataSourceSkriningGizi();
                            $scope.Batal();
                            validVital=null;
                        });
                    }else{
                        // $scope.validasi();
                        var data = {
                            "noRec": $scope.noRec = null,
                            "tglInput": new Date().getTime(),
                            "pasienDaftar":{
                                "noRec": $state.params.noRec
                            },
                            "suhu": suhu,
                            "nadi": nadi,
                            "pernapasan": pernapasan,
                            "tekananDarah" : tekananDarah
                        }
                        ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                            $scope.DataSourceTandaVital();
                            $scope.DataSourceSkriningGizi();
                            $scope.Batal();
                            validVital=null;
                        });
                    }
                }else{
                    var data = {
                    "noRec": $scope.noRec = null,
                    "tglInput": new Date().getTime(),
                    "pasienDaftar":{
                        "noRec": $state.params.noRec
                    },
                    "suhu": suhu,
                    "nadi": nadi,
                    "pernapasan": pernapasan,
                    "tekananDarah" : tekananDarah
                    }
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        $scope.DataSourceTandaVital();
                        $scope.DataSourceSkriningGizi();
                        $scope.Batal();
                        validVital=null;
                    });
                }
            };

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
                    $scope.dataSkriningGizi = e.data;

                    $scope.sourceSkriningGizi = new kendo.data.DataSource({
                        pageSize: 10,
                        data:$scope.dataSkriningGizi
                    });
                })
            };
            $scope.DataSourceSkriningGizi();
            $scope.arrSkriningGiziNeo = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "gram", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" }
            ];
            $scope.arrSkriningGiziAnak = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Status Gizi", "nilai": "", "type": "", "ket": "", "noRec": "" }
            ];
            $scope.arrSkriningGiziDewasa = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "", "visible": false },
                { "name": "Index Masa Tubuh", "nilai": "", "type": "", "ket": "Kg / m2", "noRec": "" },
                { "name": "Status Gizi", "nilai": "", "type": "", "ket": "", "noRec": "" }
            ];
            
            $scope.mainGridOptions2 = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "template": "#= new moment(tglInput).format('DD-MM-YYYY') #",
                    "title": "<h3 align=center>Tgl Input<h3>",
                    "width": "30px",
                    "attributes": {align:"center"}
                }, {
                    "template": "#= new moment(tglInput).format('HH:mm') #",
                    "title": "<h3 align=center>Jam Input<h3>",
                    "width": "30px",
                    "attributes": {align:"center"}
                }, {
                    "field": "beratBadan",
                    "title": "<h3 align=center>BB</h3>",
                    "width": "300px"
                }, {
                    "field": "tinggiBadan",
                    "title": "<h3 align=center>PB<h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                }, {
                    "field": "lingkarKepala",
                    "title": "<h3 align=center>Lingkar Kepala<h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                }]
            };
            $scope.mainGridOptions3 = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "template": "#= new moment(tglInput).format('DD-MM-YYYY') #",
                    "title": "<h3 align=center>Tgl Input<h3>",
                    "width": "30px",
                    "attributes": {align:"center"}
                }, {
                    "field": "beratBadan",
                    "title": "<h3 align=center>BB</h3>",
                    "width": "300px"
                }, {
                    "field": "tinggiBadan",
                    "title": "<h3 align=center>PB<h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                 }, {
                    "field": "imt",
                    "title": "<h3 align=center>Index Masa Tubuh (IMT)<h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                }]
            };

            var validGizi = null;
            $scope.BatalGizi=function(){
                if($scope.isNeonatal===true){
                    $scope.arrSkriningGiziNeo[0].nilai="";
                    $scope.arrSkriningGiziNeo[1].nilai="";
                    $scope.arrSkriningGiziNeo[2].nilai="";
                }
                if($scope.isAnak===true){
                    $scope.arrSkriningGiziAnak[0].nilai="";
                    $scope.arrSkriningGiziAnak[1].nilai="";
                    $scope.arrSkriningGiziAnak[2].nilai="";
                }
                if($scope.isDewasa===true){
                    $scope.arrSkriningGiziDewasa[0].nilai="";
                    $scope.arrSkriningGiziDewasa[1].nilai="";
                    $scope.arrSkriningGiziDewasa[2].nilai="";
                }
                validGizi = null;
            };
            
            $scope.SelectGridGizi=function(data){
                debugger;
                if($scope.isNeonatal===true){
                    validGizi = 1;
                    $scope.arrSkriningGiziNeo[0].nilai=data.beratBadan;
                    $scope.arrSkriningGiziNeo[1].nilai=data.tinggiBadan;
                    $scope.arrSkriningGiziNeo[2].nilai=data.lingkarKepala;
                }
                if($scope.isAnak===true){
                    validGizi = 1;
                    $scope.arrSkriningGiziAnak[0].nilai=data.beratBadan;
                    $scope.arrSkriningGiziAnak[1].nilai=data.tinggiBadan;
                    $scope.arrSkriningGiziAnak[2].nilai=data.lingkarKepala;
                }
                if($scope.isDewasa===true){
                    validGizi = 1;
                    $scope.arrSkriningGiziDewasa[0].nilai=data.beratBadan;
                    $scope.arrSkriningGiziDewasa[1].nilai=data.tinggiBadan;
                    $scope.arrSkriningGiziDewasa[2].nilai=data.lingkarKepala;
                    $scope.arrSkriningGiziDewasa[3].nilai=data.imt;
                    $scope.arrSkriningGiziDewasa[4].nilai=data.statusGizi;
                }
                // debugger;
            };

            $scope.SaveGizi = function() {
                debugger;
                // $scope.item.TekananDarah = $scope.td.tekananDarah1 + "/" + $scope.td.tekananDarah2;
                
                if($scope.isNeonatal===true){
                    $scope.item.skriningGizi = $scope.setSkriningGiziForSend($scope.DataTandaVital, $scope.arrSkriningGiziNeo);
                    
                    var beratBadan = $scope.item.skriningGizi[0].nilai;
                    var tinggiBadan = $scope.item.skriningGizi[1].nilai;
                    var lingkarKepala = $scope.item.skriningGizi[2].nilai;
                    if($scope.dataSkriningGizi.length != 0 ){
                        if(validGizi != null){
                            var data = {
                                "noRec": $scope.dataSkriningGizi[0].noRec,
                                "tglInput": $scope.dataSkriningGizi[0].tglInput,
                                "pasienDaftar":{
                                    "noRec": $state.params.noRec
                                },
                                "beratBadan": beratBadan,
                                "tinggiBadan": tinggiBadan,
                                "lingkarKepala": lingkarKepala
                            }
                            ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                                // debugger;
                                $scope.DataSourceSkriningGizi();
                                $scope.DataSourceTandaVital();
                                $scope.BatalGizi();
                                validGizi=null;
                            });
                        }else{
                            // $scope.validasi();
                            var data = {
                                "noRec":  null,
                                "tglInput": new Date().getTime(),
                                "pasienDaftar":{
                                    "noRec": $state.params.noRec
                                },
                                "beratBadan": beratBadan,
                                "tinggiBadan": tinggiBadan,
                                "lingkarKepala": lingkarKepala
                            }
                            ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                                // debugger;
                                $scope.DataSourceSkriningGizi();
                                $scope.DataSourceTandaVital();
                                $scope.BatalGizi();
                                validGizi=null;
                            });
                        }
                    }else{
                        var data = {
                        "noRec":  null,
                        "tglInput": new Date().getTime(),
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "beratBadan": beratBadan,
                        "tinggiBadan": tinggiBadan,
                        "lingkarKepala": lingkarKepala
                        }
                        ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                            // debugger;
                            $scope.DataSourceSkriningGizi();
                            $scope.DataSourceTandaVital();
                            $scope.BatalGizi();
                            validGizi=null;
                        });
                    }
                }
                if($scope.isAnak===true){
                    $scope.item.skriningGizi = $scope.setSkriningGiziForSend($scope.DataTandaVital, $scope.arrSkriningGiziAnak);
                   
                    var beratBadan = $scope.item.skriningGizi[0].nilai;
                    var tinggiBadan = $scope.item.skriningGizi[1].nilai;
                    var lingkarKepala = $scope.item.skriningGizi[2].nilai;
                    if($scope.dataSkriningGizi.length != 0 ){
                        if(validGizi != null){
                            var data = {
                                "noRec": $scope.dataSkriningGizi[0].noRec,
                                "tglInput": $scope.dataSkriningGizi[0].tglInput,
                                "pasienDaftar":{
                                    "noRec": $state.params.noRec
                                },
                                "beratBadan": beratBadan,
                                "tinggiBadan": tinggiBadan,
                                "lingkarKepala": lingkarKepala
                            }
                            ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                                // debugger;
                                $scope.DataSourceSkriningGizi();
                                $scope.DataSourceTandaVital();
                                $scope.BatalGizi();
                                validGizi=null;
                            });
                        }else{
                            // $scope.validasi();
                            var data = {
                                "noRec": $scope.noRec = null,
                                "tglInput": new Date().getTime(),
                                "pasienDaftar":{
                                    "noRec": $state.params.noRec
                                },
                                "beratBadan": beratBadan,
                                "tinggiBadan": tinggiBadan,
                                "lingkarKepala": lingkarKepala
                            }
                            ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                                // debugger;
                                $scope.DataSourceSkriningGizi();
                                $scope.DataSourceTandaVital();
                                $scope.BatalGizi();
                                validGizi=null;
                            });
                        }
                    }else{
                        var data = {
                        "noRec": $scope.noRec = null,
                        "tglInput": new Date().getTime(),
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "beratBadan": beratBadan,
                        "tinggiBadan": tinggiBadan,
                        "lingkarKepala": lingkarKepala
                        }
                        ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                            // debugger;
                            $scope.DataSourceSkriningGizi();
                            $scope.DataSourceTandaVital();
                            $scope.BatalGizi();
                            validGizi=null;
                        });
                    }
                }
                if($scope.isDewasa===true){
                    $scope.item.skriningGizi = $scope.setSkriningGiziForSend($scope.DataTandaVital, $scope.arrSkriningGiziDewasa);
                    // $scope.item.SkriningGiziAnak = ModelItem.setTandaVitalForSend($scope.DataTandaVital, $scope.arrSkriningGiziAnak);

                    // cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.pasien = { noRec: $state.params.noRec };
                    var beratBadan = $scope.item.skriningGizi[0].nilai;
                    var tinggiBadan = $scope.item.skriningGizi[1].nilai;
                    var lingkarKepala = $scope.item.skriningGizi[2].nilai;
                    var imt = $scope.item.skriningGizi[3].nilai;
                    var statusGizi = $scope.item.skriningGizi[5].nilai;
                    if($scope.dataSkriningGizi.length != 0 ){
                        if(validGizi != null){
                            var data = {
                                "noRec": $scope.dataSkriningGizi[0].noRec,
                                "tglInput": $scope.dataSkriningGizi[0].tglInput,
                                "pasienDaftar":{
                                    "noRec": $state.params.noRec
                                },
                                "beratBadan": beratBadan,
                                "tinggiBadan": tinggiBadan,
                                "lingkarKepala" : lingkarKepala,
                                "imt": imt,
                                "statusGizi": statusGizi
                            }
                            ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                                // debugger;
                                $scope.DataSourceSkriningGizi();
                                $scope.DataSourceTandaVital();
                                $scope.BatalGizi();
                                validGizi=null;
                            });
                        }else{
                            // $scope.validasi();
                            var data = {
                                "noRec": $scope.noRec = null,
                                "tglInput": new Date().getTime(),
                                "pasienDaftar":{
                                    "noRec": $state.params.noRec
                                },
                                "beratBadan": beratBadan,
                                "tinggiBadan": tinggiBadan,
                                "lingkarKepala" : lingkarKepala,
                                "imt": imt,
                                "statusGizi": statusGizi
                            }
                            ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                                // debugger;
                                $scope.DataSourceSkriningGizi();
                                $scope.DataSourceTandaVital();
                                $scope.BatalGizi();
                                validGizi=null;
                            });
                        }
                    }else{
                        var data = {
                        "noRec": $scope.noRec = null,
                        "tglInput": new Date().getTime(),
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "beratBadan": beratBadan,
                        "tinggiBadan": tinggiBadan,
                        "lingkarKepala" : lingkarKepala,
                        "imt": imt,
                        "statusGizi": statusGizi
                        }
                        ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                            // debugger;
                            $scope.DataSourceSkriningGizi();
                            $scope.DataSourceTandaVital();
                            $scope.BatalGizi();
                            validGizi=null;
                        });
                    }
                }
            }
        }
    ]);
});