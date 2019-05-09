define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenerimaanPembayaranKasirCtrl', ['$mdDialog', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir',
		function($mdDialog, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir) {
			debugger;
			$scope.dataParams = JSON.parse($state.params.dataPasien);	

			$scope.showCC = false;
			$scope.item = {};

			$scope.dataPrevPage = {};
			$scope.defaultPage = "";

			var buttonDisabled = false;

			$scope.dataDaftarBayarSelected = {};

			$scope.daftarBayar = new kendo.data.DataSource({
				data: []
			});

			$scope.columnDaftarBayar = [
			{
				"field": "caraBayar",
				"title": "Cara Bayar",
				"width":"200px",
				"template": "<span class='style-left'>#: caraBayar #</span>"
			},
			{
				"field": "nominal",
				"title": "Nominal",
				"width":"50px",
				"template": "<span class='style-right'>{{formatRupiah('#: nominal #', 'Rp.')}}</span>"
			},
			{
				"width":"50px",
				"title": "Action",
				"template": "<span class='style-center'><button class='btnHapus' ng-click='hapusDataBayar()'>Hapus</button></span>"
			},

			];

			$scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.detailPembayaran
					}),
                    columns: [{
	                    field: "noKartu",
	                    title: "No. Kartu"
	                },
	                {
	                    field: "namaKartu",
	                    title: "Nama Kartu"
	                },
	                {
	                    field: "jenisKartu.namaExternal",
	                    title: "Jenis Kartu"
	                }]
                };
            };

            $scope.tambahCaraBayar = function(){
            	var listRawRequired = [
                    "item.caraBayar|k-ng-model|Cara bayar",
                    "item.nominal|ng-model|Nominal"
                ];

    //             if($scope.showCC)
				// {
				// 	listRawRequired.push("item.noKartu|ng-model|No Kartu");
				// 	listRawRequired.push("item.namaKartu|ng-model|Nama Kartu");
				// 	listRawRequired.push("item.jenisKartu|k-ng-model|Jenis kartu");
				// }


				var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
                
                if(isValid.status){
                	var tempDataCaraBayar = {
						"id": $scope.item.caraBayar.id,
						"caraBayar" : $scope.item.caraBayar.namaExternal,
						"nominal" : $scope.item.nominal
					}

					if($scope.showCC)
					{
						tempDataCaraBayar.detailPembayaran = [{
							"noKartu" : $scope.item.noKartu,
							"namaKartu" : $scope.item.namaKartu,
							"jenisKartu" : $scope.item.jenisKartu 
						}]

						$scope.item.noKartu = "";
						$scope.item.namaKartu = "";
						$scope.item.jenisKartu = "";
					}
					else
					{
						tempDataCaraBayar.detailPembayaran = [{}]
					}


	            	var isExist = _.find($scope.daftarBayar._data, function(dataExist){ return dataExist.id == tempDataCaraBayar.id; });

					if(isExist == undefined)
					{
						$scope.daftarBayar.add(tempDataCaraBayar);
						$scope.item.totalFixBayar = 0;
						for(var i=0; i<$scope.daftarBayar._data.length; i++){
							$scope.item.totalFixBayar = parseFloat($scope.item.totalFixBayar) + parseFloat($scope.daftarBayar._data[i].nominal);
						}

						$scope.item.nominal = $scope.setDefaultNominal();
						
					}
					else
					{
						var confirm = $mdDialog.confirm()
	                      .title('Peringatan!')
	                      .textContent('Metode pembayaran '+tempDataCaraBayar.caraBayar+ " sudah ada")
	                      .ariaLabel('Lucky day')
	                      .ok('Ok')

	                    $mdDialog.show(confirm).then(function() {
	                      
	                    });
					}
                }
                else
                {
                	modelItemAkuntansi.showMessages(isValid.messages);
                }
			}

			$scope.setDefaultNominal = function(){
				return $scope.item.jumlahBayarFix - $scope.item.totalFixBayar;
			}

			$scope.hapusDataBayar = function(){
				if($scope.dataDaftarBayarSelected)
                {
                    if(this.dataItem.id != $scope.dataDaftarBayarSelected.id)
                    {
                        var confirm = $mdDialog.confirm()
                          .title('Peringatan!')
                          .textContent('Silahkan pilih baris data terlebih dahulu')
                          .ariaLabel('Lucky day')
                          .ok('Ok')

                        $mdDialog.show(confirm).then(function() {
                          
                        });
                    }
                    else
                    {
                        var isExist = _.find($scope.daftarBayar._data, function(dataExist){ return dataExist.id == $scope.dataDaftarBayarSelected.id; });
						if(isExist != undefined)
						{
							$scope.daftarBayar.remove(isExist);
							$scope.item.totalFixBayar = 0;
							for(var i=0; i<$scope.daftarBayar._data.length; i++){
								$scope.item.totalFixBayar = parseInt($scope.item.totalFixBayar) + parseInt($scope.daftarBayar._data[i].nominal);
							}

							$scope.item.nominal = $scope.setDefaultNominal();
						}
					}
                }   
			}

			


			var urlGetDataDetail = "";
			debugger;
			switch ($scope.dataParams.pageFrom) {
			    case "PembayaranTagihanLayananKasir":
			    	$scope.dataPrevPage = {
			    		noRecStrukPelayanan : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "tagihanPasien",
			    	}
			    	$scope.defaultPage = "DaftarPasienPulangKasir";
			        urlGetDataDetail = "kasir/pembayaran?noRecStrukPelayanan="+ $scope.dataParams.noRegistrasi +"&tipePembayaran=tagihanPasien";
			        break;
			     case "PembayaranTagihanNonLayananKasir":
			     	debugger;
			    	$scope.dataPrevPage = {
			    		noRecStrukPelayanan : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "tagihanNonLayanan",
			    	}
			    	$scope.defaultPage = "DaftarNonLayananKasir";
			        urlGetDataDetail = "kasir/pembayaran?noRecStrukPelayanan="+ $scope.dataParams.noRegistrasi +"&tipePembayaran=tagihanPasien";
			        break;
			     case "InputTagihanNonLayanan":
			     	debugger;
			    	$scope.dataPrevPage = {
			    		noRecStrukPelayanan : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "tagihanNonLayanan",
			    	}
			    	$scope.defaultPage = "DaftarNonLayananKasir";
			        urlGetDataDetail = "kasir/pembayaran?noRecStrukPelayanan="+ $scope.dataParams.noRegistrasi +"&tipePembayaran=tagihanPasien";
			        break;
			     case "DaftarNonLayananKasir":
			     	debugger;
			    	$scope.dataPrevPage = {
			    		noRecStrukPelayanan : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "tagihanNonLayanan",
			    	}
			    	$scope.defaultPage = "DaftarNonLayananKasir";
			        urlGetDataDetail = "kasir/pembayaran?noRecStrukPelayanan="+ $scope.dataParams.noRegistrasi +"&tipePembayaran=tagihanPasien";
			        break;
			    case "DaftarPenjualanApotekKasir/terimaUmum":
			     	debugger;
			    	$scope.dataPrevPage = {
			    		noRecStrukPelayanan : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "tagihanNonLayanan",
			    	}
			    	$scope.defaultPage = "DaftarPenjualanApotekKasir/terimaUmum";
			        urlGetDataDetail = "kasir/pembayaran?noRecStrukPelayanan="+ $scope.dataParams.noRegistrasi +"&tipePembayaran=tagihanPasien";
			        break;
			     
			    case "DaftarPenjualanApotekKasir/obatBebas":
			     	debugger;
			    	$scope.dataPrevPage = {
			    		noRecStrukPelayanan : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "tagihanNonLayanan",
			    	}
			    	$scope.defaultPage = "DaftarPenjualanApotekKasir/obatBebas";
			        urlGetDataDetail = "kasir/pembayaran?noRecStrukPelayanan="+ $scope.dataParams.noRegistrasi +"&tipePembayaran=tagihanPasien";
			        break;
			    case "PenyetoranDepositKasir":
			    	$scope.dataPrevPage = {
			    		noRegistrasi : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "depositPasien",
			    		jumlahBayar : $scope.dataParams.jumlahBayar
			    	}
			    	$scope.defaultPage = "DaftarPasienAktif";
					urlGetDataDetail = "kasir/pembayaran?noRegistrasi="+$scope.dataParams.noRegistrasi+"&tipePembayaran=depositPasien&jumlahBayar="+$scope.dataParams.jumlahBayar;
			        break;
			    case "PenyetoranDepositKasirKembali":
			    	$scope.dataPrevPage = {
			    		noRegistrasi : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "PenyetoranDepositKasirKembali",
			    		jumlahBayar : $scope.dataParams.jumlahBayar
			    	}
			    	$scope.defaultPage = "DaftarPasienAktif";
					urlGetDataDetail = "kasir/pembayaran?noRegistrasi="+$scope.dataParams.noRegistrasi+"&tipePembayaran=depositPasien&jumlahBayar="+$scope.dataParams.jumlahBayar;
			        break;
			     case "PembayaranPiutangKasir":
			    	$scope.dataPrevPage = {
			    		noRecStrukPelayanan : $scope.dataParams.noRegistrasi,
			    		tipePembayaran : "cicilanPasien",
			    		jumlahBayar : $scope.dataParams.jumlahBayar
			    	}
			    	//$scope.defaultPage = "DaftarPasienPulangKasir";
			    	$scope.defaultPage = "DaftarPiutangKasir";
			        urlGetDataDetail = "kasir/pembayaran?noRecStrukPelayanan="+$scope.dataParams.noRegistrasi+"&tipePembayaran=cicilanPasien&jumlahBayar="+$scope.dataParams.jumlahBayar;
			        break;

			}

			$q.all([
				modelItemAkuntansi.getDataTableTransaksi(urlGetDataDetail),
				modelItemAkuntansi.getDataGeneric("jenisKartu", false),
				modelItemAkuntansi.getDataGeneric("caraBayar", false),
				])
			.then(function(data) {

				if (data[0].statResponse){
					$scope.item = data[0];
					$scope.item.biayaAdministrasi = 0;
					$scope.item.diskon = 0;
					$scope.item.totalTagihan = $scope.item.jumlahBayar;
					$scope.item.jumlahBayarFix = ($scope.item.totalTagihan - $scope.item.diskon) + $scope.item.biayaAdministrasi;
					$scope.item.totalFixBayar = 0;

					$scope.item.nominal = $scope.setDefaultNominal();
				}

				if (data[1].statResponse){
					$scope.listJenisKartu = data[1];
				}

				if (data[2].statResponse){
					$scope.listCaraBayar = data[2];
				}
			});

			function showButton(){
				//$scope.showBtnCetak = true;
				$scope.showBtnSimpan = true;
				$scope.showBtnKembali = true;
			}

			showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.$watch('item.jumlahBayarFix', function(newValue, oldValue) {
				if (newValue < 0) {
					newValue =(newValue)*-1
				}
                modelItemAkuntansi.getDataGlobal("valet/terbilang/"+newValue).then(
                function(data){
                	$scope.item.terbilang = data.terbilang;
                })
            });

            $scope.Save = function(){
            	$scope.showBtnSimpan = false;

            	var listRawRequired = [
                    "item.biayaAdministrasi|ng-model|Administrasi",
                    "item.diskon|ng-model|Diskon",
                    "item.jumlahBayarFix|ng-model|Jumlah bayar"
                ];
				var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
                
                if(isValid.status){
                	if($scope.item.jumlahBayarFix != $scope.item.totalFixBayar){
                		var confirm = $mdDialog.confirm()
                          .title('Peringatan!')
                          .textContent('jumlah yang dibayarkan tidak sesuai dengan total tagihan')
                          .ariaLabel('Lucky day')
                          .ok('Ok')

                        $mdDialog.show(confirm).then(function() {
                          
                        });
                	}
                	else
                	{
                		var dataObjPost = {};

                		dataObjPost = {
		            			parameterTambahan: $scope.dataPrevPage,
					            noRec: $scope.item.noRec,
					            jumlahBayar: $scope.item.jumlahBayarFix,
					            biayaAdministrasi : $scope.item.biayaAdministrasi,
					            diskon : $scope.item.diskon,
					            pembayaran : []
		            	}

		            	var arrObjPembayaran = [];
                		for(var i=0; i<$scope.daftarBayar._data.length; i++){
                			var objPembayaran = {};

                			if($scope.daftarBayar._data[i].detailPembayaran[0].noKartu != undefined)
			            	{
			            		objPembayaran.nominal = $scope.daftarBayar._data[i].nominal;

			            		objPembayaran.caraBayar = {
			            			id : $scope.daftarBayar._data[i].id
			            		};

			            		var jenisKartu = {
					              	id : $scope.daftarBayar._data[i].detailPembayaran[0].jenisKartu.id
					             }

			            		objPembayaran.detailBank = {
			            			noKartu : $scope.daftarBayar._data[i].detailPembayaran[0].noKartu,
						            namaKartu : $scope.daftarBayar._data[i].detailPembayaran[0].namaKartu,
						            jenisKartu : jenisKartu
			            		}
			            	}
			            	else{

			            		objPembayaran.nominal = $scope.daftarBayar._data[i].nominal;

			            		objPembayaran.caraBayar = {
			            			id : $scope.daftarBayar._data[i].id
			            		};

			            	}
			            	arrObjPembayaran.push(objPembayaran);
                		}
                		dataObjPost.pembayaran = arrObjPembayaran;
                		debugger;
		            	modelItemAkuntansi.cekEnableDisableButton(buttonDisabled);
	                    buttonDisabled = true;

		            	manageKasir.pembayaranTagihanPasien(dataObjPost)
						.then(function(e) {
							var nosbm = {
								"nosbm" : e.data.noSBM
							}
							// save jurnal pembayaran 
							manageKasir.postTransaksi('kasir/save-jurnal-pembayarantagihan',nosbm).then(function(res) {
							
							})
								// end jurnal pembayaran 
							debugger;
		                	$scope.showBtnSimpan = false;
		                	modelItemAkuntansi.cekEnableDisableButton(buttonDisabled);
	                        buttonDisabled = false;
		                	$scope.showPageCetak(e.data.noSBM,e.data.noReg);
		                }, function(){
		                	modelItemAkuntansi.cekEnableDisableButton(buttonDisabled);
	                        buttonDisabled = false;
		                });
                	}
                }
                else
                {
                	modelItemAkuntansi.showMessages(isValid.messages);
                }

            	
            }

            $scope.Cetak = function(){
            	
            }

            $scope.Kembali = function(){

            	switch ($scope.dataParams.pageFrom) {
				    case "PembayaranTagihanLayananKasir":
				        if($scope.showBtnSimpan){
		            		$scope.changePage("PembayaranTagihanLayananKasir");
		            	}
		            	else
		            	{
		            		$state.go("DaftarPasienPulangKasir", {});	
		            	}
				        break;
				    case "PembayaranTagihanNonLayananKasir":
				        $scope.changePage("PembayaranTagihanNonLayananKasir");
				        break;
				    case "InputTagihanNonLayanan":
				        $scope.changePage("InputTagihanNonLayanan");
				        break;
				    case "DaftarNonLayananKasir":
				        $scope.changePage("DaftarNonLayananKasir");
				        break;
				    case "DaftarPenjualanApotekKasir/terimaUmum":
				        $state.go("DaftarPenjualanApotekKasir",{dataFilter: "terimaUmum"});
				        break;
				    case "DaftarPenjualanApotekKasir/obatBebas":
				        $state.go("DaftarPenjualanApotekKasir",{dataFilter: "obatBebas"});
				        break;
				    case "PenyetoranDepositKasir":
				        $scope.changePage("PenyetoranDepositKasir");
				        break;
				    case "PenyetoranDepositKasirKembali":
				        $scope.changePage("PenyetoranDepositKasirKembali");
				        break;
				    case "PembayaranPiutangKasir":
				        if($scope.showBtnSimpan){
		            		$scope.changePage("PembayaranPiutangKasir");
		            	}
		            	else
		            	{
		            		$state.go("DaftarPiutangKasir", {});	
		            	}
				        break;
				}

            	
            }

            $scope.changePage = function(stateName){
				var obj = {
            		noRegistrasi : $scope.dataParams.noRegistrasi
            	}

                $state.go(stateName, {
                   dataPasien: JSON.stringify(obj)
                });
			}


			$scope.$watch('item.biayaAdministrasi', function(newValue, oldValue) {
                $scope.item.jumlahBayarFix = ($scope.item.totalTagihan - $scope.item.diskon) + parseInt(newValue);
            });

            $scope.$watch('item.diskon', function(newValue, oldValue) {
                $scope.item.jumlahBayarFix = ($scope.item.totalTagihan - newValue) + parseInt($scope.item.biayaAdministrasi);
            });

            $scope.$watch('item.caraBayar', function(newValue, oldValue) {
               if(newValue != undefined && newValue.namaExternal == "KARTU KREDIT"){
               	$scope.showCC = true;
               }
               else
               {
               	$scope.showCC = false;
               }
            });

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

            $scope.showPageCetak = function(noSBM,noReg){
				debugger;

                switch ($scope.dataParams.pageFrom) {
				    case "PembayaranTagihanLayananKasir":
				    	var sudahTerimaDari = ''
				    	if($scope.item.terimaDari != undefined){
				    		sudahTerimaDari=$scope.item.terimaDari
				    	}
				    	var iydeeVegawhai = "";
				    	manageKasir.getDataTableTransaksi("get-data-login", true).then(function(dat){
				    		iydeeVegawhai = dat.data[0].namalengkap;
				    		var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi='+noReg+$scope.dataParams.noRegistrasi+'&idPegawai='+iydeeVegawhai+'&STD='+sudahTerimaDari+'&view=false', function(response) {
							    // do something with response
							});
				    	})
		          		$state.go('DaftarPasienPulangKasir');
				        break;
				    case "PembayaranTagihanNonLayananKasir":
				    	var sudahTerimaDari = ''
				    	if($scope.item.terimaDari != undefined){
				    		sudahTerimaDari=$scope.item.terimaDari
				    	}
				    	var iydeeVegawhai = "";
				    	manageKasir.getDataTableTransaksi("get-data-login", true).then(function(dat){
				    		iydeeVegawhai = dat.data[0].namalengkap;
				    		var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi='+noSBM+'&idPegawai='+iydeeVegawhai+'&STD='+sudahTerimaDari+'&view=false', function(response) {
							    // do something with response
							});
				    	})
				        break;
				    case "InputTagihanNonLayanan":
				    	var sudahTerimaDari = ''
				    	if($scope.item.terimaDari != undefined){
				    		sudahTerimaDari=$scope.item.terimaDari
				    	}
				    	var iydeeVegawhai = "";
				    	manageKasir.getDataTableTransaksi("get-data-login", true).then(function(dat){
				    		iydeeVegawhai = dat.data[0].namalengkap;
				    		var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi='+noSBM+'&idPegawai='+iydeeVegawhai+'&STD='+sudahTerimaDari+'&view=false', function(response) {
							    // do something with response
							});
				    	})
				        break;
				    case "DaftarNonLayananKasir":
				    	var sudahTerimaDari = ''
				    	if($scope.item.terimaDari != undefined){
				    		sudahTerimaDari=$scope.item.terimaDari
				    	}
				    	var iydeeVegawhai = "";
				    	manageKasir.getDataTableTransaksi("get-data-login", true).then(function(dat){
				    		iydeeVegawhai = dat.data[0].namalengkap;
				    		var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi='+noSBM+'&idPegawai='+iydeeVegawhai+'&STD='+sudahTerimaDari+'&view=false', function(response) {
							    // do something with response
							});
				    	})
				         // var obj = {
		           //  		noRegistrasi : noSBM,
		           //  		backPage : $scope.defaultPage,
		           //  		jenis : $scope.dataParams.pageFrom,
		           //  		noREG : noReg
		           //  	}

		           //      $state.go("CetakKwitansi", {
		           //         dataPasien: JSON.stringify(obj)
		           //      });
				        break;
				    case "DaftarPenjualanApotekKasir/terimaUmum":
				       var obj = {
		            		noRegistrasi : noSBM,
		            		backPage : $scope.defaultPage,
		            		jenis : $scope.dataParams.pageFrom,
		            		noREG : noReg
		            	}

		                $state.go("CetakKwitansi", {
		                   dataPasien: JSON.stringify(obj)
		                });
				        break;
				    case "DaftarPenjualanApotekKasir/obatBebas":
				        var obj = {
		            		noRegistrasi : noSBM,
		            		backPage : $scope.defaultPage,
		            		jenis : $scope.dataParams.pageFrom,
		            		noREG : noReg
		            	}

		                $state.go("CetakKwitansi", {
		                   dataPasien: JSON.stringify(obj)
		                });
				        break;
				    case "PenyetoranDepositKasir":
				    	var sudahTerimaDari = ''
				    	if($scope.item.terimaDari != undefined){
				    		sudahTerimaDari=$scope.item.terimaDari
				    	}
				    	var iydeeVegawhai = "";
				    	manageKasir.getDataTableTransaksi("get-data-login", true).then(function(dat){
				    		iydeeVegawhai = dat.data[0].namalengkap;
				    		var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi=DEPOSIT'+noSBM+'&idPegawai='+iydeeVegawhai+'&STD='+sudahTerimaDari+'&view=false', function(response) {
							    // do something with response
							});
				    	})
		          		$state.go('DaftarPasienAktif');
				        break;
				   case "PembayaranPiutangKasir":
				        var obj = {
		            		noRegistrasi : noSBM,
		            		backPage : $scope.defaultPage,
		            		jenis : $scope.dataParams.pageFrom,
		            		noREG : noReg
		            	}

		                $state.go("CetakKwitansi", {
		                   dataPasien: JSON.stringify(obj)
		                });
				        break;
				    case "PenyetoranDepositKasirKembali":
				    	var sudahTerimaDari = ''
				    	if($scope.item.terimaDari != undefined){
				    		sudahTerimaDari=$scope.item.terimaDari
				    	}
				    	var iydeeVegawhai = "";
				    	// manageKasir.getDataTableTransaksi("get-data-login", true).then(function(dat){
				    	// 	iydeeVegawhai = dat.data[0].namalengkap;
				    		
				    	// })
				    	manageKasir.getDataTableTransaksi("get-data-login", true).then(function(dat){
				    		iydeeVegawhai = dat.data[0].namalengkap;
				   //  		var client = new HttpClient();
							// client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi='+$scope.dataParams.noRegistrasi+'&idPegawai='+iydeeVegawhai+'&STD='+sudahTerimaDari+'&view=false', function(response) {
							//     // do something with response
							// });
							var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2-kembali-deposit=1&noregistrasi=KEMBALIDEPOSIT'+noSBM+'&idPegawai='+iydeeVegawhai+'&STD='+sudahTerimaDari+'&view=false&noregistrasi='+$scope.dataParams.noRegistrasi, function(response) {
							    // do something with response
							});
				    	})
		          		$state.go('DaftarPasienPulangKasir');
				        break;
				}

			}

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

		}
		]);
});