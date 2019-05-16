define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekananCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Rekanan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Rekanan;
					
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

			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnRekanan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.alamatLengkap = current.alamatLengkap;
				$scope.item.bankRekeningAtasNama = current.bankRekeningAtasNama;
				$scope.item.bankRekeningNama = current.bankRekeningNama;
				$scope.item.bankRekeningNomor = current.bankRekeningNomor;
				$scope.item.contactPerson = current.contactPerson;
				$scope.item.namaDesaKelurahan = current.namaDesaKelurahan;
				$scope.item.email = current.email;
				$scope.item.faksimile = current.faksimile;
				$scope.item.account = current.account;
				$scope.item.accountId = current.accountId;
				$scope.item.desaKelurahan = current.desaKelurahan;
				$scope.item.desaKelurahanId = current.desaKelurahanId;
				$scope.item.jenisRekanan = current.jenisRekanan;
				$scope.item.jenisRekananId = current.jenisRekananId;
				$scope.item.kecamatan = current.kecamatan;
				$scope.item.kecamatanId = current.kecamatanId;
				$scope.item.kotaKabupaten = current.kotaKabupaten;
				$scope.item.kotaKabupatenId = current.kotaKabupatenId;
				$scope.item.pegawai = current.pegawai;
				$scope.item.pegawaiId = current.pegawaiId;
				$scope.item.propinsi = current.propinsi;
				$scope.item.propinsiId = current.propinsiId;
				$scope.item.kdRekanan = current.kdRekanan;
				$scope.item.renanans = current.renanans;
				$scope.item.rekananHead = current.rekananHead;
				$scope.item.rekananHeadId = current.rekananHeadId;
				$scope.item.namaKecamatan = current.namaKecamatan;
				$scope.item.kodePos = current.kodePos;
				$scope.item.namaKotaKabupaten = current.namaKotaKabupaten;
				$scope.item.namaRekanan = current.namaRekanan;
				$scope.item.noPKP = current.noPKP;
				$scope.item.nPWP = current.nPWP;
				$scope.item.qRekanan = current.qRekanan;
				$scope.item.rTRW = current.rTRW;
				$scope.item.telepon = current.telepon;
				$scope.item.website = current.website;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
				// $scope.item.idPelapor = 


			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Rekanan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Rekanan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
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
						
						"desaKelurahan": $scope.item.desaKelurahan,
						
						"jenisRekanan": $scope.item.jenisRekanan,
						
						"kecamatan": $scope.item.kecamatan,
						
						"kotaKabupaten": $scope.item.kotaKabupaten,
					
						"pegawai": $scope.item.pegawai,
						
						"propinsi": $scope.item.propinsi,
						
						"kdRekanan": $scope.item.kdRekanan,
						"renanans": $scope.item.renanans,
						"rekananHead": $scope.item.rekananHead,
						
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
					init();
					$scope.item = {};
				});
			}

			$scope.edit = function()
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
						
						"desaKelurahan": $scope.item.desaKelurahan,
					
						"jenisRekanan": $scope.item.jenisRekanan,
						
						"kecamatan": $scope.item.kecamatan,
					
						"kotaKabupaten": $scope.item.kotaKabupaten,
					
						"pegawai": $scope.item.pegawai,
					
						"propinsi": $scope.item.propinsi,
						
						"kdRekanan": $scope.item.kdRekanan,
						"renanans": $scope.item.renanans,
						"rekananHead": $scope.item.rekananHead,
					
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