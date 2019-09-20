define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ResumeRICtrl', ['$q', '$scope', '$state', 'ManagePhp', '$timeout', 'CacheHelper', '$rootScope',
        function ($q, $scope, $state, ManagePhp, $timeout, cacheHelper, $rootScope) {
            $scope.isRouteLoading = false;
            $scope.now = new Date()
            $scope.item = {
                tglresume: $scope.now
            } // set defined object
            $scope.isGrid = true
            $scope.isNext = true
            var data2 = []
            $scope.norecAPD = $state.params.noRec
            $scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'))
            var cookie = document.cookie.split(';')
            var kelompokUser = cookie[0].split('=')
            var getCache = cacheHelper.get('cacheRekamMedis')
            if (getCache != undefined) {
                $scope.nocm = getCache[0]
                $scope.norecPd = getCache[8]
                if (!$scope.norecAPD)
                    $scope.norecAPD = getCache[7]
                $scope.item.namaruangan = getCache[12]
            }
            $scope.listKondisi = [
                {
                    "id": 1, "nama": "Kondisi Waktu Keluar", "detail": [
                        { "id": 1, "nama": "Sembuh" },
                        { "id": 2, "nama": "Pindah" },
                        { "id": 3, "nama": "Pulang atas Permintaan Sendiri" },
                        { "id": 4, "nama": "Meninggal" },
                    ]
                }
            ]
            $scope.listPengobatan = [
                {
                    "id": 2, "nama": "Pengobatan Dilanjutkan", "detail": [
                        { "id": 1, "nama": "Poliklinik RSAB HK" },
                        { "id": 2, "nama": "RS Lain" },
                        { "id": 3, "nama": "PUSKESMAS" },
                        { "id": 4, "nama": "Dokter Luar" },
                    ]
                }
            ]

            $scope.resumeOpt = {
                toolbar: [{
                    name: "create", text: "Tambah",
                    template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                },],
                selectable: "row",
                pageable: true,
                scrollable: true,
                columns: [
                    // { field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
                    { field: "no", title: "No", width: 40 },
                    { field: "namaobat", title: "Nama Obat", width: 200 },
                    { field: "jumlah", title: "Jumlah", width: 120 },
                    { field: "dosis", title: "Dosis", width: 120 },
                    { field: "frekuensi", title: "Frekuensi", width: 120 },
                    { field: "carapemberian", title: "Cara Pemberian", width: 150 },
                    { command: [{ imageClass: "k-icon k-delete", text: "Hapus", click: hapusData2 }, { name: "edit", text: "Edit", click: editData2 }], title: "&nbsp;", width: 120 }
                    // {command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 120 }
                ],

            };
            $scope.resumeOptHead = {
                // toolbar: [{
                //     name: "create", text: "Tambah",
                //     template: '<button ng-click="showInput()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                // },],
                selectable: "row",
                pageable: true,
                scrollable: true,
                columns: [
                    { field: "no", title: "No", width: 40 },
                    { field: "tglresume", title: "Tgl Resume", width: 150 },
                    { field: "koderesume", title: "Kode Resume", width: 150 },
                    { field: "noregistrasi", title: "No Registrasi", width: 150 },
                    { field: "namaruangan", title: "Ruangan", width: 150 },
                    { field: "namadokter", title: "Pegawai", width: 150 },
                    { field: "ringkasanriwayatpenyakit", title: "Ringkasan Riwayat Penyakit", width: 250 },
                    { field: "pemeriksaanfisik", title: "Pemerisaan Fisik", width: 250 },
                    { field: "pemeriksaanpenunjang", title: "Pemerisaan Penunjang", width: 250 },
                    { field: "hasilkonsultasi", title: "Hasil Konsultasi", width: 250 },
                    { field: "diagnosisawal", title: "Diagnosi Awal", width: 150 },
                    { field: "diagnosissekunder", title: "Diagnosis Sekunder", width: 150 },
                    { field: "diet", title: "Diet", width: 150 },
                    { field: "hasilkonsultasi", title: "Hasil Konsultasi", width: 150 },
                    { field: "hasillab", title: "Hasil Lab", width: 150 },
                    { field: "instruksianjuran", title: "Intruksi", width: 150 },
                    { field: "kondisiwaktukeluar", title: "Kondisi Keluar", width: 150 },
                    { field: "pengobatandilanjutkan", title: "Pengobatan Dilanjutkan", width: 150 },
                    { field: "tindakanprosedur", title: "Tindakan Prosedur", width: 150 },
                    { field: "terapi", title: "Terapi", width: 120 },
                 
                                // { command: [{ imageClass: "k-icon k-delete", text: "Hapus", click: hapusHead }, { name: "edit", text: "Edit", click: editHead }], title: "&nbsp;", width: 120 }
                ],

            };
       
            $scope.data2 = function (dataItem) {
                for (var i = 0; i < dataItem.details.length; i++) {
                    dataItem.details[i].no = i + 1
                }
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details,

                    }),
                    columns: [
                        { field: "no", title: "No", width: 40 },
                        { field: "namaobat", title: "Nama Obat", width: 200 },
                        { field: "jumlah", title: "Jumlah", width: 120 },
                        { field: "dosis", title: "Dosis", width: 120 },
                        { field: "frekuensi", title: "Frekuensi", width: 120 },
                        { field: "carapemberian", title: "Cara Pemberian", width: 150 },
                    ]
                }
            };
            $scope.inputBaru = function () {
                $scope.popUp.center().open()
            }
            $scope.batal = function () {
                $scope.popUp.close()
            }
            init();
            $scope.showInput = function () {
                $scope.isEdit = true
                $scope.isGrid = false
                $scope.item = {}
                data2 = []
                $scope.sourceResume = new kendo.data.DataSource({
                    data: data2
                });

            }
            $scope.Back = function () {
                $scope.isEdit = false
                $scope.isGrid = true
            }
            function hapusData2(e) {
                e.preventDefault();
                var grid = this
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!dataItem) {
                    toastr.error("Data Tidak Ditemukan");
                    return
                }
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no == dataItem.no) {
                        data2.splice(i, 1);
                    }
                }
                grid.removeRow(dataItem);

            }
            // function hapusHead(e) {
            //     e.preventDefault();
            //     var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

            //     if (!dataItem) {
            //         toastr.error("Data Tidak Ditemukan");
            //         return
            //     }


            // }
            $scope.editGrid = function () {
                $scope.item.norec = $scope.modelGrid.norec
                $scope.item.riwayatPenyakit = $scope.modelGrid.ringkasanriwayatpenyakit
                $scope.item.pemeriksaanFisik = $scope.modelGrid.pemeriksaanfisik
                $scope.item.pemeriksaanPenunjang = $scope.modelGrid.pemeriksaanpenunjang
                $scope.item.hasilKonsultasi = $scope.modelGrid.hasilkonsultasi
                $scope.item.terapi = $scope.modelGrid.terapi
                $scope.item.diagnosaUtama = $scope.modelGrid.diagnosisawal
                $scope.item.diagnosisSekunder = $scope.modelGrid.diagnosissekunder
                $scope.item.tindakanProsedur = $scope.modelGrid.tindakanprosedur
                $scope.item.alergi = $scope.modelGrid.alergi
                $scope.item.diet = $scope.modelGrid.diet
                $scope.item.intruksi = $scope.modelGrid.instruksianjuran
                $scope.item.hasilLab = $scope.modelGrid.hasillab
                $scope.item.kondisi = $scope.modelGrid.kondisiwaktukeluar
                $scope.item.pengobatan = $scope.modelGrid.pengobatandilanjutkan
                $scope.norecAPD = $scope.modelGrid.noregistrasifk
                data2 = $scope.modelGrid.details
                for (let index = 0; index < data2.length; index++) {
                    data2[index].no = index + 1;
                }
                $scope.sourceResume = new kendo.data.DataSource({
                    data: data2
                });
                $scope.isGrid = false
                $scope.isEdit = true
            }
            // function editHead(e) {
            //     e.preventDefault();
            //     var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

            //     if (!dataItem) {
            //         toastr.error("Data Tidak Ditemukan");
            //         return
            //     }
            //     $scope.item.norec = dataItem.norec
            //     $scope.item.riwayatPenyakit = dataItem.ringkasanriwayatpenyakit
            //     $scope.item.pemeriksaanFisik = dataItem.pemeriksaanfisik
            //     $scope.item.pemeriksaanPenunjang = dataItem.pemeriksaanpenunjang
            //     $scope.item.hasilKonsultasi = dataItem.hasilkonsultasi
            //     $scope.item.terapi = dataItem.terapi
            //     $scope.item.diagnosaUtama = dataItem.diagnosisutama
            //     $scope.item.diagnosisSekunder = dataItem.diagnosissekunder
            //     $scope.item.tindakanProsedur = dataItem.tindakanprosedur
            //     $scope.item.alergi = dataItem.alergi
            //     $scope.item.diet = dataItem.diet
            //     $scope.item.intruksi = dataItem.instruksianjuran
            //     $scope.item.hasilLab = dataItem.hasillab
            //     $scope.item.kondisi = dataItem.kondisiwaktukeluar
            //     $scope.item.pengobatan = dataItem.pengobatandilanjutkan
            //     data2 = dataItem.details
            //     $scope.sourceResume = new kendo.data.DataSource({
            //         data: data2
            //     });
            //     $scope.isGrid = false
            //     $scope.isEdit = true


            // }
            function editData2(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!dataItem) {
                    toastr.error("Data Tidak Ditemukan");
                    return
                }
                $scope.item.no = dataItem.no
                $scope.item.namaobat = dataItem.namaobat
                $scope.item.jumlah = dataItem.jumlah
                $scope.item.dosis = dataItem.dosis
                $scope.item.frekuensi = dataItem.frekuensi
                $scope.item.carapemberian = dataItem.carapemberian

                $scope.popUp.center().open()

            }
            function init() {
                $scope.isRouteLoading = true;
                ManagePhp.getData("rekam-medis/get-combo").then(function (e) {
                    $scope.listDokter = e.data.dokter
                })

                $q.all([
                    ManagePhp.getData("rekam-medis/get-resume-medis-inap/" + $scope.nocm)
                ]).then(function (res) {
                    if (res[0].statResponse) {
                        var result = res[0].data.data
                        if (result.length > 0) {
                            for (let index = 0; index < result.length; index++) {
                                result[index].no = index + 1
                            }
                        }

                        $scope.sourceResumeHead = new kendo.data.DataSource({
                            data: result,
                            pageSize: 20,

                        });
                    }

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    throw error;
                })
            };

            $scope.Save = function (data) {
                var item = {
                    "norec": $scope.item.norec != undefined ? $scope.item.norec : "",
                    "ringkasanriwayatpenyakit": $scope.item.riwayatPenyakit != undefined ? $scope.item.riwayatPenyakit : "",
                    "pemeriksaanfisik": $scope.item.pemeriksaanFisik != undefined ? $scope.item.pemeriksaanFisik : "",
                    "pemeriksaanpenunjang": $scope.item.pemeriksaanPenunjang != undefined ? $scope.item.pemeriksaanPenunjang : "",
                    "hasilkonsultasi": $scope.item.hasilKonsultasi != undefined ? $scope.item.hasilKonsultasi : "",
                    "terapi": $scope.item.terapi != undefined ? $scope.item.terapi : null,
                    "diagnosisutama": $scope.item.diagnosaUtama != undefined ? $scope.item.diagnosaUtama : "",
                    "diagnosissekunder": $scope.item.diagnosisSekunder != undefined ? $scope.item.diagnosisSekunder : "",
                    "tindakanprosedur": $scope.item.tindakanProsedur != undefined ? $scope.item.tindakanProsedur : "",
                    "alergi": $scope.item.alergi != undefined ? $scope.item.alergi : "",
                    "diet": $scope.item.diet != undefined ? $scope.item.diet : "",
                    "instruksianjuran": $scope.item.intruksi != undefined ? $scope.item.intruksi : "",
                    "hasillab": $scope.item.hasilLab != undefined ? $scope.item.hasilLab : "",
                    "kondisiwaktukeluar": $scope.item.kondisi != undefined ? $scope.item.kondisi : "",
                    "pengobatandilanjutkan": $scope.item.pengobatan != undefined ? $scope.item.pengobatan : $scope.item.pengobatanLain,
                    "noregistrasifk": $scope.norecAPD,
                    "detail": data2
                }

                ManagePhp.postData(item, 'rekam-medis/post-resume-medis-inap/save').then(function (e) {
                    // delete $scope.item;
                    clear()
                    init();
                    ManagePhp.postLogging('Resume Medis', 'Norec resumemedis_t', e.data.resume.norec, 'Resume RI').then(function (res) {
                    })
                });
            };
            function clear() {
                $scope.item = {}

            }
            $scope.hapusGrid = function () {
                var item = {
                    "norec": $scope.modelGrid.norec
                }
                ManagePhp.postData(item, 'rekam-medis/post-resume-medis-inap/delete').then(function (e) {
                    clear()
                    init();
                });
            }
            function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "jenisJabatan",
                        dataValueField: "id",
                        dataSource: $scope.listJenisJabatan
                    });
            }
            var timeoutPromise;
            $scope.$watch('item.filterRiwayat', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    applyFilter("ringkasanriwayatpenyakit", newVal)
                }
            })
            $scope.$watch('item.filterPemeriksaanfisik', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal != oldVal) {
                        applyFilter("pemeriksaanfisik", newVal)
                    }
                }, 500)
            })
            $scope.$watch('item.filterPemeriksaanPenunjang', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal != oldVal) {
                        applyFilter("pemeriksaanpenunjang", newVal)
                    }
                }, 500)
            })

            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#gridResumeHead").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    })
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            }
            $scope.resetFilter = function () {
                var dataGrid = $("#gridResume").data("kendoGrid");
                dataGrid.dataSource.filter({});
                delete $scope.item.filterRiwayat
                delete $scope.item.filterPemeriksaanfisik
                delete $scope.item.filterPemeriksaanPenunjang
            }

            $scope.cetak = function () {
                if ($scope.modelGrid == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                if (confirm('View Resume? ')) {
                    var stt = 'true';
                } else {
                    var stt = 'false'
                }
                // Do nothing!
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/rekammedis?cetak-resume-ri=' + $scope.nocm
                    + '&noRec=' + $scope.modelGrid.norec
                    + '&view=' + stt
                    , function (response) {
                    });
            }
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            $scope.Tambah = function () {
                var nomor = 0
                if ($scope.sourceResume == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data.no = $scope.item.no
                            data.namaobat = $scope.item.namaobat
                            data.jumlah = $scope.item.jumlah
                            data.dosis = $scope.item.dosis
                            data.frekuensi = $scope.item.frekuensi
                            data.carapemberian = $scope.item.carapemberian

                            data2[i] = data;
                            $scope.sourceResume = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                } else {
                    data = {
                        no: nomor,
                        namaobat: $scope.item.namaobat,
                        jumlah: $scope.item.jumlah,
                        dosis: $scope.item.dosis,
                        frekuensi: $scope.item.frekuensi,
                        carapemberian: $scope.item.carapemberian,
                    }
                    data2.push(data)
                    $scope.sourceResume = new kendo.data.DataSource({
                        data: data2
                    });

                }
                kosongkan()
            }
            function kosongkan() {
                delete $scope.item.no
                delete $scope.item.namaobat
                delete $scope.item.jumlah
                delete $scope.item.dosis
                delete $scope.item.frekuensi
                delete $scope.item.carapemberian
            }

        }
    ]);
});