define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('InputKonsultasiCtrl', ['DateHelper', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai',

        function(dateHelper, ManagePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai) {
            debugger;
            $scope.item = {};
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $scope.item.tglAwal = new Date();
            $scope.item.tglAkhir = new Date();
            $rootScope.showMenuPengkajianMedis = true;
            $scope.now = new Date();
            $scope.item.tanggalKonsultasi = dateHelper.formatDate($scope.now, "YYYY-MM-DD");
            
            // ModelItem.getDataDummyGeneric("Ruangan", true, undefined).then(function(data) {
            //     $scope.kasusPenyakits = data;
            // });
            findPasien.getAllRuangan().then(function(data) {
                $scope.listRuangan = data.data.data;
            });
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data;
                $scope.pasien = data.data.data;
            });
            // form di html di comment makanya fungsi nye gw komen juga
            // findPasien.getDiagnosisKerja($scope.noCM, $scope.tanggal).then(function(e) {
            //     $scope.diagnosisKerja = e.data;
            // })
            findPasien.getDiagnosisTindakan($scope.noCM, $scope.tanggal).then(function(e) {
                $scope.diagnosisTerapi = e.data;
            })

            findPasien.geticdnine($state.params.noRec).then(function(e) {
                debugger;
                $scope.listDiagnosaNine = e.data.data.diagnosaTindakanPasien[0].diagnosisTindakan
            });

            findPasien.geticdten($state.params.noRec).then(function(e) {
                debugger;
                $scope.listDiagnosaTen = e.data.data.diagnosaPasien[0].diagnosis
            });
            $scope.pilihRuangan = function(e){
                debugger;
                if (e === undefined) return;
                if ($scope.item.tanggalKonsultasi !== undefined && $scope.item.tujuanKonsultasi !== undefined) {
                    $scope.listDokter = [];
                    var data = findPegawai.getDokterRawatJalan($scope.item.tanggalKonsultasi, $scope.item.tujuanKonsultasi);
                    data.fetch(function() {
                        $scope.listData = this._data;
                        $scope.$apply();
                    });
                    
                    $scope.listData.forEach(function(listDokter){
                        debugger;
                        $scope.listDokter.push(listDokter.dokter);
                    })
                }
            }
            
            $scope.mainGridOptions = {
                pageable: true,
                schema: {
                    model: {
                        fields: {
                            tglOrder: {editable: false, type: "string"},
                            namaRuanganTujuan: { editable: false, type: "string" },
                            status: { editable: false, type: "string" },
                            keteranganKonsultasi: { editable: false, type: "string" },
                            jawaban: { type: "string" }
                        }
                    }
                },
                columns: [{
                    "field": "tglOrder",
                    "title": "Tgl Konsultasi",
                    "width": "80px"
                }, {
                    "field": "namaRuanganTujuan",
                    "title": "Poliklinik Tujuan",
                    "width": "200px"
                }, {
                    "field": "status",
                    "title": "Status",
                    "width": "110px"
                },{
                    "field": "keteranganKonsultasi",
                    "title": "Keterangan Konsultasi",
                    "width": "200px"
                },{
                    "field": "jawabanKonsultasi",
                    "title": "Jawaban Konsultasi",
                    "width": "200px",
                    "template": "<input c-text-box type=\"input\" filter=\"varchar\" class=\"k-textbox\" ng-model=\"dataItem.jawabanKonsultasi\" />"
                }]
            };
            
            $scope.Search = function(){
                debugger;
                var tglAwal = new moment($scope.item.tglAwal).format("YYYY-MM-DD");
                var tglAkhir = new moment($scope.item.tglAkhir).format("YYYY-MM-DD");
                findPasien.getHistoriKonsultasi($scope.noCM, tglAwal, tglAkhir).then(function(e) {
                    debugger;
                    $scope.sourceDataHistori = new kendo.data.DataSource({
                        pageSize: 10,
                        data: e.data.data
                    });
                    // $scope.historiKonsultasi = e.data.data;
                })
            };
            $scope.Search();
            $scope.isShowPopUp = false;
            $scope.SelectData = function(data){
                var myWindow = $("#winPopUp");
                    myWindow.data("kendoWindow").open();
                    $scope.isShowPopUp = true;

                    $scope.item.keterangan = data.keterangan
            }

            $scope.SaveJawaban = function(){
                var arrJawaban = $scope.sourceDataHistori._data;
                // var dataJawaban = [];
                debugger;
                arrJawaban.forEach(function(jawab){
                    debugger;
                    if (jawab.jawabanKonsultasi !== null) {
                        debugger;
                        var dataJawaban = {
                            "noRec" : jawab.noRecJawaban,
                            "jawabanKonsultasi": jawab.jawabanKonsultasi
                        }
                         ManagePasien.saveKonsultasi(dataJawaban).then(function(e) {
                            debugger;
                            $scope.Search();
                        });
                    }
                })
                $scope.Search();
                // console.log(JSON.stringify(dataJawaban))
                // ManagePasien.saveKonsultasi($scope.item).then(function(e) {
                //     debugger;
                //     $scope.Search();
                // });
            }

            
            $scope.Save = function() {
                debugger;
                $scope.item.tanggalKonsultasi = dateHelper.formatDate($scope.item.tanggalKonsultasi, "YYYY-MM-DD")
                $scope.item.antrianPasienDiPeriksa = {"noRec":$state.params.noRec}
                $scope.item.noRec = "";
                ManagePasien.saveKonsultasi($scope.item).then(function(e) {
                    console.log(JSON.stringify($scope.item));
                    $scope.Search();
                });
                $scope.Search();
            }

            $scope.close = function(){
                var myWindow = $("#winPopUp");
                myWindow.data("kendoWindow").close();
            }
        }

    ]);
});