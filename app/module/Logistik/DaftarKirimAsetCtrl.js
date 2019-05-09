define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('DaftarKirimAsetCtrl', ['$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem','ManageSarpras',
        function($state, findSarpras, $rootScope, $scope, ModelItem, ManageSarpras) {
            $scope.now = new Date();
            // $scope.until = $scope.now;
            // $scope.from = $scope.now;
            $scope.dataOrder = new kendo.data.DataSource({
                data: []
            });

            $scope.item = {
                awal: $scope.now,
                akhir: $scope.now,
                kelUser: document.cookie.split(';')[0].split('=')[1]
            };

            if ($scope.item.kelUser === "bagianUmum") {
                $scope.parameterRuangan = "ruanganTujuan";
                $scope.isDetil = true;
                // $scope.item.ruangan = "";
            } else {
                $scope.parameterRuangan = "ruanganAsal";
                $scope.isDetil = true;
                $scope.isKirim = true;
            }

            var showButton = function() {
                // $scope.isDetil = true;
                $scope.isNext = true;
            }
            showButton();
            $scope.find = function() {
                findSarpras.getKirimBarangAset($scope.parameterRuangan, '', '', '').then(function(e) {
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

                findSarpras.getOrderKirimBarang($scope.parameterRuangan, from, until, noOrder).then(function(e) {
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data)
                    });

                });
            }
            $scope.clear = function(){
                $scope.until = new Date();
                $scope.from = new Date();
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
                    "field": "ruanganTujuan",
                    "title": "Ruangan Asal",
                    "width": "180px"
                },
                {
                    "field": "userPemesan",
                    "title": "Pengirim",
                    "width": "160px"
                },
                {
                    "field": "ruanganPemesan",
                    "title": "Ruangan Tujuan",
                    "width": "180px"
                },
                {
                    "field": "noKirim",
                    "title": "No. Kirim",
                    "width": "100px"
                },
                {
                    "field": "noKonfirmasi",
                    "title": "No. Terima",
                    "width": "100px"
                }, {
                    "field": "keteranganOrder",
                    "title": "Keterangan"
                }
            ];
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
                $state.go('KirimAset', {
                    noRec: $scope.item.noRec
                })
            }
        }
    ]);
});