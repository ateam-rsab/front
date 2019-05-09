define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelompokProfileCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=StatusSuratIjin", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.StatusSuratIjin;
					
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
			$scope.columnStatusSuratIjin = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdStatusSuratIjin",
				"title": "kd Status Surat Ijin"
			},
			{
				"field": "qStatusSuratIjin",
				"title": "q Status Surat Ijin"
			},
			{
				"field": "statusSuratIjin",
				"title": "status Surat Ijin"
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
                columns: $scope.columnStatusSuratIjin,
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
				$scope.item.kdStatusSuratIjin = current.kdStatusSuratIjin;
				$scope.item.qStatusSuratIjin = current.qStatusSuratIjin;
				$scope.item.statusSuratIjin = current.statusSuratIjin;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusSuratIjin&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusSuratIjin&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "StatusSuratIjin",
					"listField": {
							"kdStatusSuratIjin": $scope.item.kdStatusSuratIjin,
					 		"qStatusSuratIjin": $scope.item.qStatusSuratIjin,
					 		"statusSuratIjin": $scope.item.statusSuratIjin,
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
					"class": "StatusSuratIjin",
					"listField": {
							"id": $scope.item.id,
							"kdStatusSuratIjin": $scope.item.kdStatusSuratIjin,
					 		"qStatusSuratIjin": $scope.item.qStatusSuratIjin,
					 		"statusSuratIjin": $scope.item.statusSuratIjin,
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
			
			var inits = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisProfile", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisProfile;
					
					$scope.dataSources = new kendo.data.DataSource({
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
			inits();
			$scope.columnJenisProfile = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisProfile",
				"title": "jenis Profile"
			},
			{
				"field": "kdJenisProfile",
				"title": "kd Jenis Profile"
			},
			{
				"field": "qJenisProfile",
				"title": "q Jenis Profile"
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
    			"template" : "<button class='btnEdit' ng-click='enableDatas()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDatas()'>Disable</button>"
			}
			];

			$scope.mainGridOptionss = { 
                pageable: true,
                columns: $scope.columnJenisProfile,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.kliks = function(currents){
            	$scope.showEdits = true;
				$scope.currents = currents;
				// debugger;
				$scope.item.id = currents.id;
				$scope.item.noRec = currents.noRec;
				$scope.item.statusEnabled = currents.statusEnabled;
				$scope.item.jenisProfile = currents.jenisProfile;
				$scope.item.kdJenisProfile = currents.kdJenisProfile;
				$scope.item.qJenisProfile = currents.qJenisProfile;
				$scope.item.reportDisplay = currents.reportDisplay;
				$scope.item.kodeExternal = currents.kodeExternal;
				$scope.item.namaExternal = currents.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatas=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisProfile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					inits();

				});
			};

			$scope.enableDatas=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisProfile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					inits();

				});
			};
			$scope.tambahs = function()
		    {
		        var data = {
					"class": "JenisProfile",
					"listField": {
							"jenisProfile": $scope.item.jenisProfile,
					 		"kdJenisProfile": $scope.item.kdJenisProfile,
					 		"qJenisProfile": $scope.item.qJenisProfile,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					inits();
					$scope.item = {};
		        });
		    }

		    $scope.edits = function()
		    {	
		        var data = {
					"class": "JenisProfile",
					"listField": {
							"id": $scope.item.id,
							"jenisProfile": $scope.item.jenisProfile,
					 		"kdJenisProfile": $scope.item.kdJenisProfile,
					 		"qJenisProfile": $scope.item.qJenisProfile,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					inits();
		        });
		    }
		    $scope.batals = function () {
		    	$scope.showEdits = false;
		    	$scope.item = {};
		    }
			
