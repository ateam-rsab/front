define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PlanOfCareCtrl', ['$q', '$scope', '$state', 'ManagePhp', '$timeout', 'CacheHelper', '$rootScope', 'DateHelper',
        function ($q, $scope, $state, ManagePhp, $timeout, cacheHelper, $rootScope, DateHelper) {
            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
            // $scope.item.tgl = tanggals;
            $scope.optPOC = {
                toolbar: [
                    {
                        name: "create", text: "Input Baru",
                        template: '<button ng-click="inputBaruPOC()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah POC</button>'
                    }
                ],
                pageable: true,
                scrollable: true,
                columns: [
                    {
                        field: "no", 
                        title: "<h3>No</h3>",
                        width: 60
                    },
                    {
                        field: "tanggal", 
                        title: "<h3>Tanggal</h3>", 
                        width: 150
                    },
                    {
                        field: "masalah", 
                        title: "<h3>Masalah</h3>",
                        width: 200
                    },
                    {
                        field: "ruangan", 
                        title: "<h3>Plan Of Care /<br> Rencana Perawatan</h3>", 
                        width: 200
                    }, 
                    {
                        field: "target",
                        title: "<h3>Target <br>Terukur</h3>",
                        width: 100
                    },  
                    {
                        field: "dalam",
                        title: "<h3>Dalam <br>Waktu</h3>",
                        width: 100
                    },
                    {
                        field: "tgl",
                        title: "<h3>Tanggal <br>Teratasi</h3>",
                        width: 100
                    },
                    {
                        field: "dis",
                        title: "<h3>Discharge <br>Planning</h3>",
                        width: 100
                    }
                ]
            };

            $scope.inputBaruPOC = function () {
                $scope.popUpPOC.center().open();
            };

            $scope.batalInput = function () {
                $scope.popUpPOC.close();
            }

        }
    ]);
});