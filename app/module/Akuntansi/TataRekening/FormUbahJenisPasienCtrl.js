define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('FormUbahJenisPasienCtrl', ['$mdDialog', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening', 'MnKeu', 'DateHelper', 'ModelItem',
        function($mdDialog, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening, mnKeu, dateHelper, ModelItem) {
            //Negara, Propinsi, KotaKabupaten, Kecamatan, Kelurahan, Kode Pos, RT/RW
            $scope.dataParams = JSON.parse($state.params.dataPasien);
            $scope.dataPegawai = JSON.parse(window.localStorage.getItem('pegawai'));

            $scope.now = new Date();
            $scope.item = {};
            $scope.item.pegawaiId = $scope.dataPegawai.id;
            $scope.DataPasienId;
            $scope.dataNoCm;
            $scope.dataNegara = true;

            mnKeu.getUrlData("penanggung-jawab-pasien/data-surat-pernyataan?noRegistrasi=" + JSON.parse($scope.dataParams.noRegistrasi)).then(function(dat) {
                $scope.item = dat.data.data;
                debugger;
                $scope.item.pasien.noDokumen = JSON.parse($scope.dataParams.noRegistrasi);
                
                if (dat.data.data.alamat.desaKelurahan == "NULL" && dat.data.data.alamat.kecamatan == "NULL" && dat.data.data.alamat.kotaKabupaten == "NULL") {
                	$scope.item.desaKelurahanPasien = "";
                	$scope.item.kecamatanPasien = "";
                	$scope.item.kotaKabupatenPasien = "";
                }
                else {
                	$scope.item.desaKelurahanPasien = dat.data.data.alamat.desaKelurahan;
                	$scope.item.kecamatanPasien = dat.data.data.alamat.kecamatan;
                	$scope.item.kotaKabupatenPasien = dat.data.data.alamat.kotaKabupaten;
                }
                var dataNegara = {
                    "id": 0,
                    "kdNegara": 0,
                    "namaNegara": "Indonesia",
                    "qNegara": 0
                };
                $scope.item.negara = dataNegara;
                if (dat.data.data.strukPelayananPenjamin == undefined) {
                    $scope.item.jumlahBiaya = "";
                    $scope.item.sisaYangBelumDibayar = "";
                    $scope.item.telahDibayar = "";
                    $scope.item.terbilang = "";
                    var alertDialog = modelItemAkuntansi.showAlertDialog("Pasien Ini Tidak Memiliki Piutang", "", "Ok", "");
                    $mdDialog.show(alertDialog).then(function() {

                    });
                    $state.go('DaftarPasienPulang', {});
                } else {
                	$scope.item.jumlahBiaya = "Rp. " + parseFloat(dat.data.data.strukPelayananPenjamin.jumlahBiaya).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                	$scope.item.sisaYangBelumDibayar = "Rp. " + parseFloat(dat.data.data.strukPelayananPenjamin.sisaYangBelumDibayar).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                	$scope.item.telahDibayar = "Rp. " + parseFloat(dat.data.data.strukPelayananPenjamin.telahDibayar).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                	$scope.item.terbilang = formatKata(dat.data.data.strukPelayananPenjamin.sisaYangBelumDibayar) + " " +  "Rupiah";
                }
                
            });

            var buttonDisabled = false;

            $q.all([
                    modelItemAkuntansi.getDataTableTransaksi("tatarekening/data-pasien/" + $scope.dataParams.noRegistrasi),
                    modelItemAkuntansi.getDataTableTransaksi("tatarekening/list-kelompok-pasienperjanjian")
                ])
                .then(function(data) {

                    if (data[0].statResponse) {
                        //$scope.item = data[0];
                        //$scope.item.noRegistrasi
                        $scope.dataNoCm = data[0].noCm;
                    }

                    if (data[1].statResponse) {
                        $scope.listKelompokPasien = data[1];
                    }

                });

            function formatKata(value) {
                var angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
                if (value < 12) {
                    var kata = angka[value];
                } else if (value < 20) {
                    var kata = angka[value - 10] + " " + "Belas";
                } else if (value < 100) {
                    var pertama = value / 10;
                    var kedua = parseInt(String(pertama).substr(0, 1))
                    var ketiga = value % 10;
                    var kata = angka[pertama] + " " + "Puluh" + angka[ketiga];
                } else if (value < 200) {
                    var kata = 'Seratus' + ' ' + formatKata(value - 100);
                } else if (value < 1000) {
                    var pertama = value / 100;
                    var kedua = parseInt(String(pertama).substr(0.1));
                    var ketiga = value % 100;
                    var kata = formatKata(kedua) + " " + "Ratus" + formatKata(ketiga);
                } else if (value < 2000) {
                    var kata = "Seribu" + formatKata(value - 1000);
                } else if (value < 10000) {
                    var pertama = value / 1000;
                    var kedua = parseInt(String(pertama).substr(0.1));
                    var ketiga = value % 1000;
                    var kata = formatKata(kedua) + " " + "Ribu" + formatKata(ketiga);
                } else if (value < 100000) {
                    var pertama = value / 100;
                    var kedua = parseInt(String(pertama).substr(0.2));
                    var ketiga = value % 1000;
                    var kata = formatKata(kedua) + " " + "Ribu" + formatKata(ketiga);
                } else if (value < 1000000) {
                    var pertama = value / 1000;
                    var kedua = parseInt(String(pertama).substr(0.3));
                    var ketiga = value % 1000;
                    var kata = formatKata(kedua) + " " + "Ribu" + formatKata(ketiga);
                } else if (value < 100000000) {
                    var pertama = value / 1000000;
                    var kedua = parseInt(String(pertama).substr(0.4));
                    var ketiga = value % 1000000;
                    var kata = formatKata(kedua) + " " + "Juta" + formatKata(ketiga);
                } else if (value < 10000000000) {
                    var pertama = value / 1000000;
                    var kedua = parseInt(String(pertama).substr(0.4));
                    var ketiga = value % 1000000;
                    var kata = formatKata(kedua) + " " + "Juta" + formatKata(ketiga);
                } else if (value < 100000000000) {
                    var pertama = value / 1000000000;
                    var kedua = parseInt(String(pertama).substr(0.1));
                    var ketiga = value % 1000000000;
                    var kata = formatKata(kedua) + " " + "Milyar" + formatKata(ketiga);
                } else {}
                var angkaKata = kata.split('');
                var list = [];
                for (var i = 0; i < angkaKata.length; i++) {
                    if (angkaKata[i] != "") {
                        list.push(angkaKata[i]);
                    }
                }
                return list.join('');
                /*var kataAngka = list + "Rupiah";
                return kataAngka;*/
            }

            function showButton() {
                $scope.showBtnKembali = true;
                $scope.showBtnSimpan = true;
                $scope.showBtnCetak = true;
            }
            showButton();
            mnKeu.getUrlData("service/list-generic/?view=JenisAlamat&select=id,jenisAlamat").then(function(dat) {
                $scope.listJenisAlamat = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=HubunganKeluarga&select=id,kdHubunganKeluarga,hubunganKeluarga,qHubunganKeluarga").then(function(dat) {
                $scope.listDataHubunganKeluarga = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=JenisKelamin&select=id,jenisKelamin,kdJenisKelamin,qJenisKelamin").then(function(dat) {
                $scope.listJenisKelamin = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=JenisPengantarPasien&select=id,jenisPengantar,kdJenisPengantar,qJenisPengantar").then(function(dat) {
                $scope.listJenisPengantarPasien = dat.data;
            });

            /*var arrListKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
            $scope.listDataKelurahan = ModelItem.kendoSource("DesaKelurahan", arrListKelurahan, true);*/
            var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
            $scope.listDataKelurahan = ModelItem
                .kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);
            $scope.listDataKelurahanRelasi = ModelItem
            	.kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);

            var arrListKecamatan = ['id', 'namaExternal', 'kotaKabupaten'];
            ModelItem.getKendoSource("Kecamatan", arrListKecamatan, true).then(function(data) {
                $scope.listDataKecamatan = data;
                $scope.listDataKecamatanRelasi = data;
            });


            var arrListKotaKabupaten = ['id', 'namaExternal', 'propinsi'];
            ModelItem.getKendoSource("KotaKabupaten", arrListKotaKabupaten, true).then(function(data) {
                $scope.listDataKotaKabupaten = data;
                $scope.listDataKotaKabupatenRelasi = data;
            });
            var arrListPropinsi = ['id', 'kdPropinsi', 'qPropinsi', 'namaPropinsi'];
            ModelItem.getKendoSource("Propinsi", arrListPropinsi, true).then(function(data) {
                $scope.listDataPropinsi = data;
                $scope.listDataPropinsiRelasi = data;
            });
            var arrListNegara = ['id', 'kdNegara', 'namaNegara', 'qNegara'];
            ModelItem.getKendoSource("Negara", arrListNegara, true).then(function(data) {
                $scope.listDataNegara = data;
            });
            $scope.dataVOloaded = true;
            $scope.$watch('item.desaKelurahan', function(e) {
                if (e === undefined) return;
                $scope.item.kodePos = e.kodePos;
                ModelItem.getDataDummyGeneric("Kecamatan", true, true, undefined, {
                    filter: {
                        field: e.kecamatan ? "kdKecamatan" : "id",
                        operator: "equal",
                        value: e.kecamatan ? e.kecamatan.kdKecamatan : e.kecamatanId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kecamatan = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                });
            });
            $scope.$watch('item.desaKelurahanRelasi', function(e) {
                if (e === undefined) return;
                $scope.item.kodePos = e.kodePos;
                ModelItem.getDataDummyGeneric("Kecamatan", true, true, undefined, {
                    filter: {
                        field: e.kecamatan ? "kdKecamatan" : "id",
                        operator: "equal",
                        value: e.kecamatan ? e.kecamatan.kdKecamatan : e.kecamatanId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kecamatanRelasi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                });
            });
            $scope.findKodePos = function() {
                $scope.isBusy = true;
                ModelItem.getDataDummyGeneric("DesaKelurahan", true, true, undefined, {
                    filter: {
                        field: "kodePos",
                        operator: "equal",
                        value: $scope.item.kodePos
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.desaKelurahan = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                });
            };
            $scope.findKodePosRelasi = function() {
                $scope.isBusy = true;
                ModelItem.getDataDummyGeneric("DesaKelurahan", true, true, undefined, {
                    filter: {
                        field: "kodePos",
                        operator: "equal",
                        value: $scope.item.kodePosRelasi
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.desaKelurahanRelasi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                });
            };
            $scope.$watch('item.kecamatan', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                    filter: {
                        field: e.kotaKabupaten ? "kdKotaKabupaten" : "id",
                        operator: "equal",
                        value: e.propinsi ? e.kotaKabupaten.kdKotaKabupaten : e.kotaKabupatenId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kotaKabupaten = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.apply;
                        }
                    });
                });
            });
            $scope.$watch('item.kecamatanRelasi', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                    filter: {
                        field: e.kotaKabupaten ? "kdKotaKabupaten" : "id",
                        operator: "equal",
                        value: e.propinsi ? e.kotaKabupaten.kdKotaKabupaten : e.kotaKabupatenId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kotaKabupatenRelasi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.apply;
                        }
                    });
                });
            });
            $scope.$watch('item.kotaKabupaten', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("Propinsi", true, true, undefined, {
                    filter: {
                        field: e.propinsi ? "kdPropinsi" : "id",
                        operator: "equal",
                        value: e.propinsi ? e.propinsi.kdPropinsi : e.propinsiId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.propinsi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });
            $scope.$watch('item.kotaKabupatenRelasi', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("Propinsi", true, true, undefined, {
                    filter: {
                        field: e.propinsi ? "kdPropinsi" : "id",
                        operator: "equal",
                        value: e.propinsi ? e.propinsi.kdPropinsi : e.propinsiId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.propinsiRelasi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });

            mnKeu.getUrlData("service/list-generic/?view=Propinsi&select=id,kdPropinsi,namaPropinsi,qPropinsi").then(function(dat) {
                $scope.listPropinsi = dat.data;

            });
            $scope.dataPropinsi = true;
            $scope.getPropinsi = function() {
                $scope.dataPropinsiId = $scope.item.propinsiFilter.id;

                $scope.listKotaKabupaten = [];
                mnKeu.getUrlData("service/list-generic/?view=KotaKabupaten&select=*&criteria=propinsiId&values=" + $scope.dataPropinsiId).then(function(dat) {
                    $scope.listKotaKabupaten = dat.data;
                    $scope.dataPropinsi = false;
                });

            };
            $scope.getKotaKabupaten = function(data) {
            	$scope.dataKotaKabupatenId = data.id;
            	$scope.listDataKotaKabupaten = [];
            	mnKeu.getUrlData("service/list-generic/?view=KotaKabupaten&select=*&criteria=propinsiId&values=" + $scope.dataKotaKabupatenId).then(function(dat) {
            		$scope.listDataKotaKabupaten = dat.data;
            	});
            	$scope.dataSource = new kendo.data.DataSource({
            		data: $scope.listDataKotaKabupaten
            	});
            	var comboKabupaten = $('#comboKabupaten').data('kendoComboBox');
            	comboKabupaten.setDataSource($scope.dataSource);
            	comboKabupaten.refresh();
            };
            $scope.getKotaKabupatenRelasi = function(data) {
            	$scope.dataKotaKabupatenId = data.id;
            	$scope.listDataKotaKabupatenRelasi = [];
            	mnKeu.getUrlData("service/list-generic/?view=KotaKabupaten&select=*&criteria=propinsiId&values=" + $scope.dataKotaKabupatenId).then(function(dat) {
            		$scope.listDataKotaKabupatenRelasi = dat.data;
            	});
            	$scope.dataSource = new kendo.data.DataSource({
            		data: $scope.listDataKotaKabupatenRelasi
            	});
            	var comboKabupatenRelasi = $('#comboKabupatenRelasi').data('kendoComboBox');
            	comboKabupatenRelasi.setDataSource($scope.dataSource);
            	comboKabupatenRelasi.refresh();
            };
            $scope.getKecamatan = function(data) {
            	$scope.kecamatanId = data.id;
            	$scope.listDataKecamatan = [];
            	mnKeu.getUrlData("service/list-generic/?view=Kecamatan&select=*&criteria=kotaKabupatenId&values=" + $scope.kecamatanId).then(function(dat) {
            		$scope.listDataKecamatan = dat.data;
            	});
            	$scope.dataSource = new kendo.data.DataSource({
            		data: $scope.listDataKecamatan
            	});
            	var comboKecamatan = $('#comboKecamatan').data('kendoComboBox');
            	comboKecamatan.setDataSource($scope.dataSource);
            	comboKecamatan.refresh();
            };
            $scope.getKecamatanRelasi = function(data) {
            	$scope.kecamatanId = data.id;
            	$scope.listDataKecamatanRelasi = [];
            	mnKeu.getUrlData("service/list-generic/?view=Kecamatan&select=*&criteria=kotaKabupatenId&values=" + $scope.kecamatanId).then(function(dat) {
            		$scope.listDataKecamatanRelasi = dat.data;
            	});
            	$scope.dataSource = new kendo.data.DataSource({
            		data: $scope.listDataKecamatanRelasi
            	});
            	var comboKecamatanRelasi = $('#comboKecamatanRelasi').data('kendoComboBox');
            	comboKecamatanRelasi.setDataSource($scope.dataSource);
            	comboKecamatanRelasi.refresh(); 
            };
            $scope.getKelurahan = function(data) {
            	$scope.kelurahanId = data.id;
            	
            	$scope.listDataKelurahan = [];
            	mnKeu.getUrlData("service/list-generic/?view=DesaKelurahan&select=*&criteria=kecamatanId&values=" + $scope.kelurahanId).then(function(dat) {
            		$scope.listDataKelurahan = dat.data;
            	});
            	$scope.dataSource = new kendo.data.DataSource({
            		data: $scope.listDataKelurahan
            	});
            	var comboKelurahan = $('#comboKelurahan').data('kendoComboBox');
            	comboKelurahan.setDataSource($scope.dataSource);
            	comboKelurahan.refresh();	
            };
            $scope.getKelurahanRelasi = function(data) {
            	$scope.kelurahanId = data.id;
            	$scope.listDataKelurahanRelasi = [];
            	mnKeu.getUrlData("service/list-generic/?view=DesaKelurahan&select=*&criteria=kecamatanId&values=" + $scope.kelurahanId).then(function(dat) {
            		$scope.listDataKelurahanRelasi = dat.data;
            		$scope.item.kodePosRelasi = dat.data.kodePos;

            	});
            	$scope.dataSource = new kendo.data.DataSource({
            		data: $scope.listDataKelurahanRelasi
            	});
            	var comboKelurahanRelasi = $('#comboKelurahanRelasi').data('kendoComboBox');
            	comboKelurahanRelasi.setDataSource($scope.dataSource);
            	comboKelurahanRelasi.refresh();
            };
            $scope.getKodePosRelasi = function(data) {
            	$scope.item.kodePosRelasi = data.kodePos;
            };
            $scope.getKodePos = function(data) {
            	$scope.item.kodePos = data.kodePos;
            };
            $scope.Cetak = function() {
                if (!buttonDisabled) {
                    var alertDialog = modelItemAkuntansi.showAlertDialog("Informasi",
                        "Maaf, fungsi ini masih dalam tahap pengembangan", "Ok");

                    $mdDialog.show(alertDialog).then(function() {

                    });
                }
            }

            $scope.Save = function() {
            	var listRawRequired = [
                    "item.desaKelurahan|ng-model|desaKelurahan",
                    "item.alamatLengkap|ng-model|alamatLengkap",
                    "item.namaLengkap|ng-model|namaLengkap",
                    "item.noKtp|ng-model|noKtp",
                    "item.jenisKelamin|ng-model|jenisKelamin",
                    "item.jenisPengantarPasien|ng-model|jenisPengantar",
                    "item.tempatLahir|ng-model|tempatLahir",
                    "item.jenisAlamat|ng-model|jenisAlamat",
                    "item.rtrw|ng-model|rtrw",
                    "item.kecamatan|ng-model|kecamatan",
                    "item.kotaKabupaten|ng-model|kotaKabupaten",
                    "item.propinsi|ng-model|propinsi",
                    "item.negara|ng-model|negara",
                    "item.nomorTeleponRumah|ng-model|nomorTeleponRumah",
                    "item.nomorHp|ng-model|nomorHp",
                    "item.hubunganKeluarga|ng-model|hubunganKeluarga",
                    "item.namaLengkapPasien|ng-model|namaLengkapPasien",
                    "item.tempatLahirPasien|ng-model|tempatLahirPasien",
                    "item.tanggalLahirPasien|ng-model|tanggalLahirPasien",
                    "item.jenisKelaminPasien|ng-model|jenisKelaminPasien",
                    "item.jenisPengantarPasienRelasi|ng-model|jenisPengantarPasienRelasi",
                    "item.jenisAlamatRelasi|ng-model|jenisAlamatRelasi",
                    "item.alamatLengkapRelasi|ng-model|alamatLengkapRelasi",
                    "item.desaKelurahanRelasi|ng-model|desaKelurahanRelasi",
                    "item.rtrwrelasi|ng-model|rtrwrelasi",
                    "item.kecamatanRelasi|ng-model|kecamatanRelasi",
                    "item.kotaKabupatenRelasi|ng-model|kotaKabupatenRelasi",
                    "item.propinsiRelasi|ng-model|propinsiRelasi",
                    "item.nomorTeleponRumahRelasi|ng-model|nomorTeleponRumahRelasi",
                    "item.nomorHpRelasi|ng-model|nomorHpRelasi",
                    "item.hubunganKeluargaRelasi|ng-model|hubunganKeluargaRelasi",
                    "item.tglPernyataan|ng-model|tglPernyataan"
                ];
				var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
                
                if(isValid.status){
                	simpan();
                }else{
                	var confirm = $mdDialog.confirm()
                          .title('Peringatan!')
                          .textContent('Mohon Data Diisi Dengan Lengkap')
                          .ariaLabel('Lucky day')
                          .ok('Ok')

                        $mdDialog.show(confirm).then(function() {
                          
                        });
	                }
	                	
	        	}
			function simpan(){            	
                var data = {
                    "listPenanggungJawabPasien": [{
                        "pasien": {
                            "noCm": $scope.dataNoCm
                        },
                        "pasienDaftar": {
                            "noRegistrasi": $scope.dataParams.noRegistrasi
                        },
                        "namaLengkap": $scope.item.namaLengkap,
                        "noIdentitas": $scope.item.noKtp,
                        "tempatLahir": $scope.item.tempatLahir,
                        "tglLahir": dateHelper.formatDate($scope.item.tanggalLahir, "YYYY-MM-DD"),
                        "jenisKelamin": $scope.item.jenisKelamin,
                        "jenisPengantarPasien": $scope.item.jenisPengantarPasien,
                        "alamatLengkap": {
                            "jenisAlamat": $scope.item.jenisAlamat,
                            "alamatLengkap": $scope.item.alamatLengkap,
                            "namaDesaKelurahan": $scope.item.desaKelurahan.namaDesaKelurahan,
                            "rtrw": $scope.item.rtrw,
                            "namaKecamatan": $scope.item.kecamatan.namaExternal,
                            "namaKotaKabupaten": $scope.item.kotaKabupaten.namaExternal,
                            "propinsi": $scope.item.propinsi,
                            "negara": $scope.item.negara,
                            "fixedPhone1": $scope.item.nomorTeleponRumah,
                            "fixedPhone2": $scope.item.nomorHp,
                            "hubunganKeluarga": $scope.item.hubunganKeluarga
                        },
                        "pegawai": {
                            "id": $scope.dataPegawai.id
                        },
                        "keteranganLainnya": "Penanggungjawab",
                        "tglPernyataan": dateHelper.formatDate($scope.item.tglPernyataan, "YYYY-MM-DD")
                    }, {
                        "pasien": {
                            "noCm": $scope.dataNoCm
                        },
                        "pasienDaftar": {
                            "noRegistrasi": $scope.dataParams.noRegistrasi
                        },
                        "namaLengkap": $scope.item.namaLengkapPasien,
                        "tempatLahir": $scope.item.tempatLahirPasien,
                        "tglLahir": dateHelper.formatDate($scope.item.tanggalLahirPasien, "YYYY-MM-DD"),
                        "jenisKelamin": $scope.item.jenisKelaminPasien,
                        "jenisPengantarPasien": $scope.item.jenisPengantarPasienRelasi,
                        "alamatLengkap": {
                            "jenisAlamat": $scope.item.jenisAlamatRelasi,
                            "alamatLengkap": $scope.item.alamatLengkapRelasi,
                            "namaDesaKelurahan": $scope.item.desaKelurahanRelasi.namaDesaKelurahan,
                            "rtrw": $scope.item.rtrwrelasi,
                            "namaKecamatan": $scope.item.kecamatanRelasi.namaExternal,
                            "namaKotaKabupaten": $scope.item.kotaKabupatenRelasi.namaExternal,
                            "propinsi": $scope.item.propinsiRelasi,
                            "negara": $scope.item.negara,
                            "fixedPhone1": $scope.item.nomorTeleponRumahRelasi,
                            "fixedPhone2": $scope.item.nomorHpRelasi,
                            "hubunganKeluarga": $scope.item.hubunganKeluargaRelasi
                        },
                        "pegawai": {
                            "id": $scope.dataPegawai.id
                        },
                        "keteranganLainnya": "Relasi",
                        "tglPernyataan": dateHelper.formatDate($scope.item.tglPernyataan, "YYYY-MM-DD")
                    }]
                };
                
                mnKeu.postData(data, "penanggung-jawab-pasien/save-penanggung-jawab-pasien").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    $scope.item = "";
                });



            }

            $scope.Back = function() {
                if (!buttonDisabled) {
                    $state.go('DaftarPasienPulang', {});
                }
            }
        }
    ]);
});
