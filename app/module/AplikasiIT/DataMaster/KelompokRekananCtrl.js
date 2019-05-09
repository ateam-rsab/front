define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelompokRekananCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisRekanan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisRekanan;
					
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
			IPSRSService.getFieldListData("JenisRekanan&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisRekanan = dat.data;
			});
			$scope.columnJenisRekanan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "namaJenisRekanan",
				"title": "nama Jenis Rekanan"
			},
			{
				"field": "kdJenisRekanan",
				"title": "kd Jenis Rekanan"
			},
			{
				"field": "qJenisRekanan",
				"title": "q Jenis Rekanan"
			},
			{
				"field": "jenisRekanan",
				"title": "jenis Rekanan"
			},
			{
				"field": "jenisRekananId",
				"title": "jenis Rekanan Id"
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
                columns: $scope.columnJenisRekanan,
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
				$scope.item.namaJenisRekanan = current.namaJenisRekanan;
				$scope.item.kdJenisRekanan = current.kdJenisRekanan;
				$scope.item.qJenisRekanan = current.qJenisRekanan;
				$scope.item.jenisRekanan = current.jenisRekanan;
				$scope.item.jenisRekananId = current.jenisRekananId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisRekanan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisRekanan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisRekanan",
					"listField": {
							"namaJenisRekanan": $scope.item.namaJenisRekanan,
					 		"kdJenisRekanan": $scope.item.kdJenisRekanan,
					 		"qJenisRekanan": $scope.item.qJenisRekanan,
					 		"jenisRekanan": $scope.item.jenisRekanan,
					 		"jenisRekananId": $scope.item.jenisRekananId,
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
					"class": "JenisRekanan",
					"listField": {
							"id": $scope.item.id,
							"namaJenisRekanan": $scope.item.namaJenisRekanan,
					 		"kdJenisRekanan": $scope.item.kdJenisRekanan,
					 		"qJenisRekanan": $scope.item.qJenisRekanan,
					 		"jenisRekanan": $scope.item.jenisRekanan,
					 		"jenisRekananId": $scope.item.jenisRekananId,
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
			
			
			var initx = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Rekanan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Rekanan;
					
					$scope.dataSourcex = new kendo.data.DataSource({
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
			initx();
			IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
				$scope.listaccount = dat.data;
			});

			IPSRSService.getFieldListData("DesaKelurahan&select=id,namaExternal", true).then(function(dat){
				$scope.listdesaKelurahan = dat.data;
			});

			IPSRSService.getFieldListData("JenisRekanan&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisRekanan = dat.data;
			});
			IPSRSService.getFieldListData("Kecamatan&select=id,namaExternal", true).then(function(dat){
				$scope.listkecamatan = dat.data;
			});
			IPSRSService.getFieldListData("KotaKabupaten&select=id,namaExternal", true).then(function(dat){
				$scope.listkotaKabupaten = dat.data;
			});
			IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listpegawai = dat.data;
			});

			IPSRSService.getFieldListData("Propinsi&select=id,namaExternal", true).then(function(dat){
				$scope.listpropinsi = dat.data;
			});
			IPSRSService.getFieldListData("Rekanan&select=id,namaExternal", true).then(function(dat){
				$scope.listrekananHead = dat.data;
			});
			IPSRSService.getFieldListData("Rekanan&select=id,namaExternal", true).then(function(dat){
				$scope.listrekanan = dat.data;
			});
			$scope.columnRekanan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "alamatLengkap",
				"title": "alamat Lengkap"
			},
			{
				"field": "bankRekeningAtasNama",
				"title": "bank Rekening Atas Nama"
			},
			{
				"field": "bankRekeningNama",
				"title": "bank Rekening Nama"
			},
			{
				"field": "bankRekeningNomor",
				"title": "bank Rekening Nomor"
			},
			{
				"field": "contactPerson",
				"title": "contact Person"
			},
			{
				"field": "namaDesaKelurahan",
				"title": "nama Desa Kelurahan"
			},
			{
				"field": "email",
				"title": "email"
			},
			{
				"field": "faksimile",
				"title": "faksimile"
			},
			{
				"field": "account",
				"title": "account"
			},
			{
				"field": "accountId",
				"title": "account Id"
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
				"field": "jenisRekanan",
				"title": "jenis Rekanan"
			},
			{
				"field": "jenisRekananId",
				"title": "jenis Rekanan Id"
			},
			{
				"field": "kecamatan",
				"title": "kecamatan"
			},
			{
				"field": "kecamatanId",
				"title": "kecamatan Id"
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
				"field": "kdRekanan",
				"title": "kd Rekanan"
			},
			{
				"field": "renanans",
				"title": "renanans"
			},
			{
				"field": "rekananHead",
				"title": "rekanan Head"
			},
			{
				"field": "rekananHeadId",
				"title": "rekanan Head Id"
			},
			{
				"field": "namaKecamatan",
				"title": "nama Kecamatan"
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
				"field": "namaRekanan",
				"title": "nama Rekanan"
			},
			{
				"field": "noPKP",
				"title": "no PKP"
			},
			{
				"field": "nPWP",
				"title": "n PWP"
			},
			{
				"field": "qRekanan",
				"title": "q Rekanan"
			},
			{
				"field": "rTRW",
				"title": "r TRW"
			},
			{
				"field": "telepon",
				"title": "telepon"
			},
			{
				"field": "website",
				"title": "website"
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

			$scope.mainGridOptionsx = { 
				pageable: true,
				columns: $scope.columnRekanan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
			$scope.klikx = function(currentx){
				$scope.showEditx = true;
				$scope.currentx = currentx;
				$scope.item.alamatLengkap = currentx.alamatLengkap;
				$scope.item.bankRekeningAtasNama = currentx.bankRekeningAtasNama;
				$scope.item.bankRekeningNama = currentx.bankRekeningNama;
				$scope.item.bankRekeningNomor = currentx.bankRekeningNomor;
				$scope.item.contactPerson = currentx.contactPerson;
				$scope.item.namaDesaKelurahan = currentx.namaDesaKelurahan;
				$scope.item.email = currentx.email;
				$scope.item.faksimile = currentx.faksimile;
				$scope.item.account = currentx.account;
				$scope.item.accountId = currentx.accountId;
				$scope.item.desaKelurahan = currentx.desaKelurahan;
				$scope.item.desaKelurahanId = currentx.desaKelurahanId;
				$scope.item.jenisRekanan = currentx.jenisRekanan;
				$scope.item.jenisRekananId = currentx.jenisRekananId;
				$scope.item.kecamatan = currentx.kecamatan;
				$scope.item.kecamatanId = currentx.kecamatanId;
				$scope.item.kotaKabupaten = currentx.kotaKabupaten;
				$scope.item.kotaKabupatenId = currentx.kotaKabupatenId;
				$scope.item.pegawai = currentx.pegawai;
				$scope.item.pegawaiId = currentx.pegawaiId;
				$scope.item.propinsi = currentx.propinsi;
				$scope.item.propinsiId = currentx.propinsiId;
				$scope.item.kdRekanan = currentx.kdRekanan;
				$scope.item.renanans = currentx.renanans;
				$scope.item.rekananHead = currentx.rekananHead;
				$scope.item.rekananHeadId = currentx.rekananHeadId;
				$scope.item.namaKecamatan = currentx.namaKecamatan;
				$scope.item.kodePos = currentx.kodePos;
				$scope.item.namaKotaKabupaten = currentx.namaKotaKabupaten;
				$scope.item.namaRekanan = currentx.namaRekanan;
				$scope.item.noPKP = currentx.noPKP;
				$scope.item.nPWP = currentx.nPWP;
				$scope.item.qRekanan = currentx.qRekanan;
				$scope.item.rTRW = currentx.rTRW;
				$scope.item.telepon = currentx.telepon;
				$scope.item.website = currentx.website;
				$scope.item.id = currentx.id;
				$scope.item.noRec = currentx.noRec;
				$scope.item.reportDisplay = currentx.reportDisplay;
				$scope.item.kodeExternal = currentx.kodeExternal;
				$scope.item.namaExternal = currentx.namaExternal;
				$scope.item.statusEnabled = currentx.statusEnabled;
				// $scope.item.idPelapor = 


			};
			$scope.disableDatax=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Rekanan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initx();

				});
			};

			$scope.enableDatax=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Rekanan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initx();

				});
			};
			$scope.tambahx = function()
			{
				var data = {
					"class": "Rekanan",
					"listField": {
						"alamatLengkap": $scope.item.alamatLengkap,
						"bankRekeningAtasNama": $scope.item.bankRekeningAtasNama,
						"bankRekeningNama": $scope.item.bankRekeningNama,
						"bankRekeningNomor": $scope.item.bankRekeningNomor,
						"contactPerson": $scope.item.contactPerson,
						"namaDesaKelurahan": $scope.item.namaDesaKelurahan,
						"email": $scope.item.email,
						"faksimile": $scope.item.faksimile,
						"account": $scope.item.account,
						"accountId": $scope.item.accountId,
						"desaKelurahan": $scope.item.desaKelurahan,
						"desaKelurahanId": $scope.item.desaKelurahanId,
						"jenisRekanan": $scope.item.jenisRekanan,
						"jenisRekananId": $scope.item.jenisRekananId,
						"kecamatan": $scope.item.kecamatan,
						"kecamatanId": $scope.item.kecamatanId,
						"kotaKabupaten": $scope.item.kotaKabupaten,
						"kotaKabupatenId": $scope.item.kotaKabupatenId,
						"pegawai": $scope.item.pegawai,
						"pegawaiId": $scope.item.pegawaiId,
						"propinsi": $scope.item.propinsi,
						"propinsiId": $scope.item.propinsiId,
						"kdRekanan": $scope.item.kdRekanan,
						"renanans": $scope.item.renanans,
						"rekananHead": $scope.item.rekananHead,
						"rekananHeadId": $scope.item.rekananHeadId,
						"namaKecamatan": $scope.item.namaKecamatan,
						"kodePos": $scope.item.kodePos,
						"namaKotaKabupaten": $scope.item.namaKotaKabupaten,
						"namaRekanan": $scope.item.namaRekanan,
						"noPKP": $scope.item.noPKP,
						"nPWP": $scope.item.nPWP,
						"qRekanan": $scope.item.qRekanan,
						"rTRW": $scope.item.rTRW,
						"telepon": $scope.item.telepon,
						"website": $scope.item.website,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal
					}
				}
				IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initx();
					$scope.item = {};
				});
			}

			$scope.editx = function()
			{	
				var data = {
					"class": "Rekanan",
					"listField": {
						"id": $scope.item.id,
						"alamatLengkap": $scope.item.alamatLengkap,
						"bankRekeningAtasNama": $scope.item.bankRekeningAtasNama,
						"bankRekeningNama": $scope.item.bankRekeningNama,
						"bankRekeningNomor": $scope.item.bankRekeningNomor,
						"contactPerson": $scope.item.contactPerson,
						"namaDesaKelurahan": $scope.item.namaDesaKelurahan,
						"email": $scope.item.email,
						"faksimile": $scope.item.faksimile,
						"account": $scope.item.account,
						"accountId": $scope.item.accountId,
						"desaKelurahan": $scope.item.desaKelurahan,
						"desaKelurahanId": $scope.item.desaKelurahanId,
						"jenisRekanan": $scope.item.jenisRekanan,
						"jenisRekananId": $scope.item.jenisRekananId,
						"kecamatan": $scope.item.kecamatan,
						"kecamatanId": $scope.item.kecamatanId,
						"kotaKabupaten": $scope.item.kotaKabupaten,
						"kotaKabupatenId": $scope.item.kotaKabupatenId,
						"pegawai": $scope.item.pegawai,
						"pegawaiId": $scope.item.pegawaiId,
						"propinsi": $scope.item.propinsi,
						"propinsiId": $scope.item.propinsiId,
						"kdRekanan": $scope.item.kdRekanan,
						"renanans": $scope.item.renanans,
						"rekananHead": $scope.item.rekananHead,
						"rekananHeadId": $scope.item.rekananHeadId,
						"namaKecamatan": $scope.item.namaKecamatan,
						"kodePos": $scope.item.kodePos,
						"namaKotaKabupaten": $scope.item.namaKotaKabupaten,
						"namaRekanan": $scope.item.namaRekanan,
						"noPKP": $scope.item.noPKP,
						"nPWP": $scope.item.nPWP,
						"qRekanan": $scope.item.qRekanan,
						"rTRW": $scope.item.rTRW,
						"telepon": $scope.item.telepon,
						"website": $scope.item.website,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
						"statusEnabled": $scope.item.statusEnabled,
						"noRec": $scope.item.noRec
					}
				}
				IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initx();
				});
			}
			$scope.batalx = function () {
				$scope.showEditx = false;
				$scope.item = {};
			}
			
			var initc = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisTarif", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisTarif;
					
					$scope.dataSourcec = new kendo.data.DataSource({
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
			initc();
			$scope.columnJenisTarif = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisTarif",
				"title": "jenis Tarif"
			},
			{
				"field": "kdJenisTarif",
				"title": "kd Jenis Tarif"
			},
			{
				"field": "qJenisTarif",
				"title": "q Jenis Tarif"
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
    			"template" : "<button class='btnEdit' ng-click='enableDatac()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDatac()'>Disable</button>"
			}
			];

			$scope.mainGridOptionsc = { 
                pageable: true,
                columns: $scope.columnJenisTarif,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikc = function(currentc){
            	$scope.showEditc = true;
				$scope.currentc = currentc;
				// debugger;
				$scope.item.id = currentc.id;
				$scope.item.noRec = currentc.noRec;
				$scope.item.statusEnabled = currentc.statusEnabled;
				$scope.item.jenisTarif = currentc.jenisTarif;
				$scope.item.kdJenisTarif = currentc.kdJenisTarif;
				$scope.item.qJenisTarif = currentc.qJenisTarif;
				$scope.item.reportDisplay = currentc.reportDisplay;
				$scope.item.kodeExternal = currentc.kodeExternal;
				$scope.item.namaExternal = currentc.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatac=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisTarif&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initc();

				});
			};

			$scope.enableDatac=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisTarif&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initc();

				});
			};
			$scope.tambahc = function()
		    {
		        var data = {
					"class": "JenisTarif",
					"listField": {
							"jenisTarif": $scope.item.jenisTarif,
					 		"kdJenisTarif": $scope.item.kdJenisTarif,
					 		"qJenisTarif": $scope.item.qJenisTarif,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initc();
					$scope.item = {};
		        });
		    }

		    $scope.editc = function()
		    {	
		        var data = {
					"class": "JenisTarif",
					"listField": {
							"id": $scope.item.id,
							"jenisTarif": $scope.item.jenisTarif,
					 		"kdJenisTarif": $scope.item.kdJenisTarif,
					 		"qJenisTarif": $scope.item.qJenisTarif,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initc();
		        });
		    }
		    $scope.batalc = function () {
		    	$scope.showEditc = false;
		    	$scope.item = {};
		    }
			
			 var initk = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokPasien", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KelompokPasien;
                                    					
