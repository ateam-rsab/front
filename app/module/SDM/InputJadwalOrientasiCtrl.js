define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputJadwalOrientasiCtrl', ['FindSdm', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm',
        function(findSdm, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.no = 1;
            $scope.currentDate = new Date();
            $scope.isDisable = true;
            $scope.params = "";
            $scope.find = function() {
                var temp = $scope.params;
                if ($scope.params === '')
                    temp = '-';
                findSdm.findJadwalOrientasi(temp).then(function(e) {
                    var arr = [];
                    var i = 1;
                    for (var key in e.data.data.items) {
                        if (e.data.data.items.hasOwnProperty(key)) {
                            var element = e.data.data.items[key];
                            element.no = i;
                            i++;
                            arr.push(element);
                        }
                    }
                    $scope.listJadwalOrientasi = new kendo.data.DataSource({
                        data: arr
                    });
                })
            }

            $scope.find();
            $scope.columnJadwalOrientasi = [{
                    "field": "no",
                    "title": "No ",
                    "width": "5%"
                },
                {
                    "field": "materiOrientasi",
                    "title": "Materi Orientasi",
                    "width": "20%"
                },
                {
                    "field": "tglOrientasi",
                    "title": "Hari/Tanggal",
                    "width": "20%"
                },
                {
                    "field": "jam",
                    "title": "Jam",
                    "width": "20%"
                },
                {
                    "field": "naraSumber",
                    "title": "Narasumber",
                    "width": "20%"
                }
            ];
            $scope.Save = function() {
                ManageSdm.saveJadwalOrientasi(ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.item = {};
                    init();
                });
            };
        }
    ]);
});