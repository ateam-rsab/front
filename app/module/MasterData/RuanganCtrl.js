define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RuanganCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Ruangan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Ruangan;
					
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
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("ModulAplikasi&select=id,modulAplikasi", true).then(function(dat){
				$scope.listmodulAplikasi = dat.data;
			});

			IPSRSService.getFieldListData("pegawaiKepala&select=id,namaExternal", true).then(function(dat){
				$scope.listpegawaiKepala = dat.data;
			});
			IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
				$scope.listruangan = dat.data;
			});
			IPSRSService.getFieldListData("KelasHead&select=id,namaExternal", true).then(function(dat){
				$scope.listkelasHead = dat.data;
			});
			$scope.columnRuangan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdInternal",
				"title": "kd Internal"
			},
			{
				"field": "alamatEmail",
				"title": "alamat Email"
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
				"field": "jamBuka",
				"title": "jam Buka"
			},
			{
				"field": "jamTutup",
				"title": "jam Tutup"
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
				"field": "kelasHead",
				"title": "kelas Head"
			},
			{
				"field": "kelasHeadId",
				"title": "kelas Head Id"
			},
			{
				"field": "modulAplikasi",
				"title": "modul Aplikasi"
			},
			{
				"field": "modulAplikasiId",
				"title": "modul Aplikasi Id"
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
				"field": "kdRuangan",
				"title": "kd Ruangan"
			},
			{
				"field": "lokasiRuangan",
				"title": "lokasi Ruangan"
			},
			{
				"field": "mobilePhone",
				"title": "mobile Phone"
			},
			{
				"field": "namaRuangan",
				"title": "nama Ruangan"
			},
			{
				"field": "noCounter",
				"title": "no Counter"
			},
			{
				"field": "noRuangan",
				"title": "no Ruangan"
			},
			{
				"field": "prefixNoAntrian",
				"title": "prefix No Antrian"
			},
			{
				"field": "qRuangan",
				"title": "q Ruangan"
			},
			{
				"field": "statusViewData",
				"title": "status View Data"
			},
			{
				"field": "website",
				"title": "website"
			},
			{
				"field": "tanggal",
				"title": "tanggal"
			},
			{
				"field": "headRuangan",
				"title": "head Ruangan"
			},
			{
				"field": "headRuanganId",
				"title": "head Ruangan Id"
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
                columns: $scope.columnRuangan,
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
				$scope.item.kdInternal = current.kdInternal;
				$scope.item.alamatEmail = current.alamatEmail;
				$scope.item.faksimile = current.faksimile;
				$scope.item.fixedPhone = current.fixedPhone;
				$scope.item.jamBuka = current.jamBuka;
				$scope.item.jamTutup = current.jamTutup;
				$scope.item.departemen = current.departemen;
				$scope.item.departemenId = current.departemenId;
				$scope.item.kelasHead = current.kelasHead;
				$scope.item.kelasHeadId = current.kelasHeadId;
				$scope.item.modulAplikasi = current.modulAplikasi;
				$scope.item.modulAplikasiId = current.modulAplikasiId;
				$scope.item.pegawaiKepala = current.pegawaiKepala;
				$scope.item.pegawaiKepalaId = current.pegawaiKepalaId;
				$scope.item.kdRuangan = current.kdRuangan;
				$scope.item.lokasiRuangan = current.lokasiRuangan;
				$scope.item.mobilePhone = current.mobilePhone;
				$scope.item.namaRuangan = current.namaRuangan;
				$scope.item.noCounter = current.noCounter;
				$scope.item.noRuangan = current.noRuangan;
				$scope.item.prefixNoAntrian = current.prefixNoAntrian;
				$scope.item.qRuangan = current.qRuangan;
				$scope.item.statusViewData = current.statusViewData;
				$scope.item.website = current.website;
				$scope.item.tanggal = current.tanggal;
				$scope.item.headRuangan = current.headRuangan;
				$scope.item.headRuanganId = current.headRuanganId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Ruangan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Ruangan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Ruangan",
					"listField": {
							"kdInternal": $scope.item.kdInternal,
					 		"alamatEmail": $scope.item.alamatEmail,
					 		"faksimile": $scope.item.faksimile,
					 		"fixedPhone": $scope.item.fixedPhone,
					 		"jamBuka": $scope.item.jamBuka,
					 		"jamTutup": $scope.item.jamTutup,
					 		"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kelasHead": $scope.item.kelasHead,
					 		"kelasHeadId": $scope.item.kelasHeadId,
					 		"modulAplikasi": $scope.item.modulAplikasi,
					 		"modulAplikasiId": $scope.item.modulAplikasiId,
					 		"pegawaiKepala": $scope.item.pegawaiKepala,
					 		"pegawaiKepalaId": $scope.item.pegawaiKepalaId,
					 		"kdRuangan": $scope.item.kdRuangan,
					 		"lokasiRuangan": $scope.item.lokasiRuangan,
					 		"mobilePhone": $scope.item.mobilePhone,
					 		"namaRuangan": $scope.item.namaRuangan,
					 		"noCounter": $scope.item.noCounter,
					 		"noRuangan": $scope.item.noRuangan,
					 		"prefixNoAntrian": $scope.item.prefixNoAntrian,
					 		"qRuangan": $scope.item.qRuangan,
					 		"statusViewData": $scope.item.statusViewData,
					 		"website": $scope.item.website,
					 		"tanggal": $scope.item.tanggal,
					 		"headRuangan": $scope.item.headRuangan,
					 		"headRuanganId": $scope.item.headRuanganId,
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
					"class": "Ruangan",
					"listField": {
							"id": $scope.item.id,
							"kdInternal": $scope.item.kdInternal,
					 		"alamatEmail": $scope.item.alamatEmail,
					 		"faksimile": $scope.item.faksimile,
					 		"fixedPhone": $scope.item.fixedPhone,
					 		"jamBuka": $scope.item.jamBuka,
					 		"jamTutup": $scope.item.jamTutup,
					 		"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kelasHead": $scope.item.kelasHead,
					 		"kelasHeadId": $scope.item.kelasHeadId,
					 		"modulAplikasi": $scope.item.modulAplikasi,
					 		"modulAplikasiId": $scope.item.modulAplikasiId,
					 		"pegawaiKepala": $scope.item.pegawaiKepala,
					 		"pegawaiKepalaId": $scope.item.pegawaiKepalaId,
					 		"kdRuangan": $scope.item.kdRuangan,
					 		"lokasiRuangan": $scope.item.lokasiRuangan,
					 		"mobilePhone": $scope.item.mobilePhone,
					 		"namaRuangan": $scope.item.namaRuangan,
					 		"noCounter": $scope.item.noCounter,
					 		"noRuangan": $scope.item.noRuangan,
					 		"prefixNoAntrian": $scope.item.prefixNoAntrian,
					 		"qRuangan": $scope.item.qRuangan,
					 		"statusViewData": $scope.item.statusViewData,
					 		"website": $scope.item.website,
					 		"tanggal": $scope.item.tanggal,
					 		"headRuangan": $scope.item.headRuangan,
					 		"headRuanganId": $scope.item.headRuanganId,
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