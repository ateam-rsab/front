define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RegistrasiPelayananGawatDaruratCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$rootScope', 'FindPasien', '$interval', 'socket', 'ManagePhp',
        function (managePasien, $scope, modelItem, $state, $rootScope, findPasien, $interval, socket, ManagePhp) {
            socket.on('gawatDarurat', function (data) {
                $scope.state++;
            });

            var noRec = '';
            var noRecDataPengantar = '';

            $scope.state = 1;
            $scope.item = {};
            $scope.listItem = [];
            $scope.sublistItem = [];
            $scope.groupItem = undefined;
            $scope.showFind = true;
            $scope.currentDate = undefined;

            $rootScope.isOpen = true;

            $scope.listKasusPolisi = [{ "id": 1, "name": "Ya" }, { "id": 2, "name": "Tidak" }]

            //Buatan urang
            ManagePhp.getData("rekam-medis/get-jenis-kelamin").then(function (dat) {
                $scope.listJenisKelamin = dat.data.jenisKelamin;

            });


            $scope.arrTandaVital = [
                { "name": "Berat Badan", "nilai": "", "type": "", "ket": "Kg", "noRec": "" },
                { "name": "Tekanan Darah", "nilai": "", "type": "", "ket": "mmHg", "noRec": "" },
                { "name": "Suhu", "nilai": "", "type": "", "ket": "'C", "noRec": "" },
                { "name": "Nadi", "nilai": "", "type": "", "ket": "x/mnt", "noRec": "" },
                { "name": "Pernapasan", "nilai": "", "type": "", "ket": "x/mnt", "noRec": "" }
            ];

            // Buatan urang
            ManagePhp.getData("generic/get-pemeriksaan-triage").then(function (dat) {
                // $scope.jalansNafas= dat.data.jenispemeriksaan;
                // debugger
                $scope.jalansNafas = _.where(dat.data.jenisPemeriksaan, {
                    'jenisPemeriksaan': 'Jalan nafas'
                });

                $scope.pernafasans = _.where(dat.data.jenisPemeriksaan, {
                    'jenisPemeriksaan': 'Pernafasan'
                });

                $scope.sirkulasis = _.where(dat.data.jenisPemeriksaan, {
                    'jenisPemeriksaan': 'Sirkulasi'
                });

                $scope.kesadarans = _.where(dat.data.jenisPemeriksaan, {
                    'jenisPemeriksaan': 'Kesadaran'
                });

            });

            // Buatan urang
            ManagePhp.getData("generic/get-kategori-triage").then(function (dat) {
                // $scope.jalansNafas= dat.data.jenispemeriksaan;
                // debugger
                $scope.kategories = dat.data.hasilKategoriTriage;



            });

            if ($state.params.noCm !== undefined && $state.params.noCm !== '') {
                // //     findPasien.getByNoCM($state.params.noCm).then(function(data) {
                // //         $scope.currentPasien = data.data.data;
                // //         $rootScope.currentPasien = data.data.data;
                // //         ModelItem.set("CurrentPasien", data.data.data);
                // //         $scope.item = data.data.data;
                // //         $scope.item.tipePasien = "Lama";
                // //         $scope.item.tglLahir = new Date($scope.currentPasien.tglLahir); //DateHelper.formatDate($scope.currentPasien.tglLahir,DD-MM-YYYY);
                // //         $scope.item.namaLengkap = $scope.currentPasien.namaLengkap;
                // //         $scope.item.tempNoCm = $scope.currentPasien.noCm;

                // //     });

                //         // var tempNoCm='832796';
                //         // ManagePhp.getData("generic/get-data-pasien?noCm=832796").then(function(e){ 
                //         ManagePhp.getData("generic/get-data-pasien?noCm="+$state.params.noCm).then(function(e){     

                //             $scope.item.tipePasien = "Lama";
                //             $scope.item.pasienId = e.data.dataPasien[0]['id'];
                //             $scope.item.namaPasien = e.data.dataPasien[0]['namapasien'];

                //         });

            } else {
                if ($scope.isRegistrasi === true) {
                    // findPasien.getHasilTriage($state.params.noRec).then(function(e) {
                    // ManagePhp.getData("generic/get-hasil-triase?noRec=0c6cf9a0-db31-11e8-b873-d900bcda").then(function(e){ 
                    // ManagePhp.getData("generic/get-hasil-triase?noRec=600c86c0-dd84-11e8-aa23-9773ae83").then(function(e){    
                    // noRec='600c86c0-dd84-11e8-aa23-9773ae83';

                    ManagePhp.getData("generic/get-hasil-triase?noRec=" + $state.params.noRec).then(function (e) {
                        noRec = $state.params.noRec;

                        // $scope.currentPasien = e.data.hasilTriase;
                        // $rootScope.currentPasien = e.data.hasilTriase;
                        // modelItem.set("CurrentPasien", e.data.hasilTriase);
                        // $scope.item = e.data.hasilTriase;
                        // $scope.item.tipePasien = "Lama";
                        // $scope.item.tglLahir = new Date($scope.currentPasien.tglLahir); //DateHelper.formatDate($scope.currentPasien.tglLahir,DD-MM-YYYY);
                        // $scope.item.namaLengkap = $scope.currentPasien.namaLengkap;
                        //             $scope.item.tempNoCm = $scope.currentPasien.noCm;

                        $scope.item.namaKeluarga = e.data.pengantarPasien[0].namakeluarga;
                        $scope.item.tglLahir = new Date(e.data.pengantarPasien[0].tgllahir);
                        noRecDataPengantar = e.data.pengantarPasien[0].norec;

                        var tmp = '';
                        for (var j = 0; j < $scope.arrTandaVital.length; j++) {
                            for (var key in e.data.hasilTriaseTandaVital[0]) {
                                tmp = $scope.arrTandaVital[j].name.replace(/\s/g, '').toLowerCase();
                                if (tmp == key) {
                                    $scope.arrTandaVital[j].nilai = e.data.hasilTriaseTandaVital[0][tmp];
                                    $scope.arrTandaVital[j].noRec = e.data.hasilTriaseTandaVital[0]['norec'];
                                }
                            }
                        }




                        var listTmp = [$scope.jalansNafas, $scope.pernafasans, $scope.sirkulasis, $scope.kesadarans];

                        for (var i = 0; i < listTmp.length; i++) {

                            for (var j = 0; j < listTmp[i].length; j++) {

                                for (var k = 0; k < e.data.detailHasilTriase.length; k++) {

                                    if (listTmp[i][j].id == e.data.detailHasilTriase[k]['id']) {
                                        $scope.manageItem(listTmp[i][j]);
                                        listTmp[i][j].norec = e.data.detailHasilTriase[k]['norec'];
                                    }
                                }


                            }

                        }


                        for (var i = 0; i < $scope.kategories.length; i++) {

                            if ($scope.kategories[i].id == e.data.hasilTriase[0].objectkategorihasiltriasefk) {
                                $scope.changeKategori($scope.kategories[i]);
                            }
                        }


                        $scope.item.hubunganKeluarga = { id: e.data.pengantarPasien[0]['objecthubungankeluargafk'], namaexternal: e.data.pengantarPasien[0]['namaexternal'] };
                        //$scope.item.hubunganKeluarga = {id:e.data.hubunganKeluarga[0]['objecthubungankeluargafk'],namaexternal:e.data.pengantarPasien[0]['namaexternal']};
                        $scope.item.transportasiPasien = { id: e.data.pengantarPasien[0]['objectstatusbawafk'], name: e.data.pengantarPasien[0]['namaexternal'] };
                        $scope.item.namaPasien = e.data.hasilTriase[0]['namapasien'];

                        if (e.data.pengantarPasien[0]['tempatkejadian'] != '') {
                            $scope.item.kasusPolisiId = 1;
                            $scope.item.kasusPolisi = "Ya";
                        } else {
                            $scope.item.kasusPolisiId = 2;
                            $scope.item.kasusPolisi = "Tidak";
                        }

                        $scope.item.jenisKelaminId = e.data.pengantarPasien[0]['objectjeniskelaminfk'];
                        $scope.item.tglKejadian = e.data.pengantarPasien[0]['tglkejadian'];
                        $scope.item.tempatKejadian = e.data.pengantarPasien[0]['tempatkejadian'];
                        $scope.item.tglMasuk = e.data.hasilTriase[0]['tanggalmasuk'];

                    });
                }
            }



            $scope.back = function () {


                $scope.state--;
            }

            // $scope.$watch('state', function(e) {
            $scope.$watchCollection('listItem',

                function (e) {
                    // debugger;   
                    $scope.groupItem = _.map(_.groupBy($scope.listItem, 'jenisPemeriksaan'),

                        function (e) {
                            return {
                                key: e[0].jenisPemeriksaan,
                                children: e
                            }
                        }

                    );

                }

            );


            $scope.manageItem = function (data, group) {

                data.isSelected = !data.isSelected;
                if (_.filter($scope.listItem, {
                    id: data.id
                }).length === 0) {
                    $scope.listItem.push(data);
                } else {

                    $scope.listItem = _.filter($scope.listItem, function (e) {
                        return e.id !== data.id;
                    })
                }
            }

            $scope.next = function () {
                if ($scope.state === 1) {
                    $scope.startDate = new Date();
                    $scope.interval = $interval(function () {
                        $scope.currentDate = moment(new Date() - $scope.startDate - (7 * 1000 * 60 * 60)).format('HH:mm:ss');
                    }, 100);
                }

                $scope.state++;
            }
            $scope.jalansNafas = [];

            // Buatan candra
            // modelItem.getDataDummyGeneric("PemeriksaanTriage", false, true, 50, {
            //     field: "jenisPemeriksaan",
            //     operator: "contains",
            //     value: "Jalan Nafas"
            // }).then(function(e) {
            //     $scope.jalansNafas = _.where(e, {
            //         'jenisPemeriksaan': 'Jalan nafas'
            //     });
            // });




            //Buatan candra 
            // modelItem.getDataDummyGeneric("StatusKelamin", false).then(function(data) {
            //         $scope.listJenisKelamin = data;
            //     })




            // modelItem.getDataDummyGeneric("StatusPasien", false).then(function(data) {
            //         $scope.listStatusPasien = data;
            //     })

            // Buatan candra
            // modelItem.getDataDummyGeneric("PemeriksaanTriage", false, true, 50, {
            //     field: "jenisPemeriksaan",
            //     operator: "contains",
            //     value: "Pernafasan"
            // }).then(function(e) {
            //     $scope.pernafasans = _.where(e, {
            //         'jenisPemeriksaan': 'Pernafasan'
            //     });
            // });



            //Buatan candra 
            // modelItem.getDataDummyGeneric("StatusPasien", false).then(function(data) {
            //     $scope.listStatusPasien = data;
            //     if (window.noCm != undefined) {
            //         $scope.item.tipePasien = "Lama";
            //         $scope.item.namaLengkap = $scope.currentPasien.namaPasien;
            //         $scope.item.tempNoCm = $scope.currentPasien.noCm;
            //         if ($rootScope.$$phase === undefined)
            //             $scope.$apply();
            //     }
            // })


            // Buatan candra
            // modelItem.getDataDummyGeneric("PemeriksaanTriage", false, true, 50, {
            //     field: "jenisPemeriksaan",
            //     operator: "contains",
            //     value: "Sirkulasi"
            // }).then(function(e) {
            //     $scope.sirkulasis = _.where(e, {
            //         'jenisPemeriksaan': 'Sirkulasi'
            //     });
            // });



            $scope.jenisKategori = undefined;

            $scope.changeKategori = function (data) {
                $scope.jenisKategori = data;
            }

            // Buatan candra
            // modelItem.getDataDummyGeneric("PemeriksaanTriage", false, true, 50, {
            //     field: "jenisPemeriksaan",
            //     operator: "contains",
            //     value: "Kesadaran"
            // }).then(function(e) {
            //     $scope.kesadarans = _.where(e, {
            //         'jenisPemeriksaan': 'Kesadaran'
            //     });
            // });



            $scope.findData = function () {
                $state.go('triageFind', {
                    noRec: $state.params.noRec
                });
            }

            // Buatan candra
            // modelItem.getDataDummyGeneric("PemeriksaanTriage", false, true, 50, {
            //     field: "jenisPemeriksaan",
            //     operator: "contains",
            //     value: "Jalan Nafas"
            // }).then(function(e) {
            //     $scope.TandaVital = _.where(e, {
            //         'jenisPemeriksaan': 'Jalan nafas'
            //     });
            // });

            $rootScope.isOpen = true;
            $scope.noCm = "";

            // Buatan candra
            // modelItem.getDataDummyGeneric("KategoriHasilTriase", false, true, 50, {
            //     field: "jenisKategori",
            //     operator: "contains",
            //     value: "Kategori"
            // }).then(function(e) {

            //     $scope.kategories = e;
            // });




            //Buatan candra
            // modelItem.getDataDummyGeneric("HubunganKeluarga", false).then(function(data) {
            //         $scope.listHubunganKeluarga = data;
            // })

            // modelItem.getDataDummyGeneric("StatusBawa", false).then(function(data) {
            //         $scope.listStatusBawa = data;
            //     })


            //Buatan urang
            ManagePhp.getData("rekam-medis/get-hubungan-keluarga").then(function (dat) {

                $scope.listHubunganKeluarga = dat.data.hubunganKeluarga;

            });

            ManagePhp.getData("rekam-medis/get-status-bawa").then(function (dat) {

                $scope.listStatusBawa = dat.data.statusBawa;

            });





            $scope.now = new Date();
            $scope.Save = function () {
                var listData = [];
                var data = [];
                //var listItemDetail=$scope.listItemDetail;
                for (data in $scope.listItem) {
                    var pemeriksaanTriage = {};
                    var dataItemManaged = $scope.listItem[data];
                    pemeriksaanTriage.pemeriksaanTriage = {
                        id: dataItemManaged.id
                    };

                    if (dataItemManaged.norec == undefined) {
                        pemeriksaanTriage.noRec = "";
                    } else {
                        pemeriksaanTriage.noRec = dataItemManaged.norec;
                    }


                    pemeriksaanTriage.statusEnabled = dataItemManaged.statusEnabled;
                    listData.push(pemeriksaanTriage);
                }

                // var noRec = "";
                var kategoriHasilTriase = {};


                // managePasien.saveTriage(modelItem.beforePost({
                //     kategoriHasilTriase: $scope.jenisKategori,
                //     kategoriHasilTriaseId: "",
                //     noRec: "",
                //     detailHasilTriase: listData,
                //     tanggalMasuk: new Date,
                //     namaPasien: $scope.item.namaPasien,
                //     statusPasien: "",
                //     generateTriase: new moment(new Date).format('DMYHIS')
                // },'YYYY-MM-DD HH:mm:ss'));

                var pasienId = null;
                var namaPasien = "";
                var namaKeluarga = "";
                var objectHubunganKeluargaFk = "";
                var tglLahir = "";
                var objectJenisKelaminFk = "";
                var objectStatusBawaFk = "";
                var tglKejadian = '';
                var tempatKejadian = "";

                var beratBadan = "";
                var tekananDarah = "";
                var suhu = "";
                var nadi = "";
                var pernapasan = "";
                var tglMasuk = "";

                if ($scope.item.namaPasien != undefined) {
                    namaPasien = $scope.item.namaPasien;
                }

                if ($scope.item.namaKeluarga != undefined) {
                    namaKeluarga = $scope.item.namaKeluarga;
                }

                if ($scope.item.hubunganKeluarga.id != undefined) {
                    objectHubunganKeluargaFk = $scope.item.hubunganKeluarga.id;
                }

                // if ($scope.item.tglLahir != undefined) {
                //     tglLahir = $scope.item.tglLahir;
                // }

                if ($scope.item.kelamin != undefined) {
                    objectJenisKelaminFk = $scope.item.kelamin;
                }

                if ($scope.item.transportasiPasien.id != undefined) {
                    objectStatusBawaFk = $scope.item.transportasiPasien.id;
                }

                // debugger
                if ($scope.item.tglKejadian != undefined) {
                    tglKejadian = $scope.item.tglKejadian;

                } else {
                    tglKejadian = $scope.item.tglMasuk;
                }

                // debugger
                if ($scope.item.tglMasuk != undefined) {
                    tglMasuk = $scope.item.tglMasuk;

                }

                if ($scope.item.tempatKejadian != undefined) {
                    tempatKejadian = $scope.item.tempatKejadian;
                }


                if ($scope.item.pasienId != undefined) {
                    pasienId = $scope.item.pasienId;
                }

                if ($scope.item.jenisKelaminId != undefined) {
                    objectJenisKelaminFk = $scope.item.jenisKelaminId;
                }

                if ($scope.item.kasusPolisi == "Tidak") {
                    tempatKejadian = "";
                }

                var dataPengantar = {};

                var listDataPengantar = [];
                dataPengantar.namaPasien = namaPasien;
                dataPengantar.umur = $scope.item.umurPasien;
                dataPengantar.namaKeluarga = namaKeluarga;
                dataPengantar.objectHubunganKeluargaFk = objectHubunganKeluargaFk;
                dataPengantar.tglLahir = $scope.item.tglLahir === undefined ? null : $scope.item.tglLahir;
                dataPengantar.objectJenisKelaminFk = objectJenisKelaminFk;
                dataPengantar.objectStatusBawaFk = objectStatusBawaFk;
                dataPengantar.tglKejadian = tglKejadian ? tglKejadian : null;
                dataPengantar.tempatKejadian = tempatKejadian;
                dataPengantar.noRec = noRecDataPengantar;

                // listDataPengantar.push(dataPengantar);

                ManagePhp.postData2("input-triage",
                    {
                        kategoriHasilTriase: $scope.jenisKategori,
                        // kategoriHasilTriaseId: "",
                        noRec: noRec,
                        detailHasilTriase: listData,
                        tanggalMasuk: moment($scope.item.tglMasuk).format('YYYY-MM-DD HH:mm:ss'),
                        namaPasien: namaPasien,
                        statusPasien: "",
                        dataPengantar: dataPengantar,
                        tandaVital: $scope.arrTandaVital,
                        generateTriase: new moment(new Date).format('DMYHIS'),
                        pasienId: pasienId
                    },
                ).then(
                    function (e) {

                        if (e.data.status == 201) {
                            $state.go('DaftarHasilTriase');
                            // $scope.item = {};
                            toastr.success(e.data.message);

                        } else {
                            toastr.error(e.data.message);
                        }




                    }
                );




            }
        }]);
});