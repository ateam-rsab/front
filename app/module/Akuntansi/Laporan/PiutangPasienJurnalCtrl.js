define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PiutangPasienJurnalCtrl', ['$sce', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','CacheHelper',
		function($sce, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.dataSelected = {};
			$scope.item = {};
			$scope.dblklik = {};

			// var sDebet = 0;
			// var sKredit = 0;
			// var sSaldo = 0;
			// // $scope.item.bulan =  $scope.now;
			// // $scope.item.tahun =  $scope.now;

			// $scope.monthUngkul = {
			// 	start: "year",
			// 	depth: "year"
			// }
			// $scope.yearUngkul = {
			// 	start: "decade",
			// 	depth: "decade"
			// }

			LoadCombo()
			//ON LOAD with Params
			var chacePeriode = cacheHelper.get('PelayananRuanganCtrl');
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
				$scope.item.tglAwal = $scope.now;
               	$scope.item.tglAkhir = $scope.now;
			};
			///END/// ON LOAD with Params


			//$scope.urlBukuBesar = $sce.trustAsResourceUrl(manageAkuntansi.urlBukuBesar());
			function LoadCombo(){
				manageAkuntansi.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
                    $scope.listDepartemen = data.data.departemen;
                    $scope.listKelompokPasien = data.data.kelompokpasien;
                    $scope.listDokter = data.data.dokter;
                    $scope.listDokter2 = data.data.dokter;
                })
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
				cacheHelper.set('PelayananRuanganCtrl', chacePeriode);
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
            $scope.getIsiComboRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan
            }
            $scope.gridDblKlik = function(data){
            	$scope.dblklik = data;
            	$scope.popupDetail.center().open();
            }
            $scope.hapusJurnal = function(){
            	var objSave = 
                {
                    norec_pj:$scope.dblklik.norec_pj
                }
                manageAkuntansi.posthapusjurnalnorec(objSave).then(function(e) {
                })
            }
			function LoadData(){
				var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:00');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:59');
				var aa = "&departemenid=";
				if($scope.item.instalasi != undefined){
					var aa = "&departemenid=" + $scope.item.instalasi.id;
				};
                var bb = "&ruanganid=";
                if($scope.item.ruangan != undefined){
                    var bb = "&ruanganid=" + $scope.item.ruangan.id;
                };
                var cc = "&kelompokid=";
                if($scope.item.kelompokpasien != undefined){
                    var cc = "&kelompokid=" + $scope.item.kelompokpasien.id;
                };
				modelItemAkuntansi.getDataTableTransaksi("akuntansi/get-data-piutang-pasien?"
                    + "&tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir + aa + bb + cc ).then(function(data){
					$scope.dataGrid = new kendo.data.DataSource({
						data: data.data,
						total: data.data.length,
						serverPaging: false,
						pageSize: 100,
						// group: [
	     //                    {field: "instalasi"},
      //                       {field: "ruangan"}
	     //                ],
                        sort:[
                            {
                                field: "noregistrasi",
                                dir:"asc"
                            }
                        ],
					});

				})
                    $scope.optionsDataGrid = {
		                toolbar:["excel"],
		                excel: {
		                    fileName:"PelayananRuangan_" + moment($scope.item.tglAwal).format( 'YYYY-MM-DD')  + ' ' + moment($scope.item.tglAkhir).format( 'YYYY-MM-DD'),
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
		                columns: colcol,

		            };
			};
			var colcol = [
     //                {
					// 	"field": "tglregistrasi",
					// 	"title": "TglRegistrasi",
					// 	"width":"70px",
		   //                  "template": "<span class='style-center'>#: tglregistrasi #</span>"
					// 	// "template": "<span class='style-left'>{{formatTanggal('#: tglbuktitransaksi #')}}</span>"
					// },
                     {
						"field": "noregistrasi",
						"title": "NoRegistrasi",
						"width":"80px",
		                    "template": "<span class='style-center'>#: noregistrasi #</span>"
						// "template": "<span class='style-left'>{{formatTanggal('#: tglbuktitransaksi #')}}</span>"
					},
					{
						"field": "namapasien",
						"title": "Nama Pasien",
						"width":"150px",
		                    "template": "<span class='style-left'>#: namapasien #</span>"
					},
                    {
                        "field": "tglpelayanan",
                        "title": "Tgl Pelayanan",
                        "width":"80px",
                       "template": "<span class='style-left'>{{formatTanggal('#: tglpelayanan #')}}</span>"
                    },
					{
						"field": "namaproduk",
						"title": "Nama Pelayanan",
						"width":"170px",
						"template": "<span class='style-left'>#: namaproduk #</span>"
					},
					// {
					// 	"field": "hargasatuan",
					// 	"title": "Tarif",
					// 	"width":"90px",
     //                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
					// },
					// {
					// 	"field": "hargadiscount",
					// 	"title": "Discount",
					// 	"width":"90px",
					// 	"template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
					// },
					// {
					// 	"field": "jumlah",
					// 	"title": "Jumlah",
					// 	"width":"70px",
					// 	"template": "<span class='style-right'>{{formatRupiah('#: jumlah #', '')}}</span>"
					// },
					{
						"field": "total",
						"title": "Total",
						"width":"100px",
						"template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
					},
                    {
                        "field": "jenis",
                        "title": "Jenis",
                        "width":"70px",
                            "template": "<span class='style-center'>#: jenis #</span>"
                    },
                    {
                        "field": "nojurnal",
                        "title": "No Jurnal",
                        "width":"100px",
                            "template": "<span class='style-center'>#: nojurnal #</span>"
                    },
                    {
                        "field": "debet",
                        "title": "Debet",
                        "width":"150px"
                    },
                    {
                        "field": "kredit",
                        "title": "Kredit",
                        "width":"150px"
                    }
                ]
			$scope.optionsDataGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"PelayananRuangan_" + moment($scope.item.tglAwal).format( 'YYYY-MM-DD')  + ' ' + moment($scope.item.tglAkhir).format( 'YYYY-MM-DD'),
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
                columns: colcol,

            };
            
			// $scope.columnGrid = [

   //              // {
   //              //     "field": "KodePerkiraan",
   //              //     "title": "nm",
   //              //     "width" : "50px"
   //              // },
			// {
			// 	"field": "tglbuktitransaksi",
			// 	"title": "Tanggal",
			// 	"width":"70px",
   //                  "template": "<span class='style-center'>#: tglbuktitransaksi #</span>"
			// 	// "template": "<span class='style-left'>{{formatTanggal('#: tglbuktitransaksi #')}}</span>"
			// },
			// {
			// 	"field": "nojurnal",
			// 	"title": "No Jurnal",
			// 	"width":"80px",
   //                  "template": "<span class='style-center'>#: nojurnal #</span>"
			// },
			// {
			// 	"field": "keteranganlainnya",
			// 	"title": "Keterangan",
			// 	"width":"300px",
			// 	"template": "<span class='style-left'>#: keteranganlainnya #</span>"
			// },
			// {
			// 	"field": "noaccount",
			// 	"title": "No Ref",
			// 	"width":"100px",
			// 	"template": "<span class='style-center'>#: noaccount #</span>"
			// },
			// {
			// 	"field": "hargasatuand",
			// 	"title": "Debet",
			// 	"width":"100px",
			// 	"template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
			// },
			// {
			// 	"field": "hargasatuank",
			// 	"title": "Kredit",
			// 	"width":"100px",
			// 	"template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
			// },
			// {
			// 	"field": "saldo",
			// 	"title": "Saldo",
			// 	"width":"100px",
			// 	"template": "<span class='style-right'>{{formatRupiah('#: saldo #', '')}}</span>"
			// }
			// // ,{
			// // 	"title": "<span class='style-center'>Saldo</span>",
			// // 	"columns" : [
			// // 	{
			// // 		"field": "sDebet",
			// // 		"title": "Debet",
			// // 		"width":"100px",
			// // 		"template": "<span class='style-right'>{{formatRupiah('#: sDebet #', '')}}</span>"
			// // 	},
			// // 	{
			// // 		"field": "sKredit",
			// // 		"title": "Kredit",
			// // 		"width":"100px",
			// // 		"template": "<span class='style-right'>{{formatRupiah('#: sKredit #', '')}}</span>"
			// // 	}
			// // 	]

			// // }
			// ];
			// $scope.columnPopUp = [
   //              {
   //                  "field": "no",
   //                  "title": "No",
   //                  "width" : "20px"
   //              },
   //              {
   //                  "field": "noaccount",
   //                  "title": "Kode",
   //                  "width" : "70px"
   //              },
   //              {
   //                  "field": "namaaccount",
   //                  "title": "Perkiraan",
   //                  "width" : "100px"
   //              },
   //              {
   //                  "field": "keteranganlainnya",
   //                  "title": "Keterangan",
   //                  "width" : "100px"
   //              },
   //              {
   //                  "field": "hargasatuand",
   //                  "title": "Debit",
   //                  "width" : "80px", 
   //                  // "aggregates": ["sum"],
   //                  // "footerTemplate": "#=sum#",
   //                  // "groupFooterTemplate": "#=sum#",
   //                  "template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
   //              },
   //              {
   //                  "field": "hargasatuank",
   //                  "title": "Kredit",
   //                  "width" : "80px", 
   //                  // "aggregates": ["sum"],
   //                  // "footerTemplate": "#=sum#",
   //                  // "groupFooterTemplate": "#=sum#",
   //                  "template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
   //              }
   //          ];
			// $scope.data2 = function(dataItem) {
   //              return {
   //                  dataSource: new kendo.data.DataSource({
   //                      data: dataItem.details
   //                  }),
   //                  columns: [
   //                      {
   //                          "field": "tglpelayanan",
   //                          "title": "Tgl Pelayanan",
   //                          "width" : "70px",
   //                      },
   //                      {
   //                          "field": "noregistrasi",
   //                          "title": "noregistrasi",
   //                          "width" : "40px",
   //                      },
   //                      {
   //                          "field": "namapasien",
   //                          "title": "Nama Pasien",
   //                          "width" : "90px",
   //                      },
   //                      {
   //                          "field": "id",
   //                          "title": "id",
   //                          "width" : "40px",
   //                      },
   //                      {
   //                          "field": "namaproduk",
   //                          "title": "namaproduk",
   //                          "width" : "100px",
   //                      },
   //                      {
   //                          "field": "qty",
   //                          "title": "Qty",
   //                          "width" : "20px",
   //                      },
   //                      {
   //                          "field": "tarif",
   //                          "title": "Harga Satuan",
   //                          "width" : "40px",
   //                          "template": "<span class='style-right'>{{formatRupiah('#: tarif #', '')}}</span>"
   //                      }
   //                  ]
   //              }
   //          };  
			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			};
			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			};




		}
		]);
});