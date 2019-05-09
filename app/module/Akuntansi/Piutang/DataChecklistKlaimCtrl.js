define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DataChecklistKlaimCtrl', ['$timeout', '$state', '$q', '$rootScope', '$scope','CacheHelper', 'ModelItemAkuntansi', 'ManageTataRekening','ManageSdm',
		function($timeout, $state, $q, $rootScope, $scope,cacheHelper, modelItemAkuntansi, manageTataRekening,manageSdm) {

			
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.dataPasienSelected = {};

	    	LoadCache()
	    	function LoadCache(){
              var chacePeriode = cacheHelper.get('DataChecklistKlaimCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                // init();
             }
             else{
               $scope.item.tglAwal = $scope.now;
               $scope.item.tglAkhir = $scope.now;
               loadData();
             }
           }
		    
	    	$scope.formatTanggal = function(tanggal)
	    	{
	    		return moment(tanggal).format('DD-MMM-YYYY');
	    	}

	    	$scope.formatRupiah = function(value, currency) {
	    		return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	    	}
	    	$scope.optionsDataGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"DataChecklistKlaimBPJS " + moment($scope.item.tglAwal).format( 'YYYY-MM-DD')  + ' s/d ' + moment($scope.item.tglAkhir).format( 'YYYY-MM-DD'),
                    allPages: true,
                },
                // filterable: {
                //     extra: false,
                //     operators: {
                //         string: {
                //             contains: "Contains",
                //             startswith: "Starts with"
                //         }
                //     }
                // },
                selectable: 'row',
                pageable: true,
                sortable: true,
                columns: [
		                    {
				    		"field": "tgl",
				    		"title": "Tanggal",
		                    "template": "<span class='style-center'>#: tgl #</span>", 
				    		"width":"100px"
				    	},
				    	{
				    		"field": "Rawat Jalan",
				    		"width":"100px",
		                    "headerAttributes":{style:"text-align : center"}, 
				    		"columns" : [
				    			{
						    		"field": "berkas_rajal",
						    		"title": "Berkas",
		                            "template": "<span class='style-right'>#: berkas_rajal #</span>", 
						    		"width":"50px"
						    	},
						    	{
						    		"field": "bpjs_rajal",
						    		"title": "BPJS",
		                            "template": "<span class='style-right'>#: bpjs_rajal #</span>", 
						    		"width":"50px"
						    	}
							]
				    	},
				    	{
				    		"field": "Rawat Inap",
				    		"width":"100px",
		                    "headerAttributes":{style:"text-align : center"}, 
				    		"columns" : [
				    			{
						    		"field": "Berkas",
						    		"width":"100px",
		                    		"headerAttributes":{style:"text-align : center"}, 
						    		"columns" : [
						    			{
								    		"field": "berkas_kls1",
								    		"title": "Kls 1",
		                                    "template": "<span class='style-right'>#: berkas_kls1 #</span>", 
								    		"width":"50px"
								    	},
								    	{
								    		"field": "berkas_kls2",
								    		"title": "Kls 2",
		                                    "template": "<span class='style-right'>#: berkas_kls2 #</span>", 
								    		"width":"50px"
								    	},
								    	{
								    		"field": "berkas_kls3",
								    		"title": "Kls 3",
		                                    "template": "<span class='style-right'>#: berkas_kls3 #</span>", 
								    		"width":"50px"
								    	},
								    	{
								    		"field": "totalberkas",
								    		"title": "Total",
		                                    "template": "<span class='style-right'>#: totalberkas #</span>", 
								    		"width":"50px"
								    	}
									]
						    	},
						    	{
						    		"field": "BPJS",
						    		"width":"100px",
		                    		"headerAttributes":{style:"text-align : center"}, 
						    		"columns" : [
						    			{
								    		"field": "bpjs_kls1",
								    		"title": "Kls 1",
		                                    "template": "<span class='style-right'>#: bpjs_kls1 #</span>", 
								    		"width":"50px"
								    	},
								    	{
								    		"field": "bpjs_kls2",
								    		"title": "Kls 2",
		                                    "template": "<span class='style-right'>#: bpjs_kls2 #</span>", 
								    		"width":"50px"
								    	},
								    	{
								    		"field": "bpjs_kls3",
								    		"title": "Kls 3",
		                                    "template": "<span class='style-right'>#: bpjs_kls3 #</span>", 
								    		"width":"50px"
								    	},
								    	{
								    		"field": "totalbpjs",
								    		"title": "Total",
		                                    "template": "<span class='style-right'>#: totalbpjs #</span>", 
								    		"width":"50px"
								    	}
									]
						    	}
							]
				    	}
                ],

            };

		    $scope.columnGrid = [
		    	
		    ];

			$scope.SearchData = function(){
				loadData();
			}
			function loadData()
			{
			 
			  $scope.isRouteLoading=true;
			  var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
			  var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD');
			   $q.all([
		    	modelItemAkuntansi.getDataTableTransaksi("bpjs/get-checklist-klaim?"
		    		+"tglAwal="+tglAwal
		    		+"&tglAkhir="+tglAkhir),
		    	]).then(function(data) {
		    		$scope.isRouteLoading=false;
		    		for (var i = 0; i < data[0].dat.length; i++) {
		    			data[0].dat[i].totalberkas = parseFloat(data[0].dat[i].berkas_kls1)  + parseFloat(data[0].dat[i].berkas_kls2) + parseFloat(data[0].dat[i].berkas_kls3)
		    			data[0].dat[i].totalbpjs = parseFloat(data[0].dat[i].bpjs_kls1)  + parseFloat(data[0].dat[i].bpjs_kls2) + parseFloat(data[0].dat[i].bpjs_kls3)
		    		}
	    			$scope.dataGrid = new kendo.data.DataSource({
	    				data: data[0].dat,
	    				// pageSize: 10,
	    				total: data.length,
	    				serverPaging: false
	    			});
		    	});
		    	var chacePeriode ={ 
		    		0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DataChecklistKlaimCtrl', chacePeriode);
			}

			//-------------------------------------------------------

		}
	]);
});