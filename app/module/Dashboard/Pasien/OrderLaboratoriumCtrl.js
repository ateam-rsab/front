define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('OrderLaboratoriumCtrl', ['FindProduk', 'R', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai',

        function(produkService, r, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai) {
            $rootScope.showMenuPengkajianMedis = true;
            $scope.navigate = function() {
                var obj = {};
                for (var key in $state.params) {
                    if ($state.params.hasOwnProperty(key)) {
                        var element = $state.params[key];
                        obj[key] = element;
                    }
                }
                $state.go('dashboardpasien.PengkajianMedis.Order.HistoryLaboratorium', obj);
            }
             debugger;
            $scope.datas = [];
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
           

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

            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalPermintaan = $scope.now;
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

            produkService.jenisProdukByKelompokProduk(1).then(function(e) {
                $scope.listJenisProduk = e.data.data;
            });

            $scope.removeOrderRaiolog = function() {
                debugger;

                $scope.dataPemeriksaanLaboratorium.data([]);
            };
            $scope.removeRiwayatPenyakitOrObat = function(e) {
                debugger;
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);           
                     $scope.dataPemeriksaanLaboratorium.remove(selectedItem);
            };

            $scope.dokters = ModelItem.kendoHttpSource('/produk/get-jenis-produk?by=1');
 
            $scope.columnPemeriksaanLaboratorium = [
            {
                "field": "no",
                "title": "No",
                "width": 50
            }, {
                "field": "namaProduk",
                "title": "NamaPemeriksaan"
            }, {

                "field": "namaBahanSample",
                "title": "Bahan Sample"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatPenyakitOrObat
                },
                title: "&nbsp;",
                width: "110px"
            }];

            /*if (namaBahanSample==undefined) {
                data.push({namaBahanSample : ""})
            }*/
            $scope.dataPemeriksaanLaboratorium = new kendo.data.DataSource({
                data: $scope.datas 
            });
            $scope.AddProduk = function(data) {
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
                var dataGrid = $scope.dataPemeriksaanLaboratorium._data;
                var stat = true;
                    angular.forEach($scope.dataPemeriksaanLaboratorium._data, function(item){
                        if(data.id === item.id){
                             stat = false;
                        }
                    });

                if(stat === true){
                    data.no = $scope.dataPemeriksaanLaboratorium._data.length + 1;
                    $scope.dataPemeriksaanLaboratorium.add(data);
                    toastr.info(data.namaProduk + " telah di tambahkan");
                }else{
                      toastr.warning(data.namaProduk + " Sudah ada");
                }
            }
            $scope.Save = function() {
                /*add_251016*/

                if ($state.params.noCM == undefined) {
                    var penunjang = $scope.item.ruangan;
                }

                /*end*/
                var data = [];

                for (var key in $scope.dataPemeriksaanLaboratorium._data) {
                    if ($scope.dataPemeriksaanLaboratorium._data.hasOwnProperty(key)) {
                        var element = $scope.dataPemeriksaanLaboratorium._data[key];
                        if (element.id !== undefined)
                            data.push({
                                produk: element,
                                qtyProduk: 1
                            });
                    }
                }
                //untuk update, ditambahkan satu variabel untuk validasi update
                var cito = 0;
                if($scope.item.cito != undefined){
                    cito =  $scope.item.cito ;
                }
                if(data.length === 0) {
                    // validasi produk yang di order tidak boleh kosong
                    messageContainer.error('Data order tidak boleh kosong');
                } else {
                    managePasien.orderTindakanLaboratorium(cito, penunjang, $scope.pasien, $scope.tanggal, ModelItem.beforePost({
                        orderTindakan: data,
                        strukOrder: {
                            tglOrder: $scope.item.tanggalPermintaan,
                            pegawaiOrder: ModelItem.getPegawai(),
                            keteranganOrder: "Permintaan Laboratorium"
                        },
                        noRec: $state.params.noAntrian ? $state.params.noAntrian : $state.params.noRec
                    }));
                }
            }
        }
    ]);
});