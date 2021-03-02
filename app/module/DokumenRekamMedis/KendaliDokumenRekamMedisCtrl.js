define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('KendaliDokumenRekamMedisCtrl', ['$q', '$scope', 'ModelItem', '$state', '$rootScope', '$timeout', '$window', 'ManagePasien', 'FindPasien', 'DateHelper', 'CetakHelper', 'ModelItem', 'ManagePhp', 'ManageSarprasPhp',
        function ($q, $scope, modelItem, $state, $rootScope, $timeout, $window, managePasien, findPasien, dateHelper, cetakHelper, ModelItem, managePhp, manageSarprasPhp) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.now = new Date();
            $scope.item.periodeAwal = $scope.now;
            $scope.item.periodeAkhir = $scope.now;
            $scope.optGridDokumenRM = {
                toolbar: [{
                        "name": "add",
                        "text": "Tambah Kendali",
                        "template": '<a ng-click="onClick()" class="k-button k-button-icontext k-grid-upload">Tambah Kendali</a>'
                    },
                    {
                        "name": "edit",
                        "text": "Edit",
                        "template": '<a ng-click="editGrid()" class="k-button k-button-icontext k-grid-upload">Edit Kendali</a>'
                    }
                ],
                pageable: true,
                selectable: "row",
                columns: [{
                    "field": "nocm",
                    "title": "No. MR",
                }, {
                    "field": "noregistrasi",
                    "title": "No. Registrasi",
                    "width": 120
                }, {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": 200
                }, {
                    "field": "ruanganperiksa",
                    "title": "Ruangan Periksa",
                    "width": 200
                }, {
                    "field": "catatan",
                    "title": "Catatan",
                    "width": 150
                }, {
                    "field": "name",
                    "title": "Status",
                    // "template": '# if( name==null) {# - # } else {# #= statusKendaliDokumen.name # #} #'
                }, {
                    "field": "kembali",
                    "title": "Kembali",
                    // "template": '# if( tglKembali==null) {#<span class="center">Belum<span># } else {#<span class="center">Sudah<span>#} #'
                }, {
                    "field": "tglkembali",
                    "title": "Tgl/Jam Kembali",
                    // "template": '# if( tglkembali==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tglkembali), "dd-MM-yyyy HH:mm") #<span>#} #',
                    "width": 120
                }],

            }

            $scope.init = () => {
                managePhp.getData("operator/get-data-combo-operator", false).then((res) => {
                    $scope.listDokter = res.data.dokter;
                    $scope.listDepartemen = res.data.departemen;
                    $scope.listKelompokPasien = res.data.kelompokpasien;
                })
            }
            $scope.init();

            $scope.getDataDokRM = () => {
                $scope.isRouteLoading = true;
                manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-daftar-tracing?tglAwal=" + (dateHelper.formatDate($scope.item.periodeAwal, "YYYY-MM-DD HH:mm:ss")) + "&tglAkhir=" + (dateHelper.formatDate($scope.item.periodeAkhir, "YYYY-MM-DD HH:mm:ss")) + "&jmlRows=50&deptId=" + ($scope.item.instalasi ? $scope.item.instalasi.id : "") + "&ruangId=" + ($scope.item.ruangan ? $scope.item.ruangan.id : "") + "&kelId=" + ($scope.item.kelompokPasien ? $scope.item.kelompokPasien.id : "") + "&dokId=" + ($scope.item.instalasi ? $scope.item.instalasi.id : "") + "&sttts=LAMA&noreg=" + ($scope.item.noReg ? $scope.item.noReg : "") + "&norm=" + ($scope.item.noRm ? $scope.item.noRm : "") + "&nama=" + ($scope.item.namaPasien ? $scope.item.namaPasien : "")).then((res) => {

                    $scope.dataSourceDokumenRM = new kendo.data.DataSource({
                        data: res.data,
                        pageSize: 10
                    });

                    $scope.isRouteLoading = false;
                })
            }

            $scope.getRuangan = () => {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }


        }
    ])
})