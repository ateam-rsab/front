define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PembelianBarangLangsungCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, modelItemAkuntansi, $mdDialog) {
            $scope.dataVOloaded = true;
            var noOrder = '';
            var pegawaiUser = {}
            $scope.now = new Date();
            $scope.item = {}
            init();
            function init() {
                // $scope.isRouteLoading=true;
                // 
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-combo", true).then(function (dat) {
                    $scope.listKelompokProduk = dat.data.kelompokproduk;
                    $scope.item.kelompokproduk = { id: 24, kelompokproduk: 'Barang Persediaan' }
                    $scope.listmataAnggaran = dat.data.mataanggaran;

                    manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk=" + $scope.item.kelompokproduk.id, true).then(function (dat) {
                        $scope.listProduk = dat.data.produk;
                    });

                    modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function (data) {
                        $scope.listPegawaiPembuat = data;
                    });

                    $scope.listAsalBarang = dat.data.asalproduk;
                    $scope.listRuangan = dat.data.ruangan;
                    $scope.listRuanganKK = dat.data.ruangan;
                    $scope.item.ruanganPenerima = { id: $scope.listRuangan[0].id, namaruangan: $scope.listRuangan[0].namaruangan }
                    $scope.item.ruanganKK = { id: $scope.listRuangan[0].id, namaruangan: $scope.listRuangan[0].namaruangan }
                    $scope.listPegawai = dat.data.detaillogin;
                    $scope.item.pegawaiPenerima = { id: $scope.listPegawai[0].id, namalengkap: $scope.listPegawai[0].namalengkap }
                    $scope.listRekanan = dat.data.rekanan;
                    $scope.listpegawaiKK = dat.data.pegawaipenerima;

                    // $scope.item.namaRekanan = {id:5129,namarekanan:'Indofarma Global Medika, PT'}
                    // $scope.item.asalproduk = {id:1,asalproduk:'Badan Layanan Umum'}

                    // $scope.listJenisKirim = [{id:1,jenis:'Amprahan'},{id:2,jenis:'Transfer'}]
                    $scope.listProduk = dat.data.produk;
                    // $scope.listRuanganTujuan =dat.data.ruanganall;
                    // $scope.listRoute = dat.data.route;
                    // $scope.listAturanPakai = dat.data.signa;
                    // $scope.listJenisRacikan = dat.data.jenisracikan;
                    pegawaiUser = dat.data.detaillogin[0];

                    if (noOrder != '') {
                        $scope.isRouteLoading = true;
                        if (noOrder == 'EditTerima') {
                            $scope.disableSppb = true;
                            manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                                $scope.listKoordinator = dat.data.jenisusulan;
                                $scope.item.koordinator = { id: 1, jenisusulan: 'Medis' };
                            });
                            manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-detail-terima-barang-suplier?norec=" + norecTerima, true).then(function (data_ih) {
                                //
                                $scope.isRouteLoading = false;
                                NoOrderFk = data_ih.data.detailterima.noorderfk
                                $scope.item.noTerima = data_ih.data.detailterima.nostruk
                                $scope.item.noUsulan = data_ih.data.detailterima.nousulan
                                $scope.item.noOrder = data_ih.data.detailterima.nosppb
                                $scope.item.noKontrak = data_ih.data.detailterima.nokontrak
                                $scope.item.tglTerima = data_ih.data.detailterima.tglstruk
                                $scope.item.tglUsulan = data_ih.data.detailterima.tglrealisasi
                                $scope.item.tglAwal = data_ih.data.detailterima.tgldokumen
                                $scope.item.ketTerima = data_ih.data.detailterima.keteranganambil
                                $scope.item.namaPengadaan = data_ih.data.detailterima.namapengadaan
                                $scope.item.keterangan1 = data_ih.data.detailterima.keteranganlainnya
                                $scope.item.tahun = moment(data_ih.data.detailterima.tglstruk).format('YYYY');
                                $scope.item.kelompokproduk = { id: data_ih.data.pelayananPasien[0].kpid, kelompokproduk: data_ih.data.pelayananPasien[0].kelompokproduk }
                                $scope.item.asalproduk = { id: data_ih.data.pelayananPasien[0].asalprodukfk, asalproduk: data_ih.data.pelayananPasien[0].asalproduk }
                                $scope.item.ruanganPenerima = { id: data_ih.data.detailterima.id, namaruangan: data_ih.data.detailterima.namaruangan }
                                $scope.item.pegawaiPenerima = { id: data_ih.data.detailterima.pgid, namalengkap: data_ih.data.detailterima.namalengkap }
                                $scope.item.pegawaiPembuat = { id: data_ih.data.detailterima.objectpegawaipenanggungjawabfk, namalengkap: data_ih.data.detailterima.penanggungjawab }
                                $scope.item.tglFaktur = data_ih.data.detailterima.tglfaktur
                                $scope.item.noFaktur = data_ih.data.detailterima.nofaktur
                                $scope.item.namaRekanan = { id: data_ih.data.detailterima.objectrekananfk, namarekanan: data_ih.data.detailterima.namarekanan }
                                norec_Realisasi = data_ih.data.detailterima.norecrealisasi;
                                $scope.item.mataAnggaran = { norec: data_ih.data.detailterima.mataanggranid, mataanggaran: data_ih.data.detailterima.namamataanggaran }
                                kelTrans = 35;
                                // $scope.item.ruangan = {id:data_ih.data.detailresep.id,namaruangan:data_ih.data.detailresep.namaruangan}
                                // $scope.item.penulisResep = {id:data_ih.data.detailresep.pgid,namalengkap:data_ih.data.detailresep.namalengkap}
                                // $scope.item.nocm = data_ih.data.detailresep.nocm
                                // $scope.item.namapasien = data_ih.data.detailresep.nama
                                // $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                                // $scope.item.noTelepon = data_ih.data.detailresep.notlp
                                // $scope.item.alamat = data_ih.data.detailresep.alamat

                                data2 = data_ih.data.pelayananPasien
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: data2
                                });
                                ttlTotal = 0;
                                ttlDiskon = 0;
                                ttlPpn = 0;
                                grandTotal = 0;

                                for (var i = data2.length - 1; i >= 0; i--) {
                                    ttlTotal = ttlTotal + (parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].jumlah))
                                    ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].jumlah))
                                    ttlPpn = ttlPpn + (parseFloat(data2[i].ppn) * parseFloat(data2[i].jumlah))
                                }
                                $scope.item.total = parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalDiskon = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                                grandTotal = ttlTotal + ttlPpn - ttlDiskon
                                $scope.item.grandTotal = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            });
                            $scope.columnGrid = [
                                {
                                    "field": "no",
                                    "title": "No",
                                    "width": "30px",
                                },
                                {
                                    "field": "namaproduk",
                                    "title": "Nama Produk",
                                    "width": "120px",
                                },
                                {
                                    "field": "satuanstandar",
                                    "title": "Satuan",
                                    "width": "50px",
                                },
                                {
                                    "field": "jumlah",
                                    "title": "Qty",
                                    "width": "50px",
                                },
                                {
                                    "field": "hargasatuan",
                                    "title": "Harga Satuan",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                                },
                                {
                                    "field": "ppn",
                                    "title": "Ppn",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                                },
                                {
                                    "field": "hargadiscount",
                                    "title": "Harga Discount",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                                },
                                {
                                    "field": "total",
                                    "title": "SubTotal",
                                    "width": "100px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                                },
                                {
                                    "field": "nobatch",
                                    "title": "No Batch",
                                    "width": "50px",
                                },
                                {
                                    "field": "tglkadaluarsa",
                                    "title": "Tgl Kadaluarsa",
                                    "width": "100px",
                                    "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                                }
                            ];

                        }
                        if (noOrder == 'SPPB') {
                            $scope.disableSppb = true;
                            $scope.isUnitt = true;
                            loadSPPB = 'ya'
                            $scope.columnGrid = [
                                {
                                    "field": "no",
                                    "title": "No",
                                    "width": "30px",
                                },
                                {
                                    "field": "namaproduk",
                                    "title": "Nama Produk",
                                    "width": "120px",
                                },
                                {
                                    "field": "satuanstandar",
                                    "title": "Satuan",
                                    "width": "50px",
                                },
                                {
                                    "field": "jumlahterima",
                                    "title": "Sdh Terima",
                                    "width": "60px",
                                },
                                {
                                    "field": "jumlah",
                                    "title": "Qty",
                                    "width": "50px",
                                },
                                {
                                    "field": "hargasatuan",
                                    "title": "Harga Satuan",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                                },
                                {
                                    "field": "ppn",
                                    "title": "Ppn",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                                },
                                {
                                    "field": "hargadiscount",
                                    "title": "Harga Discount",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                                },
                                {
                                    "field": "total",
                                    "title": "SubTotal",
                                    "width": "100px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                                },
                                {
                                    "field": "nobatch",
                                    "title": "No Batch",
                                    "width": "50px",
                                },
                                {
                                    "field": "tglkadaluarsa",
                                    "title": "Tgl Kadaluarsa",
                                    "width": "100px",
                                    "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                                }
                            ];
                            $scope.isRouteLoading = true;
                            manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                                $scope.listKoordinator = dat.data.jenisusulan;
                                $scope.item.koordinator = { id: 1, jenisusulan: 'Medis' };
                            });
                            manageLogistikPhp.getDataTableTransaksi("sppb/get-detail-SPPB?norecOrder=" + norecSPPB, true).then(function (data_ih) {

                                $scope.isRouteLoading = false;
                                sppb = data_ih.data.detail.norec;
                                $scope.item.noOrder = data_ih.data.detail.noorder
                                $scope.item.tglAwal = data_ih.data.detail.tglorder
                                $scope.item.keterangan1 = data_ih.data.detail.keterangan
                                $scope.listPegawaiPembuat = [{ id: data_ih.data.detail.petugasid, namalengkap: data_ih.data.detail.petugas }]
                                $scope.item.pegawaiPembuat = { id: data_ih.data.detail.petugasid, namalengkap: data_ih.data.detail.petugas }
                                $scope.item.koordinator = { id: data_ih.data.detail.jenisusulanfk, jenisusulan: data_ih.data.detail.koordinator } //{id:1,jenisusulan:'Medis'} 
                                $scope.item.tglUsulan = data_ih.data.detail.tglusulan
                                $scope.item.noUsulan = data_ih.data.detail.nousulan
                                $scope.item.namaPengadaan = data_ih.data.detail.namapengadaan
                                $scope.item.noKontrak = data_ih.data.detail.nokontrak
                                $scope.item.tahun = data_ih.data.detail.tahunusulan
                                kelTrans = 35;
                                noOrder = data_ih.data.detail.objectstrukfk;
                                if (data_ih.data.detail.norecrealisasi != undefined) {
                                    norec_Realisasi = data_ih.data.detail.norecrealisasi;
                                } else {
                                    norec_Realisasi = data_ih.data.detail.norecrealisasisppb;
                                }
                                // norec_Realisasi=data_ih.data.detail.norecrealisasi;
                                $scope.item.namaRekanan = { id: data_ih.data.detail.rekanansalesfk, namarekanan: data_ih.data.detail.namarekanansales }
                                if (data_ih.data.detail.mataanggranid != undefined) {
                                    $scope.item.mataAnggaran = { norec: data_ih.data.detail.mataanggranid, mataanggaran: data_ih.data.detail.mataanggaran }
                                } else {
                                    $scope.item.mataAnggaran = { norec: data_ih.data.detail.mataanggranfk, mataanggaran: data_ih.data.detail.mataanggaransppb }
                                }

                                $scope.item.asalproduk = { id: data_ih.data.details[0].asalprodukfk, asalproduk: data_ih.data.details[0].asalproduk }

                                // $scope.item.mataAnggaran={id:,namamataanggaran:}
                                // $scope.item.koordinator = data_ih.data.detailterima.nostruk
                                // $scope.item.tglTerima = data_ih.data.detailterima.tglstruk
                                // $scope.item.kelompokproduk ={id:data_ih.data.pelayananPasien[0].kpid,kelompokproduk:data_ih.data.pelayananPasien[0].kelompokproduk} 

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

                                data2 = data_ih.data.details
                                if (data2 != undefined) {
                                    $scope.item.asalproduk = { id: data_ih.data.details[0].asalprodukfk, asalproduk: data_ih.data.details[0].asalproduk }
                                }
                                var subnyaTotal = 0;
                                var subTotal = 0;
                                var ppn = 0;
                                var discount = 0;
                                var totTpnn = 0;
                                var hargappn = 0;
                                var total = 0;
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    total = (parseFloat(data2[i].hargasatuan) * (data2[i].qtyprodukkonfirmasi))
                                    data2[i].total = total
                                }
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: data2
                                });
                                ttlTotal = 0;
                                ttlDiskon = 0;
                                ttlPpn = 0;
                                grandTotal = 0;
                                nilai = 1;

                                for (var i = data2.length - 1; i >= 0; i--) {
                                    if (data2[i].nilaikonversi == null) {
                                        data2[i].nilaikonversi = nilai;
                                    }
                                    // ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].qtyprodukkonfirmasi))
                                    // ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].qtyprodukkonfirmasi))
                                    // ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].qtyprodukkonfirmasi))
                                    ttlTotal = ttlTotal + parseFloat(data2[i].total)
                                    ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].qtyprodukkonfirmasi))
                                    ttlPpn = ttlPpn + ((parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].qtyprodukkonfirmasi)) * (parseFloat(data2[i].ppn) / 100))

                                }
                                $scope.item.total = parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalDiskon = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                                grandTotal = ttlTotal + ttlPpn - ttlDiskon
                                $scope.item.grandTotal = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            });
                        }
                        if (noOrder == 'SPK') {
                            $scope.disableSppb = true;
                            $scope.isRouteLoading = true;
                            loadSPK = 'ya'
                            $scope.isUnitt = true;
                            $scope.columnGrid = [
                                {
                                    "field": "no",
                                    "title": "No",
                                    "width": "30px",
                                },
                                {
                                    "field": "namaproduk",
                                    "title": "Nama Produk",
                                    "width": "120px",
                                },
                                {
                                    "field": "satuanstandar",
                                    "title": "Satuan",
                                    "width": "50px",
                                },
                                {
                                    "field": "jumlahspk",
                                    "title": "Qty SPK",
                                    "width": "50px",
                                },
                                {
                                    "field": "jumlahterima",
                                    "title": "Sdh Terima",
                                    "width": "60px",
                                },
                                {
                                    "field": "jumlah",
                                    "title": "Qty",
                                    "width": "50px",
                                },
                                {
                                    "field": "hargasatuan",
                                    "title": "Harga Satuan",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                                },
                                {
                                    "field": "ppn",
                                    "title": "Ppn",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                                },
                                {
                                    "field": "hargadiscount",
                                    "title": "Harga Discount",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                                },
                                {
                                    "field": "total",
                                    "title": "SubTotal",
                                    "width": "100px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                                },
                                {
                                    "field": "nobatch",
                                    "title": "No Batch",
                                    "width": "50px",
                                },
                                {
                                    "field": "tglkadaluarsa",
                                    "title": "Tgl Kadaluarsa",
                                    "width": "100px",
                                    "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                                }
                            ];
                            manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                                $scope.listKoordinator = dat.data.jenisusulan;
                                $scope.item.koordinator = { id: 1, jenisusulan: 'Medis' };
                            });
                            manageLogistikPhp.getDataTableTransaksi("spk/get-detail-SPPB?norecOrder=" + norecSPPB, true).then(function (data_ih) {
                                //
                                $scope.isRouteLoading = false;
                                $scope.item.noOrder = data_ih.data.detail.nokontrak
                                $scope.item.tglAwal = data_ih.data.detail.tglorder
                                $scope.item.keterangan1 = data_ih.data.detail.keterangan
                                $scope.listPegawaiPembuat = [{ id: data_ih.data.detail.pegawaimengetahuiid, namalengkap: data_ih.data.detail.pegawaimengetahui }]
                                $scope.item.pegawaiPembuat = { id: data_ih.data.detail.penanggungjawabid, namalengkap: data_ih.data.detail.penanggungjawab }
                                // $scope.listKoordinator=[{id:1,namaKoordinator:'Medis'}]
                                // $scope.item.koordinator={id:1,namaKoordinator:'Medis'} 
                                $scope.item.noKontrak = data_ih.data.detail.kontrak
                                $scope.item.tglUsulan = data_ih.data.detail.tglusulan
                                $scope.item.noUsulan = data_ih.data.detail.nousulan
                                // $scope.item.namaPengadaan=data_ih.data.detail.namapengadaan
                                $scope.item.namaPengadaan = data_ih.data.detail.keteranganlainnya
                                // $scope.item.noKontrak=data_ih.data.detail.nokontrak
                                $scope.item.tahun = data_ih.data.detail.tahunusulan
                                kelTrans = 35;
                                noOrder = data_ih.data.detail.objectstrukfk;
                                if (data_ih.data.detail.norecrealisasi != undefined) {
                                    norec_Realisasi = data_ih.data.detail.norecrealisasi;
                                } else {
                                    norec_Realisasi = data_ih.data.detail.norecrealisasikontrak;
                                }

                                if (data_ih.data.detail.mataanggranid != undefined) {
                                    $scope.item.mataAnggaran = { norec: data_ih.data.detail.mataanggranid, mataanggaran: data_ih.data.detail.namamataanggaran }
                                } else {
                                    $scope.item.mataAnggaran = $scope.item.mataAnggaran = { norec: data_ih.data.detail.objectmataanggaranfk, mataanggaran: data_ih.data.detail.objectmataanggaranfk }
                                }

                                $scope.item.namaRekanan = { id: data_ih.data.detail.rekananid, namarekanan: data_ih.data.detail.namarekanan }
                                // $scope.item.koordinator = data_ih.data.detailterima.nostruk
                                // $scope.item.tglTerima = data_ih.data.detailterima.tglstruk
                                // $scope.item.kelompokproduk ={id:data_ih.data.pelayananPasien[0].kpid,kelompokproduk:data_ih.data.pelayananPasien[0].kelompokproduk} 
                                $scope.item.asalproduk = { id: data_ih.data.details[0].asalprodukfk, asalproduk: data_ih.data.details[0].asalproduk }
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
                                $scope.item.tahun = moment($scope.now).format('YYYY');
                                data2 = data_ih.data.details
                                // $scope.dataGrid = new kendo.data.DataSource({
                                //     data: data2
                                // });
                                // ttlTotal = 0 ;
                                // ttlDiskon = 0 ;
                                // ttlPpn = 0 ;
                                // grandTotal = 0 ;

                                // for (var i = data2.length - 1; i >= 0; i--) {
                                //     ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].jumlah))
                                //     ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].jumlah))
                                //     ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].jumlah))
                                // }
                                // $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                // $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                // $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                                // grandTotal = ttlTotal+ttlPpn-ttlDiskon
                                // $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                var subnyaTotal = 0;
                                var subTotal = 0;
                                var ppn = 0;
                                var discount = 0;
                                var totTpnn = 0;
                                var hargappn = 0;
                                var total = 0;
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    total = (parseFloat(data2[i].hargasatuan) * (data2[i].qtyprodukkonfirmasi))
                                    data2[i].total = total
                                }
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: data2
                                });
                                ttlTotal = 0;
                                ttlDiskon = 0;
                                ttlPpn = 0;
                                grandTotal = 0;
                                nilai = 1;

                                for (var i = data2.length - 1; i >= 0; i--) {
                                    if (data2[i].nilaikonversi == null) {
                                        data2[i].nilaikonversi = nilai;
                                    }
                                    // ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].qtyprodukkonfirmasi))
                                    // ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].qtyprodukkonfirmasi))
                                    // ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].qtyprodukkonfirmasi))
                                    ttlTotal = ttlTotal + parseFloat(data2[i].total)
                                    ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].qtyprodukkonfirmasi))
                                    ttlPpn = ttlPpn + ((parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].qtyprodukkonfirmasi)) * (parseFloat(data2[i].ppn) / 100))

                                }
                                $scope.item.total = parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalDiskon = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                                grandTotal = ttlTotal + ttlPpn - ttlDiskon
                                $scope.item.grandTotal = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            });
                        }
                        if (noOrder == 'SPPBDetail') {
                            $scope.disableSppb = true;
                            $scope.isUnitt = true;
                            loadSPPBDetail = 'ya'
                            $scope.columnGrid = [
                                {
                                    "field": "no",
                                    "title": "No",
                                    "width": "30px",
                                },
                                {
                                    "field": "namaproduk",
                                    "title": "Nama Produk",
                                    "width": "120px",
                                },
                                {
                                    "field": "satuanstandar",
                                    "title": "Satuan",
                                    "width": "50px",
                                },
                                {
                                    "field": "jumlahterima",
                                    "title": "Sdh Terima",
                                    "width": "60px",
                                },
                                {
                                    "field": "jumlah",
                                    "title": "Qty",
                                    "width": "50px",
                                },
                                {
                                    "field": "hargasatuan",
                                    "title": "Harga Satuan",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                                },
                                {
                                    "field": "ppn",
                                    "title": "Ppn",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                                },
                                {
                                    "field": "hargadiscount",
                                    "title": "Harga Discount",
                                    "width": "70px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                                },
                                {
                                    "field": "total",
                                    "title": "SubTotal",
                                    "width": "100px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                                },
                                {
                                    "field": "nobatch",
                                    "title": "No Batch",
                                    "width": "50px",
                                },
                                {
                                    "field": "tglkadaluarsa",
                                    "title": "Tgl Kadaluarsa",
                                    "width": "100px",
                                    "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                                }
                            ];
                            $scope.isRouteLoading = true;
                            manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                                $scope.listKoordinator = dat.data.jenisusulan;
                                $scope.item.koordinator = { id: 1, jenisusulan: 'Medis' };
                            });
                            manageLogistikPhp.getDataTableTransaksi("sppb/get-detail-SPPB-new?norecOrder=" + norecSPPB + "&produkfk=" + dataIN, true).then(function (data_ih) {
                                //
                                $scope.isRouteLoading = false;
                                sppb = data_ih.data.detail.norec;
                                $scope.item.noOrder = data_ih.data.detail.noorder
                                $scope.item.tglAwal = data_ih.data.detail.tglorder
                                $scope.item.keterangan1 = data_ih.data.detail.keterangan
                                // $scope.listPegawaiPembuat=[{id:data_ih.data.detail.pgid,namalengkap:data_ih.data.detail.petugas}]
                                // $scope.item.pegawaiPembuat={id:data_ih.data.detail.pgid,namalengkap:data_ih.data.detail.petugas} 
                                $scope.listPegawaiPembuat = [{ id: data_ih.data.detail.petugasid, namalengkap: data_ih.data.detail.petugas }]
                                $scope.item.pegawaiPembuat = { id: data_ih.data.detail.petugasid, namalengkap: data_ih.data.detail.petugas }
                                // $scope.item.koordinator={id:1,namaKoordinator:'Medis'} 
                                $scope.item.tglUsulan = data_ih.data.detail.tglusulan
                                $scope.item.noUsulan = data_ih.data.detail.nousulan
                                $scope.item.namaPengadaan = data_ih.data.detail.namapengadaan
                                $scope.item.noKontrak = data_ih.data.detail.nokontrak
                                $scope.item.tahun = data_ih.data.detail.tahunusulan
                                kelTrans = 35;
                                noOrder = data_ih.data.detail.objectstrukfk;
                                if (data_ih.data.detail.norecrealisasi != undefined) {
                                    norec_Realisasi = data_ih.data.detail.norecrealisasi;
                                } else {
                                    norec_Realisasi = data_ih.data.detail.norecrealisasisppb;
                                }
                                // norec_Realisasi=data_ih.data.detail.norecrealisasi;
                                $scope.item.namaRekanan = { id: data_ih.data.detail.rekanansalesfk, namarekanan: data_ih.data.detail.namarekanansales }
                                if (data_ih.data.detail.mataanggranid != undefined) {
                                    $scope.item.mataAnggaran = { norec: data_ih.data.detail.mataanggranid, mataanggaran: data_ih.data.detail.mataanggaran }
                                } else {
                                    $scope.item.mataAnggaran = { norec: data_ih.data.detail.mataanggranfk, mataanggaran: data_ih.data.detail.mataanggaransppb }
                                }

                                $scope.item.asalproduk = { id: data_ih.data.details[0].asalprodukfk, asalproduk: data_ih.data.details[0].asalproduk }

                                // $scope.item.mataAnggaran={id:,namamataanggaran:}
                                // $scope.item.koordinator = data_ih.data.detailterima.nostruk
                                // $scope.item.tglTerima = data_ih.data.detailterima.tglstruk
                                // $scope.item.kelompokproduk ={id:data_ih.data.pelayananPasien[0].kpid,kelompokproduk:data_ih.data.pelayananPasien[0].kelompokproduk} 

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

                                data2 = data_ih.data.details
                                if (data2 != undefined) {
                                    $scope.item.asalproduk = { id: data_ih.data.details[0].asalprodukfk, asalproduk: data_ih.data.details[0].asalproduk }
                                }
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: data2
                                });
                                ttlTotal = 0;
                                ttlDiskon = 0;
                                ttlPpn = 0;
                                grandTotal = 0;
                                nilai = 1;

                                for (var i = data2.length - 1; i >= 0; i--) {
                                    if (data2[i].nilaikonversi == null) {
                                        data2[i].nilaikonversi = nilai;
                                    }
                                    ttlTotal = ttlTotal + (parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].qtyprodukkonfirmasi))
                                    ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].qtyprodukkonfirmasi))
                                    ttlPpn = ttlPpn + (parseFloat(data2[i].ppn) * parseFloat(data2[i].qtyprodukkonfirmasi))
                                }
                                $scope.item.total = parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalDiskon = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                                grandTotal = ttlTotal + ttlPpn - ttlDiskon
                                $scope.item.grandTotal = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            });
                        }
                    } else {
                        manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                            $scope.listKoordinator = dat.data.jenisusulan;
                            $scope.item.koordinator = { id: 1, jenisusulan: 'Medis' };
                        });
                        $scope.columnGrid = [
                            {
                                "field": "no",
                                "title": "No",
                                "width": "30px",
                            },
                            {
                                "field": "namaproduk",
                                "title": "Nama Produk",
                                "width": "120px",
                            },
                            {
                                "field": "satuanstandar",
                                "title": "Satuan",
                                "width": "50px",
                            },
                            {
                                "field": "jumlah",
                                "title": "Qty",
                                "width": "50px",
                            },
                            {
                                "field": "hargasatuan",
                                "title": "Harga Satuan",
                                "width": "70px",
                                "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                            },
                            {
                                "field": "ppn",
                                "title": "Ppn",
                                "width": "70px",
                                "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                            },
                            {
                                "field": "hargadiscount",
                                "title": "Harga Discount",
                                "width": "70px",
                                "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                            },
                            {
                                "field": "total",
                                "title": "SubTotal",
                                "width": "100px",
                                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                            },
                            {
                                "field": "nobatch",
                                "title": "No Batch",
                                "width": "50px",
                            },
                            {
                                "field": "tglkadaluarsa",
                                "title": "Tgl Kadaluarsa",
                                "width": "100px",
                                "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                            }
                        ];
                    }
                });

            }

            $scope.Generate = function (data) {

                if (data === true) {
                    var AsalPro = ''
                    if ($scope.item.asalproduk != undefined) {
                        AsalPro = $scope.item.asalproduk.id
                    }
                    manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-nostruk-generate?asalproduk=" + AsalPro, true).then(function (dat) {
                        var datas = dat.data
                        if (datas.noStruk != "") {
                            $scope.item.noTerima = datas.noStruk
                        } else {
                            $scope.item.noTerima = ""
                        }

                        if (datas.noBuktiKK != "") {
                            $scope.item.noBuktiKK = datas.noBuktiKK
                        } else {
                            $scope.item.noBuktiKK = ""
                        }
                    })
                } else {
                    $scope.item.noTerima = '';
                    $scope.item.noBuktiKK = '';
                }
            };
        }
    ]);
});
