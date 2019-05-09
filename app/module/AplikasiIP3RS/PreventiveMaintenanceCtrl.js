define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PreventiveMaintenanceCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper', '$state', 'IPSRSService',
        function($rootScope, $scope, ModelItem, DateHelper, $state, IPSRSService) {
            $scope.dataVOloaded = true;
            $scope.item = {};
            IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
                $scope.dataMasterTeknisi = dat.data;
            });
            $scope.item.IdJenis = $state.params.IdJenis
            $scope.namaGedungHide = true;
           
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

            if($scope.item.IdJenis != "79"){ //======================= NON GEDUNG============================//
            $scope.namaAlatHide = false;
            $scope.namaGedungHide = true;
            var freeText = $scope.item.keterangan;
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
                         }else{
                            data.pemeriksaanFisik = "";
                         }

                        if(data.pemeriksaanFungsiId == 1){
                            data.pemeriksaanFungsi = "✔";
                         }else if(data.pemeriksaanFungsiId == 2){
                            data.pemeriksaanFungsi = "✖";
                        }else{
                            data.pemeriksaanFungsi = ""
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

               if($scope.user == true){
                  $scope.TrueEditable = false;
               }else{
                  $scope.TrueEditable = true;
               }

                $scope.dataSource = new kendo.data.DataSource({
                    pageSize: 20,
                    data: $scope.listPemeriksaan,
                    batch: true,
                    schema: {
                        model: {
                            id: "bagianAlat",
                            fields: {
                                pemeriksaanFisik: { editable: $scope.TrueEditable, defaultValue: { id: 1, nama: "Baik"}},
                                pemeriksaanFungsi: { editable: $scope.TrueEditable, defaultValue: { id: 1, nama: "Baik"}},
                                bagianAlat: { editable: false},
                                
                            }
                        }
                   }
                });


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
            }else{  //====================================== GEDUNG ==================================//
                $scope.namaAlatHide = true;
                $scope.namaGedungHide = false;
                IPSRSService.getItem("ceklistgedungbangunan/get-cek-list-jadwal-pemeliharan-gedung?noRec="+$state.params.noRec).then(function(dat){
                $scope.mainData = dat.data.loadcekListData[0].pemeliharaan
                $scope.MainDataDetail = dat.data.detail;
                $scope.MainDataHeader = dat.data.header;
                $scope.item.userPemesan =  $scope.MainDataHeader.userPemesan;
                $scope.MainDataparameter = dat.data.parameter;
                $scope.item.catatan = $scope.MainDataparameter.keterangan;
                var tanggalOrder = new moment(new Date($scope.MainDataparameter.tanggal)).format('YYYY-DD-MM');
                $scope.item.tanggalOrderGedung = tanggalOrder;
                $scope.item.ruangPemesan = $scope.MainDataHeader.ruanganPemesan;
                $scope.item.ruangTujuan = $scope.MainDataHeader.ruanganTujuan;
                $scope.dataTeknisi = dat.data.teknisi;
                $scope.teknisi=[];
                $scope.displayTeknisi = [];

                for(var i=0; i<$scope.dataTeknisi.length; i++){
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
                $scope.item.namaProduk = $scope.MainDataDetail.namaProduk;
                 $scope.item.keteranganGedung = $scope.MainDataparameter.keterangan;
                $scope.item.noRegisterAset = $scope.MainDataDetail.noRegisterAset;
                $scope.keterangan = [
                    {"id":1, "name":"✔"},
                    {"id":2, "name":""}
                ]


                var SubMainData = []
                $scope.nomor = 1;
                $scope.mainData.forEach(function(data){
                   $scope.IdParent = data.id;
                   $scope.NamaPerent = data.name;
                   $scope.no = $scope.nomor+++" .";
              
                  data.detail.forEach(function(Subdata){
                    var dataChild =  { 
                         "id": Subdata.id,
                         "noRec" : Subdata.noRec,
                         "Kondisi" : Subdata.kondisi,
                         "keterangan" : Subdata.keterangan,
                         "rencana" : Subdata.keterangan,
                         "no": $scope.no,
                         "namaParent" : $scope.NamaPerent,
                         "namaExternal": Subdata.namaExternal,
                         "IdInduk" : $scope.IdParent,
                         "pemeriksaanBaik":{
                                "name":"",
                                "id":""
                          },
                         "pemeriksaanRusak":{
                                "name":"",
                                "id":""
                          }
                        }

                        if(dataChild.Kondisi == 1){
                            dataChild.Kondisi = 1;
                            dataChild.pemeriksaanBaik.id == 1;
                            dataChild.pemeriksaanBaik.name = "✔";
                            dataChild.pemeriksaanRusak.id == 2
                            dataChild.pemeriksaanRusak.name = "";
                        }else if (dataChild.Kondisi == 2) {
                            dataChild.Kondisi = 2;
                            dataChild.pemeriksaanBaik.id == 2
                            dataChild.pemeriksaanBaik.name = "";
                            dataChild.pemeriksaanRusak.id == 1
                            dataChild.pemeriksaanRusak.name = "✔";
                        }else{
                            dataChild.Kondisi = null;
                            dataChild.pemeriksaanBaik.id == 2
                            dataChild.pemeriksaanBaik.name = "";
                            dataChild.pemeriksaanRusak.id == 2
                            dataChild.pemeriksaanRusak.name = "";
                        }
                      
                    
                    if(SubMainData.length != 0){                                                
                    for(var i = 0; i<SubMainData.length; i++){
                        if(SubMainData[i].IdInduk == dataChild.IdInduk){
                              dataChild.no = null;
                              dataChild.namaParent = null;   
                            }
                        }
                    }
                         if(dataChild.pemeriksaanBaik.id == 1){
                             dataChild.pemeriksaanBaik.name = "✔";
                           }else if(dataChild.pemeriksaanBaik.id == 2){
                             dataChild.pemeriksaanBaik.name = "✖";
                         }
                         if(dataChild.pemeriksaanRusak.id == 1){
                            dataChild.pemeriksaanRusak.name = "✔";
                         }else if(dataChild.pemeriksaanRusak.id == 2){
                            dataChild.pemeriksaanRusak.name = "✖";
                        }
                       SubMainData.push(dataChild);
                    })
                  })

            $scope.SubMainData = SubMainData;

            debugger
            if($scope.user == true){
                $scope.TrueEditable = false;
            }else{
                $scope.TrueEditable = true;
            }

             $scope.dataSource = new kendo.data.DataSource({
                    pageSize: 20,
                    data: $scope.SubMainData,
                    batch: true,
                    schema: {
                        model: {
                            id: "namaExternal",
                            fields: {
                                pemeriksaanBaik: { editable: $scope.TrueEditable, defaultValue: { id: 1, name: "Baik"}},
                                pemeriksaanRusak: { editable: $scope.TrueEditable, defaultValue: { id: 1, name: "Baik"}},
                                rencana: { editable: $scope.TrueEditable},
                                namaExternal: { editable: false},
                                namaParent: { editable: false},
                                no: { editable: false}
                                
                            }
                        }
                   }
                });

            $scope.ChecklistDropdown = function(container, options) {
            $('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({autoBind: false,
                dataTextField: "name",
                    dataValueField: "id",
                        dataSource: $scope.keterangan
                });
            }

            $scope.mainGridOptions = { 
                    pageable: true,
                    toolbar: ["cancel"],
                    columns: [
                     { field: "no",title:"No", width: "20px", attributes: {
                             "class": "table-cell",
                                style: "text-align: center; font-size: 15px; font-weight: bold"
                                }},
                    { field: "namaParent",title:"Bagian Gedung", width: "180px", attributes: {
                             "class": "table-cell",
                                style: "text-align: left; font-size: 15px; font-weight: bold; font-family: Arial; font-style: italic"
                                }}, 
                    { field: "namaExternal",title:"Uraian", width: "250px"  },
                    {field:"kondisi",title:"Kondisi",headerAttributes: { style: "text-align : center"},
                    columns:[ 
                              { field: "pemeriksaanBaik", title: "Baik", width: "60px", editor: $scope.ChecklistDropdown, template: "#=pemeriksaanBaik.name#",
                                attributes: {
                                    "class": "table-cell",
                                style: "text-align: center; font-size: 13px; font-weight: bold;"
                                }},
                              { field: "pemeriksaanRusak", title: "Rusak", width: "60px", editor: $scope.ChecklistDropdown, template: "#=pemeriksaanRusak.name#",
                                attributes: {
                                    "class": "table-cell",
                                style: "text-align: center; font-size: 13px; font-weight: bold;"
                                }},
                            ]
                    },
                    { field: "rencana",title:"Rencana Tindak Lanjut",width: "280px" }
                    ],
                    editable: true
                };
         });
       }


          $scope.batal = function(){
             $state.go("RespondPerbaikan")
            }

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
                ];
                
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                $scope.insertTeknisi();
                $scope.TempCheckDataGedung = [];
                $scope.kirimDataPemeriksaan = [];
                $scope.dataPemeriksaan = $scope.dataSource._data;
                 if($scope.item.IdJenis != 79){
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
                 }else{
                    $scope.dataPemeriksaan.forEach(function(data){
                    if(data.pemeriksaanBaik.name == "" &&  data.pemeriksaanRusak.name == ""){
                        data.Kondisi = null;
                    }else if (data.pemeriksaanBaik.name != ""){
                        data.Kondisi = 1;
                        data.keterangan = "Baik - "+data.namaExternal;
                    }else if (data.pemeriksaanRusak.name != ""){
                        data.Kondisi = 2; 
                        data.keterangan = "Rusak - "+data.namaExternal;
                    }
                   var ChecklistGedungDetail ={
                                    "kondisi": data.Kondisi,
                                    /*"keterangan": data.keterangan,*/
                                    "keterangan": data.rencana,
                                    "noRec": data.noRec
                                }
                    $scope.TempCheckDataGedung.push(ChecklistGedungDetail);
                   })

                 }

                if($scope.item.IdJenis!= 79){
                    var data =    {
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
                }else{
                     var data =  
                               {
                                  "keterangan": $scope.item.catatan,
                                  "tanggal": $scope.item.tanggalOrderGedung,
                                  "teknisi":$scope.teknisi,
                                  "keteranganRespon": $scope.item.keterangan,
                                  "namaTeknisi": $scope.item.userPemesan,
                                  "strukOrderid": $state.params.noRec,
                                  "cekListGedungDetail": $scope.TempCheckDataGedung
                                }
                    console.log(JSON.stringify(data));
                }
                
            if($scope.item.IdJenis == 79){
                IPSRSService.saveDataSarPras(data, "ceklistgedungbangunan/save-perawatan-gedung/").then(function(e) {
                }); 
              }else{
                 if(isValid.status){
                      console.log(JSON.stringify(data));
                         IPSRSService.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-pemeliharaan/").then(function(e) {
                        });
                 } else {
                        ModelItem.showMessages(isValid.messages);
                 }
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



/*========================================== OLD SOURCE CODE =====================================================*/
//$scope.mainData = dat.data.loadData[0].data;
/* for(var x = 0; x<$scope.mainData.length; x++){
var namaExternal = $scope.mainData[i].name;
if(namaExternal == $scope.dataGird.name){
$
}        
}*/


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
// $scope.keterangan = [
// {"id":1, "name":"Baik"},
// {"id":2, "name":"Rusak"}
// ]

/*IPSRSService.getItem("ceklistgedungbangunan/get-cek-list-gedung-bangunan").then(function(dat){*/
//var tanggalOrder = new Date($scope.MainDataparameter.tanggal);
