define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekamDataPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', 'ManageSarprasPhp', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, manageSarprasPhp, modelItemAkuntansi, $mdDialog) {
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            // if (!$scope.dataLogin.ruangan.namaruangan == 'Inst.Teknologi & Informasi') {
            //     $state.go('UnderMaintenance', { namaForm: 'RekamDataPegawai' });
            // }
            if ($scope.dataLogin.id == 320263) {
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }

            let acTtdSk = $('#autoCompleteAtasanTtd').data("kendoAutoComplete");
            let acJabatan = $('#autoCompleteAtasanJabatan').data("kendoAutoComplete");

            $scope.isSimpan = true;
            $scope.isAtasan = false;
            $scope.isDirut = false;
            $scope.isNotDirut = true;
            $scope.isDireksi = false;
            $scope.isStaff = true;
            // $scope.isRekanan = false;
            $scope.isEdit = false;
            $scope.dataVOloaded = true;
            $scope.enableBtnSimpanJabatanInternal = true;
            // $scope.item.detailKategoryPegawai = '';
            $scope.item = {};
            $scope.ji = {};
            $scope.dataYesOrNo = [
                { name: 'Ya', id: 1 },
                { name: 'Tidak', id: 2 }
            ]
            $scope.listOfGolonganRhesus = [
                { name: '+', id: 1 },
                { name: '-', id: 2 }
            ]
            var getPangkatDanGolongan = function () {
                ManageSdmNew.getListData('pegawai/get-all-pangkat-golongan').then(function (res) {
                    $scope.listOfPangkat = res.data.data;
                    // console.log(res);
                })
            }
            $scope.init = function () {
                getPangkatDanGolongan();
                $q.all([
                    ManageSdmNew.getListData("sdm/get-riwayat-jabatan?idPegawai=" + $state.params.idPegawai + "&idJenisJabatan=3"),
                    // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-data-riwayat-pendidikan-pgw?id=" + $state.params.idPegawai),
                    ManageSdmNew.getListData("sdm/get-data-riwayat-pendidikan-pgw?id=" + $state.params.idPegawai),
                    ManageSdm.getOrderList("service/list-generic/?view=Agama&select=id,agama&order=agama:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=PosisiLamaran&select=id,name&order=name:asc", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinanPegawai&select=id,statusPerkawinan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinan&select=id,statusPerkawinan&criteria=statusEnabled&values=true&order=statusPerkawinan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=KategoryPegawai&select=id,kategoryPegawai&criteria=statusEnabled&values=true&order=kategoryPegawai:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisKelamin&select=id,jenisKelamin&criteria=statusEnabled&values=true&order=jenisKelamin:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Eselon&select=id,eselon&criteria=statusEnabled&values=true&order=eselon:asc", true),
                    ManageSdmNew.getListData("sdm/get-all-golongan"),
                    ManageSdm.getOrderList("service/list-generic/?view=KelompokShift&select=id,name&criteria=statusEnabled&values=true&order=name:asc", true),
                    ManageSdmNew.getListData("sdm/get-all-unit-kerja"),
                    ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                    ManageSdmNew.getListData("sdm/get-all-kedudukan"),
                    ManageSdmNew.getListData("sdm/get-detail-kelompok-jabatan"),
                    ManageSdmNew.getListData("sdm/get-riwayat-jabatan?idPegawai=" + $state.params.idPegawai + "&idJenisJabatan=1"),
                    ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true&order=namaLengkap:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=statusEnabled&values=true&order=namaRuangan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true&order=namaJabatan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisPegawai&select=id,jenisPegawai&criteria=statusEnabled&values=true&order=jenisPegawai:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=NilaiKelompokJabatan&select=id,detailKelompokJabatan&criteria=statusEnabled&values=true&order=detailKelompokJabatan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=KualifikasiJurusan&select=id,kualifikasiJurusan&criteria=statusEnabled&values=true&order=kualifikasiJurusan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Pangkat&select=id,namaPangkat&criteria=statusEnabled&values=true&order=namaPangkat:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Pendidikan&select=id,namaPendidikan&criteria=statusEnabled&values=true&order=namaPendidikan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=PenghasilanTidakKenaPajak&select=id,deskripsi&criteria=statusEnabled&values=true&order=deskripsi:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Suku&select=id,suku&criteria=statusEnabled&values=true&order=suku:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=TypePegawai&select=id,typePegawai&criteria=statusEnabled&values=true&order=typePegawai:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=GolonganDarah&select=id,golonganDarah&criteria=statusEnabled&values=true&order=golonganDarah:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Rekanan&select=id,namaRekanan&criteria=statusEnabled&values=true&order=namaRekanan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled&values=true&order=jenisJabatan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Negara&select=id,namaNegara&criteria=statusEnabled&values=true&order=namaNegara:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=SatuanKerja&select=id,satuanKerja&criteria=statusEnabled&values=true&order=satuanKerja:asc", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                ]).then(function (res) {
                    // var tempStatusKawin = [];
                    // console.log(res);
                    if (res[0].data) {
                        $scope.ListJabatanInternal = res[0].data.data.dataJabatanInternal;
                        $scope.ListJabatanInternalPop = res[0].data.data.dataJabatanInternal;
                    }
                    if (res[14].data.data.dataJabatanFungsional != null) {
                        $scope.jabatanFungsional = {
                            namaJabatan: res[14].data.data.dataJabatanFungsional[0].namaJabatan,
                            id: res[14].data.data.dataJabatanFungsional[0].id
                        };
                    }
                    $scope.historyListPedidikan = res[1].data.data.data;
                    // $scope.ListAgama = res[2].data.splice(1, 6);
                    let tempDataAgama = res[2].data;
                    $scope.ListPosisiLamaran = res[3].data;
                    var tempStatusKawin = res[4].data;
                    $scope.ListStatusKawin = [];
                    tempStatusKawin.forEach(function (el) {
                        if (el.statusPerkawinan !== '-') {
                            var dataTemp = {
                                id: el.id,
                                statusPerkawinan: el.statusPerkawinan
                            }
                            $scope.ListStatusKawin.push(dataTemp);
                        }
                    });
                    $scope.ListKategoriPegawai = res[5].data.splice(1);
                    $scope.ListJenisKelamin = res[6].data.splice(1);
                    $scope.ListEselon = res[7].data;
                    $scope.ListGolonganPegawai = res[8].data;
                    $scope.ListPolaKerja = res[9].data;
                    $scope.ListUnitKerja = res[10].data.data;
                    $scope.ListUnitKerjaPop = res[10].data.data;
                    $scope.ListSubUnitKerja = res[11].data.data;
                    $scope.ListSubUnitKerjaPop = res[11].data.data;
                    // $scope.ListKedudukanPegawai = res[12].data.data;
                    var tempKedudukanPegawai = res[12].data.data;
                    // $scope.ListDetilKelompokJabatan = res[13].data.data;
                    var tempDataKelompokJabatan = res[13].data.data;
                    $scope.ListRuangan = res[16].data;
                    var tempDataPegawai = res[15].data;
                    $scope.listPegawai = [];
                    $scope.listPegawaiRiwayat = [];
                    // $scope.listPegawai = res[15].data;
                    // $scope.listPegawaiRiwayat = res[15].data;
                    tempDataPegawai.forEach(function (el) {
                        if (el.id !== 320272) {
                            var dataTemp = {
                                namaLengkap: el.namaLengkap,
                                id: el.id
                            }
                            $scope.listPegawai.push(dataTemp);
                            $scope.listPegawaiRiwayat.push(dataTemp);
                        }
                    })
                    $scope.ListJabatan = res[17].data;
                    $scope.ListJenisPegawai = res[18].data;
                    // $scope.ListDetailKelompokJabatan = res[13].data;

                    $scope.ListKualifikasiJurusan = res[20].data;
                    // $scope.listOfPangkat = res[21].data;
                    $scope.ListPendidikan = res[22].data;
                    $scope.ListPTKP = res[23].data;
                    $scope.ListSuku = res[24].data.splice(1);
                    $scope.ListTypePegawai = res[25].data;
                    $scope.ListGolDarah = res[26].data.splice(1);
                    $scope.ListRekanan = res[27].data;
                    $scope.listJenisJabatan = res[28].data;
                    $scope.listOfNegara = res[29].data;
                    $scope.listOfSatuanKerja = res[30].data;
                    // $scope.ListStatusKawin = [];
                    $scope.ListAgama = [];
                    $scope.ListKedudukanPegawai = [];
                    $scope.ListDetilKelompokJabatan = [];
                    $scope.listPegawaiRiwayatAuto = [];
                    for (let i = 0; $scope.listPegawaiRiwayat.length > i; i++) {
                        $scope.listPegawaiRiwayatAuto.push($scope.listPegawaiRiwayat[i].namaLengkap);
                    }
                    $("#autoCompleteAtasanTtd").kendoAutoComplete({
                        filter: "contains",
                        dataSource: $scope.listPegawaiRiwayatAuto
                    });

                    $scope.ListJabatanAuto = [];
                    for (let i = 0; $scope.ListJabatan.length > i; i++) {
                        $scope.ListJabatanAuto.push($scope.ListJabatan[i].namaJabatan);
                    }
                    $("#autoCompleteAtasanJabatan").kendoAutoComplete({
                        filter: "contains",
                        dataSource: $scope.ListJabatanAuto
                    });
                    tempDataKelompokJabatan.forEach(function (el) {
                        if (el.detailKelompokJabatan !== '-') {
                            var dataTemp = {
                                detailKelompokJabatan: el.detailKelompokJabatan,
                                id: el.id,
                                grade: el.grade,
                                kelompokJabatanId: el.kelompokJabatanId,
                                nilaiTerendah: el.nilaiTerendah,
                                nilaiTertinggi: el.nilaiTertinggi,
                            }
                            $scope.ListDetilKelompokJabatan.push(dataTemp);
                        }
                    });
                    tempKedudukanPegawai.forEach(function (el) {
                        if (el.name !== '-') {
                            var dataTemp = {
                                name: el.name,
                                id: el.id
                            }
                            $scope.ListKedudukanPegawai.push(dataTemp);
                        }
                    })
                    tempDataAgama.forEach(function (el) {
                        if (el.agama !== '-') {
                            var dataTemp = {
                                agama: el.agama,
                                id: el.id,
                            }
                            $scope.ListAgama.push(dataTemp);
                        }
                    })
                    // tempStatusKawin.forEach(function (el) {
                    //     if (el.statusPerkawinan === 'Belum Kawin' || el.statusPerkawinan === 'Janda/Duda' || el.statusPerkawinan === 'Kawin') {
                    //         var tempDataKawin = {
                    //             statusPerkawinan: el.statusPerkawinan,
                    //             id: el.id
                    //         }
                    //         $scope.ListStatusKawin.push(tempDataKawin);
                    //     }
                    // })
                    getDataPegawai($state.params.idPegawai);

                });
                $scope.monthSelectorOptions = {
                    start: "year",
                    depth: "year"
                };
                if ($state.params.idPegawai === "") {
                    $scope.isSimpan = false;
                } else {
                    $scope.isAtasan = true;
                }
            };

            if ($state.params.idPegawai) {
                // ManageSdmNew.getListData('sdm/get-pegawai-atasan/' + $state.params.idPegawai).then(function (res) {
                //     if(res.data.data.length > 0) {
                //         $scope.atasanPejabatPenilai = {
                //             id:res.data.data[0].idAtasanPejabatPenilai,
                //             namaLengkap:res.data.data[0].namaAtasanPejabatPenilai,
                //         };

                //         $scope.atasanLangsung = {
                //             id:res.data.data[0].idAtasanLangsung,
                //             namaLengkap:res.data.data[0].namaAtasanLangsung,
                //         };
                //     }
                //     // $scope.item.atasanLangsung = res.data[0].namaAtasanLangsung;
                // });
            }

            var filterItem = function (param, label) {

                // var index = param.indexOf('-');

                // param.filter(x => console.log(x));
                // for(var i = 0; i < param.length; i++) {                    
                //     if(param[i].indexOf('-')) {
                //         param.splice(i, 1);
                //     }
                // }
            }

            $scope.init();
            $scope.getGradeJabatan = function (e) {
                if (!e.id) return;
                $scope.item.grade = e.grade;
                // console.log($scope.item.detailKelompokJabatan)
            }

            $scope.getGolonganPangkat = function (e) {
                if (!e.idGolongan) return;
                $scope.item.golongan = e.golonganPegawai;
            }

            $scope.goToLogHistory = function () {
                $scope.tabHistoryPegawai = 4;
                $scope.tabPegawai = 2;
            }

            $scope.onChangeTab = function (key) {
                if (key == 1) {
                    initRiwayatPerubahandData();
                    // console.log('tab 1');
                    if ($state.params.idPegawai) {
                        initRekamDataPegawai();
                    }
                    $scope.isRouteLoading = false;
                    $scope.isRiwayat = true;
                } else if (key == 2) {
                    // console.log('tab 2');
                    initDataSuamiAtauIstri();
                } else if (key == 3) {
                    // console.log('tab 3');
                    $scope.initRiwayatJabatan();
                } else if (key == 4) {
                    // console.log('tab 4');
                    $scope.initRiwayatPendidikan();
                } else if (key == 5) {
                    $scope.isRiwayat = false;
                } else if (key == 6) {
                    //     if ($scope.item) {
                    //         if ($scope.item.kategoryPegawai != null || $scope.item.kategoryPegawai != undefined) {
                    //             $scope.getDetailKategoriPegawai($scope.item.kategoryPegawai);
                    //         }
                    //     }
                    $scope.isRiwayat = true;
                } else if (key == 7) {
                    initDataAnak();
                } else if (key == 8) {
                    initRiwayatPerubahandData();
                }
            };

            function showMe(e) {
                console.log(e);
            }

            $scope.pengaturanBawahan = function () {
                $state.go("PengaturanBawahan", { idPegawai: $state.params.idPegawai });
            };

            // #region Rekam Data Pegawai
            var initRekamDataPegawai = function () {
                $scope.listIdKedudukan = [3, 4, 5, 24, 25]; // input kedudukan pegawai yang dijadikan parameter untuk set statusEnabled pegawai = false
                $scope.isRouteLoading = true;

                $scope.gridJabatanInternal = {
                    toolbar: [{
                        name: "create",
                        text: "Buat Jabatan Internal Baru",
                        template: '<button ng-click="createNewJabatanInternal()" id="btnCreateNewJabatan" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Jabatan</button>'
                    },
                    {
                        name: "pengaturanBawahan",
                        text: "Pengaturan Bawahan",
                        template: '<button ng-click="pengaturanBawahan()" class="k-button k-button-icontext"><span class="k-icon k-i-gear"></span>Pengaturan Bawahan</button>'
                    }],
                    pageable: true,
                    // scrollable: true,
                    columns: [
                        {
                            field: "jenisJabatan",
                            title: "<h3 class='small-font'>Jenis<br>Jabatan</h3>", width: "100px",
                            template: "#if(jenisJabatan) { # #= jenisJabatan.jenisJabatan # #} else { #-# } #",
                        },
                        {
                            field: "jabatan",
                            title: "<h3 class='small-font'>Jabatan</h3>", width: "150px",
                            template: "#if(jabatan) { # #= jabatan.namaJabatan # #} else { #-# } #",
                        },
                        {
                            field: "unitKerjaPegawai",
                            title: "<h3 class='small-font'>Unit Kerja</h3>", width: "200px",
                            template: "#if(unitKerjaPegawai) { # #= unitKerjaPegawai.name # #} else { #-# } #",
                        }, // editor: unitDropDownEditor, template: "#= unitKerja.name #"},
                        {
                            field: "subUnitKerjaPegawai",
                            title: "<h3 class='small-font'>Sub<br>Unit Kerja</h3>", width: "150px",
                            template: "#if(subUnitKerjaPegawai) { # #= subUnitKerjaPegawai.name # #} else { #-# } #",
                        },
                        {
                            field: "atasanLangsung",
                            title: "<h3 class='small-font'>Atasan<br>Langsung</h3>", width: "150px",
                            template: "#if(!atasanLangsungDireksi) { # #= atasanLangsung.namaLengkap # #} else { # #=atasanLangsungDireksi# # } #"
                        },
                        {
                            field: "pejabatPenilai",
                            title: "<h3 class='small-font'>Atasan<br>Pejabat Penilai</h3>", width: "150px",
                            template: "#if(!pejabatPenilaiDireksi) { # #= pejabatPenilai.namaLengkap # #} else { # #=pejabatPenilaiDireksi# # } #"
                        },
                        {
                            field: "atasanLangsungDireksi",
                            title: "<h3 class='small-font'>Atasan<br>Langsung</h3>", width: "150px",
                            hidden: true
                        },
                        {
                            field: "pejabatPenilaiDireksi",
                            title: "<h3 class='small-font'>Pejabat<br>Penilai</h3>", width: "150px",
                            hidden: true
                        },
                        {
                            field: "isPrimary",
                            title: "<h3 class='small-font'>Jabatan Utama</h3>", width: "70px",
                            template: "#if(isPrimary) { #Ya# } else { #Tidak# } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            field: "isMonitoring",
                            title: "<h3 class='small-font'>Monitoring</h3>", width: "80px",
                            template: "#if(isMonitoring) { #Ya# } else { #Tidak# } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            field: "isCanCreateJadwal",
                            title: "<h3 class='small-font'>Membuat Jadwal</h3>", width: "100px",
                            template: "#if(isCanCreateJadwal) { #Ya# } else { #Tidak# } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            command: [{
                                text: "Edit",
                                // width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: editDataJabatanInternal,
                                imageClass: "k-icon k-i-pencil"
                            }, {
                                text: "Hapus",
                                // width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: hapusDataJabatanInternal,
                                imageClass: "k-icon k-delete"
                            }],
                            title: "",
                            width: "170px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }],
                };
            };

            function getDataPegawai(id) {
                var now = new Date();
                var grid = $("#grid").data("kendoGrid");
                if ($state.params.idPegawai) { // Check parameter noRec pegawai in the url
                    $scope.isMenuDataPegawai = true; // show tombol hapus
                    $scope.isRouteLoading = true; // show loading icon
                    $q.all([ManageSdmNew.getListData("pegawai/get-pegawai-detail-by-customs/" + id)]).then(function (res) {
                        // console.log(res);
                        if (res[0].statResponse) {
                            $scope.item = res[0].data.data;
                            // if ($scope.item.isMenanggung) {
                            //     $scope.item.isMenanggung = {
                            //         name: 'Ya',
                            //         id: 1
                            //     }
                            // } else {
                            //     $scope.item.isMenanggung = {
                            //         name: 'Tidak',
                            //         id: 2
                            //     }
                            // }
                            $scope.item.golongan = $scope.item.pangkat ? $scope.item.pangkat.golonganPegawai.golonganPegawai : ""
                            $scope.item.tglBerakhirSip = $scope.item.tglBerakhirSip ? dateHelper.toDateFromTimestamp(res[0].data.data.tglBerakhirSip) : null;
                            $scope.item.tglBerakhirStr = $scope.item.tglBerakhirStr ? dateHelper.toDateFromTimestamp(res[0].data.data.tglBerakhirStr) : null;
                            $scope.item.tglTerbitSip = $scope.item.tglTerbitSip ? dateHelper.toDateFromTimestamp(res[0].data.data.tglTerbitSip) : null;
                            $scope.item.tglTerbitStr = $scope.item.tglTerbitStr ? dateHelper.toDateFromTimestamp(res[0].data.data.tglTerbitStr) : null;

                            $scope.item.tglLahir = $scope.item.tglLahir ? dateHelper.toDateFromTimestamp(res[0].data.data.tglLahir) : null;
                            $scope.item.tglMasuk = $scope.item.tglMasuk ? dateHelper.toDateFromTimestamp(res[0].data.data.tglMasuk) : null;
                            $scope.item.tglPensiun = $scope.item.tglPensiun ? dateHelper.toDateFromTimestamp(res[0].data.data.tglPensiun) : null;
                            $scope.item.tglkeluar = $scope.item.tglkeluar ? dateHelper.toDateFromTimestamp(res[0].data.data.tglkeluar) : null;
                            if ($scope.item.statusRhesus == '+') {
                                $scope.item.statusRhesus = {
                                    id: 1
                                }
                            } else if ($scope.item.statusRhesus == '-') {
                                $scope.item.statusRhesus = {
                                    id: 2
                                }
                            }

                            if ($scope.item.isMenanggung == true) {
                                $scope.item.isMenanggung = {
                                    id: 1
                                }
                            } else if ($scope.item.isMenanggung == false) {
                                $scope.item.isMenanggung = {
                                    id: 2
                                }
                            }

                            // if ($scope.item.detailKelompokJabatan) {
                            //     if ($scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIREKTUR UTAMA (DIRUT)' ||
                            //         $scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIREKTUR UTAMA' ||
                            //         $scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIRUT') {
                            //         grid.showColumn(6);
                            //         grid.hideColumn(4);
                            //     } else {
                            //         grid.hideColumn(6);
                            //         grid.showColumn(4);
                            //     }
                            // }
                            // if ($scope.item.unitKerja) {
                            //     if ($scope.item.unitKerja.name === 'Direksi') {
                            //         grid.hideColumn(5);
                            //         grid.showColumn(7);
                            //     } else {
                            //         grid.hideColumn(7);
                            //         grid.showColumn(5);
                            //     }
                            // }
                            if (res[0].data.data.pangkat !== undefined) {
                                $scope.item.golonganPegawai = {
                                    id: res[0].data.data.pangkat.golonganPegawai.id
                                }
                            }
                            $scope.disableSip = true;
                            $scope.disableStr = true;
                            if (res[0].data.data.ruangan != null) {
                                $scope.item.ruanganPegawai = {
                                    id: res[0].data.data.ruangan.id,
                                    namaRuangan: res[0].data.data.ruangan.namaRuangan
                                };
                            }
                            getModel($scope.item); // temp model to check if user are changed data in model
                            if ($scope.item.pangkat) {
                                $scope.getGolonganPangkat($scope.item.pangkat);
                            }
                            $scope.isRouteLoading = false;
                            console.log($scope.item.isMenanggung)
                        }
                    }, function (error) {
                        $scope.isRouteLoading = false;
                    });
                } else {
                    $scope.now = new Date();
                    $scope.item = {};
                    $scope.isRouteLoading = false;
                    $scope.disableSip = true;
                    $scope.disableStr = true;
                }
                $scope.loadDataGridJabatanInternal();
                $scope.isRouteLoading = false;
            }

            $scope.loadDataGridJabatanInternal = function () {
                if ($state.params.idPegawai) {
                    ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-map-by-pegawai/" + $state.params.idPegawai).then(function (data) {
                        $scope.dataSourceJabatanInternal = new kendo.data.DataSource({
                            data: data.data.data,
                            pageSize: 5
                        });
                        // console.log(data.data.data)
                        $scope.isRouteLoading = false;
                    });
                }
            };


            function hapusDataJabatanInternal(e) {
                e.preventDefault();
                if (!$scope.isEdit) {
                    toastr.warning('Tidak bisa menghapus jabatan');
                    return
                }
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                var dataSave = [{
                    "id": dataItem.id,
                    // "pegawai": {
                    //     "id": $state.params.idPegawai
                    // },
                    // "jabatan": {
                    //     "id": dataItem.jabatan.id
                    // },
                    "statusEnabled": false,
                    // "unitKerjaPegawai": {
                    //     "id": dataItem.unitKerjaPegawai.id
                    // },
                    // "subUnitKerjaPegawai": {
                    //     "id": dataItem.subUnitKerjaPegawai.id
                    // },
                    // "isCanCreateJadwal": dataItem.isCanCreateJadwal,
                    // "isPrimary": dataItem.isPrimary,
                    // "isMonitoring": dataItem.isMonitoring,
                    // // "pejabatPenilai": {
                    // //     id: dataItem.pejabatPenilai ? dataItem.pejabatPenilai.id : null
                    // // },
                    // // "atasanLangsung": {
                    // //     id: dataItem.atasanLangsung ? dataItem.atasanLangsung.id : null
                    // // },
                    // "pejabatPenilaiDireksi": dataItem.pejabatPenilaiDireksi,
                    // "atasanLangsungDireksi": dataItem.atasanLangsungDireksi
                }]
                // if(typeof dateItem.pejabatPenilai === 'object' || dateItem.pejabatPenilai) {
                //     dataSave[0]['pejabatPenilai'] = {
                //         id: dataItem.pejabatPenilai.id
                //     }
                // } 
                // if(typeof dateItem.atasanLangsung === 'object' || dateItem.atasanLangsung) {
                //     dataSave[0]['atasanLangsung'] = {
                //         id: dataItem.atasanLangsung.id
                //     }
                // }
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data Jabatan Internal?')
                    .textContent(`Anda akan menghapus data Jabatan Internal`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    ManageSdmNew.saveData(dataSave, "map-pegawai-jabatan-unitkerja/hapus-map").then(function (res) {
                        $scope.isRouteLoading = true;
                        $scope.popUpJabatan.close();
                        e.preventDefault();
                        $scope.loadDataGridJabatanInternal();
                        // console.warn('Data Berhasil Dihapus');
                    });
                    // console.warn('Masuk sini pak eko');
                }, function () {
                    // console.error('Tidak jadi hapus');
                });

            }

            function validateJabatanUtama() {
                let data = $scope.dataSourceJabatanInternal._data;
                var isPrimaryExist = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].isPrimary) {
                        isPrimaryExist = true;
                    }
                }
                return isPrimaryExist;
            }

            $scope.simpanJabatanInternal = function () {
                $scope.enableBtnSimpanJabatanInternal = false;

                var newModel = [];
                newModel.push(getDataChanged($scope.ji));
                newModel[0]['id'] = $scope.ji.idGridInternalJabatan;
                newModel[0]['statusEnabled'] = true;
                newModel[0]['pegawai'] = {
                    id: $state.params.idPegawai
                };

                for (var key in newModel[0]) {
                    if (newModel[0].hasOwnProperty(key)) {
                        if (key.indexOf('subUnitKerjaPegawai') >= 0) {
                            if (newModel[0][key] === null) {
                                delete newModel[0][key];
                            }
                        }

                        if (key.indexOf('atasanLangsung') == 0) {
                            if (newModel[0]['atasanLangsung'] === null || newModel[0]['atasanLangsung'] === '') {
                                delete newModel[0]['atasanLangsung'];
                            }
                        }
                        if (key.indexOf('pejabatPenilai') == 0) {
                            if (newModel[0]['pejabatPenilai'] === null || newModel[0]['pejabatPenilai'] === '') {
                                delete newModel[0]['pejabatPenilai'];
                            }
                        }

                        if (key.indexOf('pejabatPenilaiDireksi') >= 0) {
                            if (newModel[0][key] === null || newModel[0][key] === '') {
                                delete newModel[0][key];
                            }
                        }
                        if (key.indexOf('atasanLangsungDireksi') >= 0) {
                            if (newModel[0][key] === null) {
                                delete newModel[0][key];
                            }
                        }


                    }
                }

                if (!validateJabatanUtama()) {
                    if (!newModel[0].isPrimary) {
                        toastr.warning('Harap Pilih Satu Jabatan sebagai Jabatan Utama')
                        $scope.enableBtnSimpanJabatanInternal = true;
                        return
                    }
                }

                // var dataSave = [{
                //     "id":$scope.ji.idGridInternalJabatan,
                //     "pegawai": {
                //         "id": $state.params.idPegawai
                //     },                    
                //     "jabatan": {
                //         "id": $scope.ji.jabatanInternalPop.id
                //     },
                //     "statusEnabled": true,
                //     "unitKerjaPegawai": {
                //         "id": $scope.ji.unitKerjaPop.id
                //     },
                //     "subUnitKerjaPegawai": {
                //         "id": $scope.ji.subUnitKerjaPop ? $scope.ji.subUnitKerjaPop.id : ""
                //     },
                //     // "atasanLangsung":{
                //     //     "id":$scope.atasanLangsung.id
                //     // },
                //     // "atasanLangsungDireksi": $scope.atasanLangsungDireksi ? $scope.atasanLangsungDireksi : '',
                //     // "pejabatPenilaiDireksi": $scope.pejabatPenilaiDireksi ? $scope.pejabatPenilaiDireksi : '',
                //     // "pejabatPenilai":{
                //     //     "id":$scope.atasanPejabatPenilai.id
                //     // },
                //     "isCanCreateJadwal": $scope.ji.isCanCreateJadwal,
                //     "isPrimary": $scope.ji.isPrimary,
                //     "isMonitoring": $scope.ji.isMonitoring ? true : false
                // }]

                // if(!$scope.ji.subUnitKerjaPop) {
                //     delete dataSave[0].subUnitKerjaPegawai;
                // }

                // if($scope.ji.atasanLangsungDireksi) {
                //     dataSave[0].atasanLangsungDireksi = $scope.atasanLangsungDireksi;
                // } else {
                //     dataSave[0].atasanLangsung = {
                //         "id":$scope.ji.atasanLangsung.id
                //     }
                // }

                // if($scope.ji.pejabatPenilaiDireksi) {
                //     dataSave[0].pejabatPenilaiDireksi = $scope.pejabatPenilaiDireksi;
                // } else {
                //     dataSave[0].pejabatPenilai = {
                //         "id":$scope.ji.atasanPejabatPenilai.id
                //     }
                // }
                // dataSave.subUnitKerjaPegawai = {}
                ManageSdmNew.saveData(newModel, "map-pegawai-jabatan-unitkerja/save-map").then(function (res) {
                    $scope.isRouteLoading = true;
                    $scope.idGridInternalJabatan = null;
                    $scope.popUpJabatan.close();
                    $scope.loadDataGridJabatanInternal();
                    $scope.enableBtnSimpanJabatanInternal = true;
                    $scope.loadDataRiwayatJabatan();
                }, (error) => {
                    $scope.enableBtnSimpanJabatanInternal = true;
                });
            }

            $scope.getDataSubUnitKerjaById = function (id, data) {
                // console.log(data);
                $('#idComboSubUnitKerja').data('kendoComboBox').value('');
                if (data.name === 'Direksi') {
                    $scope.isDireksi = true;
                    $scope.isStaff = false;
                } else {
                    $scope.isDireksi = false;
                    $scope.isStaff = true;
                }
                ManageSdmNew.getListData('sdm/get-sub-unit-kerja-by-unit-kerja?idUnitKerjaPegawai=' + id).then(res => {
                    $scope.ListSubUnitKerjaById = [];
                    res.data.data.forEach(function (e) {
                        $scope.ListSubUnitKerjaById.push({
                            id: e.id,
                            name: e.namaSubunitKerja
                        })
                    })
                })
            }

            function editDataJabatanInternal(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.getDataJabatan(dataItem.jenisJabatan.id);
                if (!$scope.isEdit) {
                    toastr.warning('Tidak bisa merubah jabatan');
                    return
                }
                clearPop();
                if ($scope.item.detailKelompokJabatan) {
                    if ($scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIREKTUR UTAMA (DIRUT)' ||
                        $scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIREKTUR UTAMA' ||
                        $scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIRUT') {
                        $scope.isDirut = true;
                        $scope.isNotDirut = false;
                    } else {
                        $scope.isDirut = false;
                        $scope.isNotDirut = true;
                    }
                }
                if ($scope.item.unitKerjaPegawai) {
                    if ($scope.item.unitKerjaPegawai.name = 'Direksi') {
                        $scope.isDireksi = true;
                        $scope.isStaff = false;
                    } else {
                        $scope.isDireksi = false;
                        $scope.isStaff = true;
                    }
                }
                $scope.getDataSubUnitKerjaById(dataItem.unitKerjaPegawai.id, dataItem.unitKerjaPegawai);
                $scope.ji.idGridInternalJabatan = dataItem.id;
                $scope.ji.jenisJabatan = {
                    jenisJabatan: dataItem.jenisJabatan.jenisJabatan,
                    id: dataItem.jenisJabatan.id
                }
                $scope.ji.jabatan = {
                    namaJabatan: dataItem.jabatan.namaJabatan,
                    id: dataItem.jabatan.id
                }
                $scope.ji.unitKerjaPegawai = {
                    id: dataItem.unitKerjaPegawai.id,
                    name: dataItem.unitKerjaPegawai.name
                };
                // $scope.ubah();
                $scope.ji.subUnitKerjaPegawai = {
                    id: dataItem.subUnitKerjaPegawai.id,
                    name: dataItem.subUnitKerjaPegawai.name
                };
                $scope.ji.atasanLangsung = {
                    namaLengkap: dataItem.atasanLangsung ? dataItem.atasanLangsung.namaLengkap : '',
                    id: dataItem.atasanLangsung ? dataItem.atasanLangsung.id : ''
                }
                $scope.ji.pejabatPenilai = {
                    namaLengkap: dataItem.pejabatPenilai ? dataItem.pejabatPenilai.namaLengkap : '',
                    id: dataItem.pejabatPenilai ? dataItem.pejabatPenilai.id : ''
                }
                $scope.ji.atasanLangsungDireksi = dataItem.atasanLangsungDireksi;
                $scope.ji.pejabatPenilaiDireksi = dataItem.pejabatPenilaiDireksi;
                $scope.vals = dataItem.isPrimary;
                $scope.vals2 = dataItem.isCanCreateJadwal;
                $scope.vals1 = dataItem.isMonitoring;
                $scope.ji.isPrimary = dataItem.isPrimary;
                $scope.ji.isCanCreateJadwal = dataItem.isCanCreateJadwal;
                $scope.ji.isMonitoring = dataItem.isMonitoring;
                $scope.changeCB();
                $scope.popUpJabatan.center().open();
            }

            function clearPop() {
                $scope.id = "";
                $scope.isDirut = false;
                $scope.isNotDirut = true;
                $scope.isDireksi = false;
                $scope.isStaff = true;
                $scope.ji.jabatan = "";
                $scope.ji.jenisJabatan = '';
                $scope.ji.pejabatPenilai = '';
                $scope.ji.pejabatPenilaiDireksi = "";
                $scope.ji.atasanLangsung = '';
                $scope.ji.unitKerjaPegawai = "";
                $scope.ji.subUnitKerjaPegawai = null;
                // $scope.item.subUnitKerjaPop = [];
                $scope.ji.isCanCreateJadwal = false;
                $scope.ji.isPrimary = false;
                $scope.ji.isMonitoring = false;
                $scope.vals = false;
                $scope.vals2 = false;
                $scope.vals1 = false;
            }

            $scope.isCanCreateJadwal = function (data) {
                if (data === true) {
                    $scope.ji.isCanCreateJadwal = true;
                    $scope.vals2 = true;
                } else {
                    $scope.ji.isCanCreateJadwal = false;
                    $scope.vals2 = false;
                }
            };

            $scope.isPrimary = function (data) {
                if (data === true) {
                    $scope.item.isPrimary = true;
                    $scope.vals = true;
                } else {
                    $scope.item.isPrimary = false;
                    $scope.vals = false;
                }
            };

            $scope.isMonitoring = function (data) {
                if (data === true) {
                    $scope.ji.isMonitoring = true;
                    $scope.vals1 = true;
                } else {
                    $scope.ji.isMonitoring = false;
                    $scope.vals1 = false;
                }
            };

            $scope.batal = function () {
                $scope.ji.idGridInternalJabatan = null;
                $scope.popUpJabatan.close();
            };

            function isDate(value) {
                return value instanceof Date;
            }

            // $scope.$watch('atasanLangsung',function (newValue, oldValue) {
            //     // console.log();
            //     if ($scope.atasanLangsung) {
            //         if(oldValue.namaLengkap === $scope.atasanLangsung.namaLengkap) {
            //             $scope.isSimpanAtasanLangsung = true;
            //         } else {
            //             $scope.isSimpanAtasanLangsung = false;
            //         }
            //     }

            // });

            // $scope.$watch('atasanPejabatPenilai', function (newValue, oldValue) {
            //     // console.log();
            //     if($scope.atasanPejabatPenilai) {
            //         if(oldValue.namaLengkap === $scope.atasanPejabatPenilai.namaLengkap) {
            //             $scope.isSimpanPejabatPenilai = true;
            //         } else {
            //             $scope.isSimpanPejabatPenilai = false;
            //         }
            //     }
            // });

            $scope.$watch('[item.jabatanFungsional.id, item.tglLahir]', function (newVal) {
                if (newVal[0] && newVal[1]) {
                    var tipeData = isDate(newVal[1]),
                        day, month, year, periode;
                    if (tipeData) {
                        day = newVal[1].getDate();
                        month = newVal[1].getMonth() + 1;
                        year = newVal[1].getFullYear();
                        if (month < 10) {
                            month = "0" + month;
                        }
                        if (day < 10) {
                            day = "0" + day;
                        }
                    } else {
                        var date = newVal[1].split('-');
                        day = date[0];
                        month = date[1];
                        year = date[2];
                    }

                    // perhitungan tgl pensiun hanya untuk PNS
                    if ($scope.item.kategoryPegawai.id == 1) {
                        periode = year + "-" + month + "-" + day;
                        ManageSdmNew.getListData("pegawai/get-tgl-pensiun/" + periode + "/" + newVal[0]).then(function (res) {
                            $scope.item.pensiun = res.data.data.usiaPensiun;
                            $scope.item.tglPensiun = dateHelper.formatDate(res.data.data.tglPensiun, "DD-MM-YYYY");
                            $scope.item.tglkeluar = dateHelper.formatDate(res.data.data.tglPensiun, "DD-MM-YYYY");
                            getModel($scope.item);
                        })
                    }
                }
            });

            $scope.hapusPegawai = function () {
                $scope.confirmDialog.center().open();
            };

            $scope.lanjutHapus = function () {
                var idPegawai = $state.params.idPegawai;
                ManageSdmNew.deleteData("pegawai/non-aktif-pegawai-by-id/" + idPegawai + "/").then(function (res) {
                    if (res.status === 200) {
                        messageContainer.log('SUKSES');
                        $scope.confirmDialog.close();
                        $state.go('DataPegawai');
                    } else {
                        messageContainer.error('Something went wrong');
                    }
                });
                // ManageSdm.deletePegawai(idPegawai).then(function(res) {
                //     if (res.status === 200) {
                //         messageContainer.log('SUKSES');
                //         $scope.confirmDialog.close();
                //         $state.go('DataPegawai');
                //     } else {
                //         messageContainer.error('Something went wrong');
                //     }
                // });
            };

            $scope.toogleClick = function (ev) {
                var checked = ev.target.checked;
                var inputId = ev.currentTarget.id;
                if (inputId.indexOf("Sip") >= 0) {
                    $scope.disableSip = !checked;

                    // $scope.item.noSip = "";
                    // $scope.item.tglTerbitSip = null;
                    // $scope.item.tglBerakhirSip = null;
                } else if (inputId.indexOf("Str") >= 0) {
                    $scope.disableStr = !checked;

                    // $scope.item.noStr = "";
                    // $scope.item.tglTerbitStr = null;
                    // $scope.item.tglBerakhirStr = null;
                }
            };

            // $scope.$watch('item.kedudukan', function(newVal, oldVal) {
            //     if (!newVal) return;
            //     if (newVal == oldVal) return;
            //     if (newVal.id && $scope.listIdKedudukan) {
            //         if ($scope.listIdKedudukan.includes(newVal.id)) {
            //             $scope.item.statusEnabled = false;
            //             if (newVal.id == 4){
            //                 $scope.showTglMeninggal = true;
            //             }
            //             else{
            //                 $scope.showTglMeninggal = false;
            //             }

            //         } else {
            //             $scope.item.statusEnabled = true;
            //         }
            //     }
            // });



            function getModel(myModel) {
                var oldData = {};
                for (var key in $scope.item) {
                    if ($scope.item.hasOwnProperty(key)) {
                        oldData[key] = $scope.item[key];
                    }
                }
                $scope.oldData = oldData;
                return myModel;
            }

            function removeRowJabatan(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var dataDelete = {
                    ttdPegawaiSk: dataItem.ttdPegawaiSk,
                    ttdJabatanSk: dataItem.ttdJabatanSk,
                    // jabatanTtd :{
                    //     id:dataItem.idJabatanTtd
                    // },
                    jabatan: {
                        id: dataItem.idJabatan
                    },
                    // pegawaiTtd : {
                    //     id:dataItem.idPgwTtd
                    // },
                    noSK: dataItem.noSk,
                    tglSK: dataItem.tglSk,
                    pegawai: {
                        id: dataItem.idPgw
                    },
                    jenisJabatan: {
                        id: dataItem.idJenisJabatan
                    },
                    noRec: dataItem.noRec,
                    statusEnabled: false
                }
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // console.log(dataItem);
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data pegawai?')
                    .textContent(`Anda akan menghapus data riwayat jabatan`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    ManageSdmNew.saveData(dataDelete, 'pegawai/save-riwayat-jabatan').then(function (res) {
                        $scope.loadDataRiwayatJabatan();
                    });
                    console.warn('Masuk sini pak eko');
                }, function () {
                    console.error('Tidak jadi hapus');
                });
            }

            function isString(arg) {
                return typeof arg === 'string';
            }

            $scope.simpanRiwayatJabatan = function () {
                if (!$scope.item.jenisJabatan) {
                    toastr.warning('Anda belum memilih jenis jabatan');
                    return;
                }
                if (!$scope.item.riwayatJabatan) {
                    toastr.warning('Anda belum memilih Jabatan');
                    return;
                }
                if (!$scope.item.noSK) {
                    toastr.warning('Anda belum mengisi Nomor SK');
                    return;
                }
                if (!$scope.item.tglSK) {
                    toastr.warning('Anda belum mengisi Tanggal SK');
                    return;
                }
                if (!$scope.item.atasanTtdSK) {
                    toastr.warning('Anda belum mengisi Tanda Tangan SK');
                    return;
                }
                if (!$scope.item.jabatanTtd) {
                    toastr.warning('Anda belum memilih Jabatan Tanda Tangan SK');
                    return;
                }

                if ($scope.item.tglSK) {
                    $scope.tglSK = dateHelper.toTimeStamp($scope.item.tglSK);
                    if (isString($scope.item.tglSK)) {
                        var dateDetail = $scope.item.tglSK.split("-");
                        var newDate = dateDetail[1] + "/" + dateDetail[0] + "/" + dateDetail[2];
                        $scope.tglSK = new Date(newDate).getTime();
                    }
                }

                var dataSave = {
                    "noRec": $scope.noRecRiwayatJabatan ? $scope.noRecRiwayatJabatan : null,
                    "pegawai": {
                        "id": $state.params.idPegawai
                    },
                    "statusEnabled": true,
                    "jenisJabatan": {
                        "id": $scope.item.jenisJabatan.id
                    },
                    "noSK": $scope.item.noSK,
                    // "pegawaiTtd":{
                    //     "id":143
                    // },
                    "tglSK": $scope.tglSK,
                    "jabatan": {
                        "id": $scope.item.riwayatJabatan.idJabatan
                    },
                    // "jabatanTtd":{
                    //     "id":896
                    // },
                    "ttdPegawaiSk": $scope.item.atasanTtdSK,
                    "ttdJabatanSk": $scope.item.jabatanTtd
                }
                ManageSdmNew.saveData(dataSave, 'pegawai/save-riwayat-jabatan').then(function (res) {
                    $scope.popUpRiwayat.close();
                    $scope.loadDataRiwayatJabatan();
                });
            }

            // function customBoolEditor(container, options) {
            //     var guid = kendo.guid();
            //     $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="' + options.field + '" data-type="boolean" data-bind="checked:' + options.field + '">').appendTo(container);
            //     $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
            // }

            $scope.createNewJabatanInternal = function () {
                clearPop();
                $scope.idGridInternalJabatan = null;
                if ($scope.isEdit) {
                    $scope.popUpJabatan.center().open();
                    var actions = $scope.popUpJabatan.options.actions;
                    actions.splice(actions.indexOf("Close"), 1);
                    $scope.popUpJabatan.setOptions({
                        actions: actions
                    });
                } else {
                    toastr.warning('Tidak bisa menambah Jabatan')
                }
            };

            $scope.changeCB = function () {
                if ($scope.ji.isPrimary !== undefined) {
                    if ($scope.ji.isPrimary == 'true' || $scope.ji.isPrimary == true) {
                        $scope.muncul = true;
                    } else {
                        $scope.muncul = false;
                    }
                }
            };
            // #endregion Rekam Data Pegawai

            // #region Data Suami/Istri
            var initDataSuamiAtauIstri = function () {
                if ($state.params.idPegawai !== "") {
                    ManageSdmNew.getListData("pegawai/get-keluarga-pegawai?id=" + $state.params.idPegawai).then(function (data) {
                        // $scope.pegawai=data.data.data;
                        if (data.data.datadataFound) {
                            for (var x = 0; x < data.data.data.keluargaPegawai.length; x++) {
                                var element = data.data.data.keluargaPegawai[x];
                                element.no = (x + 1);
                                element.tglLahir = moment(data.data.data.keluargaPegawai[x].tglLahir).format('DD-MM-YYYY');
                                element.tglsuratKuliah = moment(data.data.data.keluargaPegawai[x].tglsuratKuliah).format('DD-MM-YYYY'); // dateHelper.formatDate(data.data.data.keluargaPegawai[x].tglLahir, "DD-MM-YYYY");

                            }
                            $scope.gridKeluarga.data(data.data.data.keluargaPegawai);
                        }
                    });
                }
                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=HubunganKeluarga&select=id,hubunganKeluarga&order=hubunganKeluarga:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinanPegawai&select=id,statusPerkawinan&order=statusPerkawinan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Pekerjaan&select=id,pekerjaan&order=pekerjaan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Tanggungan&select=id,name&order=name:asc", true)
                ]).then(function (res) {
                    $scope.ListHubunganKeluarga = res[0].data;
                    // $scope.ListStatusKawin = res[1].data;
                    $scope.ListPekerjaan = res[2].data;
                    $scope.ListTanggungan = res[3].data;

                }, (error) => {
                    throw (error);
                })

                $scope.gridKeluarga = new kendo.data.DataSource({
                    data: [],
                    pageSize: 10
                });
            }

            $scope.optSuamiIstri = {
                toolbar: [{
                    name: "create",
                    text: "Buat Jabatan Internal Baru",
                    template: '<button ng-click="createNewKeluarga()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "<h3>No</h3>",
                        "width": "5%"
                    },
                    {
                        "field": "namaLengkap",
                        "title": "<h3>Nama</h3>",
                        "width": "20%"
                    },
                    {
                        "field": "hubunganKeluarga",
                        "title": "<h3>Status</h3>",
                        "width": "20%"
                    },
                    {
                        "field": "tanggungan",
                        "title": "<h3>Tertanggung</h3>",
                        "width": "20%"
                    },
                    {
                        "field": "tglLahir",
                        "title": "<h3>Tanggal Lahir</h3>",
                        "width": "20%"
                    },
                    {
                        "field": "namaPekerjaan",
                        "title": "<h3>Pekerjaan</h3>",
                        "width": "20%"
                    }
                ]
            };

            $scope.kl = function (current) {
                ManageSdmNew.getListData("keluarga-pegawai/cari-alamat-id/" + current.id).then(function (data) {
                    $scope.item = data.data.data;
                    $scope.item.tglLahir = moment(data.data.data.tglLahir).format('DD-MM-YYYY');
                    $scope.item.tglsuratKuliah = moment(data.data.data.tglsuratKuliah).format('DD-MM-YYYY');
                    $scope.ListHubunganKeluarga.forEach(function (itm) {
                        if (itm.id === data.data.data.objectKdHubunganFk) {
                            $scope.item.hubunganKeluarga = itm;
                        }
                    });
                    $scope.ListPekerjaan.forEach(function (itm) {
                        if (itm.id === data.data.data.pekerjaanId) {
                            $scope.item.pekerjaan = itm;
                        }
                    });
                    $scope.ListStatusKawin.forEach(function (itm) {
                        if (itm.id === data.data.data.statusPerkawinanPegawaiId) {
                            $scope.item.statusPerkawinanPegawai = itm;
                        }
                    });
                    $scope.ListTanggungan.forEach(function (itm) {
                        if (itm.id === data.data.data.statusPerkawinanPegawaiId) {
                            $scope.item.statusTanggungan = itm;
                        }
                    });
                });
            };

            $scope.Save = function () {
                $scope.item.pegawai = $scope.pegawai;
                var element = {};

                element.pegawai = { "id": $state.params.idPegawai };
                element.hubunganKeluarga = $scope.item.hubunganKeluarga;
                element.namaLengkap = $scope.item.namaLengkap;
                if (_.contains($scope.item.tglLahir, '-')) {

                    element.tglLahir = new Date(formatDate($scope.item.tglLahir));
                } else {
                    element.tglLahir = $scope.item.tglLahir;
                }

                element.pekerjaan = $scope.item.pekerjaan;
                element.statusPerkawinanPegawai = $scope.item.statusPerkawinanPegawai;
                element.statusTanggungan = $scope.item.statusTanggungan;
                element.noSuratKuliah = $scope.item.noSuratKuliah;
                if (_.contains($scope.item.tglsuratKuliah, '-')) {

                    element.tglsuratKuliah = new Date(formatDate($scope.item.tglsuratKuliah));
                } else {
                    element.tglsuratKuliah = $scope.item.tglsuratKuliah;
                }

                element.namaAyah = $scope.item.namaAyah;
                element.namaIbu = $scope.item.namaIbu;
                element.NipIstriSuami = $scope.item.NipIstriSuami;
                element.alamat = $scope.item.alamat;
                element.keterangan = $scope.item.keterangan;
                element.id = $state.params.idPegawai;
                ManageSdmNew.saveData(element, "keluarga-pegawai/save-keluarga-pegawai").then(function (e) {
                    delete $scope.item;
                    $scope.now = new Date();
                    $scope.item = {
                        tglLahir: $scope.now,
                        tglsuratKuliah: $scope.now,
                    };
                });
            };

            $scope.batalInputKeluarga = function () {
                $scope.popUpKeluarga.close();
            };

            $scope.createNewKeluarga = function (e) {
                // $scope.popUpKeluarga.open();
                $scope.popUpKeluarga.center().open();
                var actions = $scope.popUpKeluarga.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpKeluarga.setOptions({
                    actions: actions
                });
            };
            // #endregion Data Keluarga

            // #region Riwayat Jabatan
            $scope.initRiwayatJabatan = function () {
                // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan").then(function(data){
                //     $scope.listJenisJabatan = data.data.dataJenisJabatan;
                //     $scope.listJabatanInternal = data.data.dataJabatanInternal;
                //     $scope.listFungsional = data.data.dataJabatanFungsional;
                //     console.log($scope.listPgw);
                //     $scope.listPgw = data.data.pegawai;
                //     if($scope.listPgw != undefined){
                //         $scope.listPgw.push($scope.pegawaiTambah)
                //     }
                // });

                $scope.columnGrid = {
                    toolbar: [
                        {
                            name: "create", text: "Buat Riwayat Jabatan",
                            template: '<button ng-click="createNewRiwayatJabatan()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
                        },
                        {
                            text: "export",
                            name: "Export detail",
                            template: '<button ng-click="exportDataJabatan()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                        }
                    ],
                    sortable: false,
                    reorderable: true,
                    filterable: false,
                    pageable: true,
                    columnMenu: false,
                    resizable: true,
                    selectable: 'row',
                    columns: [
                        {
                            field: "noSk",
                            title: "<h3>No SK</h3>",
                            width: "100px"
                        },
                        {
                            field: "tglSk",
                            title: "<h3>Tanggal SK</h3>",
                            width: "100px",
                            template: "#= kendo.toString(new Date(tglSk), \"dd-MM-yyyy\") #"
                        },
                        {
                            field: "jenisJabatan",
                            title: "<h3>Jenis Jabatan</h3>",
                            width: "200px"
                        },
                        {
                            field: "namaJabatan",
                            title: "<h3>Nama Jabatan</h3>",
                            width: "200px"
                        },
                        {
                            field: "ttdPegawaiSk",
                            title: "<h3>Nama Tertanda SK</h3>",
                            width: "200px"
                        },
                        {
                            field: "ttdJabatanSk",
                            title: "<h3>Jabatan Tertanda</h3>",
                            width: "200px"
                        },
                        {
                            command: [
                                {
                                    text: "Edit",
                                    width: "40px",
                                    align: "center",
                                    attributes: {
                                        align: "center"
                                    },
                                    click: changeRowJabatan,
                                    imageClass: "k-icon k-i-pencil"
                                }, {
                                    text: "Hapus",
                                    width: "40px",
                                    align: "center",
                                    attributes: {
                                        align: "center"
                                    },
                                    click: removeRowJabatan,
                                    imageClass: "k-icon k-delete"
                                }],
                            title: "",
                            width: "150px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }],
                };

                $scope.loadDataRiwayatJabatan();
            };

            $scope.exportDataJabatan = function (e) {
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        { value: "No. SK" },
                        { value: "Tanggal SK" },
                        { value: "Jenis Jabatan" },
                        { value: "Nama Jabatan" },
                        { value: "Jabatan Tertanda" },
                        { value: "Nama Tertanda SK" }
                    ]
                }];
                tempDataExport = $scope.dataSourceRiwayatJabatan;
                tempDataExport.fetch(function () {
                    // debugger;
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].noSk },
                                { value: data[i].tglSk },
                                { value: data[i].jenisJabatan },
                                { value: data[i].namaJabatan },
                                { value: data[i].ttdJabatanSk },
                                { value: data[i].ttdPegawaiSk }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "Riwayat Jabatan",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Riwayat Jabatan-" + data[0].namaLengkap + ".xlsx" });
                });
            };

            $scope.loadDataRiwayatJabatan = function () {
                if ($state.params.idPegawai) {
                    $scope.isRouteLoading = true;
                    ManageSdmNew.getListData('sdm/get-data-riwayat-jabatan?idPegawai=' + $state.params.idPegawai).then(function (data) {
                        $scope.isRouteLoading = false;
                        // console.log();
                        $scope.dataSourceRiwayatJabatan = new kendo.data.DataSource({
                            data: data.data.data.riwayatJabatanByPegawai,
                            // _data: data.data,
                            pageSize: 30,
                            selectable: true,
                            refresh: true,
                            total: data.data.length,
                            serverPaging: false,
                        });
                    });
                }

            }
            $scope.getJabatan = function (data) {
                // console.log(data);
                if (data.namaJabatan.match('Direktur Utama')) {
                    $scope.isDirut = true;
                    $scope.isNotDirut = false;
                } else {
                    $scope.isDirut = false;
                    $scope.isNotDirut = true;
                }
            }

            $scope.getDataJabatan = function (id) {
                $("#idComboDataJabatan").data("kendoComboBox").value("");
                ManageSdmNew.getListData("sdm/get-all-jabatan-by-jenis-jabatan?idJenisJabatan=" + id, true).then(function (res) {
                    $scope.listJabatanByJenisJabatan = res.data;
                    $scope.listJabatanByJenisJabatanInternal = [];
                    res.data.data.forEach(function (e) {
                        $scope.listJabatanByJenisJabatanInternal.push({
                            id: e.idJabatan,
                            namaJabatan: e.namaJabatan
                        })
                    })
                });
            }

            $scope.batalRiwayatJabatan = function () {
                clearField();
                $scope.popUpRiwayat.close();
            };

            function clearField() {
                $scope.noRecRiwayatJabatan = "";
                $scope.item.jenisJabatan = undefined;
                $scope.item.riwayatJabatan = undefined;
                $scope.item.jabatanTtd = undefined;
                $scope.item.noSK = "";
                $scope.item.tglSK = "";
                $scope.item.atasanTtdSK = undefined;
                $scope.item.keterangan = "";
            }

            $scope.createNewRiwayatJabatan = function () {
                $scope.popUpRiwayat.center().open();

                $scope.item.noSK = '';
                $scope.item.tglSK = '';
                $scope.item.jenisJabatan = '';
                $scope.item.riwayatJabatan = '';
                $scope.item.atasanTtdSK = '';
                $scope.item.jabatanTtd = '';
                // $scope.noRecRiwayatJabatan =
                // var actions = $scope.popUpRiwayat.options.actions;
                // actions.splice(actions.indexOf("Close"), 1);
                // $scope.popUpRiwayat.setOptions({ actions: actions });
            };

            function changeRowJabatan(e) {


                clearField();
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                // acTtdSk.destroy();
                // acJabatan.destroy();
                $scope.getDataJabatan(dataItem.idJenisJabatan);
                $scope.noRecRiwayatJabatan = dataItem.noRec;
                $scope.item.riwayatJabatan = { idJabatan: dataItem.idJabatan, namaJabatan: dataItem.namaJabatan };
                $scope.item.jenisJabatan = { id: dataItem.idJenisJabatan, jenisJabatan: dataItem.jenisJabatan };
                $scope.item.noSK = dataItem.noSk;
                $scope.item.tglSK = dateHelper.formatDate(dataItem.tglSk, 'DD-MM-YYYY');
                $scope.tglSK = dataItem.tglSk;
                // $scope.item.atasanTtdSK = { id: dataItem.idPgwTtd, namaLengkap:dataItem.namaLengkapTtd };
                $scope.item.atasanTtdSK = dataItem.ttdPegawaiSk;
                $scope.item.keterangan = dataItem.keterangan;

                // $scope.item.jabatanTtd = { id:dataItem.idJabatanTtd, namaJabatan:dataItem.namaJabatanTtd };
                $scope.item.jabatanTtd = dataItem.ttdJabatanSk;
                $scope.popUpRiwayat.center().open();
            }
            // #endregion Riwayat Jabatan

            // #region Riwayat Pendidikan
            $scope.initRiwayatPendidikan = function () {
                $scope.columnGridPendidikan = {
                    toolbar: [
                        {
                            name: "create", text: "Buat Riwayat Jabatan",
                            template: '<button ng-click="createNewPendidikan()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
                        },
                        {
                            text: "export",
                            name: "Export detail",
                            template: '<button ng-click="exportDataPendidikan()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                        }
                    ],
                    sortable: false,
                    reorderable: true,
                    filterable: false,
                    pageable: true,
                    columnMenu: false,
                    resizable: true,
                    selectable: 'row',
                    columns: [
                        {
                            field: "pendidikan", title: "<h3>Pendidikan</h3>", width: "100px"
                        },
                        {
                            field: "namaTempatPendidikan", title: "<h3>Nama Institusi</h3>", width: "150px"
                        },
                        {
                            field: "jurusan", title: "<h3>Jurusan</h3>", width: "150px"
                        },
                        {
                            field: "tglLulus", title: "<h3>Tanggal Kelulusan</h3>", width: "100px"
                        },
                        {
                            field: "nilaiIPK", title: "<h3>IPK</h3>", width: "75px"
                        },
                        {
                            field: "noIjazah", title: "<h3>No Ijazah</h3>", width: "100px"
                        },
                        {
                            field: "tglIjazah", title: "<h3>Tanggal Ijazah</h3>", width: "100px"
                        },
                        {
                            command: [
                                {
                                    text: "Edit", width: "40px", align: "center",
                                    attributes: {
                                        align: "center"
                                    },
                                    click: changeRowPendidikan,
                                    imageClass: "k-icon k-i-pencil"
                                },
                                {
                                    text: "Hapus", width: "40px", align: "center",
                                    attributes: {
                                        align: "center"
                                    },
                                    click: removeRowPendidikan,
                                    imageClass: "k-icon k-delete"
                                }],
                            title: "",
                            width: "150px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }],
                };

                // manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-pendidikan").then(function(data){
                // 	$scope.listPendidikan = data.data.dataPendidikan;
                // 	$scope.listTingkatKelulusan = data.data.dataTingkatKelulusan; 
                // });
                $scope.getDataRiwayatPendidikan();
                modelItemAkuntansi.getDataDummyPHP("jadwaldokter/get-drop-down-pegawai", true, true, 10).then(function (data) {
                    $scope.listPgw = data;
                });
            };

            $scope.exportDataPendidikan = function () {
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        { value: "Nama Institusi" },
                        { value: "Pendidikan" },
                        { value: "Jurusan" },
                        { value: "Tanggal Kelulusan" },
                        { value: "IPK" },
                        { value: "No. Ijazah" },
                        { value: "Tangga Ijazah" }
                    ]
                }];
                tempDataExport = $scope.dataSourcePendidikan;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].namaTempatPendidikan },
                                { value: data[i].pendidikan },
                                { value: data[i].jurusan },
                                { value: data[i].tglLulus },
                                { value: data[i].nilaiIPK },
                                { value: data[i].noIjazah },
                                { value: data[i].tglIjazah },
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "Riwayat Jabatan",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Riwayat Pendidikan-" + data[0].namaLengkap + ".xlsx" });
                });
            }

            $scope.getDataRiwayatPendidikan = function () {
                ManageSdmNew.getListData("sdm/get-data-riwayat-pendidikan?idPegawai=" + $state.params.idPegawai).then(function (data) {
                    $scope.isRouteLoading = false;
                    for (var i = data.data.length - 1; i >= 0; i--) {
                        data.data[i].nilaiipk = parseFloat(Math.round(data.data[i].nilaiipk * 100) / 100).toFixed(2);
                    }
                    $scope.dataSourcePendidikan = new kendo.data.DataSource({
                        data: data.data.data.riwayatPendidikanByPegawai,
                        // _data: data.data,
                        pageSize: 30,
                        selectable: true,
                        refresh: true,
                        total: data.data.length,
                        serverPaging: false,
                    });
                });
            }

            function clearFieldPendidikan() {
                $scope.noRecRiwayatPendidikan = null;
                $scope.item.riwayatPendidikan = undefined;
                $scope.item.riwayatJurusan = "";
                $scope.item.tglLulus = "";
                $scope.item.ipk = "";
                $scope.item.namaTempat = "";
                $scope.item.noIjasah = null;
                $scope.item.tglIjazah = "";
                $scope.item.tingkatKelulusan = undefined;
            }

            function changeRowPendidikan(e) {
                clearFieldPendidikan();
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                // console.log(dataItem);
                $scope.noRecRiwayatPendidikan = dataItem.noRec;
                $scope.item.riwayatPendidikan = {
                    id: dataItem.idPendidikan,
                    namaPendidikan: dataItem.pendidikan
                };
                $scope.item.riwayatJurusan = dataItem.jurusan;
                $scope.item.tglLulus = dataItem.tglLulus;
                $scope.item.ipk = dataItem.nilaiIPK;
                $scope.item.namaTempat = dataItem.namaTempatPendidikan;
                $scope.item.noIjasah = dataItem.noIjazah;
                $scope.item.tglIjazah = dataItem.tglIjazah;
                $scope.item.tingkatKelulusan = { id: dataItem.objecttingkatkelulusanfk, namalengkap: dataItem.tingkatKelulusan };
                $scope.popUpRiwayatPendidikan.center().open();
            }

            function removeRowPendidikan(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                var dataObjPost = {
                    "statusEnabled": false,
                    "noRec": dataItem.noRec,
                    "pegawai": {
                        "id": $state.params.idPegawai
                    },
                    "pendidikan": {
                        "id": dataItem.idPendidikan
                    },
                    "namaTempatPendidikan": dataItem.namaTempatPendidikan,
                    "jurusan": dataItem.jurusan,
                    "tglLulus": dataItem.tglLulus,
                    "nilaiIPK": dataItem.nilaiIPK,
                    "noIjazah": dataItem.noIjazah,
                    "tglIjazah": dataItem.tglIjazah
                }
                ManageSdmNew.saveData(dataObjPost, 'pegawai/save-riwayat-pendidikan').then(res => {
                    // console.log(res);
                    $scope.getDataRiwayatPendidikan();
                    $scope.popUpRiwayatPendidikan.close();
                });
            }

            $scope.createNewPendidikan = function () {
                clearFieldPendidikan();
                delete $scope.noRecRiwayatPendidikan;
                $scope.popUpRiwayatPendidikan.center().open();
                // var actions = $scope.popUpRiwayatPendidikan.options.actions; 
                // actions.splice(actions.indexOf("Close"), 1); 
                // $scope.popUpRiwayatPendidikan.setOptions({ actions : actions });
            };

            $scope.batalPendidikan = function () {
                $scope.popUpRiwayatPendidikan.close();
            };

            $scope.savePendidikan = function () {
                if (!$scope.item.riwayatPendidikan) {
                    toastr.warning('Harap Masukkan Pendidikan');
                    return;
                }
                var dataSave = {
                    // "noRec": $scope.noRecRiwayatPendidikan ? $scope.noRecRiwayatPendidikan : null,
                    "statusEnabled": true,
                    "jurusan": $scope.item.riwayatJurusan,
                    "namaTempatPendidikan": $scope.item.namaTempat,
                    "nilaiIPK": $scope.item.ipk,
                    "noIjazah": $scope.item.noIjasah,
                    "tglIjazah": $scope.item.tglIjazah,
                    "tglLulus": $scope.item.tglLulus,
                    "pegawai": {
                        "id": $state.params.idPegawai
                    },
                    "pendidikan": {
                        "id": $scope.item.riwayatPendidikan.id
                    }
                }
                if ($scope.noRecRiwayatPendidikan) {
                    dataSave.noRec = $scope.noRecRiwayatPendidikan
                } else {
                    delete dataSave.noRec;
                }
                ManageSdmNew.saveData(dataSave, 'pegawai/save-riwayat-pendidikan').then(res => {
                    // console.log(res);
                    $scope.getDataRiwayatPendidikan();
                    $scope.popUpRiwayatPendidikan.close();
                });
            }
            // #endregion Riwayat Pendidikan

            // #region History Perubahan Data

            var initRiwayatPerubahandData = function () {
                $scope.dataHistoriPegawai = [];
                $scope.optHistoriPegawai = {
                    selectable: "row",
                    pageable: true,
                    columns: [
                        { field: "tanggal", title: "<h3>Tanggal</h3>", width: "7%", template: "#= kendo.toString(new Date(tanggal), \"dd/MM/yyyy\") #" },
                        { field: "tanggal", title: "<h3>Jam</h3>", width: "4%", template: "#= kendo.toString(new Date(tanggal), \"HH:mm\") #" },
                        { field: "perubahan", title: "<h3>Perubahan</h3>", width: "64%" },
                        { field: "petugas", title: "<h3>Petugas</h3>", width: "20%" },
                        // {command: [{text: "Detil", click: showDetailPerubahan}], title: "&nbsp;", width: "6%"}
                    ]
                }
                ManageSdmNew.getListData("sdm/get-list-history-pegawai/" + $state.params.idPegawai).then(function (res) {
                    if (res.data.data.dataFound) {
                        $scope.lastEditDate = res.data.data.data[0].tanggal ? dateHelper.formatDate(new Date(res.data.data.data[0].tanggal), 'DD-MM-YYYY HH:mm') : '-';
                        $scope.lastEditBy = res.data.data.data[0].petugas ? res.data.data.data[0].petugas : '-';
                        $scope.dataHistoriPegawai = new kendo.data.DataSource({
                            data: res.data.data.data,
                            pageSize: 10
                        });
                        $scope.klikRiwayat = true;
                    } else {
                        messageContainer.log('Belum ada histori')
                    }
                })
            }

            // initRiwayatPerubahandData();

            function showDetailPerubahan(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                // FindSdm.getDetilHistoriDataPg(dataItem.id).then(function(res){
                ManageSdmNew.getListData("sdm/get-detail-history-pegawai/" + dataItem.id).then(function (res) {
                    var dataObject = res.data.data;
                    dataObject.tglPerubahan = dataObject.jamPerubahan = dataItem.tanggal;
                    dataObject.namaPetugas = dataItem.petugas;
                    if (dataObject) {
                        for (var key in dataObject) {
                            if (dataObject.hasOwnProperty(key)) {
                                if (key.indexOf("tgl") >= 0) {
                                    dataObject[key] = dateHelper.formatDate(dataObject[key], "DD-MM-YYYY");
                                } else if (key.indexOf("jamPerubahan") >= 0) {
                                    dataObject[key] = dateHelper.formatDate(dataObject[key], "HH:mm");
                                }
                            }
                        }
                        $scope.popupHistory.setOptions({
                            width: "90%",
                            height: "80%",
                            title: 'Rekam Data Pegawai'
                        });
                        $scope.dataDetil = dataObject;
                        $scope.popupHistory.center().open();

                    } else {
                        messageContainer.log("Data tidak ditemukan");
                    }
                }, (error) => {
                    throw error;
                })
            }

            // #endregion

            // #region Anak
            var initDataAnak = function () {
                $scope.dataSourceRiwayatAnak = [];
                $scope.columnGridAnak = {
                    toolbar: [
                        {
                            name: "create", text: "Buat Riwayat Jabatan",
                            template: '<button ng-click="createNewRiwayatJabatan()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
                        },
                        // {
                        //     text: "export",
                        //     name:"Export detail",
                        //     template: '<button ng-click="exportDataJabatan()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                        // }
                    ],
                    sortable: false,
                    reorderable: true,
                    filterable: false,
                    pageable: true,
                    columnMenu: false,
                    resizable: true,
                    selectable: 'row',
                    columns: [
                        {
                            // field: "noSk",
                            title: "<h3>Nama</h3>",
                            width: "100px"
                        },
                        {
                            // field: "tglSk",
                            title: "<h3>Hubungan</h3>",
                            width: "100px"
                        },
                        {
                            // field: "jenisJabatan",
                            title: "<h3>Tanggal<br>Lahir</h3>",
                            width: "200px"
                        },
                        {
                            // field: "namaJabatan",
                            title: "<h3>Jenis<br>Kelamin</h3>",
                            width: "200px"
                        },
                        {
                            // field: "ttdJabatanSk",
                            title: "<h3>Pekerjaan</h3>",
                            width: "200px"
                        },
                        {
                            // field: "ttdPegawaiSk",
                            title: "<h3>Tanggal<br>Surat Kuliah</h3>",
                            width: "200px"
                        },
                        {
                            command: [
                                {
                                    text: "Edit",
                                    width: "40px",
                                    align: "center",
                                    attributes: {
                                        align: "center"
                                    },
                                    click: changeRowJabatan,
                                    imageClass: "k-icon k-i-pencil"
                                }, {
                                    text: "Hapus",
                                    width: "40px",
                                    align: "center",
                                    attributes: {
                                        align: "center"
                                    },
                                    click: removeRowJabatan,
                                    imageClass: "k-icon k-delete"
                                }],
                            title: "",
                            width: "150px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }],
                };
            }
            // #endregion

            function formatDate(tanggal) {
                if (!(_.contains(tanggal, '-'))) {
                    tanggal = dateHelper.formatDate(tanggal, "DD-MM-YYYY")
                }
                var res = tanggal.split("-");
                return res[1] + "-" + res[0] + "-" + res[2];
            }

            $scope.kembali = function () {
                window.history.back();
            };

            $scope.batalUbahDataPegawai = function () {
                getDataPegawai($state.params.idPegawai);
                $scope.isSimpan = true;
                $scope.isEdit = false;
                $scope.disableSip = true;
                $scope.disableStr = true;
            };

            $scope.changedNamaLengkap = function () {
                if (!$scope.item.gelarDepan) {
                    $scope.item.gelarDepan = '';
                }
                if (!$scope.item.nama) {
                    $scope.item.nama = '';
                }
                if (!$scope.item.gelarBelakang) {
                    $scope.item.gelarBelakang = '';
                }
                $scope.item.namaLengkap = `${$scope.item.gelarDepan} ${$scope.item.nama}, ${$scope.item.gelarBelakang}`;
                if (($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined) &&
                    ($scope.item.nama === '' || $scope.item.nama === undefined) &&
                    ($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                    $scope.item.namaLengkap = '';
                } else if (($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined) &&
                    ($scope.item.nama !== '' || $scope.item.nama !== undefined) &&
                    ($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                    $scope.item.namaLengkap = `${$scope.item.nama}`;
                } else if (($scope.item.gelarDepan === '' || $scope.item.gelarDepan === undefined)) {
                    $scope.item.namaLengkap = `${$scope.item.nama}, ${$scope.item.gelarBelakang}`;
                } else if (($scope.item.gelarBelakang === '' || $scope.item.gelarBelakang === undefined)) {
                    $scope.item.namaLengkap = `${$scope.item.gelarDepan} ${$scope.item.nama}`;
                }
            };

            function convertTanggal(tgl) {
                let tglConvert, day;
                if (typeof tgl === 'object') {
                    tgl = dateHelper.formatDate(tgl, 'DD-MM-YYYY');
                }
                console.log(tgl);
                let tempTgl = tgl.split('-');
                if (parseInt(tempTgl[0]) < 10) {
                    day = '0' + tempTgl[0];
                }
                tglConvert = `${tempTgl[0]}-${tempTgl[1]}-${tempTgl[2]}`;
                // console.log(tglConvert);
                return tglConvert
            }

            function getDataChanged(newData) {
                var dataChanged = {},
                    oldData = $scope.oldData;
                if (oldData) {
                    for (var key in newData) {
                        if (oldData.hasOwnProperty(key)) {
                            if (key.indexOf("tgl") >= 0 && newData[key] != null) {
                                if (convertTanggal(oldData.tglLahir) === dateHelper.formatDate(newData[key], 'DD-MM-YYYY')) {
                                    delete newData[key];
                                } else {
                                    newData[key] = dateHelper.formatDate(newData[key], 'DD-MM-YYYY')
                                }
                            };
                            if (newData[key] === "") {
                                // console.log(key)
                            }
                            if (newData[key] !== oldData[key]) {
                                console.log(key)
                                dataChanged[key] = newData[key];
                            }
                        } else if (newData.hasOwnProperty(key)) {
                            dataChanged[key] = newData[key];
                        }
                    }
                } else { // rekam data baru
                    for (var key in newData) {
                        if (newData.hasOwnProperty(key)) {
                            dataChanged[key] = newData[key]
                        }
                    }
                }
                return dataChanged;
            }

            $scope.saveDataIndetitasPegawai = function () {
                var listRawRequired = [
                    "item.kedudukan|k-ng-model|Kedudukan pegawai",
                    "item.kategoryPegawai|k-ng-model|Kategori pegawai",
                    "item.alamat|k-ng-model|Alamat",
                    "item.noHandphone|k-ng-model|No handphone",
                    "item.email|k-ng-model|Email",
                    "item.tglLahir|k-ng-model|Tanggal lahir",
                    "item.tempatLahir|k-ng-model|Tempat lahir",
                    "item.noIdentitas|k-ng-model|No identitas",
                    "item.nama|k-ng-model|Nama pegawai"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    if (_.contains($scope.item.tglLahir, '-')) {
                        $scope.item.tglLahir = new Date(formatDate($scope.item.tglLahir));
                    }
                    if (_.contains($scope.item.tglMasuk, '-')) {
                        $scope.item.tglMasuk = new Date(formatDate($scope.item.tglMasuk));
                    }
                    if (_.contains($scope.item.tglkeluar, '-')) {
                        $scope.item.tglkeluar = new Date(formatDate($scope.item.tglkeluar));
                    }

                    // if (_.contains($scope.item.tglPensiun, '-')) {
                    //     $scope.item.tglPensiun = new Date(formatDate($scope.item.tglPensiun));
                    // }
                    // var newModel = getDataChanged($scope.item);

                    var newModel = $scope.item;
                    if (newModel.statusRhesus) {
                        newModel.statusRhesus = newModel.statusRhesus.name
                    }
                    if (newModel.isMenanggung) {
                        if (newModel.isMenanggung.id == 1) {
                            newModel.isMenanggung = true
                        } else if (newModel.isMenanggung.id == 2) {
                            newModel.isMenanggung = false
                        }

                    }
                    for (var key in newModel) {
                        if ($state.params.idPegawai) {
                            newModel.id = $state.params.idPegawai;
                        } else {
                            newModel.statusEnabled = true;
                        }

                        // console.log($state.params.idPegawai);
                        // newModel[key] === '' || newModel[key] === undefined || 

                        if (newModel[key] === null || newModel[key] === undefined) {
                            if (key.indexOf("tgl") >= 0) {
                                if (key === 'tglLahir') {
                                    newModel[key] = null;
                                }
                            } else {
                                delete newModel[key];
                            }
                        }
                        if (key === 'golongan') {
                            delete newModel[key];
                        }

                        // if(newModel[key] === "") {
                        //     newModel[key] = '-';
                        // }
                        // if(newModel.statusRhesus) {
                        //     newModel.statusRhesus = newModel.statusRhesus.name
                        // }

                        if (newModel.hasOwnProperty(key)) {
                            if (key.indexOf("tgl") >= 0) {
                                newModel[key] = new Date(formatDate(newModel[key])).getTime();

                                // if(newModel[key] == null) { 
                                // }

                            }
                            if (key.indexOf('pangkat') >= 0) {
                                newModel[key] = {
                                    id: newModel[key].id,
                                    namaPangkat: newModel[key].namaPangkat
                                }
                            }
                            var keys = key;
                            if (key.indexOf("tglMeninggal") >= 0 || key.indexOf('tglPensiun') >= 0) {
                                newModel[keys] = newModel[key];
                                delete newModel[key];
                            }

                            // if(key)
                            // if (key.indexOf('isMenanggung') >= 0) {
                            //     // console.log(newModel[key]);
                            //     if (newModel[key].id == 1) {
                            //         newModel[key] = true;
                            //     } else if (newModel[key].id == 2) {
                            //         newModel[key] = false;
                            //     }
                            // }

                        }
                    }

                    // if (!$scope.disableSip) {
                    //     $scope.item.noSip = $scope.item.noSip;
                    //     var tglTerbitSip = isDate($scope.item.tglTerbitSip),
                    //         tglBerakhirSip = isDate($scope.item.tglBerakhirSip);
                    //     if (tglBerakhirSip) {
                    //         tglBerakhirSip = new Date($scope.item.tglBerakhirSip).getTime();
                    //     } else {
                    //         tglBerakhirSip = new Date(dateHelper.newStringToDateTime($scope.item.tglBerakhirSip)).getTime();
                    //     }
                    //     if (tglTerbitSip) {
                    //         tglTerbitSip = new Date($scope.item.tglTerbitSip).getTime();
                    //     } else {
                    //         tglTerbitSip = new Date(dateHelper.newStringToDateTime($scope.item.tglTerbitSip)).getTime();
                    //     }
                    //     $scope.item.tglTerbitSip = tglTerbitSip;
                    //     $scope.item.tglBerakhirSip = tglBerakhirSip;
                    // } else {
                    //     if ($scope.item.noSip) $scope.item.noSip = null;
                    //     if ($scope.item.tglTerbitSip) $scope.item.tglTerbitSip = null;
                    //     if ($scope.item.tglBerakhirSip) $scope.item.tglBerakhirSip = null;
                    // }
                    // if (!$scope.disableStr) {
                    //     $scope.item.noStr = $scope.item.noStr;
                    //     var tglTerbitStr = isDate($scope.item.tglTerbitStr),
                    //         tglBerakhirStr = isDate($scope.item.tglBerakhirStr);
                    //     if (tglBerakhirStr) {
                    //         tglBerakhirStr = new Date($scope.item.tglBerakhirStr).getTime();
                    //     } else {
                    //         tglBerakhirStr = new Date(dateHelper.newStringToDateTime($scope.item.tglBerakhirStr)).getTime();
                    //     }
                    //     if (tglTerbitStr) {
                    //         tglTerbitStr = new Date($scope.item.tglTerbitStr).getTime();
                    //     } else {
                    //         tglTerbitStr = new Date(dateHelper.newStringToDateTime($scope.item.tglTerbitStr)).getTime();
                    //     }
                    //     $scope.item.tglTerbitStr = tglTerbitStr;
                    //     $scope.item.tglBerakhirStr = tglBerakhirStr;
                    // } else {
                    //     if ($scope.item.noStr) $scope.item.noStr = null;
                    //     if ($scope.item.tglTerbitStr) $scope.item.tglTerbitStr = null;
                    //     if ($scope.item.tglBerakhirStr) $scope.item.tglBerakhirStr = null;
                    // }

                    var isEmptyModel = _.isEmpty(newModel);
                    if (!isEmptyModel) {
                        for (var key in newModel) {
                            if (newModel.hasOwnProperty(key)) {
                                // redirect ke halaman mapping atasan
                                if (key.indexOf("jabatanInternal") >= 0 || key.indexOf("unitKerja") >= 0) $scope.ubahMappingAtasan = true;
                            }
                        }
                        ManageSdmNew.saveData(newModel, "sdm/save-rekam-data-pegawai").then(function (dat) {
                            if (dat.data.data.noRec) {
                                var idPegawai = dat.data.data.noRec;
                                if (!$state.params.idPegawai) {
                                    $state.go('DataPegawai');
                                } else {
                                    $scope.ubahDataPegawai();
                                    initRiwayatPerubahandData();
                                    var confirm = $mdDialog.confirm()
                                        .title('Apakah anda akan melanjutkan edit data?')
                                        .ariaLabel('Lucky day')
                                        .ok('Ya')
                                        .cancel('Kembali ke Data Pegawai');
                                    $mdDialog.show(confirm).then(function () {
                                        getDataPegawai($state.params.idPegawai);
                                    }, function () {
                                        $state.go('DataPegawai');
                                    });
                                }
                                if ($scope.item.noSip) {
                                    $scope.item.tglTerbitSip = _.contains($scope.item.tglTerbitSip, '-') ? $scope.item.tglTerbitSip : dateHelper.formatDate($scope.item.tglTerbitSip, "DD-MM-YYYY");
                                    $scope.item.tglBerakhirSip = _.contains($scope.item.tglBerakhirSip, '-') ? $scope.item.tglBerakhirSip : dateHelper.formatDate($scope.item.tglBerakhirSip, "DD-MM-YYYY");
                                }
                                if ($scope.item.noStr) {
                                    $scope.item.tglTerbitStr = _.contains($scope.item.tglTerbitStr, '-') ? $scope.item.tglTerbitStr : dateHelper.formatDate($scope.item.tglTerbitStr, "DD-MM-YYYY");
                                    $scope.item.tglBerakhirStr = _.contains($scope.item.tglBerakhirStr, '-') ? $scope.item.tglBerakhirStr : dateHelper.formatDate($scope.item.tglBerakhirStr, "DD-MM-YYYY");
                                }
                            } else {
                                $scope.item = {
                                    "tglLahir": new Date(),
                                    "tglMasuk": new Date(),
                                    "tglkeluar": new Date()
                                };
                            }
                        }, (error) => {
                            getDataPegawai($state.params.idPegawai);
                        });
                    } else {
                        messageContainer.error('Tidak ada perubahan data');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

            $scope.ubahDataPegawai = function () {
                if ($scope.item.noSip) {
                    $scope.disableSip = false;
                } else {
                    $scope.disableSip = true;
                }
                if ($scope.item.noStr) {
                    $scope.disableStr = false;
                } else {
                    $scope.disableStr = true;
                }
                $scope.isEdit = true;

                $scope.isSimpan = false;
                $scope.isEdit = true;
            };

            // $scope.getDetailKategoriPegawai = function (idK) {
            //     ManageSdm.getOrderList("service/list-generic/?view=DetailKategoryPegawai&select=id,detailKategoryPegawai&criteria=statusEnabled,kategoryPegawaiId&values=true," + idK.id, true).then(function (res) {
            //         $scope.listOfDetailJenisKategoriPegawai = res.data;
            //         if (res.data.length === 0) {
            //             $scope.item.detailKategoryPegawai = '';
            //         }
            //         // console.log(res);
            //     });
            // };

            // $scope.$watch()
            // };
        }]);
});
