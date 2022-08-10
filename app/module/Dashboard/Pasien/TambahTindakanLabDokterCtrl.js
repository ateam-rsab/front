define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TambahTindakanLabDokterCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'FindProduk', 'DateHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, FindProduk, DateHelper) {
            let dataLab = JSON.parse(localStorage.getItem("dataRiwayatLab"));
            $scope.item = {};
            let nocm_str = "";
            let norec_apd = "";
            let namaRuanganFk = "";
            let norec_pd = "";
            let baseURLFiltering = "idjenisperiksapenunjang=";

            $scope.getDataKategori = () => {
                manageLogistikPhp.getDataTableMaster("produk/grup-penunjang").then(function (dat) {
                    $scope.listKategori = dat.data.penunjang.jenisperiksapenunjang;

                })
            }
            $scope.getDataKategori();

            $scope.getDataPaket = function () {
                // http://192.168.12.3:8080/jasamedika-web/service/list-generic/?view=Paket&select=id,namaPaket&criteria=statusEnabled,jenisPaketId&values=true,4&order=namaPaket:asc
                manageLogistikPhp.getDataTableMaster("produk/master-paket?idjenispaket=4").then(function (dat) {
                    $scope.listPaket = dat.data;

                });
            }
            $scope.getDataPaket();

            $scope.listFilters = [
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            ];

            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
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
                    // $scope.header.DataNoregis = chacePeriode[13]
                    // if ($scope.header.DataNoregis == undefined) {
                    //     $scope.header.DataNoregis = false;
                    // }
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                    // manageLogistikPhp.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi=" +
                    //     $scope.item.noregistrasi, true).then(function (dat) {
                    //     $scope.item.statusVerif = dat.data.status
                    // });
                }
            }
            LoadCacheHelper();

            $scope.updateSelectedData = (data, i) => {
                $scope.selectedDataProduk = [];
                $scope.listLayanan[i].checked = !$scope.listLayanan[i].checked;

                for (let i in $scope.listLayanan) {

                    if ($scope.listLayanan[i].checked) {
                        $scope.selectedDataProduk.push($scope.listLayanan[i]);
                        // dataLab.details.push($scope.listLayanan[i]);
                    }
                }

                // $scope.dataGridRiwayat = new kendo.data.DataSource({
                //     data: dataLab.details,
                //     pageSize: 10
                // })
            }

            let tempDataGrid = [];
            $scope.tambahData = () => {
                // tempDataGrid = $scope.dataGridRiwayat._data;
                // for (let i in $scope.selectedDataProduk) {
                //     tempDataGrid.push({
                //         namaproduk: $scope.selectedDataProduk[i].namaproduk,
                //         no: tempDataGrid.length + 1,
                //         objectkelasfk: $scope.item.idKelas,
                //         objectruanganfk: namaRuanganFk,
                //         objectruangantujuanfk: $scope.item.ruangantujuan.id,
                //         produkfk: $scope.selectedDataProduk[i].id,
                //         qtyproduk: $scope.selectedDataProduk[i].jmlLayanan,
                //         pemeriksaanluar: $scope.selectedDataProduk[i].checkedPemeriksaanLuar,
                //         catatan: $scope.selectedDataProduk[i].catatan,
                //         tglorder: DateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss")
                //     })
                // }

                console.log($scope.selectedDataProduk);

                let data = {
                    norec_pd: dataLab.norecpd,
                    norec_so: dataLab.norecSo,
                    qtyproduk: 1,
                    objectruanganfk: dataLab.objectruanganfk,
                    objectruangantujuanfk: dataLab.objectruangantujuanfk,
                    departemenfk: 3,
                    pegawaiorderfk: dataLab.objectpegawaiorderfk,
                    details: []
                }

                for (let i = 0; i < $scope.selectedDataProduk.length; i++) {
                    data.details.push({
                        // no: dataGrid[i].no,
                        produkfk: $scope.selectedDataProduk[i].id,
                        namaproduk: $scope.selectedDataProduk[i].namaproduk,
                        qtyproduk: $scope.selectedDataProduk[i].jmlLayanan,
                        objectruanganfk: dataLab.objectruanganfk,
                        objectruangantujuanfk: dataLab.objectruangantujuanfk,
                        objectkelasfk: dataLab.details[0].objectkelasfk,
                        catatanOrder: $scope.selectedDataProduk[i].catatan
                    })
                }

                manageLogistikPhp.saveData("transaksi/lab-radiologi/save-order-layanan-new", data).then(res => {
                    $scope.popupAddLayanan.close();
                    $scope.getDataDetail();
                });

                // $scope.dataGridRiwayat = new kendo.data.DataSource({
                //     data: tempDataGrid,
                //     pageSize: 10
                // });
                // tempDataGrid = [];
                // $scope.selectedDataProduk = [];
                //
            }


            $scope.changeBaseUrlFiltering = (data, id) => {
                if (data) {
                    $scope.item.paket = null;
                } else {
                    $scope.item.kategori = null;
                }
                baseURLFiltering = (data ? "idjenisperiksapenunjang=" : "idpaket=") + (id ? id : "");
            }

            $scope.filterPelayanan = function (data) {
                $scope.isLoading = true;
                manageLogistikPhp.getDataTableTransaksi("pelayanan/get-order-penunjang?departemenfk=3&nocm=" + nocm_str + '&norec_apd=' + norec_apd + "&" + baseURLFiltering + "&filter_huruf=" + (data ? data.toLowerCase() : "") + "&filter_contain=" + ($scope.filterContain ? $scope.filterContain : ""), true).then(function (dat) {
                    for (let i in dat.data.produk) {
                        dat.data.produk[i].checked = false;
                        dat.data.produk[i].jmlLayanan = 0;
                        dat.data.produk[i].checkedPemeriksaanLuar = false;
                    }

                    $scope.item.ruanganAsal = dat.data.data[0].namaruangan
                    $scope.listRuanganTujuan = dat.data.ruangantujuan;
                    $scope.item.ruangantujuan = {
                        id: dat.data.ruangantujuan[2].id,
                        namaruangan: dat.data.ruangantujuan[2].namaruangan

                    }
                    $scope.listLayanan = dat.data.produk;
                    namaRuanganFk = dat.data.data[0].objectruanganfk
                    norec_pd = dat.data.data[0].noregistrasifk
                    $scope.isLoading = false;
                });
            }
            $scope.filterPelayanan("");

            $scope.getDataDetail = () => {
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-order-pelayanan-new?norec_so=" + dataLab.norecSo + "&objectkelasfk=" + dataLab.details[0].objectkelasfk).then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].no = i + 1;
                    }

                    $scope.dataGridRiwayat = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                })
            }
            $scope.getDataDetail();

            let init = () => {

                $scope.columnGridRiwayat = [{
                    field: "no",
                    title: "No.",
                    width: "50px"
                }, {
                    field: "namaproduk",
                    title: "Nama Produk",
                    width: "300px"
                }, {
                    field: "qtyproduk",
                    title: "Qty",
                    width: "300px"
                }, {
                    field: "catatan",
                    title: "catatan",
                    width: "200px"
                }, {
                    command: [{
                        text: "Hapus",
                        click: hapusData
                    }],
                    title: "&nbsp;",
                    width: 50,
                    attributes: {
                        style: "text-align:center;valign=middle"
                    }
                }]

                $scope.optGridRiwayat = {
                    toolbar: [{
                        name: "tambah",
                        text: "Tambah Tindakan",
                        template: '<button ng-click="tambahTindakan()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Tindakan</button>'
                    }],
                    editable: true,
                    columns: $scope.columnGridRiwayat
                }

                // for (let i = 0; i < dataLab.details.length; i++) {
                //     dataLab.details[i].no = i + 1;
                // }

                // $scope.dataGridRiwayat = new kendo.data.DataSource({
                //     data: dataLab.details,
                //     pageSize: 10
                // })
            }

            function hapusData(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));



                manageLogistikPhp.saveData("transaksi/lab-radiologi/delete-order-pelayanan", {
                    norec_op: dataItem.norec_op
                }).then(res => {
                    $scope.getDataDetail();
                })
            }

            $scope.tambahTindakan = () => {
                $scope.popupAddLayanan.open().center();
            }
            init();


            $scope.simpanData = () => {

                let dataGrid = $scope.dataGridRiwayat._data;

                let data = {
                    norec_pd: dataLab.norecpd,
                    norec_so: dataLab.norecSo,
                    qtyproduk: 1,
                    objectruanganfk: dataLab.objectruanganfk,
                    objectruangantujuanfk: dataLab.objectruangantujuanfk,
                    departemenfk: 3,
                    pegawaiorderfk: dataLab.objectpegawaiorderfk,
                    details: []
                }

                for (let i = 0; i < dataGrid.length; i++) {
                    data.details.push({
                        no: dataGrid[i].no,
                        produkfk: dataGrid[i].prid,
                        namaproduk: dataGrid[i].namaproduk,
                        qtyproduk: dataGrid[i].qtyproduk,
                        objectruanganfk: dataGrid[i].objectruanganfk,
                        objectruangantujuanfk: dataGrid[i].objectruangantujuanfk,
                        objectkelasfk: dataGrid[i].objectkelasfk,
                        catatanOrder: dataGrid[i].catatan ? dataLab.details[i].catatan : dataLab.details[i].catatanOrder
                    })
                }

                manageLogistikPhp.saveData("transaksi/lab-radiologi/save-order-layanan", data).then(res => {
                    window.history.back();
                });
            }
        }
    ]);
});

