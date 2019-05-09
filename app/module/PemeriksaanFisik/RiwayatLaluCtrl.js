define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatLaluCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien) {

            //$rootScope.listActive -> data listMenu

            $scope.title = "Tanda Vital";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.formId = 371;
            $scope.noRecPap = window.localStorage.getItem('noRecPap'); // noRecPap
            $scope.item = {};

            // controller master data PAP
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    switch (frmMaster.id) {
                        case 418:
                            // form Riwayat Penyakit Terdahulu Dan Selama Hamil 
                            $scope.formRiwayatPenyakit = frmMaster;
                            if (frmMaster.value === "419")
                                $scope.adaMasalah = true;
                            break;
                        case 421:
                            // form Golongan Darah
                            $scope.formGolDarah = frmMaster;
                            break;
                        case 432:
                            // form Lamanya Persalinan
                            $scope.formLamaPersalinan = frmMaster;
                            break;

                    }
                })
            })
            $scope.numberPicker = {
                format: "{0:n0}"
            }
            $scope.checkRadio=function(data, stat){
                debugger;
                if(stat.id === 419){
                    $scope.adaMasalah = true; 
                    data.value = stat.id
                }else{
                    $scope.adaMasalah = false; 
                    data.value = stat.id
                }
                // console.log('Pilihan anda adalah : ' + stat.nama)
            }
            $scope.listJenisKelamin = [
                {"id": 1, "name": "Laki-laki"},
                {"id": 2, "name": "Perempuan"},
                {"id": 3, "name": "Ambiguous"}
            ]
            $scope.listKeadaanBayi = [
                {"id": 1, "name": "Anak Hidup"},
                {"id": 2, "name": "+ 1 Hari"},
                {"id": 3, "name": "+ 28 Hari"},
                {"id": 4, "name": "Lahir Mati"},
                {"id": 5, "name": "Abortus"},
                {"id": 6, "name": "Lain-lain"},
            ]
            $scope.listKomplikasi = [
                {"id": 1, "name": "Toxaemia"},
                {"id": 2, "name": "Eklampsia"},
                {"id": 3, "name": "CPD"},
                {"id": 4, "name": "Perdarahan"},
                {"id": 5, "name": "Lain-lain"},
            ]
            $scope.listPenyakit = [
                {"id": 1, "name": "Diabetes"},
                {"id": 2, "name": "Jantung"},
                {"id": 3, "name": "Hipertensi"},
                {"id": 4, "name": "Lain-lain"},
            ]
            $scope.listJenisPersalinan = [
                {"id": 1, "name": "Spontan"},
                {"id": 2, "name": "Sungsang"},
                {"id": 3, "name": "Forceps"},
                {"id": 4, "name": "Vakum Ext"},
                {"id": 5, "name": "Lain-lain"},
            ]
            $scope.dataKelahiranLalu = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
                schema: {
                  model: {
                    fields: {
                    //   no: { type: "number", editable: false},
                      tglKelahiran: { type: "date"},
                      sex: { defaultValue: { id: 0, name: "--Belum dipilih"}},
                      berat: { type: "number"},
                      bayi: { defaultValue: { id: 0, name: "--Belum dipilih"}},
                      komplikasiKehamilan: { defaultValue: { id: 0, name: "--Belum dipilih"}},
                      penyakitKehamilan: { defaultValue: { id: 0, name: "--Belum dipilih"}},
                      jenisPersalinan: { defaultValue: { id: 0, name: "--Belum dipilih"}},
                      lain: { type: "string"},
                    }
                  }
                },
                // change: function(e){
                //     console.log("change: " + e.action);
	            //     if (e.action === "add") {
                //         e.items[0].no = $scope.dataKelahiranLalu.data.length;
                //         debugger;
                //     }
                // }
            });
            $scope.optionsKelahiranLalu = {
                navigatable: true,
                dataSource: $scope.dataKelahiranLalu,
                pageable: true,
                height: 350,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [
                    // {"field": "no", "title": "No", "width": 36}, 
                    {"field": "tglKelahiran","title": "Tanggal Tahun Kelahiran", "width": 200, "type": "date", "format": "{0:dd/MM/yyyy}", "editor": dateTimeEditor},
                    {"field": "sex", "title": "Sex", "editor": categoryDropDownEditor_sex, "template": "#=sex.name#"}, 
                    {"field": "berat", "title": "Berat Badan Lahir", "editor": categoryDropDownEditor_berat}, 
                    {"field": "bayi", "title": "Keadaan Bayi", "editor": categoryDropDownEditor_bayi, "template": "#=bayi.name#"}, 
                    {"field": "komplikasiKehamilan", "title": "Komplikasi Kehamilan/Kelahiran", "editor": categoryDropDownEditor_komplikasi, "template": "#=komplikasiKehamilan.name#"}, 
                    {"field": "penyakitKehamilan", "title": "Penyakit Waktu Hamil", "editor": categoryDropDownEditor_penyakit, "template": "#=penyakitKehamilan.name#"}, 
                    {"field": "jenisPersalinan", "title": "Jenis Persalinan", "editor": categoryDropDownEditor_jenisPersalinan, "template": "#=jenisPersalinan.name#"},
                    {"field": "lain", "title": "Lain-lain"}, 
                    {"command": [{name: "edit",text: "Edit"},{name: "destroy",text: "Hapus"}], "title": " ","width": 160}
                ],
                editable: true
            };
            function categoryDropDownEditor_jenisPersalinan(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listJenisPersalinan
                    });
            }
            function categoryDropDownEditor_penyakit(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listPenyakit
                    });
            }
            function categoryDropDownEditor_komplikasi(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listKomplikasi
                    });
            }
            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                        .appendTo(container)
                        .kendoDateTimePicker({});
            }
            function categoryDropDownEditor_sex(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listJenisKelamin
                    });
            }
            function categoryDropDownEditor_bayi(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listKeadaanBayi
                    });
            }
            function categoryDropDownEditor_berat(container, options) {
                $('<input kendo-numeric-text-box required name="' + options.field + '"/>')
                    .appendTo(container);
            }
            $scope.Save = function(){
                var dataForm = [];
                if ($scope.formRiwayatPenyakit.value === 419) {
                    debugger;
                    var tmpData = {
                        "pengkajianAwal": {
                            "id": $scope.formRiwayatPenyakit.id
                        },
                        "nilai": $scope.formRiwayatPenyakit.value.toString()
                    }
                    dataForm.push(tmpData);

                    $scope.formRiwayatPenyakit.detail.forEach(function(data){
                        if (data.value !== null) {
                            var tmpData = {
                                "pengkajianAwal": {
                                    "id": data.id
                                },
                                "nilai": data.value
                            }
                            dataForm.push(tmpData);
                        }
                    })                    
                } else {
                    debugger;
                    var tmpData = {
                        "pengkajianAwal": {
                            "id": $scope.formRiwayatPenyakit.id
                        },
                        "nilai": $scope.formRiwayatPenyakit.value.toString()
                    }
                    dataForm.push(tmpData);
                }
                $scope.formGolDarah.detail.forEach(function(data){
                    if (data.value !== null) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);

                        if (data.detail) {
                            data.detail.forEach(function(subItems){
                                if (subItems.value !== null) {
                                    var tmpData = {
                                        "pengkajianAwal": {
                                            "id": subItems.id
                                        },
                                        "nilai": subItems.value
                                    }
                                    dataForm.push(tmpData);
                                }
                            })
                        }
                    }
                })
                $scope.formLamaPersalinan.detail.forEach(function(data){
                    if (data.value) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value
                        }
                        dataForm.push(tmpData);
                    }
                })
                // console.log(JSON.stringify(dataForm));

                if ($scope.noRecTransaksi) {
                	$scope.tempData = {   
                		"noRec": $scope.noRecTransaksi,
                		"pengkajianAwalBaru":{  
                			"noRec": $scope.noRecPap
                		},
                		"detailPengkajianAwal": dataForm
                	}
                	managePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
                		// $scope.Next();
                	})
                } else {
                	$scope.tempData = {  
                		"pengkajianAwalBaru":{  
                			"noRec": $scope.noRecPap
                		},
                		"detailPengkajianAwal": dataForm
                	}
                	managePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
                		// $scope.Next();
                	})
                }
            }
        }

    ]);
});