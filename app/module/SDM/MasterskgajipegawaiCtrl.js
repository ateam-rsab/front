define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasterskgajipegawaiCtrl', ['$rootScope', '$scope',
        'ModelItem', '$state', 'InstitusiPendidikan', 'JenisSantunanService', 'ManageSdm',
        function($rootScope, $scope, ModelItem, $state,
            InstitusiPendidikan, JenisSantunanService, ManageSdm) {

            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item.dataFromGrid;
            $scope.idPeg;


            ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true).then(function(dat) {
                $scope.listRuangan = dat.data;
            });

            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true).then(function(dat) {
                $scope.listPegawai = dat.data;
                $scope.listPegawai2 = dat.data;
            });

            ManageSdm.getOrderList("service/list-generic/?view=KomponenHarga&select=id,komponenHarga", true).then(function(dat) {
                $scope.listKomponenHarga = dat.data;
            });

            $scope.listOperatorFactorRate = [
            {
                "op": "+"
            }, {
                "op": "-"
            }, {
                "op": "x"
            }, {
                "op": "/"
            }]

            $scope.search = function() {
                debugger;
                if ($scope.item.namaPegawai2 !== undefined) {
                	$scope.idPeg = $scope.item.namaPegawai2.id;
                	loadGrid();
                }

            }

            function loadGrid(){
            	if($scope.idPeg===undefined || $scope.idPeg === ""){
            		return;
            	}
            	 ManageSdm.getOrderList("pegawai-sk-gaji/get-pegawai-sk-gaji-by-pegawai-id?idPegawai=" + $scope.idPeg  , true).then(function(dat) {                      
                        var datas = [];
                        dat.data.data.forEach(function(e) {
                            var status;
                            var statusId;
                            if (e.isByYear === 1) {
                                status = 'Tahun';
                                statusId = 4;
                            }
                            if (e.isByMonth === 1) {
                                status = 'Bulan';
                                statusId = 3;
                            }
                            if (e.isByWeek === 1) {
                                status = 'Minggu';
                                statusId = 2;
                            }
                            if (e.isByDay === 1) {
                                status = 'Hari';
                                statusId = 1;
                            }

                            datas.push({
                                "noSuratKeputusan": e.noSuratKeputusan,
                                "isByYear": e.isByYear,
                                "pegawaiId": e.pegawaiId,
                                "pegawaiSkGajiId": e.pegawaiSkGajiId,
                                "suratKeputusanId": e.suratKeputusanId,
                                "namaPegawai": e.namaPegawai,
                                "namaSuratKeputusan": e.namaSuratKeputusan,
                                "persenHargaSatuan": e.persenHargaSatuan,
                                "operatorFactorRate": e.operatorFactorRate,
                                "komponenHargaId": e.komponenHargaId,
                                "tglBerlakuAkhir": e.tglBerlakuAkhir,
                                "isByWeek": e.isByWeek,
                                "isByDay": e.isByDay,
                                "factorRate": e.factorRate,
                                "isByMonth": e.isByMonth,
                                "hargaSatuan": e.hargaSatuan,
                                "tglBerlakuAwal": e.tglBerlakuAwal,
                                "ruanganId": e.ruanganId,
                                "namaKomponenHarga": e.namaKomponenHarga,
                                "namaRuangan": e.namaRuangan,
                                "statusEnabled": e.statusEnabled,
                                "periode": status,
                                "periodeId": statusId
                            });
                        });

                        $scope.gridMasterGaji = new kendo.data.DataSource({
                            data: datas
                        });
                    });
            }

            $scope.colGridMasterGaji = {
                scrollable: true,
                columns: [{
                        "field": "noSuratKeputusan",
                        "title": "No SK",
                        "width": "100px"
                    },
                    {
                        "field": "namaSuratKeputusan",
                        "title": "Nama SK",
                        "width": "100px"
                    },
                    {
                        "field": "tglBerlakuAwal",
                        "title": "Tanggal Berlaku Awal",
                        "width": "150px"
                    },
                    {
                        "field": "tglBerlakuAkhir",
                        "title": "Tanggal Berlaku Akhir",
                        "width": "150px"
                    },
                    {
                        "field": "namaRuangan",
                        "title": "Ruangan",
                        "width": "150px"
                    },
                    {
                        "field": "namaPegawai",
                        "title": "Nama Pegawai",
                        "width": "150px"
                    },
                    {
                        "field": "namaKomponenHarga",
                        "title": "Komponen Harga",
                        "width": "150px"
                    },
                    {
                        "field": "hargaSatuan",
                        "title": "Harga Satuan",
                        "width": "100px"
                    },
                    {
                        "field": "persenHargaSatuan",
                        "title": "Persen Harga Satuan",
                        "width": "100px"
                    },
                    {
                        "field": "factorRate",
                        "title": "Factor Rate",
                        "width": "100px"
                    },
                    {
                        "field": "operatorFactorRate",
                        "title": "Operator Factor Rate",
                        "width": "100px"
                    },
                    {
                        "field": "periode",
                        "title": "Periode",
                        "width": "100px"
                    },
                    {
                        "field": "statusEnabled",
                        "title": "Status Aktif",
                        "width": "100px"
                    }
                ]
            };

            function formatTgl(tanggal) {
                if(tanggal.match("-")){
                var res = tanggal.split("-");
                 	return res[1] + "-" + res[0] + "-" + res[2];
                }else{
                return tanggal;
                }
            }

            $scope.klik = function(current) {
                $scope.item.dataFromGrid = current;
                //pegawaiSkGajiId suratKeputusanId
                $scope.item.noSk = current.noSuratKeputusan;
                $scope.item.namaSk = current.namaSuratKeputusan;
                $scope.item.tanggalAwal = new Date(formatTgl(current.tglBerlakuAwal));
                $scope.item.tanggalAkhir = new Date(formatTgl(current.tglBerlakuAkhir));
                $scope.item.komponenHarga = current.namaKomponenHarga;
                $scope.item.hargaSatuan = current.hargaSatuan;
                $scope.item.persenHargaSatuan = current.persenHargaSatuan;
                $scope.item.factorRate = current.factorRate;
                $scope.item.periode = current.periodeId;
                var x = 0;
                for (x = 0; x < $scope.listKomponenHarga.length; x++) {
                    if ($scope.listKomponenHarga[x].id === current.komponenHargaId) {
                        $scope.item.komponenHarga = $scope.listKomponenHarga[x];
                    }
                }

                for (x = 0; x < $scope.listRuangan.length; x++) {
                    if ($scope.listRuangan[x].id === current.ruanganId) {
                        $scope.item.ruangan = $scope.listRuangan[x];
                    }
                }

                for (x = 0; x < $scope.listPegawai.length; x++) {
                    if ($scope.listPegawai[x].id === current.pegawaiId) {
                        $scope.item.namaPegawai = $scope.listPegawai[x];
                    }
                }

                for (x = 0; x < $scope.listOperatorFactorRate.length; x++) {
                    if ($scope.listOperatorFactorRate[x].op === current.operatorFactorRate) {
                        $scope.item.operatorFactorRate = $scope.listOperatorFactorRate[x];
                    }
                }
                if (current.statusEnabled === true) {
                    $scope.vals = true;
                } else {
                    $scope.vals = false;
                }

            };

            $scope.Cancel = function() {
            	loadGrid();
                $scope.item = {};
            }

            $scope.Save = function() {
                debugger;
                if (
                    $scope.item.noSk === "",
                    $scope.item.namaSk === "", 
                    $scope.item.noSk === null,
                    $scope.item.namaSk === null,
                    $scope.item.tanggalAwal === undefined,
                    $scope.item.tanggalAkhir === undefined,
                    $scope.item.ruangan === undefined,
                    $scope.item.namaPegawai === undefined,
                    $scope.item.komponenHarga === undefined,
                    $scope.item.hargaSatuan === "",
                    $scope.item.persenHargaSatuan === "",
                    $scope.item.factorRate === "",
                    $scope.item.operatorFactorRate === undefined) {
                    toastr.warning("Lengkapi semua data");
                    return;
                }
                var id1 = null;
                var id2 = null;
                var day = 0;
                var week = 0;
                var month = 0;
                var year = 0;
                if($scope.item.periode === 1  ||  $scope.item.periode === "1") {
                	day = 1;
                }
                if($scope.item.periode === 2 ||  $scope.item.periode === "2") { 
                	week = 1;
                }
                if($scope.item.periode === 3 ||  $scope.item.periode === "3") {  
                	month = 1;
                }
                if($scope.item.periode === 4 ||  $scope.item.periode === "4") {  
                	 year = 1;
                } 

                if ($scope.item.dataFromGrid !== undefined) {
                    id1 = $scope.item.dataFromGrid.pegawaiSkGajiId;
                    id2 = $scope.item.dataFromGrid.suratKeputusanId;
                }

              /*  if(id1 === null){
                	id1="";
                } 
                if(id2 === null){
                	id2="";
                }*/

                if ($scope.item.dataAktif === undefined) {
                    $scope.item.dataAktif = false;
                }

                var data = {
                    "pegawaiSkGajiId": id1,
                    "suratKeputusanId": id2,
                    "noSuratKeputusan": $scope.item.noSk,
                    "namaSuratKeputusan": $scope.item.namaSk,
                    "tglBerlakuAwal": $scope.item.tanggalAwal,
                    "tglBerlakuAkhir": $scope.item.tanggalAkhir,
                    "ruanganId": $scope.item.ruangan.id,
                    "namaRuangan": $scope.item.ruangan.namaRuangan,
                    "pegawaiId": $scope.item.namaPegawai.id,
                    "namaPegawai": $scope.item.namaPegawai.namaLengkap,
                    "komponenHargaId": $scope.item.komponenHarga.id,
                    "namaKomponenHarga": $scope.item.komponenHarga.komponenHarga,
                    "factorRate": $scope.item.factorRate,
                    "operatorFactorRate": $scope.item.operatorFactorRate.op,
                    "totalFactorRate": "",
                    "persenHargaSatuan": $scope.item.persenHargaSatuan,
                    "hargaSatuan": $scope.item.hargaSatuan,
                    "isByDay": day,
                    "isByWeek": week,
                    "isByMonth": month,
                    "isByYear": year,
                    "statusEnabled": $scope.item.dataAktif
                }

                ManageSdm.saveJenisSantunan(ModelItem.beforePost(data), "pegawai-sk-gaji/save-pegawai-sk-gaji").then(function(e) {
                    loadGrid();
                    $scope.item = {};
                });

            };

        }
    ]);
});