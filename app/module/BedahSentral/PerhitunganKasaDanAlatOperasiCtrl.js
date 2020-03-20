define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PerhitunganKasaDanAlatOperasiCtrl', ['$state', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', 'DateHelper',
        function($state, cacheHelper, $rootScope, $scope, ModelItem, DateHelper) {
            $scope.current = {};
            $scope.listAlatDigunakan = [];
            //$scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-produk-by-nama?idDetailJenisProduk=137&namaProduk=', true);
            $scope.listNamaBarang = [{
                "id" : 1,
                "namaProduk" : "Kassa Steril"
            }]
            $scope.addBarang = function() {
                $scope.listAlatDigunakan.push($scope.current.barang);
            }


            $scope.now = new Date();
            $scope.column = [{
                "field": "barang.namaProduk",
                "title": "Jenis Kasa"
            }, {
                "field": "jumlahSebelumOperasi",
                "title": "Sebelum Operasi",
                "width": "150px"
            }, {
                "field": "penambahan",
                "title": "Sesudah Operasi",
                "width": "150px"
            }, {
                "field": "keterangan",
                "title": "Keterangan"
            }, {
                "field": "tglSteril",
                template: "#= new moment(new Date(tglSteril)).format('DD-MM-YYYY') #",
                "title": "tgl. Steril"
            }];
            if (cacheHelper !== undefined) {
                $scope.dataJenisKasa = new kendo.data.DataSource({
                    data: cacheHelper.get('Kasa' + $state.params.noRegister)
                });
            } else
                $scope.dataJenisKasa = new kendo.data.DataSource({
                    data: []
                });

            $scope.Add = function() {
                debugger
                $scope.dataJenisKasa.add($scope.current);
            }

            $scope.Save = function() {
               debugger;
               $scope.item.pasien;
               $scope.dataJenisKasa._data;
                cacheHelper.set('Kasa' + $state.params.noRegister, $scope.dataJenisKasa._data);
                // window.messageContainer.log('Sukses');
                // window.history.back();
            }
        }
    ]);
});