define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelompokAlamatCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisAlamat", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisAlamat;
					
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
			$scope.columnJenisAlamat = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisAlamat",
				"title": "jenis Alamat"
			},
			{
				"field": "kdJenisAlamat",
				"title": "kd Jenis Alamat"
			},
			{
				"field": "qJenisAlamat",
				"title": "q Jenis Alamat"
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

			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnJenisAlamat,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.jenisAlamat = current.jenisAlamat;
				$scope.item.kdJenisAlamat = current.kdJenisAlamat;
				$scope.item.qJenisAlamat = current.qJenisAlamat;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisAlamat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisAlamat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisAlamat",
					"listField": {
							"jenisAlamat": $scope.item.jenisAlamat,
					 		"kdJenisAlamat": $scope.item.kdJenisAlamat,
					 		"qJenisAlamat": $scope.item.qJenisAlamat,
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
					"class": "JenisAlamat",
					"listField": {
							"id": $scope.item.id,
							"jenisAlamat": $scope.item.jenisAlamat,
					 		"kdJenisAlamat": $scope.item.kdJenisAlamat,
					 		"qJenisAlamat": $scope.item.qJenisAlamat,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
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
			
			var initu = function () {
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
					$scope.dataSourceu = new kendo.data.DataSource({
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
			initu();

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
			
			$scope.mainGridOptionsu = { 
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
    			"template" : "<button class='btnEdit' ng-click='enableDatau()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDatau()'>Disable</button>"
			}
			];
			$scope.kliku = function(currentu){
            	$scope.showEditu = true;
				$scope.currentu = currentu;
				$scope.item.id = currentu.id;
				$scope.item.alamatEmail = currentu.alamatEmail;
				$scope.item.alamatLengkap=currentu.alamatLengkap;
				$scope.item.blackBerry=currentu.blackBerry;
				$scope.item.namaDesaKelurahan=currentu.namaDesaKelurahan;
				$scope.item.facebook=currentu.facebook;
				$scope.item.faksimile1=currentu.faksimile1;
				$scope.item.faksimile2=currentu.faksimile2;
				$scope.item.fixedPhone1=currentu.fixedPhone1;
				$scope.item.isPrimaryAddress=currentu.isPrimaryAddress;
				$scope.item.isShippingAddress=currentu.isShippingAddress;
				$scope.item.kdAlamat=currentu.kdAlamat;
				$scope.item.desaKelurahan=currentu.desaKelurahan;
				$scope.item.desaKelurahanId=currentu.desaKelurahanId;
				$scope.item.hubunganKeluarga=currentu.hubunganKeluarga;
				$scope.item.hubunganKeluargaId=currentu.hubunganKeluargaId;
				$scope.item.jenisAlamat=currentu.jenisAlamat;
				$scope.item.jenisAlamatId=currentu.jenisAlamatId;
				$scope.item.kecamatanId=currentu.kecamatanId;
				$scope.item.kecamatan=currentu.kecamatan;
				$scope.item.kotaKabupaten=currentu.kotaKabupaten;
				$scope.item.kotaKabupatenId=currentu.kotaKabupatenId;
				$scope.item.negara=currentu.negara;
				$scope.item.negaraId=currentu.negaraId;
				$scope.item.pegawai=currentu.pegawai;
				$scope.item.pegawaiId=currentu.pegawaiId;
				$scope.item.propinsi=currentu.propinsi;
				$scope.item.propinsiId=currentu.propinsiId;
				$scope.item.rekanan=currentu.rekanan;
				$scope.item.rekananId=currentu.rekananId;
				$scope.item.namaKecamatan=currentu.namaKecamatan;
				$scope.item.keteranganLainnya=currentu.keteranganLainnya;
				$scope.item.kodePos=currentu.kodePos;
				$scope.item.namaKotaKabupaten=currentu.namaKotaKabupaten;
				$scope.item.line=currentu.line;
				$scope.item.mobilePhone1=currentu.mobilePhone1;
				$scope.item.mobilePhone2=currentu.mobilePhone2;
				$scope.item.namaTempatGedung=currentu.namaTempatGedung;
				$scope.item.pasien=currentu.pasien;
				$scope.item.pasienId=currentu.pasienId;
				$scope.item.rtrw=currentu.rtrw;
				$scope.item.twitter=currentu.twitter;
				$scope.item.website=currentu.website;
				$scope.item.whatsApp=currentu.whatsApp;
				$scope.item.yahooMessenger=currentu.yahooMessenger;
				$scope.item.reportDisplay=currentu.reportDisplay;
				$scope.item.kodeExternal=currentu.kodeExternal;
				$scope.item.namaExternal=currentu.namaExternal;
				$scope.item.statusEnabled=currentu.statusEnabled;
			};
			$scope.disableDatau=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Alamat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initu();

				});
			};

			$scope.enableDatau=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Alamat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initu();

				});
			};
			$scope.tambahu = function()
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
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initu();
					$scope.item = {};
		        });
		    }

		    $scope.editu = function()
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
					initu();
		        });
		    }
		    $scope.batalu = function () {
		    	$scope.showEditu = false;
		    	$scope.item = {};
		    }

		}
		]);
});