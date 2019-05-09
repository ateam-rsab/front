define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputLemburPegawaiSDMCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper', 'ReportHelper', 'CetakHelper',
        function($rootScope, $scope, ModelItem, $state, ManageSdm, dateHelper, reportHelper, cetakHelper) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            // $scope.dataVOloaded = true;
            var validate = 2;
            var validateAll = 0;
            $scope.paramURl = '';
            //1 by tanggal
            //2	by nama pegawai
            //3 by unit kerja
            // ManageSdm.findPegawai().then(function(data){
            //     $scope.listPegawai = data.data.data;
            //     $scope.isRouteLoading = false;
            // }, function(error){
            //     messageContainer.error('Terjadi kesalahan saat load data pegawai');
            // })
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };
            $scope.formatInteger = {
                culture: "de-DE",
                format: "{0:n0}"
            }
            $scope.cbAll = function() {
                if ($scope.vals === true) {
                    validateAll = 1;
                } else {
                    validateAll = 0;
                }
            }

            var arrPenanggungJawab = [];
            arrPenanggungJawab.push(ModelItem.getPegawai());
            $scope.listPenanggungJawab = arrPenanggungJawab;
            var arrListUnitKerja = [];
            arrListUnitKerja.push(ModelItem.getPegawai().ruangan);
            $scope.listUnitKerja = arrListUnitKerja;
            $scope.item.unitKerja = ModelItem.getPegawai().ruangan;

            $scope.$watch('item.periode', function(newValue, oldValue) {
                $scope.item.pegawai = "";
                $scope.listPegawai = {};
                if (!_.isUndefined(newValue)) {

                    ManageSdm.getOrderList("sdm/get-all-pegawai-aktif-verified-by-unitkerja/" + dateHelper.getPeriodFormat($scope.item.periode)).then(function(dat) {
                        $scope.listPegawai = dat.data;
                    });
                }

            });


            function myFunction(item, index) {
                if (item.id == JSON.stringify(ModelItem.getPegawai().ruangan.id)) {
                    alert("index[" + index + "]: " + item + "<br>");
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



            $scope.cari = function() {
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.pegawai|k-ng-model|Pegawai",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.cs();
                    $scope.paramURl = "sdm/get-kehadiran-lembur-sdm-by-periode/" + $scope.item.pegawai.id + "/" + dateHelper.getPeriodFormat($scope.item.periode);
                    $scope.pencarian();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }


            $scope.pencarian = function() {
                $scope.isRouteLoading = true;
                $scope.isLoadingData = true;
                ManageSdm.getOrderList($scope.paramURl).then(function(dat) {
                    if (validate === 2) {
                        $scope.item.terlambat = dat.data.data.jumlahTerlambat;
                        $scope.item.pulang = dat.data.data.jumlahPulangAwal;
                        $scope.item.kelebihan = (dat.data.data.jumlahKelebihanJamKerja / 60).toFixed(2);
                        $scope.item.efektif = (dat.data.data.jumlahJamEfektif / 60).toFixed(2);
                        $scope.item.titleFooter = 'Jumlah : ';
                        $scope.item.jumlahJamEfektifKerja = (dat.data.data.jumlahJamEfektif / 60).toFixed(2);
                        $scope.item.jumlahJamLemburUnitKerja = dat.data.data.jumlahJamLemburUnitKerja;
                        $scope.item.jamYangHarusDipenuhi = dat.data.data.factorRate;
                        $scope.item.jumlahHariKerja = dat.data.data.hari;
                        // $scope.item.jumlahJamDisetujui = (dat.data.data.jumlahJamKerjaDiVerifikasi / 60).toFixed(2);
                    } else {
                        $scope.item.terlambat = "";
                        $scope.item.pulang = "";
                        $scope.item.efektif = "";
                        $scope.item.titleFooter = '';
                        $scope.item.kelebihan = '';
                        $scope.item.jumlahJamLemburUnitKerja = '';
                        // $scope.item.jumlahJamDisetujui = '';

                    }

                    $scope.sourceOrder = new kendo.data.DataSource({
                        data: dat.data.data.listkehadiran,
                        schema: {
                            model: {
                                id: "tanggal",
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
                        aggregate: [
                            { field: "kelebihanJamKerja", aggregate: "sum"},
                            { field: "accKelebihanJamKerjaUnitKerja", aggregate: "sum"},
                        ]
                    });
                    //
                    $scope.mainGridOption = {
                        //editable: true,
                        selectabled: true,
                        columns: [
                            /* { field: "idFinger", title: "Id Finger Print ", visible: false, width: "5%" },*/
                            // { field: "nip", title: "NIP", visible: false, width: "170px" },
                            // { field: "nama", title: "<center>Nama Pegawai</center>", width: "170px", footerTemplate: "{{item.titleFooter}}" },
                            { field: "tanggal", title: "<center>Tanggal</center>", width: "120px" },
                            {
                                title: "<center>Jadwal</center> ",
                                columns: [
                                    { field: "jadwalMasuk", title: "Masuk", width: "60px" },
                                    { field: "jadwalPulang", title: "Pulang", width: "60px" }
                                ],
                            },
                            {
                                title: "<center>Absensi</center> ",
                                columns: [
                                    { field: "absensiMasuk", title: "Masuk", width: "60px" },
                                    { field: "absensiPulang", title: "Pulang", width: "60px" }
                                ],
                            },
                            { field: "terlambat", title: "<center>Terlambat</center>", width: "80px", footerTemplate: "Total : {{item.terlambat}}" },
                            { field: "pulangAwal", title: "<center>Pulang Awal</center>", width: "80px", footerTemplate: "Total : {{item.pulang}}" },
                            { field: "kelebihanJamKerja", title: "<center>Kelebihan Jam Kerja</center>", width: "80px", footerTemplate: "Total : {{item.kelebihan}}" },
                            { field: "jamEfektif", title: "<center>Jam Efektif</center>", width: "80px", footerTemplate: "Total : {{item.efektif}}" },
                            { field: "namaShift", title: "<center>Shift</center>", width: "120px" },
                            {
                                title: "<center>Verifikasi Unit Kerja</center> ",
                                columns: [
                                    { field: "tanggalVerifikasiUnitKerja", title: "<center>Tanggal</center>", width: "80px" },
                                    { field: "accKelebihanJamKerjaUnitKerja", title: "<center>Jumlah Lembur</center>", width: "60px", aggregates: ["sum"], footerTemplate: "Total : #= kendo.toString(sum, 'n0')#"  },
                                    { template: "<input type='checkbox' class='checkbox' ng-click='onClick($event, dataItem)' ng-model='dataItem.verifikasi' ng-disabled='!dataItem.norecVerifikasiUnitKerja'/>", width: "25px"}
                                ],
                            },
                        ]
                    }
                    //
                    $scope.isRouteLoading = false;
                    $scope.isLoadingData = false;
                }, function(error){
                    $scope.isRouteLoading = false;
                    $scope.isLoadingData = false;
                    alert('error');
                });
            }
            var arrJamLembur = [];
            function getTotalJam(){
                $scope.item.jumlahJamDisetujui = 0;
                for(var i = 0; i < arrJamLembur.length; i++){
                    if(typeof arrJamLembur[i].accKelebihanJamKerjaUnitKerja === 'string'){
                        arrJamLembur[i].accKelebihanJamKerjaUnitKerja = parseInt(arrJamLembur[i].accKelebihanJamKerjaUnitKerja);
                    }
                    $scope.item.jumlahJamDisetujui += arrJamLembur[i].accKelebihanJamKerjaUnitKerja;
                }
            }
            $scope.onClick = function(e, data){
                // if (!$scope.item.jumlahJamDisetujui) {
                //     $scope.item.jumlahJamDisetujui = 0
                // }
                if (data.verifikasi == true) {
                    // $scope.item.jumlahJamDisetujui += data.accKelebihanJamKerjaUnitKerja;
                    arrJamLembur.push(data);
                    getTotalJam();
                } else if (data.verifikasi == false) {
                    // $scope.item.jumlahJamDisetujui -= data.accKelebihanJamKerjaUnitKerja;
                    for(var i=0; i <arrJamLembur.length; i++){
                        if(arrJamLembur[i].tanggal == data.tanggal){
                            arrJamLembur.splice(i, 1);
                            break;
                        }
                    }
                    getTotalJam();
                }
            }
            $scope.klik = function(current) {

                $scope.current = current;
                $scope.item.jabatan = current.jabatanInternal;
                $scope.item.unitKerjatxt = current.namaRuangan;
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
                var dataVerifikasi = [];
                var dataSave = {};
                var hasil = _.filter(data, function(value) {
                    return value.norecVerifikasiUnitKerja !== undefined;
                });
                var noVerifikasiSdm = _.filter(data, function(value) {
                    return value.norecVerifikasiSdm !== undefined;
                });
                for (var x = 0; x < hasil.length; x++) {
                    if (hasil[x].verifikasi == true) {
                        hasil[x].verifiedLembur = hasil[x].accKelebihanJamKerjaUnitKerja
                    } else {
                        hasil[x].verifiedLembur = 0
                    }
                    dataSave = {
                        "pulangAwal": hasil[x].pulangAwal,
                        "jadwalPulang": hasil[x].jadwalPulang,
                        "absensiPulang": hasil[x].absensiPulang,
                        "shiftKerja": {
                            "id": hasil[x].idShift
                        },
                        "terlambat": hasil[x].terlambat,
                        "alasan": hasil[x].alasan,
                        "pegawai": {
                            "id": hasil[x].idPegawai
                        },
                        "absensiMasuk": hasil[x].absensiMasuk,
                        "jadwalmasuk": hasil[x].jadwalMasuk,
                        "jamEfektif": hasil[x].jamEfektif,
                        "tanggal": hasil[x].tanggal,
                        //Verifikasi lembur sama unit kerja
                        "verifiedLembur": hasil[x].verifiedLembur,
                        "strukVerifikasi": {
                            "noRec": hasil[x].norecVerifikasiUnitKerja,
                            "ruangan": {
                                "id": ModelItem.getPegawai().ruangan.id
                            },
                            "keteranganlainnya": hasil[x].accKelebihanJamKerjaUnitKerja,
                            "tglverifikasi": hasil[x].tanggalVerifikasiUnitKerja, //Date.parse(data[x].tanggal)
                            "loginUser": {
                                "id": hasil[x].penanggungJawab.id
                            }
                        }
                    };
                    datas.push(dataSave);
                };
                var dataSend = {};
                if (noVerifikasiSdm.length > 0) {
                    dataSend = {
                        "monitoringAbsen": datas,
                        "jumlahJamDisetujui": $scope.item.jumlahJamDisetujui,
                        "ruangan": {
                            "id": ModelItem.getPegawai().ruangan.id
                        },
                        "pegawaiId": ModelItem.getPegawai().id,
                        "noRecSdm": noVerifikasiSdm[0].norecVerifikasiSdm
                    }
                } else {
                    dataSend = {
                        "monitoringAbsen": datas,
                        "jumlahJamDisetujui": $scope.item.jumlahJamDisetujui,
                        "ruangan": {
                            "id": ModelItem.getPegawai().ruangan.id
                        },
                        "pegawaiId": ModelItem.getPegawai().id
                    }
                }
                ManageSdm.saveDataUji(dataSend, "sdm/save-input-lembur-verifikasi-sdm/").then(function(e) {
                    console.log(JSON.stringify(e.dataSend));
                });

            }
            $scope.cetak = function() {
                var idPegawai = $scope.item.pegawai.id;
                var tanggalAwal = dateHelper.formatDate($scope.item.monitoringAwal, "YYYY-MM-DD");
                var tanggalAkhir = dateHelper.formatDate($scope.item.monitoringAkhir, "YYYY-MM-DD");
                // var urlLaporan = reportHelper.open("reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir);
                // window.open(urlLaporan, '_blank');
                var fixUrlLaporan = cetakHelper.open("reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir);
                window.open(fixUrlLaporan, '_blank');
            };
            $scope.verifikasi = function(e) {
                e.container.kendoWindow({
                    width: "630px",
                    height: "315px",
                    title: "Rams's Ten Principles of Good Design",
                    actions: ["Refresh", "Close"],
                    content: "testing",
                    visible: false,

                    open: onOpen,
                    activate: onActivate,
                    close: onClose,
                    deactivate: onDeactivate,

                    refresh: onRefresh,

                    resize: onResize,
                    dragstart: onDragStart,
                    dragend: onDragEnd
                }).data("kendoWindow").open();
            };



        }
    ]);
});