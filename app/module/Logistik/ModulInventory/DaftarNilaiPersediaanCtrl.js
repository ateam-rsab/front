define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarNilaiPersediaanCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp',
        function($q, $rootScope, $scope,manageLogistikPhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.isRouteLoading=false;
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            loadCombo();
            
            function loadCombo(){
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-ruanganbyid?&idruangan="+$scope.dataLogin.ruangan.id, true).then(function(dat){
                    $scope.item.ruangan = dat.data.data[0];
                    init();
                });
                manageLogistikPhp.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function(dat){
                    $scope.listRuangan = dat.data.ruangan
                });
            }
            function init() {
                $scope.isRouteLoading=true;
                var id ="";
                if ($scope.item.idProduk != undefined){
                    var id =$scope.item.idProduk
                }
                var produk ="";
                if ($scope.item.namaProduk != undefined){
                    var produk =$scope.item.namaProduk
                }
                var ruangan ="";
                if ($scope.item.ruangan != undefined){
                    var ruangan =$scope.item.ruangan.id
                }

                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-nilai-persediaan?"+
                    "&idproduk=" + id + 
                    "&namaproduk=" + produk +
                    "&idruangan=" + ruangan
                    , true).then(function(dat){
                    $scope.isRouteLoading=false;
                    $scope.dataGrid = new kendo.data.DataSource({
                        pageSize: 12,
                        data:dat.data.data
                    });
                });

            }

            $scope.mainGridOptions = {
                pageable: true,
                pagesize: true,
                scrollable:false,
                columns: [
                    {
                        "field": "id",
                        "title": "ID Produk",
                        "width" : "20px"
                    },
                    {
                        "field": "namaproduk",
                        "title": "Nama Produk",
                        "width" : "200px"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Nama Ruangan",
                        "width" : "150px"
                    },
                    {
                        "field": "satuanstandar",
                        "title": "Satuan",
                        "width" : "50px"
                    },
                    {
                        "field": "hargasatuan",
                        "title": "Harga Satuan",
                        "width" : "100px",
                        "template": "<span class='style-left'>{{formatRupiah('#: hargasatuan #', 'Rp.')}}</span>"
                    },
                    {
                        "field": "qtyproduk",
                        "title": "Qty",
                        "width" : "30px"
                    },
                    {
                        "field": "total",
                        "title": "Total",
                        "width" : "150px",
                        "template": "<span class='style-left'>{{formatRupiah('#: total #', 'Rp.')}}</span>"
                    }
                ]
            }

            $scope.cari = function (){
                init();
            }
            $scope.enter = function($event){
                var keyCode = $event.which || $event.keyCode;
                if (keyCode === 13) {
                    init()
                }
            }

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }

            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View Bukti Kirim? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
//***********************************

}
]);
});
