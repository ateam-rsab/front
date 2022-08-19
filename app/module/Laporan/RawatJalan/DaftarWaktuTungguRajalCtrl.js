define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarWaktuTungguRajalCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItem','DateHelper', 'ManageServicePhp', '$window', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, ModelItem, dateHelper, manageServicePhp, $window, $mdDialog) {
            $scope.item = {};
            $scope.jumlahLayanan = 2000;
            $scope.item.tglAwal = dateHelper.setJamAwal(new Date());
            $scope.item.tglAkhir = dateHelper.setJamAkhir(new Date());

            $scope.optGridWaktuTunggu = {
                toolbar:["excel"],
                excel: {
                    fileName:"Daftar Waktu Tunggu"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                selectable: 'row',
                // editable: false,
                // pageable: false,
                columns: [{
                    "field": "nocm",
                    "title": "No. Rekam Medis",
                    "width": "100",
                }, {
                    "field": "noregistrasi",
                    "title": "No. Registrasi",
                    "width": "100",
                }, {
                    "field": "tglregistrasi",
                    "title": "Tanggal Registrasi",
                    "width": "100",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "100",
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": "200",
                },
                {
                    "field": "namadokter",
                    "title": "Dokter",
                    "width": "200",
                },
                {
                    "field": "tglpanggil",
                    "title": "Tanggal Panggil",
                    "width": "200",
                },
                {
                    "field": "selisihwaktu",
                    "title": "Waktu Tunggu",
                    "width": "100",
                }]
            };

            $scope.formatTanggal=(tanggal)=>{
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.getServiceTable = () => {
                $scope.isRouteLoading = true;
                $scope.dataSourceWaktuTunggu=[];
                let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm");
                manageLogistikPhp.getDataTableTransaksi("laporan/get-laporan-waktu-tunggu-rawat-jalan?tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir, true).then(function (res) {
                    $scope.ratarata = res.data.rata_waktu_tunggu;
                    for (var i = 0; i < res.data.data.length; i++) {
                        let tanggalPanggil="";
                        if(res.data.data[i].tgldipanggildokter!=null){
                            tanggalPanggil=res.data.data[i].tgldipanggildokter;
                        }else if(res.data.data[i].tgldipanggilsuster!=null){
                            tanggalPanggil=res.data.data[i].tgldipanggilsuster;
                        }else{
                            tanggalPanggil="-";
                        }
                        res.data.data[i].tglpanggil=tanggalPanggil;
                    }
                    $scope.dataSourceWaktuTunggu = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100,
                    });
                    $scope.isRouteLoading = false;
                })
            }
            $scope.getServiceTable();
        }
    ]);
});