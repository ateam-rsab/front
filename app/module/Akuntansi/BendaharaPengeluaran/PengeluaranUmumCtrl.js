define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PengeluaranUmumCtrl', [ '$q', '$rootScope', '$scope', 'MnKeu', '$state','CacheHelper','DateHelper', 
        function($q, $rootScope, $scope, mnKeu ,$state,cacheHelper,dateHelper ) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item={};
            $scope.dataItem={};
            $scope.item.norec;
            $scope.item.tglFaktur = new Date();
            $scope.item.tglJatuhTempo = new Date();

            $scope.item.totalhargasatuan = 0
            $scope.item.totalbiayatambahan = 0
            $scope.item.totaldiskon = 0
            $scope.item.totalppn = 0
            $scope.item.totalharusdibayar = 0
            $scope.dataItem.hargasatuan = 0
            $scope.dataItem.qtyproduk = 0
            $scope.dataItem.hargadiscount = 0
            $scope.dataItem.total = 0
            debugger;
            var idKelompokTransaksi = 0
            $state.params.noRec;
            if ($state.params.noRec == "terima") {
                $scope.judul = true;
                $scope.judul2 = false;
                $scope.btnterima = false;
                $scope.btnkeluar = false;    
                idKelompokTransaksi = 70;
            }
            if ($state.params.noRec == "keluar") {
                $scope.judul = false;
                $scope.judul2 = true;
                $scope.btnterima = false;
                $scope.btnkeluar = false;
                idKelompokTransaksi = 71     
            }
            $scope.dataModelGrid = {};
            $scope.dataItem = {};
            $scope.dataSelectedPengeluaran = {}; 
            $scope.item.tglPembayaran = new Date();
            $scope.columnPengeluaran = [{
                "field": "kelompokProduk",
                "title": "Kelompok Produk",
                "template": "#=kelompokProduk.kelompokProduk#",
                hidden: true
            }, {
                "field": "namaProduk",
                "title": "Nama Produk",
                "template": "#=namaProduk.namaProduk#"
            }, {
                "field": "hargasatuan",
                "title": "Harga",
            }, {
                "field": "satuanstandar",
                "title": "Satuan",
                "template": "#=satuanstandar.satuanStandar#"
            }, {
                "field": "qtyproduk",
                "title": "Qty"
            }, {
                "field": "hargadiscount",
                "title": "Harga Diskon"
            }, {
                "field": "total",
                "title": "Total"
            }, {
                "field": "keterangan",
                "title": "Keterangan"
            }, {
                command: [{
                    name: "edit",
                    text: "Edit"
                }, {
                    name: "destroy",
                    text: "Hapus",
                }]
            }];
            $scope.listppn = [{
                id: "1",
                name: "ppn",
                namaExternal: "Total PPN",
                isChecked: false
            }]
            var ppn;
            $scope.item.pp = {};
            $scope.item.hitungppn = false;
            $scope.checkppn = true;
            $scope.listArrPpn = [];
            $scope.hitungppn = function (data) {
                var isExist = _.find($scope.listArrPpn, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.listArrPpn.push(data);
                    $scope.checkppn = false;
                    $scope.item.pp = 0.1;
                    $scope.item.hitungppn = true;
                } else {
                    $scope.listArrPpn = _.without($scope.listArrPpn, data);
                    $scope.checkppn = true;
                    $scope.item.hitungppn = false;
                }
                HitungTOTALSAJA();
            }
            $scope.total = function() {
                var grid = $('#gridPengeluaran').data('kendoGrid');
                var angkaTotalSatuan = 0;
                var angkaDiskon = 0;
                for (var i = 0; i < grid._data.length; i++) {
                    var hargasatuan =  grid._data[i].hargasatuan;
                    var qtyproduk = grid._data[i].qtyproduk;
                    var hargadiscount = grid._data[i].hargadiscount;
                    var totalHarga = parseInt(hargasatuan) * parseInt(qtyproduk) - parseInt(hargadiscount);
                    var totalSatuan = parseInt(hargasatuan) * parseInt(qtyproduk);
                    grid._data[i].total = totalHarga;
                    angkaTotalSatuan += parseInt(grid._data[i].hargasatuan) * parseInt(grid._data[i].qtyproduk);
                    var hargadiscount = grid._data[i].hargadiscount;
                    angkaDiskon += parseInt(hargadiscount);
                }
                $scope.item.totalhargasatuan = parseInt(angkaTotalSatuan);
                $scope.item.totaldiskon = parseInt(angkaDiskon);
            };
            $scope.mainGridOptions = {
                pageable: true,
                columns: $scope.columnPengeluaran,
                toolbar: [{
                    "name": "create",
                    "text": "Tambah"
                }],
                selectable: "row",
                editable: {
                    mode: "popup",
                    window: {
                        title: "Input Produk"
                    },
                    template: kendo.template($("#popup-editor").html())
                }
            };
            $scope.click = function(selectedItem) {
                var current = selectedItem;
                $scope.dataSelectedPengeluaran = current;
            };
            $scope.dataSource = new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            kelompokProduk: {defaultValue: {id: 1, kelompokProduk: ".: Pilih Produk :."}},
                            jenisProduk: {defaultValue: {id: 1, jenisProduk: ".: Pilih Jenis :."}},
                            detailJenisProduk: {defaultValue: {id: 1, detailJenisProduk: ".: Pilih detail jenis :."}},
                            namaProduk: {defaultValue: {id: 1, namaProduk: ".: Pilih layanan :."}},
                            hargasatuan: {editable: true},
                            satuanstandar: {defaultValue: {id: 1, satuanStandar: ".: Pilih Satuan :."}},
                            qtyproduk: {editable: true},
                            hargadiscount: {editable: true},
                            total: {editable: true}
                        }
                    }
                }
            });
            /*$scope.dataSourceTest = new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "id",
                        fields: {

                        }
                    }
                }
            });*/


            var id = 1;
            var angka = 0;
            $scope.init = function() {
                var angka = 0;
                var grid = $('#gridPengeluaran').data('kendoGrid');
                for (var i = 0; i < grid._data.length; i++) {
                    angka += parseInt(grid._data[i].hargasatuan) * parseInt(grid._data[i].qtyproduk)
                }
                $scope.item.totalhargasatuan = parseInt(angka);
            };
            $scope.initdiskon = function () {
                var angka = 0;
                var grid = $('#gridPengeluaran').data('kendoGrid');
                for (var i = 0; i < grid._data.length; i++) {
                    var hargadiscount = grid._data[i].hargadiscount;
                    angka += parseInt(hargadiscount);
                }
                $scope.item.totaldiskon = parseInt(angka);
            };
            $scope.totalppn = function() {
                if ($scope.checkppn == true) {
                    $scope.item.totalppn = 0;
                }
                else {
                    var totalppn = parseInt($scope.item.totalhargasatuan) + parseInt($scope.item.totalbiayatambahan) - parseInt($scope.item.totaldiskon);
                    $scope.item.totalppn = parseInt(totalppn) * 10 / 100;
                }
            };
            $scope.totalbayar = function() {
                if ($scope.checkppn == true) {
                    var totalbayar = parseInt($scope.item.totalhargasatuan) + parseInt($scope.item.totalbiayatambahan) - parseInt($scope.item.totaldiskon) - 0; 
                    $scope.item.totalharusdibayar = parseInt(totalbayar);
                }
                else {
                    var totalbayar = parseInt($scope.item.totalhargasatuan) + parseInt($scope.item.totalbiayatambahan) - parseInt($scope.item.totaldiskon) - parseInt($scope.item.totalppn); 
                    $scope.item.totalharusdibayar = parseInt(totalbayar);
                }
            };

            //$scope.changeTotalHargaSatuan = function (){
            $scope.$watch('item.totalhargasatuan', function(newValue, oldValue) {
                if (newValue != ""  ) {
                   HitungTOTALSAJA()
                }
            });
            $scope.$watch('item.totalbiayatambahan', function(newValue, oldValue) {
                if (newValue != ""  ) {
                   HitungTOTALSAJA()
                }
            });
            $scope.$watch('dataItem.hargasatuan', function(newValue, oldValue) {
                if (newValue != ""  ) {
                   HITUNGTOTALPOPUP()
                }
            });
            $scope.$watch('dataItem.hargadiscount', function(newValue, oldValue) {
                if (newValue != ""  ) {
                   HITUNGTOTALPOPUP()
                }
            });
            $scope.$watch('dataItem.qtyproduk', function(newValue, oldValue) {
                if (newValue != ""  ) {
                   HITUNGTOTALPOPUP()
                }
            });

            function HITUNGTOTALPOPUP(){
                // $scope.dataItem.hargasatuan = 0
                // $scope.dataItem.qtyproduk = 0
                // $scope.dataItem.hargadiscount = 0
                $scope.dataItem.total = ((parseInt($scope.dataItem.hargasatuan)- parseInt($scope.dataItem.hargadiscount)) * parseInt($scope.dataItem.qtyproduk ))
            }
            function HitungTOTALSAJA(){
                 $scope.item.totalhargasatuan = 0
                    //$scope.item.totalbiayatambahan = 0
                    $scope.item.totaldiskon = 0
                    $scope.item.totalppn = 0
                    $scope.item.totalharusdibayar = 0

                    debugger;
                    var angka = 0;
                    var dsk = 0 ;
                    var grid = $('#gridPengeluaran').data('kendoGrid');
                    for (var i = 0; i < grid._data.length; i++) {
                        angka += parseInt(grid._data[i].hargasatuan) * parseInt(grid._data[i].qtyproduk)
                        dsk += parseInt(grid._data[i].hargadiscount) * parseInt(grid._data[i].qtyproduk)
                    }
                    $scope.item.totalhargasatuan = parseInt(angka);
                    $scope.item.totaldiskon = parseInt(dsk);

                    if ($scope.item.hitungppn == false) {
                        $scope.item.totalppn = 0;
                    }
                    else {
                        var totalppn = parseInt(angka) + parseInt($scope.item.totalbiayatambahan) - parseInt(dsk);
                        $scope.item.totalppn = parseInt(totalppn) * 10 / 100;
                    }
                    var totalbayar = parseInt(angka) + parseInt($scope.item.totalbiayatambahan) - parseInt(dsk) + parseInt($scope.item.totalppn); 
                    $scope.item.totalharusdibayar = parseInt(totalbayar);
            }
            /*$scope.tambahDataPengeluaran = function() {
                var grid = $('#gridPengeluaran').data('kendoGrid');
                id += 1;
                $scope.dataModelGrid[id]= {};
                grid.dataSource.add({
                    id: id
                })
            };*/
            /*$scope.hapusDataPengeluaran = function(data) {
                var data = data;
                $scope.dataSource.remove(data);
            };*/
            $scope.listJenisKelamin = [{
                "id": 1, 
                "jenisKelamin": "Laki-Laki"
            }, {
                "id": 2,
                "jenisKelamin": "Perempuan"
            }];
            mnKeu.getUrlData("service/list-generic/?view=Ruangan&select=id,namaExternal,statusEnabled").then(function(dat) {
                $scope.listData = dat.data;
                $scope.listDataRuanganPerawatan = [];
                for (var i = 0; i < $scope.listData.length; i++) {
                    var statusEnabled = $scope.listData[i].statusEnabled;
                    if (statusEnabled == true) {
                        var daftar = {
                            "id": $scope.listData[i].id,
                            "namaExternal": $scope.listData[i].namaExternal
                        }
                        $scope.listDataRuanganPerawatan.push(daftar);
                    }else {}
                }
            });
            mnKeu.getUrlData("service/list-generic/?view=Kelas&select=id,namaExternal").then(function(dat) {
                $scope.listDataKelas = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=Rekanan&select=id,namaExternal").then(function(dat) {
                $scope.listRekanan = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=KelompokProduk&select=id,kelompokProduk").then(function(dat) {
                $scope.listDataKelompokProduk = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=Produk&select=id,namaExternal").then(function(dat) {
                $scope.listDataProduk = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=KelompokProduk&select=id,kelompokProduk").then(function(dat) {
                $scope.listKelompokProduk = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function(dat) {
                $scope.listSatuanStandar = dat.data
            });
            mnKeu.getUrlData("service/list-generic/?view=JenisProduk&select=id,jenisProduk").then(function(dat) {
                $scope.listJenisProduk = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=DetailJenisProduk&select=id,detailJenisProduk").then(function(dat) {
                $scope.listDetailJenisProduk = dat.data;
            });
            mnKeu.getUrlData("service/list-generic/?view=Produk&select=id,namaProduk").then(function(dat) {
                $scope.listProduk = dat.data;
            });
            $scope.getDataKelompokProduk = function(data) {
                var id = data.id;
                $scope.listJenisProduk = [];
                mnKeu.getUrlData("service/list-generic/?view=JenisProduk&select=id,jenisProduk&criteria=kelompokProdukId&values=" + id).then(function(dat) {
                    $scope.listJenisProduk = dat.data;
                });
            };
            $scope.getDataJenisProduk = function(data) {
                debugger;
                var id = data.id;
                $scope.listDetailJenisProduk = [];
                mnKeu.getUrlData("service/list-generic/?view=DetailJenisProduk&select=id,detailJenisProduk&criteria=jenisProdukId&values=" + id).then(function(dat) {
                    $scope.listDetailJenisProduk = dat.data;
                });
            };
            $scope.getDataDetailJenisProduk = function(data) {
                debugger;
                var id = data.id;
                $scope.listProduk = [];
                mnKeu.getUrlData("service/list-generic/?view=Produk&select=id,namaProduk&criteria=detailJenisProdukId&values=" + id).then(function(dat) {
                    $scope.listProduk = dat.data;
                });
            };
            $scope.kasmasuk = function() {
                var obj = {
                    pageFrom: "PembayaranTagihanNonLayananKasir",
                    noRegistrasi : $scope.item.norec 
                }
                
                $state.go("PenerimaanPembayaranKasir", {
                   dataPasien: JSON.stringify(obj)
                });
            };
            $scope.kaskeluar = function() {
            
             /*var tglJatuhTempo = moment($scope.dataSelected.tglJatuhTempo).format('YYYY-MM-DD');
             var tglTerima= moment($scope.dataSelected.tglTerima).format('YYYY-MM-DD');
             var tglfaktur = moment($scope.dataSelected.tglfaktur).format('YYYY-MM-DD')*/
              // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
              var tempData=""
              +"#Pengeluaran Umum a/n "+$scope.item.keterangan
              +"#"+""
              +"#"+""
              +"#"+""
              +"#"+$scope.item.norec
              +"#"+$scope.item.totalharusdibayar
              +"#PengeluaranUmum"
              //setting caching

              cacheHelper.set('PembayaranTagihan', tempData);
              $state.go('PembayaranTagihan');

            };
            $scope.simpan = function() {
                debugger;
                var grid = $('#gridPengeluaran').data('kendoGrid');
                $scope.strukPengeluaranDetail = [];
                for (var i = 0; i < grid._data.length; i++) {
                    var daftar = {
                        "kdproduk": {
                            "id": grid._data[i].namaProduk.id
                        },
                        "namaproduk": grid._data[i].namaProduk.namaProduk,
                        "hargasatuan": parseInt(grid._data[i].hargasatuan),
                        "satuanstandar": grid._data[i].satuanstandar.satuanStandar,
                        "qtyproduk": parseInt(grid._data[i].qtyproduk),
                        "hargadiscount": parseInt(grid._data[i].hargadiscount),
                        "total": grid._data[i].total,
                        "keterangan": grid._data[i].keterangan
                    }
                    $scope.strukPengeluaranDetail.push(daftar);
                }

                var nocm = ""
                if ($scope.item.noCm != undefined){nocm = $scope.item.noCm}
                var namaPasien = ""
                if ($scope.item.namaPasien != undefined){namaPasien = $scope.item.namaPasien}
                var noReg = ""
                if ($scope.item.noReg != undefined){noReg = $scope.item.noReg}
                var ruangan = ""
                if ($scope.item.ruangan != undefined){ruangan = $scope.item.ruangan.id}
                var namaRekanan = ""
                if ($scope.item.namaRekanan != undefined){namaRekanan = $scope.item.namaRekanan.namaExternal}
                var noFaktur = ""
                if ($scope.item.noFaktur != undefined){noFaktur = $scope.item.noFaktur}
                var noTelp = ""
                if ($scope.item.noTelp != undefined){noTelp = $scope.item.noTelp}
                var data = {
                    "tglstruk": dateHelper.formatDate($scope.item.tglPembayaran, "YYYY-MM-DD"),
                    "keteranganlainnya": $scope.item.keterangan,
                    "hitungppn": $scope.item.hitungppn,
                    "nocm": {
                        "noCm": nocm
                    },
                    "namapasien_klien": namaPasien,
                    "noregistrasi": {
                        "noRegistrasi": noReg
                    },
                    "kdruangan": {
                        "id": ruangan
                    },
                    "namarekanan": namaRekanan,
                    "nofaktur": noFaktur,
                    "tglfaktur": dateHelper.formatDate($scope.item.tglFaktur, "YYYY-MM-DD"),
                    "noteleponfaks": noTelp,
                    "tgljatuhtempo": dateHelper.formatDate($scope.item.tglJatuhTempo, "YYYY-MM-DD"),
                    "totalhargasatuan": $scope.item.totalhargasatuan,
                    "totalbiayatambahan": parseInt($scope.item.totalbiayatambahan),
                    "totaldiscount": $scope.item.totaldiskon,
                    "totalppn": $scope.item.totalppn,
                    "totalharusdibayar": $scope.item.totalharusdibayar,
                    "idKelompokTransaksi": idKelompokTransaksi ,
                    "strukPengeluaranDetail": $scope.strukPengeluaranDetail
                }
                mnKeu.postData(data, "struk-pengeluaran/pengeluaran-umum").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    $scope.item.norec = e.data.data.noRec;
                    
/*                    $scope.item = "";
                    $scope.dataSource = new kendo.data.DataSource({
                        data: []
                    });*/
                });
                if ($state.params.noRec == "terima") {
                        $scope.btnterima = true;
                        $scope.btnkeluar = false;    
                }
                if ($state.params.noRec == "keluar") {
                    $scope.btnterima = false;
                        $scope.btnkeluar = true;     
                    } 
            };
        }
        ]);
});
