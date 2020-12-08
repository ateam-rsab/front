define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BridgingInaCbgCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper','DateHelper','ManageTataRekening',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper,dateHelper,manageTataRekening) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal =  new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang= new Date();
			$scope.dataPasienSelected = {};
			$scope.cboDokter =false;	
			$scope.pasienPulang =false;		
			$scope.cboUbahDokter =true;
			$scope.isRouteLoading=false;
			$scope.item.jmlRows = 50
			$scope.jmlRujukanMasuk  = 0
			$scope.jmlRujukanKeluar  = 0
			var data2 = []
			var dataSave = []
			var dataRow = {}
			$scope.show_btn = true
			loadCombo();
			// loadData();
			// getSisrute()
			// postKunjunganYankes()
			function loadCombo(){
				var chacePeriode = cacheHelper.get('DaftarRegistrasiPasienCtrl');
				if(chacePeriode != undefined){
					//debugger;
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);	
					$scope.item.tglpulang = new Date(arrPeriode[2]);				
				}else{
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;					
				}
				manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
				    $scope.listDepartemen = data.data.departemen;
				    $scope.listKelompokPasien = data.data.kelompokpasien;
				    $scope.item.kelompokpasien = {
				    	id: 2,
						kelompokpasien: "BPJS"
				    }
				    $scope.listDokter = data.data.dokter;
				    $scope.listDokter2 = data.data.dokter;
				})
				// $scope.listStatus = manageKasir.getStatus();
			}
			$scope.getIsiComboRuangan = function(){
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.columnDaftarPasienPulang = {
				toolbar: [
					"excel",
					
					],
					excel: {
						fileName: "DaftarRegistrasiPasien.xlsx",
						allPages: true,
					},
					excelExport: function(e){
						var sheet = e.workbook.sheets[0];
						sheet.frozenRows = 2;
						sheet.mergedCells = ["A1:M1"];
						sheet.name = "Orders";

						var myHeaders = [{
							value:"Daftar Registrasi Pasien",
							fontSize: 20,
							textAlign: "center",
							background:"#ffffff",
	                     // color:"#ffffff"
	                 }];

	                 sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
	             },
				selectable: 'row',
				pageable: true,
	            columns:
	            [
		            {
						"field": "tglregistrasi",
						"title": "Tgl Registrasi",
						"width":"10%",
						"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
					},
					{
						"field": "noregistrasi",
						"title": "NoReg",
						"width":"10%"
					},
					{
						"field": "nocm",
						"title": "NoRM",
						"width":"10%",
						"template": "<span class='style-center'>#: nocm #</span>"
					},
					{
						"field": "namapasien",
						"title": "Nama Pasien",
						"width":"20%",
						"template": "<span class='style-left'>#: namapasien #</span>"
					},
					// {
					// 	"field": "namaruangan",
					// 	"title": "Nama Ruangan",
					// 	"width":"150px",
					// 	"template": "<span class='style-left'>#: namaruangan #</span>"
					// },
					{
						"field": "namadokter",
						"title": "Nama Dokter",
						"width":"15%",
						"template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
					},
					// {
					// 	"field": "kelompokpasien",
					// 	"title": "Kelompok Pasien",
					// 	"width":"100px",
					// 	"template": "<span class='style-left'>#: kelompokpasien #</span>"
					// },
					{
						"field": "tglpulang",
						"title": "Tgl Pulang",
						"width":"10%",
						"template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
					},
					// {
					// 	"field": "statuspasien",
					// 	"title": "Status",
					// 	"width":"80px",
					// 	"template": "<span class='style-center'>#: statuspasien #</span>"
					// },
					// {
					// 	"field": "nostruk",
					// 	"title": "NoStrukVerif",
					// 	"width":"100px",
					// 	"template": '# if( nostruk==null) {# - # } else {# #= nostruk # #} #'
					// },
					// {
					// 	"field": "nosbm",
					// 	"title": "NoSBM",
					// 	"width":"100px",
					// 	"template": '# if( nosbm==null) {# - # } else {# #= nosbm # #} #'
					// },
					// {
					// 	"field": "kasir",
					// 	"title": "Kasir",
					// 	"width":"100px",
					// 	"template": '# if( kasir==null) {# - # } else {# #= kasir # #} #'
					// },
					{
						"field": "nosep",
						"title": "No SEP",
						"width":"10%",
						"template": '# if( nosep==null) {# - # } else {# #= nosep # #} #'
					}
					// ,
					// {
					// 	"field": "status",
					// 	"title": "Status",
					// 	"width":"10%"
					// }
				]
			};
			$scope.dbklik =function(data){
				$scope.popupDetail.center().open();
				var jenis_rawat = 1 //ranap
				if (data.deptid != 16) {
					jenis_rawat = 2
				}
				var upgrade_class_ind = 0
				var upgrade_class_class = ''
				var add_payment_pct = 0
				if (data.nokelasdijamin != data.nokelasdaftar) {
					upgrade_class_ind = 1
					upgrade_class_class = data.namakelas
					add_payment_pct = 0
				}
				var discharge_status = 0 
				if (data.objectstatuspulangfk == 1 || data.objectstatuspulangfk == 6) {
					discharge_status = 1
				}else if (data.objectstatuspulangfk == 4 || data.objectstatuspulangfk == 5 || data.objectstatuspulangfk == 10 || 
					data.objectstatuspulangfk == 11) {
					discharge_status = 2
				}else if (data.objectstatuspulangfk == 2 || data.objectstatuspulangfk == 8 || data.objectstatuspulangfk == 3) {
					discharge_status = 3
				}else if (data.objectstatuspulangfk == 9) {
					discharge_status = 4
				}else{
					discharge_status = 5
				}


				$scope.item.detail = 
					'nomor_sep = ' + data.nosep + '\n' +
					'nomor_kartu = ' +  data.nokepesertaan + '\n' +
					'tgl_masuk = ' +  data.tglregistrasi + '\n' +
					'tgl_pulang = ' +  data.tglpulang + '\n' +
					'jenis_rawat = ' +  jenis_rawat + '\n' +
					'kelas_rawat = ' +  data.nokelasdaftar + '\n' +
					'adl_sub_acute = null \n' +
					'adl_chronic = null \n' +
					'icu_indikator = null \n' +
					'icu_los = null \n' +
					'ventilator_hour = null \n' +
					'upgrade_class_ind = ' +  upgrade_class_ind + '\n' +
					'upgrade_class_class = ' +  upgrade_class_class + '\n' +
					'upgrade_class_los = ' +  null + '\n' +
					'add_payment_pct = ' +  add_payment_pct + '\n' +
					'birth_weight = ' +  0 + '\n' +
					'discharge_status = ' + discharge_status + '\n' +
					'diagnosa = ' +  data.icd10 + '\n' +
					'procedure = ' +  data.icd9 + '\n' +
					'tarif_rs = ' +  data.tarif_rs + '\n' + +
					'tarif_poli_eks = ' +  0 + "\n"  +
					'nama_dokter = ' +  data.namadokter + "\n"  +
					'kode_tarif = ' +  'RSAB' + "\n"  +
					'payor_id = ' +  '3' + "\n"  +
					'payor_cd = ' +  'JKN' + "\n"  +
					'cob_cd = ' +  '#' + "\n"  +
					'coder_nik = ' +  data.codernik 
			}
			$scope.tutup = function(){
				$scope.popupDetail.center().close();
			}


			$scope.SearchData = function(){
				loadData()
			}
			function loadData(){
				$scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg =""
				if ($scope.item.noReg != undefined){
					var reg ="&noreg=" +$scope.item.noReg
				}
				var rm =""
				if ($scope.item.noRm != undefined){
					var rm ="&norm=" +$scope.item.noRm
				}	
				var nm =""
				if ($scope.item.nama != undefined){
					var nm ="&nama=" +$scope.item.nama
				}
				var ins =""
				if ($scope.item.instalasi != undefined){
					var ins ="&deptId=" +$scope.item.instalasi.id
				}
				var rg =""
				if ($scope.item.ruangan != undefined){
					var rg ="&ruangId=" +$scope.item.ruangan.id
				}
				var kp =""
				if ($scope.item.kelompokpasien != undefined){
					var kp ="&kelId=" +$scope.item.kelompokpasien.id
				}
				var dk =""
				if ($scope.item.dokter != undefined){
					var dk ="&dokId=" +$scope.item.dokter.id
				}
				
	  			var jmlRows = "";
                if ($scope.item.jmlRows != undefined) {
                    jmlRows = $scope.item.jmlRows
                }
				$q.all([
					manageTataRekening.getDataTableTransaksi("inacbg/get-daftar-pasien-inacbg?"+
						"tglAwal="+tglAwal+
						"&tglAkhir="+tglAkhir+
						reg+rm+nm+ins+rg+kp+dk
						+ '&jmlRows='+jmlRows),
					]).then(function(data) {
						$scope.isRouteLoading=false;
						data2 = data[0].data;
						// $scope.dataDaftarPasienPulang = new kendo.data.DataSource({
	     //                    data: data[0].data,
	     //                    pageSize: 10,
	     //                    total:data[0].data,
	     //                    serverPaging: false,
	     //                    schema: {
	     //                        model: {
	     //                            fields: {
	     //                            }
	     //                        }
	     //                    }
	     //                });


						//Transpose
						dataSave = []
						for (var i = data2.length - 1; i >= 0; i--) {

							var jenis_rawat = 1 //ranap
							if (data2[i].deptid != 16) {
								jenis_rawat = 2
							}
							var upgrade_class_ind = 0
							var upgrade_class_class = ''
							var add_payment_pct = 0
							if (data2[i].nokelasdijamin != data2[i].nokelasdaftar) {
								upgrade_class_ind = 1
								upgrade_class_class = data2[i].namakelas
								add_payment_pct = 0
							}
							var discharge_status = 0 
							if (data2[i].objectstatuspulangfk == 1 || data2[i].objectstatuspulangfk == 6) {
								discharge_status = 1
							}else if (data2[i].objectstatuspulangfk == 4 || data2[i].objectstatuspulangfk == 5 || data2[i].objectstatuspulangfk == 10 || 
								data2[i].objectstatuspulangfk == 11) {
								discharge_status = 2
							}else if (data2[i].objectstatuspulangfk == 2 || data2[i].objectstatuspulangfk == 8 || data2[i].objectstatuspulangfk == 3) {
								discharge_status = 3
							}else if (data2[i].objectstatuspulangfk == 9) {
								discharge_status = 4
							}else{
								discharge_status = 5
							}
							dataRow = {    
								"nomor_sep": data2[i].nosep,    //"0901R001TEST0001",    
								"nomor_kartu": data2[i].nokepesertaan,    //"233333",    
								"tgl_masuk": data2[i].tglregistrasi,    //"2017-11-20 12:55:00",    
								"tgl_pulang": data2[i].tglpulang,    //"2017-12-01 09:55:00",    
								"jenis_rawat": jenis_rawat,    //"1",    
								"kelas_rawat": data2[i].nokelasdaftar,    //"1",    
								"adl_sub_acute": '',    //"15",    
								"adl_chronic": '',    //"12",    
								"icu_indikator": '',    //"1",    
								"icu_los": '',    //"2",    
								"ventilator_hour": '',    //"5",    
								"upgrade_class_ind": upgrade_class_ind,    //"1",    
								"upgrade_class_class": upgrade_class_class,    //"vip",    
								"upgrade_class_los": '',    //"5",    
								"add_payment_pct": '',    //"35",    
								"birth_weight": '',    //"0",    
								"discharge_status": discharge_status,    //"1",    
								"diagnosa": data2[i].icd10,    //"S71.0#A00.1",    
								"procedure": data2[i].icd9,    //"81.52#88.38",    
								"tarif_rs": {      
									"prosedur_non_bedah": data2[i].tarif_rs.prosedur_non_bedah,    //"300000",      
									"prosedur_bedah": data2[i].tarif_rs.prosedur_bedah,    //"20000000",      
									"konsultasi": data2[i].tarif_rs.konsultasi,    //"300000",      
									"tenaga_ahli": data2[i].tarif_rs.tenaga_ahli,    //"200000",      
									"keperawatan": data2[i].tarif_rs.keperawatan,    // "80000",      
									"penunjang": data2[i].tarif_rs.penunjang,    //"1000000",      
									"radiologi": data2[i].tarif_rs.radiologi,    //"500000",      
									"laboratorium": data2[i].tarif_rs.laboratorium,    //"600000",      
									"pelayanan_darah": data2[i].tarif_rs.pelayanan_darah,    //"150000",      
									"rehabilitasi": data2[i].tarif_rs.rehabilitasi,    //"100000",      
									"kamar": data2[i].tarif_rs.kamar,    //"6000000",      
									"rawat_intensif": data2[i].tarif_rs.rawat_intensif,    //"2500000",      
									"obat": data2[i].tarif_rs.obat,    //"2000000",      
									"alkes": data2[i].tarif_rs.alkes,    //"500000",      
									"bmhp": data2[i].tarif_rs.bmhp,    //"400000",      
									"sewa_alat": data2[i].tarif_rs.sewa_alat,    //"210000"    
								},    
								"tarif_poli_eks": 0,    //"100000",    
								"nama_dokter": data2[i].namadokter,    //"RUDY, DR",    
								"kode_tarif": data2[i].kodetarif,    //'RSAB',    //"AP",    
								"payor_id": '3',    //"3",    
								"payor_cd": 'JKN',    //"JKN",    
								"cob_cd": '#',    //"0001",    
								"coder_nik": data2[i].codernik,    //"123123123123"  
						        "nomor_rm": data2[i].nocm,    //"123-45-28",
						        "nama_pasien": data2[i].namapasien,    //"Efan Andrian",
						        "tgl_lahir": data2[i].tgllahir,    //"1985-01-01 02:00:00",
						        "gender": data2[i].objectjeniskelaminfk    //"2"
							} 
							dataSave.push(dataRow)
						}
						$scope.show_btn = true
						for (var i = dataSave.length - 1; i >= 0; i--) {
							if (dataSave[i].nosep == '') {
								$scope.show_btn = false
								break;
							} 
						}


						//check data klaim
						// {
						// 	var dt1 ={}
						// 	var dt2 =[]
						// 	for (var i = dataSave.length - 1; i >= 0; i--) {
						// 		dt1 = {   
						// 			"metadata": {      
						// 				"method":"get_claim_data"   
						// 			},   
						// 			"data": {      
						// 				"nomor_sep": dataSave[i].nomor_sep
						// 			} 
						// 		} 
						// 		dt2.push(dt1)
						// 	}
							
						// 	var objData = {
						// 		  "data": dt2
						// 		}
						// 	manageTataRekening.savebridginginacbg(objData).then(function(e){
						// 		for (var i = 0; i < data2.length; i++) {
						// 			for (var i = 0; i < e.data.dataresponse.length; i++) {
						// 				if (e.data.dataresponse[i].datarequest.data.nomor_sep == data2[i].nosep) {
						// 					if (e.data.dataresponse[i].dataresponse.metadata.code == 200) {
						// 						data2[i].status = 'Send Claim'
						// 					}else{
						// 						data2[i].status = ''
						// 					}
											
						// 				}
						// 			}
									
									
						// 		}
								$scope.dataDaftarPasienPulang = new kendo.data.DataSource({
			                        data: data[0].data,
			                        pageSize: 10,
			                        total:data[0].data,
			                        serverPaging: false,
			                        schema: {
			                            model: {
			                                fields: {
			                                }
			                            }
			                        }
			                    });	
							// }) 
						// }
						//end //check data klaim
						

						//end Transpose
						var chacePeriode = tglAwal + "~" + tglAkhir;
						cacheHelper.set('DaftarRegistrasiPasienCtrl', chacePeriode);
					});

				}  ;
			$scope.UbahDokter = function(){
				$scope.cboDokter = true
				$scope.cboUbahDokter=false
			}			
			$scope.batal = function(){
				$scope.cboDokter = false
				$scope.cboUbahDokter=true
			}
			$scope.PasienPulang = function(){
				debugger;
				if($scope.dataPasienSelected.tglpulang != undefined){
	        		window.messageContainer.error("Pasien Sudah Dipulangkan!!!");
	                 	return;
        		}
				if ($scope.dataPasienSelected==undefined)
			 	{
			 		toastr.error('Pilih Data Pasien dulu','Caution');
			 	}else{
					 manageTataRekening.getDataTableTransaksi('registrasi/get-norec-apd?noreg='+ $scope.dataPasienSelected.noregistrasi
					 	+ '&ruangId=' + $scope.dataPasienSelected.ruanganid ).then(function(e){
							if(e.data.length > 0 ){
								$state.go('PindahPulangPasien',{
									norecPD:$scope.dataPasienSelected.norec,
									norecAPD: e.data[0].norec_apd
									});
								var CachePindah = $scope.dataPasienSelected.ruanganid                                     
								cacheHelper.set('CachePindah', CachePindah);
							}
							
						 })
					
			 	}
				// var tglpulang = moment($scope.item.tanggalPulang).format('YYYY-MM-DD HH:mm:ss');
				// $scope.cbopasienpulang = true
				// $scope.cboUbahDokter=false
				// if ($scope.dataPasienSelected.tglpulang != null){
				// 	$scope.item.tanggalPulang=$scope.dataPasienSelected.tglpulang
				// }else{
				// 	$scope.item.tanggalPulang=tglpulang
				// }				
			}

			$scope.batalsimpantglpulang = function(){
				$scope.cbopasienpulang = false 
				$scope.cboUbahDokter= true
			}


			$scope.new_claim = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {
							"metadata": {
								"method": "new_claim"
								},
							"data": {
									"nomor_kartu": dataSave[i].nomor_kartu,
									"nomor_sep": dataSave[i].nomor_sep,
									"nomor_rm": dataSave[i].nomor_rm,
									"nama_pasien": dataSave[i].nama_pasien,
									"tgl_lahir": dataSave[i].tgl_lahir,
									"gender": dataSave[i].gender
								}
						}
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// LoadData();				
				})
			}
			$scope.new_claim2 = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {
							"metadata": {
								"method": "new_claim"
								},
							"data": {
									"nomor_kartu": dataSave[i].nomor_kartu,
									"nomor_sep": dataSave[i].nomor_sep,
									"nomor_rm": dataSave[i].nomor_rm,
									"nama_pasien": dataSave[i].nama_pasien,
									"tgl_lahir": dataSave[i].tgl_lahir,
									"gender": dataSave[i].gender
								}
						}
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				// manageTataRekening.savebridginginacbg(objData).then(function(e){
					for (var i = dataSave.length - 1; i >= 0; i--) {
						dt1 = {    
							"metadata": {    
								"method": "set_claim_data",    
								"nomor_sep": dataSave[i].nomor_sep 
							},
							"data":{
								"nomor_sep": dataSave[i].nomor_sep,    //"0901R001TEST0001",    
								"nomor_kartu": dataSave[i].nomor_kartu,    //"233333",    
								"tgl_masuk": dataSave[i].tgl_masuk,    //"2017-11-20 12:55:00",    
								"tgl_pulang": dataSave[i].tgl_pulang,    //"2017-12-01 09:55:00",    
								"jenis_rawat": dataSave[i].jenis_rawat,    //"1",    
								"kelas_rawat": dataSave[i].kelas_rawat,    //"1",    
								"adl_sub_acute": dataSave[i].adl_sub_acute ,    //"15",    
								"adl_chronic": dataSave[i].adl_chronic ,    //"12",    
								"icu_indikator": dataSave[i].icu_indikator ,    //"1",    
								"icu_los": dataSave[i].icu_los ,    //"2",    
								"ventilator_hour": dataSave[i].ventilator_hour ,    //"5",    
								"upgrade_class_ind": dataSave[i].upgrade_class_ind ,    //"1",    
								"upgrade_class_class": dataSave[i].upgrade_class_class ,    //"vip",    
								"upgrade_class_los": dataSave[i].upgrade_class_los ,    //"5",    
								"add_payment_pct": dataSave[i].add_payment_pct ,    //"35",    
								"birth_weight": dataSave[i].birth_weight ,    //"0",    
								"discharge_status": dataSave[i].discharge_status ,    //"1",    
								"diagnosa": dataSave[i].diagnosa,    //"S71.0#A00.1",    
								"procedure": dataSave[i].procedure,    //"81.52#88.38",    
								"tarif_rs": {      
									"prosedur_non_bedah": dataSave[i].tarif_rs.prosedur_non_bedah,    //"300000",      
									"prosedur_bedah": dataSave[i].tarif_rs.prosedur_bedah,    //"20000000",      
									"konsultasi": dataSave[i].tarif_rs.konsultasi,    //"300000",      
									"tenaga_ahli": dataSave[i].tarif_rs.tenaga_ahli,    //"200000",      
									"keperawatan": dataSave[i].tarif_rs.keperawatan,    // "80000",      
									"penunjang": dataSave[i].tarif_rs.penunjang,    //"1000000",      
									"radiologi": dataSave[i].tarif_rs.radiologi,    //"500000",      
									"laboratorium": dataSave[i].tarif_rs.laboratorium,    //"600000",      
									"pelayanan_darah": dataSave[i].tarif_rs.pelayanan_darah,    //"150000",      
									"rehabilitasi": dataSave[i].tarif_rs.rehabilitasi,    //"100000",      
									"kamar": dataSave[i].tarif_rs.kamar,    //"6000000",      
									"rawat_intensif": dataSave[i].tarif_rs.rawat_intensif,    //"2500000",      
									"obat": dataSave[i].tarif_rs.obat,    //"2000000",  
									"obat_kronis": "0",      
									"obat_kemoterapi": "0",    
									"alkes": dataSave[i].tarif_rs.alkes,    //"500000",      
									"bmhp": dataSave[i].tarif_rs.bmhp,    //"400000",      
									"sewa_alat": dataSave[i].tarif_rs.sewa_alat,    //"210000"    
								},    
								"tarif_poli_eks": dataSave[i].tarif_poli_eks ,    //"100000",    
								"nama_dokter": dataSave[i].nama_dokter,    //"RUDY, DR",    
								"kode_tarif": dataSave[i].kode_tarif ,    //"AP",    
								"payor_id": dataSave[i].payor_id ,    //"3",    
								"payor_cd": dataSave[i].payor_cd ,    //"JKN",    
								"cob_cd": dataSave[i].cob_cd ,    //"0001",    
								"coder_nik": dataSave[i].coder_nik    //"123123123123"  
							} 
						} 
						dt2.push(dt1)
					}
					
					var objData = {
						  "data": dt2
						}
					manageTataRekening.savebridginginacbg(objData).then(function(e){
						// LoadData();				
					})	
				// })
			}
			$scope.update_patient = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {    
						"metadata": {        
							"method": "update_patient",        
							"nomor_rm": dataSave[i].nomor_rm   
						},    
						"data": {        
							"nomor_kartu": dataSave[i].nomor_kartu,        
							"nomor_rm": dataSave[i].nomor_rm,        
							"nama_pasien": dataSave[i].nama_pasien,        
							"tgl_lahir": dataSave[i].tgl_lahir,        
							"gender": dataSave[i].gender   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// LoadData();				
				})
			}
			$scope.set_claim_data = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {    
						"metadata": {    
							"method": "set_claim_data",    
							"nomor_sep": dataSave[i].nomor_sep 
						},
						"data":{
							"nomor_sep": dataSave[i].nomor_sep,    //"0901R001TEST0001",    
							"nomor_kartu": dataSave[i].nomor_kartu,    //"233333",    
							"tgl_masuk": dataSave[i].tgl_masuk,    //"2017-11-20 12:55:00",    
							"tgl_pulang": dataSave[i].tgl_pulang,    //"2017-12-01 09:55:00",    
							"jenis_rawat": dataSave[i].jenis_rawat,    //"1",    
							"kelas_rawat": dataSave[i].kelas_rawat,    //"1",    
							"adl_sub_acute": dataSave[i].adl_sub_acute ,    //"15",    
							"adl_chronic": dataSave[i].adl_chronic ,    //"12",    
							"icu_indikator": dataSave[i].icu_indikator ,    //"1",    
							"icu_los": dataSave[i].icu_los ,    //"2",    
							"ventilator_hour": dataSave[i].ventilator_hour ,    //"5",    
							"upgrade_class_ind": dataSave[i].upgrade_class_ind ,    //"1",    
							"upgrade_class_class": dataSave[i].upgrade_class_class ,    //"vip",    
							"upgrade_class_los": dataSave[i].upgrade_class_los ,    //"5",    
							"add_payment_pct": dataSave[i].add_payment_pct ,    //"35",    
							"birth_weight": dataSave[i].birth_weight ,    //"0",    
							"discharge_status": dataSave[i].discharge_status ,    //"1",    
							"diagnosa": dataSave[i].diagnosa,    //"S71.0#A00.1",    
							"procedure": dataSave[i].procedure,    //"81.52#88.38",    
							"tarif_rs": {      
								"prosedur_non_bedah": dataSave[i].tarif_rs.prosedur_non_bedah,    //"300000",      
								"prosedur_bedah": dataSave[i].tarif_rs.prosedur_bedah,    //"20000000",      
								"konsultasi": dataSave[i].tarif_rs.konsultasi,    //"300000",      
								"tenaga_ahli": dataSave[i].tarif_rs.tenaga_ahli,    //"200000",      
								"keperawatan": dataSave[i].tarif_rs.keperawatan,    // "80000",      
								"penunjang": dataSave[i].tarif_rs.penunjang,    //"1000000",      
								"radiologi": dataSave[i].tarif_rs.radiologi,    //"500000",      
								"laboratorium": dataSave[i].tarif_rs.laboratorium,    //"600000",      
								"pelayanan_darah": dataSave[i].tarif_rs.pelayanan_darah,    //"150000",      
								"rehabilitasi": dataSave[i].tarif_rs.rehabilitasi,    //"100000",      
								"kamar": dataSave[i].tarif_rs.kamar,    //"6000000",      
								"rawat_intensif": dataSave[i].tarif_rs.rawat_intensif,    //"2500000",      
								"obat": dataSave[i].tarif_rs.obat,    //"2000000",  
								"obat_kronis": "0",      
								"obat_kemoterapi": "0",    
								"alkes": dataSave[i].tarif_rs.alkes,    //"500000",      
								"bmhp": dataSave[i].tarif_rs.bmhp,    //"400000",      
								"sewa_alat": dataSave[i].tarif_rs.sewa_alat,    //"210000"    
							},    
							"tarif_poli_eks": dataSave[i].tarif_poli_eks ,    //"100000",    
							"nama_dokter": dataSave[i].nama_dokter,    //"RUDY, DR",    
							"kode_tarif": dataSave[i].kode_tarif ,    //"AP",    
							"payor_id": dataSave[i].payor_id ,    //"3",    
							"payor_cd": dataSave[i].payor_cd ,    //"JKN",    
							"cob_cd": dataSave[i].cob_cd ,    //"0001",    
							"coder_nik": dataSave[i].coder_nik    //"123123123123"  
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					var data = e.data.dataresponse
					for (let i = 0; i < data.length; i++) {
						var element = data[i];
						if (element.dataresponse === 'SIGNATURE_NOT_MATCH') {
							alert('Tanda Tangan Digital tidak sesuai! Data tidak lengkap!')
							return
						}
					}			
				})
			}

			$scope.grouper_1 = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {
							"metadata": {
								"method": "grouper",
								"stage": "1"
							},
							"data": {
								"nomor_sep": dataSave[i].nomor_sep 
							}
						}
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// simpan response ke database		
				})
			}
			$scope.grouper_2 = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method":"grouper",      
							"stage":"2"   
						},   
						"data": {      
							"nomor_sep":dataSave[i].nomor_sep ,      
							"special_cmg": "ambil dari table hasil grouper 1"   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// simpan response ke database	
				})
			}
			$scope.claim_final = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method":"claim_final"   
						},   
						"data": {      
							"nomor_sep": dataSave[i].nomor_sep,      
							"coder_nik": dataSave[i].coder_nik   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// response oke saja			
				})
			}
			$scope.send_claim = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method":"send_claim"   
						},   
						"data": {      
							"start_dt":"",//"2016-01-07",      
							"stop_dt":"",//"2016-01-07",      
							"jenis_rawat":"",//"1",      
							"date_type":"",//"2"   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// response simpan ke database			
				})
			}
			$scope.send_claim_individual = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method":"send_claim_individual"   
						},   
						"data": {      
							"nomor_sep":dataSave[i].nomor_sep
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// response simpan ke database			
				})
			}
			$scope.delete_claim = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 ={   
						"metadata": {      
							"method":"delete_claim"   
						},   
						"data": {      
							"nomor_sep": dataSave[i].nomor_sep,      
							"coder_nik": dataSave[i].coder_nik   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// 
				})
			}
			$scope.delete_patient = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {    
						"metadata": {        
							"method": "delete_patient"   
						},    
						"data": {        
							"nomor_rm": dataSave[i].nomor_rm,        
							"coder_nik": dataSave[i].coder_nik   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// 			
				})
			}
			$scope.get_claim_status = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method":"get_claim_status"   
						},   
						"data": {      
							"nomor_sep": dataSave[i].nomor_sep
						}	 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// 			
				})
			}
			$scope.get_claim_data = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method":"get_claim_data"   
						},   
						"data": {      
							"nomor_sep": dataSave[i].nomor_sep
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// 			
				})
			}
			$scope.pull_claim = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method":"pull_claim"   
						},   
						"data": {      
							"start_dt":"",//"2016-01-07",      
							"stop_dt":"",//"2016-01-07",      
							"jenis_rawat":""//"1"   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// 			
				})
			}
			$scope.search_diagnosis = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method": "search_diagnosis"   
						},   
						"data": { 
							"keyword": ""   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// 			
				})
			}
			$scope.search_procedures = function(){
				var dt1 ={}
				var dt2 =[]
				for (var i = dataSave.length - 1; i >= 0; i--) {
					dt1 = {   
						"metadata": {      
							"method": "search_procedures"   
						},   
						"data": {     
							"keyword": ""   
						} 
					} 
					dt2.push(dt1)
				}
				
				var objData = {
					  "data": dt2
					}
				manageTataRekening.savebridginginacbg(objData).then(function(e){
					// 			
				})
			}
			//debugger
			// $scope.simpantglpulang = function(){
			// 	//debugger
			// 	var tglpulang = moment($scope.item.tanggalPulang).format('YYYY-MM-DD HH:mm:ss');
			// 	var updateTanggal = {
			// 		"noregistrasi": $scope.dataPasienSelected.noregistrasi,
			// 		"tglpulang": tglpulang
			// 	}
			// 	manageTataRekening.saveupdatetglpulang(updateTanggal).then(function(e){
			// 		LoadData();				
			// 	})	
			// 		$scope.cbopasienpulang=false;
			// 		$scope.cboUbahDokter=true;
			// }
			
			// $scope.klikGrid = function(dataPasienSelected){
			// 	if (dataPasienSelected != undefined) {
			// 		$scope.item.namaDokter = {id:dataPasienSelected.pgid,namalengkap:dataPasienSelected.namadokter}
			// 	}
			// }
			$scope.simpan = function(){
				debugger;
				var objSave = 
                    {
                        norec:$scope.dataPasienSelected.norec,
                        objectpegawaifk:$scope.item.namaDokter.id
                    }

				manageTataRekening.postSaveDokter(objSave).then(function(e) {
					loadData();
					$scope.cboDokter = false
					$scope.cboUbahDokter=true
				})	

				manageTataRekening.saveUpdateDokter(objSave).then(function(e) {
					loadData();
					$scope.cboDokter = false
					$scope.cboUbahDokter=true
				})	
				
				/* update dokter pelayanan pasien yang kosong dokternya */
				var objPost = 
                {
                    "noregistrasi":$scope.dataPasienSelected.noregistrasi,
                    "objectpegawaifk":$scope.item.namaDokter.id
                }
				manageTataRekening.updateDokterPelPasien(objPost).then(function(e) {
				
				})
				manageTataRekening.updateDokterPelPasienNew(objPost).then(function(e) {
				
				})		

				

			}
			$scope.Detail = function(){
				if($scope.dataPasienSelected.noregistrasi != undefined){
					var objSave ={
						noregistrasi:$scope.dataPasienSelected.noregistrasi
					}
					manageTataRekening.postJurnalAkuntansi(objSave).then(function(data){
						
	                });
				   	var obj = {
				    	noRegistrasi : $scope.dataPasienSelected.noregistrasi
				  	}

				  	$state.go('RincianTagihanTataRekening', {
				    	dataPasien: JSON.stringify(obj)
				  	});
				}
			}
			$scope.DaftarRuangan = function(){
				if($scope.dataPasienSelected.noregistrasi != undefined){
				   	var obj = {
				    	noRegistrasi : $scope.dataPasienSelected.noregistrasi
				  	}

				  	
				  	cacheHelper.set('AntrianPasienDiperiksaNOREG', $scope.dataPasienSelected.noregistrasi);
				  	// cacheHelper.set('AntrianPasienDiperiksaNOREG', '');
				  	$state.go('AntrianPasienDiperiksa', {
				    	dataPasien: JSON.stringify(obj)
				  	});
				}
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
        $scope.cetakKartu = function() {
        	$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
        	if($scope.dataPasienSelected.tglpulang == undefined){
        		window.messageContainer.error("Pasien Belum Dipulangkan!!!");
                 	return;
        	}
            if($scope.dataPasienSelected.noregistrasi == undefined)
                var noReg = "";
            else
                var noReg = $scope.dataPasienSelected.noregistrasi;
	            var stt = 'false'
	            if (confirm('View Kartu Pulang? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
	            var client = new HttpClient();        
	            client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kip-pasien=1&noregistrasi='+noReg+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
	                // do something with response
	            });
	    }
	    $scope.SuratKontrol = function() {
	    	if($scope.dataPasienSelected.noregistrasi != undefined){
				   	var obj = {
				    	noRegistrasi : $scope.dataPasienSelected.noregistrasi
				  	}

				  	$state.go('RincianTagihanTataRekening', {
				    	dataPasien: JSON.stringify(obj)
				  	});
				}

        	$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            if($scope.dataPasienSelected.noregistrasi == undefined)
                var noregistrasi = "";
            else

                var obj = {
			    	noRegistrasi : $scope.dataPasienSelected.noregistrasi
			  	}

			  	$state.go('PerjanjianPasien', {
			    	dataPasien: JSON.stringify(obj)
			  	});
	            // var stt = 'false'
	            // if (confirm('View Surat Kontrol? ')){
	            //     // Save it!
	            //     stt='true';
	            // }else {
	            //     // Do nothing!
	            //     stt='false'
	            // }
	            // var client = new HttpClient();        
	            // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-suratPerjanjianbynocm=1&nocm='+nocm+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
	            //     // do something with response
	            // });
	    }
	    $scope.EditSEP = function(){
				$scope.item.noPeserta="";
				$scope.item.noSep="";

				if($scope.dataPasienSelected.norec == null){
					messageContainer.error("Pasien Belum Dipilih!!")
                	return;
				}
				if($scope.dataPasienSelected.kelompokpasien !="BPJS"){
					messageContainer.error("Input SEP hanya untuk pasien BPJS")
                	return;
				}
				// if($scope.dataPasienSelected.norec_pa ==null){
				// 	messageContainer.error("Pemakaian Asuransi tidak ada")
                // 	return;
				// }

				if($scope.dataPasienSelected.nokepesertaan != undefined){
					$scope.item.noPeserta = $scope.dataPasienSelected.nokepesertaan;
				}

				if($scope.dataPasienSelected.nokepesertaan != undefined){
					$scope.item.noSep = $scope.dataPasienSelected.nosep;
				}

				
				$scope.cboSep = true
				$scope.cboUbahSEP=false
				$scope.cboDokter = false
				$scope.cboUbahDokter =false
			}			
			$scope.simpanSep = function(){
				var norec_pa =""
				if ($scope.dataPasienSelected.norec_pa != undefined)
					norec_pa=$scope.dataPasienSelected.norec_pa
				var updateSep = {
					"norec": $scope.dataPasienSelected.norec,
					"nokepesertaan": $scope.item.noPeserta,
					"nosep": $scope.item.noSep,
					"norec_pa" : norec_pa,
					"nocm" : $scope.dataPasienSelected.nocm,
				}
				
				manageTataRekening.postSaveSepTarek(updateSep).then(function(e){
					loadData();				
					$scope.saveLogInputSep()
				})	
					
					$scope.cboSep = false
					$scope.cboUbahSEP=true
					$scope.cboDokter =false
					$scope.cboUbahDokter =true
			}
			$scope.saveLogInputSep=function(){
				var jenisLog ='Input SEP'
				var referensi ='Norec Pemakaian Asuransi'
				   manageTataRekening.getDataTableTransaksi("logging/save-log-all?jenislog="
				    + jenisLog+"&referensi="+referensi
				    + "&noreff="+ $scope.dataPasienSelected.norec_pa
				     + "&keterangan="+  $scope.item.noSep 
				   ).then(function(data) {
				   	$scope.item.noPeserta="";
					$scope.item.noSep="";
			    }) 
			}
			//end log
			$scope.batalSep = function(){
				$scope.item.noPeserta="";
				$scope.item.noSep="";
				$scope.cboSep = false	
				$scope.cboUbahSEP=true
				$scope.cboDokter = false
				$scope.cboUbahDokter =true
			}

			$scope.resumeMedis = function(){
				if($scope.dataPasienSelected == undefined){
					toastr.error('Pilih data dulu')
					return
				}
				var arrrStr = {
                    0: $scope.dataPasienSelected.nocm,
                    1: $scope.dataPasienSelected.namapasien,
                    2: $scope.dataPasienSelected.jeniskelamin,
                    3: $scope.dataPasienSelected.noregistrasi,
                    // 4: $scope.dataPasienSelected.umur,
                    5: $scope.dataPasienSelected.kelompokpasien,
                    6: $scope.dataPasienSelected.tglregistrasi,
                    // 7: $scope.dataPasienSelected.norec,
                    8: $scope.dataPasienSelected.norec,
                    // 9: $scope.dataPasienSelected.objectkelasfk,
                    // 10: $scope.dataPasienSelected.namakelas,
                    11: $scope.dataPasienSelected.ruanganid,
                    12: $scope.dataPasienSelected.namaruangan
                }
				cacheHelper.set('cacheRekamMedis', arrrStr);
				$state.go('ResumeMedisRI')
			}
				function postKunjunganYankes(){
  	  			let status = false
			    var tanggal = moment(new Date()).format('YYYY-MM-DD')
			 	manageTataRekening.getDataTableTransaksi('yankes/get-kunjungan?tgl=' + tanggal)
			      .then(function(a){
			        var result = a
			        if (result.data.list != undefined && result.data.list.length > 0) {
			         for (var i = 0; i < result.data.list.length; i++) {
			            if (moment(new Date()).format('YYYY-MM-DD') ==  result.data.list[i].tanggal) {
			              status = true
			              manageTataRekening.getDataTableTransaksi('yankes/count-kunjungan-pasien')
				             .then(function(d){
				              let datt = d.data
				              var jsonSave = {
				                "data": {
				                  "kode_kirim": result.data.list[i].kode,
				                  "tanggal": moment(new Date()).format('YYYY-MM-DD'),
				                  "kunjungan_rj": datt.data.rawat_jalan,
				                  "kunjungan_igd": datt.data.igd,
				                  "pasien_ri": datt.masihDirawat// result.data.rawat_inap,
				                }
				              }
				    
				            manageTataRekening.postData('yankes/update-kunjungan',jsonSave)
				            .then(function(c){
				                var resp = c.data
				                if (resp.kode == 200) {
				                	toastr.success('Post Bridging Yankes')
				                }
				   
				              }, error => {
				              		toastr.error('Post Bridging Yankes Gagal')
				              });
				            })
			             	 break
			            }
			          }
			        }
			        if (status == false) {
			       	 	manageTataRekening.getDataTableTransaksi('yankes/count-kunjungan-pasien')
			             .then(function(b){
			              let result = b.data
			              var jsonSave = {
			                "data": {
			                  "kode_kirim": null,
			                  "tanggal": moment(new Date()).format('YYYY-MM-DD'),
			                  "kunjungan_rj": result.data.rawat_jalan,
			                  "kunjungan_igd": result.data.igd,
			                  "pasien_ri": result.masihDirawat// result.data.rawat_inap,
			                }
			              }
			    
			            manageTataRekening.postData('yankes/insert-kunjungan',jsonSave)
			            .then(function(c){
			                var resp = c.data
			                if (resp.kode == 200) {
			                	toastr.success('Post Bridging Yankes')
			                }
			   
			              }, error => {
			              		toastr.error('Post Bridging Yankes Gagal')
			              });
			            })
			        }
			      })
	   
	  	  		}
	  	  		 function getSisrute() {
	  	  		 	debugger
				    var now = moment(new Date()).format('YYYY-MM-DD')
				    manageTataRekening.getDataTableTransaksi('sisrute/rujukan/get?tanggal=' + now).then(function(response){			
				      $scope.jmlRujukanMasuk = response.data.total
				      console.log('rujukan masuk : ' + response.data.total)
				    })
				    manageTataRekening.getDataTableTransaksi('sisrute/rujukan/get?tanggal=' + now+ '&create=true').then(function(response){			
				      $scope.jmlRujukanKeluar = response.data.total
				       console.log('rujukan masuk : ' + response.data.total)
				    })
				  }
				 // postRujukanYankes()
				 function postRujukanYankes(){
				 	debugger
				    let status = false
				    manageTataRekening.getDataTableTransaksi('yankes/get-rujukan?tgl=' + moment(new Date()).format('YYYY-MM-DD')).then(function(res){		
				     var  resultData = res.data.list
				    if( resultData!= undefined && resultData.length> 0){
				      for (var i = 0; i < resultData.length; i++) {
				        if (moment(new Date()).format('YYYY-MM-DD') ==resultData[i].tanggal) {
				          status = true
				          var jsonSave = {
				            "data": {
				              "kode_kirim": resultData[i].kode,
				              "tanggal": resultData[i].tanggal,
				              "jumlah_rujukan": $scope.jmlRujukanMasuk,
				              "jumlah_rujuk_balik": $scope.jmlRujukanKeluar,
				            }
				          }
				          manageTataRekening.postData('yankes/update-rujukan',jsonSave)
			               .then(function(response){
			               console.log('Update Yankes Rujukan')
				          }, error => {
				          });
				          break
				        }
				      }
				    }
				 
				    if(status ==  false){
				      var da = {
				        "data": {
				          "kode_kirim": null,
				          "tanggal": moment(new Date()).format('YYYY-MM-DD'),
				          "jumlah_rujukan": $scope.jmlRujukanMasuk,
				          "jumlah_rujuk_balik":  $scope.jmlRujukanKeluar,
				  
				        }
				      }
				  
				   manageTataRekening.postData('yankes/insert-rujukan',da)
			               .then(function(response){
			               	  console.log('Insert Yankes Rujukan')
				          }, error => {
				          });
				    }
				  })

			}

					  // END ################

		}
	]);
});
