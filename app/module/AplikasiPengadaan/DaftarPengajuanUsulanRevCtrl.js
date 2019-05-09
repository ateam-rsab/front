define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanUsulanRevCtrl', [ 'ModelItem','$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
		function(ModelItem,$q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {			
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			$scope.item.tglAwal = new moment($scope.now).format('YYYY-MM-DD 00:00');
			$scope.item.tglAkhir = new moment($scope.now).format('YYYY-MM-DD 23:59');
			$scope.pegawai = ModelItem.getPegawai();		
	        var pegawaiUser = '';
	        var idpegawai='';
	        $scope.item.KelompokUserId=0;
	        var norecAjukan='';	
	        LoadCache();
            loadCombo();

	        function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarPengajuanUsulanRevCtrl');
                if(chacePeriode != undefined){
                        $scope.item.tglAwal = new Date(chacePeriode[0]);
                        $scope.item.tglAkhir = new Date(chacePeriode[1]);
                        init();
                }else{
                   $scope.item.tglAwal = new moment($scope.now).format('YYYY-MM-DD 00:00');
                   $scope.item.tglAkhir = new moment($scope.now).format('YYYY-MM-DD 23:59');
                   init();
                }               
            }

            function loadCombo(){
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listNamaBarang = data;
                }); 
                modelItemAkuntansi.getDataDummyPHP("upk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function(data) {
                    $scope.listPegawaiMenyetujui= data;
                })
                manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-data-combo", true).then(function(dat){
                    pegawaiUser = dat.data.login[0].objectkelompokuserfk
                    idpegawai = dat.data.login[0].id
                });               
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
                manageLogistikPhp.getDataTableTransaksi("anggaran/get-daftar-usulan-anggaran?"+
                        "tglAwal=" + tglAwal + 
                        "&tglAkhir=" + tglAkhir +
                        "&nostruk=" + $scope.item.struk +
                        "&nofaktur=" + $scope.item.nofaktur +
                        "&namarekanan=" + $scope.item.namarekanan
                        + produkfk
                        , true).then(function(dat){
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
                cacheHelper.set('DaftarPengajuanPengadaanBarangPengendaliCtrl', chacePeriode);
            }

            $scope.SearchData = function(){

                init();
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
                    "field": "asalproduk",
                    "title": "Sumber Dana",
                    "width" : "100px",
                },
                {
                    "field": "mataanggaran",
                    "title": "Mata Anggaran",
                    "width" : "120px",
                },
                {
                    "field": "noverifikasianggaran",
                    "title": "Verifikasi Anggaran",
                    "width" : "120px",
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

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
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

            $scope.lihatDetail = function(){
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
                cacheHelper.set('LihatRincianUsulanAnggaranCtrl', chacePeriode);
                $state.go('LihatRincianUsulanAnggaran')
            }
			
		}
	]);
});