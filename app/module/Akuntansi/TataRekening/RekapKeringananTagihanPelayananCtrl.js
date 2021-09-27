define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapKeringananTagihanPelayananCtrl', ['$sce', '$state', '$q', '$rootScope', '$scope', '$window', 'ModelItemAkuntansi', 'ManageTataRekening', 'ManageKasir', 'ManagePasien', '$mdDialog', 'DateHelper',
        function ($sce, $state, $q, $rootScope, $scope, window, modelItemAkuntansi, manageTataRekening, manageKasir, managePasien, $mdDialog, DateHelper) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.item.bulan = new Date();

            $scope.optGridDetail = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                scrollable: true,
                columns:[{
                    field: "no",
                    title: "<h3>No</h3>",
                    width: "40px"
                }, {
                    field: "namaLengkap",
                    title: "<h3>Nama Pegawai</h3>",
                    width: "40px"
                }, {
                    field: "tanggalFormatted",
                    title: "<h3>Tanggal</h3>",
                    width: "40px"
                }, {
                    field: "jenisLog",
                    title: "<h3>Jenis Log</h3>",
                    width: "40px"
                }]
            }
            
            $scope.optGrid = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                scrollable: true,
                columns: [{
                    field: "no",
                    title: "<h3>No</h3>",
                    width: "40px",
                    filterable: false
                }, {
                    field: "namaPasien",
                    title: "<h3>Nama Pasien</h3>",
                    width: "200px",
                    filterable: true
                }, {
                    field: "noRegistrasi",
                    title: "<h3>No. Registrasi</h3>",
                    width: "80px",
                    filterable: false
                }, {
                    field: "totalTagihanFormatted",
                    title: "<h3>Total Tagihan</h3>",
                    width: "100px",
                    filterable: false
                }, {
                    field: "totalDiskonFormatted",
                    title: "<h3>Total Diskon</h3>",
                    width: "100px",
                    filterable: false
                }, {
                    field: "biayaJasaFarmasiFormatted",
                    title: "<h3>Biaya Farmasi</h3>",
                    width: "100px",
                    filterable: false
                }, {
                    field: "jenisDiskon",
                    title: "<h3>Jenis Diskon</h3>",
                    width: "300px",
                    filterable: false
                }, {
                    command: [
                        { text: "Detail", click: detailData },
                    ], title: "&nbsp;", width: 70,
                    attributes: {
                        style: "text-align:center;valign=middle"
                    }
                }]
            }

            function detailData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                manageTataRekening.getReporting(`reporting/log-rekapitulasi-diskon?norecPd=${dataItem.norecPd}&norecSp=${dataItem.norecSp}`).then(res => { 
                    for(let i = 0; i < res.data.length; i++) {
                        res.data[i].no = i + 1;
                        res.data[i].keterangan = res.data[i].keterangan ? res.data[i].keterangan : '-';
                        res.data[i].tanggalFormatted = res.data[i].tanggal ? DateHelper.formatDate(res.data[i].tanggal, "YYYY-MM-DD") : "-";
                    }
                    
                    $scope.dataSourceDetail = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    });
                    $scope.popUpDetail.open().center();
                })
            }

            let formatCurrency = (data) => {
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data);
            }

            $scope.getData = () => {

                for (let i = 0; i < res.data.data.length; i++) {

                    res.data.data[i].no = i + 1;
                    res.data.data[i].biayaJasaFarmasiFormatted = res.data.data[i].biayaJasaFarmasi ? formatCurrency(res.data.data[i].biayaJasaFarmasi) : "-";
                    res.data.data[i].totalTagihanFormatted = res.data.data[i].totalTagihan ? formatCurrency(res.data.data[i].totalTagihan) : 0;
                    res.data.data[i].totalDiskonFormatted = res.data.data[i].totalDiskon ? formatCurrency(res.data.data[i].totalDiskon) : 0;
                }

                $scope.dataSource = new kendo.data.DataSource({
                    data: res.data.data,
                    pageSize: 10
                })
                console.log(res);
                // $scope.isRouteLoading = true;
                // manageTataRekening.getReporting(`reporting/rekapitulasi-diskon?periode=${$scope.item.bulan ? DateHelper.toTimeStamp($scope.item.bulan) : ''}`).then(res => {
                //     for (let i = 0; i < res.data.data.length; i++) {

                //         res.data.data[i].no = i + 1;
                //         res.data.data[i].biayaJasaFarmasiFormatted = res.data.data[i].biayaJasaFarmasi ? formatCurrency(res.data.data[i].biayaJasaFarmasi) : "-";
                //         res.data.data[i].totalTagihanFormatted = res.data.data[i].totalTagihan ? formatCurrency(res.data.data[i].totalTagihan) : 0;
                //         res.data.data[i].totalDiskonFormatted = res.data.data[i].totalDiskon ? formatCurrency(res.data.data[i].totalDiskon) : 0;
                //     }
                //     $scope.isRouteLoading = false;

                //     $scope.dataSource = new kendo.data.DataSource({
                //         data: res.data.data,
                //         pageSize: 10
                //     })
                // })
            }
            $scope.getData();

            $scope.search = () => {
                $scope.getData();
            }
        }
    ]);
});