$scope.dataSourcek = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initk();




$scope.columnKelompokPasien = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisTarif",
"title": "jenis Tarif"
},
{
"field": "jenisTarifId",
"title": "jenis Tarif Id"
},
{
"field": "kdKelompokPasien",
"title": "kd Kelompok Pasien"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "qKelompokPasien",
"title": "q Kelompok Pasien"
},
{
"field": "statusIsiSJP",
"title": "status Isi SJP"
},
{
"field": "id",
"title": "id"
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
$scope.mainGridOptionsk = { 
 pageable: true,
 columns: $scope.columnKelompokPasien,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikk = function(currentk){
$scope.showEditk = true;
$scope.currentk = currentk;
$scope.item.jenisTarif = currentk.jenisTarif;
$scope.item.jenisTarifId = currentk.jenisTarifId;
$scope.item.kdKelompokPasien = currentk.kdKelompokPasien;
$scope.item.kelompokPasien = currentk.kelompokPasien;
$scope.item.qKelompokPasien = currentk.qKelompokPasien;
$scope.item.statusIsiSJP = currentk.statusIsiSJP;
$scope.item.id = currentk.id;
$scope.item.noRec = currentk.noRec;
$scope.item.reportDisplay = currentk.reportDisplay;
$scope.item.kodeExternal = currentk.kodeExternal;
$scope.item.namaExternal = currentk.namaExternal;
$scope.item.statusEnabled = currentk.statusEnabled;
};
$scope.disableDatak=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokPasien&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initk();
 });
 };
