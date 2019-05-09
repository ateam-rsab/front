define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarRencanaUsulanPermintaanBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper', 'ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            var idpegawai;
            $scope.item.tglAwal = moment($scope.now).format('YYYY-MM-DD 00:00');
            $scope.item.tglAkhir = moment($scope.now).format('YYYY-MM-DD 23:59');
            $scope.item.PengelolaUrusan = undefined;
            $scope.item.KaInstalasi = undefined;
            $scope.item.Jabatan = undefined;
            $scope.item.JenisJabatan = undefined;
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
                    // debugger;                    
                    var datas = dat.data.datalogin[0];
                    var jabatan = dat.data.jabatanpengelolaurusan[0];
                    var jenisjabatan = dat.data.kainstalasi[0];
                    $scope.item.PengelolaUrusan = jabatan.jenisjabatan;
                    $scope.item.KaInstalasi = jenisjabatan.jenisjabatan;
                    $scope.item.Jabatan = jabatan.jenisjabatan;
                    $scope.item.JenisJabatan = jenisjabatan.jenisjabatan;
                });
            }
            $scope.Tambah = function(){
                $state.go('RencanaUsulanPermintaanBarang')
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
                manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-daftar-rencana-usulan-permintaan?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk +
                    "&nofaktur=" + $scope.item.nofaktur +
                    "&namarekanan=" + $scope.item.namarekanan + produkfk, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var data =  dat.data.daftar;
                    for (var i = 0; i < dat.data.daftar.length; i++) {

                        dat.data.daftar[i].no = i+1 
                        if (dat.data.daftar[i].noverifpengelolaurusan != null) {
                            dat.data.daftar[i].pengelolaurusan = "Telah Diverifikasii";
                        }else{
                            dat.data.daftar[i].pengelolaurusan = "-";
                        }

                        if (dat.data.daftar[i].noverifkepalainstalasi != null) {
                            dat.data.daftar[i].kepalainstalasi = "Telah Diverifikasii";
                        }else{
                            dat.data.daftar[i].kepalainstalasi = "-";
                        }
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
                cacheHelper.set('DaftarRencanaUsulanPermintaanBarangCtrl', chacePeriode);
                
            }

            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }

            $scope.cariFilter = function(){

                init();
            }

            $scope.BatalUsulan = function(){

                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                } 

                // if ($scope.dataSelected.verifikasifk != undefined) {
                //     alert("Pengajuan telah diverifikasi tidak bisa dihapus!")
                //     return;
                // } 

                var data = 
                {
                    norec: $scope.dataSelected.norec,                   
                    norecrealisasi:$scope.dataSelected.norecrealisasi,
                    tglusulan: $scope.dataSelected.tglusulan,
                    nousulan: $scope.dataSelected.nousulan,
                }

                var objSave = {
                    data: data,
                }

                manageLogistikPhp.hapusrencanausulanpermintaanbarang(objSave).then(function (e) {
                    init()
                })
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
                cacheHelper.set('RencanaUsulanPermintaanBarangCtrl', chacePeriode);
                $state.go('RencanaUsulanPermintaanBarang')
            }   

            $scope.BuatUsulan = function(){
                 if ($scope.dataSelected == undefined) {
                    toastr.error('Maaf, Data Belum Dipilih!!!','Info')  
                    return;
                }

                if ($scope.dataSelected.noverifpengelolaurusan == undefined) {
                    toastr.error('Maaf, Data Belum Diverifikasi Pengelola Urusan!!!','Info')  
                    return;
                }

                if ($scope.dataSelected.noverifkepalainstalasi == undefined) {
                    toastr.error('Maaf, Data Belum Diverifikasi Kepala Instalasi!!!','Info')  
                    return;
                }

                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'UsulanDariRencana',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                 cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }     


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
                    "width" : "80px",
                                "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "tglkebutuhan",
                    "title": "Tgl Kebutuhan",
                    "width" : "80px",
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
                    "field": "pengelolaurusan",
                    "title": "Verifikasi Pengelola Urusan",
                    "width" : "100px",
                },
                {
                    "field": "kepalainstalasi",
                    "title": "Verifikasi Kepala Instalasi",
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
            

            $scope.VerifikasiDK = function(){
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
                // debugger;
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

            $scope.VerifikasiPU = function(current){
                if ($scope.dataSelected == undefined) {
                    toastr.error('Maaf, Data Belum Dipilih!!!','Info')  
                    return;
                };           

                if ( $scope.item.PengelolaUrusan !=  $scope.item.Jabatan || $scope.item.Jabatan == undefined) {
                    toastr.error('Maaf, Selain Pengelola Urusan Tidak Bisa Melakukan Verifikasi ini!!!','Info')                           
                    return;
                }

                var data = 
                {
                    verifikasifk:"",
                    norec: $scope.dataSelected.norec,                   
                    norecrealisasi:$scope.dataSelected.norecrealisasi,
                    tglusulan: $scope.dataSelected.tglusulan,
                    nousulan: $scope.dataSelected.nousulan,
                }

                var objSave = {
                    data: data,
                }

                manageLogistikPhp.verifikasipengelolaurusan(objSave).then(function(e) {
                    init();                  
                });   
            }

            $scope.VerifikasiKI = function(current){

                if ($scope.dataSelected == undefined) {
                    toastr.error('Maaf, Data Belum Dipilih!!!','Info')  
                    return;
                };                

                if ( $scope.item.KaInstalasi != $scope.item.JenisJabatan || $scope.item.Jabatan == undefined) {
                    toastr.error('Maaf, Selain Kepala Instalasi Tidak Bisa Melakukan Verifikasi ini!!!','Info')                           
                    return;
                }

                var data = 
                {
                    verifikasifk:"",
                    norec: $scope.dataSelected.norec,                   
                    norecrealisasi:$scope.dataSelected.norecrealisasi,
                    tglusulan: $scope.dataSelected.tglusulan,
                    nousulan: $scope.dataSelected.nousulan,
                }

                var objSave = {
                    data: data,
                }

                manageLogistikPhp.verifikasikepalainstalasi(objSave).then(function(e) {
                    init();                
                });   
            }

//***********************************

}
]);
});
