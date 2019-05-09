define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('InformasiPemesananDanPenerimaanUnitCtrl', ['$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem','ManageSarpras',
        function($state, findSarpras, $rootScope, $scope, ModelItem, ManageSarpras) {
            $scope.now = new Date();
            // $scope.until = $scope.now;
            // $scope.from = $scope.now;
            $scope.dataOrder = new kendo.data.DataSource({
                data: []
            });
            var showButton = function() {
                $scope.isDetil = true;
                $scope.isKirim = true;
                $scope.isNext = true;
            }
            showButton();
            $scope.find = function() {
                findSarpras.getOrderKirimBarang('ruanganAsal', '', '', '').then(function(e) {
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

                findSarpras.getOrderKirimBarang('ruanganAsal', from, until, noOrder).then(function(e) {
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data)
                    });

                });
            }
            $scope.clear = function(){
                $scope.until = new Date();
                $scope.from = new Date();
            }
            $scope.navToVerif = function() {
                if ($scope.item.noRecKirim === null) {
                    window.messageContainer.error('Barang belum dikirim')
                } else  if ($scope.item.noKonfirmasi !== null) {
                    window.messageContainer.error('Barang sudah diterima')
                } else {
                    if ($scope.item.keteranganOrder === "Permintaan Barang Dari Ruangan (Aset)") {
                        // debugger;
                        $state.go('VerifikasiPenerimaanAset', {            
                            noRec: $scope.item.noRecKirim
                        })
                    } else {
                        $state.go('VerifikasiPenerimaanCtrl', {            
                            noRec: $scope.item.noRecKirim
                        })
                    }
                }
            }
            $scope.Detil = function() {
                $state.go('logistikOrder', {
                    noRec: $scope.item.noRec
                })
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