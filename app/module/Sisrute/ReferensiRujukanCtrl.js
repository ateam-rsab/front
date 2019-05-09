define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ReferensiRujukanCtrl', ['$q', '$scope', 'ModelItem', 'DateHelper', 'CacheHelper', '$state', 'ManagePhp',
        function ($q, $scope, ModelItem, dateHelper, cacheHelper, $state, managePhp) {
            $scope.item = {};
            $scope.now = new Date();
            // $scope.item.tglRujukan = new Date();
            $scope.isRouteLoading = false;

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'))
            getCombo()
            function getCombo() {
                $scope.listStatus = [{ id: 0, name: 'Tidak Diterima' }, { id: 1, name: 'Diterima' }]
                $q.all([
                    managePhp.getData("sisrute/get-combo"),

                ]).then(function (result) {
                    if (result[0].statResponse) {
                        $scope.listDokter = result[0].data.dokter
                        $scope.listPetugas = result[0].data.pegawai
                    }

                })

            }

            loadDataFaskes()
            loadDataAlasan()
            loadDataDiagnosa()
            function loadDataFaskes() {
                $scope.isRouteLoading = true;

                var nama = "";
                if ($scope.item.namaFaskes != undefined) {
                    nama = $scope.item.namaFaskes
                }
                managePhp.getData("sisrute/referensi/faskes?"
                    + "query=" + nama
                  
                ).then(function (dat) {
                    if (dat.data.total > 0) {
                        // toastr.info(dat.data.total + ' ' + dat.data.detail, 'Success')
                        var datas = dat.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                        }
                    }
     
                    $scope.isRouteLoading = false;
                    $scope.sourceGridFaskes = new kendo.data.DataSource({
                        data: datas,
                        pageSize: 20,
                    });
                })
            }
            function loadDataAlasan() {
                $scope.isRouteLoading = true;

                var nama = "";
                if ($scope.item.namaAlasan != undefined) {
                    nama = $scope.item.namaAlasan
                }
                managePhp.getData("sisrute/referensi/alasanrujukan?"
                    + "query=" + nama
                  
                ).then(function (dat) {
                    if (dat.data.total > 0) {
                        // toastr.info(dat.data.total + ' ' + dat.data.detail, 'Success')
                        var datas = dat.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                        }
                    }
                    // else
                    //     toastr.error(dat.data.detail, 'Info')

                    $scope.isRouteLoading = false;
                    $scope.sourceGridAlasan = new kendo.data.DataSource({
                        data: datas,
                        pageSize: 20,
                    });
                })
            }
            function loadDataDiagnosa() {
                $scope.isRouteLoading = true;

                var nama = "";
                if ($scope.item.diagnosa != undefined) {
                    nama = $scope.item.diagnosa
                }
                managePhp.getData("sisrute/referensi/diagnosa?"
                    + "query=" + nama
                  
                ).then(function (dat) {
                    if (dat.data.total > 0) {
                        // toastr.info(dat.data.total + ' ' + dat.data.detail, 'Success')
                        var datas = dat.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                        }
                    }
     
                    $scope.isRouteLoading = false;
                    $scope.sourceGridDiagnosa = new kendo.data.DataSource({
                        data: datas,
                        pageSize: 20,
                    });
                })
            }
            $scope.columnFaskes = [
                { field: "no", title: "No", width: "10px" },
                { field: "KODE", title: "Kode ", width: "80px" },
                { field: "NAMA", title: "Nama Faskes", width: "150px" },
            ];
            $scope.columnAlasan = [
                { field: "no", title: "No", width: "10px" },
                { field: "KODE", title: "Kode ", width: "80px" },
                { field: "NAMA", title: "Nama Faskes", width: "150px" },
            ];
            $scope.columnDiagnosa = [
                { field: "no", title: "No", width: "10px" },
                { field: "KODE", title: "Kode ", width: "80px" },
                { field: "NAMA", title: "Nama Faskes", width: "150px" },
            ];
        
            $scope.cariFaskes = function () {
                loadDataFaskes();
            }
            $scope.cariAlasan = function () {
                loadDataAlasan();
            }
            $scope.cariDiagnosa = function () {
                loadDataDiagnosa();
            }
            $scope.reset = function () {
                delete $scope.item.namaFaskes
                delete $scope.item.namaAlasan
                delete $scope.item.diagnosa
            }
          
        }
    ]);
});