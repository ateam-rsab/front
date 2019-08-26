define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarSuratDistribusiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window', '$q',
        function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window, $q) {
            $scope.item = {};
            $scope.checklist = '&#10004;';
            $scope.asterisk = '&#175;';
            let user = JSON.parse(localStorage.getItem('pegawai'));

            let init = function () {
                ManageSarpras.getMaster('pegawai/get-form-pegawai-combo').then(res => {
                    $scope.listPegawai = res.data.data
                });
                ManageSarpras.getTransaksi('humas/get-distribusi-surat?ruanganpenerimafk=113').then(res => {
                    $scope.dataSourceDistribusi = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    })
                });

                $scope.optDistribusiSurat = {
                    pageable: true,
                    pageSize: 5,
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
                            width: "17%",
                            template: "#= kendo.toString(new Date(tglsurat), \"dd/MM/yyyy\") #"
                        },
                        {
                            field: "ruangpenerima",
                            title: "<h3>Ruang<br>Penerima</h3>",
                            width: "25%"
                        },
                        {
                            field: "pegawaiterima",
                            title: "<h3>Pegawai Penerima</h3>",
                            width: "20%"
                        },
                        {
                            field: "hal",
                            title: "<h3>Perihal</h3>",
                            width: "20%"
                        },
                        {
                            field: "keterangan",
                            title: "<h3>Keterangan</h3>",
                            width: "20%"
                        },
                        {
                            field: "status_baca",
                            title: "<h3>Baca</h3>",
                            width: "20%",
                            template: "#if(status_baca) {# <p ng-bind-html='checklist'></p> #} else { #<p class='font-size:20px' ng-bind-html='asterisk'></p># } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },

                        },
                        {
                            field: "status_kirim",
                            title: "<h3>Kirim</h3>",
                            width: "20%",
                            template: "#if(status_kirim) {# <p ng-bind-html='checklist'></p> #} else { #<p ng-bind-html='asterisk'></p># } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            field: "status_surat",
                            title: "<h3>Status Surat</h3>",
                            width: "20%",
                            template: "#if(status_surat) {# <p ng-bind-html='checklist'></p> #} else { #<p ng-bind-html='asterisk'></p># } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                            // template: '<p ng-bind-html="checklist"></p>'
                        },
                        {
                            command: [
                                {
                                    name: "Edit",
                                    text: "Preview",
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
                                }
                            ],
                            title: "",
                            width: "30%",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }
                    ]
                };

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
                })
            }
            init();

            function previewSurat(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.showFormat = dataItem.isi;
                $scope.popupPreview.center().open();
            }

            function distribusiSurat(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.noreSurat = dataItem.norec;
                $scope.popupDistribusi.center().open();
            }

            function hapusPenerima(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.dataSourceListPenerima.remove(dataItem);
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

                for(let i = 0; i < dataGrid.length; i++) {
                    dataTemp.push({
                        // "norec": $scope.noreSurat,
                        // "pegawaifk": dataUser.idPegawai.toString(),
                        // "ruanganpengirimfk": dataUser.ruanganId.toString(),
                        // "pegawaiterimafk": dataGrid[i].idPenerima.toString(),
                        // "ruanganpenerimafk": "111",
                        // "ruanganpenerimafk": dataGrid[i].idRuangan,
                        "norec": "ddc88820-c32e-11e9-bef4-89ffccef",
                        "pegawaifk": "88",
                        "ruanganpengirimfk": "1",
                        "ruanganpenerimafk": "111",
                        "pegawaiterimafk": "1"
                    });
                }
                
                let data = [
                    {
                        "distribusi": dataTemp
                    }]
                
                ManageSarpras.saveTransaksi('humas/save-distribusi-surat', data).then(res => {
                    console.log(res);
                })
            }

        }
    ])
})