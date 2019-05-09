define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPengajuanPengadaanBarangDirekturCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            var idpegawai='';
            var CheckStatus1='';
            var CheckStatus2='';
            var chekan='';
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarPengajuanPengadaanBarangDirekturCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                init();
             }
             else{
               $scope.item.tglAwal = $scope.now;
               $scope.item.tglAkhir = $scope.now;
               init();
             }
           }
            function loadCombo(){
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listNamaBarang = data;
                }); 
                //  manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-data-combo", true).then(function(dat){
                //     pegawaiUser = dat.data.login[0].objectkelompokuserfk
                //     idpegawai = dat.data.login[0].id
                // });               
            }
            $scope.Tambah = function(){
                $state.go('UsulanPelaksanaanKegiatan')
            }

            $scope.Generate = function(data){
                if (data === true) {                    
                    CheckStatus1=1;
                }else{
                   CheckStatus1='';
                }
            };

            $scope.Generate1 = function(data){
                if (data === true) {                    
                    CheckStatus2=2;
                }else{
                   CheckStatus2='';
                }
            };

            function init() {
                $scope.isRouteLoading=true;
                var ins =""
                if ($scope.item.instalasi != undefined){
                    var ins ="&dpid=" +$scope.item.instalasi.id
                }
                var rg =""
                if ($scope.item.ruangan != undefined){
                    var rg ="&ruid=" +$scope.item.ruangan.id
                }
                var produkfk =""
                if ($scope.item.namaBarang != undefined){
                    var produkfk ="&produkfk=" + $scope.item.namaBarang.id
                }

                var check ='';
                if (CheckStatus1 == '' || CheckStatus1 != undefined) {
                    check = "&StatusVerif=" + CheckStatus1
                }

                var check1= '';
                if (CheckStatus2 == '' || CheckStatus2 != undefined) {
                    check1 = "&StatusVerif=" + CheckStatus2
                }

                chekan='';
                if (check == "&StatusVerif=1" && check1== "&StatusVerif=2") {
                    chekan = "&StatusVerif=" + 1 + "," + 2
                }else if (check != "&StatusVerif=" && check1 == "&StatusVerif=") {
                    chekan = check
                }else if (check1 != "&StatusVerif=" && check == "&StatusVerif=") {
                    chekan = check1
                }

                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("upk/get-daftar-usulan-verifikasi?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk +
                    "&nofaktur=" + $scope.item.nofaktur +
                    "&namarekanan=" + $scope.item.namarekanan +
                    chekan + produkfk, true).then(function(dat){
                        $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                    }
                   $scope.dataGrid = dat.data.daftar;
                   pegawaiUser = dat.data.datalogin
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarPengajuanPengadaanBarangDirekturCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }

            $scope.newSPPB = function(){
                 if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }               
                 var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditOrder',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('OrderBarangSPPBCtrl', chacePeriode);
                $state.go('OrderBarangSPPB', {
                    norec: $scope.dataSelected.norec,
                    noOrder:'EditOrder'
                });
                // $state.go('OrderBarangSPPB')
            }

            $scope.LihatUsulan = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }               
                
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditTerima',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('LihatRincianUsulanCtrl', chacePeriode);
                $state.go('LihatRincianUsulan')
            }

            $scope.CetakRincian = function(){
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.CetakBukti = function(){
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpelaksanaankegiatan=1&nores='+$scope.dataSelected.norec+'&view='+stt, function(response) {
                    //aadc=response;
                });
            }

            $scope.pph = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }

                if ($scope.dataSelected.noverifikasi == undefined) {
                    alert("Data Belum Dibuat UPK!")
                    return;
                }

                if ($scope.dataSelected.nokonfirmasi == undefined) {
                    alert("Data Belum Diverifikasi Anggaran!")
                    return;
                }

                if ($scope.dataSelected.nokonfirmasidk == undefined) {
                    alert("Data Belum Diverifikasi Direktur Keuangan!")
                    return;
                }

                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditTerima',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('PenentuanPpndanPphCtrl', chacePeriode);
                $state.go('PenentuanPpndanPph')
            }                    

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "50px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Usulan",
                    "width" : "90px",
                                "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "tglkebutuhan",
                    "title": "Tgl Kebutuhan",
                    "width" : "90px",
                                "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                },
                {
                    "field": "noorder",
                    "title": "No Usulan",
                    "width" : "110px",
                },
                {
                    "field": "keterangan",
                    "title": "Jenis Usulan",
                    "width" : "120px",
                },
                {
                    "field": "koordinator",
                    "title": "Koordinator Barang",
                    "width" : "95px",
                },
                {
                    "field": "ruangan",
                    "title": "Unit Pengusul",
                    "width" : "120px",
                },
                {
                    "field": "penanggungjawab",
                    "title": "Penanggung Jawab",
                    "width" : "100px",
                },
                {
                    "field": "mengetahui",
                    "title": "Mengetahui",
                    "width" : "100px",
                },
                {
                    "field": "noverifikasi",
                    "title": "No Confirm",
                    "width" : "100px",
                },
                {
                    "field": "tglkonfirmasi",
                    "title": "Tgl Verifikasi",
                    "width" : "90px",
                                "template": "<span class='style-right'>{{formatTanggal('#: tglkonfirmasi #', '')}}</span>"
                },
                {
                    "field": "keteranganlainnya1",
                    "title": "Status Verifikasi",
                    "width" : "100px",
                },
                {
                    "field": "keteranganverifikasi",
                    "title": "Ket Verifikasi",
                    "width" : "100px",
                }
            ];
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "tglkebutuhan",
                            "title": " Kebutuhan",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                        },
                        {
                            "field": "prid",
                            "title": "Kode Produk",
                            "width" : "40px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width" : "90px",
                        },
                        {
                            "field": "spesifikasi",
                            "title": "Spesifikasi",
                            "width" : "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width" : "30px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width" : "20px",
                        },
                        {
                            "field": "qtyprodukkonfirmasi",
                            "title": "Qty Confirm",
                            "width" : "40px",
                        },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width" : "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        },
                        {
                            "field": "hargasatuanquo",
                            "title": "Harga Konfirmasi",
                            "width" : "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
                        },
                        {
                            "field": "hargappnquo",
                            "title": "ppn Konfirmasi",
                            "width" : "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargappnquo #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscountquo",
                            "title": "Diskon Konfirmasi",
                            "width" : "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscountquo #', '')}}</span>"
                        },
                        {
                            "field": "totalkonfirmasi",
                            "title": "Total Confirm",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                        }
                    ]
                }
            };  
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
            }
            function itungUsia(tgl){
                debugger;
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih/(1000*60*60*24*365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn '// + bln + ' bln'
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
//***********************************

}
]);
});
