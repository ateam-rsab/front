define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BedahCtrl', ['DateHelper', 'ManagePasien', 'FindProduk', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'GetPostOnPengkajianAwal', 'FindPegawai',
        function(dateHelper, ManagePasien, produkService, $rootScope, $scope, ModelItem, $state, findPasien, getPostOnPengkajianAwal, findPegawai) {
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.now = new Date();
            $scope.item = {};
            if ($state.params.noRec !== undefined) {
                findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
                    $scope.noCM = e.data.data.pasien.noCm;
                    $scope.tanggal = moment(ModelItem.beforePost(e.data.data).tglRegistrasi).format('YYYY-MM-DD HH:mm:ss.SSS');
                    findPasien.getByNoCM($scope.noCM).then(function(data) {
                        $rootScope.currentPasien = data.data;
                        $scope.pasien = data.data.data;
                    });
                });

            } else {
                findPasien.getByNoCM($scope.noCM).then(function(data) {
                    $rootScope.currentPasien = data.data;
                    $scope.pasien = data.data.data;
                });
                findPasien.getDiagnosisKerja($scope.noCM, $scope.tanggal).then(function(e) {
                    $scope.diagnosisKerja = e.data;
                })

                findPasien.getDiagnosisTindakan($scope.noCM, $scope.tanggal).then(function(e) {
                    $scope.diagnosisTerapi = e.data;
                });
            }
            $scope.$watch('item.detailProduk', function(e) {
                if (e === undefined) return;
                produkService.produkByJenisProduk(e.id).then(function(e) {
                    $scope.listProduk = e.data.data;

                });
            });
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                produkService.detailJenisProdukByJenisProduk(e.id).then(function(e) {
                    $scope.listDetailJenisProduk = e.data.data;

                });

            });
            findPasien.getDiagnosisKerja($scope.noCM, $scope.tanggal).then(function(e) {
                $scope.diagnosisKerja = e.data;
            })

            findPasien.getDiagnosisTindakan($scope.noCM, $scope.tanggal).then(function(e) {
                $scope.diagnosisTerapi = e.data;
            });
            produkService.jenisProdukByKelompokProduk(3).then(function(e) {
                $scope.listJenisProduk = e.data.data;
            });


            $scope.removeOrderRaiolog = function(e) {
                debugger;
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataPemeriksaanLaboratorium.remove(selectedItem);
            };
            $scope.columnPemeriksaanLaboratorium = [{
                "field": "id",
                "title": "No",
                "width": 100
            }, {
                "field": "namaProduk",
                "title": "Nama Tindakan"
            }, {
                "field": "namaExternal",
                "title": "Keterangan"
            }, {
                    command: {
                    text: "Hapus",
                    click: $scope.removeOrderRaiolog
                    },
                    title: "&nbsp;",
                    width: "110px"
                }];

            $scope.dataPemeriksaanLaboratorium = new kendo.data.DataSource({
                data: []
            })
            /*add_hanafi*/
            $scope.AddProduk = function(data) {
                debugger;
                if (data.namaBahanSample == undefined) {
                    data.namaBahanSample = "";
                }
                if (data.bahanSample !== undefined) {
                    data.namaBahanSample = data.bahanSample.namaBahanSample;
                }
                if (data.keterangan !== undefined) {
                    if (data.keterangan.length > 0) {
                        alert(data.keterangan);
                    }
                }

                data.no = $scope.dataPemeriksaanLaboratorium._data.length + 1;
                $scope.dataPemeriksaanLaboratorium.add(data);
                toastr.info(data.namaProduk + " telah di tambahkan");
            }


           /* $scope.AddProduk = function(data) {
                if (data.namaBahanSample == undefined) {
                    data.namaBahanSample = "";
                }
                if (data.bahanSample !== undefined) {
                    data.namaBahanSample = data.bahanSample.namaBahanSample;
                }
                if (data.keterangan !== undefined) {
                    if (data.keterangan.length > 0) {
                        alert(data.keterangan);
                    }
                }
                data.no = $scope.dataPemeriksaanLaboratorium._data.length + 1;
                $scope.dataPemeriksaanLaboratorium.add(data);
                toastr.info(data.namaProduk + " telah di tambahkan");
            }*/

            $scope.Save = function() {
                    debugger;
               
                if($scope.dataPemeriksaanLaboratorium._data.length === 0){
                    $scope.item.dataGrid = undefined;
                }else{
                    $scope.item.dataGrid = $scope.dataPemeriksaanLaboratorium._data;
                }
               

                var listRawRequired = [
                   "item.tanggalPermintaanOperasi|ng-model|Tanggal Permintaan Operasi",
                    "item.dataGrid|k-ng-model|Data"
                    // "userPelapor|ng-model|User"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);

                var dataProduk = $scope.dataPemeriksaanLaboratorium._data;

                var tempDataProduk = [];
                for (var i = 0; i < dataProduk.length; i++) {

                    var data = {
                        'id': $scope.dataPemeriksaanLaboratorium._data[i].id,
                        'namaProduk': $scope.dataPemeriksaanLaboratorium._data[i].namaProduk,
                        'namaExternal': $scope.dataPemeriksaanLaboratorium._data[i].namaExternal
                    }

                    tempDataProduk.push(data);
                }

                $scope.item.dataProduk = tempDataProduk;

                //cacheHelper.set("kajianAwal", $scope.kajianAwal);
                debugger;
                var data = [];
                for (var key in $scope.dataPemeriksaanLaboratorium._data) {
                    if ($scope.dataPemeriksaanLaboratorium._data.hasOwnProperty(key)) {
                        var element = $scope.dataPemeriksaanLaboratorium._data[key];
                        if (element.id !== undefined)
                            data.push({
                                produk: element
                            });
                    }
                }
                var tglOperasi = dateHelper.formatDate($scope.item.tanggalPermintaanOperasi, 'YYYY-MM-DD');

                if(isValid.status){
                    ManagePasien.orderTindakanBedah($scope.pasien, $scope.tanggal, ModelItem.beforePost({
                        orderTindakan: data,
                        strukOrder: {
                            tglOrder: new Date(),
                            pegawaiOrder: ModelItem.getPegawai(),
                            rencanaOperasi: {
                                tglPermintaanOperasi: tglOperasi
                            },
                            keteranganOrder: "Permintaan Bedah"
                        },
                        ruangan: {
                            id: 14
                        },
                        noRec: $state.params.noRec,

                    }));
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

        }
    ]);
});