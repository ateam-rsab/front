define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarAdvokasiHukumCtrl', ['$rootScope', '$scope', 'ModelItem', 
		'DateHelper', '$document','$state', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
    
            $scope.colgridadvokasi = {
                columns: [{
                    field: "noUsulan",
                    title: "No. Kasus",
                    width: "10%"
                }, {
                    field: "jeniskasus",
                    title: "Jenis Kasus",
                    width: "20%"
                }, {
                    field: "saran",
                    title: "Saran",
                    width: "20%"
                }, {
                    field: "isikajian",
                    title: "Isi Kajian",
                    width: "20%"
                }, {
                    field: "statuskasus",
                    title: "Status kasus",
                    width: "10%"
                }, {
                    field: "rekomendasi",
                    title: "Rekomendasi",
                    width: "20%"
                }
                ]
            };

            $scope.klik = function (current) {
                var selectedItem = current;
                $scope.noUsulan = selectedItem.noUsulan;
            };

            $scope.detail = function () {
                if ($scope.noUsulan === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('AdvokasiHukumView', {noUsulan: $scope.noUsulan});
            }
            $scope.rekomen = function () {
                if ($scope.noUsulan === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('RekomendasiAdvokasiHukum', {noUsulan: $scope.noUsulan});
            }

            $scope.cari = function () {
                getGrid();
            }
            getGrid();
            function getGrid() {  
                var awal = moment($scope.item.periodeAwal).format("DD-MM-YYYY");
                var akhir = moment($scope.item.periodeAkhir).add(1, 'day').format("DD-MM-YYYY");
                var url = "advokasi-hukum-medicolegal/get-list-evaluasi-by-ruangan-pembuat?tglAwal=" + awal + "&tglAkhir=" + akhir +"&ruanganId=" +ModelItem.getPegawai().ruangan.id ;
                if ($scope.item.noPlanning !== undefined) {
                    url += "&noUsulan=" + $scope.item.noPlanning;
                }
                //console.log(url);
                ManageSarpras.getOrderList(url).then(function (dat) { 
                    $scope.dataSource = new kendo.data.DataSource({
                        data: dat.data.data
                    });
                });
            }
        }
	]);
});


