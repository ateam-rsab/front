define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengaturanBobotJenisIndikatorCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.data = {};
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.item.bulan = new Date();

            $scope.listJenisIndikator = [{
                "id": 1,
                "name": "Kuantitas"
            }, {
                "id": 2,
                "name": "Kualitas"
            }, {
                "id": 3,
                "name": "Perilaku"
            }];
            $scope.optGrid = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="showPopupAdd()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "bulanBerlaku",
                    title: "<h3>Bulan Berlaku</h3>",
                    width: 70
                }, {
                    field: "jenisIndikator",
                    title: "<h3>Jenis Indikator</h3>",
                    width: 200
                }, {
                    field: "kelompokJabatan",
                    title: "<h3>Kelompok Jabatan</h3>",
                    width: 200
                }, {
                    field: "persentase",
                    title: "<h3>Persentase<br>(%)</h3>",
                    width: 50
                }, {
                    command: [{
                        text: "Edit",
                        click: editData,
                        imageClass: "k-icon k-i-pencil"
                    }, {
                        text: "Hapus",
                        click: confirmHapus,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 100
                }],
            }

            let init = () => {
                ManageSdmNew.getListData("service/list-generic/?view=KelompokJabatan&select=id,namaKelompokJabatan&criteria=statusEnabled,id&values=true,(1;2;3;4;5;6;7;8;9;10)&order=namaKelompokJabatan:asc").then((res) => {
                    $scope.listKelompokJabatan = res.data
                })
            }
            init();

            $scope.getData = () => {
                if (!$scope.item.bulan) {
                    toastr.info("Harap pilih bulan");
                    return;
                }
                let bln = dateHelper.toTimeStamp($scope.item.bulan);
                // http://192.168.12.3:8080/jasamedika-sdm/iki-remunerasi/get-master-bobot-jenis-indikator?periode=1622480400000
                ManageSdmNew.getListData("iki-remunerasi/get-master-bobot-jenis-indikator?periode=" + bln).then((res) => {
                    console.log(res);
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                })
            }
            $scope.getData();

            $scope.showPopupAdd = () => {
                $scope.reset();
                $scope.popupTambah.open().center();
            }

            $scope.saveData = (method) => {
                let statusEnabled = method === "save";
                if (!$scope.data.bulan) {
                    toastr.info("Harap pilih Bulan terlebih dahulu!")
                    return;
                }

                let dataSave = {
                    kdProfile: 0,
                    statusEnabled: statusEnabled,
                    bulan: dateHelper.toTimeStamp($scope.data.bulan),
                    jenisIndikator: $scope.data.jenisIndikator.id,
                    // kelompokJabatan : {
                    //     id : 8
                    // },
                    persentase: $scope.data.persentase
                }

                if ($scope.data.kelompokJabatan) {
                    dataSave.kelompokJabatan = {
                        id: $scope.data.kelompokJabatan.id
                    }
                }

                if ($scope.data.noRec) {
                    dataSave.noRec = $scope.data.noRec;
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-bobot-jenis-indikator").then(res => {
                    $scope.getData();
                    $scope.reset();
                    $scope.closePopup();
                })
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.data.noRec = dataItem.noRec;
                $scope.data.bulan = new Date(dataItem.bulanBerlaku);
                $scope.data.jenisIndikator = {
                    id: dataItem.jenisIndikatorId,
                    name: dataItem.jenisIndikator
                }

                $scope.data.kelompokJabatan = {
                    id: dataItem.kelompokJabatanId,
                    namaKelompokJabatan: dataItem.kelompokJabatan
                }
                $scope.data.persentase = dataItem.persentase;

                $scope.popupTambah.open().center();
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.data.noRec = dataItem.noRec;
                $scope.data.bulan = new Date(dataItem.bulanBerlaku);
                $scope.data.jenisIndikator = {
                    id: dataItem.jenisIndikatorId,
                    name: dataItem.jenisIndikator
                }

                $scope.data.kelompokJabatan = {
                    id: dataItem.kelompokJabatanId,
                    namaKelompokJabatan: dataItem.kelompokJabatan
                }
                $scope.data.persentase = dataItem.persentase;

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .textContent('Anda akan menghapus data secara permanen!')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                
                $mdDialog.show(confirm).then(function () {
                    ManageSdmNew.saveData({}, "iki-remunerasi/delete-master-bobot-jenis-indikator?noRec=" + dataItem.noRec).then(res => {
                        $scope.reset();
                        $scope.getData();
                        console.log("HAPUSED");
                    })
                }, function () {
                    console.info("Batal hapus....");
                    $scope.reset();
                });

            }

            $scope.reset = () => {
                $scope.data.bulan = null;
                $scope.data.jenisIndikator = null;
                $scope.data.persentase = null;
                $scope.data.kelompokJabatan = null;
                $scope.data.noRec = null;
            }

            $scope.closePopup = () => {
                $scope.popupTambah.close();
            };
        }
    ])
});