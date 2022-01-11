define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringTargetSkorDokterCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.optGrid = {
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
                    },
                    {
                        command: [{
                            text: "Update Skor",
                            click: updateSkor,
                            // imageClass: "k-icon k-i-",
                        }],
                        title: "",
                        width: 70,
                    },
                ],
            };

            $scope.getData = () => {
                $scope.isRouteLoading = true;
                manageSdmNew.getListData(`iki-remunerasi/get-target-skor-kelompok-kerja?tahun=1640768793107`).then((res) => {
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
                $scope.item = dataItem;
                $scope.popupUpdateSkor.open().center();
            }

            $scope.confirmUpdate = (e) => {

                $scope.popupUpdateSkor.close();
                var confirm = $mdDialog
                    .confirm()
                    .title("Apakah anda yakin Update data?")
                    // .textContent("Anda akan mengubah data " + dataItem. + "")
                    .ariaLabel("Lucky day")
                    .targetEvent(e)
                    .ok("Ya")
                    .cancel("Tidak");

                $mdDialog.show(confirm).then(function () {
                    $scope.isRouteLoading = true;
                    let dataUpdate = {
                        noRec: $scope.item.noRec,
                        unitKerjaPegawai: {
                            id: $scope.item.unitKerjaId
                        },
                        subUnitKerjaPegawai: {
                            id: $scope.item.subunitKerjaId
                        },
                        totalSkorDasar: $scope.item.totalTargetSkor
                    }

                    manageSdmNew.saveData(dataUpdate, "iki-remunerasi/update-target-skor-dokter").then((res) => {
                        $scope.isRouteLoading = false;
                        $scope.getData();
                        reset();
                    });
                }, () => {
                    $scope.popupUpdateSkor.open().center();
                });
            }

            $scope.closePopUp = () => {
                $scope.popupUpdateSkor.close();
            }

            let reset = () => {
                $scope.item.unitKerjaId = null;
                $scope.item.subunitKerjaId = null;
                $scope.item.noRec = null;
                $scope.item.skor = null;
            }
        }
    ])
});