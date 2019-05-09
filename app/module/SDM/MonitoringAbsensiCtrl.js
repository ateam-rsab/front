define(['initialize'], function(initialize) {'use strict';
    initialize.controller('MonitoringAbsensiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper', 'ReportHelper', 'FindPegawai', 'CetakHelper', 'FindSdm',
        function($q, $rootScope, $scope, ModelItem, $state, ManageSdm, dateHelper, reportHelper, findPegawai, cetakHelper, FindSdm) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = true;
            $scope.showButtonInputJadwalDinas = false; //pre condition hide tombol input jadwal dinas
            var validate = 2;
            var validateAll = 0;
            $scope.paramURl = '';
            //1 by tanggal
            //2	by nama pegawai
            //3 by unit kerja
            $scope.item.monitoringAwal = new Date();
            $scope.item.monitoringAkhir = new Date();
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };
            $scope.isRouteLoading = true;
            $scope.isReport = true;
            $scope.cbAll = function() {
                if ($scope.vals === true) {
                    validateAll = 1;
                } else {
                    validateAll = 0;
                }
            }

            // ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
            //     $scope.listUnitKerja = dat.data;
            // });
            $q.all([
                ManageSdm.findPegawaiById(ModelItem.getPegawai().id),
                FindSdm.getUnitKerja(),
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
                ManageSdm.getOrderList("sdm/get-pegawai-bawahan/" + ModelItem.getPegawai().id)
            ]).then(function(res){
                if(res[1].statResponse) $scope.listUnitKerja = res[1].data.data;
                if(res[0].statResponse) {
                    var currentUser = res[0].data.data;
                    // for(var key in currentUser){
                    //     if(currentUser.hasOwnProperty(key)){
                    //         if(key.indexOf("idPegawai") == 0){
                    //             currentUser["pegawai"] = {
                    //                 id: currentUser[key]
                    //             }
                    //         } else if (key.indexOf("idUnitKerja") == 0){
                    //             currentUser["unitKerja"] = {
                    //                 id: currentUser[key]
                    //             }
                    //         }
                    //     }
                    //     currentUser["monitoringAwal"] = new Date();
                    //     currentUser["monitoringAkhir"] = new Date();
                    // }
                    // $scope.item = currentUser;

                    if(currentUser.idUnitKerja === 24){
                        $scope.listPegawai = res[2].data;
                    } else {
                        if(res[3].data.data.length > 0){
                            $scope.listPegawai = res[3].data.data;
                            $scope.isDisable = false;
                            $scope.isHide = true;
                        } else {
                            $scope.listPegawai = [];
                            $scope.isDisable = true;
                            $scope.isHide = true;
                        }
                        $scope.item.pegawai = {"id": ModelItem.getPegawai().id, "namaLengkap": ModelItem.getPegawai().namaLengkap};
                        $scope.listPegawai.push($scope.item.pegawai);
                    }

                    var currentJabatan = currentUser.jabatanInternal;
                    if(currentJabatan && currentJabatan.indexOf("Kepala") == 0){
                        $scope.item.unitKerja = {
                            id: currentUser.idUnitKerja
                        }
                        $scope.loginKaru = true;
                        $scope.isHide = false;
                        $scope.showButtonInputJadwalDinas = true;
                    }
                }
                $scope.isRouteLoading = false;
            });

            $scope.cariTgl = function() {
                if ($scope.item.monitoringAwal === undefined || $scope.item.monitoringAkhir === undefined) {
                    window.messageContainer.error("tanggal monitoring harus dipilih terlebih dahulu");
                    return;
                } else {

                    $scope.paramURl = "sdm/get-kehadiran-all-pegawai/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                    $scope.pencarian();

                }
            }

            $scope.pijit = function(value) {
                validate = value;
            }
            $scope.item.terlambat = '';
            $scope.item.pulang = '';
            $scope.item.efektif = '';
            $scope.item.kelebihan = '';
            $scope.item.titleFooter = '';



            $scope.Cari = function() {
                //1 by tanggal
                //2 by nama pegawai
                //3 by unit kerja
                //get from validat
                $scope.cs();
                switch (validate) {
                    case 1:
                        if ($scope.item.monitoringAwal === undefined || $scope.item.monitoringAkhir === undefined) {
                            window.messageContainer.error("tanggal monitoring harus dipilih terlebih dahulu");
                            return;
                        } else {
                            $scope.paramURl = "sdm/get-kehadiran-all-pegawai/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                            $scope.pencarian();
                        }
                        break;
                    case 2:
                        if ($scope.item.pegawai === undefined) {
                            window.messageContainer.error("Nama Pegawai harus dipilih terlebih dahulu");

                            return;
                        } else {
                            $scope.paramURl = "sdm/get-kehadiran/" + $scope.item.pegawai.id + "/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                            $scope.pencarian();

                            /*	ManageSdm.getOrderList("pegawai/find-pegawai-by-id-custom/"+ $scope.item.pegawai.id).then(function(dat){
                            	 
                            });	  */
                            break;
                        }
                        break;
                    case 3:
                        if (validateAll === 1) {
                            $scope.paramURl = "sdm/get-kehadiran-by-ruangan/" + $scope.item.pegawai.id + "/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                            $scope.pencarian();
                            return;
                        }
                        if ($scope.item.unitKerja.id === undefined) {
                            window.messageContainer.error("Unit Kerja harus dipilih terlebih dahulu");
                            return;
                        } else {
                            $scope.paramURl = "sdm/get-kehadiran-by-ruangan/" + $scope.item.unitKerja.id + "/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                            $scope.pencarian();
                            break;
                        }
                        break;
                    default:

                }

                //[2:57 PM, 2/6/2017] Susy Jasmed: per pegawai -> http://localhost:8888/jasamedika-web/sdm/get-kehadiran/1099/2017-01-01/2017-02-21                        
                //[2:57 PM, 2/6/2017] Susy Jasmed: all pegawai -> http://localhost:8888/jasamedika-web/sdm/get-kehadiran-all-pegawai/2017-01-01/2017-02-21                        
                //[2:59 PM, 2/6/2017] Susy Jasmed: byUnitRuangan-> http://localhost:8888/jasamedika-web/sdm/get-kehadiran-by-ruangan/1099/2017-01-01/2017-02-21
            }

            $scope.group = {
                field: "nama", 
                aggregates: [
                    { field: "nama", aggregate: "count" }
                ]
            };
            $scope.pencarian = function() {
                $scope.isRouteLoading = true;
                ManageSdm.getOrderList($scope.paramURl).then(function(dat) {
                    // $scope.isRouteLoading = true;
                    if (validate === 2) {
                        $scope.item.terlambat = dat.data.data.jumlahTerlambat;
                        $scope.item.pulang = dat.data.data.jumlahPulangAwal;
                        $scope.item.kelebihan = dat.data.data.jumlahKelebihanJamKerja;
                        $scope.item.efektif = (dat.data.data.jumlahJamEfektif / 60).toFixed(2);
                        $scope.item.titleFooter = 'Jumlah (menit): ';
                    } else {
                        $scope.item.terlambat = "";
                        $scope.item.pulang = "";
                        $scope.item.efektif = "";
                        $scope.item.titleFooter = '';
                        $scope.item.kelebihan = '';
                    }


                    $scope.sourceOrder = new kendo.data.DataSource({
                        data: dat.data.data.listkehadiran,
                        schema: {
                            model: {
                                fields: {
                                    kehadiranidFinger: { editable: false },
                                    nama: { editable: false },
                                    tanggal: { editable: false },
                                    jadwalMasuk: { editable: false },
                                    jadwalPulang: { editable: false },
                                    absensiMasuk: { editable: false },
                                    absensiPulang: { editable: false },
                                    terlambat: { editable: false },
                                    pulangAwal: { editable: false },
                                    kelebihanJamKerja: { editable: false },
                                    jamEfektif: { editable: false },
                                    namaShift: { editable: false },
                                    idShift: { editable: false }
                                }
                            }
                        },
                        sort: { field: "dates", dir: "asc" },
                        group: $scope.group,
                        aggregate: [
                            { field: "nama", aggregate: "count"},
                            { field: "kelebihanJamKerja", aggregate: "sum"},
                            { field: "jamEfektif", aggregate: "sum"}
                        ]
                    });

                    $scope.mainGridOption = {
                        editable: true,
                        columns: [
                            { field: "idPegawai", title: "id", visible: false },
                            { field: "jabatanInternal", title: "jabatanInternal", visible: false },
                            { field: "namaRuangan", title: "namaRuangan", visible: false },
                            { field: "idFinger", title: "Id Finger Print ", visible: false },
                            { field: "nip", title: "nip", visible: false },
                            { field: "idShift", title: "idShift", visible: false },
                            { field: "nama", title: "<center>Nama Pegawai</center>", width: "17%", footerTemplate: "{{item.titleFooter}}", aggregates: ["count"],
                                groupHeaderTemplate: "Nama Pegawai: #= value # (Jumlah: #= count#)" },
                            { field: "tanggal", title: "<center>Tanggal</center>", width: "12%" },
                            {
                                title: "<center>Jadwal</center> ",
                                columns: [
                                    { field: "jadwalMasuk", title: "Masuk", width: "5%" },
                                    { field: "jadwalPulang", title: "Pulang", width: "5%" }
                                ],
                            },
                            {
                                title: "<center>Absensi</center> ",
                                columns: [
                                    { field: "absensiMasuk", title: "Masuk", width: "5%" },
                                    { field: "absensiPulang", title: "Pulang", width: "5%" }
                                ],
                            },
                            { field: "terlambat", title: "<center>Terlambat</center>", width: "8%", footerTemplate: "{{item.terlambat}}" },
                            { field: "pulangAwal", title: "<center>Pulang Awal</center>", width: "8%", footerTemplate: "{{item.pulang}}" },
                            { field: "kelebihanJamKerja", title: "<center>Kelebihan Jam Kerja</center>", width: "8%", aggregates: ["sum"], footerTemplate: "#= kendo.toString(sum,'n0')#" },
                            // { field: "jamEfektif", title: "<center>Jam Efektif</center>", width: "8%", aggregates: ["sum"], footerTemplate: "#= kendo.toString(sum,'n0')# (menit)" }, // jika jam efektif dikirim dari backend berupa integer, frontend dapat menghitung sendiri
                            { field: "jamEfektif", title: "<center>Jam Efektif</center>", width: "8%", footerTemplate: "{{item.efektif}}" },
                            { field: "namaShift", title: "<center>Shift</center>", width: "8%" },
                            { field: "alasan", title: "<center>Alasan</center>", width: "15%" }
                        ]
                    }

                    $scope.isRouteLoading = false;
                }, function(error){
                    $scope.isRouteLoading = false;
                });
            }


            $scope.klik = function(current) {
                // debugger;
                if (!current) return;
                $scope.current = current;
                $scope.item.jabatan = current.jabatanInternal;
                $scope.item.unitKerjatxt = current.unitKerja;
                $scope.item.idFingerPrint = current.idFinger;
                $scope.item.nip = current.nip;
                $scope.item.nama = current.nama;
            };

            $scope.cs = function() {
                $scope.item.jabatan = "";
                $scope.item.unitKerjatxt = "";
                $scope.item.idFingerPrint = "";
                $scope.item.nip = "";
                $scope.item.nama = "";
            };

            $scope.Save = function() {
                var data = $scope.sourceOrder._data;
                var datas = [];
                if(data.length > 0){
                    $scope.isRouteLoading = true;
                    for (var x = 0; x < data.length; x++) {
                        datas.push({
                            "pulangAwal": data[x].pulangAwal,
                            "jadwalPulang": data[x].jadwalPulang,
                            "absensiPulang": data[x].absensiPulang,
                            "shiftKerja": {
                                "id": data[x].idShift
                            },
                            "terlambat": data[x].terlambat,
                            "alasan": data[x].alasan,
                            "pegawai": {
                                "id": data[x].idPegawai
                            },
                            "absensiMasuk": data[x].absensiMasuk,
                            "jadwalmasuk": data[x].jadwalMasuk,
                            "jamEfektif": data[x].jamEfektif,
                            "tanggal": data[x].tanggal
    
                        });
                    };
                    var dataSend = {
                        "monitoringAbsen": datas
                    }
                    console.log(JSON.stringify(dataSend));
                    ManageSdm.saveDataUji(dataSend, "sdm/save-monitoring-absen/").then(function(e) {
                        $scope.isRouteLoading = false;
                        // console.log(JSON.stringify(e.dataSend));
                    }, function(err){
                        $scope.isRouteLoading = true;
                        throw err;
                    });
                }

            }
            $scope.cetak = function() {
                var listRawRequired = [
                    // "item.pegawai|k-ng-model|Pegawai",
                    "item.monitoringAwal|k-ng-model|Tanggal awal",
                    "item.monitoringAkhir|k-ng-model|Tanggal akhir",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var idPegawai, unitKerja;
                    var tanggalAwal = dateHelper.formatDate($scope.item.monitoringAwal, "YYYY-MM-DD");
                    var tanggalAkhir = dateHelper.formatDate($scope.item.monitoringAkhir, "YYYY-MM-DD");
                    switch(validate){
                        case 2:
                            if(!$scope.item.pegawai) {messageContainer.error("Pegawai belum di pilih"); return};
                            idPegawai = $scope.item.pegawai.id;
                            unitKerja = "";
                            break;
                        case 3:
                            if(!$scope.item.unitKerja) {messageContainer.error("Unit kerja belum di pilih"); return};
                            idPegawai = "";
                            unitKerja = $scope.item.unitKerja.id;
                            break;
                    }
                    // var urlLaporan = reportHelper.open("reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir);
                    // window.open(urlLaporan, '_blank');

                    var fixUrlLaporan = cetakHelper.open("reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir + "&unitKerja=" + unitKerja);
                    window.open(fixUrlLaporan, "RincianAbsensi", "width=800, height=600");
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.klikInputJadwalDinas = function(){
                $state.go('JadwalAbsensiPegawai');
            }
        }
    ]);
});