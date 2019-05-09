define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapLayananLaundryCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'CetakHelper',
        function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, CetakHelper) {
            $scope.item = {};
            $scope.item.tglAwal = new Date();
            $scope.item.tglAkhir = new Date();

            $scope.cetakRekapLayanan = function (value) {
                var bulanAwal,
                    bulanAkhir,
                    hariAwal,
                    hariAkhir,
                    tahunAwal,
                    tahunAkhir,
                    url, startDate, endDate
                var awal = new Date($scope.item.tglAwal);
                var akhir = new Date($scope.item.tglAkhir);
                bulanAwal = (awal.getMonth() + 1);
                if (bulanAwal < 10) {
                    bulanAwal = '0' + (awal.getMonth() + 1)
                }
                bulanAkhir = (akhir.getMonth() + 1);
                if (bulanAkhir < 10) {
                    bulanAkhir = '0' + (akhir.getMonth() + 1)
                }

                hariAwal = awal.getDate();
                if (hariAwal < 10) {
                    hariAwal = '0' + awal.getDate();
                }
                hariAkhir = akhir.getDate();
                if (hariAkhir < 10) {
                    hariAkhir = '0' + akhir.getDate();
                }

                tahunAkhir = akhir.getFullYear();
                tahunAwal = awal.getFullYear();
                // var startDate = tahunAwal + '/' + bulanAwal + '/' + hariAwal;
                // var endDate = tahunAkhir + '/' + bulanAkhir + '/' + hariAkhir;
                if(value == 1) {
                    startDate = tahunAwal + '-' + bulanAwal + '-' + hariAwal;
                    endDate = tahunAkhir + '-' + bulanAkhir + '-' + hariAkhir;
                    url = 'reporting/rekapLayananLaundry?startDate=' + startDate + '&endDate=' + endDate
                } else if ( value == 2 ) {
                    startDate = tahunAwal + '-' + bulanAwal + '-' + hariAwal;
                    endDate = tahunAkhir + '-' + bulanAkhir + '-' + hariAkhir;
                    url = 'reporting/LaporanPengirimanLinenPerLayanan?startDate=' + startDate + '&endDate=' + endDate
                }
                

                var urlLaporan = CetakHelper.openURLReporting(url);
                window.open(urlLaporan, '', 'width:600, height:500');
            }
        }
    ]);
});
