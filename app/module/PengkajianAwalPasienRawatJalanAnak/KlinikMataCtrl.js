define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KlinikMataCtrl', ['ReportHelper', '$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper', 'ManagePasien',
        function(reportHelper, $q, $rootScope, $scope, ModelItem, $state, findPasien,  cacheHelper, dateHelper, ManagePasien) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";

            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $scope.noCM = $state.params.noCM;
            $scope.now = new Date();

            $scope.item = {};
            $scope.item.noRec = "";

            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            $q.all([ModelItem.getDataDummyGeneric("StatusKlinikMata", false),
                    ModelItem.getDataDummyGeneric("StatusKoreksi", false),
                    ModelItem.getDataDummyGeneric("StatusKacamata", false),
                    ModelItem.getDataDummyGeneric("StatusTonometri", false),
                    ModelItem.getDataDummyGeneric("StatusAplasnasi", false),
                    ModelItem.getDataDummyGeneric("StatusPilihanDiagnosa", false),
                    ModelItem.getDataDummyGeneric("KategoriKlinikMata", false),
                    ModelItem.getDataDummyGeneric("StatusYaTidak", false),
                    ModelItem.getDataDummyGeneric("StatusKomponenPenilaian", false),
                    ModelItem.get("RiwayatKlinikMata"),
                    findPasien.getByNoCM($scope.noCM)
                    ]).then(function(data) {

                if(data[0].statResponse){
                    $scope.listStatusKlinikMata = ModelItem.addCheckedAtribute(data[0], $scope['listStatusKlinikMata']);
                }
                
                if(data[1].statResponse){
                    $scope.listStatusKoreksi = ModelItem.addCheckedAtribute(data[1], $scope['listStatusKoreksi']);
                }

                if(data[2].statResponse){
                    $scope.listStatusKacamata = ModelItem.addCheckedAtribute(data[2], $scope['listStatusKacamata']);
                }

                if(data[3].statResponse){
                    $scope.listStatusTonometri = ModelItem.addCheckedAtribute(data[3], $scope['listStatusTonometri']);
                }

                if(data[4].statResponse){
                    $scope.listStatusAplasnasi = ModelItem.addCheckedAtribute(data[4], $scope['listStatusAplasnasi']);
                }

                if(data[5].statResponse)
                $scope.listStatusPilihanDiagnosa = data[5];

                if(data[6].statResponse)
                $scope.listKategoriKlinikMata = data[6];

                if(data[7].statResponse)
                $scope.listYaTidak = data[7];

                if(data[8].statResponse)
                $scope.listDiagnosis = data[8];

                if(data[9].statResponse)
                {
                    $scope.item = data[9];
                    $scope.item.noRec = "";
                }
                
                if(data[10].statResponse){
                    $rootScope.currentPasien = data[10].data.data;
                    $scope.pasien = data[10].data.data;
                }
            
                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien()
            {
                //ambil data pasien dari database
                /*findPasien.getTandaVital($state.params.noCM, $state.params.tanggal).then(function(e) {
                   if(e.data.data.PapTandaVital[0] != undefined){
                        
                        $scope.item.PapTandaVital = e.data.data.PapTandaVital[0];
                        /*if ($scope.item.keluhanUtama !== undefined)
                            $scope.editMode = true;
                        $scope.item.noRec = $scope.item.PapTandaVital.noRec;
                        
                    }
                });*/
            };

            $scope.tempItem = {};
            $scope.arrDataKategoriMata = [];
            $scope.addKategori = function() {
                if ($scope.item.kategoriMata != "" && $scope.item.kategoriMata != undefined) {
                    for (var i = 0; i < $scope.arrDataKategoriMata.length; i++) {

                    }
                    var obj = {
                        "name": $scope.item.kategoriMata.name,
                        "status": $scope.item.ketMata
                    }

                    $scope.dataKategoriMata.add(obj);
                    $scope.arrDataKategoriMata.push(obj);
                }
            }

            $scope.removeDataKategori = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.arrDataKategoriMata = $scope.arrDataKategoriMata
                    .filter(function(el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };

             //-----keperluan grid RiwayatPenyakitOrObat
            $scope.dataKategoriMata = new kendo.data.DataSource({
                data: []
            });


            $scope.columnDataKategoriMata = [{
                "field": "name",
                "title": "Kategori Mata"
            }, {
                "field": "status",
                "title": "Keterangan"
            },{
                command: {
                    text: "Hapus",
                    click: $scope.removeDataKategori
                },
                title: "&nbsp;",
                width: "110px"
            }];

            $scope.warna = {};
            $scope.warna.normal = "#05b72a";
            $scope.warna.tidakNormal = "#FFFFFF";
            $scope.changeStat = function(stat) {
                var target = "";
                if (stat == "Normal") {
                    $scope.warna.normal = "#05b72a";
                    $scope.warna.tidakNormal = "#FFFFFF";
                    $scope.item.isNormal = true;
                } else {
                    $scope.warna.normal = "#FFFFFF";
                    $scope.warna.tidakNormal = "#05b72a";
                    $scope.item.isNormal = false;
                }
            }

            $rootScope.dataArray = {};
            $rootScope.dataArray.arrStatusKacamata = [];
            $rootScope.dataArray.arrStatusKoreksi = [];
            $rootScope.dataArray.arrStatusVisus = [];
            $rootScope.dataArray.arrStatusTonometri = [];
            $rootScope.dataArray.arrStatusAplasnasi = [];
            $scope.cekArray = function(data, currentArray) {
                $rootScope.dataArray[currentArray] = ModelItem.tickUntickCheckbox(data, $rootScope.dataArray[currentArray]);
            };

            $scope.Save = function() {
                $scope.item.arrDataKategoriMata = $scope.arrDataKategoriMata;

                if ($scope.item.RiwayatDalamKeluarga == "Tidak") {
                    $scope.item.PenyakitMayor = "";
                }

                $scope.item.dataKacamataSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusKacamata, $rootScope.dataArray.arrStatusKacamata, "dataKacamata");
                $scope.item.dataVisusSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusKlinikMata, $rootScope.dataArray.arrStatusVisus, "dataVisus");
                $scope.item.dataKoreksiSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusKoreksi, $rootScope.dataArray.arrStatusKoreksi, "dataKoreksi");
                $scope.item.dataAplasnasiSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusAplasnasi, $rootScope.dataArray.arrStatusAplasnasi, "dataAplasnasi");
                $scope.item.dataTonometriSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusTonometri, $rootScope.dataArray.arrStatusTonometri, "dataTonometri");

                ManagePasien.saveKlinikMata(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    /*$state.go('dashboardpasien.Pernafasan', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                    $scope.isReport = true;
                });
            };

            $scope.cetak = function()
            {
                if($scope.noCM != undefined){
                    var fixUrlLaporan = reportHelper.open("reporting/lapKlinikMata?noCm="+$scope.noCM);
                    window.open(fixUrlLaporan, '_blank')
                } 
            }
            
        }
    ]);
});