$scope.enableDatak=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokPasien&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initk();

	});
};

$scope.tambahk = function()
 {
var data = {
	"class": "KelompokPasien",
	"listField": {
"jenisTarif": $scope.item.jenisTarif,
"jenisTarifId": $scope.item.jenisTarifId,
"kdKelompokPasien": $scope.item.kdKelompokPasien,
"kelompokPasien": $scope.item.kelompokPasien,
"qKelompokPasien": $scope.item.qKelompokPasien,
"statusIsiSJP": $scope.item.statusIsiSJP,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initk();
$scope.item = {};
 });
  }

 $scope.editk = function()
  {	
   var data = {
 "class": "KelompokPasien",
	"listField": {
"jenisTarif": $scope.item.jenisTarif,
"jenisTarifId": $scope.item.jenisTarifId,
"kdKelompokPasien": $scope.item.kdKelompokPasien,
"kelompokPasien": $scope.item.kelompokPasien,
"qKelompokPasien": $scope.item.qKelompokPasien,
"statusIsiSJP": $scope.item.statusIsiSJP,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initk();
});
}
$scope.batalk = function () {
$scope.showEditk = false;
$scope.item = {};
}
IPSRSService.getFieldListData("JenisTarif&select=id,namaExternal", true).then(function(dat){
$scope.listjenisTarif= dat.data;
});
var inith = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapKelompokPasienToPenjamin", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapKelompokPasienToPenjamin;
                                    					
