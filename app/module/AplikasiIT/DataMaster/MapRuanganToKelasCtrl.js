define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MapRuanganToKelasCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'PenerimaanBarangLogistik',
        function($q, $rootScope, $scope, IPSRSService, penerimaanBarangLogistik) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var init = function() {

                var map = [];
                var kelas = [];
                var ruangan = [];
                var dataLengkap = [];
                var arrS = {};
                var ruanganS;
                var kelasS;
                var nomor = 0;
                $q.all([
                    IPSRSService.getFieldsMasterTable("get-data-master?className=MapRuanganToKelas"),  
                    penerimaanBarangLogistik.getNamaProduk("Kelas&select=id,namaKelas"),
                    penerimaanBarangLogistik.getNamaProduk("Ruangan&select=id,namaRuangan")
                ]).then(function(data) {
                    map = data[0].data.data.MapRuanganToKelas;
                    kelas = data[1].data;
                    ruangan = data[2].data;

                    for (var i = 0; i < map.length; i++) {
                        nomor += 1
                        for (var j = 0; j < kelas.length; j++) {
                            if (map[i].kelasId == kelas[j].id) {
                                kelasS = kelas[j]
                                break;
                            }
                        }

                        for (var k = 0; k < ruangan.length; k++) {
                            if (map[i].ruanganId == ruangan[k].id) {
                                ruanganS = ruangan[k]
                                break;
                            }
                        }

                        arrS = {
                            nomor: nomor,
                            id: map[i].id,
                            statusEnabled: map[i].statusEnabled,
                            kodeExternal: map[i].kodeExternal,
                            reportDisplay: map[i].reportDisplay, 
                            ruangan: ruanganS, 
                            kelas: kelasS
                        }
                        dataLengkap.push(arrS)
                    } 

                    $scope.listkelas = kelas;
                    $scope.listruangan = ruangan;

                    $scope.dataSource = new kendo.data.DataSource({
                        pageSize: 10,
                        data: dataLengkap,
                        autoSync: true

                    });

                });
            };
 
            init(); 
            $scope.columnMapRuanganToKelas = [{
                    "field": "nomor",
                    "title": "No"
                },
                {
                    "field": "ruangan.namaRuangan",
                    "title": "ruangan"
                }, 
                {
                    "field": "kelas.namaKelas",
                    "title": "kelas"
                }, 
                {
                    "field": "reportDisplay",
                    "title": "Report Display"
                },
                {
                    "field": "kodeExternal",
                    "title": "kode External"
                },
                {
                    "field": "statusEnabled",
                    "title": "status Enabled"
                },
                {
                    "title": "Action",
                    "width": "200px",
                    "template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
                        "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
                }
            ];
            $scope.mainGridOptions = {
                pageable: true,
                columns: $scope.columnMapRuanganToKelas,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };

            ////fungsi klik untuk edit
            $scope.klik = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.item.kelas = current.kelas; 
                $scope.item.ruangan = current.ruangan; 
                $scope.item.id = current.id; 
                $scope.item.reportDisplay = current.reportDisplay;
                $scope.item.kodeExternal = current.kodeExternal;
                $scope.item.namaExternal = current.namaExternal;
                $scope.item.statusEnabled = current.statusEnabled;
            };
            $scope.disableData = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToKelas&&id=" + $scope.item.id + "&&statusEnabled=false").then(function(dat) {
                    init();
                });
            };
            $scope.enableData = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToKelas&&id=" + $scope.item.id + "&&statusEnabled=true").then(function(dat) {
                    init();

                });
            };
            //// save 
            $scope.tambah = function() {
                var data = {
                    "class": "MapRuanganToKelas",
                    "listField": {
                        "kelas": $scope.item.kelas, 
                        "ruangan": $scope.item.ruangan, 
                        "id": $scope.item.id,
                        "reportDisplay": $scope.item.reportDisplay,
                        "kodeExternal": $scope.item.kodeExternal,
                        "namaExternal": $scope.item.namaExternal,
                    }
                }

                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    init();
                    $scope.item = {};
                });
            }

            ////edit
            $scope.edit = function() {
                var data = {
                    "class": "MapRuanganToKelas",
                    "listField": {
                        "kelas": $scope.item.kelas, 
                        "ruangan": $scope.item.ruangan, 
                        "id": $scope.item.id, 
                        "reportDisplay": $scope.item.reportDisplay,
                        "kodeExternal": $scope.item.kodeExternal,
                        "namaExternal": $scope.item.namaExternal,
                        "statusEnabled": $scope.item.statusEnabled
                    }
                }
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    init();
                });
            }
            $scope.batal = function() {
                $scope.showEdit = false;
                $scope.item = {};
            } 
        }
    ]);
});