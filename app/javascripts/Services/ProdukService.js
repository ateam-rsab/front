define(['Configuration'], function(configuration) {

    var baseUrlData = config.baseUrlData;;

    var dataRequestService = angular.module('ProdukService', []);
    dataRequestService.service('FindProduk', ['$q', 'R', function($q, r) {

        return {
            getKartuStok: function(produkId, from, until) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/get-kartu-stok?idProduk=' + produkId + "&dateStart=" + from + "&dateEnd=" +until
                });
            },
            getKartuStokSRO: function(from, until, ruanganId, produkId) {
                return r.get({
                    url: configuration.baseApiUrlData + 'kartu-stok/get-kartu-stok?dateStart=' + from + "&dateEnd=" +until + "&ruanganId=" + ruanganId + "&produkId=" + produkId
                });
            },
            getDaftarStok: function(jenisBarangId, ruanganId, asalProdukId, produkId) {
                return r.get({
                    url: configuration.baseApiUrlData + 'stok-produk-global/list-stok?kelompokProdukId=' + jenisBarangId + '&ruanganId=' + ruanganId + '&asalProdukId=' + asalProdukId + "&produkId=" + produkId
                });
            },
            getStokRuangan: function(urlGet) {
                return r.get({
                    url: configuration.baseApiUrlData + urlGet
                });
            },
            jenisProdukByKelompokProduk: function(kelompokProduk) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/find-jenis-produk?idKelompokProduk=' + kelompokProduk
                });
            }, 
            jenisProdukLaborat: function() {
                return r.get({
                    url: configuration.baseApiUrlData + 'product//find-jenis-produk-laboratorium'
                });
            },
            jenisProdukRadiologi: function() {
                return r.get({
                    url: configuration.baseApiUrlData + 'registrasi-pelayanan/jenis-produk/'
                });
            },
            findStokDarah: function(idProduk) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/find-stok-produk-darah?idProduk=' + idProduk
                });
            },
            findGenerikObat: function(idGenerik) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/find-same-generic?idGeneric=' + idGenerik
                });
            },
            findStokBarang: function(idProduk, idRuangan) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/find-stok-produk?idProduk=' + idProduk + '&idRuangan=' + idRuangan
                });
            },
            findObat: function(namaObat) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/find-obat?namaObat=' + namaObat
                });
            },
            produkByJenisProduk: function(idDetailJenisProduk) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/find-produk?idDetailJenisProduk=' + idDetailJenisProduk
                });
            },
            detailJenisProdukByJenisProduk: function(idJenisProduk) {
                return r.get({
                    url: configuration.baseApiUrlData + 'product/find-detail-jenis-produk?idJenisProduk=' + idJenisProduk
                });
            },
            getListRuangan: function (urlGet) {
                return r.get({
                    url: configuration.baseUrlListData + urlGet
                });
            },
            getKonversi: function(satuanAwal, satuanAkhir, qty) {
                return r.get({
                    url: configuration.baseApiUrlData + 'pphp/konversi?satuanAwal=' + satuanAwal + '&satuanAhir=' + satuanAkhir + '&qty=' + qty
                });
            },
            getKomponen : function (urlGet) {
                return r.get({
                    url: configuration.baseApiUrlData + urlGet
                });
            },
            getStokOpnameRuangan : function (idKelompokProduk, idJenisProduk, idnamaProduk) {
                return r.get({
                    url: configuration.baseApiUrlData + 'stok-op-name/list-stok-op-name?kelompokProdukId=' + idKelompokProduk + '&jenisProdukId=' + idJenisProduk + '&produkId=' + idnamaProduk
                });
            },
            getDataPengiriman : function (periode, noTerima, idnamaProduk) {
                return r.get({
                    url: configuration.baseApiUrlData + 'retur-ruangan/list-penerimaan-barang' + periode + '&noTerima=' + noTerima + '&produkId=' + idnamaProduk
                });
            },
            getOrderPemusnahan : function (idKelProduk, idJenProduk, idProduk) {
                return r.get({
                    url: configuration.baseApiUrlData + 'pemusnahan-barang/list-stok-detail?kelProdukId=' + idKelProduk + '&jenProdukId=' + idJenProduk + '&produkId=' + idProduk
                });
            },
            getDataPaketLayanan: function() {
                return r.get({
                    url: configuration.baseUrlAction + 'service/list-generic/?view=Paket&select=id,namaPaket&criteria=statusEnabled,jenisPaketId&values=true,4&order=namaPaket:asc'
                })
            }
        };
    }]);

});