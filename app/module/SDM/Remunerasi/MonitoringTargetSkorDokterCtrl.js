define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringTargetSkorDokterCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.model = {};
            $scope.isRouteLoading = false;
            $scope.isUpdate = false;

            $scope.angkaFormatter = new Intl.NumberFormat('id-ID');

            $scope.optGrid = {
                toolbar: [{
                    name: "create", text: "Input Baru",
                    template: '<button ng-click="addData()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                }],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata",
                        },
                    },
                },
                pageable: true,
                scrollable: true,
                columns: [
                    {
                        field: "no",
                        title: "<h3>No.</h3>",
                        width: 30,
                    }, {
                        field: "unitKerja",
                        title: "<h3>Unit Kerja</h3>",
                        width: 100,
                    }, {
                        field: "subunitKerja",
                        title: "<h3>Sub Unit Kerja</h3>",
                        width: 100,
                    }, {
                        field: "tglHitungFormatted",
                        title: "<h3>Tanggal Hitung</h3>",
                        width: 100,
                    }, {
                        field: "tmtFormatted",
                        title: "<h3>TMT</h3>",
                        width: 100,
                    }, {
                        field: "totalTargetSkor",
                        title: "<h3>Total Target Skor</h3>",
                        width: 100,
                        attributes: {
                            style: "text-align: right;"
                        },
                        template: "<span>{{angkaFormatter.format('#= totalTargetSkor #')}}</span>"
                    },
                    {
                        command: [{
                            text: "Update Skor",
                            click: updateSkor,
                        }],
                        title: "",
                        width: 70,
                    },
                ],
            };

            $scope.item.tahun = new Date();
            $scope.monthSelectorOptions = {
                start: "decade",
                depth: "decade"
            };

            let init = () => {
                manageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled,id&values=true,(58;59;60;61;62;63;82)&order=name:asc").then(res => {
                    $scope.listUnitKerja = res.data;
                })
            }

            init();

            $scope.getSubUnitKerja = (id) => {
                manageSdmNew.getListData(`service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,unitKerjaId,name&values=true,${id},KK&order=name:asc`).then(res => {
                    $scope.listSubUnitKerja = res.data;
                })
            }

            $scope.getData = () => {
                let tahun = dateHelper.toTimeStamp($scope.item.tahun);
                $scope.isRouteLoading = true;
                manageSdmNew.getListData(`iki-remunerasi/get-target-skor-kelompok-kerja?tahun=${tahun}`).then((res) => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].no = i + 1;
                    }
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                    $scope.isRouteLoading = false;
                });
            }

            $scope.getData();

            function updateSkor(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.isUpdate = true;
                $scope.model = dataItem;
                $scope.popup.open().center();
            }

            $scope.confirmUpdate = (e) => {
                if (!$scope.model.noRec && !$scope.model.unitKerja) {
                    toastr.info("harap pilih Unit Kerja");
                    return;
                }

                if (!$scope.model.noRec && !$scope.model.subUnitKerja) {
                    toastr.info("harap pilih Sub Unit Kerja");
                    return;
                }

                if (!$scope.model.noRec && !$scope.model.tmt) {
                    toastr.info("Harap pilih TMT");
                    return;
                }

                $scope.popup.close();
                $scope.isUpdate = true;

                var confirm = $mdDialog
                    .confirm()
                    .title(`Apakah anda yakin ${$scope.model.noRec ? 'Update' : 'Tambah'} data`)
                    // .textContent("Anda akan mengubah data " + dataItem. + "")
                    .ariaLabel("Lucky day")
                    .targetEvent(e)
                    .ok("Ya")
                    .cancel("Tidak");

                $mdDialog.show(confirm).then(function () {
                    $scope.isRouteLoading = true;

                    let dataUpdate = {
                        statusEnabled: true,
                        unitKerjaPegawai: {
                            id: $scope.model.noRec ? $scope.model.unitKerjaId : $scope.model.unitKerja.id
                        },
                        subUnitKerjaPegawai: {
                            id: $scope.model.noRec ? $scope.model.subunitKerjaId : $scope.model.subUnitKerja.id
                        },
                        totalSkorDasar: parseFloat($scope.model.totalTargetSkor),
                        tmt: dateHelper.toTimeStamp($scope.model.tmt),
                    }

                    if ($scope.model.noRec) {
                        dataUpdate.noRec = $scope.model.noRec;
                    }

                    manageSdmNew.saveData(dataUpdate, "iki-remunerasi/save-target-skor-dokter").then((res) => {
                        $scope.isRouteLoading = false;
                        $scope.getData();
                        reset();
                    });
                }, () => {
                    $scope.popup.open().center();
                });
            }

            $scope.addData = () => {
                reset();
                $scope.isUpdate = false;
                $scope.popup.open().center();
            }

            $scope.closePopUp = () => {
                $scope.popup.close();
            }

            let reset = () => {
                $scope.isUpdate = false;
                $scope.model.unitKerjaId = null;
                $scope.model.subunitKerjaId = null;
                $scope.model.noRec = null;
                $scope.model.totalTargetSkor = null;
            }
        }
    ])
});