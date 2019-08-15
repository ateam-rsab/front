define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPasienVedikaCtrl', ['SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', '$mdDialog', '$window', 'ManageSarprasPhp', 'CacheHelper', '$q', 'ManagePhp',
        function (saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien, $mdDialog, window, manageSarprasPhp, cacheHelper, $q, ManagePhp) {
            $scope.isVerify = false;
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeAwal = new Date();;
            $scope.item.periodeAkhir = new Date();
            $scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
            $scope.item.periodeAkhir = new Date();
            $scope.dataPasienSelected = {};
            $scope.isRouteLoading = false;
            $rootScope.isOpen = true;
            $scope.cboUbahDokter = true;
            var cookie = document.cookie.split(';');
            cookie = cookie[0].split('=');
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'))
            $scope.pegawai = ModelItem.getPegawai();
            loadCombo();
            loadData();
            postRensarWTRJ();

            function postRensarWTRJ() {
                manageSarprasPhp.saveDataTransaksi('rensar/post-waktu-tunggu-rj')
                    .then(function (res) {
                    })
            }
            // loadData()
            $scope.SearchEnter = function () {
                loadData()
            }

            function loadCombo() {
                var chacePeriode = cacheHelper.get('DaftarAntrianDokterRajalCtrl');
                if (chacePeriode != undefined) {
                    //debugger;
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAwal = new Date(dateHelper.setJamAwal(new Date()));
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]);
                    // $scope.item.tglpulang = new Date(arrPeriode[2]);                
                } else {
                    $scope.item.periodeAwal = new Date();
                    $scope.item.periodeAkhir = moment($scope.now).format('YYYY-MM-DD 23:59');
                    $scope.item.periodeAwal = moment($scope.now).format('YYYY-MM-DD 00:00');
                    $scope.item.periodeAkhir = moment($scope.now).format('YYYY-MM-DD 23:59');
                    // $scope.item.tglpulang = $scope.now;                 
                }
                manageSarprasPhp.getDataTableTransaksi("dokter/get-data-combo-dokter", false).then(function (data) {
                    $scope.listRuangan = data.data.ruanganRajal;
                });

                manageSarprasPhp.getDataTableTransaksi("pasien/get-dokters-combos", false).then(function (data) {
                    $scope.listDokter = data.data.dokter;
                });
            }

            function loadData() {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

                var nocm = ""
                if ($scope.item.noCm != undefined) {
                    var nocm = "&norm=" + $scope.item.noCm
                }
                var nama = ""
                if ($scope.item.namaPasien != undefined) {
                    var nama = "&nama=" + $scope.item.namaPasien
                }
                var noRegistrasi = ""
                if ($scope.item.noRegistrasi != undefined) {
                    var noRegistrasi = "&noreg=" + $scope.item.noRegistrasi
                }
                var dokId = ""
                if ($scope.pegawai.id != undefined) {
                    var dokId = "&dokId=" + $scope.pegawai.id
                }
                var ruangId = ""
                if ($scope.item.ruangan != undefined) {
                    var ruangId = "&ruangId=" + $scope.item.ruangan.id
                }
                $q.all([
                    manageSarprasPhp.getDataTableTransaksi("dokter/get-daftar-antrian-rajal?" +
                        "&tglAwal=" + tglAwal +
                        "&tglAkhir=" + tglAkhir
                        // "&norm=" + nocm +
                        // "&noreg=" + noRegistrasi +
                        // "&nama=" + nama
                        ),
                ]).then(function (data) {
                    $scope.isRouteLoading = false;
                    var datas = data[0].data;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i + 1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(datas[i].tgllahir);
                        var umurzz = dateHelper.CountAge(tanggalLahir, tanggal);
                        datas[i].umurzz = umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'
                    }
                    $scope.GridPasien = new kendo.data.DataSource({
                        data: datas,
                        group: $scope.group,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                    var chacePeriode = tglAwal + "~" + tglAkhir;
                    cacheHelper.set('DaftarAntrianDokterRajalCtrl', chacePeriode);
                });
            }
            $scope.klikGrid = function (dataPasienSelected) {
                if (dataPasienSelected != undefined) {
                    $scope.item.pilihDokter = { id: dataPasienSelected.objectpegawaifk, namalengkap: dataPasienSelected.namadokter }
                }
            }


            $scope.group = {
                field: "namaruangan",
                aggregates: [
                    {
                        field: "namaruangan",
                        aggregate: "count"
                    }]
            };
            $scope.aggregate = [
                {
                    field: "namaruangan",
                    aggregate: "count"
                }]
            var onDataBound = function () {
                $('td').each(function () {
                    if ($(this).text() == '-') { $(this).addClass('red') }
                    if ($(this).text() == 'Selesai') { $(this).addClass('green') }

                })
            }
            // $scope.ColumnPasien = [
            $scope.mainGridOptions = {
                scrollable: true,
                dataBound: onDataBound,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "title": "<h3>No</h3>",
                        "width": "40px",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "title": "<h3>Tanggal<br> Registrasi</h3>",
                        "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                        "width": "80px"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "title": "<h3>No. Registrasi</h3>",
                        "width": "80px"
                    },
                    {
                        "field": "nocm",
                        "title": "No. Rekam Medis",
                        "width": "80px",
                        "title": "<h3>No. Rekam<br>Medis</h3>",
                        "width": "80px"
                    },
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "title": "<h3>Nama Pasien</h3>",
                        "width": "100px"
                    },
                    {
                        "field": "umurzz",
                        "title": "Umur",
                        "title": "<h3>Umur</h3>",
                        "width": "100px"
                    },
                    {
                        "field": "namadokter",
                        "title": "Dokter",
                        "width": "100px",
                        "title": "<h3>Dokter</h3>",
                        "width": "100px"
                    },
                    {
                        "field": "jeniskelamin",
                        "title": "Jenis Kelamin",
                        "title": "<h3>Jenis Kelamin</h3>",
                        "width": "100px"
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Tipe Pembayaran",
                        "title": "<h3>Tipe<br> Pembayaran</h3>",
                        "width": "80px"
                    },
                    {
                        "field": "statuspanggil",
                        "title": "Status Panggil",
                        "title": "<h3>Status Panggil</h3>",
                        "width": "80px"
                    },
                    // {
                    //     field: "statusAntrian",
                    //     title: "Status",
                    //     aggregates: ["count"]
                    // }, 
                    {
                        hidden: true,
                        field: "namaruangan",
                        title: "Nama Ruangan",
                        aggregates: ["count"],
                        groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
                    }
                ]
            }

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

            $scope.diagnosaICD10 = function () {
                debugger;
                if ($scope.dataPasienSelected.nocm == null && $scope.dataPasienSelected.norec_apd == null) {
                    window.messageContainer.error("Pilih Dahulu Pasien!")
                    return
                }
                var arrStr = {
                    0: $scope.dataPasienSelected.nocm,
                    1: $scope.dataPasienSelected.namapasien,
                    2: $scope.dataPasienSelected.jeniskelamin,
                    3: $scope.dataPasienSelected.noregistrasi,
                    4: $scope.dataPasienSelected.umurzz,
                    5: $scope.dataPasienSelected.kelompokpasien,
                    6: $scope.dataPasienSelected.tglregistrasi,
                    7: $scope.dataPasienSelected.norec_apd,
                    8: $scope.dataPasienSelected.norec_pd,
                    9: $scope.dataPasienSelected.idkelas,
                    10: $scope.dataPasienSelected.namakelas,
                    11: $scope.dataPasienSelected.objectruanganfk,
                    12: $scope.dataPasienSelected.namaruangan
                }
                cacheHelper.set('DiagnosaDokterCtrl', arrStr);
                $state.go('DiagnosaDokter')
            }
            $scope.diagnosaICD9 = function () {
                // $state.go('RiwayatRegistrasi3', {
                //     nocm: $scope.dataPasienSelected.nocm,
                //     noregistrasi: $scope.dataPasienSelected.noregistrasi
                // });
                if ($scope.dataPasienSelected.nocm == null && $scope.dataPasienSelected.norec_apd == null) {
                    window.messageContainer.error("Pilih Dahulu Pasien!")
                    return
                }
                // debugger;
                var arrStr = {
                    0: $scope.dataPasienSelected.nocm,
                    1: $scope.dataPasienSelected.namapasien,
                    2: $scope.dataPasienSelected.jeniskelamin,
                    3: $scope.dataPasienSelected.noregistrasi,
                    4: $scope.dataPasienSelected.umurzz,
                    5: $scope.dataPasienSelected.kelompokpasien,
                    6: $scope.dataPasienSelected.tglregistrasi,
                    7: $scope.dataPasienSelected.norec_apd,
                    8: $scope.dataPasienSelected.norec_pd,
                    9: $scope.dataPasienSelected.idkelas,
                    10: $scope.dataPasienSelected.namakelas,
                    11: $scope.dataPasienSelected.objectruanganfk,
                    12: $scope.dataPasienSelected.namaruangan
                }
                cacheHelper.set('DiagnosaDokterICD9Ctrl', arrStr);
                $state.go('DiagnosaDokterICD9')
            }
           
            $scope.rekamMedisElektronik = function () {
                if ($scope.dataPasienSelected.nocm == null && $scope.dataPasienSelected.norec_apd == null) {
                    window.messageContainer.error("Pilih Dahulu Pasien!")
                    return
                }
                // debugger;
                var arrStr = {
                    0: $scope.dataPasienSelected.nocm,
                    1: $scope.dataPasienSelected.namapasien,
                    2: $scope.dataPasienSelected.jeniskelamin,
                    3: $scope.dataPasienSelected.noregistrasi,
                    4: $scope.dataPasienSelected.umurzz,
                    5: $scope.dataPasienSelected.kelompokpasien,
                    6: $scope.dataPasienSelected.tglregistrasi,
                    7: $scope.dataPasienSelected.norec_apd,
                    8: $scope.dataPasienSelected.norec_pd,
                    9: $scope.dataPasienSelected.idkelas,
                    10: $scope.dataPasienSelected.namakelas,
                    11: $scope.dataPasienSelected.objectruanganfk,
                    12: $scope.dataPasienSelected.namaruangan + '`'
                }
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedis', {
                    norecAPD: $scope.dataPasienSelected.norec_apd,
                    noRec: $scope.dataPasienSelected.norec_apd
                })

            }

            $scope.findData = function () {
                loadData()
            }

            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
         
            $scope.cetakSEP = function () {
                if ($scope.item != undefined && $scope.item.kelompokPasien !== "Umum/Pribadi") {
                    // var noSep = e.data.data === null ? "2423432" : e.data.data;
                    // var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=1708000087&view=true   
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function (response) {
                        // do something with response
                    });
                }
            }

            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            
        }

    ]);
});