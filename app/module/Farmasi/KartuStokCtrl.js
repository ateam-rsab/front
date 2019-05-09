define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KartuStokCtrl', ['FindProduk', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLogistikPhp',
        function(findProduk, $rootScope, $scope, ModelItem, DateHelper,manageLogistikPhp) {
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("AsalProduk", true).then(function(data) {
                $scope.listAsalBarang = data;
            });
            var init = function() {
                 $scope.item = {
                    kelUser: document.cookie.split(';')[0].split('=')[1],
                    from: $scope.now,
                    until: $scope.now
                }
                findProduk.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                    $scope.item.ruangan = dat.data.data;
                });
                if ($scope.item.kelUser !== "logistik")
                    $scope.isUnit =  true;
                
                $scope.daftarKartuStok = new kendo.data.DataSource({
                    data: []
                });
                manageLogistikPhp.getDataTableTransaksi('get-detail-login').then(function(data){
                    $scope.listRuangan =data.data.ruangan
                    $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                    $scope.listKelompokBarang = data.data.kelompokproduk
                    $scope.item.kelompokBarang = {id:24,kelompokproduk:'Barang Persediaan'}

                })
                // console.log($scope.item.kelUser);
            }
            init();
            // $scope.Proses = function() {
            //     findProduk.getKartuStok($scope.item.namaBarang === undefined || $scope.item.namaBaran==null ? '' : $scope.item.namaBarang.id, moment($scope.item.from).format('YYYY-MM-DD') + ' 00:00:00', moment($scope.item.until).format('YYYY-MM-DD') + ' 23:59:59').then(function(e) {
            //         $scope.daftarKartuStok = new kendo.data.DataSource({
            //             data: ModelItem.beforePost(e.data.data)
            //         });
            //     })
            // }
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
            })
            // $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            // $scope.item.kelompokBarang = {id:$scope.listKelompokBarang[0].id,kelompokProduk:$scope.listKelompokBarang[0].kelompokProduk}
            // findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
            //     $scope.sourceRuangan = data;
            //     // debugger;
            // });
            // findProduk.getListRuangan("Produk&select=id,namaProduk").then(function(data) {
            //     $scope.listNamaBarang = data;
            //     // debugger;
            // });
            $scope.Proses = function() {
                var listRawRequired = [
                    "item.ruangan|k-ng-model|Ruangan",
                    "item.from|k-ng-model|Periode awal",
                    "item.until|k-ng-model|Periode akhir",
                    "item.until|k-ng-model|Periode akhir",
                    "item.kelompokBarang|k-ng-model|Kelompok produk",
                    "item.namaBarang|k-ng-model|Nama produk"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){

                // if (!$scope.item.ruangan || !$scope.item.namaBarang) {
                //     window.alert("Silahkan pilih ruangan dan produk terlebih dahulu");
                //     return;
                // }
                    var from, until, ruanganId, produkId;

                    if (!$scope.item.from && !$scope.item.until) {
                        from = '';
                        until = '';
                    } else {
                        from = DateHelper.getPeriodeFormatted(new Date($scope.item.from));
                        until = DateHelper.getPeriodeFormatted(new Date($scope.item.until));
                    }

                    if (!$scope.item.ruangan) {
                        ruanganId = ''
                    } else {
                        ruanganId = $scope.item.ruangan.id
                    }

                    if (!$scope.item.namaBarang) {
                        produkId = ''
                    } else {
                        produkId = $scope.item.namaBarang.id
                    }

                    findProduk.getKartuStokSRO(from, until, ruanganId, produkId).then(function(e) {
                        // console.log(JSON.stringify(e.data));
                        // e.data.tanggalKejadian = DateHelper.getPeriodeFormatted(new Date(e.data.tanggalKejadian));
                        var datas = e.data;
                        for (var i in datas){
                            datas.tanggalKejadian = DateHelper.getPeriodeFormatted(new Date(datas[i].tanggalKejadian));
                            datas[i].stokMasuk=   datas[i].stokMasuk.toFixed(2);
                            datas[i].stokKeluar= datas[i].stokKeluar.toFixed(2); 
                            datas[i].stokAwal= datas[i].stokAwal.toFixed(2); 
                            datas[i].saldoAhir= datas[i].saldoAhir.toFixed(2); 
                            // datas[i].tanggalKejadian = DateHelper.getPeriodeFormatted(new Date(datas[i].tanggalKejadian));
                        }
                        // for (var i in datas){
                        //     datas.tanggalKejadian = DateHelper.getPeriodeFormatted(new Date(datas[i].tanggalKejadian));
                        //     datas[i].stokMasuk=   parseFloat(datas[i].stokMasuk);
                        //     datas[i].stokKeluar= parseFloat(datas[i].stokKeluar);
                        //     datas[i].stokAwal= parseFloat(datas[i].stokAwal); 
                        //     datas[i].saldoAhir= parseFloat(datas[i].saldoAhir);
                        // }
                        $scope.daftarKartuStok = new kendo.data.DataSource({
                            data: datas//e.data
                        });

                        debugger;
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            // $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat-data', true);
            $scope.enableNamaBarang = false;
            // $scope.daftarKartuStok = new kendo.data.DataSource({
            //     data: []
            // });

            $scope.formatnumber = function (value, currency) {
                return parseFloat(value)
              }
            $scope.columnKartuStok = [
                // {
                //     "field": "ruangan",
                //     "title": "Ruangan",
                //     "width": "10%"
                // },
                //  {
                //     "field": "noRec",
                //     "title": "No Bukti",
                //     "width": "10%"
                // }, 
                {
                    "field": "tanggalKejadian",
                    "title": "Tgl Transaksi",
                    "width": 200,
                    type: "date",
                    format: "{0:dd/MM/yyyy}"
                },
                {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    "width": "25%"
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": "25%"
                }, {
                    "field": "stokAwal",
                    "title": "Saldo Awal",
                    "width": "10%",
                    type: "number",
                    "template": "<span class='style-right'>{{formatnumber('#: stokAwal #', '.')}}</span>",
                    // format: "{0:n0}"
                }, {
                    "field": "stokMasuk",
                    "title": "Saldo Masuk",
                    "width": "10%",
                    type: "number",
                    "template": "<span class='style-right'>{{formatnumber('#: stokMasuk #', '.')}}</span>",
                    // format: "{0:n0}"
                    // template: '<span ng-show="dataItem.status">{{dataItem.jumlah}}</span><span ng-show="!dataItem.status">0</span>'
                }, {
                    "field": "stokKeluar",
                    "title": "Saldo Keluar",
                    "width": "10%",
                    type: "number",
                    "template": "<span class='style-right'>{{formatnumber('#: stokKeluar #', '.')}}</span>",
                    // format: "{0:n0}"
                    // template: '<span ng-hide="dataItem.status">{{dataItem.jumlah}}</span><span ng-hide="!dataItem.status">0</span>'
                }, {
                    "field": "saldoAhir",
                    "title": "Saldo Akhir",
                    "width": "10%",
                    type: "number",
                    "template": "<span class='style-right'>{{formatnumber('#: saldoAhir #', '.')}}</span>",
                    // format: "{0:n0}"
                    // template: '<span ng-show="!dataItem.status">{{dataItem.saldoAwal - dataItem.jumlah}}</span><span ng-hide="!dataItem.status">{{dataItem.saldoAwal + dataItem.jumlah}}</span>'
                }
            ];

            $scope.batal = function(){
                init();
            }
        }
    ]);
});