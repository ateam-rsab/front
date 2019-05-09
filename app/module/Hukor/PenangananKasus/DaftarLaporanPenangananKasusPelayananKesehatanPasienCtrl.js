define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarLaporanPenangananKasusPelayananKesehatanPasienCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
        '$document', 'R', '$state', 'ManageSarpras','$q',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras,$q) {
            $scope.dataVOloaded = true;
            $scope.item = {};

            $scope.colDataUsulan = {
                columns: [
                    {
                        "field": "no",
                        "title": "No.",
                        "width": "3%"
                    },{
                        "field": "no",
                        "title": "No. Kasus",
                        "width": "7%"
                    },{
                        "field": "no",
                        "title": "No. CM",
                        "width": "10%"
                    },{
                        "field": "no",
                        "title": "Tanggal Masuk",
                        "width": "10%"
                    },{
                        "field": "no",
                        "title": "Tanggal Keluar",
                        "width": "10%"
                    },{
                        "field": "no",
                        "title": "Kegiatan yang dilakukan",
                        "width": "15%"
                    },{
                        "field": "no",
                        "title": "Hasil yang dicapai",
                        "width": "15%"
                    },{
                        "field": "no",
                        "title": "Kesimpulan",
                        "width": "10%"
                    },{
                        "field": "no",
                        "title": "Saran",
                        "width": "10%"
                    },
                ]
            };
        }
    ]);
});