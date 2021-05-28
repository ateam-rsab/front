define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DataDokterTamuCtrl', ['$q', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DaftarPegawaiService', 'DataHelper', 'FindSdm', 'DateHelper', '$timeout', 'CetakHelper', '$mdDialog',
        function ($q, cacheHelper, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, DaftarPegawaiService, dataHelper, FindSdm, dateHelper, $timeout, cetakHelper, $mdDialog) {
            $scope.title = "Data Dokter Tamu";
            $scope.item = {};
            $scope.username = "Show";
            $scope.isRouteLoading = true;
            $scope.inactiveLogin = [3, 4, 5, 6, 24, 25, 26, 28, 29]
            $scope.listOfJenisKategoriPegawai = [
                { name: 'Tetap', id: 1, value: '1,2,10,12,14' },
                { name: 'Tidak Tetap', id: 1, value: '13,16,19,11,17,15' },
            ]
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            var data = cacheHelper.get('listPegawai');
            $scope.filteredData = [];

            if (data === undefined) {
                data = [];
            }
            $scope.daftarPegawai = new kendo.data.DataSource({
                data: data,
                pageSize: 10,
                total: data.length,
                serverPaging: false,
                serverFiltering: false
            });

            $q.all([
                ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatan&values=3", true),
                ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                ManageSdmNew.getListData("sdm/get-all-unit-kerja"),
                ManageSdmNew.getListData("pegawai/get-pegawai-str-expired"),
                ManageSdmNew.getListData("pegawai/get-pegawai-sip-expired"),
                ManageSdmNew.getListData("sdm/get-all-kedudukan"),
                ManageSdmNew.getListData("sdm/get-mapping-pegawai"),
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
            ]).then(function (result) {
                $scope.ListJabatanInternal = result[0].data;
                $scope.listSubUnitKerja = $scope.listSubUnit = result[1].data.data;

                if (result[2].statResponse) {
                    var toRemove = [0],
                        listUnitKerja = result[2].data.data;

                    $scope.listUnitKerja = listUnitKerja.filter(function (el) {
                        return !toRemove.includes(el.id);
                    });
                }

                if (result[3].data.data.length > 0 || result[4].data.data.length > 0) {
                    $scope.messages = "Sistem mendeteksi SIP dan STR pegawai yang akan berakhir dalam 6 bulan ke depan. Klik (OK) untuk melihat daftar SIP dan atau STR."
                    $scope.dialogPopup.setOptions({
                        width: 400,
                        title: 'Notifikasi masa berlaku SIP/STP Pegawai'
                    })
                    $scope.dialogPopup.center();
                    $scope.dialogPopup.open();
                };

                if (result[5].statResponse) {
                    var toRemove = [3, 4, 5, 22, 23, 24, 25, 28],
                        listKedudukan = result[5].data.data;

                    $scope.ListKedudukanPegawai = listKedudukan.filter(function (el) {
                        return !toRemove.includes(el.id);
                    });
                }

                // restructure json get mapping atasan
                if (result[6].statResponse) {
                    $scope.arrayMapAtasan = [];
                    result[6].data.data.forEach(function (item) {
                        $scope.arrayMapAtasan.push({
                            pegawai: {
                                id: item.idPegawai,
                                namaLengkap: item.namaPegawai
                            },
                            atasanLangsung: {
                                id: item.idAtasanLangsung,
                                namaLengkap: item.namaAtasanLangsung
                            },
                            atasanPejabatPenilai: {
                                id: item.idAtasanPejabatPenilai,
                                namaLengkap: item.namaAtasanPejabatPenilai
                            }
                        });
                    });
                }
                if (result[7].statResponse) {
                    $scope.dropDownPegawai = result[7].data;
                }
            }, (err) => {

            })

            $scope.inputPegawaiBaru = function () {
                $state.go("RekamDataDokterTamu");
            };

            $scope.daftarpegawaiOpt = {
                toolbar: [
                    { text: "export", name: "Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export All to Excel</button>' },
                    { name: "username", text: "Show username", template: '<button ng-click="toogleClick()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-refresh"></span>{{username}} Username</button>' },
                    { name: "pegawaiBaru", text: "Rekam Data Dokter Tamu", template: '<button ng-click="inputPegawaiBaru()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Rekam Data Dokter Tamu</button>' }
                ],
                excel: {
                    allPages: true,
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    scale: 0.8,
                    fileName: "RSAB HK Export Data Dokter Tamu-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                },
                pageable: true,
                pageSize: 10,
                selectable: 'row',
                scrollable: true,
                columns: [
                    {
                        field: "nipPns",
                        title: "<h3>N.I.P</h3>",
                        width: "17%",
                    },
                    {
                        field: "namaLengkap",
                        title: "<h3>Nama<br>Lengkap</h3>",
                        width: "25%"
                    },
                    {
                        field: "NamaUser",
                        title: "<h3>Username</h3>",
                        width: "20%",
                        hidden: true,
                    },
                    {
                        field: "unitKerja",
                        title: "<h3>Unit Kerja</h3>",
                        width: "20%"
                    },
                    {
                        field: "subUnitKerja",
                        title: "<h3>Sub Unit<br>Kerja</h3>",
                        width: "20%"
                    },
                    {
                        field: "jabatanInternal",
                        title: "<h3>Jabatan Internal</h3>",
                        width: "20%",
                        hidden: "true"
                    },
                    {
                        field: "tglMasuk",
                        title: "<h3>Tanggal <br>Masuk</h3>",
                        width: "10%"
                    },
                    {
                        command: [
                            {
                                text: "Lihat",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: editDataPegawai,
                                imageClass: "k-i-arrow-60-right"
                            },
                            {
                                text: "Hapus",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: confirmHapusDataPegawai,
                                imageClass: "k-i-arrow-60-right"
                            }
                        ],
                        title: "",
                        width: "20%",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    }
                ],
                excelExport: function (e) {
                    var columns = e.workbook.sheets[0].columns;
                    columns.forEach(function (column) {
                        delete column.width;
                        column.autoWidth = true;
                    });
                },
                change: function (e) {
                    var grid = $("#gridDataPegawai").data("kendoGrid");
                    var selectedRows = grid.dataItem(grid.select());
                    for (var i = 0; i < $scope.arrayMapAtasan.length; i++) {
                        if (selectedRows.idPegawai == $scope.arrayMapAtasan[i].pegawai.id) {
                            if ($scope.arrayMapAtasan[i].atasanLangsung) selectedRows.atasanLangsung = $scope.arrayMapAtasan[i].atasanLangsung;
                            if ($scope.arrayMapAtasan[i].atasanPejabatPenilai) selectedRows.atasanPejabatPenilai = $scope.arrayMapAtasan[i].atasanPejabatPenilai;
                            break;
                        }
                    }
                    $scope.dataItem = selectedRows;
                }
            };

            $scope.exportDetail = function (e) {
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        { value: "ID Finger" },
                        { value: "NIP" },
                        { value: "Nama" },
                        { value: "Gelar Depan" },
                        { value: "Gelar Belakang" },
                        { value: "Nama Lengkap" },
                        { value: "Tempat Lahir" },
                        { value: "Tanggal Lahir" },
                        { value: "Jenis Kelamin" },
                        { value: "Nomor Telepon" },
                        { value: "Nomor Handphone" },
                        { value: "Status Pegawai" },
                        { value: "Kedudukan Pegawai" },
                        { value: "Tanggal Masuk" },
                        { value: "Tanggal Keluar" },
                        { value: "Golongan" },
                        { value: "Jabatan Struktural/Fungsional" },
                        { value: "Pendidikan" },
                        { value: "Jabatan Internal" },
                        { value: "Kelompok Jabatan" },
                        { value: "Status Kawin" },
                        { value: "No Rekening" },
                        { value: "Nama Rekening" },
                        { value: "Kode Bank" },
                        { value: "NPWP" },
                        { value: "Alamat" },
                        { value: "Kodepos" },
                        { value: "Agama" },
                        { value: "Unit Kerja" },
                        { value: "Sub Unit Kerja" },
                        { value: "Atasan Langsung" },
                        { value: "Pejabat Penilai" },
                        { value: "Atasan Langsung untuk Pejabat Direksi" },
                        { value: "Pejabat Penilai untuk Pejabat Direksi" },
                        { value: "Eselon" },
                        { value: "Pola Kerja" },
                        { value: "Nilai Jabatan" },
                        { value: "Grade" },
                        { value: "SIP" },
                        { value: "Tgl Terbit SIP" },
                        { value: "Tgl Berakhir SIP" },
                        { value: "STR" },
                        { value: "Tgl Terbit STR" },
                        { value: "Tgl Berakhir STR" }
                    ]
                }];

                tempDataExport = $scope.daftarPegawai;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].idFinger },
                                { value: data[i].nipPns },
                                { value: data[i].nama },
                                { value: data[i].gelarDepan },
                                { value: data[i].gelarBelakang },
                                { value: data[i].namaLengkap },
                                { value: data[i].tempatLahir },
                                { value: data[i].tglLahir },
                                { value: data[i].jenisKelamin },
                                { value: data[i].noTlp },
                                { value: data[i].noHandphone },
                                { value: data[i].kategoriPegawai },
                                { value: data[i].kedudukan },
                                { value: data[i].tglMasuk },
                                { value: data[i].tglKeluar },
                                { value: data[i].namaGolongan },
                                { value: data[i].namaJabatan },
                                { value: data[i].namaPendidikan },
                                { value: data[i].jabatanInternal },
                                { value: data[i].kelompokJabatan },
                                { value: data[i].statusKawin },
                                { value: data[i].bankRekeningNomor },
                                { value: data[i].bankRekeningAtasNama },
                                { value: data[i].bankRekeningNama },
                                { value: data[i].npwp },
                                { value: data[i].alamat },
                                { value: data[i].kodePos },
                                { value: data[i].agama },
                                { value: data[i].unitKerja },
                                { value: data[i].subUnitKerja },
                                { value: data[i].atasanLangsung },
                                { value: data[i].pejabatPenilai },
                                { value: data[i].atasanLangsungUntukPejabatDireksi },
                                { value: data[i].pejabatPenilaiUntukPejabatDireksi },
                                { value: data[i].eselon },
                                { value: data[i].shiftKerja },
                                { value: data[i].nilaiJabatan },
                                { value: data[i].grade },
                                { value: data[i].noSip },
                                { value: data[i].tglTerbitSip },
                                { value: data[i].tglBerakhirSip },
                                { value: data[i].noStr },
                                { value: data[i].tglTerbitStr },
                                { value: data[i].tglBerakhirStr }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                filter: { from: 0, to: 1 },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                ],
                                // Title of the sheet
                                title: "Employees",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "RSAB HK Export Data Dokter Tamu Detail-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx" });
                });
            };

            function editDataPegawai(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.dataItem = dataItem;
                if ($scope.dataItem) {
                    $state.go("RekamDataDokterTamu", { idPegawai: $scope.dataItem.idPegawai });
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                }
            }
            function confirmHapusDataPegawai(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (!$scope.inactiveLogin.includes(dataItem.kedudukanId)) {
                    toastr.warning("Mohon sesuaikan kedudukan pegawai terlebih dahulu", "Peringatan")
                    return
                }

                var confirm = $mdDialog.confirm()
                    .title('Hapus Data Dokter Tamu')
                    .textContent(`Apakah Anda yakin akan menghapus data dokter tamu atas nama ${dataItem.namaLengkap}?`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    hapusDataPegawai(dataItem.idPegawai);
                }, function () {

                });
            }

            function hapusDataPegawai(id) {
                var jsonDelete = {
                    id: id,
                    statusEnabled: false
                }
                ManageSdmNew.saveData(jsonDelete, "sdm/hapus-pegawai").then(function (dat) {
                    getPegawaiAlls();
                });
            }

            getPegawaiAlls();
            function getPegawaiAlls() {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("pegawai/get-all-dokter-tamu/").then(function (data) {
                    var arr = [];
                    var usergemes = '';
                    for (var x = 0; x < data.data.data.pegawai.length; x++) {
                        var element = data.data.data.pegawai[x];
                        // data.data.data.pegawai[x].usernames.usernames[0].namaUser
                        for (var key in element) {
                            if (element.hasOwnProperty(key)) {
                                if (key.indexOf("tgl") >= 0 || key.indexOf("tanggal") >= 0) {
                                    if (element[key]) element[key] = moment(element[key]).format('DD-MM-YYYY');
                                }
                            }

                        }
                        usergemes = ''
                        for (var i = element.usernames.usernames.length - 1; i >= 0; i--) {
                            usergemes = element.usernames.usernames[i].namaUser + ', ' + usergemes;
                        }
                        data.data.data.pegawai[x].NamaUser = usergemes;
                        element.pencarian = "";
                    }
                    $scope.listPegawai = data.data.data.pegawai;
                    if (data.data.data.length === 0) {
                        cacheHelper.set('listPegawai', $scope.listPegawai);
                    }
                    $scope.daftarPegawai = new kendo.data.DataSource({
                        data: $scope.listPegawai,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false
                    });
                    $scope.isRouteLoading = false;
                });
            }

            $scope.onEnter = function ($event) {
                var keyCode = $event.which || $event.keyCode;
                if (keyCode === 13) {
                    $scope.searchDataPegawai();
                }
            };

            $scope.searchDataPegawai = function () {
                var tgl = new Date($scope.item.tglMasuk);
                var tahunMasuk = tgl.getFullYear();
                var bulanMasuk = tgl.getMonth() + 1;
                var tglMasuk = `${tahunMasuk}-${bulanMasuk > 9 ? bulanMasuk : '0' + bulanMasuk}`;

                $scope.isRouteLoading = true;
                var usergemes = '';
                ManageSdmNew.getListData(`pegawai/search-dokter-tamu?nama=${$scope.item.namaPegawai ? $scope.item.namaPegawai : ''}&idUnitKerja=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ''}&idKedudukan=${$scope.item.kedudukanPegawai ? $scope.item.kedudukanPegawai.id : ''}&periode=${$scope.item.tglMasuk ? tglMasuk : ''}`, true).then(res => {
                    if (res.data.data.dataFound) {
                        for (var x = 0; x < res.data.data.pegawai.length; x++) {
                            var element = res.data.data.pegawai[x];
                            for (var key in element) {
                                if (element.hasOwnProperty(key)) {
                                    if (key.indexOf("tgl") >= 0 || key.indexOf("tanggal") >= 0) {
                                        if (element[key]) element[key] = moment(element[key]).format('DD-MM-YYYY');
                                    }
                                }

                            }
                            usergemes = ''
                            for (var i = element.usernames.usernames.length - 1; i >= 0; i--) {
                                usergemes = element.usernames.usernames[i].namaUser + ', ' + usergemes;
                            }
                            res.data.data.pegawai[x].NamaUser = usergemes;
                            element.pencarian = "";
                        }
                        $scope.listPegawai = res.data.data.pegawai;
                        if (res.data.data.length === 0) {
                            cacheHelper.set('listPegawai', $scope.listPegawai);
                        }
                        $scope.daftarPegawai = new kendo.data.DataSource({
                            data: res.data.data.pegawai,
                            pageSize: 10,
                            total: data.length
                        });

                    } else {
                        toastr.info('Data tidak ditemukan')
                    }
                    $scope.isRouteLoading = false;
                });
            };

            $scope.ubah = function () {
                if ($scope.dataItem) {
                    $state.go("RekamDataDokterTamu", { idPegawai: $scope.dataItem.idPegawai });
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                };
            }
            $scope.mutasi = function () {
                if ($scope.dataItem) {
                    $state.go("MutasiPegawai", { idPegawai: $scope.dataItem.idPegawai });
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                };
            }
            $scope.keluarga = function () {
                if ($scope.dataItem) {
                    $state.go("DataKeluarga", { idPegawai: $scope.dataItem.idPegawai });
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                };
            }
            $scope.mappingAtasan = function (e) {
                if ($scope.dataItem) {
                    $state.go("MappingAtasanPegawai", {
                        idPegawai: $scope.dataItem.idPegawai,
                        namaLengkap: $scope.dataItem.nama
                    })
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                };
            };
            $scope.riwayatPendidikan = function (e) {
                if ($scope.dataItem) {
                    $state.go("RiwayatPendidikan", {
                        idPegawai: $scope.dataItem.idPegawai,
                        namaLengkap: $scope.dataItem.nama,
                        nip: $scope.dataItem.nipPns,
                    })
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                };
            };
            $scope.riwayatJabatan = function (e) {
                if ($scope.dataItem) {
                    $state.go("RiwayatJabatan", {
                        idPegawai: $scope.dataItem.idPegawai,
                        namaLengkap: $scope.dataItem.nama,
                        nip: $scope.dataItem.nipPns,
                    })
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                };
            };
            $scope.goToUrl = function () {
                $scope.dialogPopup.close();
                $state.go('MasaBerlakuSipStr');
            };
            $scope.goToUrlReport = function (data) {
                var listRawRequired = [
                    "report.statusPegawai|k-ng-model|Status pegawai"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.dialogReport.close();
                    var fixUrlLaporan = cetakHelper.openURLReporting("reporting/data-pegawai-berdasarkan-kategori-pegawai?kategoryPegawaiId=" + data.statusPegawai.id);
                    window.open(fixUrlLaporan, "Report Pegawai (Dokter Tamu) RSABHK", "width=800, height=600");
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.goToUrlReportAll = function () {
                $scope.dialogReport.close();
                var fixUrlLaporan = cetakHelper.openURLReporting("reporting/data-pegawai-berdasarkan-kategori-pegawai?kategoryPegawaiId=");
                window.open(fixUrlLaporan, "Report Pegawai RSABHK", "width=800, height=600");
            }
            function filterSubunit(subUnit) {
                if (!$scope.item.qunitKerja) return;
                if (subUnit.unitKerja.id === $scope.item.qunitKerja.id) {
                    return true;
                }
                return false;
            }

            $scope.resetFilter = function () {
                $scope.item.namaPegawai = undefined;
                $scope.item.unitKerja = undefined;
                $scope.item.kedudukanPegawai = undefined;
                $scope.item.selectedJenisKategoriPegawai = undefined;
                $scope.item.tglMasuk = null;

                getPegawaiAlls();
            };

            $scope.riwayat = function (data) {
                if (!data) {
                    messageContainer.error('Pegawai belum di pilih');
                    return;
                }

                ManageSdmNew.getListData("sdm/get-list-history-pegawai/" + parseInt(data.idPegawai)).then(function (res) {
                    if (res.data.data.dataFound) {
                        $scope.title = "Histori Perubahan Data Pegawai";
                        $scope.optHistoriPegawai = {
                            selectable: "row",
                            columns: [
                                { field: "tanggal", title: "Tanggal", width: "7%", template: "#= kendo.toString(new Date(tanggal), \"dd/MM/yyyy\") #" },
                                { field: "tanggal", title: "jam", width: "4%", template: "#= kendo.toString(new Date(tanggal), \"HH:mm\") #" },
                                { field: "perubahan", title: "Perubahan", width: "64%" },
                                { field: "petugas", title: "Petugas", width: "20%" },
                                { command: [{ text: "Detil", click: showDetail }], title: "&nbsp;", width: "6%" }
                            ]
                        }
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
            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

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
            $scope.closeHistory = function () {
                $scope.title = "Data Pegawai";
                $scope.klikRiwayat = false;
            }



            $scope.simpanAtasan = function (data) {
                var listRawRequired = [
                    "dataItem.atasanPejabatPenilai|k-ng-model|Atasan pejabat penilai",
                    "dataItem.atasanLangsung|k-ng-model|Atasan langsung",
                    "dataItem.idPegawai|ng-model|Pegawai",
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var dataModel = [], itemSend;
                    if (!$scope.dataItem.atasanPejabatPenilai.id || $scope.dataItem.atasanPejabatPenilai.id === "") {
                        itemSend = {
                            pegawai: { id: $scope.dataItem.idPegawai },
                            atasanLangsung: $scope.dataItem.atasanLangsung,
                            statusEnabled: $scope.dataItem.action ? false : true
                        }
                    } else {
                        itemSend = {
                            pegawai: { id: $scope.dataItem.idPegawai },
                            atasanLangsung: $scope.dataItem.atasanLangsung,
                            atasanPejabatPenilai: $scope.dataItem.atasanPejabatPenilai,
                            statusEnabled: true
                        }
                    }
                    dataModel.push(itemSend);
                    ManageSdmNew.saveData(dataModel, "sdm/save-mapping-pegawai-to-atasan").then(function (e) {
                        init();
                    });
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }
            $scope.cetakReport = function () {
                $scope.report = {};
                $scope.dialogReport.setOptions({
                    width: 400,
                    title: 'Report Pegawai RSABHK'
                })
                $scope.dialogReport.center();
                $scope.dialogReport.open();
            };

            $scope.toogleClick = function () {
                var grid = $("#gridDataPegawai").data("kendoGrid");
                if ($scope.username == "Show") {
                    grid.showColumn(2);
                    $scope.username = "Hide"
                } else if ($scope.username == "Hide") {
                    grid.hideColumn(2);
                    $scope.username = "Show"
                }

            }
        }
    ]);
});