var initx = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokPemilikProfile", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KelompokPemilikProfile;
					
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
			$scope.columnKelompokPemilikProfile = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdKelompokPemilik",
				"title": "kd Kelompok Pemilik"
			},
			{
				"field": "kelompokPemilik",
				"title": "kelompok Pemilik"
			},
			{
				"field": "qKelompokPemilik",
				"title": "q Kelompok Pemilik"
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
    			"template" : "<button class='btnEdit' ng-click='enableDatax()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDatax()'>Disable</button>"
			}
			];

			$scope.mainGridOptionsx = { 
                pageable: true,
                columns: $scope.columnKelompokPemilikProfile,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikx = function(currentx){
            	$scope.showEditx = true;
				$scope.currentx = currentx;
				// debugger;
				$scope.item.id = currentx.id;
				$scope.item.noRec = currentx.noRec;
				$scope.item.statusEnabled = currentx.statusEnabled;
				$scope.item.kdKelompokPemilik = currentx.kdKelompokPemilik;
				$scope.item.kelompokPemilik = currentx.kelompokPemilik;
				$scope.item.qKelompokPemilik = currentx.qKelompokPemilik;
				$scope.item.reportDisplay = currentx.reportDisplay;
				$scope.item.kodeExternal = currentx.kodeExternal;
				$scope.item.namaExternal = currentx.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatax=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokPemilikProfile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initx();

				});
			};

			$scope.enableDatax=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokPemilikProfile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initx();

				});
			};
			$scope.tambahx = function()
		    {
		        var data = {
					"class": "KelompokPemilikProfile",
					"listField": {
							"kdKelompokPemilik": $scope.item.kdKelompokPemilik,
					 		"kelompokPemilik": $scope.item.kelompokPemilik,
					 		"qKelompokPemilik": $scope.item.qKelompokPemilik,
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
					"class": "KelompokPemilikProfile",
					"listField": {
							"id": $scope.item.id,
							"agama": $scope.item.namaKelompokPemilikProfile,
					 		"kdKelompokPemilikProfile": $scope.item.kdKelompokPemilikProfile,
					 		"qKelompokPemilikProfile": $scope.item.qKelompokPemilikProfile,
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


var initq = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=PemilikProfile", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.PemilikProfile;
					
					$scope.dataSourceq = new kendo.data.DataSource({
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
			initq();
			IPSRSService.getFieldListData("KelompokPemilikProfile&select=id,namaExternal", true).then(function(dat){
				$scope.listkelompokPemilik = dat.data;
			});
			$scope.columnPemilikProfile = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kelompokPemilik",
				"title": "kelompok Pemilik"
			},
			{
				"field": "kelompokPemilikId",
				"title": "kelompok Pemilik Id"
			},
			{
				"field": "kdPemilikProfile",
				"title": "kd Pemilik Profile"
			},
			{
				"field": "pemilikProfile",
				"title": "pemilik Profile"
			},
			{
				"field": "qPemilikProfile",
				"title": "q Pemilik Profile"
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
    			"template" : "<button class='btnEdit' ng-click='enableDataq()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDataq()'>Disable</button>"
			}
			];

			$scope.mainGridOptionsq = { 
                pageable: true,
                columns: $scope.columnPemilikProfile,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikq = function(currentq){
            	$scope.showEditq = true;
				$scope.currentq = currentq;
				// debugger;
				$scope.item.id = currentq.id;
				$scope.item.noRec = currentq.noRec;
				$scope.item.statusEnabled = currentq.statusEnabled;
				$scope.item.kelompokPemilik = currentq.kelompokPemilik;
				$scope.item.kelompokPemilikId = currentq.kelompokPemilikId;
				$scope.item.kdPemilikProfile = currentq.kdPemilikProfile;
				$scope.item.pemilikProfile = currentq.pemilikProfile;
				$scope.item.qPemilikProfile = currentq.qPemilikProfile;
				$scope.item.reportDisplay = currentq.reportDisplay;
				$scope.item.kodeExternal = currentq.kodeExternal;
				$scope.item.namaExternal = currentq.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDataq=function(){
				IPSRSService.getClassMaster("delete-master-table?className=PemilikProfile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					initq();

				});
			};

			$scope.enableDataq=function(){
				IPSRSService.getClassMaster("delete-master-table?className=PemilikProfile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					initq();

				});
			};
			$scope.tambahq = function()
		    {
		        var data = {
					"class": "PemilikProfile",
					"listField": {
							"kelompokPemilik": $scope.item.kelompokPemilik,
					 		"kelompokPemilikId": $scope.item.kelompokPemilikId,
					 		"kdPemilikProfile": $scope.item.kdPemilikProfile,
					 		"pemilikProfile": $scope.item.pemilikProfile,
					 		"qPemilikProfile": $scope.item.qPemilikProfile,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initq();
					$scope.item = {};
		        });
		    }

		    $scope.editq = function()
		    {	
		        var data = {
					"class": "PemilikProfile",
					"listField": {
							"id": $scope.item.id,
							"kelompokPemilik": $scope.item.kelompokPemilik,
					 		"kelompokPemilikId": $scope.item.kelompokPemilikId,
					 		"kdPemilikProfile": $scope.item.kdPemilikProfile,
					 		"pemilikProfile": $scope.item.pemilikProfile,
					 		"qPemilikProfile": $scope.item.qPemilikProfile,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					initq();
		        });
		    }
		    $scope.batalq = function () {
		    	$scope.showEditq = false;
		    	$scope.item = {};
		    }
var inita = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Profile", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Profile;
                                    					
$scope.dataSourcea = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inita();




$scope.columnProfile = [
{
"field": "No",
"title": "No"
},
{
"field": "alamatEmail",
"title": "alamat Email"
},
{
"field": "alamatLengkap",
"title": "alamat Lengkap"
},
{
"field": "faksimile",
"title": "faksimile"
},
{
"field": "fixedPhone",
"title": "fixed Phone"
},
{
"field": "gambarLogo",
"title": "gambar Logo"
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
"field": "departemen",
"title": "departemen"
},
{
"field": "departemenId",
"title": "departemen Id"
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
"field": "jenisProfile",
"title": "jenis Profile"
},
{
"field": "jenisProfileId",
"title": "jenis Profile Id"
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
"field": "kecamatan",
"title": "kecamatan"
},
{
"field": "kecamatanId",
"title": "kecamatan Id"
},
{
"field": "kelasLevel",
"title": "kelas Level"
},
{
"field": "kelasLevelId",
"title": "kelas Level Id"
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
"field": "pegawaiKepala",
"title": "pegawai Kepala"
},
{
"field": "pegawaiKepalaId",
"title": "pegawai Kepala Id"
},
{
"field": "pemilikProfile",
"title": "pemilik Profile"
},
{
"field": "pemilikProfileId",
"title": "pemilik Profile Id"
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
"field": "satuanKerja",
"title": "satuan Kerja"
},
{
"field": "satuanKerjaId",
"title": "satuan Kerja Id"
},
{
"field": "statusAkreditasiLast",
"title": "status Akreditasi Last"
},
{
"field": "statusAkreditasiLastId",
"title": "status Akreditasi Last Id"
},
{
"field": "statusSuratIjinLast",
"title": "status Surat Ijin Last"
},
{
"field": "statusSuratIjinLastId",
"title": "status Surat Ijin Last Id"
},
{
"field": "tahapanAkreditasiLast",
"title": "tahapan Akreditasi Last"
},
{
"field": "tahapanAkreditasiLastId",
"title": "tahapan Akreditasi Last Id"
},
{
"field": "kodePos",
"title": "kode Pos"
},
{
"field": "luasBangunan",
"title": "luas Bangunan"
},
{
"field": "luasTanah",
"title": "luas Tanah"
},
{
"field": "messageToPasien",
"title": "message To Pasien"
},
{
"field": "mobilePhone",
"title": "mobile Phone"
},
{
"field": "mottoSemboyan",
"title": "motto Semboyan"
},
{
"field": "namaLengkap",
"title": "nama Lengkap"
},
{
"field": "noPKP",
"title": "no PKP"
},
{
"field": "noSuratIjinLast",
"title": "no Surat Ijin Last"
},
{
"field": "nPWP",
"title": "n PWP"
},
{
"field": "qProfile",
"title": "q Profile"
},
{
"field": "rTRW",
"title": "r TRW"
},
{
"field": "signatureByLast",
"title": "signature By Last"
},
{
"field": "tglAkreditasiLast",
"title": "tgl Akreditasi Last"
},
{
"field": "tglRegistrasi",
"title": "tgl Registrasi"
},
{
"field": "tglSuratIjinExpiredLast",
"title": "tgl Surat Ijin Expired Last"
},
{
"field": "tglSuratIjinLast",
"title": "tgl Surat Ijin Last"
},
{
"field": "website",
"title": "website"
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
	"template" : "<button class='btnEdit' ng-click='enableDataa()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDataa()'>Disable</button>"
}
];
$scope.mainGridOptionsa = { 
 pageable: true,
 columns: $scope.columnProfile,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klika = function(currenta){
$scope.showEdita = true;
$scope.currenta = currenta;
$scope.item.alamatEmail = currenta.alamatEmail;
$scope.item.alamatLengkap = currenta.alamatLengkap;
$scope.item.faksimile = currenta.faksimile;
$scope.item.fixedPhone = currenta.fixedPhone;
$scope.item.gambarLogo = currenta.gambarLogo;
$scope.item.account = currenta.account;
$scope.item.accountId = currenta.accountId;
$scope.item.departemen = currenta.departemen;
$scope.item.departemenId = currenta.departemenId;
$scope.item.desaKelurahan = currenta.desaKelurahan;
$scope.item.desaKelurahanId = currenta.desaKelurahanId;
$scope.item.jenisProfile = currenta.jenisProfile;
$scope.item.jenisProfileId = currenta.jenisProfileId;
$scope.item.jenisTarif = currenta.jenisTarif;
$scope.item.jenisTarifId = currenta.jenisTarifId;
$scope.item.kecamatan = currenta.kecamatan;
$scope.item.kecamatanId = currenta.kecamatanId;
$scope.item.kelasLevel = currenta.kelasLevel;
$scope.item.kelasLevelId = currenta.kelasLevelId;
$scope.item.kotaKabupaten = currenta.kotaKabupaten;
$scope.item.kotaKabupatenId = currenta.kotaKabupatenId;
$scope.item.pegawaiKepala = currenta.pegawaiKepala;
$scope.item.pegawaiKepalaId = currenta.pegawaiKepalaId;
$scope.item.pemilikProfile = currenta.pemilikProfile;
$scope.item.pemilikProfileId = currenta.pemilikProfileId;
$scope.item.propinsi = currenta.propinsi;
$scope.item.propinsiId = currenta.propinsiId;
$scope.item.satuanKerja = currenta.satuanKerja;
$scope.item.satuanKerjaId = currenta.satuanKerjaId;
$scope.item.statusAkreditasiLast = currenta.statusAkreditasiLast;
$scope.item.statusAkreditasiLastId = currenta.statusAkreditasiLastId;
$scope.item.statusSuratIjinLast = currenta.statusSuratIjinLast;
$scope.item.statusSuratIjinLastId = currenta.statusSuratIjinLastId;
$scope.item.tahapanAkreditasiLast = currenta.tahapanAkreditasiLast;
$scope.item.tahapanAkreditasiLastId = currenta.tahapanAkreditasiLastId;
$scope.item.kodePos = currenta.kodePos;
$scope.item.luasBangunan = currenta.luasBangunan;
$scope.item.luasTanah = currenta.luasTanah;
$scope.item.messageToPasien = currenta.messageToPasien;
$scope.item.mobilePhone = currenta.mobilePhone;
$scope.item.mottoSemboyan = currenta.mottoSemboyan;
$scope.item.namaLengkap = currenta.namaLengkap;
$scope.item.noPKP = currenta.noPKP;
$scope.item.noSuratIjinLast = currenta.noSuratIjinLast;
$scope.item.nPWP = currenta.nPWP;
$scope.item.qProfile = currenta.qProfile;
$scope.item.rTRW = currenta.rTRW;
$scope.item.signatureByLast = currenta.signatureByLast;
$scope.item.tglAkreditasiLast = currenta.tglAkreditasiLast;
$scope.item.tglRegistrasi = currenta.tglRegistrasi;
$scope.item.tglSuratIjinExpiredLast = currenta.tglSuratIjinExpiredLast;
$scope.item.tglSuratIjinLast = currenta.tglSuratIjinLast;
$scope.item.website = currenta.website;
$scope.item.id = currenta.id;
$scope.item.noRec = currenta.noRec;
$scope.item.reportDisplay = currenta.reportDisplay;
$scope.item.kodeExternal = currenta.kodeExternal;
$scope.item.namaExternal = currenta.namaExternal;
$scope.item.statusEnabled = currenta.statusEnabled;
};
$scope.disableDataa=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Profile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 inita();
 });
 };
$scope.enableDataa=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Profile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 inita();

	});
};

