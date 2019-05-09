define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RincianBiayaPerjalananDinasCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm',
        function ($rootScope, $scope, ModelItem, $state, ManageSdm) {
            $scope.now = new Date();
            ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });
            $scope.no = 1;
            
            ModelItem.getDataDummyGeneric("Penandatangan", true).then(function (data) {
                $scope.listPenandatangan = data;
            })


            ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatan&values=3", true).then(function (dat) {
                $scope.ListNamaJabatan = dat.data;
            });

            ManageSdm.getOrderList("service/list-generic/?view=UnitKerja&select=id,namaExternal", true).then(function (dat) {
                $scope.ListUnitKerja = dat.data;
            });

            $scope.dataLaporanUjiHasil = new kendo.data.DataSource({
                data: [{}]
            });

            $scope.pindah = function () {

                $state.go("RekamDataPegawai");

            }


            $scope.pindah1 = function () {

                $state.go("DataKeluarga");

            }


            $scope.daftarJenisBahan = new kendo.data.DataSource({
                // data: [
                //  {
                //      "kodeJenis": "BHN001",
                //      "JenisBahan": "Aldet"
                //  },
                //  {
                //      "kodeJenis": "BHN002",
                //      "JenisBahan": "Laudet"
                //  },
                //  {
                //      "kodeJenis": "BHN003",
                //      "JenisBahan": "MC. Bleach"
                //  },
                //  {
                //      "kodeJenis": "BHN004",
                //      "JenisBahan": "OXO. Bleach"
                //  },
                //  {
                //      "kodeJenis": "BHN005",
                //      "JenisBahan": "E. 951"
                //  },
                //  {
                //      "kodeJenis": "BHN006",
                //      "JenisBahan": "M. Saur"
                //  },
                //  {
                //      "kodeJenis": "BHN007",
                //      "JenisBahan": "M. Soft"
                //  }

                // ]
            });


            $scope.daftarBahanLinen = new kendo.data.DataSource({
                // data: [
                //  {
                //      "kodeJenis": "BHN001",
                //      "JenisBahan": "Aldet"
                //  },
                //  {
                //      "kodeJenis": "BHN002",
                //      "JenisBahan": "Laudet"
                //  },
                //  {
                //      "kodeJenis": "BHN003",
                //      "JenisBahan": "MC. Bleach"
                //  },
                //  {
                //      "kodeJenis": "BHN004",
                //      "JenisBahan": "OXO. Bleach"
                //  },
                //  {
                //      "kodeJenis": "BHN005",
                //      "JenisBahan": "E. 951"
                //  },
                //  {
                //      "kodeJenis": "BHN006",
                //      "JenisBahan": "M. Saur"
                //  },
                //  {
                //      "kodeJenis": "BHN007",
                //      "JenisBahan": "M. Soft"
                //  }

                // ]
            });

            $scope.columnLaporanUjiHasil = [
                // {
                //  "field": "no",
                //  "title": "Nama Jabatan ",
                //  "width": "10%"
                // },
                // {
                //  "field": "nama",
                //  "title": "Unit Kerja",
                //  "width": "20%"
                // },
                // {
                //  "field": "satuan",
                //  "title": "Uraian Tugas",
                //  "width": "20%"
                // }
            ];


























        }
    ]);
});