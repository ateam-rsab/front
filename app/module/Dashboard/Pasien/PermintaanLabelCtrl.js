define(['initialize'], function (initialize, pasienServices) {
    'use strict';
    initialize.controller('PermintaanLabelCtrl', ['$q', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper', 'ManageSarprasPhp', 'ManageTataRekening',
        function ($q, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, dateHelper, manageSarprasPhp, manageTataRekening) {
            $scope.isRouteLoading = false;

            // $scope.showDetail = false;
            var currentParams;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {
                from: $scope.now,
                until: $scope.now
            }
            var data2 = [];
            $scope.items = {};
            $scope.batal = function () {
                $scope.from = $scope.until = $scope.now;
                delete $scope.item.noRegistrasi;
            }
            $scope.tombolSimpanVis = true;

            $scope.item.qtyLabel = 0;


            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }

            var tglPermintaan = moment($scope.item.tglPermintaan).format('YYYY-MM-DD HH:mm');
            $scope.date = new Date();
            var tanggals = dateHelper.getDateTimeFormatted($scope.date);

            //Tanggal Default
            $scope.item.tglPermintaan = tanggals;

            manageTataRekening.getDataTableTransaksi("laporan/get-data-combo-laporan", false).then(function (data) {
                // $scope.listRuangan = data.data.ruangan;
                $scope.listPegawai = data.data.pegawai;

            })

            // $scope.ShowHide = function () {
            //     $scope.comboPegawai = $scope.showComboPegawai;

            // }
            $scope.cekPegawai = function (data) {
                $scope.item.pegawai = undefined;
                // debugger;
                if (data === true) {
                    // $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
                    $scope.comboPegawai = true;
                    $scope.textPegawai = true;
                } else
                if (data === false || data === undefined) {
                    $scope.textPegawai = false;
                    $scope.comboPegawai = false;
                } else {
                    return;
                }
            }
            $scope.$watch('model.pegawai', function (data) {
                if (!data) {
                    $scope.textPegawai = false
                    $scope.comboPegawai = false
                } else
                    $scope.cekPegawai(data);
            })
            $scope.tambah = function () {
                if ($scope.item.dataPasien.nocm == undefined) {
                    alert("Cari data pasien dulu")
                    return;
                }
                if ($scope.item.ruangan.objectruanganfk == undefined) {
                    alert("Pilih ruangan dulu")
                    return;
                }

                var nomor = 0
                if ($scope.dataGrid == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var data = {};
                // if ($scope.item.no != undefined){
                //     for (var i = data2.length - 1; i >= 0; i--) {
                //         if (data2[i].no ==  $scope.item.no){
                //             data.no = $scope.item.no

                //             data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
                //             data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
                //             data.generik = null
                //             data.hargajual = String($scope.item.hargaSatuan)
                //             data.jenisobatfk = jRacikan
                //             data.kelasfk = $scope.item.kelas.id
                //             data.stock = String($scope.item.stok)
                //             data.harganetto = String($scope.item.hargaNetto)
                //             data.nostrukterimafk = noTerima
                //             data.ruanganfk = $scope.item.ruangan.id

                //             data.rke = $scope.item.rkep
                //             data.jeniskemasanfk = $scope.item.jenisKemasan.id
                //             data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                //             data.aturanpakaifk = $scope.item.aturanPakai.id
                //             data.aturanpakai = $scope.item.aturanPakai.name
                //             data.routefk = $scope.item.route.id
                //             data.route = $scope.item.route.name
                //             data.asalprodukfk = $scope.item.asal.id
                //             data.asalproduk = $scope.item.asal.asalproduk
                //             data.produkfk = $scope.item.produk.id
                //             data.namaproduk = $scope.item.produk.namaproduk
                //             data.nilaikonversi = $scope.item.nilaiKonversi
                //             data.satuanstandarfk = $scope.item.satuan.ssid
                //             data.satuanstandar = $scope.item.satuan.satuanstandar
                //             data.satuanviewfk = $scope.item.satuan.ssid
                //             data.satuanview = $scope.item.satuan.satuanstandar
                //             data.jmlstok = String($scope.item.stok)
                //             data.jumlah = $scope.item.jumlah
                //             data.dosis = dosis
                //             data.hargasatuan = String($scope.item.hargaSatuan)
                //             data.hargadiscount =String($scope.item.hargadiskon)
                //             data.total = $scope.item.total
                //             data.jmldosis = String(($scope.item.jumlah)/dosis) + '/' + String(dosis)
                //             data.jasa = tarifJasa

                //             data2[i] = data;
                //             $scope.dataGrid = new kendo.data.DataSource({
                //                 data: data2
                //             });
                //             var subTotal = 0 ;
                //             for (var i = data2.length - 1; i >= 0; i--) {
                //                 subTotal=subTotal+ parseFloat(data2[i].total)
                //             }
                //             $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                //         }
                //         // break;
                //     }

                // } else

                // {
                data = {
                    no: nomor,
                    nocm: $scope.item.dataPasien.nocm,
                    // tglregistrasi:moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                    namapasien: $scope.item.dataPasien.namapasien,
                    noregistrasi: $scope.item.noRegis,
                    objectruanganfk: $scope.item.ruangan.id,
                    namaruangan: $scope.item.ruangan.namaruangan,
                    norec_apd: $scope.item.dataPasien.norec_apd,
                    // kelasfk:$scope.item.kelas.id,
                    // stock:String($scope.item.stok),
                    // harganetto:String($scope.item.hargaNetto),
                    // nostrukterimafk:noTerima,
                    // ruanganfk:$scope.item.ruangan.id,//£££
                    // rke:$scope.item.rke,
                    // jeniskemasanfk:$scope.item.jenisKemasan.id,
                    // jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
                    // aturanpakaifk:$scope.item.aturanPakai.id,
                    // aturanpakai:$scope.item.aturanPakai.name,
                    // routefk:$scope.item.route.id,
                    // route:$scope.item.route.name,
                    // asalprodukfk:$scope.item.asal.id,
                    // asalproduk:$scope.item.asal.asalproduk,
                    // produkfk:$scope.item.produk.id,
                    // namaproduk:$scope.item.produk.namaproduk,
                    // nilaikonversi:$scope.item.nilaiKonversi,
                    // satuanstandarfk:$scope.item.satuan.ssid,
                    // satuanstandar:$scope.item.satuan.satuanstandar,
                    // satuanviewfk:$scope.item.satuan.ssid,
                    // satuanview:$scope.item.satuan.satuanstandar,
                    // jmlstok:String($scope.item.stok),
                    // jumlah:$scope.item.jumlah,
                    // dosis:dosis,
                    // hargasatuan:String($scope.item.hargaSatuan),
                    // hargadiscount:String($scope.item.hargadiskon),
                    // total:$scope.item.total,
                    // jmldosis:String(($scope.item.jumlah)/dosis) + '/' + String(dosis),
                    // jasa:tarifJasa
                }
                data2.push(data)
                // $scope.dataGrid.add($scope.dataSelected)
                $scope.dataGrid = new kendo.data.DataSource({
                    data: data2
                });
                // var subTotal = 0 ;
                // for (var i = data2.length - 1; i >= 0; i--) {
                //     subTotal=subTotal+ parseFloat(data2[i].total)
                // }
                // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // }
                // if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
                //     $scope.item.rke = parseFloat($scope.item.rke) + 1
                // }
                // 26  0   t       jasa produksi non steril
                // 27  0   t       jasa pelayanan TPN
                // 28  0   t       jasa pelayanan handling cytotoxic
                // 29  0   t       jasa pelayanan IV Admixture
                // 30  0   t       jasa pelayanan Repacking obat injeksi
                // strStatus= $scope.item.produk.id

                Kosongkan()
                // racikan =''
            }

            $scope.klikGrid = function (dataSelected) {

                $scope.item.no = dataSelected.no
                $scope.item.ruangan = {
                    id: dataSelected.objectruanganfk,
                    namaruangan: dataSelected.namaruangan
                }
                $scope.item.noRegis = dataSelected.noregistrasi
                getPasienByNoreg()

            }
            $scope.hapus = function () {
                if ($scope.item.dataPasien.nocm == undefined) {
                    alert("Cari data pasien dulu")
                    return;
                }
                if ($scope.item.ruangan == undefined) {
                    alert("Pilih ruangan dulu")
                    return;
                }
                // var nomor =0
                // if ($scope.dataGrid == undefined) {
                //     nomor = 1
                // }else{
                //     nomor = data2.length+1
                // }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {

                            //data2[i] = data;
                            // delete data2[i]
                            data2.splice(i, 1);

                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                                data2[i].no = i + 1
                            }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            // }
                            $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                        // break;
                    }

                }
                Kosongkan()
            }

            $scope.simpan = function () {
                if ($scope.item.qtyLabel == undefined) {
                    alert("Jumlah tidak boleh kosong!!")
                    return
                }

                var pegawai = "";
                if ($scope.item.pegawai == undefined) {
                    pegawai = null;
                } else
                    pegawai = $scope.item.pegawai.id;

                var pegawaiManual = "";
                if ($scope.item.namaPengorder == undefined) {
                    pegawaiManual = null;
                } else
                    pegawaiManual = $scope.item.namaPengorder;

                var keterangan = "";
                if ($scope.item.keterangan == undefined) {
                    keterangan = null;
                } else
                    keterangan = $scope.item.keterangan;

                if (data2.length == 0) {
                    alert("Cari Pasien terlebih dahulu!!")
                    return
                }
                var permintaanlabel = {
                    tglpermintaan: moment($scope.item.tglPermintaan).format('YYYY-MM-DD hh:mm:ss'),
                    noregistrasifk: $scope.listRuangan[0].norec_apd, //norec_apd
                    pegawaiorderM: pegawaiManual,
                    pegawaiorderA: pegawai,
                    qtyorder: $scope.item.qtyLabel,
                    keterangan: $scope.item.keterangan,
                    permintaanlabeldetail: data2

                }

                var objSave = {
                    permintaanlabel: permintaanlabel,
                    //   permintaanlabeldetail: data2//$scope.dataGrid._data
                }
                $scope.tombolSimpanVis = false;
                manageSarprasPhp.postOrderLabel(objSave).then(function (e) {
                    $scope.tombolSimpanVis = true;
                    $scope.item.resep = e.data.noresep.norec
                   

                })
                $scope.item = {};
                Kosongkan()
                $scope.dataGrid = {};
                $scope.item.tglPermintaan = tanggals;
            }


            $scope.columnGrid = [{
                    "field": "no",
                    "title": "No",
                    "width": 50
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": 150
                }, {
                    "field": "nocm",
                    "title": "No RM",
                    "width": 150
                }, {
                    "field": "namapasien",
                    "title": "Nama Pasien"
                }, {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": 150
                }

            ];

            function Kosongkan() {
                $scope.item.dataPasien = ''
                $scope.item.ruangan = ''
                $scope.item.noRegis = ''
            }
            $scope.batal = function () {
                $scope.item = {};
                Kosongkan()
                $scope.item.tglPermintaan = tanggals;
                $scope.dataGrid = {};
            }
            // data dummy detil list registrasi
            $scope.listRegistrasiDetil = [];
            $scope.batal();

            $scope.findByRegistrasi = function () {
                $scope.isRouteLoading = true;
                getPasienByNoreg()

            }

            function getPasienByNoreg() {
                var norReg = "";
                if ($scope.item.noRegis != undefined) {
                    norReg = "noReg=" + $scope.item.noRegis;
                } else {
                    alert("No Registrasi tidak boleh kosong!")
                    return;
                }
                manageSarprasPhp.getDataTableTransaksi("orderlabel/get-pasienbynoreg?" +
                    norReg
                ).then(function (e) {
                    $scope.item.dataPasien = e.data.data[0];
                    $scope.item.dataPasien.tgllahir = new Date($scope.item.dataPasien.tgllahir);
                    $scope.listRuangan = e.data.data;
                    $scope.item.ruangan = {
                        // id: $scope.listRuangan[0].objectruanganfk,
                        namaruangan: $scope.listRuangan[0].namaruangan,
                        alamatlengkap: $scope.listRuangan[0].alamatlengkap,
                        namapasien: $scope.listRuangan[0].namapasien,
                        nocm: $scope.listRuangan[0].nocm,
                        norec_apd: $scope.listRuangan[0].norec_apd,
                        noregistrasi: $scope.listRuangan[0].noregistrasi,
                        objectruanganfk: $scope.listRuangan[0].objectruanganfk,
                        tgllahir: $scope.listRuangan[0].tgllahir,
                    }

                    $scope.isRouteLoading = false;
                });
            }

            $scope.findBynoCM = function (noCm) {
                var listRawRequired = [
                    "item.noCm|ng-model|No CM"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    $q.all([findPasien.findByNoCM(noCm),
                        findPasien.getDaftarRegistrasi(noCm, '', '', '')
                    ]).then(function (e) {
                        if (e[0].statResponse) {
                            $scope.item = e[0].data.data;
                            $scope.item.tglLahir = new Date($scope.item.tglLahir);
                            $scope.item.from = $scope.now;
                            $scope.item.until = $scope.now;
                        }
                        if (e[1].statResponse) {
                            $scope.listRegistrasi = new kendo.data.DataSource({
                                data: e[1].data.data,
                                pageable: true,
                                pagesize: 5
                            })
                        }
                        $scope.isRouteLoading = false;
                        $scope.showDetail = false;
                    }, function (err) {
                        messageContainer.error(err);
                        $scope.isRouteLoading = false;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                $scope.cboDiagnosa = false;
                $scope.cboInputDiagnosa = true;
            }


            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }


        }
    ]);
});