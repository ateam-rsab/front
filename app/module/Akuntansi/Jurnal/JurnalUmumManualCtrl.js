define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JurnalUmumManualCtrl', ['$mdDialog', '$parse', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($mdDialog, $parse, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.keteranganLoading = "Harap tunggu, sedang memproses halaman";
			$scope.dataVOloaded = false;
			$scope.now = new Date();
			$scope.jurnalChecked = true;
			$scope.isVerifikasi = false;

			function showButton(){
				$scope.showBtnPosting = true;
			}

			showButton();


			$scope.saldo = {};

			$scope.item = {};
			$scope.feedback = {};

            $scope.listMCSC = new kendo.data.DataSource({
                data: [
                {"id":1, "value":"Melati"},
                {"id":2, "value":"Delima"},
                {"id":3, "value":"Flamboyan"},
                {"id":4, "value":"Anggrek"}
                ]
            });

            modelItemAkuntansi.getDataGeneric("JenisAccount", false).then(function(data) {
                if (data.statResponse){
                	$scope.listJenisAccount = data;
                	
                	modelItemAkuntansi.getDataTableMaster("chartofaccount/get-account-list/"+$scope.listJenisAccount[0].id).then(function(data) {
		                if (data.statResponse){
		                	$scope.listCharOfAccount = data.data;
		                	$scope.dataVOloaded = true;
		                }
			        })
                	
                }
	        })

	        $scope.formatRupiah = function(value, currency, pageVerifikasi) {
				var ret = "";

				if(value != ""){
					ret = currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					ret = ret.substring(0, ret.length-3);

				}
			    else{
			    	if(pageVerifikasi)
			    		ret = "";
			    	else
			    		ret = 0;
			    }

			    return ret; 
			}

			$scope.totalDebit = 0;
			$scope.totalKredit = 0;
			$scope.selisih = 0;

			$scope.totalSaldo = function(balance, id)
			{
				if(balance == 1)
					$scope.dataModelGrid[id].kredit = "";
				else
					$scope.dataModelGrid[id].debit = "";


				$scope.totalDebit = 0;
				$scope.totalKredit = 0;

				var grid = $('#gridTransaksiJurnal').data("kendoGrid");
				for(var i=0; i<grid._data.length; i++){
					if($scope.dataModelGrid[grid._data[i].id].debit)
					$scope.totalDebit += parseInt($scope.dataModelGrid[grid._data[i].id].debit);
					
					if($scope.dataModelGrid[grid._data[i].id].kredit)
					$scope.totalKredit += parseInt($scope.dataModelGrid[grid._data[i].id].kredit);
		    	}

		    	$scope.selisih = $scope.totalDebit - $scope.totalKredit;

		    	$scope.Verifikasi();
			}

			$scope.dataModelGrid = {};
			$scope.dataModelGrid.perkiraan = {};
			$scope.dataModelGrid.keterangan = {};
			$scope.dataModelGrid.mc = {};
			$scope.dataModelGrid.sc = {};
			$scope.dataModelGrid.debit = {};
			$scope.dataModelGrid.kredit = {};

			$scope.dataBoundPerkiraan = function (e) {
		        $(".tbd").parent().click(false);
		    }

			$scope.templateEffect =  
                "# if (data.hasChild) { #"+
                    "<span class='tbd' style='color: gray;'>#: data.reportDisplay #</span>"+
                "# } else { #"+
                    "<span>#: data.reportDisplay #</span>"+
                "# } #";

			$scope.rowTemplate = 
				"<tr data-uid='#: uid #'>"+
					//No Perkiraan
		            "<td>"+
		               "<input style='width: 100%;' k-on-change='Verifikasi()' kendo-combo-box k-ng-model='dataModelGrid[#: id #].perkiraan' k-on-data-bound='dataBoundPerkiraan()' k-template='templateEffect' k-data-text-field=\"'noAccount'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listCharOfAccount' />"+
		            "</td>"+
		            //Perkiraaan
		            "<td>"+
		               "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid[#: id #].perkiraan.namaAccount' disabled />"+
		            "</td>"+
		            //MC
		            /*"<td>"+
		               "<input style='width: 100%;' k-on-change='Verifikasi()' kendo-combo-box k-ng-model='dataModelGrid[#: id #].mc' k-data-text-field=\"'value'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listMCSC' />"+
		            "</td>"+
		            //SC
		            "<td>"+
		               "<input style='width: 100%;' k-on-change='Verifikasi()' kendo-combo-box k-ng-model='dataModelGrid[#: id #].sc' k-data-text-field=\"'value'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listMCSC' />"+
		            "</td>"+*/
		            //Debit
					"<td>"+
		               "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid[#: id #].debit' ng-change='totalSaldo(1, #: id #)'/>"+
		            "</td>"+
		            //Kredit
					"<td>"+
		               "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid[#: id #].kredit' ng-change='totalSaldo(2, #: id #)' />"+
		            "</td>"+
		            //action
		            "<td>"+
		             	"<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button>"+
                    "</td>"+

	            "</tr>";

	        $scope.dataSelectedRowJurnal = {};
			$scope.dataJurnal = new kendo.data.DataSource({
						data: [{id:1}]
				    });

			$scope.columnJurnal = [
				{
	                title: "No Perkiraan",
	                width: "250px"
	            },
	            {
	                title: "Perkiraaan",
	                width: "250px"
	            },
	            /*{
	                title: "Mission Centre",
	                width: "150px"
	            },
	            {
	                title: "Service Centre",
	                width: "150px"
	            },*/
	            {
	                title: "Debit",
	                width: "150px"
	            },
	            {
	                title: "Kredit",
	                width: "150px"
	            },
	            {
	                title: "Action",
	                width: "150px"
	            }
		    ];

		    var dateNow = new Date();

		    var noID = 1;
		    $scope.tambahTransaksi = function(){
		    	var grid = $('#gridTransaksiJurnal').data("kendoGrid");
				
				noID += 1;

				$scope.dataModelGrid[noID] = {};

		    	grid.dataSource.add({
			      id: noID
			    });	
		    }

		    $scope.hapusTransaksi = function()
		    {
		    	if($scope.dataSelectedRowJurnal)
                {
                    if(this.dataItem.id != $scope.dataSelectedRowJurnal.id)
                    {
                        alert("row beom ke select");
                    }
                    else
                    {
                    	var grid = $('#gridTransaksiJurnal').data("kendoGrid");
		    			grid.dataSource.remove($scope.dataSelectedRowJurnal);
		    			removeDataModelGrid(this.dataItem.id);
                    }
                }   
		    }

		    function removeDataModelGrid(id){
				if($scope.dataModelGrid[id]){
		    		delete $scope.dataModelGrid[id];
		    	}
		    }

		    $scope.Verifikasi = function(){
		    	var grid = $('#gridTransaksiJurnal').data("kendoGrid");

		    	$scope.dataFixJurnal = {};
		    	$scope.dataFixJurnal.data = [];
		    	$scope.dataFixJurnal.noBukti = $scope.item.noBukti;
		    	
		    	if($scope.item.tanggalTransaksi)
			    	$scope.dataFixJurnal.tanggal = $scope.item.tanggalTransaksi.getDate() + "/" + ($scope.item.tanggalTransaksi.getMonth() + 1) + "/" + $scope.item.tanggalTransaksi.getFullYear();
		    	else
		    		$scope.dataFixJurnal.tanggal = "";
		    	
		    	$scope.dataFixJurnal.keteranganJurnal = $scope.item.keteranganJurnal

		    	for(var i=0; i<grid._data.length; i++){
		    		$scope.dataFixJurnal.data.push($scope.dataModelGrid[grid._data[i].id])
		    	}

		    	//$scope.jurnalChecked = false;
		    	//$scope.isVerifikasi = true;
		    }

		    $scope.Back = function(){
		    	$scope.jurnalChecked = true;
		    	$scope.isVerifikasi = false;
		    }

		    $scope.Posting = function()
		    {
		    	var listRawRequired = [
			    	"item.tanggalTransaksi|k-ng-model|Tanggal transaksi",
			    	"item.noBukti|ng-model|No. bukti"
			    ];
			    
			    var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
			    
			    if(isValid.status){
			    	var confirm = $mdDialog.confirm()
				          .title('Peringatan!')
				          .textContent('Apakah anda yakin posting jurnal ini?')
				          .ariaLabel('Lucky day')
				          .ok('Iya')
				          .cancel('Tidak')

				    $mdDialog.show(confirm).then(function() {
				      $scope.SendPosting();
				    });
			    }
			    else
			    {
			    	modelItemAkuntansi.showMessages(isValid.messages);
			    }

		    	
		    }

		    $scope.SendPosting = function(){
		    	$scope.keteranganLoading = "Harap tunggu, sedang memproses data jurnal";
				$scope.dataVOloaded = false;

		    	var dataPost = {};

		    	dataPost.jurnal = {
		    		"noBuktiTransaksi": $scope.dataFixJurnal.noBukti,
				    "tglBuktiTransaksi": moment($scope.item.tanggalTransaksi).format('YYYY-MM-DD'),
				    "keteranganLainnya": $scope.dataFixJurnal.keteranganJurnal
		    	};

		    	var tempArrDetailJurnal = [];
		    	for(var i=0; i<$scope.dataFixJurnal.data.length; i++)
		    	{
		    		var obj = {
		    			"objectAccountFk" : $scope.dataFixJurnal.data[i].perkiraan.id,
		    			"hargaSatuanD": $scope.dataFixJurnal.data[i].debit,
      					"hargaSatuanK": $scope.dataFixJurnal.data[i].kredit,
		    		}
		    		tempArrDetailJurnal.push(obj);
		    	}

		    	dataPost.detailJurnal = tempArrDetailJurnal;
		    	manageAkuntansi.postingJurnalUmumManual(dataPost).then(function(e) {
		    		$scope.feedback = e.data;
                    $scope.keteranganLoading = "";
					$scope.dataVOloaded = true;
                }, function(){
                	$scope.dataVOloaded = true;
                });
		    }
		}
	]);
});