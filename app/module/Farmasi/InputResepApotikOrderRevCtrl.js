define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepApotikOrderRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper) {
            $scope.isRouteLoading = false;
            $scope.jumlahObat = 3;
            $scope.item = {};
            $scope.resep = {};
            $scope.listObat = [];
            $scope.listResep = [];
            $scope.listOfProduk = [
                "CTM",
                "Ephedrine",
                "Aminophylin",
                "Lactas Calcium",
                "Glaceryl Guailcote",
                "OBH",
                "Interhistin"
            ];

            var init = function () {
                $scope.listObat = [
                    {
                        namaObat: "",
                        satuan: "",
                        jumlah: ""

                    }
                ];
            }
            init();

            $scope.tambahObat = function () {
                var data = [
                    {
                        namaObat: "",
                        satuan: "",
                        jumlah: ""
                    }
                ]
                $scope.listObat.push(data);
            }

            $scope.hapusObat = function (index) {

            }

            $scope.simpan = function () {
                var data = {
                    data:[],
                    keterangan:$scope.item.keterangan
                };
                for (var i = 0; i < $scope.listObat.length; i++) {
                    data.data.push({
                        namaObat: $scope.resep.namaObat[i],
                        jumlah: $scope.resep.jumlahObat[i],
                        satuanObat: $scope.resep.satuanObat[i]
                    })
                }
                // data["keterangan"] = $scope.item.keterangan;
                // $scope.listResep.push(data);
                // console.log($scope.listResep);
                $scope.listResep = new kendo.data.DataSource({
                    data: data.data
                });
                console.log(data);
            }

            $scope.columnDataResep = {
                pageable: true,
                scrollable: true,
                columns:[
                    { field: "keterangan", title: "<h3>Keterangan</h3>", width: 40 },
                    { command: [
                        { name: "Detail", text: "Detail", click: showDetail },
                    ], title: "&nbsp;", width: 120, 
                        attributes: {
                            style: "text-align:center;valign=middle"
                        }
                    }
                ]
            }

            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
            }

        }
    ]);
});