$scope.tambaha = function()
 {
var data = {
	"class": "Profile",
	"listField": {
"alamatEmail": $scope.item.alamatEmail,
"alamatLengkap": $scope.item.alamatLengkap,
"faksimile": $scope.item.faksimile,
"fixedPhone": $scope.item.fixedPhone,
"gambarLogo": $scope.item.gambarLogo,
"account": $scope.item.account,
"accountId": $scope.item.accountId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"desaKelurahan": $scope.item.desaKelurahan,
"desaKelurahanId": $scope.item.desaKelurahanId,
"jenisProfile": $scope.item.jenisProfile,
"jenisProfileId": $scope.item.jenisProfileId,
"jenisTarif": $scope.item.jenisTarif,
"jenisTarifId": $scope.item.jenisTarifId,
"kecamatan": $scope.item.kecamatan,
"kecamatanId": $scope.item.kecamatanId,
"kelasLevel": $scope.item.kelasLevel,
"kelasLevelId": $scope.item.kelasLevelId,
"kotaKabupaten": $scope.item.kotaKabupaten,
"kotaKabupatenId": $scope.item.kotaKabupatenId,
"pegawaiKepala": $scope.item.pegawaiKepala,
"pegawaiKepalaId": $scope.item.pegawaiKepalaId,
"pemilikProfile": $scope.item.pemilikProfile,
"pemilikProfileId": $scope.item.pemilikProfileId,
"propinsi": $scope.item.propinsi,
"propinsiId": $scope.item.propinsiId,
"satuanKerja": $scope.item.satuanKerja,
"satuanKerjaId": $scope.item.satuanKerjaId,
"statusAkreditasiLast": $scope.item.statusAkreditasiLast,
"statusAkreditasiLastId": $scope.item.statusAkreditasiLastId,
"statusSuratIjinLast": $scope.item.statusSuratIjinLast,
"statusSuratIjinLastId": $scope.item.statusSuratIjinLastId,
"tahapanAkreditasiLast": $scope.item.tahapanAkreditasiLast,
"tahapanAkreditasiLastId": $scope.item.tahapanAkreditasiLastId,
"kodePos": $scope.item.kodePos,
"luasBangunan": $scope.item.luasBangunan,
"luasTanah": $scope.item.luasTanah,
"messageToPasien": $scope.item.messageToPasien,
"mobilePhone": $scope.item.mobilePhone,
"mottoSemboyan": $scope.item.mottoSemboyan,
"namaLengkap": $scope.item.namaLengkap,
"noPKP": $scope.item.noPKP,
"noSuratIjinLast": $scope.item.noSuratIjinLast,
"nPWP": $scope.item.nPWP,
"qProfile": $scope.item.qProfile,
"rTRW": $scope.item.rTRW,
"signatureByLast": $scope.item.signatureByLast,
"tglAkreditasiLast": $scope.item.tglAkreditasiLast,
"tglRegistrasi": $scope.item.tglRegistrasi,
"tglSuratIjinExpiredLast": $scope.item.tglSuratIjinExpiredLast,
"tglSuratIjinLast": $scope.item.tglSuratIjinLast,
"website": $scope.item.website,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
inita();
$scope.item = {};
 });
  }

 $scope.edita = function()
  {	
   var data = {
 "class": "Profile",
	"listField": {
"alamatEmail": $scope.item.alamatEmail,
"alamatLengkap": $scope.item.alamatLengkap,
"faksimile": $scope.item.faksimile,
"fixedPhone": $scope.item.fixedPhone,
"gambarLogo": $scope.item.gambarLogo,
"account": $scope.item.account,
"accountId": $scope.item.accountId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"desaKelurahan": $scope.item.desaKelurahan,
"desaKelurahanId": $scope.item.desaKelurahanId,
"jenisProfile": $scope.item.jenisProfile,
"jenisProfileId": $scope.item.jenisProfileId,
"jenisTarif": $scope.item.jenisTarif,
"jenisTarifId": $scope.item.jenisTarifId,
"kecamatan": $scope.item.kecamatan,
"kecamatanId": $scope.item.kecamatanId,
"kelasLevel": $scope.item.kelasLevel,
"kelasLevelId": $scope.item.kelasLevelId,
"kotaKabupaten": $scope.item.kotaKabupaten,
"kotaKabupatenId": $scope.item.kotaKabupatenId,
"pegawaiKepala": $scope.item.pegawaiKepala,
"pegawaiKepalaId": $scope.item.pegawaiKepalaId,
"pemilikProfile": $scope.item.pemilikProfile,
"pemilikProfileId": $scope.item.pemilikProfileId,
"propinsi": $scope.item.propinsi,
"propinsiId": $scope.item.propinsiId,
"satuanKerja": $scope.item.satuanKerja,
"satuanKerjaId": $scope.item.satuanKerjaId,
"statusAkreditasiLast": $scope.item.statusAkreditasiLast,
"statusAkreditasiLastId": $scope.item.statusAkreditasiLastId,
"statusSuratIjinLast": $scope.item.statusSuratIjinLast,
"statusSuratIjinLastId": $scope.item.statusSuratIjinLastId,
"tahapanAkreditasiLast": $scope.item.tahapanAkreditasiLast,
"tahapanAkreditasiLastId": $scope.item.tahapanAkreditasiLastId,
"kodePos": $scope.item.kodePos,
"luasBangunan": $scope.item.luasBangunan,
"luasTanah": $scope.item.luasTanah,
"messageToPasien": $scope.item.messageToPasien,
"mobilePhone": $scope.item.mobilePhone,
"mottoSemboyan": $scope.item.mottoSemboyan,
"namaLengkap": $scope.item.namaLengkap,
"noPKP": $scope.item.noPKP,
"noSuratIjinLast": $scope.item.noSuratIjinLast,
"nPWP": $scope.item.nPWP,
"qProfile": $scope.item.qProfile,
"rTRW": $scope.item.rTRW,
"signatureByLast": $scope.item.signatureByLast,
"tglAkreditasiLast": $scope.item.tglAkreditasiLast,
"tglRegistrasi": $scope.item.tglRegistrasi,
"tglSuratIjinExpiredLast": $scope.item.tglSuratIjinExpiredLast,
"tglSuratIjinLast": $scope.item.tglSuratIjinLast,
"website": $scope.item.website,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
inita();
});
}
$scope.batala = function () {
$scope.showEdita = false;
$scope.item = {};
}
IPSRSService.getFieldListData("ChartOfAccount&select=id,namaExternal", true).then(function(dat){
$scope.listaccount= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("DesaKelurahan&select=id,namaExternal", true).then(function(dat){
$scope.listdesakelurahan= dat.data;
});
IPSRSService.getFieldListData("JenisProfile&select=id,namaExternal", true).then(function(dat){
$scope.listjenisprofile= dat.data;
});
IPSRSService.getFieldListData("JenisTarif&select=id,namaExternal", true).then(function(dat){
$scope.listjenistarif= dat.data;
});
IPSRSService.getFieldListData("Kecamatan&select=id,namaExternal", true).then(function(dat){
$scope.listkecamatan= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelaslevel= dat.data;
});
IPSRSService.getFieldListData("KotaKabupaten&select=id,namaExternal", true).then(function(dat){
$scope.listkotakabupaten= dat.data;
});
IPSRSService.getFieldListData("LoginUser&select=id,namaExternal", true).then(function(dat){
$scope.listpegawaikepala= dat.data;
});
IPSRSService.getFieldListData("PemilikProfile&select=id,namaExternal", true).then(function(dat){
$scope.listpemilikprofile= dat.data;
});
IPSRSService.getFieldListData("Propinsi&select=id,namaExternal", true).then(function(dat){
$scope.listpropinsi= dat.data;
});
IPSRSService.getFieldListData("SatuanKerja&select=id,namaExternal", true).then(function(dat){
$scope.listsatuankerja= dat.data;
});
IPSRSService.getFieldListData("StatusAkreditasi&select=id,namaExternal", true).then(function(dat){
$scope.liststatusakreditasilast= dat.data;
});
IPSRSService.getFieldListData("StatusSuratIjin&select=id,namaExternal", true).then(function(dat){
$scope.liststatussuratijinlast= dat.data;
});
IPSRSService.getFieldListData("TahapanAkreditasi&select=id,namaExternal", true).then(function(dat){
$scope.listtahapanakreditasilast= dat.data;
});
			
			
			
			


		}
		]);
});