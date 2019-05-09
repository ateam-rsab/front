define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ReadPreventiveMaintenanceCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper', '$state', 'IPSRSService',
        function($rootScope, $scope, ModelItem, DateHelper, $state, IPSRSService) {
            $scope.dataVOloaded = true;
            $scope.item = {};
            IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
                $scope.dataMasterTeknisi = dat.data;
            });
            var init = function () {
                IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
                    $scope.ruangan = dat.data.namaRuangan;
                    $scope.idRuangan = dat.data.id;
                    if ($scope.idRuangan == 229) {
                        $scope.verif = false;
                        $scope.admin = true;
                        $scope.user = false
                    } else {
                        $scope.verif = true;
                        $scope.user = true;
                        $scope.admin = false;
                    }
                }); 
            }
            init();
            IPSRSService.getItem("psrsPermintaanPerbaikan/pre-add-pemeliharaan?noRec="+$state.params.noRec).then(function(dat){
                $scope.mainData = dat.data;
                $scope.item.namaProduk = $scope.mainData.detail.namaProduk;
                $scope.item.merkProduk = $scope.mainData.detail.merkProduk;
                $scope.item.typeProduk = $scope.mainData.detail.typeProduk;
                $scope.item.noRegisterAset = $scope.mainData.detail.noRegisterAset;
                $scope.item.noSeri = $scope.mainData.detail.noSeri;
                $scope.item.catatan = $scope.mainData.header.keteranganLainnya;
                var tanggalOrder = new Date($scope.mainData.header.tanggalOrder);
                $scope.item.jadwalPemeliharaan = DateHelper.getTanggalFormatted(tanggalOrder);
                $scope.item.kebutuhanAlatCatuTegangan = $scope.mainData.parameter.kebutuhanAlatCatuTegangan;
                $scope.item.terukurCatuTegangan = $scope.mainData.parameter.terukurCatuTegangan;
                $scope.item.kebutuhanAlatTemperaturRuangan = $scope.mainData.parameter.kebutuhanAlatTemperaturRuangan;
                $scope.item.terukurTemperaturRuangan = $scope.mainData.parameter.terukurTemperaturRuangan;
                $scope.item.kebutuhanAlatKelembabanRuangan = $scope.mainData.parameter.kebutuhanAlatKelembabanRuangan;
                $scope.item.terukurKelembabanRuangan = $scope.mainData.parameter.terukurKelembabanRuangan;
                $scope.teknisi=[];
                $scope.displayTeknisi = [];
                $scope.dataTeknisi = $scope.mainData.teknisi;
                for(var i=0; i<$scope.dataTeknisi.length;i++){
                    var data= {
                        "noRec":$scope.dataTeknisi[i].noRec,
                        "pegawai":{
                            "id":$scope.dataTeknisi[i].idPegawai
                        }
                    };
                    var dataText= {
                        "noRec":$scope.dataTeknisi[i].noRec,
                        "namaLengkap":$scope.dataTeknisi[i].namaPegawai
                    }
                    $scope.teknisi.push(data);
                    $scope.displayTeknisi.push(dataText);   
                };
                $scope.daftarPemeriksaan = $scope.mainData.pemeriksaan;
                $scope.listPemeriksaan = []
                $scope.daftarPemeriksaan.forEach(function(data){
                    if (_.isNull(data.pemeriksaanFisik)){
                        var listData = {
                            "pemeriksaanFisik":{
                                "name":"",
                                "id":""
                            },
                            "pemeriksaanFungsi":{
                                "name":"",
                                "id":""
                            },
                            "noRec": data.noRec,
                            "bagianAlat": data.bagianAlat,
                        }  
                        $scope.listPemeriksaan.push(listData);
                    } else {

                        if(data.pemeriksaanFisikId == 1){
                            data.pemeriksaanFisik = "✔";
                         }else if(data.pemeriksaanFisikId == 2){
                            data.pemeriksaanFisik = "✖";
                         }

                        if(data.pemeriksaanFungsiId == 1){
                            data.pemeriksaanFungsi = "✔";
                         }else if(data.pemeriksaanFungsiId == 2){
                            data.pemeriksaanFungsi = "✖";
                        }

                        var listData = {
                            "pemeriksaanFisik":{
                                "name":data.pemeriksaanFisik,
                                "id":data.pemeriksaanFisikId
                            },
                            "pemeriksaanFungsi":{
                                "name":data.pemeriksaanFungsi,
                                "id":data.pemeriksaanFungsiId
                            },
                            "noRec": data.noRec,
                            "bagianAlat": data.bagianAlat,
                        }  
                        $scope.listPemeriksaan.push(listData);
                    }
                });
                /*for (var i=0; i<$scope.daftarPemeriksaan.length; i++) {
                    var element = $scope.daftarPemeriksaan[i];
                    if (_.isNull(element.pemeriksaanFisik)) {
                        element.pemeriksaanFisik = {
                            "name":"",
                            "id":""
                        }
                    } else {
                        element.pemeriksaanFisik = {
                            "name":element.pemeriksaanFisik,
                            "id":""
                        }
                    }
                    if (_.isNull(element.pemeriksaanFungsi)) {
                        element.pemeriksaanFungsi = {
                            "name":"",
                            "id":""
                        }
                    } else {
                        element.pemeriksaanFisik = {
                            "name":element.pemeriksaanFungsi,
                            "id":""
                        }
                    }
                    
                }*/
                $scope.dataSource = new kendo.data.DataSource({
                    pageSize: 20,
                    data: $scope.listPemeriksaan,
                    batch: true,
                    schema: {
                        model: {
                            id: "bagianAlat",
                            fields: {
                                pemeriksaanFisik: { editable: false, defaultValue: { id: 1, nama: "Baik"}},
                                pemeriksaanFungsi: { editable: false, defaultValue: { id: 1, nama: "Baik"}},
                                bagianAlat: { editable: false},
                                
                            }
                        }
                   }
                });

                // $scope.keterangan = [
                // {"id":1, "name":"Baik"},
                // {"id":2, "name":"Rusak"}
                // ]

                $scope.keterangan = [
                    {"id":1, "name":"✔"},
                    {"id":2, "name":"✖"}
                ]

                $scope.categoryDropDownEditor = function(container, options) {
                    $('<input required name="' + options.field + '"/>')
                        .appendTo(container)
                        .kendoDropDownList({
                            autoBind: false,
                            dataTextField: "name",
                            dataValueField: "id",
                            dataSource: $scope.keterangan
                        });
                   }
                   
                $scope.batal = function(){
                 $state.go("RespondPerbaikan")
                }

                $scope.mainGridOptions = { 
                    pageable: true,
                    toolbar: ["cancel"],
                    columns: [
                    { field: "bagianAlat",title:"Kebutuhan Alat" },
                    { field: "pemeriksaanFisik", title: "Permeriksaan Fisik", width: "180px", editor: $scope.categoryDropDownEditor, template: "#=pemeriksaanFisik.name#"},
                    { field: "pemeriksaanFungsi", title: "Permeriksaan Fungsi", width: "180px", editor: $scope.categoryDropDownEditor, template: "#=pemeriksaanFungsi.name#"}
                    ],
                    editable: true
                };
                $scope.mainGridOptions_1 = { 
                    pageable: true,
                    toolbar: ["cancel"],
                    columns: [
                    { field: "bagianAlat",title:"Kebutuhan Alat" },
                    { field: "pemeriksaanFisik", title: "Permeriksaan Fisik", width: "180px", editor: $scope.categoryDropDownEditor, template: "#=pemeriksaanFisik.name#"},
                    { field: "pemeriksaanFungsi", title: "Permeriksaan Fungsi", width: "180px", editor: $scope.categoryDropDownEditor, template: "#=pemeriksaanFungsi.name#"}
                    ],
                    editable: false
                };

            });
            $scope.arrTeknisi = [];
            
            $scope.tambahTeknisi = function () {
                var data = {
                    "noRec":"",
                    "pegawai":{
                        "id": ""
                    }
                }
                $scope.arrTeknisi.push(data);
                console.log(JSON.stringify($scope.item.teknisi));
            }
            $scope.insertTeknisi = function () {
                for(var i=0; i<$scope.arrTeknisi.length;i++){
                    var data = {
                        "noRec":"",
                        "pegawai":{
                            "id": $scope.item.teknisi[i].id
                        }
                    };
                    $scope.teknisi.push(data);
                }
                console.log(JSON.stringify($scope.teknisi));
            }

            $scope.removeTeknisi = function (data) {
                $scope.arrTeknisi.pop();
                $scope.teknisi.pop();
                console.log(JSON.stringify($scope.teknisi));
                console.log(JSON.stringify($scope.arrTeknisi));
            };

            $scope.save_pemeliharaan = function () {
                var listRawRequired = [
                "item.kebutuhanAlatCatuTegangan|ng-model|Kebutuhan Alat Catu Tegangan",
                "item.terukurCatuTegangan|ng-model|Terukur Catu Tegangan",
                "item.kebutuhanAlatTemperaturRuangan|ng-model|Kebutuhan Alat Temperatur Ruangan",
                "item.terukurTemperaturRuangan|ng-model|Terukur Temperatur Ruangan",
                "item.kebutuhanAlatKelembabanRuangan|ng-model|Kebutuhan Alat Kelembaban Ruangan",
                "item.terukurKelembabanRuangan|ng-model|Terukur Kelembaban Ruangan"
                // "userPelapor|ng-model|User"
                ];
                
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                $scope.insertTeknisi();
                $scope.kirimDataPemeriksaan = [];
                $scope.dataPemeriksaan = $scope.dataSource._data;
                    $scope.dataPemeriksaan.forEach(function(data){
                        if(data.pemeriksaanFungsi.id == "" && data.pemeriksaanFisik.id == ""){
                            var pemeriksaanData = 
                            {
                                "bagianAlat": data.bagianAlat,
                                "noRec": data.noRec
                            }
                            $scope.kirimDataPemeriksaan.push(pemeriksaanData);
                        } else if(data.pemeriksaanFungsi.id == "") {
                            var pemeriksaanData = 
                            {
                                "pemeriksaanFisik": {
                                      "id":data.pemeriksaanFisik.id
                                },
                                "bagianAlat": data.bagianAlat,
                                "noRec": data.noRec
                            }
                            $scope.kirimDataPemeriksaan.push(pemeriksaanData);
                        } else if(data.pemeriksaanFisik.id == ""){
                            var pemeriksaanData = 
                            {
                                "pemeriksaanFungsi": {
                                    "id":data.pemeriksaanFungsi.id
                                },
                                "bagianAlat": data.bagianAlat,
                                "noRec": data.noRec
                            }
                            $scope.kirimDataPemeriksaan.push(pemeriksaanData);
                        } else {
                            var pemeriksaanData = 
                            {
                                "pemeriksaanFungsi": {
                                    "id":data.pemeriksaanFungsi.id
                                },
                                "pemeriksaanFisik": {
                                      "id":data.pemeriksaanFisik.id
                                },
                                "bagianAlat": data.bagianAlat,
                                "noRec": data.noRec
                            }
                            $scope.kirimDataPemeriksaan.push(pemeriksaanData);
                        }
                    
                })
                var data = 
                {
                  "kebutuhanAlatTemperaturRuangan": $scope.item.kebutuhanAlatTemperaturRuangan,
                  "kebutuhanAlatKelembabanRuangan": $scope.item.kebutuhanAlatKelembabanRuangan,
                  "teknisi": $scope.teknisi,
                  "keteranganRespon": $scope.item.catatan,
                  "namaTeknisi": $scope.mainData.header.namaTeknisi,
                  "noRecOrder": $scope.mainData.header.noRec,
                  "terukurCatuTegangan": $scope.item.terukurCatuTegangan,
                  "kebutuhanAlatCatuTegangan": $scope.item.kebutuhanAlatCatuTegangan,
                  "terukurTemperaturRuangan": $scope.item.terukurTemperaturRuangan,
                  "terukurKelembabanRuangan": $scope.item.terukurKelembabanRuangan,
                  "pemeriksaan": $scope.kirimDataPemeriksaan
                }
                if(isValid.status){
                    console.log(JSON.stringify(data));
                    IPSRSService.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-pemeliharaan/").then(function(e) {
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.verifikasi = function () {
                IPSRSService.getItem("psrsPermintaanPerbaikan/verifikasi-ruangan?noRecKirimProduk="+$state.params.noRecKirimProduk, true).then(function(dat){
                    $scope.disVerif = true;
                    window.messageContainer.log('Verifikasi Berhasil')
                }); 
            }


}
]);
});