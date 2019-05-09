define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DesignCtrl', ['ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state', 'socket',

        function(ManageManegement, $rootScope, $scope, ModelItem, $state, socket) {
            $scope.now = new Date();
            $scope.from = $scope.now;
            $scope.until = $scope.now;
            $rootScope.doneLoad = false;
            ManageManegement.getData("-").then(function(e) {
                $scope.listData = e.data.data.items;
                $rootScope.doneLoad = true;
            });

            $scope.$watch('pencarian', function(e) {
                if (e === undefined) return;
                ManageManegement.getData(e).then(function(e) {
                    $scope.listData = e.data.data.items;
                })
            })
            $scope.$watch('from', function(e) {

                if (e === undefined) return;
                $scope.start = moment(e).format('YYYY-MM-DD');
                $scope.refresh();
            });
            $scope.$watch('until', function(e) {
                if (e === undefined) return;
                $scope.end = moment(e).format('YYYY-MM-DD');
                $scope.refresh();
            });
            $scope.refresh = function() {


            }
            $scope.Back = function() {
                $scope.item = undefined;
            }
            $scope.Save = function() {
                ManageManegement.saveDesign($scope.item);
            }
            $scope.$watch('item', function(e) {
                if (e === undefined) return;
                if (typeof(e.type) === 'string') {
                    $scope.item.type = { name: e.type };
                }
            })
            $scope.types = [{
                name: "column"
            }, {
                name: "bar"
            }, {
                name: "area"
            }, {
                name: "pie"
            }]
            $scope.group = {
                field: "ruangan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "pasien",
                aggregate: "count"
            }, {
                field: "ruangan.namaRuangan",
                aggregate: "count"
            }]
            $scope.Column = [{
                field: "kelompok",
                title: "Kelompok",

            }, {
                field: "query",
                title: "Query",
            }, {
                field: "title",
                title: "Judul",
                aggregates: ["count"]
            }, {
                field: "span",
                title: "Kolom",
            }, {
                field: "group",
                title: "No Registrasi",
                aggregates: ["count"]
            }, {
                field: "tipe",
                title: "Tipe",
            }];
        }
    ]);
});