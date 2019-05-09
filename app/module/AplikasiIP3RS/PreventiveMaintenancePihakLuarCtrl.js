define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PreventiveMaintenancePihakLuarCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper', '$state', 'IPSRSService',
        function($rootScope, $scope, ModelItem, DateHelper, $state, IPSRSService) {
            ModelItem.get("IPSRS/PreventiveMaintenancePihakLuar").then(function(data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
                $scope.disSimpan = true;

                $scope.batal = function () {
                    $state.go("PenjadwalanPreventive");
                }
                $scope.item.produkId=$state.params.produkId;
                $scope.item.namaProduk=$state.params.namaProduk;
                if ($state.params.merkProduk == "" || undefined) {
                    $scope.item.merkProduk = "-"
                } else {
                    $scope.item.merkProduk=$state.params.merkProduk;
                }
                if ($state.params.noSeri == "") {
                    $scope.item.noSeri = "-"
                } else {
                 $scope.item.noSeri= $state.params.noSeri;
                }
                if ($state.params.typeProduk == "") {
                    $scope.item.typeProduk = "-"
                } else {
                    $scope.item.typeProduk=$state.params.typeProduk
                } 
                if ($state.params.jadwalKontakService == undefined) {
                    $scope.item.jadwalPemeliharaan = $state.params.jadwalKalibrasi;
                } else {
                    $scope.item.jadwalPemeliharaan = $state.params.jadwalKontakService;
                };
                $scope.item.teknisiPendampingGrid=$state.params.teknisiPendampingGrid;
                $scope.item.noRekAset = $state.params.noRekAset;
                $scope.item.ruanganId = $state.params.ruanganId;
                $scope.item.jenisPenjadwalan = $state.params.jenisPenjadwalan;
                $scope.item.noRecPenjadwalan = $state.params.noRecPenjadwalan;
                $scope.item.textNamaPT = $state.params.namaRekanan;
                $scope.item.idRekanan = $state.params.idRekanan;
                


            IPSRSService.getItem("ipsrs-preventive-maintenance/get-user-verifikasi", true).then(function(dat){
                $scope.listPegawai = dat.data.data.userVerifikasi;
                //debugger;
            }); 
            IPSRSService.getItem("ipsrs-maintenance/get-rekanan-maintenance", true).then(function(dat){
                $scope.listRekanan = dat.data.data.listRekanan;
                //debugger;
            });
            

            IPSRSService.getItem("ipsrs-preventive-maintenance/get-bagian-alat?id="+$scope.item.produkId, true).then(function(dat){
                $scope.daftarPemeriksaan = dat.data.data.listBagianAlat;
                $scope.dataSource = new kendo.data.DataSource({
                    pageSize: 20,
                    data: $scope.daftarPemeriksaan,
                    autoSync: true,
                    batch: true,
                    schema: {
                        model: {
                            id: "bagianAlat",
                            fields: {
                                "pengecekanPeralatanMapping.bagianAlat": { editable: false},
                                pemeriksaanFisik: { defaultValue: { id: 1, nama: "Baik"} },
                                pemeriksaanFungsi: { defaultValue: { id: 1, nama: "Baik"} }
                            }   
                        }   
                    }
                });
                $scope.keterangan = [
                {"id":1, "nama":"Baik"},
                {"id":2, "nama":"Rusak"}
                ]

                $scope.categoryDropDownEditor = function(container, options) {
                    var editor = $('<input kendo-drop-down-list required k-data-text-field="\'nama\'" k-data-value-field="\'id\'" k-data-source="keterangan" data-bind="value:' + options.field + '"/>')
                    .appendTo(container);
                }

                $scope.mainGridOptions = { 
                    pageable: true,
                    toolbar: ["create", "save", "cancel"],
                    columns: [
                        { field: "pengecekanPeralatanMapping.bagianAlat",title:"Kebutuhan Alat" },
                        { field: "pemeriksaanFisik", title: "Permeriksaan Fisik", width: "180px", editor: $scope.categoryDropDownEditor, template: "#=pemeriksaanFisik.nama#" },
                        { field: "pemeriksaanFungsi", title: "Permeriksaan Fungsi", width: "180px", editor: $scope.categoryDropDownEditor, template: "#=pemeriksaanFungsi.nama#" },
                        { command: "destroy", title: " ", width: "100px" }
                    ],
                    editable: true
                };
            });
            $scope.asdasd = function () {
                $scope.disSimpan = false;
            };
            $scope.simpan=function()
            {   
                var data = {
                  "tanggal": $scope.item.jadwalPemeliharaan,
                  "pegawai": {
                    "id": 2
                },
                "registrasiAset": {
                    "noRec": $scope.item.noRekAset
                },
                "teknisiPendamping": $scope.item.teknisiPendampingGrid,
                "statusEnabled": true,
                "rekanan":{
                    "id": $scope.item.namaPT.id
                },
                "teknisiLuar": $scope.item.namaTeknisi,
                "ipsrsPemeriksaan": $scope.dataSource._data,
                "kebutuhanAlatCatuTegangan": parseFloat($scope.item.kebutuhanAlat.catuTegangan),
                "kebutuhanAlatTemperaturRuangan": parseFloat($scope.item.kebutuhanAlat.temperaturRuang),
                "kebutuhanAlatKelembabanRuangan": parseFloat($scope.item.kebutuhanAlat.kelembapanRuang),
                "terukurCatuTegangan": parseFloat($scope.item.Terukur.catuTegangan),
                "terukurTemperaturRuangan": parseFloat($scope.item.Terukur.temperaturRuang),
                "terukurKelembabanRuangan": parseFloat($scope.item.Terukur.kelembapanRuang),
                "catatan": $scope.item.catatan,
                "jenisPreventive": "eksternal",
                "jenisPenjadwalan":$scope.item.jenisPenjadwalan,
                "noRecPenjadwalan":$scope.item.noRecPenjadwalan
            }

            IPSRSService.saveDataSarPras(data,"ipsrs-preventive-maintenance/save-preventive-maintenance").then(function(e) {
                console.log(JSON.stringify(e.data));
            });


        };

    }, function errorCallBack(err) {});
}
]);
});