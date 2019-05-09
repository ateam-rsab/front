define(['Configuration'], function (config) {
    // service baru
    var baseUrlLaundry = config.baseUrlActionLaundry;
    var baseApiPostDataLaundry = config.baseApiPostDataLaundry;

    var baseUrlK3KL = config.baseUrlActionK3KL;
    var baseApiPostK3Kl = config.baseApiPostDataK3KL;

    var baseApiIT = config.baseUrlIT;

    var baseUrlIPSRS = config.baseUrlActionIPSRS;
    var baseApiPostDataIPSRS = config.baseApiPostDataIPSRS;

    var baseUrlCSSD = config.baseUrlActionCSSD;
    var baseApiPostDataCSSD = config.baseApiPostDataCSSD;

    var baseUrlAction = config.baseUrlAction;
    var baseUrlApiAction = config.baseApiPostData;
    var baseApiPostData = config.baseApiPostData;
    var baseUrlListData = config.baseUrlListData;
    var baseUrlDataMaster = config.urlDataMaster;
    var baseUrlListProduk = config.baseUrlListProduk;
    var baseUrlDataUser = config.urlDataUser;
    var sarprasService = angular.module('SarprasService', ['ngResource', 'HttpServices', 'Services']);
    sarprasService.service('ManageSarpras', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveLoginUser: function (data) {
                return r.post({
                    url: baseUrlApiAction + "user/save-login-user/"
                }, data);
            },

            saveKirimProduk: function (data) {
                return r.post({
                    url: baseUrlApiAction + "request-permintaan-barang/save-request-kirim-barang/"
                }, data);
            },

            saveDaftarPenerimaanLinen: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },


            saveMasterAlatLaundry: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },

            savePengeringan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },

            saveVerifikasiKirim: function (data) {
                return r.post({
                    url: baseUrlApiAction + "request-permintaan-barang/save-verifikasi-pengiriman/"
                }, data);
            },
            saveOrderProduk: function (data) {
                return r.post({
                    url: baseUrlApiAction + "request-permintaan-barang/save-request-permintaan-barang/"
                }, data);
            },
            saveDistribusiAset: function (data) {
                return r.post({
                    url: baseUrlApiAction + "distribusi-aset/save-distribusi-aset/"
                }, data);
            },
            saveRequestPemusnahan: function (data) {
                return r.post({
                    url: baseUrlApiAction + "pemusnahan-barang/save-request-pemusnahan-barang/"
                }, data);
            },
            saveGambarMuka: function (data) {
                // debugger;
                return r.post({
                    url: baseUrlApiAction + "apresiasi-atas-layanan/save-apresiasi-atas-layanan/"
                }, {
                        gambarMukaKepuasan: data.gambarMukaKepuasan



                    });
            },
            downloadFile: function (url) {
                var authorization = "";
                var arr = document.cookie.split(';')
                for (var i = 0; i < arr.length; i++) {
                    var element = arr[i].split('=');
                    if (element[0].indexOf('authorization') > 0) {
                        authorization = element[1];
                    }
                }
                window.open(baseUrlAction + url + '/?X-AUTH-TOKEN=' + authorization, '_blank')
            },
            saveMasterParameter: function (data) {
                // debugger;
                return r.post({
                    url: baseUrlApiAction + "parameter/save-parameter/"
                }, {
                        id: data.id,
                        kode: data.kodeParameter,
                        statusEnabled: data.statusEnabled,
                        nama: data.parameter



                    });
            },

            updateMasterParameter: function (data) {
                // debugger;
                return r.post({
                    url: baseUrlApiAction + "parameter/update-parameter/"
                }, {
                        id: data.id,
                        kode: data.kodeParameter,
                        statusEnabled: data.statusEnabled,
                        nama: data.parameter
                    });
            },

            saveSatuan: function (data) {
                // debugger;
                return r.post({
                    url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                }, {
                        id: data.id,
                        satuanStandar: data.satuanStandar




                    });
            },

            saveBakuMutu: function (data) {
                // debugger;
                return r.post({
                    url: baseUrlApiAction + "baku-mutu/save-baku-mutu/"
                }, {

                        id: data.id,
                        kadarMaksimum: data.kadarMaksimum,
                        satuanStandar: data.satuanStandar,
                        bakuMutu: data.bakuMutu,
                        jenisBakuMutu: data.jenisBakuMutu,
                        namaBakuMutu: data.namaBakuMutu

                    });
            },

            saveLimbah: function (data) {
                return r.post({
                    url: baseApiPostK3Kl + "struk-pelayanan/simpan-limbah-b3-masuk/"
                }, {
                        strukPelayanan: {
                            jenisLimbahB3Masuk: data.jenisLimbah,
                            tglstruk: data.tanggalAwal,
                            kdruanganasal: data.kdruanganasal,
                            kdruangan: { id: 318 },
                            satuanWaktuKesling: data.satuanWaktuKesling,
                            qtyproduk: data.qty
                        },
                        strukPelayananDetail: {
                            tglpelayanan: data.tanggalAwal
                        }
                        //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                        //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	

                    });
            },

            saveKeluar: function (data) {
                return r.post({
                    url: baseApiPostK3Kl + "limbah-b3-keluar/save-limbah-b3-keluar/"
                }, {                        
                        tanggal: data.tanggal,
                        periodeAwal: data.periodeAwal,
                        periodeAhir: data.periodeAkhir,
                        jenisLimbahB3Masuk: data.jenisLimbah,
                        jumlahLimbahB3Keluar: data.jumlah,
                        tujuanPenyerahan: data.tujuanPenyerahan,
                        sisaLimbahB3: data.sisaLimbah,
                        total: data.sampah.total,
                        maksimalPenyimpanan: data.maksimalPenyimpanan,
                        perlakuanId: data.perlakuan.id,
                        buktiNomerDokumen: data.noDokumen
                        // rekanan: data.rekanan ? data.rekanan : null,

                        //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                        //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	

                    });
            },
            sampleUploadFile: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData
                }, data);
            },

            saveLaundry: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataLaundry + urlSave
                }, data);
            },

            saveSarpras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },


            saveDataPantau: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },


            saveDataUji: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },

            saveDataSarPras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },


            saveDataNeracaLimbah: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },

            savePerusahaanBekerjasama: function (data) {
                // debugger;
                return r.post({
                    url: baseUrlApiAction + "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/"
                }, {
                        noPks: data.noPks,
                        rekanan: data.rekanan,
                        jumlahKaryawan: data.jumlahKaryawan,
                        plafon: data.plafon,
                        caraPenagihan: data.caraPenagihan,
                        alamatPenagihan: data.alamatPenagihan,
                        contactPerson: data.contactPerson,
                        tanggal: data.tanggal,
                        jangkaAwal: data.jangkaAwal,
                        ok: data.ok,
                        jangkaAkhir: data.jangkaAkhir,
                        namaFilePks: data.namaFilePks,
                        noTelpFax: data.noTelpFax,
                        email: data.email



                    });
            },



            saveAsuransiBekerjasama: function (data) {
                debugger;
                return r.post({
                    url: baseUrlApiAction + "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/"
                }, {
                        noPks: data.noPks,
                        rekanan: data.rekanan,
                        anakPerusahaan: data.anakPerusahaan,
                        jumlahKaryawan: data.jumlahKaryawan,
                        plafon: data.plafon,
                        caraPenagihan: data.caraPenagihan,
                        alamatPenagihan: data.alamatPenagihan,
                        contactPerson: data.contactPerson,
                        tanggal: data.tanggal,
                        jangkaAwal: data.jangkaAwal,
                        ok: data.ok,
                        jangkaAkhir: data.jangkaAkhir,
                        namaFilePks: data.namaFilePks,
                        noTelpFax: data.noTelpFax,
                        email: data.email
                    });
            },


            getDataSpek: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "anggaran/get-detail-anggaran/?noRec=" + noRec + "&parameter=rup"
                });
            },

            getDataPermintaanPerbaikan: function (noRec) {
                debugger
                return r.get({
                    url: baseUrlApiAction + "psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan"
                });
            },

            getDataRUPVerified: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "detail-rup/get-rup-header-by-norec/?noRec=" + noRec
                });
            },

            getDataKartu: function (noRec, idMataAng, idAsalProd) {
                return r.get({
                    url: baseUrlApiAction + "anggaran/get-detail-anggaran/?noRec=" + noRec + "&parameter=kartuPengendali&mataAnggaranId=" + idMataAng + "&asalProdukId=" + idAsalProd
                });
            },

            getDetailKartu: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "kartu-pengendali/get-kartu-pengendali-header-by-norec/?noRec=" + noRec
                });
            },

            getDetailPemenang: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "rekap-pemenang/get-rekap-pemenang?noRec=" + noRec
                });
            },

            getDetailPenawaran: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "kartu-pengendali/pre-rekap-pemenang/?noRec=" + noRec
                });
            },

            getDetailRekap: function (noRec, supplierId) {
                return r.get({
                    url: baseUrlApiAction + "rekap-pemenang/detail-rekap-pemenang?noRecKartuPengendaliId=" + noRec + "&supplierId=" + supplierId
                });
            },

            getVerifikasiKartu: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "kartu-pengendali/get-detail-kartu-pengendali-list/?noRec=" + noRec
                });
            },

            getDataJadwal: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "kartu-pengendali/pre-add-jadwal?noRec=" + noRec
                });
            },






            saveKeluhanPelanggan: function (data) {
                debugger;
                return r.post({
                    url: baseUrlApiAction + "keluhan-pelanggan/save-keluhan-pelanggan/"
                }, {
                        namaPasien: data.namaPasien,
                        umur: data.umur,
                        email: data.email,
                        keluhan: data.keluhan,
                        noRm: data.noRm,
                        noTlp: data.noTlp,
                        alamat: data.alamat,
                        saran: data.saran,
                        ruangan: data.ruangan,
                        pekerjaan: data.pekerjaan


                    });
            },


            saveDataPerusahaanBekerjasama: function (data) {
                debugger;
                return r.post({
                    url: baseUrlApiAction + "data-peserta-perusahaan-yang-bekerja-sama/save-data-peserta-perusahaan-yang-bekerja-sama/"
                }, {
                        dataPerusahaanYangBekerjaSama: { noRec: data.noRec.noRec },
                        jenisKelamin: data.jenisKelamin,
                        namaPeserta: data.namaPeserta,
                        jumlahKeluarga: data.jumlahKeluarga,
                        plafonYangDijamin: data.plafonYangDijamin,
                        alamat: data.alamat,
                        noTlp: data.noTlp



                    });
            },


            savePenangananKeluhanPelanggan: function (data) {
                debugger;
                return r.post({
                    url: baseUrlApiAction + "penanganan-keluhan-pelanggan/save-penanganan-keluhan-pelanggan/"
                }, {

                        email: data.orderPelanggan.email,
                        reply: data.saran,
                        namaPetugas: data.orderPelanggan.name



                    });
            },

            saveMasterBahan: function (data) {
                debugger;
                return r.post({
                    url: baseUrlApiAction + "jenis-bahan/save-jenis-bahan"
                }, {
                        jenisBahan: data.jenisBahan


                    });
            },
            savePembatalan: function (data) {
                return r.post({
                    url: baseUrlApiAction + "pembatalan-pasien/save-pembatalan-pasien"
                }, {

                        keteranganAlasan: data.keteranganAlasan,
                        tglRetur: data.tglRetur,
                        antrianPasienDiPeriksa: data.antrianPasienDiPeriksa
                    });
            },


            savePeralatan: function (data) {
                debugger;
                return r.post({
                    url: baseUrlApiAction + "transfer-pasien-internal/save-peralatan-detail/"
                }, {
                        transferPasienInternal: data.transferPasienInternal,
                        peralatanDetail: data.listPeralatan,


                    });
            },

            saveMuskuloskeletal: function (pasien, tanggal, data) {
                debugger;
                return r.post({
                    url: baseUrlApiAction + "muskuloskeletal/save-muskuloskeletal/"
                }, {
                        pasien: pasien,
                        tglInput: tanggal,
                        gerakanAnak: data.gerakanAnak,
                        kelainanTulang: data.kelainanTulang
                    });
            },

            saveGenetalia: function (pasien, tanggal, data) {
                return r.post({
                    url: baseUrlApiAction + "genatalia/save-genatalia/"
                }, {
                        pasien: pasien,
                        tglInput: tanggal,
                        status: data.status,
                        keterangan: data.keterangan
                    });
            },

            saveNeurologi: function (pasien, tanggal, data) {
                return r.post({
                    url: baseUrlApiAction + "neurologi/save-neurologi"
                }, {
                        pasien: pasien,
                        tglInput: tanggal,
                        gangguanNeorologis: data.gangguanNeorologis,
                        kesadaran: data.kesadaran,
                        isNormal: data.isNormal
                    });
            },

            savePemakaianRuangRapat: function (data, daftarPenambahanKebutuhanSarana) {
                return r.post({
                    url: baseUrlApiAction + "order-pemakaian-ruang-rapat/save-order-pemakaian-ruang-rapat"
                }, {
                        noOrder: data.noOrder,
                        unitPemesan: data.unitPemesan,
                        temaRapat: data.temaRapat,
                        tglRapat: data.tglRapat,
                        cHari: data.cHari,
                        waktu: data.waktu,
                        lamaPenggunaan: data.lamaPenggunaan,
                        jumlahPeserta: data.jumlahPeserta,
                        namaRuanganRapat: data.namaRuanganRapat,
                        jenisKonsumsi: data.listJenisKonsumsi,
                        daftarPenambahanKebutuhanSarana: daftarPenambahanKebutuhanSarana
                    });
            },

            saveSasaranStrategis: function (data) {
                return r.post({
                    url: baseUrlApiAction + "sasaran-strategis/find-all-sasaran-strategis"
                }, {
                        sasaranStrategis: data.sasaranStrategis
                    });
            },

            saveProgram: function (data) {
                return r.post({
                    url: baseUrlApiAction + "program/save-program/"
                }, {
                        program: data.namaProgram
                    });
            },
            saveMasterIndikatorKinerjaUtama: function (data) {
                return r.post({
                    url: baseUrlApiAction + "indikator-kinerja-utama/save-indikator-kinerja-utama/"
                }, {
                        sasaranStrategis: data.sasaranStrategis,
                        indikatorKinerjaUtama: data.indikatorKinerjaUtama,
                        tahun: data.tahun,
                        bobot: data.bobot,
                        satuan: data.satuan,
                        targetIku: data.targetIku
                    });
            },
            saveDataSarPras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },


            //davis was here
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getListAset: function (idRuangan, awal, akhir) {
                return r.get({
                    url: baseUrlApiAction + 'registrasi-aset/grid-registrasi-aset?ruanganId=' + idRuangan + '&periodeAwal=' + awal + '&periodeAhir=' + akhir
                });
            },

            getListData: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },

            getIndikatorList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },

            getProgramList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            deleteData: function (urlDel) {
                return r.delete({
                    url: baseUrlApiAction + urlDel
                });
            },
            getDaftarPemusnahan: function (idKelProduk, idJenProduk, idProduk, periode) {
                return r.get({
                    url: baseUrlApiAction + 'pemusnahan-barang/list-pemusnahan-barang?kelProdukId=' + idKelProduk +
                        '&jenProdukId=' + idJenProduk + '&produkId=' + idProduk + periode
                });
            },
            getDaftarPemakaian: function (idKelProduk, idJenProduk, idProduk, periode) {
                return r.get({
                    url: baseUrlApiAction + 'pemakain-barang/list-pemakaian?kelompokProdukId=' + idKelProduk +
                        '&jenisProdukId=' + idJenProduk + '&produkId=' + idProduk + periode
                });
            },
            getDaftarPengirimanRetur: function (tanggalAwal, tanggalAhir, kelProdukId, jenisProdukId, produkId) {
                return r.get({
                    url: baseUrlApiAction + 'retur-ruangan/retur-pengiriman-barang?tanggalAwal=' + tanggalAwal + '&tanggalAhir=' + tanggalAhir + "&kelompokProdukId=" + kelProdukId + "&jenisProdukId=" + jenisProdukId + "&produkId=" + produkId
                });
            },
            getDaftarPenerimaanRetur: function (tanggalAwal, tanggalAhir) {
                return r.get({
                    url: baseUrlApiAction + 'retur-ruangan/retur-penerimaan-barang?tanggalAwal=' + tanggalAwal + '&tanggalAhir=' + tanggalAhir
                });
            },
            getPenerimaanSupplier: function (periode, kelompokId, jenisId, produkId, noTerima, supplierId) {
                return r.get({
                    url: baseUrlApiAction + 'retur-supplier/list-penerimaan-barang' + periode + "&kelompokProdukId=" + kelompokId + "&jenisProdukId=" + jenisId + "&produkId=" + produkId + "&noTerima=" + noTerima + "&supplierId=" + supplierId
                });
            },
            getDetilTerimaSupplier: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + 'retur-supplier/get-penerimaan-barang/?noRec=' + noRec
                });
            },
            getStokOpnameRekap: function (idKelompokProduk, idJenisProduk, idnamaProduk, idRuangan, asalProdukId) {
                return r.get({
                    url: baseUrlApiAction + 'stok-produk-global/list-stok?kelompokProdukId=' + idKelompokProduk + '&jenisProdukId=' + idJenisProduk + '&ruanganId=' + idRuangan + '&produkId=' + idnamaProduk + "&asalProdukId=" + asalProdukId
                });
            },
            getFieldListProduk: function (kode, kodeintern, kdBarcode, kdBmn, NamaProduk) {
                return r.get({
                    url: baseUrlListProduk + 'service/master/produk/list-produk?kdProduk=' + kode + '&kdInternal=' + kodeintern + '&kdBarcode=' + kdBarcode + '&kdBmn=' + kdBmn + '&nmProduk=' + NamaProduk
                });
            },

            getFieldAll: function (urlGet) {
                return r.get({
                    url: baseUrlListProduk + urlGet
                });
            },


            getStokOpnameDetil: function (idKelompokProduk, idJenisProduk, idnamaProduk, idRuangan, noTerima, asalProdukId) {
                return r.get({
                    url: baseUrlApiAction + 'stok-produk-global/list-stok-detail?kelompokProdukId=' + idKelompokProduk + '&jenisProdukId=' + idJenisProduk + '&ruanganId=' + idRuangan + '&produkId=' + idnamaProduk + "&noTerima=" + noTerima + "&asalProdukId=" + asalProdukId
                });
            },
            getOrderPemusnahan: function (idKelProduk, idJenProduk, idProduk) {
                return r.get({
                    url: baseUrlApiAction + 'pemusnahan-barang/list-stok-detail?kelompokProdukId=' + idKelProduk + '&jenisProdukId=' + idJenProduk + '&produkId=' + idProduk
                });
            },
            getListReturSupllier: function (idKelProduk, idJenProduk, idProduk, idSupplier) {
                return r.get({
                    url: baseUrlApiAction + 'retur-supplier/list-retur-supplier?kelompokProdukId=' + idKelProduk + '&jenisProdukId=' + idJenProduk + '&produkId=' + idProduk + '&supplierId=' + idSupplier
                });
            },
            getDetilAset: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + 'registrasi-aset/get-detail-aset?noRec=' + noRec
                });
            },
            daftarFastMoving: function (idKelProduk, idJenProduk, idProduk, dateStart, dateEnd) {
                return r.get({
                    url: baseUrlApiAction + 'slow-fast-moving/fast-moving?kelompokProdukId=' + idKelProduk +
                        '&jenisProdukId=' + idJenProduk + '&produkId=' + idProduk + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd
                });
            },
            daftarSlowMoving: function (idKelProduk, idJenProduk, idProduk, dateStart, dateEnd) {
                return r.get({
                    url: baseUrlApiAction + 'slow-fast-moving/fast-moving?kelompokProdukId=' + idKelProduk +
                        '&jenisProdukId=' + idJenProduk + '&produkId=' + idProduk + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd
                });
            }
        }
    }]);
    sarprasService.service('FindSarpras', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getLaundry: function (urlGet) {
                return r.get({
                    url: baseUrlLaundry + urlGet
                })
            },


            getSarpras: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            getOrderBarang: function (dateStart, dateEnd, ruanganTujuanId) {
                return r.get({
                    url: baseUrlApiAction + "request-permintaan-barang/get-order/?dateStart=" + dateStart +
                        "&dateEnd=" + dateEnd +
                        "&ruanganTujuanId=" + ruanganTujuanId + "&take=1000"
                    // "&ruanganId=" + ruanganId +
                    // "&noOrder=" + noOrder
                });
            },

            getfasilitas: function (ruanganId) {
                debugger;
                return r.get({
                    url: baseUrlApiAction + "/fasilitas/get-list-fasilitas-by-ruangan?idRuangan=" + ruanganId
                });
            },
            getKamarId: function (ruanganId) {
                debugger;
                return r.get({
                    url: baseUrlApiAction + "/ruangan/get-jml-tempattidur-byruangan?idRuangan=" + ruanganId
                });
            },

            getOrderBarangUnit: function (dateStart, dateEnd, ruanganTujuanId) {
                return r.get({
                    url: baseUrlApiAction + "request-permintaan-barang/get-order-unit/?dateStart=" + dateStart +
                        "&dateEnd=" + dateEnd +
                        "&ruanganTujuanId=" + ruanganTujuanId + "&take=1000"
                    // "&ruanganId=" + ruanganId +
                    // "&noOrder=" + noOrder
                });
            },
            getKirimDetailBarang: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "request-permintaan-barang/get-kirim-detail-permintaan-barang/?noRec=" + noRec
                });
            },
            getKirimDetailAset: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "distribusi-aset/get-kirim-detail-permintaan-barang/?noRec=" + noRec
                });
            },
            getOrderDetailBarang: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "request-permintaan-barang/get-detail-permintaan-barang/?noRec=" + noRec
                });
            },
            getOrderKirimBarang: function (namaParameter, dateStart, dateEnd, noOrder) {
                return r.get({
                    url: baseUrlApiAction + "request-permintaan-barang/get-informasi-pengiriman-barang?parameter=" + namaParameter + "&dateStart=" + dateStart +
                        "&dateEnd=" + dateEnd +
                        "&noOrder=" + noOrder
                    // + "&take=1000"
                    // "&ruanganId=" + ruanganId +
                    // "&noOrder=" + noOrder
                });
            },
            getKirimBarangAset: function (namaParameter, dateStart, dateEnd, noOrder) {
                return r.get({
                    url: baseUrlApiAction + "request-permintaan-barang/get-informasi-pengiriman-barang-aset?parameter=" + namaParameter + "&dateStart=" + dateStart +
                        "&dateEnd=" + dateEnd +
                        "&noOrder=" + noOrder
                    // + "&take=1000"
                    // "&ruanganId=" + ruanganId +
                    // "&noOrder=" + noOrder
                });
            },
            getTerimaBarangdiKirim: function (dateStart, dateEnd) {
                return r.get({
                    url: baseUrlApiAction + "request-permintaan-barang/get-informasi-penerimaan-barang?dateStart=" + dateStart +
                        "&dateEnd=" + dateEnd
                });
            },
            getDaftarStokOpname: function (dateStart, dateEnd) {
                return r.get({
                    url: baseUrlApiAction + "stok-op-name/grid-stok-op-name?tanggalAwal=" + dateStart +
                        "&tanggalAhir=" + dateEnd
                });
            },
            getDetilStokOpname: function (tglClosing) {
                return r.get({
                    url: baseUrlApiAction + "stok-op-name/get-stok-op-name-detail/?tglClosing=" + tglClosing
                });
            },
            getDetilPenerimaan: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "retur-ruangan/get-penerimaan-barang/?noRec=" + noRec
                });
            },
            getDetilRetur: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "retur-ruangan/get-detail-retur?noRec=" + noRec
                });
            },
            getTerimaDetil: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "penerimaan-barang/detail-penerimaan-barang/?noRec=" + noRec
                });
            },
            reportKirimOrder: function (noRec) {
                // return r.get({
                //     url: baseUrlAction + "reporting/lapKartuPengendali?noRec=" + noRec
                // })
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapBuktiPengeluaranBarang?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
            },
            reportTerimaSupplier: function (noRec) {
                // return r.get({
                //     url: baseUrlAction + "reporting/lapKartuPengendali?noRec=" + noRec
                // })
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapBuktiPenerimaanBarang?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
            },
            cetakQr: function (noRec) {
                // return r.get({
                //     url: baseUrlAction + "reporting/lapKartuPengendali?noRec=" + noRec
                // })
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapQRCode?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
            },
            cetakQrAset: function (noRec) {
                // return r.get({
                //     url: baseUrlAction + "reporting/lapKartuPengendali?noRec=" + noRec
                // })
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapQRCodeAset?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
            },
            cetakStokDetil: function (kelProdukId, jenisProdukId, produkId, ruanganId, asalProdukId, noTerima) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapDataStokRuangan?kelompokProdukId=' + kelProdukId + '&jenisProdukId=' + jenisProdukId + '&ruanganId=' + ruanganId + '&produkId=' + produkId + '&asalProdukId=' + asalProdukId + '&noTerima=' + noTerima + '&X-AUTH-TOKEN=' + token;
            },
            cetakStokRekap: function (kelProdukId, jenisProdukId, produkId, ruanganId, asalProdukId, noTerima) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapRekapitulasiStokRuangan?kelompokProdukId=' + kelProdukId + '&jenisProdukId=' + jenisProdukId + '&ruanganId=' + ruanganId + '&produkId=' + produkId + '&asalProdukId=' + asalProdukId + '&noTerima=' + noTerima + '&X-AUTH-TOKEN=' + token;
            },
            cetakBarangHabispakai: function (kelProdukId, jenisProdukId, produkId, dateStart, dateEnd) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkam9rby53aWRhZ2RvIn0.OdPBtb4FsbTwXmZwRHdTu2ZbjkgYwH1MSJ6l7sUFpFbuNvEdSZbJqVeRPUIol890fZR7pJsALq1Z8-L7C_tTPA";
                return baseUrlAction + 'reporting/lapPemakaianBarangHabisPakai?kelompokProdukId' + kelProdukId + '=&jenisProdukId=' + jenisProdukId + '&produkId=' + produkId + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd + '&X-AUTH-TOKEN=' + token;
            },
            lapPemusnahanBarang: function (kelProdukId, jenisProdukId, produkId, dateStart, dateEnd) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkam9rby53aWRhZ2RvIn0.OdPBtb4FsbTwXmZwRHdTu2ZbjkgYwH1MSJ6l7sUFpFbuNvEdSZbJqVeRPUIol890fZR7pJsALq1Z8-L7C_tTPA";
                return baseUrlAction + 'reporting/lapPemusnahanBarang?kelProdukId=' + kelProdukId + '&jenProdukId=' + jenisProdukId + '&produkId=' + produkId + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd + '&X-AUTH-TOKEN=' + token;
            },
            lapReturBarangRuangan: function (kelProdukId, jenProdukId, produkId, dateStart, dateEnd) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcG90aWsifQ.1haQBXi0yfwxNtpF4BGULfJt4XV39Ko0Ec3FdEY8-VBJPuU_KQdGhTHNlwOpXlqLiAJwEhdtClhLJa-rVK9Kqg";
                return baseUrlAction + 'reporting/lapDaftarReturBarangRuangan?kelompokProdukId=' + kelProdukId + '&jenisProdukId=' + jenProdukId + '&produkId=' + produkId + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd + '&X-AUTH-TOKEN=' + token;
            },
            lapReturBarangSupplier: function (dateStart, dateEnd, noTerima, produkId) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcG90aWsifQ.1haQBXi0yfwxNtpF4BGULfJt4XV39Ko0Ec3FdEY8-VBJPuU_KQdGhTHNlwOpXlqLiAJwEhdtClhLJa-rVK9Kqg";
                return baseUrlAction + 'reporting/lapDaftarReturBarangSupplier?periodeAwal=' + dateStart + '&periodeAhir=' + dateEnd + '&noTerima=' + noTerima + '&produkId=' + produkId + '&X-AUTH-TOKEN=' + token;
            }
        }
    }]);
    sarprasService.service('IPSRSService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, DateHelper) {
        return {
            getItem: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            saveFormPermintaanPerbaikanDariRuangan: function (data) {
                var tanggal = data.tanggalPesan;
                // debugger;
                return r.post({
                    url: baseUrlApiAction + "ipsrs-perbaikan/save-permintaan-perbaikan/"
                }, {

                        keluhan: data.kerusakan,
                        tglPesan: tanggal,
                        registrasiAset: {
                            noRec: data.noSeri.noRec
                        },
                        pelapor: {
                            id: data.user.id
                        },
                        ipsrsStatusPerbaikan: {
                            statusPengerjaan: 0,
                            statusRespon: 0,
                            ketStatusRespon: ""
                        }
                    });
            },
            saveFormPermintaanPerbaikan: function (data, dataSukuCadang, dataTeknisi) {
                var tanggal = data.tanggalDiperiksa;
                return r.post({
                    url: baseUrlApiAction + "ipsrs-perbaikan/save-pelaksanaan-perbaikan/"
                }, {

                        noRecIpsrsPerbaikan: data.noRec,
                        tglMulaiPeriksa: tanggal,
                        analisaTeknisi: data.analisaTeknisi,
                        analisaKerusakan: data.analisaKerusakan,
                        statusPengerjaan: data.statusPengerjaan.id,
                        ketStatusRespon: data.keteranganStatusRespon,
                        statusEnabled: "true",
                        user: { id: data.namaUser.id },
                        ipsrsPelaksanaanPerbaikanSukuCadang: dataSukuCadang,
                        ipsrsPelaksanaanPerbaikanListTeknisi: dataTeknisi
                    });
            },
            updateFormPermintaanPerbaikan: function (data, dataSukuCadang, dataTeknisi) {
                var tanggal = new Date(data.datePesan);
                debugger;
                return r.post({
                    url: baseUrlApiAction + "ipsrs-perbaikan/update-data-perbaikan"
                }, {
                        norec: data.noRec,
                        keluhan: data.keluhan,
                        tglPesan: data.datePesan,
                        registrasiAset: {
                            noRec: data.barang.noRec
                        },
                        pelapor: {
                            id: data.idPelapor
                        },
                        ipsrsStatusPerbaikan: {
                            statusPengerjaan: 0,
                            statusRespon: 0,
                            ketStatusRespon: "1"
                        }
                    });
            },
            saveDataSarPras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getClassMaster: function (url) {
                return r.get({
                    url: baseUrlDataMaster + url
                });
            },

            getFieldsMasterTable: function (url) {
                return r.get({
                    url: baseUrlDataMaster + url
                });
            },

            saveDataMaster: function (data, urlSave) {
                return r.post({
                    url: baseUrlDataMaster + urlSave
                }, data);
            },

            saveDataProduk: function (data, urlSave) {
                return r.post({
                    url: baseUrlListProduk + urlSave
                }, data);
            },

            saveDataKelas: function (data) {
                return r.post({
                    url: baseUrlListProduk + "service/master/produk/add-kelastoruangan"
                }, data);
            },

            getFieldListData: function (url) {
                return r.get({
                    url: baseUrlListData + url
                });
            },

            downloadHistoryAlat: function (noRec) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkam9rby53aWRhZ2RvIn0.OdPBtb4FsbTwXmZwRHdTu2ZbjkgYwH1MSJ6l7sUFpFbuNvEdSZbJqVeRPUIol890fZR7pJsALq1Z8-L7C_tTPA";
                return baseUrlAction + 'registrasi-aset/download?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
            },
            downloadManualBook: function (noRec) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkam9rby53aWRhZ2RvIn0.OdPBtb4FsbTwXmZwRHdTu2ZbjkgYwH1MSJ6l7sUFpFbuNvEdSZbJqVeRPUIol890fZR7pJsALq1Z8-L7C_tTPA";
                return baseUrlAction + 'registrasi-aset/download?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
            },
            downloadSop: function (noRec) {
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkam9rby53aWRhZ2RvIn0.OdPBtb4FsbTwXmZwRHdTu2ZbjkgYwH1MSJ6l7sUFpFbuNvEdSZbJqVeRPUIol890fZR7pJsALq1Z8-L7C_tTPA";
                return baseUrlAction + 'registrasi-aset/download?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
            }



        };
    }]);
    sarprasService.service('FindPasien', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            checkRujukanBpjs: function (noKepesertaan) {
                return r.get({
                    url: baseUrlApiAction + "asuransi/check-rujukan-bpjs/" + new Date().getTime() + "?id=" + noKepesertaan
                });
            },
            checkKepesertaan: function (noKepesertaan) {
                return r.get({
                    url: baseUrlApiAction + "asuransi/check-kepesertaan/" + new Date().getTime() + "?id=" + noKepesertaan
                });
            },
            getHistroyGinekologi: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/Pemeriksaan/Ginekologi/" + noCm
                });
            },

            getMonitoringStatusPKS: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },


            CheckNoReconfirm: function (noReconfirm) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien-online/confirm-registrasi-online/?noReservasi=" + noReconfirm
                });
            },
            findByNoRegistrasi: function (noRegistrasi) {
                return modelItem.kendoHttpSource("registrasi-pelayanan/get-registrasi/?noRegistrasi=" + noRegistrasi);
            },
            getAnamesisPasien: function (noCm, tanggal) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetAnamesis/" + noCm + "/" + tanggal
                });
            },
            getDiagnosisTindakan: function (noCm, tanggal) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDiagnosaTindakan/" + noCm + "/" + tanggal
                });
            },
            getDiagnosisKerja: function (noCm, tanggal) {
                return r.get({
                    url: baseUrlApiAction + ("Pasien/GetDiagnosisKerja/" + noCm + "/" + tanggal)
                });
            },
            checkPemeriksaanPasien: function (noCm, tanggal, desc) {
                return r.get({
                    url: baseUrlApiAction + ("Pasien/CheckKajianAwal/" + noCm + "/" + tanggal + "/" + desc)
                });
            },
            findByNoCM: function (noCm) {
                //  return modelItem.kendoHttpSource("Pasien/GetByNoCM/?noCM=" + noCm);
                return r.get({
                    url: baseUrlApiAction + "pasien/get/?noCm=" + noCm
                });
            },
            findDokterPenanggungJawab: function (tanggal, noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDokterPenanggungJawab/" + noCm + "/" + tanggal
                });
            },
            findGawatDarurat: function (from, until) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien/antrian-pasien-gawat-darurat/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findPerjanjian: function (from, until) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien-online/antrian-pasien-list/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            getReservasiPasienById: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien-online/get-pasien/?id=" + noRec
                });
            },
            findAntrianPasienBaru: function (from, until, ruangan, noCm) {
                if (noCm === undefined || noCm === '')
                    noCm = '-';
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-baru-list/?&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findOperation: function (from, until, ruangan, noCm) {
                if (noCm === undefined || noCm === '')
                    noCm = '-';
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findQueue: function (from, until, ruangan, noCm) {
                if (noCm === undefined || noCm === '')
                    noCm = '-';
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findReconfirmBpjs: function (from, until) {

                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-bpjs-list/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },

            getDataPasien: function (namaIbuKandug, namaPasien, tgllahir, from, until, isKendo) {
                if (namaIbuKandug === undefined) namaIbuKandug = "";
                var url = baseUrlApiAction + "pasien/pasien-list/?noCm=" + namaPasien + "&namaIbu=" + namaIbuKandug + "&tanggalLahir=" + dateHelper.formatDate(tgllahir, 'YYYY-MM-DD') + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD');
                if (isKendo)
                    return modelItem.kendoHttpSource(url);
                return r.get({
                    url: url
                });
            },
            getByNoCM: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "pasien/get/?noCm=" + noCm
                });
            },
            getByNoRegistrasi: function (noRegistrasi) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-registrasi/?noRegistrasi=" + noRegistrasi
                });
            },
            getAlergy: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetAlergyByNoCM/" + noCm
                });
            },
            getAlergyTop: function (noCm, top) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetAlergyByNoCM/" + noCm + "?top=" + top
                });
            },
            getDiagnosa: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDiagnosaByNoCM/" + noCm
                });
            },
            getDiagnosaTop: function (noCm, top) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDiagnosaByNoCM/" + noCm + "?top=" + top
                });
            },
            getPelayananByNoCM: function (noCm, top) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-pelayanan-rawat-jalan/?noCm=" + noCm
                });
            },
            getKeluhan: function (noCm, tanggal) {
                var date = tanggal.getFullYear();
                if (tanggal.getMonth() <= 9)
                    date = date + "0" + (tanggal.getMonth() + 1);
                else
                    date = date + (tanggal.getMonth() + 1);
                if (tanggal.getDate() < 10)
                    date = date + "0" + (tanggal.getDate());
                else
                    date = date + tanggal.getDate();
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetKeluhan/" + noCm + "/" + date
                });
            }
        };
    }]);

    sarprasService.service('PemakaianAirBersihService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            savePemakaianAirBersih: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getListRuangan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            findAllPemakaianAirBersih: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            findPeriode: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            deletePemakaianAirBersih: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }

        };
    }]);


    sarprasService.service('MasterBakuMutuService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveMasterBakuMutu: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            findAllBakuMutu: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);


    sarprasService.service('MasterPantauParameter', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);


    sarprasService.service('MasterProduk', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);


    sarprasService.service('MasterPantauSatuan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);


    sarprasService.service('TampilPerlakuan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);


    sarprasService.service('TampilPerizinan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);




    sarprasService.service('OrderKendaraan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('MasterLinen', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);


    sarprasService.service('MasterBahan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);



    sarprasService.service('TampilDataPerusahaanBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);


    sarprasService.service('TampilDataAnggaran', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet




                });
            }
        };
    }]);


    sarprasService.service('TampilDataTarif', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet




                });
            }
        };
    }]);

    sarprasService.service('MasterLimbah', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);


    sarprasService.service('MasterRekanan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);


    sarprasService.service('MasterRuangan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);



    sarprasService.service('MasterWaktu', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('TampilDataLimbah', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);



    sarprasService.service('TampilDataLimbahKeluar', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            },
            getListGeneric: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
        };

    }]);


    sarprasService.service('TampilDataLaporanUjiHasil', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('TampilDataBakuMutu', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('TampilDataSatuan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('TampilDataParameter', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);


    sarprasService.service('TampilDataAirBersih', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('TampilDataNeraca', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('MasterPetugas', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('MasterJenisLimbahService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveMasterJenisLimbah: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            findAllMasterJenisLimbah: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('HasilPemeriksaanSwaService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveHasilPemeriksaanSwa: function (data, urlSave) {
                return r.post({
                    url: baseApiPostK3Kl + urlSave
                }, data);
            },
            getListParameter: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            },
            findAllHasilPemakaianSwa: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            },
            findPeriode: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            },
            deleteHasilPemakaianSwa: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            },
            getInlet: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            },
            getOutlet: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            }
        };
    }]);

    sarprasService.service('TampilDataMasterParameter', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('PemakaiandanPemanasanMesinService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListMesin: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            savePemakaian: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            findAllPemakaianMesin: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            findPeriode: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            deletePemakaian: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('TampilDataMasterSurveiPelanggan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet




                });
            }
        };
    }]);

    sarprasService.service('MesinEo', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);


    sarprasService.service('PerusahaanBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('AsuransiBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet



                });
            }
        };
    }]);

    sarprasService.service('DataPerusahaanBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('DataTarif', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('DataAnggaran', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('DataKeluhanPelanggan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('Pegawai', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('LokasiKeluhan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('Pekerjaan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('RegistrasiPasienBaru', ['$q', '$http', 'R',
        function ($q, $http, r) {
            return {

                SendData: function (dataVO, urlDetail) {
                    var deffer = $q.defer();

                    var authorization = "";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorization') > 0) {
                            authorization = element[1];
                        }
                    }
                    r.post({
                        url: baseUrlApiAction + urlDetail
                    }, dataVO).then(function successCallback(response) {
                        if (response.status === 200)
                            deffer.resolve(response);
                    }, function errorCallback(response) {
                        deffer.reject(response);
                    });
                    return deffer.promise;

                }
            };
        }
    ]);

    sarprasService.service('TORService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveTOR: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getListJabatan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            }
        };
    }]);

    sarprasService.service('MasterBakuMutuService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveMasterBakuMutu: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            findAllBakuMutu: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('RisikoRuanganKerjaService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveRisikoRuanganKerja: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getListRuangan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListRisikoKerja: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            findAllResikoKerja: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            deleteRisikoRuanganKerja: function (urlDelete) {
                return r.post({
                    url: baseApiPostData + urlDelete
                });
            }

        };
    }]);

    sarprasService.service('DaftarPegawaiService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            findAllPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            getListPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            findPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('RiwayatService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            findPegawai: function (urlGet, data) {
                return r.get({
                    url: baseUrlAction + urlGet + data
                });
            },
            getRiwayatPenyakit: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('LaporanKecelakaanKerjaService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListSatuanKerja: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('PenerimaanBarangLogistik', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {

            getNamaProduk: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },

            getKomponen: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },

            getSuplier: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },

            getSumberDana: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },

            getSatuan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },


            savePenerimaanLogistik: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            }
        };
    }]);

    sarprasService.service('DistribusiBarangLogistik', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListRuangan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            findDetailAsset: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },

            saveDistribusi: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
        };
    }]);

    sarprasService.service('DaftarPenerimaanLogistik', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getDaftarPenerimaan: function (noFaktur, tanggalAwal, tanggalAhir, produkId, supplierId) {
                return r.get({
                    url: baseUrlApiAction + 'penerimaan-barang/grid-penerimaan-barang?noFaktur=' + noFaktur + '&tanggalTerimaAwal=' + tanggalAwal + '&tanggalTerimaAhir=' + tanggalAhir + "&idProduk=" + produkId + "&supplierId=" + supplierId
                });
            },
            getProduk: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            }
        };
    }]);

    sarprasService.service('DaftarBarangInvestasi', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListRuangan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListInvestasi: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                })
            }
        };
    }]);

    sarprasService.service('DetilBarangInvestasi', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getDataInvestasi: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                })
            }
        };
    }]);

    sarprasService.service('penyusunanRupService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getPengadaan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                })
            }

        };
    }]);

    sarprasService.service('FindPasien', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            checkRujukanBpjs: function (noKepesertaan) {
                return r.get({
                    url: baseUrlApiAction + "asuransi/check-rujukan-bpjs/" + new Date().getTime() + "?id=" + noKepesertaan
                });
            },
            checkKepesertaan: function (noKepesertaan) {
                return r.get({
                    url: baseUrlApiAction + "asuransi/check-kepesertaan/" + new Date().getTime() + "?id=" + noKepesertaan
                });
            },
            getHistroyGinekologi: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/Pemeriksaan/Ginekologi/" + noCm
                });
            },

            getMonitoringStatusPKS: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },


            CheckNoReconfirm: function (noReconfirm) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien-online/confirm-registrasi-online/?noReservasi=" + noReconfirm
                });
            },
            findByNoRegistrasi: function (noRegistrasi) {
                return modelItem.kendoHttpSource("registrasi-pelayanan/get-registrasi/?noRegistrasi=" + noRegistrasi);
            },
            getAnamesisPasien: function (noCm, tanggal) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetAnamesis/" + noCm + "/" + tanggal
                });
            },
            getDiagnosisTindakan: function (noCm, tanggal) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDiagnosaTindakan/" + noCm + "/" + tanggal
                });
            },
            getDiagnosisKerja: function (noCm, tanggal) {
                return r.get({
                    url: baseUrlApiAction + ("Pasien/GetDiagnosisKerja/" + noCm + "/" + tanggal)
                });
            },
            checkPemeriksaanPasien: function (noCm, tanggal, desc) {
                return r.get({
                    url: baseUrlApiAction + ("Pasien/CheckKajianAwal/" + noCm + "/" + tanggal + "/" + desc)
                });
            },
            findByNoCM: function (noCm) {
                //  return modelItem.kendoHttpSource("Pasien/GetByNoCM/?noCM=" + noCm);
                return r.get({
                    url: baseUrlApiAction + "pasien/get/?noCm=" + noCm
                });
            },
            findDokterPenanggungJawab: function (tanggal, noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDokterPenanggungJawab/" + noCm + "/" + tanggal
                });
            },
            findGawatDarurat: function (from, until) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien/antrian-pasien-gawat-darurat/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findPerjanjian: function (from, until) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien-online/antrian-pasien-list/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            getReservasiPasienById: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pasien-online/get-pasien/?id=" + noRec
                });
            },
            findAntrianPasienBaru: function (from, until, ruangan, noCm) {
                if (noCm === undefined || noCm === '')
                    noCm = '-';
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-baru-list/?&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findOperation: function (from, until, ruangan, noCm) {
                if (noCm === undefined || noCm === '')
                    noCm = '-';
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findQueue: function (from, until, ruangan, noCm) {
                if (noCm === undefined || noCm === '')
                    noCm = '-';
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },
            findReconfirmBpjs: function (from, until) {

                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-bpjs-list/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                });
            },

            getDataPasien: function (namaIbuKandug, namaPasien, tgllahir, from, until, isKendo) {
                if (namaIbuKandug === undefined) namaIbuKandug = "";
                var url = baseUrlApiAction + "pasien/pasien-list/?noCm=" + namaPasien + "&namaIbu=" + namaIbuKandug + "&tanggalLahir=" + dateHelper.formatDate(tgllahir, 'YYYY-MM-DD') + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD');
                if (isKendo)
                    return modelItem.kendoHttpSource(url);
                return r.get({
                    url: url
                });
            },
            getByNoCM: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "pasien/get/?noCm=" + noCm
                });
            },
            getByNoRegistrasi: function (noRegistrasi) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-registrasi/?noRegistrasi=" + noRegistrasi
                });
            },
            getAlergy: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetAlergyByNoCM/" + noCm
                });
            },
            getAlergyTop: function (noCm, top) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetAlergyByNoCM/" + noCm + "?top=" + top
                });
            },
            getDiagnosa: function (noCm) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDiagnosaByNoCM/" + noCm
                });
            },
            getDiagnosaTop: function (noCm, top) {
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetDiagnosaByNoCM/" + noCm + "?top=" + top
                });
            },
            getPelayananByNoCM: function (noCm, top) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-pelayanan-rawat-jalan/?noCm=" + noCm
                });
            },
            getKeluhan: function (noCm, tanggal) {
                var date = tanggal.getFullYear();
                if (tanggal.getMonth() <= 9)
                    date = date + "0" + (tanggal.getMonth() + 1);
                else
                    date = date + (tanggal.getMonth() + 1);
                if (tanggal.getDate() < 10)
                    date = date + "0" + (tanggal.getDate());
                else
                    date = date + tanggal.getDate();
                return r.get({
                    url: baseUrlApiAction + "Pasien/GetKeluhan/" + noCm + "/" + date
                });
            }
        };
    }]);

    sarprasService.service('PengajuanUsulanAnggaranService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getPengendaliList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getKegiatanList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getKegiatanDetailList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getOutput: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getKomponen: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getAkun: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getJenisBelanja: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getJenisPengadaan: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getRuanganUnitKerja: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getSumberDana: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getUnit: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getTujuanPengiriman: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getNamaProduk: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getGetData: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                })
            },

            getKomponen: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                })
            },

            savePengajuan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },

            getDataSpek: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "sppb/detail-kontrak?noRec=" + noRec
                });
            },

            getDetilSppb: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "sppb/detail-sppb?noRec=" + noRec
                });
            },

            getDetilPphp: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "pphp/detail-sppb?noRec=" + noRec
                });
            },
        };
    }]);

    sarprasService.service('dataRupService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getDataRup: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getPengendali: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getCari: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getData: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                })
            },
            getDataRUP: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                })
            },
            getListData: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                })
            },
            getDownload: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                })
            },
            lapKartuPengendali: function (noRec) {
                // return r.get({
                //     url: baseUrlAction + "reporting/lapKartuPengendali?noRec=" + noRec
                // })
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapKartuPengendali?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
            },
            reportHps: function (noRec) {
                // return r.get({
                //     url: baseUrlAction + "reporting/lapKartuPengendali?noRec=" + noRec
                // })
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction + 'reporting/lapHPS?noRec=' + noRec + '&X-AUTH-TOKEN=' + token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
            }

        };
    }]);

    sarprasService.service('masterExtensionService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getYaTidak: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getRuangan: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getEkstension: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            saveEkstension: function (data) {
                return r.post({
                    url: baseUrlApiAction + "ekstension-no-telepon/save-ekstension/"
                }, {
                        statusSemuaRuangan: { id: data.statusSemuaRuangan },
                        statusPelanggan: { id: data.statusPelanggan },
                        ruangan: { id: data.ruangan.id },
                        counterNumber: data.nomor,
                        noEkstension: data.noExtension
                    });
            }

        };
    }]);

    sarprasService.service('penyusunanRupService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getPengadaan: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }

        };
    }]);


    sarprasService.service('OrderKendaraan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('MasterLinen', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('MasterBahan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('TampilDataPerusahaanBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };

    }]);

    sarprasService.service('TampilDataAnggaran', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet




                });
            }
        };
    }]);

    sarprasService.service('TampilDataTarif', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet




                });
            }
        };
    }]);

    sarprasService.service('MesinEo', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('PerusahaanBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('AsuransiBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet



                });
            }
        };
    }]);

    sarprasService.service('DataPerusahaanBekerjasama', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('DataTarif', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('DataAnggaran', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveOrderKendaraan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('DataKeluhanPelanggan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('InformasiDokter', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('InformasiRuangan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('TampilPenghargaan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('Pegawai', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('LokasiKeluhan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('Pekerjaan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('RegistrasiPasienBaru', ['$q', '$http', 'R',
        function ($q, $http, r) {
            return {

                SendData: function (dataVO, urlDetail) {
                    var deffer = $q.defer();

                    var authorization = "";
                    var arr = document.cookie.split(';')
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i].split('=');
                        if (element[0].indexOf('authorization') > 0) {
                            authorization = element[1];
                        }
                    }
                    r.post({
                        url: baseUrlApiAction + urlDetail
                    }, dataVO).then(function successCallback(response) {
                        if (response.status === 200)
                            deffer.resolve(response);
                    }, function errorCallback(response) {
                        deffer.reject(response);
                    });
                    return deffer.promise;

                }
            };
        }
    ]);

    sarprasService.service('TORService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveTOR: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getListJabatan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            }
        };
    }]);

    sarprasService.service('MasterBakuMutuService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveMasterBakuMutu: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            findAllBakuMutu: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('RisikoRuanganKerjaService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveRisikoRuanganKerja: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getListRuangan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListRisikoKerja: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            findAllResikoKerja: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            deleteRisikoRuanganKerja: function (urlDelete) {
                return r.post({
                    url: baseApiPostData + urlDelete
                });
            }

        };
    }]);

    sarprasService.service('DaftarPegawaiService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            findAllPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            getListPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            findPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('RiwayatService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            findPegawai: function (urlGet, data) {
                return r.get({
                    url: baseUrlAction + urlGet + data
                });
            },
            findPegawaiId: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            getRiwayatPenyakit: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('LaporanKecelakaanKerjaService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListSatuanKerja: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('JadwalRencanaPemeriksaanService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListSatuanKerja: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('RencanaPemeriksaanService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            findPegawaiId: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            saveRencanaPemeriksaan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
        };
    }]);

    sarprasService.service('SysAdminProdukService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getDataProduk: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            }
            //    getListDetailJenis: function (urlGet) {
            //         return r.get({
            //             url: baseUrlListData + urlGet
            //         });
            //     },
            //     getListNamaProduk: function (urlGet, data) {
            //         return r.get({
            //             url: baseUrlAction + urlGet + data
            //         });
            //     },
            //     getListNamaDetailPemeriksaan: function (urlGet, data) {
            //         return r.get({
            //             url: baseUrlAction + urlGet + data
            //         });
            //     }
        };
    }]);

    sarprasService.service('PemakaiandanPemanasanMesinService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListMesin: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            savePemakaian: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            findAllPemakaianMesin: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            findPeriode: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            deletePemakaian: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('PemakaianAirBersihService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            savePemakaianAirBersih: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getListRuangan: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            findAllPemakaianAirBersih: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            findPeriode: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            deletePemakaianAirBersih: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }

        };
    }]);

    sarprasService.service('MasterJenisLimbahService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveMasterJenisLimbah: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            findAllMasterJenisLimbah: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('JumlahApresiasiLayanan', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveMasterJenisLimbah: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);

    sarprasService.service('masterPertanyaanSurveiPelangganService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getPertanyaan: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            savePertanyaan: function (data) {
                return r.post({
                    url: baseUrlApiAction + "pertanyaanSurvey/save-pertanyaan-survey/"
                }, {
                        pertanyaan: data.pertanyaan
                    });
            }

        };
    }]);

    sarprasService.service('FindGizi', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getSarpras: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            },
            getOrderGizi: function (produksId) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-pemesanan-bahan?produks=" + produksId
                });
            }
        }
    }]);

    // SERVICE / URL BARU
    // Service Sarpras khusus Laundry
    sarprasService.service('FindLaundry', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getLaundry: function (urlGet) {
                return r.get({
                    url: baseUrlLaundry + urlGet
                });
            }
        }
    }]);

    sarprasService.service('ManageIT', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getItem: function (urlGet) {
                return r.get({
                    url: baseApiIT + urlGet
                });
            },
            saveDataIT: function (data, urlSave) {
                return r.post({
                    url: baseApiIT + urlSave
                }, data);
            },
        }
    }])

    sarprasService.service('ManageLaundry', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            saveLaundry: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataLaundry + urlSave
                }, data);
            },
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlLaundry + urlGet
                });
            },
            saveMasterAlatLaundry: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataLaundry + urlSave
                }, data);
            },
            saveDataUji: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataLaundry + urlSave
                }, data);
            },
            saveSarpras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataLaundry + urlSave
                }, data);
            },
            savePengeringan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataLaundry + urlSave
                }, data);
            },
        }
    }]);
    // sampe sini 

    // Service unutk K3KL
    sarprasService.service('ManageKKKL', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderList: function (urlGet) {
                return r.get({
                    url: baseUrlK3KL + urlGet
                });
            },
            saveDataSarPras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostK3Kl + urlSave
                }, data);
            },
            
            downloadFile: function (url) {
                var authorization = "";
                var arr = document.cookie.split(';')
                for (var i = 0; i < arr.length; i++) {
                    var element = arr[i].split('=');
                    if (element[0].indexOf('authorization') > 0) {
                        authorization = element[1];
                    }
                }
                window.open(baseUrlK3KL + url + '/?X-AUTH-TOKEN=' + authorization, '_blank')
            },
        }
    }]);

    // Service Sarpras khusus IPSRS
    sarprasService.service('FindIPSRS', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getOrderBarang: function (dateStart, dateEnd, ruanganTujuanId) {
                return r.get({
                    url: baseUrlIPSRS + "request-permintaan-barang/get-order/?dateStart=" + dateStart +
                        "&dateEnd=" + dateEnd +
                        "&ruanganTujuanId=" + ruanganTujuanId + "&take=1000"
                    // "&ruanganId=" + ruanganId +
                    // "&noOrder=" + noOrder
                });
            },
        }
    }]);

    sarprasService.service('ManageIPSRS', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getItemIPSRS: function (urlGet) {
                return r.get({
                    url: baseApiPostDataIPSRS + urlGet
                });
            },
            saveDataSarPras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataIPSRS + urlSave
                }, data);
            },
        }
    }]);

    sarprasService.service('ManageCSSD', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getItem: function (urlGet) {
                return r.get({
                    url: baseUrlCSSD + urlGet
                });
            },
            saveDataSarPras: function (data, urlSave) {
                return r.post({
                    url: baseApiPostDataCSSD + urlSave
                }, data);
            },
        }
    }]);
    // sampe sini
});