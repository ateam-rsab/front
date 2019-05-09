define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RadiologiPemeriksaanOrderCtrl', ['ManagePasien', 'ManageLaboratorium', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'FindPasienRadiologi', 'DateHelper', 'RekamDataPegawai', 'ManageRadiologi','ManageAkuntansi',
        function(managePasien, manageLaboratorium, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, findPasienRadiologi, dateHelper, RekamDataPegawai, manageRadiologi,ManageAkuntansi) {
        
            $scope.shows = 1;
            $scope.true = true; //disable text area keterangan order
            $scope.item = {};
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder;
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.cetak=false;
            $scope.verif=true;
            // RekamDataPegawai.getOrderList("lab/get-hd-lab/?noOrder=" + $state.params.noOrder).then(function(dat){
            //     $scope.stat =  dat.data.data.data;
            // });
            findPasien.getDokter().then(function(e){
                $scope.dokters = e.data.data;
            })
            findPasien.getByNoRegistrasi($state.params.noAntrianPasien).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                $scope.item.jenisKelamin = data.data.pasien.jenisKelamin.jenisKelamin;
                $scope.item.statusPerkawinan = data.data.pasien.statusPerkawinan.statusPerkawinan;
                $scope.item.alamat = data.data.alamat.alamatLengkap;
                $scope.item.ruangan = data.data.ruangan.id;
                // $scope.item.pasien.umur = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.item.tglRegistrasi = new moment(data.data.tglRegistrasi).format('DD MMMM YYYY');
                $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
                $scope.item.displayCito = $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
            });

            findPasienRadiologi.getOrder($scope.noOrder).then(function(data) {
                $scope.orders = data.data.data;
                var items = data.data.data.orders[0].detail;
                if (data.data.data.orders[0].strukOrder.isVerifikasi === null) 
                    $scope.editable = true; // cek editable = true (jika order blm di verifikasi)
                var data = [];
                for (var key in items) {
                    if (items.hasOwnProperty(key)) {
                        var element = items[key];
                        element.produk.jenisProduk = element.produk.detailJenisProduk.jenisProduk.jenisProduk;
                        // if (element.keteranganLainnya === "Sudah diverifikasi")
                        //     element.produk.check = true;
                        element.produk.orderRec = element.noRec;
                        data.push(element.produk);
                    }
                }
                $scope.listOrders2 = _.groupBy(data, 'jenisProduk');
            });
        
            $scope.listOrder = [];
            $scope.isChecked = function(subData) {
                if (subData.isVerifikasi === true) {
                    subData.isVerifikasi = undefined;
                    for(var i=0 ; i < $scope.listOrder.length; i++) {
                        if($scope.listOrder[i].orderRec == subData.orderRec){
                            $scope.listOrder.splice(i,1);
                        }
                    }
                } else {
                    subData.isVerifikasi = true;
                    $scope.listOrder.push(subData);
                }
                console.log(JSON.stringify($scope.listOrder));
            }
            $scope.Changeorders = function(data) {
                if ($scope.editable === true) {
                $state.go(data, {
                    noRec: $state.params.noRec,
                    noRegistrasi: $state.params.noRegistrasi,
                    noOrder: $scope.noOrder,
                    noAntrianPasien: $state.params.noAntrianPasien,
                    tanggal: $state.params.tanggal
                })
                } else {
                    window.messageContainer.error('Data sudah terverifikasi')
                }
                    
            }
            $scope.verifikasi = function(){
                var listRawRequired = [
                    "item.pegawaiRadiologi|k-ng-model|Dokter radiologi"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    if ($scope.editable === true) {
                        var items = $scope.listOrders2, 
                            data = [], dataVerifikasi;
                        for (var key in items) {
                            if (items.hasOwnProperty(key)) {
                                var element = items[key];
                                element.forEach(function(e){
                                    if (e.isVerifikasi === true) {
                                        data.push({
                                            "noRec": e.orderRec,
                                            "produkId": e.id
                                        })
                                    }
                                })
                            }
                        }
                        if (data.length) {
                            dataVerifikasi = {
                                "noOrder": $scope.orders.noOrder,
                                "strukOrder": {
                                    "noRec": $scope.orders.orders[0].strukOrder.noRec,
                                    "orderPelayanan": data
                                },
                                "noRecAntrian": $state.params.noAntrianPasien,
                                "asalRujukan": {
                                    "id": $scope.orders.orders[0].pasienDaftar.asalRujuakanId
                                },
                                "pasienDaftar": {
                                    "noRegistrasi": $scope.orders.orders[0].pasienDaftar.pasienDaftar.noRegistrasi
                                },
                                "ruanganPengirim": {
                                    "id": $scope.orders.orders[0].strukOrder.ruanganId
                                },
                                "dokterOrder": {
                                    "id": $scope.orders.orders[0].strukOrder.pegawaiOrder.id
                                },
                                "ruangan": {
                                    "id": $scope.orders.orders[0].strukOrder.ruanganTujuanId
                                },
                                "diagnosa": {
                                    // "id": $scope.orders.orders[0].strukOrder.diagnosaId
                                    "id": 1
                                },
                                "dokterRadilogi": {
                                    // "id": $scope.orders.orders[0].strukOrder.pegawaiOrder.id
                                    "id": $scope.item.pegawaiRadiologi.id
                                },
                                "kelompokPasienVO": {
                                    "id": $scope.orders.orders[0].strukOrder.noRegistrasi.kelompokPasienId
                                },
                                "pasien": {
                                    "id": $scope.orders.orders[0].strukOrder.noCm.id
                                },
                                "pegawaiVerifikasi": {
                                    "id": $scope.pegawai.id
                                }
                            }
                            // console.log(JSON.stringify(dataVerifikasi));
                            // debugger;
                            manageRadiologi.verifikasiOrderRadiologi(dataVerifikasi).then(function(e){
                                $scope.stat = undefined;
                                if(e.data.data.noOrder!=undefined){
                                    var norecpp = e.data.data['noRec pelayanan pasien'];
                                    var objSave = {
                                        "noRecPP": norecpp,
                                        "dokter": {
                                            "id": $scope.orders.orders[0].strukOrder.pegawaiOrder.id
                                        }
                                    }
                        
                                    ManageAkuntansi.postPelayananPetugasRad(objSave).then(function (e) {
                                    })
                                    $scope.cetak=true;
                                    $scope.verif=false;

                                }
                            })
                        } else {
                            window.messageContainer.error('Order belum di pilih');
                        }
                    } else {
                        window.messageContainer.error('Data sudah di verifikasi');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
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
                // debugger;
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
                    if ($scope.item.ruangan.id == undefined) {
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-ruangan=1&norec=' 
                            + $scope.item.pasienDaftar.noRegistrasi + '&strIdPegawai=' + $scope.pegawai.id +
                            '&strIdRuangan=ORDERRADIOLOGI' + $scope.item.noRec + '&view='+ stt, function(response) {
                            // do something with response
                        });
                    }else{
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-ruangan=1&norec=' 
                            + $scope.item.pasienDaftar.noRegistrasi + '&strIdPegawai=' + $scope.pegawai.id +
                            '&strIdRuangan=ORDERRADIOLOGI' + $scope.item.noRec + '&view='+ stt, function(response) {
                            // do something with response
                        });
                    }
                }
            }
        }
    ]);
});