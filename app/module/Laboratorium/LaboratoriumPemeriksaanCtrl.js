define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaboratoriumPemeriksaanCtrl', ['ManagePasien', 'ManageLaboratorium', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper','RekamDataPegawai',

        function(managePasien, manageLaboratorium, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper,RekamDataPegawai) {
            /*add_hanafi*/
            $scope.listPersalinan = [{
                "id": "1",
                "name": "(+) Positif"
            },
            {
                "id": "2",
                "name": "(-) Negatif"
            },
            ];
            /*end*/
            $scope.shows = 0;
            $scope.item = {};
            $scope.item.tgl1 = "-" ;
            $scope.item.tgl2 = "-" ;
            $scope.item.tgl3 = "-" ;
             
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder; 
            findPasien.getByNoRegistrasi($state.params.noAntrianPasien).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                $scope.item.alamat = $scope.item.alamat.alamatLengkap;
                // $scope.item.pasien.umur = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.tglRegistrasi = data.data.tglRegistrasi;
                $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
                $scope.item.displayCito = $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
            });
            $scope.SimpanInternal = function() {
                manageLaboratorium.saveInternalMessage($scope.item.strukOrder);
            }

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            }
            $scope.onFocus = function(data) {
                $scope.curent = data.uuid;
            }
            $scope.onBlur = function(data) {
                var hasil = parseFloat(data.detail.hasil);
                if (data.objectNilaiNormal.rangeMin === undefined || isNaN(hasil))
                    data.isNormal = true
                else
                    if (data.objectNilaiNormal.rangeMin <= hasil && data.objectNilaiNormal.rangeMax >= hasil) {
                        data.isNormal = true;
                    } else {
                        data.isNormal = false;
                    }
                }
                $scope.setData = function(data) {
                    var valid = false;
                    for (var key in $scope.listOrders) {

                        if ($scope.listOrders.hasOwnProperty(key)) {
                            var element = $scope.listOrders[key];
                            for (var subKey in element.value) {
                                if (element.hasOwnProperty(subKey)) {
                                    var subElement = element[subKey];
                                    if (valid === true) {
                                        $scope.curent = subElement.uuid;
                                        break;
                                    }
                                    if (valid === false && subElement.uuid === $scope.curent) {
                                        subElement.detail.hasil = data;
                                        valid = true;
                                    }

                                }
                            }
                        }
                    }
                }
                $scope.showDetail = function(data) {
                    findPasienLaboratorium.getHistoryOrder($scope.strukOrder.tglOrder, data.detail.id, $scope.item.pasien.noCm).then(function(item) {
                        data.details = [];
                        for (var key in item.data.data) {
                            if (item.data.data.hasOwnProperty(key)) {
                                var element = item.data.data[key];
                                data.details.push({
                                    tgl: new Date(element.strukHasilPemeriksaan.tglHasil),
                                    nilai: element.hasil
                                })
                            }
                        }
                        data.isDetail = true;
                    });
                }
                $scope.choice = ["Tidak Normal", "Normal"];
                $scope.isShowDetail = false;
                $scope.showDetail = function() {
                    $scope.isShowDetail = !$scope.isShowDetail;
                }
                if ($state.current.name === "DashboardLaboratoriumCtrlLihatHasil" || "LaboratoriumPasien.VerifikasiOrder" === $state.current.name || "LaboratoriumPasien.Verifikasi" === $state.current.name || "LaboratoriumPasien.LihatHasil" === $state.current.name || "LaboratoriumPasien.InputHasil" === $state.current.name || $state.current.name === "DashboardLaboratoriumCtrlInputHasil" || $state.current.name === 'DashboardLaboratoriumCtrlVerifikasi') {
         
                    findPasienLaboratorium.getOrderDetail($scope.noOrder).then(function(data) {
                        var items = data.data.data.orders;
                        if (data.data.data.header !== undefined)
                            $scope.noRecHasilPemeriksaan = data.data.data.header.noRec;
                        if (items === undefined)
                            return;
                        $scope.strukOrder = data.data.data.strukOrder;
                        if (data.data.data.header !== undefined)
                            $scope.item.keteranganLainnya = data.data.data.header.keteranganLainnya;
                        var data = [];
                        var dataTemp = [];
                        var id = 0;
                        for (var key in items) {
                            if (items.hasOwnProperty(key)) {
                                var element = items[key];
                                if (element.produk === undefined) {
                                    element.hasilPemeriksaan.detail.hasil = element.hasilPemeriksaan.hasil;
                                    element.hasilPemeriksaan.detail.nilaiNormal = element.hasilPemeriksaan.nilaiNormal;
                                    var valid = false;
                                    if (ModelItem.getStatusUser() === 'pjLboratorium') {
                                        valid = element.hasilPemeriksaan.statusVerifikasi === 2 ? true : false;
                                    } else
                                    valid = element.hasilPemeriksaan.statusVerifikasi === 1 || element.hasilPemeriksaan.statusVerifikasi === 2 ? true : false;
                                    var item = {
                                        detail: element.hasilPemeriksaan.detail,
                                        namaProduk: element.hasilPemeriksaan.detail.detailPemeriksaan,
                                        nilaiNormal: element.hasilPemeriksaan.detail.nilaiNormal,
                                        metode: 'metode ' + id,
                                        isNormal: true,
                                        uuid: guid(),
                                        jenisPeriksa: element.hasilPemeriksaan.produk.jenisPemeriksaanPenunjang.jenisPeriksa,
                                        statusVerifikasi: valid
                                    };
                                    item.detail.produk = element.hasilPemeriksaan.produk;
                                    item.detail.comment = element.hasilPemeriksaan.comment;
                                    item.noRec = element.hasilPemeriksaan.noRec;
                                    if (ModelItem.getStatusUser() === 'pjLboratorium') {
                                        if (valid === true || element.hasilPemeriksaan.statusVerifikasi === 1)
                                            data.push(item);
                                    } else data.push(item);

                                } else {
                                    element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                                    if (element.keteranganLainnya === "Sudah diverifikasi")
                                        element.produk.check = true;
                                    element.produk.orderRec = element.noRec;
                                    for (var key in element.detail) {
                                        if (element.detail.hasOwnProperty(key)) {
                                            var subItem = element.detail[key];
                                            var nilaiNormal = "";
                                            var nilaiNormalData = {};
                                            if (subItem.produkNilaiNormal !== undefined && subItem.produkNilaiNormal[0] !== undefined) {
                                                for (var key in subItem.produkNilaiNormal) {
                                                    if (subItem.produkNilaiNormal.hasOwnProperty(key)) {
                                                        var elementData = subItem.produkNilaiNormal[key];
                                                        nilaiNormal += elementData.refRange + "\n";
                                                        nilaiNormalData = elementData;
                                                    }
                                                }

                                            }
                                            id++;
                                            element.produk._id = id;
                                            element.produk.detail = element.subItem;
                                            subItem.hasil = "";
                                            data.push({
                                                detail: subItem,
                                                namaProduk: subItem.detailPemeriksaan,
                                                satuanStandar: subItem.satuanStandar,
                                                isNormal: true,
                                                nilaiNormal: nilaiNormal,
                                                objectNilaiNormal: nilaiNormalData,
                                                metode: subItem.metodePemeriksaanPenunjang ? subItem.metodePemeriksaanPenunjang.metodePeriksa : "",
                                                uuid: guid(),
                                                jenisPeriksa: element.produk.jenisPeriksa
                                            });
                                        }
                                    }
                                }

                            }
                        }
                        if (ModelItem.getStatusUser() === 'pjLboratorium') {
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    var element = data[key];
                                    // element.statusVerifikasi = false;
                                }
                            }
                        }
                        $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
                    });
                } else {
                    findPasienLaboratorium.getOrder($scope.noOrder).then(function(data) {
                        var items = data.data.data.orders[0].detail;
                        var data = [];
                        for (var key in items) {
                            if (items.hasOwnProperty(key)) {
                                var element = items[key];

                                element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                                if (element.keteranganLainnya === "Sudah diverifikasi")
                                    element.produk.check = true;
                                element.produk.orderRec = element.noRec;
                                data.push(element.produk);
                            }
                        }
                        $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
                    });
                }

                var list = [];
                $scope.checked = function(data) {
                    if (data.check === true) {
                        data.check = undefined;
                        var index = list.indexOf(data.orderRec);
                        list = list.slice(index, index - 1);
                    } else {
                        data.check = true;
                        list.push(data.orderRec);
                    }

                }

                findPasienLaboratorium.getOrder($scope.noOrder).then(function(data) {
                    $scope.details = data.data.data.orders[0].detail;
                });

                $scope.SelectAll = function() {
                    for (var key in $scope.listOrders) {
                        if ($scope.listOrders.hasOwnProperty(key)) {
                            var element = $scope.listOrders[key];
                            for (var keyItem in element) {
                                if (element.hasOwnProperty(keyItem)) {
                                    var subData = element[keyItem];
                                    if (subData.statusVerifikasi === undefined)
                                        subData.statusVerifikasi = true;
                                    else subData.statusVerifikasi = !subData.statusVerifikasi;
                                }
                            }
                        }
                    }
                }

                $scope.SaveSysmex = function() {
                    $scope.Save();
                    manageLaboratorium.sysmex($scope.noOrder).then(function(e) {
                        //window.history.back();
                    });
                }

                $scope.Save = function() {
                    if ("LaboratoriumPasien.Verifikasi" === $state.current.name || "LaboratoriumPasien.InputHasil" === $state.current.name || "DashboardLaboratoriumCtrlInputHasil" === $state.current.name ||
                        "DashboardLaboratoriumCtrlVerifikasi" === $state.current.name || "LaboratoriumPasien.VerifikasiOrder" === $state.current.name ) {
                        var data = [];
                        for (var key in $scope.listOrders) {
                            if ($scope.listOrders.hasOwnProperty(key)) {
                                var element = $scope.listOrders[key];
                                for (var keyItem in element) {
                                    if (element.hasOwnProperty(keyItem)) {
                                        var subData = element[keyItem];
                                        var status = 0;
                                        if (ModelItem.getStatusUser() === 'pjLboratorium') {
                                            status = subData.statusVerifikasi ? 2 : 1;
                                        } else
                                        status = subData.statusVerifikasi ? 1 : 0;
                                        data.push({
                                            detail: subData.detail,
                                            hasil: subData.detail.hasil,
                                            comment: subData.detail.comment,
                                            noRec: subData.noRec,
                                            keterangan: $scope.item.keteranganLainnya,
                                            statusVerifikasi: status,
                                            nilaiNormal: subData.nilaiNormal,
                                            strukHasilPemeriksaan: {
                                                noRec: $scope.noRecHasilPemeriksaan
                                            }
                                        });

                                    }
                                }
                            }
                        }
                        manageLaboratorium.saveHasilPeriksa($scope.noOrder, ModelItem.beforePost(data)).then(function(e) {
                            if ($state.current.name === "DashboardLaboratoriumCtrlVerifikasi" || 'LaboratoriumPasien.Verifikasi' === $state.current.name  || "LaboratoriumPasien.VerifikasiOrder" === $state.current.name    ) {
                                var tglSuster = dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                                    tglDokter = dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
                                if (ModelItem.getStatusUser() === 'pjLboratorium') {
                                    managePasien.updateStatusAntrian($state.params.noAntrianPasien, 12, tglSuster, tglDokter).then(function(e) {
                                        // window.history.back();
                                    });
                                } else
                                managePasien.updateStatusAntrian($state.params.noAntrianPasien, 14, tglSuster, tglDokter).then(function(e) {
                                //   window.history.back();
                                });
                            } else
                            managePasien.updateStatusAntrian($state.params.noAntrianPasien, 5, tglSuster, tglDokter).then(function(e) {
                                // window.history.back();
                            });
                        });
                    } else {
                        manageLaboratorium.verifikasiPemeriksaan(list.join(',')).then(function(e) {
                            $scope.isReport = true;
                        });
                    }
                }
        /*        $scope.cetak = function() {
                    $state.go('LaboratoriumCetakBarcodeCtrl', {
                        noRegistrasi: $state.params.noRegistrasi,
                        noOrder: $state.params.noOrder,
                        noAntrianPasien: $state.params.noAntrianPasien,
                    })
                }*/
                        
                $scope.histori = function(){
                    RekamDataPegawai.getOrderList("lab/get-result-detail-laboratorium-history/?noOrder="+$scope.noOrder).then(function(data) {
                        $scope.item.tgl1 =  data.data.data.tanggal1;
                        $scope.item.tgl2 =  data.data.data.tanggal2;
                        $scope.item.tgl3 =  data.data.data.tanggal3; 
                    
                        $scope.resultGrids2 = new kendo.data.DataSource({
                            data: data.data.data.hasil,
                            sort: { field: "urutan", dir: "asc" }  
                        });    
                    });
        
                    $scope.group = {
                        field: "Pemeriksaan"
                    };
                    $scope.ColumnResult2 = [
                        {
                            field: "namaPemeriksaan",
                            title: "Nama Pemeriksaan",
                            width: "20%"
                        }, {
                            field: "hasilPemeriksaan",
                            title: "Hasil Pemeriksaan",
                            width: "15%", 
                                attributes: {
                                class: "#=flag != 'N' ? 'red' : 'green' #"
                            }
                        }, {
                            field: "nilaiNormal",
                            title: "Nilai Normal",
                            width: "15%"
                        }, {
                            field: "satuan",
                            title: "satuan",
                            width: "10%"
                        },{
                            field: "hasilPemeriksaan1",
                            title: "{{item.tgl1}}",
                            width: "15%", 
                                attributes: {
                                class: "#=flag1 != 'N' ? 'red' : 'green' #"
                            }
                        } , {
                            field: "hasilPemeriksaan2",
                            title: "{{item.tgl2}}",
                            width: "15%", 
                                attributes: {
                                class: "#=flag2 != 'N' ? 'red' : 'green' #"
                            }
                        },{
                            field: "hasilPemeriksaan3",
                            title: "{{item.tgl3}}",
                            width: "15%", 
                                attributes: {
                                class: "#=flag3 != 'N' ? 'red' : 'green' #"
                            }
                        },{ 
                            hidden: true,
                            field: "flag" 
                        },{ 
                            hidden: true,
                            field: "flag3" 
                        },{ 
                            hidden: true,
                            field: "flag2" 
                        },{ 
                            hidden: true,
                            field: "flag1" 
                        },{
                            hidden: true,
                            field: "paket",
                            title :"Pemeriksaan"
                        }, {
                            hidden: true,
                            field: "idLab"
                        }, {
                            hidden: true,
                            field: "urutan"
                        }
                    ]; 
                }
                
                $scope.result = function(){ 
                    //belum di rapihkan, 2 view yang berbeda
                    ///grid untuk di modul app lab khusus
                    $scope.group = {
                        field: "Pemeriksaan"
                    };

                    $scope.ColumnResult = [{
                        field: "namaPemeriksaan",
                        title: "Nama Pemeriksaan",
                        width: "20%"
                    }, {
                        field: "hasilPemeriksaan",
                        title: "Hasil Pemeriksaan",
                        width: "15%", 
                        attributes: {
                        class: "#=flag != 'N' ? 'red' : 'green' #"
                    }
                    }, {
                        field: "nilaiNormal",
                        title: "Nilai Normal",
                        width: "15%"
                    }, {
                        field: "satuan",
                        title: "Satuan",
                        width: "8%"
                    }, {
                        field: "keterangan",
                        title: "Keterangan",
                        width: "15%"
                    }, { 
                        field: "validator",
                        title :"Validator",
                        width: "20%"
                    }, { 
                        title :"Status",
                        field: "flag",
                        width: "7%"
                    }, {
                        hidden: true,
                        field: "paket",
                        title :"Pemeriksaan"
                    }, {
                        hidden: true,
                        field: "idLab"
                    }, {
                        hidden: true,
                        field: "urutan"
                    
                    }]; 

                    RekamDataPegawai.getOrderList("lab/get-result-detail-laboratorium/?noOrder="+$scope.noOrder).then(function(data) {
                        $scope.resultGrids = new kendo.data.DataSource({
                            data: data.data.data,
                            group: {
                                field: "paket"
                            } , 
                            sort: { field: "urutan", dir: "asc" }  
                        });
                    });
                }
            
                // findPasienLaboratorium.getOrder($scope.noOrder).then(function(data) {
                //     var items = data.data.data.orders[0].detail;
                //     var data = [];
                //     for (var key in items) {
                //         if (items.hasOwnProperty(key)) {
                //             var element = items[key];

                //             element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                //             if (element.keteranganLainnya === "Sudah diverifikasi")
                //                 element.produk.check = true;
                //             element.produk.orderRec = element.noRec;
                //             data.push(element.produk);
                //         }
                //     }
                //     $scope.listOrders2 = _.groupBy(data, 'jenisPeriksa');
                // });

                    
                if ("DashboardLaboratoriumCtrlLihatHasil" === $state.current.name ){
                    $scope.histori();  
                }else if ("LaboratoriumPasien.InputHasilKlinik" === $state.current.name ){
                    $scope.result(); 
                }else if ("DashboardLaboratoriumCtrlInputHasil" === $state.current.name ){
                
                }
        }
    ]);
});