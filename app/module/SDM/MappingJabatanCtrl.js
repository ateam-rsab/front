define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MappingJabatanCtrl', ['$q', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DaftarPegawaiService', 'DataHelper', 'FindSdm', 'DateHelper', '$timeout', 'CetakHelper', '$mdDialog',
        function ($q, cacheHelper, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, DaftarPegawaiService, dataHelper, FindSdm, dateHelper, $timeout, cetakHelper, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            // $scope.jabatanDisabled = true;
            $scope.unitKerjaDisabled = false;
            $scope.optGridDataMapping = {
                toolbar: [
                    { text: "add", name: "Add", template: '<button ng-click="tambahMapping()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah</button>' },
                ],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "jabatan",
                    title: "<h3>Nama Jabatan</h3>",
                    width: 100
                }, {
                    field: "profesi",
                    title: "<h3>Nama Profesi</h3>",
                    width: 100
                }, {
                    command: [{
                        text: "Hapus",
                        click: hapusData
                    }, {
                        text: "Edit",
                        click: editData
                    }],
                    title: "&nbsp;",
                    width: 30
                }],
            }

            $scope.getDataMapping = () => {
                ManageSdmNew.getListData("sdm/get-all-mapping-jabatan-profesi").then(res => {
                    $scope.dataSourceMapping = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    });
                    $scope.isRouteLoading = false;
                })
            }

            $scope.getJabatan = (id) => {
                $scope.jabatanDisabled = !id;
                ManageSdm.getOrderList(`service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled,unitKerjaId&values=true,${id}&order=namaJabatan:asc`).then(res => {
                    $scope.listJabatan = res.data;
                });
            }

            let init = () => {
                $scope.isRouteLoading = true;
                $scope.getDataMapping();
                $scope.getJabatan('');
                ManageSdm.getOrderList("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled&values=true&order=name:asc").then(res => {
                    $scope.listUnitKerja = res.data;
                });

                ManageSdm.getOrderList("service/list-generic/?view=Profesi&select=id,namaProfesi&criteria=statusEnabled&values=true&order=namaProfesi:asc").then(res => {
                    $scope.listProfesi = res.data;
                });
            }
            init();

            $scope.tambahMapping = () => {
                $scope.unitKerjaDisabled = true;
                $scope.dialogMapping.open().center();
            }

            $scope.saveDataMapping = () => {
                $scope.isRouteLoading = true;
                if (!$scope.item.jabatan) {
                    toastr.info("Harap pilih Jabatan terlebi dahulu");
                    return;
                }

                if (!$scope.item.profesi) {
                    toastr.info("Harap pilih Profesi terlebi dahulu");
                    return;
                }

                let dataSave = {
                    jabatan: {
                        id: $scope.item.jabatan.id
                    },
                    profesi: {
                        id: $scope.item.profesi.id
                    },
                    statusEnabled: true,
                    kdProfile: 0
                }

                if($scope.idDataMapping) dataSave.id = $scope.idDataMapping;
                ManageSdmNew.saveData(dataSave, "sdm/save-map-jabatan-profesi").then(res => {
                    $scope.getDataMapping();
                    reset();
                    $scope.dialogMapping.close();
                    $scope.isRouteLoading = false;
                })
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                var confirm = $mdDialog.confirm()
                    .title(`Apakah anda yakin akan menghapus Mapping Jabatan ${dataItem.jabatan}`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.isRouteLoading = true;
                    ManageSdmNew.saveData({}, `sdm/delete-map-jabatan-profesi?id=${dataItem.id}`).then(res => {
                        $scope.isRouteLoading = false;
                        $scope.getDataMapping();
                    })
                }, function () {

                });

            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.getJabatan('');
                $scope.item.jabatan = {
                    namaJabatan: dataItem.jabatan,
                    id: dataItem.jabatanId,
                }

                $scope.item.profesi = {
                    namaProfesi: dataItem.profesi,
                    id: dataItem.profesiId
                }

                $scope.idDataMapping = dataItem.id;

                $scope.unitKerjaDisabled = false;
                $scope.dialogMapping.open().center();
            }

            let reset = () => {
                $scope.idDataMapping = null;
                $scope.item.profesi = null;
                $scope.item.jabatan = null;
            }
        }
    ]);
});