$scope.dataSourceh = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inith();




$scope.columnMapKelompokPasienToPenjamin = [
{
"field": "No",
"title": "No"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
},
{
"field": "id",
"title": "id"
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
$scope.mainGridOptionsh = { 
 pageable: true,
 columns: $scope.columnMapKelompokPasienToPenjamin,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikh = function(currenth){
$scope.showEdith = true;
$scope.currenth = currenth;
$scope.item.kelompokPasien = currenth.kelompokPasien;
$scope.item.kelompokPasienId = currenth.kelompokPasienId;
$scope.item.kdPenjaminPasien = currenth.kdPenjaminPasien;
$scope.item.id = currenth.id;
$scope.item.noRec = currenth.noRec;
$scope.item.reportDisplay = currenth.reportDisplay;
$scope.item.kodeExternal = currenth.kodeExternal;
$scope.item.namaExternal = currenth.namaExternal;
$scope.item.statusEnabled = currenth.statusEnabled;
};
$scope.disableDatah=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKelompokPasienToPenjamin&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 inith();
 });
 };
$scope.enableDatah=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKelompokPasienToPenjamin&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 inith();

	});
};

$scope.tambahh = function()
 {
var data = {
	"class": "MapKelompokPasienToPenjamin",
	"listField": {
"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
inith();
$scope.item = {};
 });
  }

 $scope.edith = function()
  {	
   var data = {
 "class": "MapKelompokPasienToPenjamin",
	"listField": {
"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
inith();
});
}
$scope.batalh = function () {
$scope.showEdith = false;
$scope.item = {};
}
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});

 var initz = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=HubunganPesertaAsuransi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.HubunganPesertaAsuransi;
                                    					
