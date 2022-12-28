define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PasienPerjanjianCtrl', ['$scope', '$timeout', 'ModelItem', 'ModelItemAkuntansi', '$state', 'CacheHelper', 'DateHelper', 'ManagePhp', '$mdDialog',
        function ($scope, $timeout, ModelItem, modelItemAkuntansi, $state, cacheHelper, dateHelper, ManagePhp, $mdDialog) {
            $scope.onInit=()=>{
                var datauserlogin = JSON.parse(window.localStorage.getItem('pegawai'));
                (datauserlogin['id']=="320263") ? $scope.isVedika=true : $scope.isVedika=false;
            }
            $scope.onInit();
            $scope.date = new Date();
            $scope.item = {};
            $scope.now = new Date();
            var norec_apd = '', norec_pd = '';
            init();
            function init() {
                if($scope.isVedika){
                    $scope.gridPerjanjian = {
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
                        pageable: true,
                        columns: [
                            {
                                "field": "noperjanjian",
                                "title": "<h3>No Perjanjian</h3>",
                                "width": "100px"
                            },
                            {
                                "field": "tglperjanjian",
                                "title": "<h3>Tanggal Perjanjian</h3>",
                                "width": "100px"
                            },
                            {
                                "field": "namaruangan",
                                "title": "<h3>Poliklinik</h3>",
                                "width": "150px"
                            }, {
                                "field": "namalengkap",
                                "title": "<h3>Dokter</h3>",
                                "width": "150px"
                            }, {
                                "field": "keterangan",
                                "title": "<h3>Keterangan</h3>",
                                "width": "200px"
                            }
                        ]
                    }
                }else{
                    $scope.gridPerjanjian = {
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
                            template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Pasien Perjanjian</button>'
                        }, {
                            name: "create", text: "Lihat",
                            template: '<button ng-click="lihatJadwalDokter()" class="k-button k-button-icontext k-grid-upload" href="\\#">Lihat Jadwal Dokter</button>'
                        }],
                        pageable: true,
                        columns: [
                            {
                                "field": "noperjanjian",
                                "title": "<h3>No Perjanjian</h3>",
                                "width": "100px"
                            },
                            {
                                "field": "tglperjanjian",
                                "title": "<h3>Tanggal Perjanjian</h3>",
                                "width": "100px"
                            },
                            {
                                "field": "namaruangan",
                                "title": "<h3>Poliklinik</h3>",
                                "width": "150px"
                            }, {
                                "field": "namalengkap",
                                "title": "<h3>Dokter</h3>",
                                "width": "150px"
                            }, {
                                "field": "keterangan",
                                "title": "<h3>Keterangan</h3>",
                                "width": "200px"
                            },
                            {
                                command: [
                                    { text: "Edit", click: editData, imageClass: "k-icon k-i-pencil" },
                                    {text: "Hapus", click: hapusPerjanjian, imageClass: "k-icon k-i-cancel"}
                                ], title: "", width: 120}
        
                        ]
                    }
                }
                
                if($scope.perjanjian) {
                    $scope.perjanjian.tglPerjanjian = new Date();
                }
                ManagePhp.getData("rekam-medis/get-combo" ).then(function (dat) {
                    $scope.listRuangan = dat.data.ruangan
                    $scope.listDokter = dat.data.dokter
                });
                LoadCache();
                getDataPerjanjian();
                
            }
            
            function getDataPerjanjian() {
                LoadCache();
                ManagePhp.getData("rekam-medis/get-perjanjian?nocm=" + $scope.item.noMr).then(function (dat) {
                    let array = dat.data.data;
                    $scope.sourcePerjanjian = new kendo.data.DataSource({
                        data: array,
                        pageSize:5
                    });
                });
            }
            
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheRMelektronik');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    //if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                    //    $scope.showTombol = true
                    //}
                }
            }

            $scope.lihatJadwalDokter = () => {
                $state.go("InformasiJadwalDokterV2");
            }

            $scope.inputBaru = function() {
                $scope.item = {}
                $scope.popUpPasienPerjanjian.center().open();
            }

            $scope.tambahPerjanjian = function () {
                if ($scope.item.poliklinik == undefined) {
                    toastr.error('Ruangan masih kosong')
                    return
                }
                if ($scope.item.dokter == undefined) {
                    toastr.error('Dokter masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.item.norec !== undefined ? $scope.item.norec : '',
                    nocm: $scope.item.noMr,
                    objectdokterfk: $scope.item.dokter.id,
                    tglperjanjian: moment( $scope.item.tglPerjanjian).format('YYYY-MM-DD HH:mm'),
                    jumlahkujungan: null,
                    keterangan: $scope.item.keteranganLainnya !== undefined ? $scope.item.keteranganLainnya : '-',
                    objectruanganfk: $scope.item.poliklinik.id,
                }
                // console.table(jsonSave);
                ManagePhp.postData(jsonSave, 'rekam-medis/post-perjanjian/save').then(function (e) {
                    init();
                    $scope.item = {}
                    $scope.popUpPasienPerjanjian.close();
                    getDataPerjanjian();
                    // $scope.batalInput();
                    ManagePhp.postLogging('Pengkajian Awal', 'Norec pasienperjanjian_t', e.data.norec, 'Perjanjian').then(function (res) {

                    });
                });
            };

            function hapusPerjanjian(e) {                
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data?')
                    .textContent(`Anda akan menghapus data Pasien Perjanjian`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function() {
                    ManagePhp.postData({norec: dataItem.norec}, 'rekam-medis/post-perjanjian/delete').then(function (e) {
                        getDataPerjanjian();
                    });
                }, function() {
                    console.error('Tidak jadi hapus');
                });
                
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.tglPerjanjian = dataItem.tglperjanjian;
                $scope.item.poliklinik = { namaruangan:dataItem.namaruangan, id:dataItem.objectruanganfk };
                $scope.item.dokter = { namalengkap:dataItem.namalengkap, id:dataItem.objectdokterfk };
                $scope.item.keteranganLainnya = dataItem.keterangan;
                $scope.item.norec = dataItem.norec;
                $scope.popUpPasienPerjanjian.center().open();
            }

            $scope.batalInput = function() {
                $scope.item = {}
                $scope.popUpPasienPerjanjian.close();
            }
        }
    ]);
});