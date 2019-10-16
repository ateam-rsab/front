define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TBAKCtrl', ['$scope', '$timeout', '$state', 'CacheHelper', 'DateHelper', 'ManagePhp', '$mdDialog',
        function ($scope, $timeout, $state, cacheHelper, dateHelper, ManagePhp, $mdDialog) {
            $scope.item = {};

            $scope.gridTbak = {
                toolbar: [{
                    name: "create", text: "Input Baru",
                    template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah TBAK</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [
                    { field: "tglinput", title: "<h3>Tanggal/Jam</h3>", width: "20%" },
                    { field: "tglinput", title: "<h3>TBAK</h3>" },
                ]
            };

            $scope.inputBaru = function () {
                $scope.popUp.open().center();
            }
        }
    ]);
});