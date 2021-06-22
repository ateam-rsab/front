define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarBarangKadaluarsaCtrl', ['$sce', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLogistikPhp','$http', 'ModelItemAkuntansi', 'ReportService',
            function($sce, $rootScope, $scope, ModelItem, DateHelper,manageLogistikPhp,$http,modelItemAkuntansi, ReportService) {     
                $scope.isRouteLoading=false;
            var init = function() {
                $scope.dataVOloaded = true;
                $scope.isNext = true;
                $scope.isEdit = false;
                $scope.isReport = true;
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                $scope.now = new Date();
                $scope.item = {
                    kelUser: document.cookie.split(';')[0].split('=')[1]
                };
                if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                    $scope.bukanLogistik = false;
                } else {
                    $scope.bukanLogistik = true;
                }               
                $scope.item.jmlRows = 10
                manageLogistikPhp.getDataTableTransaksi('get-detail-login').then(function(data){
                     $scope.item.tanggal = moment($scope.now).format('YYYY-MM-DD HH:mm')
                     $scope.listRuangan =data.data.ruangan
                     $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                        loadgrid()
                });
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listProduk = data;
                });
            }
            init();
             $scope.cari= function () {
             	  loadgrid()
             	// body...
             }
            $scope.columnGrid = {
            	 toolbar: ["excel"],
                 excel: {
                fileName: "Daftar Barang Kadaluarsa.xlsx",
                filterable: true,
                allPages :true
                 },
            	columns:

               [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px",
                },
                {
                    "field": "id",
                    "title": "Kode Produk",
                    "width" : "50px",
                },
                {
                    "field": "kdsirs",
                    "title": "Kode Sirs",
                    "width" : "50px",
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width" : "120px",
                },
                // {
                //     "field": "asalproduk",
                //     "title": "Asal Produk",
                //     "width" : "80px",
                // },
                {
                    "field": "qtyproduk",
                    "title": "Stok",
                    "width" : "60px",
                },
                {
                    "field": "tglkadaluarsa",
                    "title": "Tanggal Kadaluarsa",
                    "width" : "80px",
                }
           
            ]
             };

            $scope.$watch('item.hargaJual', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    if ($scope.item.hargaJual > 0) {
                        $scope.item.harga = (parseFloat($scope.item.hargaJual) /125)*100
                    }
                }
            });
            $scope.simpan = function(){
                var objSave ={
                    objectprodukfk:$scope.dataSelected.kodeProduk,
                    nostrukterimafk:$scope.dataSelected.nostrukterimafk,
                    harga:$scope.item.harga,
                    norec_spd:$scope.dataSelected.norec_spd,
                    qtyproduk:$scope.item.qtyproduk
                }
                manageLogistikPhp.postubahharga(objSave).then(function(data){
                     $scope.listRuangan =data.data.ruangan

                })
            }
            $scope.klikGrid =function(Data){
                $scope.item.noterima=Data.noTerima
                $scope.item.namaBarang=Data.namaProduk
                $scope.item.harga=Data.harga
                $scope.item.qtyproduk=Data.qtyProduk
            }
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
         
          
            function loadgrid(){
                $scope.isRouteLoading=true;
                var tglKadaluarsa = moment($scope.item.tanggal).format('YYYY-MM-DD 00:00:00');
                let tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD');
                let tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD');   
                var ruanganid = "";
                if ($scope.item.ruangan != undefined) {
                    ruanganid = $scope.item.ruangan.id
                }

                var kdproduk="";
                if ($scope.item.produk !== undefined) {
                    kdproduk = "&kdproduk=" +$scope.item.produk.id;
                }

                // https://smart.rsabhk.co.id:2222/reporting-rsabhk-service/get-barang-kadaluarsa?tglAwal=2021-01-01&tglAkhir=2021-01-31&namaProduk=&X-AUTH-TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpd2FuIn0.XlUDnTLEg75djc9MSg1BrkStcvveR2FYy667eEd66zEIeP6t_nQiLpvNsefgcgi8BOjyhplb70fu47yF0n5EYQ
                ReportService.getListDataNew("get-barang-kadaluarsa?tglAwal=2021-01-01&tglAkhir=2021-01-31&namaProduk=" + $scope.item.produk.namaproduk).then((res) => {
                    console.log(res);
                })
                manageLogistikPhp.getDataTableTransaksi('logistik-stok/get-daftar-barang-kadaluarsa-new?'
                    +'tglkadaluarsa=' + tglKadaluarsa
                    +'&idruangan=' + ruanganid
                    + kdproduk
                  ).then(function(data){
                  	 for (var i = 0; i < data.data.data.length; i++) {
                            data.data.data[i].no =i +1
                        }
                        $scope.isRouteLoading=false;
                        $scope.dataGrid =data.data.data

                })

            }
            
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
          
                     
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
            $scope.cetak = function() {
                var strIdRuangan = $scope.item.ruangan.id;
                
                var stt = 'false'
                if (confirm('View Laporan Data Stok Ruangan? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-barangkadaluarsa=1&strIdRuangan='+strIdRuangan+'&view='+stt+'&user='+$scope.dataLogin.namaLengkap, function(response) {               
                });
                       }
            $scope.batal = function(){
                $scope.item = {};
                init();
            }
        }
    ]);
});