define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputLemburPegawaiUnitKerjaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper', 'ReportHelper', 'FindSdm',
        function($rootScope, $scope, ModelItem, $state, ManageSdm, dateHelper, reportHelper, FindSdm) {

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
            $scope.item.monitoringAwal = new Date();
            $scope.item.monitoringAkhir = new Date();
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };

            $scope.cbAll = function() {
                if ($scope.vals === true) {
                    validateAll = 1;
                } else {
                    validateAll = 0;
                }
            }

            // var arrPenanggungJawab = [];
            // arrPenanggungJawab.push(ModelItem.getPegawai());
            // $scope.listPenanggungJawab = arrPenanggungJawab;
            // var arrListUnitKerja = [];

            // arrListUnitKerja.push(ModelItem.getPegawai().ruangan);
            // $scope.listUnitKerja = arrListUnitKerja;

            FindSdm.getUnitKerja().then(function(res){
                $scope.listUnitKerja = res.data.data;
            })
            // $scope.item.unitKerja = ModelItem.getPegawai().ruangan;

            // ManageSdm.getOrderList("pegawai/get-all-pegawai-aktif-by-ruangan/?idRuangan=" + ModelItem.getPegawai().ruangan.id).then(function(dat) {
            //     $scope.listPegawai = dat.data;
            //     console.log("Jumlah Pegawai :" + dat.data.length);
            // });
            $scope.listPenanggungJawab = [];
            var pegawaiLogin = ModelItem.getPegawai();
            $scope.item.unitKerja = ModelItem.getPegawai().ruangan;

            $scope.listPenanggungJawab.push({
                id: ModelItem.getPegawai().id,
                namaLengkap: ModelItem.getPegawai().namaLengkap
            });

            if (pegawaiLogin.ruangan.departemenId === 42) {
                ManageSdm.getOrderList("sdm/get-data-pegawai?pegawaiId="+ pegawaiLogin.id).then(function(res){
                    $scope.currentLogin = res.data.data;
                }, (err) => {
                    throw err;
                })
                .then(function(){
                    if($scope.currentLogin){
                        ManageSdm.getOrderList("pegawai/get-all-pegawai-aktif-by-ruangan/?idRuangan=" + $scope.currentLogin.subUnitKerjaId).then(function(dat) {
                            $scope.listPegawai = dat.data;
                        });
                    }
                })
            } else {
                ManageSdm.getOrderList("sdm/get-pegawai-bawahan/" + pegawaiLogin.id).then(function (dat) {
                    if(dat.data.data.length > 0) {
                        $scope.listPegawai = dat.data.data;
                    } else {
                        $scope.listPegawai = [];
                    }
                }).then(function(){
                    // $scope.listPegawai.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap});
                    $scope.isLoginPegawai = true;
                });
            }
            function myFunction(item, index) {
                if (item.id == JSON.stringify(ModelItem.getPegawai().ruangan.id)) {
                    alert("index[" + index + "]: " + item + "<br>");
                }
            }
            $scope.cariTgl = function() {
                if ($scope.item.monitoringAwal === undefined || $scope.item.monitoringAkhir === undefined) {
                    messageContainer.error("tanggal monitoring harus dipilih terlebih dahulu");
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

            $scope.cari = function() {
                //1 by tanggal
                //2 by nama pegawai
                //3 by unit kerja
                //get from validat
                $scope.cs();
                switch (validate) {
                    case 1:
                        if ($scope.item.monitoringAwal === undefined || $scope.item.monitoringAkhir === undefined) {
                            messageContainer.error("tanggal monitoring harus dipilih terlebih dahulu");
                            return;
                        } else {
                            $scope.paramURl = "sdm/get-kehadiran-all-pegawai/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                            $scope.pencarian();
                        }
                        break;
                    case 2:
                        if ($scope.item.pegawai === undefined) {
                            messageContainer.error("Nama Pegawai harus dipilih terlebih dahulu");

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
                        if ($scope.item.unitKerja === undefined) {
                            messageContainer.error("Unit Kerja harus dipilih terlebih dahulu");
                            return;
                        } else {
                            $scope.paramURl = "sdm/get-kehadiran-by-ruangan/" + $scope.item.unitKerja.id + "/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                            $scope.pencarian();
                            break;
                        }
                        break;
                    default:
                }
            }
            $scope.opsiNumeric = {
                format: "n0",
                decimals: 0
            }

            $scope.pencarian = function() {
                $scope.isRouteLoading = true;
                ManageSdm.getOrderList($scope.paramURl).then(function(dat) {
                    $scope.isLoadingData = true;
                    if (validate === 2) {
                        $scope.item.terlambat = dat.data.data.jumlahTerlambat;
                        $scope.item.pulang = dat.data.data.jumlahPulangAwal;
                        $scope.item.kelebihan = dat.data.data.jumlahKelebihanJamKerja;
                        $scope.item.efektif = (dat.data.data.jumlahJamEfektif / 60).toFixed(2);
                        $scope.item.titleFooter = 'Jumlah : ';
                    } else {
                        $scope.item.terlambat = "";
                        $scope.item.pulang = "";
                        $scope.item.efektif = "";
                        $scope.item.titleFooter = '';
                        $scope.item.kelebihan = '';
                    }
                    dat.data.data.listkehadiran.forEach(function(elemen){
                        elemen.maxVerifJamKerjaUnitKerja = elemen.kelebihanJamKerja - elemen.terlambat;
                    })
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
                            { field: "kelebihanJamKerja", aggregate: "sum", width: "150px" }
                        ]
                    });
                    //
                    $scope.mainGridOption = {
                        selectable: "row",
                        editable: true,
                        columns: [
                            { field: "idPegawai", title: "id", visible: false },
                            { field: "jabatanInternal", title: "jabatanInternal", visible: false },
                            { field: "namaRuangan", title: "namaRuangan", visible: false },
                            { field: "idFinger", title: "Id Finger Print ", visible: false },
                            { field: "nip", title: "nip", visible: false },
                            { field: "idShift", title: "idShift", visible: false },
                            { field: "nama", title: "<center>Nama Pegawai</center>", width: "200px", footerTemplate: "{{item.titleFooter}}" },
                            { field: "tanggal", title: "<center>Tanggal</center>", width: "120px" },
                            {
                                title: "<center>Jadwal</center> ",
                                columns: [
                                    { field: "jadwalMasuk", title: "Masuk", width: "100px" },
                                    { field: "jadwalPulang", title: "Pulang", width: "100px" }
                                ],
                            },
                            {
                                title: "<center>Absensi</center> ",
                                columns: [
                                    { field: "absensiMasuk", title: "Masuk", width: "100px" },
                                    { field: "absensiPulang", title: "Pulang", width: "100px" }
                                ],
                            },
                            { field: "terlambat", title: "<center>Terlambat</center>", width: "100px", footerTemplate: "{{item.terlambat}}" },
                            { field: "pulangAwal", title: "<center>Pulang Awal</center>", width: "100px", footerTemplate: "{{item.pulang}}" },
                            { field: "kelebihanJamKerja", title: "<center>Kelebihan Jam Kerja</center>", width: "100px", aggregates: ["sum"], footerTemplate: "#= kendo.toString(sum,'0.00')#" },
                            { field: "jamEfektif", title: "<center>Jam Efektif</center>", width: "100px", footerTemplate: "{{item.efektif}}" },
                            { field: "namaShift", title: "<center>Shift</center>", width: "100px" },
                            {
                                title: "",
                                columns: [
                                    { field: "tanggalVerifikasiUnitKerja", title: "<center>Verifikasi</center>", width: "120px" },
                                    {
                                        "command": [{
                                            name: "edit",
                                            //text: "Edit"
                                            text: { cancel: "", edit: "Verifikasi" },
                                            icon: { cancel: "" },
                                            button: { cancel: "" }
                                        }],
                                        "title": " ",
                                        width: "120px"
                                    }
                                ]
                            }
                        ],
                        //editable: "popup",
                        editable: {
                            mode: "popup",
                            template: kendo.template($("#template").html())
                        },
                        //Change kendo window title
                        edit: function(e) {
                            e.container.kendoWindow("title", "Verifikasi Lembur Pegawai");
                            $scope.dataItem = e.model;
                            if($scope.listPenanggungJawab.length == 0){
                                ManageSdm.getOrderList("sdm/get-pegawai-atasan/" + $scope.dataItem.idPegawai).then(function (dat) {
                                    if(dat.data.data.length > 0) {
                                        var atasanPegawai = dat.data.data[0];
                                        var tmpPenanggungJawab = {
                                            id: atasanPegawai.idAtasanLangsung,
                                            namaLengkap: atasanPegawai.namaAtasanLangsung,
                                        }
                                        $scope.listPenanggungJawab.push(tmpPenanggungJawab);
                                        $scope.dataItem.penanggungJawab =  $scope.listPenanggungJawab[0];
                                    }
                                    // if($scope.dataItem.idPegawai == $scope.dataItem.penanggungJawab.id){
                                    //     delete $scope.dataItem.penanggungJawab;
                                    // }
                                });
                            }
                            $scope.dataItem.status = "Lembur";
                            // if($scope.dataItem.tanggalVerifikasiUnitKerja){
                            //     $scope.disableInputVerifikasi = true;
                            //     $('.k-grid-update').css('display', 'none'); 
                            // } else {
                            //     $scope.disableInputVerifikasi = false;
                            // }
                            
                        },
                        dataBound: function(e) {
                            $("#grid tbody tr .k-grid-edit").each(function() {
                                var currentDataItem = $("#grid").data("kendoGrid").dataItem($(this).closest("tr"));

                                if (currentDataItem.kelebihanJamKerja < 120) {
                                    // hide tombol verifikasi if condition above are true
                                    $(this).closest("tr").find(".k-grid-edit").hide();
                                } else {

                                }
                            })
                        },
                        save: function(e){
                            if(e.model.tanggalVerifikasiUnitKerja) e.model.tanggalVerifikasiUnitKerja = dateHelper.formatDate(e.model.tanggalVerifikasiUnitKerja, "YYYY-MM-DD");
                            delete $scope.dataItem;
                        }
                    }
                    $scope.isLoadingData = false;
                }).then(function(){
                    $scope.isRouteLoading = false;
                }, function(error){
                    $scope.isRouteLoading = false;
                });
            }

            $scope.limitMinMax = function(e) {
                console.log(JSON.stringify(e));
            }
            // $scope.klik = function(current) {
            //     $scope.current = current;
            //     $scope.item.jabatan = current.jabatanInternal;
            //     $scope.item.unitKerjatxt = current.namaRuangan;
            //     $scope.item.idFingerPrint = current.idFinger;
            //     $scope.item.nip = current.nip;
            //     $scope.item.nama = current.nama;
            // };

            $scope.cs = function() {
                $scope.item.jabatan = "";
                $scope.item.unitKerjatxt = "";
                $scope.item.idFingerPrint = "";
                $scope.item.nip = "";
                $scope.item.nama = "";

            };

            $scope.save = function() {
                var data = $scope.sourceOrder._data;
                var datas = [];
                var dataVerifikasi = [];
                var dataSave = {};
                if(data.length > 0){
                    $scope.isRouteLoading = true;
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].penanggungJawab && data[x].accKelebihanJamKerjaUnitKerja >= 120) {
                            dataSave = {
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
                                "tanggal": data[x].tanggal,
                                "kelebihanJamKerja":data[x].kelebihanJamKerja,
                                //Verifikasi lembur sama unit kerja
                                "strukVerifikasi": {
                                    "noRec": data[x].norecVerifikasiUnitKerja,
                                    // "ruangan": {
                                    //     "id": ModelItem.getPegawai().ruangan.id
                                    // },
                                    "keteranganlainnya": data[x].accKelebihanJamKerjaUnitKerja,
                                    "tglverifikasi": data[x].tanggalVerifikasiUnitKerja, //Date.parse(data[x].tanggal)
                                    "loginUser": {
                                        "id": ModelItem.getPegawai().id
                                    }
                                }
                            };
                        } else {
                            dataSave = {
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
                                "tanggal": data[x].tanggal,
                                "kelebihanJamKerja":data[x].kelebihanJamKerja
                            };
                        }
                        datas.push(dataSave);
                    };
                    var dataSend = {
                        "monitoringAbsen": datas
                    }   
                    // console.log(JSON.stringify(dataSend));
                    ManageSdm.saveDataUji(dataSend, "sdm/save-monitoring-absen/").then(function(e) {
                        // console.log(JSON.stringify(e.dataSend));
                        $scope.isRouteLoading = false;
                        $scope.cari();
                    }, (err) => {
                        $scope.isRouteLoading = false;
                        throw err;
                    });
                }
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
        }
    ]);
});