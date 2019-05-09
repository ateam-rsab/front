define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('InformasiOrderProdukCtrl', ['$state', 'FindIPSRS', '$rootScope', '$scope', 'ModelItem','ManageSarpras',
        function($state, FindIPSRS, $rootScope, $scope, ModelItem, ManageSarpras) {
            $scope.now = new Date();
            $scope.until = $scope.now;
            $scope.from = $scope.now;
            $scope.dataOrder = new kendo.data.DataSource({
                data: []
            });
            $scope.showDetailOrder = function() {
                $state.go('logistikOrder', {
                    noRec: $scope.item.noRec
                })
            }
            $scope.showKirimOrder = function() {
                $state.go('logistikKirimOrder', {
                    noRecOrder: $scope.item.noRec,
                    noRec: $scope.item.noRecKirim
                })
            }
            // $scope.showKirimOrder = function() {
            //     $state.go('logistikKirim', {
            //         noRecOrder: $scope.item.noRec,
            //         noRec: $scope.item.noRecKirim
            //     })
            // }
            $scope.showVerifikasiKirim = function() {
                $state.go('VerifikasiPenerimaanCtrl', {
                    noRecOrder: $scope.item.noRec,
                    noRec: $scope.item.noRecKirim
                })
            }
            $scope.find = function() {
                FindIPSRS.getOrderBarang('', '', '').then(function(e) {
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data)
                    });

                });
            }
            $scope.find();

            $scope.findData = function() {

                if ($scope.from !== undefined && $scope.until !== undefined) {
                    FindIPSRS.getOrderBarang(moment($scope.from).format('YYYY-MM-DD'), moment($scope.until).format('YYYY-MM-DD'), '').then(function(e) {
                        $scope.dataOrder = new kendo.data.DataSource({
                            data: ModelItem.beforePost(e.data.data)
                        });

                    });
                } else {
                    FindIPSRS.getOrderBarang('', '', '').then(function(e) {
                        $scope.dataOrder = new kendo.data.DataSource({
                            data: ModelItem.beforePost(e.data.data)
                        });

                    });
                }
            }

            $scope.clear = function(){
                $scope.until = new Date();
                $scope.from = new Date();
            }

            $scope.columnOrder = [{
                    "field": "noOrder",
                    "title": "No. Order",
                    "width": "150px"
                }, {
                    "field": "tanggalOrder",
                    "title": "Tgl. Order",
                    template: "#= new moment(tanggalOrder).format('DD-MM-YYYY hh-mm-ss') #",
                    "width": "150px"
                },
                {
                    "field": "ruanganPemesan",
                    "title": "Ruangan Pemesan",
                    "width": "150px"
                },
                {
                    "field": "userPemesan",
                    "title": "User Pemesan",
                    "width": "200px"
                },
                {
                    "field": "ruanganTujuan",
                    "title": "Ruangan Tujuan",
                    "width": "150px"
                },
                {
                    "field": "noKirim",
                    "title": "No. Kirim",
                    "width": "100px"
                },
                {
                    "field": "jenisPermintaan",
                    "title": "Jenis Permintaan",
                    "width": "150px"
                }, {
                    "field": "noVerifikasi",
                    "title": "No. Terima",
                    "width": "100px"
                },
            ];
			
			ManageSarpras.getOrderList("kartu-pengendali/get-kelompok-user/").then(function (dat) {
				// debugger;
				console.log(dat.data.kelompokUser.kelompokUser);
				if((dat.data.kelompokUser.kelompokUser != "logistik") && (dat.data.kelompokUser.kelompokUser != "apotik"))
					$scope.hideKirimBarang = false;
				else
					$scope.hideKirimBarang = true;
			});

            $scope.notf1Options = {
                position: {
                    pinned: true,
                    top: 30,
                    right: 30
                },
                autoHideAfter: 3000,
                stacking: "down",
                templates: [{
                    type: "ngTemplate",
                    template: $("#notificationTemplate").html()
                }]
            };

            $scope.showPopup = function () {
                $scope.notf1.show({
                    title: "Informasi",
                    message: $scope.messages
                }, "ngTemplate");
            }
			
			$scope.navToVerif = function() {
				if ($scope.item.noRecKirim !== undefined) {
                    $state.go('VerifikasiPenerimaanCtrl', {            
                        noRec: $scope.item.noRecKirim
                    })
                } else {
                    $scope.messages = "Peringatan, Data belum bisa di verifikasi";
                    $scope.showPopup();
                }
            }		
            
			
        }
    ]);
});