$scope.dataSourcez = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initz();




$scope.columnHubunganPesertaAsuransi = [
{
"field": "No",
"title": "No"
},
{
"field": "hubunganPeserta",
"title": "hubungan Peserta"
},
{
"field": "kdHubunganPeserta",
"title": "kd Hubungan Peserta"
},
{
"field": "qHubunganPeserta",
"title": "q Hubungan Peserta"
},
{
"field": "id",
"title": "id"
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
	"template" : "<button class='btnEdit' ng-click='enableDataz()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDataz()'>Disable</button>"
}
];
$scope.mainGridOptionsz = { 
 pageable: true,
 columns: $scope.columnHubunganPesertaAsuransi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikz = function(currentz){
$scope.showEditz = true;
$scope.currentz = currentz;
$scope.item.hubunganPeserta = currentz.hubunganPeserta;
$scope.item.kdHubunganPeserta = currentz.kdHubunganPeserta;
$scope.item.qHubunganPeserta = currentz.qHubunganPeserta;
$scope.item.id = currentz.id;
$scope.item.noRec = currentz.noRec;
$scope.item.reportDisplay = currentz.reportDisplay;
$scope.item.kodeExternal = currentz.kodeExternal;
$scope.item.namaExternal = currentz.namaExternal;
$scope.item.statusEnabled = currentz.statusEnabled;
};
$scope.disableDataz=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HubunganPesertaAsuransi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initz();
 });
 };
