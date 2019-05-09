define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaporanPembedahanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'CacheHelper', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, ManagePasien, cacheHelper, dateHelper) {
            $scope.dataInfus = new kendo.data.DataSource({
                data: []
            });
            ModelItem.getDataDummyGeneric("Infus", true).then(function(data) {
                $scope.listInfus = data;
            })
            $scope.columnInfus = [{
                    "field": "no",
                    "title": "No",
                    width: "10%"
                },
                {
                    "field": "macam",
                    "title": "Macam",
                    width: "40%"
                },
                {
                    "field": "jumlah",
                    "title": "Jumlah",
                    width: "20%"
                },
                {
                    "field": "tetesan",
                    "title": "Tetesan",
                    width: "20%"
                },
                {
                    command: { text: "Delete", click: $scope.removeInfus },
                    title: "&nbsp;",
                    width: "10%"
                }
            ];

            $scope.now = new Date();
            $scope.addDataInfus = function() {
                debugger;
                if ($scope.item.infus != "" && $scope.item.infus != undefined) {
                    for (var i = 0; i < $scope.dataInfus._data.length; i++) {

                        if ($scope.dataInfus._data[i] == $scope.item.infus.name) {
                            return;
                        }
                    }

                    var tempDataInfus = {
                        "no": $scope.dataInfus._data.length + 1,
                        "macam": $scope.item.infus.name,
                        "jumlah": $scope.item.jumlah,
                        "tetesan": $scope.item.tetesan



                    }
                    $scope.dataInfus.add(tempDataInfus);
                    $scope.item.infus = "";
                    $scope.item.jumlah = "";
                    $scope.item.tetesan = "";

                }

                    /*$scope.datariwayat.push(tempDataInfus);*/
            }
            $scope.removeInfus = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataInfus = $scope.dataInfus
                    .filter(function(el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };

            $scope.Save = function() {
                $scope.item.infusDetailSet = $scope.dataInfus._data
                console.log(JSON.stringify($scope.item));
                    $scope.item.tglPembedahan = Date.parse($scope.item.tglPembedahan);
                    $scope.item.selesaiJam = Date.parse($scope.item.selesaiJam);
                    $scope.item.mulaiJam = Date.parse($scope.item.mulaiJam);
                
                debugger;
                ManagePasien.saveLaporanBedah(ModelItem.beforePost($scope.item)).then(function(e) {
   
                });
            };

        }

    ]);
});