define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPasienNewRevCtrl', ['$q', '$scope', 'ModelItem', 'ModelItemAkuntansi', '$state', 'CacheHelper', 'ManagePhp',
        function ($q, $scope, ModelItem, modelItemAkuntansi, $state, cacheHelper, managePhp) {
            $scope.title = 'Pendaftaran Pasien';
            $scope.item = {};
            $scope.now = new Date();
            $scope.isBayi = false;
            $scope.isRouteLoading = false
            loadCombo()
            init()
            function init() {
                $scope.noCmIbu = cacheHelper.get('CacheRegisBayi');
                if ($state.params.noRec != undefined && $state.params.noRec != 0 && $state.params.noRec != "") {
                    getPasienOnline();
                }
                else if ($scope.noCmIbu != undefined) {
                    $scope.isBayi = true;
                    $scope.title = 'Pendaftaran Pasien Bayi';
                    $scope.item.tglLahir = $scope.now
                    getPasienBayi();
                    cacheHelper.set('CacheRegisBayi', undefined)
                }
                else if ($state.params.idPasien != undefined && $state.params.idPasien != 0 && $state.params.idPasien != "") {
                    $scope.idPasien = parseInt($state.params.idPasien)
                    $scope.title = 'Edit Data Pasien';
                    editPasien();
                }
            }

            function getPasienBayi() {
                $scope.isRouteLoading = true
                managePhp.getData("registrasipasien/get-bynocm?noCm=" + $scope.noCmIbu).then(function (e) {
                    $scope.isRouteLoading = false
                    var result = e.data.data
                    $scope.item.noCmIbu = result.nocm;
                    $scope.item.namaIbu = result.namapasien
                    $scope.item.namaPasien = result.namapasien + " By Ny";
                    $scope.item.alamatLengkap = result.alamatlengkap
                    $scope.item.tempatLahir = result.tempatlahir;
                    $scope.item.jenisKelamin = { id: result.objectjeniskelaminfk, jeniskelamin: result.jeniskelamin }
                    if (result.objectagamafk)
                        $scope.item.agama = { id: result.objectagamafk, agama: result.agama }
                    // $scope.item.kebangsaan = { id: $scope.listKebangsaan._data[1].id, name: $scope.listKebangsaan._data[1].name }
                    if (result.kodepos)
                        $scope.item.kodePos = result.kodepos;
                    $scope.idIbu = result.nocmfk;
                    if (result.namasuamiistri)
                        $scope.item.namaAyah = result.namasuamiistri;
                    if (result.namasuamiistri)
                        $scope.item.namaKeluarga = result.namasuamiistri;
                    if (result.notelepon)
                        $scope.item.noTelepon = result.notelepon;
                    if (result.nohp)
                        $scope.item.noHp = result.nohp;

                    if (result.objectdesakelurahanfk) {
                        managePhp.getData("registrasipasien/get-desa-kelurahan-paging?iddesakelurahan=" + result.objectdesakelurahanfk).then(function (re) {
                            if (re.data[0] != undefined) {
                                var data = {
                                    id: re.data[0].id,
                                    namadesakelurahan: re.data[0].namadesakelurahan,
                                    kodepos: re.data[0].kodepos,
                                    namakecamatan: re.data[0].namakecamatan,
                                    namakotakabupaten: re.data[0].namakotakabupaten,
                                    namapropinsi: re.data[0].namapropinsi,
                                    objectkecamatanfk: re.data[0].objectkecamatanfk,
                                    objectkotakabupatenfk: re.data[0].objectkotakabupatenfk,
                                    objectpropinsifk: re.data[0].objectpropinsifk,
                                    desa: re.data[0].namadesakelurahan,
                                }
                                $scope.listDataKelurahan.add(data)
                                $scope.item.desaKelurahan = data
                            }
                        });
                    }
                    if (result.objectkecamatanfk)
                        $scope.item.kecamatan = { id: result.objectkecamatanfk, namakecamatan: result.namakecamatan }
                    if (result.objectkotakabupatenfk)
                        $scope.item.kotaKabupaten = { id: result.objectkotakabupatenfk, namakotakabupaten: result.namakotakabupaten, }
                    if (result.objectpropinsifk)
                        $scope.item.propinsi = { id: result.objectpropinsifk, namapropinsi: result.namapropinsi }

                    if ($scope.item.kodePos != undefined && $scope.item.kodePos != null) {
                        $scope.findKodePos();
                    } else {

                    }

                }, function (error) {
                    $scope.isRouteLoading = false
                })
            }


            function getPasienOnline() {
                $scope.isRouteLoading = true
                managePhp.getData('registrasipasien/get-pasienonline-bynorec/' + $state.params.noRec)
                    .then(function (e) {
                        $scope.isRouteLoading = false
                        var result = e.data.data
                        if (result.namaibu)
                            $scope.item.namaIbu = result.namaibu;
                        if (result.namaayah)
                            $scope.item.namaAyah = result.namaayah;
                        $scope.item.namaPasien = result.namapasien;
                        // $scope.item.pasien.namaPasien = result.namapasien
                        if (result.tgllahir != null) {
                            $scope.item.tglLahir = moment(result.tgllahir).format('YYYY-MM-DD');
                            $scope.item.jamLahir = moment(result.tgllahir).format('HH:mm:ss');
                        }
                        if (result.tempatlahir)
                            $scope.item.tempatLahir = result.tempatlahir;
                        if (result.objectjeniskelaminfk)
                            $scope.item.jenisKelamin = { id: result.objectjeniskelaminfk, jeniskelamin: result.jeniskelamin };
                        if (result.objectagamafk)
                            $scope.item.agama = { id: result.objectagamafk, agama: result.agama };
                        if (result.objectstatusperkawinanfk)
                            $scope.item.statusPerkawinan = { id: result.objectstatusperkawinanfk, statusperkawinan: result.statusperkawinan };
                        if (result.objectpendidikanfk)
                            $scope.item.pendidikan = { id: result.objectpendidikanfk, pendidikan: result.pendidikan };
                        if (result.objectpekerjaanfk)
                            $scope.item.pekerjaan = { id: result.objectpekerjaanfk, pekerjaan: result.pekerjaan };
                        if (result.noidentitas)
                            $scope.item.noIdentitas = result.noidentitas;
                        if (result.noidentitas)
                            $scope.item.noBpjs = result.nobpjs;
                        if (result.noidentitas)
                            $scope.item.namaSuamiIstri = result.namasuamiistri;
                        if (result.noidentitas)
                            $scope.item.alamatLengkap = result.alamatlengkap;
                        if (result.noidentitas)
                            $scope.item.noTelepon = result.notelepon;
                        if (result.noidentitas)
                            $scope.item.noHp = result.noaditional;

                        if ($scope.item.kodePos != undefined) {
                            $scope.findKodePos();

                        }
                    }, function (error) {
                        $scope.isRouteLoading = false
                    })
            }

            function editPasien() {
                $scope.isRouteLoading = true
                managePhp.getData("registrasipasien/get-bynocm?idPasien=" + $state.params.idPasien).then(function (e) {
                    $scope.isRouteLoading = false
                    var result = e.data.data
                    $scope.item.noCmIbu = result.nocm;
                    $scope.item.namaPasien = result.namapasien;
                    $scope.item.alamatLengkap = result.alamatlengkap
                    $scope.item.tempatLahir = result.tempatlahir;
                    $scope.item.tglLahir = new Date(result.tgllahir)
                    $scope.item.jenisKelamin = { id: result.objectjeniskelaminfk, jeniskelamin: result.jeniskelamin }
                    $scope.item.agama = { id: result.objectagamafk, agama: result.agama }
                    // $scope.item.kebangsaan = { id: $scope.listKebangsaan._data[1].id, name: $scope.listKebangsaan._data[1].name }
                    if (result.kodepos)
                        $scope.item.kodePos = result.kodepos;
                    // $scope.idIbu = result.nocmfk;
                    if (result.namaibu)
                        $scope.item.namaIbu = result.namaibu
                    if (result.namasuamiistri)
                        $scope.item.namaSuamiIstri = result.namasuamiistri
                    if (result.noidentitas)
                        $scope.item.noIdentitas = result.noidentitas
                    if (result.nobpjs)
                        $scope.item.noBpjs = result.nobpjs
                    if (result.noasuransilain)
                        $scope.item.noAsuransiLain = result.noasuransilain
                    if (result.namaayah)
                        $scope.item.namaAyah = result.namaayah;
                    if (result.namakeluarga)
                        $scope.item.namaKeluarga = result.namakeluarga;
                    if (result.notelepon)
                        $scope.item.noTelepon = result.notelepon;
                    if (result.nohp)
                        $scope.item.noHp = result.nohp;
                    if (result.objectstatusperkawinanfk)
                        $scope.item.statusPerkawinan = { id: result.objectstatusperkawinanfk, statusperkawinan: result.statusperkawinan }
                    if (result.objectpendidikanfk)
                        $scope.item.pendidikan = { id: result.objectpendidikanfk, pendidikan: result.pendidikan }
                    if (result.objectpekerjaanfk)
                        $scope.item.pekerjaan = { id: result.objectpekerjaanfk, pekerjaan: result.pekerjaan }
                    if (result.objectdesakelurahanfk) {
                        managePhp.getData("registrasipasien/get-desa-kelurahan-paging?iddesakelurahan=" + result.objectdesakelurahanfk).then(function (re) {
                            if (re.data[0] != undefined) {
                                var data = {
                                    id: re.data[0].id,
                                    namadesakelurahan: re.data[0].namadesakelurahan,
                                    kodepos: re.data[0].kodepos,
                                    namakecamatan: re.data[0].namakecamatan,
                                    namakotakabupaten: re.data[0].namakotakabupaten,
                                    namapropinsi: re.data[0].namapropinsi,
                                    objectkecamatanfk: re.data[0].objectkecamatanfk,
                                    objectkotakabupatenfk: re.data[0].objectkotakabupatenfk,
                                    objectpropinsifk: re.data[0].objectpropinsifk,
                                    desa: re.data[0].namadesakelurahan,
                                }
                                $scope.listDataKelurahan.add(data)
                                $scope.item.desaKelurahan = data
                            }
                        });
                    }
                    if (result.objectkecamatanfk)
                        $scope.item.kecamatan = { id: result.objectkecamatanfk, namakecamatan: result.namakecamatan }
                    if (result.objectkotakabupatenfk)
                        $scope.item.kotaKabupaten = { id: result.objectkotakabupatenfk, namakotakabupaten: result.namakotakabupaten, }
                    if (result.objectpropinsifk)
                        $scope.item.propinsi = { id: result.objectpropinsifk, namapropinsi: result.namapropinsi }

                    if ($scope.item.kodePos != undefined && $scope.item.kodePos != null) {
                        $scope.findKodePos();
                    } else {

                    }

                }, function (error) {
                    $scope.isRouteLoading = false
                })
            }

            function loadCombo() {
                $q.all([
                    managePhp.getData("registrasipasien/get-combo-registrasi"),
                    managePhp.getData("registrasipasien/get-combo-address"),
                ]).then(function (result) {
                    if (result[0].statResponse) {
                        $scope.listDataJenisKelamin = result[0].data.jeniskelamin
                        $scope.listDataPekerjaan = result[0].data.pekerjaan
                        $scope.listDataAgama = result[0].data.agama
                        $scope.listDataPendidikan = result[0].data.pendidikan
                        $scope.listDataStatusPerkawinan = result[0].data.statusperkawinan

                    }
                    if (result[1].statResponse) {
                        $scope.listDataKecamatan = result[1].data.kecamatan
                        $scope.listDataKotaKabupaten = result[1].data.kotakabupaten
                        $scope.listDataPropinsi = result[1].data.propinsi
                        $scope.listKebangsaan = result[1].data.kebangsaan
                        $scope.listNegara = result[1].data.negara
                        $scope.item.kebangsaan = $scope.listKebangsaan[0]

                    }
                })
            }
            modelItemAkuntansi.getDataDummyPHP("registrasipasien/get-desa-kelurahan-paging", true, true, 10).then(function (e) {
                $scope.listDataKelurahan = e;
            });
            $scope.findAddress = function (desa) {
                $scope.item.kecamatan = { id: desa.objectkecamatanfk, namakecamatan: desa.namakecamatan }
                $scope.item.kotaKabupaten = { id: desa.objectkotakabupatenfk, namakotakabupaten: desa.namakotakabupaten }
                $scope.item.propinsi = { id: desa.objectpropinsifk, namapropinsi: desa.namapropinsi }
                $scope.item.kodePos = desa.kodepos
            }



            $scope.$watch('item.kebangsaan', function (e) {
                if (e === undefined) return;
                if (e.name === 'WNI')
                    $scope.item.negara = { id: 0 };
                if (e.name === 'WNA')
                    $scope.item.negara = $scope.item.kebangsaan;
            });



            $scope.findKodePos = function (kdPos) {
                if (!kdPos) return;
                $scope.isBusy = true;
                managePhp.getData('registrasipasienbayi/get-alamat-bykodepos?kodePos=' + kdPos).then(function (res) {
                    if (res.data.data.length > 0) {
                        var data = {
                            id: res.data.data[0].objectdesakelurahanfk,
                            namadesakelurahan: res.data.data[0].namadesakelurahan,
                            kodepos: res.data.data[0].kodepos,
                            namakecamatan: res.data.data[0].namakecamatan,
                            namakotakabupaten: res.data.data[0].namakotakabupaten,
                            namapropinsi: res.data.data[0].namapropinsi,
                            objectkecamatanfk: res.data.data[0].objectkecamatanfk,
                            objectkotakabupatenfk: res.data.data[0].objectkotakabupatenfk,
                            objectpropinsifk: res.data.data[0].objectpropinsifk,
                            desa: res.data.data[0].namadesakelurahan,
                        }
                        $scope.listDataKelurahan.add(data)
                        $scope.item.desaKelurahan = data
                        $scope.item.kecamatan = { id: data.objectkecamatanfk, namakecamatan: data.namakecamatan }
                        $scope.item.kotaKabupaten = { id: data.objectkotakabupatenfk, namakotakabupaten: data.namakotakabupaten }
                        $scope.item.propinsi = { id: data.objectpropinsifk, namapropinsi: data.namapropinsi }


                    }
                    $scope.isBusy = false;
                }, function (error) {
                    $scope.isBusy = false;
                })
            }

            var tempId = 0;
            $scope.cetak = function () {

                var url = configuration.urlPrinting + "registrasi-pelayanan/kartuPasien?id=" + tempId + "&X-AUTH-TOKEN=" + ModelItem.getAuthorize();
                window.open(url);
            }

            $scope.Save = function () {
                if ($scope.item.namaPasien == undefined) {
                    toastr.error('Nama Pasien belum di isi', 'Error')
                    return
                }

                if ($scope.item.tempatLahir == undefined) {
                    toastr.error('Tempat Lahir belum di isi', 'Error')
                    return
                }
                if ($scope.item.tglLahir == undefined) {
                    toastr.error('Tgl Lahir belum di isi', 'Error')
                    return
                }

                if ($scope.item.jenisKelamin == undefined) {
                    toastr.error('Jenis Kelamin belum di isi', 'Error')
                    return
                }
                if ($scope.item.alamatLengkap == undefined) {
                    toastr.error('Alamat belum di isi', 'Error')
                    return
                }
                if ($scope.item.pendidikan == undefined) {
                    toastr.error('Pendidikan belum di isi', 'Error')
                    return
                }

                if ($scope.item.noIdentitas == undefined) {
                    toastr.error('Nik belum di isi', 'Error')
                    return
                }else{
                    let lengthInpt = $scope.item.noIdentitas.length;
                    if(lengthInpt!=16){
                        toastr.error('Nik harus 16 digit angka', 'Error')
                        return
                    }
                }

                var postJson = {
                    'isbayi': $scope.isBayi,
                    'idpasien': $scope.idPasien != undefined ? $scope.idPasien : '',
                    'pasien': {
                        'namaPasien': $scope.item.namaPasien,
                        'noCmIbu': ($scope.isBayi ? $scope.item.noCmIbu : null), //untuk simpan di pasien_m.reportdisplay
                        'noIdentitas': $scope.item.noIdentitas != undefined ? $scope.item.noIdentitas : null,
                        'namaSuamiIstri': $scope.item.namaSuamiIstri != undefined ? $scope.item.namaSuamiIstri : null,
                        'noAsuransiLain': $scope.item.noAsuransiLain != undefined ? $scope.item.noAsuransiLain : null,
                        'noBpjs': $scope.item.noBpjs != undefined ? $scope.item.noBpjs : null,
                        'noHp': $scope.item.noHp != undefined ? $scope.item.noHp : null,
                        'tempatLahir': $scope.item.tempatLahir,
                        'namaKeluarga': $scope.item.namaKeluarga != undefined ? $scope.item.namaKeluarga : null,
                        'tglLahir': moment($scope.item.tglLahir).format('YYYY-MM-DD HH:mm')
                    },
                    'agama': {
                        'id': $scope.item.agama != undefined ? $scope.item.agama.id : null,
                    },
                    'jenisKelamin': {
                        'id': $scope.item.jenisKelamin != undefined ? $scope.item.jenisKelamin.id : null,
                    },
                    'pekerjaan': {
                        'id': $scope.item.pekerjaan != undefined ? $scope.item.pekerjaan.id : null,
                    },
                    'pendidikan': {
                        'id': $scope.item.pendidikan != undefined ? $scope.item.pendidikan.id : null,
                    },
                    'statusPerkawinan': {
                        'id': $scope.item.statusPerkawinan != undefined ? $scope.item.statusPerkawinan.id : 0,
                    },
                    'namaIbu': $scope.item.namaIbu != undefined ? $scope.item.namaIbu : null,
                    'noTelepon': $scope.item.noTelepon != undefined ? $scope.item.noTelepon : null,
                    'noAditional': $scope.item.noAditional != undefined ? $scope.item.noAditional : null,
                    'kebangsaan': {
                        'id': $scope.item.kebangsaan != undefined ? $scope.item.kebangsaan.id : null,
                    },
                    'negara': {
                        'id': $scope.item.negara != undefined ? $scope.item.negara.id : null,
                    },
                    'namaAyah': $scope.item.namaAyah != undefined ? $scope.item.namaAyah : null,
                    'alamatLengkap': $scope.item.alamatLengkap,
                    'desaKelurahan': {
                        'id': $scope.item.desaKelurahan != undefined ? $scope.item.desaKelurahan.id : null,
                        'namaDesaKelurahan': $scope.item.desaKelurahan != undefined ? $scope.item.desaKelurahan.namadesakelurahan : null,
                    },
                    'kecamatan': {
                        'id': $scope.item.kecamatan != undefined ? $scope.item.kecamatan.id : null,
                        'namaKecamatan': $scope.item.kecamatan != undefined ? $scope.item.kecamatan.namakecamatan : null,
                    },
                    'kotaKabupaten': {
                        'id': $scope.item.kotaKabupaten != undefined ? $scope.item.kotaKabupaten.id : null,
                        'namaKotaKabupaten': $scope.item.kotaKabupaten != undefined ? $scope.item.kotaKabupaten.namakotakabupaten : null,
                    },
                    'propinsi': {
                        'id': $scope.item.propinsi != undefined ? $scope.item.propinsi.id : null,
                    },
                    'kodePos': $scope.item.kodePos != undefined ? $scope.item.kodePos : null,
                }
                managePhp.postData(postJson, 'pasien/save-pasien-fix')
                    .then(
                        function (res) {
                            tempId = res.data.data.id;

                            $scope.isNext = true;
                            $scope.noCm = res.data.data.nocm;
                            $scope.noRec = res.data.data.id;
                            // toastr.info($scope.noCm, 'No RM Pasien')
                            cacheHelper.set('CacheRegisBayi', undefined);
                        },
                        function (err) { })

            }


            $scope.Next = function () {
                var param = $scope.noCm;
                var cacheSet = undefined;
                var cacheSetss = undefined;
                var cache = {
                    0: 'Online',
                    1: '',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                };
                cacheHelper.set('CacheRegisOnline', cacheSetss);
                cacheHelper.set('CacheRegisOnlineBaru', cache);
                cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                // $state.go('registrasiPelayanan', {
                $state.go('RegistrasiPelayananRev', {
                    noCm: param
                });

            }
            // $(document).ready(function() {
            // $("#comboBoxMulti").kendoMultiColumnComboBox({
            //     noDataTemplate: $("#noDataTemplate").html(),
            //     dataTextField: "ContactName",
            //     dataValueField: "CustomerID",
            //     filter: "contains",
            //     dataSource: {
            //         transport: {
            //             read: {
            //                 dataType: "jsonp",
            //                 url: "https://demos.telerik.com/kendo-ui/service/Customers"
            //             }
            //         }
            //     }
            // });
            // });

        }
    ]);
});