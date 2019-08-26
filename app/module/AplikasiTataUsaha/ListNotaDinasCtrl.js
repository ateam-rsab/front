define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ListNotaDinasCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window', '$q',
        function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window, $q) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            let user = JSON.parse(localStorage.getItem('pegawai'));
            $scope.isRouteLoading = true;
            initializeData();

            function initializeData() {
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                var idPegawai = ModelItem.getPegawai().id;
                ManageSarpras.getMaster('pegawai/get-form-pegawai-combo').then(res => {
                    $scope.listPegawai = res.data.data
                });
                $scope.optListPenerima = {
                    pageable: true,
                    pageSize: 5,
                    selectable: 'row',
                    scrollable: true,
                    columns: [
                        {
                            field: "namaPenerima",
                            title: "<h3>Nama Penerima</h3>",
                            width: "17%",
                        },
                        {
                            field: "ruanganPenerima",
                            title: "<h3>Ruangan Penerima</h3>",
                            width: "17%",
                        },
                        {
                            command: [
                                {
                                    text: "Hapus",
                                    width: "40px",
                                    align: "center",
                                    attributes: {
                                        align: "center"
                                    },
                                    click: hapusPenerima,
                                    imageClass: "k-i-arrow-60-right"
                                },

                            ],
                            title: "",
                            width: "10%",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }
                    ]
                }
                $scope.dataSourceListPenerima = new kendo.data.DataSource({
                    data: [],
                    pageSize: 5,
                });
                // $q.all([
                //     ManageSarpras.getOrderList("nota-dinas/get-inbox-nota-dinas?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idPegawai=" + idPegawai, true),
                //     ManageSarpras.getOrderList("nota-dinas/get-outbox-nota-dinas?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idPegawai=" + idPegawai, true),
                // ]).then(function (data) {
                //     $scope.notaMasuk = new kendo.data.DataSource({
                //         data: data[0].data.data
                //     });

                //     $scope.notaKeluar = new kendo.data.DataSource({
                //         data: data[1].data.data
                //     });
                // });
                console.log(user);

                ManageSarpras.getTransaksi('humas/get-daftar-surat?ruanganfk=' + user.ruangan.id).then(res => {
                    $scope.dataSourceKonsepSurat = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    });
                });

                ManageSarpras.getMasterJava("service/list-generic/?view=SatuanKerja&select=id,satuanKerja&criteria=statusEnabled&values=true", true).then(res => {
                    console.log(res);
                })
            }

            function hapusPenerima(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.dataSourceListPenerima.remove(dataItem);
            }

            $scope.cari = function () {
                initializeData();
            }

            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.ruangans
                    }),
                    columns: [{
                        "field": "ruangan_namaRuangan",
                        "title": "Ruangan",
                        "width": "20%"
                    }, {

                        "field": "jabatanInternal_namaJabatan",
                        "title": "Jabatan",
                        "width": "30%"
                    }, {

                        "field": "namaLengkap",
                        "title": "Nama ",
                        "width": "40%"
                    }]
                };

            };

            $scope.optKonsepSurat = {
                toolbar: [
                    // "excel",
                    // { text: "export", name: "Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export All to Excel</button>' },
                    // { name: "username", text: "Show username", template: '<button ng-click="toogleClick()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-refresh"></span>{{username}} Username</button>' },
                    { name: "SuratBaru", text: "Tambah Konsep Surat Baru", template: '<button ng-click="tambahSuratBaru()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Konsep Surat Baru</button>' }
                ],
                // excel: {
                //     allPages: true,
                //     margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                //     scale: 0.8,
                //     fileName: "RSAB HK Export Data Pegawai-" + DateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                // },
                pageable: true,
                pageSize: 5, //page size
                selectable: 'row',
                scrollable: true,
                columns: [
                    {
                        field: "nosurat",
                        title: "<h3>No. Surat</h3>",
                        width: "17%",
                    },
                    {
                        field: "tglsurat",
                        title: "<h3>Tanggal</h3>",
                        width: "25%"
                    },
                    {
                        field: "hal",
                        title: "<h3>Tema Surat</h3>",
                        width: "20%"
                    },
                    {
                        field: "status_surat",
                        title: "<h3>Status</h3>",
                        width: "20%",
                        // template: "#if(status_surat) { #  Approve # #} else { # Konsep # } #",
                        template: "#if(status_surat) { #Approve# } else { #Konsep# } #",
                    },
                    // {
                    //     // field: "jabatanInternal",
                    //     title: "<h3>Terkirim</h3>",
                    //     width: "20%",
                    //     template: "-",
                    // },
                    // {
                    //     // field: "kategoriPegawai",
                    //     title: "<h3>Dibaca</h3>",
                    //     width: "15%",
                    //     attributes: {
                    //         style: "text-align:center;valign=middle"
                    //     },
                    //     template: "-",
                    // },
                    {
                        command: [
                            {
                                name: 'Edit',
                                text: "Pratinjau",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: previewSurat,
                                imageClass: "k-i-arrow-60-right"
                            },
                            {
                                name: "VerifikasiDokter",
                                text: "Distribusi",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: distribusiSurat,
                                imageClass: "k-i-arrow-60-right"
                            },
                            {
                                text: "Hapus",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                // click: confirmHapusDataPegawai,
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

            $scope.tambahSuratBaru = function () {
                $state.go('NotaDanDisposisi')
            }

            function distribusiSurat(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.noreSurat = dataItem.norec;
                $scope.popupDistribusi.center().open();
            }

            $scope.tambahPenerima = function () {
                if (!$scope.item.namaPenerima) {
                    toastr.warning('Harap isi Nama Penerima');
                    return
                }
                if (!$scope.item.ruanganPegawai) {
                    toastr.warning('Harap isi Ruangan Penerima');
                    return
                }
                let data = {
                    namaPenerima: $scope.item.namaPenerima.namalengkap,
                    idPenerima: $scope.item.namaPenerima.id,
                    ruanganPenerima: $scope.item.ruanganPegawai.namalengkap,
                    idRuangan: $scope.item.namaPenerima.id
                }

                $scope.item.namaPenerima = "";
                $scope.item.ruanganPegawai = "";
                $scope.dataSourceListPenerima.add(data);

            }

            $scope.distribusiSurat = function () {
                let dataTemp = [];
                let dataGrid = $scope.dataSourceListPenerima._data;
                let dataUser = {
                    ruanganId: user.ruangan.id,
                    idPegawai: user.id
                }

                for (let i = 0; i < dataGrid.length; i++) {
                    dataTemp.push({
                        "norec": $scope.noreSurat,
                        "pegawaifk": dataUser.idPegawai.toString(),
                        "ruanganpengirimfk": dataUser.ruanganId.toString(),
                        "pegawaiterimafk": dataGrid[i].idPenerima.toString(),
                        "ruanganpenerimafk": "111",
                        "ruanganpenerimafk": dataGrid[i].idRuangan,

                    });
                }

                let data = [
                    {
                        "distribusi": dataTemp
                    }]

                ManageSarpras.saveTransaksi('humas/save-distribusi-surat', data).then(res => {
                    // console.log(res);
                    $scope.popupDistribusi.close();
                    toastr.success('Sukses');

                })
            }


            function previewSurat(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.showFormat = dataItem.isi;
                $scope.popupPreview.center().open();
            }

        }
    ])
})