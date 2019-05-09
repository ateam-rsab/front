define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengukuranPemeriksaanSwabChecklistCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', '$mdDialog', 'CetakHelper', 'ManageKKKL', 'DateHelper',
        function ($rootScope, $scope, ModelItem, ManageSarpras, $mdDialog, cetakHelper, ManageKKKL, DateHelper) {
            $scope.item = {};
            $scope.ketKebisingan = '';
            $scope.isRouteLoading = false;
            $scope.dataVOloaded = true;
            $scope.tab = 1;
            var tabPage;
            $scope.item.tglPeriodeAwal = new Date();
            $scope.item.tglPeriodeAkhir = new Date();

            // global function for all tab
            // untuk membersihkan list file upload
            var clearFiles = function () {
                $(".k-upload-files.k-reset").find("li").remove();
            }
            $scope.refresh = function () {
                $scope.item = {};
                $scope.item.tglPengukuran = new Date();
                $scope.item.tglPemantauan = new Date();
                $scope.item.tglSwab = new Date();
                $scope.item.tglChecklist = new Date();
                $scope.item.tglPencahayaan = new Date();
                clearFiles();
            };
            $scope.onTabChanges = function (value) {
                if (value == 1) {
                    $scope.titleForm = 'Pengukurang Kebisingan';
                    tabPage = value;
                    $scope.isRouteLoading = true;
                    formPengukuranKebisingan();
                } else if (value == 2) {
                    $scope.ketAngkaKuman = '';
                    $scope.titleForm = 'Pemeriksaan Angka Kuman Udara';
                    tabPage = value;
                    $scope.isRouteLoading = true;
                    formPemeriksaanAngkaKuman();
                } else if (value == 3) {
                    $scope.titleForm = 'Swab Alat / Permukaan'
                    tabPage = value;
                    $scope.isRouteLoading = true;
                    formSwabAlat();
                } else if (value == 4) {
                    $scope.titleForm = 'Monitoring Evaluasi Pengolahan Limbah';
                    tabPage = value;
                    $scope.isRouteLoading = true;
                    formChecklistSanitasi();
                } else if (value == 5) {
                    $scope.titleForm = 'Pengukuran Pencahayaan';
                    $scope.keteranganPencahayaan = '';
                    $scope.item.hasilPencahayaan = '';
                    $scope.item.bakuMutuPencahayaan = '';
                    tabPage = value;
                    $scope.isRouteLoading = true;
                    formPengukuranCahaya();
                } else if (value == 6) {
                    $scope.titleForm = 'Pengukuran Suhu';
                    tabPage = value;
                    $scope.item.hasilSuhu = '';
                    $scope.item.bakuMutuSuhu = '';
                    $scope.keteranganSuhu = '';
                    $scope.isRouteLoading = true;
                    formPengukuranSuhu();
                } else if (value == 7) {
                    $scope.titleForm = 'Pengukuran Kelembapan';
                    tabPage = value;
                    $scope.isRouteLoading = true;
                    formPengukuranKelembapan();
                    $scope.item.hasilKelembapan = '';
                    $scope.item.bakuMutuKelembapan = '';
                    $scope.keteranganKelembapan = ''
                }
                console.log('tab' + value);
            }
            var hasil, bakuMutu;
            $scope.countKeterangan = function (value) {
                var messageMemenuhi = 'Memenuhi syarat';
                var messageTidakMemenuhi = 'Tidak memenuhi syarat';

                var defaultMessage = ''
                $scope.item.keteranganKebisingan = ''
                if (value == 1) {
                    bakuMutu = parseInt($scope.item.bakuMutuPengKebisingan);
                    hasil = parseInt($scope.item.hasilPengukuran);

                    if (bakuMutu == defaultMessage || hasil == defaultMessage) {
                        $scope.item.keteranganKebisingan = defaultMessage;
                    } else if (bakuMutu <= hasil) {
                        $scope.item.keteranganKebisingan = messageTidakMemenuhi;
                    } else if (bakuMutu > hasil) {
                        $scope.item.keteranganKebisingan = messageMemenuhi;
                    }
                } else if (value == 2) {
                    hasil = $scope.item.hasilPengukuranAngkaKuman;
                    bakuMutu = $scope.item.bakuMutuPemAngkaKuman;

                    if (bakuMutu == defaultMessage || hasil == defaultMessage) {
                        $scope.ketAngkaKuman = defaultMessage;
                    } else if (bakuMutu <= hasil) {
                        $scope.ketAngkaKuman = messageTidakMemenuhi;
                    } else if (bakuMutu > hasil) {
                        $scope.ketAngkaKuman = messageMemenuhi;
                    }
                } else if (value == 3) {
                    hasil = $scope.item.hasilPencahayaan;
                    bakuMutu = $scope.item.bakuMutuPencahayaan;

                    if (hasil == defaultMessage || bakuMutu == defaultMessage) {
                        $scope.keteranganPencahayaan = defaultMessage;
                    } else if (bakuMutu <= hasil) {
                        $scope.keteranganPencahayaan = messageTidakMemenuhi
                    } else if (bakuMutu > hasil) {
                        $scope.keteranganPencahayaan = messageMemenuhi
                    }
                } else if (value == 4) {
                    hasil = $scope.item.hasilSuhu;
                    bakuMutu = $scope.item.bakuMutuSuhu;

                    if (hasil == defaultMessage || bakuMutu == defaultMessage) {
                        $scope.keteranganSuhu = defaultMessage;
                    } else if (bakuMutu <= hasil) {
                        $scope.keteranganSuhu = messageTidakMemenuhi
                    } else if (bakuMutu > hasil) {
                        $scope.keteranganSuhu = messageMemenuhi
                    }
                } else if (value == 5) {
                    hasil = parseInt($scope.item.hasilKelembapan);
                    bakuMutu = parseInt($scope.item.bakuMutuKelembapan);

                    if (hasil == defaultMessage || bakuMutu == defaultMessage) {
                        $scope.keteranganKelembapan = defaultMessage;
                    } else if (bakuMutu <= hasil) {
                        $scope.keteranganKelembapan = messageTidakMemenuhi
                    } else if (bakuMutu > hasil) {
                        $scope.keteranganKelembapan = messageMemenuhi
                    }
                }
            }


            $scope.showDialogKebisingan = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'input-periode.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    // openTo:,
                    // closeTo:,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (answer) {
                        console.log(answer);
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
            }
            function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cetak = function () {
                    // debugger
                    var bulanAwal,
                        bulanAkhir,
                        hariAwal,
                        hariAkhir,
                        tahunAwal,
                        tahunAkhir,
                        url,
                        urlLaporan
                    var awal = new Date($scope.item.tglPeriodeAwal);
                    var akhir = new Date($scope.item.tglPeriodeAkhir);

                    bulanAwal = (awal.getMonth() + 1);
                    if (bulanAwal < 10) {
                        bulanAwal = '0' + (awal.getMonth() + 1)
                    }
                    bulanAkhir = (akhir.getMonth() + 1);
                    if (bulanAkhir < 10) {
                        bulanAkhir = '0' + (akhir.getMonth() + 1)
                    }

                    hariAwal = awal.getDate();
                    if (hariAwal < 10) {
                        hariAwal = '0' + awal.getDate();
                    }
                    hariAkhir = akhir.getDate();
                    if (hariAkhir < 10) {
                        hariAkhir = '0' + akhir.getDate();
                    }
                    tahunAkhir = akhir.getFullYear();
                    tahunAwal = awal.getFullYear();

                    var startDate = tahunAwal + '-' + bulanAwal + '-' + hariAwal;
                    var endDate = tahunAkhir + '-' + bulanAkhir + '-' + hariAkhir;
                    if (tabPage == 1) {
                        url = 'pengukuran-kebisingan/lapPengukuranKebisingan?startDate=' + startDate + '&endDate=' + endDate;
                    } else if (tabPage == 2) {
                        url = 'pemeriksaan-angka-kuman-udara/lapPemeriksaanAngkaKumanUdara?startDate=' + startDate + '&endDate=' + endDate;
                    } else if (tabPage == 5) {
                        url = 'pengukuran-pencahayaan/lapPengukuranPencahayaan?startDate=' + startDate + '&endDate=' + endDate;
                    } else if (tabPage == 6) {
                        url = 'pengukuran-suhu/lapPengukuranSuhu?startDate=' + startDate + '&endDate=' + endDate;
                    } else if (tabPage == 7) {
                        url = 'pengukuran-kelembaban/lapPengukuranKelembaban?startDate=' + startDate + '&endDate=' + endDate;
                    }
                    urlLaporan = cetakHelper.openURLReporting(url);
                    window.open(urlLaporan, '', 'width:600, height: 500');
                }

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }
            function showAlertDialog(data) {
                var confirm = $mdDialog.confirm()
                    .title('Peringatan!')
                    .ariaLabel('Lucky day')
                    .textContent('Apakah anda yakin akan menghapus data ini?')
                    .ok('Ya')
                    .cancel('Tidak')

                $mdDialog.show(confirm).then(function (e) {
                    $scope.savePengukuranKebisingan(e.model)
                });
            }

            // tab 1 Pengukuran Kebisingan
            var formPengukuranKebisingan = function () {
                $scope.ketKebisingan = '';
                $scope.item = {};
                $scope.item.tglPengukuran = new Date();
                $scope.isRouteLoading = true;

                $scope.columnPengukuran = [
                    {
                        "field": "tanggal",
                        "title": "<h3 align='center'>Tanggal</h3>",
                        "width": "150px",
                        "template": '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
                    },
                    {
                        "field": "reportDisplay",
                        "title": "<h3 align='center'>Ruangan / Unit</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "nilaiBakuMutu",
                        "title": "<h3 align='center'>Nilai Baku Mutu</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "hasilPengukuran",
                        "title": "<h3 align='center'>Hasil Pengukuran</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "keterangan",
                        "title": "<h3 align='center'>Keterangan</h3>",
                        "width": "150px"
                    }
                ];
                $scope.listGridPengukuran = new kendo.data.DataSource({
                    pageSize: 10,
                    data: [],
                    schema: {
                        model: {
                            id: "pengukuranKebisinganId",
                            fields: {
                                tanggal: { editable: false, nullable: false, validation: { required: true } },
                                namaRuangan: { editable: false, nullable: false, validation: { required: true } },
                                namaBakuMutu: { editable: false, nullable: false, validation: { required: true } },
                                hasilPengukuran: { type: "number", editable: false, nullable: false, validation: { required: true } },
                                keterangan: { nullable: false }
                            }
                        }
                    },
                    editable: false
                });
                ManageKKKL.getOrderList("pengukuran-kebisingan/get-pengukuran-kebisingan").then(function (dat) {
                    $scope.isRouteLoading = true;
                    dat.data.data.pengukuranKebisingan.forEach(function (datas) {
                        datas.tanggal = new Date(datas.tanggal);
                        $scope.listGridPengukuran.add(datas);
                    });
                    $scope.isRouteLoading = false;
                });
                $scope.optionsGridPengukuran = {
                    dataSource: $scope.listGridPengukuran,
                    pageable: true,
                    editable: {
                        mode: "inline",
                        // template: kendo.template($("#popup-editor").html())
                    },
                    columns: $scope.columnPengukuran
                };
            }
            $scope.editDataKebisingan = function (data) {
                $scope.item.tglPengukuran = data.tanggal;
                $scope.item.namaRuanganKebisingan = data.reportDisplay;
                $scope.item.bakuMutuPengKebisingan = data.nilaiBakuMutu;
                $scope.item.keteranganKebisingan = data.keterangan;
                $scope.item.hasilPengukuran = data.hasilPengukuran;
                $scope.item.idKebisingan = data.id;
                console.log(data);
            }
            $scope.savePengukuranKebisingan = function (data) {
                var dataPost = []
                if ($scope.item.namaRuanganKebisingan == undefined && $scope.item.bakuMutuPengKebisingan == undefined) {
                    toastr.warning('Nama Ruangan dan Baku Mutu tidak boleh kosong');
                } else if ($scope.item.namaRuanganKebisingan == undefined) {
                    toastr.warning('Nama Ruangan tidak boleh kosong');
                } else if ($scope.item.bakuMutuPengKebisingan == undefined) {
                    toastr.warning('Baku Mutu tidak boleh kosong');
                } else {
                    console.log(data);
                    console.log($scope.item.idKebisingan);
                    if ($scope.item.idKebisingan != undefined) {
                        dataPost = {
                            "id": $scope.item.idKebisingan,
                            "statusEnabled": 'true',
                            "tanggal": $scope.item.tglPengukuran,
                            "reportDisplay": $scope.item.namaRuanganKebisingan,
                            "nilaiBakuMutu": $scope.item.bakuMutuPengKebisingan,
                            "hasilPengukuran": $scope.item.hasilPengukuran,
                            "keterangan": $scope.item.keteranganKebisingan
                        };
                    } else {
                        dataPost = {
                            "statusEnabled": 'true',
                            "tanggal": $scope.item.tglPengukuran,
                            "reportDisplay": $scope.item.namaRuanganKebisingan,
                            "nilaiBakuMutu": $scope.item.bakuMutuPengKebisingan,
                            "hasilPengukuran": $scope.item.hasilPengukuran,
                            "keterangan": $scope.item.keteranganKebisingan
                        };
                    }
                    console.log(dataPost)
                    ManageKKKL.saveDataSarPras(ModelItem.beforePost(dataPost), "pengukuran-kebisingan/save-pengukuran-kebisingan").then(function (e) {
                        formPengukuranKebisingan();
                        $scope.ketKebisingan = '';
                        $scope.isRouteLoading = true;
                        $scope.refresh();
                    });
                }
            };

            $scope.hapusDataKebisingan = function (data) {
                if (data == null || data == undefined || data == "") {
                    toastr.warning('Anda Belum memilih data yang akan dihapus', 'Perhatian')
                } else {
                    if (confirm("Hapus Data?") === true) {
                        ManageKKKL.getOrderList("pemantauan-kinerja-kesling/delete-pemantauan-kinerja?id=" + data.id).then(function (dat) {
                            toastr.success('Data telah dihapus', 'Sukses');
                            data.statusEnabled = false;
                            // $scope.isRouteLoading = true;
                            formPengukuranKebisingan();
                            $scope.refresh();
                        });
                    } else {
                        console.log("You pressed Cancel!");
                    }
                }
            }

            // tab 2 Pemeriksaan Kuman Udara
            var formPemeriksaanAngkaKuman = function () {
                $scope.item = {};
                $scope.item.tglPemantauan = new Date();
                $scope.item.volume = ''
                $scope.item.hasilPengukuran = ''
                $scope.$watch('selectedDataPemeriksaanKuman', function (selectedDataPemeriksaanKuman) {
                    $scope.id = selectedDataPemeriksaanKuman.id;
                    $scope.item.volume = selectedDataPemeriksaanKuman.volume;
                    $scope.item.tglPemantauan = selectedDataPemeriksaanKuman.tanggal;
                    $scope.item.hasilPengukuran = selectedDataPemeriksaanKuman.hasilPengukuran;
                    $scope.item.bakuMutu = {
                        "bakuMutuId": selectedDataPemeriksaanKuman.idBakuMutu,
                        "namaBakuMutu": selectedDataPemeriksaanKuman.namaBakuMutu
                    };
                    $scope.item.ruangan = {
                        "ruanganId": selectedDataPemeriksaanKuman.ruanganId,
                        "namaRuangan": selectedDataPemeriksaanKuman.namaRuangan
                    }
                });

                $scope.columnPemantauan = [
                    {
                        "field": "tanggal",
                        "title": "<h3 align='center'>Tanggal</h3>",
                        "width": "150px",
                        "template": '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
                    },
                    {
                        "field": "reportDisplay",
                        "title": "<h3 align='center'>Ruangan / Unit</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "volume",
                        "title": "<h3 align='center'>Volume</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "nilaiBakuMutu",
                        "title": "<h3 align='center'>Nilai Baku Mutu</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "hasilPengukuran",
                        "title": "<h3 align='center'>Hasil Pengukuran</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "keterangan",
                        "title": "<h3 align='center'>Keterangan</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "fileName",
                        "title": "<h3 align='center'>File Hasil Pemantauan</h3>",
                        "width": "150px"
                    }
                ];

                $scope.optionsGridPemantauan = {
                    dataSource: $scope.listGridPemantauan,
                    pageable: true,
                    editable: {
                        mode: "inline",
                        // template: kendo.template($("#popup-editor").html())
                    },
                    columns: $scope.columnPemantauan
                };
                ManageKKKL.getOrderList("pemeriksaan-angka-kuman-udara/get-pemeriksaan-angka-kuman-udara").then(function (dat) {
                    $scope.listGridPemantauan = new kendo.data.DataSource({
                        data: [],
                        pageSize: 5,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    tanggal: { editable: false, nullable: false, validation: { required: true } },
                                    reportDisplay: { editable: false, nullable: false, validation: { required: true } },
                                    volume: { editable: false, nullable: false, validation: { required: true } },
                                    nilaiBakuMutu: { editable: false, nullable: false, validation: { required: true } },
                                    fileName: { editable: false, nullable: false, validation: { required: true } },
                                    hasilPengukuran: { editable: false, nullable: false, validation: { required: true } },
                                    keterangan: { editable: false }
                                }
                            }
                        },
                        editable: false
                    });
                    dat.data.data.listtPemeriksaanAngkaKumanUdara.forEach(function (datas) {
                        datas.tanggal = new Date(datas.tanggal);
                        $scope.listGridPemantauan.add(datas);
                    });
                });

            }

            var files;
            $scope.onSelectFile = function (e) {
                files = e.files
            }

            $scope.editPemeriksaanKumanUdara = function (data) {
                $scope.item.tglPemantauan = data.tanggal;
                $scope.item.ruanganPemAngkaKuman = data.reportDisplay;
                $scope.item.volume = data.volume;
                $scope.item.bakuMutuPemAngkaKuman = data.nilaiBakuMutu;
                $scope.item.hasilPengukuranAngkaKuman = data.hasilPengukuran;
                $scope.ketAngkaKuman = data.keterangan;
                $scope.item.idKumanUdara = data.id;
            }

            $scope.downloadFileKumanUdara = function (selectedDataPemeriksaanKuman) {
                if (selectedDataPemeriksaanKuman == undefined) {
                    toastr.warning('Harap Pilih Data yang akan di download')
                } else {
                    ManageKKKL.downloadFile('pemeriksaan-angka-kuman-udara/download-file-hasil-pemantauan?id=' + selectedDataPemeriksaanKuman.id);
                }
            }

            $scope.savePemeriksaanAngkaKuman = function () {
                var dataSave = [];
                var f = files;
                // if ($scope.item.idKumanUdara == undefined) {
                var fr = new FileReader();
                if (FileReader && f && f.length) {
                    fr.readAsDataURL(f[0].rawFile);
                    fr.onload = function () {
                        var imageData = fr.result
                        var tempArray = imageData.split(",");

                        if ($scope.item.idKumanUdara == undefined) {
                            dataSave = {
                                "volume": $scope.item.volume,
                                "uploadDokumen": tempArray[1],
                                "tanggal": $scope.item.tglPemantauan,
                                "hasilPengukuran": $scope.item.hasilPengukuranAngkaKuman,
                                "nilaiBakuMutu": $scope.item.bakuMutuPemAngkaKuman,
                                "keterangan": $scope.ketAngkaKuman,
                                "statusEnabled": "true",
                                "reportDisplay": $scope.item.ruanganPemAngkaKuman,

                                "fileName": f[0].name,
                            }
                        } else if ($scope.item.idKumanUdara != undefined) {
                            dataSave = {
                                "id": $scope.item.idKumanUdara,
                                "volume": $scope.item.volume,
                                "uploadDokumen": tempArray[1],
                                "tanggal": $scope.item.tglPemantauan,
                                "hasilPengukuran": $scope.item.hasilPengukuranAngkaKuman,
                                "nilaiBakuMutu": $scope.item.bakuMutuPemAngkaKuman,
                                "keterangan": $scope.ketAngkaKuman,
                                "statusEnabled": "true",
                                "reportDisplay": $scope.item.ruanganPemAngkaKuman,
                                "fileName": f[0].name,
                            }
                        }
                    }
                    console.log(JSON.stringify(dataSave));
                    ManageKKKL.saveDataSarPras(ModelItem.beforePost(dataSave), "pemeriksaan-angka-kuman-udara/save-pemeriksaan-angka-kuman-udara").then(function (e) {
                        $scope.isRouteLoading = true;
                        console.log(JSON.stringify(dataSave));
                        formPemeriksaanAngkaKuman();
                        $(".k-upload-files > li").remove();
                        $scope.refresh();
                        $scope.item.idKumanUdara = undefined;
                        files = '';
                    });
                };
            }

            $scope.hapusDataPemeriksaanAngkaKuman = function (data) {
                var x;
                if (data == null || data == undefined || data == "") {
                    toastr.warning('Anda Belum memilih data yang akan dihapus', 'Perhatian')
                } else {
                    if (confirm("Apakah anda yakin akan menghapus data ini?") == true) {
                        ManageKKKL.getOrderList("pemeriksaan-angka-kuman-udara/delete-pemeriksaan-angka-kuman-udara?id=" + data.id).then(function (dat) {
                            toastr.success('Periode: ' + DateHelper.getPeriodeFormatted(data.tanggal) + '<br>Ruangan: ' + data.reportDisplay + '<br> Telah Dihapus', 'Sukses');
                            $scope.isRouteLoading = true;
                            formPemeriksaanAngkaKuman();
                            $scope.refresh();
                        })
                    } else {
                        x = "You pressed Cancel!";
                    }
                }
            }

            // tab 3 Swab Alat
            var formSwabAlat = function () {
                $scope.item = {};
                $scope.item.tglSwab = new Date();
                $scope.columnPengukuranSwab = [
                    {
                        "field": "tanggal",
                        "title": "<h3 align='center'>Tanggal</h3>",
                        "width": "150px",
                        "template": '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
                    },
                    {
                        "field": "reportDisplay",
                        "title": "<h3 align='center'>Ruangan / Unit</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "jenisAlat",
                        "title": "<h3 align='center'>Jenis Alat / Permukaan</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "fileName",
                        "title": "<h3 align='center'>File Hasil Pemantauan</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "hasilPemeriksaan",
                        "title": "<h3 align='center'>Hasil Pemeriksaan</h3>",
                        "width": "150px"
                    }
                ];
                $scope.optionsGridPengukuran = {
                    dataSource: $scope.listGridPengukuran,
                    pageable: true,
                    editable: {
                        mode: "inline",
                    },
                    columns: $scope.columnPengukuranSwab
                };
                ManageKKKL.getOrderList("swab-alat-permukaan/get-swab-alat-permukaan").then(function (dat) {
                    $scope.listGridSwab = new kendo.data.DataSource({
                        data: [],
                        pageSize: 5,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    tanggal: { editable: false, nullable: false, validation: { required: true } },
                                    reportDisplay: { editable: false, nullable: false, validation: { required: true } },
                                    jenisAlat: { editable: false, nullable: false, validation: { required: true } },
                                    hasilPemeriksaan: { type: "number", editable: false, nullable: false, validation: { required: true } },
                                    fileName: { editable: false, nullable: false, validation: { required: true } },
                                }
                            }
                        },
                        editable: false
                    });

                    dat.data.data.swabAlatPermukaan.forEach(function (datas) {
                        datas.tanggal = new Date(datas.tanggal);
                        $scope.listGridSwab.add(datas);
                    });
                });
            }
            // var files;
            $scope.saveSwab = function () {
                var f = files;
                var fr = new FileReader();
                if (FileReader && f && f.length) {
                    fr.readAsDataURL(f[0].rawFile);
                    fr.onload = function () {
                        var imgData = fr.result;
                        var tempArray = imgData.split(",");
                        var dataSave = {
                            "jenisAlat": $scope.item.jenisAlat,
                            "uploadDokumen": tempArray[1],
                            "fileName": f[0].name,
                            "tanggal": $scope.item.tglSwab,
                            "hasilPemeriksaan": $scope.item.hasilPemeriksaan,
                            "statusEnabled": "true",
                            "reportDisplay": $scope.item.ruanganSwab
                        }
                        // var dataPost = {
                        //     "jenisAlat": $scope.item.jenisAlat,
                        //     "tanggal": $scope.item.tglSwab,
                        //     "hasilPemeriksaan": $scope.item.hasilPemeriksaan,
                        //     "namaRuangan": {
                        //         "id": $scope.item.ruanganSwab.ruanganId
                        //     }
                        // };
                        console.log(dataSave);
                        ManageKKKL.saveDataSarPras(ModelItem.beforePost(dataSave), "swab-alat-permukaan/save-swab-alat-permukaan").then(function (e) {
                            $scope.isRouteLoading = true;
                            formSwabAlat();
                            $scope.refresh();
                            clearFiles();
                        });
                    }
                }

            };

            $scope.hapusDataSwab = function (data = []) {
                if (data == null || data == undefined || data == "") {
                    toastr.warning('Anda Belum memilih data yang akan dihapus', 'Perhatian')
                } else {
                    if (confirm("Apakah anda yakin akan menghapus data ini?") == true) {
                        ManageKKKL.getOrderList("swab-alat-permukaan/delete-swab-alat-permukaan?id=" + data.id).then(function (dat) {
                            $scope.isRouteLoading = true;
                            toastr.success('Data berhasil dihapus', 'Sukses');
                            formSwabAlat();
                            // data.id = ''
                        });
                    } else {
                        x = "You pressed Cancel!";
                    }
                }

                data = [];
            }

            $scope.downloadFileSwabAlat = function (selectedSwabAlat) {
                if (selectedSwabAlat == undefined) {
                    toastr.warning('Anda Belum Memilih File Untuk Didownload')
                } else {
                    console.log(selectedSwabAlat);
                    toastr.warning('Fitur Belum Tersedia')
                }
            }

            // tab 4 Checklist Sanitasi
            var formChecklistSanitasi = function () {
                console.log('tab 4');
                ModelItem.get("AplikasiK3/CheckListMFK").then(function (data) {
                    $scope.item = data;
                    // $scope.now = new Date();
                    $scope.item.tglChecklist = new Date();
                    $scope.dataVOloaded = true;
                    $scope.tab = 1;

                    $scope.kondisiRuangOptions = {
                        dataSource: $scope.kondisiRuangData,
                        editable: {
                            mode: "inline",
                            confirmation: true
                        },
                        pageable: false,
                        columns: [
                            {
                                "field": "sanitasiDetail",
                                "title": "<center>Kondisi Ruang dan Bangunan</center>",
                                "width": "200px"
                            },
                            {
                                "title": "<center>Ya</center>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
                                "width": "75px"
                            },
                            {
                                "title": "<center>Tidak</center>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
                                "width": "75px"
                            },
                            {
                                "field": "keterangan",
                                "title": "<center>Keterangan</center>",
                                "width": "150px"
                            }
                        ]
                    };

                    $scope.kondisiToiletOptions = {
                        dataSource: $scope.kondisiToiletData,
                        pageable: false,
                        columns: [
                            {
                                "field": "sanitasiDetail",
                                "title": "<center>Kondisi Toilet / Kamar Mandi</center>",
                                "width": "200px"
                            },
                            {
                                "title": "<center>Ya</center>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
                                "width": "75px"
                            },
                            {
                                "title": "<center>Tidak</center>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
                                "width": "75px"
                            },
                            {
                                "field": "keterangan",
                                "title": "<center>Keterangan</center>",
                                "width": "150px"
                            }
                        ]
                    };

                    $scope.limbahMedisOptions = {
                        dataSource: $scope.limbahMedisData,
                        pageable: false,
                        columns: [
                            {
                                "field": "sanitasiDetail",
                                "title": "<center>Limbah Medis / Non Medis</center>",
                                "width": "200px"
                            },
                            {
                                "title": "<center>Ya</center>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
                                "width": "75px"
                            },
                            {
                                "title": "<center>Tidak</center>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
                                "width": "75px"
                            },
                            {
                                "field": "keterangan",
                                "title": "<center>Keterangan</center>",
                                "width": "150px"
                            }
                        ]
                    };

                    $scope.kualitasUdaraOptions = {
                        dataSource: $scope.kualitasUdaraData,
                        pageable: false,
                        columns: [
                            {
                                "field": "sanitasiDetail",
                                "title": "<center>Kualitas Udara dan Pencahayaan Ruangan</center>",
                                "width": "40%"
                            },
                            {
                                "field": "hasilPengukuran",
                                "title": "<center>Hasil Pengukuran</center>",
                                "width": "30%"
                            },
                            {
                                "field": "keterangan",
                                "title": "<center>Keterangan</center>",
                                "width": "30%"
                            }
                        ]
                    };
                    $scope.arrSurvei = [];
                    $scope.klik = function (data, value) {
                        $scope.kondisiRuangData._data.forEach(function (datas) {
                            if (datas.id == data.id) {
                                datas.statusYaTidak = {
                                    "id": parseInt(value)
                                }
                            }
                        })
                        $scope.kondisiToiletData._data.forEach(function (datas) {
                            if (datas.id == data.id) {
                                datas.statusYaTidak = {
                                    "id": parseInt(value)
                                }
                            }
                        })
                        $scope.limbahMedisData._data.forEach(function (datas) {
                            if (datas.id == data.id) {
                                datas.statusYaTidak = {
                                    "id": parseInt(value)
                                }
                            }
                        })
                    }

                    //tidak 1 ya 2
                    ManageKKKL.getOrderList("sanitasi-kesehatan-lingkungan/get-user-login").then(function (dat) {
                        $scope.item.petugas = dat.data.data;
                    });

                    $scope.$watch('item.ruanganSanitasi', function (selectedData) {
                        $scope.item.pjRuangan = "";
                        ManageKKKL.getOrderList("sanitasi-kesehatan-lingkungan/get-petugas-ruangan?ruanganId=" + selectedData.ruanganId).then(function (dat) {
                            $scope.listPjRuangan = dat.data.data.listData;
                        })

                    });
                    init();

                }, function errorCallBack(err) { });
            }

            var init = function () {
                ManageKKKL.getOrderList("sanitasi-kesehatan-lingkungan/get-parameter-sanitasi").then(function (dat) {
                    $scope.kondisiRuangData = new kendo.data.DataSource({
                        data: [],
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
                                    jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
                                    keterangan: { editable: true, nullable: true, validation: { required: false } },

                                }
                            }
                        },
                        editable: true
                    });

                    $scope.kondisiToiletData = new kendo.data.DataSource({
                        data: [],
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
                                    jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
                                    keterangan: { editable: true, nullable: true, validation: { required: false } },

                                }
                            }
                        },
                        editable: true
                    });

                    $scope.limbahMedisData = new kendo.data.DataSource({
                        data: [],
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
                                    jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
                                    keterangan: { editable: true, nullable: true, validation: { required: false } },

                                }
                            }
                        },
                        editable: true
                    });

                    $scope.kualitasUdaraData = new kendo.data.DataSource({
                        data: [],
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
                                    hasilPengukuran: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
                                    keterangan: { editable: true, nullable: true, validation: { required: false } },

                                }
                            }
                        },
                        editable: true
                    });


                    dat.data.data.listData.forEach(function (datas) {
                        if (datas.checkSanitasiId == 1) {
                            $scope.kondisiRuangData.add(datas);
                        }
                        if (datas.checkSanitasiId == 2) {
                            $scope.kondisiToiletData.add(datas);
                        }
                        if (datas.checkSanitasiId == 3) {
                            $scope.limbahMedisData.add(datas);
                        }
                        if (datas.checkSanitasiId == 40) {
                            $scope.kualitasUdaraData.add(datas);
                        }
                    });

                });



            }

            // tab 5 Pengukuran Cahaya
            var formPengukuranCahaya = function () {
                $scope.item.tglPencahayaan = new Date();

                ManageKKKL.getOrderList("pengukuran-pencahayaan/get-pengukuran-pencahayaan").then(function (dat) {
                    // debugger
                    $scope.isRouteLoading = true;
                    // console.log(dat)
                    dat.data.data.pengukuranPencahayaan.forEach(function (datas) {
                        datas.tanggal = new Date(datas.tanggal);
                        $scope.listGridPengukuranPencahayaan.add(datas);
                    });
                    $scope.isRouteLoading = false;
                });

                $scope.listGridPengukuranPencahayaan = new kendo.data.DataSource({
                    pageSize: 10,
                    data: [],
                    schema: {
                        model: {
                            id: "pengukuranPencahayaanId",
                            fields: {
                                tanggal: { editable: false, nullable: false, validation: { required: true } },
                                namaRuangan: { editable: false, nullable: false, validation: { required: true } },
                                namaBakuMutu: { editable: false, nullable: false, validation: { required: true } },
                                hasilPengukuran: { type: "number", editable: false, nullable: false, validation: { required: true } },
                                keterangan: { nullable: false }
                            }
                        }
                    },
                    editable: false
                });

                $scope.optionsGridPengukuranPencahayaan = {
                    dataSource: $scope.listGridPengukuranPencahayaan,
                    pageable: true,
                    editable: {
                        mode: "inline",
                    },
                    columns: $scope.columnPengukuranPencahayaan
                };

                $scope.columnPengukuranPencahayaan = [
                    {
                        "field": "tanggal",
                        "title": "<h3 align='center'>Tanggal</h3>",
                        "width": "150px",
                        "template": '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
                    },
                    {
                        "field": "reportDisplay",
                        "title": "<h3 align='center'>Ruangan / Unit</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "nilaiBakuMutu",
                        "title": "<h3 align='center'>Nilai Baku Mutu</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "hasilPengukuran",
                        "title": "<h3 align='center'>Hasil Pengukuran</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "keterangan",
                        "title": "<h3 align='center'>Keterangan</h3>",
                        "width": "150px"
                    }
                ];

                $scope.savePengukuranPencahayaan = function () {
                    var dataPost = [];
                    if ($scope.item.namaRuanganPencahayaan == undefined && $scope.item.bakuMutuPencahayaan == undefined) {
                        toastr.warning('Nama Ruangan dan Baku Mutu tidak boleh kosong');
                    } else if ($scope.item.namaRuanganPencahayaan == undefined) {
                        toastr.warning('Nama Ruangan tidak boleh kosong');
                    } else if ($scope.item.bakuMutuPencahayaan == undefined) {
                        toastr.warning('Baku Mutu tidak boleh kosong');
                    } else {
                        if ($scope.item.idPencahayaan != undefined) {
                            dataPost = {
                                "id": $scope.item.idPencahayaan,
                                "tanggal": $scope.item.tglPencahayaan,
                                "hasilPengukuran": $scope.item.hasilPencahayaan,
                                "nilaiBakuMutu": $scope.item.bakuMutuPencahayaan,
                                "keterangan": $scope.keteranganPencahayaan,
                                "reportDisplay": $scope.item.namaRuanganPencahayaan
                            };
                        } else {
                            dataPost = {
                                "tanggal": $scope.item.tglPencahayaan,
                                "hasilPengukuran": $scope.item.hasilPencahayaan,
                                "nilaiBakuMutu": $scope.item.bakuMutuPencahayaan,
                                "keterangan": $scope.keteranganPencahayaan,
                                "reportDisplay": $scope.item.namaRuanganPencahayaan
                            };
                        }
                        ManageKKKL.saveDataSarPras(ModelItem.beforePost(dataPost), "pengukuran-pencahayaan/save-pengukuran-pencahayaan").then(function (e) {
                            $scope.isRouteLoading = true;
                            $scope.item = {}
                            $scope.item.tanggal = Date.now();
                            $scope.item.idPencahayaan = undefined;
                            $scope.keteranganPencahayaan = '';
                            formPengukuranCahaya();
                        });
                    }
                }
                $scope.hapusDataPencahayaan = function (data) {
                    var date = new Date(data.tanggal);
                    var bulan = date.getMonth();
                    var hari = date.getDate();
                    var tahun = date.getFullYear();
                    var tgl = hari + ' - ' + bulan + ' - ' + tahun;
                    if (data == undefined) {
                        toastr.warning('Pilih Salah Satu Data', 'Gagal Menghapus')
                    } else {
                        if (confirm('Apakah anda yakin akan menghapus data ini') == true) {
                            ManageKKKL.getOrderList("pengukuran-pencahayaan/delete-pengukuran-pencahayaan?id=" + data.pengukuranKebisinganId).then(function (dat) {
                                $scope.isRouteLoading = true;
                                toastr.success('Data dengan periode ' + tgl + ' / Ruangan : ' + data.reportDisplay + ' telah dihapus', 'Sukses');
                                formPengukuranCahaya();
                            });
                        }
                    }
                }

                $scope.editDataPencahayaan = function (data) {
                    $scope.item.namaRuanganPencahayaan = data.reportDisplay;
                    $scope.item.bakuMutuPencahayaan = data.nilaiBakuMutu;
                    $scope.item.hasilPencahayaan = data.hasilPengukuran;
                    $scope.keteranganPencahayaan = data.keterangan;
                    $scope.item.tglPencahayaan = data.tanggal;
                    $scope.item.idPencahayaan = data.pengukuranKebisinganId;
                    console.log(data);
                }
            }

            // tab 6 Pengukuran Suhu
            var formPengukuranSuhu = function () {
                $scope.item.tglSuhu = new Date();
                ManageKKKL.getOrderList("pengukuran-suhu/get-pengukuran-suhu").then(function (dat) {
                    $scope.isRouteLoading = true;
                    console.log(dat)
                    dat.data.data.pengukuranSuhu.forEach(function (datas) {
                        datas.tanggal = new Date(datas.tanggal);
                        $scope.listGridPengukuranSuhu.add(datas);
                    });
                    $scope.isRouteLoading = false;
                });

                $scope.listGridPengukuranSuhu = new kendo.data.DataSource({
                    pageSize: 10,
                    data: [],
                    schema: {
                        model: {
                            id: "pengukuranSuhuId",
                            fields: {
                                tanggal: { editable: false, nullable: false, validation: { required: true } },
                                namaRuangan: { editable: false, nullable: false, validation: { required: true } },
                                namaBakuMutu: { editable: false, nullable: false, validation: { required: true } },
                                hasilPengukuran: { type: "number", editable: false, nullable: false, validation: { required: true } },
                                keterangan: { nullable: false }
                            }
                        }
                    },
                    editable: false
                });

                $scope.optionsGridPengukuranSuhu = {
                    dataSource: $scope.listGridPengukuranPencahayaan,
                    pageable: true,
                    editable: {
                        mode: "inline",
                    },
                    columns: $scope.columnPengukuranSuhu
                };

                $scope.columnPengukuranSuhu = [
                    {
                        "field": "tanggal",
                        "title": "<h3 align='center'>Tanggal</h3>",
                        "width": "150px",
                        "template": '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
                    },
                    {
                        "field": "reportDisplay",
                        "title": "<h3 align='center'>Ruangan / Unit</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "nilaiBakuMutu",
                        "title": "<h3 align='center'>Nilai Baku Mutu</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "hasilPengukuran",
                        "title": "<h3 align='center'>Hasil Pengukuran</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "keterangan",
                        "title": "<h3 align='center'>Keterangan</h3>",
                        "width": "150px"
                    }
                ];

                $scope.savePengukuranSuhu = function () {
                    var dataPost = []
                    if ($scope.item.namaRuanganSuhu == undefined && $scope.item.bakuMutuSuhu == undefined) {
                        toastr.warning('Nama Ruangan dan Baku Mutu tidak boleh kosong');
                    } else if ($scope.item.namaRuanganSuhu == undefined) {
                        toastr.warning('Nama Ruangan tidak boleh kosong');
                    } else if ($scope.item.bakuMutuSuhu == undefined) {
                        toastr.warning('Baku Mutu tidak boleh kosong');
                    } else {
                        if ($scope.item.idSuhu != undefined) {
                            dataPost = {
                                "id": $scope.item.idSuhu,
                                "tanggal": $scope.item.tglSuhu,
                                "hasilPengukuran": $scope.item.hasilSuhu,
                                "nilaiBakuMutu": $scope.item.bakuMutuSuhu,
                                "keterangan": $scope.keteranganSuhu,
                                "reportDisplay": $scope.item.namaRuanganSuhu
                            };
                        } else {
                            dataPost = {
                                // "statusEnabled": data.statusEnabled == undefined ? true : data.statusEnabled,
                                "tanggal": $scope.item.tglSuhu,
                                "hasilPengukuran": $scope.item.hasilSuhu,
                                "nilaiBakuMutu": $scope.item.bakuMutuSuhu,
                                "keterangan": $scope.keteranganSuhu,
                                "reportDisplay": $scope.item.namaRuanganSuhu
                            };
                        }

                        ManageKKKL.saveDataSarPras(ModelItem.beforePost(dataPost), "pengukuran-suhu/save-pengukuran-suhu").then(function (e) {
                            console.log(e);
                            formPengukuranSuhu();
                            $scope.keteranganSuhu = '';
                            $scope.isRouteLoading = true;
                            $scope.refresh();
                        });
                    }
                }
                $scope.hapusDataSuhu = function (data) {
                    debugger
                    var date = new Date(data.tanggal);
                    var bulan = date.getMonth();
                    var hari = date.getDate();
                    var tahun = date.getFullYear();
                    var tgl = hari + ' - ' + bulan + ' - ' + tahun;
                    if (data == undefined) {
                        toastr.warning('Pilih Salah Satu Data', 'Gagal Menghapus')
                    } else {
                        if (confirm('Apakah anda yakin akan menghapus data ini?') == true) {
                            ManageKKKL.getOrderList("pengukuran-suhu/delete-pengukuran-suhu?id=" + data.pengukuranKebisinganId).then(function (dat) {
                                $scope.isRouteLoading = true;
                                toastr.success('Data dengan periode ' + tgl + ' / Ruangan : ' + data.reportDisplay + ' telah dihapus', 'Sukses');
                                formPengukuranSuhu();
                                $scope.refresh();
                            });
                        }
                    }
                }
                $scope.editDataSuhu = function (data) {
                    $scope.item.idSuhu = data.pengukuranKebisinganId;
                    $scope.item.tglSuhu = data.tanggal;
                    $scope.item.namaRuanganSuhu = data.reportDisplay;
                    $scope.item.bakuMutuSuhu = data.nilaiBakuMutu;
                    $scope.item.hasilSuhu = data.hasilPengukuran;
                    $scope.keteranganSuhu = data.keterangan;
                }
            }

            // tab 7 Pengukuran kelembapan
            var formPengukuranKelembapan = function () {
                $scope.item.tglKelembapan = new Date();

                ManageKKKL.getOrderList("pengukuran-kelembaban/get-pengukuran-kelembaban").then(function (dat) {

                    $scope.isRouteLoading = true;
                    console.log(dat)
                    dat.data.data.pengukuranKelembaban.forEach(function (datas) {
                        datas.tanggal = new Date(datas.tanggal);
                        $scope.listGridPengukuranKelembapan.add(datas);
                    });
                    $scope.isRouteLoading = false;
                });

                $scope.listGridPengukuranKelembapan = new kendo.data.DataSource({
                    pageSize: 10,
                    data: [],
                    schema: {
                        model: {
                            id: "pengukuranKelembabanId",
                            fields: {
                                tanggal: { editable: false, nullable: false, validation: { required: true } },
                                namaRuangan: { editable: false, nullable: false, validation: { required: true } },
                                namaBakuMutu: { editable: false, nullable: false, validation: { required: true } },
                                hasilPengukuran: { type: "number", editable: false, nullable: false, validation: { required: true } },
                                keterangan: { nullable: false }
                            }
                        }
                    },
                    editable: false
                });

                $scope.optionsGridPengukuranKelembapan = {
                    dataSource: $scope.listGridPengukuranKelembapan,
                    pageable: true,
                    editable: {
                        mode: "inline",
                        // template: kendo.template($("#popup-editor").html())
                    },
                    columns: $scope.columnPengukuranKelembapan
                };

                $scope.columnPengukuranKelembapan = [
                    {
                        "field": "tanggal",
                        "title": "<h3 aling='center'>Tanggal</h3>",
                        "width": "150px",
                        "template": '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
                    },
                    {
                        "field": "reportDisplay",
                        "title": "<h3 aling='center'>Ruangan / Unit</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "nilaiBakuMutu",
                        "title": "<h3 aling='center'>Nilai Baku Mutu</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "hasilPengukuran",
                        "title": "<h3 aling='center'>Hasil Pengukuran</h3>",
                        "width": "150px"
                    },
                    {
                        "field": "keterangan",
                        "title": "<h3 aling='center'>Keterangan</h3>",
                        "width": "150px"
                    }
                ];

                $scope.editDataKelembapan = function (data) {
                    $scope.item.idKelembapan = data.pengukuranKebisinganId;
                    $scope.item.tglKelembapan = data.tanggal;
                    $scope.item.namaRuanganKelembapan = data.reportDisplay;
                    $scope.item.bakuMutuKelembapan = data.nilaiBakuMutu;
                    $scope.item.hasilKelembapan = data.hasilPengukuran;
                    $scope.keteranganKelembapan = data.keterangan;
                }

                $scope.hapusDataKelembapan = function (data) {
                    debugger
                    var date = new Date(data.tanggal);
                    var bulan = date.getMonth();
                    var hari = date.getDate();
                    var tahun = date.getFullYear();
                    var tgl = hari + ' - ' + bulan + ' - ' + tahun;
                    if (data == undefined) {
                        toastr.warning('Pilih Salah Satu Data', 'Gagal Menghapus')
                    } else {
                        if (confirm('Apakah anda yakin akan menghapus data ini?') == true) {
                            ManageKKKL.getOrderList("pengukuran-kelembaban/delete-pengukuran-kelembaban?id=" + data.pengukuranKebisinganId).then(function (dat) {
                                $scope.isRouteLoading = true;
                                toastr.success('Data dengan periode ' + tgl + ' / Ruangan : ' + data.reportDisplay + ' telah dihapus', 'Sukses');
                                formPengukuranKelembapan();
                                $scope.refresh();
                            });
                        }
                    }
                }

                $scope.savePengukuranKelembapan = function () {
                    var dataPost = [];
                    if ($scope.item.idKelembapan != undefined) {
                        dataPost = {
                            "id": $scope.item.idKelembapan,
                            "tanggal": $scope.item.tglKelembapan,
                            "hasilPengukuran": $scope.item.hasilKelembapan,
                            "nilaiBakuMutu": $scope.item.bakuMutuKelembapan,
                            "keterangan": $scope.keteranganKelembapan,
                            "reportDisplay": $scope.item.namaRuanganKelembapan
                        }
                    } else {
                        dataPost = {
                            "tanggal": $scope.item.tglKelembapan,
                            "hasilPengukuran": $scope.item.hasilKelembapan,
                            "nilaiBakuMutu": $scope.item.bakuMutuKelembapan,
                            "keterangan": $scope.keteranganKelembapan,
                            "reportDisplay": $scope.item.namaRuanganKelembapan
                        }
                    }
                    console.log(dataPost);
                    ManageKKKL.saveDataSarPras(ModelItem.beforePost(dataPost), "pengukuran-kelembaban/save-pengukuran-kelembaban").then(function (e) {
                        ManageKKKL.getOrderList("pengukuran-kelembaban/get-pengukuran-kelembaban").then(function (dat) {
                            $scope.isRouteLoading = true;
                            formPengukuranKelembapan();
                            $scope.isRouteLoading = false;
                        });
                    })
                }

            }

            $scope.saveSanitasi = function () {
                var arrChecklist = [];
                var arrChecklist2 = [];
                $scope.kondisiRuangData._data.forEach(function (datas) {
                    datas = {
                        "parameterCheckSanitasiDetail": {
                            "id": datas.id
                        },
                        "keterangan": datas.keterangan,
                        "statusYaTidak": {
                            "id": datas.statusYaTidak.id
                        }
                    }

                    arrChecklist.push(datas)
                })
                $scope.kondisiToiletData._data.forEach(function (datas) {
                    datas = {
                        "parameterCheckSanitasiDetail": {
                            "id": datas.id
                        },
                        "keterangan": datas.keterangan,
                        "statusYaTidak": {
                            "id": datas.statusYaTidak.id
                        }
                    }
                    arrChecklist.push(datas)
                })
                $scope.limbahMedisData._data.forEach(function (datas) {
                    datas = {
                        "parameterCheckSanitasiDetail": {
                            "id": datas.id
                        },
                        "keterangan": datas.keterangan,
                        "statusYaTidak": {
                            "id": datas.statusYaTidak.id
                        }
                    }
                    arrChecklist.push(datas)
                })
                $scope.kualitasUdaraData._data.forEach(function (datas) {
                    datas = {
                        "keterangan": datas.keterangan,
                        "hasilPengukuran": datas.hasilPengukuran,
                        "parameterCheckSanitasiDetail": {
                            "id": datas.id
                        }
                    }
                    arrChecklist2.push(datas)
                })
                if ($scope.item.pjRuangan == undefined) {
                    $scope.item.pjRuangan = {
                        "id": 0
                    }
                }
                var data = {
                    "tanggal": $scope.item.tglInput,
                    "pegawai": {
                        "id": $scope.item.petugas.idPegawai
                    },
                    "ruangan": {
                        "id": $scope.item.ruanganSanitasi.ruanganId
                    },
                    "pjRuangan": {
                        "id": $scope.item.pjRuangan.id
                    },
                    "checklistSanitasiKLDetail": arrChecklist,
                    "pengukuranSanitasiKLDetail": arrChecklist2
                }
                ManageKKKL.saveDataSarPras(data, "sanitasi-kesehatan-lingkungan/save-sanitasi-kesehatan-lingkungan").then(function (e) {
                    formChecklistSanitasi();
                    $scope.refresh();
                });
            }

            // LAPORAN
            var cetakDataKebisingan = function () {
                var bulanAwal,
                    bulanAkhir,
                    hariAwal,
                    hariAkhir,
                    tahunAwal,
                    tahunAkhir
                var awal = new Date($scope.item.tglPeriodeAwal);
                var akhir = new Date($scope.item.tglPeriodeAkhir);

                bulanAwal = (awal.getMonth() + 1);
                if (bulanAwal < 10) {
                    bulanAwal = '0' + (awal.getMonth() + 1)
                }
                bulanAkhir = (akhir.getMonth() + 1);
                if (bulanAkhir < 10) {
                    bulanAkhir = '0' + (akhir.getMonth() + 1)
                }

                hariAwal = awal.getDate();
                if (hariAwal < 10) {
                    hariAwal = '0' + awal.getDate();
                }
                hariAkhir = akhir.getDate();
                if (hariAkhir < 10) {
                    hariAkhir = '0' + akhir.getDate();
                }
                tahunAkhir = akhir.getFullYear();
                tahunAwal = awal.getFullYear();

                var startDate = tahunAwal + '-' + bulanAwal + '-' + hariAwal;
                var endDate = tahunAkhir + '-' + bulanAkhir + '-' + hariAkhir;
                var url = 'pengukuran-kebisingan/lapPengukuranKebisingan?startDate=' + startDate + '&endDate=' + endDate;
                var urlLaporan = cetakHelper.open(url);
                window.open(urlLaporan, '', 'width:600, height:500');
                console.log(selectedDataKebisingan);
            }

            var cetakKumanUdara = function (selectedDataPemeriksaanKuman) {
                var month, day, year;
                var d = new Date(selectedDataPemeriksaanKuman.tanggal);
                month = (d.getMonth() + 1);
                if (month < 10) {
                    month = '0' + (d.getMonth() + 1)
                }
                day = d.getDate();
                if (day < 10) {
                    day = '0' + d.getDate();
                }
                year = d.getFullYear();
                var fullDate = year + '-' + month + '-' + day;
                var url = 'pemeriksaan-angka-kuman-udara/lapPemeriksaanAngkaKumanUdara?startDate=' + fullDate + '&endDate=' + fullDate;
                var urlLaporan = cetakHelper.open(url);
                window.open(urlLaporan, '', 'width:600, height:500');
            }
        }
    ])
});