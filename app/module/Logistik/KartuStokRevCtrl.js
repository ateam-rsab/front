define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KartuStokRevCtrl', ['FindProduk', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLogistikPhp', 'ModelItemAkuntansi',
        function(findProduk, $rootScope, $scope, ModelItem, DateHelper,manageLogistikPhp, modelItemAkuntansi) {
            $scope.now = new Date();
            // ModelItem.getDataDummyGeneric("AsalProduk", true).then(function(data) {
            //     $scope.listAsalBarang = data;
            // });
            init();
            modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listNamaBarang = data;
            }); 
           
            function init() {
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
                });
                manageLogistikPhp.getDataTableTransaksi('kartu-stok/getpass').then(function(data){
                    $scope.item.passwordSo = data.data
                });
            }

            // $scope.getDataCombo = function (){

            // }
            
            // $scope.$watch('item.kelompokBarang', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === undefined) return;
            //     $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
            //     $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
            // })
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

            $scope.ProsesCari = function(){
                loadData()
            }
            function loadData() {
                // $scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.from).format('YYYY-MM-DD 00:00:00');
                var tglAkhir = moment($scope.item.until).format('YYYY-MM-DD 23:59:59');
                var ruanganId="";
                if ($scope.item.ruangan !== undefined) {
                    ruanganId ="&ruanganfk=" +$scope.item.ruangan.id
                }
                var kdproduk="";
                if ($scope.item.namaBarang !== undefined) {
                    kdproduk = "&produkfk=" +$scope.item.namaBarang.id;
                }

                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-kartu-stok?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    +ruanganId+kdproduk, true).then(function(data){
                    var datas = data.data;
                    var saldoawal = 0.0;
                    var saldoakhir = 0.0;
                    var saldomasuk = 0.0;
                    var saldokeluar = 0.0;
                    for (var i = 0; i < datas.length; i++) {
                         datas[i].no = i+1;
                         saldoakhir = parseFloat(datas[i].saldoakhir);
                         datas[i].saldoakhir=saldoakhir
                      // if(datas[i].status != ""){
                        if(datas[i].status == true){
                            saldomasuk = parseFloat(datas[i].jumlah);
                            datas[i].saldomasuk = saldomasuk;
                            datas[i].saldokeluar=parseFloat(saldokeluar);
                            saldoawal = (parseFloat(datas[i].saldoakhir)-parseFloat(datas[i].jumlah));
                            datas[i].saldoawal = saldoawal;
                        }else{
                            datas[i].saldomasuk=parseFloat(0);
                            datas[i].saldokeluar=parseFloat(datas[i].jumlah);     
                            datas[i].saldoawal= (parseFloat(datas[i].saldoakhir)+parseFloat(datas[i].jumlah));                          
                        }
                    }
                    // }

                    for (var i in datas){
                        datas[i].saldomasuk=   parseFloat(datas[i].saldomasuk.toFixed(2));
                        datas[i].saldokeluar= parseFloat(datas[i].saldokeluar.toFixed(2)); 
                        datas[i].saldoawal= parseFloat(datas[i].saldoawal.toFixed(2)); 
                        datas[i].saldoakhir= parseFloat(datas[i].saldoakhir.toFixed(2)); 
                    }
                    // for (var i in datas){
                    //     datas[i].saldomasuk=   parseFloat(datas[i].saldomasuk);
                    //     datas[i].saldokeluar=parseFloat(datas[i].saldokeluar);
                    //     datas[i].saldoawal= parseFloat(datas[i].saldoawal);
                    //     datas[i].saldoakhir= parseFloat(datas[i].saldoakhir);
                    // }
                    $scope.daftarKartuStok = new kendo.data.DataSource({
                        data: datas,
                        // pageSize: 20,
                        total: datas.length,
                        serverPaging: false,
                       
                    });
                });


            }
            
            $scope.BatalStokOpname = function(){
                $scope.item.kataKunciPass="";
                $scope.item.kataKunciConfirm="";
                $scope.popUp.close();
            }
            $scope.perbaikiData = function(){
                $scope.popUp.center().open();
            }
            $scope.lanjutkan = function(){
                var ruanganId="";
                if ($scope.item.ruangan !== undefined) {
                    ruanganId =$scope.item.ruangan.id
                }
                var kdproduk="";
                if ($scope.item.namaBarang !== undefined) {
                    kdproduk = $scope.item.namaBarang.id;
                }

                 if ($scope.item.kataKunciPass != $scope.item.passwordSo) {
                    alert('Kata kunci / password salah')
                    $scope.isRouteLoading=false;
                    $scope.popUp.close();
                    return
                }

                $scope.item.kataKunciPass="";
                $scope.item.kataKunciConfirm="";
                $scope.popUp.close();

                var objSave = {
                        "ruanganfk":ruanganId,
                        "produkfk":kdproduk,
                        "tglawal":  moment($scope.item.from).format('YYYY-MM-DD 00:00:00')
                    }
                    manageLogistikPhp.postperbaikikartustok(objSave).then(function(e) {
                        loadData()
                    })
            }

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
                        e.data.tanggalKejadian = DateHelper.getPeriodeFormatted(new Date(e.data.tanggalKejadian));

                        $scope.daftarKartuStok = new kendo.data.DataSource({
                            data: e.data
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
            $scope.columnKartuStok = [
                // {
                //     "field": "ruangan",
                //     "title": "Ruangan",
                //     "width": "10%"
                // },
                 {
                    "field": "no",
                    "title": "No",
                    "width": "5%"
                }, 
                {
                    "field": "tglkejadian",
                    "title": "Tgl Transaksi",
                    "width": 200,
                    type: "date",
                    format: "{0:dd/MM/yyyy}"
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Barang",
                    "width": "25%"
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": "25%"
                }, {
                    "field": "saldoawal",
                    "title": "Saldo Awal",
                    "width": "10%",
                    type: "number",
                    // format: "{0:n0}"
                }, {
                    "field": "saldomasuk",
                    "title": "Saldo Masuk",
                    "width": "10%",
                    type: "number",
                    // format: "{0:n0}"
                    // template: '<span ng-show="dataItem.status">{{dataItem.jumlah}}</span><span ng-show="!dataItem.status">0</span>'
                }, {
                    "field": "saldokeluar",
                    "title": "Saldo Keluar",
                    "width": "10%",
                    type: "number",
                    // format: "{0:n0}"
                    // template: '<span ng-hide="dataItem.status">{{dataItem.jumlah}}</span><span ng-hide="!dataItem.status">0</span>'
                }, {
                    "field": "saldoakhir",
                    "title": "Saldo Akhir",
                    "width": "10%",
                    type: "number",
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