$scope.enableDataz=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HubunganPesertaAsuransi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initz();

	});
};

$scope.tambahz = function()
 {
var data = {
	"class": "HubunganPesertaAsuransi",
	"listField": {
"hubunganPeserta": $scope.item.hubunganPeserta,
"kdHubunganPeserta": $scope.item.kdHubunganPeserta,
"qHubunganPeserta": $scope.item.qHubunganPeserta,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initz();
$scope.item = {};
 });
  }

 $scope.editz = function()
  {	
   var data = {
 "class": "HubunganPesertaAsuransi",
	"listField": {
"hubunganPeserta": $scope.item.hubunganPeserta,
"kdHubunganPeserta": $scope.item.kdHubunganPeserta,
"qHubunganPeserta": $scope.item.qHubunganPeserta,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initz();
});
}
$scope.batalz = function () {
$scope.showEditz = false;
$scope.item = {};
}



var initj = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapGolonganAsuransiToKelas", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapGolonganAsuransiToKelas;
                                    					
$scope.dataSourcej = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initj();




$scope.columnMapGolonganAsuransiToKelas = [
{
"field": "No",
"title": "No"
},
{
"field": "kdGolonganAsuransi",
"title": "kd Golongan Asuransi"
},
{
"field": "golonganAsuransiId",
"title": "golongan Asuransi Id"
},
{
"field": "hubunganPeserta",
"title": "hubungan Peserta"
},
{
"field": "hubunganPesertaId",
"title": "hubungan Peserta Id"
},
{
"field": "kelas",
"title": "kelas"
},
{
"field": "kelasId",
"title": "kelas Id"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
},
{
"field": "id",
"title": "id"
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
	"template" : "<button class='btnEdit' ng-click='enableDataj()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDataj()'>Disable</button>"
}
];
$scope.mainGridOptionsj = { 
 pageable: true,
 columns: $scope.columnMapGolonganAsuransiToKelas,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikj = function(currentj){
$scope.showEditj = true;
$scope.currentj = currentj;
$scope.item.kdGolonganAsuransi = currentj.kdGolonganAsuransi;
$scope.item.golonganAsuransiId = currentj.golonganAsuransiId;
$scope.item.hubunganPeserta = currentj.hubunganPeserta;
$scope.item.hubunganPesertaId = currentj.hubunganPesertaId;
$scope.item.kelas = currentj.kelas;
$scope.item.kelasId = currentj.kelasId;
$scope.item.kelompokPasien = currentj.kelompokPasien;
$scope.item.kelompokPasienId = currentj.kelompokPasienId;
$scope.item.kdPenjaminPasien = currentj.kdPenjaminPasien;
$scope.item.id = currentj.id;
$scope.item.noRec = currentj.noRec;
$scope.item.reportDisplay = currentj.reportDisplay;
$scope.item.kodeExternal = currentj.kodeExternal;
$scope.item.namaExternal = currentj.namaExternal;
$scope.item.statusEnabled = currentj.statusEnabled;
};
$scope.disableDataj=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapGolonganAsuransiToKelas&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initj();
 });
 };
