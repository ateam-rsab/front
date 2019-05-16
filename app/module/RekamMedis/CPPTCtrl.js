define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CPPTCtrl', ['$scope', '$timeout', '$state', 'CacheHelper', 'DateHelper', 'ManagePhp',
        function ($scope, $timeout, $state, cacheHelper, dateHelper, ManagePhp) {

            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true
            $scope.isDisable = false
            $scope.isRouteLoading = false
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            var cookie = document.cookie.split(';')
            var kelompokUser = cookie[0].split('=')
            var norec_apd = ''
            var norec_pd = ''
            localStorage.removeItem('activeMenuPengkajian');
            LoadCache();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheCPPT');
                if (chacePeriode != undefined) {
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                }
            }

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,
                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }

            //update by : IK
            //date : 01.05.2019
            $scope.cppt = {}
            $scope.gridCPPT = {
                toolbar: [{
                    name: "create", text: "Input Baru",
                    template: '<button ng-click="inputBaru(1)" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah SOAP</button>'
                    
                },
                {
                    name: "create", text: "Input Baru",
                    template: '<button ng-click="inputBaru(2)" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah ADIME</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [
                    {field: "tglinput", title: "Tgl/Jam", width: 100},
                    {field: "namalengkap", title: "Dokter", width: 150},
                    {field: "pegawaiasal", title: "Pegawai", template: '# if( pegawaiasal==null) {# - # } else {# #= pegawaiasal # #} #',"width": "150px"},
                    {field: "namaruangan", title: "Ruangan", width: 120}, 
                    {field: "noregistrasi", title: "No Registrasi", width: 100},  
                    {command: [{text: "Edit", click: editData, imageClass: "k-icon k-i-pencil"}, 
                                {text: "Detail", click: showDetail, imageClass: "k-icon k-i-pencil"},
                               {text: "Hapus", click: deleteData, imageClass: "k-icon k-i-cancel"}
                              ], title: "", width: 150}
                ]
            };

            $scope.inputBaru = function (key) {
                clear();

                if(key == 1) {
                    $scope.isSoap = true;
                    $scope.isAdime = false;
                    $scope.cppt.o = "Keadaan umum : Sadar, tidak sesak tidak sianosis dan tidak ada nyeri."
                    + "\n" + "Tanda-tanda Vital : Baik. Kepala : Mata tidak pucat,  tidak cekung dan tidak kuning."
                    + "\n" + "Faring: tidak hiperemis. Jantung/Paru : dalam batas normal."
                    + "\n" + "Perut: lemas,  Hepar/lien tidak teraba.  Tidak ada nyeri tekan dan turgor cukup."
                    + "\n" + "Ekstremitas : akral hangat";
                } else if (key == 2) {
                     if (kelompokUser[1] != 'dokter' && kelompokUser[1] !='pegawaigizi' ) {
                         toastr.warning('Tidak dapat input ADIME')
                         return
                     }
                     
                    $scope.isSoap = false;
                    $scope.isAdime = true;
                }
                $scope.isDisable = false
                $scope.popUp.center().open();
            }

            $scope.close = function() {
                $scope.popUp.close();
            }

            function clear() {
                delete $scope.cppt.norec
                delete $scope.cppt.s
                delete $scope.cppt.o
                delete $scope.cppt.a
                delete $scope.cppt.p
                delete $scope.cppt.aa
                delete $scope.cppt.d
                delete $scope.cppt.i
                delete $scope.cppt.m
                delete $scope.cppt.e
            }


            $scope.show = {}
            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

                if(dataItem.flag_ == 1) {
                    $scope.isSoap = true;
                    $scope.isAdime = false;
                    $scope.cppt.norec = dataItem.norec
                    $scope.cppt.s = dataItem.s
                    $scope.cppt.o = dataItem.o
                    $scope.cppt.a = dataItem.a
                    $scope.cppt.p = dataItem.p
                }else if(dataItem.flag_ == 2) {
                    $scope.isSoap = false;
                    $scope.isAdime = true;
                    $scope.cppt.norec = dataItem.norec
                    $scope.cppt.aa = dataItem.s
                    $scope.cppt.d = dataItem.o
                    $scope.cppt.i = dataItem.a
                    $scope.cppt.m = dataItem.p
                    $scope.cppt.e = dataItem.e
                }
            
                
                $scope.isDisable = true
                $scope.popUp.center().open();
            }

            //create by iwankasan
            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                //$scope.show = dataItem
                
                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }
                if ($scope.dataLogin.id != dataItem.pegawaifk) {
                    toastr.warning('Tidak bisa edit')
                    return
                }

                if(dataItem.flag_ == 1) {
                    $scope.isSoap = true;
                    $scope.isAdime = false;
                    $scope.cppt.norec = dataItem.norec
                    $scope.cppt.s = dataItem.s
                    $scope.cppt.o = dataItem.o
                    $scope.cppt.a = dataItem.a
                    $scope.cppt.p = dataItem.p
                } else if(dataItem.flag_ == 2) {

                    if (kelompokUser[1] != 'dokter' && kelompokUser[1] !='pegawaigizi' ) {
                        toastr.warning('Tidak dapat input ADIME')
                        return
                    }
                    
                    $scope.isSoap = false;
                    $scope.isAdime = true;
                    $scope.cppt.norec = dataItem.norec
                    $scope.cppt.aa = dataItem.s
                    $scope.cppt.d = dataItem.o
                    $scope.cppt.i = dataItem.a
                    $scope.cppt.m = dataItem.p
                    $scope.cppt.e = dataItem.e
                }
              

                $scope.isDisable = false
                $scope.popUp.center().open();
            }

            //create by iwankasan
            function editDataPerawat(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                //$scope.show = dataItem
                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }
                if ($scope.dataLogin.id != dataItem.pegawaifk) {
                    toastr.warning('Tidak bisa edit')
                    return
                }

                if(dataItem.flag == 1) {
                    $scope.isSoap = true;
                    $scope.isAdime = false;
                    $scope.cppt.norec = dataItem.norec
                    $scope.cppt.s = dataItem.s
                    $scope.cppt.o = dataItem.o
                    $scope.cppt.a = dataItem.a
                    $scope.cppt.p = dataItem.p
                }
         
                
  
                $scope.isDisable = false
                $scope.popUp.center().open();
            }


            //create by iwankasan
            function deleteData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }
                if($scope.dataLogin.id != dataItem.pegawaifk) {
                    toastr.warning('Tidak bisa hapus data')
                    return
                }
                var itemDelete = {
                    "norec" : dataItem.norec
                }

                ManagePhp.postData(itemDelete, 'rekam-medis/post-cppt/delete').then(function (e) {
                    loadCPPT()
                    $scope.cppt = {}
                });
            }

       
            //create by iwankasan
            function verifikasiData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }
                //if($scope.dataLogin.id != dataItem.pegawaifk) {
                //    toastr.warning('Tidak bisa verifikasi')
                //    return
                //}

                if (kelompokUser[1] != 'dokter' && kelompokUser[1] != 'bedah' ) {
                    toastr.warning('Verifikasi hanya untuk Dokter')
                    return
                }
                if(dataItem.flag_ == 1) {
                    $scope.isSoap = true;
                    $scope.isAdime = false;
                    $scope.cppt.norec = dataItem.norec
                    $scope.cppt.pegawaifk = dataItem.pegawaifk
                    $scope.cppt.s = dataItem.s
                    $scope.cppt.o = dataItem.o
                    $scope.cppt.a = dataItem.a
                    $scope.cppt.p = dataItem.p
                }
    
                $scope.isDisable = false
                $scope.popUp.center().open();

            }

            $scope.gridCPPTnotVerif = {
                pageable: true,
                columns: [
                    {field: "tglinput", title: "Tgl/Jam", width: 100}, 
                    {field: "namalengkap", title: "Pegawai", width: 150}, 
                    {field: "namaruangan", title: "Ruangan", width: 150}, 
                    {field: "noregistrasi", title: "No Registrasi", width: 100},
                    //{field: "pegawaiasalfk", title: "Pegawai", widht:100},
                    {command: [{text: "Edit", click: editDataPerawat, imageClass: "k-icon k-i-pencil"}, 
                       {text: "Verifikasi Dokter", click: verifikasiData, imageClass: "k-icon k-i-pencil"}],title: "&nbsp",width: 100}
                ]
            };
            function showDetailss(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

                $scope.popUp.center().open();

            }
            $scope.showSoap = function (bool, edit, verif) {

                if (bool && edit != true)
                    $scope.isShowSoap = true
                else
                    $scope.isShowSoap = false

                if (edit == true) {
                    if ($scope.dataCPPT == undefined) {
                        toastr.error('Pilih data dulu')
                        return
                    }

                    if ($scope.dataLogin.id != $scope.dataCPPT.pegawaifk && verif != true) {
                        toastr.error('Tidak bisa edit')
                        return
                    }
                    if (verif == true) {
                        if (kelompokUser[1] != 'dokter' && kelompokUser[1] != 'bedah' ) {
                            toastr.info('Verifikasi hanya untuk Dokter')
                            $scope.isShowSoap = false
                            return
                        }
                    }

                    $scope.isShowSoap = true
                    $scope.cppt.norec = $scope.dataCPPT.norec
                    $scope.cppt.s = $scope.dataCPPT.s
                    $scope.cppt.o = $scope.dataCPPT.o
                    $scope.cppt.a = $scope.dataCPPT.a
                    $scope.cppt.p = $scope.dataCPPT.p

                } else {
                    // buat Baru tapi ngambil data yg terakhir di input
                    if (kelompokUser[1] == 'dokter' && $scope.sourceCPPT._data.length > 0) {
                        var data = $scope.sourceCPPT._data[0]
                        // $scope.cppt.s = data.s
                        // $scope.cppt.o = data.o
                        // $scope.cppt.a = data.a
                        // $scope.cppt.p = data.p

                    } if (kelompokUser[1] == 'suster' && $scope.sourceCPPTnotVerif._data.length > 0) {
                        var data = $scope.sourceCPPTnotVerif._data[0]
                        // $scope.cppt.s = data.s
                        // $scope.cppt.o = data.o
                        // $scope.cppt.a = data.a
                        // $scope.cppt.p = data.p
                    }
                }
            }

            //function verifSample() {
            //    $scope.isShowSoap = true
                //$scope.cppt.norec = $scope.dataCPPT.norec
            //    $scope.cppt.s = $scope.dataCPPT.s
            //    $scope.cppt.o = $scope.dataCPPT.o
            //    $scope.cppt.a = $scope.dataCPPT.a
            //    $scope.cppt.p = $scope.dataCPPT.p

            //    $scope.isDisable = false
            //    $scope.popUp.center().open();
            //}

            $scope.Save = function () {
                if($scope.isSoap) {
                    var s = ''
                    if ($scope.cppt.s != undefined)
                        s = $scope.cppt.s
                    var o = ''
                    if ($scope.cppt.o != undefined)
                        o = $scope.cppt.o
                    var a = ''
                    if ($scope.cppt.a != undefined)
                        a = $scope.cppt.a
                    var p = ''
                    if ($scope.cppt.p != undefined)
                        p = $scope.cppt.p
                    var jsonSave = {
                        "norec": $scope.cppt.norec !== undefined ? $scope.cppt.norec : '',
                        "noregistrasifk": norec_apd,
                        "pegawaifk": $scope.dataLogin.id,
                        //"pegawaiasalfk": $scope.dataCPPT != undefined ? $scope.dataCPPT.pegawaifk : null,
                        "pegawaiasalfk": $scope.cppt.pegawaifk,
                        "ruanganfk": $scope.item.idRuangan,
                        "pasienfk": $scope.item.noMr,
                        "flag_" : 1,
                        "s": s,
                        "o": o,
                        "a": a,
                        "p": p,

                    }
                } else {
                    var aa = ''
                    if ($scope.cppt.aa != undefined)
                        aa = $scope.cppt.aa
                    var d = ''
                    if ($scope.cppt.d != undefined)
                        d = $scope.cppt.d
                    var i = ''
                    if ($scope.cppt.i != undefined)
                        i = $scope.cppt.i
                    var m = ''
                    if ($scope.cppt.m != undefined)
                        m = $scope.cppt.m
                    var e = ''
                    if ($scope.cppt.e != undefined)
                        e = $scope.cppt.e
                    var jsonSave = {
                        "norec": $scope.cppt.norec !== undefined ? $scope.cppt.norec : '',
                        "noregistrasifk": norec_apd,
                        "pegawaifk": $scope.dataLogin.id,
                        //"pegawaiasalfk": $scope.dataCPPT != undefined ? $scope.dataCPPT.pegawaifk : null,
                        "pegawaiasalfk": $scope.cppt.pegawaifk,
                        "ruanganfk": $scope.item.idRuangan,
                        "pasienfk": $scope.item.noMr,
                        "flag_" : 2,
                        "s": aa,
                        "o": d,
                        "a": i,
                        "p": m,
                        "e": e,
                    }
                }
                
                ManagePhp.postData(jsonSave, 'rekam-medis/post-cppt/save').then(function (e) {
                    loadCPPT()
                    $scope.cppt = {}
                    ManagePhp.postLogging('CPPT', 'Norec cppt_t',e.data.norec, 'SOAP').then(function (res) {
                    })
                });
                $scope.popUp.close();
            }
            $scope.delete = function () {
                if ($scope.dataCPPT == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                if ($scope.dataLogin.id != $scope.dataCPPT.pegawaifk) {
                    toastr.warning('Tidak bisa hapus data')
                    return
                }
                var deletes = {
                    'norec': $scope.dataCPPT.norec
                }
                ManagePhp.postData(deletes, 'rekam-medis/post-cppt/delete').then(function (e) {
                    loadCPPT()
                    $scope.cppt = {}
                });
            }
            loadCPPT()
            function loadCPPT() {
                let dataVerif = []
                let dataUnverif = []
                ManagePhp.getData('rekam-medis/get-cppt?nocm=' + $scope.item.noMr).then(function (dat) {
                    let array = dat.data.data;
                    for (let i in array) {
                        if (array[i].isverifikasi == true) {
                            dataVerif.push(array[i])
                        }
                        if (array[i].isverifikasi == false) {
                            dataUnverif.push(array[i])
                        }
                    }
                    $scope.sourceCPPT = new kendo.data.DataSource({
                        data: dataVerif
                    });
                    $scope.sourceCPPTnotVerif = new kendo.data.DataSource({
                        data: dataUnverif
                    });
                })
            }




        }
    ]);
});