define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarWaktuTungguRadiologiCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ManageServicePhp', '$window', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, manageServicePhp, $window, $mdDialog) {
            $scope.item = {};
            $scope.jumlahLayanan = 2000;
            $scope.item.tglAwal = dateHelper.setJamAwal(new Date());
            $scope.item.tglAkhir = dateHelper.setJamAkhir(new Date());

            // $scope.optDetailLIS = {
            //     columns: [{
            //         "field": "namaproduk",
            //         "title": "Nama Produk",
            //         "width": 100,
            //         footerTemplate: "Jumlah"
            //     }, {
            //         "field": "qtyproduk",
            //         "title": "Jumlah",
            //         "width": 100,
            //     }, {
            //         "field": "hargasatuanFormatted",
            //         "title": "Harga Satuan",
            //         "width": 200,
            //         footerTemplate: "<span>{{jumlahLayanan}}</span>"
            //     }]
            // }

            $scope.optGridWaktuTunggu = {
                columns: [{
                    "field": "nocm",
                    "title": "No. Rekam Medis",
                    "width": 100,
                }, {
                    "field": "noregistrasi",
                    "title": "No. Registrasi",
                    "width": 100,
                }, {
                    "field": "tglregistrasi",
                    "title": "Tanggal Registrasi",
                    "width": 100,
                }, {
                    "field": "noorder",
                    "title": "No. Order",
                    "width": 100,
                }, {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": 200,
                }, {
                    "field": "tglpelayanan",
                    "title": "Tanggal Pelayanan",
                    "width": 100,
                }, {
                    "field": "tglSelesai",
                    "title": "Tanggal Selesai",
                    "width": 100,
                }, {
                    "field": "selisihWaktu",
                    "title": "Waktu Tunggu",
                    "width": 100,
                },
                    // , {
                    //     command: [{
                    //         text: "Kirim Ke LIS",
                    //         click: verifikasi,
                    //         // imageClass: "k-icon k-i-pencil"
                    //     }],
                    //     title: "",
                    //     width: 70
                    // }
                ],

                toolbar: [
                    { text: "export", name: "Export detail", template: '<button ng-click="exportToExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-print"></span>Export To Excel</button>' }
                ],
                pageable: {
                    messages: {
                        display: "Menampilkan {0} - {1} data dari {2} data"
                    },
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
            }

            $scope.getDataKehadiran = () => {
                $scope.isRouteLoading = true;

                let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm");

                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-waktu-tunggu-rad?tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir, true).then(function (res) {
                    $scope.ratarata = res.data.rata_waktu_tunggu;
                    $scope.dataSourceKehadiranPasien = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    });

                    $scope.isRouteLoading = false;
                })
            }
            $scope.getDataKehadiran();

            // function verifikasi(e) {
            //     e.preventDefault();
            //     var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            //     $scope.selectedDataLIS = dataItem;
            //     $scope.jumlahLayanan = 0;
            //     for (let i = 0; i < dataItem.bridging.length; i++) {
            //         let subTotal = parseInt(dataItem.bridging[i].qtyproduk) * parseInt(dataItem.bridging[i].hargasatuan);
            //         dataItem.bridging[i].hargasatuanFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(dataItem.bridging[i].hargasatuan));

            //         $scope.jumlahLayanan += subTotal;
            //     }

            //     $scope.jumlahLayanan = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format($scope.jumlahLayanan);
            //     $scope.dataSourceDetailLIS = new kendo.data.DataSource({
            //         data: dataItem.bridging,
            //         pageSize: 10
            //     });

            //     $scope.popUpVerif.open().center();


            // }

            // $scope.kirimKeLis = () => {
            //     $scope.popUpVerif.close();
            //     let dataItem = $scope.selectedDataLIS;
            //     let dataSave = {
            //         norec_order: dataItem.norecSO
            //     }

            //     let dataSysmex = []

            //     for (let i = 0; i < dataItem.bridging.length; i++) {
            //         dataSysmex.push({
            //             produkid: dataItem.bridging[i].produkid,
            //             hargasatuan: dataItem.bridging[i].hargasatuan,
            //             qtyproduk: dataItem.bridging[i].qtyproduk,
            //             komponenharga: dataItem.bridging[i].komponenharga,
            //         })
            //     }
            //     var itemsaveBridge = {
            //         bridging: dataSysmex,
            //         norec_pp: dataItem.norec_pp,
            //         noorder: dataItem.noorder,
            //         norec_so: dataItem.norec_so,
            //         objectkelasfk: dataItem.objectkelasfk,
            //         norec_pd: dataItem.norec_pd,
            //         objectruangantujuanfk: dataItem.objectruangantujuanfk,
            //         objectpegawaiorderfk: dataItem.objectpegawaiorderfk,
            //         iddokterverif: dataItem.iddokterverif,
            //         namadokterverif: dataItem.namadokterverif,
            //         iddokterorder: dataItem.iddokterorder,
            //         namadokterorder: dataItem.namadokterorder,
            //     }

            //     let confirm = $mdDialog.confirm()
            //         .title('Apakah anda yakin mengirim data ke LIS?')
            //         .textContent(`${dataItem.noRegistrasi} akan di kirim ke LIS`)
            //         .ariaLabel('Lucky day')
            //         // .targetEvent(e)
            //         .ok('Simpan')
            //         .cancel('Batal');

            //     $mdDialog.show(confirm).then(function () {
            //         manageLogistikPhp.saveData("transaksi/lab-radiologi/save-selesai", dataSave).then((res) => {
            //             manageServicePhp.saveBridingSysmex(itemsaveBridge).then(function (e) {
            //                 $scope.popUpVerif.close();
            //                 $scope.getDataKehadiran();
            //             });

            //         })
            //     }, function () {
            //         $scope.popUpVerif.open().center();
            //         console.log("Batal")
            //     });
            // }
        }
    ]);
});