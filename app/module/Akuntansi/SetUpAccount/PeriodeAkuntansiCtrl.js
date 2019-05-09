define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PeriodeAkuntansiCtrl', ['$mdDialog', '$state', 'DateHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($mdDialog, $state, dateHelper, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.keteranganLoading = "Harap tunggu, sedang memproses halaman";
			$scope.dataVOloaded = false;
			$scope.showButtonTemplate = true;
			$scope.now = new Date();

			$scope.saldo = {};
			$scope.saldo.saldoAwalDFormated = formatRupiah("0", "Rp.");
			$scope.saldo.saldoAwalKFormated = formatRupiah("0", "Rp.");
			$scope.saldo.selisihFormated = formatRupiah("0","Rp.");
			$scope.saldo.saldoAsetFormated = formatRupiah("0", "Rp.");
			$scope.saldo.saldoKewajibanFormated = formatRupiah("0", "Rp.");
			$scope.saldo.saldoEkuitasFormated = formatRupiah("0","Rp.");

			$scope.item = {};
			
			var currentCOASelected = "";
			$scope.$watch('item.jenisAccount', function(newValue, oldValue) {
				
                if(newValue != undefined){
                	$scope.varCurrentJenisAccount = newValue;
                	getDataCoa(newValue.id);
                }
            });

			function formatRupiah(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			var isCalculateAll = false;
			$scope.onBound = function()
			{
				
				if($scope.dataCOA)
				{
					var dataCoa = $scope.dataCOA._data;
					if(dataCoa.length > 0)
					{
						var totalDot = 0;

						var tempArray = _.filter(dataCoa, function(data){
						 return $scope.countDot(data.noAccount, "\\.") == totalDot; 
						});

						$scope.saldo.saldoAwalD = _.reduce(tempArray, function(memo, data){ 
							return memo + data.saldoAwalD; 
						}, 0);

						$scope.saldo.saldoAwalK = _.reduce(tempArray, function(memo, data){ 
							return memo + data.saldoAwalK; 
						}, 0);

						$scope.saldo.saldoAwalDFormated = formatRupiah($scope.saldo.saldoAwalD, "Rp.");
						$scope.saldo.saldoAwalKFormated = formatRupiah($scope.saldo.saldoAwalK, "Rp.");
						$scope.saldo.selisihFormated = formatRupiah($scope.saldo.saldoAwalD - $scope.saldo.saldoAwalK,"Rp.");


						$scope.saldo.saldoAset  = _.find($scope.dataCOA._data, function(data){
						 return data.noAccount == "1"; 
						});

						$scope.saldo.saldoKewajiban  = _.find($scope.dataCOA._data, function(data){
						 return data.noAccount == "2"; 
						});

						$scope.saldo.saldoEkuitas = _.find($scope.dataCOA._data, function(data){
						 return data.noAccount == "3"; 
						});

						$scope.saldo.saldoAsetFormated = formatRupiah($scope.saldo.saldoAset.saldoAwalD + $scope.saldo.saldoAset.saldoAwalK, "Rp.");
						$scope.saldo.saldoKewajibanFormated = formatRupiah($scope.saldo.saldoKewajiban.saldoAwalK, "Rp.");
						$scope.saldo.saldoEkuitasFormated = formatRupiah($scope.saldo.saldoEkuitas.saldoAwalK,"Rp.");

						$scope.saldo.balanceTotalSaldo = "Total Saldo Tidak Balance";
						if(($scope.saldo.saldoAwalD - $scope.saldo.saldoAwalK) == 0)
						{
							$scope.saldo.balanceTotalSaldo = "Total Saldo Balance"
						}

						$scope.saldo.balanceNeraca = "Neraca Tidak Balance";
						if($scope.saldo.saldoAset.saldoAwalD == ($scope.saldo.saldoKewajiban.saldoAwalK + $scope.saldo.saldoEkuitas.saldoAwalK))
						{
							$scope.saldo.balanceNeraca = "Neraca Balance"
						}

						if(!isCalculateAll){
							$scope.calculateAll();
							console.log("ONBOUND TRUE");
						}
					}
				}
			}

			$scope.editGrid = function(e){
				 currentCOASelected = e.model.noAccount;
				 var saldoAwalD = e.container.find("input[name=saldoAwalD]").data("kendoNumericTextBox");
			     var saldoAwalK = e.container.find("input[name=saldoAwalK]").data("kendoNumericTextBox");
			      
				if (!e.model.isEditable) {
			      if(saldoAwalD != null)
					saldoAwalD.enable(false);

				  if(saldoAwalK != null)
				  saldoAwalK.enable(false);
				}
				else
				{
				  var dataEdited = _.find($scope.dataCOA._data, function(data){
					 return data.noAccount == currentCOASelected; 
					});

				  dataEdited.edited = true;

				  var input = e.container.find(".k-input");
				  var value = input.val();
				  input.keydown(function(event){
			        if(saldoAwalD != null)
					e.model.saldoAwalK = 0;

					if(saldoAwalK != null)
					e.model.saldoAwalD = 0;
				  });
				}
			}

			$scope.columnCOA = [
			{
				"field": "noAccount",
				"title": "No Account"
			},
			{
				"field": "namaAccount",
				"title": "Nama Account"
			},
			{
				"field": "saldoAwalD",
				"title": "Saldo Awal (D) periode",
			},
			{
				"field": "saldoAwalK",
				"title": "Saldo Awal (K) periode"
			}];

			$scope.rowTemplate = 
				"<tr data-uid='#: uid #'>"+
		            "<td>"+
		               "#: noAccount #"+
		            "</td>"+
		            "<td>"+
		               "#: namaAccount #"+
		            "</td>"+
		            "<td>"+
		               "#: kendo.toString(saldoAwalD, 'n0') #"+
		            "</td>"+
		            "<td>"+
		               "#: kendo.toString(saldoAwalK, 'n0') #"+
		            "</td>"+
		            "<td>"+
		            	"# if (isEditable == true) { #"+
				        "<label>bisa di edit</label>"+
				        "# } #"+
		            "</td>"+
	            "</tr>";

	        var currentIdJenisAccount = "";
	        function getDataCoa(idJenisAccount){
	        	if(currentIdJenisAccount != idJenisAccount && !$scope.isEditing)
	        	{
	        		currentIdJenisAccount = idJenisAccount;
	        		console.log("PANGGIL DATA");
					modelItemAkuntansi.getDataTableTransaksi("settingperiode/get-account-with-saldo/"+idJenisAccount).then(function(data) {
	                    if (data.statResponse){

	                    	for(var i=0; i<data.data.length; i++){
	                    		data.data[i]["edited"] = false;
	                    	}

		            		$scope.dataCOA = new kendo.data.DataSource({
								data: data.data,
								autoSync: true,
			                    schema: {
			                        model: {
			                            id: "id",
			                            fields: {
			                                noAccount: { editable: false},
			                                namaAccount: { editable: false},
			                                saldoAwalD: { type: "number", validation: { required: true, min: 0} },
			                                saldoAwalK: { type: "number", validation: { required: true, min: 0} }
			                            }
			                         }
			                    }
							});

							var grid = $('#gridCOA').data("kendoGrid");
	                    	grid.setDataSource($scope.dataCOA);
	                    	$scope.dataCOA.read();

	                    }
	                })
	        	}
	        }

			$q.all([
            	modelItemAkuntansi.getDataGeneric("JenisAccount", false),
            	modelItemAkuntansi.getDataTableTransaksi("settingperiode")        	
            ]).then(function(data) {
            	if(data[0].statResponse)
                {
                	$scope.listJenisAccount = data[0];
                }

                if(data[1].statResponse)
                {
                	$scope.getListPeriode(data[1].data);
                }

                $scope.dataVOloaded = true;
				
            });

            $scope.getListPeriode = function(dataSource)
            {
            	$scope.dataListPeriode = new kendo.data.DataSource({
					data: dataSource
				});

				var gridListPeriode = $('#gridListPeriode').data("kendoGrid");
            	gridListPeriode.setDataSource($scope.dataListPeriode);
            	$scope.dataListPeriode.read();
            }

            $scope.countDot = function(str, char) {
			    return ( str.match( RegExp(char,'g') ) || [] ).length;
			}

			$scope.calculateAll = function(){
				var currentCOA = currentCOASelected;
				if(currentCOA != "")
				{
					isCalculateAll = true;

					var totalDot = $scope.countDot(currentCOA, "\\.");
					var lastDot = currentCOA.lastIndexOf(".");
					var strNoCoaParent = currentCOA.substr(0,lastDot)

					var tempArray = _.filter($scope.dataCOA._data, function(data){
					 return ($scope.countDot(data.noAccount, "\\.") == totalDot) && (data.noAccount.substr(0,data.noAccount.lastIndexOf(".")) == strNoCoaParent); 
					});

					var totalSaldoD = _.reduce(tempArray, function(memo, data){ 
						return memo + data.saldoAwalD; 
					}, 0);

					var totalSaldoK = _.reduce(tempArray, function(memo, data){ 
						return memo + data.saldoAwalK; 
					}, 0);

					var tempParent = _.find($scope.dataCOA._data, function(data){
					 return data.noAccount == strNoCoaParent; 
					});

					tempParent.saldoAwalD = totalSaldoD;
					tempParent.saldoAwalK = totalSaldoK;

					var grid = $('#gridCOA').data("kendoGrid");
					grid.refresh();

					currentCOASelected = strNoCoaParent;
					var totalParentDot = $scope.countDot(currentCOASelected, "\\.");
					if(totalParentDot != 0)
					{
						$scope.calculateAll();
					}
					else
					{
						isCalculateAll = false;
						console.log("ONBOUND FALSE");
					}
					
				}
			}


			$scope.Save = function()
			{
				var listRawRequired = [
			    	"item.periodeAccount|ng-model|Nama periode",
			    	"item.jenisAccount|k-ng-model|Jenis account",
			    	"item.tanggalAwalPeriode|k-ng-model|Tanggal awal periode",
			    	"item.tanggalAkhirPeriode|k-ng-model|Tanggal akhir periode"
			    ];
			    
			    var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
			    
			    if(isValid.status){
			    	$scope.keteranganLoading = "Harap tunggu, sedang memproses data periode";
					$scope.dataVOloaded = false;

					var dataPost = {};
					dataPost.detailPeriode = [];

					dataPost.periode = {
	                  periodeAccount: $scope.item.periodeAccount,
	                  jenisAccount: $scope.item.jenisAccount,
	                  tglAwalPeriode: moment($scope.item.tanggalAwalPeriode).format('YYYY-MM-DD'),
	                  tglAkhirPeriode: moment($scope.item.tanggalAkhirPeriode).format('YYYY-MM-DD'),
	                  keteranganLainnya: $scope.item.keterangan
	                }

	                dataPost.detailPeriode = $scope.dataCOA._data;

	                manageAkuntansi.createPeriodeAkuntansi(dataPost).then(function(e) {
	                	modelItemAkuntansi.getDataTableTransaksi("settingperiode").then(function(data) {
	                		$scope.getListPeriode(data.data);
	                		$scope.keteranganLoading = "";
							$scope.dataVOloaded = true;
	                	});     	
	                }, function(){
	                	$scope.dataVOloaded = true;
	                });
			    }
			    else
			    {
			    	modelItemAkuntansi.showMessages(isValid.messages);
			    }
			}

			$scope.Edit = function()
			{
				var dataPost = {};
				dataPost.detailPeriode = [];

				dataPost.noRec = $scope.dataSelectedPeriode.noRec;

				dataPost.periode = {
                  periodeAccount: $scope.item.periodeAccount,
                  jenisAccount: $scope.item.jenisAccount,
                  tglAwalPeriode: dateHelper.formatDate($scope.item.tanggalAwalPeriode, "YYYY-MM-DD"),
                  tglAkhirPeriode: dateHelper.formatDate($scope.item.tanggalAkhirPeriode, "YYYY-MM-DD"),
                  keteranganLainnya: $scope.item.keterangan
                }

                dataPost.detailPeriode = $scope.dataCOA._data;

                manageAkuntansi.updatePeriodeAkuntansi(dataPost).then(function(e) {
                    
                }, function(){
                	$scope.dataVOloaded = true;
                });
			}


			/*=========================
			======	LIST PERIODE  =====
			===========================*/

			$scope.dataSelectedPeriode = {};
			$scope.isEditing = false;

			$scope.columnListPeriode = [
			{
				"field": "jenisAccount",
				"title": "Jenis Account"
			},
			{
				"field": "periodeAccount",
				"title": "Periode Account"
			},
			{
				"field": "tglAwalPeriode",
				"title": "Tanggal Awal Periode",
			},
			{
				"field": "tglAkhirPeriode",
				"title": "Tanggal Akhir Periode"
			},
			{
		        command: { text: "Edit" },
		        title: "&nbsp;",
		        width: "100px"
		    }];

		    $scope.rowTemplateListPeriode = 
				"<tr data-uid='#: uid #'>"+
		            "<td>"+
		               "#: jenisAccount #"+
		            "</td>"+
		            "<td>"+
		               "#: periodeAccount #"+
		            "</td>"+
		            "<td>"+
		               "#: tglAwalPeriode #"+
		            "</td>"+
		            "<td>"+
		               "#: tglAkhirPeriode #"+
		            "</td>"+
		            "<td>"+
		            	"<button class='btnEdit' ng-click='showSpesificPeriode()'> &nbsp;&nbsp;Edit&nbsp;&nbsp;  </button>"+
		            "</td>"+
	            "</tr>";

			//show spesific periode
            $scope.showSpesificPeriode = function()
            {
                if($scope.dataSelectedPeriode)
                {
                    if(this.dataItem.noRec != $scope.dataSelectedPeriode.noRec)
                    {
                        alert("row belom ke select");
                    }
                    else
                    {
                    	$scope.getSpesificPeriode($scope.dataSelectedPeriode.noRec, $scope.dataSelectedPeriode.objectJenisAccountFk);
                        //$scope.isEditing = true;
                        //$scope.showButtonTemplate = true;
                        //showDataEdit($scope.dataSelectedRowCoa.id);
                    }
                }   
            }

            //get spesific data periode
            $scope.getSpesificPeriode = function(noRec, fkJenisAccount)
            {
            	currentCOASelected = "";
            	$scope.isEditing = true;
            	$scope.item.periodeAccount = $scope.dataSelectedPeriode.periodeAccount;
				$scope.item.tanggalAwalPeriode = new Date($scope.dataSelectedPeriode.tglAwalPeriode);
				$scope.item.tanggalAkhirPeriode = new Date($scope.dataSelectedPeriode.tglAkhirPeriode);

				$scope.item.jenisAccount = _.find($scope.listJenisAccount, function(data){ 
                        return data.id == $scope.dataSelectedPeriode.objectJenisAccountFk; 
                });

				$scope.item.keterangan = $scope.dataSelectedPeriode.keteranganLainnya;

				modelItemAkuntansi.getDataTableTransaksi("settingperiode/get-account-with-saldo/"+fkJenisAccount+"/"+noRec).then(function(data) {
                    if (data.statResponse){

                    	for(var i=0; i<data.data.length; i++){
                    		data.data[i]["edited"] = false;
                    	}

	            		$scope.dataCOA = new kendo.data.DataSource({
							data: data.data,
							autoSync: true,
		                    schema: {
		                        model: {
		                            id: "id",
		                            fields: {
		                                noAccount: { editable: false},
		                                namaAccount: { editable: false},
		                                saldoAwalD: { type: "number", validation: { required: true, min: 0} },
		                                saldoAwalK: { type: "number", validation: { required: true, min: 0} }
		                            }
		                         }
		                    }
						});

						var grid = $('#gridCOA').data("kendoGrid");
                    	grid.setDataSource($scope.dataCOA);
                    	$scope.dataCOA.read();

                    }
                })
            }

            //function button batal
            $scope.Back = function(){
            	$scope.item = {};
            	$scope.isEditing = false;
            	currentCOASelected = "";

            	var grid = $('#gridCOA').data("kendoGrid");
            	grid.dataSource.data([]);
            }

            $scope.tesValidation = function(){
            	// Appending dialog to document.body to cover sidenav in docs app
			    /*var confirm = $mdDialog.confirm()
			          .title('Permintaan Perbaikan')
			          .textContent('Ada Perminaan Perbaikan' +
			          	'Dari ' + 
			          	'Alat ' )
			          .ariaLabel('Lucky day')
			          .ok('Oke')

			    $mdDialog.show(confirm).then(function() {
			      
			    });*/
			    //ebugger;
            }
		}
	]);
});