$scope.enableDataj=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapGolonganAsuransiToKelas&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initj();

	});
};

$scope.tambahj = function()
 {
var data = {
	"class": "MapGolonganAsuransiToKelas",
	"listField": {
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"golonganAsuransiId": $scope.item.golonganAsuransiId,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initj();
$scope.item = {};
 });
  }

 $scope.editj = function()
  {	
   var data = {
 "class": "MapGolonganAsuransiToKelas",
	"listField": {
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"golonganAsuransiId": $scope.item.golonganAsuransiId,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initj();
});
}
$scope.batalj = function () {
$scope.showEditj = false;
$scope.item = {};
}
IPSRSService.getFieldListData("GolonganAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listkdgolonganasuransi= dat.data;
});
IPSRSService.getFieldListData("HubunganPesertaAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listhubunganpeserta= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});


var initt = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapPenjaminToDokumenRegistrasi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapPenjaminToDokumenRegistrasi;
                                    					
$scope.dataSourcet = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initt();




$scope.columnMapPenjaminToDokumenRegistrasi = [
{
"field": "No",
"title": "No"
},
{
"field": "dokumen",
"title": "dokumen"
},
{
"field": "dokumenId",
"title": "dokumen Id"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
},
{
"field": "id",
"title": "id"
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
	"template" : "<button class='btnEdit' ng-click='enableDatat()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatat()'>Disable</button>"
}
];
$scope.mainGridOptionst = { 
 pageable: true,
 columns: $scope.columnMapPenjaminToDokumenRegistrasi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikt = function(currentt){
$scope.showEditt= true;
$scope.currentt = currentt;
$scope.item.dokumen = currentt.dokumen;
$scope.item.dokumenId = currentt.dokumenId;
$scope.item.kelompokPasien = currentt.kelompokPasien;
$scope.item.kelompokPasienId = currentt.kelompokPasienId;
$scope.item.kdPenjaminPasien = currentt.kdPenjaminPasien;
$scope.item.id = currentt.id;
$scope.item.noRec = currentt.noRec;
$scope.item.reportDisplay = currentt.reportDisplay;
$scope.item.kodeExternal = currentt.kodeExternal;
$scope.item.namaExternal = currentt.namaExternal;
$scope.item.statusEnabled = currentt.statusEnabled;
};
$scope.disableDatat=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPenjaminToDokumenRegistrasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initt();
 });
 };
$scope.enableDatat=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPenjaminToDokumenRegistrasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initt();

	});
};

$scope.tambaht = function()
 {
var data = {
	"class": "MapPenjaminToDokumenRegistrasi",
	"listField": {
"dokumen": $scope.item.dokumen,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initt();
$scope.item = {};
 });
  }

 $scope.editt = function()
  {	
   var data = {
 "class": "MapPenjaminToDokumenRegistrasi",
	"listField": {
"dokumen": $scope.item.dokumen,
"dokumenId": $scope.item.dokumenId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initt();
});
}
$scope.batalt = function () {
$scope.showEditt = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Dokumen&select=id,namaExternal", true).then(function(dat){
$scope.listdokumen= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});























			

		}
		]);
});