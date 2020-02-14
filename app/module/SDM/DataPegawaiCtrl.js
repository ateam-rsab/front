define(['initialize'], function (initialize) {
    'use strict';
    // initialize.controller('DataPegawaiCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem','JenisSk','RekamDataPegawai','StatusPerkawinan','ManageSdm','ManageSdmNew','FindSdm',
    initialize.controller('DataPegawaiCtrl', ['$q', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DaftarPegawaiService', 'DataHelper', 'FindSdm', 'DateHelper', '$timeout', 'CetakHelper', '$mdDialog',
        function ($q, cacheHelper, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, DaftarPegawaiService, dataHelper, FindSdm, dateHelper, $timeout, cetakHelper, $mdDialog) {
            // $scope.dataVOloaded = true;
            //$state.go('UnderMaintenance',  { namaForm: 'DataPegawai' });
            $scope.title = "Data Pegawai";
            $scope.item = {};
            $scope.username = "Show";
            $scope.item.selectedStatusPegawai = [];
            $scope.isRouteLoading = true;
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
                // manageSdmNew.getListData("sdm/get-all-unit-kerja"),
                ManageSdmNew.getListData("pegawai/get-pegawai-str-expired"),
                ManageSdmNew.getListData("pegawai/get-pegawai-sip-expired"),
                ManageSdmNew.getListData("sdm/get-all-kedudukan"),
                ManageSdm.getOrderList("service/list-generic/?view=KategoryPegawai&select=id,kategoryPegawai&criteria=statusEnabled&values=true"),
                ManageSdmNew.getListData("sdm/get-mapping-pegawai"),
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
            ]).then(function (result) {
                $scope.ListJabatanInternal = result[0].data;
                $scope.listSubUnitKerja = $scope.listSubUnit = result[1].data.data;

                if (result[2].statResponse) {
                    var toRemove = [0],
                        listUnitKerja = result[2].data.data;

                    $scope.listUnitKerja = listUnitKerja.filter(function(el) {
                        return !toRemove.includes(el.id);
                    });
                }

                // $scope.listUnitKerja = result[2].data.data;
                if (result[3].data.data.length > 0 || result[4].data.data.length > 0) {
                    $scope.messages = "Sistem mendeteksi SIP dan STR pegawai yang akan berakhir dalam 6 bulan ke depan. Klik (OK) untuk melihat daftar SIP dan atau STR."
                    $scope.dialogPopup.setOptions({
                        width: 400,
                        title: 'Notifikasi masa berlaku SIP/STP Pegawai'
                    })
                    $scope.dialogPopup.center();
                    $scope.dialogPopup.open();
                };
                // $scope.ListKedudukanPegawai = result[5].data.data;
                if (result[5].statResponse) {
                    var toRemove = [3, 4, 5, 22, 23, 24, 25, 28],
                        listKedudukan = result[5].data.data;

                    $scope.ListKedudukanPegawai = listKedudukan.filter(function(el) {
                        return !toRemove.includes(el.id);
                    });
                }

                // $scope.ListStatusPegawai = result[6].data;

                if (result[6].statResponse) {
                    var toRemove = [13, 16, 17],
                        listKategory = result[6].data;

                    $scope.ListStatusPegawai = listKategory.filter(function(el) {
                        return !toRemove.includes(el.id);
                    });
                }
                
                // $scope.ListStatusPegawai = [];
                // var tempListStatusPegawai = result[6].data;
                // tempListStatusPegawai.forEach(function (el) {
                //     if (el.kategoryPegawai !== '-') {
                //         if (el.kategoryPegawai !== 'MITRA') {
                //             if (el.kategoryPegawai !== 'PESERTA DIDIK') {
                //                 var tempList = {
                //                     id: el.id,
                //                     kategoryPegawai: el.kategoryPegawai,
                //                 }
                //                 $scope.ListStatusPegawai.push(tempList);
                //             }
                //         }
                //     }
                // });
                 
                // restructure json get mapping atasan
                if (result[7].statResponse) {
                    $scope.arrayMapAtasan = [];
                    result[7].data.data.forEach(function (item) {
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
                if (result[8].statResponse) {
                    $scope.dropDownPegawai = result[8].data;
                }
            }, (err) => {
                console.log(err);
            })
            //DATA JABATAN INTERNAL
            // ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatan&values=3", true).then(function(dat) {
            //     $scope.ListJabatanInternal = dat.data;
            // });

            // $scope.idPegawai = "";
            // $scope.kl = function(current) {
            //     $scope.current = current;
            //     $scope.idPegawai = current.idPegawai;
            // };

            $scope.inputPegawaiBaru = function () {
                $state.go("RekamDataPegawai");
            };

            $scope.daftarpegawaiOpt = {
                toolbar: [
                    // "excel",
                    { text: "export", name: "Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export All to Excel</button>' },
                    { name: "username", text: "Show username", template: '<button ng-click="toogleClick()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-refresh"></span>{{username}} Username</button>' },
                    { name: "pegawaiBaru", text: "Rekam Pegawai Baru", template: '<button ng-click="inputPegawaiBaru()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Rekam Pegawai Baru</button>' }
                ],
                excel: {
                    allPages: true,
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    scale: 0.8,
                    fileName: "RSAB HK Export Data Pegawai-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                },
                pageable: true,
                pageSize: 10, //page size
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
                        field: "kategoriPegawai",
                        title: "<h3>Kategori</h3>",
                        width: "15%",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        }
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
                // if($scope.filteredData.length > 0){
                //     tempDataExport = new kendo.data.DataSource({
                //         data: $scope.daftarPegawai
                //     });
                // } else {
                //     tempDataExport = $scope.daftarPegawai;
                // }
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
                                ],
                                // Title of the sheet
                                title: "Employees",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "RSAB HK Export Data Pegawai Detail-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx" });
                });
            };

            function editDataPegawai(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.dataItem = dataItem;
                if ($scope.dataItem) {
                    $state.go("RekamDataPegawai", { idPegawai: $scope.dataItem.idPegawai });
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                }
            }
            function confirmHapusDataPegawai(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data pegawai?')
                    .textContent(`Anda akan menghapus data pegawai dengan nama ${dataItem.namaLengkap}`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    hapusDataPegawai(dataItem.idPegawai);
                    console.warn('Masuk sini pak eko');
                }, function () {
                    console.error('Tidak jadi hapus');
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
                ManageSdmNew.getListData("pegawai/get-all-pegawai-pns/").then(function (data) {
                    var arr = [];
                    // console.log(data)
                    var usergemes = '';
                    for (var x = 0; x < data.data.data.pegawai.length; x++) {
                        var element = data.data.data.pegawai[x];
                        // data.data.data.pegawai[x].usernames.usernames[0].namaUser
                        for (var key in element) {
                            if (element.hasOwnProperty(key)) {
                                if (key.indexOf("tgl") >= 0 || key.indexOf("tanggal") >= 0) {
                                    // console.log(element[key]);
                                    if (element[key]) element[key] = moment(element[key]).format('DD-MM-YYYY');
                                }
                            }

                        }
                        usergemes = ''
                        for (var i = element.usernames.usernames.length - 1; i >= 0; i--) {
                            usergemes = element.usernames.usernames[i].namaUser + ', ' + usergemes;
                        }
                        data.data.data.pegawai[x].NamaUser = usergemes;
                        // element.tglLahir = moment(data.data.data.pegawai[x].tglLahir).format('DD-MM-YYYY');
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

            // $scope.selectOptions = {
            //     placeholder: "Pilih Pegawai",
            //     dataTextField: "kategoryPegawai",
            //     dataValueField: "id",
            //     valuePrimitive: true,
            //     autoBind: false,
            //     dataSource: $scope.ListStatusPegawai
            // };

            // $scope.selectOptions = {
            //     placeholder: "Select kategori pegawai",
            //     dataTextField: "kategoryPegawai",
            //     dataValueField: "id",
            //     autoBind: true
            //     // valuePrimitive: true,
            //     // autoBind: false,
            // }
            // item.namaPegawai

            $scope.onEnter = function($event){
                var keyCode = $event.which || $event.keyCode;
                if (keyCode === 13) {
                    $scope.searchDataPegawai();
                }
            };

            $scope.searchDataPegawai = function () {
                let arrIdKategoriPegawai = [];
                if ($scope.item.selectedStatusPegawai) {
                    $scope.item.selectedStatusPegawai.forEach(function (el) {
                        arrIdKategoriPegawai.push(el.id);
                    })
                }
                // console.log(arrIdKategoriPegawai)
                var tgl = new Date($scope.item.tglMasuk);
                var tahunMasuk = tgl.getFullYear();
                var bulanMasuk = tgl.getMonth() + 1;
                var tglMasuk = `${tahunMasuk}-${bulanMasuk > 9 ? bulanMasuk : '0' + bulanMasuk}`;
                // console.log(bulanMasuk);
                $scope.isRouteLoading = true;
                var usergemes = '';
                // &listIdStatusPegawai=${$scope.item.selectedJenisKategoriPegawai ? $scope.item.selectedJenisKategoriPegawai.value:'' }
                ManageSdmNew.getListData(`pegawai/search-pegawai?nama=${$scope.item.namaPegawai ? $scope.item.namaPegawai : ''}&idUnitKerja=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ''}&idKedudukan=${$scope.item.kedudukanPegawai ? $scope.item.kedudukanPegawai.id : ''}&listStatusPegawaiId=${arrIdKategoriPegawai ? arrIdKategoriPegawai : ''}&periode=${$scope.item.tglMasuk ? tglMasuk : ''}`, true).then(res => {
                    if (res.data.data.dataFound) {
                        for (var x = 0; x < res.data.data.pegawai.length; x++) {
                            var element = res.data.data.pegawai[x];
                            // data.data.data.pegawai[x].usernames.usernames[0].namaUser
                            for (var key in element) {
                                if (element.hasOwnProperty(key)) {
                                    if (key.indexOf("tgl") >= 0 || key.indexOf("tanggal") >= 0) {
                                        // console.log(element[key]);
                                        if (element[key]) element[key] = moment(element[key]).format('DD-MM-YYYY');
                                    }
                                }

                            }
                            usergemes = ''
                            for (var i = element.usernames.usernames.length - 1; i >= 0; i--) {
                                usergemes = element.usernames.usernames[i].namaUser + ', ' + usergemes;
                            }
                            res.data.data.pegawai[x].NamaUser = usergemes;
                            // element.tglLahir = moment(res.data.data.pegawai[x].tglLahir).format('DD-MM-YYYY');
                            element.pencarian = "";
                        }
                        $scope.listPegawai = res.data.data.pegawai;
                        if (res.data.data.length === 0) {
                            cacheHelper.set('listPegawai', $scope.listPegawai);
                        }
                        $scope.daftarPegawai = new kendo.data.DataSource({
                            data: res.data.data.pegawai,
                            pageSize: 10,
                            total: data.length,
                            // serverPaging: false
                        });

                    } else {
                        toastr.info('Data tidak ditemukan')
                    }
                    $scope.isRouteLoading = false;
                });
            };

            $scope.ubah = function () {
                if ($scope.dataItem) {
                    $state.go("RekamDataPegawai", { idPegawai: $scope.dataItem.idPegawai });
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
                    window.open(fixUrlLaporan, "Report Pegawai (" + data.statusPegawai.kategoryPegawai + ") RSABHK", "width=800, height=600");
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
            // $scope.$watch('item.selectedStatusPegawai', function(newVal, oldVal){ 
            //     $scope.searchDataPegawai();
            // })

            var timeoutPromise;
            // $scope.$watch('item.qnamaPegawai', function(newVal, oldVal){
            //     if(!newVal) return;
            //     $timeout.cancel(timeoutPromise);
            //     timeoutPromise = $timeout(function(){
            //         if(newVal && newVal !== oldVal){
            //             applyFilter("namaLengkap", newVal);
            //         }
            //     }, 500)
            // });
            // $scope.$watch('item.qkedudukanPegawai', function(newVal, oldVal){
            //     if(!newVal) return;
            //     if(newVal && newVal !== oldVal){
            //         applyFilter("kedudukan", newVal)
            //     }
            // });
            // $scope.$watch('item.qjabatanInternal', function(newVal, oldVal){
            //     if(!newVal) return;
            //     if(newVal && newVal !== oldVal){
            //         applyFilter("idJabatanInternal", newVal)
            //     }
            // });
            // $scope.$watch('item.qunitKerja', function(newVal, oldVal){
            //     if(!newVal) return;
            //     if(newVal && newVal !== oldVal) {
            //         var filteredSubUnit = $scope.listSubUnitKerja.filter(filterSubunit);
            //         if($scope.item.qsubUnitKerja && $scope.item.qsubUnitKerja.unitKerja.id !== newVal.id) delete $scope.item.qsubUnitKerja;
            //         if(filteredSubUnit.length>0) {
            //             $scope.listSubUnit = filteredSubUnit;
            //         } else {
            //             $scope.listSubUnit = $scope.listSubUnitKerja;
            //         }
            //         applyFilter("idUnitKerja", newVal)
            //     }
            // });

            // $scope.$watch('item.qsubUnitKerja', function(newVal, oldVal){
            //     if(!newVal) return;
            //     if(newVal && newVal !== oldVal){
            //         applyFilter("idSubUnitKerja", newVal)
            //     }
            // });
            // $scope.$watch('item.selectedStatusPegawai', function(newVal, oldVal){
            //     if(!newVal) return;
            //     if(newVal && newVal !== oldVal){
            //         applyFilter("kategoriPegawai", newVal);
            //     }
            // });

            // $scope.$watch('item.tglMasuk', function(newVal, oldVal){
            //     if(!newVal) return;
            //     if(newVal && newVal !== oldVal){
            //         applyFilter("tglMasuk", newVal)
            //     }
            // });

            // function applyFilter(filterField, filterValue){
            //     var dataGrid = $("#gridDataPegawai").data("kendoGrid");
            //     var currFilterObject = dataGrid.dataSource.filter();
            //     var currentFilters = currFilterObject ? currFilterObject.filters : [];



            //     if(currentFilters && currentFilters.length > 0){
            //         for (var i = 0; i < currentFilters.length; i++) {
            //             if (currentFilters[i].field == filterField) {
            //                 currentFilters.splice(i, 1);
            //                 break;
            //             }
            //         }
            //     }



            //     if (filterField === "namaLengkap") {
            //         currentFilters.push({
            //             field: filterField,
            //             operator: "contains",
            //             value: filterValue
            //         });
            //     } else if (filterField === "kedudukan"){
            //         currentFilters.push({
            //             field: filterField,
            //             operator: "eq",
            //             value: filterValue.name
            //         });
            //     } else if (filterField === "idJabatanInternal" || filterField === "idUnitKerja" || filterField === "idSubUnitKerja"){
            //         currentFilters.push({
            //             field: filterField,
            //             operator: "eq",
            //             value: filterValue.id
            //         });
            //     } else if (filterField === "kategoriPegawai"){
            //         var i = 0;
            //         var status=false;
            //         var arrDataPegawai = [];
            //         arrDataPegawai = $scope.listPegawai.filter(function(data) {
            //             for(i=0;i<filterValue.length;i++){
            //                 if(data.kategoriPegawai==filterValue[i].kategoryPegawai){
            //                     status=true;
            //                     break;
            //                 }
            //                 else{
            //                     status=false;
            //                 }
            //             }

            //             return status;

            //         });

            //         $scope.daftarPegawai = new kendo.data.DataSource({
            //             data: arrDataPegawai,
            //             pageSize: 10,
            //             total: data.length,
            //             serverPaging: false
            //         });





            //     } else if (filterField === "tglMasuk"){

            //         var date = new Date($scope.item.tglMasuk), 
            //         y = date.getFullYear(), 
            //         m = date.getMonth()+1;

            //         if(m<10){
            //             m='0'+m;
            //         }

            //         var filter=m+'-'+y;


            //         currentFilters.push({
            //             field: filterField,
            //             operator: "contains",
            //             value: filter
            //         });


            //     }

            //     dataGrid.dataSource.filter({
            //         logic: "and",
            //         filters: currentFilters
            //     });

            //     var allData = dataGrid.dataSource.data();
            //     var params = dataGrid.dataSource.filter();
            //     var query  = new kendo.data.Query(allData);
            //     $scope.filteredData = query.filter(params).data;
            // }


            var arrFilterKategoriPegawai = [];
            function filterKategoriPegawai(dataPegawai) {

                return dataPegawai.kategoriPegawai in arrFilterKategoriPegawai;
            }

            $scope.resetFilter = function () {
                $scope.item.namaPegawai = undefined;
                $scope.item.unitKerja = undefined;
                $scope.item.kedudukanPegawai = undefined;
                $scope.item.selectedStatusPegawai = undefined;
                $scope.item.selectedJenisKategoriPegawai = undefined;
                $scope.item.tglMasuk = null;
                // var gridData = $("#gridDataPegawai").data("kendoGrid");
                // gridData.dataSource.filter({});
                // $scope.item = {};
                // $scope.filteredData = [];
                getPegawaiAlls();
            };

            $scope.riwayat = function (data) {
                if (!data) {
                    messageContainer.error('Pegawai belum di pilih');
                    return;
                }
                // FindSdm.getHistoryDataPg(data.idPegawai).then(function(res){
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
                        // grid.dataSource.add($scope.item);
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

            $scope.selectOptions = {
                placeholder: "Pilih Status Pegawai...",
                dataTextField: "kategoryPegawai",
                dataValueField: "id",
                filter: "contains"
            };

            // $scope.selectOptionsDetailJenis = {
            //         // placeholder: "Pilih Detail Jenis Produk...",
            //         dataTextField: "ListStatusPegawai",
            //         dataValueField: "id",
            //         filter: "contains"
            //       };

            // var data = [
            //         { text: "Africa", value:"1" },
            //         { text: "Europe", value:"2" },
            //         { text: "Asia", value:"3" },
            //         { text: "North America", value:"4" },
            //         { text: "South America", value:"5" },
            //         { text: "Antarctica", value:"6" },
            //         { text: "Australia", value:"7" }
            //     ];

            // $("#select").kendoMultiSelect({
            //         dataTextField: "ListStatusPegawai",
            //         dataValueField: "id",
            //         dataSource: data,
            //         deselect: onDeselect,
            //         select: onSelect
            //     });



        }
    ]);
});