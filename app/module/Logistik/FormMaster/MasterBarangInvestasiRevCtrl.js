define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterBarangInvestasiRevCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'ManageSarpras', 'DateHelper', 'IPSRSService', 'ManageLogistikPhp', 'CacheHelper', 'ModelItemAkuntansi',
		function($rootScope, $scope, $state, ModelItem, manageSarpras, DateHelper, IPSRSService, manageLogistikPhp, cacheHelper, modelItemAkuntansi) {
			$scope.item = {};
            $scope.isUnitt=true;
			var norecNoAsset =''
			var JenisOrder = '';
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.isRouteLoading = false;
            var norecNoAsset = '';
            var JenisOrder = '';
			loadDataCombo();
			LoadCache();

            $scope.monthSelectorOptions = function() {
                return {
                    start: "year",
                    depth: "year"
                }
            }

			function loadDataCombo(){
				manageLogistikPhp.getDataTableTransaksi("aset/get-combo-aset", true).then(function(data) {
					$scope.ListRuanganAsal = data.data.ruangan;
					$scope.ListRuangan =  data.data.ruangan;
					$scope.ListJenisProduk =  data.data.jenisproduk;
					$scope.ListDetailJenis =  data.data.detailjenisproduk;
					$scope.ListFungsiProduk = data.data.fungsiproduk;
					$scope.ListBahanProduk = data.data.bahanproduk;
					$scope.ListTypeProduk = data.data.tipeproduk;
					$scope.ListWarnaProduk = data.data.warna;
					$scope.ListMerkProduk = data.data.merkproduk;
					$scope.ListSatuanStandar = data.data.satuan; //data.data.satuanaset;
					$scope.ListJenisSertifikat = data.data.jenissertifikat;
					$scope.ListPegawai = data.data.pegawai;
					$scope.ListProdusenProduk = data.data.produsen;
					$scope.ListRekanan = data.data.rekanan;
					$scope.ListAsalBarang = data.data.asalproduk;
					$scope.ListPegawaiBPKB = data.data.pegawai;
					$scope.ListKelompokAset = data.data.kelompokaset;
				});

                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listProduk = data;
                });
				
				modelItemAkuntansi.getDataDummyPHP("aset/get-daftar-desa", true, true, 20).then(function(data) {
                   $scope.ListDataKelurahan =  data;
                });

				modelItemAkuntansi.getDataDummyPHP("aset/get-daftar-kecamatan", true, true, 20).then(function(data) {
                   $scope.ListDataKecamatan =  data;
                });

                modelItemAkuntansi.getDataDummyPHP("aset/get-daftar-kabupaten", true, true, 20).then(function(data) {
                   $scope.ListDataKotaKabupaten =  data;
                });

                modelItemAkuntansi.getDataDummyPHP("aset/get-daftar-provinsi", true, true, 20).then(function(data) {
                	$scope.ListDataProvinsi =  data;
                });

                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-combo-transfer",true).then(function(data){
                    // $scope.sourceRuangan = data.data.ruangan;
                    // $scope.ListRuangan =  data.data.ruangan;
                    // $scope.item.ruangan = {id:$scope.ListRuangan[0].id,namaruangan:$scope.ListRuangan[0].namaruangan};
                    
                })
			}

			function LoadCache(){
                // debugger;
                var chacePeriode = cacheHelper.get('MasterBarangInvestasiRevCtrl');
                if(chacePeriode != undefined){
                   norecNoAsset = chacePeriode[0]
                   JenisOrder = chacePeriode[1]
                    $scope.item.TglRegistrasi = moment($scope.now).format('YYYY-MM-DD HH:mm');
                    $scope.item.TglProduksi  = moment($scope.now).format('YYYY-MM-DD HH:mm');
                   if (norecNoAsset == '') {
                     $scope.isUnit=false;
                     // getDataLain();
                   }else{
                     $scope.isUnit = true;
                      load();
                   }
                   
                  
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('MasterBarangInvestasiRevCtrl', chacePeriode);
                }else{
                    $scope.item.TglRegistrasi = moment($scope.now).format('YYYY-MM-DD HH:mm');
                    $scope.item.TglProduksi  = moment($scope.now).format('YYYY-MM-DD HH:mm');
                    load();
                    // getDataLain();
                    $scope.isUnit=false;
                }
	        }

            $scope.getDataLain = function(){
                var produkId ='';
                if($scope.item.produk != undefined){
                    produkId=$scope.item.produk.id;
                }
                manageLogistikPhp.getDataTableTransaksi("aset/get-barang-for-regis?"+"kodeproduk="+produkId, true).then(function(data) {
                    var datas = data.data.datas[0];
                    $scope.item.kdProduk = datas.kodeproduk;
                    $scope.item.jenisProduk={id:datas.jpid ,jenisproduk:datas.jenisproduk};
                    $scope.item.detailJenisProduk={id:datas.djpid ,detailjenisproduk:datas.detailjenisproduk};
                    $scope.item.satuanStandar={id:datas.ssid ,satuanstandar:datas.satuanstandar};
                    $scope.item.Lebar=0;
                    $scope.item.Panjang=0;
                    $scope.item.Tinggi=0;
                    $scope.item.Listrik=0;
                    $scope.item.UsiaPakai=0;
                    $scope.item.UsiaTeknis=0;
                    $scope.item.SisaUmur=0;
                    $scope.item.TglProduksi=$scope.now;
                    $scope.item.MasaBerlakuSertifikat=0;
                    $scope.item.HargaPengadaan=0;
                    $scope.item.TahunPerolehan=moment($scope.now).format('YYYY');
                    $scope.item.TglRegistrasi=moment($scope.now).format('YYYY-MM-DD HH:mm');
                });
            }

			function load(){
                if (JenisOrder != '') {
                        if (JenisOrder == 'InputDetailAsset') {
                        	$scope.isRouteLoading=true;
                        	manageLogistikPhp.getDataTableTransaksi("aset/get-detail-registrasiasset?"+"norecAsset="+norecNoAsset, true).then(function(data) {
                        		var datas = data.data.datas[0];
                        		// * UMUM
                        		$scope.item.noRegisterAset=datas.noregisteraset;
                        		$scope.item.kdProduk=datas.idproduk;
                        		$scope.item.kodeBmn=datas.kodebmn;
                        		$scope.item.kdEksternal=datas.kodeexternal;
                        		$scope.item.kdAspak=" ";
                                $scope.item.noaset=datas.noregisteraset_int;
                                $scope.item.TahunPerolehan=datas.tahunperolehan;
                        		// $scope.item.kdRs=datas.kdproduk;
                                $scope.item.produk = {id:datas.idproduk,namaproduk:datas.namaproduk};
                        		// $scope.item.namaProduk=datas.namaproduk;
                        		$scope.item.ruanganAsal={id:datas.ruanganasalfk,namaruangan:datas.namaruanganasal};
                        		$scope.item.ruangan={id:datas.ruangancurrenfk,namaruangan:datas.ruangancurrent};
                        		$scope.item.TahunPerolehan=datas.tahunperolehan;
                                $scope.item.TglRegistrasi = moment(datas.tglregisteraset).format('YYYY-MM-DD HH:mm');
                                $scope.item.HargaPengadaan = datas.hargaperolehan;
                        		// * END UMUM

                        		// * ALAMAT
				        		// $scope.item.alamatLengkap="";
				        		// $scope.item.kodePos="";
				        		// $scope.item.desaKelurahan="";
				        		// $scope.item.kecamatan="";
				        		// $scope.item.kotaKabupaten="";
				        		// $scope.item.propinsi="";
				        		// * END ALAMAT

                        		// * KATEGORY
                        		$scope.item.jenisProduk={id:datas.jpid ,jenisproduk:datas.jenisproduk};
                        		$scope.item.detailJenisProduk={id:datas.djpid ,detailjenisproduk:datas.detailjenisproduk};
                        		$scope.item.asalproduk={id:datas.apid,asalproduk:datas.asalproduk};
                        		$scope.item.kelompokaset={id:datas.kaid,kelompokaset:datas.kelompokaset};
                        		// * END KATEGORY

                        		// * SPESIFIKASI
                                //$scope.item.fungsiProduk="";
				        		// $scope.item.bahanProduk="";
				        		// $scope.item.typeProduk="";
				        		// $scope.item.warnaProduk="";
				        		// $scope.item.merkProduk="";
				        		// $scope.item.spesifikasi="";
				        		$scope.item.Lebar=0;
				        		$scope.item.Panjang=0;
					        	$scope.item.Tinggi=0;
				        		$scope.item.Listrik=0;
				        		// $scope.item.Teknologir="";
                                $scope.item.NoSeri = datas.noseri;
                                $scope.item.sisaumur = datas.sisaumur
                                $scope.item.merkProduk={id:datas.merkid,merkproduk:datas.merkproduk};
                                $scope.item.typeProduk={id:datas.typeid,typeproduk:datas.typeproduk};
				        		$scope.item.UsiaPakai=0;
				        		$scope.item.UsiaTeknis=0;
				        		$scope.item.TglProduksi=$scope.now;
                        		// * END SPESIFIKASI

                        		// * SATUAN
                        		// $scope.item.satuanStandar="";
                        		// * END SATUAN

                        		// * KENDARAAN
				        		// $scope.item.NoMesin="";
				        		// $scope.item.NoBPKB="";
				        		// $scope.item.NoModel="";
				        		// $scope.item.NoRangka="";
				        		// $scope.item.NoSeri="";
				        		// $scope.item.NoPolisi="";
				        		// $scope.item.BPKBPegawai="";
				        		// * END KENDARAAN

				        		// * SERTIFIKAT
				        		// $scope.item.JenisSertifikat="";
				        		// $scope.item.NoSertifikat="";
				        		// $scope.item.Pegawai="";
				        		$scope.item.MasaBerlakuSertifikat=0;
				        		// * END SERTIFIKAT

                        		// * REKANAN
                        		$scope.item.rekanan = {id:datas.idsupplier ,namarekanan:datas.namasupplier};
                        		// $scope.item.item.produsenProduk= "";
                        		// * END REKANAN
                        		$scope.isRouteLoading=false;
                        	})
                        }
                    }
			}

			function Kosongkan(){

	            // * UMUM
        		$scope.item.noRegisterAset="";
        		$scope.item.kdProduk="";
        		$scope.item.kodeBmn="";
        		$scope.item.kdEksternal="";
        		$scope.item.kdAspak="";
        		$scope.item.kdRs="";
        		$scope.item.produk="";
        		$scope.item.ruanganAsal=undefined;
        		$scope.item.ruangan=undefined;
        		$scope.item.TahunPerolehan="";
                $scope.item.HargaPengadaan="";
                $scope.item.TglRegistrasi=$scope.now;
                $scope.item.noaset = "";
        		// * END UMUM

        		// * ALAMAT
        		$scope.item.alamatLengkap="";
        		$scope.item.kodePos="";
        		$scope.item.desaKelurahan=undefined;
        		$scope.item.kecamatan=undefined;
        		$scope.item.kotaKabupaten=undefined;
        		$scope.item.propinsi=undefined;
        		// * END ALAMAT

        		// * KATEGORY
        		$scope.item.jenisProduk=undefined;
        		$scope.item.detailJenisProduk=undefined;
        		$scope.item.asalproduk=undefined;
        		$scope.item.kelompokaset=undefined;
        		// * END KATEGORY

        		// * SPESIFIKASI
        		$scope.item.fungsiProduk=undefined;
        		$scope.item.bahanProduk=undefined;
        		$scope.item.typeProduk=undefined;
        		$scope.item.warnaProduk=undefined;
        		$scope.item.merkProduk=undefined;
        		$scope.item.spesifikasi=undefined;
        		$scope.item.Lebar=0;
        		$scope.item.Panjang=0;
	        	$scope.item.Tinggi=0;
        		$scope.item.Listrik=0;
        		$scope.item.Teknologir="";
        		$scope.item.UsiaPakai=0;
        		$scope.item.UsiaTeknis=0;
        		$scope.item.SisaUmur=0;
        		$scope.item.TglProduksi=$scope.now;
                $scope.item.NoSeri="";
        		// * END SPESIFIKASI

        		// * SATUAN
        		$scope.item.satuanStandar="";
        		// * END SATUAN

        		// * KENDARAAN
        		$scope.item.NoMesin="";
        		$scope.item.NoBPKB="";
        		$scope.item.NoModel="";
        		$scope.item.NoRangka="";
        		$scope.item.NoSeri="";
        		$scope.item.NoPolisi="";
        		$scope.item.BPKBPegawai=undefined;
        		// * END KENDARAAN

        		// * SERTIFIKAT
        		$scope.item.JenisSertifikat=undefined;
        		$scope.item.NoSertifikat="";
        		$scope.item.Pegawai=undefined;
        		$scope.item.MasaBerlakuSertifikat=0;
        		// * END SERTIFIKAT

        		// * REKANAN
        		$scope.item.rekanan =undefined;
        		$scope.item.produsenProduk=undefined;
        		// * END REKANAN
	        }

			$scope.SimpanDetail = function(){

	             var listRawRequired = [
	             	// * UMUM
                    // "item.noRegisterAset|ng-model|No Asset",
                    "item.kdProduk|ng-model|Kode Produk",
                    // "item.ruanganAsal|k-ng-model|Ruangan Asal",
                    "item.ruangan|k-ng-model|Ruangan Current",
                    "item.TahunPerolehan|ng-model|Tahun Perolehan",
                    // * END UMUM

                    // * ALAMAT
                    // "item.alamatLengkap|ng-model|Alamat Lengkap",
                    // "item.kodePos|ng-model|Kode Pos",
                    // "item.desaKelurahan|k-ng-model|Desa Kelurahan",
                    // "item.kecamatan|k-ng-model|Kecamatan",
                    // "item.kotaKabupaten|k-ng-model|Kota Kabupaten",
                    // "item.propinsi|k-ng-model|Provinsi",
                    // * END ALAMAT


	        		// * KATEGORY
	        		"item.jenisProduk|k-ng-model|Jenis Produk",
                    "item.detailJenisProduk|k-ng-model|Detail Jenis Produk",
                    // "item.kelompokaset|k-ng-model|Kelompok Aset",
	        		// * END KATEGORY

	        		// * SPESIFIKASI
	        		"item.fungsiProduk|k-ng-model|Fungsi Produk",
                    "item.bahanProduk|k-ng-model|Bahan Produk",
                    "item.typeProduk|k-ng-model|Type Produk",
                    "item.warnaProduk|k-ng-model|Warna Produk",
                    "item.merkProduk|k-ng-model|Merk Produk",
                    "item.spesifikasi|ng-model|Spesifikasi",
                    "item.Lebar|ng-model|Lebar",
                    "item.Panjang|ng-model|Panjang",
                    "item.Tinggi|ng-model|Tinggi",
                    "item.Listrik|ng-model|Listrik",
                    "item.UsiaPakai|ng-model|UsiaPakai",
                    "item.UsiaTeknis|ng-model|UsiaTeknis",
                    "item.SisaUmur|ng-model|SisaUmur",
                    "item.Teknologi|ng-model|klasifikasiteknologi",	        	
	        		// * END SPESIFIKASI

	        		// * SATUAN
	        		"item.satuanStandar|k-ng-model|Satuan",	        		
	        		// * END SATUAN

	        		// * KENDARAAN
	        		// "item.NoMesin|ng-model|No Mesin",
           //          "item.NoBPKB|ng-model|No BPKB",
           //          "item.NoModel|ng-model|No Model",
           //          "item.NoSeri|ng-model|No Seri",
           //          "item.NoPolisi|ng-model|No Polisi",
           //          "item.BPKBPegawai|k-ng-model|BPKB Atas Nama",
           //          "item.NoRangka|ng-model|No Rangka",   		
	        		// * END KENDARAAN

	        		// * SERTIFIKAT
	        		// "item.JenisSertifikat|k-ng-model|BPKB Atas Nama",	
	        		// "item.NoSertifikat|ng-model|No Sertifikat",
           			//"item.MasaBerlakuSertifikat|ng-model|Masa Berlaku Sertifikat",
	        		// "item.Pegawai|k-ng-model|Sertifikat Atas Nama",	
	        		// * END SERTIFIKAT

	        		// * REKANAN
	        		// "item.rekanan|k-ng-model|Sertifikat Atas Nama",	
	        		// "item.produsenProduk|k-ng-model|Sertifikat Atas Nama",
	        		// * END REKANAN
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    if($scope.item != undefined){
                    	// * UMUM
                        var noRegisaset ='';
                        if ($scope.item.noRegisterAset != undefined) {
                            noRegisaset = $scope.item.noRegisterAset;
                        }

                    	var KodeBmn = '';
                    	if ($scope.item.kodeBmn != undefined) {
                    		KodeBmn = $scope.item.kodeBmn;
                    	}

                        var kodeRS='';
                        if($scope.item.kdRs != undefined){
                            kodeRS = $scope.item.kdRs;
                        }

                        var hargaperolehan=0;
                        if($scope.item.HargaPengadaan != undefined){
                            hargaperolehan = parseFloat($scope.item.HargaPengadaan);
                        }

                        var noaset = '-';
                        if ($scope.item.noaset != undefined){
                            noaset = $scope.item.noaset;
                        }

                        var ruanganasalfk = null ;
                        if ($scope.item.ruanganAsal != undefined){
                            ruanganasalfk = $scope.item.ruanganAsal.id;
                        }
                    	// * END UMUM

                    	// * ALAMAT
                    	var alamatlengkap='-';
                    	if ($scope.item.alamatLengkap != undefined){
                    		alamatlengkap = $scope.item.alamatLengkap;
                    	}
			        	var kodepos = '-' 
			        	if($scope.item.kodePos != undefined){
			        		kodepos = $scope.item.kodePos
			        	}
			        	var objectdesakelurahanfk = null;
			        	var desakelurahan = '';
			        	if ($scope.item.desaKelurahan != undefined){
			        		objectdesakelurahanfk = $scope.item.desaKelurahan.desaid;
			        		desakelurahan = $scope.item.desaKelurahan.namadesakelurahan;
			        	}
			        	var objectkecamatanfk = null;
			        	var kecamatan='';
			        	if ($scope.item.kecamatan != undefined){
			        		objectkecamatanfk = $scope.item.kecamatan.objectkecamatanfk;
			        		kecamatan = $scope.item.kecamatan.namakecamatan;
			        	}
			        	var objectkotakabupatenfk = null;
			        	var kotakabupaten='';
			        	if ($scope.item.kotaKabupaten != undefined){
			        		objectkotakabupatenfk = $scope.item.kotaKabupaten.objectkotakabupatenfk;
			        		kotakabupaten = $scope.item.kotaKabupaten.namakotakabupaten;
			        	}
			        	var objectpropinsifk = null;
                    	if ($scope.item.propinsi != undefined) {
                    		objectpropinsifk = $scope.item.propinsi.objectpropinsifk;
                    	}
                    	// * END ALAMAT

                    	// * SERTIFIKAT
                    	var jenissertifikat = null;
                    	if ($scope.item.JenisSertifikat != undefined) {
                    		jenissertifikat = $scope.item.JenisSertifikat.id;
                    	}
                    	var Nosertifikat = '';
                    	if ($scope.item.NoSertifikat != undefined) {
                    		Nosertifikat = $scope.item.NoSertifikat;
                    	}
                    	var pegawaiSertifikat = null;
                    	if ($scope.item.Pegawai != undefined) {
                    		pegawaiSertifikat = $scope.item.Pegawai.id;
                    	}
                    	var MasaBerlakuSertifikat = '';
                    	if ($scope.item.MasaBerlakuSertifikat != undefined) {
                    		MasaBerlakuSertifikat = $scope.item.MasaBerlakuSertifikat + " " + "Tahun";
                    	}
                    	// * END SERTIFIKAT

                    	// * KENDARAAN
		        		var nomesin =''; 
		        		if ($scope.item.NoMesin != undefined){
		        			nomesin = $scope.item.NoMesin;
		        		}
		        		var nobpkb =''; 
		        		if ($scope.item.NoBPKB != undefined){
		        			nobpkb = $scope.item.NoBPKB;
		        		}
		        		var nomodel =''; 
		        		if ($scope.item.NoModel != undefined){
		        			nomodel = $scope.item.NoModel;
		        		}
		        		var norangka =''; 
		        		if ($scope.item.NoRangka != undefined){
		        			norangka = $scope.item.NoRangka;
		        		}
		        		var noseri ='-'; 
		        		if ($scope.item.NoSeri != undefined){
		        			noseri = $scope.item.NoSeri;
		        		}
		        		var nopolisi =''; 
		        		if ($scope.item.NoPolisi != undefined){
		        			nopolisi = $scope.item.NoPolisi;
		        		}
		        		var bpkb_atasnama = null; 
		        		if ($scope.item.BPKBPegawai != undefined){
		        			bpkb_atasnama = $scope.item.BPKBPegawai.id;
		        		}
                        var noSeri = '';
                        if($scope.item.NoSeri != undefined){
                            noSeri = $scope.item.NoSeri
                        }
		        		// * END KENDARAAN  

		        		// * REKANAN
		        		var objectprodusenprodukfk= null;
		        		if ($scope.item.produsenProduk != undefined){
		        			objectprodusenprodukfk = $scope.item.produsenProduk.id;
		        		}
                        var rekanan = null;
                        if($scope.item.rekanan != undefined){
                            rekanan = $scope.item.rekanan.id;
                        }
		        		// * END REKANAN

                        var objectasalprodukfk=null;
                        if ($scope.item.asalproduk != undefined) {
                            objectasalprodukfk=$scope.item.asalproduk.id;
                        }

                        var kelompokaset = null;
                        if ($scope.item.kelompokaset != undefined) {
                            kelompokaset = $scope.item.kelompokaset.id;
                        }


                    	var regAset = {

			                // * UMUM
                            tglregisteraset : moment($scope.item.TglRegistrasi).format('YYYY-MM-DD HH:mm'),
			        		noRegisaset : noRegisaset,
			        		objectprodukfk : $scope.item.kdProduk,
			        		kdbmn : KodeBmn,
                            hargaperolehan : hargaperolehan,
                            noaset : noaset,
			        		// :$scope.item.kdEksternal,
			        		// :$scope.item.kdAspak,
			        		kdrsabhk : kodeRS,
			        		objectruanganfk : ruanganasalfk,
			        		objectruanganposisicurrentfk: $scope.item.ruangan.id,
			        		tahunperolehan : moment($scope.item.TahunPerolehan).format('YYYY'),
			        		// * END UMUM

			        		// * ALAMAT
			        		alamatlengkap : alamatlengkap,
			        		kodepos : kodepos,
			        		objectdesakelurahanfk : objectdesakelurahanfk,
			        		desakelurahan : desakelurahan,
			        		objectkecamatanfk : objectkecamatanfk,
			        		kecamatan : kecamatan,
			        		objectkotakabupatenfk : objectkotakabupatenfk,
			        		kotakabupaten : kotakabupaten,
			        		objectpropinsifk : objectpropinsifk,
			        		// * END ALAMAT

			        		// * KATEGORY
			        		objectjenisproduk : $scope.item.jenisProduk.id,
			        		objectdetailjenisproduk : $scope.item.detailJenisProduk.id,
			        		objectasalprodukfk : objectasalprodukfk,
			        		objectkelompokasetfk : kelompokaset,
			        		// * END KATEGORY

			        		// * SPESIFIKASI
			        		fungsikegunaan : $scope.item.fungsiProduk.fungsiproduk,
			        		objectbahanprodukfk:$scope.item.bahanProduk.id,
			        		objecttypeprodukfk : $scope.item.typeProduk.id,
			        		objectwarnaprodukfk : $scope.item.warnaProduk.id,
			        		objectmerkprodukfk:$scope.item.merkProduk.id,
			        		keteranganlainnya : $scope.item.spesifikasi,
			        		lb_lebar: $scope.item.Lebar,
			        		lb_panjang: $scope.item.Panjang,
			        		lb_tinggi:$scope.item.Tinggi,
			        		dayalistrik : $scope.item.Listrik,
			        		klasifikasiteknologi : $scope.item.Teknologi,
			        		usiapakai : $scope.item.UsiaPakai,
			        		usiateknis : $scope.item.UsiaTeknis,
			        		sisaumur : $scope.item.SisaUmur,
			        		tglproduksi : moment($scope.item.TglProduksi).format('YYYY-MM-DD HH:mm'),
                            noseri : noSeri,
			        		// * END SPESIFIKASI

			        		// * SATUAN
			        		objectsatuan : $scope.item.satuanStandar.id,
			        		// * END SATUAN

			        		// * KENDARAAN
			        		nomesin : nomesin,
			        		nobpkb : nobpkb,
			        		nomodel : nomodel,
			        		norangka : norangka,
			        		noseri : noseri,
			        		nopolisi : nopolisi,
			        		bpkb_atasnama : bpkb_atasnama,
			        		// * END KENDARAAN

			        		// * SERTIFIKAT
			        		kdjenissertifikat : jenissertifikat,
			        		nosertifikat : Nosertifikat,
			        		sertifikat_atasnama : pegawaiSertifikat,
			        		masaberlakusertifikat : MasaBerlakuSertifikat,
			        		// * END SERTIFIKAT

			        		// * REKANAN
			        		objectsupplier : rekanan,
			        		objectprodusenprodukfk : objectprodusenprodukfk
			        		// * END REKANAN
		            	}

			            var objSave = {
			                regAset:regAset,
			            }

		                manageLogistikPhp.simpandetailregisaset(objSave).then(function(e) {
		                    Kosongkan();
		                     $state.go('DaftarBarangInvestasiCtrl');
		                })  
                }else {
                    window.messageContainer.error(objValid.msg);
                }             
	        }
	    }
			// var initHistory = function () {
			// 	manageSarpras.getDetilAset($state.params.noRec).then(function(e){
			// 		$scope.item = e.data.detail;
			// 		$scope.item.satuan = {
			// 			id: $scope.item.satuanStandarId
			// 		}
			// 		$scope.item.jenisProduk = {
			// 			id: $scope.item.jenisProdukId
			// 		}
			// 		$scope.item.detailJenisProduk = {
			// 			id: $scope.item.detailJenisProdukId
			// 		}
			// 		$scope.item.kelompokAset = {
			// 			id: $scope.item.kelompokAsetId
			// 		}
			// 		$scope.item.namaPT = {
			// 			id: $scope.item.supplierId
			// 		}
			// 		$scope.item.namaSupplier = {
			// 			id: $scope.item.supplierId
			// 		}
			// 		$scope.item.merkProduk = {
			// 			id: $scope.item.merkProdukId
			// 		}
			// 		$scope.item.typeProduk = {
			// 			id: $scope.item.typeProdukId
			// 		}	
			// 		$scope.historyAlat = e.data.historyAlat;
			// 		$scope.historySertifikat = e.data.historySertifikat;
			// 		$scope.manualBook = e.data.manualBook;
			// 		$scope.sop = e.data.sop;
			// 		$scope.nomor = 1;
			// 		$scope.nomorManualBook = 1;
			// 		$scope.nomorSop = 1;
			// 		$scope.historySertifikat.forEach(function(data){
			// 			var date = new Date(data.tanggal);
			// 			data.tanggal = DateHelper.getTanggalFormatted(date);
						
			// 			data.no = $scope.nomor++;
			// 		})
			// 		$scope.manualBook.forEach(function(data){
			// 			data.no = $scope.nomorManualBook++;
			// 		})
			// 		$scope.sop.forEach(function(data){
			// 			data.no = $scope.nomorSop++;
			// 		})
			// 		$scope.dataHistoryAlat = new kendo.data.DataSource({
			// 			pageSize: 10,
			// 			data: $scope.historyAlat
			// 		});
			// 		$scope.dataHistorySertifikat = new kendo.data.DataSource({
			// 			pageSize: 10,
			// 			data: $scope.historySertifikat
			// 		});
			// 		$scope.dataManualBook = new kendo.data.DataSource({
			// 			pageSize: 10,
			// 			data: $scope.manualBook
			// 		});
			// 		$scope.dataSop = new kendo.data.DataSource({
			// 			pageSize: 10,
			// 			data: $scope.sop
			// 		});
			// 	})
			// }
				
			// if ($state.params.noRec !== undefined){
			// 	initHistory()
			// }
				
   //          $scope.onSelect = function(e) {
	  //         	$("#preview").empty();
	  //           for (var i = 0; i < e.files.length; i++) {
	  //               var file = e.files[i].rawFile;

	  //               if (file) {
	  //                 	var reader  = new FileReader();
	  //                 	reader.onload = function(readerEvt) {
			// 	            var binaryString = readerEvt.target.result;
			// 	            var fileInput = {
			// 	            	"fileInput" : btoa(binaryString)
			// 	            }
			// 	            $scope.item.image = btoa(binaryString);
			// 	            // console.log(btoa(binaryString))
			// 	        }
	  //                 	reader.onloadend = function () {
	  //                   	$("<img img class=\"gambarAset img-responsive\">").attr("src", this.result).appendTo($("#preview"));
	  //                 	};

	  //                 	reader.readAsDataURL(file);
	  //               }
	  //           }
   //        	}
          	
   //        	$scope.formatHarga = {
			// 	culture: "de-DE",
			// 	format: "{0:n0}"
			// }
			// var now = $scope.now.getFullYear();
			// $scope.$watch('item.tahunPerolehan', function() {
   //          	if ($scope.item.tahunPerolehan === undefined) return;
   //          	if ($scope.item.tahunPerolehan === null) return;
   //          	if ($scope.item.tahunPerolehan === '') return;
   //              $scope.item.usiaPakai = now - $scope.item.tahunPerolehan;
   //          });
   //          $scope.$watch('item.usiaTeknis', function() {
   //          	if ($scope.item.usiaTeknis === undefined) return;
   //          	if ($scope.item.usiaTeknis === null) return;
   //          	if ($scope.item.usiaTeknis === '') return;
   //              $scope.item.sisaUmur = $scope.item.usiaTeknis - $scope.item.usiaPakai;
   //          });
      //     	$scope.addPreview = function(file, wrapper) {
		    //     var raw = file.rawFile;
		    //     var reader = new FileReader();

		    //     if (raw) {
		    //       	reader.onloadend = function () {
		    //         	var preview = $("<img class='image-preview'>").attr("src", this.result);

		    //         	wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-extension-wrapper")
		    //           	.replaceWith(preview);
		    //       	};

		    //       	reader.readAsDataURL(raw);
		    //     }
		    // }
		   //  $scope.Save = function(){
		   //  	var tmpData = {
					// "noRec":$state.params.noRec,
					// "kelompokAset": {
					// 	"id": $scope.item.kelompokAset.id
					// },
					// "typeProduk": {
					// 	"id": $scope.item.typeProduk.id
					// },
					// "noRegisterAset": $scope.item.noRegisterAset,
					// "supplier": {
					// 	"id": $scope.item.namaSupplier.id
					// },
					// "usiaTeknis": $scope.item.usiaTeknis,
					// "satuanStandar": {
					// 	"id": $scope.item.satuan.id
					// },
					// "noSeri": $scope.item.noSeri,
					// // "ruangan": {
					// // 	"id": $scope.item.
					// // },
					// "dayaListrik": $scope.item.dayaListrik,
					// "detailJenisProduk": {
					// 	"id": $scope.item.detailJenisProduk.id
					// },
					// "jenisProduk": {
					// 	"id": $scope.item.jenisProduk.id
					// },
					// "klasifikasiTeknologi": $scope.item.klasifikasiTeknologi,
					// "hargaPerolehan": parseInt($scope.item.hargaPerolehan),
					// "kdBmn": $scope.item.kodeBmn,
					// "keteranganLainnya": $scope.item.spesifikasi,
					// "kdRsabhk": $scope.item.kdRs,
					// "usiaPakai": parseInt($scope.item.usiaPakai),
					// "sisaUmur": parseInt($scope.item.sisaUmur),
					// "tahunPerolehan": parseInt($scope.item.tahunPerolehan),
					// "merkProduk": {
					// 	"id": $scope.item.merkProduk.id
					// },
					// "kdAspac": $scope.item.kdAspak,
					// "image": $scope.item.image
		   //  	}
		    	
		   //  	manageSarpras.saveDataSarPras(tmpData, "registrasi-aset/update-aset/").then(function(e){
     //                // $scope.noRec = response.data.data.noRec;
     //            }).then(function(){
     //                $scope.isNext = true;
     //                // $scope.isReport = true;
     //            });
		   //  }

		 //    $scope.Back = function(){
   //              window.history.back();
   //          };
   //          $scope.onSelectHistory = function(e) {
   //              var data1 = $.map(e.files, function(file) { return file.extension; });
   //              var data2 = $.map(e.files, function(file) { return file.rawFile; });
   //              var files = data1[0];
   //              var file = data2[0];

			//     if (files && file) {
			//         var reader = new FileReader();

			//         reader.onload = function(readerEvt) {
			//             var binaryString = readerEvt.target.result;
			//             $scope.item.urlDokumenHistory = btoa(binaryString);
			//             $scope.item.extexntionHistory = files.substring(1);
			//         };
			//     }
			//     reader.readAsBinaryString(file);
   //          };
   //          $scope.onSelectManualBook = function(e) {
   //              var data1 = $.map(e.files, function(file) { return file.extension; });
   //              var data2 = $.map(e.files, function(file) { return file.rawFile; });
   //              var files = data1[0];
   //              var file = data2[0];

			//     if (files && file) {
			//         var reader = new FileReader();

			//         reader.onload = function(readerEvt) {
			//             var binaryString = readerEvt.target.result;
			//             $scope.item.urlDokumenManualBook = btoa(binaryString);
			//             $scope.item.extexntionManualBook = files.substring(1);
			//         };
			//     }
			//     reader.readAsBinaryString(file);
   //          };
   //          $scope.onSelectSop = function(e) {
   //              var data1 = $.map(e.files, function(file) { return file.extension; });
   //              var data2 = $.map(e.files, function(file) { return file.rawFile; });
   //              var files = data1[0];
   //              var file = data2[0];

			//     if (files && file) {
			//         var reader = new FileReader();

			//         reader.onload = function(readerEvt) {
			//             var binaryString = readerEvt.target.result;
			//             $scope.item.urlDokumenSop = btoa(binaryString);
			//             $scope.item.extexntionSop = files.substring(1);
			//         };
			//     }
			//     reader.readAsBinaryString(file);
   //          };
   //          $scope.uploadHistory = function () {
   //          	var date = new Date($scope.item.tanggalSertifikat);
   //          	var tanggal = DateHelper.getTanggalFormattedNew(date);
   //          	var data = 
   //          	{
   //          		"registrasiAset": {
			// 			"noRec":$state.params.noRec
			// 		},
			// 	    "format": $scope.item.extexntionHistory,
			// 	    "kategori": "History Sertifikat",
			// 	    "nomor": $scope.item.nomorSertifikat,
			// 	    "namaFile": $scope.item.urlDokumenHistory,
			// 	    "tanggal": tanggal
   //          	};
   //          	console.log(JSON.stringify(data));
   //          	IPSRSService.saveDataSarPras(data, "registrasi-aset/save-dokumen/").then(function(e) {
			// 		initHistory();
			// 	});
   //          };
   //          $scope.uploadManualBook = function () {
   //          	var data = 
   //          	{
   //          		"registrasiAset": {
			// 			"noRec":$state.params.noRec
			// 		},
			// 	    "format": $scope.item.extexntionManualBook,
			// 	    "kategori": "Manual Book",
			// 	    "nomor": $scope.item.namaManualBook,
			// 	    "namaFile": $scope.item.urlDokumenManualBook
   //          	};
   //          	console.log(JSON.stringify(data));
   //          	IPSRSService.saveDataSarPras(data, "registrasi-aset/save-dokumen/").then(function(e) {
			// 		initHistory();
			// 	});
   //          };
   //          $scope.uploadSop = function () {
   //          	var data = 
   //          	{
   //          		"registrasiAset": {
			// 			"noRec":$state.params.noRec
			// 		},
			// 	    "format": $scope.item.extexntionSop,
			// 	    "kategori": "SOP",
			// 	    "nomor": $scope.item.namaSop,
			// 	    "namaFile": $scope.item.urlDokumenSop
   //          	};
   //          	console.log(JSON.stringify(data));
   //          	IPSRSService.saveDataSarPras(data, "registrasi-aset/save-dokumen/").then(function(e) {
			// 		initHistory();
			// 	});
   //          };
            
   //          $scope.click = function(current){
			// 	$scope.current = current;
			// 	$scope.item.noRec = current.noRec;
			// };
			// $scope.downloadHistory = function () {
			// 	if ($scope.item.noRec == undefined) {
			// 		window.messageContainer.error('Pilih data yang ingin di Download')
			// 	} else {
			// 		var link = IPSRSService.downloadHistoryAlat($scope.item.noRec);
			// 		window.open(link);
   //          	}
   //          };
   //          $scope.downloadManualBook = function () {
			// 	if ($scope.item.noRec == undefined) {
			// 		window.messageContainer.error('Pilih data yang ingin di Download')
			// 	} else {
			// 		var link = IPSRSService.downloadManualBook($scope.item.noRec);
			// 		window.open(link);
   //          	}
   //          };
   //          $scope.downloadSop = function () {
			// 	if ($scope.item.noRec == undefined) {
			// 		window.messageContainer.error('Pilih data yang ingin di Download')
			// 	} else {
			// 		var link = IPSRSService.downloadSop($scope.item.noRec);
			// 		window.open(link);
   //          	}
   //          };
			// $scope.mainGridHistoryAlat = { 
			// 	pageable: true,
			// 	columns: [
			// 	{ field:"noOrder",title:"No Order" },
			// 	{ field:"tglOrder",title:"Tanggal" },
			// 	{ field:"keterangan",title:"Jenis Pekerjaan" },
			// 	{ field:"statusPekerjaan",title:"Status Pekerjaan" }],
			// 	editable: false
			// };
			// $scope.mainGridHistorySertifikat = { 
			// 	pageable: true,
			// 	columns: [
			// 	{ field:"no",title:"No" },
			// 	{ field:"nomor",title:"Nomor Sertifikat" },
			// 	{ field:"tanggal",title:"Tanggal Sertifikat" }],
			// 	editable: false
			// };
			// $scope.mainGridManualBook = { 
			// 	pageable: true,
			// 	columns: [
			// 	{ field:"no",title:"No", width:"50px"},
			// 	{ field:"nomor",title:"Nama Manual Book",width:"300px" }],
			// 	editable: false
			// };
			// $scope.mainGridSop = { 
			// 	pageable: true,
			// 	columns: [
			// 	{ field:"no",title:"No" },
			// 	{ field:"nomor",title:"Nama SOP" }],
			// 	editable: false
			// };


		}
	]);
});