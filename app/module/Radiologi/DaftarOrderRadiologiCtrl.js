define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarOrderRadiologiCtrl', ['$q', '$rootScope', '$state', 'FindProduk', 'CacheHelper', 'ManagePasien', 'socket', '$scope', 'ModelItem', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper',
        function ($q, $rootScope, $state, produkService, cacheHelper, managePasien, socket, $scope, ModelItem, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper) {
            $scope.item = {};

            $scope.item.tglAwal = dateHelper.setJamAwal(new Date());
            $scope.item.tglAkhir = dateHelper.setJamAkhir(new Date());
            console.log($scope.item.tglAwal);
            $scope.getDataOrder = () => {
                $scope.isRouteLoading = true;
                let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm");
                findPasienRadiologi.getData("lab-radiologi/get-daftar-order-rad?tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir).then((res) => {

                    $scope.dataSourceOrder = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;

                });
            }

            $scope.optGridOrder = {
                dataBound: function (e) {
                    $('td').each(function () {
                        if ($(this).text() == 'BELUM DIVERIFIKASI') {
                            $(this).addClass('unverified')
                        };
                        if ($(this).text() == 'SELESAI DIVERIFIKASI') {
                            $(this).addClass('verified')
                        };
                    })
                },
                columns: [{
                    "field": "noorder",
                    "title": "No Order",
                    "width": 100,
                }, {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": 100,
                }, {
                    "field": "nocm",
                    "title": "No. Rekam Medis",
                    "width": 90,
                }, {
                    "field": "tglorder",
                    "title": "Tanggal Order",
                    "width": 100,
                }, {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": 150,
                }, {
                    "field": "umur",
                    "title": "Umur",
                    "width": 100,
                }, {
                    "field": "namaruangan",
                    "title": "Ruangan Asal",
                    "width": 100,
                }, {
                    "field": "namalengkap",
                    "title": "Pegawai Order",
                    "width": 100,
                }, {
                    "field": "status",
                    "title": "Status",
                    "width": 100,
                }, {
                    command: [{
                        text: "Verifikasi Order",
                        click: verifikasiOrder,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 90
                }]
            }

            let init = () => {
                $scope.getDataOrder();
            }
            init();

            function verifikasiOrder(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if(dataItem.status === "SELESAI DIVERIFIKASI") {
                    toastr.info(`No. Order ${dataItem.noorder} Sudah Selesai Di Verifikasi`);
                    return;
                }

                localStorage.setItem("dataOrderRadiologi", JSON.stringify(dataItem));

                $state.go("VerifikasiOrderRadiologiRev", {
                    norec: dataItem.norec_so
                })
                // window.location.href = "#/VerifikasiOrderRadiologiRev/" + dataItem.norec_so;

            }
        }
    ]);
});