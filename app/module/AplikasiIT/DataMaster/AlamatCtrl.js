define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AlamatCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};

			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Alamat", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Alamat;
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"agama": e.agama,
						 		"kdAgama": e.kdAgama,
						 		"qAgama": e.qAgama,
						 		"reportDisplay": e.reportDisplay,
						 		"kodeExternal": e.kodeExternal,
						 		"namaExternal": e.namaExternal,
						 		"statusEnabled": e.statusEnabled,
						 		"id": e.id,
						 		"noRec": e.noRec,
						 		"no": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});
					$scope.source = data;
					$scope.dataSource = new kendo.data.DataSource({
	                    pageSize: 10,
	                    data: $scope.listDataMaster,
	                    autoSync: true
	                    /*schema: {
	                      	model: {
	                        	id: "asetId",
	                        	fields: {
	                            	
	                        	}   
	                    	}
	                	}	*/
	            	});
					
				});
			}
			init();

			IPSRSService.getFieldListData("Kecamatan&select=id,namaExternal", true).then(function(dat){
				$scope.listkecamatan = dat.data;
			});

			IPSRSService.getFieldListData("KotaKabupaten&select=id,namaExternal", true).then(function(dat){
				$scope.listkotaKabupaten = dat.data;
			});

			IPSRSService.getFieldListData("Propinsi&select=id,namaExternal", true).then(function(dat){
				$scope.listpropinsi = dat.data;
			});
			IPSRSService.getFieldListData("DesaKelurahan&select=id,namaExternal", true).then(function(dat){
				$scope.listdesaKelurahan = dat.data;
			});
			IPSRSService.getFieldListData("HubunganKeluarga&select=id,namaExternal", true).then(function(dat){
				$scope.listhubunganKeluarga = dat.data;
			});
			IPSRSService.getFieldListData("JenisAlamat&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisAlamat = dat.data;
			});

			IPSRSService.getFieldListData("Negara&select=id,namaExternal", true).then(function(dat){
				$scope.listnegara = dat.data;
			});
			IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listpegawai = dat.data;
			});
			IPSRSService.getFieldListData("Rekanan&select=id,namaExternal", true).then(function(dat){
				$scope.listrekanan = dat.data;
			});
			IPSRSService.getFieldListData("Pasien&select=id,namaExternal", true).then(function(dat){
				$scope.listpasien = dat.data;
			});
			
			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnAlamat,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
			$scope.columnAlamat = [
			{
				"field": "alamatEmail",
				"title": "alamat Email"
			},
			{
				"field": "alamatLengkap",
				"title": "alamat Lengkap",
				"width": "200px"
			},
			{
				"field": "blackBerry",
				"title": "black Berry"
			},
			{
				"field": "namaDesaKelurahan",
				"title": "nama Desa Kelurahan"
			},
			{
				"field": "facebook",
				"title": "facebook"
			},
			{
				"field": "faksimile1",
				"title": "faksimile 1"
			},
			{
				"field": "faksimile2",
				"title": "faksimile 2"
			},
			{
				"field": "fixedPhone1",
				"title": "fixed Phone 1"
			},
			{
				"field": "fixedPhone2",
				"title": "fixed Phone 2"
			},
			{
				"field": "isBillingAddress",
				"title": "is Billing Address"
			},
			{
				"field": "isPrimaryAddress",
				"title": "is Primary Address"
			},
			{
				"field": "isShippingAddress",
				"title": "is Shipping Address"
			},
			{
				"field": "kdAlamat",
				"title": "kd Alamat"
			},
			{
				"field": "desaKelurahan",
				"title": "desa Kelurahan"
			},
			{
				"field": "desaKelurahanId",
				"title": "desa Kelurahan Id"
			},
			{
				"field": "hubunganKeluarga",
				"title": "hubungan Keluarga"
			},
			{
				"field": "hubunganKeluargaId",
				"title": "hubungan Keluarga Id"
			},
			{
				"field": "jenisAlamat",
				"title": "jenis Alamat"
			},
			{
				"field": "jenisAlamatId",
				"title": "jenis Alamat Id"
			},
			{
				"field": "kecamatanId",
				"title": "kecamatan Id"
			},
			{
				"field": "kecamatan",
				"title": "kecamatan"
			},
			{
				"field": "kotaKabupaten",
				"title": "kota Kabupaten"
			},
			{
				"field": "kotaKabupatenId",
				"title": "kota Kabupaten Id"
			},
			{
				"field": "negara",
				"title": "negara"
			},
			{
				"field": "negaraId",
				"title": "negara Id"
			},
			{
				"field": "pegawai",
				"title": "pegawai"
			},
			{
				"field": "pegawaiId",
				"title": "pegawai Id"
			},
			{
				"field": "propinsi",
				"title": "propinsi"
			},
			{
				"field": "propinsiId",
				"title": "propinsi Id"
			},
			{
				"field": "rekanan",
				"title": "rekanan"
			},
			{
				"field": "rekananId",
				"title": "rekanan Id"
			},
			{
				"field": "namaKecamatan",
				"title": "nama Kecamatan"
			},
			{
				"field": "keteranganLainnya",
				"title": "keterangan Lainnya"
			},
			{
				"field": "kodePos",
				"title": "kode Pos"
			},
			{
				"field": "namaKotaKabupaten",
				"title": "nama Kota Kabupaten"
			},
			{
				"field": "line",
				"title": "line"
			},
			{
				"field": "mobilePhone1",
				"title": "mobile Phone 1"
			},
			{
				"field": "mobilePhone2",
				"title": "mobile Phone 2"
			},
			{
				"field": "namaTempatGedung",
				"title": "nama Tempat Gedung"
			},
			{
				"field": "pasien",
				"title": "pasien"
			},
			{
				"field": "pasienId",
				"title": "pasien Id"
			},
			{
				"field": "rtrw",
				"title": "rtrw"
			},
			{
				"field": "twitter",
				"title": "twitter"
			},
			{
				"field": "website",
				"title": "website"
			},
			{
				"field": "whatsApp",
				"title": "whats App"
			},
			{
				"field": "yahooMessenger",
				"title": "yahoo Messenger"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			},
			{
				"title" : "Action",
    			"width" : "200px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
			$scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				$scope.item.id = current.id;
				$scope.item.alamatEmail = current.alamatEmail;
				$scope.item.alamatLengkap=current.alamatLengkap;
				$scope.item.blackBerry=current.blackBerry;
				$scope.item.namaDesaKelurahan=current.namaDesaKelurahan;
				$scope.item.facebook=current.facebook;
				$scope.item.faksimile1=current.faksimile1;
				$scope.item.faksimile2=current.faksimile2;
				$scope.item.fixedPhone1=current.fixedPhone1;
				$scope.item.isPrimaryAddress=current.isPrimaryAddress;
				$scope.item.isShippingAddress=current.isShippingAddress;
				$scope.item.kdAlamat=current.kdAlamat;
				$scope.item.desaKelurahan=current.desaKelurahan;
				$scope.item.desaKelurahanId=current.desaKelurahanId;
				$scope.item.hubunganKeluarga=current.hubunganKeluarga;
				$scope.item.hubunganKeluargaId=current.hubunganKeluargaId;
				$scope.item.jenisAlamat=current.jenisAlamat;
				$scope.item.jenisAlamatId=current.jenisAlamatId;
				$scope.item.kecamatanId=current.kecamatanId;
				$scope.item.kecamatan=current.kecamatan;
				$scope.item.kotaKabupaten=current.kotaKabupaten;
				$scope.item.kotaKabupatenId=current.kotaKabupatenId;
				$scope.item.negara=current.negara;
				$scope.item.negaraId=current.negaraId;
				$scope.item.pegawai=current.pegawai;
				$scope.item.pegawaiId=current.pegawaiId;
				$scope.item.propinsi=current.propinsi;
				$scope.item.propinsiId=current.propinsiId;
				$scope.item.rekanan=current.rekanan;
				$scope.item.rekananId=current.rekananId;
				$scope.item.namaKecamatan=current.namaKecamatan;
				$scope.item.keteranganLainnya=current.keteranganLainnya;
				$scope.item.kodePos=current.kodePos;
				$scope.item.namaKotaKabupaten=current.namaKotaKabupaten;
				$scope.item.line=current.line;
				$scope.item.mobilePhone1=current.mobilePhone1;
				$scope.item.mobilePhone2=current.mobilePhone2;
				$scope.item.namaTempatGedung=current.namaTempatGedung;
				$scope.item.pasien=current.pasien;
				$scope.item.pasienId=current.pasienId;
				$scope.item.rtrw=current.rtrw;
				$scope.item.twitter=current.twitter;
				$scope.item.website=current.website;
				$scope.item.whatsApp=current.whatsApp;
				$scope.item.yahooMessenger=current.yahooMessenger;
				$scope.item.reportDisplay=current.reportDisplay;
				$scope.item.kodeExternal=current.kodeExternal;
				$scope.item.namaExternal=current.namaExternal;
				$scope.item.statusEnabled=current.statusEnabled;
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Alamat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Alamat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Alamat",
					"listField": {
							"alamatEmail": $scope.item.alamatEmail,
					 		"alamatLengkap": $scope.item.alamatLengkap,
					 		"blackBerry": $scope.item.blackBerry,
					 		"namaDesaKelurahan": $scope.item.namaDesaKelurahan,
					 		"facebook": $scope.item.facebook,
					 		"faksimile1": $scope.item.faksimile1,
					 		"faksimile2": $scope.item.faksimile2,
					 		"fixedPhone1": $scope.item.fixedPhone1,
					 		"isPrimaryAddress": $scope.item.isPrimaryAddress,
					 		"isShippingAddress": $scope.item.isShippingAddress,
					 		"kdAlamat": $scope.item.kdAlamat,
					 		"desaKelurahan": $scope.item.desaKelurahan,
					 		
					 		"hubunganKeluarga": $scope.item.hubunganKeluarga,
					 		
					 		"jenisAlamat": $scope.item.jenisAlamat,
					 		
					 		
					 		"kecamatan": $scope.item.kecamatan,
					 		"kotaKabupaten": $scope.item.kotaKabupaten,
					 	
					 		"negara": $scope.item.negara,
					 		
					 		"pegawai": $scope.item.pegawai,
					 		
					 		"propinsi": $scope.item.propinsi,
					 	
					 		"rekanan": $scope.item.rekanan,
					 		
					 		"namaKecamatan": $scope.item.namaKecamatan,
					 		"keteranganLainnya": $scope.item.keteranganLainnya,
					 		"kodePos": $scope.item.kodePos,
					 		"namaKotaKabupaten": $scope.item.namaKotaKabupaten,
					 		"line": $scope.item.line,
					 		"mobilePhone1": $scope.item.mobilePhone1,
					 		"mobilePhone2": $scope.item.mobilePhone2,
					 		"namaTempatGedung": $scope.item.namaTempatGedung,
					 		"pasien": $scope.item.pasien,
					 		"pasienId": $scope.item.pasienId,
					 		"rtrw": $scope.item.rtrw,
					 		"twitter": $scope.item.twitter,
					 		"website": $scope.item.website,
					 		"whatsApp": $scope.item.whatsApp,
					 		"yahooMessenger": $scope.item.yahooMessenger,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });
		    }

		    $scope.edit = function()
		    {	
		        var data = {
					"class": "Alamat",
					"listField": {
							"id": $scope.item.id,
							"alamatEmail": $scope.item.alamatEmail,
					 		"alamatLengkap": $scope.item.alamatLengkap,
					 		"blackBerry": $scope.item.blackBerry,
					 		"namaDesaKelurahan": $scope.item.namaDesaKelurahan,
					 		"facebook": $scope.item.facebook,
					 		"faksimile1": $scope.item.faksimile1,
					 		"faksimile2": $scope.item.faksimile2,
					 		"fixedPhone1": $scope.item.fixedPhone1,
					 		"isPrimaryAddress": $scope.item.isPrimaryAddress,
					 		"isShippingAddress": $scope.item.isShippingAddress,
					 		"kdAlamat": $scope.item.kdAlamat,
					 		"desaKelurahan": $scope.item.desaKelurahan,
					 		"desaKelurahanId": $scope.item.desaKelurahanId,
					 		"hubunganKeluarga": $scope.item.hubunganKeluarga,
					 		"hubunganKeluargaId": $scope.item.hubunganKeluargaId,
					 		"jenisAlamat": $scope.item.jenisAlamat,
					 		"jenisAlamatId": $scope.item.jenisAlamatId,
					 		"kecamatanId": $scope.item.kecamatanId,
					 		"kecamatan": $scope.item.kecamatan,
					 		"kotaKabupaten": $scope.item.kotaKabupaten,
					 		"kotaKabupatenId": $scope.item.kotaKabupatenId,
					 		"negara": $scope.item.negara,
					 		"negaraId": $scope.item.negaraId,
					 		"pegawai": $scope.item.pegawai,
					 		"pegawaiId": $scope.item.pegawaiId,
					 		"propinsi": $scope.item.propinsi,
					 		"propinsiId": $scope.item.propinsiId,
					 		"rekanan": $scope.item.rekanan,
					 		"rekananId": $scope.item.rekananId,
					 		"namaKecamatan": $scope.item.namaKecamatan,
					 		"keteranganLainnya": $scope.item.keteranganLainnya,
					 		"kodePos": $scope.item.kodePos,
					 		"namaKotaKabupaten": $scope.item.namaKotaKabupaten,
					 		"line": $scope.item.line,
					 		"mobilePhone1": $scope.item.mobilePhone1,
					 		"mobilePhone2": $scope.item.mobilePhone2,
					 		"namaTempatGedung": $scope.item.namaTempatGedung,
					 		"pasien": $scope.item.pasien,
					 		"pasienId": $scope.item.pasienId,
					 		"rtrw": $scope.item.rtrw,
					 		"twitter": $scope.item.twitter,
					 		"website": $scope.item.website,
					 		"whatsApp": $scope.item.whatsApp,
					 		"yahooMessenger": $scope.item.yahooMessenger,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
		        });
		    }
		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }

		}
		]);
});