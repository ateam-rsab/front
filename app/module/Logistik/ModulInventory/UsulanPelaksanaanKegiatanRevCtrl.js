define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('UsulanPelaksanaanKegiatanRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItemAkuntansi', 'ModelItem', '$window', '$mdDialog', 'ManageServicePhp',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, modelItemAkuntansi, ModelItem, window, $mdDialog, manageServicePhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.showInputObat = true
            $scope.showRacikan = false
            $scope.saveShow = true;
            $scope.item.periodeTahun = $scope.now;
            $scope.item.periodeTahuns = $scope.now;
            $scope.dataAnggaranSelected = {};
            $scope.dataSelected = {};
            $scope.item.saldoRms = 0;
            $scope.item.saldoBlus = 0;
            $scope.item.tglKebutuhan = new Date();
            $scope.item.tglConfirm = new Date();
            var norec_Realisasi = '';
            var norecRR = '';
            var keltrans = '';
            var verifikasifk = '';
            var noOrder = '';
            var norecResep = '';
            var dataProdukDetail = [];
            var data2 = [];
            $scope.treeSourceAnggaran = [];
            var TotTotal = 0
            var TotPpn = 0
            var qty = 0
            var hrgsatuan = 0
            var hargadiskon = 0
            var ppn = 0
            var user = [];
            $scope.selectedData = [];
            let dataUpk = JSON.parse(localStorage.getItem('dataUPK'));

            $scope.dataGridVerifikasi = new kendo.data.DataSource({
                data: [],
                pageSize: 10
            })
            LoadComboAnggaran();

            $scope.findData = function () {
                loadTreeview();
            }

            function LoadComboAnggaran() {
                $scope.item.SaldoBlu = 0;
                $scope.item.SaldoRm = 0;

                manageLogistikPhp.getDataTableTransaksi("upk/get-daftar-combo-anggaran", true).then(function (dat) {
                    var data = dat.data;
                    user = data.user[0];
                    $scope.listHeadSatu = data.headsatu;
                    $scope.listHeadDua = data.headdua;
                    $scope.listHeadTiga = data.headtiga;
                    $scope.listHeadEmpat = data.headempat;
                    $scope.listmataAnggaran = data.mataanggaran;
                    $scope.listPengendali = data.pengendali;
                    $scope.listAsalBarang = data.asalproduk;
                    // $scope.item.pegawaiConfirm = {id:user.id,namalengkap:user.namalengkap};
                });

                manageServicePhp.getDataTableTransaksi("anggaran/get-data-combo").then(function (e) {
                    $scope.listHead = e.data.kelompokhead
                    $scope.listPertama = e.data.kelompokpertama
                    $scope.listKedua = e.data.kelompokkedua
                    $scope.listKetiga = e.data.kelompokketiga
                });

                modelItemAkuntansi.getDataDummyPHP("anggaran/get-kel-keempat-part", true, true, 10).then(function (data) {
                    $scope.listKeempat = data;
                });

                $scope.listRevisiKe = [{
                    "id": 1,
                    "name": "I"
                }, {
                    "id": 2,
                    "name": "II"
                }, {
                    "id": 3,
                    "name": "III"
                }, {
                    "id": 4,
                    "name": "IV"
                }, {
                    "id": 5,
                    "name": "V"
                }];

                $scope.item.revisiKe = $scope.listRevisiKe[2];

                // loadTreeview();
            }

            $scope.GetOtherHead1 = function () {

                if ($scope.item.Pengendali != undefined) {
                    manageLogistikPhp.getDataTableTransaksi("upk/get-daftar-data-master-anggaran?Pengendali=" + $scope.item.Pengendali.id, true).then(function (dat) {
                        var data = dat.data.data;
                        $scope.listmataAnggaran = data;
                        loadTreeview();
                    });
                }
            }

            $scope.GetSaldo = function () {
                if ($scope.item.mataAnggaran != undefined) {

                    $scope.item.SaldoBlu = parseFloat($scope.item.mataAnggaran.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.SaldoRm = parseFloat($scope.item.mataAnggaran.saldoawalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");

                }
            }

            $scope.Info = function () {
                $scope.PopUpAnggaran.center().open();
            }

            $scope.close = function () {
                $scope.PopUpAnggaran.close();
            }

            function init() {
                $scope.isRouteLoading = true;

                if (!dataUpk) {
                    toastr.info('Silahkan pilih data UPK terlebih dahulu!');
                    $state.go('DaftarPengajuanPengadaanBarangPengendaliRev');
                }

                

                $scope.item.noUsulan = dataUpk.nousulan;
                $scope.item.tglUsulan = dataUpk.tglusulan;
                $scope.item.tglDibutuhkan = dataUpk.tglkebutuhan;
                $scope.item.koordinator = dataUpk.koordinator;
                $scope.item.keteranganUsulan = dataUpk.keterangan;
                // $scope.item.ruanganPengusul = dataUpk.ruangan;
                // $scope.item.ruanganTujuan = dataUpk.ruangantujuan;
                $scope.item.penanggungjawab = dataUpk.penanggungjawab;
                norecResep = dataUpk.norec;
                $scope.item.mengetahui = dataUpk.mengetahui;


                // $scope.item.tglConfirm = dataUpk.tglverifikasi;

                $scope.dataGrid = new kendo.data.DataSource({
                    data: dataUpk.details,
                    pageSize: 10,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                tglkebutuhan: {
                                    editable: false
                                },
                                prid: {
                                    editable: false
                                },
                                namaproduk: {
                                    editable: false
                                },
                                spesifikasi: {
                                    editable: false
                                },
                                satuanstandar: {
                                    editable: false
                                },
                                qtyusulan: {
                                    editable: false
                                },
                                qtyupk: {
                                    editable: true
                                },
                                qtyspk: {
                                    editable: false
                                },
                                hargausulan: {
                                    editable: false
                                },
                                hargaupk: {
                                    editable: true
                                },
                                hargaspk: {
                                    editable: false
                                }
                            }
                        }
                    }
                })

                modelItemAkuntansi.getDataDummyPHP("upk/ruangan/get-data-combo-saeutik", true, true, 20).then(function (data) {
                    $scope.listProduk = data;
                })
                modelItemAkuntansi.getDataDummyPHP("upk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function (data) {
                    $scope.listPegawai = data;
                })
                manageLogistikPhp.getDataTableTransaksi("upk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                    $scope.listKoordinator = dat.data.jenisusulan;
                    $scope.item.koordinator = {
                        id: 1,
                        jenisusulan: 'Medis'
                    };
                    $scope.listUnitPengusul = dat.data.ruangan;
                    // $scope.listUnitPengusul = dat.data.ruangan_login;
                    // $scope.item.ruanganPengusul = {id:$scope.listUnitPengusul[0].id,namaruangan:$scope.listUnitPengusul[0].namaruangan};
                    $scope.listUnitTujuan = dat.data.ruangan;
                    // $scope.item.ruanganTujuan = {id:$scope.listUnitTujuan[0].id,namaruangan:$scope.listUnitTujuan[0].namaruangan};
                    // $scope.item.noUsulan = $scope.listUnitPengusul[0].kodeUsulan

                    // $scope.listProduk = dat.data.produk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.item.noOrder = dat.data.noSPPB;

                    $scope.isRouteLoading = false;

                });

                manageLogistikPhp.getDataTableTransaksi("upk/get-detail-usulan-to-upk?norecOrder=" + norecResep, true).then(function (data_ih) {
                    $scope.item.noOrder = data_ih.data.detail.noorder
                    $scope.item.tglUsulan = data_ih.data.detail.tglorder
                    $scope.item.keterangan = data_ih.data.detail.keterangan
                    $scope.item.pegawaiPembuat = {
                        id: data_ih.data.detail.petugasid,
                        namalengkap: data_ih.data.detail.petugas
                    }
                    $scope.item.koordinator = {
                        id: 1,
                        jenisusulan: 'Medis'
                    }
                    $scope.item.tglDibutuhkan = data_ih.data.detail.tglusulan
                    $scope.item.noUsulan = data_ih.data.detail.nousulan
                    $scope.item.namaPengadaan = data_ih.data.detail.namapengadaan
                    $scope.item.noKontrak = data_ih.data.detail.nokontrak
                    $scope.item.tahun = data_ih.data.detail.tahunusulan
                    $scope.item.alamatSupl = data_ih.data.detail.alamat
                    $scope.item.telpSupl = data_ih.data.detail.telp
                    $scope.item.suplier = {
                        id: data_ih.data.detail.namarekananid,
                        namarekanan: data_ih.data.detail.namarekanan
                    }
                    $scope.item.keteranganUsulan = data_ih.data.detail.keterangan
                    $scope.item.nip = data_ih.data.detail.nippns
                    $scope.item.penanggungjawab = {
                        id: data_ih.data.detail.penanggungjawabid,
                        namalengkap: data_ih.data.detail.penanggungjawab
                    }
                    $scope.item.mengetahui = {
                        id: data_ih.data.detail.pegawaimengetahuiid,
                        namalengkap: data_ih.data.detail.pegawaimengetahui
                    }
                    $scope.item.asalproduk = {
                        id: data_ih.data.details[0].asalprodukfk,
                        asalproduk: data_ih.data.details[0].asalproduk
                    }
                    norec_Realisasi = data_ih.data.detail.norecrealisasi;
                    norecRR = data_ih.data.detail.norecrr;
                    keltrans = data_ih.data.detail.keltransaksi;
                    verifikasifk = data_ih.data.detail.objectsrukverifikasifk
                    $scope.item.mataAnggaran = {
                        norec: data_ih.data.detail.mataanggaranid,
                        mataanggaran: data_ih.data.detail.mataanggaran,
                        saldoawalblu: data_ih.data.detail.saldoawalblu,
                        saldoawalrm: data_ih.data.detail.saldoawalrm
                    }
                    $scope.item.SaldoBlu = parseFloat(data_ih.data.detail.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.SaldoRm = parseFloat(data_ih.data.detail.saldoawalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ruanganPengusul = {
                        id: data_ih.data.detail.idunitpengusul,
                        namaruangan: data_ih.data.detail.unitpengusul
                    }
                    $scope.item.ruanganTujuan = {
                        id: data_ih.data.detail.idunittujuan,
                        namaruangan: data_ih.data.detail.unittujuan
                    }
                    $scope.item.Pengendali = {
                        id: data_ih.data.detail.pengendaliid,
                        pengendali: data_ih.data.detail.pengendali
                    }

                    $scope.GetOtherHead1();
                    if (data_ih.data.detail.idpegpengendali != undefined || data_ih.data.detail.idpegpengendali != null) {
                        $scope.item.pegawaiConfirm = {
                            id: data_ih.data.detail.idpegpengendali,
                            namalengkap: data_ih.data.detail.namapengendali
                        }
                    } else {
                        $scope.item.pegawaiConfirm = {
                            id: user.id,
                            namalengkap: user.namalengkap
                        };
                    }
                    data2 = data_ih.data.details
                    loadTreeview();
                    // $scope.item.ruanganPenerima = {id:data_ih.data.detailterima.id,namaruangan:data_ih.data.detailterima.namaruangan} 
                    // $scope.item.pegawaiPenerima = {id:data_ih.data.detailterima.pgid,namalengkap:data_ih.data.detailterima.namalengkap} 
                    // $scope.item.tglFaktur = data_ih.data.detailterima.tglfaktur
                    // $scope.item.noFaktur = data_ih.data.detailterima.nofaktur
                    // $scope.item.namaRekanan = {id:data_ih.data.detailterima.objectrekananfk,namarekanan:data_ih.data.detailterima.namarekanan} 

                    // $scope.item.ruangan = {id:data_ih.data.detailresep.id,namaruangan:data_ih.data.detailresep.namaruangan}
                    // $scope.item.penulisResep = {id:data_ih.data.detailresep.pgid,namalengkap:data_ih.data.detailresep.namalengkap}
                    // $scope.item.nocm = data_ih.data.detailresep.nocm
                    // $scope.item.namapasien = data_ih.data.detailresep.nama
                    // $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                    // $scope.item.noTelepon = data_ih.data.detailresep.notlp
                    // $scope.item.alamat = data_ih.data.detailresep.alamat

                    // data2 = data_ih.data.details
                    // $scope.dataGrid = new kendo.data.DataSource({
                    //     data: data2
                    // });

                    var subTotal = 0;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal = subTotal + parseFloat(data2[i].hargasatuan * data2[i].jumlah)
                    }
                    $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.totalPpn = 0 //(parseFloat(subTotal*10)/100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.totalIniLoh = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") //parseFloat(subTotal+((subTotal*10)/100)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.terbilang = terbilang(parseFloat(subTotal))
                    TotTotal = parseFloat(subTotal)
                    // item.totalPpn
                    // item.totalIniLoh
                    // item.totalSubTotal
                });

            }

            init();
            $scope.getKodeUsulan = function () {
                $scope.item.noUsulan = $scope.item.ruanganPengusul.kodeUsulan
            }
            $scope.getNip_pns = function () {
                $scope.item.nip = $scope.item.mengetahui.nip_pns
            }
            $scope.getSatuan = function () {
                GETKONVERSI(0)
            }

            function GETKONVERSI(jml) {
                if ($scope.item.produk == undefined) {
                    return
                }
                if ($scope.item.produk == "") {
                    return
                }
                $scope.listSatuan = $scope.item.produk.konversisatuan
                if ($scope.listSatuan.length == 0) {
                    $scope.listSatuan = ([{
                        ssid: $scope.item.produk.ssid,
                        satuanstandar: $scope.item.produk.satuanstandar
                    }])
                }
                $scope.item.satuan = {
                    ssid: $scope.item.produk.ssid,
                    satuanstandar: $scope.item.produk.satuanstandar
                }
                $scope.item.nilaiKonversi = 1
                // $scope.item.jumlah=0
                // $scope.item.hargaSatuan=0
                $scope.item.disc = 0
                $scope.item.ppn = 0
                // $scope.item.total = 0

                // manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                //     "produkfk="+ $scope.item.produk.id +
                //     "&ruanganfk=50" , true).then(function(dat){
                //         dataProdukDetail =dat.data.detail;
                //         $scope.item.hargaSatuan =0
                //         $scope.item.hargadiskon =0
                //         $scope.item.hargaNetto=0
                //         $scope.item.total =0
                //         $scope.item.hargaSatuan = dat.data.detail[0].hargajual
                // });
            }
            $scope.getNilaiKonversi = function () {
                $scope.item.nilaiKonversi = $scope.item.satuan.nilaikonversi
            }

            $scope.$watch('item.mataAnggaran', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.mataAnggaran != undefined) {
                        $scope.item.SaldoBlu = parseFloat($scope.item.mataAnggaran.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                        $scope.item.SaldoRm = parseFloat($scope.item.mataAnggaran.saldoawalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    }
                }
            });


            $scope.$watch('item.nilaiKonversi', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        $scope.item.stok = parseFloat($scope.item.stok) * (parseFloat(oldValue) / parseFloat(newValue))
                        $scope.item.jumlah = 0 //parseFloat($scope.item.jumlah) / parseFloat(newValue)
                        $scope.item.hargaSatuan = 0 //hrg1 * parseFloat(newValue)
                        $scope.item.hargadiskon = 0 //hrgsdk * parseFloat(newValue)
                        $scope.item.total = 0 // parseFloat(newValue) * 
                        // (hrg1-hrgsdk)
                    }
                }
            });
            $scope.$watch('item.suplier', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.alamatSupl = $scope.item.suplier.alamatlengkap
                    $scope.item.telpSupl = 'Telp. ' + $scope.item.suplier.telepon + ' Fax. ' + $scope.item.suplier.faksimile
                }
            });
            $scope.$watch('item.jumlah', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.QtyKonfirmasi', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.QtyKonfirmasi)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.hargaSatuan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.disc', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    // hrg1 = parseFloat($scope.item.hargaSatuan)
                    // hrgsdk = (hrg1 * parseFloat($scope.item.disc))/100
                    // hrgPpn = ((hrg1-hrgsdk) * parseFloat($scope.item.ppn))/100
                    // $scope.item.subTotal = parseFloat($scope.item.jumlah) * ((hrg1-hrgsdk)+hrgPpn)

                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.ppn', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.ppnpersen', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.ppn = (parseFloat($scope.item.ppnpersen) * parseFloat($scope.item.hargaSatuan)) / 100
                }
            });

            $scope.$watch('item.hargaDiskonPersen', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.hargaDiskon = (parseFloat($scope.item.hargaDiskonPersen) * parseFloat($scope.item.hargaSatuan)) / 100
                }
            });

            $scope.$watch('item.namaMataAnggaran', function (newValue, oldValue) {
                var layananFilter = [];
                var txtnaonwelah = '';
                // debugger

                for (var z = $scope.treeSourceAnggaran[0].length - 1; z >= 0; z--) {
                    txtnaonwelah = ' ' + $scope.treeSourceAnggaran[0][z].desc;
                    txtnaonwelah = txtnaonwelah.toUpperCase()
                    if (txtnaonwelah != null) {
                        if (parseFloat(txtnaonwelah.indexOf($scope.item.namaMataAnggaran.toUpperCase())) > 0) {
                            layananFilter.push($scope.treeSourceAnggaran[0][z])
                        }
                    }
                }
                if ($scope.item.namaMataAnggaran == '') {
                    for (var i = 0; i < $scope.treeSourceAnggaran[0].length; i++) {
                        $scope.treeSourceAnggaran[0][i].no = i + 1
                    }
                    layananFilter = $scope.treeSourceAnggaran[0]
                }
                $scope.dataSourceAnggaran = new kendo.data.DataSource({
                    data: layananFilter,
                    // pageSize: 20,
                    group: [],
                });

            })

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            // $scope.tambah = function () {
            //     var qtyawal = 0;
            //     var qtyconfirm = 0;
            //     qtyawal = parseFloat($scope.item.jumlah);
            //     qtyconfirm = parseFloat($scope.item.QtyKonfirmasi)
            //     if (qtyconfirm > qtyawal) {
            //         alert("Qty konifrmasi lebih besar dari Qty yang diajukan")
            //         return;
            //     }
            //     if ($scope.item.jumlah == 0) {
            //         alert("Jumlah harus di isi!")
            //         return;
            //     }
            //     // if ($scope.item.total == 0) {
            //     //     alert("Stok tidak ada harus di isi!")
            //     //     return;
            //     // }
            //     // if ($scope.item.jenisKemasan == undefined) {
            //     //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
            //     //     return;
            //     // }
            //     // if (noTerima == '') {
            //     //     $scope.item.jumlah = 0
            //     //     alert("Jumlah blm di isi!!")
            //     //     return;
            //     // }
            //     var spesifikasi = "-";
            //     if ($scope.item.spesifikasi != undefined) {
            //         spesifikasi = $scope.item.spesifikasi;
            //     }
            //     if ($scope.item.produk == undefined) {
            //         alert("Pilih Produk terlebih dahulu!!")
            //         return;
            //     }
            //     if ($scope.item.satuan == undefined) {
            //         alert("Pilih Satuan terlebih dahulu!!")
            //         return;
            //     }
            //     var nomor = 0
            //     if ($scope.dataGrid == undefined) {
            //         nomor = 1
            //     } else {
            //         nomor = data2.length + 1
            //     }
            //     var data = {};
            //     if ($scope.item.no != undefined) {
            //         for (var i = data2.length - 1; i >= 0; i--) {
            //             if (data2[i].no == $scope.item.no) {
            //                 data.no = $scope.item.no

            //                 // data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
            //                 // data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
            //                 // data.generik = null
            //                 data.hargajual = null
            //                 data.jenisobatfk = null
            //                 // data.kelasfk = $scope.item.kelas.id
            //                 data.stock = null
            //                 data.harganetto = null
            //                 data.nostrukterimafk = null
            //                 data.ruanganfk = null

            //                 // data.rke = $scope.item.rke
            //                 // data.jeniskemasanfk = $scope.item.jenisKemasan.id
            //                 // data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
            //                 // data.aturanpakaifk = $scope.item.aturanPakai.id
            //                 // data.aturanpakai = $scope.item.aturanPakai.name
            //                 // data.routefk = $scope.item.route.id
            //                 // data.route = $scope.item.route.name
            //                 data.asalprodukfk = null
            //                 data.asalproduk = null
            //                 data.produkfk = $scope.item.produk.id
            //                 data.namaproduk = $scope.item.produk.namaproduk
            //                 data.nilaikonversi = $scope.item.nilaiKonversi
            //                 data.satuanstandarfk = $scope.item.satuan.ssid
            //                 data.satuanstandar = $scope.item.satuan.satuanstandar
            //                 data.satuanviewfk = $scope.item.satuan.ssid
            //                 data.satuanview = $scope.item.satuan.satuanstandar
            //                 data.jmlstok = null
            //                 data.jumlah = parseFloat($scope.item.jumlah)
            //                 data.qtyprodukkonfirmasi = parseFloat($scope.item.QtyKonfirmasi)
            //                 data.hargasatuan = data2[i].hargasatuan
            //                 data.hargadiscount = String($scope.item.hargaDiskon)
            //                 data.hargasatuanquo = String($scope.item.hargaSatuan)
            //                 data.hargappnquo = String($scope.item.ppn)
            //                 data.ppn = String($scope.item.ppn)
            //                 data.total = data2[i].total //$scope.item.subTotal
            //                 data.totalkonfirmasi = $scope.item.subTotal
            //                 data.tglkebutuhan = $scope.item.tglKebutuhan
            //                 data.kdproduk = $scope.item.produk.kdproduk
            //                 data.spesifikasi = spesifikasi
            //                 data.norec_op = data2[i].norec_op

            //                 data2[i] = data;
            //                 $scope.dataGrid = new kendo.data.DataSource({
            //                     data: data2
            //                 });
            //                 var subTotal = 0;
            //                 var ppn = 0;
            //                 var diskon = 0;
            //                 var TotalAll = 0;
            //                 for (var i = data2.length - 1; i >= 0; i--) {
            //                     subTotal = subTotal + (parseFloat(data2[i].jumlah) * parseFloat(data2[i].hargasatuan))
            //                     ppn = ppn + (parseFloat(data2[i].jumlah) * parseFloat(data2[i].ppn))
            //                     diskon = diskon + (parseFloat(data2[i].jumlah) * parseFloat(data2[i].hargadiscount))
            //                 }
            //                 $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            //                 $scope.item.totalPpn = parseFloat(ppn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            //                 TotalAll = subTotal + ppn - diskon;
            //                 $scope.item.totalIniLoh = parseFloat(TotalAll).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            //                 $scope.item.terbilang = terbilang(parseFloat(TotalAll))
            //                 TotTotal = parseFloat(subTotal)
            //                 TotPpn = parseFloat(TotalAll)
            //             }
            //             // break;
            //         }

            //     } else {
            //         data = {
            //             no: nomor,
            //             // noregistrasifk:norec_apd,//$scope.item.noRegistrasi,
            //             // tglregistrasi:moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
            //             // generik:null,
            //             hargajual: null,
            //             jenisobatfk: null,
            //             // kelasfk:$scope.item.kelas.id,
            //             stock: null,
            //             harganetto: null,
            //             nostrukterimafk: null,
            //             ruanganfk: null, //£££
            //             // rke:$scope.item.rke,
            //             // jeniskemasanfk:$scope.item.jenisKemasan.id,
            //             // jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
            //             // aturanpakaifk:$scope.item.aturanPakai.id,
            //             // aturanpakai:$scope.item.aturanPakai.name,
            //             // routefk:$scope.item.route.id,
            //             // route:$scope.item.route.name,
            //             asalprodukfk: null,
            //             asalproduk: null,
            //             produkfk: $scope.item.produk.id,
            //             namaproduk: $scope.item.produk.namaproduk,
            //             nilaikonversi: $scope.item.nilaiKonversi,
            //             satuanstandarfk: $scope.item.satuan.ssid,
            //             satuanstandar: $scope.item.satuan.satuanstandar,
            //             satuanviewfk: $scope.item.satuan.ssid,
            //             satuanview: $scope.item.satuan.satuanstandar,
            //             jmlstok: null,
            //             jumlah: parseFloat($scope.item.jumlah),
            //             qtyprodukkonfirmasi: parseFloat($scope.item.QtyKonfirmasi),
            //             hargasatuan: data2[i].hargasatuan,
            //             hargadiscount: String($scope.item.hargaDiskon),
            //             hargasatuanquo: String($scope.item.hargaSatuan),
            //             hargappnquo: String($scope.item.ppn),
            //             ppn: String($scope.item.ppn),
            //             total: data2[i].total,
            //             totalkonfirmasi: $scope.item.subTotal,
            //             tglkebutuhan: $scope.item.tglKebutuhan,
            //             kdproduk: $scope.item.produk.kdproduk,
            //             spesifikasi: spesifikasi,
            //             norec_op: null
            //         }
            //         data2.push(data)

            //         $scope.dataGrid = new kendo.data.DataSource({
            //             data: data2
            //         });
            //         var subTotal = 0;
            //         var ppn = 0;
            //         var diskon = 0;
            //         var TotalAll = 0;
            //         for (var i = data2.length - 1; i >= 0; i--) {
            //             subTotal = subTotal + (parseFloat(data2[i].jumlah) * parseFloat(data2[i].hargasatuan))
            //             ppn = ppn + (parseFloat(data2[i].jumlah) * parseFloat(data2[i].ppn))
            //             diskon = diskon + (parseFloat(data2[i].jumlah) * parseFloat(data2[i].hargadiscount))
            //         }
            //         $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            //         $scope.item.totalPpn = parseFloat(ppn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            //         TotalAll = subTotal + ppn - diskon;
            //         $scope.item.totalIniLoh = parseFloat(TotalAll).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            //         $scope.item.terbilang = terbilang(parseFloat(TotalAll))
            //         TotTotal = parseFloat(subTotal)
            //         TotPpn = parseFloat(TotalAll)
            //     }
            //     // if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
            //     //     $scope.item.rke = parseFloat($scope.item.rke) + 1
            //     // }
            //     Kosongkan()
            //     racikan = ''
            // }

            $scope.klikGrid1 = function (dataAnggaranSelected) {
                if (dataAnggaranSelected != undefined) {
                    $scope.item.mataAnggaran = {
                        norec: dataAnggaranSelected.norec,
                        mataanggaran: dataAnggaranSelected.desc,
                        saldoawalblu: dataAnggaranSelected.totalblu,
                        saldoawalrm: dataAnggaranSelected.totalrm
                    }
                    $scope.item.SaldoBlu = parseFloat(dataAnggaranSelected.totalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.SaldoRm = parseFloat(dataAnggaranSelected.totalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                }
            }

            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
                //no:no,
                $scope.item.no = dataSelected.no
                // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                //     if ($scope.listProduk[i].id == dataSelected.produkfk){
                //         dataProduk = $scope.listProduk[i]
                //         break;
                //     }
                // }
                manageLogistikPhp.getDataTableTransaksi("upk/ruangan/get-data-combo-saeutik?namaproduk=" + dataSelected.namaproduk, true, true, 20).then(function (data) {
                    $scope.listProduk.add(data.data[0])
                    $scope.item.produk = data.data[0];

                    $scope.item.jumlah = 0
                    GETKONVERSI(dataSelected.jumlah)
                    $scope.item.nilaiKonversi = dataSelected.nilaikonversi
                    $scope.item.satuan = {
                        ssid: dataSelected.satuanstandarfk,
                        satuanstandar: dataSelected.satuanstandar
                    }
                    $scope.item.QtyKonfirmasi = dataSelected.qtyprodukkonfirmasi
                    $scope.item.jumlah = dataSelected.jumlah
                    $scope.item.hargaSatuan = dataSelected.hargasatuan
                    // $scope.item.disc = dataSelected.hargadiscount
                    // $scope.item.ppn = dataSelected.ppn
                    $scope.item.hargaDiskon = dataSelected.hargadiscount
                    if ($scope.item.hargaDiskon != 0) {
                        $scope.item.hargaDiskonPersen = parseFloat(dataSelected.hargasatuan) / parseFloat(dataSelected.hargadiscount);
                    } else {
                        $scope.item.hargaDiskonPersen = 0;
                    }
                    if ($scope.item.ppn != 0) {
                        $scope.item.persenppn = parseFloat(dataSelected.hargasatuan) / parseFloat(dataSelected.ppn)
                    } else {
                        $scope.item.ppn = 0
                    }
                    $scope.item.subTotal = dataSelected.total
                    $scope.item.tglKebutuhan = dataSelected.tglkebutuhan
                    $scope.item.spesifikasi = dataSelected.spesifikasi
                    $scope.disableKdProduk = true;
                    $scope.disableNamaProduk = true;
                    $scope.disableSatuan = true;
                    $scope.disableSubtot = true;

                })

            }

            function Kosongkan() {
                $scope.item.produk = ''
                $scope.item.spesifikasi = ''
                $scope.item.asal = ''
                $scope.item.satuan = ''
                $scope.item.nilaiKonversi = 0
                $scope.item.stok = 0
                $scope.item.jumlah = 0
                $scope.item.hargadiskon = 0
                $scope.item.no = undefined
                $scope.item.total = 0
                $scope.item.hargaSatuan = 0
                $scope.item.ppn = 0
                $scope.item.disc = 0
                $scope.item.QtyKonfirmasi = 0
            }
            $scope.batal = function () {
                Kosongkan()
            }

            $scope.columnGrid = [
                // {
                //     "template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
                //     "width": "20px",
                // },
                {
                    "field": "tglkebutuhan",
                    "title": "Tanggal Kebutuhan",
                    "width": "50px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>",
                    "editable": false
                },
                {
                    "field": "prid",
                    "title": "Kode Produk",
                    "width": "40px",
                    "editable": false
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width": "90px",
                    "editable": false
                },
                {
                    "field": "spesifikasi",
                    "title": "Spesifikasi",
                    "width": "100px",
                    "editable": false
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan",
                    "width": "30px",
                    "editable": false
                },
                {
                    "field": "qtyusulan",
                    "title": "Qty Usulan",
                    "width": "30px",
                    "editable": false
                },
                {
                    "field": "qtyupk",
                    "title": "Qty UPK",
                    "width": "30px",
                    editable: true
                },
                {
                    "field": "qtyspk",
                    "title": "Qty SPK",
                    "width": "30px",
                    "editable": false
                },
                {
                    "field": "hargausulan",
                    "title": "Harga Usulan",
                    "width": "30px",
                    "editable": false
                },
                {
                    "field": "hargaupk",
                    "title": "Harga UPK",
                    "width": "30px",
                    "editable": true
                },
                {
                    "field": "hargaspk",
                    "title": "Harga SPK",
                    "width": "30px",
                    "editable": false
                },
                // {
                //     "field": "total",
                //     "title": "Total",
                //     "width": "50px",
                //     "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                // },
                // {
                //     "field": "hargasatuanquo",
                //     "title": "Harga Konfirmasi",
                //     "width": "40px",
                //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
                // },
                // {
                //     "field": "hargappnquo",
                //     "title": "ppn Konfirmasi",
                //     "width": "40px",
                //     "template": "<span class='style-right'>{{formatRupiah('#: hargappnquo #', '')}}</span>"
                // },
                // {
                //     "field": "hargadiscountquo",
                //     "title": "Diskon Konfirmasi",
                //     "width": "40px",
                //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscountquo #', '')}}</span>"
                // },
                // {
                //     "field": "totalkonfirmasi",
                //     "title": "Total Confirm",
                //     "width": "50px",
                //     "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                // }
            ];

            $scope.onClick = function (e) {
                var element = $(e.currentTarget);

                var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#kGrid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                // $scope.selectedData[dataItem.noRec] = checked;
                if (checked) {
                    var result = $.grep($scope.selectedData, function (e) {
                        return e.norec == dataItem.norec;
                    });
                    if (result.length == 0) {
                        $scope.selectedData.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].norec === dataItem.norec) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                        $scope.selectedData.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedData.length; i++)
                        if ($scope.selectedData[i].norec === dataItem.norec) {
                            $scope.selectedData.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }

            $scope.gridOptUpkVerified = {
                filterable: false,
                sortable: true,
                autoBind: true,
                navigatable: true,
                pageable: true,
                editable: {
                    mode: 'inline'
                },
                columns: $scope.columnGrid
            }

            $scope.addCheckedUpk = () => {

                $scope.selectedData.forEach(el => {
                    // dataTemp.push(el);
                    $scope.dataGridVerifikasi.add(el);
                });

            }

            $scope.addUpk = () => {
                $scope.pupupAdd.open().center();
            }

            $scope.closePopup = () => {
                $scope.pupupAdd.close();
            }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }
            $scope.kembali = function () {
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.simpan = function () {
                let dataBarangUsulan = [];

                $scope.dataGrid._data.forEach((el, i) => {
                    dataBarangUsulan.push({
                        no: i + 1,
                        hargaupk: parseInt(el.hargaupk),
                        norecitem: el.norecitem,
                        qtyprodukkonfirmasi: parseInt(el.qtyupk),
                        // hargaupk: el.hargaupk
                    })
                });

                console.log(dataBarangUsulan);

                if ($scope.item.koordinator == undefined) {
                    alert("Pilih Koordinator!")
                    return
                }
                if ($scope.item.penanggungjawab == undefined) {
                    alert("Pilih Pegawai penanggung jawab!")
                    return
                }
                if ($scope.item.mengetahui == undefined) {
                    alert("Pilih Pegawai yang mengetahui!")
                    return
                }
                if ($scope.item.pegawaiConfirm == undefined) {
                    alert("Pilih Pegawai yang Mengkonfirmasi UPK!")
                    return
                }

                if ($scope.item.ruanganTujuan == undefined) {
                    alert("Pilih ruangan tujuan!!")
                    return
                }
                if ($scope.item.ruanganPengusul == undefined) {
                    alert("Pilih Unit Pengusul!")
                    return
                }
                if ($scope.item.keteranganUsulan == undefined) {
                    alert("Isi Jenis Usulan!")
                    return
                }
                if ($scope.item.tglUsulan == undefined) {
                    alert("Pilih Tgl Usulan!")
                    return
                }
                if ($scope.item.tglDibutuhkan == undefined) {
                    alert("Isi tgl Dibutuhkan!")
                    return
                }
                if ($scope.item.asalproduk == undefined) {
                    alert("Pilih Sumber Dana!")
                    return
                }
                if ($scope.item.mataAnggaran == undefined) {
                    alert("Pilih Mata Anggaran!")
                    return
                }
                var strAlamat = '';
                if ($scope.item.alamatSupl != undefined) {
                    strAlamat = $scope.item.alamatSupl
                }
                var qtyHari = 0;
                if ($scope.item.jmlHari != undefined) {
                    qtyHari = $scope.item.jmlHari
                }
                if (dataBarangUsulan.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                }
                var mataanggaran = '';
                if ($scope.item.mataAnggaran != undefined) {
                    mataanggaran = $scope.item.mataAnggaran.norec
                }

                var strukorder = {
                    keteranganorder: $scope.item.keteranganUsulan,
                    qtyjenisproduk: dataBarangUsulan.length,
                    tglUsulan: moment($scope.item.tglUsulan).format('YYYY-MM-DD HH:mm:ss'),
                    tglDibutuhkan: moment($scope.item.tglDibutuhkan).format('YYYY-MM-DD HH:mm:ss'),
                    koordinator: $scope.item.koordinator.jenisusulan,
                    nousulan: $scope.item.noUsulan,
                    ruanganfkPengusul: $scope.item.ruanganPengusul.id,
                    ruanganfkTujuan: $scope.item.ruanganTujuan.id,
                    penanggungjawabfk: $scope.item.penanggungjawab.id,
                    mengetahuifk: $scope.item.mengetahui.id,
                    // nipPns: $scope.item.nip,
                    // total: TotTotal,
                    norec: norecResep,
                    // ppn: TotPpn,
                    norecrealisasi: norec_Realisasi,
                    norecriwayatrealisasi: norecRR,
                    objectkelompoktransaksifk: keltrans,
                    objectsrukverifikasifk: verifikasifk,
                    objectmataanggaranfk: mataanggaran,
                    asalproduk: $scope.item.asalproduk.id,
                }
                var strukverifikasi = {
                    tglconfirm: moment($scope.item.tglConfirm).format('YYYY-MM-DD HH:mm:ss'),
                    objectpegawaipjawabfk: $scope.item.pegawaiConfirm.id,
                    objectruanganfk: $scope.item.ruanganTujuan.id
                }

                var objSave = {
                    strukorder: strukorder,
                    strukverifikasi: strukverifikasi,
                    details: dataBarangUsulan
                }

                console.log(objSave);

                // manageLogistikPhp.postUsulanPelaksanaanKegiatan(objSave).then(function(e) {
                manageLogistikPhp.saveDataProduk2(objSave, "upk/ruangan/save-usulan-upk").then(function (e) {
                    $scope.item.noKirim = e.data.nokirim
                    var stt = 'false'
                    if (confirm('View Cetak UPK? ')) {
                        // Save it!
                        stt = 'true';
                    } else {
                        // Do nothing!
                        stt = 'false'
                    }
                    var client = new HttpClient();
                    //client.get('http://127.0.0.1:1237/printvb/printvb/logistik?cetak-SPPB=1&nores='+e.data.nokirim+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpelaksanaankegiatan=1&norec=' + e.data.nokirim + '&view=true', function (response) {
                        //aadc=response;
                    });
                    // $state.go('DaftarUsulanPermintaanBarang');
                    window.history.back();
                    $scope.saveShow = false;
                    Kosongkan();
                })

                // $state.go("TransaksiPelayananApotik")

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
            $scope.BatalR = function () {
                $scope.showInputObat = true
                $scope.showRacikan = false
                $scope.item.jenisKemasan = ''

                racikan = ''
            }

            // $scope.hapus = function () {
            //     if ($scope.item.jumlah == 0) {
            //         alert("Jumlah harus di isi!")
            //         return;
            //     }
            //     if ($scope.item.total == 0) {
            //         alert("Stok tidak ada harus di isi!")
            //         return;
            //     }
            //     // if ($scope.item.jenisKemasan == undefined) {
            //     //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
            //     //     return;
            //     // }
            //     // if ($scope.item.asal == undefined) {
            //     //     alert("Pilih Asal Produk terlebih dahulu!!")
            //     //     return;
            //     // }
            //     if ($scope.item.produk == undefined) {
            //         alert("Pilih Produk terlebih dahulu!!")
            //         return;
            //     }
            //     if ($scope.item.satuan == undefined) {
            //         alert("Pilih Satuan terlebih dahulu!!")
            //         return;
            //     }

            //     var data = {};
            //     if ($scope.item.no != undefined) {
            //         for (var i = data2.length - 1; i >= 0; i--) {
            //             if (data2[i].no == $scope.item.no) {

            //                 //data2[i] = data;
            //                 // delete data2[i]
            //                 data2.splice(i, 1);

            //                 var subTotal = 0;
            //                 for (var i = data2.length - 1; i >= 0; i--) {
            //                     subTotal = subTotal + parseFloat(data2[i].total)
            //                     data2[i].no = i + 1
            //                 }
            //                 // data2.length = data2.length -1
            //                 $scope.dataGrid = new kendo.data.DataSource({
            //                     data: data2
            //                 });
            //                 // for (var i = data2.length - 1; i >= 0; i--) {
            //                 //     subTotal=subTotal+ parseFloat(data2[i].total)
            //                 // }
            //                 $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

            //             }
            //             // break;
            //         }

            //     }
            //     Kosongkan()
            // }

            function terbilang(bilangan) {

                bilangan = String(bilangan);
                var angka = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
                var kata = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
                var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');

                var panjang_bilangan = bilangan.length;

                /* pengujian panjang bilangan */
                if (panjang_bilangan > 15) {
                    kaLimat = "Diluar Batas";
                    return kaLimat;
                }

                /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
                var i = 0
                var j = 0

                for (i = 1; i <= panjang_bilangan; i++) {
                    angka[i] = bilangan.substr(-(i), 1);
                }

                i = 1;
                j = 0;
                var kaLimat = "";
                var subkaLimat = "";
                kaLimat = "";


                /* mulai proses iterasi terhadap array angka */
                while (i <= panjang_bilangan) {

                    subkaLimat = "";
                    var kata1 = "";
                    var kata2 = "";
                    var kata3 = "";

                    /* untuk Ratusan */
                    if (angka[i + 2] != "0") {
                        if (angka[i + 2] == "1") {
                            kata1 = "Seratus";
                        } else {
                            kata1 = kata[angka[i + 2]] + " Ratus";
                        }
                    }

                    /* untuk Puluhan atau Belasan */
                    if (angka[i + 1] != "0") {
                        if (angka[i + 1] == "1") {
                            if (angka[i] == "0") {
                                kata2 = "Sepuluh";
                            } else if (angka[i] == "1") {
                                kata2 = "Sebelas";
                            } else {
                                kata2 = kata[angka[i]] + " Belas";
                            }
                        } else {
                            kata2 = kata[angka[i + 1]] + " Puluh";
                        }
                    }

                    /* untuk Satuan */
                    if (angka[i] != "0") {
                        if (angka[i + 1] != "1") {
                            kata3 = kata[angka[i]];
                        }
                    }

                    /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
                    if ((angka[i] != "0") || (angka[i + 1] != "0") || (angka[i + 2] != "0")) {
                        subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
                    }

                    /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
                    kaLimat = subkaLimat + kaLimat;
                    i = i + 3;
                    j = j + 1;

                }

                /* mengganti Satu Ribu jadi Seribu jika diperlukan */
                if ((angka[5] == "0") && (angka[6] == "0")) {
                    kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
                }

                return kaLimat + "Rupiah";
            }

            function loadTreeview() {
                $scope.isRouteLoading = true;
                let tahunAnggaran = $scope.item.periodeTahun ? "tahun=" + moment($scope.item.periodeTahun).format('YYYY') : "";
                let revisiKe = $scope.item.revisiKe ? "&revisike=" + $scope.item.revisiKe.name : "";

                var turunanPertama = $scope.item.turunanPertama ? "&childPertama=" + $scope.item.turunanPertama.id : ""

                var turunanKedua = $scope.item.turunanKedua ? "&childKedua=" + $scope.item.turunanKedua.id : "";

                var turunanKetiga = $scope.item.turunanKetiga ? "&childKetiga=" + $scope.item.turunanKetiga.id : "";

                var turunanKeempat = $scope.item.turunanKeempat ? "&childKeempat=" + $scope.item.turunanKeempat.id : "";

                var childTerakhir = $scope.item.childTerakhir ? "&childMataAnggaran=" + $scope.item.childTerakhir : "";

                var Pengendali = $scope.item.Pengendali ? "&Pengendali=" + $scope.item.Pengendali.id : "";

                manageServicePhp.getDataTableTransaksi("anggaran/get-daftar-mataanggaran-upk?" +
                    tahunAnggaran +
                    revisiKe +
                    turunanPertama +
                    turunanKedua +
                    turunanKetiga +
                    turunanKeempat +
                    childTerakhir +
                    Pengendali, true).then(function (dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        dat.data.data[i].no = i + 1
                    }
                    $scope.isRouteLoading = false;
                    if (dat.data.data.length == 0) {
                        $scope.totalRM = 0
                        $scope.totalBLU = 0
                        toastr.error('Data tidak ada', 'Informasi');
                    }
                    $scope.totalRM = dat.data.data[0].totalrm
                    $scope.totalBLU = dat.data.data[0].totalblu

                    $scope.dataSourceAnggaran = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageable: false,
                        pagesize: 10,

                    })

                    $scope.treeSourceAnggaran.push(dat.data.data);
                });
            }


            $scope.monthSelectorOptions = function () {
                return {
                    start: "year",
                    depth: "year"
                }
            }

            $scope.columnAnggaran = {
                dataSource: $scope.dataSourceAnggaran,
                pageable: false,
                selectable: "row",
                columns: [{
                        "field": "no",
                        "title": "No. ",
                        "template": "<span class='style-center'>#: no #</span>",
                        "width": "15px"
                    },
                    {
                        "field": "kd",
                        "title": "Kode",
                        "width": "80px",
                        "template": "<span style='font-weight: bold;'>#: kd #</span>",
                    },
                    {
                        "field": "desc",
                        "title": "Mata Anggaran",
                        "width": "200px"
                    },
                    {
                        "field": "totalrm",
                        "title": "Saldo Awal RM",
                        "width": "80px",
                        "template": "<span class='style-right'>{{formatRupiah('#: totalrm #', 'Rp.')}}</span>"
                    },
                    {
                        "field": "totalblu",
                        "title": "Saldo Awal BLU",
                        "width": "80px",
                        "template": "<span class='style-right'>{{formatRupiah('#: totalblu #', 'Rp.')}}</span>"
                    }
                ]
            }
            //***********************************

        }
    ]);
});