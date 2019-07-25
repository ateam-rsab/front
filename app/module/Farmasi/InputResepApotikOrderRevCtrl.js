define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepApotikOrderRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper) {
            $scope.isRouteLoading = false;
            $scope.jumlahObat = 3;
            $scope.item = {};
            $scope.resep = {};
            $scope.listObat = [];
            $scope.tempListResep = [];
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
                console.log(JSON.stringify($scope.tempListResep))
                $scope.listResep = new kendo.data.DataSource({
                    data: $scope.tempListResep,
                    pageSize: 5
                });
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
                var dataResep = {
                    resep: [],
                    keterangan: $scope.item.keterangan
                }

                for (var i = 0; i < $scope.listObat.length; i++) {
                    dataResep.resep.push({
                        namaObat: $scope.resep.namaObat[i],
                        jumlah: $scope.resep.jumlahObat[i],
                        satuanObat: $scope.resep.satuanObat[i]
                    });
                }

                $scope.tempListResep.push(dataResep)

                // $scope.listResep = new kendo.data.DataSource({
                //     data: dataResep,
                //     pageSize: 5
                // });
                // console.log(dataResep);
                clear();
                init();
            }

            var clear = function () {
                $scope.item.keterangan = '';
                $scope.resep.namaObat = '';
                $scope.resep.jumlahObat = '';
                $scope.resep.satuanObat = '';
            }

            $scope.columnDataResep = {
                pageable: true,
                scrollable: true,
                columns: [
                    { field: "keterangan", title: "<h3>Keterangan</h3>", width: '80%' },
                    {
                        command: [
                            { name: "Detail", text: "Obat", click: showDetail },
                        ], title: "&nbsp;", width: "20%",
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

