define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaboratoriumPemeriksaanOrderCtrl', ['ManagePasien', 'ManageLaboratorium', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper','RekamDataPegawai','ManageAkuntansi',
        function(managePasien, manageLaboratorium, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper,RekamDataPegawai,ManageAkuntansi) {
            $scope.shows = 1;
            $scope.item = {};
            $scope.item.tgl1 ;
            $scope.item.tgl2 ;
            $scope.item.tgl3 ;
            $scope.item.noRecLab;
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder; 
            $scope.stat = 0;
            $scope.statOrderLab = $state.params.statOrder;
            $scope.$watch('statOrderLab', function(e){
                if (!e) return;
                if (e === "0") {
                $scope.isReport = false;
                    $scope.isSimpan = true;
                } else {
                    $scope.isReport = true;
                    $scope.isSimpan = false;
                }
            })
            // if($state.params.statOrder === "0") {
            //     $scope.isReport = false;
            //     $scope.isSimpan = true;
            // } else {
            //     $scope.isReport = true;
            //     $scope.isSimpan = false;
            // }
            $scope.isReport = true;
            $scope.isSimpan = true;
            // if($state.params.statOrder === "0") {
            //     debugger;
            //     $scope.isReport = false;
            //     $scope.isSimpan = true;
            // } else {
            //     debugger;
            //     $scope.isReport = true;
            //     $scope.isSimpan = false;
            // }
            $scope.pegawai = ModelItem.getPegawai();
            findPasien.getDokter().then(function(e){
                $scope.dokters = e.data.data;
            })
            RekamDataPegawai.getOrderList("lab/get-hd-lab/?noOrder=" + $state.params.noOrder).then(function(dat){
                    $scope.stat =  dat.data.data.data;
            });

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
            if ("LaboratoriumPasien.VerifikasiOrder" === $state.current.name ) {
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
            // $scope.count = 0;
            $scope.insertSysmeklagi = function(noOrder){
                // if ($scope.count === 10) {
                //     messageContainer.error('Tidak bisa simpan ke SYSMEK');
                //     return;
                // }
                manageLaboratorium.sysmex($scope.noOrder).then(function(e) {
                    if (e.data.data === undefined) {
                        // $scope.count += 1;
                        $scope.insertSysmeklagi($scope.noOrder);
                    } else {
                        // $scope.isReport = false;
                        $state.params.statOrder = 1;
                        $state.go($scope.currentState, $state.params);
                    }
                });
            }
            $scope.SaveSysmex = function() {
                $scope.Save();
                manageLaboratorium.sysmex($scope.noOrder).then(function(e) {
                    if (e.data.data === undefined) {
                        // $scope.count += 1;
                        $scope.insertSysmeklagi($scope.noOrder);
                    } else {
                        // $scope.isReport = false;
                        $state.params.statOrder = 1;
                        $state.go($scope.currentState, $state.params);
                    }
                });
                  


            }
    
            $scope.Save = function() {
                 if ($scope.item.pegawaiLab==undefined){
                                toastr.error('Dokter Lab Harus Di isi')
                                return
                           }
                if ("LaboratoriumPasien.VerifikasiOrder" === $state.current.name) {
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
                        if (e.data.data.noOrder!= undefined){
                            $scope.isReport = true;
                            $scope.isSimpan = false;
                              
                          
                        }
                        var tglSuster = dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                            tglDokter = dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');

                        if ("LaboratoriumPasien.VerifikasiOrder" === $state.current.name) {
                            if (ModelItem.getStatusUser() === 'pjLboratorium') {
                                managePasien.updateStatusAntrian($state.params.noAntrianPasien, 12, tglSuster, tglDokter).then(function(e) {
                                    // window.history.back();
                                });
                            } else
                            managePasien.updateStatusAntrian($state.params.noAntrianPasien, 14, tglSuster, tglDokter).then(function(e) {
                                // window.history.back();
                            });
                        } else
                        managePasien.updateStatusAntrian($state.params.noAntrianPasien, 5, tglSuster, tglDokter).then(function(e) {
                            // window.history.back();


                        });
                         $scope.updateDokter();
                    });
                    



                } else {
                    manageLaboratorium.verifikasiPemeriksaan(list.join(',')).then(function(e) {
                        $scope.isReport = true;
                        $scope.isSimpan = false;
                    });
                }
            }

            $scope.updateDokter=function(){
                // update Dokter Lab
                            var objSave = {
                                "noorder" : $scope.noOrder,
                                "dokter": {
                                    "id": $scope.item.pegawaiLab.id
                                }
                            }
                            ManageAkuntansi.updateDokterLab(objSave).then(function (e) {
                            })

                     //    endd
            }
            $scope.Changeorders = function(data) {
                $state.go(data ? data : 'DashboardLaboratoriumCtrlInputHasil', {
                    noRegistrasi: $state.params.noRegistrasi,
                    noOrder: $scope.noOrder,
                    noAntrianPasien: $state.params.noAntrianPasien
                    })
                    
            }
    
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
                $scope.listOrders2 = _.groupBy(data, 'jenisPeriksa');
            });
            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }

            $scope.cetakBuktiLayanan = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh
                    var stt = 'false'
                    if (confirm('View Bukti Layanan? ')){
                        // Save it!
                        stt='true';
                    }else {
                        // Do nothing!
                        stt='false'
                    }
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-ruangan=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&strIdPegawai=' + $scope.pegawai.id +'&strIdRuangan=' + $scope.item.ruangan.id + '&view='+ stt, function(response) {
                        // do something with response
                    });
                }
            }
        }
    ]);
});