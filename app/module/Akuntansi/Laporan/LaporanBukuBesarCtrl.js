define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanBukuBesarCtrl', ['$sce', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','CacheHelper',
		function($sce, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.dataSelected = {};
			$scope.item = {};

			var sDebet = 0;
			var sKredit = 0;
			var sSaldo = 0;
			// $scope.item.bulan =  $scope.now;
			// $scope.item.tahun =  $scope.now;

			$scope.monthUngkul = {
				start: "year",
				depth: "year"
			}
			$scope.yearUngkul = {
				start: "decade",
				depth: "decade"
			}

			LoadCombo()
			//ON LOAD with Params
			var chacePeriode = cacheHelper.get('LaporanBukuBesarCtrl');
			if(chacePeriode != undefined){
				var arrPeriode = chacePeriode.split('~');
				$scope.item.tglAwal = new Date(arrPeriode[0]);
				$scope.item.tglAkhir = new Date(arrPeriode[1]);

				

				// LoadData()
			}
			else
			{
				// $scope.item.bulan = $scope.now;
				// $scope.item.tahun = $scope.now;
				// $scope.item.tglAwal = $scope.now;
    //            	$scope.item.tglAkhir = $scope.now;
               $scope.item.tglAwal =  moment($scope.item.tglAwal).format('YYYY-MM-DD 00:00:00')//$scope.now;
               $scope.item.tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD 23:59:59')//$scope.now;
			};
			///END/// ON LOAD with Params


			//$scope.urlBukuBesar = $sce.trustAsResourceUrl(manageAkuntansi.urlBukuBesar());
			function LoadCombo(){
				// manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-combo-buku-besar").then(function(data){
				// 	$scope.listAkun=data.data;
				// });
                modelItemAkuntansi.getDataDummyPHP("akuntansi/get-data-combo-coa-part2", true, true, 20).then(function(data) {
                    $scope.listAkun= data;
                })
				// manageSdm.getOrderList("ruangan/get-all-ruangan-for-tagihan").then(function(data){
				// 	$scope.listRuangan=data.data.data.ruangan;
				// });
				// $scope.listStatus = [{"id":"1","namaExternal":"Semua"},{"id":"2","namaExternal":"Belum Verifikasi"},{"id":"3","namaExternal":"Verifikasi"},{"id":"4","namaExternal":"Lunas"}]
			};
			function simpanCache(){
				//SIMPAN CAHCE
				// var bulan = dateHelper.formatDate($scope.item.bulan,"MM")
				// var tahun = dateHelper.formatDate($scope.item.tahun,"YYYY")
				// var tglAwal1 = tahun+"-"+bulan+"-01"
				// var tglAkhir1 = tahun+"-"+bulan+"-"+getLastDay( tahun,bulan)
				var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:00');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:59');
				var chacePeriode = tglAwal + "~" + tglAkhir //+ ":" + npp + ":" + jpp + ":" + sttt;
				cacheHelper.set('LaporanBukuBesarCtrl', chacePeriode);
				///END
			};

			$scope.SearchData = function(){
				simpanCache();
				LoadData();
			};

			function getLastDay(y, m) {
				if (m == 2 && y % 4 != 0){
					return 28
				}
				else {
					return 31 + (m <= 7 ? ((m % 2) ? 1 : 0) : (!(m % 2) ? 1 : 0)) - (m == 2) - (m == 2 && y % 4 != 0 || !(y % 100 == 0 && y % 400 == 0)); 
				}
			}
			function LoadData(){
				//debugger;
				// var bulan = dateHelper.formatDate($scope.item.bulan,"MM")
				// var tahun = dateHelper.formatDate($scope.item.tahun,"YYYY")
				// var tglAwal1 = tahun+"-"+bulan+"-01"
				// var tglAkhir1 = tahun+"-"+bulan+"-"+getLastDay( parseInt(tahun),parseInt(bulan))

				var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:00');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:59');
				//$scope.item.test = tglAkhir1
				//var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				//var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				var jp = "noaccount=-";
				if($scope.item.kdAkun != undefined){
					var jp = "noaccount=" + $scope.item.kdAkun.noaccount;
				};
                var jp2 = "&noaccount2=-";
                if($scope.item.kdAkun2 != undefined){
                    var jp2 = "&noaccount2=" + $scope.item.kdAkun2.noaccount;
                };
				modelItemAkuntansi.getDataTableTransaksi("akuntansi/get-data-buku-besar-rev2?"+ jp + jp2 + "&tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir ).then(function(data){
					$scope.dataGrid = new kendo.data.DataSource({
						data: data.data,
						total: data.data.length,
						serverPaging: false,
						pageSize: 30,
						group: [
	                        {field: "KodePerkiraan"}
	                    ],
                        sort:[
                            {
                                field: "tglbuktitransaksi",
                                dir:"desc"
                            }
                        ],
					});

					// sSaldo = 0;
			  //       if (parseFloat(data.saldoawal[0].hargasatuand) >0) {
			  //       	sSaldo=parseFloat(data.saldoawal[0].hargasatuand)
			  //      		$scope.item.saldoAwal = 'Rp. ' +  parseFloat(sSaldo).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
			  //       }else{
			  //       	sSaldo=parseFloat(data.saldoawal[0].hargasatuank) * (-1)
			  //      		$scope.item.saldoAwal = 'Rp. ' +  parseFloat(sSaldo).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
			  //       }
				          
					// sDebet = 0;
					// sKredit = 0;
			          	
		   //        	for(var i=0; i<data.data.length; i++){
		   //        		if (data.data[i].saldonormaladd == "D") {
		   //        			sSaldo = (sSaldo + parseFloat(data.data[i].hargasatuand))-parseFloat(data.data[i].hargasatuank);
		   //        		}
		   //        		if (data.data[i].saldonormaladd == "K") {
		   //        			sSaldo = (sSaldo + parseFloat(data.data[i].hargasatuank))-parseFloat(data.data[i].hargasatuand);
		   //        		}
			  //         	sDebet = sDebet + parseFloat(data.data[i].hargasatuand);
			  //         	sKredit = sKredit + parseFloat(data.data[i].hargasatuank);
		   //        		data.data[i].saldo = sSaldo
		   //        	};
			  //       $scope.item.totalDebet= 'Rp. ' +  parseFloat(sDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
			  //       $scope.item.totalKredit= 'Rp. ' +  parseFloat(sKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
			  //       $scope.item.saldo =  'Rp. ' +  parseFloat(sSaldo).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
				})
			};
			$scope.DetailJurnal = function(){
                $scope.item.nojurnal=$scope.dataSelected.nojurnal
                $scope.item.tanggal=$scope.dataSelected.tgl
                $scope.item.deskripsi=$scope.dataSelected.keteranganlainnya
                $scope.dataPopUp = new kendo.data.DataSource({
                        data: []
                    });
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-detail-buku-besar?nojurnal="+$scope.dataSelected.nojurnal+'&accountid='+$scope.item.kdAkun.id, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var ttlDebet =0.0
                    var ttlKredit =0.0
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                        ttlDebet = ttlDebet + parseFloat(dat.data[i].hargasatuand)
                        ttlKredit = ttlKredit + parseFloat(dat.data[i].hargasatuank)
                    }
                    $scope.item.ttlDebet = parseFloat(ttlDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ttlKredit = parseFloat(ttlKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: dat.data//,
                        
                        // sort:[
                        //     {
                        //         field: "nojurnal",
                        //         dir:"asc"
                        //     }
                        // ]

                    });
                });
                $scope.popupKomponen.center().open();
            }
            $scope.ClosingJurnal = function(){
            	var cDebet = 0
            	var cKredit = 0
            	$scope.item.norecSaldo = undefined

            	if (sSaldo > 0 ){
            		cDebet =  sSaldo
            		cKredit = 0
            	}else{
            		cDebet =  0
            		cKredit = sSaldo * (-1)
            	}

            	$scope.item.objectaccountfk = $scope.item.kdAkun.id
                $scope.item.noakunP = $scope.item.kdAkun.noAccount
                $scope.item.namaAkunP = $scope.item.kdAkun.namaAccount
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-saldo-awal?coaid="+ $scope.item.kdAkun.id, true).then(function(dat){
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                    }
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: dat.data,
                        sort:[
                            {
                                field: "tgl",
                                dir:"asc"
                            }
                        ],
                        pageSize: 12
                    });
                });

                $scope.item.tglSaldo =$scope.item.tglAkhir;
                $scope.item.saldoDebet = cDebet
                $scope.item.saldoKredit = cKredit
                $scope.item.saldoStatus = 1
                $scope.popupRiwayatSaldo.center().open();
            	

                // var norec_tea = '-'
                // var tgltgl = moment($scope.item.tglAkhir).format('YYYYMM');
                // var objSave = 
                // {
                //     norec : norec_tea,
                //     objectaccountfk : $scope.item.kdAkun.id,
                //     hargasatuand : cDebet,
                //     hargasatuank : cKredit,
                //     statusenabled : 1,
                //     ym : tgltgl,
                // }
                // manageAkuntansi.postaddsaldoawal(objSave).then(function(e) {
                    
                // })
            }
            $scope.tambahSaldo = function(){
                var norec_tea = $scope.item.norecSaldo
                if ($scope.item.norecSaldo ==  undefined){
                    norec_tea ='-'
                }
                var tgltgl = moment($scope.item.tglAkhir).format('YYYYMM');
                var objSave = 
                {
                    norec : norec_tea,
                    objectaccountfk : $scope.item.kdAkun.id,
                    hargasatuand : $scope.item.saldoDebet,
                    hargasatuank : $scope.item.saldoKredit,
                    statusenabled : $scope.item.saldoStatus,
                    ym : tgltgl,
                }
                manageAkuntansi.postaddsaldoawal(objSave).then(function(e) {
                    $scope.item.tglSaldo = $scope.now;
                    $scope.item.saldoDebet = 0
                    $scope.item.saldoKredit = 0
                    $scope.item.saldoStatus = 1
                    $scope.item.norecSaldo = undefined
                    manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-saldo-awal?coaid="+ $scope.item.kdAkun.id, true).then(function(dat){
                        for (var i = dat.data.length - 1; i >= 0; i--) {
                            dat.data[i].no = i+1
                        }
                        $scope.dataPopUp = new kendo.data.DataSource({
                            data: dat.data,
                            sort:[
                                {
                                    field: "tgl",
                                    dir:"asc"
                                }
                            ],
                            pageSize: 12
                        });
                    });
                })
                
            }
            $scope.hapusSaldo = function(){
                var objSave = 
                {
                    head:$scope.item.norecSaldo
                }
                manageAkuntansi.posthapussaldoawal(objSave).then(function(e) {
                    manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-saldo-awal?coaid="+ $scope.item.kdAkun.id, true).then(function(dat){
                        for (var i = dat.data.length - 1; i >= 0; i--) {
                            dat.data[i].no = i+1
                        }
                        $scope.dataPopUp = new kendo.data.DataSource({
                            data: dat.data,
                            sort:[
                                {
                                    field: "tgl",
                                    dir:"asc"
                                }
                            ],
                            pageSize: 12
                        });
                    });
                    $scope.item.norecSaldo = undefined
                    $scope.item.tglSaldo = $scope.now;
                    $scope.item.saldoDebet = 0
                    $scope.item.saldoKredit = 0
                    $scope.item.saldoStatus = 1
                })
                
                
            }
            $scope.batalSaldo = function(){
                $scope.item.norecSaldo = undefined
                $scope.item.tglSaldo = $scope.now;
                $scope.item.saldoDebet = 0
                $scope.item.saldoKredit = 0
                $scope.item.saldoStatus = 1
            }
            $scope.klikPopUp = function(dataSelectedPopUp){
                $scope.item.norecSaldo = dataSelectedPopUp.norec
                $scope.item.tglSaldo = dataSelectedPopUp.tgl
                $scope.item.saldoDebet = dataSelectedPopUp.hargasatuand
                $scope.item.saldoKredit = dataSelectedPopUp.hargasatuank
                $scope.item.saldoStatus = dataSelectedPopUp.statusenabled
            }
            $scope.columnPopUpClosing = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px"
                },
                {
                    "field": "tgl",
                    "title": "Tanggal",
                    "width" : "60px"
                },
                {
                    "field": "hargasatuand",
                    "title": "Saldo Debet",
                    "width" : "130px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
                },
                {
                    "field": "hargasatuank",
                    "title": "Saldo Kredit",
                    "width" : "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
                },
                {
                    "field": "statusenabled",
                    "title": "Status",
                    "width" : "20px"
                }
            ];
            $scope.optionsDataGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"Buku Besar" ,
                    allPages: true,
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                selectable: 'row',
                pageable: true,
                sortable: true,
                columns: [
                    {
						"field": "tglbuktitransaksi",
						"title": "<h3>Tanggal</h3>",
						"width":"70px",
		                    "template": "<span class='style-center'>#: tglbuktitransaksi #</span>"
						// "template": "<span class='style-left'>{{formatTanggal('#: tglbuktitransaksi #')}}</span>"
					},
					{
						"field": "nojurnal",
						"title": "<h3>No Jurnal</h3>",
						"width":"80px",
		                    "template": "<span class='style-center'>#: nojurnal #</span>"
					},
					{
						"field": "keteranganlainnya",
						"title": "<h3>Keterangan</h3>",
						"width":"300px",
						"template": "<span class='style-left'>#: keteranganlainnya #</span>"
					},
					{
						"field": "noref",
						"title": "<h3>No Ref</h3>",
						"width":"100px",
						"template": "<span class='style-center'>#: noref #</span>"
					},
					{
						"field": "hargasatuand",
						"title": "<h3>Debet</h3>",
						"width":"100px",
						"template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
					},
					{
						"field": "hargasatuank",
						"title": "<h3>Kredit</h3>",
						"width":"100px",
						"template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
					},
					{
						"field": "saldo",
						"title": "<h3>Saldo</h3>",
						"width":"100px",
						"template": "<span class='style-right'>{{formatRupiah('#: saldo #', '')}}</span>"
					}
                ],

            };
			$scope.columnGrid = [

                // {
                //     "field": "KodePerkiraan",
                //     "title": "nm",
                //     "width" : "50px"
                // },
			{
				"field": "tglbuktitransaksi",
				"title": "Tanggal",
				"width":"70px",
                    "template": "<span class='style-center'>#: tglbuktitransaksi #</span>"
				// "template": "<span class='style-left'>{{formatTanggal('#: tglbuktitransaksi #')}}</span>"
			},
			{
				"field": "nojurnal",
				"title": "No Jurnal",
				"width":"80px",
                    "template": "<span class='style-center'>#: nojurnal #</span>"
			},
			{
				"field": "keteranganlainnya",
				"title": "Keterangan",
				"width":"300px",
				"template": "<span class='style-left'>#: keteranganlainnya #</span>"
			},
			{
				"field": "noaccount",
				"title": "No Ref",
				"width":"100px",
				"template": "<span class='style-center'>#: noaccount #</span>"
			},
			{
				"field": "hargasatuand",
				"title": "Debet",
				"width":"100px",
				"template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
			},
			{
				"field": "hargasatuank",
				"title": "Kredit",
				"width":"100px",
				"template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
			},
			{
				"field": "saldo",
				"title": "Saldo",
				"width":"100px",
				"template": "<span class='style-right'>{{formatRupiah('#: saldo #', '')}}</span>"
			}
			// ,{
			// 	"title": "<span class='style-center'>Saldo</span>",
			// 	"columns" : [
			// 	{
			// 		"field": "sDebet",
			// 		"title": "Debet",
			// 		"width":"100px",
			// 		"template": "<span class='style-right'>{{formatRupiah('#: sDebet #', '')}}</span>"
			// 	},
			// 	{
			// 		"field": "sKredit",
			// 		"title": "Kredit",
			// 		"width":"100px",
			// 		"template": "<span class='style-right'>{{formatRupiah('#: sKredit #', '')}}</span>"
			// 	}
			// 	]

			// }
			];
			$scope.columnPopUp = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px"
                },
                {
                    "field": "noaccount",
                    "title": "Kode",
                    "width" : "70px"
                },
                {
                    "field": "namaaccount",
                    "title": "Perkiraan",
                    "width" : "100px"
                },
                {
                    "field": "keteranganlainnya",
                    "title": "Keterangan",
                    "width" : "100px"
                },
                {
                    "field": "hargasatuand",
                    "title": "Debit",
                    "width" : "80px", 
                    // "aggregates": ["sum"],
                    // "footerTemplate": "#=sum#",
                    // "groupFooterTemplate": "#=sum#",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
                },
                {
                    "field": "hargasatuank",
                    "title": "Kredit",
                    "width" : "80px", 
                    // "aggregates": ["sum"],
                    // "footerTemplate": "#=sum#",
                    // "groupFooterTemplate": "#=sum#",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
                }
            ];
			$scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "tglpelayanan",
                            "title": "Tgl Pelayanan",
                            "width" : "70px",
                        },
                        {
                            "field": "noregistrasi",
                            "title": "noregistrasi",
                            "width" : "40px",
                        },
                        {
                            "field": "namapasien",
                            "title": "Nama Pasien",
                            "width" : "90px",
                        },
                        {
                            "field": "id",
                            "title": "id",
                            "width" : "40px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "namaproduk",
                            "width" : "100px",
                        },
                        {
                            "field": "qty",
                            "title": "Qty",
                            "width" : "20px",
                        },
                        {
                            "field": "tarif",
                            "title": "Harga Satuan",
                            "width" : "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: tarif #', '')}}</span>"
                        }
                    ]
                }
            };  
			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			};
			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			};




		}
		]);
});