define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('InformasiPemesananDanPenerimaanCtrl', ['$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem','ManageSarpras',
        function($state, findSarpras, $rootScope, $scope, ModelItem, ManageSarpras) {
            $scope.now = new Date();
            var showButton = function(){
                $scope.isNext = true;
                $scope.isDetil = true;
                $scope.isKirim = true;
            }
            showButton();
            // $scope.until = $scope.now;
            // $scope.from = $scope.now;
            // ManageSarpras.getOrderList("kartu-pengendali/get-kelompok-user/").then(function (dat) {
            //     debugger;
            //     console.log(dat.data.kelompokUser.kelompokUser);
            //     if((dat.data.kelompokUser.kelompokUser != "logistik") && (dat.data.kelompokUser.kelompokUser != "apotik"))
            //         $scope.hideKirimBarang = false;
            //     else
            //         $scope.hideKirimBarang = true;
            // });
            $scope.dataOrder = new kendo.data.DataSource({
                data: []
            });
            $scope.find = function() {
                findSarpras.getOrderKirimBarang('ruanganTujuan', '', '', '').then(function(e) {
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data)
                    });

                });
            }
            $scope.find();
            $scope.findData = function() {
                var from, until, noOrder;
                if ($scope.noOrder !== undefined) {
                    noOrder = $scope.noOrder
                } else {
                    noOrder = ""
                }

                if ($scope.from !== undefined) {
                    from = moment($scope.from).format('YYYY-MM-DD')
                } else {
                    from = ""
                }

                if ($scope.until !== undefined) {
                    until = moment($scope.until).format('YYYY-MM-DD')
                } else {
                    until = ""
                }

                findSarpras.getOrderKirimBarang('ruanganTujuan', from, until, noOrder).then(function(e) {
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data)
                    });

                });
            }
            $scope.clear = function(){
                $scope.until = new Date();
                $scope.from = new Date();
            }
            $scope.Detil = function() {
                $state.go('logistikOrder', {
                    noRec: $scope.item.noRec,
                    noKirim: $scope.item.noKirim
                })
            }
            $scope.navToKirim = function() {
                if ($scope.item.noKirim === null || $scope.item.noKirim === undefined ) {
                    debugger;
                    $state.go('logistikKirimOrder', {
                        noRecOrder: $scope.item.noRec,
                        noRec: $scope.item.noRecKirim
                    })
                } else {
                    window.messageContainer.error('Pesanan Sudah dikirim')
                }
            }
            $scope.columnOrder = [{
                    "field": "noOrder",
                    "title": "No. Order",
                    "width": "100px"
                }, {
                    "field": "tanggalOrder",
                    "title": "Tgl. Order",
                    template: "#= new moment(tanggalOrder).format('DD-MM-YYYY') #",
                    "width": "100px"
                },
                {
                    "field": "ruanganPemesan",
                    "title": "Ruangan Pemesan",
                    "width": "180px"
                },
                {
                    "field": "userPemesan",
                    "title": "User Pemesan",
                    "width": "160px"
                },
                {
                    "field": "ruanganTujuan",
                    "title": "Ruangan Tujuan",
                    "width": "180px"
                },
                {
                    "field": "noKirim",
                    "title": "No. Kirim",
                    "width": "100px"
                },
                {
                    "field": "jenisPermintaan",
                    "title": "Jenis Permintaan",
                    "width": "100px"
                }, {
                    "field": "noKonfirmasi",
                    "title": "No. Terima",
                    "width": "100px"
                }, {
                    "field": "keteranganOrder",
                    "title": "Keterangan"
                }
            ];
        }
    ]);
});