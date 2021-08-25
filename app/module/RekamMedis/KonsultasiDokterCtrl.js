define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KonsultasiDokterCtrl', ['$q', '$scope', '$state', 'ManagePhp', '$timeout', 'CacheHelper', '$mdDialog',
        function ($q, $scope, $state, ManagePhp, $timeout, cacheHelper, $mdDialog) {
            $scope.isRouteLoading = false;
            $scope.now = new Date()
            $scope.item = {
                tglresume: $scope.now
            } // set defined object
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.filter = {}
            $scope.listOfStatusKonsult = [
                { name: 'Alih Rawat', id: 1},
                { name: 'Rawat Bersama', id: 2},
                { name: 'Konsultasi Sewaktu', id: 3}
            ]
            $scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'))
            var cookie = document.cookie.split(';')
            var kelompokUser = cookie[0].split('=')
            var getCache = cacheHelper.get('cacheRekamMedis');
            if (getCache != undefined) {
                $scope.nocm = getCache[0]
                $scope.norecPd = getCache[8]
                $scope.item.ruanganAsal = { id: getCache[11], namaruangan: getCache[12] }

            }
            $scope.resumeOpt = {
                filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
                toolbar: [{
                    name: "create", text: "Input Baru",
                    template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Konsultasi</button>'
                },],
                pageable: true,
                scrollable: true,
                columns: [
                    // { field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
                    { field: "no", title: "<h3>No</h3>", width: 40 },
                    { field: "noorder", title: "<h3>No. Konsultasi</h3>", width: 70 },
                    { field: "noregistrasi", title: "<h3>No. Registrasi</h3>", width: 70 },
                    { field: "tglorder", title: "<h3>Tanggal</h3>", width: 120 },
                    { field: "ruanganasal", title: "<h3>Ruangan Asal</h3>", width: 120 },
                    { field: "ruangantujuan", title: "<h3>Ruangan Tujuan</h3>", width: 150 },
                    { field: "namalengkap", title: "<h3>Dokter Konsultasi</h3>", width: 120 },
                    // { field: "keteranganorder", title: "Keterangan", width: 120 },
                    { command: [
                        // { imageClass: "k-icon k-delete", text: "Hapus", click: hapus },
                        { text: "Edit", click: editData },
                        // { name: "Verifikasi", text: "Hasil Konsul", click: hasilKonsult },
                        { name: "Detail", text: "Detail", click: showDetail },
                        { name: "Cetak", text: "Cetak", click: cetakReport },
                    ], title: "&nbsp;", width: 140, 
                        attributes: {
                            style: "text-align:center;valign=middle"
                        }
                    }
                ],
            };

            function cetakReport(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                window.open("http://192.168.12.4:7777/service-reporting/lap-konsul/" + dataItem.noorder);
            }

            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                $scope.item = dataItem;
                $scope.item.keterangankeperluan = $scope.item.keterangankeperluan ? $scope.item.keterangankeperluan : "-";
                $scope.item.pemeriksaandidapat = $scope.item.pemeriksaandidapat ? $scope.item.pemeriksaandidapat : "-";
                $scope.item.diagnosis = $scope.item.diagnosis ? $scope.item.diagnosis : "-";
                $scope.item.saran = $scope.item.saran ? $scope.item.saran : "-";
                // console.log($scope.item.keterangankeperluan);
                $scope.popUpDetail.center().open();
            }

            $scope.inputBaru = function () {
                let getJenisPegawai = $scope.dataLogin.jenisPegawai.jenispegawai ? $scope.dataLogin.jenisPegawai.jenispegawai : $scope.dataLogin.jenisPegawai.jenisPegawai;
                if(getJenisPegawai !== "DOKTER") {
                    toastr.info('Anda tidak memiliki akses menambahkan konsultasi');
                    return;
                }
                $scope.isVerifikasi = false;
                $scope.item = {};
                var getCache = cacheHelper.get('cacheRekamMedis');
                $scope.item.ruanganAsal = { id: getCache[11], namaruangan: getCache[12] }
                if (kelompokUser[1] == 'dokter') {
                    $scope.item.namadokter = { id: $scope.pegawaiLogin.id, namalengkap: $scope.pegawaiLogin.namaLengkap }
                }
                clear()
                $scope.popUp.center().open()
            }

            $scope.batal = function () {
                $scope.popUp.close()
            }

            init();

            function hasilKonsult(e) {  
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                
                $scope.item.hasilKonsultasi = dataItem.keterangankeperluan;
                $scope.popUpHasilKonsul.center().open();
            }
            $scope.onChangeJenisKonsultasi = function(key) {
                if(key === 2) {
                    $scope.isNotRawatBersama = false;
                    $scope.isRawatBersama = true;
                    $scope.ukuranGrid = 'grid_12';
                } else {
                    $scope.isNotRawatBersama = true;
                    $scope.isRawatBersama = false;
                    $scope.ukuranGrid = 'grid_4';
                }
                
                
                
            }

            $scope.selectOptions = {
                placeholder: "Pilih Dokter",
                dataTextField: "kategoryPegawnamalengkapai",
                dataValueField: "id",
                filter: "contains"
            };

            $scope.tutupDetail = function (data) {
                if(data === 1) {
                    $scope.popUpHasilKonsul.close();
                } else {
                    $scope.popUpDetail.close();
                }
                
            }

            function hapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var itemDelete = {
                    "norec": dataItem.norec
                }
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data Konsultasi?')
                    .textContent(`Anda akan menghapus data Konsultasi`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function() {
                    ManagePhp.postData(itemDelete, 'rekam-medis/disabled-konsultasi').then(function (e) {
                        if (e.status == 201) {
                            init()
                        }
                    });
                    console.warn('Masuk sini pak eko');
                }, function() {
                    console.error('Tidak jadi hapus');
                });
            }
            function editData(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // ($scope.dataLogin.jenisPegawai.jenispegawai !== "PELAKSANA")
                //  toastr.info('Anda tidak memiliki akses bisa edit data konsultasi');
                // if(dataItem.pengonsul !== $scope.dataLogin.namaLengkap) {
                
                if(dataItem.pengonsul !== $scope.dataLogin.namaLengkap) {
                    toastr.info('Anda tidak memiliki akses bisa edit data konsultasi');
                    return;
                }

                // validasi ketika sudah di verifikasi
                if(dataItem.keterangankeperluan !== "-") {
                    $scope.isVerifikasi = true;
                    toastr.info('Konsultasi sudah di verifikasi');
                } else {
                    $scope.isVerifikasi = false;
                }
                
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var dateNow = new Date();
                var dateOrder = new Date(dataItem.tglorder);
                var diffDays = Math.round(Math.abs((dateNow.getTime() - dateOrder.getTime())/(oneDay)));

                // if (diffDays >= 1){
                //     toastr.warning('data tidak bisa di edit')
                //     return;
                // }

                $scope.item.masalah = dataItem.masalah;
                $scope.item.jenisKonsultasi = dataItem.jeniskonsultasi;
                $scope.item.pasienDiagnosaKerja = dataItem.diagnosakerja;
                $scope.item.ikhtisarKlinik = dataItem.keteranganorder;
                $scope.item.terapiDanTindakan = dataItem.terapi;
                $scope.item.norec = dataItem.norec
                $scope.item.ruanganAsal = { id: dataItem.objectruanganfk, namaruangan: dataItem.ruanganasal }
                $scope.item.ruanganTujuan = { id: dataItem.objectruangantujuanfk, namaruangan: dataItem.ruangantujuan }
                $scope.item.dokter = { id: dataItem.pegawaifk, namalengkap: dataItem.namalengkap }
                $scope.item.keterangan = dataItem.keteranganorder
                $scope.popUp.center().open();

            }
            function init() {
                $scope.isRouteLoading = true;
                ManagePhp.getData("rekam-medis/get-combo").then(function (e) {
                    $scope.listDokter = e.data.dokter
                    $scope.listRuangan = e.data.ruangankonsul
                });

                $q.all([
                    ManagePhp.getData("rekam-medis/get-order-konsul?norecpd=" + $scope.norecPd)
                ]).then(function (res) {
                    if (res[0].statResponse) {
                        var result = res[0].data.data
                        if (result.length > 0) {
                            for (let index = 0; index < result.length; index++) {
                                result[index].no = index + 1
                            }
                        }

                        $scope.sourceResume = new kendo.data.DataSource({
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
                if($scope.item.jenisKonsultasi === undefined) {
                    toastr.warning("Jenis Konsultasi belum dipilih");
                    return;
                }
                if ($scope.item.ruanganTujuan == undefined) {
                    toastr.warning("Pilih Ruangan Tujuan terlebih dahulu!")
                    return;
                }

                var objSave = {
                    jeniskonsultasi: $scope.item.jenisKonsultasi,
                    norec_so: $scope.item.norec != undefined ? $scope.item.norec : '',
                    norec_pd: $scope.norecPd,
                    pegawaifk: $scope.item.dokter ? $scope.item.dokter.id : null,
                    petugasfk: $scope.dataLogin.id,
                    objectruanganasalfk: $scope.item.ruanganAsal.id,
                    objectruangantujuanfk: $scope.item.ruanganTujuan.id,
                    keterangan: $scope.item.ikhtisarKlinik ? $scope.item.ikhtisarKlinik : '',
                    diagnosakerja: $scope.item.pasienDiagnosaKerja ? $scope.item.pasienDiagnosaKerja : '',
                    terapi: $scope.item.terapiDanTindakan ? $scope.item.terapiDanTindakan : '',
                    masalah:$scope.item.masalah ? $scope.item.masalah : ''
                }
                
                ManagePhp.postData(objSave, 'rekam-medis/post-konsultasi').then(function (e) {
                    clear()
                    init();
                    $scope.popUp.close();
                    ManagePhp.postLogging('Konsultasi', 'Norec strukorder_t',e.data.strukorder.norec, 'Menu Dokter').then(function (res) {
                    })
                });
            };

            function clear() {
                delete $scope.item.norec
                delete $scope.item.ruanganTujuan
                delete $scope.item.keterangan
                delete $scope.item.dokter
       
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
            $scope.$watch('filter.ruanganAsal', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    applyFilter("objectruanganfk", newVal)
                }
            })
            $scope.$watch('filter.ruanganTujuan', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    applyFilter("objectruangantujuanfk", newVal)
                }
            })
            $scope.$watch('filter.dokter', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    applyFilter("pegawaifk", newVal)
                }
            })

            $scope.$watch('filter.keterangan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal != oldVal) {
                        applyFilter("keteranganorder", newVal)
                    }
                }, 500)
            })

            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#gridResume").data("kendoGrid");
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
                $scope.filter = {}
            }

            $scope.cetak = function () {
                if (confirm('View Resume? ')) {
                    var stt = 'true';
                } else {
                    var stt = 'false'
                }
                // Do nothing!
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/rekammedis?cetak-resume-rj=' + $scope.nocm
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
        }
    ]);
});