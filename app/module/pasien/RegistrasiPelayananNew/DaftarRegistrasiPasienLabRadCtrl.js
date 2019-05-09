define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarRegistrasiPasienLabRadCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper','DateHelper','ManageTataRekening', 'ModelItem','CetakHelper','ManagePasien','ModelItemAkuntansi',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper,dateHelper,manageTataRekening, ModelItem, cetakHelper, managePasien, modelItemAkuntansi) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal =  new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang= new Date();
			$scope.dataPasienSelected = {};
			$scope.cboDokter =false;	
			$scope.pasienPulang =false;		
			$scope.cboUbahDokter =false;
			$scope.isRouteLoading=false;
			$scope.cboUbahSEP=true;
			$scope.cboSep = false;

			loadCombo();
			// loadData();

			function loadCombo(){
				var chacePeriode = cacheHelper.get('DaftarRegistrasiPasienLabRadCtrl');
				if(chacePeriode != undefined){
					//debugger;
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);	
					// $scope.item.noReg = arrPeriode[2];		
					// $scope.item.noRm = arrPeriode[3];	
					// $scope.item.nama = arrPeriode[4];			
				}else{
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;
					// $scope.item.tglpulang = $scope.now;					
				}
				manageTataRekening.getDataTableTransaksi("operator/get-data-combo-operator", false).then(function(data) {
				    $scope.listDepartemen = data.data.departemen;
				    $scope.listKelompokPasien = data.data.kelompokpasien;
				    $scope.listDokter = data.data.dokter;
				    $scope.listDokter2 = data.data.dokter;
				    $scope.listRuanganBatal = data.data.ruanganall;
				        // $scope.listRuanganApd = data.data.ruanganall;
				    $scope.listPembatalan = data.data.pembatalan;
				    $scope.sourceJenisDiagnosisPrimer= data.data.jenisdiagnosa;
				    $scope.item.jenisDiagnosis = {id:data.data.jenisdiagnosa[1].id,jenisdiagnosa:data.data.jenisdiagnosa[1].jenisdiagnosa};

				});
				modelItemAkuntansi.getDataDummyPHP("operator/get-data-diagnosa", true, true, 10).then(function(data) {
                     // debugger;
                     $scope.sourceDiagnosisPrimer= data;
                });			
			}
			$scope.getIsiComboRuangan = function(){
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMMM-YYYY HH:mm');
			}

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.columnDaftarPasien = {
			   columns:[
					{
						"field": "no",
						"title": "No",
						"width":"30px",
					},
					{
						"field": "tglregistrasi",
						"title": "Tgl Registrasi",
						"width":"80px",
						"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
					},
					{
						"field": "noregistrasi",
						"title": "NoReg",
						"width":"90px"
					},
					{
						"field": "nocm",
						"title": "NoRM",
						"width":"70px",
						"template": "<span class='style-center'>#: nocm #</span>"
					},
					{
						"field": "namapasien",
						"title": "Nama Pasien",
						"width":"150px",
						"template": "<span class='style-left'>#: namapasien #</span>"
					},
					{
						"field": "namaruangan",
						"title": "Nama Ruangan",
						"width":"150px",
						"template": "<span class='style-left'>#: namaruangan #</span>"
					},
					{
						"field": "namadokter",
						"title": "Nama Dokter",
						"width":"150px",
						"template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
						
					},
					{
						"field": "kelompokpasien",
						"title": "Kelompok Pasien",
						"width":"100px",
						"template": "<span class='style-left'>#: kelompokpasien #</span>"
					},
					{
						"field": "namarekanan",
						"title": "Penjamin",
						"width":"100px",
						"template": '# if( namarekanan==null) {# - # } else {# #= namarekanan # #} #'
					},
					{
						"field": "tglpulang",
						"title": "Tgl Pulang",
						"width":"80px",
						"template": '# if( tglpulang==null) {# - # } else {# #= tglpulang # #} #'
					
					},
					{
						"field": "nostruk",
						"title": "No Verif",
						"width":"80px",
						"template": '# if( nostruk==null) {# - # } else {# #= nostruk # #} #'
					
					},
					
				],
	            sortable: {
	                mode: "single",
	                allowUnsort: false,
	            }
	            ,
	            pageable:{
	                messages: {
	                    // display: "Menampilkan {2} data"
	                    display: "Menampilkan {0} - {1} data dari {2} data"
	                  }
	            }
	        }


			$scope.SearchData = function(){
				loadData()
			}
			function loadData(){
				$scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg =""
				if ($scope.item.noReg != undefined ){
					var reg ="&noreg=" +$scope.item.noReg
				}
				var rm =""
				if ($scope.item.noRm != undefined ){
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
				var cacheNoreg =""
				if ($scope.item.noReg != undefined){
					cacheNoreg =$scope.item.noReg
				}
				var cacheNoRm =""
				if ($scope.item.noRm != undefined){
				    cacheNoRm =$scope.item.noRm
				}	
				var cacheNama =""
				if ($scope.item.nama != undefined){
					cacheNama=$scope.item.nama
				}


				$q.all([
					manageTataRekening.getDataTableTransaksi("lab-radiologi/get-daftar-registrasi-pasien?"+
						"tglAwal="+tglAwal+
						"&tglAkhir="+tglAkhir+
						reg+rm+nm+ins+rg+kp+dk),
					]).then(function(data) {
						$scope.isRouteLoading=false;
						var result=data[0].data.data;
						for (var i = 0; i < result.length; i++) {
	                        result[i].no = i+1
                            var tanggal = $scope.now;
			                var tanggalLahir = new Date(result[i].tgllahir);
			                var umur = dateHelper.CountAge(tanggalLahir, tanggal);
			                result[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                   		 }
                    $scope.dataDaftarPasien={
                        data: result,
                        pageSize: 10,
                        // total: data.length,
                        // serverPaging: false,
                        selectable: true,
                    	refresh: true,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        },
                     //    group:[
                     //    {
                     //        field:"kelompokpasien", aggregates:[
                     //            {field:'noregistrasi', aggregate:'count'},
                             
                     //        ]                            
                     //    },                        
	                    // ],
	                    aggregate:[
	                        {field:'noregistrasi', aggregate:'count'}, 
	                    ] 
                    }
                     $scope.ruanganLogin=data[0].data.ruanganlogin[0];

						var chacePeriode = tglAwal + "~" + tglAkhir ;
						cacheHelper.set('DaftarRegistrasiPasienLabRadCtrl', chacePeriode);
					});
				

				};

			$scope.UbahDokter = function(){
				if($scope.dataPasienSelected.noregistrasi==undefined)
				{
					toastr.error('Pilih Pasien dulu','Info');

					return
				}
		       $scope.popupDokter.center().open();
				// $scope.cboDokter = true
				// $scope.cboUbahDokter=false
				// $scope.cboUbahSEP=false
			}
			$scope.EditSEP = function(){
				$scope.item.noPeserta="";
				$scope.item.noSep="";

				if($scope.dataPasienSelected.norec == null){
					messageContainer.error("Pasien Belum Dipilih!!")
                	return;
				}
				if($scope.dataPasienSelected.kelompokpasien =="Umum/Pribadi"){
					messageContainer.error("Tipe Pasien Umum!!")
                	return;
				}
				if($scope.dataPasienSelected.norec_pa ==null){
					messageContainer.error("Pemakaian Asuransi tidak ada")
                	return;
				}

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
			$scope.batal = function(){
				$scope.cboDokter = false
				$scope.cboSep = false
				$scope.cboUbahDokter=true
				$scope.cboUbahSEP=true
			}
			$scope.PasienPulang = function(){
				var tglpulang = moment($scope.item.tanggalPulang).format('YYYY-MM-DD HH:mm:ss');
				$scope.cbopasienpulang = true
				$scope.cboUbahDokter=false
				if ($scope.dataPasienSelected.tglpulang != null){
					$scope.item.tanggalPulang=$scope.dataPasienSelected.tglpulang
				}else{
					$scope.item.tanggalPulang=tglpulang
				}				
			}
			$scope.batalsimpantglpulang = function(){
				$scope.cbopasienpulang = false 
				$scope.cboUbahDokter= true
			}
			//debugger
			$scope.simpantglpulang = function(){
				//debugger
				var tglpulang = moment($scope.item.tanggalPulang).format('YYYY-MM-DD HH:mm:ss');
				var updateTanggal = {
					"noregistrasi": $scope.dataPasienSelected.noregistrasi,
					"tglpulang": tglpulang
				}
				manageTataRekening.saveupdatetglpulang(updateTanggal).then(function(e){
					loadData();				
				})	
					$scope.cbopasienpulang=false;
					$scope.cboUbahDokter=true;
			}
			$scope.kartupasien = function() {
				// debugger;
                if($scope.dataPasienSelected != undefined){
                	// debugger;
                	//##save identifikasi kartu pasien
                    manageTataRekening.getDataTableTransaksi("operator/identifikasi-kartu-pasien?norec_pd="
                        + $scope.dataPasienSelected.norec
                         ).then(function(data) {
                            var datas=data.data;
                    })
                    //##end 

                    // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/kartuPasien?id=" + $scope.item.pasien.id);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                
                    //cetakan langsung service VB 6 by grh   
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-kartupasien=1&norec=' + $scope.dataPasienSelected.nocmfk + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }
			$scope.simpanSep = function(){
				if($scope.dataPasienSelected.kelompokpasien == "BPJS"){
					var updateSep = {
						"norec": $scope.dataPasienSelected.norec,
						"nokepesertaan": $scope.item.noPeserta,
						"nosep": $scope.item.noSep
					}
				}else{
					var updateSep = {
						"norec": $scope.dataPasienSelected.norec,
						"nokepesertaan": $scope.item.noPeserta,
						"nosep": null
					}
				}
				
				manageTataRekening.postSaveSep(updateSep).then(function(e){
					loadData();				
				})	
					$scope.item.noPeserta="";
					$scope.item.noSep="";
					$scope.cboSep = false
					$scope.cboUbahSEP=true
					$scope.cboDokter =false
					$scope.cboUbahDokter =true
			}
			$scope.batalSep = function(){
				$scope.item.noPeserta="";
				$scope.item.noSep="";
				$scope.cboSep = false	
				$scope.cboUbahSEP=true
				$scope.cboDokter = false
				$scope.cboUbahDokter =true
			}

			$scope.klikGrid = function(dataPasienSelected){
				if (dataPasienSelected != undefined) {
					$scope.item.namaDokter = {id:dataPasienSelected.pgid,namalengkap:dataPasienSelected.namadokter}
					$scope.dataPasienSelected=dataPasienSelected
					// $scope.item.ruanganAntrian = {id:dataPasienSelected.objectruanganlastfk,namaruangan:dataPasienSelected.namaruangan}
				}
			}
			$scope.simpan = function(){
				var objSave = 
                    {
                        norec:$scope.dataPasienSelected.norec,
                        objectpegawaifk:$scope.item.namaDokter.id,
                        objectruanganlastfk:$scope.dataPasienSelected.objectruanganlastfk
                    }
				manageTataRekening.ubahDokterRegis(objSave).then(function(e) {
					$scope.popupDokter.close();
					loadData();

					$scope.cboDokter = false
					$scope.cboSep = false
					$scope.cboUbahDokter=true
					$scope.cboUbahSEP=true
				})	
			}
			$scope.Detail = function(){
				if($scope.dataPasienSelected.norec_br == "Pasien Batal"){
					// window.messageContainer.error('Pasien Sudah Batal');
					alert("Pasien Sudah Batal!!!")
                	return;
				}

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
				if($scope.dataPasienSelected.norec_br == "Pasien Batal"){
					// window.messageContainer.error('Pasien Sudah Batal');
					alert("Pasien Sudah Batal!!!")
                	return;
				}

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

	    $scope.formatNum = {
                format: "#.#",
                decimals: 0
        }
	    $scope.labelpasien = function() {
                // if($scope.item != undefined){
                //     var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasien.noCm);
                //     window.open(fixUrlLaporan, '', 'width=800,height=600')
                // }
                $scope.dats = {
                    qty: 0
                }
                $scope.dialogCetakLabel.center().open();
        }

        $scope.pilihQty = function(data) {
                var listRawRequired = [
                    "dats.qty|k-ng-model|kuantiti"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var qty = data.qty;
                    var qtyhasil = data.qty*2;
                    if(qty !== undefined){
                        // var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasienDaftar.noRegistrasi + "&qty=" + qty);
                        // window.open(fixUrlLaporan, '', 'width=800,height=600')
                        //cetakan langsung service VB6 by grh

                         //##save identifikasi label pasien
                        manageTataRekening.getDataTableTransaksi("operator/identifikasi-label?norec_pd="
                            + $scope.dataPasienSelected.norec +'&islabel=' + qtyhasil
                             ).then(function(data) {
                              var datas=data.data;
                        }) 
                        //##end

                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + $scope.dataPasienSelected.noregistrasi + '&view=false&qty=' + qty, function(response) {
                            // do something with response
                        });

                    }
                    $scope.dialogCetakLabel.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
        };

        $scope.SummaryList = function() {
                if($scope.dataPasienSelected.nocm != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapResume?noCm=" + $scope.item.pasien.noCm + "&tglRegistrasi=" + new moment($scope.item.pasienDaftar.tglRegistrasi).format('DD-MM-YYYY'));
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //##save identifikasi summary list
                    manageTataRekening.getDataTableTransaksi("operator/identifikasi-sum-list?norec_pd="
                      + $scope.dataPasienSelected.norec
                       ).then(function(data) {
                          var datas=data.data;
                    })

                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-summarylist=1&norec=' + $scope.dataPasienSelected.nocm + '&view=false', function(response) {
                        // do something with response
                    });


                }
        }

        $scope.GelangPasien = function() {
                if($scope.dataPasienSelected.nocmfk != undefined){
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.dataPasienSelected.nocmfk);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
        }
        
        $scope.Tracer = function() {
                if($scope.dataPasienSelected.noregistrasi != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapTracer?noRegistrasi=" + $scope.item.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    
                     //##save identifikasi tracer
                   manageTataRekening.getDataTableTransaksi("operator/identifikasi-tracer?norec_pd="
                      + $scope.dataPasienSelected.norec
                       ).then(function(data) {
                          var datas=data.data;
                    }) 
                    //##end

                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-tracer=1&norec=' + $scope.dataPasienSelected.noregistrasi + '&view=false', function(response) {
                        // do something with response
                    });            


                }
        }

        $scope.CetakSEP = function() {
                if($scope.dataPasienSelected.noregistrasi != undefined && $scope.dataPasienSelected.kelompokpasien !== "Umum/Pribadi"){
                    // var noSep = e.data.data === null ? "2423432" : e.data.data;
                    // var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')


                    //##save identifikasi sep
                    manageTataRekening.getDataTableTransaksi("operator/identifikasi-sep?norec_pd="
                      + $scope.dataPasienSelected.norec
                       ).then(function(data) {
                          var datas=data.data;
                    }) 
                    //##end

                    //http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=1708000087&view=true   
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep-new=1&norec=' + $scope.dataPasienSelected.noregistrasi + '&view=false', function(response) {
                        // do something with response
                    });
                }
        }

        //operator/get-data-pasien-mau-batal
        $scope.RMK = function(){
        	var norReg = ""
            if ($scope.dataPasienSelected.noregistrasi != undefined) {
                norReg = "noReg=" + $scope.dataPasienSelected.noregistrasi;
            }
            if($scope.dataPasienSelected.noregistrasi != undefined){
            	manageTataRekening.getDataTableTransaksi("operator/get-data-diagnosa-pasien?"
                   	+ norReg
	            ).then(function (data) {

	                var datas = data.data.datas[0];
	                if (datas != undefined) {
                        $scope.sourceDiagnosisPrimer.add({
                            id: datas.id,
                            jenisdiagnosa: datas.jenisdiagnosa,
                            kddiagnosa: datas.kddiagnosa,
                            ketdiagnosis: datas.ketdiagnosis,
                            keterangan: datas.keterangan, 
                            namadiagnosa: datas.namadiagnosa,
                            norec_apd: datas.norec_apd,
                            norec_detaildpasien: datas.norec_detaildpasien,
                            norec_diagnosapasien: datas.norec_diagnosapasien,
                            noregistrasi: datas.noregistrasi
                        })

                        $scope.item.norec_apd = datas.norec_apd;
                        $scope.item.keteranganDiagnosis = datas.keterangan;
                        $scope.item.diagnosisPrimer = {
	                						id: datas.id,
	                                        kddiagnosa:datas.kddiagnosa,
	                                        namadiagnosa: datas.namadiagnosa
	                                     }
                	}

	                $scope.icd10.center().open();
	            });
              
       		}
       	}	

        $scope.cetakRMK = function() {
        	var norReg = ""
            if ($scope.dataPasienSelected.noregistrasi != undefined) {
                norReg = "noReg=" + $scope.dataPasienSelected.noregistrasi;
            }	
            manageTataRekening.getDataTableTransaksi("operator/get-data-diagnosa-pasien?"
                + norReg
	        ).then(function (data) {
	        	var dataDiagnosa = data.data.datas[0]
	        	
	            if ($scope.item.jenisDiagnosis == undefined) {
                    alert("Pilih Jenis Diagnosa terlebih dahulu!!")
                    return
                }
                if ($scope.item.diagnosisPrimer == undefined) {
                    alert("Pilih Kode Diagnosa dan Nama Diagnosa terlebih dahulu!!")
                    return
                }  

                var norecDiagnosaPasien = "";
                if (dataDiagnosa != undefined) {
                    norecDiagnosaPasien = dataDiagnosa.norec_diagnosapasien;
                }

                var keterangan ="";
                if ($scope.item.keteranganDiagnosis == undefined){
                    keterangan = "-"
                }
                else{
                    keterangan = $scope.item.keteranganDiagnosis;
                }
               

                $scope.now = new Date();
                var detaildiagnosapasien = {
                    norec_dp: norecDiagnosaPasien,
                    noregistrasifk: dataDiagnosa.norec_apd,
                    objectdiagnosafk: $scope.item.diagnosisPrimer.id,
                    objectjenisdiagnosafk: $scope.item.jenisDiagnosis.id,
                    tglpendaftaran:  moment($scope.dataPasienSelected.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                    tglinputdiagnosa: moment($scope.now).format('YYYY-MM-DD hh:mm:ss'),
                    keterangan: keterangan
                }
	            manageTataRekening.postSaveDiagnosaRMK(detaildiagnosapasien).then(function(e){
						$scope.item.keteranganDiagnosis="";
	            		$scope.item.diagnosisPrimer="";
						loadData()
						$scope.icd10.close();

						 //##save identifikasi rmk
		                 manageTataRekening.getDataTableTransaksi("operator/identifikasi-rmk?norec_pd="
		                    +  $scope.dataPasienSelected.norec
		                     ).then(function(data) {
		                        var datas=data.data;
		                 })
		                 //##end 

						var client = new HttpClient();
		                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + dataDiagnosa.norec_apd + '&view=false', function(response) {
		                });	
			            // $scope.cetakBro();
					})
	        });
	        

        }
        $scope.batalCetakRMK = function() {
            $scope.item.keteranganDiagnosis="";
            $scope.item.diagnosisPrimer="";
            $scope.icd10.close();
        }


        $scope.cetakBro = function(){
                
        }

        $scope.BatalPeriksa = function() {
        	var norReg = ""
                if ($scope.dataPasienSelected.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.dataPasienSelected.noregistrasi;
                }
                    manageTataRekening.getDataTableTransaksi("operator/get-data-pasien-mau-batal?"
                   		 + norReg
	                ).then(function (data) {
	                	var datas = data.data
	                	if(datas.length > 0 && datas[0].norec_pp == undefined){
	                		$scope.item.ruanganBatal = {id:datas[0].objectruanganasalfk,namaruangan:datas[0].namaruangan}
	                		$scope.item.tglbatal =$scope.now;
	                		$scope.winDialog.center().open();
	                	} else if(datas.length > 1 || datas[0].norec_pp != undefined) {
	                		window.messageContainer.error('Pasien sudah Mendapatkan Pelayanan');
                    	} else if(datas.length > 0 && datas[0].norec_br != undefined){
                    		window.messageContainer.error('Pasien sudah Dibatalkan');	
                    	} else {
                		    window.messageContainer.error('Pasien belum di pilih');
                		}
					});
            }
        
        $scope.lanjutBatal = function() {
            	var norReg = ""
            	if ($scope.dataPasienSelected.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.dataPasienSelected.noregistrasi;
                }	
            	manageTataRekening.getDataTableTransaksi("operator/get-data-pasien-mau-batal?"
                   		 + norReg
	                ).then(function (data) {
	                	var BatalPeriksa = {
							"norec": $scope.dataPasienSelected.norec,
							"tanggalpembatalan": moment($scope.item.tglbatal).format('YYYY-MM-DD hh:mm:ss'),
							"pembatalanfk": $scope.item.pembatalan.id,
							"alasanpembatalan": $scope.item.alasanBatal,
							
						}
	                	manageTataRekening.postSaveBatalRegistrasi(BatalPeriksa).then(function(e){
							loadData();	
							$scope.item.pembatalan="";
				            $scope.item.alasanBatal="";
				            $scope.item.ruanganBatal="";
				            
						})
	                });
	        $scope.winDialog.close();
        }

        $scope.batalBatal = function() {
            $scope.item.pembatalan="";
            $scope.item.alasanBatal="";
            $scope.item.ruanganBatal="";
            $scope.winDialog.close();
        }
        
        $scope.InputDiagnosa =function(){
        	$state.go('RiwayatRegistrasi3', {
                nocm: $scope.dataPasienSelected.nocm,
                noregistrasi:$scope.dataPasienSelected.noregistrasi
            });
        }

        $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
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
	    }
			
			$scope.EditRegistrasi = function(){
                  if ($scope.dataPasienSelected==undefined)
             		{
             		messageContainer.error("Pilih data dulu")
             		return
             		}
             		else{
             			 manageTataRekening.getDataTableTransaksi("registrasipasien/get-apd?noregistrasi="
				                + $scope.dataPasienSelected.noregistrasi
    		                   + "&objectruanganlastfk="+$scope.dataPasienSelected.objectruanganlastfk
					        ).then(function (data) {
					        	var dataAntrian = data.data.data[0];

					        		$state.go('RegistrasiPelayananRev', {
			                         noCm: $scope.dataPasienSelected.nocm
					                    });
					                      var cacheSet = $scope.dataPasienSelected.norec 
					                                     + "~" + $scope.dataPasienSelected.noregistrasi
					                                     + "~" + dataAntrian.norec_apd;      
					                       cacheHelper.set('CacheRegistrasiPasien', cacheSet);         	 
					        })
	             	    }  
	        }  
	        $scope.EditPemakaianAsuransi = function(){
                  if ($scope.dataPasienSelected==undefined)
             		{
             		messageContainer.error("Pilih data dulu")
             		return
             		}
             		else{
			           
             		 manageTataRekening.getDataTableTransaksi("registrasipasien/get-apd?noregistrasi="
				                + $scope.dataPasienSelected.noregistrasi
					        ).then(function (data) {
					        	var dataAntrian = data.data.data[0];
					        	if (dataAntrian!=undefined){	
					        		$state.go('PemakaianAsuransi',{
				                        norecPD: $scope.dataPasienSelected.norec,
				                        norecAPD: dataAntrian.norec_apd,
			                    	});

					                      var cacheSet = $scope.dataPasienSelected.objectasuransipasienfk 
					                          		     + "~" + $scope.dataPasienSelected.norec_pa     
					                                     + "~" + $scope.dataPasienSelected.noregistrasi;
					                                
					                       cacheHelper.set('CachePemakaianAsuransi', cacheSet);       
					              }  	 
				   })
	            }  
	        }

	        $scope.popUpBL=function(){
	        	 if($scope.item != undefined){
                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' 
                    	+ $scope.dataPasienSelected.noregistrasi + '&strIdPegawai='
                    	+ $scope.pegawai.id 
                    	+ '&view=false', function(response) {

                    });

                    //##save identifikasibuktiLayanan
                    manageTataRekening.getDataTableTransaksi("operator/identifikasi-buktiLayanan?norec_pd="
                        + $scope.dataPasienSelected.norec
                         ).then(function(data) {
                          var datas=data.data;
                    }) 
                    //##end 

                }

	        }  
	         var status='';
	         $scope.popUpInputTindakan=function(){
	         	if($scope.dataPasienSelected.noregistrasi==undefined)
				{
					toastr.error('Pilih Pasien dulu','Info');
					return
				}

				manageTataRekening.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi="+$scope.dataPasienSelected.noregistrasi).then(function (e) {
	                	status=e.data.status;
	                		if (status==true)
							{
								toastr.error('Data Sudah Diclosing, Hubungi Tatarekening','Info');
			                  	return;

							}
				        	manageTataRekening.getDataTableTransaksi("operator/get-apd?noregistrasi="
							                + $scope.dataPasienSelected.noregistrasi
								        ).then(function (data) {
								        	$scope.listRuanganApd=data.data.ruangan;
								        	$scope.item.ruanganAntrian={id:$scope.listRuanganApd[0].id,
								        		namaruangan:$scope.listRuanganApd[0].namaruangan, 
								        		norec_apd:$scope.listRuanganApd[0].norec_apd
								        		}
								        })
				           	$scope.popupAntrians.center().open();
							$scope.showInputTindakan=true;
				        	$scope.showBuktiLayanan=false;
				});

			
	        }  

	       	$scope.inputTindakan = function(){
                    $state.go('InputTindakanPelayananRev',{
                    	norecPD:$scope.dataPasienSelected.norec,
                        norecAPD: $scope.item.ruanganAntrian.norec_apd,
                      
                    });               
            }
            $scope.pegawai = ModelItem.getPegawai();
            $scope.buktiLayanan = function() {
                if($scope.item != undefined){
                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' 
                    	+ $scope.dataPasienSelected.noregistrasi + '&strIdPegawai='
                    	+ $scope.pegawai.id 
                    	+ '&view=false', function(response) {

                    });

                }
            }
            $scope.cetakNoAntrian = function() {
                if($scope.item != undefined){
                    //cetakan langsung service VB 6 by grh   
                    var client = new HttpClient();
                                
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktipendaftaran=1&norec=' 
                    	+ $scope.dataPasienSelected.noregistrasi + '&view=false', function(response) {
                        // do something with response
                    });


                }
            }
            $scope.transaksiPelayanan = function(){
            	if($scope.dataPasienSelected.nostruk != null){
            		 toastr.error("Data Sudah Diclosing, Hubungi Tatarekening!");
                      return;
            	}

            	 var arrStr ={  0 : $scope.dataPasienSelected.nocm,
						        1 : $scope.dataPasienSelected.namapasien,
						        2 : $scope.dataPasienSelected.jeniskelamin,
						        3 : $scope.dataPasienSelected.noregistrasi, 
						        4 : $scope.dataPasienSelected.umur,
						        5 : $scope.dataPasienSelected.objectkelasfk,
						        6 : $scope.dataPasienSelected.namakelas,
						        7 : $scope.dataPasienSelected.tglregistrasi,
						        8 : $scope.dataPasienSelected.norec_apd,//NOREC ANTRIAN
						        9 : $scope.dataPasienSelected.namaruangan,
						        10 : $scope.dataPasienSelected.objectruanganlastfk,
						        11 : $scope.dataPasienSelected.norec,
						        12 : "",//nor
						        13 : $scope.dataPasienSelected.kelompokpasien,
						        14 : $scope.dataPasienSelected.pgid,
						        15 : $scope.ruanganLogin.id
				             }
                cacheHelper.set('RincianPelayananLabRadCtrl', arrStr);
                $state.go('RincianPelayananLabRad')
            }


			/* END */
		}
	]);
});