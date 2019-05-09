define(['initialize'], function(initialize) {'use strict';
    initialize.controller('AbsenManualCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper', 'ReportHelper', 'FindPegawai', 'CetakHelper', 'FindSdm',
        function($q, $rootScope, $scope, ModelItem, $state, ManageSdm, dateHelper, reportHelper, findPegawai, cetakHelper, FindSdm) {
            $scope.now = new Date();
            $scope.item = {
                monitoringAwal: $scope.now,
                monitoringAkhir: $scope.now
            };
            $scope.dataVOloaded = true;
            $scope.dataAbsen = new kendo.data.DataSource({
                data: [],
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
                aggregate: [
                    { field: "nama", aggregate: "count"},
                    { field: "kelebihanJamKerja", aggregate: "sum"},
                    { field: "jamEfektif", aggregate: "sum"}
                ]
            });
            $scope.mainGridOption = {
                dataSource: $scope.sourceOrder,
                editable: true,
                selectable: "row",
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
            $scope.formatJam24 = {
                // value: new Date(),          //set default value
                format: "HH:mm",	//set date format
            }
            $scope.isEditable = false;
            $scope.isRouteLoading = true;

            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function(dat) {
                $scope.listPegawai = dat.data;
                $scope.isRouteLoading = false;
            }, (error) => {
                throw(error);
                $scope.isRouteLoading = false;
            });

            $scope.Cari = function() {
                var listRawRequired = [
                    "item.pegawai|k-ng-model|Nama pegawai",
                    "item.monitoringAwal|k-ng-model|Periode awal",
                    "item.monitoringAkhir|k-ng-model|Periode akhir",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.paramURl = "sdm/get-kehadiran/" + $scope.item.pegawai.id + "/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                    $scope.isRouteLoading = true;
                    ManageSdm.getOrderList($scope.paramURl).then(function(dat) {
                        $scope.dataAbsen.data(dat.data.data.listkehadiran);
                        $scope.isRouteLoading = false;
                    });
                    // $scope.pencarian();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.klik = function(current) {
                if (!current) return;
                $scope.current = current;
                if(current.absensiMasuk === "-" || current.absensiPulang === "-"){
                    $scope.isEditable = true;
                    $scope.current.tanggal =  $scope.current.absensiMasuk = new Date(current.dates);
                }
                // $scope.item.jabatan = current.jabatanInternal;
                // $scope.item.unitKerjatxt = current.unitKerja;
                // $scope.item.idFingerPrint = current.idFinger;
                // $scope.item.nip = current.nip;
                // $scope.item.nama = current.nama;
            };
            $scope.Save = function(){
                var listRawRequired = [
                    "current.idPegawai|ng-model|Pegawai",
                    "current.tanggal|k-ng-model|Tanggal",
                    "current.absensiMasuk|k-ng-model|Jam"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var item = {
                        "monitoringAbsen":[{
                                "tanggal": dateHelper.getDateTimeFormatted3($scope.current.tanggal),
                                "jam": dateHelper.getJamMenitDetikFormatted($scope.current.jam),
                                "pegawai":{
                                        "id": $scope.current.idPegawai
                                }
                        }]
                    };
                    ManageSdm.saveAbsenManual(item).then(function(data){
                        delete $scope.current;
                        $scope.isEditable = false;
                        $scope.Cari();
                    })
                    console.log(JSON.stringify(item));
                }
            }
            // $scope.cs = function() {
            //     $scope.item.jabatan = "";
            //     $scope.item.unitKerjatxt = "";
            //     $scope.item.idFingerPrint = "";
            //     $scope.item.nip = "";
            //     $scope.item.nama = "";
            // };

            // $scope.Save = function() {
            //     var data = $scope.sourceOrder._data;
            //     var datas = [];
            //     for (var x = 0; x < data.length; x++) {

            //         datas.push({
            //             "pulangAwal": data[x].pulangAwal,
            //             "jadwalPulang": data[x].jadwalPulang,
            //             "absensiPulang": data[x].absensiPulang,
            //             "shiftKerja": {
            //                 "id": data[x].idShift
            //             },
            //             "terlambat": data[x].terlambat,
            //             "alasan": data[x].alasan,
            //             "pegawai": {
            //                 "id": data[x].idPegawai
            //             },
            //             "absensiMasuk": data[x].absensiMasuk,
            //             "jadwalmasuk": data[x].jadwalMasuk,
            //             "jamEfektif": data[x].jamEfektif,
            //             "tanggal": data[x].tanggal

            //         });
            //     };
            //     var dataSend = {
            //         "monitoringAbsen": datas
            //     }
            //     console.log(JSON.stringify(dataSend));
            //     ManageSdm.saveDataUji(dataSend, "sdm/save-monitoring-absen/").then(function(e) {
            //         console.log(JSON.stringify(e.dataSend));
            //     });

            // }
            // $scope.cetak = function() {
            //     var listRawRequired = [
            //         "item.pegawai|k-ng-model|Pegawai",
            //         "item.monitoringAwal|k-ng-model|Tanggal awal",
            //         "item.monitoringAkhir|k-ng-model|Tanggal akhir",
            //     ]
            //     var isValid = ModelItem.setValidation($scope, listRawRequired);
            //     if(isValid.status){
            //         var idPegawai = $scope.item.pegawai.id;
            //         var tanggalAwal = dateHelper.formatDate($scope.item.monitoringAwal, "YYYY-MM-DD");
            //         var tanggalAkhir = dateHelper.formatDate($scope.item.monitoringAkhir, "YYYY-MM-DD");
            //         if($scope.item.unitKerja) {
            //             var unitKerja = $scope.item.unitKerja.id
            //         } else {
            //             var unitKerja = "";
            //         }
            //         // var urlLaporan = reportHelper.open("reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir);
            //         // window.open(urlLaporan, '_blank');

            //         var fixUrlLaporan = cetakHelper.open("reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir + "&unitKerja=" + unitKerja);
            //         window.open(fixUrlLaporan, '_blank')
            //     }else{
            //         ModelItem.showMessages(isValid.messages);
            //     }
            // };
            // $scope.klikInputJadwalDinas = function(){
            //     $state.go('JadwalAbsensiPegawai');
            // }
        }
    ]);
});