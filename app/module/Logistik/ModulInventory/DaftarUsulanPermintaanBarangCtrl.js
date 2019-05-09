define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarUsulanPermintaanBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper', 'ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            var idpegawai;
            $scope.item.tglAwal = moment($scope.now).format('YYYY-MM-DD 00:00');
            $scope.item.tglAkhir = moment($scope.now).format('YYYY-MM-DD 23:59');
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarPermintaanBarangCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                init();
             }else{
               $scope.item.tglAwal = moment($scope.now).format('YYYY-MM-DD 00:00');
               $scope.item.tglAkhir = moment($scope.now).format('YYYY-MM-DD 23:59');
               init();
             }
           }
            function loadCombo(){
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listNamaBarang = data;
                }); 
                manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-data-combo", true).then(function(dat){
                    pegawaiUser = dat.data.login[0].objectkelompokuserfk
                    idpegawai = dat.data.login[0].id
                    if (pegawaiUser == 25) {
                        $scope.tombol1 =true;
                        $scope.tombol = false;
                        $scope.tombol2 = false;
                    }else if (pegawaiUser == 34) {
                        $scope.tombol1 =false;
                        $scope.tombol = false;
                        $scope.tombol2 = true;
                    }
                    else{
                        $scope.tombol1 =false;
                        $scope.tombol = true;
                        $scope.tombol2 = false;
                    }
                });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function(){
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }
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
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-daftar-usulan-permintaan?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk +
                    "&nofaktur=" + $scope.item.nofaktur +
                    "&namarekanan=" + $scope.item.namarekanan
                    + produkfk
                    , true).then(function(dat){
                        $scope.isRouteLoading=false;
                        var data =  dat.data.daftar;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                        // var tanggal = $scope.now;
                        // var tanggalLahir = new Date(dat.data.daftar[i].tgllahir);
                        // var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        // dat.data.daftar[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
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
                cacheHelper.set('DaftarPermintaanBarangCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }

            $scope.newUPK = function(){

                // if ($scope.dataSelected.nokonfirmasi == undefined) {
                //     alert("Data Belum Diverifikasi Anggaran!!")
                //     return;
                // }

                 var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditTerima',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('UsulanPelaksanaanKegiatanCtrl', chacePeriode);
                $state.go('UsulanPelaksanaanKegiatan')
            }

            $scope.BatalUsulan = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }

                if ($scope.dataSelected.noverifikasi != undefined || $scope.dataSelected.nokonfirmasi != undefined || $scope.dataSelected.nokonfirmasidk != undefined) {
                    alert("Data Sudah Diverifikasi!")
                    return;
                }         

                var data = 
                {
                    nousulan:  $scope.dataSelected.nousulan, 
                    norec: $scope.dataSelected.norec,                 
                    tglbatal : moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
                }

                var objSave = {
                    data: data,
                }

                manageLogistikPhp.hapususulanpermintaanbarang(objSave).then(function (e) {
                    init()
                })
            }

            // $scope.TransaksiPelayanan = function(){
            //     debugger;
            //     var arrStr ={ 0 : $scope.dataSelected.nocm ,
            //         1 : $scope.dataSelected.namapasien,
            //         2 : $scope.dataSelected.jeniskelamin,
            //         3 : $scope.dataSelected.noregistrasi, 
            //         4 : $scope.dataSelected.umur,
            //         5 : $scope.dataSelected.klid,
            //         6 : $scope.dataSelected.namakelas,
            //         7 : $scope.dataSelected.tglregistrasi,
            //         8 : $scope.dataSelected.norec_apd,
            //         9 : 'resep'
            //     }
            //     cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
            //     $state.go('TransaksiPelayananApotik')

            //     var arrStr2 ={ 0 : $scope.dataSelected.norec 
            //     }
            //     cacheHelper.set('DaftarResepCtrl', arrStr2);
            //     $state.go('DaftarResepCtrl')
            // }

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
            $scope.CetakBuktiLayanan = function(){
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
            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View Bukti Usulan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&nores='+$scope.dataSelected.norec+'&view='+stt, function(response) {
                    //aadc=response;
                });
            }
            
            $scope.EditTerima = function(){
                 if ($scope.dataSelected.noverifikasi) {
                     alert("Data Sudah Diverifikasi!!")
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
                cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }

            $scope.HapusPenerimaan = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                if ($scope.dataSelected.nosbm != undefined) {
                    alert("Sudah di bayar tidak dapat di hapus!!")
                    return;
                }
                var stt = 'false'
                if (confirm('Hapus Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?"+"norec_sp=" + $scope.dataSelected.norec, true).then(function(dat){
                    init()
                });
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
                    "width" : "40px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Usulan",
                    "width" : "100px",
                                "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "tglkebutuhan",
                    "title": "Tgl Kebutuhan",
                    "width" : "100px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                },
                {
                    "field": "noorder",
                    "title": "No Usulan",
                    "width" : "100px",
                },
                {
                    "field": "keterangan",
                    "title": "Jenis Usulan",
                    "width" : "100px",
                },
                {
                    "field": "koordinator",
                    "title": "Koordinator Barang",
                    "width" : "80px",
                },
                {
                    "field": "ruangan",
                    "title": "Unit Pengusul",
                    "width" : "100px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "Unit Tujuan",
                    "width" : "100px",
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
                    "title": "No UPK",
                    "width" : "100px",
                }
                // {
                //     "field": "tglverifikasi",
                //     "title": "Tgl Verifikasi",
                //     "width" : "100px",
                //     "template": "<span class='style-right'>{{formatTanggal('#: tglverifikasi #', '')}}</span>"
                // },
                // {
                //     "field": "nokonfirmasi",
                //     "title": "No Verif Anggaran",
                //     "width" : "100px",
                // },
                // {
                //     "field": "tglkonfirmasi",
                //     "title": "Tgl Verifikasi Anggaran",
                //     "width" : "100px",
                //     "template": "<span class='style-right'>{{formatTanggal('#: tglkonfirmasi #', '')}}</span>"
                // },
                // {
                //     "field": "nokonfirmasidk",
                //     "title": "No Verif Dk",
                //     "width" : "100px",
                // },
                // {
                //     "field": "tglkonfirmasidk",
                //     "title": "Tgl Verifikasi Dk",
                //     "width" : "100px",
                //     "template": "<span class='style-right'>{{formatTanggal('#: tglkonfirmasidk #', '')}}</span>"
                // }
            ];
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "tglkebutuhan",
                            "title": "Tgl Kebutuhan",
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
                            "width" : "120px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width" : "80px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width" : "20px",
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

            $scope.VerifikasiAnggaran = function(){
                debugger;
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }

                // if ($scope.dataSelected.noverifikasi != undefined) {
                //     alert("Data Belum DiVerifikasi Pengendali!!")
                //     return;
                // }

                var strukverifikasi = {
                    tglconfirm: moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
                    objectpegawaipjawabfk:idpegawai,
                    // objectruanganfk:$scope.item.ruanganTujuan.id,
                    norec:$scope.dataSelected.norec,
                    norecrealisasi:$scope.dataSelected.norecrealisasi
                }

                var objSave = 
                    {                       
                        strukverifikasi:strukverifikasi,                    
                    }     
                    manageLogistikPhp.saveverifanggaran(objSave).then(function(e) {
                        $scope.item.noKirim = e.data.nokirim
                    });      
            }

            $scope.VerifikasiDK = function(){
                debugger;
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }

                if ($scope.dataSelected.nokonfirmasi == undefined) {
                    alert("Data Belum DiVerifikasi anggaran!!")
                    return;
                }

                 if ($scope.dataSelected.noverifikasi == undefined) {
                    alert("Data Belum Dibuat UPK!!")
                    return;
                }

                var strukverifikasi = {
                    tglconfirm: moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
                    objectpegawaipjawabfk:idpegawai,
                    // objectruanganfk:$scope.item.ruanganTujuan.id,
                    norec:$scope.dataSelected.norec,
                    norecrealisasi:$scope.dataSelected.norecrealisasi
                }

                var objSave = 
                    {                       
                        strukverifikasi:strukverifikasi,                    
                    }     
                    manageLogistikPhp.saveverifdk(objSave).then(function(e) {
                        $scope.item.noKirim = e.data.nokirim
                    });      
            }

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
