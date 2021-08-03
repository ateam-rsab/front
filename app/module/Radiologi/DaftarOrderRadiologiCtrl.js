define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarOrderRadiologiCtrl', ['$q', '$rootScope', '$state', 'FindProduk', 'CacheHelper', 'ManagePasien', 'socket', '$scope', 'ModelItem', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper',
        function ($q, $rootScope, $state, produkService, cacheHelper, managePasien, socket, $scope, ModelItem, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper) {
            $scope.item = {};

            $scope.listStatus = [{
                id: 1,
                name: "PILIH SEMUA",
                value: ""
            }, {
                id: 2,
                name: "SELESAI DIVERIFIKASI",
                value: 2
            }, {
                id: 3,
                name: "BELUM DIVERIFIKASI",
                value:1
            }]

            $scope.item.statusData = {
                id: 1,
                name: "PILIH SEMUA",
                value: "",
            },

                $scope.item.tglAwal = dateHelper.setJamAwal(new Date());
            $scope.item.tglAkhir = dateHelper.setJamAkhir(new Date());
            console.log($scope.item.tglAwal);
            $scope.getDataOrder = () => {
                // http://192.168.12.3:5555/simrs_harkit/service/transaksi/lab-radiologi/get-daftar-order-rad?
// tglAwal=2021-08-01&tglAkhir=2021-08-03
// &noorder=R2107000001
// &nocm=00929220
// &namaruangan=Angg
// &namapasien=moh
// &status=1
// &noregistrasi=2105010470
                $scope.isRouteLoading = true;
                let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm");
                findPasienRadiologi.getData(`lab-radiologi/get-daftar-order-rad?tglAwal=${tglAwal}&tglAkhir=${tglAkhir}&noorder=${$scope.item.noOrder ? $scope.item.noOrder: ""}&nocm=${$scope.item.noRM ? $scope.item.noRM : ""}&namaruangan=${$scope.item.namaRuangan ? $scope.item.namaRuangan : ""}&namapasien=${$scope.item.namaPasien ? $scope.item.namaPasien : ""}&status=${$scope.item.statusData ? $scope.item.statusData.value : ""}&noregistrasi=${$scope.item.noReg ? $scope.item.noReg : ""}`).then((res) => {

                    $scope.dataSourceOrder = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;

                });
            }

            $scope.optGridOrder = {
                dataBound: function (e) {
                    var grid = this;
                    var gridRows = grid.tbody.find("tr");
                    $('td').each(function () {
                        if ($(this).text() == 'BELUM DIVERIFIKASI') {
                            $(this).addClass('unverified')
                        };
                        if ($(this).text() == 'SELESAI DIVERIFIKASI') {
                            $(this).addClass('verified')
                        };


                    })
                    for (var i = 0; i < gridRows.length; i++) {
                        var row = $(gridRows[i]);
                        var dataItem = grid.dataItem(row);
                        // console.log("dataItem", dataItem);
                        //perform your custom check
                        if (dataItem.status === "SELESAI DIVERIFIKASI") {
                            //hide buttons using jQuery
                            row.find(".k-icon").after("DETAIL ORDER");
                        } else {
                            row.find(".k-icon").after("VERIFIKASI ORDER");
                        }

                    }
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
                        text: " ",
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
                // if (dataItem.status === "SELESAI DIVERIFIKASI") {
                //     toastr.info(`No. Order ${dataItem.noorder} Sudah Selesai Di Verifikasi`);
                //     return;
                // }
                // $scope.isVerified = dataItem.status === "SELESAI DIVERIFIKASI";

                localStorage.setItem("dataOrderRadiologi", JSON.stringify(dataItem));

                $state.go("VerifikasiOrderRadiologiRev", {
                    norec: dataItem.norec_so
                })
                // window.location.href = "#/VerifikasiOrderRadiologiRev/" + dataItem.norec_so;

            }
        }
    ]);
});