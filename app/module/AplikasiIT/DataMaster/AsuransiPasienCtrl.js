define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('AsuransiPasienCtrl', ['$q', '$rootScope', '$scope', 'ManagePhp','$state','CacheHelper',
	function($q, $rootScope, $scope,ManagePhp,$state,cacheHelper) {
		$scope.item = {};
		$scope.dataVOloaded = true;
		$scope.now = new Date();

	 	var init = function () {
			loadData();	
		}


		init();

		function loadData() {

			var carinocm = "";
			var carinoasuransi = "";
			var carinamapasien = "";
			var carinamapeserta = "";
			
			if ($scope.item.carinocm != undefined) {
				carinocm = "&nocm=" + $scope.item.carinocm;
			}

			if ($scope.item.carinoasuransi != undefined) {
				carinoasuransi = "&noasuransi=" + $scope.item.carinoasuransi;
			}

			if ($scope.item.carinamapasien != undefined) {
				carinamapasien = "&namapasien=" + $scope.item.carinamapasien;
			}

			if ($scope.item.carinamapeserta != undefined) {
				carinamapeserta = "&namapeserta=" + $scope.item.carinamapeserta;
			}

			ManagePhp.getData("asuransi-pasien/get-asuransi-pasien?"+carinocm+carinoasuransi+carinamapasien+carinamapeserta).then(
						function(dat){
							$scope.listDataMaster = dat.data.asuransipasien;
				            
				            $scope.dataSource = new kendo.data.DataSource(

					            {
									pageSize: 10,
									data: $scope.listDataMaster,
									autoSync: true

								}

							);

						}
					);
		}


		$scope.cari = function () {
			
			loadData()
		}  

		$scope.hapus = function () {
			ManagePhp.getData("asuransi-pasien/hapus-asuransi-pasien?id="+$scope.item.id).then(function (e) {
			
				if (e.Status=400){
					toastr.error(e.data.message);
				}else{
					$scope.item = {};
					toastr.success(e.data.message);
					init();
					
				}
					

				});
		}

		$scope.columnAsuransiPasien = [
					{
						"field": "no",
						"title": "No"
					},
					{
						"field": "id",
						"title": "ID"
					},
					{
						"field": "nocm",
						"title": "No Cm"
					},
					
					{
						"field": "nocmfk",
						"title": "No Cm FK",
						"hidden": "true"

					},
					{
						"field": "namapasien",
						"title": "Nama Pasien"
					},
					{
						"field": "namapeserta",
						"title": "Nama Peserta"
					},
					{
						"field": "jeniskelamin",
						"title": "Jenis Kelamin",
						"hidden": "true"
					},
					{
						"field": "hubunganpeserta",
						"title": "Hubungan Peserta"
					},
					{
						"field": "alamatlengkap",
						"title": "Alamat Lengkap"
					},
					{
						"field": "golonganasuransi",
						"title": "Golongan Asuransi",
						"hidden": "true"
					},
					{
						"field": "objectgolonganasuransifk",
						"title": "Golongan Asuransi Id",
						"hidden": "true"
					},
					
					{
						"field": "objecthubunganpesertafk",
						"title": "Hubungan Peserta Id",
						"hidden": "true"
					},
					{
						"field": "kdinstitusiasal",
						"title": "Kd Institusi Asal",
						"hidden": "true"
					},
					
					{
						"field": "objectjeniskelaminfk",
						"title": "Jenis Kelamin Id",
						"hidden": "true"
					},
					{
						"field": "namakelas",
						"title": "Kelas Di Jamin"
					},
					{
						"field": "objectkelasdijaminfk",
						"title": "Kelas Di Jamin Id",
						"hidden": "true"
					},
					{
						"field": "kdlastunitbagian",
						"title": "Kd Last Unit Bagian",
						"hidden": "true"
					},
					{
						"field": "pegawai",
						"title": "Pegawai",
						"hidden": "true"
					},
					{
						"field": "pegawaiid",
						"title": "Pegawai Id",
						"hidden": "true"
					},
					{
						"field": "kdpenjaminpasien",
						"title": "Kd Penjamin Pasien",
						"hidden": "true"
					},
					{

						"field": "namarekanan",
						"title": "Kd Penjamin Pasien",
						"hidden": "true"
					},
					{
						"field": "lastunitbagian",
						"title": "Last Unit Bagian",
						"hidden": "true"
					},
					
					{
						"field": "nikinstitusiasal",
						"title": "NIK Institusi Asal",
						"hidden": "true"
					},
					{
						"field": "nippns",
						"title": "NIP PNS",
						"hidden": "true"
					},
					{
						"field": "noasuransi",
						"title": "No Asuransi"
					},
					{
						"field": "noasuransihead",
						"title": "No Asuransi Head",
						"hidden": "true"
					},
					
					
					{
						"field": "noidentitas",
						"title": "No Identitas"
					},
					{
						"field": "notelpfixed",
						"title": "No Telp Fixed",
						"hidden": "true"
					},
					{
						"field": "notelpmobile",
						"title": "No Telp Mobile"
					},
					{
						"field": "qasuransi",
						"title": "Q Asuransi",
						"hidden": "true"
					},
					{
						"field": "tglakhirberlakulast",
						"title": "Tgl Akhir Berlaku Last",
						"hidden": "true"
					},
					{
						"field": "tgllahir",
						"title": "Tgl Lahir"
					},
					{
						"field": "tglmulaiberlakulast",
						"title": "Tgl Mulai Berlaku Last",
						"hidden": "true"
					},
					{
						"field": "reportdisplay",
						"title": "Report Display",
						"hidden": "true"
					},
					{
						"field": "kodeexternal",
						"title": "Kode External",
						"hidden": "true"
					},
					{
						"field": "namaexternal",
						"title": "Nama External",
						"hidden": "true"
					},
					{
						"field": "statusenabled",
						"title": "status Enabled"
					},
					{
							"command":
								[
									{
										text: "Enabled", 
										click: enableData, 
										// imageClass: "k-icon k-floppy"
									},
								
									{
										text: "Disable", 
										click: disableData, 
										// imageClass: "k-icon k-delete"	
									}
								],

							title: "",
							width: "200px",
		}
		];

		$scope.mainGridOptions = { 
		 pageable: true,
		 columns: $scope.columnAsuransiPasien,
		 editable: "popup",
		 selectable: "row",
		 scrollable: false
		 };

		////fungsi klik untuk edit
		$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				// $scope.item.alamatlengkap = current.alamatlengkap;
				// $scope.item.golonganasuransi = current.golonganasuransi;
				// $scope.item.golonganasuransiId = current.golonganasuransiId;
				// $scope.item.hubunganpeserta = current.hubunganpeserta;
				// $scope.item.hubunganpesertaid = current.hubunganpesertaid;
				// $scope.item.kdinstitusiAsal = current.kdinstitusiasal;
				// $scope.item.jeniskelamin = current.jeniskelamin;
				// $scope.item.jeniskelaminid = current.jeniskelaminid;
				// $scope.item.kelasdijamin = current.kelasdijamin;
				// $scope.item.kelasdijaminid = current.kelasdijaminid;
				// $scope.item.kdLastunitbagian = current.kdLastunitbagian;
				// $scope.item.pegawai = current.pegawai;
				// $scope.item.pegawaiid = current.pegawaiid;
				// $scope.item.kdpenjaminpasien = current.kdpenjaminpasien;
				// $scope.item.lastunitbagian = current.lastunitbagian;
				// $scope.item.namapeserta = current.namapeserta;
				// $scope.item.nikinstitusissal = current.nikinstitusiasal;
				// $scope.item.nippns = current.nippns;
				// $scope.item.noasuransi = current.noasuransi;
				// $scope.item.noasuransihead = current.noasuransihead;
				// $scope.item.nocm = current.nocm;
				// $scope.item.nocmid = current.nocmid;
				// $scope.item.noidentitas = current.noidentitas;
				// $scope.item.notelpfixed = current.notelpfixed;
				// $scope.item.notelpmobile = current.notelpmobile;
				// $scope.item.qasuransi = current.qasuransi;
				// $scope.item.tglakhirberlakulast = current.tglakhirberlakulast;
				// $scope.item.tgllahir = current.tgllahir;
				// $scope.item.tglmulaiberlakulast = current.tglmulaiberlakulast;
				$scope.item.id = current.id;
				// $scope.item.noRec = current.norec;
				// $scope.item.reportdisplay = current.reportdisplay;
				// $scope.item.kodeexternal = current.kodeexternal;
				// $scope.item.namaexternal = current.namaexternal;
				// $scope.item.statusenabled = current.statusenabled;
		};


		function enableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				

				ManagePhp.getData("asuransi-pasien/update-status-enabled-asuransi-pasien?id="+dataItem.id+"&statusenabled=true").then(function(dat){
				 
						toastr.success(dat.data.message);
						init();
				 });
			}

		function disableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				var itemDelete = {
					"id": dataItem.id
				}

				ManagePhp.getData("asuransi-pasien/update-status-enabled-asuransi-pasien?id="+dataItem.id+"&statusenabled=false").then(function(dat){
				 toastr.success(dat.data.message);
				 init();
				 });
		} 


		//// save 
		$scope.tambah = function(){
				var data = {
					"class": "AsuransiPasien",
					"listField": {
					"alamatLengkap": $scope.item.alamatLengkap,
					"golonganAsuransi": $scope.item.golonganAsuransi,
					"golonganAsuransiId": $scope.item.golonganAsuransiId,
					"hubunganPeserta": $scope.item.hubunganPeserta,
					"hubunganPesertaId": $scope.item.hubunganPesertaId,
					"kdInstitusiAsal": $scope.item.kdInstitusiAsal,
					"jenisKelamin": $scope.item.jenisKelamin,
					"jenisKelaminId": $scope.item.jenisKelaminId,
					"kelasDiJamin": $scope.item.kelasDiJamin,
					"kelasDiJaminId": $scope.item.kelasDiJaminId,
					"kdLastUnitBagian": $scope.item.kdLastUnitBagian,
					"pegawai": $scope.item.pegawai,
					"pegawaiId": $scope.item.pegawaiId,
					"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
					"lastUnitBagian": $scope.item.lastUnitBagian,
					"namaPeserta": $scope.item.namaPeserta,
					"nikInstitusiAsal": $scope.item.nikInstitusiAsal,
					"nipPns": $scope.item.nipPns,
					"noAsuransi": $scope.item.noAsuransi,
					"noAsuransiHead": $scope.item.noAsuransiHead,
					"noCm": $scope.item.noCm,
					"noCmId": $scope.item.noCmId,
					"noIdentitas": $scope.item.noIdentitas,
					"noTelpFixed": $scope.item.noTelpFixed,
					"noTelpMobile": $scope.item.noTelpMobile,
					"qAsuransi": $scope.item.qAsuransi,
					"tglAkhirBerlakuLast": $scope.item.tglAkhirBerlakuLast,
					"tglLahir": $scope.item.tglLahir,
					"tglMulaiBerlakuLast": $scope.item.tglMulaiBerlakuLast,
					"id": $scope.item.id,
					"reportDisplay": $scope.item.reportDisplay,
					"kodeExternal": $scope.item.kodeExternal,
					"namaExternal": $scope.item.namaExternal,
				}
			}
		 
		//  IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		// console.log(JSON.stringify(e.data));
		// init();
		// $scope.item = {};
		//  });
		  
		  }


		$scope.editTambah = function () {
			cacheHelper.set('CacheFormAsuransiPasien',$scope.current)
			$state.go("AsuransiPasienEdit")
			
		}

		$scope.batal = function () {
			$scope.showEdit = false;
			$scope.item = {};
		}

		$scope.hapus = function () {
			debugger
			ManagePhp.getData("asuransi-pasien/hapus-asuransi-pasien?id="+$scope.item.id).then(
				function (e) {
					
					debugger
					if (e.data.status==201){
						$scope.item = {};
						toastr.success(e.data.message);
						init();
					}else{
						toastr.error(e.data.message);
						
						
					}
					

				}
			);
		}


}
]);
});
