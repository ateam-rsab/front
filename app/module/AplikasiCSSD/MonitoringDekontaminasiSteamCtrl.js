define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonitoringDekontaminasiSteamCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras','IPSRSService', 'DateHelper', '$state','$mdDialog',
        function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state, $mdDialog) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.jamMulaiSterilisasi = $scope.now;
            $scope.item.jamSelesaiSterilisasi = $scope.now;
            $scope.dataVOloaded = true;
            $scope.dataPost = [];
            var init = function () {
                IPSRSService.getItem("cssd-monitoring-steam/detail-monitoring-steam/?strukPelayananId="+$state.params.strukPelayananId).then(function(dat){
                    $scope.dataHeader = dat.data.header;
                    $scope.dataGrid = dat.data.detail;
                    $scope.dataGrid.forEach(function (data) {
                        if (data.kebersihanAlat == "" || data.kebersihanAlat == null ) {
                            data.alatBerkarat = "";
                            data.kebersihanAlat = "";
                            data.kelenturanAlat = "";
                            data.keutuhanAlat = "";
                            data.warnaAlat = "";
                            data.ketajamanAlat = "";
                            data.kemampuanMenjepit = "";
                            data.kondisiAlat = "";
                            data.kelayakanAlat = "";
                            data.linenYangDikemas = "";
                            data.jamMulaiSterilisasi = "";
                            data.jamSelesaiSterilisasi = "";
                            data.tindakan = "";
                        } else {
                            if (data.alatBerkarat == 1){
                                data.alatBerkaratName = "Alat Berkarat"
                            } else {
                                data.alatBerkaratName = "Tidak Berkarat"
                            }
                            if (data.kebersihanAlat == 1){
                                data.kebersihanAlatName = "Alat Bersih"
                            } else if(data.kebersihanAlat == 2) {
                                data.kebersihanAlatName = "Kotor"
                            } else {
                                data.kebersihanAlatName = "Ada Darah"
                            }
                            if (data.kelenturanAlat == 1){
                                data.kelenturanAlatName = "Alat Lentur"
                            } else {
                                data.kelenturanAlatName = "Tidak Lentur"
                            }
                            if (data.keutuhanAlat == 1){
                                data.keutuhanAlatName = "Mur"
                            } else {
                                data.keutuhanAlatName = "Baut"
                            }
                            if (data.warnaAlat == 1){
                                data.warnaAlatName = "Bening"
                            } else if(data.warnaAlat == 2){
                                data.warnaAlatName = "Buram"
                            } else {
                                data.warnaAlatName = "Hitam"
                            }
                            if (data.ketajamanAlat == 1){
                                data.ketajamanAlatName = "Alat Tajam"
                            } else {
                                data.ketajamanAlatName = "Tidak Tajam"
                            }
                            if (data.kemampuanMenjepit == 1){
                                data.kemampuanMenjepitName = "Bisa"
                            } else {
                                data.kemampuanMenjepitName = "Tidak"
                            }
                            if (data.kondisiAlat == 1){
                                data.kondisiAlatName = "Alat Kering"
                            } else if(data.kondisiAlat == 2) {
                                data.kondisiAlatName = "Basah"
                            } else {
                                data.kondisiAlatName = "Ada Air"
                            }
                            if (data.kelayakanAlat == 1){
                                data.kelayakanAlatName = "Layak Pakai"
                            } else {
                                data.kelayakanAlatName = "Tidak Layak Pakai"
                            }
                            if (data.linenYangDikemas == 1){
                                data.linenYangDikemasName = "Utuh"
                            } else {
                                data.linenYangDikemasName = "Robek"
                            }
                            if (data.tindakan == 1){
                                data.tindakanName = "Dekontaminasi Kembali"
                            } else {
                                data.tindakanName = "Dikembalikan Ke Ruangan"
                            }
                            data.jamMulaiSterilisasi = new Date(data.jamMulaiSterilisasi);
                            data.jamSelesaiSterilisasi = new Date(data.jamSelesaiSterilisasi);
                        }
                    })
                    $scope.dataSource = new kendo.data.DataSource({
                        pageSize: 5,
                        data: $scope.dataGrid,
                        autoSync: true
                    });
                    $scope.item.noOrder = $scope.dataHeader.noOrder;
                    $scope.item.noBundle = $scope.dataHeader.noBundel;
                    $scope.item.ruanganAsal = $scope.dataHeader.ruanganAsal;
                    $scope.item.ruanganTujuan = $scope.dataHeader.ruanganTujuan;
                    $scope.item.operator = $scope.dataHeader.petugas;
                    var tanggal = new Date($scope.dataHeader.tanggalPlanning);
                    if ($scope.dataHeader.tanggalPlanning == "" || $scope.dataHeader.tanggalPlanning == "-") {
                        $scope.item.tanggal = new Date();
                    } else {
                        $scope.item.tanggal = tanggal;
                    }

                });
            };
            init();
            $scope.dataSourceTemp = new kendo.data.DataSource({
                pageSize: 5,
                data: [],
                batch: true
            });
            $scope.mainGridOptionAlat = { 
                pageable: true,
                columns: [
                { field:"namaProduk", title:"<center>Nama Alat", width: 200},
                { field:"qtyProduk",title:"<center>Jumlah", width: 70},
                { field:"ujiVisual",title:"<center>Uji Visual", columns:[
                    { field:"alatBerkaratName",title:"<center>Alat Berkarat", width: 100},
                    { field:"kebersihanAlatName",title:"<center>Kebersihan Alat", width: 120},
                    { field:"kelenturanAlatName",title:"<center>Kelenturan Alat", width: 120},
                    { field:"keutuhanAlatName",title:"<center>Keutuhan Alat", width: 120},
                    { field:"warnaAlatName",title:"<center>Warna Alat", width: 120},
                    { field:"ketajamanAlatName",title:"<center>Ketajaman Alat", width: 120},
                    { field:"kemampuanMenjepitName",title:"<center>Kemampuan Menjepit", width: 150},
                    { field:"kondisiAlatName",title:"<center>Kondisi Alat", width: 120},
                    { field:"kelayakanAlatName",title:"<center>Kelayakan Alat", width: 120},
                    { field:"linenYangDikemasName",title:"<center>Linen yang Dikemas", width: 120}]},
                { field:"jamMulaiSterilisasi",title:"<center>Jam Mulai", width: 100, format:"{0:HH:mm}"},
                { field:"jamSelesaiSterilisasi",title:"<center>Jam Selesai", width: 100, format:"{0:HH:mm}"},
                { field:"tindakan.name",title:"<center>Tindakan", width: 200},
                { command: 
                    {
                        text: "Hapus",
                        click: $scope.removeItemGrid
                    },title:"", width:100}
                ],
                editable: false
            };
            $scope.removeItemGrid = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                grid.removeRow(row);
            };
            
            
            $scope.gridMonitoringDecontaminasi = { 
                pageable: true,
                columns: [
                {
                    width: "50px",
                    title:  "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
                    template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='pilihBaris(dataItem)' </div>"
                },
                { field:"namaProduk", title:"<center>Nama Alat", width: 200},
                { field:"qtyProduk",title:"<center>Jumlah", width: 70},
                { field:"ujiVisual",title:"<center>Uji Visual",
                columns:
                [
                { field:"alatBerkaratName",title:"<center>Alat Berkarat", width: 100},
                { field:"kebersihanAlatName",title:"<center>Kebersihan Alat", width: 120},
                { field:"kelenturanAlatName",title:"<center>Kelenturan Alat", width: 120},
                { field:"keutuhanAlatName",title:"<center>Keutuhan Alat", width: 120},
                { field:"warnaAlatName",title:"<center>Warna Alat", width: 120},
                { field:"ketajamanAlatName",title:"<center>Ketajaman Alat", width: 120},
                { field:"kemampuanMenjepitName",title:"<center>Kemampuan Menjepit", width: 150},
                { field:"kondisiAlatName",title:"<center>Kondisi Alat", width: 120},
                { field:"kelayakanAlatName",title:"<center>Kelayakan Alat", width: 120},
                { field:"linenYangDikemasName",title:"<center>Linen yang Dikemas", width: 120},
                ]},
                { field:"jamMulaiSterilisasi",title:"<center>Jam Mulai", width: 100,format:"{0:HH:mm}"},
                { field:"jamSelesaiSterilisasi",title:"<center>Jam Selesai", width: 100,format:"{0:HH:mm}"},
                { field:"tindakanName",title:"<center>Tindakan", width: 200}

                ],
                editable: false,
                selectable:true
            };
            $scope.klik = function(current){
                $scope.current = current;
                $scope.item.alatBerkarat = current.alatBerkarat;
                $scope.item.kebersihanAlat = current.kebersihanAlat;
                $scope.item.kelenturanAlat = current.kelenturanAlat;
                $scope.item.keutuhanAlat = current.keutuhanAlat;
                $scope.item.warnaAlat = current.warnaAlat;
                $scope.item.ketajamanAlat = current.ketajamanAlat;
                $scope.item.kemampuanMenjepit = current.kemampuanMenjepit;
                $scope.item.kondisiAlat = current.kondisiAlat;
                $scope.item.kelayakanAlat = current.kelayakanAlat;
                $scope.item.linenYangDikemas = current.linenYangDikemas;
                $scope.item.jamMulaiSterilisasi = current.jamMulaiSterilisasi;
                $scope.item.jamSelesaiSterilisasi = current.jamSelesaiSterilisasi;
                $scope.item.tindakan = {"id":current.tindakan, "name":current.tindakanName};
            };
            $scope.ketKebersihan = [
            {"id":1, "name":"Alat Bersih"},
            {"id":2, "name":"Kotor"},
            {"id":3, "name":"Ada Darah"}
            ];
            $scope.ketKondisi = [
            {"id":1, "name":"Alat Kering"},
            {"id":2, "name":"Basah"},
            {"id":3, "name":"Ada Air"}
            ];
            $scope.ketKelenturan = [
            {"id":1, "name":"Alat Lentur"},
            {"id":2, "name":"Tidak Lentur"}
            ];
            $scope.ketKetajaman = [
            {"id":1, "name":"Alat Tajam"},
            {"id":2, "name":"Tidak Tajam"}
            ];
            $scope.ketKarat = [
            {"id":1, "name":"Alat Berkarat"},
            {"id":2, "name":"Tidak Berkarat"}
            ];
            $scope.ketWarna = [
            {"id":1, "name":"Bening"},
            {"id":2, "name":"Buram"},
            {"id":3, "name":"Hitam"}
            ];
            $scope.ketLayak = [
            {"id":1, "name":"Layak Pakai"},
            {"id":2, "name":"Tidak Layak Pakai"}
            ];
            $scope.ketMenjepit = [
            {"id":1, "name":"Bisa"},
            {"id":2, "name":"Tidak"}
            ];
            $scope.ketUtuh = [
            {"id":1, "name":"Mur"},
            {"id":2, "name":"Baut"}
            ];
            $scope.ketLinen = [
            {"id":1, "name":"Utuh"},
            {"id":2, "name":"Robek"}
            ];
            $scope.listTindakan = [
            {"id":1, "name":"Dekontaminasi Kembali"},
            {"id":2, "name":"Dikembalikan Ke Ruangan"}
            ];
            $scope.toggleSelectAll = function(ev) {
                var grids = $('#kGrid').data("kendoGrid");
                var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
                var items = grid.dataSource.data();
                items.forEach(function(item){
                    item.selected = ev.target.checked;
                    if (item.selected == true) {
                        $scope.pilihBaris(item);
                    } else {
                        $scope.pilihBaris(item);
                    }

                });
            };
            $scope.pilihBaris = function(dataItem)
            {
                $scope.DataCheck = true;
                var dataObj = {
                    produkId : dataItem.produkId,
                    namaProduk : dataItem.namaProduk,
                    jumlah : dataItem.qtyProduk,
                    noRec : dataItem.noRec
                }

                var isExist = _.find($scope.dataPost, function(dataExist){ 
                    if (
                        dataExist.produkId == dataObj.produkId &&
                        dataExist.namaProduk == dataObj.namaProduk &&
                        dataExist.jumlah == dataObj.jumlah &&
                        dataExist.noRec == dataObj.noRec) {
                        return true;
                } else {
                    return undefined;
                }
            });

                if(isExist == undefined)
                {
                    $scope.dataPost.push(dataObj);
                }
                else
                {
                    $scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
                        produkId: dataObj.produkId,
                        namaProduk: dataObj.namaProduk,
                        jumlah: dataObj.jumlah,
                        noRec: dataObj.noRec
                    }));
                }


            };
            $scope.getProduk=function(){
                $scope.dataId = [];
                $scope.dataNamaProduk= [];
                $scope.dataJumlah= [];
                $scope.dataNoRec= [];
                for (var key in $scope.dataPost) {
                    if ($scope.dataPost.hasOwnProperty(key)) {
                        var element = $scope.dataPost[key];
                        if ( element.produkId != undefined) {
                            $scope.dataId.push({"produkId":element.produkId}),
                            $scope.dataNamaProduk.push({"namaProduk":element.namaProduk}),
                            $scope.dataJumlah.push({"jumlah":element.jumlah}),
                            $scope.dataNoRec.push({"noRec":element.noRec})
                        }else{
                            var confirm = $mdDialog.confirm()
                            .title('Peringatan!')
                            .textContent('Data belum di pilih?')
                            .ariaLabel('Lucky day')
                            .ok('OK')

                            $mdDialog.show(confirm).then(function() {
                                $scope.findData();
                            });
                        }
                    }
                }
            };
            $scope.batalTemp = function () {
                var dataInGrid = [];
                $scope.dataSourceTemp = new kendo.data.DataSource({
                    pageSize: 5,
                    data: dataInGrid
                });
            };
            $scope.batal = function(){
                debugger
                $state.go('DaftarPenerimaanSterilisasiAlat');
            }
            
            $scope.tambahDataTemp = function () {
                if($scope.DataCheck == undefined || $scope.DataCheck == false){
                    window.messageContainer.error('Pilih Chek Grid Terlebih Dahulu !!')
                }else{
                    var listRawRequired = [
                        "item.alatBerkarat|ng-model|Alat Berkarat",
                        "item.kebersihanAlat|ng-model|kebersihanAlat",
                        "item.kelenturanAlat|ng-model|Kelenturan Alat",
                        "item.keutuhanAlat|ng-model|Keutuhan Alat",
                        "item.warnaAlat|ng-model|WarnaAlat",
                        "item.ketajamanAlat|ng-model|Ketajaman Alat",
                        "item.kemampuanMenjepit|ng-model|Kemampuan Menjepit",
                        "item.kondisiAlat|ng-model|Kondisi Alat",
                        "item.kelayakanAlat|ng-model|Kelayakan Alat", 
                        "item.linenYangDikemas|ng-model|Linen Yang dikemas",
                        "item.tindakan|k-ng-model|Tindakan"
                    ]
                  var isValid = ModelItem.setValidation($scope, listRawRequired);  
                   if(isValid.status){
                       $scope.getProduk();
                            if ($scope.item.alatBerkarat == 1){
                                $scope.alatBerkaratName = "Alat Berkarat"
                            } else {
                                $scope.alatBerkaratName = "Tidak Berkarat"
                            }
                            if ($scope.item.kebersihanAlat == 1){
                                $scope.kebersihanAlatName = "Alat Bersih"
                            } else if($scope.item.kebersihanAlat == 2) {
                                $scope.kebersihanAlatName = "Kotor"
                            } else {
                                $scope.kebersihanAlatName = "Ada Darah"
                            }
                            if ($scope.item.kelenturanAlat == 1){
                                $scope.kelenturanAlatName = "Alat Lentur"
                            } else {
                                $scope.kelenturanAlatName = "Tidak Lentur"
                            }
                            if ($scope.item.keutuhanAlat == 1){
                                $scope.keutuhanAlatName = "Mur"
                            } else {
                                $scope.keutuhanAlatName = "Baut"
                            }
                            if ($scope.item.warnaAlat == 1){
                                $scope.warnaAlatName = "Bening"
                            } else if($scope.item.warnaAlat == 2){
                                $scope.warnaAlatName = "Buram"
                            } else {
                                $scope.warnaAlatName = "Hitam"
                            }
                            if ($scope.item.ketajamanAlat == 1){
                                $scope.ketajamanAlatName = "Alat Tajam"
                            } else {
                                $scope.ketajamanAlatName = "Tidak Tajam"
                            }
                            if ($scope.item.kemampuanMenjepit == 1){
                                $scope.kemampuanMenjepitName = "Bisa"
                            } else {
                                $scope.kemampuanMenjepitName = "Tidak"
                            }
                            if ($scope.item.kondisiAlat == 1){
                                $scope.kondisiAlatName = "Alat Kering"
                            } else if($scope.item.kondisiAlat == 2) {
                                $scope.kondisiAlatName = "Basah"
                            } else {
                                $scope.kondisiAlatName = "Ada Air"
                            }
                            if ($scope.item.kelayakanAlat == 1){
                                $scope.kelayakanAlatName = "Layak Pakai"
                            } else {
                                $scope.kelayakanAlatName = "Tidak Layak Pakai"
                            }
                            if ($scope.item.linenYangDikemas == 1){
                                $scope.linenYangDikemasName = "Utuh"
                            } else {
                                $scope.linenYangDikemasName = "Robek"
                            }
                            for (var i=0; i<$scope.dataNamaProduk.length;i++){
                                var dataTemp = {
                                    "namaProduk": $scope.dataNamaProduk[i].namaProduk,
                                    "qtyProduk": $scope.dataJumlah[i].jumlah,
                                    "noRec": $scope.dataNoRec[i].noRec,
                                    "produkId": $scope.dataId[i].produkId,
                                    "alatBerkarat" : $scope.item.alatBerkarat,
                                    "kebersihanAlat" : $scope.item.kebersihanAlat,
                                    "kelenturanAlat" : $scope.item.kelenturanAlat,
                                    "keutuhanAlat" : $scope.item.keutuhanAlat,
                                    "warnaAlat" : $scope.item.warnaAlat,
                                    "ketajamanAlat" : $scope.item.ketajamanAlat,
                                    "kemampuanMenjepit" : $scope.item.kemampuanMenjepit,
                                    "kondisiAlat" : $scope.item.kondisiAlat,
                                    "kelayakanAlat" : $scope.item.kelayakanAlat,
                                    "linenYangDikemas" : $scope.item.linenYangDikemas,
                                    "jamMulaiSterilisasi": $scope.item.jamMulaiSterilisasi,
                                    "jamSelesaiSterilisasi": $scope.item.jamSelesaiSterilisasi,
                                    "tindakan": {"id":$scope.item.tindakan.id, "name":$scope.item.tindakan.name},
                                    "alatBerkaratName" : $scope.alatBerkaratName,
                                    "kebersihanAlatName" : $scope.kebersihanAlatName,
                                    "kelenturanAlatName" : $scope.kelenturanAlatName,
                                    "keutuhanAlatName" : $scope.keutuhanAlatName,
                                    "warnaAlatName" : $scope.warnaAlatName,
                                    "ketajamanAlatName" : $scope.ketajamanAlatName,
                                    "kemampuanMenjepitName" : $scope.kemampuanMenjepitName,
                                    "kondisiAlatName" : $scope.kondisiAlatName,
                                    "kelayakanAlatName" : $scope.kelayakanAlatName,
                                    "linenYangDikemasName" : $scope.linenYangDikemasName
                                };
                                $scope.dataSourceTemp.add(dataTemp);
                            }

                        }else{
                    ModelItem.showMessages(isValid.messages);
                   }
             

                }

            }
            
            $scope.simpan = function () {
            var cssdMonitoringSteamDetailVO = []
            for (var i=0;i<$scope.dataSourceTemp._data.length;i++){
                var dataTemp =
                {
                    "kebersihanAlat":$scope.dataSourceTemp._data[i].kebersihanAlat,
                    "kondisiAlat":$scope.dataSourceTemp._data[i].kondisiAlat,
                    "kelenturanAlat":$scope.dataSourceTemp._data[i].kelenturanAlat,
                    "ketajamanAlat":$scope.dataSourceTemp._data[i].ketajamanAlat,
                    "alatBerkarat":$scope.dataSourceTemp._data[i].alatBerkarat,
                    "warnaAlat":$scope.dataSourceTemp._data[i].warnaAlat,
                    "kelayakanAlat":$scope.dataSourceTemp._data[i].kelayakanAlat,
                    "kemampuanMenjepit":$scope.dataSourceTemp._data[i].kemampuanMenjepit,
                    "keutuhanAlat":$scope.dataSourceTemp._data[i].keutuhanAlat,
                    "linenYangdikemas":$scope.dataSourceTemp._data[i].linenYangDikemas,
                    "jamMulaiSterilisasi":$scope.dataSourceTemp._data[i].jamMulaiSterilisasi,
                    "jamSelesaiSterilisasi":$scope.dataSourceTemp._data[i].jamSelesaiSterilisasi,
                    "tindakan":$scope.dataSourceTemp._data[i].tindakan.id,
                    "produk":{
                        "id":$scope.dataSourceTemp._data[i].produkId
                    },
                    "qtyProduk":$scope.dataSourceTemp._data[i].qtyProduk,
                    "noRec":$scope.dataSourceTemp._data[i].noRec
                }
                cssdMonitoringSteamDetailVO.push(dataTemp);
            }
            var data = 
            {
                "strukPelayanan":{
                    "noRec":$state.params.strukPelayananId
                },
                "noRec":$scope.dataHeader.noRec,
                "tanggal":$scope.item.tanggal,
                "cssdMonitoringSteamDetailVO":cssdMonitoringSteamDetailVO
            }
            ManageSarpras.saveDataSarPras(data, "cssd-monitoring-steam/save-monitoring-steam/").then(function (e) {
                init();
                $scope.item = {};
                $scope.batalTemp();
                $scope.dataPost = [];
                $scope.dataSourceTemp._data = [];
                var konfirmasi = $mdDialog.confirm()
                .title("Peringatan!")
                .textContent("Kembali Ke Daftar Penerimaan Sterilisasi Alat?")
                .ariaLabel("Lucky Day")
                .ok("Ya")
                .cancel("Tidak")
                $mdDialog.show(konfirmasi).then(function(){
                    $state.go("DaftarPenerimaanSterilisasiAlat")
                })
            });
        }

        }
        ]);
});