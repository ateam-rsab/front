define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('SuratMasukCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'FindSarpras', 'ManageSarpras',
		function($rootScope, $scope, ModelItem, $state, DateHelper, FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.titled = "Surat Masuk";
			ModelItem.get("Ketatausahaan/SuratMasuk").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				// $scope.item.nomorDraftSurat = "DRAFT20160828000006";
				// $scope.name = 'Whiel';
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		
			var files;
			
		    $scope.onSelectFile = function(e)
		    {
		    	files = e.files
		    }

			$scope.Upload = function()
			{
				var f = files;
				{
					debugger;
				    var fr = new FileReader();
				    if (FileReader && f && f.length) {
				      fr.readAsDataURL(f[0].rawFile);
				      fr.onload = function () {

				      	var imageData = fr.result
				      	var tempArray = imageData.split(",");

				      	var dataPost = {
						    // Create a view
						    fileInput: tempArray[1],
						    fileName: f[0].name
						};

				      	ManageSarpras.sampleUploadFile(dataPost).then(function(e) {

	                	});
				      };
				    }
				}
			}
			$scope.SourceJenisArsip = [
				{
					"id": "1",
					"nama": "Aktif"
				},
				{
					"id": "2",
					"nama": "In Aktif"
				}
			];
			$scope.sourceWaktu = [
				{
					"id": "1",
					"waktu": "Tahun"
				},
				{
					"id": "2",
					"waktu": "Bulan"
				},
				{
					"id": "3",
					"waktu": "Hari"
				}
			];
			FindSarpras.getSarpras("service/list-generic/?view=LoginUser&select=id,namaUser").then(function(dat){
				$scope.sourcePenerimaSurat = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=TipePengirimSurat&select=id,name").then(function(dat){
				$scope.sourceTipePengirim = dat.data;
			});
			FindSarpras.getSarpras("service/list-generic/?view=SifatSurat&select=id,name").then(function(dat){
				$scope.sourceSifatSurat = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=StatusBerkas&select=id,name").then(function(dat){
				$scope.sourceStatusBerkas = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=JenisSurat&select=id,name").then(function(dat){
				$scope.sourceJenisSurat = dat;
			});
			FindSarpras.getSarpras("user/get-all-user/").then(function(dat){
				$scope.sourceNamaPengirim = dat.data.data.data;
			});
			FindSarpras.getSarpras("user/get-all-user/").then(function(dat){
				$scope.sourceTujuanSurat= dat.data.data.data;
			});
			FindSarpras.getSarpras("service/list-generic/?view=KlasifikasiArsip&select=id,name").then(function(dat){
				$scope.sourceKlasifikasiArsip = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=SubKlasifikasiArsip&select=id,name").then(function(dat){
				$scope.sourceSubKlasifikasiArsip = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat){
				$scope.sourceRuangan = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=StatusYaTidak&select=id,name").then(function(dat){
				$scope.sourceStatusArsip= dat;
			});
			FindSarpras.getSarpras("surat/find-all-surat/").then(function(dat){
				$scope.sourceDaftarSurat= dat.data.data.data;
			});	

			$scope.number = function(){
				console.log($scope.item.tipeSurat);
				if ($scope.item.tipeSurat.name == "Internal"){
					$scope.penomoranInt = true;
					$scope.penomoranEks = false;

				}else{
					$scope.penomoranEks = true;
					$scope.penomoranInt = false;
				}
			};
			
			
			$scope.Save = function(){
				// var TglTerima = DateHelper.getTanggalFormatted($scope.item.TglTerima);
				var TglTerima = $scope.now;
				// var TglSurat = DateHelper.getTanggalFormatted($scope.item.tanggal);
            	var data = {
            		"alamatPengirim": $scope.item.alamatPengirim,
            		"tipePengirimSurat": {
            			"id": $scope.item.tipePengirimSurat.id
            		},
            		"tglTerima": TglTerima,
            		"lampiranPerihal" : $scope.item.lampiranPerihal,
            		"statusKeaktifanJenisArsip": {
            			"id": $scope.item.jenisArsip.id
            		},
            		"perihal": $scope.item.perihal,
            		"subKlasifikasiArsip": $scope.item.subKlasifikasiArsip,
            		"loginUserPenerimaSurat": {
            			"id": $scope.item.penerimaSurat.id
            		},
            		"ruanganPenerima": {
            			"id": $scope.item.ruanganPenerima.id
            		},
            		"keterangan": $scope.item.keterangan,
            		"userPegawaiTujuan": {
            			"id": $scope.item.tujuanSurat.id
            		},
            		"statusBerkas" : {
            			"id": $scope.item.statusBerkas.id
            		},
            		"kdruangantujuan": {
            			"id" : $scope.item.ruanganTujuan.id
            		},
            		"userPegawaiPengirim": {
            			"id": $scope.item.namaPengirim.id
            		},
            		"ruanganPengirim" : {
            			"id": $scope.item.ruanganPengirim.id
            		},
            		"tanggalSurat" : $scope.item.tanggal,
            		"nodokumen_intern" : $scope.nodokumen_intern,
            		"nomorSuratInternal" : $scope.item.noSurat,
            		"sifatSurat": {
            			"id": $scope.item.sifatSurat.id
            		},
            		"jenisSurat": {
            			"id": $scope.item.jenisSurat.id
            		},
            		"klasifikasiArsip": {
            			"id": $scope.item.klasifikasiArsip.id
            		},
            		"qtyPerihal": $scope.qtyPerihal,
            		"pegawaiPengirimSurat": {
            			"id": $scope.item.namaPengirim.id
            		}
            		// "UploadFile": $scope.item.uploadFile

            	};
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"dokumen-internal/save-dokumen-internal/").then(function(e) {
            		// $scope.item = {};
            	});
			};

		// 	var files;
			
		//     var oFileIn = document.getElementById('fileCOA');
		//     if(oFileIn.addEventListener) {
		//         oFileIn.addEventListener('change', iniFile, true);
		//     }

		//     function iniFile(oEvent) {
		//     	files = oEvent.target.files[0];
		// 	}

		// 	$scope.Upload = function()
		// 	{
		// 		var f = files;
		// 		{
		// 			var reader = new FileReader();
		// 			var name = f.name;
		// 			reader.onload = function(e) {
		// 				var data = e.target.result;
		// 				var wb;

		// 				wb = XLSX.read(data, {type: 'binary'});
		// 				var dataJson = to_json(wb);
		// 				ManageSarpras.uploadDataFromExcel(dataJson).then(function(e) {

	 //                    });
		// 			};

		// 			reader.readAsBinaryString(f);
		// 		}
		// 	}

		// 	function to_json(workbook) {
		// 		var result = [];
		// 		workbook.SheetNames.forEach(function(sheetName) {
		// 			var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		// 			if(roa.length > 0){
		// 				result = roa;
		// 			}
		// 		});
		// 		return result;
		// 	}
		// }
		}
	]);
});
			// $scope.sourceSifatSurat = [
			// 	{
			// 		"id": "1",
			// 		"sifatSurat": "Biasa"
			// 	},
			// 	{
			// 		"id": "2",
			// 		"sifatSurat": "Kilat"
			// 	}
			// ];

			// $scope.sourceKlasifikasi = [
			// 	{
			// 		"id": "1",
			// 		"klasifikasi": "Kerumah Tanggaan"
			// 	}
			// ];

			// $scope.sourceStatusBerkas = [
			// 	{
			// 		"id": "1",
			// 		"statusBerkas": "Asli"
			// 	},
			// 	{
			// 		"id": "2",
			// 		"statusBerkas": "Salinan"
			// 	}
			// ];

			// $scope.sourceSubKlasifikasiArsip = [
			// 	{
			// 		"id": "1",
			// 		"subKlasifikasiArsip": "Klasifikasi Arsip"
			// 	}
			// ];

			// $scope.sourceJenisSurat = [
			// 	{
			// 		"id": "1",
			// 		"jenisSurat": "Biasa"
			// 	}
			// ];

			// $scope.sourceNamaPengirim = [
			// 	{
			// 		"id": "1",
			// 		"namaPengirim": "Kepala Sub Bagian Tata Usaha"
			// 	}
			// ];

			// $scope.sourceMetodeKirim = [
			// 	{
			// 		"id": "1",
			// 		"metodeKirim": "Pos"
			// 	},
			// 	{
			// 		"id": "2",
			// 		"metodeKirim": "Email"
			// 	},
			// 	{
			// 		"id": "3",
			// 		"metodeKirim": "Kurir"
			// 	}
			// ];

			// $scope.sourcePetugasKirim = [
			// 	{
			// 		"id": "1",
			// 		"namaPetugas": "Handoko"
			// 	}
			// ];

			// $scope.sourceTipePengirim = [
			// 	{
			// 		"id": "1",
			// 		"tipe": "Internal"
			// 	},
			// 	{
			// 		"id": "2",
			// 		"tipe": "Eksternal"
			// 	}
			// ];

			// $scope.dat = $scope.sourceTipePengirim[0];

			